import { useTranslations } from "next-intl"

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

interface PriceHistoryProps {
  resource: Resource
}

export const PriceHistory: React.FC<PriceHistoryProps> = ({ resource }) => {
  const t = useTranslations("ResourcesPage")

  return (
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
              <dd>{resource.category}</dd>
              <dt className="font-medium">{t("table.unit")}</dt>
              <dd>{resource.unit}</dd>
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
              <dd>{resource.basicRate.toFixed(2)}</dd>
              <dt className="font-medium">{t("table.factor")}</dt>
              <dd>{resource.factor.toFixed(2)}</dd>
              <dt className="font-medium">{t("table.rate")}</dt>
              <dd>{(resource.basicRate * resource.factor).toFixed(2)}</dd>
              <dt className="font-medium">{t("table.lastUpdated")}</dt>
              <dd>{resource.updatedDate}</dd>
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
                  <TableHead>{t("projet")}</TableHead>
                  <TableHead>{t("projectState")}</TableHead>
                  <TableHead>{t("user")}</TableHead>
                  <TableHead>{t("table.basicRate")}</TableHead>
                  <TableHead>{t("table.factor")}</TableHead>
                  <TableHead>{t("table.rate")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resource.history.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>
                      <div>{entry.projectName}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.projectCode}
                      </div>
                    </TableCell>
                    <TableCell>{entry.projectState}</TableCell>
                    <TableCell>{entry.person}</TableCell>
                    <TableCell>{entry.basicRate.toFixed(2)}</TableCell>
                    <TableCell>{entry.factor.toFixed(2)}</TableCell>
                    <TableCell>{entry.finalRate.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
