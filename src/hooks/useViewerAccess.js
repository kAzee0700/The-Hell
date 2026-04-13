import { useAuth } from './useAuth';
import { VIEWER_ACCESS } from '../utils/access-levels';

export function useViewerAccess() {
  const { user } = useAuth();

  if (!user) {
    return VIEWER_ACCESS.public;
  }

  if (user.role === 'admin') {
    return VIEWER_ACCESS.admin;
  }

  if (user.role === 'individual') {
    return VIEWER_ACCESS.jobSeeker;
  }

  if (user.role === 'company') {
    if (user.verificationStatus === 'verified') {
      return VIEWER_ACCESS.companyVerified;
    }
    return VIEWER_ACCESS.companyPending;
  }

  return VIEWER_ACCESS.public;
}
