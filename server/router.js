const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const StakingPlan = require("./model/staking_plan"); // Import the StakingPlan model
const Registration = require("./model/stakeregister");
const stakingUsdt = require("./model/staking_usdt");
const mongoose = require("mongoose");
const registration = require("./model/registration");
const { getAllUsers } = require("./test");
const stake2 = require("./model/stake");
const levelStake = require("./model/levelStake");
const stakeRegister = require("./model/stakeregister");
const withdraw = require("./model/withdraw");
const stakedirect = require('./model/stakedirects');
const signup = require('./model/signup');
const Topup = require("./model/topup")
const dailyroi = require("./model/dailyroi")
const stakereward = require("./model/stakingReward")

const withdraws = require("./model/withdraw");
const levelRecurr = require("./model/levelReccur");
const tankwallet = require("./model/tankwallettransfer");
const stakepool = require("./model/stakepool");
const crypto = require('crypto');
const  Web3 = require("web3");

const Stake2 = mongoose.model("Stake2", {});

router.get("/data", getAllUsers);

router.get("/check", async (req, res) => {
  try {
    const result = await getAllUsers();
    return res.json({
      data: result,
    });
  } catch (e) {
    console.log(e, "errorin check api");
    return res.json({
      data: [],
    });
  }
});

// Define routes
router.get("/staking-plans", async (req, res) => {
  try {
    const staking = await StakingPlan.find({
      investment_protocol: "WYZ-stUSDT",
    })
      .sort({ id: 1 })
      .exec();

    const firstProtocol = await stake2.aggregate([
      {
        $match: { $or: [{ ratio: "10" }, { ratio: 10 }], token: "WYZ-stUSDT" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const secondProtocol = await stake2.aggregate([
      {
        $match: { $or: [{ ratio: "20" }, { ratio: 20 }], token: "WYZ-stUSDT" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const thirdProtocol = await stake2.aggregate([
      {
        $match: { $or: [{ ratio: "30" }, { ratio: 30 }], token: "WYZ-stUSDT" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    const fourthProtocol = await stake2.aggregate([
      {
        $match: { $or: [{ ratio: "40" }, { ratio: 40 }], token: "WYZ-stUSDT" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    const fifthProtocol = await stake2.aggregate([
      {
        $match: { $or: [{ ratio: "50" }, { ratio: 50 }], token: "WYZ-stUSDT" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);   

    const startOfToday = moment
      .tz("Asia/Kolkata")
      .subtract(24, "hours")
      .toDate();
    const endOfToday = moment.tz("Asia/Kolkata").toDate();

    let firstdata = 0;
    let seconddata = 0;
    let thirddata = 0;
    let fourthdata = 0;
    let fifthdata = 0;

    const firstpdata = await stake2.aggregate([
      {
        $match: {
          $or: [{ ratio: "10" }, { ratio: 10 }],
          token: "WYZ-stUSDT",
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
    ]);

    firstpdata.forEach((first) => {
      firstdata += parseFloat(first.amount);
    });
    const secondPdata = await stake2.aggregate([
      {
        $match: {
          $or: [{ ratio: "20" }, { ratio: 20 }],
          token: "WYZ-stUSDT",
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
    ]);
    secondPdata.forEach((second) => {
      seconddata += parseFloat(second.amount);
    });
    const thirdPdata = await stake2.aggregate([
      {
        $match: {
          $or: [{ ratio: "30" }, { ratio: 30 }],
          token: "WYZ-stUSDT",
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
    ]);
    thirdPdata.forEach((third) => {
      thirddata += parseFloat(third.amount);
    });
    const fourtpdata = await stake2.aggregate([
      {
        $match: {
          $or: [{ ratio: "40" }, { ratio: 40 }],
          token: "WYZ-stUSDT",
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
    ]);
    fourtpdata.forEach((fourth) => {
      fourthdata += parseFloat(fourth.amount);
    });
    const fifthPdata = await stake2.aggregate([
      {
        $match: {
          $or: [{ ratio: "50" }, { ratio: 50 }],
          token: "WYZ-stUSDT",
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
    ]);

    fifthPdata.forEach((fifth) => {
      fifthdata += parseFloat(fifth.amount);
    });

    const first = firstProtocol[0]?.total || 0;
    const second = secondProtocol[0]?.total || 0;
    const third = thirdProtocol[0]?.total || 0;
    const fourth = fourthProtocol[0]?.total || 0;
    const fifth = fifthProtocol[0]?.total || 0;

    const firstwyz = (first * 0.1) / 20;
    const firstusdt = first * 0.9;
    const secondwyz = (second * 0.2) / 20;
    const secondusdt = second * 0.8;
    const thirdwyz = (third * 0.3) / 20;
    const thirdusdt = third * 0.7;
    const fourthwyz = (fourth * 0.4) / 20;
    const fourthusdt = fourth * 0.6;
    const fifthwyz = (fifth * 0.5) / 20;
    const fifthusdt = fifth * 0.5;

    const combinedValues = [
      { wyz: firstwyz, usdt: firstusdt, tvl: first, volume: firstdata },
      { wyz: secondwyz, usdt: secondusdt, tvl: second, volume: seconddata },
      { wyz: thirdwyz, usdt: thirdusdt, tvl: third, volume: thirddata },
      { wyz: fourthwyz, usdt: fourthusdt, tvl: fourth, volume: fourthdata },
      { wyz: fifthwyz, usdt: fifthusdt, tvl: fifth, volume: fifthdata },
    ];

    const stakingWithCombinedData = staking.map((stake, index) => ({
      ...stake._doc,
      tvl: combinedValues[index]?.tvl || 0,
      wyz: combinedValues[index]?.wyz || 0,
      usdt: combinedValues[index]?.usdt || 0,
      volume: combinedValues[index]?.volume || 0,
    }));

    return res.status(200).json({
      status: true,
      data: stakingWithCombinedData,
    });
  } catch (error) {
    console.error("Error getting staking plans:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/staking-plans-usdt", async (req, res) => {
  try {
    const staking = await StakingPlan.find()
      .where("investment_protocol")
      .equals("sUSDT-stUSDT");

    const startOfToday = moment
      .tz("Asia/Kolkata")
      .subtract(24, "hours")
      .toDate();
    const endOfToday = moment.tz("Asia/Kolkata").toDate();

    const sixProtocol = await stake2.aggregate([
      {
        $match: {
          $or: [{ ratio: "15" }, { ratio: 15 }],
          token: "sUSDT-stUSDT",
        
        },
      
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    const sevenProtocol = await stake2.aggregate([
      {
        $match: {
          $or: [{ ratio: "20" }, { ratio: 20 }],
          token: "sUSDT-stUSDT",
       
        },
   
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    const eightProtocol = await stake2.aggregate([
      {
        $match: {
          $or: [{ ratio: "25" }, { ratio: 25 }],
          token: "sUSDT-stUSDT",
        
        },
     
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    let sixdata = 0;
    let sevendata = 0;
    let eightdata = 0;

    const sixPdata = await stake2.aggregate([
      {
        $match: {
          $or: [{ ratio: "15" }, { ratio: 15 }],
          token: "sUSDT-stUSDT",
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
    ]);
    sixPdata.forEach((sixth) => {
      sixdata += parseFloat(sixth.amount);
    });
    const sevenPdata = await stake2.aggregate([
      {
        $match: {
          $or: [{ ratio: "20" }, { ratio: 20 }],
          token: "sUSDT-stUSDT",
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
    ]);
    if (sevenPdata.length == 0) {
      sevendata = 0;
    } else {
      sevenPdata.forEach((seven) => {
        sevendata += parseFloat(seven.amount);
      });
    }
    const eightPdata = await stake2.aggregate([
      {
        $match: {
          $or: [{ ratio: "25" }, { ratio: 25 }],
          token: "sUSDT-stUSDT",
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
    ]);
    eightPdata.forEach((eight) => {
      eightdata += parseFloat(eight.amount);
    });

    const firstdata = sixProtocol[0]?.total;
    const seconddata = sevenProtocol[0]?.total;
    const thirddata = eightProtocol[0]?.total;

    const firstsUsdt = firstdata * 0.15;
    const firstbusdt = firstdata * 0.85;
    const secondsUsdt = seconddata * 0.2;
    const secondbtUsdt = seconddata * 0.8;
    const thirdsUsdt = thirddata * 0.25;
    const thirdbtusdt = thirddata * 0.75;

    const combinedValues = [
      { sUsdt: firstsUsdt, busdt: firstbusdt, tvl: firstdata, volume: sixdata },
      {
        sUsdt: secondsUsdt,
        busdt: secondbtUsdt,
        tvl: seconddata,
        volume: sevendata,
      },
      {
        sUsdt: thirdsUsdt,
        busdt: thirdbtusdt,
        tvl: thirddata,
        volume: eightdata,
      },
    ];

    const stakingWithCombinedData = staking.map((stake, index) => ({
      ...stake._doc,
      tvl: combinedValues[index]?.tvl || 0,
      sUsdt: combinedValues[index]?.sUsdt || 0,
      busdt: combinedValues[index]?.busdt || 0,
      volume: combinedValues[index]?.volume || 0,
    }));

    return res.status(200).json({
      status: true,
      data: stakingWithCombinedData,
    });
  } catch (error) {
    console.error("Error getting staking plans:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/get-stake-history", async (req, res) => {
  try {
    const {wallet_address} = req.body;

    // Fetch data from Stake2 and Topup collections simultaneously
    const [stakeData, topupData] = await Promise.all([
      Stake2.find({ user: wallet_address }),
      Topup.find({ user: wallet_address })
    ]);

    // Prepare data from Topup schema to match the structure of Stake2 schema
    const formattedTopupData = topupData.map(topup => ({
      user: topup.user,
      amount: topup.amount,
      token: topup.token/1e18,
      txHash: topup.txHash,
      timestamp: topup.timestamp,
      createdAt: topup.createdAt,
      updatedAt: topup.updatedAt 
    }));

    // Merge data from both collections
    const mergedData = [...stakeData, ...formattedTopupData];

    // Send the merged data as a response
    res.json(mergedData);
  } catch (error) {
    console.error("Error fetching stake data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Helper function to get ratio based on plan
function getRatio(plan) {
  switch (plan) {
    case "0":
      return 10;
    case "1":
      return 20;
    case "2":
      return 30;
    case "3":
      return 40;
    case "4":
      return 50;
    case "5":
      return 15;
    case "6":
      return 20;
    case "7":
      return 25;
    default:
      return 0;
  }
}


router.get("/all-history", async (req, res) => {
  try {
    // Query the "stake2" collection for data related to the received wallet address
    const plan = req.query.plan
    if(plan == 1){
      var p_name = "WYZ-stUSDT";
      var ratio = "10";
    } else if(plan == 2){
      var p_name = "WYZ-stUSDT";
      var ratio = "20";
    } else if(plan == 3){
      var p_name = "WYZ-stUSDT";
      var ratio = "30";
    } else if(plan == 4){
      var p_name = "WYZ-stUSDT";
      var ratio = "40";
    } else if(plan == 5){
      var p_name = "WYZ-stUSDT";
      var ratio = "50";
    } else if(plan == 6){
      var p_name = "sUSDT-stUSDT";
      var ratio = "15";
    } else if(plan == 7){
      var p_name = "sUSDT-stUSDT";
      var ratio = "20";
    } else if(plan == 8){
      var p_name = "sUSDT-stUSDT";
      var ratio = "25";
    }
    const stakeData = await Stake2.find({ token : p_name, ratio :  ratio });
    // Send the retrieved data as a response
    res.json(stakeData);
  } catch (error) {
    console.error("Error fetching stake data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const { Aggregate } = require('mongoose');
const { verifyToken } = require("./Middleware/jwtToken");
const rewardtransfer = require("./model/rewardtransfer");
const recurrtransfer = require("./model/recurrtransfer");
const poolincometransfer = require("./model/poolincometransfer");
const openlevel = require("./model/openlevels");
const WithdrawalModel = require("./model/withdraw");
const stakeReward = require("./model/stakingReward");
const transferModel = require("./model/transfer");

router.get("/tvl", async (req, res) => {
  try {
    const plan = req.query.plan;
    let p_name, ratio;

    switch (plan) {
      case '1':
        p_name = "WYZ-stUSDT";
        ratio = "10";
        break;
      case '2':
        p_name = "WYZ-stUSDT";
        ratio = "20";
        break;
      case '3':
        p_name = "WYZ-stUSDT";
        ratio = "30";
        break;
      case '4':
        p_name = "WYZ-stUSDT";
        ratio = "40";
        break;
      case '5':
        p_name = "WYZ-stUSDT";
        ratio = "50";
        break;
      case '6':
        p_name = "sUSDT-stUSDT";
        ratio = "15";
        break;
      case '7':
        p_name = "sUSDT-stUSDT";
        ratio = "20";
        break;
      case '8':
        p_name = "sUSDT-stUSDT";
        ratio = "25";
        break;
      default:
        // Handle invalid plan values
        res.status(400).json({ error: "Invalid plan value" });
        return;
    }

    // Aggregation pipeline to sum amounts from Stake2
    const stakePipeline = [
      { $match: { token: p_name, ratio: ratio } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ];
    const stakeResult = await stake2.aggregate(stakePipeline);

    // Aggregation pipeline to sum amounts from Topup2
    const topupPipeline = [
      { $match: { plan: String(parseInt(plan) - 1) } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ];
    const topupResult = await Topup.aggregate(topupPipeline);

    // Calculate the total amount by adding summedAmount and summedTopup
    const totalAmount = (stakeResult.length > 0 ? stakeResult[0].totalAmount : 0) +
      (topupResult.length > 0 ? topupResult[0].totalAmount : 0);

    res.json({ totalAmount });
  } catch (error) {
    console.error("Error fetching TVL data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// router.get("/referrer", async (req, res) => {
//   try {
//     // Query the "stake2" collection for data related to the received wallet address
//     const wallet_address = req.query.wallet_address
//     console.log("wallet_address ",wallet_address)
//     const stakeData = await registration.findOne({ user : wallet_address },{ referrer : 1 });
//     if(!stakeData){
//     res.json("");
//     }
//     const refdata = await registration.findOne({ user : stakeData.referrer },{ userId : 1 });
//     // Send the retrieved data as a response
//     res.json(refdata);
//   } catch (error) {
//     console.error("Error fetching stake data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.get("/stake-history", async (req, res) => {
  try {
    // Query the "stake2" collection for data related to the received wallet address
    
    const stakeData = await Stake2.find({ });
    // Send the retrieved data as a response
    res.json(stakeData);
  } catch (error) {
    console.error("Error fetching stake data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/staking-usdt", async (req, res) => {
  try {
    const stakingusdt = await stakingUsdt.find();

    return res.status(200).json({
      status: true,
      data: stakingusdt,
    });
  } catch (error) {
    console.error("Error getting staking plans:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/Registration", async (req, res) => {
  try {
    const staking = await Registration.create({
      user: "John Doe",
      userId: "12345",
      referrer: "Jane Smith",
      referrerId: "67890",
      blockNumber: "123456",
      blockTimestamp: "2024-05-01",
      transactionId: "abc123",
    });
    return res.status(200).json({
      status: true,
      data: staking,
    });
  } catch (error) {
    console.error("Error getting staking plans:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/get-level-stack', async (req, res) => {
  try {
    const { walletAddress,sortby, page } = req.body; // Extract walletAddress from the request body
    const PAGE_SIZE = 10; 
    const pageNumber = page; // Specify the desired page number
    const skip = pageNumber > 1 ? (pageNumber - 1) * PAGE_SIZE : 0; // Adjust skip for the first page

    // Find the levelStake data for the provided walletAddress, sorted based on sortby
    let levelStakeData;
    if (sortby === "ALL") {
      levelStakeData = await levelStake
        .find({ receiver: walletAddress , income_type : "Level Income"})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE);
    } else if (sortby != "ALL") {
      levelStakeData = await levelStake
        .find({ receiver: walletAddress,level : sortby, income_type : "Level Income" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE);
    }

    if (!levelStakeData || levelStakeData.length === 0) {
      // No data found for the provided wallet address
      return res.status(404).json({ message: 'Data not found for the provided wallet address' });
    }
    const levcount = await levelStake.countDocuments({ receiver: walletAddress, income_type : "Level Income"});
    // Add userId to each levelStakeData entry by fetching it from the Registration schema
    const modifiedData = await Promise.all(levelStakeData.map(async entry => {
      const registrationData = await registration.findOne({ user: entry.sender }, { userId: 1 }).exec();
      return {
        ...entry.toObject(),
        userId: registrationData ? registrationData.userId : null
      };
    }));

    // Return the modified data
    return res.status(200).json({ data: modifiedData,
      record_count : levcount
     });
  } catch (error) {
    // Error occurred while fetching data
    console.error('Error fetching plan data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/get-level-stack-ref', async (req, res) => {
  try {
    const { walletAddress,sortby, page } = req.body; // Extract walletAddress from the request body
    const PAGE_SIZE = 10; 
    const pageNumber = page; // Specify the desired page number
    const skip = pageNumber > 1 ? (pageNumber - 1) * PAGE_SIZE : 0; // Adjust skip for the first page

    // Find the levelStake data for the provided walletAddress, sorted based on sortby
    let levelStakeData;
    if (sortby === "ALL") {
      levelStakeData = await levelStake
        .find({ receiver: walletAddress, income_type : "Referral Income" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE);
    } else if (sortby != "ALL") {
      levelStakeData = await levelStake
        .find({ receiver: walletAddress,level : sortby, income_type : "Referral Income" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE);
    }

    if (!levelStakeData || levelStakeData.length === 0) {
      // No data found for the provided wallet address
      return res.status(404).json({ message: 'Data not found for the provided wallet address' });
    }
    const levcount = await levelStake.countDocuments({ receiver: walletAddress, income_type : "Referral Income"});
    // Add userId to each levelStakeData entry by fetching it from the Registration schema
    const modifiedData = await Promise.all(levelStakeData.map(async entry => {
      const registrationData = await registration.findOne({ user: entry.sender }, { userId: 1 }).exec();
      return {
        ...entry.toObject(),
        userId: registrationData ? registrationData.userId : null
      };
    }));

    // Return the modified data
    return res.status(200).json({ data: modifiedData,
      record_count : levcount
     });
  } catch (error) {
    // Error occurred while fetching data
    console.error('Error fetching plan data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/get-level-registration', async (req, res) => {
  try {
    const { walletAddress,sortby, page } = req.body; // Extract walletAddress from the request body
    const PAGE_SIZE = 10; 
    const pageNumber = page; // Specify the desired page number
    const skip = pageNumber > 1 ? (pageNumber - 1) * PAGE_SIZE : 0; // Adjust skip for the first page

    // Find the levelStake data for the provided walletAddress, sorted based on sortby
    let levelStakeData;
    if (sortby === "ALL") {
      levelStakeData = await levelStake
        .find({ receiver: walletAddress, income_type : "Registration Level Income" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE);
    } else if (sortby != "ALL") {
      levelStakeData = await levelStake
        .find({ receiver: walletAddress,level : sortby, income_type : "Registration Level Income" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE);
    }

    if (!levelStakeData || levelStakeData.length === 0) {
      // No data found for the provided wallet address
      return res.status(404).json({ message: 'Data not found for the provided wallet address' });
    }
    const levcount = await levelStake.countDocuments({ receiver: walletAddress});
    // Add userId to each levelStakeData entry by fetching it from the Registration schema
    const modifiedData = await Promise.all(levelStakeData.map(async entry => {
      const registrationData = await registration.findOne({ user: entry.sender }, { userId: 1 }).exec();
      return {
        ...entry.toObject(),
        userId: registrationData ? registrationData.userId : null
      };
    }));

    // Return the modified data
    return res.status(200).json({ data: modifiedData,
      record_count : levcount
     });
  } catch (error) {
    // Error occurred while fetching data
    console.error('Error fetching plan data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/get-level-sponsor', async (req, res) => {
  try {
    const { walletAddress,sortby, page } = req.body; // Extract walletAddress from the request body
    const PAGE_SIZE = 10; 
    const pageNumber = page; // Specify the desired page number
    const skip = pageNumber > 1 ? (pageNumber - 1) * PAGE_SIZE : 0; // Adjust skip for the first page

    // Find the levelStake data for the provided walletAddress, sorted based on sortby
    let levelStakeData;
    if (sortby === "ALL") {
      levelStakeData = await levelStake
        .find({ receiver: walletAddress, income_type : "Referral Income" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE);
    } else if (sortby != "ALL") {
      levelStakeData = await levelStake
        .find({ receiver: walletAddress,level : sortby, income_type : "Referral Income" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE);
    }

    if (!levelStakeData || levelStakeData.length === 0) {
      // No data found for the provided wallet address
      return res.status(404).json({ message: 'Data not found for the provided wallet address' });
    }
    const levcount = await levelStake.countDocuments({ receiver: walletAddress});
    // Add userId to each levelStakeData entry by fetching it from the Registration schema
    const modifiedData = await Promise.all(levelStakeData.map(async entry => {
      const registrationData = await registration.findOne({ user: entry.sender }, { userId: 1 }).exec();
      return {
        ...entry.toObject(),
        userId: registrationData ? registrationData.userId : null
      };
    }));

    // Return the modified data
    return res.status(200).json({ data: modifiedData,
      record_count : levcount
     });
  } catch (error) {
    // Error occurred while fetching data
    console.error('Error fetching plan data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/dashboard", async (req, res) => {
  try {
    const { walletAddress } = req.body; // Extract walletAddress from the request body
    console.log(walletAddress, "::::");

    const dashboard = await registration
      .findOne({ user: walletAddress })
      .exec();

      if(!dashboard){
        return res
        .status(404)
        .json({ message: "Data not found for the provided wallet address" }); 
      }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const recurring = await levelRecurr
      .find({
        user: walletAddress,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      })
      .exec();

    const totalRecurringIncome = recurring.reduce(
      (sum, record) => sum + record.amount,
      0
    );

    // directs in month
    const stakedirectCount = await stakedirect
  .countDocuments({
    referrer: walletAddress,
    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
  })
  .exec();
    // directs in month
  console.log(totalRecurringIncome)

  const totalReferralIncome = await levelStake.aggregate([
    {
      $match: {
        income_type: "Referral Income",
        receiver: walletAddress
      },
    },
    {
      $group: {
        _id: "$receiver",
        totalIncome: { $sum: "$income" },
      },
    },
  ]);

  // to calculate 70 and 30 percent in diferent legs 
        const records = await registration.find({ referrer: walletAddress }).sort({ staketeambusiness: -1 }).exec();
        console.log("records :: ",records)
        if(records.length > 0){
        const highestValue = records[0].staketeambusiness;
        var seventyPercentOfHighest = highestValue * 0.7;

        var thirtyPercentOfRemainingSum = 0;

        if (records.length > 1) {
          // Step 4: Sum the remaining staketeambusiness values
          const remainingSum = records.slice(1).reduce((acc, record) => acc + record.staketeambusiness, 0);
          thirtyPercentOfRemainingSum = remainingSum * 0.3;
        }

        // Total calculated value
        const totalCalculatedValue = seventyPercentOfHighest + thirtyPercentOfRemainingSum;
      
      } else {
        var seventyPercentOfHighest = 0;
        var thirtyPercentOfRemainingSum = 0;
      }

      console.log("seventyPercentOfHighest :: ",seventyPercentOfHighest)
      console.log("thirtyPercentOfRemainingSum :: ",thirtyPercentOfRemainingSum)
  // to calculate 70 and 30 percent in diferent legs 

  // recurr level open
      const stakedirectbusiness = dashboard.stakedirectbusiness
      const directStakeCount = dashboard.directStakeCount
      let isstake = await stakeRegister.findOne({ user : walletAddress })
      var level = 0;
      if(isstake){

       // total withdraw

    const totalAmountResult = await withdraws.aggregate([
      {
        $match: { user : walletAddress, isapprove : true }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$withdrawAmount" }
        }
      }
    ]);

    // Check if any result is returned
    if (totalAmountResult && totalAmountResult.length > 0) {
      var totalAmount = totalAmountResult[0].totalAmount;
    } else {
      var totalAmount = 0;
    }

      isstake.totalWithdraw = totalAmount
        
      var referalIncomexx = isstake.referalIncome ? isstake.referalIncome : 0 
      const firstDate = new Date(isstake.createdAt);
      const currentDate = new Date();
      const monthDiff = (currentDate.getFullYear() - firstDate.getFullYear()) * 12 +
                  (currentDate.getMonth() - firstDate.getMonth());
      console.log('Month count:', monthDiff);
      const mnth = monthDiff+1;
  
      const totalStakedirectbusiness = stakedirectbusiness?stakedirectbusiness : 0;
      const directCount = directStakeCount?directStakeCount : 0;
      // direct team business or 1st level business 
     
      let biz1 = 100*1*mnth;
      let biz2 = 100*2*mnth;
      let biz3 = 100*3*mnth;
      let biz4 = 100*4*mnth;
      let biz5 = 100*5*mnth;

      let dir1 = 1*mnth;
      let dir2 = 2*mnth;
      let dir3 = 3*mnth;
      let dir4 = 4*mnth;
      let dir5 = 5*mnth;
      
      if(directCount >= dir1 || totalStakedirectbusiness >= biz1){
        level = 1;
      } else if(directCount >= dir2 || totalStakedirectbusiness >= biz2){
        level = 2;
      } else if(directCount >= dir3 || totalStakedirectbusiness >= biz3){
        level = 3;
      } else if(directCount >= dir4 || totalStakedirectbusiness >= biz4){
        level = 4;
      } else if(directCount >= dir5 || totalStakedirectbusiness >= biz5){
        level = 5;
      }
    } else {
      var referalIncomexx = 0;
    }
    //console.log("totalAmountResult ",totalAmountResult)
    // Extract the total amount from the result
   

  const data2 =  {
    data : dashboard,
    direct_income : referalIncomexx ? referalIncomexx : 0,
    leg1 : seventyPercentOfHighest,
    leg2 : thirtyPercentOfRemainingSum,
    direct_in_month : stakedirectCount,
    recurr_level_open : level,
    recurr_income_month : totalRecurringIncome,
    isstake : isstake?isstake:""
  }
    if (dashboard) {
      return res.status(200).json({ data: data2 });
    } else {
      return res
        .status(404)
        .json({ message: "Data not found for the provided wallet address" });
    }
  } catch (error) {
    // Error occurred while fetching data
    console.error("Error fetching plan data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/total-staking", async (req, res) => {
  try {
    const { walletAddress } = req.body; // Extract walletAddress from the request body

    // Assuming your Mongoose model for the Stake2 collection is named Stake2
    const totalStakes = await Stake2.aggregate([
      {
        $match: { user: walletAddress }, // Match documents for the provided wallet address
      },
    ]).exec();

    let sumOfAmount = 0;

    // Calculate the sum of amounts
    // totalStakes.forEach((stake) => {
    //   sumOfAmount += parseFloat(stake.amount);
    // });
   const jjjjj = await stakeRegister.findOne({ user : walletAddress }, { topup_amount : 1 })
    console.log(sumOfAmount);
    if(jjjjj){
      sumOfAmount = jjjjj.topup_amount
    }

    // const sumOfAmount = totalStakes.length > 0 ? totalStakes[0].sumOfAmount : 0;
    // const userData = totalStakes.length > 0 ? totalStakes[0].userData[0] : null;
    // console.log("tota", userData);

    // let sumOfAmount = 0;

    // Calculate the sum of amounts
    // totalStakes.forEach(stake => {
    //     // Ensure amount is parsed as a number
    //     sumOfAmount += parseInt(c);
    // });

    // Return data along with the sum of amounts
    return res.status(200).json({
      data: totalStakes,
      sumOfAmount: sumOfAmount,
    });
  } catch (error) {
    // Error occurred while fetching data
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/total-widtraw", async (req, res) => {
  try {
    const { walletAddress } = req.body; // Extract walletAddress from the request body

    // Assuming your Mongoose model for the Stake2 collection is named Stake2
    const totalStakes = await Registration.aggregate([
      {
        $match: { user: walletAddress }, // Match documents for the provided wallet address
      },
    ]).exec();

    let sumOfAmount = 0;

    // Calculate the sum of amounts
    totalStakes.forEach((stake) => {
      sumOfAmount += parseFloat(stake.amount);
    });

    return res.status(200).json({
      data: totalStakes,
    });
  } catch (error) {
    // Error occurred while fetching data
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/withdraws", async (req, res) => {
  try {
    const { walletAddress } = req.body; // Extract walletAddress from the request body

    // Assuming your Mongoose model for the Stake2 collection is named Stake2
    const totalStakes = await withdraws.find({ user: walletAddress });
    return res.status(200).json({
      data: totalStakes,
    });
  } catch (error) {
    // Error occurred while fetching data
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/sum-staking", async (req, res) => {
  try {
    const { walletAddress } = req.body; // Extract walletAddress from the request body

    // Assuming your Mongoose model for the Stake2 collection is named Stake2
    const totalStakes = await Stake2.aggregate([
      {
        $match: {
          user: walletAddress, // Match documents for the provided wallet address
          token: "WYZ-stUSDT", // Match documents where token equals 'WYZ-stUSDT'
        },
      },
    ]).exec();

    let sumOfAmount = 0;
    let sumOfT1transferInEth = 0;
    let sumOfT2transferInCustomUnit = 0;
    let calculatedStakes = [];

    // Calculate the sum of amounts and additional values for each stake
    totalStakes.forEach((stake) => {
      sumOfAmount += parseFloat(stake.amount);

      // Calculate additional values for each stake
      const t1transferInEth = stake.t1transfer / 1e18;
      const t2transferInCustomUnit = stake.t2transfer / 1e6;

      sumOfT1transferInEth += t1transferInEth;
      sumOfT2transferInCustomUnit += t2transferInCustomUnit;

      // Create a new object with additional calculated values
      const calculatedStake = {
        ...stake,
        t1transferInEth: t1transferInEth,
        t2transferInCustomUnit: t2transferInCustomUnit,
      };

      calculatedStakes.push(calculatedStake);
    });

    console.log(sumOfAmount);
    return res.status(200).json({
      data: calculatedStakes,
      sumOfAmount: sumOfAmount,
      sumOfT1transferInEth: sumOfT1transferInEth,
      sumOfT2transferInCustomUnit: sumOfT2transferInCustomUnit,
    });
  } catch (error) {
    // Error occurred while fetching data
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/sum-staking-bUSDT", async (req, res) => {
  try {
    const { walletAddress } = req.body; // Extract walletAddress from the request body

    // Assuming your Mongoose model for the Stake2 collection is named Stake2
    const totalStakes = await Stake2.aggregate([
      {
        $match: {
          user: walletAddress, // Match documents for the provided wallet address
          token: "bUSDT-stUSDT", // Match documents where token equals 'WYZ-stUSDT'
        },
      },
    ]).exec();

    let sumOfAmount = 0;
    let sumOfT1transferInEth = 0;
    let sumOfT2transferInCustomUnit = 0;
    let calculatedStakes = [];

    // Calculate the sum of amounts and additional values for each stake
    totalStakes.forEach((stake) => {
      sumOfAmount += parseFloat(stake.amount);

      // Calculate additional values for each stake
      const t1transferInEth = stake.t1transfer / 1e18;
      const t2transferInCustomUnit = stake.t2transfer / 1e18;

      sumOfT1transferInEth += t1transferInEth;
      sumOfT2transferInCustomUnit += t2transferInCustomUnit;

      // Create a new object with additional calculated values
      const calculatedStake = {
        ...stake,
        t1transferInEth: t1transferInEth,
        t2transferInCustomUnit: t2transferInCustomUnit,
      };

      calculatedStakes.push(calculatedStake);
    });

    console.log(sumOfAmount);
    return res.status(200).json({
      data: calculatedStakes,
      sumOfAmount: sumOfAmount,
      sumOfT1transferInEth: sumOfT1transferInEth,
      sumOfT2transferInCustomUnit: sumOfT2transferInCustomUnit,
    });
  } catch (error) {
    // Error occurred while fetching data
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/get-plan-data", async (req, res) => {
  try {
    // Extract plan name and ratio from the request body
    const { planName, ratio } = req.body;

    const r2 = 100 - parseInt(ratio);
    const hhh = ratio + ":" + r2;
    console.log(hhh, "HHHHH");
    console.log(planName, "planename");
    // Query both tables
    // const processedRatio = ratio.split(':')[0];
    const stakingPlanData = await StakingPlan.find({
      ratio: hhh,
      investment_protocol: planName,
    });
    console.log("sdfds", stakingPlanData);
    const stake2Data = await Stake2.find({ ratio: ratio, token: planName });
    // console.log(stake2Data,"STke")
    // Combine data from both tables into a single array
    //   const combinedData = [...stakingPlanData, ...stake2Data];

    // Query the collection for documents matching the provided plan name and ratio
    // Send the retrieved data as a response
    return res.json({
      stakingPlanData,
      stake2Data,
    });
  } catch (error) {
    console.error("Error fetching plan data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function  planData(ratio,amount,curr){ //bUSDT-stUSD
  //console.log(ratio," ",amount," ",curr)
  if(ratio == 10 && curr == "WYZ-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "16.67",
    months : "12"
  }
  return data
} else if(ratio == 20 && curr == "WYZ-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "8.33",
    months : "24"
  }
  return data
} else if(ratio == 30 && curr == "WYZ-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "5.56",
    months : "36"
  }
  return data
} else if(ratio == 40 && curr == "WYZ-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "4.17"
  }
  return data
} else if(ratio == 50 && curr == "WYZ-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "3.33"
  }
  return data
} else if(ratio == 15 && curr == "sUSDT-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "11.11"
  }
  return data
} else if(ratio == 20 && curr == "sUSDT-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "8.33"
  }
  return data
} else if(ratio == 25 && curr == "sUSDT-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "6.67"
  }
  return data
}
}

router.get("/data", async (req, res) => {
  try {
    const data = await registration.aggregate([
      {
        $graphLookup: {
          from: "stake2", // Assuming your registration schema collection is named "users"
          startWith: "$user", // Start with the referrer ID
          connectFromField: "user",
          connectToField: "referrerId",
          maxDepth: 25000,
          depthField: "level",
          as: "referrersHierarchy",
        },
      },
    ]);

    return res.json({
      status: 200,
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/path", async (req, res) => {
  try {
    const data = await stake2.find({ cal_status: 0 });
    return res.json({
      status: 200,
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/getLeg", async (req, res) => {
  try {
    const { walletAddress } = req.body; // Extract walletAddress from the request body

    // Find users with the provided walletAddress and sort them by staketeambusiness in descending order
    const users = await registration
      .find({ referrer: walletAddress })
      .sort({ staketeambusiness: -1 });

    if (users.length > 0) {
      // Get the highest staketeambusiness value
      const highestStakeTeamBusiness = users[0].staketeambusiness;

      // Calculate percentages
      const percentages = {};

      users.forEach((user, index) => {
        const percentage =
          user.staketeambusiness === highestStakeTeamBusiness ? 70 : 30;
        percentages[`leg${index + 1}`] = { percentage: percentage };
      });

      return res.status(200).json({ users, percentages });
    } else {
      // No data found for the provided wallet address
      return res
        .status(404)
        .json({ message: "Data not found for the provided wallet address" });
    }
  } catch (error) {
    // Error occurred while fetching data
    console.error("Error fetching leg data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/withdrawIncome___", async (req, res) => {
  try {
    const { wallet_address, amount, withdrawtype, payment_method } = req.body;
    
    if (amount < 10 || !wallet_address || !withdrawtype || !payment_method) {
      return res.status(200).json({
        status: false,
        message: "Minimum Withdrawal is $10 and All Params are required",
      });
    }
    var token = "WYZ-stUSDT";
    //var token = "bUSDT-stUSDT";
    // var ratio = 0;
    // if(plan == 1){
    // ratio = 10;
    // } else if(plan == 2){
    // ratio = 20;
    // } else if(plan == 3){
    // ratio = 30;
    // } else if(plan == 4){
    // ratio = 40;
    // } else if(plan == 5){
    // ratio = 50;
    // } else if(plan == 6){
    // ratio = 15;
    // token = "bUSDT-stUSDT";
    // } else if(plan == 7){
    // ratio = 20;
    // token = "bUSDT-stUSDT";
    // } else if(plan == 8){
    // ratio = 25;
    // token = "bUSDT-stUSDT";
    // }
    const isstake = await stakeRegister.findOne({ user: wallet_address });
    if (!isstake) {
      return res
        .status(200)
        .json({ status: false, message: "No Staking Found" });
    }

    if (isstake.withdraw_status == 1) {
      return res
        .status(400)
        .json({ status: true, message: "Your withdraw Block !!" });
    }
    if (withdrawtype == "roi") {
      const currentTime = new Date();
      //if (currentTime > isstake.withdraw_stdate && currentTime < isstake.withdraw_endate) {  prev logic
      if (currentTime > isstake.withdraw_endate) {
        const chkBal = await stakeRegister.findOne({
          user: wallet_address,
          wallet_roi: { $gte: amount },
        });
        if (chkBal) {

          const wallet_creditbal = chkBal.wallet_credit?chkBal.wallet_credit:0;
        
          if(wallet_creditbal > 0){
            return res
            .status(400)
            .json({ status: true, message: "Withdraw Is stopped Until $ "+wallet_creditbal+" is paid" });
          }
          // prev logic
          //const currentDate = new Date();
          // currentDate.setHours(0, 0, 0, 0);
          // const nextTimestrt = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
          // const timestampstart = nextTimestrt.getTime();

          // const currentDate2 = new Date();
          // currentDate2.setHours(23, 59, 59, 999);
          // const nextTimeend = new Date(currentDate2.getTime() + 30 * 24 * 60 * 60 * 1000);
          // const timestampend = nextTimeend.getTime();
          // prev logic

          // Example usage:
          const registeredDate = new Date(chkBal.createdAt);
          const userClickDate = new Date();
          const nextSpecificDate = await getNextSpecificDate(
            userClickDate,
            registeredDate
          );

          //console.log("Next specific date:", nextSpecificDate.toISOString());

          const hchh = await stakeRegister.updateOne(
            { user: wallet_address, wallet_roi : { $gte : amount } },
            {
              $inc: {
                wallet_roi: -amount,
                totalWithdraw: amount,
                roi_withdraw : amount
              },
              $set: {
                // withdraw_stdate: timestampstart,
                withdraw_endate: nextSpecificDate,
              },
            }
          );

          if (hchh.modifiedCount > 0) {
            const jkl = await withdraw.create({
              user: wallet_address,
              withdrawAmount: amount,
              payment_method: payment_method,
              wallet_type: "roi",
            });

            if (jkl) {
              return res
                .status(200)
                .json({ status: true, message: "Withdraw Successfull" });
            } else {
              return res
                .status(200)
                .json({ status: true, message: "Withdraw Failed" });
            }
          }
        }
      } else {
        const remainingTime = isstake.withdraw_endate - currentTime;
        const remainingDays = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
        const remainingHours = Math.floor(
          (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
        );
        const remainingMinutes = Math.floor(
          (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
        );
        const remainingSeconds = Math.floor(
          (remainingTime % (60 * 1000)) / 1000
        );

        return res.status(200).json({
          status: false,
          message: "You Cannot Withdraw !! "+remainingDays+" days, "+remainingHours+" hours , "+remainingMinutes+" minutes, and "+remainingSeconds+" seconds remaining to withdraw"
          //remainingTime: `${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds remaining to withdraw`,
        });
      }
    } else if (withdrawtype == "referral"){
      
      try {
        // Ensure wallet_address and amount are valid before querying the database
        if (!wallet_address || amount <= 0) {
          return res.status(400).json({ status: false, message: "Invalid input" });
        }
      
        // Find a stake register entry that matches the criteria
        const bala = await stakeRegister.findOne({
          user: wallet_address,
          wallet_referral: { $gte: amount },
        });
      
        if (bala) {
          // new change in code
          const wallet_creditbal = bala.wallet_credit?bala.wallet_credit:0;
          const ref_bal = bala.wallet_referral;
          const credit = 50;
          //const credit = wallet_creditbal * 2;

          if(wallet_creditbal > 0 && amount < credit){
            // return res
            // .status(400)
            // .json({ status: true, message: "Withdraw amount should be equal or greater than $ "+wallet_creditbal*2 });

            return res
            .status(400)
            .json({ status: true, message: "Withdraw amount should be equal or greater than $ 50" });
          }

          if(credit > ref_bal && wallet_creditbal > 0){
            // return res
            // .status(400)
            // .json({ status: true, message: "Your Cannot Withdraw untill You acheive 2x of Credit Income" });

            return res
            .status(400)
            .json({ status: true, message: "Your Cannot Withdraw untill You acheive $50" });
          } else if(ref_bal >= credit && wallet_creditbal > 0 && amount >= 50){
              // Update the stake2 entry
          //const deduct_amt = amount - wallet_creditbal;
          var deduct_amt = amount / 2;
          if(deduct_amt >= wallet_creditbal){
            var a_mt = deduct_amt - wallet_creditbal;
            deduct_amt = deduct_amt + a_mt;
            const hchh = await stakeRegister.updateOne(
              { user: wallet_address, wallet_referral : { $gte : amount } },
              { 
                $set: {
                  wallet_credit: 0
                },
                $inc: {
                  wallet_referral: -amount,
                  totalWithdraw: amount
                }
              }
            );
        
            if (hchh.modifiedCount > 0) {
              // Create a withdraw record
              const jkl = await withdraw.create({
                user: wallet_address,
                withdrawAmount: deduct_amt,
                payment_method: payment_method,
                wallet_type: "referral",
              });
        
              if (jkl) {
                return res
                  .status(200)
                  .json({ status: true, message: "Withdraw Successful" });
              } else {
                return res
                  .status(500)
                  .json({ status: false, message: "Withdraw Failed" });
              }
            } 
          } else {
          const hchh = await stakeRegister.updateOne(
            { user: wallet_address, wallet_referral : { $gte : amount } },
            {
              $inc: {
                wallet_referral: -amount,
                totalWithdraw: amount,
                wallet_credit: -deduct_amt
              },
            }
          );
      
          if (hchh.modifiedCount > 0) {
            // Create a withdraw record
            const jkl = await withdraw.create({
              user: wallet_address,
              withdrawAmount: deduct_amt,
              payment_method: payment_method,
              wallet_type: "referral",
            });
      
            if (jkl) {
              return res
                .status(200)
                .json({ status: true, message: "Withdraw Successful" });
            } else {
              return res
                .status(500)
                .json({ status: false, message: "Withdraw Failed" });
            }
          } 
          }
           } else if(wallet_creditbal == 0){
           // new change in code

          // Update the stake2 entry
          const hchh = await stakeRegister.updateOne(
            { user: wallet_address, wallet_referral : { $gte : amount } },
            {
              $inc: {
                wallet_referral: -amount,
                totalWithdraw: amount
              },
            }
          );
      
          if (hchh.modifiedCount > 0) {
            // Create a withdraw record
            const jkl = await withdraw.create({
              user: wallet_address,
              withdrawAmount: amount,
              payment_method: payment_method,
              wallet_type: "referral",
            });
      
            if (jkl) {
              return res
                .status(200)
                .json({ status: true, message: "Withdraw Successful" });
            } else {
              return res
                .status(500)
                .json({ status: false, message: "Withdraw Failed" });
            }
          } else {
            return res
              .status(500)
              .json({ status: false, message: "Failed to update stake2" });
          }
          }
        } else {
          return res
            .status(200)
            .json({ status: false, message: "Insufficient Balance" });
        }
      } catch (error) {
        console.error("Error processing withdraw request:", error);
        return res.status(500).json({ status: false, message: "Server Error" });
      }
    }
      // } else {
      //   const remainingTime = isstake.withdrawref_endate - currentTime;
      //   const remainingDays = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      //   const remainingHours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      //   const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
      //   const remainingSeconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      //   return res.status(200).json({
      //     status: false,
      //     message: "You Cannot Withdraw",
      //     remainingTime: `${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds remaining to withdraw`
      //   });
      // }
    
  } catch (error) {
    console.log(error);
  }
});

router.post('/withdrawIncome', async(req, res) => {
  try {
  const { walletAddress, amount } = req.body;
  console.log(req.body)

  
    // return res.status(200).json({ status: true, message : "Withdraw Start Soon" });
  

  if (!walletAddress || !amount || amount < 10) {
    return res.status(200).json({ status: false, message : "Minimum Withdrawal is $10, walletAddress and amount are required" });
  }

  const chkBal = await registration.findOne({ user : walletAddress })
  if(!chkBal){
    return res.status(200).json({ status: false, message: 'Wallet_address is not found' });
  }

  if(chkBal.income_status){
    return res.status(200).json({ status: false, message: 'Blocked By Admin' });
  }
  //const user_address = chkBal.wallet_address

  if(chkBal.wallet_income < amount){
    return res.status(200).json({ status: false, message: 'Insufficient Balance' });
  }
  const currentTime = new Date();
  

  const rpcUrl = process.env.RPC_URL;
  if (!rpcUrl) {
    return res.status(200).send({ status: false, error: 'Invalid network' });
  }
  try {
    const web3 = new Web3(rpcUrl);

    const swap = process.env.swap;
    const swapABI = [{"inputs":[{"internalType":"address payable","name":"ownerAddress","type":"address"},{"internalType":"contract IERC20","name":"_SPLOSH","type":"address"},{"internalType":"contract IERC20","name":"_USDT","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"MAXIMUM_SALE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_SALE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"token_rate","type":"uint256"}],"name":"Price_setting","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"start_sale","type":"uint256"}],"name":"sale_setting","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"sale_status","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenQty","type":"uint256"}],"name":"sellToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"min_sell","type":"uint256"},{"internalType":"uint256","name":"max_sell","type":"uint256"}],"name":"sell_setting","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"token_price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"WithAmt","type":"uint256"}],"name":"withdrawLost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"QtyAmt","type":"uint256"},{"internalType":"contract IERC20","name":"_TOKEN","type":"address"}],"name":"withdrawLostTokenFromBalance","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const swapcontract = new web3.eth.Contract(swapABI, swap);

    // get price 

    let price = await swapcontract.methods.getPrice().call();
    price = price/1e18;
    console.log("price ",price)

    // get price 

    if (price == null || price <= 0) {
      return res.status(400).send({ status: false, error: 'Invalid Price' });
    }
    
    const act_amt = amount/price;

    const tokenContract = new web3.eth.Contract([{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}], process.env.token_address);
    const ded_amount =  act_amt * 0.9


    const account = web3.eth.accounts.privateKeyToAccount(process.env.privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;
    const tx = tokenContract.methods.transfer(walletAddress, web3.utils.toWei(ded_amount.toString(), 'ether'));
    const gas = await tx.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account.address);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: process.env.token_address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: await web3.eth.getChainId()
      },
      process.env.privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    if(receipt.transactionHash){
    const createdWithdraw = await WithdrawalModel.create({
      user: walletAddress,
      withdrawAmount: act_amt,
      amount : amount,
      deduct_amount : ded_amount,
      price : price,
      isapprove: true,
      trxnHash: receipt.transactionHash
  });
    if(createdWithdraw){
    await registration.updateOne(
      { user : walletAddress },
      {
          $inc: {
              wallet_income: -amount,
              totalWithdraw: amount
          }
      }
  );
  
  res.json({ status: true, transactionHash: receipt.transactionHash , message : "Withdraw Successfull"});
    }
  } else {
    return res.status(200).send({ status: false, message: 'Something Went Wrong' });
  }
    
  } catch (error) {
    console.log(error)
  }

 
  } catch (error) {
  console.log(error)
  }
});

async function getNextSpecificDate(userClickDate, registeredDate) {
  const registeredDay = new Date(registeredDate).getDate(); // Get the day from the registered date
  const clickDate = new Date(userClickDate);

  // Move to the next month
  const nextSpecificDate = new Date(clickDate.getFullYear(), clickDate.getMonth() + 1, registeredDay);

  //const nextSpecificDate = clickDate.setMinutes(clickDate.getMinutes() + 30); // for testing setting to 30 minutes

  return nextSpecificDate;
}

router.post("/active-staking", async (req, res) => {
  try {
    const { walletAddress } = req.body; // Extract walletAddress from the request body

    const criteria = [
      { ratio: { $in: ['10', '20', '30', '40', '50'] }, token: 'WYZ-stUSDT' },
      { ratio: { $in: ['15', '20', '25'] }, token: 'bUSD-stUSDT' }
    ];
  
    // Find records by the given user and criteria
    const records = await stake2.find({ user: walletAddress, $or: criteria });
  
    const status = {
      'WYZ-stUSDT 10:90': 'not active',
      'WYZ-stUSDT 20:80': 'not active',
      'WYZ-stUSDT 30:70': 'not active',
      'WYZ-stUSDT 40:60': 'not active',
      'WYZ-stUSDT 50:50': 'not active',
      'bUSD-stUSDT 15:85': 'not active',
      'bUSD-stUSDT 20:80': 'not active',
      'bUSD-stUSDT 25:75': 'not active'
    };
  
    records.forEach(record => {
      const key = `${record.token} ${record.ratio}:${100 - parseInt(record.ratio)}`;
      if (status[key] !== undefined) {
        status[key] = 'active';
      }
    });
  
    console.log(status);
    
    return res.status(200).json({
      data: status
    });
  } catch (error) {
    // Error occurred while fetching data
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/total-apy', async (req, res) => {
  try {
    const wallet_address = req.query.wallet_address;

    if (!wallet_address) {
      return res.status(400).json({ error: 'wallet_address is required' });
    }

    // Find all staking records for the given wallet_address
    const stakes = await stake2.find({ user: wallet_address }).lean();

    if (!stakes.length) {
      return res.status(404).json({ error: 'No staking records found for this user' });
    }

    const stakereg = await stakeRegister.findOne({ user : wallet_address },{ wallet_roi : 1 })

    let totalApy = 0;
    const currentTime = Date.now();

    // Calculate APY for each stake and modify the stake object
    const stakesWithAPY = stakes.map(stake => {
      const timeDiffSeconds = (currentTime - new Date(stake.createdAt).getTime()) / 1000;
      const apy = timeDiffSeconds * stake.persecroi;
      totalApy += apy;

      // Add APY property to the stake object
      return { ...stake, apy };
    });
    
    //res.json({ totalApy, stakes: stakesWithAPY });
    res.json({ totalApy : stakereg.wallet_roi, stakes: stakesWithAPY });
  } catch (error) {
    console.error('Error calculating total APY:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/directmember', async (req, res) => {
  try {
    const { walletAddress } = req.body;
  
    // Find all direct members by referrer
    const directMembers = await registration.find({ referrer: walletAddress });
  
    // Use Promise.all to process all direct members concurrently
    const directMembersWithDetails = await Promise.all(directMembers.map(async (member) => {
      // Find the name from the signup schema
     
      // Find the topup_amount from the stageregister schema
      const stakeRegisterRecord = await stakeRegister.findOne({ user: member.user });
      const topupAmount = stakeRegisterRecord ? stakeRegisterRecord.topup_amount : 0;
  
      // Add the name and total_staking to the member data
      return {
        ...member.toObject(), 
        total_staking: topupAmount
      };
    }));
  
    // Send the modified data as JSON response
    res.json(directMembersWithDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/myrewards', async (req, res) => {
  try {
    const { walletAddress } = req.body;
  
    const rewarddrs = await stakeReward.find({ user: walletAddress });

    res.json(rewarddrs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.post("/active-staking", async (req, res) => {
  try {
    const { walletAddress } = req.body; // Extract walletAddress from the request body

    const criteria = [
      { ratio: { $in: ['10', '20', '30', '40', '50'] }, token: 'WYZ-stUSDT' },
      { ratio: { $in: ['15', '20', '25'] }, token: 'bUSD-stUSDT' }
    ];
  
    // Find records by the given user and criteria
    const records = await stake2.find({ user: walletAddress, $or: criteria });
  
    const status = {
      'WYZ-stUSDT 10:90': 'not active',
      'WYZ-stUSDT 20:80': 'not active',
      'WYZ-stUSDT 30:70': 'not active',
      'WYZ-stUSDT 40:60': 'not active',
      'WYZ-stUSDT 50:50': 'not active',
      'bUSD-stUSDT 15:85': 'not active',
      'bUSD-stUSDT 20:80': 'not active',
      'bUSD-stUSDT 25:75': 'not active'
    };
  
    records.forEach(record => {
      const key = `${record.token} ${record.ratio}:${100 - parseInt(record.ratio)}`;
      if (status[key] !== undefined) {
        status[key] = 'active';
      }
    });
  
    console.log(status);
    
    return res.status(200).json({
      data: status
    });
  } catch (error) {
    // Error occurred while fetching data
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/total-apy', async (req, res) => {
  try {
    const wallet_address = req.query.wallet_address;

    if (!wallet_address) {
      return res.status(400).json({ error: 'wallet_address is required' });
    }

    // Find all staking records for the given wallet_address
    const stakes = await stake2.find({ user: wallet_address }).lean();

    if (!stakes.length) {
      return res.status(404).json({ error: 'No staking records found for this user' });
    }

    let totalApy = 0;
    const currentTime = Date.now();

    // Calculate APY for each stake and modify the stake object
    const stakesWithAPY = stakes.map(stake => {
      const timeDiffSeconds = (currentTime - new Date(stake.createdAt).getTime()) / 1000;
      const apy = timeDiffSeconds * stake.persecroi;
      totalApy += apy;

      // Add APY property to the stake object
      return { ...stake, apy };
    });

    res.json({ totalApy, stakes: stakesWithAPY });
  } catch (error) {
    console.error('Error calculating total APY:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/directmember', async (req, res) => {
  try {
    const { walletAddress } = req.body;
  
    // Find all direct members by referrer
    const directMembers = await registration.find({ referrer: walletAddress });
  
    // Use Promise.all to process all direct members concurrently
    const directMembersWithDetails = await Promise.all(directMembers.map(async (member) => {
      // Find the name from the signup schema
      const signupRecord = await signup.findOne({ userId: member.userId });
      const name = signupRecord ? signupRecord.name : null;
  
      // Find the topup_amount from the stageregister schema
      const stakeRegisterRecord = await stakeRegister.findOne({ user: member.user });
      const topupAmount = stakeRegisterRecord ? stakeRegisterRecord.topup_amount : 0;
  
      // Add the name and total_staking to the member data
      return {
        ...member.toObject(), // Convert the Mongoose document to a plain object
        name,
        total_staking: topupAmount
      };
    }));
  
    // Send the modified data as JSON response
    res.json(directMembersWithDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.get("/deposite-data", async (req, res) => {
  try {
    const alldeposite = await stake2.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    const desposite = alldeposite.length > 0 ? alldeposite[0].total : 0;
    let depositeToday = 0;
    const startOfToday = moment
      .tz("Asia/Kolkata")
      .subtract(24, "hours")
      .toDate();
    const endOfNow = moment.tz("Asia/Kolkata").toDate();

    const todaydeposite = await stake2.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfToday, $lte: endOfNow },
        },
      },
    ]);
    todaydeposite.forEach((wyz) => {
      depositeToday += parseFloat(wyz.amount);
    });

    const totalWyz = await stake2.aggregate([
      {
        $match: {
          token: "WYZ-stUSDT",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$t1transfer" },
        },
      },
    ]);
    const totalWyzdeposite = totalWyz.length > 0 ? totalWyz[0].total / 1e18 : 0;

    return res.json({
      status: 200,
      data: {
        depositeToday,
        desposite,
        totalWyzdeposite,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/setdefault", async (req, res) => {
  
  // const result = await stakeRegister.updateMany(
  //   {}, // Match all documents
  //   [
  //     { $set: { totalIncome: "$wallet_referral" } }
  //   ]
  // );

  // await stakeRegister.updateMany(
  //   {}, // Match all documents
  //   { $set: { wallet_roi: 0 } }
  // );


//await stakeRegister.updateMany({},{ $set : { return : 0 ,wallet_roi : 0,wallet_income:0,wallet_referral:0,totalIncome:0,staketeambusiness:0,stakedirectbusiness:0,staketeambusinessall:0,referalIncome:0,stake_amount:0,stake_gcamount:0} } )
// await stakeRegister.updateMany({},{ $set : { wallet_roi:0, levelIncome:0, referalIncome :0, totalIncome : 0, wallet_referral:0, wallet_tank:0 } } )
// await stake2.updateMany({},{ $set : { cal_status:0 } } )
});



router.get('/calculate-directs', async (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: 'walletAddress parameter is required' });
  }

  try {
    // Step 1: Find direct members from the registration schema
    const directMembers = await stakedirect.find({ referrer: walletAddress }).select('user');
    const userIds = directMembers.map(member => member.user);
    
    console.log("Direct members :: ", userIds);
    
    // Step 1: Aggregate total amount from stake2 schema
    const stake2Result = await stake2.aggregate([
      { $match: { user: { $in: userIds } } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
    ]);
    
    const totalStake2Amount = stake2Result.length > 0 ? stake2Result[0].totalAmount : 0;
    
    // Step 2: Aggregate total amount from Topup schema
    const topupResult = await Topup.aggregate([
      { $match: { user: { $in: userIds } } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
    ]);
    
    const totalTopupAmount = topupResult.length > 0 ? topupResult[0].totalAmount : 0;
    
    // Combine results
    const totalAmount = totalStake2Amount + totalTopupAmount;
    
    res.json({ totalDirects: userIds.length, totalAmount });
    
  } catch (error) {
    console.error('Error in API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

router.get('/calculate-all-teams', async (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: 'givenaddr parameter is required' });
  }

  try {
    // Step 1: Find all team members recursively
    const allTeamMembers = await findAllDescendants(walletAddress);
    //console.log("allTeamMembers :: ",allTeamMembers)
    // Step 2: Find corresponding records in the stake2 schema and sum the amount
    const result = await stake2.aggregate([
      { $match: { user: { $in: allTeamMembers } } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
    ]);

    const totalAmount = result.length > 0 ? result[0].totalAmount : 0;

    res.json({ totalMembers: allTeamMembers.length, totalAmount });
  } catch (error) {
    console.error('Error in API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/teamBusinessAllUser', async (req, res) => {
  try {
  //   await registration.updateMany({},
  //   {
  //     $set : {
  //       staketeambusiness : 0
  //     }
  //   }
  // )
    // Step 1: Get all users from stakeRegister
    const allUsers = await stakeRegister.distinct('user');
    
    // Step 2: For each user, find all team members recursively and sum their investments
    //const userBusiness = [];
    for (const user of allUsers) {
      const allTeamMembers = await findAllDescendants(user);
      const result = await stake2.aggregate([
        { $match: { user: { $in: allTeamMembers } } },
        { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
      ]);
      const totalAmount = result.length > 0 ? result[0].totalAmount : 0;
      await registration.updateOne({
        user : user
      },
      {
        $set : {
          staketeambusiness : totalAmount
        }
      }
    )
      //userBusiness.push({ user, totalAmount });
    }
    console.log("team business update done")

    // Step 3: Sort users by totalAmount in descending order and get the top 20
    // userBusiness.sort((a, b) => b.totalAmount - a.totalAmount);
    // const topUsers = userBusiness.slice(0, 20);

    // res.json({ topUsers });
  } catch (error) {
    console.error('Error in API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/transferToWallet', async (req,res) => {
  try{
   // to update wallet tank income if any
   const walletAddress = req.query.wallet_address;
  console.log("transfer tank wallte address ",walletAddress)
        const rego = await stakeRegister.findOne(
          { 
            user: walletAddress,
            wallet_tank: { $gt: 0 }
          }, 
          { 
            totalIncome: 1, 
            wallet_tank: 1, 
            return: 1
          }
        );
        if (rego) {
        const wallet_tank = rego.wallet_tank
        const totalIncome = rego.totalIncome
        const returnn = rego.return
        
        if(returnn > totalIncome && wallet_tank > 0){
        const remmm = returnn - totalIncome
        if(wallet_tank <= remmm && remmm > 0){
          await stakeRegister.updateOne(
            { 
              user: walletAddress,
              wallet_tank: { $gte: wallet_tank }
            },
            {
              $inc: {
                totalIncome: wallet_tank,
                wallet_referral : wallet_tank,
                wallet_tank : -wallet_tank
              },
            }
          );

          await tankwallet.create({
            user : walletAddress,
            amount : wallet_tank,
            totalIncome : totalIncome,
            return : returnn,
            tankBalance : wallet_tank
          })
        } else if(wallet_tank > remmm && remmm > 0){
          await stakeRegister.updateOne(
            { 
              user: walletAddress,
              wallet_tank: { $gte: remmm } 
            },
            {
              $inc: {
                totalIncome: remmm,
                wallet_referral : remmm,
                wallet_tank : -remmm
              },
            }
          );

          await tankwallet.create({
            user : walletAddress,
            amount : remmm,
            totalIncome : totalIncome,
            return : returnn,
            tankBalance : wallet_tank
          })
        }
        return res.json({
          status: true,
          message: "Success"
        });
        } else {
          return res.json({
            status: false,
            message: "Please re-top up your account"
          }); 
        }
        } else {
          return res.json({
            status: false,
           message: "Insufficient Tank wallet Balance"
          });
        }

        // to update wallet tank income if any
  } catch(error){
    console.log(error)
  }
})

router.get('/transferRankRewToWallet', async (req,res) => {
  try{
   // to update wallet tank income if any
   const walletAddress = req.query.wallet_address;
  console.log("transfer Rank wallte address ",walletAddress)
        const rego = await stakeRegister.findOne(
          { 
            user: walletAddress,
            wallet_rewards: { $gt: 0 }
          }, 
          { 
            totalIncome: 1, 
            wallet_rewards: 1, 
            return: 1
          }
        );
        if (rego) {
        const wallet_reward = rego.wallet_rewards
        const totalIncome = rego.totalIncome
        const returnn = rego.return
        
        if(returnn > totalIncome && wallet_reward > 0){
        const remmm = returnn - totalIncome
        if(wallet_reward <= remmm && remmm > 0){
          await stakeRegister.updateOne(
            { 
              user: walletAddress,
              wallet_rewards: { $gte: wallet_reward }
            },
            {
              $inc: {
                totalIncome: wallet_reward,
                wallet_referral : wallet_reward,
                wallet_rewards : -wallet_reward
              },
            }
          );

          await rewardtransfer.create({
            user : walletAddress,
            amount : wallet_reward,
            totalIncome : totalIncome,
            return : returnn,
            rewardBalance : wallet_reward
          })
        } else if(wallet_reward > remmm && remmm > 0){
          await stakeRegister.updateOne(
            { 
              user: walletAddress,
              wallet_rewards: { $gte: remmm }
             },
            {
              $inc: {
                totalIncome: remmm,
                wallet_referral : remmm,
                wallet_rewards : -remmm
              },
            }
          );

          await rewardtransfer.create({
            user : walletAddress,
            amount : remmm,
            totalIncome : totalIncome,
            return : returnn,
            rewardBalance : wallet_reward
          })
        }
        return res.json({
          status: true,
          message: "Success"
        });
        } else {
          return res.json({
            status: false,
            message: "Please re-top up your account"
          }); 
        }
        } else {
          return res.json({
            status: false,
           message: "Insufficient Tank wallet Balance"
          });
        }

        // to update wallet tank income if any
  } catch(error){
    console.log(error)
  }
})

router.get('/transferRecurringToWallet', async (req,res) => {
  try{
   // to update wallet tank income if any
   const walletAddress = req.query.wallet_address;
  console.log("transfer Recurring wallte address ",walletAddress)
        const rego = await stakeRegister.findOne(
          { 
            user: walletAddress,
            wallet_recurr: { $gt: 0 }
          }, 
          { 
            totalIncome: 1, 
            wallet_recurr: 1, 
            return: 1
          }
        );
        if (rego) {
        const wallet_recurr = rego.wallet_recurr
        const totalIncome = rego.totalIncome
        const returnn = rego.return
        
        if(returnn > totalIncome && wallet_recurr > 0){
        const remmm = returnn - totalIncome
        if(wallet_recurr <= remmm && remmm > 0){
          await stakeRegister.updateOne(
            { 
              user: walletAddress,
              wallet_recurr: { $gte: wallet_recurr }
             },
            {
              $inc: {
                totalIncome: wallet_recurr,
                wallet_referral : wallet_recurr,
                wallet_recurr : -wallet_recurr
              },
            }
          );

          await recurrtransfer.create({
            user : walletAddress,
            amount : wallet_recurr,
            totalIncome : totalIncome,
            return : returnn,
            recurrBalance : wallet_recurr
          })
        } else if(wallet_recurr > remmm && remmm > 0){
          await stakeRegister.updateOne(
            { 
              user: walletAddress,
              wallet_recurr: { $gte: remmm }
            },
            {
              $inc: {
                totalIncome: remmm,
                wallet_referral : remmm,
                wallet_recurr : -remmm
              },
            }
          );

          await recurrtransfer.create({
            user : walletAddress,
            amount : remmm,
            totalIncome : totalIncome,
            return : returnn,
            recurrBalance : wallet_recurr
          })
        }
        return res.json({
          status: true,
          message: "Success"
        });
        } else {
          return res.json({
            status: false,
            message: "Please re-top up your account"
          }); 
        }
        } else {
          return res.json({
            status: false,
           message: "Insufficient Recurr wallet Balance"
          });
        }

        // to update wallet tank income if any
  } catch(error){
    console.log(error)
  }
})

router.get('/transferPoolToWallet', async (req,res) => {
  try{
   // to update wallet tank income if any
   const walletAddress = req.query.wallet_address;
  console.log("transfer Recurring wallte address ",walletAddress)
        const rego = await stakeRegister.findOne(
          { 
            user: walletAddress,
            poolbonus: { $gt: 0 }
          }, 
          { 
            totalIncome: 1, 
            poolbonus: 1, 
            return: 1
          }
        );
        if (rego) {
        const poolbonus = rego.poolbonus
        const totalIncome = rego.totalIncome
        const returnn = rego.return
        
        if(returnn > totalIncome && poolbonus > 0){
        const remmm = returnn - totalIncome
        if(poolbonus <= remmm && remmm > 0){
          await stakeRegister.updateOne(
            { 
              user: walletAddress,
              poolbonus: { $gte: poolbonus }
             },
            {
              $inc: {
                totalIncome: poolbonus,
                wallet_referral : poolbonus,
                poolbonus : -poolbonus
              },
            }
          );

          await poolincometransfer.create({
            user : walletAddress,
            amount : poolbonus,
            totalIncome : totalIncome,
            return : returnn,
            poolBalance : poolbonus
          })
        } else if(poolbonus > remmm && remmm > 0){
          await stakeRegister.updateOne(
            { 
              user: walletAddress,
              poolbonus: { $gte: remmm }
            },
            {
              $inc: {
                totalIncome: remmm,
                wallet_referral : remmm,
                poolbonus : -remmm
              },
            }
          );

          await poolincometransfer.create({
            user : walletAddress,
            amount : remmm,
            totalIncome : totalIncome,
            return : returnn,
            poolBalance : poolbonus
          })
        }
        return res.json({
          status: true,
          message: "Success"
        });
        } else {
          return res.json({
            status: false,
            message: "Please re-top up your account"
          }); 
        }
        } else {
          return res.json({
            status: false,
           message: "Insufficient Pool wallet Balance"
          });
        }

        // to update wallet tank income if any
  } catch(error){
    console.log(error)
  }
})

function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // Convert to hexadecimal format
    .slice(0, length); // Trim to desired length
}

router.post('/manualregister', verifyToken, async (req,res) => {
  try {
      const {walletAddress, plan, amount} = req.body
      if(!walletAddress || !plan || !amount || amount < 100){
        return res.status(200).json({
          status: false,
          message:"All Params are required"
        })
      }

      const allTeamMembers = await findAllDescendants(walletAddress);
      var teamcount = allTeamMembers.length
      if(teamcount > 0){
        for (const user of allTeamMembers) {
          let rankclit = await stakeRegister.findOne({ user : user, wallet_credit: { $gte: 0 } });
          if (rankclit) {
            return res.status(200).json({
              status: false,
              message:"There are free Id in your downline"
            }) 
          }
      }
      }

      if(plan == 1){
        var ratio = 10;
        var token = "WYZ-stUSDT";
      } else if(plan == 2){
        var ratio = 20;
        var token = "WYZ-stUSDT";
      } else if(plan == 3){
        var ratio = 30;
        var token = "WYZ-stUSDT";
      } else if(plan == 4){
        var ratio = 40;
        var token = "WYZ-stUSDT";
      } else if(plan == 5){
        var ratio = 50;
        var token = "WYZ-stUSDT";
      } else if(plan == 6){
        var ratio = 15;
        var token = "sUSDT-stUSDT";
      } else if(plan == 7){
        var ratio = 20;
        var token = "sUSDT-stUSDT";
      } else if(plan == 8){
        var ratio = 25;
        var token = "sUSDT-stUSDT";
      }

      const currentDate = new Date();
      //currentDate.setHours(0, 0, 0, 0);
      const nextTimestrt = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      //const nextTimestrt = new Date(currentDate.getTime() + 30 * 60 * 1000);
      const timestampstart = nextTimestrt.getTime(); 

      const currentDate2 = new Date();
      //currentDate2.setHours(23, 59, 59, 999);
      const nextTimeend = new Date(currentDate2.getTime() + 30 * 24 * 60 * 60 * 1000);
      //const nextTimeend = new Date(currentDate2.getTime() + 31 * 60 * 1000);
      const timestampend = nextTimeend.getTime();

      // const issd = await stakedirect.findOne({ referrer : returnValues.user })
      // var multi = 2;
      // if(issd){
      const multi = 3;
      //}
      const isusr = await stakeRegister.findOne({ user : walletAddress})
      const stake_referrer = await registration.findOne({ user : walletAddress },{ referrer : 1 })
      const findReg = await stakeRegister.findOne({ user : stake_referrer.referrer },{ topup_amount : 1 })
      console.log("isusr ",isusr)
      if(!isusr){
        await stakeRegister.create({
          user : walletAddress,
          //referral: returnValues.referral,
          return : (amount) * multi,
          stake_amount : (amount),
          topup_amount : amount,
          wallet_credit : amount,
          withdraw_stdate: timestampstart,
          withdraw_endate: timestampend,
          withdrawref_stdate: timestampstart,
          withdrawref_endate: timestampend,
        }) 
      } else {
        
        await stakeRegister.findOneAndUpdate(
          { user: walletAddress },
          {
            $inc: {
              return: amount * multi,
              topup_amount : amount,
              wallet_credit : amount
            },
          }
        );
    

      const stakecount = await stake2.countDocuments({ user : walletAddress });
      console.log("stakecount ",stakecount)
      if(stakecount == 0){
        await stakeRegister.updateOne(
          { user: walletAddress }, 
          { $set: { 
          withdraw_stdate: timestampstart,
          withdraw_endate: timestampend,
          withdrawref_stdate: timestampstart,
          withdrawref_endate: timestampend,
          } } 
        );
      }
      }

      const data = await planData(ratio,amount,token);
      //console.log("data :: ",data)

      let totret = (data.apy/100) * amount;
      const dayss = await getReward(ratio,token);
      //console.log("Total Return :: ",totret)
      //console.log("Total Days :: ",dayss.days)
      const insamt = amount;
      totret = totret*dayss.month
      const perday = (totret)/dayss.days 
      const persec = (totret)/(dayss.days*24*60*60)
      //console.log("perday :: ",perday)
      const randomString = generateRandomString(20); // Specify the desired length
      let hash = crypto.createHash('sha256');
      hash.update(randomString);

// Generate the hash digest
      const hashDigest = hash.digest('hex');
      const transactionHash = hashDigest;
      console.log("transactionHash ",transactionHash)
      const isstalk = await stake2.findOne({ txHash : transactionHash},{ _id : 1})
      if(!isstalk){
      let isCreated = await stake2.create({
        user: walletAddress,
        amount: amount,
        //referral: returnValues.referral,
        token: token.replace(/\s+/g, ''),
        ratio: ratio,
        t1transfer: amount,
        t2transfer: amount,
        perdayroi: perday,
        persecroi: persec,
        regBy:"Admin",
        cal_status:"0",
        apy: data.apy,
        txHash: transactionHash,
        block: "0000000",
        timestamp: "0000000",
      });
     
      if (isCreated) {
       const getref = await registration.findOne({ user: walletAddress },{ referrer : 1 })
       const pil = await stakedirect.findOne({ user: walletAddress, referrer : getref.referrer })
       console.log("pil ",pil)
       if(!pil){
         await registration.updateOne(
          { user: getref.referrer },
          { $inc: { directStakeCount: 1 } }
        );
        await stakedirect.create({
          user : walletAddress,
          referrer : getref.referrer
        })
       }

       const isrefreg = await stakeRegister.findOne({ user : getref.referrer })
       console.log("isrefreg ",isrefreg)
       if(!isrefreg){
        await stakeRegister.create({
          user : getref.referrer,
          return : 0,
          stake_amount : 0,
          topup_amount : 0,
          withdraw_stdate: timestampstart,
          withdraw_endate: timestampend,
          withdrawref_stdate: timestampstart,
          withdrawref_endate: timestampend,
        }) 
       }

       return res.status(200).json({
        status : false,
        message : "Manual 50 50 registration is Successfull"
       })
        //console.log("Stake Event Updated");
      } else {
        console.log("something went wrong");
      }
    }
} catch (e) {
  console.log("Error (EvStake Event) :", e.message);
}
})

async function planData(ratio,amount,curr){ //bUSDT-stUSD
  //console.log(ratio," ",amount," ",curr)
  if(ratio == 10 && curr == "WYZ-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "16.67",
    months : "12"
  }
  return data
} else if(ratio == 20 && curr == "WYZ-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "8.33",
    months : "24"
  }
  return data
} else if(ratio == 30 && curr == "WYZ-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "5.56",
    months : "36"
  }
  return data
} else if(ratio == 40 && curr == "WYZ-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "4.17"
  }
  return data
} else if(ratio == 50 && curr == "WYZ-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "3.33"
  }
  return data
} else if(ratio == 15 && curr == "sUSDT-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "11.11"
  }
  return data
} else if(ratio == 20 && curr == "sUSDT-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "8.33"
  }
  return data
} else if(ratio == 25 && curr == "sUSDT-stUSDT"){
  var data = {
    token1 : ratio,
    token2 : 100 - ratio,
    return2x : (amount*2)/1e18,
    xreturn3x : (amount*3)/1e18,
    apy : "6.67"
  }
  return data
}
}

async function getReward(ratio,token){
  if(ratio == "10" && token == "WYZ-stUSDT"){
   const rewdays = {
    month : "12",
    days  : "365"
   }
   return rewdays
  }
  
  if(ratio == "20" && token == "WYZ-stUSDT"){
    const rewdays = {
     month : "24",
     days  : "730"
    }
    return rewdays
   }
  
   if(ratio == "30" && token == "WYZ-stUSDT"){
    const rewdays = {
     month : "36",
     days  : "1095"
    }
    return rewdays
   }
  
   if(ratio == "40" && token == "WYZ-stUSDT"){
    const rewdays = {
     month : "48",
     days  : "1460"
    }
    return rewdays
   }
  
   if(ratio == "50" && token == "WYZ-stUSDT"){
    const rewdays = {
     month : "60",
     days  : "1825"
    }
    return rewdays
   }
  
   if(ratio == "15" && token == "sUSDT-stUSDT"){
    const rewdays = {
     month : "18",
     days  : "548"
    }
    return rewdays
   }
  
   if(ratio == "20" && token == "sUSDT-stUSDT"){
    const rewdays = {
     month : "24",
     days  : "730"
    }
    return rewdays
   }
  
   if(ratio == "25" && token == "sUSDT-stUSDT"){
    const rewdays = {
     month : "30",
     days  : "913"
    }
    return rewdays
   }
  }

  router.get('/cappingrange', async (req,res) => {
    try {
    const walletAddress = req.query.wallet_address
    const dattta = await stakeRegister.findOne({ user : walletAddress },{ return : 1, totalIncome : 1 })
    return res.status(200).json({
      status : false,
      data : dattta
     })
    } catch (error){
      console.log(error)
    }
  })

  router.get('/checkandupdatereward', async (req,res) => {
    try{
     const walletAddress = req.query.wallet_address
     
     const usrdetail = await registration.findOne({ user : walletAddress },{ ranknumber : 1 })
     
     if(usrdetail){
      // team count
      var directs = 0;
      var directBusiness = 0;
      var TeamSize = 0;
      var teamBusiness = 0;
      var reward = 0;
      
      // const directBiz = await calculateDirects(walletAddress)
      // console.log("directBiz ",directBiz)
      const allTeamMembers = await findAllDescendants(walletAddress);
      const teamcount = allTeamMembers.length
      
      const usrdata = await registration.findOne({ user : walletAddress }, { staketeambusiness : 1, directStakeCount : 1, directplusteambiz : 1 })
      const directMembers = usrdata.directStakeCount?usrdata.directStakeCount:0;
      
      teamBusiness = usrdata.directplusteambiz
 
      const currentRank = usrdetail.ranknumber?usrdetail.ranknumber:0;

      // const bizratio = await calculateseventythirty(walletAddress);
      // const seventy = bizratio.seventy
      // const thirty = bizratio.thirty
      // console.log("seventy ",seventy)
      // console.log("thirty ",thirty)
      console.log("currentRank :: ",currentRank)
      console.log("team count ",teamcount)
      console.log("teamBusiness :: ",teamBusiness)
      console.log("direct count ",directMembers)
      if(currentRank == 0){
        var directs = 5;
        var TeamSize = 30;
        var teambiztarget = 10000;

        if(teamBusiness >= teambiztarget && directMembers >= directs && teamcount >= TeamSize){
          const seeRew = await stakereward.findOne({ user : walletAddress , rankno : 1 })
          if(!seeRew){
          await stakereward.create({
          user : walletAddress,
          amount : 500,
          directteam : directMembers,
          directbusiness : 0,
          targetbusiness : teambiztarget,
          rankno : 1,
          rank : "Bronze",
          seventy : 0,
          thirty : 0,
          teamsize : teamcount,
          })
          await registration.updateOne({ user : walletAddress},{ $set : { ranknumber : 1, rank : "Bronze" } })
          }
          const dattta = {
            directs : directMembers,
            teamcount : teamcount,
            teamBusiness : teamBusiness,
            ranktoachieve : "Bronze"
           }
           
           return res.status(200).json({
             status : true,
             data : dattta
            })
 
        } else {
          const dattta = {
            directs : directMembers,
            teamcount : teamcount,
            teamBusiness : teamBusiness,
            ranktoachieve : "Bronze"
           }
 
           return res.status(200).json({
             status : true,
             data : dattta
            })
        }

      }

      if(currentRank == 1){
        var directs = 7;
        var TeamSize = 100;
        var teambiztarget = 75000;

        if(teamBusiness >= teambiztarget && directMembers >= directs && teamcount >= TeamSize){
          const seeRew = await stakereward.findOne({ user : walletAddress , rankno : 2 })
          if(!seeRew){
          await stakereward.create({
          user : walletAddress,
          amount : 2000,
          directteam : directMembers,
          directbusiness : 0,
          targetbusiness : 75000,
          rankno : 2,
          rank : "Silver",
          seventy : 0,
          thirty : 0,
          teamsize : teamcount,
          })

          await registration.updateOne({ user : walletAddress},{ $set : { ranknumber : 2, rank : "Silver" } })
          }

          const dattta = {
            directs : directMembers,
            teamcount : teamcount,
            teamBusiness : teamBusiness,
            ranktoachieve : "Silver"
           }
           
           return res.status(200).json({
             status : true,
             data : dattta
            })
 
        } else {
          const dattta = {
            directs : directMembers,
            teamcount : teamcount,
            teamBusiness : teamBusiness,
            ranktoachieve : "Silver"
           }
           
           return res.status(200).json({
             status : true,
             data : dattta
            })
        }

      }

      if(currentRank == 2){
        var directs = 10;
        var TeamSize = 500;
        var teambiztarget = 500000;

        if(teamBusiness >= teambiztarget && directMembers >= directs && teamcount >= TeamSize){
          const seeRew = await stakereward.findOne({ user : walletAddress , rankno : 3 })
          if(!seeRew){
          await stakereward.create({
          user : walletAddress,
          amount : 10000,
          directteam : directMembers,
          directbusiness : 0,
          targetbusiness : 500000,
          rankno : 3,
          rank : "Gold",
          seventy : 0,
          thirty : 0,
          teamsize : teamcount,
          })

          await registration.updateOne({ user : walletAddress},{ $set : { ranknumber : 3, rank : "Gold" } })
          }

          const dattta = {
            directs : directMembers,
            teamcount : teamcount,
            teamBusiness : teamBusiness,
            ranktoachieve : "Gold"
           }
           
           return res.status(200).json({
             status : true,
             data : dattta
            })
 
        } else {
          const dattta = {
            directs : directMembers,
            teamcount : teamcount,
            teamBusiness : teamBusiness,
            ranktoachieve : "Gold"
           }
           
           return res.status(200).json({
             status : true,
             data : dattta
            })
        }

      }

      // const rankindown = await calculateseventythirtyMember(walletAddress,3);
      //   const seventyrank = rankindown.strong;
      //   const thirtyrank = rankindown.weak;
      if(currentRank == 3){
        var directs = 15;
        var TeamSize = 2000;
        var teambiztarget = 2000000;

        if(teamBusiness >= teambiztarget && directMembers >= directs && teamcount >= TeamSize){
          const seeRew = await stakereward.findOne({ user : walletAddress , rankno : 4 })
          if(!seeRew){
          await stakereward.create({
          user : walletAddress,
          amount : 500000,
          directteam : directMembers,
          directbusiness : 0,
          targetbusiness : 0,
          rankno : 4,
          rank : "Platinum",
          seventy : 0,
          thirty : 0,
          teamsize : teamcount,
          })

          await registration.updateOne({ user : walletAddress},{ $set : { ranknumber : 4, rank : "Platinum" } })
          }

          const dattta = {
            directs : directMembers,
            teamcount : teamcount,
            teamBusiness : teamBusiness,
            ranktoachieve : "Platinum"
           }
           
           return res.status(200).json({
             status : true,
             data : dattta
            })
 
        } else {
          const dattta = {
            directs : directMembers,
            teamcount : teamcount,
            teamBusiness : teamBusiness,
            ranktoachieve : "Platinum"
           }
           
           return res.status(200).json({
             status : true,
             data : dattta
            })
        }

      }

      if(currentRank == 4){
       
       //console.log("rankindown ",rankindown)
      }
     
     }
    
 
    } catch (error){
      console.log(error)
    }
  });

  router.get('/myreward', async (req, res) => {

    const wallet_address  = req.query.wallet_address; 
    try {
      const totalAmountResult = await stakereward.aggregate([
        {
          $match: { user : wallet_address }
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" }
          }
        }
      ]);

      // Check if any result is returned
      if (!totalAmountResult) {
        return res.status(404).json({ error: 'Transactions not found for this user' });
      }
      //console.log("totalAmountResult ",totalAmountResult)
      // Extract the total amount from the result
      if (totalAmountResult && totalAmountResult.length > 0) {
        var totalAmount = totalAmountResult[0].totalAmount;
      } else {
        var totalAmount = 0;
      }
  
      return res.status(200).json({ status: true , data : totalAmount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/checkandupdatePool', async (req,res) => {
  try{
   const walletAddress = req.query.wallet_address
   
   const usrdetail = await stakeRegister.findOne({ user : walletAddress },{ _id : 1 })
   
   if(usrdetail){  
    const bizratio = await calculateseventythirty(walletAddress);
    const seventy = bizratio.seventy
    const thirty = bizratio.thirty
    console.log("seventy ",seventy)
    console.log("thirty ",thirty)
    const poolcheck = await stakepool.findOne({ user : walletAddress}).sort({ createdAt: -1 })
    if(!poolcheck){
    const eligseventy = 35000;
    const eligthirty = 15000;
      if(seventy >= eligseventy && thirty >= eligthirty){
        const seePoo = await stakepool.findOne({ user : walletAddress, pool : 50000})
        if(!seePoo){
        await stakepool.create({
        user : walletAddress,
        pool : 50000,
        seventy : seventy,
        thirty : thirty
        })
        await stakeRegister.updateOne({ user : walletAddress},{ $set : { currentPool : 50000 } })
        }
        const dattta = {
          maxseventy : eligseventy,
          achievedSeventy : seventy > eligseventy ? eligseventy : seventy,
          maxthirty : eligthirty,
          achievedthirty : thirty > eligthirty ? eligthirty : thirty,
          pooltoachieve : 50000
         }
         
         return res.status(200).json({
           status : true,
           data : dattta
          })

      } else {
        const dattta = {
          maxseventy : eligseventy,
          achievedSeventy : seventy > eligseventy ? eligseventy : seventy,
          maxthirty : eligthirty,
          achievedthirty : thirty > eligthirty ? eligthirty : thirty,
          pooltoachieve : 50000
         }

         return res.status(200).json({
           status : true,
           data : dattta
          })
      }
    } else {
      const currentPool = poolcheck.pool
      if(currentPool == 50000){
        const eligseventy = 105000;
        const eligthirty = 45000;
          if(seventy >= eligseventy && thirty >= eligthirty){
            const seePoo = await stakepool.findOne({ user : walletAddress, pool : 150000})
            if(!seePoo){
            await stakepool.create({
            user : walletAddress,
            pool : 150000,
            seventy : seventy,
            thirty : thirty
            })
            await stakeRegister.updateOne({ user : walletAddress},{ $set : { currentPool : 150000 } })
            }
            const dattta = {
              maxseventy : eligseventy,
              achievedSeventy : seventy > eligseventy ? eligseventy : seventy,
              maxthirty : eligthirty,
              achievedthirty : thirty > eligthirty ? eligthirty : thirty,
              pooltoachieve : 150000
             }
             
             return res.status(200).json({
               status : true,
               data : dattta
              })
    
          } else {
            const dattta = {
              maxseventy : eligseventy,
              achievedSeventy : seventy > eligseventy ? eligseventy : seventy,
              maxthirty : eligthirty,
              achievedthirty : thirty > eligthirty ? eligthirty : thirty,
              pooltoachieve : 150000
             }
    
             return res.status(200).json({
               status : true,
               data : dattta
              })
          }
      } else if(currentPool == 150000){
        const eligseventy = 280000;
        const eligthirty = 120000;
          if(seventy >= eligseventy && thirty >= eligthirty){
            const seePoo = await stakepool.findOne({ user : walletAddress, pool : 400000})
            if(!seePoo){
            await stakepool.create({
            user : walletAddress,
            pool : 400000,
            seventy : seventy,
            thirty : thirty
            })
            await stakeRegister.updateOne({ user : walletAddress},{ $set : { currentPool : 400000 } })
            }
            const dattta = {
              maxseventy : eligseventy,
              achievedSeventy : seventy > eligseventy ? eligseventy : seventy,
              maxthirty : eligthirty,
              achievedthirty : thirty > eligthirty ? eligthirty : thirty,
              pooltoachieve : 400000
             }
             
             return res.status(200).json({
               status : true,
               data : dattta
              })
    
          } else {
            const dattta = {
              maxseventy : eligseventy,
              achievedSeventy : seventy > eligseventy ? eligseventy : seventy,
              maxthirty : eligthirty,
              achievedthirty : thirty > eligthirty ? eligthirty : thirty,
              pooltoachieve : 400000
             }
    
             return res.status(200).json({
               status : true,
               data : dattta
              })
          }
      }

    }
   
    
    }
  } catch(error){
    console.log(error)
  }
  })

  router.get('/recurringConditions', async (req,res) => {
    try{
      const walletAddress = req.query.wallet_address
      const isbal = await stakeRegister.findOne({ user: walletAddress });

      if (isbal) {
        const dateRange = await getMonthRange(isbal.createdAt);
        const alldetails = await sumBizInAMonth(isbal.createdAt,dateRange.startDate,dateRange.endDate,walletAddress);
        const record = await registration.findOne({ user:walletAddress }, { directStakeCount: 1, referrer: 1, stakedirectbusiness: 1 });
        const startDate = new Date(isbal.createdAt);
        const currentDate = new Date();
        const endDate = new Date(currentDate);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths = Math.floor((diffDays/30));
        if(diffMonths < 1){
        var mnth = 1;
        } else {
        var mnth = diffMonths + 1;
        }
        
        console.log(`all_business_detail `,alldetails);

        var prevmonthbiz = alldetails.prevBiz
        var prevmonthDir = alldetails.prevDir
        var currentbiz = alldetails.monthBiz
        var currentDir = alldetails.monthDir

        var direct_in_month = 0;
        var direct_biz_mnth = 0;
        var level_open = 0;

        
        var totalStakedirectbusiness = 0;
        var directStake = 0;
        if(mnth < 2){
        totalStakedirectbusiness = await calculateDirectsesy(walletAddress);
        directStake = record.directStakeCount;
        } else {
          var emnth = mnth - 1;
          var cfdcount = 5 * emnth;
          var cfbiz = 100 * 5 * emnth;
          var extdir = 0;
          var extbiz = 0;
          if(prevmonthDir > cfdcount){
            extdir = prevmonthDir - cfdcount;
          }
    
          if(prevmonthbiz > cfbiz){
            extbiz = prevmonthbiz - cfbiz;
          }
          console.log("extbiz ",extbiz)
          console.log("cfdcount ",cfdcount)
          console.log("cfbiz ",cfbiz)
          console.log("prevmonthDir ",prevmonthDir)
          console.log("prevmonthbiz ",prevmonthbiz)  
        totalStakedirectbusiness = currentbiz;
        totalStakedirectbusiness = totalStakedirectbusiness + extbiz;
        directStake = currentDir;
        directStake = directStake + extdir;
        }


      for(i = 1; i<=5; i++){
      let ie = i;
     
      // if(mnth < 2){
        let dcnt = ie;
        let biz = 100 * ie;
        let iselig = (directStake ? directStake : 0) >= dcnt || totalStakedirectbusiness >= biz ? 1 : 0;
        if(iselig == 0){
          break
        }
      direct_in_month = directStake;
      direct_biz_mnth = totalStakedirectbusiness;
      level_open = ie;
      // } else {

      //   let dcnt = ie * mnth;
      //   let biz = 100 * ie * mnth;
      //   let iselig = (directStake ? directStake : 0) >= dcnt || totalStakedirectbusiness >= biz ? 1 : 0;
      //   if(iselig == 0){
      //     break
      //   }

      // direct_in_month = directStake - dcnt;
      // direct_biz_mnth = totalStakedirectbusiness - biz;
      // level_open = ie;
      // }
    }
      const dattta = {
        level_open : level_open,
        direct_in_month : directStake,
        direct_biz_mnth : totalStakedirectbusiness,
        running_month : mnth,
        all_directs : record.directStakeCount,
        all_direct_business : prevmonthbiz + currentbiz
       }

       return res.status(200).json({
         status : true,
         data : dattta
        })

        // console.log("loop iteration ",ie)
      // console.log("record.directStakeCount ",record.directStakeCount)
      // console.log("dcnt ",dcnt)
      // console.log("totalStakedirectbusiness ",totalStakedirectbusiness)
      // console.log("biz ",biz)
      // console.log("month ",mnth)
    } else {

       return res.status(200).json({
         status : false,
         message : "No record found"
        })
    }
    } catch(error){
    console.log(error)
    }
  })
  

  async function calculateseventythirty(walletAddress){
    try{
        // to calculate 70 and 30 percent in diferent legs 
    const records = await registration.find({ referrer: walletAddress }).sort({ directplusteambiz: -1 }).exec();
    if(records.length > 1){
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
  
  return { seventy : seventyPercentOfHighest , thirty : thirtyPercentOfRemainingSum }
  console.log("seventyPercentOfHighest :: ",seventyPercentOfHighest)
  console.log("thirtyPercentOfRemainingSum :: ",thirtyPercentOfRemainingSum)
// to calculate 70 and 30 percent in diferent legs 
    } catch(error){
      console.log(error)
    }
  }

  async function calculateseventythirtyMember(walletAddress,rank){
    try{
        // to calculate 70 and 30 percent in diferent legs 
    const records = await registration.find({ referrer: walletAddress }).sort({ directplusteambiz: -1 }).exec();
    //console.log("records :: ",records)
    if(records.length > 1){
    var highestmember = records[0].user;

    const allTeamMembers = await findAllDescendantsOld(highestmember);
    //console.log("strong team ",allTeamMembers)
    var teamcount = allTeamMembers.length
    if(teamcount > 1){
      let count = 0;
      for (const user of allTeamMembers) {
        let rankclit = await stakeRegister.findOne({ user : user, ranknumber: { $gte: rank } });
        //console.log("rank "+rank+" ",rankclit)
        if (rankclit) {
            count++;
            if (count >= 2) {
                break; 
            }
        }
    
        if (count >= 2) {
            break; 
        }
    }
    // for rest of the direct members team count and rank
    let count2 = 0;
    for (let i = 1; i < records.length; i++) {
      const user = records[i].user;
      const allTeamMembers = await findAllDescendantsOld(user);
      
      for (const teamMember of allTeamMembers) {
          const rankclit = await stakeRegister.findOne({ user: teamMember, ranknumber: { $gte: rank } });
          if (rankclit) {
            count2++;
              if (count2 >= 1) {
                  break;
              }
          }
      }
    }
    
    return { strong : count , weak : count2 }  
   
  } else {
    return { strong : 0 , weak : 0 }
  }
} else {
  return { strong : 0 , weak : 0 }
  
}
    } catch(error){
      console.log(error)
    }
  }

  async function calculateDirects(walletAddress) {
    try {
      // Step 1: Find direct members from the registration schema
      const directMembers = await stakedirect.find({ referrer: walletAddress }).select('user');
      const userIds = directMembers.map(member => member.user);
  
      // Step 2: Find corresponding records in the stake2 schema and sum the amount
      const stakeResult = await stake2.aggregate([
        { $match: { user: { $in: userIds } } },
        { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
      ]);
      const stakeTotalAmount = stakeResult.length > 0 ? stakeResult[0].totalAmount : 0;
  
      // Step 3: Find corresponding records in the topup schema and sum the amount
      // const topupResult = await Topup.aggregate([
      //   { $match: { user: { $in: userIds } } },
      //   { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
      // ]);
      // const topupTotalAmount = topupResult.length > 0 ? topupResult[0].totalAmount : 0;
  
      // Step 4: Return the sum of amounts from both schemas
      return stakeTotalAmount + 0;
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
      const stakeRegisterResult = await stakeRegister.aggregate([
        { $match: { user: { $in: userIds } } },
        { $group: { _id: null, totalAmount: { $sum: '$topup_amount' } } }
      ]);
      const stakeRegisterTotalAmount = stakeRegisterResult.length > 0 ? stakeRegisterResult[0].totalAmount : 0;
  
      // Step 3: Return the total amount
      return stakeRegisterTotalAmount;
    } catch (error) {
      console.error('Error in function:', error);
      throw new Error('Internal Server Error');
    }
  }

  async function getMonthRange(joiningDateStr) {
    // Parse the joining date string to a Date object
    const joiningDate = new Date(joiningDateStr);
  
  // Get the current date
  const currentDate = new Date();
  
  // Extract the day and time from the joining date
  const joiningDay = joiningDate.getDate();
  const joiningHours = joiningDate.getHours();
  const joiningMinutes = joiningDate.getMinutes();
  const joiningSeconds = joiningDate.getSeconds();
  const joiningMilliseconds = joiningDate.getMilliseconds();
  
  // Construct the start date for the current month based on the joining day and time
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), joiningDay, joiningHours, joiningMinutes, joiningSeconds, joiningMilliseconds);
  
  // Construct the end date for the next month by adding one month to the start date
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);
  
  // Format the dates to ISO format (full date and time)
  const formatDate = (date) => {
    return date.toISOString();
  };
  
  // Get the formatted start and end dates
  const startDateStr = formatDate(startDate);
  const endDateStr = formatDate(endDate);
  
  return { startDate: startDateStr, endDate: endDateStr };
  }

  async function sumBizInAMonth(joindate,startDate,endDate,userAddr) {

    const directMembers = await stakedirect.find({ referrer: userAddr }).select('user');
    const userIds = directMembers.map(member => member.user);
    console.log("Directs team ",userIds)
    console.log("joindate ",joindate)
    console.log("startDate ",startDate)
    console.log("endDate ",endDate)
    console.log("userAddr ",userAddr)
    // Step 2: Find corresponding records in the stakeRegister schema and sum the topupAmount
    console
    const stake2Result = await stake2.aggregate([
      {
        $match: {
          user : { $in: userIds },
          createdAt: {
            $gte: new Date(startDate),
            $lt: new Date(endDate)
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
          user : { $in: userIds },
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
      referrer : userAddr,
      createdAt: {
        $gte: new Date(startDate),
        $lt: new Date(endDate)
      }
    });

    // previous month count

    const prevstake2Result = await stake2.aggregate([
      {
        $match: {
          user : { $in: userIds },
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
          user : { $in: userIds },
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
      referrer : userAddr,
      createdAt: {
        $gte: new Date(joindate),
        $lt: new Date(startDate)
      }
    });
  
    return { monthBiz : totalSum, monthDir : count, prevBiz : prevBiz, prevDir :prevcount  };
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
  
  router.get('/todayBizWyzsUSDT', async (req, res) => {

    try {
      const wallet_address = req.query.wallet_address;
      let currentDate = new Date();

// Get current time in milliseconds since UNIX epoch
let currentTime = currentDate.getTime();

// Set a date object for 12:00 AM IST
let startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0); // Set to 00:00:00.000

// Get time in milliseconds for 12:00 AM IST
let startTime = startOfDay.getTime();

// Calculate elapsed time since 12:00 AM IST in milliseconds
let elapsedTime = currentTime - startTime;

// Convert milliseconds to hours, minutes, and seconds
let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);


console.log(`Time elapsed since 12:00 AM IST: ${hours} hours, ${minutes} minutes, ${seconds} seconds.`);

let currentUTCDate = new Date();
// Subtract hours and minutes
currentUTCDate.setUTCHours(currentUTCDate.getUTCHours() - hours);
currentUTCDate.setUTCMinutes(currentUTCDate.getUTCMinutes() - minutes);

// Format the resulting UTC time
//let utcTimeAfterSubtraction = currentUTCDate.toISOString();
let utcTimeAfterSubtraction = currentUTCDate.toISOString();

console.log(utcTimeAfterSubtraction);

const allTeamMembers = await findAllDescendantsOld(wallet_address);

// Batch query for all stake2 records and Topup records
const [stakeTot, topTot] = await Promise.all([
    stake2.find({ 
        token: 'WYZ-stUSDT', 
        user: { $in: allTeamMembers }, 
        createdAt: { $gte: utcTimeAfterSubtraction }
    }, { amount: 1, ratio: 1 }),
    Topup.find({ 
        user: { $in: allTeamMembers }, 
        plan: { $lt: 5 }, 
        createdAt: { $gte: utcTimeAfterSubtraction }
    }, { plan: 1, amount: 1 })
]);

let wyz = 0;
let sUSTD = 0;
let totalInvest = 0;

// Process stakeTot records
stakeTot.forEach(stkall => {
    const amt = stkall.amount;
    totalInvest += amt;
    const wyzii = amt * (stkall.ratio / 100);
    wyz += (wyzii / 20);
    sUSTD += amt - wyzii;
});

// Process topTot records
  topTot.forEach(topall => {
    if(topall.plan == 0){
      var ratio = 10
    } else if(topall.plan == 1){
      var ratio = 20
    } else if(topall.plan == 2){
      var ratio = 30
    } else if(topall.plan == 3){
      var ratio = 40
    } else if(topall.plan == 4){
      var ratio = 50
    }

    const amt = topall.amount;
    totalInvest += amt;
    const wyzii = amt * (ratio / 100);
    wyz += (wyzii / 20);
    sUSTD += amt - wyzii;
});

return res.status(200).json({
    status: true,
    data: { wyz: wyz, sUSTD: sUSTD, totalInvest: totalInvest }
});
    } catch (err) {
      console.log(err);
      //res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/checkfirstinvest', async (req, res) => {
  const walletAddress = req.query.wallet_address;
  try {
    const firststake = await stakeRegister.findOne({ user : walletAddress },{ stake_amount : 1 })
    if(firststake){
      const stkamt = firststake.stake_amount
      return res.status(200).json({
        status: true,
        data: stkamt
    });
    } else {
      return res.status(200).json({
        status: true,
        data: 0
    });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/levelopenupdate', async (req, res) => {
  try {
    const records = await stake2.find({ level_update: 0 }).limit(1000).exec();
    
    let z=0;
    for (let rec of records) {
      const date = new Date(rec.createdAt); 
      const txn_id = rec.txHash;
      let uuupids = await getLevelIdsTill(rec.user, "5");
      //console.log("uuupids ",uuupids)
      for (let i = 0; i < uuupids.length; i++) {
        
        const stakedata = await stakeRegister.findOne({ user: uuupids[i] }, { openlevel: 1,createdAt:1 }).exec();
        if(stakedata){
        // Replace this with your actual date
        const joining = new Date(stakedata.createdAt); // Replace this with your actual joining date
        const year = joining.getUTCFullYear();
        const month = joining.getUTCMonth();
        const day = joining.getUTCDate();

        const startDate = new Date(Date.UTC(year, month, day, 0, 0, 0));
        const monthlevel = await openlevel.findOne({ 
          user : uuupids[i]
        })
        if(!monthlevel){
        const dtreco = [];
        let currentStartDate = startDate;
        // saving many records for five months

        for (let k = 0; k < 5; k++) {
          let currentEndDate = new Date(currentStartDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Add 30 days in milliseconds
          currentEndDate.setUTCHours(23, 59, 59);

          const recrd = {
            user: uuupids[i],
            month: k+1,
            startDate: currentStartDate,
            endDate: currentEndDate
          };

          dtreco.push(recrd);
          currentStartDate = new Date(currentEndDate.getTime() + 1 * 1000); // Set next start date to the second after current end date
        }

        // Insert records into the database
        await openlevel.insertMany(dtreco);
        }
        if(stakedata){
        console.log("date to find  ",date)
        let ei = i + 1;
        
        if(stakedata.openlevel < ei ){
        await stakeRegister.updateOne({ user: uuupids[i] }, { $set : { openlevel: ei } }) 
        }
         
        const monthlevel = await openlevel.findOne({ 
          user : uuupids[i],
          startDate: { $lte: date },
          endDate: { $gte: date } 
        })

        if(!monthlevel){
        } else {
          const uplevel = await stakeRegister.findOne({ user : uuupids[i] }, { openlevel : 1 })
          if(ei > uplevel.openlevel){
            await openlevel.updateOne({ 
              _id : monthlevel._id,
              level : { $lt : ei}
            },
            {
              $set : { level : ei }
            }
          )
          } else {
            await openlevel.updateOne({ 
              _id : monthlevel._id
            },
            {
              $set : { level : uplevel.openlevel }
            }
          )
          }
        }
        }
      }
      }

      await stake2.updateOne({ _id : rec._id}, { $set : { level_update : 1 } });
      z++;
    }
console.log("done");
    if (records.length === 0) {
      console.log("No Recurring Level Income to Send");
    }
  } catch (error) {
    console.log("Error in RecurringlevelIncome:", error);
  }
});

async function getLevelIdsTill(user,till){
  
  try {
   let uplines = []
  const rec = await registration.findOne({ user: user }).exec();
  if(rec){
  let currentReferrerId = rec.referrer;
  //console.log("currentReferrerId :: ",currentReferrerId)
  if(uplines.length == 0){
  uplines.push(rec.referrer);
  }
 // console.log("currentReferrerId :: ",currentReferrerId)
  let i = 1;
  while (currentReferrerId) {
    const record = await registration.findOne({ user: currentReferrerId },{  referrer : 1 }).exec();
   
    if (!record) {
      break; 
    }
  
    uplines.push(record.referrer);
    i++;

    if(i == till){
      break;
    }
    //console.log("referrer :: ",currentReferrerId)
    currentReferrerId = record.referrer; 
  }
  
  return uplines;
} else {
  return uplines;
}
} catch(error){
  console.log(error)
}
}

  router.get('/updaterecord', async (req, res) => {

    try {
      // await stakeRegister.updateMany({}, { $set : { openlevel : 0 } })
      // await stake2.updateMany({}, { $set : { level_update : 0 } })
      console.log("done")
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/seventythirty', async (req,res) => {
  try{
   const walletAddress = req.query.wallet_address
   const usrdetail = await stakeRegister.findOne({ user : walletAddress },{ _id : 1 })
   if(usrdetail){  
    const bizratio = await calculateseventythirty(walletAddress);
    const seventy = bizratio.seventy
    const thirty = bizratio.thirty
    const dattta = {
      seventy : seventy,
      thirty : thirty
     }
     return res.status(200).json({
       status : true,
       data : dattta
      })
    }
  } catch(error){
    console.log(error)
  }
  })

  router.get('teamwyzstusdt', async (req,res) => {
    try {
    const wallet_address = req.query.wallet_address;
    const allTeamMembers = await findAllDescendants(wallet_address);

    const directMembers = await stakedirect.find({ referrer: wallet_address }).select('user');
    const userIds = directMembers.map(member => member.user);

// Batch query for all stake2 records and Topup records for teams
      const [stakeTot, topTot] = await Promise.all([
          stake2.find({ 
              token: 'WYZ-stUSDT', 
              user: { $in: allTeamMembers },
          }, { amount: 1, ratio: 1 }),
          Topup.find({ 
              user: { $in: allTeamMembers }, 
              plan: { $lt: 5 }, 
          }, { plan: 1, amount: 1 })
      ]);

      let wyz = 0;
      let sUSTD = 0;
      let totalInvest = 0;

      // Process stakeTot records
      stakeTot.forEach(stkall => {
          const amt = stkall.amount;
          totalInvest += amt;
          const wyzii = amt * (stkall.ratio / 100);
          wyz += (wyzii / 20);
          sUSTD += amt - wyzii;
      });

      // Process topTot records
        topTot.forEach(topall => {
          if(topall.plan == 0){
            var ratio = 10
          } else if(topall.plan == 1){
            var ratio = 20
          } else if(topall.plan == 2){
            var ratio = 30
          } else if(topall.plan == 3){
            var ratio = 40
          } else if(topall.plan == 4){
            var ratio = 50
          }

          const amt = topall.amount;
          totalInvest += amt;
          const wyzii = amt * (ratio / 100);
          wyz += (wyzii / 20);
          sUSTD += amt - wyzii;
      });

      // directs business in ratio for the first level or direct team

          const [stakeTotdir, topTotdir] = await Promise.all([
              stake2.find({ 
                  token: 'WYZ-stUSDT', 
                  user: { $in: userIds },
              }, { amount: 1, ratio: 1 }),
              Topup.find({ 
                  user: { $in: userIds }, 
                  plan: { $lt: 5 }, 
              }, { plan: 1, amount: 1 })
          ]);

          let dirwyz = 0;
          let dirsUSTD = 0;
          let dirtotalInvest = 0;

          stakeTotdir.forEach(stkall => {
              const amt = stkall.amount;
              dirtotalInvest += amt;
              const wyzii = amt * (stkall.ratio / 100);
              dirwyz += (wyzii / 20);
              dirsUSTD += amt - wyzii;
          });

          // Process topTot records
          topTotdir.forEach(topall => {
              if(topall.plan == 0){
                var ratio = 10
              } else if(topall.plan == 1){
                var ratio = 20
              } else if(topall.plan == 2){
                var ratio = 30
              } else if(topall.plan == 3){
                var ratio = 40
              } else if(topall.plan == 4){
                var ratio = 50
              }

              const amt = topall.amount;
              dirtotalInvest += amt;
              const wyzii = amt * (ratio / 100);
              dirwyz += (wyzii / 20);
              dirsUSTD += amt - wyzii;
          });

      return res.status(200).json({
          status: true,
          data: { team_wyz: wyz, team_sUSTD: sUSTD, team_totalInvest: totalInvest, direct_wyz : dirwyz, direct_sUSDT : dirsUSTD, direct_totalInvest : dirtotalInvest }
      });
          } catch (err) {
            console.log(err);
            //res.status(500).json({ error: 'Internal server error' });
          }

  })

  router.post('/searchDownline', async (req, res) => {

    try {
      var {wallet_address, connectWallet}  = req.body;

      if (!wallet_address) {
        return res.status(400).json({ error: 'wallet_address is required', message : "wallet_address is required", status : false });
      }

      const isfind = await registration.findOne({ user : wallet_address })
      if(!isfind){
        const isid = await signup.findOne({ userId : wallet_address },{ wallet_add : 1 })
        if(!isid){
          return res.status(400).json({ error: 'No user found with this id', message : "No user found with this id", status : false });
        }
        wallet_address = isid.wallet_add
      }

      const allTeamMembers = await findAllDescendantsOld(connectWallet);
  
      const walletExists = allTeamMembers.includes(wallet_address);

      if (walletExists) {
       const regData = await registration.findOne({ user :  wallet_address })
       const stakeReg = await stakeRegister.findOne({ user : wallet_address })
       let dir_business = 0;
       if(regData.directplusteambiz > 0){
        dir_business = regData.directplusteambiz - regData.staketeambusiness
       }
       const teamcount = await findAllDescendantsOld(wallet_address);
       const dtatoret = {
        address : wallet_address,
        totalStake : stakeReg.topup_amount?stakeReg.topup_amount:0,
        directs : regData.directStakeCount?regData.directStakeCount:0,
        directBusiness : dir_business,
        team : teamcount.length,
        teamBusiness : regData.staketeambusiness?regData.staketeambusiness:0,
        rank : stakeReg.rank?stakeReg.rank:'',
        pool : stakeReg.currentPool?stakeReg.currentPool:'',
       }
       return res.status(200).json({ data : dtatoret,  message : "", status : true });
      } else {
        return res.status(400).json({  message : "Not in your team", status : false });
      }

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/userDetails', async (req, res) => {
  const {userId} = req.body;

  try {
      // Find user details from registration schema by userId
      const userDetails = await registration.aggregate([
          { $match: { 'userId': userId } },
          {
              $lookup: {
                  from: 'registrations', // Ensure the collection name is correct
                  localField: 'referrer',
                  foreignField: 'user',
                  as: 'referrerDetails'
              }
          },
          {
              $project: {
                  user: 1,
                  referrer: 1,
                  stake_amount: 1,
                  userId: 1,
                  createdAt : 1,
                  referrerUserId: { $arrayElemAt: ['$referrerDetails.user', 0] }
              }
          }
      ]);

      if (userDetails.length === 0) {
          return res.status(404).send({ message: 'User not found' });
      }

      const walletAddress = userDetails[0].user;

      // Aggregate to get the total investment from stake2 schema by the user (wallet address) field
      const stakeAggregation = await Stake2.aggregate([
          { $match: { user: walletAddress } },
          {
              $group: {
                  _id: '$user',
                  totalInvestment: { $sum: '$amount' }
              }
          }
      ]);

      const totalInvestment = stakeAggregation.length > 0 ? stakeAggregation[0].totalInvestment : 0;

      res.status(200).send({
          userDetails: userDetails[0],
          totalInvestment: totalInvestment
      });
  } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/userDetailsbyWallet', async (req, res) => {
  const {userId} = req.body;

  try {
      // Find user details from registration schema by userId
      const userDetails = await registration.aggregate([
          { $match: { 'user': userId } },
          {
              $lookup: {
                  from: 'registrations', // Ensure the collection name is correct
                  localField: 'referral',
                  foreignField: 'user',
                  as: 'referrerDetails'
              }
          },
          {
              $project: {
                  user: 1,
                  referrer: 1,
                  referrerId: 1,
                  package: 1,
                  userId: 1,
                  uId : 1,
                  totalIncome : 1,
                  return : 1,
                  stake_amount : 1,
                  capping : 1,
                  createdAt : 1,
                  rank : 1,
                  rankbonus : 1,
                  referrerUserId: { $arrayElemAt: ['$referrerDetails.user', 0] }
              }
          }
      ]);

      if (userDetails.length === 0) {
          return res.status(404).send({ message: 'User not found' });
      }

      const walletAddress = userDetails[0].user;

      const totalIncome = userDetails[0].totalIncome;

      const stake_amount = userDetails[0].stake_amount;
      
      
      // console.log("totalIncome ",totalIncome)
      // console.log("stake_amount ",stake_amount)
      let isallow = true;
      if(stake_amount > 0){
      const percentreceived = (totalIncome/stake_amount)*100;
      //console.log("percentreceived ",percentreceived)
      if(percentreceived < 50){
        isallow = false;
      } 
      }
      // Aggregate to get the total investment from stake2 schema by the user (wallet address) field
      const stakeAggregation = await Stake2.aggregate([
          { $match: { user: walletAddress } },
          {
              $group: {
                  _id: '$user',
                  totalInvestment: { $sum: '$amount' }
              }
          }
      ]);

      const totalInvestment = stakeAggregation.length > 0 ? stakeAggregation[0].totalInvestment : 0; 

      isallow = true;

      res.status(200).send({
          userDetails: userDetails[0],
          totalInvestment: totalInvestment,
          isallow : isallow
      });
  } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/dashboarddetails', async (req, res) => {
  const { wallet_address } = req.body;

  if (!wallet_address) {
    return res.status(400).send({ error: 'wallet_address is required' });
  }

  try {
    const user = await registration.findOne({ user: wallet_address });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const myDirects = await registration.find({ referrer: wallet_address }).countDocuments();
    const myDirectsBusiness = await registration.aggregate([
      { $match: { referrer: wallet_address } },
      { $group: { _id: null, total: { $sum: '$stake_amount' } } }
    ]);

    const downline = await findAllDescendantsOld(wallet_address);;
    //console.log("downline ",downline)
    const myTotalTeam = downline.length;
    const result = await registration.aggregate([
      { $match: { user: { $in: downline } } },
      { $group: { _id: null, totalStakeAmount: { $sum: '$stake_amount' } } }
    ]);

    const totalStakeAmount = result.length > 0 ? result[0].totalStakeAmount : 0;
    const myTotalTeamBusiness = totalStakeAmount;

    const myStaking = user.stake_amount;
    const myLevelBonus = user.levelIncome + user.roilevelIncome;
    const roiBonus = user.roiincome;
    const walletincome = user.wallet_income;
    const totalWithdraw = user.totalWithdraw;
    const totalIncome = user.totalIncome;
    const sponsorIncome = user.referalIncome;

    res.send({
      myTotalTeam,
      myTotalTeamBusiness,
      myDirects,
      myDirectsBusiness: myDirectsBusiness[0] ? myDirectsBusiness[0].total : 0,
      myStaking,
      myLevelBonus,
      roiBonus,
      walletincome,
      totalWithdraw,
      totalIncome,
      sponsorIncome
    });
  } catch (error) { 
    console.log(error)
    res.status(500).send({ error: 'Server error' });
  }
});

router.post('/downlinetea', async (req, res) => {
  const {wallet_address} = req.body;
  const downline = [];
  const stack = [wallet_address];

  while (stack.length) {
    const currentUserId = stack.pop();
    const directMembers = await registration.find({ referrer: currentUserId });

    for (const member of directMembers) {
      downline.push(member);
      stack.push(member.user);
    }
  }
  
  res.send({
    downline
  });
  //return downline;
});

router.post("/downlineteam", async (req, res) => {
  try {
    const { wallet_address, level } = req.body;
   console.log("level ", level)
    if(level == "ALL"){
      const downline = [];
      const stack = [{ user: wallet_address, level: -1 }]; // Start at -1 so first-level users get level 0
      
      while (stack.length) {
        const { user, level } = stack.pop();
        const directMembers = await registration.find({ referrer: user });
      
        for (const member of directMembers) {
          const memberLevel = level + 1; // First-level users will be at 0
          downline.push({ ...member._doc, level: memberLevel });
          stack.push({ user: member.user, level: memberLevel });
        }
      }
      
      res.send({ downline });
    } else {  

    const downline = await registration.aggregate([
      {
        $match: { user: wallet_address }
      },
      {
        $graphLookup: {
          from: "registration",
          startWith: "$user",
          connectFromField: "user",
          connectToField: "referrer",
          maxDepth: 25, // Set this dynamically if needed
          depthField: "level",
          as: "referrals"
        }
      },
      { $unwind: "$referrals" },
      {
        $group: {
          _id: "$referrals._id",
          user: { $first: "$referrals.user" },
          userId : { $first: "$referrals.userId" },
          stake_amount : { $first: "$referrals.stake_amount" },
          directbusiness : { $first: "$referrals.directbusiness" },
          directplusteambiz : { $first: "$referrals.directplusteambiz" },
          createdAt : { $first: "$referrals.createdAt" },
          time: { $first: "$referrals.createdAt" },
          refAddress: { $first: "$referrals.referrer" },
          level: { $first: "$referrals.level" }
        }
      },
      {
        $match: {
          level: Number(level-1) // Filter for the specified level
        }
      }
    ]);

    res.send({
      downline
    });
  }
  } catch (e) {
    console.log(e, "Error in getDetailsByLevel");
  }
});


router.post('/dailyroi', async (req, res) => {
  try {
    const { wallet_address, page = 1 } = req.body; // Extract wallet_address and page from the request body
    const PAGE_SIZE = 10; 
    const pageNumber = parseInt(page, 10); // Convert page to integer if it is passed as a string
    const skip = (pageNumber - 1) * PAGE_SIZE;
    
    if (!wallet_address) {
      return res.status(400).json({ error: 'wallet_address is required' });
    }

    // Fetch paginated dailyROIs
    const dailyROIs = await dailyroi.find({ user: wallet_address })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE);

    // Count total documents (without pagination)
    const roicount = await dailyroi.countDocuments({ user: wallet_address });

    return res.status(200).json({ 
      status: true,
      data: dailyROIs,
      record_count: roicount 
    });
  } catch (error) {
    console.error('Error fetching daily ROI:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/isreguser', async (req, res) => {
  
  try {
    const { wallet_address } = req.body;

    if (!wallet_address) {
      return res.status(400).json({ error: 'walletAddress is required' });
    }
    console.log(wallet_address)
    const isuser = await registration.findOne({ user: wallet_address });
    if(isuser){
      console.log(wallet_address)
    return res.status(200).json({ 
      status : true,
      data : isuser 
    });
  } else {
    return res.status(200).json({ 
      status : false,
      data : '' 
    });
  }
  } catch (error) {
    console.error('Error fetching daily ROI:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

router.post('/usrregister', async (req, res) => {
  
  try {
    const { wallet_address, referral } = req.body;

    if (!wallet_address || !referral) {
      return res.status(200).json({ status : false, error: 'walletAddress& referral are required' });
    }
    console.log(wallet_address)
    const referrer = await registration.findOne({ userId : referral }, { user : 1})
    if(!referrer){
      return res.status(200).json({ status : false, error: 'Invalid Sponsor Id' });
 
    }
    let userId = "";
    const randomNumber = Math.floor(Math.random() * 100000);
    const fiveDigitNumber = randomNumber.toString().padStart(5, '0');
    userId = "SPLH" + fiveDigitNumber;
    try {
      let isCreated = await registration.create({
        userId: userId,
        user: wallet_address,
        referrerId: referral,
        referrer: referrer.user
      });
    if(isCreated){
      console.log(wallet_address)
    return res.status(200).json({ 
      status : true,
      data : isCreated 
    });
  } else {
    return res.status(200).json({ 
      status : false,
      data : '' 
    });
  }
  } catch (error) {
    console.error('Error ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  } catch (error) {
  console.error('Error', error);
  res.status(500).json({ error: 'Internal server error' });
}
});

router.post('/firststake', async (req, res) => {
  
  try {
    const { wallet_address } = req.body;

    if (!wallet_address) {
      return res.status(400).json({ error: 'walletAddress is required' });
    }
    //console.log(wallet_address)
    const isuser = await stake2.findOne({ user: wallet_address, first_stake : 1 });
    if(isuser){
    return res.status(200).json({ 
      status : true,
      data : isuser.amount 
    });
  } else {
    return res.status(200).json({ 
      status : true,
      data : 50
    });
  }
  } catch (error) {
    console.error('Error :', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

router.post("/updaterecordroi", async (req, res) => {
  try {
    
    const records = await registration.find({
      capping : { $ne : 0 }
    });

    for (let record of records) {
        const {
            user,
            stake_amount,
            capping
        } = record;

      // console.log("stake ",stake_amount)
      // console.log("capping ",capping)
      // console.log("return ",stake_amount*capping)
        // Update the withdraw_endate field in the stakeRegister
       const modd = await registration.updateOne(
            { user: user },
            { $set : { return : stake_amount * capping } }
        );
      
    }

    console.log('Records updated and saved successfully.');
} catch (error) {
    console.error('Error updating records:', error);
}

})

router.post('/transferhistory', async (req, res) => {
  try {
    const { wallet_address, page = 1 } = req.body; // Extract wallet_address and page from the request body
    const PAGE_SIZE = 10; 
    const pageNumber = parseInt(page, 10); // Convert page to integer if it is passed as a string
    const skip = (pageNumber - 1) * PAGE_SIZE;
    
    if (!wallet_address) {
      return res.status(400).json({ message: 'wallet_address is required' });
    }

    // Fetch paginated dailyROIs
    const matchingTransfers = await transferModel.find({
      $or: [
          { user: wallet_address },
          { touser: wallet_address }
      ]
    }).sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE);

    // Count total documents (without pagination)
    const transfercount = await transferModel.countDocuments({
      $or: [
          { user: wallet_address },
          { touser: wallet_address }
      ]
    });

    return res.status(200).json({ 
      status: true,
      data: matchingTransfers,
      record_count: transfercount
    });
  } catch (error) {
    console.error('Error fetching daily ROI:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/transfer', async (req, res) => {
  try {
    const { wallet_address, userId, amount } = req.body; // Extract wallet_address and page from the request body
   
    if (!wallet_address || !userId || !amount || amount < 5) {
      return res.status(200).json({ message: 'wallet_address and to User Address are Required and $5 is minimum Transfer Amount' });
    }

    const isdl = await registration.findOne({ user : wallet_address })

    if (!isdl) {
      return res.status(200).json({ message: 'Wallet Address Not Found' });
    }

    const istransuser = await registration.findOne({ userId : userId })

    if (!istransuser) {
      return res.status(200).json({ message: 'In Valid User Id' });
    }

    if (isdl.wallet_income < amount) {
      return res.status(200).json({ message: 'Insufficient Wallet Balance' });
    }

    const touser = istransuser.user

    const updwall = await registration.updateOne({ user : wallet_address, wallet_income : { $gte : amount } }, { $inc : { wallet_income : -amount } })

    if(updwall.modifiedCount > 0 ){

      const updwallusr = await registration.updateOne({ user : touser }, { $inc : { wallet_income : amount } })

      if(updwallusr.modifiedCount > 0){
        const jsio = await transferModel.create({
          user : wallet_address,
          touserId : userId,
          userId: isdl.userId,
          amount : amount,
          touser : touser
        })

        if(jsio){
          return res.status(200).json({ 
            status: true,
            message: "Amount Transfer Successfully to Staking Wallet of "+userId
          });
        }
      }
    }
    
  } catch (error) {
    console.error('Error fetching daily ROI:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/stakingWalletDeposit', async (req, res) => {
  try {
    const { wallet_address, amount } = req.body; // Extract wallet_address and page from the request body
   
    if (!wallet_address || !amount || amount < 50) {
      return res.status(400).json({ error: 'wallet_address and to User Address is required' });
    }

    const isdl = await registration.findOne({ user : wallet_address })

    if (!isdl) {
      return res.status(400).json({ error: 'Wallet Address Not Found' });
    }

    if (isdl.wallet_income < amount) {
      return res.status(400).json({ error: 'Insufficient Wallet Balance' });
    }
    // let multi = 3;
    
         var first_stake = 0;
         const stakecount = await stake2.countDocuments({ user : wallet_address});
         if(stakecount == 0){
           first_stake = 1;
         }
         const returnx = amount;
         const isisis = await registration.findOne({ user : wallet_address },{ capping : 1, stake_amount : 1 })
         let stake_amt_now = isisis.stake_amount;
         stake_amt_now = stake_amt_now + amount;
         if(returnx >= 50 && returnx < 501){
           multi = 2;
         } else if(returnx >= 501 && returnx < 5001){
           multi = 2.5;
         } else if(returnx >= 5001 && returnx <= 10000){
           multi = 3;
         }
         console.log("multi first ",multi)
         if(isisis.capping >= multi){
           multi = isisis.capping
         }
         console.log("multi second ",multi)
       await registration.findOneAndUpdate(
         { user: wallet_address },
         {
           $inc: {
             //return: (returnValues.package/1e18) * multi,
             stake_amount : returnx
           },
           $set: {
             return : stake_amt_now * multi,
             capping : multi
           }
         }
       );
     

     const result = calculateIncomeAndPackage((returnx));
     const perday = result.perDayIncome; 
   
     //console.log("perday :: ",perday)
     const txnhas = generateRandomString(20)
     
     let isCreated = await stake2.create({
       user: wallet_address,
       amount: returnx,
       perdayroi: perday,
       first_stake : first_stake,
       txHash: txnhas,
       block: '000000',
       timestamp: '000000',
     });
    
     if (isCreated) {
      const getref = await registration.findOne({ user: wallet_address },{ referrer : 1 })
      const pil = await stakedirect.findOne({ user: wallet_address, referrer : getref.referrer })
      if(!pil){
        await registration.updateOne(
         { user: getref.referrer },
         { $inc: { directStakeCount: 1 } }
       );
       await stakedirect.create({
         user : wallet_address,
         referrer : getref.referrer
       })
      }
      
       const amti = returnx;

       const iss = await registration.findOne({ user : getref.referrer },{ totalIncome : 1, return : 1, capping : 1 , directStakeCount : 1, stake_amount : 1})
      
       if(iss.capping != 3 && iss.directStakeCount >= 4){
         const directBusiness = await calculateDirectsesy(getref.referrer);
         console.log("directBusiness ",directBusiness)
         if(directBusiness >= 1500){
         const ref_staking = iss.stake_amount;
         await registration.findOneAndUpdate(
           { user: getref.referrer },
           {
             // $inc: {
             //   return: tutamt * 3
             // },
             $set : {
               return : ref_staking * 3,
               capping : 3
             }
           }
         );
         }
       }

       const issss = await registration.findOne({ user : getref.referrer },{ totalIncome : 1, return : 1, capping : 1 , directStakeCount : 1, stake_amount : 1})


       const incomeref = (5/100)*amti

       const nowinc = issss.totalIncome + incomeref;
       const returrrn = issss.return;

       if(returrrn >= nowinc){

      const isadded = await registration.updateOne({ user : getref.referrer }, { $inc : { wallet_income : incomeref, referalIncome : incomeref , totalIncome : incomeref }})
      
      if(isadded.modifiedCount > 0){
      await levelStake.create({
       sender: wallet_address,
       receiver: getref.referrer,
       level: 1,
       amount: amti,
       income: incomeref,
       percent: 5,
       income_type: "Referral Income",
       txHash : txnhas,
      });
      
      }
      } else {
       const yyu = returrrn - issss.totalIncome;
       if(yyu > 0){
       await levelStake.create({
         sender: wallet_address,
         receiver: getref.referrer,
         level: 1,
         amount: amti,
         income: yyu,
         percent: 5,
         income_type: "Referral Income",
         txHash : txnhas,
        });
        await registration.updateOne({ user : getref.referrer },{ $inc : { wallet_income : yyu, totalIncome : yyu } })
       } 
       await stake2.updateMany({ user : getref.referrer }, { $set : { roi_status : 1 } })
      }
   
     } else {
       console.log("something went wrong");
     }
  
   } catch (e) {
     console.log("Error (EvStake Event) :", e.message);
   }
})

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
  }
  return randomString;
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
  
  module.exports = router;
