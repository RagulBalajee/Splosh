import React, { useState } from 'react';
import { Hash, LineChart, Lock, Droplet, Network, Copy } from 'lucide-react';

const mainTokenomics = [
  { heading: 'Token', value: 'SPLOSH', icon: <Hash size={32} />, gradient: true },
  { heading: 'Total Supply', value: '500,000', icon: <LineChart size={32} />, gradient: false },
  { heading: 'Locked Tokens', value: '450,000 (90%)', icon: <Lock size={32} />, gradient: false },
];
const secondaryTokenomics = [
  { heading: 'Liquidity Pool', value: '50,000', icon: <Droplet size={32} />, gradient: false },
  { heading: 'Network', value: 'Polygon', icon: <Network size={32} />, gradient: true },
];
const contractAddress = '0x054Eb75BB0159173B6Ac1bB66447463151F3CEBC';

const TokenomicsSection = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <section className="py-20 bg-background flex items-center justify-center min-h-screen">
      <div className="w-full flex flex-col items-center justify-center px-2" style={{ minHeight: '70vh' }}>
        <div className="text-center mb-10">
          <h2 
            className="text-4xl md:text-5xl font-jakarta mb-4"
            style={{
              background: 'linear-gradient(90deg, #e81cff 0%, #40c9ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 900,
              letterSpacing: '0.01em',
              fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
            }}
          >
            Tokenomics
          </h2>
          <p 
            className="text-xl max-w-2xl mx-auto font-bold"
            style={{
              color: '#3b2fff',
              fontWeight: 700,
              letterSpacing: '0.01em',
              fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
              textShadow: '0 2px 12px #e81cff22, 0 0 8px #40c9ff11',
            }}
          >
            Transparent and community-focused token distribution
          </p>
        </div>
        {/* Main 3 large cards */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {mainTokenomics.map((item, idx) => (
            <div className="glass-card flex flex-col items-center justify-center p-6" key={idx}>
              <div className="icon-box mb-3">{item.icon}</div>
              <div className="tokenomics-heading">{item.heading}</div>
              <div className={item.gradient ? 'value-gradient' : 'value-bold'}>{item.value}</div>
            </div>
          ))}
        </div>
        {/* 2 medium cards */}
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {secondaryTokenomics.map((item, idx) => (
            <div className="glass-card flex flex-col items-center justify-center p-6" key={idx}>
              <div className="icon-box mb-3">{item.icon}</div>
              <div className="tokenomics-heading">{item.heading}</div>
              <div className={item.gradient ? 'value-gradient' : 'value-bold'}>{item.value}</div>
            </div>
          ))}
        </div>
        {/* Contract Address Wide Card */}
        <div className="w-full flex justify-center">
          <div className="glass-card flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-6 card-contract">
            <div className="flex items-center gap-3 mb-2 md:mb-0">
              <span className="icon-box"> <Hash size={28} /> </span>
              <span className="tokenomics-heading">Contract Address</span>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
              <span className="contract-address-gradient select-all text-sm md:text-base">{contractAddress}</span>
              <button className="copy-btn ml-2" onClick={handleCopy} title="Copy contract address">
                <Copy size={20} />
              </button>
              {copied && <span className="ml-2 text-xs text-green-400">Copied!</span>}
            </div>
          </div>
        </div>
        <style>{`
.glass-card {
  background: linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(37,99,235,0.12) 100%);
  color: #222;
  border: 1.5px solid rgba(120, 120, 200, 0.18);
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 #1a1a2a22, 0 0 0 1.5px #2a225a11;
  backdrop-filter: blur(8px);
  transition: box-shadow 0.3s, border 0.3s, transform 0.3s;
  position: relative;
}
.glass-card:hover {
  box-shadow: 0 0 32px 8px #e81cff22, 0 0 64px 16px #40c9ff22;
  border: 1.5px solid #e81cff44;
  transform: translateY(-2px) scale(1.025);
}
.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e81cff 0%, #40c9ff 100%);
  border-radius: 12px;
  padding: 10px;
  color: #fff;
  box-shadow: 0 2px 12px #e81cff22, 0 0 8px #40c9ff11;
}
.value-bold {
  font-size: 1.5rem;
  font-weight: 700;
  color: #7edfff;
  font-family: 'Fira Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.value-gradient {
  font-size: 1.5rem;
  font-weight: 500;
  background: linear-gradient(90deg, #00ffe7 0%, #6e7ff3 50%, #00bfff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  letter-spacing: 0.01em;
  font-family: 'Fira Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}
.card-contract {
  min-height: 64px;
  margin-top: 10px;
  border-radius: 18px;
  gap: 0;
}
.contract-address-gradient {
  font-weight: 500;
  background: linear-gradient(90deg, #00dbde 0%, #40c9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  letter-spacing: 0.03em;
  word-break: break-all;
  cursor: pointer;
  transition: text-shadow 0.3s;
  text-shadow: 0 0 8px #40c9ff, 0 0 16px #00dbde;
  user-select: all;
  font-family: 'Fira Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}
.copy-btn {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: #40c9ff;
  padding: 2px 4px;
  border-radius: 6px;
  transition: background 0.2s;
}
.copy-btn:hover {
  background: #1a1a2a44;
}
.tokenomics-heading {
  background: linear-gradient(90deg, #00ffe7 0%, #6e7ff3 50%, #00bfff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-family: 'Plus Jakarta Sans', Inter, system-ui, sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 0.01em;
  margin-bottom: 0.25em;
}
@media (max-width: 900px) {
  .glass-card {
    padding: 16px 10px;
  }
  .card-contract {
    flex-direction: column;
    align-items: flex-start;
    min-height: 80px;
    padding: 16px 10px;
  }
}
@media (max-width: 600px) {
  .glass-card {
    padding: 12px 4px;
  }
  .card-contract {
    flex-direction: column;
    align-items: flex-start;
    min-height: 90px;
    padding: 12px 4px;
  }
  .contract-address-gradient {
    font-size: 0.95rem;
    word-break: break-all;
  }
}
        `}</style>
      </div>
    </section>
  );
};

export default TokenomicsSection;