
## Emeregency Stop
For the curcuit breaker, I decided to create a modifier that ensures the bool isStopped is false. I used the modifier whenever an important function was run to ensure that the freelancer hadn't already stopped the contract between the freelancer and their employeer. 

For example, in order to approve a request using the approveRequest function, the freelancer must have *not* clicked the button that indicates the initiation of the circutbreaker pattern 


## Access Restriction 
Primary administrative functionalities are restricted to the appropriate addresses through modifiers. For instance, only freelancers can create and stop a contract. 

