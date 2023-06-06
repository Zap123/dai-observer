
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApiLogDocument = ApiLog & Document;

@Schema()
export class ApiLog {
    @Prop()
    timestamp: Date
    @Prop()
    apikey: string;
    @Prop()
    method: string;
    @Prop()
    path: string;
    @Prop()
    ip: string;
    @Prop()
    query: string;
    @Prop()
    body: string
}

export const ApiLogSchema = SchemaFactory.createForClass(ApiLog);
