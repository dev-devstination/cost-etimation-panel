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
  },
]
