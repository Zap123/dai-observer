import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { AppService } from './app.service';
import { WalletBalance } from './blockchain/domain/balance_service';
import { Transaction } from './schemas/transaction.schema';
@ApiHeader({
  name: 'X-ApiKey',
  description: 'API Key',
})
@Controller("")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("transactions")
  @ApiQuery({ name: 'cursor_id', required: false })
  @ApiQuery({ name: 'sender', required: false })
  @ApiQuery({ name: 'recipient', required: false })
  @ApiResponse({ status: 200, description: 'A list of the latest 100 Dai transactions, cursor-based pagination with cursor_id and filter by sender, recipient', type: [Transaction]})
  async getTransactions(
    @Query('cursor_id') cursor_id?: ObjectId,
    @Query('sender') sender?: string,
    @Query('recipient') recipient?: string): Promise<Transaction[]> {
    return await this.appService.retrieveTransactions(100, cursor_id, recipient, sender)
  }
  @Get("balance/:wallet")
  @ApiResponse({ status: 200, description: 'The balance of the wallet', type: WalletBalance})
  async getBalance(
    @Param('wallet') wallet: string): Promise<WalletBalance> {
    return await this.appService.getBalance(wallet)
  }


}
