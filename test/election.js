var Election = artifacts.require("./Election.sol")

contract("Election",function(accounts)
{
	var electionInstance;

	it("Initialized with 2 candidates", function()
	{
		return Election.deployed().then(function(instance)
		{
			return instance.candidateCount();
		}).then(function(count)
		{
			assert.equal(count,2);
		});
	});


	it("Initialized with correct values", function()
	{
		return Election.deployed().then(function(instace)
		{
			electionInstance = instace;

			return electionInstance.candidateList(1);
		}).then(function(cand)
			{
				assert.equal(cand[0],1,"ID is correct");
				assert.equal(cand[1],"Narendra Modi","Name is correct");
				assert.equal(cand[2],0,"Vote count is correct");
			return electionInstance.candidateList(2);
			}).then(function(cand)
				{
					assert.equal(cand[0],2,"ID is correct");
					assert.equal(cand[1],"Rahul Gandhi","Name is correct");
					assert.equal(cand[2],0,"Vote count is correct");
				});
	});
});