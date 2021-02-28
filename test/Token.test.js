import { tokens } from './helpers'
import { EVM_REVERT } from './helpers'

const Token = artifacts.require('./Token')

require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('Token', ([deployer, reciever, sender]) => {
  const name = 'Alex Token'
  const symbol = 'ALEX'
  const decimals = '18'
  const totalSupply = tokens(1000000).toString()
  let token

  beforeEach(async () => {
    token = await Token.new()
  })

  describe('deployment', () => {

    it('tracks the name', async () => {
      const result = await token.name()
      result.should.equal(name)
    })

    it('tracks the symbol', async () => {
      const result = await token.symbol()
      result.should.equal(symbol)
    })

    it('tracks the decimals', async () => {
      const result = await token.decimals()
      result.toString().should.equal(decimals)
    })

    it('tracks the total supply', async () => {
      const result = await token.totalSupply()
      result.toString().should.equal(totalSupply.toString())
    })

    it('it assigns the total supply to the deployer', async () => {
      const result = await token.balanceOf(deployer)
      result.toString().should.equal(totalSupply.toString())
    })
  })

  describe('sending tokens', () => {
    let result
    let amount

    describe('success', async() => {
      beforeEach(async () => {
        amount = tokens(100)
        result = await token.transfer(reciever, amount, {from: deployer})
      })

      it('transfers token balances', async() => {
        let balanceOf
        balanceOf = await token.balanceOf(deployer)
        balanceOf.toString().should.equal(tokens(999900).toString())
        balanceOf = await token.balanceOf(reciever)
        balanceOf.toString().should.equal(tokens(100).toString())
      })

      it('emits a transfer event', async() => {
        const log = result.logs[0]
        log.event.should.eq('Transfer')
        const event = log.args
        event.from.toString().should.equal(deployer, 'from is correct')
        event.to.toString().should.equal(reciever, 'to is correct')
        event.value.toString().should.equal(amount.toString(), 'value is correct')
      })
    })

    describe('failure', async() => {
      it('rejects insufficient balances', async() => {
        let invalidAmount;
        invalidAmount = tokens(1000000000) //1000 milion Invalid Supply
        await token.transfer(reciever, invalidAmount, { from: deployer }).should.be.rejectedWith(EVM_REVERT)

        //send tokens when you don't ahve none
        invalidAmount = tokens(10)
        await token.transfer(deployer, invalidAmount, { from: reciever}).should.be.rejectedWith(EVM_REVERT)
      })
      it('rejects invalid recpipients', async() => {
        await token.transfer(0x0, amount, { from: deployer }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})
