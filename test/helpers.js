const EVM_REVERT = 'VM Expection while processing transaction: revert'
export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

export const ether = (n) => {
  return new web3.utils.BN(
    web3.utils.toWei(n.toString(), 'ether')
  )
}

//same as ETHER
export const tokens = (n) => ether(n)
