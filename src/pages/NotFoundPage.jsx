import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="error-page">
      <div className="container error-page__inner">
        <p className="eyebrow">404</p>
        <h1>페이지를 찾을 수 없습니다.</h1>
        <p>라우팅 스캐폴드만 우선 구성된 상태입니다.</p>
        <Link className="text-link" to="/">
          홈으로 이동
        </Link>
      </div>
    </section>
  );
}
