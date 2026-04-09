export function Pill({ children, className = '' }) {
  const pillClassName = className ? `pill ${className}` : 'pill';

  return <span className={pillClassName}>{children}</span>;
}
