import Icon from './Icon'

export default function EmptyState({ icon = 'inbox', title, description, children }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon" aria-hidden="true">
        <Icon name={icon} size={22} />
      </span>
      <p className="empty-state-title">{title}</p>
      {description && <p className="empty-state-description">{description}</p>}
      {children}
    </div>
  )
}
