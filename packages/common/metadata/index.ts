export const SUPPORTED_ASSETS = ["sol","btc","eth","usdc"]

export type TradingMetaData = {
    type : "Long" | "Short",
    qty : number,
    symbol : typeof SUPPORTED_ASSETS[number]
}

export type timeNodeMetaData = {
    time : number
}

export type priceTriggerMetaData = {
    asset : string,
    price : number
}