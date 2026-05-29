// Components
export { Button, buttonVariants } from "./components/button";
export { Logo, Symbol, Pattern, patternStyle } from "./components/brand";
export type { LogoProps, PatternProps } from "./components/brand";
export { Input } from "./components/input";
export { Label } from "./components/label";
export { Badge, badgeVariants } from "./components/badge";
export { Separator } from "./components/separator";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./components/card";
export { Checkbox } from "./components/checkbox";
export { Switch } from "./components/switch";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/tabs";
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/tooltip";
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./components/select";
export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./components/dropdown-menu";

// Components (full shadcn set — new-york-v4)
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/accordion";
export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from "./components/alert-dialog";
export { Alert, AlertDescription, AlertTitle } from "./components/alert";
export { AspectRatio } from "./components/aspect-ratio";
export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "./components/avatar";
export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./components/breadcrumb";
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants } from "./components/button-group";
export { Calendar, CalendarDayButton } from "./components/calendar";
export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/carousel";
export type { CarouselApi } from "./components/carousel";
export { ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent } from "./components/chart";
export type { ChartConfig } from "./components/chart";
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/collapsible";
export { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxSeparator, ComboboxTrigger, ComboboxValue, useComboboxAnchor } from "./components/combobox";
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "./components/command";
export { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "./components/context-menu";
export { DirectionProvider, useDirection } from "./components/direction";
export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from "./components/drawer";
export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./components/empty";
export { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from "./components/field";
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from "./components/form";
export { HoverCard, HoverCardContent, HoverCardTrigger } from "./components/hover-card";
export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "./components/input-group";
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./components/input-otp";
export { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from "./components/item";
export { Kbd, KbdGroup } from "./components/kbd";
export { Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "./components/menubar";
export { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "./components/native-select";
export { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, navigationMenuTriggerStyle } from "./components/navigation-menu";
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./components/pagination";
export { Popover, PopoverAnchor, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "./components/popover";
export { Progress } from "./components/progress";
export { RadioGroup, RadioGroupItem } from "./components/radio-group";
export { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/resizable";
export { ScrollArea, ScrollBar } from "./components/scroll-area";
export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./components/sheet";
export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar } from "./components/sidebar";
export { Skeleton } from "./components/skeleton";
export { Slider } from "./components/slider";
export { Toaster } from "./components/sonner";
export { Spinner } from "./components/spinner";
export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./components/table";
export { Textarea } from "./components/textarea";
export { ToggleGroup, ToggleGroupItem } from "./components/toggle-group";
export { Toggle, toggleVariants } from "./components/toggle";

// Theming
export { ThemeProvider, useMindTheme } from "./theme/provider";
export type { ThemeProviderProps, UseMindThemeResult } from "./theme/provider";
export {
  parseTheme,
  themeSchema,
  toDataUrl,
  type Theme,
  type Pattern as ThemePattern,
  type Asset,
  type ThemeFonts,
} from "./theme/schema";
export { validateThemeContrast, type ContrastViolation, AA_MIN } from "./theme/contrast";
export { themeCss, themesCss } from "./theme/inject";

// Tokens
export {
  ALIAS_TOKENS,
  CONTRAST_PAIRS,
  type AliasToken,
  type AliasMap,
} from "./tokens/aliases";

// Utilities
export { cn } from "./lib/cn";
