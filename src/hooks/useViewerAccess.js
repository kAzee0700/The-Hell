import { useSearchParams } from 'react-router-dom';
import { getViewerAccess } from '../utils/access-levels';

export function useViewerAccess() {
  const [searchParams] = useSearchParams();

  return getViewerAccess(searchParams.get('viewer'));
}
