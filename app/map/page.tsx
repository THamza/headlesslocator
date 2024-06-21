import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { JSX, SVGProps } from "react";
import Header from "@/components/Header";

export default function MapPage() {
  return (
    <div>
      <Header />
      <div className="grid min-h-screen w-full grid-cols-[1fr_500px]">
        <div className="relative">
          <div className="absolute top-4 left-4">
            <Card className="w-[300px] bg-background/80 backdrop-blur-md">
              <CardContent className="flex items-center gap-4">
                <MapIcon className="h-6 w-6 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">Radius</div>
                  <Slider
                    min={0}
                    max={50}
                    step={1}
                    defaultValue={[25]}
                    className="h-2 w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="h-full w-full" />
        </div>
        <div className="border-l bg-muted/40 px-4 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Users</h2>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
          <div className="mt-4 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telegram</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>@johndoe</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>@janesmith</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>bob@example.com</TableCell>
                  <TableCell>@bobjohnson</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Alice Williams</TableCell>
                  <TableCell>alice@example.com</TableCell>
                  <TableCell>@alicewilliams</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tom Davis</TableCell>
                  <TableCell>tom@example.com</TableCell>
                  <TableCell>@tomdavis</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sarah Lee</TableCell>
                  <TableCell>sarah@example.com</TableCell>
                  <TableCell>@sarahlee</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Michael Brown</TableCell>
                  <TableCell>michael@example.com</TableCell>
                  <TableCell>@michaelbrown</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Emily Davis</TableCell>
                  <TableCell>emily@example.com</TableCell>
                  <TableCell>@emilydavis</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>David Wilson</TableCell>
                  <TableCell>david@example.com</TableCell>
                  <TableCell>@davidwilson</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Olivia Taylor</TableCell>
                  <TableCell>olivia@example.com</TableCell>
                  <TableCell>@oliviataylor</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );
}
