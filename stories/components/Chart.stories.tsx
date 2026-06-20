import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../src/components/chart";

const meta = {
  title: "🧩 Components/Data Display/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const monthlyData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const seriesConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const containerClass = "h-[260px] w-full max-w-[640px]";

/** A simple bar chart with a tooltip — the canonical shadcn chart recipe. */
export const Bars: Story = {
  render: () => (
    <ChartContainer config={seriesConfig} className={containerClass}>
      <BarChart accessibilityLayer data={monthlyData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => String(value).slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};

/** Stacked bars with a legend driven by the chart config. */
export const StackedBarsWithLegend: Story = {
  render: () => (
    <ChartContainer config={seriesConfig} className={containerClass}>
      <BarChart accessibilityLayer data={monthlyData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => String(value).slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="desktop"
          stackId="a"
          fill="var(--color-desktop)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="mobile"
          stackId="a"
          fill="var(--color-mobile)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  ),
};

/** A multi-series line chart with a dashed-indicator tooltip. */
export const Lines: Story = {
  render: () => (
    <ChartContainer config={seriesConfig} className={containerClass}>
      <LineChart accessibilityLayer data={monthlyData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => String(value).slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  ),
};

/** Stacked areas with gradient fills and a line-indicator tooltip. */
export const Areas: Story = {
  render: () => (
    <ChartContainer config={seriesConfig} className={containerClass}>
      <AreaChart accessibilityLayer data={monthlyData}>
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => String(value).slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="mobile"
          type="natural"
          fill="url(#fillMobile)"
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="url(#fillDesktop)"
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  ),
};

const browserData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const browserConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

/** A donut pie chart with a centered total label. */
export const Donut: Story = {
  render: () => {
    const total = browserData.reduce((sum, d) => sum + d.visitors, 0);
    return (
      <ChartContainer
        config={browserConfig}
        className="mx-auto aspect-square h-[280px]"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="browser" hideLabel />}
          />
          <Pie
            data={browserData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
            strokeWidth={5}
          >
            {browserData.map((entry) => (
              <Cell key={entry.browser} fill={entry.fill} />
            ))}
            <Label
              content={({ viewBox }) =>
                viewBox && "cx" in viewBox && "cy" in viewBox ? (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) + 22}
                      className="fill-muted-foreground"
                    >
                      Visitors
                    </tspan>
                  </text>
                ) : null
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    );
  },
};

/** A radar chart comparing two series across categories. */
export const Radial: Story = {
  render: () => (
    <ChartContainer
      config={seriesConfig}
      className="mx-auto aspect-square h-[280px]"
    >
      <RadarChart data={monthlyData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="month" />
        <PolarGrid />
        <Radar
          dataKey="desktop"
          fill="var(--color-desktop)"
          fillOpacity={0.6}
          stroke="var(--color-desktop)"
        />
        <Radar
          dataKey="mobile"
          fill="var(--color-mobile)"
          fillOpacity={0.6}
          stroke="var(--color-mobile)"
        />
      </RadarChart>
    </ChartContainer>
  ),
};

/** A radial bar chart — one ring per category. */
export const RadialBars: Story = {
  render: () => (
    <ChartContainer
      config={browserConfig}
      className="mx-auto aspect-square h-[280px]"
    >
      <RadialBarChart data={browserData} innerRadius={30} outerRadius={110}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent nameKey="browser" hideLabel />}
        />
        <RadialBar dataKey="visitors" background>
          {browserData.map((entry) => (
            <Cell key={entry.browser} fill={entry.fill} />
          ))}
        </RadialBar>
      </RadialBarChart>
    </ChartContainer>
  ),
};
