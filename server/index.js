require('dotenv').config();
require('./connection');
const Web3 = require("web3");
const express = require('express');
const cors = require('cors');
const config2 = require("./model/confiig")
const stake = require("./model/stake")
const stakeRegister = require("./model/stakeregister")
const levelStake = require("./model/levelStake");
const Topup = require("./model/topup")
const app = express();
const routes = require('./router');
const cron = require('node-cron');
const StakingPlan = require('./model/staking_plan'); // Import the StakingPlan model
const moment = require("moment-timezone");
const stake2 = require('./model/stake');
const registration = require('./model/registration');
const stakedirect = require('./model/stakedirects');
const dailyroi = require('./model/dailyroi');
const withdraw = require('./model/withdraw');
const levelRecurr = require('./model/levelReccur');
const Adminlogin = require("./routers/adminlogin")
const AuthRouter = require("./routers/auth")
const Dashboard = require("./routers/dashborad");
const stakeReward = require('./model/stakingReward');
const levelRecurrLapse = require('./model/levelRecurrLapse');
const stakePool = require('./model/stakepool');
const stakepoolincome = require('./model/stakepoolincome');
const crypto = require('crypto');


app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow all origins
      callback(null, true);

      // To revert back to allowed origins, comment out the above line and uncomment the following block:
      /*
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
      */
    }
  })
);


app.use("/api", routes)
app.use("/api", AuthRouter)
app.use("/api", Adminlogin)
app.use("/api", Dashboard)

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC_URL, {
    reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 15,
      onTimeout: false,
    },
  })
);

const ABI = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "token", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "BuyAUSD", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "address", "name": "referrer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "package", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "income", "type": "uint256" }], "name": "DirectIncome", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "level", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "levelIncome", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "tyype", "type": "string" }], "name": "LevelIncome", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "balance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "withId", "type": "uint256" }], "name": "MemberPayment", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "package", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "persecroi", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "start", "type": "uint256" }], "name": "NewDeposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "token", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "rate", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "capping", "type": "uint256" }], "name": "ReActive", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "referrer", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "userId", "type": "uint256" }], "name": "Registration", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "token", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "SellAUSD", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "token", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "rate", "type": "uint256" }], "name": "TokenSell", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "token", "type": "uint256" }], "name": "TokenTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "usdt", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "rate", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "token", "type": "uint256" }], "name": "WithdrawToken", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "onOwnershipTransferred", "type": "event" }, { "inputs": [], "name": "APY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAXIMUM_BUY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAXIMUM_SALE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MINIMUM_BUY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MINIMUM_SALE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PERCENT_DIVIDER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "SPLSH", "outputs": [{ "internalType": "contract IBEP20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDT", "outputs": [{ "internalType": "contract IBEP20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "min_buy", "type": "uint256" }, { "internalType": "uint256", "name": "max_buy", "type": "uint256" }, { "internalType": "uint256", "name": "min_sell", "type": "uint256" }, { "internalType": "uint256", "name": "max_sell", "type": "uint256" }], "name": "buySetting", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "idToAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "ownerAddress", "type": "address" }, { "internalType": "contract IBEP20", "name": "_SPLSH", "type": "address" }, { "internalType": "contract IBEP20", "name": "_USDT", "type": "address" }, { "internalType": "address", "name": "_ownerrate", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "isUserExists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastUserId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "levelShare", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address payable[]", "name": "_contributors", "type": "address[]" }, { "internalType": "uint256[]", "name": "_balances", "type": "uint256[]" }, { "internalType": "uint256", "name": "totalQty", "type": "uint256" }, { "internalType": "uint256[]", "name": "WithId", "type": "uint256[]" }, { "internalType": "contract IBEP20", "name": "_TKN", "type": "address" }], "name": "multisendToken", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ownerrate", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "token_rate", "type": "uint256" }], "name": "priceSetting", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "start_sale", "type": "uint256" }], "name": "saleSetting", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "sale_status", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "usar", "type": "address" }], "name": "seeDetailsStaking", "outputs": [{ "components": [{ "internalType": "uint256", "name": "amount_invested", "type": "uint256" }, { "internalType": "uint256", "name": "persecroi", "type": "uint256" }, { "internalType": "uint256", "name": "start", "type": "uint256" }, { "internalType": "uint256", "name": "rewTaken", "type": "uint256" }], "internalType": "struct SploshStaking.Details[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "useradd", "type": "address" }], "name": "seeReward", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract IBEP20", "name": "_newToken", "type": "address" }], "name": "splshTokenUpdate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "package", "type": "uint256" }, { "internalType": "address", "name": "refferal", "type": "address" }], "name": "stakeByUSDT", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "token_price", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "capping", "type": "uint256" }, { "internalType": "address", "name": "usser", "type": "address" }], "name": "updateCapping", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "directs", "type": "uint8" }, { "internalType": "address", "name": "usser", "type": "address" }], "name": "updateDirects", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_ownr", "type": "address" }], "name": "updateRateOwnr", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "reward", "type": "uint256" }, { "internalType": "address", "name": "usser", "type": "address" }], "name": "updateRewardTaken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }], "name": "updateUserStatus", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "users", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "referrer", "type": "address" }, { "internalType": "uint256", "name": "totalstake", "type": "uint256" }, { "internalType": "uint256", "name": "capping", "type": "uint256" }, { "internalType": "uint256", "name": "reward", "type": "uint256" }, { "internalType": "uint256", "name": "rewTaken", "type": "uint256" }, { "internalType": "uint256", "name": "stakecount", "type": "uint256" }, { "internalType": "uint256", "name": "partnersCount", "type": "uint256" }, { "internalType": "uint256", "name": "levelIncome", "type": "uint256" }, { "internalType": "bool", "name": "onof", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "WithAmt", "type": "uint256" }], "name": "withdrawLost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "QtyAmt", "type": "uint256" }, { "internalType": "contract IBEP20", "name": "_TOKEN", "type": "address" }], "name": "withdrawLostTokenFromBalance", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const contract = new web3.eth.Contract(ABI, process.env.SPLOSH_STAKE_CONTRACT);

async function getLastSyncBlock() {
  let { lastSyncBlock } = await config2.findOne();
  return lastSyncBlock;
}
async function getEventReciept(fromBlock, toBlock) {
  let eventsData = await contract.getPastEvents("allEvents", {
    fromBlock: fromBlock,
    toBlock: toBlock,
  });
  return eventsData;
}

async function getTimestamp(blockNumber) {
  let { timestamp } = await web3.eth.getBlock(blockNumber);
  return timestamp;
}

