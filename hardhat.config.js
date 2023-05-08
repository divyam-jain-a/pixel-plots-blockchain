require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    // hardhat: {
    //   chainId: "1337",
    //   allowUnlimitedContractSize: true,
    // },
    // ganache: {
    //   url: "http://127.0.0.1:7545",
    //   chainId: "5777",
    // },
    localhost: {
      url: "http://127.0.0.1:7545",
    },
    // goerli: {
    //   url: "https://goerli.infura.io/v3/97ff8282ac394c599bbea5a4da71470e",
    //   accounts: [
    //     `0x59f55355346b31d51ae19086c237620f83fda14a2f7521498120ac5f73a8c471`,
    //   ],
    // },
  },
  solidity: "0.8.17",
};
