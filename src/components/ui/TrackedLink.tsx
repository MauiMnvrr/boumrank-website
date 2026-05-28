'use client';

import { track } from '@/lib/analytics';

export function TrackedLink({
  event,
  payload,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  payload?: Record<string, unknown>;
}) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, payload ?? {});
        props.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
