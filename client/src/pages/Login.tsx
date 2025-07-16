import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";
import WalletConnect from "@/components/WalletConnect";


export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <Card className="w-[500px]">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full backdrop-blur-sm flex items-center justify-center">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Connect Your Wallet
              </h2>
              <p>
                Choose your preferred connection method
              </p>
            </div>
            <WalletConnect />
            <Button
              onClick={() => navigate("/")}
              variant="secondary"
            >
              <ArrowLeft/> Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
