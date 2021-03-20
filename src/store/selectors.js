import { get, reject, groupBy } from 'lodash'
import { createSelector } from 'reselect'
import {ETHER_ADDRESS, tokens, ether, GREEN, RED} from '../helpers'
import moment from 'moment'

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, (a) => {return a} )

const tokenLoaded = state => get(state, 'token.loaded', false)
export const tokenLoadedSelector = createSelector(tokenLoaded, (tl) => {return tl})

const exchangeLoaded = state => get(state, 'exchange.loaded', false)
export const exchangeLoadedSelector = createSelector(exchangeLoaded, (el) => {return el})

const exchange = state => get(state, 'exchange.contract')
export const exchangeSelector = createSelector(exchange, (e) => {return e})

export const contractsLoadedSelector = createSelector(
  tokenLoaded,
  exchangeLoaded,
  (tl, el) => (tl && el)
)

//All Orders
const allOrdersLoaded = state => get(state, 'exchange.allOrders.loaded', false)
const allOrders = state => get(state, 'exchange.allOrders.data', [])

//Cancelled orders
const cancelledOrdersLoaded = state => get(state, 'exchange.cancelledOrders.loaded', false)
export const cancelledOrdersLoadedSelector = createSelector(cancelledOrdersLoaded, (loaded) => {return loaded})

const cancelledOrders = state => get(state, 'exchange.cancelledOrders.data', [])
export const cancelledOrderSelector = createSelector(cancelledOrders, (o) => {return o})

//Filled Orders
const filledOrdersLoaded = state => get(state, 'exchange.filledOrders.loaded', false)
export const filledOrdersLoadedSelector = createSelector(filledOrdersLoaded, (loaded) => {return loaded})

const filledOrders = state => get(state, 'exchange.filledOrders.data', [])
export const filledOrdersSelector = createSelector(
  filledOrders,
  (orders) => {
    //sort orders by date ascending for price comparison
    orders = orders.sort((a,b) => b.timestamp - a.timestamp)
    //decorate the orders
    orders = decorateFilledOrders(orders)
    //sort orders by date descending for display
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    return orders
  }
)

const decorateFilledOrders = (orders) => {
  //Track previous order to compare history
  let previousOrder = orders[0]
  return(
    orders.map((order) => {
      order = decorateOrder(order)
      order = decorateFilledOrder(order, previousOrder)
      previousOrder = order // Update the previous order once it's decorated
      return order
    })
  )
}

const decorateOrder = (order) => {
  let etherAmount
  let tokenAmount

  //if tokenGive
  if(order.tokenGive === ETHER_ADDRESS){
    etherAmount = order.amountGive
    tokenAmount = order.amountGet
  } else {
    etherAmount = order.amountGet
    tokenAmount = order.amountGive
  }

  //Calculate token price to 5 decimal places
  const precision = 100000
  let tokenPrice = (etherAmount / tokenAmount)
  tokenPrice = Math.round(tokenPrice * precision) / precision

  return({
    etherAmount: ether(etherAmount),
    tokenAmount: tokens(tokenAmount),
    tokenPrice : tokenPrice,
    formattedTimestamp: moment.unix(order.timestamp).format('h:mm:ss a M/D')
  })
}

const decorateFilledOrder = (order, previousOrder) => {
  return({
    ...order,
    tokenPriceClass: tokenPriceClass(order.tokenPrice, order.id, previousOrder)
  })
}

const tokenPriceClass = (tokenPrice, orderId, previousOrder) => {
  // Show green price if order price highe than previous order
  // Show red price if order price lower than previous order
  if(previousOrder.tokenPrice <= tokenPrice){
    return GREEN //success
  } else {
    return RED //danger
  }
}

//SUbstract de filled orders & cancelles orders from allOrders
const openOrders = state => {
  const all = allOrders(state)
  const cancelled = cancelledOrders(state)
  const filled = filledOrders(state)

  const openOrders = reject(all, (order) => {
    const orderFilled = filled.some((o) => o.id === order.id)
    const orderCancelled = cancelled.some((o) => o.id === order.id)
    return (orderFilled || orderCancelled)
  })

  return openOrders
}

//Depended
const orderBookLoaded = state => cancelledOrdersLoaded(state) && filledOrdersLoaded(state) && allOrdersLoaded(state)

//Create the order book
export const orderBookSelector = createSelector(
  openOrders,
  (orders) => {
    orders = decorateOrderBookOrders(orders)
    // Group orders by "orderType"
    orders = groupBy(orders, 'orderType')

    //Fetch buy orders
    const buyOrders = get(orders, 'buy', [])
    //Sort buy orders by token price
    orders = {
      ...orders,
      buyOrders: buyOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
    }

    //Fetch buy orders
    const sellOrders = get(orders, 'sell', [])
    //Sort buy orders by token price
    orders = {
      ...orders,
      buyOrders: sellOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
    }
    return orders
  }
)

const decorateOrderBookOrders = (orders) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order)
      order = decorateOrderBookOrder(order)
      return(order)
    })
  )
}

const decorateOrderBookOrder = (order) => {
  const orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell'
  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED),
    orderFillClass: (orderType === 'buy' ? 'sell' : 'buy')
  })
}
