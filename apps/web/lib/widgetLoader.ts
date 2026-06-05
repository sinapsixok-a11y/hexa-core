/*
 * widgetLoader.ts – Exposes a global `SinapsiXWidget` object that renders
 * HexaCoreWidget into a portal. It sets up its own tRPC client so the widget
 * can be used on any page, even outside of the Next.js React tree.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HexaCoreWidget } from '@/components/HexaCoreWidget';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '@/lib/trpc';

let widgetRoot: ReturnType<typeof createRoot> | null = null;
let widgetContainer: HTMLDivElement | null = null;

/**
 * Initialise the widget. Called once – subsequent calls are no‑ops.
 */
export function initSinapsiXWidget(config?: { serviceId?: string; theme?: 'dark' | 'light' }) {
  if (widgetContainer) return; // already initialised

  // 1️⃣ Create container DIV
  widgetContainer = document.createElement('div');
  widgetContainer.id = 'sinapsix-widget-root';
  document.body.appendChild(widgetContainer);

  // 2️⃣ Set up tRPC client (public router – no auth required)
  const queryClient = new QueryClient();
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: `${window.location.origin}/api/trpc`,
      }),
    ],
  });

  // 3️⃣ Wrapper component that exposes the global API
  const WidgetWrapper: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      // expose a global thin façade
      (window as any).SinapsiXWidget = {
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((prev) => !prev),
        // optional: allow re‑initialisation with new config at runtime
        init: (newConfig: typeof config) => {
          // store config in a ref if needed – for now we just reset the widget
          setIsOpen(false);
        },
      };
    }, []);

    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <HexaCoreWidget
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            serviceId={config?.serviceId}
            theme={config?.theme ?? 'dark'}
          />
        </QueryClientProvider>
      </trpc.Provider>
    );
  };

  // 4️⃣ Render into portal
  widgetRoot = createRoot(widgetContainer);
  widgetRoot.render(<WidgetWrapper />);
}

// Auto‑initialise if an element marks the page for a widget.
if (typeof document !== 'undefined') {
  const hasWidget = document.querySelector('[data-sinapsix-widget]');
  if (hasWidget) initSinapsiXWidget();
}
