pragma solidity ^0.4.18;

contract VotingApp {

	// event StartVoting(string _name, string _text, uint32 _expiresIn, address _initiator);
	// event Vote(bool _vote, uint _votingId);
	// event GetResults(uint _votingId, uint _yesCount, uint _noCount);

	struct Voting {
		string name;
		string text;
		uint32 expiresIn;
		uint32 startTime;
		uint32 votesCount;
		address initiator;
		address[] voters;
		bool active;
		mapping(address => bool) voterToVote;
	}

	mapping(uint => Voting) public votingIdToVoting;
	uint public votingsCount = 0;

	modifier votingExists(uint _votingId) {
		require(_votingId <= votingsCount);
		_;
	}

	function startVoting(string _name, string _text, uint32 _expiresIn) public {
		address[] memory _voters;
		Voting memory voting = Voting(_name, _text, _expiresIn * 1 days, uint32(now), 0, msg.sender, _voters, true);
		require(voting.expiresIn >= 1 days);	
		votingIdToVoting[votingsCount] = voting;
		votingsCount++;
	}

	function vote(bool _vote, uint _votingId) public votingExists(_votingId) {
		Voting storage _voting = votingIdToVoting[_votingId];
		require(_voting.active == true);
		require(now - _voting.startTime <= _voting.startTime + _voting.expiresIn);
		_voting.voterToVote[msg.sender] = _vote;
		_voting.voters.push(msg.sender);
		_voting.votesCount++;

	}

	function getResults(uint _votingId) public view votingExists(_votingId) returns (uint, uint) {
		Voting storage _voting = votingIdToVoting[_votingId];
		uint yesCount = 0;
		for (uint i = 0; i < _voting.voters.length; i++) {
			if (votingIdToVoting[_votingId].voterToVote[_voting.voters[i]] == true) yesCount++;
		}
		return (yesCount, _voting.voters.length - yesCount);
	} 
}