let pending: string | null = null;

export function setPendingAnchor(id: string) {
  pending = id;
}

export function consumePendingAnchor(): string | null {
  const a = pending;
  pending = null;
  return a;
}
