import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockData = [
  {
    hash: "0x1234...abcd",
    sender: "0xaaaa...1111",
    userId: "1001",
    level: 1,
    totalAmount: 50,
    netPayable: 45,
    date: "2024-06-01 12:34:56"
  },
  {
    hash: "0x5678...efgh",
    sender: "0xbbbb...2222",
    userId: "1002",
    level: 2,
    totalAmount: 100,
    netPayable: 90,
    date: "2024-06-02 15:20:10"
  },
  {
    hash: "0x9abc...ijkl",
    sender: "0xcccc...3333",
    userId: "1003",
    level: 1,
    totalAmount: 25,
    netPayable: 22.5,
    date: "2024-06-03 09:10:22"
  }
];

export default function MyReferralBonus() {
  return (
    <div className="p-6">
      <Card className="rounded-2xl border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Referral Bonus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-2 px-4 text-left font-semibold">Txn Hash</th>
                  <th className="py-2 px-4 text-left font-semibold">Sender</th>
                  <th className="py-2 px-4 text-left font-semibold">User Id</th>
                  <th className="py-2 px-4 text-left font-semibold">Level</th>
                  <th className="py-2 px-4 text-left font-semibold">Total Amount($)</th>
                  <th className="py-2 px-4 text-left font-semibold">Net Payable Amount ($)</th>
                  <th className="py-2 px-4 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 font-semibold text-muted-foreground">No Data Found.</td>
                  </tr>
                ) : (
                  mockData.map((row, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="py-2 px-4 font-mono">{row.hash}</td>
                      <td className="py-2 px-4 font-mono">{row.sender}</td>
                      <td className="py-2 px-4">{row.userId}</td>
                      <td className="py-2 px-4">{row.level}</td>
                      <td className="py-2 px-4">{row.totalAmount}</td>
                      <td className="py-2 px-4">{row.netPayable}</td>
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