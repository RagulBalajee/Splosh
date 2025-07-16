import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockData = [
  {
    address: "0x1234...abcd",
    userId: "1001",
    investment: 200,
    directBusiness: 150,
    teamBusiness: 500,
    joined: "2024-06-01 12:34:56"
  },
  {
    address: "0x5678...efgh",
    userId: "1002",
    investment: 300,
    directBusiness: 200,
    teamBusiness: 700,
    joined: "2024-06-02 15:20:10"
  },
  {
    address: "0x9abc...ijkl",
    userId: "1003",
    investment: 100,
    directBusiness: 80,
    teamBusiness: 250,
    joined: "2024-06-03 09:10:22"
  }
];

export default function MyDirects() {
  return (
    <div className="p-6">
      <Card className="rounded-2xl border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold">My Direct List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-2 px-4 text-left font-semibold">User Address</th>
                  <th className="py-2 px-4 text-left font-semibold">User Id</th>
                  <th className="py-2 px-4 text-left font-semibold">Total Investment (USDT)</th>
                  <th className="py-2 px-4 text-left font-semibold">Total Direct Business (USDT)</th>
                  <th className="py-2 px-4 text-left font-semibold">Total Team Business (USDT)</th>
                  <th className="py-2 px-4 text-left font-semibold">Joined On</th>
                </tr>
              </thead>
              <tbody>
                {mockData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 font-semibold text-muted-foreground">No Data Found.</td>
                  </tr>
                ) : (
                  mockData.map((row, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="py-2 px-4 font-mono">{row.address}</td>
                      <td className="py-2 px-4">{row.userId}</td>
                      <td className="py-2 px-4">{row.investment}</td>
                      <td className="py-2 px-4">{row.directBusiness}</td>
                      <td className="py-2 px-4">{row.teamBusiness}</td>
                      <td className="py-2 px-4">{row.joined}</td>
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