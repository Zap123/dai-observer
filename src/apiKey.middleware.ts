
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { ApiLog } from './schemas/apilog.schema';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(@InjectModel(ApiLog.name) private readonly apilogModel: Model<ApiLog>){

  }
  async use(req: Request, res: Response, next: NextFunction) {
    const apikey = req.headers["x-apikey"] as string
    if(!apikey)
      res.status(401).json('Unauthenticated, header x-apikey is required (use a random string)');
    else{
      // Log request
      let log:ApiLog = {
        timestamp: new Date(),
        apikey: apikey,
        method: req.method,
        path: req.baseUrl,
        ip: req.ip,
        query: JSON.stringify(req.query),
        body: JSON.stringify(req.body)
      } 
      let model = new this.apilogModel(log)
      await model.save()
      next()
    }
  }
}
