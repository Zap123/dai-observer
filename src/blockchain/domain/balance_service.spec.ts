import { Transaction } from 'src/schemas/transaction.schema';
import { balanceService } from './balance_service';

describe('Balance Service', () => {
  const wallet = "0x0a82088e21b7e77eddd8332b4f986ba771024c8d"
  const secondaryWallet = "0x4ab1085a77343e8d364b6768891c9828a1162bfa"
  beforeEach(async () => {
  });

  // generate sending and receiving transactions (test facility)
  function generateTransaction(sending: boolean, value: number): Transaction {
    return {
      timestamp: undefined,
      blockHash: '',
      blockNumber: 0,
      from: sending ? wallet : secondaryWallet,
      gas: 0,
      gasPrice: '',
      hash: '',
      input: '',
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
      token: { 'wad': value.toString(), 'address': sending ? secondaryWallet : wallet }
    }
  }

  describe('Transactionfilter tests', () => {
    it('should compute balance with 0 transaction"', () => {
      let balance = balanceService(wallet, [])
      expect(balance.balance).toBe(0)
      expect(balance.wallet).toBe(wallet)
    });

    it('should compute sending balance"', () => {
      let transactions = []
      transactions.push(generateTransaction(true, 20), generateTransaction(true, 50), generateTransaction(true, 30))
      let balance = balanceService(wallet, transactions)
      expect(balance.balance).toBe(-100)
    });

    it('should compute receiving balance"', () => {
      let transactions = []
      transactions.push(generateTransaction(false, 20), generateTransaction(false, 50), generateTransaction(false, 30))
      let balance = balanceService(wallet, transactions)
      expect(balance.balance).toBe(100)
    });

    it('should compute zero sum balance"', () => {
      let transactions = []
      transactions.push(generateTransaction(false, 20), generateTransaction(false, 30), generateTransaction(true, 50))
      let balance = balanceService(wallet, transactions)
      expect(balance.balance).toBe(0)
    });


    it('should compute negative sum balance"', () => {
      let transactions = []
      transactions.push(generateTransaction(false, 20), generateTransaction(false, 30), generateTransaction(true, 100))
      let balance = balanceService(wallet, transactions)
      expect(balance.balance).toBe(-50)
    });

    it('should compute positive sum balance"', () => {
      let transactions = []
      transactions.push(generateTransaction(true, 20), generateTransaction(false, 300), generateTransaction(true, 200))
      let balance = balanceService(wallet, transactions)
      expect(balance.balance).toBe(80)
    });

  });
});
