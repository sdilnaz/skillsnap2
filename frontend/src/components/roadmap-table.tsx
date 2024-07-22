/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/s6ENDZLg59u
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export function RoadmapTable() {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Sublevel 1</TableHead>
          <TableHead />
          <TableHead>Sublevel 3</TableHead>
          <TableHead />
          <TableHead>Sublevel 5</TableHead>
          <TableHead />
          <TableHead>Sublevel 7</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Sublevel 1</TableCell>
          <TableCell />
          <TableCell>Sublevel 3</TableCell>
          <TableCell />
          <TableCell>Sublevel 5</TableCell>
          <TableCell />
          <TableCell>Sublevel 7</TableCell>
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell>Sublevel 2</TableCell>
          <TableCell />
          <TableCell>Sublevel 4</TableCell>
          <TableCell />
          <TableCell>Sublevel 6</TableCell>
          <TableCell />
          <TableCell>Sublevel 8</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
