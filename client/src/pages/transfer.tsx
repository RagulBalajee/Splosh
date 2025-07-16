import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const mockData = [
  {
    amount: 100,
    userId: "1001",
    type: "Stake",
    date: "2024-06-01 12:34:56"
  },
  {
    amount: 250,
    userId: "1002",
    type: "Reward",
    date: "2024-06-02 15:20:10"
  },
  {
    amount: 50,
    userId: "1003",
    type: "Stake",
    date: "2024-06-03 09:10:22"
  }
];

export default function Transfer() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="p-6">
      <Card className="rounded-2xl border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Transfer Staking Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="mb-8">
            <div className="mb-4">
              <label className="block mb-1 text-base font-medium text-muted-foreground">Recipient User ID</label>
              <Input
                className="bg-background border-border/30"
                placeholder="Enter User ID"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-base font-medium text-muted-foreground">Amount</label>
              <Input
                className="bg-background border-border/30"
                placeholder="Enter Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <Button type="button" className="mt-2 w-32">Transfer</Button>
          </form>

          <div className="mb-2 text-xl font-bold text-muted-foreground">Transfer History</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-2 px-4 text-left font-semibold">Amount</th>
                  <th className="py-2 px-4 text-left font-semibold">Userid</th>
                  <th className="py-2 px-4 text-left font-semibold">Type</th>
                  <th className="py-2 px-4 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 font-semibold text-muted-foreground">No Data Found.</td>
                  </tr>
                ) : (
                  mockData.map((row, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="py-2 px-4">{row.amount}</td>
                      <td className="py-2 px-4">{row.userId}</td>
                      <td className="py-2 px-4">{row.type}</td>
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