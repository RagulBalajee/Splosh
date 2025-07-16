import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockData = [
  {
    hash: "0x1234...abcd",
    value: 100,
    date: "2024-06-01 12:34:56"
  },
  {
    hash: "0x5678...efgh",
    value: 250,
    date: "2024-06-02 15:20:10"
  },
  {
    hash: "0x9abc...ijkl",
    value: 50,
    date: "2024-06-03 09:10:22"
  }
];

export default function MyInvestments() {
  return (
    <div className="p-6">
      <Card className="rounded-2xl border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold">My Staking History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-2 px-4 text-left font-semibold">Txn Hash</th>
                  <th className="py-2 px-4 text-left font-semibold">Staking Value (USDT)</th>
                  <th className="py-2 px-4 text-left font-semibold">Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {mockData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 font-semibold text-muted-foreground">No Data Found.</td>
                  </tr>
                ) : (
                  mockData.map((row, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="py-2 px-4 font-mono">{row.hash}</td>
                      <td className="py-2 px-4">{row.value}</td>
                      <td className="py-2 px-4">{row.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 