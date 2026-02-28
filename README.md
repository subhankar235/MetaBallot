# Meta Ballot

Meta Ballot is a decentralized voting platform built on the Ethereum blockchain. It eliminates the need for centralized authorities in the voting process by leveraging smart contracts to record and verify votes transparently and immutably. Every vote cast is stored on-chain, making results tamper-proof and publicly auditable while preserving voter anonymity through wallet-based authentication.

The platform is designed for organizations, DAOs, communities, and institutions that require trustless, verifiable elections without relying on a central server or administrator.

---

## Tech Stack

- **Solidity** - Smart contracts for ballot logic, voter registration, and vote tallying
- **Hardhat** - Local blockchain development, testing, and deployment pipeline
- **Next.js** - Frontend framework with server-side rendering and API routes
- **MetaMask** - Wallet connection and transaction signing for voters
- **shadcn/ui** - Component library for a clean, accessible UI
- **CSS** - Custom styling layered on top of shadcn components

---

## Smart Contract Overview

The contract handles:

- Creating ballots with a title, description, candidates, and voting deadline
- Registering eligible voters by wallet address (optional allowlist)
- One vote per wallet address enforcement
- On-chain vote counting
- Reading results after the voting period ends

---

## Getting Started

### Prerequisites

- Node.js v18+
- MetaMask browser extension
- A funded wallet on the target network (or use Hardhat local node)

### Installation

```bash
git clone https://github.com/your-org/meta-ballot.git
cd meta-ballot
npm install
cd frontend
npm install
```

### Run Local Blockchain

```bash
npx hardhat node
```

### Deploy Contracts

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address into `frontend/lib/constants.js`.

### Run the Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` and connect MetaMask to the Hardhat local network.

---

## Environment Variables

Create a `.env` file in the root:

```env
PRIVATE_KEY=your_deployer_wallet_private_key
RPC_URL=https://your-rpc-endpoint
NEXT_PUBLIC_CONTRACT_ADDRESS=deployed_contract_address
NEXT_PUBLIC_CHAIN_ID=1337
```

---

## Testing

```bash
npx hardhat test
```

Tests cover ballot creation, voting restrictions, double-vote prevention, and result calculation.

---

## Deployment

Contracts can be deployed to any EVM-compatible network. Update `hardhat.config.js` with the target network and set the corresponding environment variables.

Recommended testnets: Sepolia, Mumbai (Polygon).

---

## License

MIT