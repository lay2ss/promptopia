import React, { Suspense } from 'react';
import EditPrompt from '@components/EditPrompt';

export default function Page() {
  return (
    <Suspense fallback={<div className="desc font-figtree">Loading prompt...</div>}>
      <EditPrompt />
    </Suspense>
  );
}