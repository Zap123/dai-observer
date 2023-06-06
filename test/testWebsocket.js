var Web3 = require('web3');

const testWebsocket = ""
const web3 = new Web3(testWebsocket);

let subscription = web3.eth.subscribe('newBlockHeaders', async function(error, result){
    if (!error)
        console.log(JSON.stringify(result));
        let block = await web3.eth.getBlock(result.number, true)
        console.log(JSON.stringify(block))
})
