export type Resource = {
  id: string
  code: string
  description: string
  category: string
  subCategory: string
  unit: string
  composite: boolean
  basicRate: number
  factor: number
}

export const sampleResources: Resource[] = [
  {
    id: "RES-001",
    code: "MSTR-438",
    description: "Master Carpenter",
    category: "Labor",
    subCategory: "Skilled Labor",
    unit: "day",
    composite: false,
    basicRate: 55.0,
    factor: 1.79,
  },
  {
    id: "RES-002",
    code: "MATL-102",
    description: "Portland Cement",
    category: "Material",
    subCategory: "Concrete Materials",
    unit: "bag",
    composite: false,
    basicRate: 12.5,
    factor: 1.15,
  },
  {
    id: "RES-003",
    code: "EQUP-201",
    description: "Excavator (20 ton)",
    category: "Equipment",
    subCategory: "Heavy Machinery",
    unit: "hour",
    composite: true,
    basicRate: 150.0,
    factor: 1.25,
  },
]
