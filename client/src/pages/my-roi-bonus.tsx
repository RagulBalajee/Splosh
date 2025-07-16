import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockData = [
  {
    stakingValue: 100,
    roiPerDay: 2.5,
    date: "2024-06-01 12:34:56"
  },
  {
    stakingValue: 250,
    roiPerDay: 6.25,
    date: "2024-06-02 15:20:10"
  },
  {
    stakingValue: 50,
    roiPerDay: 1.25,
    date: "2024-06-03 09:10:22"
  }
];

export default function MyROIBonus() {
  return (
    <div className="p-6">
      <Card className="rounded-2xl border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold">My ROI Bonus History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-2 px-4 text-left font-semibold">Staking Value (USDT)</th>
                  <th className="py-2 px-4 text-left font-semibold">Roi Per Day (USDT)</th>
                  <th className="py-2 px-4 text-left font-semibold">Date</th>
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
                      <td className="py-2 px-4">{row.stakingValue}</td>
                      <td className="py-2 px-4">{row.roiPerDay}</td>
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