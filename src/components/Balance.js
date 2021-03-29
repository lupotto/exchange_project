import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBalances } from '../store/interactions'
import { Tabs, Tab} from 'react-bootstrap'
import Spinner from './Spinner'
import {
  web3Selector,
  exchangeSelector,
  tokenSelector,
  accountSelector,
  etherBalanceSelector,
  tokenBalanceSelector,
  exchangeEtherBalanceSelector,
  exchangeTokenBalanceSelector,
  balancesLoadingSelector
} from '../store/selectors'

const showForm = (props) => {
  const {
    etherBalance,
    tokenBalance,
    exchangeEtherBalance,
    exchangeTokenBalance
  } = props

  return(
    <Tabs defaultActiveKey="deposit" className="bg-dark text-white">

      <Tab eventKey="deposit" title="Deposit" className="bg-dark">
        <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th> Token </th>
              <th> Wallet </th>
              <th> Exchange </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> ETH </td>
              <td> {etherBalance} </td>
              <td> {exchangeEtherBalance} </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-dark table-sm small">
          <tbody>
            <tr>
              <td> ALEX </td>
              <td> {tokenBalance} </td>
              <td> {exchangeTokenBalance} </td>
            </tr>
          </tbody>
        </table>

      </Tab>

      <Tab eventKey="withdraw" title="Withdraw" className="bg-dark">
        <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th> Token </th>
              <th> Wallet </th>
              <th> Exchange </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> ETH </td>
              <td> {etherBalance} </td>
              <td> {exchangeEtherBalance} </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-dark table-sm small">
          <tbody>
            <tr>
              <td> ALEX </td>
              <td> {tokenBalance} </td>
              <td> {exchangeTokenBalance} </td>
            </tr>
          </tbody>
        </table>
      </Tab>
    </Tabs>
  )
}


class Balance extends Component{
  componentDidMount(){
    this.loadBlockchainData()
  }

  async loadBlockchainData(props) {
    const {dispatch, web3, exchange, token, account} = this.props

    await loadBalances(dispatch, web3, exchange, token, account)
  }


  render(){
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          Balance
        </div>
        <div className="card-body">
            {this.props.showForm ? showForm(this.props) : <Spinner />}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  const balancesLoading = balancesLoadingSelector(state)

  return {
    account: accountSelector(state),
    exchange: exchangeSelector(state),
    token: tokenSelector(state),
    web3: web3Selector(state),
    etherBalance: etherBalanceSelector(state),
    tokenBalance: tokenBalanceSelector(state),
    exchangeEtherBalance: exchangeEtherBalanceSelector(state),
    exchangeTokenBalance: exchangeTokenBalanceSelector(state),
    balancesLoading,
    showForm: !balancesLoading
  }
}

export default connect(mapStateToProps)(Balance)
