import { Injectable, Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from '../schemas/transaction.schema';
import { Block } from './domain/block';
import { blockHeader } from './domain/block_header';
import { Abi } from './domain/abi';
import { ConfigService } from '@nestjs/config';
import { transactionFilter } from './domain/transactionFilter';
let Web3 = require('web3');

// long running service to download blocks from the blockchain
@Injectable()
export class BlockchainService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
    private configService: ConfigService
  ) { }
  onApplicationBootstrap() {
    const web3 = new Web3(this.configService.get<string>('RPC_NODE_WEBSOCKET'));

    web3.eth.subscribe('newBlockHeaders', async (error, result: blockHeader) => {
      if (!error) {
        // skip blocks that don't contain Dai transactions
        if (!Abi.isDaiTransactionInBloom(web3, result.logsBloom))
          return;

        Logger.log(`Getting block ${result.number}`)
        // retrieve blocks and its transactions
        let block: Block = await web3.eth.getBlock(result.number, true)
        // filter transactions that are addressed to the smart contract
        const transactions = transactionFilter(web3, block)
         
        if(transactions.length > 0)
          await this.transactionModel.insertMany(transactions)
      }
    })

  }

}
