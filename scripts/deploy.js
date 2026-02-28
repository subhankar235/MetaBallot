const hre = require("hardhat");

async function main() {
  const Create = await hre.ethers.getContractFactory("Create");
  const create = await Create.deploy();

  await create.deployed();

  console.log("CONTRACT_ADDRESS:", create.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
