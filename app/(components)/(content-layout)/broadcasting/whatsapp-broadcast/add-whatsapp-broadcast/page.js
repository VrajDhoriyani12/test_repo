'use client';

import dynamic from 'next/dynamic';

const ReactFlowClient = dynamic(() => import('./ReactFlowPage'), {
  // loading: () => <div>Loading....</div>,
  ssr: false,
});

export default function Page() {
  return (
    <div suppressHydrationWarning>
      <ReactFlowClient />
    </div>
  );
}