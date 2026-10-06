import type { College } from '#/features/colleges/types'

/**
 * The five IOE constituent campuses and ten TU-affiliated private colleges
 * that teach IOE bachelor programs, exactly as listed on the official IOE
 * BE/BArch admission portal (intake 2083). Program lists and seats come from
 * its seat-details page; constituent seats split into regular and full-fee.
 * Locations and founding years are from each college's own site (secondary
 * portals listed in `sources` where the official site was unreadable).
 */
export const COLLEGES: Array<College> = [
  {
    slug: 'pulchowk-campus',
    name: 'Pulchowk Campus',
    type: 'constituent',
    location: {
      city: 'Pulchowk, Lalitpur',
      district: 'Lalitpur',
      province: 'Bagmati',
      coordinates: { lat: 27.681112, lng: 85.318414 },
      mapsQuery: 'Pulchowk Campus, Institute of Engineering, Lalitpur',
    },
    established: 1972,
    website: 'https://pcampus.edu.np',
    contact: {
      email: ['campusadmin@pcampus.edu.np', 'admission@pcampus.edu.np'],
      phone: ['+977-1-5421260', '+977-1-5421611'],
    },
    programs: [
      { code: 'BCE', seats: 192, regular: 108, fullFee: 84 },
      { code: 'BArch', seats: 48, regular: 24, fullFee: 24 },
      { code: 'BEL', seats: 96, regular: 36, fullFee: 60 },
      { code: 'BEX', seats: 48, regular: 24, fullFee: 24 },
      { code: 'BME', seats: 48, regular: 24, fullFee: 24 },
      { code: 'BCT', seats: 96, regular: 36, fullFee: 60 },
      { code: 'BAE', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BCH', seats: 48, regular: 12, fullFee: 36 },
    ],
    seatsIntake: '2083',
    about:
      "The central campus of IOE, established in 1972 and offering bachelor's programs since 1984. It runs the widest range of IOE bachelor's programs, including the only Aerospace and Chemical Engineering programs.",
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/constituent',
      'https://pcampus.edu.np/',
    ],
  },
  {
    slug: 'thapathali-campus',
    name: 'Thapathali Campus',
    type: 'constituent',
    location: {
      city: 'Thapathali, Kathmandu',
      district: 'Kathmandu',
      province: 'Bagmati',
      coordinates: { lat: 27.694035, lng: 85.316251 },
      mapsQuery: 'IOE Thapathali Campus, Kathmandu',
    },
    website: 'https://tcioe.edu.np',
    contact: { email: ['info@tcioe.edu.np'], phone: ['+977-1-4259555'] },
    programs: [
      { code: 'BCE', seats: 144, regular: 36, fullFee: 108 },
      { code: 'BArch', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BEX', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BME', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BCT', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BIE', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BAM', seats: 48, regular: 12, fullFee: 36 },
    ],
    seatsIntake: '2083',
    about:
      "Formerly the Technical Training Institute, it became part of IOE in 1973. It started bachelor's programs with Industrial Engineering in 2006 and is the only IOE campus offering that program.",
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/constituent',
      'https://tcioe.edu.np/about',
      'https://tcioe.edu.np/sitemap.xml',
    ],
  },
  {
    slug: 'paschimanchal-campus',
    name: 'Paschimanchal Campus',
    type: 'constituent',
    location: {
      city: 'Lamachaur, Pokhara',
      district: 'Kaski',
      province: 'Gandaki',
      coordinates: { lat: 28.253893, lng: 83.974222 },
      mapsQuery: 'Paschimanchal Campus, Lamachaur, Pokhara',
    },
    established: 1987,
    website: 'https://wrc.edu.np',
    contact: {
      email: ['info@ioepas.edu.np'],
      phone: ['+977-61-443457', '+977-61-443463'],
    },
    programs: [
      { code: 'BCE', seats: 144, regular: 36, fullFee: 108 },
      { code: 'BEL', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BEX', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BME', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BCT', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BGE', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BAM', seats: 48, regular: 12, fullFee: 36 },
    ],
    seatsIntake: '2083',
    about:
      'Formerly the Western Region Campus, operational since 1987, it launched its first BE program (Civil) in 1999/2000. It is the only IOE campus offering Geomatics Engineering.',
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/constituent',
      'https://wrc.edu.np/',
      'https://wrc.edu.np/doece',
    ],
  },
  {
    slug: 'purwanchal-campus',
    name: 'Purwanchal Campus',
    type: 'constituent',
    location: {
      city: 'Tinkune, Dharan',
      district: 'Sunsari',
      province: 'Koshi',
      coordinates: { lat: 26.792705, lng: 87.289744 },
      mapsQuery: 'Purwanchal Campus, Dharan',
    },
    website: 'https://ioepc.edu.np',
    contact: { email: ['ioepcd@ioepc.edu.np'], phone: ['+977-25-520120'] },
    programs: [
      { code: 'BCE', seats: 144, regular: 36, fullFee: 108 },
      { code: 'BArch', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BEL', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BEX', seats: 48, regular: 12, fullFee: 36 },
      { code: 'BME', seats: 96, regular: 24, fullFee: 72 },
      { code: 'BCT', seats: 96, regular: 24, fullFee: 72 },
      { code: 'BAG', seats: 48, regular: 12, fullFee: 36 },
    ],
    seatsIntake: '2083',
    about:
      "Formerly the Eastern Region Campus in Dharan, it introduced Nepal's first BE in Agricultural Engineering in 2000 and now runs seven BE and BArch programs.",
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/constituent',
      'https://ioepc.edu.np/',
    ],
  },
  {
    slug: 'chitwan-engineering-campus',
    name: 'Chitwan Engineering Campus',
    type: 'constituent',
    location: {
      city: 'Rampur, Bharatpur',
      district: 'Chitwan',
      province: 'Bagmati',
      coordinates: { lat: 27.651828, lng: 84.347196 },
      mapsQuery: 'Chitwan Engineering Campus, Rampur, Bharatpur',
    },
    established: 2019,
    website: 'https://ioecc.edu.np',
    contact: {
      email: ['ccrampur@ioe.edu.np', 'admission@ioecc.edu.np'],
      phone: ['+977-56-591847'],
    },
    programs: [{ code: 'BArch', seats: 24, regular: 6, fullFee: 18 }],
    seatsIntake: '2083',
    about:
      "IOE's newest constituent campus, established in March 2019 at Rampur, Bharatpur. It began its Bachelor of Architecture program in August 2019 and currently offers only that program.",
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/constituent',
      'https://ioecc.edu.np/',
      'https://www.ioecc.edu.np/introduction-about-cec',
    ],
  },
  {
    slug: 'kantipur-engineering-college',
    name: 'Kantipur Engineering College',
    type: 'affiliated',
    location: {
      city: 'Dhapakhel, Lalitpur',
      district: 'Lalitpur',
      province: 'Bagmati',
      coordinates: { lat: 27.63727, lng: 85.333168 },
      mapsQuery: 'Kantipur Engineering College, Dhapakhel, Lalitpur',
    },
    established: 1998,
    website: 'https://kec.edu.np',
    contact: {
      email: ['admin@kec.edu.np'],
      phone: ['+977-1-5229204', '+977-1-5229005'],
    },
    programs: [
      { code: 'BCE', seats: 96 },
      { code: 'BEX', seats: 96 },
      { code: 'BCT', seats: 96 },
    ],
    seatsIntake: '2083',
    about:
      'A private engineering college affiliated with Tribhuvan University, established in 1998 at Dhapakhel near Satdobato.',
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/affiliated',
      'https://kec.edu.np/',
    ],
  },
  {
    slug: 'kathmandu-engineering-college',
    name: 'Kathmandu Engineering College',
    type: 'affiliated',
    location: {
      city: 'Kalimati, Kathmandu',
      district: 'Kathmandu',
      province: 'Bagmati',
      coordinates: { lat: 27.699141, lng: 85.297624 },
      mapsQuery: 'Kathmandu Engineering College, Kalimati, Kathmandu',
    },
    website: 'https://kecktm.edu.np',
    contact: {
      email: ['info@kecktm.edu.np'],
      phone: ['+977-1-5372833', '+977-1-5372653'],
    },
    programs: [
      { code: 'BCE', seats: 96 },
      { code: 'BArch', seats: 48 },
      { code: 'BEL', seats: 48 },
      { code: 'BEX', seats: 96 },
      { code: 'BCT', seats: 96 },
    ],
    seatsIntake: '2083',
    about:
      'A private engineering college at Kalimati, Kathmandu, affiliated with Tribhuvan University. It offers five BE and BArch programs, including Electrical Engineering and Architecture.',
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/affiliated',
      'https://kecktm.edu.np/',
      'https://www.educatenepal.com/institutions/detail/kathmandu-engineering-college',
    ],
  },
  {
    slug: 'himalaya-college-of-engineering',
    name: 'Himalaya College of Engineering',
    shortName: 'HCOE',
    type: 'affiliated',
    location: {
      city: 'Chyasal, Lalitpur',
      district: 'Lalitpur',
      province: 'Bagmati',
      coordinates: { lat: 27.677, lng: 85.330934 },
      mapsQuery: 'Himalaya College of Engineering, Chyasal, Lalitpur',
    },
    established: 2000,
    website: 'https://hcoe.edu.np',
    contact: {
      email: ['info@hcoe.edu.np'],
      phone: ['+977-1-5440555', '+977-1-5454287'],
    },
    programs: [
      { code: 'BCE', seats: 96 },
      { code: 'BArch', seats: 48 },
      { code: 'BEX', seats: 48 },
      { code: 'BCT', seats: 48 },
    ],
    seatsIntake: '2083',
    about:
      'A private college established in June 2000 and affiliated with Tribhuvan University. Alongside its IOE programs, including Architecture, it also teaches non-engineering TU programs.',
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/affiliated',
      'https://hcoe.edu.np/',
      'https://edusanjal.com/college/himalaya-college-engineering',
    ],
  },
  {
    slug: 'advanced-college-of-engineering-and-management',
    name: 'Advanced College of Engineering and Management',
    shortName: 'ACEM',
    type: 'affiliated',
    location: {
      city: 'Kalanki, Kathmandu',
      district: 'Kathmandu',
      province: 'Bagmati',
      coordinates: { lat: 27.690858, lng: 85.281893 },
      mapsQuery:
        'Advanced College of Engineering and Management, Kalanki, Kathmandu',
    },
    established: 2000,
    website: 'https://www.acem.edu.np',
    contact: {
      email: ['info@acem.edu.np'],
      phone: ['+977-1-5234288', '+977-1-5234128'],
    },
    programs: [
      { code: 'BCE', seats: 96 },
      { code: 'BEL', seats: 48 },
      { code: 'BEX', seats: 96 },
      { code: 'BCT', seats: 96 },
    ],
    seatsIntake: '2083',
    about:
      'A private college at Kalanki, Kathmandu, established in 2000 (2057 BS) and affiliated with Tribhuvan University.',
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/affiliated',
      'https://www.acem.edu.np/',
    ],
  },
  {
    slug: 'national-college-of-engineering',
    name: 'National College of Engineering',
    shortName: 'NCE',
    type: 'affiliated',
    location: {
      city: 'Talchhikhel, Lalitpur',
      district: 'Lalitpur',
      province: 'Bagmati',
      coordinates: { lat: 27.655786, lng: 85.320257 },
      mapsQuery: 'National College of Engineering, Talchhikhel, Lalitpur',
    },
    established: 2001,
    website: 'https://nce.edu.np',
    contact: { phone: ['+977-1-5151065', '+977-1-5151170'] },
    programs: [
      { code: 'BCE', seats: 96 },
      { code: 'BEL', seats: 48 },
      { code: 'BEX', seats: 48 },
      { code: 'BCT', seats: 48 },
    ],
    seatsIntake: '2083',
    about:
      'A private college at Talchhikhel, Lalitpur, established in 2001 (2058 BS) and affiliated with Tribhuvan University.',
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/affiliated',
      'https://nce.edu.np/',
    ],
  },
  {
    slug: 'kathford-international-college-of-engineering-and-management',
    name: 'Kathford International College of Engineering and Management',
    shortName: 'Kathford',
    type: 'affiliated',
    location: {
      city: 'Balkumari, Lalitpur',
      district: 'Lalitpur',
      province: 'Bagmati',
      coordinates: { lat: 27.670881, lng: 85.340132 },
      mapsQuery:
        'Kathford International College of Engineering and Management, Balkumari, Lalitpur',
    },
    established: 2003,
    website: 'https://kathford.edu.np',
    contact: {
      email: ['info@kathford.edu.np'],
      phone: ['+977-1-5201241', '+977-1-5186046'],
    },
    programs: [
      { code: 'BCE', seats: 96 },
      { code: 'BEX', seats: 48 },
      { code: 'BCT', seats: 48 },
    ],
    seatsIntake: '2083',
    about:
      'A private college affiliated with Tribhuvan University, established in 2003. It started with management education before adding engineering and IT programs.',
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/affiliated',
      'https://kathford.edu.np/',
      'https://www.collegenp.com/college/kathford-international-college-of-engineering-and-management-lalitpur',
    ],
  },
  {
    slug: 'imperial-college-of-engineering',
    name: 'Imperial College of Engineering',
    formerName: 'Janakpur Engineering College',
    type: 'affiliated',
    location: {
      city: 'Tathali, Bhaktapur',
      district: 'Bhaktapur',
      province: 'Bagmati',
      coordinates: { lat: 27.670313, lng: 85.470187 },
      mapsQuery: 'Imperial College of Engineering, Tathali, Bhaktapur',
    },
    established: 2001,
    website: 'https://icenepal.com',
    contact: { email: ['info@jec.edu.np'], phone: ['+977-1-5091616'] },
    programs: [
      { code: 'BCE', seats: 96 },
      { code: 'BEX', seats: 48 },
      { code: 'BCT', seats: 48 },
    ],
    seatsIntake: '2083',
    about:
      'Affiliated with Tribhuvan University since 2058 BS (2001) as Janakpur Engineering College. Renamed Imperial College of Engineering, it moved from Kupondole, Lalitpur to Tathali, Bhaktapur in 2082 BS. IOE admission notices may still list it under its former name.',
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/affiliated',
      'https://icenepal.com/',
    ],
  },
  {
    slug: 'khwopa-college-of-engineering',
    name: 'Khwopa College of Engineering',
    type: 'affiliated',
    location: {
      city: 'Libali, Bhaktapur',
      district: 'Bhaktapur',
      province: 'Bagmati',
      coordinates: { lat: 27.670987, lng: 85.4392 },
      mapsQuery: 'Khwopa College of Engineering, Libali, Bhaktapur',
    },
    established: 2008,
    website: 'https://khwopa.edu.np',
    contact: {
      email: ['info@khwopa.edu.np'],
      phone: ['+977-1-5122012', '+977-1-5122098'],
    },
    programs: [
      { code: 'BCE', seats: 96 },
      { code: 'BEL', seats: 48 },
      { code: 'BCT', seats: 48 },
    ],
    seatsIntake: '2083',
    about:
      'An engineering college run by Bhaktapur Municipality, established in 2008 and affiliated with Tribhuvan University.',
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/affiliated',
      'https://khwopa.edu.np/',
    ],
  },
  {
    slug: 'sagarmatha-engineering-college',
    name: 'Sagarmatha Engineering College',
    shortName: 'SEC',
    type: 'affiliated',
    location: {
      city: 'Sanepa, Lalitpur',
      district: 'Lalitpur',
      province: 'Bagmati',
      coordinates: { lat: 27.688178, lng: 85.302629 },
      mapsQuery: 'Sagarmatha Engineering College, Sanepa, Lalitpur',
    },
    established: 2010,
    website: 'https://sagarmatha.edu.np',
    contact: {
      email: ['info@sagarmatha.edu.np'],
      phone: ['+977-1-5911274', '+977-1-5911275'],
    },
    programs: [
      { code: 'BCE', seats: 48 },
      { code: 'BEX', seats: 48 },
      { code: 'BCT', seats: 48 },
    ],
    seatsIntake: '2083',
    about:
      'A private engineering college at Sanepa, Lalitpur, established in 2010 and affiliated with IOE, Tribhuvan University.',
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/affiliated',
      'https://sagarmatha.edu.np/',
    ],
  },
  {
    slug: 'lalitpur-engineering-college',
    name: 'Lalitpur Engineering College',
    shortName: 'LEC',
    type: 'affiliated',
    location: {
      city: 'Chakupat, Lalitpur',
      district: 'Lalitpur',
      province: 'Bagmati',
      coordinates: { lat: 27.680772, lng: 85.323476 },
      mapsQuery: 'Lalitpur Engineering College, Chakupat, Lalitpur',
    },
    website: 'https://lec.edu.np',
    contact: { email: ['info@lec.edu.np'], phone: ['+977-1-5268216'] },
    programs: [
      { code: 'BCE', seats: 48 },
      { code: 'BCT', seats: 48 },
    ],
    seatsIntake: '2083',
    about:
      'A private engineering college at Chakupat near Patan Dhoka, Lalitpur, affiliated with Tribhuvan University. It offers Civil and Computer Engineering.',
    sources: [
      'https://admission.ioe.edu.np/be/2083/public/seat-details',
      'https://admission.ioe.edu.np/be/2083/public/college-campus-detail/affiliated',
      'https://lec.edu.np/about-us/',
    ],
  },
]
