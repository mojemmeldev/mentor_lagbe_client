import React from 'react';
import {
  ShieldCheck,
  Stethoscope,
  BadgePercent,
  GraduationCap,
  MessageCircleHeart,
  UserCheck,
  MapPin,
} from 'lucide-react';

const PERKS = [
  { icon: ShieldCheck, text: 'BUET Engineering Grads' },
  { icon: Stethoscope, text: 'DMC Medical Mentors' },
  { icon: BadgePercent, text: '0% Middleman Agency Cut' },
  { icon: GraduationCap, text: 'DU Academic Experts' },
  { icon: MessageCircleHeart, text: 'Direct WhatsApp Contact' },
  { icon: UserCheck, text: '100% ID Verified Teachers' },
  { icon: MapPin, text: 'Online & Dhaka Home Batches' },
];

export const KineticRibbon: React.FC = () => {
  return (
    <section
      id="kineticRibbonSection"
      className="py-4 bg-brand-500 text-white overflow-hidden border-y border-forest-900/10 select-none relative"
    >
      <div
        id="kineticRibbonTrack"
        className="marquee-track-seamless items-center font-serif text-base sm:text-lg font-bold tracking-wide"
      >
        {/* Track 1 */}
        <div className="flex items-center gap-8 pr-8 shrink-0">
          {PERKS.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <React.Fragment key={`perk-1-${index}`}>
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  <Icon className="w-4 h-4 text-amberwarm-100 shrink-0" />
                  {perk.text}
                </span>
                <span className="opacity-50">✦</span>
              </React.Fragment>
            );
          })}
        </div>

        {/* Track 2 (Identical for zero-gap infinite continuous marquee) */}
        <div className="flex items-center gap-8 pr-8 shrink-0" aria-hidden="true">
          {PERKS.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <React.Fragment key={`perk-2-${index}`}>
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  <Icon className="w-4 h-4 text-amberwarm-100 shrink-0" />
                  {perk.text}
                </span>
                <span className="opacity-50">✦</span>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KineticRibbon;
