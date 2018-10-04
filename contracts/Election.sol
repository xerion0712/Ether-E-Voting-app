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

	uint public candidateCount;							//G.etter function declared automatically to access candidate count


	
	mapping(address => bool) public votersList;					//List to store voters that have voted with a getter function
	
	mapping(uint => Candidate) public candidateList;			//Getter function automatically declared to access candidates

	
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

	function vote (uint _candidateID) public				//Increase vote of candidate by one
	{
		votersList[msg.sender] = true;						//Set the voters address to true

		candidateList[_candidateID].voteCount ++;
	}
}