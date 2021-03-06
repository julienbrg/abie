var AbieFund = artifacts.require("./AbieFund.sol");

contract('AbieFund', function(accounts) {
  it("member 2 set delegate for AddMember to member 1", function() {

// 4 membres
// 1 membre set delegate pour AddMember

    var member1 = accounts[0];
    var member2 = accounts[1];
    var member3 = accounts[2];
    var member4 = accounts[3];

    var abieFund;
    return AbieFund.deployed([member1,member2,member3,member4]).then(function(instance) {
      // member 2 set delegate for AddMember to member 1
      abieFund = instance;
      return abieFund.setDelegate(0,member1,{from: member2});
    }).then(function() {
      // verify
      return abieFund.getDelegate.call(member2,0);
    }).then(function(result) {
      console.log("res ",result);
      assert.equal(result, member1);
    });
  });


  it("publish a proposal to become a member", function() {

    var member1 = accounts[0];
    var member2 = accounts[1];
    var member3 = accounts[2];
    var member4 = accounts[3];
    var candidate = accounts[4];

    var abieFund;
    return AbieFund.deployed([member1,member2,member3,member4]).then(function(instance) {
      abieFund = instance;
      return abieFund.askMembership({value: web3.toWei(1, "ether") ,from: candidate});
    }).then(function() {
      return abieFund.proposals.call(0);
    }).then(function(result) {
      // result[3] => proposal.recipient
      assert.equal(result[3], candidate );
    });
  });




/*

  it("should send coin correctly", function() {
    var meta;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
*/


});
