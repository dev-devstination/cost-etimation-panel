import { useTranslations } from "next-intl"
import { History } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Resource } from "@/features/resources/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

interface PriceHistoryProps {
  resource: Resource
}

export const PriceHistory: React.FC<PriceHistoryProps> = ({ resource }) => {
  const t = useTranslations("ResourcesPage")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                type="button"
              >
                <History className="size-4" />
                <span className="sr-only">{t("priceHistory")}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("priceHistory")}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>{resource.description}</DialogTitle>
          <DialogDescription>{t("priceHistory")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("resourceDetails")}</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="font-medium">{t("table.code")}</dt>
                  <dd>{resource.code}</dd>
                  <dt className="font-medium">{t("table.description")}</dt>
                  <dd>{resource.description}</dd>
                  <dt className="font-medium">{t("table.category")}</dt>
                  <dd>{resource.category.name}</dd>
                  <dt className="font-medium">{t("table.unit")}</dt>
                  <dd>{resource.unit.name}</dd>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("currentPricing")}</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="font-medium">{t("table.basicRate")}</dt>
                  <dd>{resource.basic_rate.toFixed(2)}</dd>
                  <dt className="font-medium">{t("table.factor")}</dt>
                  <dd>{resource.factor.toFixed(2)}</dd>
                  <dt className="font-medium">{t("table.rate")}</dt>
                  <dd>{(resource.basic_rate * resource.factor).toFixed(2)}</dd>
                  {/* <dt className="font-medium">{t("table.lastUpdated")}</dt> */}
                  {/* <dd>{resource.updatedDate}</dd> */}
                </dl>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("priceHistory")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("date")}</TableHead>
                      {/* <TableHead>{t("projet")}</TableHead>
                      <TableHead>{t("projectState")}</TableHead> */}
                      <TableHead>{t("user")}</TableHead>
                      <TableHead>{t("table.basicRate")}</TableHead>
                      <TableHead>{t("table.factor")}</TableHead>
                      <TableHead>{t("table.rate")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resource.prices.map((price) => (
                      <TableRow key={price.ID}>
                        <TableCell>{formatDate(price.updated_at)}</TableCell>
                        {/* <TableCell>
                      <div>{entry.projectName}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.projectCode}
                      </div>
                    </TableCell>
                    <TableCell>{entry.projectState}</TableCell> */}
                        <TableCell>{price.user.email}</TableCell>
                        <TableCell>{price.basic_rate.toFixed(2)}</TableCell>
                        <TableCell>{price.factor.toFixed(2)}</TableCell>
                        <TableCell>
                          {(price.basic_rate * price.factor).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