async function processEvents(events) {
  console.log("events.length ", events.length)
  for (let i = 0; i < events.length; i++) {
    const { blockNumber, transactionHash, returnValues, event } = events[i];
    // console.log(blockNumber, transactionHash, event);
    const timestamp = await getTimestamp(blockNumber);

    if (event == "Registratio") {
      try {
        let isnotreg = await registration.findOne({
          user: returnValues.user,
        });
        if (!isnotreg) {
          let referrer = await registration.findOne({
            user: returnValues.referrer,
          });

          if (!referrer) {
            referrer = {
              userId: 0
            }
          }
          //console.log(returnValues, "returnvalue", event);
          let userId = "";
          const randomNumber = Math.floor(Math.random() * 100000);
          const fiveDigitNumber = randomNumber.toString().padStart(5, '0');
          userId = "DSC" + fiveDigitNumber;
          try {
            let isCreated = await registration.create({
              userId: userId,
              uId: returnValues.userId,
              user: returnValues.user,
              referrerId: referrer.userId ? referrer.userId : 0,
              rId: returnValues.referrerId,
              referrer: returnValues.referrer,
              txHash: transactionHash,
              block: blockNumber,
              timestamp: timestamp,
            });
            let isUpdated = await registration.updateOne(
              { uId: returnValues.referrerId },
              { $inc: { directCount: 1 } }
            );
            if (isCreated) {

              // direct level income on registration
              const islev = await levelStake.create({
                sender: returnValues.user,
                receiver: returnValues.referrer,
                level: 1,
                amount: 30,
                income: 9,
                percent: 30,
                income_type: "Registration Level Income",
                txHash: transactionHash,
              });


              if (islev) {
                await registration.updateOne({ user: returnValues.referrer }, { $inc: { wallet_income: 9, levelIncome: 9, totalIncome: 9 } })
              }

              const getref2 = await registration.findOne({ user: returnValues.referrer }, { referrer: 1 })

              if (getref2) {
                const islev2 = await levelStake.create({
                  sender: returnValues.user,
                  receiver: getref2.referrer,
                  level: 2,
                  amount: 30,
                  income: 6,
                  percent: 20,
                  income_type: "Registration Level Income",
                  txHash: transactionHash,
                });

                if (islev2) {
                  await registration.updateOne({ user: getref2.referrer }, { $inc: { wallet_income: 6, levelIncome: 6, totalIncome: 6 } })
                }
              }
            }
            if (!isCreated && isUpdated) {
              console.log("something went wrong");
            }
          } catch (e) {
            console.log("Error in save reg:", e);
          }
        }
      } catch (e) {
        console.log("Error (Registration Event) :", e.message);
      }
    } else if (event == "NewDeposit") {
      try {

        // let multi = 3;

        const isTop = await stake2.findOne({ txHash: transactionHash }, { _id: 1 })
        if (!isTop) {
          var first_stake = 0;
          const stakecount = await stake2.countDocuments({ user: returnValues.user });
          if (stakecount == 0) {
            first_stake = 1;
          }
          const returnx = returnValues.package / 1e18;
          const isisis = await registration.findOne({ user: returnValues.user }, { capping: 1, stake_amount: 1 })
          let stake_amt_now = isisis.stake_amount;
          stake_amt_now = stake_amt_now + returnValues.package / 1e18;
          if (returnx >= 50 && returnx < 501) {
            multi = 2;
          } else if (returnx >= 501 && returnx < 5001) {
            multi = 2.5;
          } else if (returnx >= 5001 && returnx <= 10000) {
            multi = 3;
          }
          console.log("multi first ", multi)
          if (isisis.capping >= multi) {
            multi = isisis.capping
          }
          console.log("multi second ", multi)
          await registration.findOneAndUpdate(
            { user: returnValues.user },
            {
              $inc: {
                //return: (returnValues.package/1e18) * multi,
                stake_amount: returnValues.package / 1e18
              },
              $set: {
                return: stake_amt_now * multi,
                capping: multi
              }
            }
          );
        }

        const result = calculateIncomeAndPackage((returnValues.package / 1e18));
        const perday = result.perDayIncome;
        const plannum = returnValues.plantype
        let planname;
        if (plannum == 1) {
          planname = "Flexi";
        } else if (plannum == 2) {
          planname = "Fix";
        }
        //console.log("perday :: ",perday)
        const isstalk = await stake2.findOne({ txHash: transactionHash }, { _id: 1 })
        if (!isstalk) {
          let isCreated = await stake.create({
            user: returnValues.user,
            amount: returnValues.package / 1e18,
            perdayroi: perday,
            first_stake: first_stake,
            txHash: transactionHash,
            block: blockNumber,
            timestamp: timestamp,
          });

          if (isCreated) {
            const getref = await registration.findOne({ user: returnValues.user }, { referrer: 1 })
            const pil = await stakedirect.findOne({ user: returnValues.user, referrer: getref.referrer })
            if (!pil) {
              await registration.updateOne(
                { user: getref.referrer },
                { $inc: { directStakeCount: 1 } }
              );
              await stakedirect.create({
                user: returnValues.user,
                referrer: getref.referrer
              })
            }

            const amti = returnValues.package / 1e18;

            const iss = await registration.findOne({ user: getref.referrer }, { totalIncome: 1, return: 1, capping: 1, directStakeCount: 1, stake_amount: 1 })

            if (iss.capping != 3 && iss.directStakeCount >= 4) {
              const directBusiness = await calculateDirectsesy(getref.referrer);
              console.log("directBusiness ", directBusiness)

              let checkbiz = 0;
              const refstakecount = await stake2.countDocuments({ user: getref.referrer });
              if (refstakecount == 0) {
                checkbiz = 1000;
              } else {
                checkbiz = 1500;
              }
              if (directBusiness >= checkbiz) {
                const ref_staking = iss.stake_amount;
                await registration.findOneAndUpdate(
                  { user: getref.referrer },
                  {
                    // $inc: {
                    //   return: tutamt * 3
                    // },
                    $set: {
                      return: ref_staking * 3,
                      capping: 3
                    }
                  }
                );
              }
            }

            const issss = await registration.findOne({ user: getref.referrer }, { totalIncome: 1, return: 1, capping: 1, directStakeCount: 1, stake_amount: 1 })


            const incomeref = (5 / 100) * amti

            const nowinc = issss.totalIncome + incomeref;
            const returrrn = issss.return;

            if (first_stake == 1) {
              if (returrrn >= nowinc) {

                const isadded = await registration.updateOne({ user: getref.referrer }, { $inc: { wallet_income: incomeref, referalIncome: incomeref, totalIncome: incomeref } })

                if (isadded.modifiedCount > 0) {
                  await levelStake.create({
                    sender: returnValues.user,
                    receiver: getref.referrer,
                    level: 1,
                    amount: amti,
                    income: incomeref,
                    percent: 5,
                    income_type: "Referral Income",
                    txHash: transactionHash,
                  });

                }
              } else {
                const yyu = returrrn - issss.totalIncome;
                if (yyu > 0) {
                  await levelStake.create({
                    sender: returnValues.user,
                    receiver: getref.referrer,
                    level: 1,
                    amount: amti,
                    income: yyu,
                    percent: 5,
                    income_type: "Referral Income",
                    txHash: transactionHash,
                  });
                  await registration.updateOne({ user: getref.referrer }, { $inc: { wallet_income: yyu, totalIncome: yyu } })
                }
                await stake2.updateMany({ user: getref.referrer }, { $set: { roi_status: 1 } })
              }
            }
            //  const isrefreg = await stakeRegister.findOne({ user : getref.referrer })
            //  if(!isrefreg){
            //   await stakeRegister.create({
            //     user : getref.referrer,
            //     return : 0,
            //     stake_amount : 0,
            //     topup_amount : 0,
            //     withdraw_stdate: timestampstart,
            //     withdraw_endate: timestampend,
            //     withdrawref_stdate: timestampstart,
            //     withdrawref_endate: timestampend,
            //   }) 
            //  }
            //console.log("Stake Event Updated");
          } else {
            console.log("something went wrong");
          }
        }

        // to update wallet tank income if any

        // const rego = await stakeRegister.findOne(
        //   { 
        //     user: returnValues.user,
        //     wallet_tank: { $gt: 0 }
        //   }, 
        //   { 
        //     totalIncome: 1, 
        //     wallet_tank: 1, 
        //     return: 1
        //   }
        // );
        // if (rego) {
        // const wallet_tank = rego.wallet_tank
        // const totalIncome = rego.totalIncome
        // const returnn = rego.return

        // if(returnn > totalIncome && wallet_tank > 0){
        // const remmm = returnn - totalIncome
        // if(wallet_tank <= remmm && remmm > 0){
        //   await stakeRegister.findOneAndUpdate(
        //     { user: returnValues.user },
        //     {
        //       $inc: {
        //         totalIncome: wallet_tank,
        //         wallet_referral : wallet_tank,
        //         wallet_tank : -wallet_tank
        //       },
        //     }
        //   );
        // } else if(wallet_tank > remmm && remmm > 0){
        //   await stakeRegister.findOneAndUpdate(
        //     { user: returnValues.user },
        //     {
        //       $inc: {
        //         totalIncome: remmm,
        //         wallet_referral : remmm,
        //         wallet_tank : -remmm
        //       },
        //     }
        //   );
        // }
        // }
        // }

        // to update wallet tank income if any
      } catch (e) {
        console.log("Error (EvStake Event) :", e.message);
      }
    } else if (event == "ToppedUp") {
      const issd = await stakedirect.findOne({ referrer: returnValues.user })
      // var multi = 2;
      // if(issd){
      const multi = 3;
      //}
      const isTop = await Topup.findOne({ txHash: transactionHash }, { _id: 1 })
      if (!isTop) {
        // to set perday ROI
        var ratioo = 0;
        var token = "WYZ-stUSDT";
        if (returnValues.plan == 0) {
          ratioo = 10;
        } else if (returnValues.plan == 1) {
          ratioo = 20;
        } else if (returnValues.plan == 2) {
          ratioo = 30;
        } else if (returnValues.plan == 3) {
          ratioo = 40;
        } else if (returnValues.plan == 4) {
          ratioo = 50;
        } else if (returnValues.plan == 5) {
          ratioo = 15;
          token = "sUSDT-stUSDT";
        } else if (returnValues.plan == 6) {
          ratioo = 20;
          token = "sUSDT-stUSDT";
        } else if (returnValues.plan == 7) {
          ratioo = 25;
          token = "sUSDT-stUSDT";
        }
        const data = await planData(ratioo, returnValues.amount, token);

        let totret = (data.apy / 100) * (returnValues.amount / 1e18);
        const dayss = await getReward(ratioo, token);
        const insamt = returnValues.amount / 1e18;
        totret = totret * dayss.month
        const perday = (totret) / dayss.days
        // to set perday ROI

        const istopcreat = await Topup.create({
          user: returnValues.user,
          amount: returnValues.amount / 1e18,
          plan: returnValues.plan,
          protocol: returnValues.amount,
          perdayroi: perday,
          txHash: transactionHash,
          block: blockNumber,
          timestamp: timestamp,
        });

        if (istopcreat) {
          await stakeRegister.findOneAndUpdate(
            { user: returnValues.user },
            {
              $inc: {
                return: (returnValues.amount / 1e18) * multi,
                topup_amount: returnValues.amount / 1e18
              },
            }
          );
        }

        // const rego = await stakeRegister.findOne({ user : returnValues.user}, { totalIncome : 1, wallet_tank : 1 , return : 1})
        // const wallet_tank = rego.wallet_tank
        // const totalIncome = rego.totalIncome
        // const returnn = rego.return

        // if(returnn >= totalIncome && wallet_tank > 0){
        // const remmm = returnn - totalIncome
        // if(wallet_tank <= remmm){
        //   await stakeRegister.findOneAndUpdate(
        //     { user: returnValues.user },
        //     {
        //       $inc: {
        //         totalIncome: wallet_tank,
        //         wallet_referral : wallet_tank,
        //         wallet_tank : -wallet_tank
        //       },
        //     }
        //   );
        // } else {
        //   await stakeRegister.findOneAndUpdate(
        //     { user: returnValues.user },
        //     {
        //       $inc: {
        //         totalIncome: remmm,
        //         wallet_referral : remmm,
        //         wallet_tank : -remmm
        //       },
        //     }
        //   );
        // }
        // }

      }

    }

  }
}

async function updateBlock(updatedBlock) {
  try {
    let isUpdated = await config2.updateOne(
      {},
      { $set: { lastSyncBlock: updatedBlock } }
    );
    if (!isUpdated) {
      console.log("Something went wrong!");
    }
  } catch (e) {
    console.log("Error Updating Block", e);
  }
}

