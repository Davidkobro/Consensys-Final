# Consensys Ethereum Developer BootCamp Final Project
ConsenSys Academy’s 2019 Developer Program 

---

# FreelanceFree
Freelance Minus The Fees 

### Problem

Most freelancing sites take a huge cut of the earnings from freelancers. Upwork for instance take 20% for the first $500 billed with the client and 10% for lifetime billings with the client between $500.01 and $10,000 earned. 

### Initial Step Outside of Contract

Freelancer and Employer agree outside of the freelancing site that they will do payment through the Freelance Campaign smart contract.

### Step 1 (Freelancer)

Freelancer logs on through Metamask and initiates the contract. A "1" signifying the correct initiation as well as the freelancer's address appears in the UI.

### Step 2 (Freelancer)

Freelancer requests the amount of Ethereum owed from the employer based on the time worked. They must also input the employer's ethereum address.  

### Step 1 (Store Owner)

The request for payment in Ethereum is clear on the UI and the store owner simply pays the request by clicking the approve request button. 

### Step 2  (Store Owner)

The payment is taken from the store owners account and sent to the freelancer. A message displays verifying the transfer. 

---

### Future Implementation Ideas

1. Holding payment in escrow from week to week if a payment is not made within a certain time period. This is especially relevant due to the large number of credit card defaults on freelancing sites. 
2. An oracle could pull the information from an employer's Upwork account and automatically make the necessary payment if the freelancer and the employer agree to do X% of the payment on a playform and the rest off the platform.

---
## Installations 

Start by cloning this repo with the following command: 

```javascript
git clone https://github.com/Davidkobro/Consensys-Final.git
```
Use the package manager npm to install required packages for running both the contracts and the interface
```javascript
npm install && cd client && npm install
```

### Deployment to Ganache 
When you launch Ganache, do so using port 7545 rather than it's standard port, 8545

```javascript
ganache-cli --port 7545 -i 5777
```

Using Truffle, migrate the contracts to ganache-cli with the following command (in the project's root dir)

```javascript
truffle migrate --reset
```

### Interface 
From inside the *client* directory, run the following command:

```javascript 
npm run start
```

You can now see the interface running on localhost:3000