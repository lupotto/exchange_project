import { tokens } from './helpers'
import { EVM_REVERT } from './helpers'

const Token = artifacts.require('./Token')

require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('Token', ([deployer, reciever, exchange]) => {
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

      it('emits a Transfer event', () => {
        const log = result.logs[0]
        log.event.should.eq('Transfer')
        const event = log.args
        event.from.toString().should.equal(deployer, 'from is correct')
        event.to.toString().should.equal(reciever, 'to is correct')
        event.value.toString().should.equal(amount.toString(), 'value is correct')
      })
    })

    describe('failure', () => {
      it('rejects insufficient balances', async() => {
        let invalidAmount;
        invalidAmount = tokens(1000000000) //1000 milion Invalid Supply
        await token.transfer(reciever, invalidAmount, { from: deployer }).should.be.rejectedWith(EVM_REVERT)

        //send tokens when you don't ahve none
        invalidAmount = tokens(10)
        await token.transfer(deployer, invalidAmount, { from: reciever}).should.be.rejectedWith(EVM_REVERT)
      })
      it('rejects invalid recipients', () => {
         token.transfer(0x0, amount, { from: deployer }).should.be.rejected
      })
    })
  })

  describe('approving tokens', () => {
    let result
    let amount

    beforeEach(async () => {
      amount = tokens(100)
      result = await token.approve(exchange, amount, {from: deployer})
    })

    describe('success', () => {
      it('allocates an allowance for delegated token spending on exchange', async() => {
        const allowance = await token.allowance(deployer, exchange)
        allowance.toString().should.equal(amount.toString())
      })

      it('emits an Approval event', () => {
        let log = result.logs[0]
        log.event.should.eq('Approval')
        log.args.owner.should.equal(deployer.toString(), 'owner adress correct')
        log.args.spender.should.equal(exchange.toString(), 'spender/echange adress correct')
        log.args.value.toString().should.equal(amount.toString(), 'amount correct')
      })
    })
    describe('failure', () => {
      it('rejects invalid spenders', () => {
         token.transfer(0x0, amount, { from: deployer }).should.be.rejected
      })
    })
  })

  describe('delegated token transfers', () => {
    let result
    let amount

    beforeEach(async () => {
      amount = tokens(100)
      await token.approve(exchange, amount, { from: deployer })
    })

    describe('success', async() => {
      beforeEach(async () => {
        result = await token.transferFrom(deployer, reciever, amount, {from: exchange})
      })

      it('transfers token balances', async() => {
        let balanceOf
        balanceOf = await token.balanceOf(deployer)
        balanceOf.toString().should.equal(tokens(999900).toString())
        balanceOf = await token.balanceOf(reciever)
        balanceOf.toString().should.equal(tokens(100).toString())
      })

      it('it resets the allowance', async() => {
        const allowance = await token.allowance(deployer, exchange)
        allowance.toString().should.equal('0')
      })

      it('emits a Transfer event', () => {
        const log = result.logs[0]
        log.event.should.eq('Transfer')
        const event = log.args
        event.from.toString().should.equal(deployer, 'from is correct')
        event.to.toString().should.equal(reciever, 'to is correct')
        event.value.toString().should.equal(amount.toString(), 'value is correct')
      })
    })

    describe('failure', () => {

      it('rejects insufficient balances', () => {
        let invalidAmount;
        invalidAmount = tokens(1000000000) //1000 milion Invalid Supply
        token.transferFrom(deployer, reciever, invalidAmount, { from: exchange }).should.be.rejectedWith(EVM_REVERT)
      })
      it('rejects invalid recipients', async() => {
         await token.transferFrom(deployer, 0x0, amount, { from: exchange }).should.be.rejected
      })
    })
  })
})
