import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Users,
  Calendar,
  Award,
  BarChart2,
  DollarSign,
  TrendingUp,
  HandCoins,
  ArrowDownCircle,
  ArrowUpCircle,
  Copy,
  Coins,
  Layers,
  Swords,
  Activity,
  Gift,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function DashboardHome() {
  return (
    <>
      {/* Top 10 Pool Winners Banner */}
      <Card className="overflow-hidden mb-4">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-stretch w-full bg-background">
            {/* Left: Winners List */}
            <div className="flex-1 flex flex-col justify-center p-4 md:p-6">
              <div className="text-lg md:text-xl font-bold text-primary mb-2">TOP 10 POOL WINNERS</div>
              <ul className="text-xs md:text-sm font-mono space-y-1">
                <li>0X2FEF6792...62FCB55C</li>
                <li>0X9CEFF2F5...02A1810F2</li>
                <li>0XECCBAF46...CE574087F</li>
                <li>0XAA30107A...392944A8F</li>
                <li>0X1E82AD8A...E77B21201</li>
                <li>0XE3EB2C7...570764D77</li>
                <li>0X9B0828C...F9467D8B7</li>
                <li>0X5B41EEDC...FE05430FF</li>
                <li>0X552035B...5DFF69FAA</li>
                <li>0X26AF8E68...E44335C1F</li>
              </ul>
            </div>
            {/* Center: Trophy (use Lucide Award icon as placeholder) */}
            <div className="hidden md:flex flex-col justify-center items-center px-4">
              <Award className="w-16 h-16 text-yellow-500" />
            </div>
            {/* Right: Message and Stats */}
            <div className="flex-1 flex flex-col justify-center p-4 md:p-6 border-t md:border-t-0 md:border-l border-border">
              <div className="text-xs md:text-sm text-yellow-600 font-semibold mb-2">"CONGRATS TO ALL OUR POOL WINNERS! YOUR SKILLS ABSOLUTELY LIT UP THE TABLE! SEE YOU NEXT TIME FOR MORE EPIC SHOTS!"</div>
              <div className="text-sm font-bold mb-1">CONGRATS TO OUR TOTAL.</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-yellow-500">74</span>
                <span className="text-xs font-semibold">POOL WINNERS</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main 2-column layout */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Capping bar + Bento grid */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Capping 2x Bar */}
          <Card>
            <CardContent className="py-2">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span>Capping 2x</span>
                  <span>0%</span>
                </div>
                <Slider defaultValue={[1]} max={100} step={1} className="z-50" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0.00</span>
                  <span>$0.00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grouped Bento Grid */}
          <div className="grid grid-cols-1 gap-4">
            {/* Card 1: User Info */}
            <Card>
              <CardContent className="flex items-center gap-4 py-3">
                <User className="w-8 h-8 text-primary shrink-0" />
                <div className="flex flex-col gap-1 text-xs">
                  <div>
                    <span className="font-semibold">User ID: </span>
                    <span className="font-bold text-sm">123456</span>
                  </div>
                  <div>
                    <span className="font-semibold">Sponsor ID: </span>
                    <span className="font-bold text-sm">654321</span>
                  </div>
                  <div>
                    <span className="font-semibold">Joining: </span>
                    <span className="font-bold text-sm">09-07-2025 17:01:09</span>
                  </div>
                  <div>
                    <span className="font-semibold">Rank: </span>
                    <span className="font-bold text-sm">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Card 2: Team Info */}
            <Card>
              <CardContent className="flex items-center gap-4 py-3">
                <Users className="w-8 h-8 text-primary shrink-0" />
                <div className="flex flex-col gap-1 text-xs">
                  <div>
                    <span className="font-semibold">My Total Team: </span>
                    <span className="font-bold text-sm">0</span>
                  </div>
                  <div>
                    <span className="font-semibold">My Total Team Business (USDT): </span>
                    <span className="font-bold text-sm">0</span>
                  </div>
                  <div>
                    <span className="font-semibold">My Directs: </span>
                    <span className="font-bold text-sm">0</span>
                  </div>
                  <div>
                    <span className="font-semibold">Directs Business (USDT): </span>
                    <span className="font-bold text-sm">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Card 3: Bonuses */}
            <Card>
              <CardContent className="flex items-center gap-4 py-3">
                <Gift className="w-8 h-8 text-primary shrink-0" />
                <div className="flex flex-col gap-1 text-xs">
                  <div>
                    <span className="font-semibold">My Referral Bonus (USDT): </span>
                    <span className="font-bold text-sm">0</span>
                  </div>
                  <div>
                    <span className="font-semibold">My Level Bonus (USDT): </span>
                    <span className="font-bold text-sm">0</span>
                  </div>
                  <div>
                    <span className="font-semibold">My Staking Bonus: </span>
                    <span className="font-bold text-sm">0 USDT</span>
                  </div>
                  <div>
                    <span className="font-semibold">My Reward Bonus: </span>
                    <span className="font-bold text-sm">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Card 4: Staking & Income */}
            <Card>
              <CardContent className="flex items-center gap-4 py-3">
                <Coins className="w-8 h-8 text-primary shrink-0" />
                <div className="flex flex-col gap-1 text-xs">
                  <div>
                    <span className="font-semibold">My Staking (USDT): </span>
                    <span className="font-bold text-sm">0</span>
                  </div>
                  <div>
                    <span className="font-semibold">Withdrawable Income (Remaining): </span>
                    <span className="font-bold text-sm">0 USDT</span>
                  </div>
                  <div>
                    <span className="font-semibold">Withdraw Income (Paid): </span>
                    <span className="font-bold text-sm">0 USDT</span>
                  </div>
                  <div>
                    <span className="font-semibold">Total Income: </span>
                    <span className="font-bold text-sm">0 USDT</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right: Token Staking/Claim + Referral ID */}
        <div className="flex-1 flex flex-col gap-4 mt-4 md:mt-0">
          {/* Token Staking/Claim Panel */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Token</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="default">ACTIVATE</Button>
                <Button size="sm" variant="outline">CLAIM</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex flex-col gap-2 flex-1">
                  <div className="text-xs font-semibold">USDT</div>
                  <div className="text-xs font-semibold">Select Your Package</div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">$50-$100</Button>
                    <input type="number" value="50" readOnly className="border rounded px-2 py-1 text-xs w-20 bg-muted" />
                  </div>
                </div>
                <Button className="w-full md:w-auto" size="sm">BUY</Button>
              </div>
            </CardContent>
          </Card>
          {/* Referral ID */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Referral Id</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 items-center">
                <input type="text" value="https://splosh.app/register?user_id=undx" readOnly className="border rounded px-2 py-1 text-xs flex-1 bg-muted" />
                <Button size="sm" variant="outline">
                  <Copy className="w-4 h-4 mr-1" />Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* End Panels */}
    </>
  );
} 