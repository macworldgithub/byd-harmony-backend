export type AppUserLike = {
  role?: string;
  locationId?: string | { toString(): string };
};

export function getAdminLocationId(user?: AppUserLike): string | undefined {
  if (!user || user.role !== 'admin') return undefined;
  return user.locationId ? String(user.locationId) : undefined;
}

export function getEffectiveLocationId(user?: AppUserLike, explicitLocationId?: string): string | undefined {
  if (!user) return explicitLocationId ? String(explicitLocationId) : undefined;

  if (user.role === 'super_admin') {
    return undefined;
  }

  if (user.role === 'admin') {
    return getAdminLocationId(user);
  }

  return explicitLocationId ? String(explicitLocationId) : undefined;
}

export function getLocationScopeFilter(user?: AppUserLike, field = 'locationId', explicitLocationId?: string): Record<string, string> {
  const locationId = getEffectiveLocationId(user, explicitLocationId);
  return locationId ? { [field]: locationId } : {};
}
