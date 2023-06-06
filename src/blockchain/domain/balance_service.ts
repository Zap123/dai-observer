import { ApiProperty } from "@nestjs/swagger";
import { Transaction } from "../../schemas/transaction.schema";

export function balanceService(wallet: string, transactions: Transaction[]): WalletBalance {
    let balance = 0
    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i]
        // I'm sending money
        if (t.from == wallet) balance -= Number(t.token.wad)
        // I'm receiving money
        if (t.token.address == wallet) balance += Number(t.token.wad)
    }

    return { wallet: wallet, balance: balance }
}

export class WalletBalance {
    @ApiProperty()
    'wallet': string
    @ApiProperty()
    'balance': number
}