# Web3 Staking Platform Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Database Models](#database-models)
6. [API Routes](#api-routes)
7. [Blockchain Integration](#blockchain-integration)
8. [Cron Jobs & Automation](#cron-jobs--automation)
9. [Authentication & Security](#authentication--security)
10. [Business Logic](#business-logic)
11. [Key Features](#key-features)
12. [Environment Configuration](#environment-configuration)
13. [Deployment](#deployment)

## Project Overview

This is a comprehensive Web3 staking platform built with Node.js, Express, and MongoDB. The platform integrates with blockchain networks to provide staking services, referral systems, ROI calculations, and automated reward distributions. The system supports multiple token types (USDT, DSC, stUSDT) and implements a sophisticated multi-level marketing (MLM) structure with various income streams.

### Core Functionality
- **Staking Management**: Users can stake different tokens with various ROI plans
- **Referral System**: Multi-level referral structure with commission distribution
- **ROI Calculation**: Automated daily ROI calculations and distributions
- **Withdrawal System**: Secure withdrawal processing with approval workflows
- **Admin Dashboard**: Comprehensive admin panel for platform management
- **Blockchain Integration**: Real-time blockchain event processing and synchronization

## Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Blockchain    │
│   (React/Vue)   │◄──►│   (Node.js)     │◄──►│   (Smart        │
│                 │    │                 │    │    Contracts)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   MongoDB       │
                       │   Database      │
                       └─────────────────┘
```

### System Components
1. **API Layer**: Express.js REST API with JWT authentication
2. **Database Layer**: MongoDB with Mongoose ODM
3. **Blockchain Layer**: Web3.js integration with smart contracts
4. **Automation Layer**: Cron jobs for scheduled tasks
5. **Security Layer**: JWT tokens, bcrypt hashing, input validation

## Technology Stack

### Backend
- **Runtime**: Node.js v20.9.0
- **Framework**: Express.js v4.17.1
- **Database**: MongoDB with Mongoose v8.2.1
- **Blockchain**: Web3.js v1.5.0, Ethers.js v5.7.2
- **Authentication**: JWT (jsonwebtoken v9.0.2), bcrypt v5.1.1
- **Scheduling**: node-cron v3.0.3
- **Logging**: Pino v8.18.0
- **Utilities**: moment-timezone v0.5.45, axios v1.6.6

### Security & Utilities
- **2FA**: speakeasy v2.0.0, qrcode v1.5.3
- **CORS**: cors v2.8.5
- **Environment**: dotenv v16.4.5

## Project Structure

```
server/
├── index.js                 # Main application entry point
├── router.js               # Main API routes
├── connection.js           # MongoDB connection setup
├── package.json           # Dependencies and scripts
├── .envold               # Environment variables template
├── .gitignore            # Git ignore rules
├── .htaccess             # Apache configuration
├── CronEvent.php         # PHP cron event handler
├── error_log.txt         # Error logging
├── index_dsc.js          # DSC-specific blockchain events
├── index_mysqli.js       # MySQL integration (legacy)
├── test.js               # Utility functions
├── Middleware/
│   └── jwtToken.js       # JWT authentication middleware
├── model/                # Database models
│   ├── admin_login.js    # Admin authentication model
│   ├── app.js           # Application configuration
│   ├── apprveWithdraw.js # Withdrawal approval model
│   ├── confiig.js       # System configuration
│   ├── dailyroi.js      # Daily ROI calculations
│   ├── levelReccur.js   # Level recurring income
│   ├── levelRecurrLapse.js # Level recurring lapse
│   ├── levelStake.js    # Level staking model
│   ├── openlevels.js    # Open levels model
│   ├── poolincometransfer.js # Pool income transfer
│   ├── recurrtransfer.js # Recurring transfer
│   ├── registration.js  # User registration model
│   ├── rewardtransfer.js # Reward transfer model
│   ├── signup.js        # User signup model
│   ├── stake.js         # Staking model
│   ├── stakedirects.js  # Direct staking model
│   ├── stakepool.js     # Staking pool model
│   ├── stakepoolincome.js # Pool income model
│   ├── stakeregister.js # Stake registration
│   ├── stakingReward.js # Staking rewards
│   ├── staking_plan.js  # Staking plans
│   ├── staking_usdt.js  # USDT staking
│   ├── tankwallettransfer.js # Tank wallet transfer
│   ├── topup.js         # Top-up model
│   ├── transfer.js      # Transfer model
│   └── withdraw.js      # Withdrawal model
└── routers/             # Route handlers
    ├── adminlogin.js    # Admin authentication routes
    ├── auth.js          # User authentication routes
    └── dashborad.js     # Dashboard routes
```

## Database Models

### Core Models

#### 1. Registration Model (`model/registration.js`)
**Purpose**: Stores user registration and profile information
```javascript
{
  userId: String,           // Unique user ID (DSC + 5 digits)
  uId: Number,             // Blockchain user ID
  user: String,            // Wallet address (unique)
  referrerId: String,      // Referrer's user ID
  rId: Number,             // Referrer's blockchain ID
  referrer: String,        // Referrer's wallet address
  capping: Number,         // User's capping limit
  directCount: Number,     // Number of direct referrals
  directStakeCount: Number, // Direct stake count
  directbusiness: Number,  // Direct business volume
  stakedirectbusiness: Number, // Stake direct business
  staketeambusiness: Number,   // Stake team business
  directplusteambiz: Number,   // Direct plus team business
  return: Number,          // Total return amount
  stake_amount: Number,    // Total staked amount
  topup_amount: Number,    // Total top-up amount
  totalIncome: Number,     // Total income earned
  totalWithdraw: Number,   // Total withdrawn amount
  referalIncome: Number,   // Referral income
  levelIncome: Number,     // Level income
  roiincome: Number,       // ROI income
  roilevelIncome: Number,  // ROI level income
  poolIncome: Number,      // Pool income
  rank: String,            // User rank
  ranknumber: Number,      // Rank number
  rankbonus: Number,       // Rank bonus
  poolbonus: Number,       // Pool bonus
  currentPool: Number,     // Current pool
  wallet_income: Number,   // Wallet income
  wallet_rewards: Number,  // Wallet rewards
  withdraw_status: Number, // Withdrawal status
  wallet_tank: Number,     // Tank wallet balance
  income_status: Boolean,  // Income status
  cal_status: Number,      // Calculation status
  teamBusinessnew: Number  // New team business
}
```

#### 2. Stake Model (`model/stake.js`)
**Purpose**: Records all staking transactions
```javascript
{
  user: String,            // User wallet address
  amount: Number,          // Staked amount
  perdayroi: Number,       // Daily ROI percentage
  permonthroi: Number,     // Monthly ROI percentage
  capping: Number,         // Capping limit
  cal_status: String,      // Calculation status
  calteam_status: String,  // Team calculation status
  level_update: String,    // Level update status
  regBy: String,          // Registration method
  roi_status: String,      // ROI status
  incomesent: Number,      // Income sent amount
  send_status: String,     // Send status
  first_stake: String,     // First stake flag
  txHash: String,         // Transaction hash
  block: String,          // Block number
  timestamp: String,      // Transaction timestamp
  createdAt: Date,        // Creation timestamp
  updatedAt: Date         // Update timestamp
}
```

#### 3. Withdrawal Model (`model/withdraw.js`)
**Purpose**: Manages withdrawal requests
```javascript
{
  user: String,            // User wallet address
  withdrawAmount: Number,  // Withdrawal amount
  amount: Number,          // Original amount
  deduct_amount: Number,   // Deducted amount
  price: Number,           // Token price
  isapprove: Boolean,      // Approval status
  isreject: Boolean,       // Rejection status
  trxnHash: String,        // Transaction hash
  createdAt: Date,         // Creation timestamp
  timestamp: Date          // Transaction timestamp
}
```

#### 4. Daily ROI Model (`model/dailyroi.js`)
**Purpose**: Tracks daily ROI calculations
```javascript
{
  stakeid: String,         // Stake ID
  user: String,            // User wallet address
  income: Number,          // Daily income
  amount: Number,          // Stake amount
  income_status: String,   // Income status (Credit/Lapse)
  totalIncome: String,     // Total income
  capping: String,         // Capping limit
  level_status: String,    // Level status
  send_status: String,     // Send status
  first_stake: String,     // First stake flag
  txHash: String,          // Transaction hash
  insertedAt: Date,        // Insert timestamp
  createdAt: Date          // Creation timestamp
}
```

#### 5. Level Stake Model (`model/levelStake.js`)
**Purpose**: Manages multi-level referral income
```javascript
{
  sender: String,          // Sender wallet address
  receiver: String,        // Receiver wallet address
  level: Number,           // Level number (1-10)
  amount: Number,          // Transaction amount
  income: Number,          // Level income
  percent: Number,         // Commission percentage
  income_type: String,     // Income type
  income_status: String,   // Income status
  txHash: String,          // Transaction hash
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Update timestamp
}
```

#### 6. Top-up Model (`model/topup.js`)
**Purpose**: Records top-up transactions
```javascript
{
  user: String,            // User wallet address
  amount: Number,          // Top-up amount
  plan: String,            // Plan type
  protocol: String,        // Protocol type
  calteam_status: String,  // Team calculation status
  cal_status: String,      // Calculation status
  perdayroi: Number,       // Daily ROI
  txHash: String,          // Transaction hash
  block: String,           // Block number
  timestamp: String,       // Transaction timestamp
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Update timestamp
}
```

### Supporting Models

#### Admin Models
- **Admin Login** (`model/admin_login.js`): Admin authentication
- **App Configuration** (`model/app.js`): Application settings
- **Approve Withdraw** (`model/apprveWithdraw.js`): Withdrawal approvals

#### Income Models
- **Level Recurring** (`model/levelReccur.js`): Recurring level income
- **Level Recurring Lapse** (`model/levelRecurrLapse.js`): Lapsed recurring income
- **Pool Income Transfer** (`model/poolincometransfer.js`): Pool income transfers
- **Recurring Transfer** (`model/recurrtransfer.js`): Recurring transfers
- **Reward Transfer** (`model/rewardtransfer.js`): Reward transfers
- **Staking Reward** (`model/stakingReward.js`): Staking rewards
- **Tank Wallet Transfer** (`model/tankwallettransfer.js`): Tank wallet transfers

#### Staking Models
- **Stake Directs** (`model/stakedirects.js`): Direct staking
- **Stake Pool** (`model/stakepool.js`): Staking pools
- **Stake Pool Income** (`model/stakepoolincome.js`): Pool income
- **Stake Register** (`model/stakeregister.js`): Stake registration
- **Staking Plan** (`model/staking_plan.js`): Staking plans
- **Staking USDT** (`model/staking_usdt.js`): USDT staking

## API Routes

### Main Router (`router.js`)

#### Staking Plans
- `GET /api/staking-plans`: Get available staking plans with protocol statistics

#### Data Retrieval
- `GET /api/data`: Get all users data
- `GET /api/check`: Check system status

### Authentication Router (`routers/auth.js`)

#### Deposit Management
- `GET /api/deposite`: Get deposit history with pagination and search
- `GET /api/withdraw-referal`: Get referral withdrawal requests

#### User Management
- `GET /api/users`: Get user list with pagination
- `GET /api/user/:address`: Get specific user details
- `POST /api/update-user`: Update user information

#### Income Management
- `GET /api/level-income`: Get level income data
- `GET /api/roi-income`: Get ROI income data
- `GET /api/pool-income`: Get pool income data

#### Withdrawal Management
- `GET /api/withdrawals`: Get withdrawal requests
- `POST /api/approve-withdrawal`: Approve withdrawal
- `POST /api/reject-withdrawal`: Reject withdrawal

### Admin Router (`routers/adminlogin.js`)

#### Authentication
- `POST /api/admin-login`: Admin login with JWT
- `POST /api/generate-secret`: Generate 2FA secret
- `POST /api/verify-token`: Verify 2FA token

### Dashboard Router (`routers/dashborad.js`)

#### Analytics
- `GET /api/dashborad`: Get dashboard statistics
- `GET /api/graph-data`: Get graph data for charts

## Blockchain Integration

### Smart Contract Integration

#### Contract ABI
The system integrates with multiple smart contracts:
- **SPLOSH Stake Contract**: Main staking contract
- **DSC Stake Contract**: DSC token staking
- **USDT Contract**: USDT token operations

#### Event Processing
```javascript
// Main event processing function
async function processEvents(events) {
  for (let event of events) {
    const { blockNumber, transactionHash, returnValues, event: eventName } = event;
    
    switch(eventName) {
      case "Registration":
        await processRegistration(returnValues, transactionHash, blockNumber);
        break;
      case "NewDeposit":
        await processNewDeposit(returnValues, transactionHash, blockNumber);
        break;
      case "LevelIncome":
        await processLevelIncome(returnValues, transactionHash, blockNumber);
        break;
      // ... other events
    }
  }
}
```

#### Supported Events
1. **Registration**: User registration events
2. **NewDeposit**: New staking deposit events
3. **LevelIncome**: Level income distribution events
4. **TokenSell**: Token selling events
5. **WithdrawToken**: Token withdrawal events
6. **ReActive**: Reactivation events
7. **MemberPayment**: Member payment events
8. **SellAUSD**: AUSD selling events
9. **BuyAUSD**: AUSD buying events

### Web3 Configuration
```javascript
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC_URL, {
    reconnect: {
      auto: true,
      delay: 5000,
      maxAttempts: 15,
      onTimeout: false,
    },
  })
);
```

## Cron Jobs & Automation

### Scheduled Tasks

#### 1. Team Business Calculation (`*/5 * * * *`)
```javascript
cron.schedule('*/5 * * * *', async () => {
  setTeamBusiness();
  console.log('Setting last Withdrawal');
});
```
**Purpose**: Updates team business calculations every 5 minutes

#### 2. Level ROI Processing (`*/20 * * * *`)
```javascript
cron.schedule('*/20 * * * *', async () => {
  levelOnRoinew();
});
```
**Purpose**: Processes level ROI calculations every 20 minutes

#### 3. Rank Rewards (`*/2 * * * *`)
```javascript
cron.schedule('*/2 * * * *', async () => {
  sendRankReward();
});
```
**Purpose**: Distributes rank rewards every 2 minutes

#### 4. Daily ROI Wallet (`0 1 * * *`)
```javascript
cron.schedule("0 1 * * *", () => {
  roiwallet();
}, {
  scheduled: true,
  timezone: "Asia/Kolkata",
});
```
**Purpose**: Processes daily ROI wallet calculations at 1:00 AM IST

### Event Processing
```javascript
// Continuous blockchain event processing
async function listEvent() {
  let lastSyncBlock = await getLastSyncBlock();
  let latestBlock = await web3.eth.getBlockNumber();
  let toBlock = latestBlock > lastSyncBlock + 300 ? lastSyncBlock + 300 : latestBlock;
  
  let events = await getEventReciept(lastSyncBlock, toBlock);
  await processEvents(events);
  await updateBlock(toBlock);
  
  if (lastSyncBlock == toBlock) {
    setTimeout(listEvent, 15000);
  } else {
    setTimeout(listEvent, 5000);
  }
}
```

## Authentication & Security

### JWT Authentication
```javascript
const verifyToken = async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      const token = req.headers["authorization"].split(" ")[1];
      const jwtkey = process.env.JWT;
      
      jwt.verify(token, jwtkey, (err) => {
        if (err) {
          return res.json({
            status: 404,
            error: true,
            message: err.name === "TokenExpiredError" ? "Token expired" : "Invalid Token",
          });
        }
        next();
      });
    }
  } catch (error) {
    return res.json({
      status: 404,
      message: "Invalid token",
      error,
    });
  }
};
```

### Admin Authentication
- **bcrypt**: Password hashing
- **JWT**: Token-based authentication
- **2FA**: Two-factor authentication with speakeasy and qrcode

### Security Features
1. **CORS Configuration**: Configurable CORS settings
2. **Input Validation**: Request parameter validation
3. **Error Handling**: Comprehensive error handling
4. **Rate Limiting**: Built-in rate limiting
5. **SQL Injection Prevention**: Parameterized queries

## Business Logic

### Staking System

#### ROI Calculation
```javascript
async function planData(ratio, amount, curr) {
  const perdayroi = (amount * ratio) / 100;
  const permonthroi = perdayroi * 30;
  
  return {
    perdayroi,
    permonthroi,
    ratio,
    amount,
    currency: curr
  };
}
```

#### Multi-Level Marketing (MLM)
```javascript
async function levelIncome() {
  // Level 1: 30% commission
  // Level 2: 20% commission
  // Level 3: 10% commission
  // ... up to Level 10
}
```

### Referral System

#### Direct Referrals
- **Level 1**: 30% commission on direct referrals
- **Level 2**: 20% commission on second level
- **Level 3**: 10% commission on third level
- **Levels 4-10**: Decreasing commission rates

#### Team Business
```javascript
async function setTeamBusiness() {
  // Calculate team business for all users
  // Update team business in registration table
  // Trigger rank calculations
}
```

### Withdrawal System

#### Withdrawal Process
1. **Request**: User submits withdrawal request
2. **Validation**: System validates request
3. **Approval**: Admin approves/rejects request
4. **Processing**: System processes approved withdrawals
5. **Confirmation**: Transaction confirmation

#### Withdrawal Types
- **Referral Income**: Direct referral earnings
- **Level Income**: Multi-level commission
- **ROI Income**: Return on investment
- **Pool Income**: Pool rewards
- **Rank Bonus**: Rank-based bonuses

### Rank System

#### Rank Criteria
1. **Team Size**: Number of direct and indirect referrals
2. **Business Volume**: Total team business
3. **Personal Investment**: Personal staking amount
4. **Time Period**: Minimum time requirements

#### Rank Benefits
- **Commission Bonuses**: Higher commission rates
- **Pool Rewards**: Access to pool rewards
- **Special Privileges**: Additional platform benefits

## Key Features

### 1. Multi-Token Support
- **USDT**: Stablecoin staking
- **DSC**: Platform token
- **stUSDT**: Staked USDT
- **WYZ**: Platform utility token

### 2. Flexible Staking Plans
- **Plan 10**: 10% ROI with 90% USDT, 10% WYZ
- **Plan 20**: 20% ROI with 80% USDT, 20% WYZ
- **Plan 30**: 30% ROI with 70% USDT, 30% WYZ
- **Plan 40**: 40% ROI with 60% USDT, 40% WYZ
- **Plan 50**: 50% ROI with 50% USDT, 50% WYZ

### 3. Advanced ROI System
- **Daily Calculations**: Automated daily ROI processing
- **Capping Limits**: Maximum earning limits
- **Compound Interest**: Reinvestment options
- **Withdrawal Flexibility**: Multiple withdrawal options

### 4. Comprehensive Admin Panel
- **User Management**: Complete user administration
- **Transaction Monitoring**: Real-time transaction tracking
- **Analytics Dashboard**: Detailed platform analytics
- **Withdrawal Management**: Approval/rejection system

### 5. Real-Time Blockchain Integration
- **Event Monitoring**: Continuous blockchain event processing
- **Transaction Verification**: Real-time transaction verification
- **Smart Contract Interaction**: Direct smart contract calls
- **Gas Optimization**: Efficient gas usage

## Environment Configuration

### Required Environment Variables
```bash
# Database Configuration
MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
MONGODB_HOST=your_mongodb_host
MONGODB_DB=your_database_name

# Blockchain Configuration
RPC_URL=your_blockchain_rpc_url
SPLOSH_STAKE_CONTRACT=your_staking_contract_address
DSC_STAKE_CONTRACT=your_dsc_contract_address

# Security
JWT=your_jwt_secret_key

# Environment
NODE_ENV=production
```

### Configuration Files
- **.envold**: Environment variables template
- **connection.js**: Database connection configuration
- **model/confiig.js**: System configuration model

## Deployment

### Prerequisites
1. **Node.js**: Version 20.9.0 or higher
2. **MongoDB**: MongoDB database setup
3. **Blockchain Node**: Access to blockchain RPC endpoint
4. **Environment Variables**: Properly configured environment variables

### Installation Steps
```bash
# 1. Clone the repository
git clone <repository-url>
cd server

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .envold .env
# Edit .env with your configuration

# 4. Start the application
npm start
```

### Production Deployment
```bash
# Using PM2 for production
npm install -g pm2
pm2 start index.js --name "staking-platform"

# Using Docker
docker build -t staking-platform .
docker run -p 8080:8080 staking-platform
```

### Monitoring & Logging
- **Pino Logger**: Structured logging
- **Error Tracking**: Comprehensive error logging
- **Performance Monitoring**: Request/response monitoring
- **Health Checks**: System health monitoring

### Backup & Recovery
- **Database Backups**: Regular MongoDB backups
- **Configuration Backups**: Environment and config backups
- **Disaster Recovery**: Recovery procedures documentation

## Conclusion

This Web3 staking platform represents a sophisticated blockchain-based financial application with comprehensive features for staking, referral systems, and automated income distribution. The system's architecture ensures scalability, security, and reliability while providing a rich set of features for both users and administrators.

The platform successfully integrates traditional web technologies with blockchain infrastructure, creating a robust foundation for decentralized financial services. The modular design allows for easy maintenance and future enhancements while maintaining high performance and security standards. 