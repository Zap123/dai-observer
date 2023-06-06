import { Test, TestingModule } from '@nestjs/testing';
import { Abi } from './abi';
import { transactionFilter } from './transactionFilter';
let Web3 = require('web3');
import { Block } from "./block"
import { Transaction } from 'src/schemas/transaction.schema';
import { transfer_abi } from './transfer_abi';
import { BlockTransaction } from './transaction';

function getEmptyBlock(){
  return {
    baseFeePerGas: 0,
    difficulty: '',
    extraData: '',
    gasLimit: 0,
    gasUsed: 0,
    hash: '',
    logsBloom: '',
    miner: '',
    mixHash: '',
    nonce: '',
    number: 0,
    parentHash: '',
    receiptsRoot: '',
    sha3Uncles: '',
    size: 0,
    stateRoot: '',
    timestamp: 0,
    totalDifficulty: '',
    transactions: [],
    transactionsRoot: '',
    uncles: []
  }
}

describe('TransactionFilter', () => {
  let web3;
  const inputWithTransferABI = "0xa9059cbb000000000000000000000000b6f5de39742eeca134a2b4cda5ad4f43617e8f6500000000000000000000000000000000000000000000002a48acab6204b00000"
  beforeEach(async () => {
    web3 = new Web3
  });

  describe('Transactionfilter tests', () => {
    it('should not fail when array is empty"', () => {
      let transactions = transactionFilter(web3, getEmptyBlock())
      expect(transactions).toStrictEqual([])
    });

    it('should add abi to transaction"', () => {
      let testBlock: Block = {
        ...getEmptyBlock()
      }

      let transaction:BlockTransaction = {
        blockHash: '',
        blockNumber: 0,
        from: '',
        gas: 0,
        gasPrice: '',
        hash: '',
        input: inputWithTransferABI,
        nonce: 0,
        to: Abi.dai_contract_address,
        transactionIndex: 0,
        value: '',
        type: 0,
        chainId: '',
        v: '',
        r: '',
        s: '',
        maxFeePerGas: '',
        maxPriorityFeePerGas: '',
        accessList: []
      }

      testBlock.transactions.push(transaction)
      let transactions = transactionFilter(web3, testBlock)
      expect(transactions[0].token).toStrictEqual({
        'address': '0xb6F5dE39742eeCA134A2B4CdA5ad4f43617e8f65',
        'wad': '780'
      })
    });


    it('should filter non smart contract transactions"', () => {
      let testBlock: Block = {
        ...getEmptyBlock()
      }

      let nonSmartContractTransaction:BlockTransaction = {
        blockHash: '0xc9607397d6119e0c39c5eb433cae93672946a4db42416cbad636f03813f3de59',
        blockNumber: 0,
        from: '',
        gas: 0,
        gasPrice: '',
        hash: '',
        input: inputWithTransferABI,
        nonce: 0,
        to: '',
        transactionIndex: 0,
        value: '',
        type: 0,
        chainId: '',
        v: '',
        r: '',
        s: '',
        maxFeePerGas: '',
        maxPriorityFeePerGas: '',
        accessList: []
      }

      let smartContractTransaction = {...nonSmartContractTransaction, to: Abi.dai_contract_address, transactionIdex: 1}

      testBlock.transactions.push({...nonSmartContractTransaction}, {...nonSmartContractTransaction}, {...nonSmartContractTransaction}, smartContractTransaction)
      let transactions = transactionFilter(web3, testBlock)
      expect(transactions.length).toBe(1)
      expect(transactions[0].blockHash).toBe(smartContractTransaction.blockHash)
      expect(transactions[0].transactionIndex).toBe(smartContractTransaction.transactionIndex)
    });

    it('should filter non transfer"', () => {
      let testBlock: Block = {
        ...getEmptyBlock()
      }

      let nonSmartContractTransaction:BlockTransaction = {
        blockHash: '0xc9607397d6119e0c39c5eb433cae93672946a4db42416cbad636f03813f3de59',
        blockNumber: 0,
        from: '',
        gas: 0,
        gasPrice: '',
        hash: '',
        input: '',
        nonce: 0,
        to: Abi.dai_contract_address,
        transactionIndex: 0,
        value: '',
        type: 0,
        chainId: '',
        v: '',
        r: '',
        s: '',
        maxFeePerGas: '',
        maxPriorityFeePerGas: '',
        accessList: []
      }

      let smartContractTransaction = {...nonSmartContractTransaction,input:inputWithTransferABI, to: Abi.dai_contract_address, transactionIdex: 1}

      testBlock.transactions.push({...nonSmartContractTransaction}, {...nonSmartContractTransaction}, {...nonSmartContractTransaction}, smartContractTransaction)
      let transactions = transactionFilter(web3, testBlock)
      expect(transactions.length).toBe(1)
      expect(transactions[0].blockHash).toBe(smartContractTransaction.blockHash)
      expect(transactions[0].transactionIndex).toBe(smartContractTransaction.transactionIndex)
    });
  });
});
