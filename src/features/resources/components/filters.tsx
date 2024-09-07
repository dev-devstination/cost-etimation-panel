import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const Filters = () => {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sss">All Categories</SelectItem>
          {/* Add more categories here */}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sub-Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sub-Categories</SelectItem>
          {/* Add more sub-categories here */}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          {/* Add more projects here */}
        </SelectContent>
      </Select>

      <Input className="w-[300px]" placeholder="Search by name..." />
      <Button variant="outline">Clear all</Button>
    </>
  )
}
