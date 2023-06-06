import { Test, TestingModule } from '@nestjs/testing';
import { Abi } from './abi';
let Web3 = require('web3');

describe('Abi', () => {
  let web3;
  const inputWithTransferABI = "0xa9059cbb000000000000000000000000b6f5de39742eeca134a2b4cda5ad4f43617e8f6500000000000000000000000000000000000000000000002a48acab6204b00000"
  const bloomWithTransferABI ="0xceeb50bcfffe998cccdea681b13b73b3ffb0f64badc10f7633bdf6f9d7afd7569b8e49278cff1c60a9822f4d5e2d4fef73314abb0fafb1253575f3dfd6ffad746775cf8e77655ae9ffa8b71dfc30e4f891d9f6e35ff79f5a7b00dad589e1fc923b795b3276ebc0a227408b2fe7ba7b523f09ba253b9f0ffe42b1dfda68dff87e6673c165009e7dfe3beb6edc2737e6d69f558cdf3d254d5d2521affd73bcfda4ffd9f3cfd03aef5a4c9efaaedf729fe1f5b7df99fdabe9be3e7a666e8e5d87f105bff6b76fe58d5b6a6831b67dffd50e059d6a4636af2c521e0649be04d47b00e7b9bd3d9f4b5629223cdefcd525afaf966eba6f2c094768f9cadbd3e76926a6"
  const bloomWithoutTransferABI ="0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000004000000000000200000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000"
  beforeEach(async () => {
    web3 = new Web3
  });

  describe('Abi tests', () => {
    it('should find a Transfer ABI in input"', () => {
      let isTransfer = Abi.isTransfer(web3, inputWithTransferABI)
      expect(isTransfer).toBe(true);
    });

    it('should not find a Transfer ABI in input"', () => {
      let isTransfer = Abi.isTransfer(web3, "0xa9359cbb000000000000000000000000b6f5de39742eeca134a2b4cda5ad4f43617e8f6500000000000000000000000000000000000000000000002a48acab6204b00000")
      expect(isTransfer).toBe(false);
    });

    it('should parse transfer abi in input"', () => {
      let transfer = Abi.parseTransfer(web3, inputWithTransferABI)
      expect(transfer).toStrictEqual({
        'address': '0xb6F5dE39742eeCA134A2B4CdA5ad4f43617e8f65',
        'wad': '780'
      });
    });

    it('should find transfer abi in bloom"', () => {
      let bloom = Abi.isDaiTransactionInBloom(web3, bloomWithTransferABI)
      expect(bloom).toBe(true);
    });

    it('should not find transfer abi in bloom"', () => {
      let bloom = Abi.isDaiTransactionInBloom(web3, bloomWithoutTransferABI)
      expect(bloom).toBe(false);
    });
  });
});
