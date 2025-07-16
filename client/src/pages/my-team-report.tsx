import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";

const levels = ["ALL", ...Array.from({ length: 16 }, (_, i) => `Level ${i + 1}`)];

const mockData = [
  {
    address: "0x1234...abcd",
    userId: "1001",
    level: 1,
    investment: 200,
    directBusiness: 150,
    teamBusiness: 500,
    joined: "2024-06-01 12:34:56"
  },
  {
    address: "0x5678...efgh",
    userId: "1002",
    level: 2,
    investment: 300,
    directBusiness: 200,
    teamBusiness: 700,
    joined: "2024-06-02 15:20:10"
  },
  {
    address: "0x9abc...ijkl",
    userId: "1003",
    level: 1,
    investment: 100,
    directBusiness: 80,
    teamBusiness: 250,
    joined: "2024-06-03 09:10:22"
  }
];

export default function MyTeamReport() {
  const [selectedLevel, setSelectedLevel] = useState("ALL");
  const filteredData = selectedLevel === "ALL"
    ? mockData
    : mockData.filter(row => `Level ${row.level}` === selectedLevel);

  return (
    <div className="p-6">
      <Card className="rounded-2xl border border-border/50">
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <select
              className="w-32 mb-4 md:mb-0 border rounded px-3 py-2 text-sm font-medium bg-background"
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <span className="text-xl font-bold text-muted-foreground md:ml-4">My Downline Team</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-2 px-4 text-left font-semibold">User Address</th>
                  <th className="py-2 px-4 text-left font-semibold">User ID</th>
                  <th className="py-2 px-4 text-left font-semibold">Level</th>
                  <th className="py-2 px-4 text-left font-semibold">Total Investment (USDT)</th>
                  <th className="py-2 px-4 text-left font-semibold">Total Direct Business (USDT)</th>
                  <th className="py-2 px-4 text-left font-semibold">Total Team Business (USDT)</th>
                  <th className="py-2 px-4 text-left font-semibold">Joined On</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 font-semibold text-muted-foreground">No Data Found.</td>
                  </tr>
                ) : (
                  filteredData.map((row, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="py-2 px-4 font-mono">{row.address}</td>
                      <td className="py-2 px-4">{row.userId}</td>
                      <td className="py-2 px-4">{row.level}</td>
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