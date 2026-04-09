import { Link } from 'react-router-dom';

export function ScaffoldPage({
  eyebrow,
  title,
  description,
  actions = [],
  sections = [],
  note,
}) {
  return (
    <section className="page-shell">
      <div className="container page-shell__inner">
        <div className="page-shell__hero">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          {description ? <p className="page-shell__copy">{description}</p> : null}
          {actions.length > 0 ? (
            <div className="page-shell__actions">
              {actions.map((action) => (
                <Link key={action.to} className="action-link" to={action.to}>
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {note ? <p className="page-shell__note">{note}</p> : null}

        {sections.length > 0 ? (
          <div className="page-shell__sections">
            {sections.map((section) => (
              <article key={section.title} className="surface-card info-card stack-md">
                <h2>{section.title}</h2>
                {section.description ? <p>{section.description}</p> : null}
                {section.items?.length ? (
                  <ul className="info-list">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
