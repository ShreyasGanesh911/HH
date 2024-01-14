require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-toolbox");
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
    }
  },
  etherscan:{
    //79T9A14Q48BZUKHC2HG4YT3V19R1RGXRWJ
    apiKey:etherscanKey,
  },
  solidity: "0.8.7",
};

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});