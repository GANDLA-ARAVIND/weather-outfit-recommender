declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface LucideProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }
  
  export type LucideIcon = FC<LucideProps>;
  
  export const Search: LucideIcon;
  export const MapPin: LucideIcon;
  export const Loader2: LucideIcon;
  export const Sun: LucideIcon;
  export const Moon: LucideIcon;
  export const Cloud: LucideIcon;
  export const CloudRain: LucideIcon;
  export const CloudSnow: LucideIcon;
  export const CloudLightning: LucideIcon;
  export const Cloudy: LucideIcon;
  export const Thermometer: LucideIcon;
  export const Droplets: LucideIcon;
  export const Wind: LucideIcon;
  export const Eye: LucideIcon;
  export const Volume2: LucideIcon;
  export const VolumeX: LucideIcon;
  export const Shirt: LucideIcon;
  export const Settings: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Activity: LucideIcon;
  export const Clock: LucideIcon;
  export const Calendar: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const X: LucideIcon;
  export const Share2: LucideIcon;
  export const Twitter: LucideIcon;
  export const Facebook: LucideIcon;
  export const Copy: LucideIcon;
  export const Check: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Github: LucideIcon;
  export const Wifi: LucideIcon;
  export const WifiOff: LucideIcon;
  export const Plus: LucideIcon;
  export const Edit2: LucideIcon;
  export const Trash2: LucideIcon;
  export const Save: LucideIcon;
  export const Palette: LucideIcon;
  export const Globe: LucideIcon;
}