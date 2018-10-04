---
# e-Voting Distributed App based on Ethereum Smart Contracts #
---
<br>

This is our BE Project based on Blockchains where we are building e-Voting Dapp using Truffle Framework.

<br>
<br>

---
## Contributors : ##
---
*	Anish Pawar
* 	Prasad Pathak
*	Pabitra Parida
* 	Riya Nagpal

<br>
<br>

---
## Problem Statement : ##
---
<br>

*To design a next generation secure, transparent, tamper proof voting system built on the
foundations of the blockchain.*

<br>
<br>

---
## Dependencies : ##
---
In order to build and run our project we need a few dependencies :

### Node Packet Manager (NPM) ###

The first dependency is NPM which comes with Node.js. You can check if you have NPM by typing the following in your terminal:

`$ node -v`

You can download Node.js [here](https://nodejs.org/en)

### Truffle Framework ###

Next dependency is Truffle Framework which allows us to build decentralized applications on Ethereum blockchain. It also provides us with tools which allow us to deploy smart contracts using Solidity language. It aslo helps us develop client side applications.

You can install Truffle by typing the following in your terminal : 

`$ npm install -g truffle`

### Ganache ###

Ganache is a local in-memory blockchain. It helps us simulate an Ethereum blockchain with 10 accounts which are preloaded 100 fake ether each.

You can download Truffle Framework by clicking [here](https://truffleframework.com/ganache)

### Metamask ###

The next dependency is Metamask which is a Google Chrome extension. Since blockchain is a network in itself we need a special browser to connect to it. We'll be able to connect to our local blockchain using our own local account with the help of Metamask. 

You can download Metamask by clicking [here](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

You will need to install Google Chrome if you dont have it. After installing make sure it is enabled in your list of extensions. You'll see a a fox icon in the top right corner of your screen.

### Text Editor ###

Basic editor to view and modify code. I'll recommend using Sublime Text because it has plugins for syntax highliting for Solidity language.

You can install the free version by clicking [here](https://www.sublimetext.com/)


### Syntax Highlighting (optional) ###

Optional but highly recommended to easily read and write Solidity code, which may not be highlighted properly on some editors.

You can install ["Ethereum Package"](https://packagecontrol.io/packages/Ethereum) that provides accurate syntax highlighting for Solidity.
<br>

---
## How to run ##
---
### Step 1. Clone the project ###

`git clone https://github.com/anish2197/Voting-dApp`

### Step 2. Install dependencies ###

Install NPM, Truffle, Ganache and Metamask.

### Step 3. Start Ganache ###

Open the Ganache GUI client. This will start the local in-memory blockchain instance. Note the RPC server address, we will need it later to connect to the blockchain.

### Step 4. Compile and Deploy the Smart Contract ###

Open the bash terminal in your project folder. Run the following command :<br>
`$ truffle migrate --reset` <br>
This will run the preloaded *Migrations.sol* which will migrate to our contract *Election.sol*. Since the contents of blockchain cannot be altered, we need to reset the contract every time we restart Ganache.

### Step 5. Run develeopment server ###

Open another bash terminal in your project folder. This will be used to start the server. Run the following command :<br>`$ npm run dev`<br>
This should automatically open a window in your browser with the client-side application.

### Step 6. Configure Metamask ###

* Register a free account using the Metamask GUI and login in your account.
* We'll use Metamask to log into the blockchain network. Click on "Main Ethereum Network" and select "Custom RPC Server". Paste the RPC server address from Step 3. and hit save. You are now on the blockchain network.
* Open Ganache GUI. We now need to log in to the blockchain using one of the 10 accounts provided by Metamask. Select any one of your choice and copy its private key using the key icon on the right side of the GUI.
* Open Metamask GUI. Click on the circular icon on the top right side of the GUI. Select on "Import Account". Paste the private key. You have now successfully logged in the blockchain with a valid account.

### Step 7. Run the front end application ###

Visit this URL in your browser: http://localhost:3000.<br>
You may need to restart your browser.

<br>

---
## Functionality of the dapp as of v0.4 ##
---

1. Can read from blockchain and display the list of candidates.
2. Keep live track of the data of the candidates(i.e. vote count).
3. Vote on behalf of a account.

<br>

---
## Features planned for future releases ##
---

1. Set a timer for the elections.
2. Announce the winner after the timer goes off.
3. Voter registration, reject unregistered voters.

<br>

---
## Testing ##
---

5 test cases have been designed to test the behaviour of the dapp.<br>
Testing is done by writing a Javascript to simulate the client-side interaction. [Mocha Framework](https://mochajs.org/) and [Chai Libraries](https://www.chaijs.com/) are used for this purpose, which come preloaded with Node.js<br>
You can find these Javascripts in the following path : `./Elections/test/election.js`<br>

Use the following command to run the Javascript for the tests : <br>
`$ truffle test`
<br>

#### Test 1 ####
+ Test to verify if the candidate count is correct.
+ Fails if the candidate count is different than 2.

#### Test 2 ####
+ Test to verify the candidate details.
+ Fails if the candidate name, ID and vote count is not valid.
+ Passing of these 2 tests indicates that the global variables have been correctly initialized by the constructor().

#### Test 3 ####
+ Test to check the behaviour of the vote.
+ Checks for two things:
	1. Vote has been registered into the blockchain
	2. Vote has only been incremented by 1

#### Test 4 ####
+ Test to check if the chosen candidate ID on the vote is valid.
+ Fails if the chosen ID is out of bounds.

#### Test 5 ####
+ Test to check if the dapp allows double voting.
+ Fails when we try to vote for the second time from an account and a proper exception is thrown.

---