export const ROUTE_PATHS = {
  home: '/',
  about: '/about',
  safety: '/safety',
  profile: '/profile',
  proposals: '/proposals',
  proposalDetail: '/proposals/:proposalId',
  companyVerify: '/company/verify',
  talents: '/talents',
  talentDetail: '/talents/:talentId',
  saved: '/saved',
  offers: '/offers',
  offerCreate: '/offers/new/:talentId',
};

export const buildPath = {
  proposalDetail: (proposalId) => `/proposals/${proposalId}`,
  talentDetail: (talentId) => `/talents/${talentId}`,
  offerCreate: (talentId) => `/offers/new/${talentId}`,
};
