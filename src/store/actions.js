export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    connection:connection
  }
}
//WEB3
export function web3AccountLoaded(account) {
  return {
    type: 'WEB3_ACCOUNT_LOADED',
    account:account
  }
}
//TOKEN
export function tokenLoaded(contract) {
  return {
    type: 'TOKEN_LOADED',
    contract: contract
  }
}
//EXCHANGE
export function exchangeLoaded(contract) {
  return {
    type: 'EXCHANGE_LOADED',
    contract: contract
  }
}
//Cancelled orders
export function cancelledOrdersLoaded(cancelledOrders){
  return {
    type: 'CANCELLED_ORDERS_LOADED',
    cancelledOrders: cancelledOrders
  }
}
//Filled orders
export function filledOrdersLoaded(filledOrders){
  return {
    type: 'FILLED_ORDERS_LOADED',
    filledOrders: filledOrders
  }
}

//All orders
export function allOrdersLoaded(allOrders){
  return {
    type: 'ALL_ORDERS_LOADED',
    allOrders: allOrders
  }
}

//All orders
export function orderCancelling(){
  return {
    type: 'ORDER_CANCELLING'
  }
}

//Cancelled order
export function orderCancelled(order){
  return {
    type: 'ORDER_CANCELLED',
    order: order
  }
}

//All orders
export function orderFilling(){
  return {
    type: 'ORDER_FILLING'
  }
}

//Cancelled order
export function orderFilled(order){
  return {
    type: 'ORDER_FILLED',
    order: order
  }
}

//Balances
export function etherBalanceLoaded(balance){
  return {
    type: 'ETHER_BALANCE_LOADED',
    balance: balance
  }
}

//Balances
export function tokenBalanceLoaded(balance){
  return {
    type: 'TOKEN_BALANCE_LOADED',
    balance: balance
  }
}

//Balances
export function exchangeEtherBalanceLoaded(balance){
  return {
    type: 'EXCHANGE_ETHER_BALANCE_LOADED',
    balance: balance
  }
}

export function exchangeTokenBalanceLoaded(balance){
  return {
    type: 'EXCHANGE_TOKEN_BALANCE_LOADED',
    balance: balance
  }
}

export function balancesLoaded(){
  return {
    type: 'BALANCES_LOADED'
  }
}

export function balancesLoading(){
  return {
    type: 'BALANCES_LOADING'
  }
}

export function etherDepositAmountChanged(amount){
  return {
    type: 'ETHER_DEPOSIT_AMOUNT_CHANGED',
    amount: amount
  }
}

export function etherWithdrawAmountChanged(amount){
  return {
    type: 'ETHER_WITHDRAW_AMOUNT_CHANGED',
    amount: amount
  }
}

export function tokenDepositAmountChanged(amount){
  return {
    type: 'TOKEN_DEPOSIT_AMOUNT_CHANGED',
    amount: amount
  }
}

export function tokenWithdrawAmountChanged(amount){
  return {
    type: 'TOKEN_WITHDRAW_AMOUNT_CHANGED',
    amount: amount
  }
}


// Buy Order
export function buyOrderAmountChanged(amount) {
  return {
    type: 'BUY_ORDER_AMOUNT_CHANGED',
    amount
  }
}

export function buyOrderPriceChanged(price) {
  return {
    type: 'BUY_ORDER_PRICE_CHANGED',
    price
  }
}

export function buyOrderMaking(price) {
  return {
    type: 'BUY_ORDER_MAKING'
  }
}

// Generic Order
export function orderMade(order) {
  return {
    type: 'ORDER_MADE',
    order
  }
}

// Sell Order
export function sellOrderAmountChanged(amount) {
  return {
    type: 'SELL_ORDER_AMOUNT_CHANGED',
    amount
  }
}

export function sellOrderPriceChanged(price) {
  return {
    type: 'SELL_ORDER_PRICE_CHANGED',
    price
  }
}

export function sellOrderMaking(price) {
  return {
    type: 'SELL_ORDER_MAKING'
  }
}
