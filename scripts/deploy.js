// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Land = await hre.ethers.getContractFactory("BuyLand");
  const land = await Land.deploy();

  await land.deployed();
  const Nft = await hre.ethers.getContractFactory("NFT");
  const nft = await Nft.deploy(land.address);

  await nft.deployed();

  console.log(`Land Deployed to ${land.address}`);
  console.log(`NFT Deployed to ${nft.address}`);
  fs.writeFileSync(
    "../config.js",
    `
  export const landAddress = "${land.address}"
  export const nftAddress = "${nft.address}"
  `
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});