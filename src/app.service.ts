import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { balanceService, WalletBalance } from './blockchain/domain/balance_service';
import { Transaction } from './schemas/transaction.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>) { }

  async retrieveTransactions(limit = 100, cursor_id?: ObjectId, recipient?: string | null, sender?: string | null): Promise<Transaction[]> {
    let query = {}
    // build optional query
    if (recipient != null)
      query['token.address'] = recipient
    if (sender != null)
      query['from'] = sender
    if (cursor_id != null)
      query['_id'] = { $gt: cursor_id }

    return await this.transactionModel.find(query).limit(limit).sort('desc')
  }

  async getBalance(wallet: string) : Promise<WalletBalance> {
    /*
      This compute the balance in memory which doesn't scale
      it would be better to use database aggregation techniques
      If I had more time I would have created another database table
      with the snapshot of the wallet, this way I could have updated
      the balance as soon as a new transaction arrive.
      Depending on the system the balance part could be another microservice
      or a dedicated database.
      Since I don't know the initial balance, a negative balance is allowed
    */
    let transactions = await this.transactionModel.find({
      $or: [{ from: wallet },
      { 'token.address': wallet }]
    })

    // calls the balance service to do domain balance calculation
    return balanceService(wallet,transactions)
  }
}
