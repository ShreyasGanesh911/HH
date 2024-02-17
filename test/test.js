const {ethers} = require('hardhat')
const {assert,expect} = require('chai')

describe("SimpleStorage",async()=>{
    let contract,deploy;

    beforeEach(async()=>{
        deploy = await ethers.getContractFactory("SimpleStorage")
        contract = await deploy.deploy()
    })

    it("Test for data retrival for inital value of 0",async()=>{
        const data = await contract.retrieve()
        assert.equal(data.toString(),"0")
    })

    it("should store a number in store function",async()=>{
        const transactionStore =await  contract.store("7")
        await transactionStore.wait(1)
        const data = await contract.retrieve()
        assert.equal(data.toString(),"7")
    })
})