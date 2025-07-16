const Web3 = require("web3");
const express = require("express");
const cors = require("cors");
const cron = require('node-cron');
require("dotenv").config();
const app = express();
const mysql = require('mysql');
const http = require("http");
const { Contract, providers } = require("ethers");
const HDWalletProvider = require("@truffle/hdwallet-provider");

app.use(express.json());
app.use(cors());

const conn = mysql.createPool({
  connectionLimit: 10,
  host: "193.203.184.92",
  user: "u798855874_thtnthn",
  password: "Dow343d@",
  database: "u798855874_splosh",
});

conn.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("DB Connected!");
  connection.release();
});

const rpc = "https://bsc-testnet-rpc.publicnode.com";
const contract_address = "0xb2894c312BDF23Dc4C986401e5D48fb097A6f45A";
const dexABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"token","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BuyAUSD","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"referrer","type":"address"},{"indexed":false,"internalType":"uint256","name":"package","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"income","type":"uint256"}],"name":"DirectIncome","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"levelIncome","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"tyype","type":"string"}],"name":"LevelIncome","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"withId","type":"uint256"}],"name":"MemberPayment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"package","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"persecroi","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"start","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"token","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"capping","type":"uint256"}],"name":"ReActive","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"uint256","name":"userId","type":"uint256"}],"name":"Registration","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"token","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SellAUSD","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"token","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"}],"name":"TokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"token","type":"uint256"}],"name":"TokenTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"usdt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"token","type":"uint256"}],"name":"WithdrawToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"onOwnershipTransferred","type":"event"},{"inputs":[],"name":"APY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAXIMUM_BUY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAXIMUM_SALE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_BUY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_SALE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENT_DIVIDER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SPLSH","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDT","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"min_buy","type":"uint256"},{"internalType":"uint256","name":"max_buy","type":"uint256"},{"internalType":"uint256","name":"min_sell","type":"uint256"},{"internalType":"uint256","name":"max_sell","type":"uint256"}],"name":"buySetting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idToAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ownerAddress","type":"address"},{"internalType":"contract IBEP20","name":"_SPLSH","type":"address"},{"internalType":"contract IBEP20","name":"_USDT","type":"address"},{"internalType":"address","name":"_ownerrate","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"isUserExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUserId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"levelShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable[]","name":"_contributors","type":"address[]"},{"internalType":"uint256[]","name":"_balances","type":"uint256[]"},{"internalType":"uint256","name":"totalQty","type":"uint256"},{"internalType":"uint256[]","name":"WithId","type":"uint256[]"},{"internalType":"contract IBEP20","name":"_TKN","type":"address"}],"name":"multisendToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ownerrate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"token_rate","type":"uint256"}],"name":"priceSetting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"start_sale","type":"uint256"}],"name":"saleSetting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sale_status","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"usar","type":"address"}],"name":"seeDetailsStaking","outputs":[{"components":[{"internalType":"uint256","name":"amount_invested","type":"uint256"},{"internalType":"uint256","name":"persecroi","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"rewTaken","type":"uint256"}],"internalType":"struct SploshStaking.Details[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"useradd","type":"address"}],"name":"seeReward","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IBEP20","name":"_newToken","type":"address"}],"name":"splshTokenUpdate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"package","type":"uint256"},{"internalType":"address","name":"refferal","type":"address"}],"name":"stakeByUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token_price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"capping","type":"uint256"},{"internalType":"address","name":"usser","type":"address"}],"name":"updateCapping","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"directs","type":"uint8"},{"internalType":"address","name":"usser","type":"address"}],"name":"updateDirects","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ownr","type":"address"}],"name":"updateRateOwnr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"address","name":"usser","type":"address"}],"name":"updateRewardTaken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"usr","type":"address"}],"name":"updateUserStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint256","name":"totalstake","type":"uint256"},{"internalType":"uint256","name":"capping","type":"uint256"},{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"uint256","name":"rewTaken","type":"uint256"},{"internalType":"uint256","name":"stakecount","type":"uint256"},{"internalType":"uint256","name":"partnersCount","type":"uint256"},{"internalType":"uint256","name":"levelIncome","type":"uint256"},{"internalType":"bool","name":"onof","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"WithAmt","type":"uint256"}],"name":"withdrawLost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"QtyAmt","type":"uint256"},{"internalType":"contract IBEP20","name":"_TOKEN","type":"address"}],"name":"withdrawLostTokenFromBalance","outputs":[],"stateMutability":"nonpayable","type":"function"}]; // Add your contract ABI here

