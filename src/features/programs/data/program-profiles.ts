import type { ProgramProfile } from '#/features/programs/types'

/**
 * Program profiles keyed by program code. Compiled from official IOE, TU and
 * Nepal Engineering Council sources (listed per entry in `sources`); focus
 * areas are grounded in the 2080 curricula. Careers for programs without an
 * official careers page (BIE, BAM, BCH, BAE, BEL) are drawn from the
 * curriculum and the Nepali job market. BCH's first 2080 batch may not have
 * graduated yet.
 */
export const PROGRAM_PROFILES: Record<string, ProgramProfile | undefined> = {
  BCT: {
    overview: [
      'Computer Engineering is a four-year Bachelor of Engineering program that combines computer science with the electronics that computers are built on. Students start with programming, digital logic and circuits, then move on to data structures, operating systems, databases and computer architecture.',
      'Later semesters cover computer networks, software engineering, artificial intelligence, data science, distributed and cloud computing, and network security. The program ends with project work and an eight-week internship, so students graduate with practical experience of building and running software and hardware systems.',
    ],
    focusAreas: [
      'Programming and algorithms',
      'Computer architecture and microprocessors',
      'Operating systems and databases',
      'Computer networks and security',
      'Software engineering',
      'Artificial intelligence and data science',
      'Distributed and cloud computing',
    ],
    careers: [
      {
        title: 'Software engineer',
        description:
          'Designs, builds and maintains software, from backend services to user-facing apps.',
        kind: 'software',
      },
      {
        title: 'Web and mobile developer',
        description:
          'Builds websites and phone apps, handling both the interface and the code behind it.',
        kind: 'software',
      },
      {
        title: 'Network engineer',
        description:
          'Plans and runs the networks that connect offices, data centres and users.',
        kind: 'networks',
      },
      {
        title: 'DevOps or cloud engineer',
        description:
          'Automates how software is built, deployed and scaled on cloud servers.',
        kind: 'software',
      },
      {
        title: 'Data or machine learning engineer',
        description:
          'Builds data pipelines and trains models that find patterns or make predictions.',
        kind: 'data',
      },
      {
        title: 'Database administrator',
        description:
          'Keeps databases fast, backed up and secure for the systems that rely on them.',
        kind: 'data',
      },
      {
        title: 'Embedded systems developer',
        description:
          'Writes the firmware that runs inside devices, from sensors to controllers.',
        kind: 'electronics',
      },
      {
        title: 'Cybersecurity analyst',
        description:
          'Finds weaknesses in systems and responds to attacks before data is lost.',
        kind: 'networks',
      },
    ],
    sectors: [
      'Software and IT services companies',
      'Banks and financial institutions',
      'Telecom operators and internet providers',
      'Government IT bodies and public enterprises',
      'Startups and remote international teams',
      'Research and teaching institutions',
    ],
    higherStudies:
      "IOE runs related master's programs including Computer System and Knowledge Engineering, Data Science and Analytics, Informatics and Intelligent Systems Engineering, Information System Engineering, and Network and Cyber Security. Many graduates also pursue MS or MSc degrees in computer science and related fields abroad.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in their discipline.",
    campuses: [
      'Pulchowk Campus',
      'Thapathali Campus',
      'Purwanchal Campus',
      'Pashchimanchal Campus',
    ],
    sources: [
      'https://ioe.tu.edu.np/pages/computer-engineering-curriculum-structure-2635',
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://pcampus.edu.np/',
      'https://tcioe.edu.np/sitemap.xml',
      'https://ioepc.edu.np/',
      'https://wrc.edu.np/doece',
      'https://mcentral.ioepas.edu.np/public/college-campus-detail',
    ],
  },
  BCE: {
    overview: [
      'Civil Engineering is a four-year Bachelor of Engineering program about planning, designing and building infrastructure such as buildings, roads, bridges, water supply and hydropower. Students begin with mechanics, geology, surveying and construction materials before moving to structural analysis and soil mechanics.',
      'Later years cover the design of concrete, steel, timber and masonry structures, foundation engineering, hydraulics, hydrology, transportation, irrigation, sanitation and hydropower engineering. Survey camp, estimating and costing, and an internship give students field and project experience that matches the work of practising civil engineers.',
    ],
    focusAreas: [
      'Structural analysis and design',
      'Geotechnical and foundation engineering',
      'Hydraulics and water resources',
      'Transportation engineering',
      'Surveying',
      'Water supply and sanitation',
      'Construction estimating and management',
    ],
    careers: [
      {
        title: 'Site engineer',
        description:
          'Runs day-to-day construction on site, checking work against drawings, quality and safety.',
        kind: 'construction',
      },
      {
        title: 'Structural design engineer',
        description:
          'Calculates and designs beams, columns and foundations so structures stay safe.',
        kind: 'structural',
      },
      {
        title: 'Transportation or highway engineer',
        description: 'Plans and designs roads, junctions and traffic systems.',
        kind: 'transport',
      },
      {
        title: 'Water resources engineer',
        description:
          'Designs systems for irrigation, flood control and water supply.',
        kind: 'water',
      },
      {
        title: 'Hydropower engineer',
        description:
          'Plans and designs dams, tunnels and powerhouses for hydroelectric projects.',
        kind: 'water',
      },
      {
        title: 'Geotechnical engineer',
        description:
          'Studies soil and rock to design safe foundations, slopes and retaining walls.',
        kind: 'structural',
      },
      {
        title: 'Quantity surveyor or estimator',
        description:
          'Works out quantities and costs so projects are priced and billed correctly.',
        kind: 'construction',
      },
      {
        title: 'Project or construction manager',
        description:
          'Plans schedules, budgets and teams to deliver a project on time.',
        kind: 'construction',
      },
    ],
    sectors: [
      'Government departments (e.g. Department of Roads)',
      'Local governments and municipalities',
      'Hydropower developers',
      'Construction contractors',
      'Design and consulting firms',
      'Development agencies and NGOs',
    ],
    higherStudies:
      "IOE offers 11 civil engineering master's programs, including Structural, Water Resources, Environmental, Geotechnical, Transportation, Earthquake, Hydropower, and Construction Engineering and Management. Graduates also commonly go abroad for MSc or MEng study in structural, geotechnical, water resources or construction fields.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in their discipline.",
    campuses: [
      'Pulchowk Campus',
      'Thapathali Campus',
      'Purwanchal Campus',
      'Pashchimanchal Campus',
    ],
    sources: [
      'https://ioe.tu.edu.np/pages/civil-engineering-curriculum-structure-2583',
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://pcampus.edu.np/department-of-civil-engineering/',
      'https://tcioe.edu.np/about',
      'https://ioepc.edu.np/',
      'https://wrc.edu.np/',
      'https://mcentral.ioepas.edu.np/public/college-campus-detail',
    ],
  },
  BEX: {
    overview: [
      'Electronics, Communication and Information Engineering is a four-year Bachelor of Engineering program covering electronic circuits, communication systems and the computing that connects them. Students build foundations in circuit theory, digital logic, microprocessors, electromagnetics and signals and systems.',
      'Later semesters cover control systems, embedded systems, antennas and propagation, RF and microwave engineering, communication and wireless systems, telecommunication networks, digital signal processing and robotics. Project work and an eight-week internship let students apply this to real telecom, electronics or software problems.',
    ],
    focusAreas: [
      'Electronic circuits and devices',
      'Communication and wireless systems',
      'Signals and digital signal processing',
      'Embedded systems and microprocessors',
      'RF, microwave and antennas',
      'Telecommunication and computer networks',
      'Control systems and robotics',
    ],
    careers: [
      {
        title: 'Telecom or network engineer',
        description:
          'Designs and maintains mobile, fibre and data networks for telecom operators.',
        kind: 'networks',
      },
      {
        title: 'RF and wireless engineer',
        description:
          'Works on antennas and radio links that carry wireless signals.',
        kind: 'networks',
      },
      {
        title: 'Embedded systems engineer',
        description:
          'Designs the hardware and firmware inside electronic products.',
        kind: 'electronics',
      },
      {
        title: 'Electronics design engineer',
        description:
          'Designs circuits and printed circuit boards for electronic products.',
        kind: 'electronics',
      },
      {
        title: 'Software engineer',
        description:
          'Designs, builds and maintains software, from backend services to user-facing apps.',
        kind: 'software',
      },
      {
        title: 'Broadcast engineer',
        description:
          'Keeps radio and television transmission equipment running and on air.',
        kind: 'networks',
      },
      {
        title: 'Instrumentation and control engineer',
        description:
          'Designs sensors and control systems that monitor and run industrial processes.',
        kind: 'electronics',
      },
    ],
    sectors: [
      'Telecom operators and internet providers',
      'Broadcasting and media',
      'Electronics and embedded product firms',
      'Software and IT companies',
      'Government agencies and public enterprises',
      'Research and teaching institutions',
    ],
    higherStudies:
      "Related IOE master's programs include Information and Communication Engineering, Communications and Knowledge Engineering, Data Science and Analytics, and Network and Cyber Security. Graduates also study abroad in fields such as telecommunications, embedded systems, signal processing and computer science.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in their discipline.",
    campuses: [
      'Pulchowk Campus',
      'Thapathali Campus',
      'Purwanchal Campus',
      'Pashchimanchal Campus',
    ],
    sources: [
      'https://ioe.tu.edu.np/pages/electronics-engineering-curriculum-structure-2660',
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://pcampus.edu.np/',
      'https://tcioe.edu.np/sitemap.xml',
      'https://ioepc.edu.np/',
      'https://wrc.edu.np/doece',
      'https://mcentral.ioepas.edu.np/public/college-campus-detail',
    ],
  },
  BME: {
    overview: [
      'Mechanical Engineering is a four-year Bachelor of Engineering program about designing, making and maintaining machines and energy systems. Students study engineering mechanics, thermodynamics, materials science and manufacturing processes, along with strength of materials, metrology and instrumentation.',
      'Later years cover fluid mechanics and fluid machines, heat and mass transfer, theory of machines, machine design, control and automation, finite element methods and computational fluid dynamics. Courses in energy resources, management and entrepreneurship, plus an industrial attachment, prepare students for industry and energy work.',
    ],
    focusAreas: [
      'Thermodynamics and heat transfer',
      'Fluid mechanics and machines',
      'Machine design',
      'Manufacturing and production',
      'Materials and solid mechanics',
      'Control and automation',
      'Energy resources and technology',
    ],
    careers: [
      {
        title: 'Design engineer',
        description:
          'Turns requirements into detailed designs and drawings for machines and parts.',
        kind: 'manufacturing',
      },
      {
        title: 'Production or manufacturing engineer',
        description:
          'Sets up and improves the processes that turn materials into products.',
        kind: 'manufacturing',
      },
      {
        title: 'Maintenance engineer',
        description:
          'Keeps machines and plant running through inspection, repair and planned servicing.',
        kind: 'manufacturing',
      },
      {
        title: 'Energy or renewable energy engineer',
        description:
          'Designs and assesses solar, hydro and other energy systems.',
        kind: 'power',
      },
      {
        title: 'HVAC engineer',
        description:
          'Designs heating, ventilation and air conditioning for buildings.',
        kind: 'manufacturing',
      },
      {
        title: 'Hydropower electromechanical engineer',
        description:
          'Works on the turbines, generators and gates inside hydropower plants.',
        kind: 'water',
      },
      {
        title: 'Quality engineer',
        description:
          'Sets standards and checks that products meet them before they ship.',
        kind: 'manufacturing',
      },
      {
        title: 'Project engineer',
        description:
          'Coordinates the technical side of a project from design through installation.',
        kind: 'construction',
      },
    ],
    sectors: [
      'Manufacturing industries',
      'Hydropower developers',
      'Renewable energy companies',
      'Construction and building services firms',
      'Government agencies and public enterprises',
      'Research and teaching institutions',
    ],
    higherStudies:
      "IOE offers mechanical master's programs in Renewable Energy Engineering, Energy Systems Planning and Management, Mechanical Systems Design and Engineering, Design and Manufacturing, Technology and Innovation Management, and Mechanical Engineering. Graduates also go abroad for MSc study in mechanical, energy and manufacturing fields.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in their discipline.",
    campuses: [
      'Pulchowk Campus',
      'Thapathali Campus',
      'Purwanchal Campus',
      'Pashchimanchal Campus',
    ],
    sources: [
      'https://ioe.tu.edu.np/pages/mechanical-engineering-curriculum-structure-2661',
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://pcampus.edu.np/department-of-mechanical-engineering/',
      'https://tcioe.edu.np/about',
      'https://ioepc.edu.np/',
      'https://wrc.edu.np/auto-mechanical-engineering',
      'https://mcentral.ioepas.edu.np/public/college-campus-detail',
    ],
  },
  BEL: {
    overview: [
      'Electrical Engineering is a four-year Bachelor of Engineering program focused on generating, transmitting, distributing and using electric power. Students start with electric circuits, electronics, measurement and electrical engineering materials, then study electrical machines and power system analysis.',
      'Later years cover power electronics, control systems, switchgear and protection, high voltage engineering, transmission and distribution design, power plant engineering, electrical drives and industrial automation. A ten-week internship gives students hands-on experience in utilities, industry or project sites.',
    ],
    focusAreas: [
      'Electric circuits and machines',
      'Power system analysis',
      'Power electronics and drives',
      'Switchgear and protection',
      'High voltage engineering',
      'Transmission and distribution',
      'Industrial instrumentation and automation',
    ],
    careers: [
      {
        title: 'Power system engineer',
        description:
          'Plans and analyses how electricity is generated, transmitted and distributed.',
        kind: 'power',
      },
      {
        title: 'Protection engineer',
        description:
          'Designs the relays and settings that keep faults from damaging the grid.',
        kind: 'power',
      },
      {
        title: 'Electrical design engineer',
        description:
          'Designs wiring, lighting and power systems for buildings and plants.',
        kind: 'power',
      },
      {
        title: 'Substation or transmission engineer',
        description:
          'Builds and maintains substations and high-voltage transmission lines.',
        kind: 'power',
      },
      {
        title: 'Hydropower electrical engineer',
        description:
          'Handles the generators, switchyards and controls of hydropower plants.',
        kind: 'water',
      },
      {
        title: 'Electrical maintenance engineer',
        description:
          'Keeps electrical equipment and machines in factories and plants running safely.',
        kind: 'power',
      },
      {
        title: 'Automation engineer',
        description:
          'Programs controllers and systems that run machines and processes automatically.',
        kind: 'electronics',
      },
    ],
    sectors: [
      'Nepal Electricity Authority and power utilities',
      'Hydropower developers',
      'Electrical contractors and consultancies',
      'Manufacturing and industrial plants',
      'Building services and design firms',
      'Research and teaching institutions',
    ],
    higherStudies:
      "IOE offers master's programs in Power System Engineering, Distributed Generation Engineering, and Power Electronics and Drives. Graduates also go abroad for MSc study in power systems, renewable energy and electrical engineering.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in their discipline.",
    campuses: ['Pulchowk Campus', 'Purwanchal Campus', 'Pashchimanchal Campus'],
    sources: [
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://pcampus.edu.np/department-of-electrical-engineering/',
      'https://ioepc.edu.np/',
      'https://wrc.edu.np/',
      'https://mcentral.ioepas.edu.np/public/college-campus-detail',
    ],
  },
  BGE: {
    overview: [
      'Geomatics Engineering, also called geospatial engineering, is a four-year Bachelor of Engineering program about collecting, analysing and managing information on the location and shape of land and other features. Students learn surveying, geodesy, photogrammetry, cartography and the theory of errors behind accurate measurement.',
      'Later semesters cover geographic information systems, remote sensing, satellite positioning (GNSS), geospatial databases, cadastral and land information systems, land administration and law, digital terrain models and spatial data infrastructure. Survey camp and an internship give students field experience with modern survey instruments.',
    ],
    focusAreas: [
      'Surveying and control survey',
      'Geodesy and GNSS',
      'Photogrammetry',
      'GIS and cartography',
      'Remote sensing',
      'Cadastre and land administration',
      'Spatial data infrastructure',
    ],
    careers: [
      {
        title: 'Survey engineer',
        description:
          'Measures land and structures precisely for maps, boundaries and construction.',
        kind: 'surveying',
      },
      {
        title: 'GIS analyst',
        description:
          'Builds and analyses digital maps to answer planning and resource questions.',
        kind: 'surveying',
      },
      {
        title: 'Remote sensing specialist',
        description:
          'Interprets satellite and aerial images to study land, water and change over time.',
        kind: 'surveying',
      },
      {
        title: 'Cadastral surveyor',
        description:
          'Measures and records land parcels and their legal boundaries.',
        kind: 'surveying',
      },
      {
        title: 'Photogrammetry or mapping engineer',
        description:
          'Creates maps and 3D models from aerial and drone photographs.',
        kind: 'surveying',
      },
      {
        title: 'Construction survey engineer',
        description:
          'Sets out roads, buildings and bridges on the ground from design drawings.',
        kind: 'construction',
      },
      {
        title: 'Geospatial data analyst',
        description:
          'Cleans and analyses location data for planning, business or research.',
        kind: 'data',
      },
    ],
    sectors: [
      'Survey Department and land management agencies',
      'Urban planning and municipal bodies',
      'Infrastructure and construction projects',
      'GIS and mapping firms',
      'NGOs and INGOs',
      'Research and teaching institutions',
    ],
    higherStudies:
      "IOE offers a master's program in Geospatial Engineering. Graduates also go abroad for MSc study in geomatics, GIS, remote sensing and land administration.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in their discipline.",
    campuses: ['Pashchimanchal Campus'],
    sources: [
      'https://ioe.tu.edu.np/pages/geometics-engineering-curriculum-structure-2663',
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://wrc.edu.np/geomatics-engineering',
      'https://mcentral.ioepas.edu.np/public/college-campus-detail',
    ],
  },
  BIE: {
    overview: [
      'Industrial Engineering is a four-year Bachelor of Engineering program about making production and service systems run better. Students take a mechanical engineering base, including mechanics, thermodynamics, materials, manufacturing processes and machine design, alongside industrial management and economics.',
      'The program then covers work study and human factors, operations research, supply chain management, quality control, maintenance and reliability, industrial layout and value engineering. Group work, a seminar paper, courses in entrepreneurship and industrial law, and a twelve-week internship prepare students for roles in industry.',
    ],
    focusAreas: [
      'Operations research',
      'Supply chain management',
      'Quality control and management',
      'Work study and ergonomics',
      'Industrial layout and design',
      'Maintenance and reliability',
      'Manufacturing processes',
    ],
    careers: [
      {
        title: 'Industrial engineer',
        description:
          'Improves how people, machines and materials work together in a system.',
        kind: 'manufacturing',
      },
      {
        title: 'Production planning engineer',
        description:
          'Schedules production so orders are made on time with the least waste.',
        kind: 'manufacturing',
      },
      {
        title: 'Quality assurance engineer',
        description:
          'Builds the systems and checks that keep product quality consistent.',
        kind: 'manufacturing',
      },
      {
        title: 'Supply chain or logistics analyst',
        description:
          'Plans how materials and goods move from suppliers to customers.',
        kind: 'transport',
      },
      {
        title: 'Operations manager',
        description:
          'Runs daily operations of a plant or service and keeps costs in check.',
        kind: 'manufacturing',
      },
      {
        title: 'Maintenance engineer',
        description:
          'Keeps machines and plant running through inspection, repair and planned servicing.',
        kind: 'manufacturing',
      },
      {
        title: 'Process improvement engineer',
        description:
          'Finds and fixes bottlenecks to make processes faster and cheaper.',
        kind: 'manufacturing',
      },
    ],
    sectors: [
      'Manufacturing industries',
      'Logistics and supply chain firms',
      'Banks and service companies',
      'Consulting firms',
      'Government agencies and public enterprises',
      'Startups and entrepreneurship',
    ],
    higherStudies:
      "Related IOE master's programs include Technology and Innovation Management and Design and Manufacturing. Graduates also go abroad for MSc study in industrial engineering, operations management and engineering management.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in their discipline.",
    campuses: ['Thapathali Campus'],
    sources: [
      'https://ioe.tu.edu.np/pages/industrial-engineering-curriculum-structure-2658',
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://tcioe.edu.np/about',
      'https://tcioe.edu.np/sitemap.xml',
      'https://mcentral.ioepas.edu.np/public/college-campus-detail',
    ],
  },
  BAM: {
    overview: [
      'Automobile Engineering is a four-year Bachelor of Engineering program about the design, operation and servicing of vehicles. It shares a mechanical engineering base with mechanics, thermodynamics, materials, manufacturing, fluid mechanics and theory of machines.',
      'Vehicle-specific courses cover automobile engines, chassis, vehicle dynamics, component design, hydraulic and pneumatic systems, engine combustion and pollution control, and electric and hybrid vehicles. Automobile repair and service management, entrepreneurship and an eight-week industrial attachment connect the program to the transport sector.',
    ],
    focusAreas: [
      'Automobile engines',
      'Vehicle dynamics and chassis',
      'Electric and hybrid vehicles',
      'Automobile component design',
      'Combustion and emission control',
      'Repair and service management',
      'Thermal and fluid systems',
    ],
    careers: [
      {
        title: 'Automobile engineer',
        description:
          'Works on the design, testing and servicing of vehicles and their systems.',
        kind: 'automotive',
      },
      {
        title: 'Service or workshop manager',
        description:
          'Runs a vehicle workshop, from diagnosis and repair to customer service.',
        kind: 'automotive',
      },
      {
        title: 'Vehicle design engineer',
        description:
          'Designs vehicle components such as chassis, suspension and body parts.',
        kind: 'automotive',
      },
      {
        title: 'EV technical specialist',
        description:
          'Services and troubleshoots electric vehicles, batteries and chargers.',
        kind: 'automotive',
      },
      {
        title: 'Vehicle inspection engineer',
        description:
          'Checks vehicles for safety, emissions and roadworthiness.',
        kind: 'automotive',
      },
      {
        title: 'Fleet maintenance engineer',
        description:
          "Keeps a company's buses, trucks or cars maintained and on the road.",
        kind: 'automotive',
      },
      {
        title: 'Sales and technical support engineer',
        description:
          'Helps customers choose, use and troubleshoot vehicles and equipment.',
        kind: 'automotive',
      },
    ],
    sectors: [
      'Vehicle dealers and service centres',
      'Electric vehicle companies',
      'Public and private transport operators',
      'Government transport agencies',
      'Manufacturing and assembly industries',
      'Research and teaching institutions',
    ],
    higherStudies:
      "IOE does not list a dedicated automobile master's program, so graduates often take mechanical-related IOE programs such as Mechanical Systems Design and Engineering, Design and Manufacturing, or Energy Systems Planning and Management. Others go abroad for MSc study in automotive or mechanical engineering.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in their discipline.",
    campuses: ['Thapathali Campus', 'Pashchimanchal Campus'],
    sources: [
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://tcioe.edu.np/about',
      'https://tcioe.edu.np/sitemap.xml',
      'https://wrc.edu.np/auto-mechanical-engineering',
      'https://mcentral.ioepas.edu.np/public/college-campus-detail',
    ],
  },
  BAG: {
    overview: [
      'Agricultural Engineering is a four-year Bachelor of Engineering program that applies engineering to farming, food production and rural development. Students build a base in mechanics, fluid mechanics, soil science, surveying and structures, alongside courses on crop production and agricultural economics.',
      'Core areas include farm power and tractors, farm machinery, irrigation and drainage, groundwater and tube wells, soil and water conservation, post-harvest, dairy and food engineering, cold storage, renewable energy, farm structures and precision agriculture. Survey camp and an internship add field experience.',
    ],
    focusAreas: [
      'Farm power and machinery',
      'Irrigation and drainage',
      'Soil and water conservation',
      'Post-harvest and food engineering',
      'Renewable energy systems',
      'Farm structures and rural infrastructure',
      'Precision agriculture',
    ],
    careers: [
      {
        title: 'Agricultural engineer',
        description:
          'Applies engineering to farming, from machinery to land and water use.',
        kind: 'agriculture',
      },
      {
        title: 'Irrigation engineer',
        description:
          'Designs canals, pumps and drip systems that bring water to fields.',
        kind: 'agriculture',
      },
      {
        title: 'Farm machinery engineer',
        description:
          'Designs, adapts and maintains tractors and farm equipment.',
        kind: 'agriculture',
      },
      {
        title: 'Post-harvest or food process engineer',
        description:
          'Designs storage and processing that keeps crops and food from spoiling.',
        kind: 'chemical',
      },
      {
        title: 'Renewable energy engineer',
        description:
          'Designs solar, biogas and micro hydro systems, often for rural use.',
        kind: 'power',
      },
      {
        title: 'Rural infrastructure engineer',
        description:
          'Plans small roads, water systems and structures for rural communities.',
        kind: 'construction',
      },
      {
        title: 'Agricultural extension officer',
        description: 'Advises farmers on new techniques, tools and practices.',
        kind: 'agriculture',
      },
    ],
    sectors: [
      'Government agriculture and irrigation agencies',
      'Local governments',
      'Agro-processing and food industries',
      'Farm machinery suppliers',
      'Development agencies, NGOs and INGOs',
      'Research and teaching institutions',
    ],
    higherStudies:
      "IOE offers a Land and Water Engineering master's program under its Civil and Agriculture Engineering group, and graduates may also consider programs such as Renewable Energy Engineering or Water Resources Engineering. Others go abroad for MSc study in agricultural, biosystems or water engineering.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in their discipline.",
    campuses: ['Purwanchal Campus'],
    sources: [
      'https://ioe.tu.edu.np/pages/agriculture-engineering-curriculum-structure-2664',
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://www.ioepc.edu.np/agricultural-engineering/',
      'https://mcentral.ioepas.edu.np/public/college-campus-detail',
    ],
  },
  BAE: {
    overview: [
      "Aerospace Engineering is a four-year Bachelor of Engineering program about aircraft and other flying systems. Pulchowk Campus started Nepal's first aerospace program in 2018. Students take a mechanical base of mechanics, thermodynamics, materials and machine design, then move to aerospace topics.",
      'Aerospace courses cover aerodynamics, flight dynamics, aircraft propulsion, aircraft structures, composite materials, avionics, aircraft systems and manufacturing, unmanned aerial systems and CubeSats. Students also study aviation maintenance, human factors and professional practice, use finite element and CFD tools, and complete an industrial attachment.',
    ],
    focusAreas: [
      'Aerodynamics and CFD',
      'Flight dynamics and control',
      'Aircraft propulsion',
      'Aircraft structures and composites',
      'Avionics and aircraft systems',
      'Unmanned aerial systems',
      'Aviation maintenance engineering',
    ],
    careers: [
      {
        title: 'Aerospace design engineer',
        description:
          'Designs aircraft parts and systems for performance and safety.',
        kind: 'aerospace',
      },
      {
        title: 'Aircraft maintenance engineer',
        description: 'Inspects and repairs aircraft so they stay airworthy.',
        kind: 'aerospace',
      },
      {
        title: 'Stress or structures engineer',
        description:
          'Analyses aircraft structures to make sure they carry loads safely.',
        kind: 'structural',
      },
      {
        title: 'CFD analyst',
        description:
          'Simulates air and fluid flow on computers to test designs before building.',
        kind: 'aerospace',
      },
      {
        title: 'Drone or UAV engineer',
        description:
          'Builds and programs drones for mapping, delivery or inspection.',
        kind: 'aerospace',
      },
      {
        title: 'Avionics engineer',
        description:
          'Works on the electronics for navigation, communication and flight control.',
        kind: 'electronics',
      },
      {
        title: 'Aviation safety officer',
        description:
          'Checks that flight operations and maintenance follow safety rules.',
        kind: 'aerospace',
      },
    ],
    sectors: [
      'Global aircraft manufacturers (e.g. Airbus)',
      'Airlines and maintenance organisations',
      'Civil aviation authorities',
      'Drone and UAV companies',
      'Engineering design and analysis firms',
      'Research and teaching institutions',
    ],
    higherStudies:
      "IOE does not list a dedicated aerospace master's program, so graduates often go abroad for MSc study in aerospace, aeronautical or mechanical engineering. Within IOE, mechanical-related programs such as Mechanical Systems Design and Engineering are an option.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in their discipline.",
    campuses: ['Pulchowk Campus'],
    sources: [
      'https://ioe.tu.edu.np/pages/aerospace-engineering-curriculum-structure-2652',
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://pcampus.edu.np/',
      'https://mcentral.ioepas.edu.np/public/college-campus-detail',
      'https://kathmandupost.com/national/2026/07/14/twenty-one-pulchowk-graduates-join-airbus-this-year',
    ],
  },
  BCH: {
    overview: [
      'Chemical Engineering is a four-year Bachelor of Engineering program about turning raw materials into useful products through chemical and physical processes. Students study chemistry, process calculations, fluid mechanics, thermodynamics and heat transfer before moving to core chemical engineering subjects.',
      'Core courses cover mass transfer, chemical reaction engineering, transport phenomena, mechanical operations, process dynamics and control, fuels and combustion, corrosion, biochemical engineering and pollution control. Later years include process modelling and simulation, equipment and plant design, maintenance and safety, and an internship.',
    ],
    focusAreas: [
      'Chemical process calculations',
      'Mass and heat transfer',
      'Chemical reaction engineering',
      'Process dynamics and control',
      'Process and plant design',
      'Environmental pollution control',
      'Biochemical engineering',
    ],
    careers: [
      {
        title: 'Process engineer',
        description:
          'Designs and runs the chemical and physical steps that make a product.',
        kind: 'chemical',
      },
      {
        title: 'Production engineer',
        description:
          "Keeps a plant's production running efficiently and on target.",
        kind: 'chemical',
      },
      {
        title: 'Quality control engineer',
        description: 'Tests raw materials and products against specifications.',
        kind: 'chemical',
      },
      {
        title: 'Plant design engineer',
        description:
          'Lays out equipment, piping and flows for new or expanded plants.',
        kind: 'chemical',
      },
      {
        title: 'Environmental engineer',
        description:
          'Treats water, air and waste so industry meets environmental limits.',
        kind: 'water',
      },
      {
        title: 'Health and safety engineer',
        description:
          'Identifies hazards in plants and puts controls in place to prevent accidents.',
        kind: 'construction',
      },
      {
        title: 'Research and development engineer',
        description: 'Develops and tests new products, materials or processes.',
        kind: 'data',
      },
    ],
    sectors: [
      'Cement, pharmaceutical and food industries',
      'Beverage and consumer goods manufacturers',
      'Water and wastewater treatment',
      'Petroleum and energy companies',
      'Environmental consultancies',
      'Research and teaching institutions',
    ],
    higherStudies:
      "Related IOE master's programs include Material Science and Engineering, and Climate Change and Development, both under the Applied Sciences and Chemical Engineering department. Graduates may also go abroad for MSc study in chemical, process, environmental or materials engineering.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in their discipline.",
    campuses: ['Pulchowk Campus'],
    sources: [
      'https://ioe.tu.edu.np/pages/chemical-engineering-curriculum-structure-2666',
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://pcampus.edu.np/applied-sciences/',
      'https://pcampus.edu.np/',
    ],
  },
  BArch: {
    overview: [
      'Architecture is a five-year Bachelor of Architecture program about designing buildings and the spaces around them. Design studio runs through most semesters, supported by architectural graphics, freehand sketching, building materials and construction, structures, building science and building services.',
      'Students also study the history of Nepalese, Eastern and Western architecture, design theory, human settlement planning, architectural conservation and sustainable architecture. Later years add estimation, building economics, construction management, professional practice and a practicum, ending with a research-based thesis project.',
    ],
    focusAreas: [
      'Architectural design studio',
      'Building construction and materials',
      'Building science and services',
      'Architectural history and theory',
      'Settlement planning and conservation',
      'Sustainable architecture',
      'Professional practice',
    ],
    careers: [
      {
        title: 'Architect',
        description:
          'Designs buildings that work for the people who use them, from concept to drawings.',
        kind: 'architecture',
      },
      {
        title: 'Urban designer or planner',
        description:
          'Plans streets, neighbourhoods and public spaces at the scale of a city.',
        kind: 'architecture',
      },
      {
        title: 'Interior designer',
        description: 'Designs the layout, materials and feel of indoor spaces.',
        kind: 'architecture',
      },
      {
        title: 'Conservation architect',
        description:
          'Restores and protects heritage buildings while keeping them in use.',
        kind: 'architecture',
      },
      {
        title: 'Architectural visualiser or BIM modeller',
        description:
          'Builds 3D models and renders that show a design before it is built.',
        kind: 'architecture',
      },
      {
        title: 'Construction project manager',
        description:
          'Coordinates design, contractors and budgets to deliver a building.',
        kind: 'construction',
      },
      {
        title: 'Building services designer',
        description:
          'Designs the plumbing, power and ventilation systems inside buildings.',
        kind: 'architecture',
      },
    ],
    sectors: [
      'Architecture and design firms',
      'Construction and real estate developers',
      'Government urban development and building agencies',
      'Municipalities',
      'Heritage conservation projects',
      'Research and teaching institutions',
    ],
    higherStudies:
      "IOE offers master's programs in Architecture, Urban Planning, Energy Efficient Buildings, and Energy for Sustainable Social Development. Graduates also go abroad for MArch or MSc study in architecture, urban design, conservation or sustainable building.",
    licensing:
      "Graduates can sit the Nepal Engineering Council's written examination for General Registered Engineer and, on passing, register with the Council in Architecture.",
    campuses: [
      'Pulchowk Campus',
      'Thapathali Campus',
      'Purwanchal Campus',
      'Chitwan Engineering Campus',
    ],
    sources: [
      'https://ioe.tu.edu.np/pages/bachelor-2594',
      'https://ioe.tu.edu.np/pages/masters-2595',
      'https://nec.gov.np/uploads/root/1763715677170_Nepal%20Engineering%20Council%20Regulations,%202057%20(2001)%20with%20third%20amendment%202080%20(2023).pdf',
      'https://pcampus.edu.np/department-of-architecture/',
      'https://tcioe.edu.np/about',
      'https://ioepc.edu.np/',
      'https://ioecc.edu.np/',
      'https://mcentral.ioepas.edu.np/public/college-campus-detail',
    ],
  },
}