async function planData(ratio, amount, curr) { //bUSDT-stUSD
  //console.log(ratio," ",amount," ",curr)
  if (ratio == 10 && curr == "WYZ-stUSDT") {
    var data = {
      token1: ratio,
      token2: 100 - ratio,
      return2x: (amount * 2) / 1e18,
      xreturn3x: (amount * 3) / 1e18,
      apy: "16.67",
      months: "12"
    }
    return data
  } else if (ratio == 20 && curr == "WYZ-stUSDT") {
    var data = {
      token1: ratio,
      token2: 100 - ratio,
      return2x: (amount * 2) / 1e18,
      xreturn3x: (amount * 3) / 1e18,
      apy: "8.33",
      months: "24"
    }
    return data
  } else if (ratio == 30 && curr == "WYZ-stUSDT") {
    var data = {
      token1: ratio,
      token2: 100 - ratio,
      return2x: (amount * 2) / 1e18,
      xreturn3x: (amount * 3) / 1e18,
      apy: "5.56",
      months: "36"
    }
    return data
  } else if (ratio == 40 && curr == "WYZ-stUSDT") {
    var data = {
      token1: ratio,
      token2: 100 - ratio,
      return2x: (amount * 2) / 1e18,
      xreturn3x: (amount * 3) / 1e18,
      apy: "4.17"
    }
    return data
  } else if (ratio == 50 && curr == "WYZ-stUSDT") {
    var data = {
      token1: ratio,
      token2: 100 - ratio,
      return2x: (amount * 2) / 1e18,
      xreturn3x: (amount * 3) / 1e18,
      apy: "3.33"
    }
    return data
  } else if (ratio == 15 && curr == "sUSDT-stUSDT") {
    var data = {
      token1: ratio,
      token2: 100 - ratio,
      return2x: (amount * 2) / 1e18,
      xreturn3x: (amount * 3) / 1e18,
      apy: "11.11"
    }
    return data
  } else if (ratio == 20 && curr == "sUSDT-stUSDT") {
    var data = {
      token1: ratio,
      token2: 100 - ratio,
      return2x: (amount * 2) / 1e18,
      xreturn3x: (amount * 3) / 1e18,
      apy: "8.33"
    }
    return data
  } else if (ratio == 25 && curr == "sUSDT-stUSDT") {
    var data = {
      token1: ratio,
      token2: 100 - ratio,
      return2x: (amount * 2) / 1e18,
      xreturn3x: (amount * 3) / 1e18,
      apy: "6.67"
    }
    return data
  }
}

async function listEvent() {
  let lastSyncBlock = await getLastSyncBlock();
  let latestBlock = await web3.eth.getBlockNumber();
  let toBlock =
    latestBlock > lastSyncBlock + 300 ? lastSyncBlock + 300 : latestBlock;
  //console.log(lastSyncBlock, toBlock);
  let events = await getEventReciept(lastSyncBlock, toBlock);
  //console.log("events", events.length);

  await processEvents(events);
  await updateBlock(toBlock);
  if (lastSyncBlock == toBlock) {
    setTimeout(listEvent, 15000);
  } else {
    setTimeout(listEvent, 5000);
  }
}



async function getUserPlanUpdate() {
  let total = await stake2.aggregate([
    { $match: { userId: userId } },
    {
      $graphLookup: {
        from: "registration",
        startWith: "$userId",
        connectFromField: "userId", // user_id for fetching
        connectToField: "referrerId", // sponcer id for fetching
        maxDepth: Number.MAX_VALUE,
        depthField: "level",
        as: "children",
      },
    },
    { $unwind: "$children" },
    { $group: { _id: null, count: { $sum: 1 } } },
  ]);
  console.log(total, "ttt");
}

// const updteschema=async()=>{
//   await registration.updateMany(
//    // { cal_status: 0, teamBusinessnew: 0 }, // Filter criteria
//    {},
//     { $set: { cal_status: 0, teamBusinessnew: 0 } } // Update operation
//   );

// }

const updateTeambussness = async () => {

  try {

    const data = await registration.aggregate([
      {
        $lookup: {

          from: "stake2",
          localField: "user",
          foreignField: "referral",
          as: "result"

        }
      }

    ])
    return res.json({
      data
    })

  } catch (error) {
    console.log(error)
  }
}

