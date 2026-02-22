import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomeDashboard } from './pages/HomeDashboard';
import { NeuralDashboard } from './pages/NeuralDashboard';
import { OperatorPresence } from './pages/OperatorPresence';
import { BioMonitor } from './pages/BioMonitor';
import { MissionLog } from './pages/MissionLog';
import { AIForge } from './pages/AIForge';
import { NeuralLibrary } from './pages/NeuralLibrary';
import { SignalNexus } from './pages/SignalNexus';
import { GeoSentinel } from './pages/GeoSentinel';
import { SportsOracle } from './pages/SportsOracle';
import { CryptoHub } from './pages/CryptoHub';
import { VisualCortex } from './pages/VisualCortex';
import { HUB_REGISTRY } from './HubRegistry';
import { GenericHub } from './components/GenericHub';

export default function App() {
  // Hubs that have specific implementations
  const implementedHubs = ['home', 'neural', 'operator', 'bio', 'mission', 'forge', 'library', 'signal', 'geo', 'sports', 'crypto', 'vision'];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="neural" element={<NeuralDashboard />} />
          <Route path="operator" element={<OperatorPresence />} />
          <Route path="bio" element={<BioMonitor />} />
          <Route path="mission" element={<MissionLog />} />
          <Route path="forge" element={<AIForge />} />
          <Route path="library" element={<NeuralLibrary />} />
          <Route path="signal" element={<SignalNexus />} />
          <Route path="geo" element={<GeoSentinel />} />
          <Route path="sports" element={<SportsOracle />} />
          <Route path="crypto" element={<CryptoHub />} />
          <Route path="vision" element={<VisualCortex />} />
          
          {/* Dynamically render the rest using GenericHub */}
          {HUB_REGISTRY.filter(hub => !implementedHubs.includes(hub.id)).map((hub) => (
            <Route 
              key={hub.id}
              {...({
                path: hub.path.startsWith('/') ? hub.path.substring(1) : hub.path,
                element: (
                  <GenericHub 
                    title={hub.name} 
                    description={hub.description} 
                    category={hub.category} 
                    icon={hub.icon} 
                  />
                )
              } as any)}
            />
          ))}

          <Route path="*" element={
            <div className="flex items-center justify-center h-full">
              <div className="text-center font-mono">
                <h2 className="text-2xl text-cyber-cyan mb-2">MODULE_NOT_FOUND</h2>
                <p className="text-gray-500">This hub is currently offline or under construction.</p>
              </div>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
