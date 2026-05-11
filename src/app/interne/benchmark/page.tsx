import type { Metadata } from 'next';
import { BenchmarkClient } from '@/components/interne/BenchmarkClient';

export const metadata: Metadata = {
  title: 'Benchmark concurrentiel — Interne BoumRank',
  description: 'Veille stratégique : 10 concurrents BoumRank, tarifs et fonctionnalités.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BenchmarkPage() {
  return <BenchmarkClient />;
}
