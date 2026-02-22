import { 
  Activity, Cpu, Radio, Shield, Zap, Eye, 
  Music, Terminal, Globe, Lock, Database, 
  TrendingUp, CreditCard, Code, BookOpen, 
  Gamepad, Video, Layers, Share2, Search,
  MessageSquare, Users, Settings
} from 'lucide-react';

export interface Hub {
  id: string;
  name: string;
  icon: any;
  path: string;
  category: 'CORE' | 'AI' | 'DEV' | 'FINANCE' | 'SECURITY' | 'MEDIA' | 'GEO';
  description: string;
}

export const HUB_REGISTRY: Hub[] = [
  // CORE
  { id: 'home', name: 'Home Dashboard', icon: Activity, path: '/', category: 'CORE', description: 'Main system overview' },
  { id: 'neural', name: 'Neural Dashboard', icon: Cpu, path: '/neural', category: 'CORE', description: 'Cognitive processing status' },
  { id: 'operator', name: 'Operator Presence', icon: Radio, path: '/operator', category: 'CORE', description: 'Secure communications' },
  { id: 'bio', name: 'Bio Monitor', icon: Activity, path: '/bio', category: 'CORE', description: 'Vital signs telemetry' },
  { id: 'mission', name: 'Mission Log', icon: Shield, path: '/mission', category: 'CORE', description: 'XP and objectives' },
  { id: 'forge', name: 'AI Forge', icon: Zap, path: '/forge', category: 'CORE', description: 'Unified AI tools' },

  // AI & FORGE
  { id: 'oracle', name: 'Gemini Oracle', icon: MessageSquare, path: '/forge/oracle', category: 'AI', description: 'Advanced reasoning engine' },
  { id: 'audio-lab', name: 'Gemini Audio Lab', icon: Music, path: '/forge/audio', category: 'AI', description: 'Neural audio synthesis' },
  { id: 'vision-studio', name: 'Vision Studio', icon: Eye, path: '/forge/vision', category: 'AI', description: 'Computer vision analysis' },
  { id: 'stable-diffusion', name: 'SD Forge', icon: Layers, path: '/forge/sd', category: 'AI', description: 'Image generation' },
  { id: 'comfy-ui', name: 'ComfyUI Forge', icon: Share2, path: '/forge/comfy', category: 'AI', description: 'Node-based AI workflows' },
  { id: 'langchain', name: 'LangChain Forge', icon: Code, path: '/forge/langchain', category: 'AI', description: 'LLM orchestration' },
  { id: 'rag-chat', name: 'RAG Chat Hub', icon: Database, path: '/forge/rag', category: 'AI', description: 'Vector-augmented retrieval' },
  { id: 'crew-agent', name: 'Crew Agent Hub', icon: Users, path: '/forge/crew', category: 'AI', description: 'Multi-agent coordination' },
  { id: 'veo-video', name: 'Veo Video Forge', icon: Video, path: '/forge/veo', category: 'AI', description: 'Neural video generation' },

  // DEV & TOOLS
  { id: 'public-apis', name: 'API Explorer', icon: Globe, path: '/dev/apis', category: 'DEV', description: 'Public API directory' },
  { id: 'roadmap', name: 'Dev Roadmap', icon: TrendingUp, path: '/dev/roadmap', category: 'DEV', description: 'Learning paths' },
  { id: 'interview', name: 'Interview Prep', icon: BookOpen, path: '/dev/interview', category: 'DEV', description: 'Coding challenges' },
  { id: 'system-design', name: 'System Design', icon: Layers, path: '/dev/system-design', category: 'DEV', description: 'Architecture patterns' },
  { id: 'js-algo', name: 'JS Algorithms', icon: Code, path: '/dev/js-algo', category: 'DEV', description: 'Algorithm visualizer' },
  { id: 'vue-play', name: 'Vue Playground', icon: Terminal, path: '/dev/vue', category: 'DEV', description: 'Sandboxed Vue environment' },
  { id: 'react-play', name: 'React Playground', icon: Terminal, path: '/dev/react', category: 'DEV', description: 'Sandboxed React environment' },

  // SECURITY & INFRA
  { id: 'security-audit', name: 'Security Audit', icon: Lock, path: '/sec/audit', category: 'SECURITY', description: 'Vulnerability scanning' },
  { id: 'netdata', name: 'Netdata Observer', icon: Activity, path: '/sec/netdata', category: 'SECURITY', description: 'Real-time infra monitoring' },
  { id: 'chainsight', name: 'ChainSight', icon: Search, path: '/sec/chainsight', category: 'SECURITY', description: 'Blockchain forensics' },
  { id: 'n8n', name: 'N8N Hub', icon: Share2, path: '/sec/n8n', category: 'SECURITY', description: 'Workflow automation' },

  // FINANCE
  { id: 'market-oracle', name: 'Market Oracle', icon: TrendingUp, path: '/fin/market', category: 'FINANCE', description: 'Stock & asset data' },
  { id: 'crypto-hub', name: 'Crypto Hub', icon: Zap, path: '/crypto', category: 'FINANCE', description: 'Market tracker' },
  { id: 'nft-creator', name: 'NFT Creator', icon: Layers, path: '/fin/nft', category: 'FINANCE', description: 'Asset tokenization' },
  { id: 'stripe', name: 'Stripe Hub', icon: CreditCard, path: '/fin/stripe', category: 'FINANCE', description: 'Payment processing' },

  // MEDIA
  { id: 'music-wiz', name: 'Music Wiz', icon: Music, path: '/media/music', category: 'MEDIA', description: 'Neural music player' },
  { id: 'neural-radio', name: 'Neural Radio', icon: Radio, path: '/media/radio', category: 'MEDIA', description: 'AI-generated broadcasts' },
  { id: 'emulator', name: 'Emulator Archive', icon: Gamepad, path: '/media/emulator', category: 'MEDIA', description: 'Retro gaming core' },

  // GEO
  { id: 'signal-nexus', name: 'Signal Nexus', icon: Radio, path: '/signal', category: 'GEO', description: 'Spectrum analysis' },
  { id: 'geo-sentinel', name: 'Geo Sentinel', icon: Shield, path: '/geo', category: 'GEO', description: 'Global alerts' },
  { id: 'visual-cortex', name: 'Visual Cortex', icon: Eye, path: '/vision', category: 'GEO', description: 'AR vision system' },
  { id: 'settings', name: 'System Settings', icon: Settings, path: '/settings', category: 'CORE', description: 'Core configuration' },
];
