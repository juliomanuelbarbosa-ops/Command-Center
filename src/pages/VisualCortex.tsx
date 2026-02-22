import { useState, useEffect, useRef } from 'react';
import { Eye, Shield, Target, Crosshair, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function VisualCortex() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<string[]>([]);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    setupCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setDetectedObjects(['THREAT_LEVEL: LOW', 'SIGNAL_SOURCE: DETECTED', 'NEURAL_LINK: STABLE']);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      <header className="mb-6 shrink-0">
        <h1 className="text-3xl font-mono font-bold neon-text-cyan mb-2 flex items-center gap-3">
          <Eye className="w-8 h-8" /> VISUAL_CORTEX
        </h1>
        <p className="text-gray-400 font-mono text-sm">AR OVERLAY & OBJECT RECOGNITION</p>
      </header>

      <div className="flex-1 glass-panel relative overflow-hidden rounded-3xl border-2 border-cyber-cyan/30">
        <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover grayscale opacity-50" />
        
        {/* AR Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-[40px] border-black/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyber-cyan/30 rounded-full">
             <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border-t-2 border-cyber-cyan rounded-full" 
             />
          </div>
          
          <div className="absolute top-10 left-10 font-mono text-[10px] text-cyber-cyan space-y-1">
            <div>LAT: 34.0522</div>
            <div>LNG: -118.2437</div>
            <div>ALT: 124m</div>
          </div>

          <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2">
            {detectedObjects.map((obj, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan px-3 py-1 rounded-lg font-mono text-[10px]"
              >
                {obj}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button 
            onClick={handleScan}
            disabled={isScanning}
            className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${isScanning ? 'border-cyber-magenta bg-cyber-magenta/20 animate-pulse' : 'border-cyber-cyan bg-cyber-cyan/10 hover:bg-cyber-cyan/20'}`}
          >
            <Crosshair className={`w-10 h-10 ${isScanning ? 'text-cyber-magenta' : 'text-cyber-cyan'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
