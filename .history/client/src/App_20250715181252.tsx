import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { WalletProvider } from "@/context/WalletProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyInvestments from "./pages/my-investments";
import MyDirects from "./pages/my-directs";
import MyTeamReport from "./pages/my-team-report";
import MyReferralBonus from "./pages/my-referral-bonus";
import MyLevelBonus from "./pages/my-level-bonus";
import MyROIBonus from "./pages/my-roi-bonus";
import Transfer from "./pages/transfer";
import MyRewardsIncome from "./pages/my-rewards-income";
import MyStakingClaimBonus from "./pages/my-staking-claim-bonus";
import MyWithdrawStakingToken from "./pages/my-withdraw-staking-token";
import DashboardHome from "./pages/DashboardHome";
import { ThemeProvider } from "./context/ThemeProvider";
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useCallback } from 'react';

function SidebarLayout() {
  return <Dashboard><Outlet /></Dashboard>;
}

const queryClient = new QueryClient();

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        background: { color: { value: 'transparent' } },
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: ["#a259f7", "#00ffe7", "#fff", "#6e7ff3"] },
          shape: { type: "circle" },
          opacity: { value: 0.18, random: true },
          size: { value: 3, random: { enable: true, minimumValue: 1 } },
          move: { enable: true, speed: 0.6, direction: "none", random: false, straight: false, outModes: { default: "out" } },
          links: { enable: true, distance: 120, color: "#a259f7", opacity: 0.08, width: 1 },
        },
        detectRetina: true,
      }}
    />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <TooltipProvider>
        <ThemeProvider>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <ParticleBackground />
          </div>
          <div className="relative z-10 min-h-screen flex flex-col">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="my-investments" element={<MyInvestments />} />
                  <Route path="my-directs" element={<MyDirects />} />
                  <Route path="my-team-report" element={<MyTeamReport />} />
                  <Route path="my-referral-bonus" element={<MyReferralBonus />} />
                  <Route path="my-level-bonus" element={<MyLevelBonus />} />
                  <Route path="my-roi-bonus" element={<MyROIBonus />} />
                  <Route path="transfer" element={<Transfer />} />
                  <Route path="my-rewards-income" element={<MyRewardsIncome />} />
                  <Route path="my-staking-claim-bonus" element={<MyStakingClaimBonus />} />
                  <Route path="my-withdraw-staking-token" element={<MyWithdrawStakingToken />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </TooltipProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
