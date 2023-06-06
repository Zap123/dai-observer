import { BlockTransaction } from "./transaction";

export interface Block {
    baseFeePerGas: number;
    difficulty: string;
    extraData: string;
    gasLimit: number;
    gasUsed: number;
    hash: string;
    logsBloom: string;
    miner: string;
    mixHash: string;
    nonce: string;
    number: number;
    parentHash: string;
    receiptsRoot: string;
    sha3Uncles: string;
    size: number;
    stateRoot: string;
    timestamp: number;
    totalDifficulty: string;
    transactions: BlockTransaction[];
    transactionsRoot: string;
    uncles: any[];
}