const web3 = new Web3(rpc);
const provider = new providers.JsonRpcProvider(rpc);
const signer = provider.getSigner();
const contractName = new Contract(contract_address, dexABI, provider);
const contractt = new web3.eth.Contract(dexABI, contract_address);

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    let e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return String(x);
}

function round(number) {
  return Math.round(number * 1000) / 1000;
}

function query(query) {
  return new Promise((resolve, reject) => {
    conn.query(query, function (error, result) {
      if (error) reject(error);
      resolve(result);
    });
  });
}

function getBlocktoTime(block) {
  return web3.eth
    .getBlock(block)
    .then(d => d.timestamp)
    .catch(e => {
      console.error("Error getting block time:", e);
      throw e;
    });
}

function makerandomstring(length) {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

contractName.on("Registration", async (user, referrer, userId, event) => {
  let timestamp = await getBlocktoTime(event.blockNumber);
  const sql = `INSERT INTO Registration (user, block_number, block_timestamp, transaction_id, referrer, userId) VALUES ('${user}', '${event.blockNumber}', '${timestamp}', '${event.transactionHash}', '${referrer}', '${userId}')`;
  conn.query(sql, function (err, res3) {
    if (err) {
      console.error("Error inserting registration:", err);
    } else {
      console.log("Registration inserted successfully");
    }
  });
});

async function generateEventQuery(result) {
  let csql_arr = [];
  let sql_arr = [];

  if (result.length > 0 && result[0].returnValues) {
    for (let i = 0; i < result.length; i++) {
      let index = Object.keys(result[i].returnValues);
      let event = result[i].event;

      if (["Registration", "LevelIncome", "TokenSell", "WithdrawToken", "ReActive", "NewDeposit", "MemberPayment", "SellAUSD", "BuyAUSD"].includes(event)) {
        let sql = `INSERT INTO ${event} (`;
        let vsql = `VALUES (`;

        let csql = `SELECT id FROM ${event} WHERE `;

        for (let k = 0; k < index.length; k++) {
          if (index[k].length > 2) {
            csql += `${index[k]}='${result[i].returnValues[index[k]]}' AND `;
            sql += `${index[k]},`;
            vsql += `'${result[i].returnValues[index[k]]}',`;
          }
        }

        let transaction_id = result[i].transactionHash;
        let block_number = result[i].blockNumber;
        let timestamp = await getBlocktoTime(result[i].blockNumber);

        csql += `transaction_id='${transaction_id}' AND block_number='${block_number}'`;
        sql += `block_timestamp, transaction_id, block_number)`;
        vsql += `'${timestamp}', '${transaction_id}', '${block_number}')`;
        sql += vsql;

        csql_arr.push(csql);
        sql_arr.push(sql);

        const existingEntry = await query(csql);
        if (existingEntry.length === 0) {
          console.log("Executing SQL:", sql);
          await query(sql);
        }
      }
    }
  }

  return { csql: csql_arr, sql: sql_arr };
}

async function listevent(req, res) {
  try {
    const [result] = await query("SELECT * FROM eventBlock");
    const current_block = await web3.eth.getBlockNumber();

    console.log("Query Event Block:", result.latest_block);
    console.log("Current Block:", current_block);

    const events = await contractt.getPastEvents({
      fromBlock: Number(result.latest_block),
      toBlock: Number(result.latest_block) + 1000,
    });

    await generateEventQuery(events);

    if (parseInt(result.latest_block) + 1000 < parseInt(current_block)) {
      await query(`UPDATE eventBlock SET latest_block = '${parseInt(result.latest_block) + 1000}'`);
      console.log('Executed');
    }
  } catch (e) {
    // console.error("Error in listevent:", e);
    // res.status(500).send("Internal Server Error");
  }
}

cron.schedule('* * * * *', async () => {
  try {
    await listevent();
    console.log('Event processing executed');
  } catch (e) {
    console.error("Error in cron job:", e);
  }
});

app.get("/Node/", listevent);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
