Step 1:

Prerequesitites:<br>
Node.js v18 - If you are using a newer version you must downgrade<br>
Git<br>
MetaMask web extention<br>

Step 2:<br>
```sh
git clone https://github.com/reubenks/cn60035
```

Step 3:<br>
Ensure you are inside the cn60035 folder<br>

```sh
npm install
```

Step 4:<br>
```sh
cd backend
```
```sh
npm install
```
```sh
cd ..
```

  Step 5:<br>
```sh
npx hardhat node
```

  Step 6:<br>

  Copy  the private key from account 0 and paste it in your .env file <br>

  Step 7:<br>
  On your pinata account create a new API key with admin privlidges and copy the JWT secret access token into your .env file under PINATA_JWT<br>

  Step 8:<br>
  Open metamask and if it prompts you to create new wallet or use existing wallet, you will click use existing wallet.<br>
  You will then click import using secret recovery phrase<br>

Secret recovery phrase:<br>
```sh
test test test test test test test test test test test junk
  ```

  Step 9:<br>
  Create a new network called hardhat local<br>
  RPC URL: http://127.0.0.1:8545<br>
  CHAIN ID: 31337<br>
  Currency Symbol: ETH<br>

  CLICK SAVE<br>

  Step 10: <br>
  Deploy the smart contract<br>
    OPEN A SECOND TERMINAL<br>
  ```sh
npx hardhat run scripts/deploy.ts --network localhost
  ```

  Copy the address given into your .env Contract_Adress<br>

  Step 11:<br>
```sh
npx hardhat console --network localhost
  ```

Then paste these commands in 1 at a time - ensure you use the new contract address in place of "YOUR_NEW_ADDRESS"<br>
  ```sh
const contract = await ethers.getContractFactory("NFTMarketplace")
const nft = await contract.attach("YOUR_NEW_ADDRESS")
const fee = await nft.getListPrice()
await nft.createToken("ipfs://QmeTjtJ2BHHS62KTrKYKGTdNhPdh38sGenhz7PFRSug6SG", ethers.utils.parseEther("0.02"), {value: fee})
await nft.createToken("ipfs://QmT6ruDBvGoMEU6QSF4rLyozUdjww3e2RdrxgWwQ8HcWLj", ethers.utils.parseEther("0.02"), {value: fee})
await nft.createToken("ipfs://QmZ6EVtSPjGpA7oQnfKXmHYELBasdj6CezKxMzS9wJKzqo", ethers.utils.parseEther("0.02"), {value: fee})
  ```

  Stop 12:<br>
    OPEN A THIRD TERMINAL<br>
```sh
cd backend
node pokeserver.js
  ```

  stop 13:<br>
  OPEN A FOURTH TERMINAL<br>
  ```sh
npm start
  ```