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
