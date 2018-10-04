var Election = artifacts.require("./Election.sol")

contract("Election",function(accounts)
{
	var electionInstance;

	it("Test to check the correct number of candidates", function()				//Test 1
	{
		return Election.deployed().then(function(instance)						//Deploy contract and get its instance
		{
			return instance.candidateCount();									//Get the candidate count
		}).then(function(count)
		{
			assert.equal(count,2);												//Ensure the count is correct
		});
	});


	it("Test to verify candidate details", function()							//Test 2	
	{
		return Election.deployed().then(function(instace)						//Deploy contract
		{
			electionInstance = instace;											//Store its instace

			return electionInstance.candidateList(1);							//Check for candidate 1
		}).then(function(cand)
			{
				assert.equal(cand[0],1,"ID is correct");
				assert.equal(cand[1],"Narendra Modi","Name is correct");
				assert.equal(cand[2],0,"Vote count is correct");
			return electionInstance.candidateList(2);							//Check for candidate 2
			}).then(function(cand)
				{
					assert.equal(cand[0],2,"ID is correct");
					assert.equal(cand[1],"Rahul Gandhi","Name is correct");
					assert.equal(cand[2],0,"Vote count is correct");
				});
	});


	it("Test to check the behaviour of the vote", function()					//Test 3
	{
		return Election.deployed().then(function(instance)						//Deploy the contract
		{
			electionInstance = instance;										//Store the copy of contract
			candID = 1;															

			return electionInstance.vote(candID,{from :accounts[0]});	//Content in {} is the metadata passed to the function and select the account which will vote
		}).then(function(receipt)										//Trigger a promise chain and return the receipt of the vote transaction
		{
			return electionInstance.votersList(accounts[0]);			//Read the account mapping, returns a bool value
		}).then(function(voted)
		{
			assert(voted,"The voter was marked as voted");				//Check if the returned bool value is true
			return electionInstance.candidateList(candID);				//Fetch the candidate from mapping
		}).then(function(cand)
		{
			var voteCount = cand[2];
			assert.equal(voteCount,1,"Increment was done by 1")			//Check if only 1 vote was registered	
		})
	});


	it("Test for validity of candidate", function()						//Test 4
	{
		return Election.deployed().then(function(instance)
		{
			electionInstance = instance;
			return electionInstance.vote(99,{from: accounts[1]})		//Choosing invalid candID, 99
		}).then(assert.fail).catch(function(error)
		{
			assert(error.message.indexOf('revert') >= 0, "Error message must contain revert");		//Error
			return electionInstance.candidateList(1);
		}).then(function(cand1)														//Check that state of contract remains same
		{
			var voteCount = cand1[2];
			assert.equal(voteCount,1, "Candidate 1 did not receive any votes");		//Cand 1 did not receive vote since he already got one in test 3
			return electionInstance.candidateList(2);
		}).then(function(cand2)
		{
			var voteCount = cand2[2];
			assert.equal(voteCount,0, "Candidate 2 did not receive any votes");		//Cand 2 vote is unaltered, 0
		});
	});

	it("Test for double voting", function()									//Test 5
	{
		return Election.deployed().then(function(instance)
		{
			electionInstance = instance;
			candID = 2;
			electionInstance.vote(2, {from:accounts[3]})					//Vote candidate 2 from account 3
			return electionInstance.candidateList[candID];					//Read candidate from mapping

		}).then(function(cand)
		{
			var voteCount = cand[2];									//Read the vote count of cand 2
			assert.equal(voteCount,1,"First vote accepted");			//First vote is registered
			return electionInstance.vote(2, {from:accounts[3]})			//Trying to vote from same account to same candidate
		}).then(assert.fail).catch(function(error)
		{
			assert(error.message.indexOf('revert') >= 0 ,"Error must contain revert");		//Error cause vote has been already registered
			return electionInstance.candidateList(1);										//Ensure the behaviour of contract is intact
		}).then(function(cand1)
		{
			var voteCount = cand1[2];
			assert.equal(voteCount,1, "Candidate 1 didnt receive any votes");
			return electionInstance.candidateList(2);
		}).then(function(cand2)
		{
			var voteCount = cand2[2];
			assert.equal(voteCount,1, "Candidate 2 didnt receive any votes");
		});
	});
});
