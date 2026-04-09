import { createBrowserRouter } from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage';
import { CompanyOffersPage } from '../pages/CompanyOffersPage';
import { CompanyVerificationPage } from '../pages/CompanyVerificationPage';
import { RootLayout } from '../layouts/RootLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import { JobSeekerLayout } from '../layouts/JobSeekerLayout';
import { CompanyGateLayout } from '../layouts/CompanyGateLayout';
import { CompanyLayout } from '../layouts/CompanyLayout';
import { HomePage } from '../pages/HomePage';
import { JobSeekerProfilePage } from '../pages/JobSeekerProfilePage';
import { JobSeekerProposalDetailPage } from '../pages/JobSeekerProposalDetailPage';
import { JobSeekerProposalsPage } from '../pages/JobSeekerProposalsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { OfferCreatePage } from '../pages/OfferCreatePage';
import { SafetyPage } from '../pages/SafetyPage';
import { SavedTalentsPage } from '../pages/SavedTalentsPage';
import { TalentDetailPage } from '../pages/TalentDetailPage';
import { TalentListPage } from '../pages/TalentListPage';
import { ROUTE_PATHS } from '../utils/routes';

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.home,
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: ROUTE_PATHS.about,
            element: <AboutPage />,
          },
          {
            path: ROUTE_PATHS.safety,
            element: <SafetyPage />,
          },
        ],
      },
      {
        element: <JobSeekerLayout />,
        children: [
          {
            path: ROUTE_PATHS.profile,
            element: <JobSeekerProfilePage />,
          },
          {
            path: ROUTE_PATHS.proposals,
            element: <JobSeekerProposalsPage />,
          },
          {
            path: ROUTE_PATHS.proposalDetail,
            element: <JobSeekerProposalDetailPage />,
          },
        ],
      },
      {
        element: <CompanyGateLayout />,
        children: [
          {
            path: ROUTE_PATHS.companyVerify,
            element: <CompanyVerificationPage />,
          },
        ],
      },
      {
        element: <CompanyLayout />,
        children: [
          {
            path: ROUTE_PATHS.talents,
            element: <TalentListPage />,
          },
          {
            path: ROUTE_PATHS.talentDetail,
            element: <TalentDetailPage />,
          },
          {
            path: ROUTE_PATHS.saved,
            element: <SavedTalentsPage />,
          },
          {
            path: ROUTE_PATHS.offerCreate,
            element: <OfferCreatePage />,
          },
          {
            path: ROUTE_PATHS.offers,
            element: <CompanyOffersPage />,
          },
        ],
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);
