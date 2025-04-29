'use client';

import { ReactNode, useEffect, useState } from 'react';

interface SafeHydrateProps {
  children: ReactNode;
}

export default function SafeHydrate({ children }: SafeHydrateProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}