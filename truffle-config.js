require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey')
const privateKeys = process.env.PRIVATE_KEYS || ""
// INFURA: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`
// KOVAN:  2efcc219bf58464198cf5a9afb7053d3
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: function(){
        return new HDWalletProvider(
          //Private key
          privateKeys.split(','), //Array of account private keys
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas:2900000,
      network_id: 3
    }
  },
  contracts_directory: './src/contracts',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
