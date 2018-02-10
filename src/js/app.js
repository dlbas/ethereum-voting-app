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
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            if (typeof App.web3Provider === 'undefined') {
            	App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
            }
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function() {
        $.getJSON('VotingApp.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var VotingAppArtifact = data;
            App.contracts.VotingApp = TruffleContract(VotingAppArtifact);

            // Set the provider for our contract
            App.contracts.VotingApp.setProvider(App.web3Provider);
        });
        return App.bindEvents();

    },

    bindEvents: function() {
    	console.log('bindEvents');
    	$(document).on('click', '.btn-proceed', App.pushVoting);
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
    		})
    		return votingAppInstance.startVoting(forms[0], forms[1], +forms[2], {
    			from: account
    		});
    	}).catch(function (err) {
    		console.log(err);
    	})
    },

    getForms: function () {
    	var title = $('#title').val();
    	var text = $('#text').val();
    	var duration = $('#sel option:selected').text();
    	return [title, text, duration.split(' ')[0]];
    },

    vote: function (votingId, voteValue) {
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
    		})
    		return votingAppInstance.vote(voteValue, votingId, {
    			from: account
    		});
    	}).catch(function (err) {
    		console.log(err);
    	})
    },

    getVotingsCount: function (callback) {
    	App.contracts.VotingApp.deployed().then(function (instance) {
    		return instance.votingsCount();
    	}).then(function (response) {
    		return callback(response.c[0]);
    	}).catch(function (error) {
    		console.log(error);
    	});
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
			    		votesCount: response[4].c[0],
			    		initiator: response[5],
			    		isActive: response[6]
			    	};
			    	if (votingObject.initiator === '0x0000000000000000000000000000000000000000') {
			    		reject(new Error('No such voting. Check your votingId'));
			    	} else resolve(votingObject);
			    });	
		    }).catch(error => console.log(error));
    },

    showVotingInfo: function (votingId) {
    	App.getVoting(votingId).then((obj) => {
    		for (var prop in obj) {
    			$('.list-group').append(`<li class="list-group-item">${obj[prop]}</li>`);
    			console.log(obj[prop]);
    		}
    	})
    }
};

$(function() {
	$(window).load(function () {
		App.init();
	});
});