import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockData: { amount: number; rank: string; date: string }[] = [
  { amount: 100, rank: "Gold", date: "2024-06-01" },
  { amount: 50, rank: "Silver", date: "2024-05-15" },
  { amount: 25, rank: "Bronze", date: "2024-05-01" },
];

export default function MyRewardsIncome() {
  return (
    <div className="p-6">
      <Card className="rounded-2xl border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold">My Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-2 px-4 text-left font-semibold">Reward Amount</th>
                  <th className="py-2 px-4 text-left font-semibold">Rank</th>
                  <th className="py-2 px-4 text-left font-semibold">Reward On</th>
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
                      <td className="py-2 px-4">{row.amount}</td>
                      <td className="py-2 px-4">{row.rank}</td>
                      <td className="py-2 px-4">{row.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination placeholder */}
          <div className="flex justify-between items-center mt-4">
            <button className="px-2 py-1 rounded bg-muted text-muted-foreground" disabled>{'<'}</button>
            <button className="px-2 py-1 rounded bg-muted text-muted-foreground" disabled>{'>'}</button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 