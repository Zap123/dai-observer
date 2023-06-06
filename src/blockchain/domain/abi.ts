import Web3 from "web3";
import { transfer_abi } from "./transfer_abi";

export class Abi {
    static readonly dai_contract_address: string =  "0x6B175474E89094C44Da98b954EedeAC495271d0F";

    static isTransfer(web3: Web3, input: string): boolean {
        let function_id = input.slice(0, 10);
        // hardcode function id for erc20 Transfer
        return (function_id == "0xa9059cbb")? true: false
    }

    static parseTransfer(web3: Web3, input: string): transfer_abi|null {
        // check function Id is transfer 0xa9059cbb
        // in a production application I would be using a library to parse the ABI of the smart contract
        // erc20 transfer(address dst, uint256 wad)
        // first 4 bytes contain the function Id

        if (this.isTransfer(web3, input)) {
            let parsed = web3.eth.abi.decodeParameters(['address', 'uint256'], input.slice(10))
            return { 'address': parsed[0], 'wad': web3.utils.fromWei(parsed[1], 'ether') }
        }
    }

    static isDaiTransactionInBloom(web3: Web3, bloom: string): boolean {
        // hardcode transfer abi
        const filter = web3.utils.sha3("Transfer(address,address,uint256)")
        let isAddressInBloom = web3.utils.isContractAddressInBloom(bloom, Abi.dai_contract_address)
        let isTopicInBloom = web3.utils.isTopicInBloom(bloom, filter)
        return isAddressInBloom && isTopicInBloom
    }
}