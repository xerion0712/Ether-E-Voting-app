pragma solidity ^0.4.24;

contract Election
{
	
	struct Candidate										//Candidate structure
	{
		uint id;
		string name;
		uint voteCount;
	}

	string public candidate;

	uint public candidateCount;							//getter function declared automatically cause of public


	

	mapping(uint => Candidate) public candidateList;

	
	function Election () public							//Constructor
	{
		addCandidate("Narendra Modi");
		addCandidate("Rahul Gandhi");
	}

	function addCandidate (string _name) private			//Function to add candidates
	{
		candidateCount ++;
		candidateList[candidateCount] = Candidate(candidateCount, _name, 0);
	}
}