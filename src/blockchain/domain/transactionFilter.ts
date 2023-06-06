import { Transaction } from "src/schemas/transaction.schema"
import Web3 from "web3"
import { Abi } from "./abi"
import { Block } from "./block"
import { BlockTransaction } from "./transaction"

export function transactionFilter(web3: Web3, block: Block): Transaction[] {
    // filter by address
    return block.transactions
        .filter(x => x.to == Abi.dai_contract_address)
        // select only transfer transactions
        .filter(x => Abi.isTransfer(web3, x.input))
        // parse erc20 token data
        .map(x => { return { ...x, timestamp: new Date(block.timestamp * 1000), token: Abi.parseTransfer(web3, x.input) } })
}