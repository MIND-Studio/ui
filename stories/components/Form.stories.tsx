import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/form";
import { Input } from "../../src/components/input";
import { Button } from "../../src/components/button";

const meta = {
  title: "🧩 Components/Forms/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

type ProfileValues = {
  username: string;
  email: string;
};

function ProfileForm() {
  const form = useForm<ProfileValues>({
    defaultValues: { username: "", email: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="grid w-80 gap-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="mind" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

export const Default: Story = {
  render: () => <ProfileForm />,
};

type SignInValues = {
  email: string;
};

function ValidatedForm() {
  const form = useForm<SignInValues>({
    defaultValues: { email: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="grid w-80 gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required.",
            pattern: {
              value: /.+@.+\..+/,
              message: "Enter a valid email address.",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  );
}

export const WithValidation: Story = {
  render: () => <ValidatedForm />,
};
