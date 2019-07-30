
For the curcuit breaker, I decided to create a modifier that ensures the bool isStopped is false. I used the modifier whenever an important function was run to ensure that the freelancer hadn't already stopped the contract between the freelancer and their employeer. 

For example, in order to approve a request using the approveRequest function, the freelancer must have not clicked the button that indicates the initiation of the circutbreaker pattern 

//Why not others

It is wise to implement a “circuit breaker” function modifier that prevents all app functionality if a catastrophic event occurs. This functionality should be used in tandem with Ownable so that only the contract owner can pause/unpause the app. This is useful for buying time in dire situations and analyzing what went wrong and how to fix it. Though some users may protest about the lack of decentralization in this approach, sometime after deployment you could simply transfer contract ownership to the 0x0 address, preventing anyone from calling Ownable functions.