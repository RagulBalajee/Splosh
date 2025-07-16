const express = require("express");
const router = express.Router();
const stakeRegister = require("../model/stakeregister");
const registration = require("../model/registration");

const stake2 = require("../model/stake");
const moment = require("moment-timezone");
const WithdrawalModel = require("../model/withdraw");
const topup2 = require("../model/topup");
const { verifyToken } = require("../Middleware/jwtToken");
const recurrtransfer = require("../model/recurrtransfer");
const { compareSync } = require("bcrypt");

router.get("/dashborad", verifyToken, async (req, res) => {
  try {
    const startOfToday = moment.tz("Asia/Kolkata").startOf("day").toDate();
    const endOfToday = moment.tz("Asia/Kolkata").endOf("day").toDate();
    
    console.log(startOfToday, ":::", endOfToday); // Log dates to verify

    // Count total users
    const totaluser = await registration.find({user: {
      $nin: [
          "0xd4CbB7C47F325d642C1F097787A8b1982eB7e48C",
          "0x71dFd92C06a4d3710C87e1B1e6898D452C9c0542" 
      ]
  }}).countDocuments();

    // Count active users (users with stake_amount greater than 0)
    const activeUser = await registration
      .find({ stake_amount: { $gt: 0 },user: {
        $nin: [
            "0xd4CbB7C47F325d642C1F097787A8b1982eB7e48C",
            "0x71dFd92C06a4d3710C87e1B1e6898D452C9c0542" 
        ]
    } })
      .countDocuments();

    // Count inactive users (users with stake_amount equal to 0)
    const inactiveUser = await registration
      .find({ stake_amount: 0,user: {
        $nin: [
            "0xd4CbB7C47F325d642C1F097787A8b1982eB7e48C",
            "0x71dFd92C06a4d3710C87e1B1e6898D452C9c0542" 
        ]
    } })
      .countDocuments();

    // Aggregate all-time total amount staked
    const allTimeTotalStake = await stake2.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    // Aggregate today's total amount staked
    const todayTotalStake = await stake2.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfToday,
            $lt: endOfToday
          }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    // Extract amounts from aggregation results
    const allTimeAmount = allTimeTotalStake.length > 0 ? allTimeTotalStake[0].totalAmount : 0;
    const todayAmount = todayTotalStake.length > 0 ? todayTotalStake[0].totalAmount : 0;

    // Respond with the collected data
    return res.json({
      totaluser,
      activeUser,
      inactiveUser,
      allTimeAmount,
      todayAmount
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/graph-data", verifyToken, async (req, res) => {
  try {
    const todayKolkata = moment.tz("Asia/Kolkata").startOf("day");
    const sevenDaysAgoKolkata = todayKolkata.clone().subtract(6, "days");

    async function fetchDataForDay(dayIndex) {
      const startOfDayKolkata = sevenDaysAgoKolkata
        .clone()
        .add(dayIndex, "days");
      const endOfDayKolkata = startOfDayKolkata
        .clone()
        .add(1, "days")
        .subtract(1, "milliseconds");

      const [stakes, withdraw, topups] = await Promise.all([
        stake2.find({
          createdAt: {
            $gte: startOfDayKolkata.toDate(),
            $lt: endOfDayKolkata.toDate(),
          },
        }),
        WithdrawalModel.find({
          timestamp: {
            $gte: startOfDayKolkata.toDate(),
            $lt: endOfDayKolkata.toDate(),
          },
        }),
        topup2.find({
          createdAt: {
            $gte: startOfDayKolkata.toDate(),
            $lt: endOfDayKolkata.toDate(),
          },
        }),
      ]);

      const filteredStakes = stakes.filter((stake) => {
        const condition1 = stake.ratio == "10" && stake.token == "WYZ-stUSDT";
        const condition2 = stake.ratio == "20" && stake.token == "WYZ-stUSDT";
        const condition3 = stake.ratio == "30" && stake.token == "WYZ-stUSDT";
        const condition4 = stake.ratio == "40" && stake.token == "WYZ-stUSDT";
        const condition5 = stake.ratio == "50" && stake.token == "WYZ-stUSDT";
        const condition6 = stake.ratio == "15" && stake.token == "sUSDT-stUSDT";
        const condition7 = stake.ratio == "20" && stake.token == "sUSDT-stUSDT";
        const condition8 = stake.ratio == "25" && stake.token == "sUSDT-stUSDT";
        return (
          condition1 ||
          condition2 ||
          condition3 ||
          condition4 ||
          condition5 ||
          condition6 ||
          condition7 ||
          condition8
        );
      });

      const total = filteredStakes.reduce(
        (acc, stake) => acc + stake.amount,
        0
      );

      const wyz = filteredStakes.reduce((acc, stake) => {
        if (stake.ratio == "10") return acc + (stake.amount * 0.1) / 20;
        if (stake.ratio == "20") return acc + (stake.amount * 0.2) / 20;
        if (stake.ratio == "30") return acc + (stake.amount * 0.3) / 20;
        if (stake.ratio == "40") return acc + (stake.amount * 0.4) / 20;
        if (stake.ratio == "50") return acc + (stake.amount * 0.5) / 20;
        if (stake.ratio == "15" && stake.token == "sUSDT-stUSDT")
          return acc + (stake.amount * 0.15) / 20;
        if (stake.ratio == "20" && stake.token == "sUSDT-stUSDT")
          return acc + (stake.amount * 0.2) / 20;
        if (stake.ratio == "25" && stake.token == "sUSDT-stUSDT")
          return acc + (stake.amount * 0.25) / 20;
        return acc;
      }, 0);
      const transformedAmount = filteredStakes.reduce((acc, stake) => {
        if (stake.ratio == "10") return acc + stake.amount * 0.9;
        if (stake.ratio == "20") return acc + stake.amount * 0.8;
        if (stake.ratio == "30") return acc + stake.amount * 0.7;
        if (stake.ratio == "40") return acc + stake.amount * 0.6;
        if (stake.ratio == "50") return acc + stake.amount * 0.5;
        if (stake.ratio == "15" && stake.token == "sUSDT-stUSDT")
          return acc + stake.amount * 0.85;
        if (stake.ratio == "20" && stake.token == "sUSDT-stUSDT")
          return acc + stake.amount * 0.8;
        if (stake.ratio == "25" && stake.token == "sUSDT-stUSDT")
          return acc + stake.amount * 0.75;
        return acc;
      }, 0);

      const stakeusdt = stakes.filter((stake) => {
        const usdt1 = stake.ratio == "15" && stake.token == "sUSDT-stUSDT";
        const usdt2 = stake.ratio == "20" && stake.token == "sUSDT-stUSDT";
        const usdt3 = stake.ratio == "25" && stake.token == "sUSDT-stUSDT";

        return usdt1 || usdt2 || usdt3;
      });

      const totalusdt = stakeusdt.reduce((acc, stake) => {
        if (stake.ratio == "15" && stake.token == "sUSDT-stUSDT")
          return acc + stake.amount * 0.85;
        if (stake.ratio == "20" && stake.token == "sUSDT-stUSDT")
          return acc + stake.amount * 0.8;
        if (stake.ratio == "25" && stake.token == "sUSDT-stUSDT")
          return acc + stake.amount * 0.75;
        return acc;
      }, 0);

      const roiWithdraw = withdraw
        .filter(
          (withdrawroi) =>
            withdrawroi.wallet_type == "roi" && withdrawroi.isapprove == true
        )
        .reduce((acc, withdrawroi) => acc + withdrawroi.withdrawAmount, 0);

      const referralWithdraw = withdraw
        .filter(
          (withdrawreferral) =>
            withdrawreferral.wallet_type == "referral" &&
            withdrawreferral.isapprove == true
        )
        .reduce(
          (acc, withdrawreferral) => acc + withdrawreferral.withdrawAmount,
          0
        );

      const topupdata = topups.reduce((acc, data) => {
        const amount = parseFloat(data.amount);
        return acc + amount;
      }, 0);

      return {
        day: startOfDayKolkata.format("dddd"),
        stakewyz: parseFloat(wyz),
        stakestusdt: parseFloat(transformedAmount),
        total: parseFloat(total),
        topus: parseFloat(topupdata),
        stakeusdt: parseFloat(totalusdt),
        roi: parseFloat(roiWithdraw),
        referral: parseFloat(referralWithdraw),
      };
    }

    const results = await Promise.all(
      Array.from({ length: 7 }).map((_, index) => fetchDataForDay(index))
    );

    const Stakeswyz = {};
    const Stakestusdt = {};
    const Stakeusdt = {};
    const Totalamount = {};
    const Topusdata = {};
    const withdrawRoi = {};
    const refrealWithdraw = {};

    results.forEach(
      ({
        day,
        stakewyz,
        stakestusdt,
        stakeusdt,
        roi,
        referral,
        topus,
        total,
      }) => {
        Stakeswyz[day] = stakewyz;
        Stakestusdt[day] = stakestusdt;
        Stakeusdt[day] = stakeusdt;
        Totalamount[day] = total;
        Topusdata[day] = topus;
        withdrawRoi[day] = roi;
        refrealWithdraw[day] = referral;
      }
    );

    return res.json({
      status: 200,
      error: false,
      Stakeswyz,
      Stakestusdt,
      Stakeusdt,
      Totalamount,
      Topusdata,
      withdrawRoi,
      refrealWithdraw,
    });
  } catch (error) {
    console.error("Error calculating data:", error);
    return res.status(500).json({
      status: 500,
      error: true,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
