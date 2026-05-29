import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldLabel,
  FieldContent,
  FieldTitle,
  FieldDescription,
  FieldError,
  FieldSeparator,
} from "../../src/components/field";
import { Input } from "../../src/components/input";
import { Textarea } from "../../src/components/textarea";

const meta = {
  title: "Components/Forms/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80 p-6">
      <Field>
        <FieldLabel htmlFor="field-name">Name</FieldLabel>
        <Input id="field-name" placeholder="Ada Lovelace" />
        <FieldDescription>This is shown on your public profile.</FieldDescription>
      </Field>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="w-96 p-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-email">Email</FieldLabel>
          <Input id="field-email" type="email" placeholder="you@mind.dev" />
          <FieldDescription>We&apos;ll never share your email.</FieldDescription>
        </Field>
        <FieldSeparator />
        <Field>
          <FieldLabel htmlFor="field-bio">Bio</FieldLabel>
          <Textarea id="field-bio" placeholder="Tell us about yourself" />
        </Field>
      </FieldGroup>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-80 p-6">
      <Field data-invalid="true">
        <FieldLabel htmlFor="field-password">Password</FieldLabel>
        <Input id="field-password" type="password" aria-invalid="true" />
        <FieldError>Password must be at least 8 characters.</FieldError>
      </Field>
    </div>
  ),
};

export const Fieldset: Story = {
  render: () => (
    <div className="w-96 p-6">
      <FieldSet>
        <FieldLegend>Notifications</FieldLegend>
        <FieldDescription>Choose how you want to be notified.</FieldDescription>
        <FieldGroup>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Email digest</FieldTitle>
              <FieldDescription>A weekly summary by email.</FieldDescription>
            </FieldContent>
            <FieldLabel htmlFor="field-digest" className="sr-only">
              Email digest frequency
            </FieldLabel>
            <Input
              id="field-digest"
              className="w-24"
              defaultValue="Weekly"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};
