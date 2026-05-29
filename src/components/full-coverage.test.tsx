import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../test/axe";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { Calendar } from "./calendar";
import { ChartContainer, type ChartConfig } from "./chart";
import { Kbd, KbdGroup } from "./kbd";
import { Progress } from "./progress";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Skeleton } from "./skeleton";
import { Slider } from "./slider";
import { Spinner } from "./spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Textarea } from "./textarea";
import { Line, LineChart } from "recharts";

// Smoke-test the full vendored shadcn set: every component is importable from
// its module and a representative sample (covering each risky external dep —
// recharts, react-day-picker, radix, base-ui) renders without throwing.

describe("full shadcn coverage — smoke render", () => {
  it("renders structural/display primitives with no axe violations", async () => {
    const { container } = render(
      <div>
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>Description</AlertDescription>
        </Alert>
        <Skeleton className="h-4 w-20" />
        <Spinner />
        <Progress value={50} aria-label="Loading" />
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <Avatar>
          <AvatarImage src="" alt="" />
          <AvatarFallback>MN</AvatarFallback>
        </Avatar>
        <Textarea aria-label="Notes" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("renders an accordion (radix)", () => {
    expect(() =>
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="a">
            <AccordionTrigger>Q</AccordionTrigger>
            <AccordionContent>A</AccordionContent>
          </AccordionItem>
        </Accordion>,
      ),
    ).not.toThrow();
  });

  it("renders a navigable breadcrumb + table", () => {
    expect(() =>
      render(
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Now</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Table>
            <TableCaption>Caption</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Col</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Cell</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>,
      ),
    ).not.toThrow();
  });

  it("renders form controls (radio group, slider)", () => {
    expect(() =>
      render(
        <div>
          <RadioGroup defaultValue="a">
            <RadioGroupItem value="a" />
            <RadioGroupItem value="b" />
          </RadioGroup>
          <Slider defaultValue={[40]} max={100} step={1} />
        </div>,
      ),
    ).not.toThrow();
  });

  it("renders a calendar (react-day-picker)", () => {
    expect(() => render(<Calendar mode="single" />)).not.toThrow();
  });

  it("renders a chart container (recharts)", () => {
    const config = { v: { label: "V", color: "var(--chart-1)" } } satisfies ChartConfig;
    expect(() =>
      render(
        <ChartContainer config={config} className="h-40 w-40">
          <LineChart data={[{ v: 1 }, { v: 2 }]}>
            <Line dataKey="v" />
          </LineChart>
        </ChartContainer>,
      ),
    ).not.toThrow();
  });
});
