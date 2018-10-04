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

	/*
	event votedEvent
	(
		uint indexed _candidateID 
	);
	*/

	
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
		

		require(!votersList[msg.sender]);								//Verify they havent voted before
		require(_candidateID > 0 && _candidateID <= candidateCount);	//Check if the candidate is valid
		
		

		votersList[msg.sender] = true;						//Set the voters address to true

		candidateList[_candidateID].voteCount ++;

		//votedEvent(_candidateID);							//Trigger event after voting to refresh the page
	}
}