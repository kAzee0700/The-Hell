import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../utils/routes';
import Logo from '../assets/Logo.svg';

const footerLinks = {
  service: [
    { to: ROUTE_PATHS.about, label: '서비스 소개' },
    { to: ROUTE_PATHS.safety, label: '안전 안내' },
  ],
  jobseeker: [
    { to: ROUTE_PATHS.profile, label: '프로필 등록' },
    { to: ROUTE_PATHS.proposals, label: '받은 제안' },
  ],
  company: [
    { to: ROUTE_PATHS.companyVerify, label: '기업 인증' },
    { to: ROUTE_PATHS.talents, label: '구직자 탐색' },
    { to: ROUTE_PATHS.saved, label: '구원 후보함' },
  ],
  legal: [
    { to: '/terms', label: '이용약관' },
    { to: '/privacy', label: '개인정보처리방침' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="footer-brand">
          <img src={Logo} alt="지옥 로고" className="footer-brand__logo" />
          <p className="footer-brand__desc">사람을 먼저 올리고, 기업이 제안하는 채용</p>
        </div>

        <nav className="footer-nav" aria-label="푸터 메뉴">
          <div className="footer-nav__section">
            <p className="footer-nav__heading">서비스 안내</p>
            <ul className="footer-nav__list">
              {footerLinks.service.map((link) => (
                <li key={link.to}>
                  <Link className="footer-nav__link" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-nav__section">
            <p className="footer-nav__heading">구직자</p>
            <ul className="footer-nav__list">
              {footerLinks.jobseeker.map((link) => (
                <li key={link.to}>
                  <Link className="footer-nav__link" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-nav__section">
            <p className="footer-nav__heading">기업</p>
            <ul className="footer-nav__list">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link className="footer-nav__link" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-nav__section">
            <p className="footer-nav__heading">정책</p>
            <ul className="footer-nav__list">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <Link className="footer-nav__link" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="container site-footer__bottom">
        <div className="footer-info">
          <p className="footer-info__company">(주)지옥태크</p>
          <p className="footer-info__detail">
            대표: 지옥 | 주소: 서울특별시 구직자구 제안로 100
          </p>
          <p className="footer-info__contact">
            문의: support@hell.kr | 사업자등록번호: 000-00-00000
          </p>
        </div>
        <small className="footer-copyright">
          © 2026 (주)지옥태크. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
