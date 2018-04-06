App = {
	web3Provider: null,
	contracts: {},

	init: function() {
        return App.initWeb3();
    },

    initWeb3: function() {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/K7rOZDIgQy0mpT6caglD');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function() {
        $.getJSON('VotingApp.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var VotingAppArtifact = data.abi;
            App.contracts.VotingApp = TruffleContract({
                abi: VotingAppArtifact,
                contractName: 'VotingApp',
                deployedByteCode: '0x606060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806310e6e06c1461009e5780631315ba91146100cc578063211fcf1914610253578063214405fc1461027c57806355d1d1bb146102be57806381a60c0d146103ad5780638da5cb5b146103eb578063eb3892a814610440578063f2fde38b14610482575b600080fd5b34156100a957600080fd5b6100ca600480803515159060200190919080359060200190919050506104bb565b005b34156100d757600080fd5b6100ed60048080359060200190919050506106dc565b6040518080602001806020018863ffffffff1663ffffffff1681526020018763ffffffff1663ffffffff1681526020018663ffffffff1663ffffffff1681526020018563ffffffff1663ffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183810383528a818151815260200191508051906020019080838360005b838110156101ab578082015181840152602081019050610190565b50505050905090810190601f1680156101d85780820380516001836020036101000a031916815260200191505b50838103825289818151815260200191508051906020019080838360005b838110156102115780820151818401526020810190506101f6565b50505050905090810190601f16801561023e5780820380516001836020036101000a031916815260200191505b50995050505050505050505060405180910390f35b341561025e57600080fd5b6102666108ae565b6040518082815260200191505060405180910390f35b341561028757600080fd5b6102bc600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506108b4565b005b34156102c957600080fd5b6103ab600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803563ffffffff1690602001909190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050610985565b005b34156103b857600080fd5b6103ce6004808035906020019091905050610bb0565b604051808381526020018281526020019250505060405180910390f35b34156103f657600080fd5b6103fe610c23565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561044b57600080fd5b610480600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610c48565b005b341561048d57600080fd5b6104b9600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610d19565b005b60008160025481111515156104cf57600080fd5b82600115156001600083815260200190815260200160002060040160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151514151561054357600080fd5b8360006001600083815260200190815260200160002090508060020160009054906101000a900463ffffffff168160020160049054906101000a900463ffffffff160163ffffffff168160020160049054906101000a900463ffffffff1663ffffffff164203111515156105b657600080fd5b856000600160008381526020019081526020016000209050600015158160050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151514151561062f57600080fd5b6001600089815260200190815260200160002096506001151589151514156106935786600201600881819054906101000a900463ffffffff168092919060010191906101000a81548163ffffffff021916908363ffffffff160217905550506106d1565b86600201600c81819054906101000a900463ffffffff168092919060010191906101000a81548163ffffffff021916908363ffffffff160217905550505b505050505050505050565b6001602052806000526040600020600091509050806000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107885780601f1061075d57610100808354040283529160200191610788565b820191906000526020600020905b81548152906001019060200180831161076b57829003601f168201915b505050505090806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108265780601f106107fb57610100808354040283529160200191610826565b820191906000526020600020905b81548152906001019060200180831161080957829003601f168201915b5050505050908060020160009054906101000a900463ffffffff16908060020160049054906101000a900463ffffffff16908060020160089054906101000a900463ffffffff169080600201600c9054906101000a900463ffffffff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905087565b60025481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561091157600080fd5b60016000838152602001908152602001600020905060018160040160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550505050565b61098d610e6e565b600060e06040519081016040528087815260200186815260200162015180860263ffffffff1681526020014263ffffffff168152602001600063ffffffff168152602001600063ffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff16815250915062015180826040015163ffffffff1610151515610a1657600080fd5b816001600060025481526020019081526020016000206000820151816000019080519060200190610a48929190610ee6565b506020820151816001019080519060200190610a65929190610ee6565b5060408201518160020160006101000a81548163ffffffff021916908363ffffffff16021790555060608201518160020160046101000a81548163ffffffff021916908363ffffffff16021790555060808201518160020160086101000a81548163ffffffff021916908363ffffffff16021790555060a082015181600201600c6101000a81548163ffffffff021916908363ffffffff16021790555060c08201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050600090505b8251811015610b8a57610b7d8382815181101515610b6b57fe5b906020019060200201516002546108b4565b8080600101915050610b51565b610b96336002546108b4565b600260008154809291906001019190505550505050505050565b6000806000836002548111151515610bc757600080fd5b6001600086815260200190815260200160002091508160020160089054906101000a900463ffffffff1682600201600c9054906101000a900463ffffffff168163ffffffff1691508063ffffffff169050935093505050915091565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ca557600080fd5b60016000838152602001908152602001600020905060008160040160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d7457600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610db057600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60e060405190810160405280610e82610f66565b8152602001610e8f610f66565b8152602001600063ffffffff168152602001600063ffffffff168152602001600063ffffffff168152602001600063ffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610f2757805160ff1916838001178555610f55565b82800160010185558215610f55579182015b82811115610f54578251825591602001919060010190610f39565b5b509050610f629190610f7a565b5090565b602060405190810160405280600081525090565b610f9c91905b80821115610f98576000816000905550600101610f80565b5090565b905600a165627a7a723058203b7fefd880492fdb951be204aac1ace08da1508fb63ea1ac0c87fc84a9fa2af80029',
                networks: {
                    4: {
                        address: '0x845E87Ac0DA68E00197F745171c0D352E9613645'
                    }
                }
            });

            // Set the provider for our contract
            App.contracts.VotingApp.setProvider(App.web3Provider);
        });
        return App.bindEvents();

    },

    bindEvents: function() {
    	console.log('bindEvents');
        $(document).on('click', '.btn-proceed', App.pushVoting);
        $(document).on('click', '.btn-refresh', App.showLastVotingId);
        $(document).on('click', '.btn-vote', App.vote);
        $(document).on('click', '.btn-voting-info', App.showVotingInfo);

    },

    pushVoting: function () {
    	console.log('PushVoting');
    	var votingAppInstance;
    	App.contracts.VotingApp.deployed().then(function (instance) {
    		votingAppInstance = instance;
    		console.log('Address of contract: ', instance.address);
    		var forms = App.getForms();
    		console.log(forms);
    		var account;
    		web3.eth.getAccounts(function (err, accounts) {
    			if (err) {
    				console.log(err);
    			}
    			account = accounts[0];
    		});
    		return votingAppInstance.startVoting(
                forms[0],
                forms[1], 
                +forms[2],
                forms[3],
                { from: account }
            );
    	}).catch(function (err) {
    		console.log(err);
    	});
    },

    getForms: function () {
        var trim = function(s) { 
            return ( s || '' ).replace( /^\s+|\s+$/g, '' ); 
        }
    	var title = $('#title').val();
    	var text = $('#text').val();
    	var duration = $('#sel option:selected').text();
        var accounts = $('#accounts').val().split(',').map(trim);
    	return [title, text, duration.split(' ')[0], accounts];
    },

    vote: function () {
    	console.log('vote');
    	var votingAppInstance;
    	App.contracts.VotingApp.deployed().then(function (instance) {
    		votingAppInstance = instance;
    		var account;
    		web3.eth.getAccounts(function (err, accounts) {
    			if (err) {
    				console.log(err);
    			}
    			account = accounts[0];
    		});
            let votingId = +$('#voting-id').val();
            let voteValue = $('#sel-vote').val() == 'true';
            console.log(votingId, voteValue);
    		return votingAppInstance.vote(voteValue, votingId, {
    			from: account
    		});
    	}).catch(function (err) {
    		console.log(err);
    	})
    },

    getVotingsCount: function () {
        return App.contracts.VotingApp.deployed().then((instance) => {
            return instance.votingsCount();
        }).then((response) => {
            return new Promise((resolve) => {
                resolve(response.c[0]);
            });
        }).catch((error) => {console.log(error)});
    },

    getVoting: function (votingId) {
    	// Those responce values can be referenced in VotingApp.json
    	return App.contracts.VotingApp.deployed().then(function (instance) {
    		return instance.votingIdToVoting(votingId);
    	}).then(function (response) {
		    	return new Promise((resolve, reject) => {
			    	var votingObject = {
			    		name: response[0],
			    		text: response[1],
			    		expiresIn: response[2].c[0],
			    		startTime: response[3].c[0],
			    		yesCount: response[4].c[0],
                        noCount: response[5].c[0],
			    		initiator: response[5]
			    	};
			    	if (votingObject.initiator === '0x0000000000000000000000000000000000000000') {
			    		reject(new Error('No such voting. Check your votingId'));
			    	} else resolve(votingObject);
			    });	
		    }).catch(error => console.log(error));
    },

    showVotingInfo: function () {
        let votingId = +$('#info-voting-id').val();
        console.log(votingId);
        $('.list-group').empty();
    	App.getVoting(votingId).then((obj) => {
    		for (var prop in obj) {
    			$('.list-group').append(`<li class="list-group-item">${obj[prop]}</li>`);
    		}
    	});
    },

    getLastVotingId: function () {
    	return App.contracts.VotingApp.deployed().then((instance) => {
    		return instance.votingsCount();
    	}).then((response) => {
    		return Promise.resolve(response.c[0]);
    	});
    },

    showLastVotingId: function () {
    	App.getLastVotingId().then((resp) => {
    		$('#votings-counter').text(resp);
    	});
    }
};

$(function() {
	$(window).load(function () {
		App.init();
	});
});
