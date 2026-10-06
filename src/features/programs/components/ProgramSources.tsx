import { m } from '#/paraglide/messages.js'
import { FormatHelper } from '#/lib/helpers/format-helper'

/** Compact list of the sources a program profile was compiled from. */
export function ProgramSources({ sources }: { sources: Array<string> }) {
  // One link per site: several pages from the same host read as repeats.
  const unique = sources.filter(
    (href, index) =>
      sources.findIndex(
        (other) => FormatHelper.hostname(other) === FormatHelper.hostname(href),
      ) === index,
  )
  if (unique.length === 0) return null

  return (
    <div className="mt-12 border-t border-line pt-5 text-xs text-faint">
      <span className="mr-2 font-semibold">{m.program_profile_sources()}</span>
      {unique.map((href, index) => (
        <span key={href}>
          {index > 0 ? ', ' : null}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-faint underline decoration-line-strong underline-offset-2 hover:text-ink"
          >
            {FormatHelper.hostname(href)}
          </a>
        </span>
      ))}
    </div>
  )
}
