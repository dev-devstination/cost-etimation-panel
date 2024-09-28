export type Resource = {
  id: string
  code: string
  description: string
  category: string
  subCategory: string
  unit: string
  isComposite: boolean
  basicRate: number
  factor: number
  isMaster: boolean
  isUsed: boolean
  updatedDate: string
  history: PriceHistoryEntry[]
}

export interface PriceHistoryEntry {
  date: string
  projectCode: string
  projectName: string
  projectState: string
  person: string
  basicRate: number
  factor: number
  finalRate: number
}

export const sampleResources: Resource[] = [
  {
    id: "RES-001",
    code: "MSTR-438",
    description: "Master Carpenter",
    category: "Labor",
    subCategory: "Skilled Labor",
    unit: "day",
    isComposite: false,
    basicRate: 55.0,
    factor: 1.79,
    isMaster: true,
    isUsed: true,
    updatedDate: "2023-09-15",
    history: [
      {
        date: "2023-09-15",
        projectCode: "PRJ-001",
        projectName: "City Center Renovation",
        projectState: "In Progress",
        person: "m.s",
        basicRate: 55.0,
        factor: 1.79,
        finalRate: 98.45,
      },
      {
        date: "2023-08-01",
        projectCode: "PRJ-002",
        projectName: "Suburban Housing Complex",
        projectState: "Planning",
        person: "j.d",
        basicRate: 52.0,
        factor: 1.75,
        finalRate: 91.0,
      },
      {
        date: "2023-07-15",
        projectCode: "PRJ-003",
        projectName: "Industrial Park Development",
        projectState: "Completed",
        person: "a.b",
        basicRate: 50.0,
        factor: 1.8,
        finalRate: 90.0,
      },
      {
        date: "2023-09-15",
        projectCode: "PRJ-001",
        projectName: "City Center Renovation",
        projectState: "In Progress",
        person: "m.s",
        basicRate: 55.0,
        factor: 1.79,
        finalRate: 98.45,
      },
      {
        date: "2023-08-01",
        projectCode: "PRJ-002",
        projectName: "Suburban Housing Complex",
        projectState: "Planning",
        person: "j.d",
        basicRate: 52.0,
        factor: 1.75,
        finalRate: 91.0,
      },
      {
        date: "2023-07-15",
        projectCode: "PRJ-003",
        projectName: "Industrial Park Development",
        projectState: "Completed",
        person: "a.b",
        basicRate: 50.0,
        factor: 1.8,
        finalRate: 90.0,
      },
    ],
  },
  {
    id: "RES-002",
    code: "MATL-102",
    description: "Portland Cement",
    category: "Material",
    subCategory: "Concrete Materials",
    unit: "bag",
    isComposite: false,
    basicRate: 12.5,
    factor: 1.15,
    isMaster: false,
    isUsed: true,
    updatedDate: "2023-09-10",
    history: [
      {
        date: "2023-09-10",
        projectCode: "PRJ-001",
        projectName: "City Center Renovation",
        projectState: "In Progress",
        person: "m.s",
        basicRate: 12.5,
        factor: 1.15,
        finalRate: 14.38,
      },
      {
        date: "2023-08-20",
        projectCode: "PRJ-004",
        projectName: "Bridge Reconstruction",
        projectState: "Planning",
        person: "e.f",
        basicRate: 12.0,
        factor: 1.18,
        finalRate: 14.16,
      },
    ],
  },
  {
    id: "RES-003",
    code: "EQUP-201",
    description: "Excavator (20 ton)",
    category: "Equipment",
    subCategory: "Heavy Machinery",
    unit: "hour",
    isComposite: true,
    basicRate: 150.0,
    factor: 1.25,
    isMaster: true,
    isUsed: false,
    updatedDate: "2023-09-05",
    history: [
      {
        date: "2023-09-05",
        projectCode: "PRJ-003",
        projectName: "Industrial Park Development",
        projectState: "Completed",
        person: "g.h",
        basicRate: 150.0,
        factor: 1.25,
        finalRate: 187.5,
      },
      {
        date: "2023-08-15",
        projectCode: "PRJ-005",
        projectName: "Highway Extension",
        projectState: "In Progress",
        person: "i.j",
        basicRate: 145.0,
        factor: 1.3,
        finalRate: 188.5,
      },
      {
        date: "2023-07-01",
        projectCode: "PRJ-002",
        projectName: "Suburban Housing Complex",
        projectState: "Planning",
        person: "k.l",
        basicRate: 140.0,
        factor: 1.28,
        finalRate: 179.2,
      },
    ],
  },
  {
    id: "RES-004",
    code: "ELEC-301",
    description: "Copper Wiring (14 AWG)",
    category: "Material",
    subCategory: "Electrical",
    unit: "meter",
    isComposite: false,
    basicRate: 2.75,
    factor: 1.1,
    isMaster: false,
    isUsed: true,
    updatedDate: "2023-09-20",
    history: [
      {
        date: "2023-09-20",
        projectCode: "PRJ-001",
        projectName: "City Center Renovation",
        projectState: "In Progress",
        person: "m.n",
        basicRate: 2.75,
        factor: 1.1,
        finalRate: 3.03,
      },
      {
        date: "2023-08-10",
        projectCode: "PRJ-006",
        projectName: "Smart Home Integration",
        projectState: "Completed",
        person: "o.p",
        basicRate: 2.6,
        factor: 1.12,
        finalRate: 2.91,
      },
    ],
  },
  {
    id: "RES-005",
    code: "PLMB-401",
    description: "PVC Pipe (4 inch)",
    category: "Material",
    subCategory: "Plumbing",
    unit: "meter",
    isComposite: false,
    basicRate: 8.5,
    factor: 1.2,
    isMaster: true,
    isUsed: true,
    updatedDate: "2023-09-18",
    history: [
      {
        date: "2023-09-18",
        projectCode: "PRJ-002",
        projectName: "Suburban Housing Complex",
        projectState: "Planning",
        person: "q.r",
        basicRate: 8.5,
        factor: 1.2,
        finalRate: 10.2,
      },
      {
        date: "2023-08-05",
        projectCode: "PRJ-007",
        projectName: "Water Treatment Facility",
        projectState: "In Progress",
        person: "s.t",
        basicRate: 8.25,
        factor: 1.22,
        finalRate: 10.07,
      },
      {
        date: "2023-07-20",
        projectCode: "PRJ-001",
        projectName: "City Center Renovation",
        projectState: "In Progress",
        person: "u.v",
        basicRate: 8.0,
        factor: 1.25,
        finalRate: 10.0,
      },
    ],
  },
]
