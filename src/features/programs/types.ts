/** A subject entry inside a program curriculum. */
export interface CurriculumSubject {
  title: string
  /** Official course code as published by IOE, e.g. `ENSH101` or `SH401`. */
  code?: string
  /** Slug of the course page when a syllabus exists in the catalogue. */
  slug?: string
  credits?: number
  /** Total marks (theory + practical). */
  marks?: number
  /** Marks an elective placeholder that points at an elective group. */
  electiveGroup?: string
}

/** One semester (IOE "part") of a curriculum year. */
export interface CurriculumPart {
  part: 1 | 2
  subjects: Array<CurriculumSubject>
}

/** One academic year of a program curriculum. */
export interface CurriculumYear {
  year: number
  parts: Array<CurriculumPart>
}

/** A named list of elective choices referenced from the curriculum. */
export interface ElectiveGroup {
  id: string
  title: string
  /** Official code range for the group, e.g. `ENCT325-344`. */
  codeRange?: string
  choices: Array<CurriculumSubject>
}

/** A program's full curriculum (2080 revision). */
export interface Curriculum {
  years: Array<CurriculumYear>
  electiveGroups?: Array<ElectiveGroup>
}

/** An undergraduate program offered at IOE. */
/** Career icon categories; each has an illustration in `assets/careers/`. */
export type CareerKind =
  | 'software'
  | 'networks'
  | 'data'
  | 'electronics'
  | 'construction'
  | 'structural'
  | 'water'
  | 'transport'
  | 'power'
  | 'manufacturing'
  | 'automotive'
  | 'aerospace'
  | 'surveying'
  | 'agriculture'
  | 'chemical'
  | 'architecture'

/**
 * Researched, source-cited program profile: what it covers, where it leads.
 * Lives in `data/program-profiles.ts`; every entry lists its `sources`.
 */
export interface ProgramProfile {
  /** Short paragraphs describing the program. */
  overview: Array<string>
  /** Core areas taught, grounded in the 2080 curriculum. */
  focusAreas: Array<string>
  /** Typical job roles for graduates, each tagged with an icon category. */
  careers: Array<{ title: string; description: string; kind: CareerKind }>
  /** Employer sectors in Nepal and abroad. */
  sectors: Array<string>
  higherStudies?: string
  /** Nepal Engineering Council registration note. */
  licensing?: string
  /** IOE constituent campuses offering the program. */
  campuses?: Array<string>
  sources: Array<string>
}

export interface Program {
  code: string
  name: string
  fullName: string
  degree: string
  durationYears: number
  description: string
  /** Career prospects and further-study outlook shown on the program page. */
  scope?: string
  curriculum?: Curriculum
  /**
   * Per-tab SEO overrides. Any omitted field falls back to the auto-generated
   * value. Keep titles/descriptions within the limits in `#/lib/constants/seo`
   * (checked at build time).
   */
  seoTitle?: string
  seoDescription?: string
  seoSubjectsTitle?: string
  seoSubjectsDescription?: string
  seoScopeTitle?: string
  seoScopeDescription?: string
}
