
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { transfer_abi } from '../blockchain/domain/transfer_abi';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
    @ApiProperty()
    @Prop()
    timestamp: Date
    @ApiProperty()
    @Prop()
    blockHash: string;
    @ApiProperty()
    @Prop()
    blockNumber: number;
    @ApiProperty()
    @Prop()    
    from: string;
    @ApiProperty()
    @Prop()
    gas: number;
    @ApiProperty()
    @Prop()
    gasPrice: string;
    @ApiProperty()
    @Prop()
    hash: string;
    @ApiProperty()
    @Prop()
    input: string;
    @ApiProperty()
    @Prop()
    nonce: number;
    @ApiProperty()
    @Prop()
    to: string;
    @ApiProperty()
    @Prop()
    transactionIndex: number;
    @ApiProperty()
    @Prop()
    value: string;
    @ApiProperty()
    @Prop()
    type: number;
    @ApiProperty()
    @Prop()
    chainId: string;
    @ApiProperty()
    @Prop()
    v: string;
    @ApiProperty()
    @Prop()
    r: string;
    @ApiProperty()
    @Prop()
    s: string;
    @ApiProperty()
    @Prop()
    maxFeePerGas: string;
    @ApiProperty()
    @Prop()
    maxPriorityFeePerGas: string;
    @ApiProperty()
    @Prop()
    token: transfer_abi;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
