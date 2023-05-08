// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

library LandLibrary{
    struct Plot {
        IERC721 nft;
        int256 dimensionY;
        int256 dimensionX;
        int256 dimensionZ;
        int256 positionX;
        int256 positionY;
        int256 positionZ;
        uint256 price;
        uint256 basePrice;
        address payable plotOwner;
        Status status;
        Bids bid;
    }

    struct Bids {
        address payable currBid;
        uint256 currBidAmt;
    }

    enum Status{initial,notForSale,forSale,forBid}

    
}