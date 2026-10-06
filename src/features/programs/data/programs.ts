import { CURRICULA_2080 } from './curricula-2080.generated.ts'
import type { Program } from '#/features/programs/types'

/**
 * Program catalogue. Curricula come from the official IOE 2080-revision
 * curriculum pages (see `curricula-2080.generated.ts` and
 * `docs/ioe-curriculum-research.md`).
 */
export const PROGRAMS: Array<Program> = [
  {
    code: 'BCT',
    name: 'Computer Engineering',
    fullName: 'Bachelor in Computer Engineering',
    degree: 'B.E. · IOE / TU',
    durationYears: 4,
    description:
      'Computing fundamentals, software engineering, networks and embedded systems: the most sought-after program at IOE.',
    scope:
      "BCT graduates work as software engineers, network and systems engineers, data and machine-learning engineers, and embedded developers, across Nepal's IT industry, telecom, banking, startups and international remote roles. Many continue to MSc/ME and PhD study in Nepal or abroad, or move into research and entrepreneurship.",
    seoTitle: 'BCT Computer Engineering: Syllabus & Subjects',
    seoDescription:
      'IOE Computer Engineering (BCT): year & semester-wise syllabus, subjects, credits and career scope. Software, networks, data and embedded systems.',
    seoSubjectsTitle: 'BCT Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Computer Engineering (BCT) in the IOE 2080 curriculum.',
    seoScopeTitle: 'BCT Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Computer Engineering (BCT) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BCT,
  },
  {
    code: 'BCE',
    name: 'Civil Engineering',
    fullName: 'Bachelor in Civil Engineering',
    degree: 'B.E. · IOE / TU',
    durationYears: 4,
    description:
      'Structures, hydraulics, transportation and construction management: the largest engineering discipline at IOE.',
    scope:
      'BCE graduates join construction companies, design consultancies, hydropower developers and government bodies (Department of Roads, NEA, municipalities) as site, structural, transportation or water-resource engineers. The Nepal Engineering Council licence opens public-sector careers, and many pursue MSc/ME study in structural, geotechnical or water resources engineering.',
    seoTitle: 'BCE Civil Engineering: Syllabus & Subjects',
    seoDescription:
      'IOE Civil Engineering (BCE): year & semester-wise syllabus, subjects, credits and career scope. Structures, hydraulics and construction.',
    seoSubjectsTitle: 'BCE Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Civil Engineering (BCE) in the IOE 2080 curriculum.',
    seoScopeTitle: 'BCE Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Civil Engineering (BCE) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BCE,
  },
  {
    code: 'BEX',
    name: 'Electronics & Communication',
    fullName:
      'Bachelor in Electronics, Communication & Information Engineering',
    degree: 'B.E. · IOE / TU',
    durationYears: 4,
    description:
      'Communication systems, signal processing, and information engineering.',
    seoTitle: 'BEX Electronics & Communication: Syllabus & Subjects',
    seoDescription:
      'IOE Electronics, Communication & Information Engineering (BEX): syllabus, subjects, credits and career scope by year and semester.',
    seoSubjectsTitle: 'BEX Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Electronics & Communication (BEX) in the IOE curriculum.',
    seoScopeTitle: 'BEX Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Electronics & Communication (BEX) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BEX,
  },
  {
    code: 'BME',
    name: 'Mechanical Engineering',
    fullName: 'Bachelor in Mechanical Engineering',
    degree: 'B.E. · IOE / TU',
    durationYears: 4,
    description: 'Thermodynamics, design, manufacturing and energy systems.',
    seoTitle: 'BME Mechanical Engineering: Syllabus & Subjects',
    seoDescription:
      'IOE Mechanical Engineering (BME): year & semester-wise syllabus, subjects, credits and career scope. Thermodynamics, design and energy.',
    seoSubjectsTitle: 'BME Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Mechanical Engineering (BME) in the IOE 2080 curriculum.',
    seoScopeTitle: 'BME Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Mechanical Engineering (BME) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BME,
  },
  {
    code: 'BEL',
    name: 'Electrical Engineering',
    fullName: 'Bachelor in Electrical Engineering',
    degree: 'B.E. · IOE / TU',
    durationYears: 4,
    description: 'Power systems, machines and high-voltage engineering.',
    seoTitle: 'BEL Electrical Engineering: Syllabus & Subjects',
    seoDescription:
      'IOE Electrical Engineering (BEL): year & semester-wise syllabus, subjects, credits and career scope. Power systems, machines and drives.',
    seoSubjectsTitle: 'BEL Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Electrical Engineering (BEL) in the IOE 2080 curriculum.',
    seoScopeTitle: 'BEL Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Electrical Engineering (BEL) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BEL,
  },
  {
    code: 'BGE',
    name: 'Geomatics Engineering',
    fullName: 'Bachelor in Geomatics Engineering',
    degree: 'B.E. · IOE / TU',
    durationYears: 4,
    description: 'Surveying, GIS, remote sensing and land administration.',
    seoTitle: 'BGE Geomatics Engineering: Syllabus & Subjects',
    seoDescription:
      'IOE Geomatics Engineering (BGE): year & semester-wise syllabus, subjects, credits and career scope. Surveying, GIS and remote sensing.',
    seoSubjectsTitle: 'BGE Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Geomatics Engineering (BGE) in the IOE 2080 curriculum.',
    seoScopeTitle: 'BGE Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Geomatics Engineering (BGE) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BGE,
  },
  {
    code: 'BIE',
    name: 'Industrial Engineering',
    fullName: 'Bachelor in Industrial Engineering',
    degree: 'B.E. · IOE / TU',
    durationYears: 4,
    description:
      'Production systems, operations research and industrial management.',
    seoTitle: 'BIE Industrial Engineering: Syllabus & Subjects',
    seoDescription:
      'IOE Industrial Engineering (BIE): year & semester-wise syllabus, subjects, credits and career scope. Production, operations and management.',
    seoSubjectsTitle: 'BIE Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Industrial Engineering (BIE) in the IOE 2080 curriculum.',
    seoScopeTitle: 'BIE Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Industrial Engineering (BIE) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BIE,
  },
  {
    code: 'BAM',
    name: 'Automobile Engineering',
    fullName: 'Bachelor in Automobile Engineering',
    degree: 'B.E. · IOE / TU',
    durationYears: 4,
    description:
      'Vehicle systems, powertrains and automotive maintenance engineering.',
    seoTitle: 'BAM Automobile Engineering: Syllabus & Subjects',
    seoDescription:
      'IOE Automobile Engineering (BAM): year & semester-wise syllabus, subjects, credits and career scope. Vehicle systems and powertrains.',
    seoSubjectsTitle: 'BAM Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Automobile Engineering (BAM) in the IOE 2080 curriculum.',
    seoScopeTitle: 'BAM Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Automobile Engineering (BAM) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BAM,
  },
  {
    code: 'BAG',
    name: 'Agriculture Engineering',
    fullName: 'Bachelor in Agriculture Engineering',
    degree: 'B.E. · IOE / TU',
    durationYears: 4,
    description:
      'Farm machinery, irrigation and post-harvest process engineering.',
    seoTitle: 'BAG Agriculture Engineering: Syllabus & Subjects',
    seoDescription:
      'IOE Agriculture Engineering (BAG): year & semester-wise syllabus, subjects, credits and career scope. Farm machinery and irrigation.',
    seoSubjectsTitle: 'BAG Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Agriculture Engineering (BAG) in the IOE 2080 curriculum.',
    seoScopeTitle: 'BAG Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Agriculture Engineering (BAG) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BAG,
  },
  {
    code: 'BAE',
    name: 'Aerospace Engineering',
    fullName: 'Bachelor in Aerospace Engineering',
    degree: 'B.E. · IOE / TU',
    durationYears: 4,
    description: 'Aerodynamics, flight mechanics and aircraft systems.',
    seoTitle: 'BAE Aerospace Engineering: Syllabus & Subjects',
    seoDescription:
      'IOE Aerospace Engineering (BAE): year & semester-wise syllabus, subjects, credits and career scope. Aerodynamics and aircraft systems.',
    seoSubjectsTitle: 'BAE Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Aerospace Engineering (BAE) in the IOE 2080 curriculum.',
    seoScopeTitle: 'BAE Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Aerospace Engineering (BAE) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BAE,
  },
  {
    code: 'BCH',
    name: 'Chemical Engineering',
    fullName: 'Bachelor in Chemical Engineering',
    degree: 'B.E. · IOE / TU',
    durationYears: 4,
    description:
      'Process engineering, unit operations, and industrial chemistry, introduced with the 2080 curriculum.',
    seoTitle: 'BCH Chemical Engineering: Syllabus & Subjects',
    seoDescription:
      'IOE Chemical Engineering (BCH): year & semester-wise syllabus, subjects, credits and career scope. Process engineering and unit operations.',
    seoSubjectsTitle: 'BCH Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Chemical Engineering (BCH) in the IOE 2080 curriculum.',
    seoScopeTitle: 'BCH Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Chemical Engineering (BCH) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BCH,
  },
  {
    code: 'BArch',
    name: 'Architecture',
    fullName: 'Bachelor of Architecture',
    degree: 'B.Arch · IOE / TU',
    durationYears: 5,
    description: 'Architectural design, building science and urban planning.',
    seoTitle: 'BArch Architecture: Syllabus & Subjects',
    seoDescription:
      'IOE Bachelor of Architecture (BArch): year & semester-wise syllabus, subjects, credits and career scope. Design and urban planning.',
    seoSubjectsTitle: 'BArch Subjects by Semester (2080 Curriculum)',
    seoSubjectsDescription:
      'Year- and semester-wise subjects, course codes, credits and marks for Bachelor of Architecture (BArch) in the IOE curriculum.',
    seoScopeTitle: 'BArch Career Scope & Job Opportunities',
    seoScopeDescription:
      'Career paths, job roles and further-study options for IOE Bachelor of Architecture (BArch) graduates in Nepal and abroad.',
    curriculum: CURRICULA_2080.BAR,
  },
]
