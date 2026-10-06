/** IOE constituent campus vs TU-affiliated private college. */
export type CollegeType = 'constituent' | 'affiliated'

/** One bachelor program a college runs, with official seats when known. */
export interface CollegeProgram {
  /** Program code, e.g. `BCT`. */
  code: string
  /** Total seats for the intake. */
  seats?: number
  /** Constituent campuses only: government-funded (regular) seats. */
  regular?: number
  /** Constituent campuses only: full-fee paying seats. */
  fullFee?: number
}

/** A college teaching IOE bachelor programs. */
export interface College {
  slug: string
  name: string
  shortName?: string
  /** Previous official name, e.g. as still listed on IOE notices. */
  formerName?: string
  type: CollegeType
  location: {
    city: string
    district: string
    province: string
    /** Campus coordinates for the embedded map. */
    coordinates?: { lat: number; lng: number }
    /** Search text for Google Maps when coordinates are missing. */
    mapsQuery?: string
  }
  established?: number
  website?: string
  /** Official general email(s) and phone(s), as published by the college. */
  contact?: { email?: Array<string>; phone?: Array<string> }
  programs: Array<CollegeProgram>
  /** Intake year (BS) the seat numbers come from. */
  seatsIntake?: string
  about?: string
  sources: Array<string>
}
