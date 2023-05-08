import { ethers } from "ethers";
import landAbi from "../../artifacts/contracts/BuyLand.sol/BuyLand.json";
import nftAbi from "../../artifacts/contracts/NFT.sol/NFT.json";
import { landAddress, nftAddress } from "../../config";
import {useState } from "react"

// require("dotenv").config();
// const apiKey = "Ek73oJiIXu-XEVf5-QzDo2pbqYQnBQVa";
// const landAddress = "0x1008985ACF4496c346C2AF78211916CdB46428C0";
// const nftAddress = "0x3ABB2Bc84864395ea589d4559bE743344415A147";
async function contractReadInstance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(landAddress, landAbi.abi, signer);
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://goerli.infura.io/v3/97ff8282ac394c599bbea5a4da71470e"
  // );
  // console.log(provider);
  // const contract = new ethers.Contract(landAddress, landAbi.abi, provider);
  return contract;
}
async function createNFT(uri, id) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftAddress, nftAbi.abi, signer);
  await (await contract.mint(uri, id)).wait();
  await (await contract.setApprovalForAll(landAddress, true)).wait();
}

async function getNftInstance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftAddress, nftAbi.abi, signer);
  return contract;
}

async function contractWriteInstance() {
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(landAddress, landAbi.abi, signer);
  return contract;
}

export async function getPrice(id) {
  const contract = await contractReadInstance();
  let price;
  await contract.getPrice(id).then((val) => {
    price = val;
  }).catch((error) => {
    setError(error.message);
  });
  return price;
}

export async function setPrice(id, price) {
  const contract = await contractWriteInstance();
  price = ethers.utils.parseUnits(price, "ether");
  await contract.setPrice(id, price);
}
export async function putForBid(id) {
  const contract = await contractWriteInstance();
  await contract.putForBid(id);
}

export async function placeBid(id, amt) {
  const contract = await contractWriteInstance();
  amt = ethers.utils.parseUnits(amt, "ether");
  console.log("oioi");
  await contract.placeBid(id, amt, { value: amt }).then((ad) => {
    console.log(ad);
  }).catch((error) => {
    setError(error.message);
  });
}

export async function sellForMaxBid(id, amt) {
  const contract = await contractWriteInstance();
  await contract.sellForMaxBid(id);
}

export async function getStatus(id) {
  const contract = await contractReadInstance();
  let getInfo = await contract.getStatus(id);
  return getInfo;
}

export async function getOwnerDetails(id) {
  const contract = await contractReadInstance();
  let isOwner;
  await contract.getOwnerDetails(id).then((d) => {
    isOwner = d;
  }).catch((error) => {
    setError(error.message);
  });
  return isOwner;
}
export async function getBidDetails(id) {
  const contract = await contractReadInstance();
  let bid;
  await contract.getBidDetails(id).then((d) => {
    bid = d;
  }).catch((error) => {
    setError(error.message);
  });
  return bid;
}
async function tranferNft(id, add) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let accounts = await provider.send("eth_requestAccounts", []);
  let account = accounts[0];
  console.log(account);
  const contract = new ethers.Contract(nftAddress, nftAbi.abi, signer);
  // await contract.safeTransferFrom(add, account, id);
  console.log("done");
}
try {
  
} catch (error) {
  
}
export async function buyLand(id, data) {
  let price;
  let owner;
  await getOwnerDetails(id).then((add) => {
    owner = add;
  }); 
  console.log(owner);
  await getPrice(id)
    .then((k) => {
      price = k;
      // console.log(k);
    })
    .catch((error) => {
      setError(error.message);
    });
  const contract = await contractWriteInstance();

  // console.log(price);

  // let v = new ethers.BigNumber(price);
  // price = v.toNumber();
  console.log("price", price);
  price = price.toString();
  // console.log(price);

  let dim = data[id].dimension;
  let pos = data[id].position;
  let basePrice = data[id].price;
  basePrice = ethers.utils.parseUnits(basePrice, "ether");
  basePrice = basePrice.toString();
  // console.log(basePrice);
  // console.log(price);
  let condition = false;
  if (price == 0) {
    console.log("in if");
    price = basePrice;
    condition = true;
  }
  console.log(price);
  const nftAdd = await getNftInstance();

  console.log(nftAdd.address);

  await contract.buy(
    nftAddress,
    id,
    1,
    1,
    1,
    1,
    1,
    1,
    basePrice,
    data[id].uri,
    {
      value: price,
    }
  );
  console.log("here");
  if (condition) await createNFT(data[id].uri, id);
  else {
    tranferNft(id, owner[0]);
  }
}
