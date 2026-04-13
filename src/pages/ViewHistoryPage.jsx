import { useState, useEffect } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAuth } from '../hooks/useAuth';
import { VIEWER_ACCESS } from '../utils/access-levels';
import { api } from '../services/api';

export function ViewHistoryPage() {
  usePageTitle('열람 이력');
  const { user } = useAuth();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      setLoading(true);
      const data = await api.viewHistory.getMyHistory();
      setHistory(data.history || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const viewer = user?.role === 'company' ? 'company' : 'individual';

  return (
    <section className="page-shell">
      <div className="container page-shell__inner">
        <div className="page-shell__hero">
          <p className="eyebrow">History</p>
          <h1>열람 이력</h1>
          <p className="page-shell__copy">
            {viewer === 'company' 
              ? '탐색 과정에서 열람한 프로필 목록입니다.'
              : '내 프로필을 열람한 기업 목록입니다.'}
          </p>
        </div>

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="admin-loading">로딩 중...</div>
        ) : history.length === 0 ? (
          <div className="empty-state">
            <p>열람 이력이 없습니다.</p>
          </div>
        ) : (
          <div className="view-history-list">
            {history.map(item => (
              <article key={item.id} className="surface-card view-history-item">
                <div className="view-history-item__header">
                  <span className="view-history-item__company">
                    {viewer === 'company' ? item.viewedProfileName : item.viewerCompanyName}
                  </span>
                  <span className="view-history-item__date">
                    {new Date(item.viewedAt).toLocaleDateString()}
                  </span>
                </div>
                {viewer === 'individual' && item.viewerCompanyName && (
                  <p className="view-history-item__detail">
                    {item.viewerDepartment && `${item.viewerDepartment} / `}
                    {item.viewerPosition}
                  </p>
                )}
                <p className="view-history-item__reason">
                  열람 목적: {item.reason || '인재 탐색'}
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="admin-summary">
          <p>총 열람: {history.length}회</p>
        </div>
      </div>
    </section>
  );
}
