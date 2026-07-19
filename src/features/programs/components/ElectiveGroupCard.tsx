import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages.js'
import type { ElectiveGroup } from '#/features/programs/types'

/** Card listing the choices of one elective group. */
export function ElectiveGroupCard({ group }: { group: ElectiveGroup }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="mb-3 flex items-baseline gap-2.5">
        <h3 className="font-serif text-lg font-semibold">{group.title}</h3>
        {group.codeRange ? (
          <span className="font-mono text-xs text-faint">
            {group.codeRange}
          </span>
        ) : null}
      </div>
      {group.choices.length === 0 ? (
        <p className="text-sm text-faint italic">{m.elective_choices_soon()}</p>
      ) : (
        <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {group.choices.map((choice) => (
            <li key={choice.title} className="text-sm text-body">
              {choice.slug ? (
                <Link
                  to="/courses/$slug"
                  params={{ slug: choice.slug }}
                  className="font-medium"
                >
                  {choice.title}
                </Link>
              ) : (
                choice.title
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
