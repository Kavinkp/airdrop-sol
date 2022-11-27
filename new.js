// npm init -y
// npm install --save @solana/web3.js

const { 
  Connection, 
  LAMPORTS_PER_SOL, 
  clusterApiUrl, 
  Keypair
} = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

(async ()=> {

  const keypair = Keypair.generate();
  //{
  //  public key:"",
  //   private key:""
  // }

  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL * 2
  );
  
  // 1 billion lamports = 1 solana
  // 100 paise = 1 rupee
  
  const latestBlockHash = await connection.getLatestBlockhash();
  
  const txn = await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: airdropSignature,
  });

  console.log({
    publicKey: keypair.publicKey,
    privateKey: keypair.secretKey,
    signature: airdropSignature,
    txn
  });
})();