pragma solidity ^0.4.18;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}

contract VotingApp is Ownable {

	// event StartVoting(string _name, string _text, uint32 _expiresIn, address _initiator);
	// event Vote(bool _vote, uint _votingId);
	// event GetResults(uint _votingId, uint _yesCount, uint _noCount);

	struct Voting {
		string name;
		string text;
		uint32 expiresIn;
		uint32 startTime;
		uint32 yesCount;
		uint32 noCount;
		address initiator;
		mapping (address => bool) whitelist;
		mapping (address => bool) hasVoted;
	}

	mapping(uint => Voting) public votingIdToVoting;
	uint public votingsCount = 0;

	modifier votingExists(uint _votingId) {
		require(_votingId <= votingsCount);
		_;
	}
	
	modifier isInWhitelist(uint _votingId) {
	    require(votingIdToVoting[_votingId].whitelist[msg.sender] == true);
	    _;
	}
	
	modifier isVotingActive(uint _votingId) {
	    Voting storage _voting = votingIdToVoting[_votingId];
		require(now - _voting.startTime <= _voting.startTime + _voting.expiresIn);
		_;
	}
	
	modifier hasAlreadyVoted(uint _votingId) {
	    Voting storage _voting = votingIdToVoting[_votingId];
	    require(_voting.hasVoted[msg.sender] == false);
	    _;
	}

	function startVoting(
	    string _name, 
	    string _text,
	    uint32 _expiresIn,
	    address[] _voters) public {
		Voting memory voting = Voting(
		    _name,
		    _text,
    		_expiresIn * 1 days,
    		uint32(now),
    		0,
    		0,
    		msg.sender	    	
        );
		require(voting.expiresIn >= 1 days);	
		votingIdToVoting[votingsCount] = voting;
		for (uint i = 0; i < _voters.length; i++) {
		    addToWhitelist(_voters[i], votingsCount);
		}
		addToWhitelist(msg.sender, votingsCount);
		votingsCount++;
	}
	
	// onlyOwner
	function addToWhitelist(address _address, uint _votingId) public
	    onlyOwner
	{
	    Voting storage _voting = votingIdToVoting[_votingId];
	    _voting.whitelist[_address] = true;
	}
	
	// onlyOwner
	function removeFromWhitelist(address _address, uint _votingId) public
	    onlyOwner
	{
	    Voting storage _voting = votingIdToVoting[_votingId];
	    _voting.whitelist[_address] = false;
	}

    // Rewrite with SafeMath
	function vote(bool _vote, uint _votingId)
	    public 
	    votingExists(_votingId)
	    isInWhitelist(_votingId)
	    isVotingActive(_votingId)
	    hasAlreadyVoted(_votingId)
	{
	    Voting storage _voting = votingIdToVoting[_votingId];
		if (_vote == true) {
		    _voting.yesCount++;
		}
		else {
		    _voting.noCount++;
		}
	}

	function getResults(uint _votingId)
	    public
	    view
	    votingExists(_votingId)
	    returns (uint, uint) 
	{
		Voting storage _voting = votingIdToVoting[_votingId];
		return (_voting.yesCount, _voting.noCount);
	} 
}