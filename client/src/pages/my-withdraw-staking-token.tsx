import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockData: { txHash: string; amount: number; date: string }[] = [
  { txHash: "0xaaa111", amount: 300, date: "2024-06-12" },
  { txHash: "0xbbb222", amount: 250, date: "2024-06-08" },
  { txHash: "0xccc333", amount: 200, date: "2024-06-03" },
];

export default function MyWithdrawStakingToken() {
  return (
    <div className="p-6">
      <Card className="rounded-2xl border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold">WithDraw Staked Token</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-2 px-4 text-left font-semibold">TxHash</th>
                  <th className="py-2 px-4 text-left font-semibold">Amount</th>
                  <th className="py-2 px-4 text-left font-semibold">Withdraw Date</th>
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
                      <td className="py-2 px-4">{row.txHash}</td>
                      <td className="py-2 px-4">{row.amount}</td>
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