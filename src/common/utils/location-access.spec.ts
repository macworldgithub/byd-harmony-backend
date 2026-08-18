import { getLocationScopeFilter, getAdminLocationId } from './location-access';

describe('location access rules', () => {
  it('allows super admin to view all data', () => {
    expect(getLocationScopeFilter({ role: 'super_admin' }, 'locationId')).toEqual({});
  });

  it('restricts admin users to their own location', () => {
    expect(getLocationScopeFilter({ role: 'admin', locationId: 'loc-123' }, 'locationId')).toEqual({ locationId: 'loc-123' });
    expect(getAdminLocationId({ role: 'admin', locationId: 'loc-123' })).toBe('loc-123');
  });

  it('returns no scope for non-admin users', () => {
    expect(getLocationScopeFilter({ role: 'user' }, 'locationId')).toEqual({});
  });
});
