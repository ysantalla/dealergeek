import { Model } from 'mongoose';
import { Type } from '@nestjs/common';
import { ICrudService } from './icrud-service';
import { GetAllParams } from './get-all-query.args';
import { MongoQueryParsed } from './mongo-query-builder';
import { Ability } from '@casl/ability';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseDeleteOptions } from './interfaces/soft-delete.options';

export function MongooseGraphqlCrudService<T>(
  mongooseClass: any,
  mongooseDelete?: MongooseDeleteOptions,
): Type<ICrudService> {
  class MongooseGraphqlCrudServiceHost implements ICrudService {
    @InjectModel(mongooseClass.name || mongooseClass) model: Model<any> | any;

    async get(id: any, lean = true): Promise<any> {
      return this.model.findOne({ _id: id }).lean(lean);
    }

    async getOne(query: any): Promise<any> {
      return this.model.findOne(query).lean(true);
    }

    async find(query: any, projection?: any): Promise<any[]> {
      return this.model.find(query).select(projection).lean(true);
    }

    async getAll(
      query: GetAllParams,
      queryParsed: MongoQueryParsed,
    ): Promise<any[]> {
      if (queryParsed.executeWithAggregate) {
        const mongoQuery = this.model.aggregate([
          ...queryParsed.aggregateQuery,
        ]);

        return mongoQuery.exec();
      } else {
        const mongoQuery = this.model
          .find(queryParsed.query)
          .skip(query.skip)
          .sort(query.sorts);
        if (query.limit !== -1) {
          mongoQuery.limit(query.limit);
        }
        return mongoQuery.lean(true);
      }
    }

    async count(queryParsed: MongoQueryParsed): Promise<number> {
      if (queryParsed.executeWithAggregate) {
        const result = await this.model
          .aggregate([...queryParsed.aggregateQuery])
          .count('count')
          .exec();
        return result[0]?.count || 0;
      } else {
        if (mongooseDelete?.softDelete) {
          Object.assign(queryParsed.query, {
            deleted: false,
          });
        }
        return this.model.countDocuments(queryParsed.query);
      }
    }

    async summary(queryParsed: MongoQueryParsed): Promise<any[]> {
      const result = await this.model
        .aggregate([...queryParsed.summaryQuery])
        .exec();

      if (result.length > 0) {
        return result[0].summary || [];
      }

      return [];
    }

    async create(dto: any): Promise<any> {
      return this.model.create(dto);
    }

    async update(id: any, dto: any): Promise<any> {
      return this.model.findByIdAndUpdate(id, dto, { new: true }).lean(true);
    }

    async updateMany(query: any, dto: any): Promise<any> {
      return this.model.updateMany(query, dto);
    }

    async delete(id: any): Promise<any> {
      if (mongooseDelete?.softDelete) {
        await this.model.deleteById({ _id: id }).exec();
        return this.model.findOneDeleted({ _id: id }).lean(true);
      }
      return this.model.findByIdAndDelete(id).lean(true);
    }

    async deleteMany(ids: any[]): Promise<any> {
      if (mongooseDelete?.softDelete) {
        const data = await this.model
          .updateMany({ _id: { $in: ids } }, { deleted: true })
          .exec();

        return data?.nModified;
      }
      const data = await this.model.deleteMany({ _id: { $in: ids } }).exec();
      return data?.deletedCount;
    }

    async createMany(dto: any[]): Promise<any> {
      return this.model.insertMany(dto);
    }

    async aggregate(aggregations: any[]): Promise<any> {
      return this.model.aggregate(aggregations);
    }
  }

  return MongooseGraphqlCrudServiceHost;
}
