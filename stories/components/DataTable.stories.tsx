import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  DataTableColumnHeader,
} from "../../src/components/data-table";
import { Badge } from "../../src/components/badge";

/**
 * `DataTable` wires [TanStack Table](https://tanstack.com/table) into the
 * pristine `Table` primitives. It is headless logic over themed markup: sorting,
 * filtering, pagination, row selection and column visibility all render through
 * shadcn's semantic tokens, so the table re-skins itself for every brand × mode
 * with no per-story styling. Drive it with a `ColumnDef[]` plus `data` and opt
 * into features with the boolean flags.
 */
const meta = {
  title: "🧩 Components/Data Display/Data Table",
  component: DataTable,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DataTable>;

export default meta;

type Payment = {
  id: string;
  customer: string;
  email: string;
  status: "pending" | "processing" | "success" | "failed";
  amount: number;
};

const payments: Payment[] = [
  { id: "m5gr84i9", customer: "Ken Adams", email: "ken99@example.com", status: "success", amount: 316 },
  { id: "3u1reuv4", customer: "Abe Lincoln", email: "abe45@example.com", status: "success", amount: 242 },
  { id: "derv1ws0", customer: "Monserrat Diaz", email: "monserrat44@example.com", status: "processing", amount: 837 },
  { id: "5kma53ae", customer: "Silas Pruitt", email: "silas22@example.com", status: "success", amount: 874 },
  { id: "bhqecj4p", customer: "Carmella Hahn", email: "carmella@example.com", status: "failed", amount: 721 },
  { id: "p0r9wq2x", customer: "Jane Foster", email: "jane.f@example.com", status: "pending", amount: 459 },
  { id: "z8x7c6v5", customer: "Bruce Banner", email: "bruce@example.com", status: "processing", amount: 1290 },
  { id: "a1b2c3d4", customer: "Tony Stark", email: "tony@example.com", status: "success", amount: 5400 },
  { id: "e5f6g7h8", customer: "Natasha Romanoff", email: "nat@example.com", status: "failed", amount: 88 },
  { id: "i9j0k1l2", customer: "Steve Rogers", email: "steve@example.com", status: "success", amount: 612 },
  { id: "m3n4o5p6", customer: "Wanda Maximoff", email: "wanda@example.com", status: "pending", amount: 333 },
  { id: "q7r8s9t0", customer: "Peter Parker", email: "peter@example.com", status: "processing", amount: 47 },
];

const currency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value
  );

const statusVariant: Record<
  Payment["status"],
  React.ComponentProps<typeof Badge>["variant"]
> = {
  success: "default",
  processing: "secondary",
  pending: "outline",
  failed: "destructive",
};

/** Status as a themed `Badge`, amount right-aligned and currency-formatted. */
const baseColumns: ColumnDef<Payment>[] = [
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<Payment["status"]>("status");
      return (
        <Badge variant={statusVariant[status]} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {currency(row.getValue("amount"))}
      </div>
    ),
  },
];

/** Same columns, but sortable headers use `DataTableColumnHeader`. */
const sortableColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<Payment["status"]>("status");
      return (
        <Badge variant={statusVariant[status]} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {currency(row.getValue("amount"))}
      </div>
    ),
  },
];

type Story = StoryObj<typeof meta>;

/**
 * The minimum: `columns` + `data`. No sorting, paging, or selection — just the
 * TanStack render pipeline feeding the themed `Table` primitives.
 */
export const Basic: Story = {
  render: () => (
    <div className="w-[760px]">
      <DataTable columns={baseColumns} data={payments.slice(0, 5)} />
    </div>
  ),
};

/**
 * `enableSorting` + sortable `DataTableColumnHeader`s. Each header is a menu to
 * sort ascending/descending or hide the column. Click "Amount" to sort.
 */
export const Sortable: Story = {
  render: () => (
    <div className="w-[760px]">
      <DataTable
        columns={sortableColumns}
        data={payments.slice(0, 6)}
        enableSorting
      />
    </div>
  ),
};

/**
 * `filterColumn` mounts a search input wired to a single column's filter. Type
 * a name to narrow the rows client-side.
 */
export const Filterable: Story = {
  render: () => (
    <div className="w-[760px]">
      <DataTable
        columns={baseColumns}
        data={payments}
        filterColumn="customer"
        filterPlaceholder="Filter customers…"
      />
    </div>
  ),
};

/**
 * `enablePagination` slices the data and renders the page-size select plus the
 * first/prev/next/last controls.
 */
export const Paginated: Story = {
  render: () => (
    <div className="w-[760px]">
      <DataTable
        columns={sortableColumns}
        data={payments}
        enableSorting
        enablePagination
        pageSize={5}
      />
    </div>
  ),
};

/**
 * `enableRowSelection` prepends a checkbox column and tracks selection. The
 * selected count surfaces in the pagination footer; `onRowSelectionChange`
 * reports the selected rows to the parent (mirrored below).
 */
export const RowSelection: Story = {
  render: function RowSelectionExample() {
    const [selected, setSelected] = React.useState<Payment[]>([]);
    return (
      <div className="flex w-[760px] flex-col gap-3">
        <DataTable
          columns={baseColumns}
          data={payments}
          enableRowSelection
          enablePagination
          pageSize={6}
          onRowSelectionChange={setSelected}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {selected.map((p) => p.customer).join(", ") || "none"}
        </p>
      </div>
    );
  },
};

/**
 * `enableColumnVisibility` adds a "View" dropdown to the toolbar so users can
 * show/hide columns. Combine with `filterColumn` for a full toolbar.
 */
export const ColumnVisibility: Story = {
  render: () => (
    <div className="w-[760px]">
      <DataTable
        columns={sortableColumns}
        data={payments}
        enableSorting
        filterColumn="customer"
        filterPlaceholder="Filter customers…"
        enableColumnVisibility
      />
    </div>
  ),
};

/**
 * Everything at once — the realistic shape of an admin data table: toolbar with
 * search + view options, sortable headers, row selection, and pagination.
 */
export const KitchenSink: Story = {
  render: () => (
    <div className="w-[820px]">
      <DataTable
        columns={sortableColumns}
        data={payments}
        enableSorting
        enableRowSelection
        enablePagination
        enableColumnVisibility
        filterColumn="customer"
        filterPlaceholder="Filter customers…"
        pageSize={7}
      />
    </div>
  ),
};

/** Empty data renders the `emptyMessage` row spanning every column. */
export const Empty: Story = {
  render: () => (
    <div className="w-[760px]">
      <DataTable
        columns={baseColumns}
        data={[]}
        emptyMessage="No payments yet."
      />
    </div>
  ),
};