async function findUplines(txHash, uplines = []) {
  try {
    const stakeRecord = await stake2.findOne({ txHash }).exec();
    const referrerRecord = await registration.findOne({ user: stakeRecord.user }, { referrer: 1 }).exec();
    let currentReferrerId = referrerRecord.referrer;
    let i = 1;

    while (currentReferrerId && i < 16) {
      const record = await registration.findOne({ user: currentReferrerId }, { directStakeCount: 1, referrer: 1 }).exec();

      if (!record) {
        break;
      }

      const directStakeCount = record.directStakeCount || 0;
      let iselig = 0;

      switch (true) {
        case directStakeCount >= 1 && i < 4:
        case directStakeCount >= 3 && i < 7:
        case directStakeCount >= 5 && i < 11:
        case directStakeCount >= 7 && i < 16:
          iselig = 1;
          break;
        default:
          iselig = 0;
          break;
      }

      if (i == 1) {
        const isbal = await stakeRegister.findOne({ user: currentReferrerId });
        await registration.updateOne(
          { user: currentReferrerId },
          {
            $inc: { stakedirectbusiness: stakeRecord.amount }
          }
        );

        const direct_ref = (10 / 100) * stakeRecord.amount;

        if (isbal) {
          const totalIncome = isbal.totalIncome + direct_ref;
          const capping = isbal.return;
          let income_status = "";

          if (capping >= totalIncome) {
            income_status = "Credit";
            await stakeRegister.updateOne(
              { user: currentReferrerId },
              {
                $inc: { totalIncome: direct_ref, wallet_referral: direct_ref, referalIncome: direct_ref }
              }
            );

            await levelStake.create({
              sender: stakeRecord.user,
              receiver: currentReferrerId,
              level: i,
              amount: stakeRecord.amount,
              income: direct_ref,
              percent: 10,
              income_type: "Referral Income",
              income_status,
              txHash,
            });
          } else {
            income_status = "Lapse";
            await stakeRegister.updateOne(
              { user: currentReferrerId },
              {
                $inc: { wallet_tank: direct_ref }
              }
            );
          }
        }


      } else {
        const isbal = await stakeRegister.findOne({ user: currentReferrerId });
        const levper = await levelPercent(i);
        const levelIncome = (levper / 100) * stakeRecord.amount;
        let income_status = "";

        if (isbal) {
          const totalIncome = isbal.totalIncome + levelIncome;
          const capping = isbal.return;

          if (capping >= totalIncome) {
            if (iselig == 1) {
              income_status = "Credit";
              await stakeRegister.updateOne(
                { user: currentReferrerId },
                {
                  $inc: { totalIncome: levelIncome, wallet_referral: levelIncome, levelIncome: levelIncome }
                }
              );


              await levelStake.create({
                sender: stakeRecord.user,
                receiver: currentReferrerId,
                level: i,
                amount: stakeRecord.amount,
                income: levelIncome,
                percent: levper,
                income_type: "Level Income",
                income_status,
                txHash,
              });
            } else {
              income_status = "Lapse Direct Cond";
              await stakeRegister.updateOne(
                { user: currentReferrerId },
                {
                  $inc: { lapseIncome: levelIncome }
                }
              );
            }
          } else {
            income_status = "Lapse Capping Limit";
            await stakeRegister.updateOne(
              { user: currentReferrerId },
              {
                $inc: { wallet_tank: levelIncome }
              }
            );
          }
        } else {
          income_status = "Lapse Not Staked";
        }

      }

      i++;
      currentReferrerId = record.referrer;
    }

    await stake2.updateOne({ txHash }, { $set: { cal_status: 1 } });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}


async function getLevelIds(user) {

  try {
    let uplines = []
    const rec = await registration.findOne({ user: user }).exec();
    if (rec) {
      let currentReferrerId = rec.referrer;
      //console.log("currentReferrerId :: ",currentReferrerId)
      if (uplines.length == 0) {
        uplines.push(rec.referrer);
      }
      // console.log("currentReferrerId :: ",currentReferrerId)
      let i = 1;
      while (currentReferrerId) {
        const record = await registration.findOne({ user: currentReferrerId }, { referrer: 1 }).exec();

        if (!record) {
          break;
        }

        uplines.push(record.referrer);
        //console.log("referrer :: ",currentReferrerId)
        currentReferrerId = record.referrer;
      }

      return uplines;
    } else {
      return uplines;
    }
  } catch (error) {
    console.log(error)
  }
}

async function getLevelIdsTill(user, till) {

  try {
    let uplines = []
    const rec = await registration.findOne({ user: user }).exec();
    if (rec) {
      let currentReferrerId = rec.referrer;
      //console.log("currentReferrerId :: ",currentReferrerId)
      if (uplines.length == 0) {
        uplines.push(rec.referrer);
      }
      // console.log("currentReferrerId :: ",currentReferrerId)
      let i = 1;
      while (currentReferrerId) {
        const record = await registration.findOne({ user: currentReferrerId }, { referrer: 1 }).exec();

        if (!record) {
          break;
        }

        uplines.push(record.referrer);
        i++;

        if (i == till) {
          break;
        }
        //console.log("referrer :: ",currentReferrerId)
        currentReferrerId = record.referrer;
      }

      return uplines;
    } else {
      return uplines;
    }
  } catch (error) {
    console.log(error)
  }
}


async function level(txHash) {
  try {
    if (txHash != "") {
      const res = await findUplines(txHash)
      return res
    } else {
      return true;
    }
  } catch (error) {
    console.log(error)
  }
}

async function levelIncome() {
  const record = await stake2.findOne({ cal_status: 0 }).exec();
  //console.log("record :: ",record)
  if (record) {
    let levells = await level(record.txHash)
    //const stakeAmt = record.amount;
    console.log("Level Income Sent for trnsaction :: ", record.txHash)
    // const nextCheckTime = new Date(currentTime.getTime() + 24 * 30 * 60 * 60 * 1000); for 24 horurs
    // directStakeCount
    // levelStakeBonus
    //await calculateDailyReward()
  } else {
    console.log("No Level Income to Send")
  }
}

async function leveltop(txHash) {
  try {
    if (txHash != "") {
      const res = await findUplinestop(txHash)
      return res
    } else {
      return true;
    }
  } catch (error) {
    console.log(error)
  }
}

async function findUplinestop(txHash, uplines = []) {
  try {
    // Find the Topup record using txHash
    const rec = await Topup.findOne({ txHash }).exec();

    // Find the referrer for the user in the Topup record
    const usei = await registration.findOne({ user: rec.user }, { referrer: 1 }).exec();
    let currentReferrerId = usei.referrer;
    let i = 1;

    // Loop through the referrer chain until a certain level or no more referrers
    while (currentReferrerId && i < 16) {
      // Find the referrer's record with directStakeCount and referrer information
      const record = await registration.findOne({ user: currentReferrerId }, { directStakeCount: 1, referrer: 1 }).exec();
      if (!record) {
        break; // Exit the loop if no record found
      }

      let iselig = 0;

      // Check eligibility based on directStakeCount and level
      switch (true) {
        case (record.directStakeCount ? record.directStakeCount : 0) >= 1 && i < 4:
        case (record.directStakeCount ? record.directStakeCount : 0) >= 3 && i < 7:
        case (record.directStakeCount ? record.directStakeCount : 0) >= 5 && i < 11:
        case (record.directStakeCount ? record.directStakeCount : 0) >= 7 && i < 16:
          iselig = 1;
          break;
        default:
          iselig = 0;
          break;
      }

      // Handle operations based on the level
      if (i == 1) {
        // Handle first level operations
        const isbal = await stakeRegister.findOne({ user: currentReferrerId });
        await registration.updateOne(
          { user: currentReferrerId },
          { $inc: { stakedirectbusiness: rec.amount } }
        );
        const direct_ref = (10 / 100) * rec.amount;

        if (isbal) {
          var totalIncome = isbal.totalIncome + direct_ref
          var capping = isbal.return
          var income_status = capping >= totalIncome ? "Credit" : "Lapse";
          if (capping >= totalIncome) {
            await stakeRegister.updateOne(
              { user: currentReferrerId },
              { $inc: { totalIncome: direct_ref, wallet_referral: direct_ref, referalIncome: direct_ref } }
            );

            // Create levelStake record for Referral Income Topup
            await levelStake.create({
              sender: rec.user,
              receiver: currentReferrerId,
              level: i,
              amount: rec.amount,
              income: direct_ref,
              percent: 10,
              income_type: "Referral Income Topup",
              income_status,
              txHash,
            });
          } else {
            await stakeRegister.updateOne(
              { user: currentReferrerId },
              { $inc: { wallet_tank: direct_ref } }
            );
          }
        }
      } else {
        // Handle other level operations
        const isbal = await stakeRegister.findOne({ user: currentReferrerId });
        const levper = await levelPercent(i);
        const levelIncome = (levper / 100) * rec.amount;
        var income_status = "";

        if (isbal) {
          var totalIncome = isbal.totalIncome + levelIncome
          var capping = isbal.return
          income_status = capping >= totalIncome ? "Credit" : "Lapse Capping Limit";
          if (capping >= totalIncome) {
            if (iselig == 1) {
              await stakeRegister.updateOne(
                { user: currentReferrerId },
                { $inc: { totalIncome: levelIncome, wallet_referral: levelIncome, levelIncome: levelIncome } }
              );

              // Create levelStake record for Level Income Topup
              await levelStake.create({
                sender: rec.user,
                receiver: currentReferrerId,
                level: i,
                amount: rec.amount,
                income: levelIncome,
                percent: levper,
                income_type: "Level Income Topup",
                income_status,
                txHash,
              });
            } else {
              await stakeRegister.updateOne(
                { user: currentReferrerId },
                { $inc: { lapseIncome: levelIncome } }
              );
            }
          } else {
            await stakeRegister.updateOne(
              { user: currentReferrerId },
              { $inc: { wallet_tank: levelIncome } }
            );
          }
        }
      }

      i++;
      currentReferrerId = record.referrer;
    }

    // Update cal_status for the Topup record
    await Topup.updateOne({ txHash }, { $set: { cal_status: 1 } });

    return true; // Return true if the process completes successfully
  } catch (error) {
    console.error(error);
    return false; // Return false if there's an error
  }
}


async function topuplevelIncome() {
  const record = await Topup.findOne({ cal_status: 0 }).exec();
  //console.log("record :: ",record)
  if (record) {
    let levells = await leveltop(record.txHash)
    //const stakeAmt = record.amount;
    console.log("Topup Level Income Sent for trnsaction :: ", record.txHash)
    // const nextCheckTime = new Date(currentTime.getTime() + 24 * 30 * 60 * 60 * 1000); for 24 horurs
    // directStakeCount
    // levelStakeBonus
    //await calculateDailyReward()
  } else {
    console.log("No Level Income to Send")
  }
}

async function RecurringlevelIncome() {
  try {
    const records = await dailyroi.find({ recurr_status: 0 }).limit(100).exec();

    for (let rec of records) {
      let uuupids = await getLevelIdsTill(rec.user, "5");
      console.log("uuupids ", uuupids)
      for (let i = 0; i < uuupids.length; i++) {
        const record = await registration.findOne({ user: uuupids[i] }, { directStakeCount: 1, referrer: 1, stakedirectbusiness: 1 }).exec();

        if (!record) {
          break;
        }

        const levper = await levelPercentRecurr(i + 1);
        const levelIncome = (levper / 100) * rec.income;

        const isbal = await stakeRegister.findOne({ user: uuupids[i] });

        if (isbal) {
          // Example usage
          const startDate = new Date(isbal.createdAt);
          const currentDate = new Date();
          const endDate = new Date(currentDate);

          //console.log("Join Date ",isbal.createdAt);

          const diffTime = Math.abs(endDate - startDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          //console.log(`Difference in days: ${diffDays}`);

          const diffMonths = Math.floor((diffDays / 30));
          //const testdiffMonths = Math.floor((35/30));

          // console.log(`Difference in months: ${diffMonths}`);
          // console.log(`testdiffMonths in months: ${testdiffMonths}`);

          if (diffMonths < 1) {
            var mnth = 1;
          } else {
            var mnth = diffMonths + 1;
          }

          const dateRange = await getMonthRange(isbal.createdAt);
          const alldetails = await sumBizInAMonth(isbal.createdAt, dateRange.startDate, dateRange.endDate, uuupids[i]);
          console.log("wall address ", uuupids[i])
          console.log(`all_business_detail `, alldetails);

          var prevmonthbiz = alldetails.prevBiz
          var prevmonthDir = alldetails.prevDir
          var currentbiz = alldetails.monthBiz
          var currentDir = alldetails.monthDir

          var totalStakedirectbusiness = 0;
          var directStake = 0;

          if (mnth < 2) {
            totalStakedirectbusiness = await calculateDirectsesy(uuupids[i]);
            directStake = record.directStakeCount;
          } else {
            var emnth = mnth - 1;
            var cfdcount = 5 * emnth;
            var cfbiz = 100 * 5 * emnth;
            var extdir = 0;
            var extbiz = 0;
            if (prevmonthDir > cfdcount) {
              extdir = prevmonthDir - cfdcount;
            }

            if (prevmonthbiz > cfbiz) {
              extbiz = prevmonthbiz - cfbiz;
            }
            totalStakedirectbusiness = currentbiz;
            totalStakedirectbusiness = totalStakedirectbusiness + extbiz;
            directStake = currentDir;
            directStake = directStake + extdir;
          }

          var dcnt = i + 1;
          var biz = dcnt * 100;

          console.log("totalStakedirectbusiness ", totalStakedirectbusiness)
          console.log("directStake ", directStake)
          console.log("biz ", biz)
          console.log("dcnt ", dcnt)

          var iselig = (directStake ? directStake : 0) >= dcnt || totalStakedirectbusiness >= biz ? 1 : 0;
          console.log("iselig ", iselig)
          console.log("mnth ", mnth)

          var totalIncome = isbal.totalIncome + levelIncome;
          var capping = isbal.return;
          var income_status = "";

          if (capping >= totalIncome && iselig == 1) {
            income_status = "Credit";
            const recupd = await stakeRegister.updateOne(
              { user: uuupids[i] },
              {
                $inc: { wallet_recurr: levelIncome, recurrIncome: levelIncome }
              }
            );

            if (recupd.modifiedCount > 0) {
              await levelRecurr.create({
                sender: rec.user,
                receiver: uuupids[i],
                level: dcnt,
                amount: rec.income,
                income: levelIncome,
                percent: levper,
                monthtilljoin: mnth,
                directs: record.directStakeCount,
                reqdirects: dcnt,
                directbiz: totalStakedirectbusiness,
                reqbiz: biz,
                txHash: rec.txHash,
                income_status: income_status
              });
            }

            // const viewdata = {
            //   sender: rec.user,
            //   receiver: uuupids[i],
            //   level: ie,
            //   amount: rec.income,
            //   income: levelIncome,
            //   percent: levper,
            //   monthtilljoin: mnth,
            //   directs : record.directStakeCount,
            //   reqdirects : dcnt,
            //   directbiz : totalStakedirectbusiness,
            //   reqbiz : biz,
            //   income_status: income_status
            // }

            // console.log("recurring income ",viewdata)

          } else if (capping >= totalIncome && iselig == 0) {
            income_status = "Lapse Condition";
            // console.log("income_status ",income_status)
            // const viewdata = {
            //   sender: rec.user,
            //   receiver: uuupids[i],
            //   level: ie,
            //   amount: rec.income,
            //   income: levelIncome,
            //   percent: levper,
            //   monthtilljoin: mnth,
            //   directs : record.directStakeCount,
            //   reqdirects : dcnt,
            //   directbiz : totalStakedirectbusiness,
            //   reqbiz : biz,
            //   income_status: income_status
            // }

            // console.log("recurring income ",viewdata)

            await levelRecurrLapse.create({
              sender: rec.user,
              receiver: uuupids[i],
              level: dcnt,
              amount: rec.income,
              income: levelIncome,
              percent: levper,
              monthtilljoin: mnth,
              directs: record.directStakeCount,
              reqdirects: dcnt,
              directbiz: totalStakedirectbusiness,
              reqbiz: biz,
              txHash: rec.txHash,
              income_status: income_status
            });
          } else {
            income_status = "Lapse Capping";
            // console.log("income_status ",income_status)
            // const viewdata = {
            //   sender: rec.user,
            //   receiver: uuupids[i],
            //   level: ie,
            //   amount: rec.income,
            //   income: levelIncome,
            //   percent: levper,
            //   monthtilljoin: mnth,
            //   directs : record.directStakeCount,
            //   reqdirects : dcnt,
            //   directbiz : totalStakedirectbusiness,
            //   reqbiz : biz,
            //   income_status: income_status
            // }

            await levelRecurrLapse.create({
              sender: rec.user,
              receiver: uuupids[i],
              level: dcnt,
              amount: rec.income,
              income: levelIncome,
              percent: levper,
              monthtilljoin: mnth,
              directs: record.directStakeCount,
              reqdirects: dcnt,
              directbiz: totalStakedirectbusiness,
              reqbiz: biz,
              txHash: rec.txHash,
              income_status: income_status
            });

            //console.log("recurring income ",viewdata)
          }
        }
      }

      await dailyroi.updateOne({ _id: rec._id }, { $set: { recurr_status: 1 } });
    }

    if (records.length === 0) {
      console.log("No Recurring Level Income to Send");
    }
  } catch (error) {
    console.error("Error in RecurringlevelIncome:", error);
  }
}


// async function calculateDailyReward(totalReturn, investmentDays) {
//   // Calculate daily reward
//   const dailyReward = totalReturn / investmentDays;

//   return dailyReward;
// }

async function getReward(ratio, token) {
  if (ratio == "10" && token == "WYZ-stUSDT") {
    const rewdays = {
      month: "12",
      days: "365"
    }
    return rewdays
  }

  if (ratio == "20" && token == "WYZ-stUSDT") {
    const rewdays = {
      month: "24",
      days: "730"
    }
    return rewdays
  }

  if (ratio == "30" && token == "WYZ-stUSDT") {
    const rewdays = {
      month: "36",
      days: "1095"
    }
    return rewdays
  }

  if (ratio == "40" && token == "WYZ-stUSDT") {
    const rewdays = {
      month: "48",
      days: "1460"
    }
    return rewdays
  }

  if (ratio == "50" && token == "WYZ-stUSDT") {
    const rewdays = {
      month: "60",
      days: "1825"
    }
    return rewdays
  }

  if (ratio == "15" && token == "sUSDT-stUSDT") {
    const rewdays = {
      month: "18",
      days: "548"
    }
    return rewdays
  }

  if (ratio == "20" && token == "sUSDT-stUSDT") {
    const rewdays = {
      month: "24",
      days: "730"
    }
    return rewdays
  }

  if (ratio == "25" && token == "sUSDT-stUSDT") {
    const rewdays = {
      month: "30",
      days: "913"
    }
    return rewdays
  }
}

async function withdrawIncome(req, res) {
  try {
    const { wallet_address, plan, amount, withdrawtype, txHash } = req.body
    if (amount < 1e19) {
      return res
        .status(200)
        .json({ status: false, message: "Minimum Withdrawal is $10" });
    }
    var token = "WYZ-stUSDT";
    //var token = "bUSDT-stUSDT";
    var ratio = 0;
    if (plan == 1) {
      ratio = 10;
    } else if (plan == 2) {
      ratio = 20;
    } else if (plan == 3) {
      ratio = 30;
    } else if (plan == 4) {
      ratio = 40;
    } else if (plan == 5) {
      ratio = 50;
    } else if (plan == 6) {
      ratio = 15;
      token = "sUSDT-stUSDT";
    } else if (plan == 7) {
      ratio = 20;
      token = "sUSDT-stUSDT";
    } else if (plan == 8) {
      ratio = 25;
      token = "sUSDT-stUSDT";
    }
    const isstake = await stake2.findOne({ txHash: txHash, user: wallet_address, ratio: ratio, token: token })
    if (!isstake) {
      return res
        .status(200)
        .json({ status: false, message: "No Staking Found" });
    }
    if (withdrawtype == "roi") {
      const currentTime = new Date();
      if (currentTime > isstake.withdraw_stdate && currentTime < isstake.withdraw_endate) {
        const chkBal = await stakeRegister.findOne({ user: wallet_address, wallet_balance: { $gte: amount } })
        if (chkBal) {
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          const nextTimestrt = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
          const timestampstart = nextTimestrt.getTime();

          const currentDate2 = new Date();
          currentDate2.setHours(23, 59, 59, 999);
          const nextTimeend = new Date(currentDate2.getTime() + 30 * 24 * 60 * 60 * 1000);
          const timestampend = nextTimeend.getTime();
          const hchh = await stakeRegister.updateOne(
            { user: wallet_address, txHash: txHash },
            {
              $inc: {
                wallet_balance: -amount
              },
              // $set: {
              //   withdraw_stdate: timestampstart,
              //   withdraw_endate: timestampend
              // }
            }
          )

          if (hchh.modifiedCount > 0) {
            return res
              .status(200)
              .json({ status: true, message: "Withdraw Successfull" });
          }
        }

      } else {
        return res
          .status(200)
          .json({ status: false, message: "You Cannot Withdraw" });
      }
    } else if (withdrawtype == "referral") {
      const currentTime = new Date();
      if (currentTime > isstake.withdrawref_stdate && currentTime < isstake.withdrawref_endate) {
        const chkBal = await stake2.findOne({ txHash: txHash, user: wallet_address, wallet_referral: { $gte: amount } })
        if (chkBal) {
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          const nextTimestrt = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
          const timestampstart = nextTimestrt.getTime();

          const currentDate2 = new Date();
          currentDate2.setHours(23, 59, 59, 999);
          const nextTimeend = new Date(currentDate2.getTime() + 30 * 24 * 60 * 60 * 1000);
          const timestampend = nextTimeend.getTime();
          const hchh = await stake2.updateOne(
            { user: wallet_address, txHash: txHash },
            {
              $inc: {
                wallet_balance: -amount
              },
              // $set: {
              //   withdrawref_stdate: timestampstart,
              //   withdrawref_endate: timestampend
              // }
            }
          )

          if (hchh.modifiedCount > 0) {
            return res
              .status(200)
              .json({ status: true, message: "Withdraw Successfull" });
          }
        }

      } else {
        return res
          .status(200)
          .json({ status: false, message: "You Cannot Withdraw" });
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function levelPercent(i) {
  if (i == 1) {
    return 30
  } else if (i == 2) {
    return 15
  } else if (i == 3) {
    return 7.5
  } else if (i == 4) {
    return 5
  } else if (i == 5) {
    return 4
  } else if (i >= 5 && i <= 10) {
    return 3
  } else if (i >= 11 && i <= 15) {
    return 2.5
  } else if (i >= 16 && i <= 20) {
    return 2
  } else if (i >= 21 && i <= 25) {
    return 1
  }
}

async function levelPercentRecurr(i) {
  if (i == 1) {
    return 25
  } else if (i == 2) {
    return 10
  } else if (i == 3 || i == 4) {
    return 5
  } else if (i == 5) {
    return 15
  }
}

async function upids(user) {
  try {
    const uplevels = await getLevelIds(user)
    return uplevels
  } catch (error) {
    console.log(error)
  }
}

async function roiwallet() {
  try {
    const formattedDateTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

    const stakings = await stake2.find({ roi_status: 0 }).lean();
    const calculatedDataList = await Promise.all(stakings.map(async entry => {
      const stakeregis = await registration.findOne({ user: entry.user }, { return: 1, totalIncome: 1 });
      if (stakeregis) {
        const perdayroi = entry.perdayroi;
        const allincome = stakeregis.totalIncome ? stakeregis.totalIncome : 0;
        const total = allincome + perdayroi;
        const income_status = stakeregis.return >= total ? "Credit" : "Lapse Capping";

        return {
          user: entry.user,
          stakeid: entry._id.toString(),
          income: perdayroi,
          amount: entry.amount,
          ratio: entry.ratio,
          token: entry.token,
          income_status: income_status,
          totalIncome: allincome,
          capping: stakeregis.return,
          first_stake: entry.first_stake,
          send_status: entry.send_status,
          txHash: entry.txHash
        };
      } else {
        console.log("No ROI data found for user:", entry.user);
        return null;
      }
    }));

    // Remove null entries from calculatedDataList
    const filteredDataList = calculatedDataList.filter(entry => entry !== null);

    // Step 3: Update the registration table using bulk operations
    const bulkUpdateOps = await Promise.all(
      filteredDataList.map(async (data) => {
        if (data.income_status === "Credit") {
          return {
            updateOne: {
              filter: { user: data.user },
              update: { $inc: { wallet_income: data.income, roiincome: data.income, totalIncome: data.income } }
            }
          };
        } else {
          // Perform the asynchronous update for "stake2"
          await stake2.updateMany({ user: data.user }, { $set: { roi_status: 1 } });

          return {
            updateOne: {
              filter: { user: data.user },
              update: { $inc: { wallet_tank: data.income } }
            }
          };
        }
      })
    );

    if (bulkUpdateOps.length > 0) {
      await registration.bulkWrite(bulkUpdateOps);
    }

    // Step 4: Insert the calculated data into another table using bulk insert
    if (filteredDataList.length > 0) {
      await dailyroi.insertMany(filteredDataList);
    }

  } catch (error) {
    console.log(error)
  }
}

async function topuproi() {
  try {
    const formattedDateTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

    const stakings = await Topup.find({}).lean();
    const calculatedDataList = await Promise.all(stakings.map(async entry => {
      const stakeregis = await stakeRegister.findOne({ user: entry.user }, { return: 1, totalIncome: 1 });
      if (stakeregis) {
        const perdayroi = entry.perdayroi;
        const allincome = stakeregis.totalIncome ? stakeregis.totalIncome : 0;
        const total = allincome + perdayroi;
        const income_status = stakeregis.return >= total ? "Credit" : "Lapse Capping";

        return {
          user: entry.user,
          stakeid: entry._id.toString(),
          income: perdayroi,
          amount: entry.amount,
          ratio: entry.plan,
          token: entry.plan,
          income_status: income_status,
          totalIncome: allincome,
          capping: stakeregis.return,
          txHash: entry.txHash
        };
      } else {
        console.log("No ROI data found for user:", entry.user);
        return null;
      }
    }));

    // Remove null entries from calculatedDataList
    const filteredDataList = calculatedDataList.filter(entry => entry !== null);

    // Step 3: Update the registration table using bulk operations
    const bulkUpdateOps = filteredDataList.map(data => {
      if (data.income_status === "Credit") {
        return {
          updateOne: {
            filter: { user: data.user },
            update: { $inc: { wallet_roi: data.income, totalIncome: data.income } }
          }
        };
      } else {
        return {
          updateOne: {
            filter: { user: data.user },
            update: { $inc: { wallet_tank: data.income } }
          }
        };
      }
    });

    if (bulkUpdateOps.length > 0) {
      await stakeRegister.bulkWrite(bulkUpdateOps);
    }

    // Step 4: Insert the calculated data into another table using bulk insert
    if (filteredDataList.length > 0) {
      await dailyroi.insertMany(filteredDataList);
    }

  } catch (error) {
    console.log(error)
  }
}


async function updateStakeTeamBusiness() {
  try {
    const record = await stake2.findOne({ calteam_status: 0 }).exec();
    if (record) {
      const team = await upids(record.user);
      if (team.length > 0) {
        //await Promise.all(team.slice(1).map(async address => {
        await Promise.all(team.map(async address => {
          await registration.updateOne(
            { user: address },
            {
              $set: { staketeambusiness: record.amount }, // Replace 'record.amount' with your actual value
              //$inc: { staketeamCount: 1 } // Increment the team count by 1
            }
          );
        }));
      }
      await stake2.updateOne({ user: record.user }, { $set: { calteam_status: 1 } })
      //console.log("up teams ",team)
    }
  } catch (error) {

  }

}

async function updateTopupTeamBusiness() {
  try {
    const record = await Topup.findOne({ calteam_status: 0 }).exec();
    if (record) {
      const team = await upids(record.user);
      if (team.length > 0) {
        //await Promise.all(team.slice(1).map(async address => {
        await Promise.all(team.map(async address => {
          await registration.updateOne(
            { user: address },
            {
              $set: { staketeambusiness: record.amount }, // Replace 'record.amount' with your actual value
              //$inc: { staketeamCount: 1 } // Increment the team count by 1
            }
          );
        }));
      }
      await Topup.updateOne({ user: record.user }, { $set: { calteam_status: 1 } })
      //console.log("up teams ",team)
    }
  } catch (error) {

  }

}

async function updateWithdrawDates() {
  const currentTime = new Date();
  const thirtyMinutesInMs = 30 * 60 * 1000;
  const thirtyOneMinutesInMs = 31 * 60 * 1000;

  try {
    console.log("currentTime :: ", currentTime)
    const recordsToUpdate = await stakeRegister.find({ withdraw_endate: { $lt: currentTime } });
    //console.log(recordsToUpdate)
    if (recordsToUpdate) {
      const bulkOps = recordsToUpdate.map(record => {
        return {
          updateOne: {
            filter: { _id: record._id },
            update: {
              $set: {
                withdraw_stdate: new Date(record.withdraw_stdate.getTime() + thirtyMinutesInMs),
                withdraw_endate: new Date(record.withdraw_endate.getTime() + thirtyOneMinutesInMs)
              }
            }
          }
        };
      });

      if (bulkOps.length > 0) {
        await stakeRegister.bulkWrite(bulkOps);
        console.log('roi withdraw time updated successfully.');
      } else {
        console.log('No roi withdraw time to update.');
      }
    } else {
      console.log('No roi withdraw time to update.');
    }
    // for referral withdrawal

    const ToUpdate = await stakeRegister.find({ withdrawref_endate: { $lt: currentTime } });
    if (ToUpdate) {
      const bulkrefOps = ToUpdate.map(record => {
        return {
          updateOne: {
            filter: { _id: record._id },
            update: {
              $set: {
                withdraw_stdate: new Date(record.withdrawref_stdate.getTime() + thirtyMinutesInMs),
                withdraw_endate: new Date(record.withdrawref_endate.getTime() + thirtyOneMinutesInMs)
              }
            }
          }
        };
      });

      if (bulkrefOps.length > 0) {
        await stakeRegister.bulkWrite(bulkrefOps);
        console.log('referral withdraw time updated successfully.');
      } else {
        console.log('No referral withdraw time to update.');
      }
    } else {
      console.log('No referral withdraw time to update.');
    }
  } catch (error) {
    console.error('Error updating records:', error);
  }
}

async function findAllDescendantsOld(referrer) {
  const allUserIds = new Set();
  let currentLevel = [referrer];

  while (currentLevel.length > 0) {
    const directMembers = await registration.aggregate([
      { $match: { referrer: { $in: currentLevel } } },
      { $group: { _id: null, users: { $addToSet: "$user" } } }
    ]);

    if (directMembers.length === 0) {
      break;
    }

    currentLevel = directMembers[0].users;
    currentLevel.forEach(id => allUserIds.add(id));
  }

  return Array.from(allUserIds);
}

async function findAllDescendants(referrer) {
  const allUserIds = new Set();
  let currentLevel = [referrer];
  let firstIteration = true;

  while (currentLevel.length > 0) {
    const directMembers = await registration.aggregate([
      { $match: { referrer: { $in: currentLevel } } },
      { $group: { _id: null, users: { $addToSet: "$user" } } }
    ]);

    if (directMembers.length === 0) {
      break;
    }

    currentLevel = directMembers[0].users;

    if (!firstIteration) {
      currentLevel.forEach(id => allUserIds.add(id));
    }
    firstIteration = false;
  }

  return Array.from(allUserIds);
}

async function setTeamBusiness() {
  try {
    // Step 1: Get all users from stakeRegister
    const allUsers = await registration.distinct('user');

    // Step 2: For each user, find all team members recursively and sum their investments
    for (const user of allUsers) {
      const allTeamMembers = await findAllDescendants(user);
      const dirbizz = await calculateDirectsesy(user);
      // Aggregate amounts from stake2 schema
      const stake2Result = await stake2.aggregate([
        { $match: { user: { $in: allTeamMembers } } },
        { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
      ]);

      const stake2TotalAmount = stake2Result.length > 0 ? stake2Result[0].totalAmount : 0;

      // Sum the amounts from both schemas
      const totalAmount = stake2TotalAmount;
      const directplus = totalAmount + dirbizz;
      // Update the registration collection with the total team business amount
      await registration.updateOne(
        { user: user },
        {
          $set: {
            staketeambusiness: totalAmount,
            directplusteambiz: directplus,
            directbusiness: dirbizz
          }
        }
      );
    }

    console.log("Team business update done");
    return true;
  } catch (error) {
    console.error('Error in API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function calculateDirects(walletAddress) {
  try {
    // Step 1: Find direct members from the registration schema
    const directMembers = await registration.find({ referrer: walletAddress }).select('user');
    const userIds = directMembers.map(member => member.user);

    // Step 2: Find corresponding records in the stake2 schema and sum the amount
    const stakeResult = await stake2.aggregate([
      { $match: { user: { $in: userIds } } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
    ]);
    const stakeTotalAmount = stakeResult.length > 0 ? stakeResult[0].totalAmount : 0;

    // Step 3: Find corresponding records in the topup schema and sum the amount
    const topupResult = await Topup.aggregate([
      { $match: { user: { $in: userIds } } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
    ]);
    const topupTotalAmount = topupResult.length > 0 ? topupResult[0].totalAmount : 0;

    // Step 4: Return the sum of amounts from both schemas
    return stakeTotalAmount + topupTotalAmount;
  } catch (error) {
    console.error('Error in function:', error);
    throw new Error('Internal Server Error');
  }
}

async function calculateDirectsesy(walletAddress) {
  try {
    // Step 1: Find direct members from the registration schema
    const directMembers = await stakedirect.find({ referrer: walletAddress }).select('user');
    const userIds = directMembers.map(member => member.user);

    // Step 2: Find corresponding records in the stakeRegister schema and sum the topupAmount
    const stakeRegisterResult = await registration.aggregate([
      { $match: { user: { $in: userIds } } },
      { $group: { _id: null, totalAmount: { $sum: '$stake_amount' } } }
    ]);
    const stakeRegisterTotalAmount = stakeRegisterResult.length > 0 ? stakeRegisterResult[0].totalAmount : 0;

    // Step 3: Return the total amount
    return stakeRegisterTotalAmount;
  } catch (error) {
    console.error('Error in function:', error);
    throw new Error('Internal Server Error');
  }
}


async function sendRankReward() {
  try {
    const rewa = await stakeReward.findOne({ send_status: 0 }).exec();
    if (rewa) {
      const amount = rewa.amount
      const isupd = await registration.updateOne({ user: rewa.user }, { $inc: { rankbonus: amount } })
      if (isupd.modifiedCount > 0) {
        await stakeReward.updateOne({ _id: rewa._id }, { $set: { send_status: 1 } })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // Convert to hexadecimal format
    .slice(0, length); // Trim to desired length
}

async function calculatePoolReward() {
  try {
    // Calculate the date 24 hours ago
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Aggregate sums from Stake2 collection
    const stake2Result = await stake2.aggregate([
      { $match: { createdAt: { $gte: oneDayAgo } } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
    ]);

    const stake2Sum = stake2Result.length > 0 ? stake2Result[0].totalAmount : 0;

    // Aggregate sums from Topup collection
    const topupResult = await Topup.aggregate([
      { $match: { createdAt: { $gte: oneDayAgo } } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
    ]);

    const topupSum = topupResult.length > 0 ? topupResult[0].totalAmount : 0;

    // Calculate the combined sum
    const totalSum = stake2Sum + topupSum;

    // for income of POOL 50000

    const pool50k = await stakePool.find({ pool: 50000 })

    const uniqueUsers = await Promise.all(
      pool50k.map(async entry => {
        const isInOtherPools = await stakePool.findOne({
          user: entry.user,
          $or: [
            { pool: 150000 },
            { pool: 400000 }
          ]
        });

        if (!isInOtherPools) {
          return {
            user: entry.user
          };
        } else {
          return null; // Exclude this user
        }
      })
    );

    // Filter out null values from the uniqueUsers array
    const poolfiftyk = uniqueUsers.filter(entry => entry !== null);

    if (poolfiftyk) {
      const stakePercentage = 0.005; // 0.5%
      const poolfiftykIncome = totalSum * stakePercentage; // 0.5% of totalSum

      // Calculate the total topup amount for all users in the 50k pool
      const totalTopupAmount = await registration.aggregate([
        { $match: { user: { $in: poolfiftyk.map(user => user.user) } } },
        { $group: { _id: null, total: { $sum: "$directplusteambiz" } } }
      ]);

      if (totalTopupAmount.length > 0) {
        const totalTopup = totalTopupAmount[0].total;
        const txn_id = await generateRandomString(19);
        // Iterate over each user in the pool and calculate their share
        for (const user of poolfiftyk) {
          const userTopup = await registration.findOne({ user: user.user });
          if (userTopup) {
            const userTopupAmount = userTopup.directplusteambiz;
            const userPercent = (userTopupAmount / totalTopup) * 100;
            const userIncome = (userTopupAmount / totalTopup) * poolfiftykIncome;

            // Insert record in stakePoolIncome schema
            const stakePoolIncome = await stakepoolincome.create({
              user: user.user,
              amount: userIncome,
              yourinvestment: userTopupAmount,
              percent: userPercent,
              pool: 50000,
              txn_id: txn_id, // Replace with actual transaction ID
              totalBusiness: totalSum
            });

            await stakePoolIncome.save();
          }
        }
      }
    }

    // for pool 150000

    const pool150k = await stakePool.find({ pool: 150000 })


    const uniqueUsers2 = await Promise.all(
      pool150k.map(async entry => {
        const isInOtherPools = await stakePool.findOne({
          user: entry.user, pool: 400000
        });

        if (!isInOtherPools) {
          return {
            user: entry.user
          };
        } else {
          return null; // Exclude this user
        }
      })
    );

    // Filter out null values from the uniqueUsers array
    const poolonefiftyk = uniqueUsers2.filter(entry => entry !== null);

    if (poolonefiftyk) {
      const stakePercentage = 0.0075; // 0.5%
      const poolonefiftykIncome = totalSum * stakePercentage; // 0.5% of totalSum

      // Calculate the total topup amount for all users in the 50k pool
      const totalTopupAmount = await registration.aggregate([
        { $match: { user: { $in: poolonefiftyk.map(user => user.user) } } },
        { $group: { _id: null, total: { $sum: "$directplusteambiz" } } }
      ]);

      if (totalTopupAmount.length > 0) {
        const totalTopup = totalTopupAmount[0].total;
        const txn_id = await generateRandomString(19);
        // Iterate over each user in the pool and calculate their share
        for (const user of poolonefiftyk) {
          const userTopup = await registration.findOne({ user: user.user });
          if (userTopup) {
            const userTopupAmount = userTopup.directplusteambiz;
            const userPercent = (userTopupAmount / totalTopup) * 100;
            const userIncome = (userTopupAmount / totalTopup) * poolonefiftykIncome;

            // Insert record in stakePoolIncome schema
            const stakePoolIncome = await stakepoolincome.create({
              user: user.user,
              amount: userIncome,
              yourinvestment: userTopupAmount,
              percent: userPercent,
              pool: 150000,
              txn_id: txn_id, // Replace with actual transaction ID
              totalBusiness: totalSum
            });

            await stakePoolIncome.save();
          }
        }
      }
    }

    // for pool 400000

    const poolfourhundk = await stakePool.find({ pool: 400000 })

    if (poolfourhundk) {
      const stakePercentage = 0.0125; // 0.5%
      const poolfourhundrIncome = totalSum * stakePercentage; // 0.5% of totalSum

      // Calculate the total topup amount for all users in the 50k pool
      const totalTopupAmount = await registration.aggregate([
        { $match: { user: { $in: poolfourhundk.map(user => user.user) } } },
        { $group: { _id: null, total: { $sum: "$directplusteambiz" } } }
      ]);

      if (totalTopupAmount.length > 0) {
        const totalTopup = totalTopupAmount[0].total;
        const txn_id = await generateRandomString(19);
        // Iterate over each user in the pool and calculate their share
        for (const user of poolfourhundk) {
          const userTopup = await registration.findOne({ user: user.user });
          if (userTopup) {
            const userTopupAmount = userTopup.directplusteambiz;
            const userPercent = (userTopupAmount / totalTopup) * 100;
            const userIncome = (userTopupAmount / totalTopup) * poolfourhundrIncome;

            // Insert record in stakePoolIncome schema
            const stakePoolIncome = await stakepoolincome.create({
              user: user.user,
              amount: userIncome,
              yourinvestment: userTopupAmount,
              percent: userPercent,
              pool: 400000,
              txn_id: txn_id, // Replace with actual transaction ID
              totalBusiness: totalSum
            });

            await stakePoolIncome.save();
          }
        }
      }
    }


  } catch (error) {
    console.error('Error summing amounts:', error);
  }
}

async function getMonthRange(joiningDateStr) {
  // Parse the joining date string to a Date object
  const joiningDate = new Date(joiningDateStr);

  // Get the current date
  const currentDate = new Date();

  // Extract the day from the joining date
  const joiningDay = joiningDate.getDate();

  // Construct the start date for the current month based on the joining day
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), joiningDay);

  // Construct the end date for the current month by adding one month to the start date
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  // Format the dates to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get the formatted start and end dates
  const startDateStr = formatDate(startDate);
  const endDateStr = formatDate(endDate);

  return { startDate: startDateStr, endDate: endDateStr };
}

async function sumBizInAMonth(joindate, startDate, endDate, userAddr) {

  const directMembers = await stakedirect.find({ referrer: userAddr }).select('user');
  const userIds = directMembers.map(member => member.user);
  //console.log("Directs team ",userIds)
  console.log("joindate ", joindate)
  console.log("startDate ", startDate)
  console.log("endDate ", endDate)
  console.log("userAddr ", userAddr)
  // Step 2: Find corresponding records in the stakeRegister schema and sum the topupAmount
  console
  const stake2Result = await stake2.aggregate([
    {
      $match: {
        user: { $in: userIds },
        createdAt: {
          $gte: startDate,
          $lt: endDate
        }
      }
    },
    {
      $group: {
        _id: null,
        totalStake2: { $sum: '$amount' }
      }
    }
  ]);

  // Aggregate Topup amounts
  const topupResult = await Topup.aggregate([
    {
      $match: {
        user: { $in: userIds },
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate)
        }
      }
    },
    {
      $group: {
        _id: null,
        totalTopup: { $sum: '$amount' }
      }
    }
  ]);

  const totalStake2 = stake2Result[0] ? stake2Result[0].totalStake2 : 0;
  const totalTopup = topupResult[0] ? topupResult[0].totalTopup : 0;
  const totalSum = totalStake2 + totalTopup;

  // direct count

  const count = await stakedirect.countDocuments({
    referrer: userAddr,
    createdAt: {
      $gte: new Date(startDate),
      $lt: new Date(endDate)
    }
  });

  // previous month count

  const prevstake2Result = await stake2.aggregate([
    {
      $match: {
        user: { $in: userIds },
        createdAt: {
          $gte: new Date(joindate),
          $lt: new Date(startDate)
        }
      }
    },
    {
      $group: {
        _id: null,
        totalStake2: { $sum: '$amount' }
      }
    }
  ]);

  // Aggregate Topup amounts
  const prevtopupResult = await Topup.aggregate([
    {
      $match: {
        user: { $in: userIds },
        createdAt: {
          $gte: new Date(joindate),
          $lt: new Date(startDate)
        }
      }
    },
    {
      $group: {
        _id: null,
        totalTopup: { $sum: '$amount' }
      }
    }
  ]);

  const prevResult = prevstake2Result[0] ? prevstake2Result[0].totalStake2 : 0;
  const prevTopup = prevtopupResult[0] ? prevtopupResult[0].totalTopup : 0;
  const prevBiz = prevResult + prevTopup

  const prevcount = await stakedirect.countDocuments({
    referrer: userAddr,
    createdAt: {
      $gte: new Date(joindate),
      $lt: new Date(startDate)
    }
  });

  return { monthBiz: totalSum, monthDir: count, prevBiz: prevBiz, prevDir: prevcount };
}

async function sendPoolReward() {
  try {
    const rewa = await stakepoolincome.findOne({ send_status: 0 }).limit(1).exec();
    if (rewa) {
      const amount = rewa.amount
      const isupd = await stakeRegister.updateOne({ user: rewa.user }, { $inc: { poolbonus: amount, poolIncome: amount } })
      if (isupd.modifiedCount > 0) {
        await stakepoolincome.updateOne({ _id: rewa._id }, { $set: { send_status: 1 } })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

function calculateIncomeAndPackage(investment) {
  // if (investment < 60 || investment >= 10000) {
  //     throw new Error('Investment must be greater than $60 and less than $10000.');
  // }

  let monthlyRate;
  let packageName;

  // if (investment >= 60 && investment <= 1000) {
  monthlyRate = 0.15; // 6%
  packageName = "Gold";
  // } else if (investment >= 1001 && investment <= 6000) {
  //     monthlyRate = 0.09; // 9%
  //     packageName = "Platinum";
  // } else if (investment >= 6001 && investment <= 9999) {
  //     monthlyRate = 0.12; // 12%
  //     packageName = "Diamond";
  // } else {
  //     throw new Error('Investment amount out of bounds.');
  // }

  const perDayIncome = (investment * monthlyRate) / 30; // Assuming 30 days in a month

  return {
    perDayIncome: perDayIncome,
    packageName: packageName
  };
}

async function levelOnRoi() {
  try {
    const allrois = await dailyroi.find({ level_status: 0, send_status: 0, first_stake: 1 }).limit(100).lean().exec();
    //console.log("allrois :  ", allrois);

    if (allrois.length > 0) {
      const levelStakeOps = [];

      for (const rec of allrois) {
        //console.log("user addrs ",rec.user)
        const oku = await registration.findOne({ user: rec.user, referrerId: { $ne: 0 } }, { referrer: 1, totalIncome: 1, return: 1 }).lean().exec();
        if (oku) {
          let currentReferrerId = oku.referrer;
          let i = 1;

          while (currentReferrerId) {
            const record = await registration.findOne({ user: currentReferrerId }, { directStakeCount: 1, referrer: 1, totalIncome: 1, return: 1 }).lean().exec();
            if (!record) break;

            let iselig = 0;
            const directStakeCount = record.directStakeCount ? record.directStakeCount : 0;

            if ((i >= 1 || i <= 3) && directStakeCount >= 1) {
              iselig = 1;
            } else if ((i > 3 || i <= 5) && directStakeCount >= 3) {
              iselig = 1;
            } else if ((i > 5 || i <= 10) && directStakeCount >= 5) {
              iselig = 1;
            } else if ((i > 10 || i <= 15) && directStakeCount >= 7) {
              iselig = 1;
            } else if ((i > 15 || i <= 20) && directStakeCount >= 10) {
              iselig = 1;
            }

            if (iselig === 1) {
              let direct_ref, levelIncome, income_status = "Credit";
              const incomeData = { level: i, percent: await levelPercent(i), type: "Level Income" };
              incomeData.amount = rec.income;
              incomeData.income = (incomeData.percent / 100) * rec.income;

              const nowinc = record.totalIncome + incomeData.income;


              await registration.updateOne(
                { user: currentReferrerId },
                {
                  $inc: {
                    totalIncome: incomeData.income,
                    wallet_income: incomeData.income,
                    roilevelIncome: incomeData.income
                  }
                }
              );

              await stake2.updateOne(
                { txHash: rec.txHash },
                {
                  $inc: {
                    incomesent: incomeData.income
                  }
                }
              );

              levelStakeOps.push({
                insertOne: {
                  document: {
                    sender: rec.user,
                    receiver: currentReferrerId,
                    level: incomeData.level,
                    amount: rec.amount,
                    income: incomeData.income,
                    percent: incomeData.percent,
                    income_type: incomeData.type,
                    txHash: rec.txHash
                  }
                }
              });

              const invst = await stake2.findOne({ txHash: rec.txHash }, { incomesent: 1 });
              // console.log("incomesent ",invst.incomesent)
              // console.log("amount ",rec.amount)
              const incper = (invst.incomesent / rec.amount) * 100;
              // console.log("percent ",incper)
              if (incper >= 60) {
                console.log(" coming here inss");
                await stake2.updateOne({ txHash: rec.txHash }, { $set: { send_status: 1 } })
              }
            }

            i++;
            if (i === 21) break;
            currentReferrerId = record.referrer;
          }

          await dailyroi.updateOne({ _id: rec._id }, { $set: { level_status: 1 } });
        }
      }

      if (levelStakeOps.length > 0) {
        await levelStake.bulkWrite(levelStakeOps);
      }

    } else {
      console.log("No Level Income to Send");
    }
  } catch (error) {
    console.log(error);
  }
}

async function levelOnRoinew() {
  try {
    const allrois = await dailyroi.find({ level_status: 0, first_stake: 1 }).limit(100).lean().exec();
    console.log("allrois :  ", allrois);

    if (allrois.length > 0) {
      const levelStakeOps = [];

      for (const rec of allrois) {
        const oku = await registration.findOne({ user: rec.user, referrerId: { $ne: 0 } }, { referrer: 1, totalIncome: 1, return: 1 }).lean().exec();
        let currentReferrerId = oku.referrer;
        let i = 1;

        while (currentReferrerId) {

          const record = await registration.findOne({ user: currentReferrerId }, { directStakeCount: 1, referrer: 1, totalIncome: 1, return: 1, stake_amount: 1 }).lean().exec();
          if (!record) break;

          let iselig = 0;
          const directStakeCount = record.directStakeCount ? record.directStakeCount : 0;

          if ((i >= 1 || i <= 5) && directStakeCount >= i) {
            iselig = 1;
          } else if ((i > 6 || i <= 10) && directStakeCount >= 8) {
            iselig = 1;
          } else if ((i > 10 || i <= 15) && directStakeCount >= 12) {
            iselig = 1;
          } else if ((i > 15 || i <= 20) && directStakeCount >= 15) {
            const stakeamt = record.stake_amount;
            console.log("stakeamt ", stakeamt)
            const teambusinus = await calculateseventythirty(currentReferrerId);
            console.log("teambusinus ", teambusinus)
            if (stakeamt >= 500 && teambusinus.seventy >= 10000 && teambusinus.thirty >= 10000) {
              iselig = 1;
            }
          } else if ((i > 20 || i <= 25) && directStakeCount >= 18) {
            const stakeamt = record.stake_amount;
            console.log("stakeamt ", stakeamt)
            const teambusinus = await calculateseventythirty(currentReferrerId);
            console.log("teambusinus ", teambusinus)
            if (stakeamt >= 1000 && teambusinus.seventy >= 20000 && teambusinus.thirty >= 20000) {
              iselig = 1;
            }
          }
          console.log("iselig ", iselig)
          if (iselig === 1) {
            let direct_ref, levelIncome, income_status = "Credit";
            const incomeData = { level: i, percent: await levelPercent(i), type: "Level Income" };
            incomeData.amount = rec.income;
            incomeData.income = (incomeData.percent / 100) * rec.income;

            const nowinc = record.totalIncome + incomeData.income;

            if (record.return >= nowinc) {
              await registration.updateOne(
                { user: currentReferrerId },
                {
                  $inc: {
                    totalIncome: incomeData.income,
                    wallet_income: incomeData.income,
                    roilevelIncome: incomeData.income
                  }
                }
              );

              levelStakeOps.push({
                insertOne: {
                  document: {
                    sender: rec.user,
                    receiver: currentReferrerId,
                    level: incomeData.level,
                    amount: rec.amount,
                    income: incomeData.income,
                    percent: incomeData.percent,
                    income_type: incomeData.type,
                    txHash: rec.txHash
                  }
                }
              });

            } else {

              if (record.return > record.totalIncome) {
                const elig_inc = record.return - record.totalIncome;
                if (elig_inc > 0) {
                  await registration.updateOne(
                    { user: currentReferrerId },
                    {
                      $inc: {
                        totalIncome: elig_inc,
                        wallet_income: elig_inc,
                        roilevelIncome: elig_inc
                      }
                    }
                  );

                  levelStakeOps.push({
                    insertOne: {
                      document: {
                        sender: rec.user,
                        receiver: currentReferrerId,
                        level: incomeData.level,
                        amount: rec.amount,
                        income: elig_inc,
                        percent: incomeData.percent,
                        income_type: incomeData.type,
                        income_status: income_status,
                        txHash: rec.txHash
                      }
                    }
                  });
                } else {
                  await stake2.updateMany({ user: currentReferrerId }, { $set: { roi_status: 1 } })
                }
              }
            }
          }

          i++;
          if (i === 26) break;
          currentReferrerId = record.referrer;
        }

        await dailyroi.updateOne({ _id: rec._id }, { $set: { level_status: 1 } });
      }

      if (levelStakeOps.length > 0) {
        await levelStake.bulkWrite(levelStakeOps);
      }

    } else {
      console.log("No Level Income to Send");
    }
  } catch (error) {
    console.log(error);
  }
}

async function calculateseventythirty(walletAddress) {
  try {
    // to calculate 70 and 30 percent in diferent legs 
    const records = await registration.find({ referrer: walletAddress }).sort({ directplusteambiz: -1 }).exec();
    if (records.length > 1) {
      const highestValue = records[0].directplusteambiz;
      //var seventyPercentOfHighest = highestValue * 0.7;
      var seventyPercentOfHighest = highestValue;

      var thirtyPercentOfRemainingSum = 0;

      if (records.length > 1) {
        // Step 4: Sum the remaining directplusteambiz values
        const remainingSum = records.slice(1).reduce((acc, record) => acc + record.directplusteambiz, 0);
        //thirtyPercentOfRemainingSum = remainingSum * 0.3;
        thirtyPercentOfRemainingSum = remainingSum;
      }

      // Total calculated value
      const totalCalculatedValue = seventyPercentOfHighest + thirtyPercentOfRemainingSum;

    } else {
      var seventyPercentOfHighest = 0;
      var thirtyPercentOfRemainingSum = 0;
    }

    return { seventy: seventyPercentOfHighest, thirty: thirtyPercentOfRemainingSum }
    // to calculate 70 and 30 percent in diferent legs 
  } catch (error) {
    console.log(error)
  }
}

// Call the function
//level(userId);


cron.schedule('*/5 * * * *', async () => {
  setTeamBusiness();
  // await updateStakeTeamBusiness();
  // await updateTopupTeamBusiness();
  console.log('Setting last Withdrawal');
});

//   cron.schedule('*/3 * * * *', async () => {
//     levelIncome();
//     topuplevelIncome();
//    //console.log('setting last Withdrawal');
//  });

listEvent();

//  cron.schedule('*/30 * * * *', async () => {
//   roiwallet();
//  });
cron.schedule('*/20 * * * *', async () => {
  levelOnRoinew();
});

cron.schedule('*/2 * * * *', async () => {
  sendRankReward();
  //sendPoolReward();

});

cron.schedule(
  "0 1 * * *", // Run at 1:00 AM IST every day
  () => {
    roiwallet();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Set the timezone to Asia/Kolkata for IST
  }
);

// cron.schedule(
//   "0 3 * * *", // Run at 1:00 AM IST every day
//   () => {
//     topuproi();
//   },
//   {
//     scheduled: true,
//     timezone: "Asia/Kolkata", // Set the timezone to Asia/Kolkata for IST
//   }
// );

// cron.schedule(
//   "0 0 * * *", // Run at 1:00 AM IST every day
//   () => {
//     calculatePoolReward();
//   },
//   {
//     scheduled: true,
//     timezone: "Asia/Kolkata", // Set the timezone to Asia/Kolkata for IST
//   }
// );


//setInterval(updateWithdrawDates, 30000);

const server = app.listen(8080, () => {
  console.log('Server running!')
});