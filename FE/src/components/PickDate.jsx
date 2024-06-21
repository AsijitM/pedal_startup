"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

function CalendarForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: /*#__PURE__*/ React.createElement("pre", {
        className: "mt-2 w-[340px] rounded-md bg-slate-950 p-4"
      }, /*#__PURE__*/ React.createElement("code", {
        className: "text-white"
      }, JSON.stringify(data, null, 2)))
    });
  }

  return /*#__PURE__*/ React.createElement(Form, form, /*#__PURE__*/ React.createElement("form", {
    onSubmit: form.handleSubmit(onSubmit),
    className: "space-y-8"
  }, /*#__PURE__*/ React.createElement(FormField, {
    control: form.control,
    name: "dob",
    render: ({
      field
    }) => /*#__PURE__*/ React.createElement(FormItem, {
      className: "flex flex-col"
    }, /*#__PURE__*/ React.createElement(FormLabel, null, "Date of birth"), /*#__PURE__*/ React.createElement(Popover, null, /*#__PURE__*/ React.createElement(PopoverTrigger, {
      asChild: true
    }, /*#__PURE__*/ React.createElement(FormControl, null, /*#__PURE__*/ React.createElement(Button, {
      variant: "outline",
      className: cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")
    }, field.value ? format(field.value, "PPP") : /*#__PURE__*/ React.createElement("span", null, "Pick a date"), /*#__PURE__*/ React.createElement(CalendarIcon, {
      className: "ml-auto h-4 w-4 opacity-50"
    })))), /*#__PURE__*/ React.createElement(PopoverContent, {
      className: "w-auto p-0",
      align: "start"
    }, /*#__PURE__*/ React.createElement(Calendar, {
      mode: "single",
      selected: field.value,
      onSelect: field.onChange,
      disabled: date => date > new Date() || date < new Date("1900-01-01"),
      initialFocus: true
    }))), /*#__PURE__*/ React.createElement(FormDescription, null, "Your date of birth is used to calculate your age."), /*#__PURE__*/ React.createElement(FormMessage, null)))
  ), /*#__PURE__*/ React.createElement(Button, {
    type: "submit"
  }, "Submit")));
}

export
