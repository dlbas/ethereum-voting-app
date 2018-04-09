# Ethereum Voting App 

This is a voting app built on *Ethereum* blockchain, written with *Solidity* and *JavaScript* with [web3.js](https://github.com/ethereum/web3.js/) and [Truffle](http://truffleframework.com/) frameworks.

## Usage
This voting app has web interface with which you can easily interact with smart-contract. For thois you will need a Chrome of Firefox web browser with MetaMask app installed.
You can run your own voting, vote and see the results with this app. Voting is only shared with ones you want to. You always can add or delete voters.

### Requirements
* Node.js at least 7.0.0
* npm
* truffle for development

### Installation
* Clone this repository into your local machine.
* Run ```npm install``` to load all dependencies.
* Run ```npm run dev``` to run this app on your localhost.

### Contract functions
```
function startVoting(
	    string _name, 
	    string _text,
	    uint32 _expiresIn,
	    address[] _voters) public
```
Create your voting takes name, text, voting time in seconds and an array of addresses, which essentially are voters you whant to vote.

```
function addToWhitelist(address _address, uint _votingId) public
	    onlyOwner
```
Add an account to the list of voters.

```
function removeFromWhitelist(address _address, uint _votingId) public
	    onlyOwner
```
Remove an account from the list of voters.

```
function vote(bool _vote, uint _votingId)
	    public 
	    votingExists(_votingId)
	    isInWhitelist(_votingId)
	    isVotingActive(_votingId)
	    hasAlreadyVoted(_votingId)
```
Function for voting. Takes vote value (true or false for 'yes' or 'now') and voting id.

```
function getResults(uint _votingId)
	    public
	    view
	    votingExists(_votingId)
	    returns (uint, uint)
```
Function which return results for given voting. Takes id of your voting. Retruns yes and no count.

*This repository is still in development...*
