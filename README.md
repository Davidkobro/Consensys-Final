# Consensys Ethereum Developer BootCamp Final Project
ConsenSys Academy’s 2019 Developer Program 

---

# FreelanceFree
Freelance Minus The Fees 

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

## Deployment to Ganache 
When you launch Ganache, do so using port 7545 rather than it's standard port, 8545

```javascript
ganache-cli --port 7545 -i 5777
```

Using Truffle, migrate the contracts to ganache-cli with the following command (in the project's root dir)

```javascript
truffle migrate --reset
```

## Interface 
From inside the *client* directory, run the following command:

```javascript 
npm run start
```

You can now see the interface running on localhost:3000