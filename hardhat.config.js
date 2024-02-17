require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter")
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */
const rinkebyUrl = process.env.RINKEBY_RPC_URL
const privateKey = process.env.PRIVATE_KEY
const etherscanKey = process.env.ETHERSCAN_API
module.exports = {
  networks:{
    rinkeby:{
      url: rinkebyUrl,
      accounts:[privateKey],
      chainId:11155111
    },
    localhost:{
      url: " http://127.0.0.1:8545/",
      //account:'0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      chainId:31337
    }
  },
  etherscan:{
    
    apiKey:etherscanKey,
  },
  gasReporter:{
    enabled:true,
  },
  solidity: "0.8.7",
};

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});