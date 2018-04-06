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
                deployedByteCode: '0x606060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806310e6e06c1461009e5780631315ba91146100cc578063211fcf191461028d578063214405fc146102b657806355d1d1bb146102f857806381a60c0d146103e75780638da5cb5b14610425578063eb3892a81461047a578063f2fde38b146104bc575b600080fd5b34156100a957600080fd5b6100ca600480803515159060200190919080359060200190919050506104f5565b005b34156100d757600080fd5b6100ed6004808035906020019091905050610770565b6040518080602001806020018863ffffffff1663ffffffff1681526020018763ffffffff1663ffffffff1681526020018663ffffffff1663ffffffff1681526020018563ffffffff1663ffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183810383528a8181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156101f45780601f106101c9576101008083540402835291602001916101f4565b820191906000526020600020905b8154815290600101906020018083116101d757829003601f168201915b50508381038252898181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156102775780601f1061024c57610100808354040283529160200191610277565b820191906000526020600020905b81548152906001019060200180831161025a57829003601f168201915b5050995050505050505050505060405180910390f35b341561029857600080fd5b6102a0610810565b6040518082815260200191505060405180910390f35b34156102c157600080fd5b6102f6600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610816565b005b341561030357600080fd5b6103e5600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803563ffffffff16906020019091908035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919050506108e7565b005b34156103f257600080fd5b6104086004808035906020019091905050610b12565b604051808381526020018281526020019250505060405180910390f35b341561043057600080fd5b610438610b85565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561048557600080fd5b6104ba600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610baa565b005b34156104c757600080fd5b6104f3600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c7b565b005b600081600254811115151561050957600080fd5b82600115156001600083815260200190815260200160002060040160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151514151561057d57600080fd5b8360006001600083815260200190815260200160002090508060020160009054906101000a900463ffffffff168160020160049054906101000a900463ffffffff160163ffffffff168160020160049054906101000a900463ffffffff1663ffffffff164203111515156105f057600080fd5b856000600160008381526020019081526020016000209050600015158160050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151514151561066957600080fd5b6001600089815260200190815260200160002096506001151589151514156106cd5786600201600881819054906101000a900463ffffffff168092919060010191906101000a81548163ffffffff021916908363ffffffff1602179055505061070b565b86600201600c81819054906101000a900463ffffffff168092919060010191906101000a81548163ffffffff021916908363ffffffff160217905550505b60018760050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550505050505050505050565b6001602052806000526040600020600091509050806000019080600101908060020160009054906101000a900463ffffffff16908060020160049054906101000a900463ffffffff16908060020160089054906101000a900463ffffffff169080600201600c9054906101000a900463ffffffff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905087565b60025481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561087357600080fd5b60016000838152602001908152602001600020905060018160040160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550505050565b6108ef610dd0565b600060e06040519081016040528087815260200186815260200162015180860263ffffffff1681526020014263ffffffff168152602001600063ffffffff168152602001600063ffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff16815250915062015180826040015163ffffffff161015151561097857600080fd5b8160016000600254815260200190815260200160002060008201518160000190805190602001906109aa929190610e48565b5060208201518160010190805190602001906109c7929190610e48565b5060408201518160020160006101000a81548163ffffffff021916908363ffffffff16021790555060608201518160020160046101000a81548163ffffffff021916908363ffffffff16021790555060808201518160020160086101000a81548163ffffffff021916908363ffffffff16021790555060a082015181600201600c6101000a81548163ffffffff021916908363ffffffff16021790555060c08201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050600090505b8251811015610aec57610adf8382815181101515610acd57fe5b90602001906020020151600254610816565b8080600101915050610ab3565b610af833600254610816565b600260008154809291906001019190505550505050505050565b6000806000836002548111151515610b2957600080fd5b6001600086815260200190815260200160002091508160020160089054906101000a900463ffffffff1682600201600c9054906101000a900463ffffffff168163ffffffff1691508063ffffffff169050935093505050915091565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610c0757600080fd5b60016000838152602001908152602001600020905060008160040160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610cd657600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610d1257600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60e060405190810160405280610de4610ec8565b8152602001610df1610ec8565b8152602001600063ffffffff168152602001600063ffffffff168152602001600063ffffffff168152602001600063ffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610e8957805160ff1916838001178555610eb7565b82800160010185558215610eb7579182015b82811115610eb6578251825591602001919060010190610e9b565b5b509050610ec49190610edc565b5090565b602060405190810160405280600081525090565b610efe91905b80821115610efa576000816000905550600101610ee2565b5090565b905600a165627a7a72305820240410ee52d525394625993c6f5cbb505ccf8042b334f2909a11d6c546fa6aa30029',
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
