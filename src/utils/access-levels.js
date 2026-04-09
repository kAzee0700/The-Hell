export const VIEWER_ACCESS = {
  public: 'public',
  jobSeeker: 'jobseeker',
  companyPending: 'company-pending',
  companyVerified: 'company-verified',
};

export const VIEWER_LABELS = {
  [VIEWER_ACCESS.public]: '공개 방문자',
  [VIEWER_ACCESS.jobSeeker]: '구직자',
  [VIEWER_ACCESS.companyPending]: '기업 인증 전',
  [VIEWER_ACCESS.companyVerified]: '기업 인증 후',
};

export function getViewerAccess(viewer) {
  const accessLevels = Object.values(VIEWER_ACCESS);

  if (accessLevels.includes(viewer)) {
    return viewer;
  }

  return VIEWER_ACCESS.public;
}

export function isAllowedViewer(viewer, allowed) {
  return allowed.includes(viewer);
}

export function withViewer(path, viewer) {
  if (!viewer || viewer === VIEWER_ACCESS.public) {
    return path;
  }

  return `${path}?viewer=${viewer}`;
}
