"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z
  .object({
    username: z.string().min(4, {
      message: "A felhasználó név túl rövid.",
    }),
    email: z.string().email({ message: "Az email nem megfelelő formátumú." }),
    password: z
      .string()
      .min(8, {
        message: "A jelszónak legalább 8 karakter hosszúnak kell lennie.",
      })
      .regex(/[A-Z]/, { message: "Legalább egy nagybetűt kell tartalmaznia." })
      .regex(/[a-z]/, { message: "Legalább egy kisbetűt kell tartalmaznia." })
      .regex(/[0-9]/, { message: "Legalább egy számot kell tartalmaznia." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Legalább egy speciális karaktert kell tartalmaznia.",
      }),
    passwordRepeat: z.string(),
    employeeStatus: z.string().nonempty({
      message: "Kérjük válassza ki a dolgozó státuszát.",
    }),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "A jelszavak nem egyeznek.",
    path: ["passwordRepeat"],
  });

export function Registration() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      employeeStatus: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Felhasználónév <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="shadow-md"
                  placeholder="Felhasználónév"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.username &&
                  form.formState.errors.username.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Email <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input className="shadow-md" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.email &&
                  form.formState.errors.email.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Jelszó <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="shadow-md"
                  placeholder="Jelszó"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password &&
                  form.formState.errors.password.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordRepeat"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Jelszó újra <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="shadow-md"
                  placeholder="Jelszó"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.passwordRepeat &&
                  form.formState.errors.passwordRepeat.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employeeStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Dolgozó státusza <span className="text-red-600">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="shadow-md">
                    <SelectValue placeholder="Dolgozó státusza" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="kitchen">Konyhai dolgozó</SelectItem>
                  <SelectItem value="counter">Pultban dolgozó</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage>
                {form.formState.errors.employeeStatus?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Regisztráció
        </Button>
      </form>
    </Form>
  );
}
