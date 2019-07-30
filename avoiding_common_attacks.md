
1. Avoided using any loops in the contract 

2. I used equire() statements over if statements wherever possible, because if the require() statement is not met, it will throw a revert that is transmitted to the function caller (such as a front end) and stop the function right then and there. if statements tend to fail silently, and can also lead to deeply-nested code that is harder to read.