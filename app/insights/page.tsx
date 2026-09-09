import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import { KindleapShell, SectionHeader, Surface } from '@/components/kindleap-ui'
export default function Insights(){return <KindleapShell><div className="kl-page"><SectionHeader eyebrow={`${BRAND.name} / Outcomes`} title="Measure the search." description="Outcome reporting will use saved application records. Market intelligence is not shown here until real outcome data is connected."/><Surface><h2>No outcome intelligence yet.</h2><p>Track applications first. Once real replies, interviews and offers are recorded, this page can report meaningful conversion signals.</p><Link className="kl-button kl-button-primary" href="/applications">Open applications <ArrowRight size={14}/></Link></Surface></div></KindleapShell>}
