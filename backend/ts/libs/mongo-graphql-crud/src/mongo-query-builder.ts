import { Filters, Summary } from './get-all-query.args';
import {
  ArrayOperator,
  BinaryOperator,
  BooleanBinaryOperator,
} from './operator';
import { FiltersKey } from './filters-key';
import { RelationResolver } from './interfaces/crud.options';

const BasicFiltersOperatorMap = {
  [FiltersKey.equals]: '$eq',
  [FiltersKey.notEquals]: '$ne',
  [FiltersKey.greaterThan]: '$gt',
  [FiltersKey.greaterThanOrEqual]: '$gte',
  [FiltersKey.lessThanOrEqual]: '$lte',
  [FiltersKey.lessThan]: '$lt',
  [FiltersKey.inArray]: '$in',
  [FiltersKey.notInArray]: '$nin',
  [FiltersKey.exists]: '$exists',
};

const buildRegex = (filterKey: FiltersKey, value: string) => {
  switch (filterKey) {
    case FiltersKey.contains:
      return new RegExp(value);
    case FiltersKey.startsWith:
      return new RegExp(`^${value}`);
    case FiltersKey.endsWith:
      return new RegExp(`${value}$`);
    case FiltersKey.notContains:
      return new RegExp(`^((?!${value}).)*$`);
    default:
      return new RegExp(`${value}`);
  }
};

const generateFilterEntry = (
  filterKey: FiltersKey,
  values: string | string[] | boolean,
) => {
  const basicFilters = [
    FiltersKey.equals,
    FiltersKey.notEquals,
    FiltersKey.greaterThan,
    FiltersKey.greaterThanOrEqual,
    FiltersKey.lessThanOrEqual,
    FiltersKey.lessThan,
    FiltersKey.inArray,
    FiltersKey.notInArray,
    FiltersKey.exists,
  ];

  const stringFilters = [
    FiltersKey.contains,
    FiltersKey.notContains,
    FiltersKey.startsWith,
    FiltersKey.endsWith,
  ];
  if (basicFilters.some((f) => f === filterKey)) {
    return { [BasicFiltersOperatorMap[filterKey]]: values };
  } else if (stringFilters.some((f) => f === filterKey)) {
    return { $regex: buildRegex(filterKey, values as string), $options: 'i' };
  }
};

const complexFieldCharacterSeparator = '.';

const isSimpleField = (
  field: string,
  relationResolvers?: RelationResolver[],
): boolean =>
  !relationResolvers.some(
    (relationResolver) => field.indexOf(`${relationResolver.field}.`) > -1,
  );

interface DescomposeField {
  parentField: string;
  field: string;
}

export interface MongoQueryParsed {
  query: any;
  aggregateQuery: any[];
  executeWithAggregate: boolean;
  summaryQuery: any[];
}

const DescomposeComplexField = (nestedField: string): DescomposeField => {
  const [parentField, field] = nestedField.split(
    complexFieldCharacterSeparator,
  );
  return { field, parentField };
};

const createLookupEntry = (
  field: string,
  relationResolver: RelationResolver,
) => {
  return {
    $lookup: {
      from: (relationResolver?.collection || `${field}s`).toLowerCase(),
      localField: field + 'Id',
      foreignField: '_id',
      as: field,
    },
  };
};

const createUnWindEntry = (field: string) => {
  return {
    $unwind: {
      path: '$' + field,
    },
  };
};

const createMatch = (matchQuery: any) => {
  return {
    $match: matchQuery,
  };
};

const createSummary = (summary: Summary[]) => {
  const source = {};
  for (const item of summary) {
    const object = {};
    object[`$${item.type.toString()}`] = `$${item.field}`;
    source[item.type.toString()] = object;
  }

  return source;
};

const createGroupBySummary = (summary: Summary[]) => {
  const source = createSummary(summary);

  return {
    $group: {
      _id: null,
      ...source,
    },
  };
};

export abstract class MongoQueryBuilder {
  static build(
    filters: Filters,
    relationResolvers?: RelationResolver[],
    summary?: Summary[],
    limit?: number,
    skip?: number,
    sorts?: string,
  ): MongoQueryParsed {
    const querySort = sorts ? sorts.trim() : '';
    let executeWithAggregate = false;
    if (!relationResolvers) relationResolvers = [];

    if (!filters)
      return {
        query: {},
        aggregateQuery: [],
        executeWithAggregate: false,
        summaryQuery: [],
      };

    const query = {};
    const aggregateQuery = {};
    Object.keys(filters).forEach((filterKey: FiltersKey) => {
      filters[filterKey].forEach(
        (operator: BinaryOperator | ArrayOperator | BooleanBinaryOperator) => {
          const simpleField = isSimpleField(operator.field, relationResolvers);
          if (simpleField) {
            query[operator.field] = {
              ...(query[operator.field] || []),
              ...generateFilterEntry(filterKey, operator.value),
            };
          } else {
            const descomposedField = DescomposeComplexField(operator.field);
            aggregateQuery[descomposedField.parentField] =
              aggregateQuery[descomposedField.parentField] || {};
            aggregateQuery[descomposedField.parentField][operator.field] = {
              ...(aggregateQuery[descomposedField.parentField][
                operator.field
              ] || []),
              ...generateFilterEntry(filterKey, operator.value),
            };
          }
        },
      );
    });
    const finalAggregateQuery: any[] = [];
    if (Object.keys(query).length) {
      finalAggregateQuery.push(createMatch(query));
    }
    let finalMatch = {};
    Object.keys(aggregateQuery).forEach((field) => {
      const relationResolver = relationResolvers.find(
        (rR) => rR.field === field,
      );
      if (relationResolver) {
        const lookup = createLookupEntry(field, relationResolver);
        const unwind = createUnWindEntry(field);
        Object.keys(aggregateQuery[field]).forEach((aggregateMatchKey) => {
          const matchKey = aggregateMatchKey.replace(
            complexFieldCharacterSeparator,
            '.',
          );
          finalMatch = {
            ...finalMatch,
            [matchKey]: aggregateQuery[field][aggregateMatchKey],
          };
        });

        finalAggregateQuery.push(lookup);
        finalAggregateQuery.push(unwind);
        executeWithAggregate = true;
      }
    });

    const summaryQuery = [];

    if (Object.keys(aggregateQuery).length) {
      finalAggregateQuery.push(createMatch(finalMatch));
    }

    if (summary) {
      summaryQuery.push(...finalAggregateQuery);
      summaryQuery.push(createGroupBySummary(summary));

      summaryQuery.push({
        $project: {
          _id: 0,
          summary: summary.map((data) => `$${data.type}`),
        },
      });
    }

    if (querySort && querySort.length) {
      const sort: any = {};
      for (const field of querySort.split(' ')) {
        sort[field.replace('-', '')] = field.includes('-') ? -1 : 1;
      }

      finalAggregateQuery.push({
        $sort: sort,
      });
    }

    if (skip) {
      finalAggregateQuery.push({
        $skip: skip,
      });
    }

    if (limit !== -1 && limit !== undefined) {
      finalAggregateQuery.push({
        $limit: limit,
      });
    }

    return {
      query,
      aggregateQuery: finalAggregateQuery,
      executeWithAggregate,
      summaryQuery,
    };
  }
}
