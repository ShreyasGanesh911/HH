const {ethers,run,network} = require('hardhat')

const main = async()=>{
  const simpleStoragefactory = await ethers.getContractFactory("SimpleStorage")
  const contract = await simpleStoragefactory.deploy()
  console.log('deploying contract')
  // unlike the conventional way of writting contracts, if we dont specify the network(RPC) and private key by default hardhat sets it to hardhat network similar to Ganache
  const address = await contract.getAddress()
  console.log(address)
  // console.log(network.config)
  // hardhat chainId = 31337
  if(network.config.chainId===4 && process.env.ETHERSCAN_API){
    await contract.deploymentTransaction().wait(6)
    await verify(address,[])
  }
    
  let value = await contract.retrieve()
  console.log(value)

  const updateValue = await contract.store(69)
  await updateValue.wait(1)
   value = await contract.retrieve()
  console.log(value)

}

const verify = async(contractAddress,args)=>{
  console.log("verifying it please wait")
  try{
    await run("verify:verify",{
      address:contractAddress,
      constructorArguments:args,
    })
  }catch(e){
    if(e.message.toLowerCase().includes("already verified"))
      console.log("verified")
    else
      console.log(e)
  }



}
main().then(()=>process.exit(0)).catch((err)=>{
  console.log(err)
  process.exit(1)
})