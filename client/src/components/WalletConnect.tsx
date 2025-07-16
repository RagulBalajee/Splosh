import { useState } from 'react'
import { useConnect, useAccount, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function WalletConnect() {
    const { connect, connectors } = useConnect()
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const [publicKey, setPublicKey] = useState('');
    const navigate = useNavigate();

    const handlePublicKeySubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (publicKey.trim()) {
            // Mock authentication with public key
            console.log('Authenticating with public key:', publicKey)
            localStorage.setItem('mockAuth', 'true')
            localStorage.setItem('mockAddress', publicKey)
            window.location.reload()
        }
    }

    if (isConnected) {
        return (
            <div
                className="flex items-center gap-4 p-4 glass-card rounded-xl"
            >
                <div className="flex w-full items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                </div>
                <Button
                    onClick={() => disconnect()}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                >
                    <LogOut size={16} />
                    Disconnect
                </Button>
                <Button
                    onClick={()=>navigate("/dashboard")}
                    size="sm"
                    className="gap-2"
                >
                    Dashboard
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Card className="glass-card border-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wallet className="w-5 h-5" />
                        Connect Wallet
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {connectors.map((connector) => (
                        <Button
                            key={connector.uid}
                            onClick={() => connect({ connector })}
                            variant="outline"
                            className="w-full justify-start gap-2 "
                        >
                            <Wallet size={16} />
                            {connector.name}
                        </Button>
                    ))}
                </CardContent>
            </Card>

            {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-muted-foreground">
                        OR
                    </span>
                </div>
            </div>

            <Card className="glass-card border-0">
                <CardHeader>
                    <CardTitle className="text-sm">Manual Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePublicKeySubmit} className="space-y-4">
                        <Input
                            placeholder="Enter your public key..."
                            value={publicKey}
                            onChange={(e) => setPublicKey(e.target.value)}
                            className="bg-background/50"
                        />
                        <Button type="submit" className="w-full">
                            Authenticate
                        </Button>
                    </form>
                </CardContent>
            </Card> */}
        </div>
    )
}
