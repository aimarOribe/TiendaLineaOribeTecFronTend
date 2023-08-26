export interface CarritoPaypal {
    name: string,
    quantity: string,
    unit_amount: Unit_amount
}

export interface Unit_amount {
    currency_code: string,
    value: string,
}