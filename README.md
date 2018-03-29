# simple frontend template for Dapp creation
A simple template for making nice-looking Dapps FAST.
Provides a ready-made frontend and simple Ethereum contract interaction.

The template is based on CryptoPrimitve's Crowdserve Dapp https://cryptoprimitive.github.io/crowdserve-debut/

## Instructions

### Adding contracts

You can add contracts through the **loadContracts** function in **web3_contractsLoader.js**

For each contract deployed, you must provide a **contract address** and an **ABI**.

```javascript
loadContracts(contract1Address, contract1Abi , contract2Address, contract2Abi, etc...);
```

Each contract can then be accessed with **loadedContracts[i]** where **i** is the ith contract loaded.

```javascript
loadedContracts[i].myFunction();
```

By default, a getAllEvents() function is added to the contract that fetches all the events in the contract.


### Adding blocks of content to the Dapp

You can easily add blocks of content to the Dapp by copying the default empty block and filling it with what you wish. You can set the amount of space occupied by content by using bootsrap colums (EG: col-3-md, col-6-md, etc...).

```
<!-- What follows is an examples of an empty block ready to be filled  -->
<h2>This is a custom block</h2>
<div class="mainBlock">
  <div class="row well well-sm">
    <div class="col-md-12">
      <p>You can fill me with content!</p>
    </div>
  </div>
</div>
```
