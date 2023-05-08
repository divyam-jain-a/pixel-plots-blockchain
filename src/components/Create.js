const Create = async ({ landAddress, nft, uri, id }) => {
    await (await nft.mint(uri)).wait();
    await (await nft.setApprovalForAll(landAddress.address, true)).wait();
  };
  export default Create;