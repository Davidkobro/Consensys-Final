
## Open Zeppelin 
1. The contract uses openzeppelin-solidity library for math operations.

##Require statements
2. I used require() statements over if statements wherever possible, because if the require() statement is not met, it will throw a revert that is transmitted to the function caller (such as a front end) and stop the function right then and there. if statements tend to fail silently, and can also lead to deeply-nested code that is harder to read.

## Withdrawal design pattern
3. I use the withdrawal design pattern by separatarating the contract accounting logic and the transfer logic. I do this by having a request pushed and then that request is verified by the employer. This extra step helps keep the contract safe from re-entrancy attacks.

## Timestamp Dependence
One possible design pattern could have been automatically paying a freelancer X minutes after the request has been made once the employer verified that the request was valid. However, I didn't want to be reliant on block times since transactions are in the mempool before they make it into a block and anyone can know what transactions are about to occur on the network.