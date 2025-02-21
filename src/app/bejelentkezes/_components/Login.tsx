"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
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
import URL from "@/app/url";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { changeUser } from "@/state/user";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "A felhasználó név túl rövid.",
  }),
  password: z.string().min(4, {
    message: "A jelszónak legalább 4 karakter hosszúnak kell lennie.",
  }),
  // .min(4, {
  //   message: "A jelszónak legalább 8 karakter hosszúnak kell lennie.",
  // })
  // .regex(/[A-Z]/, { message: "Legalább egy nagybetűt kell tartalmaznia." })
  // .regex(/[a-z]/, { message: "Legalább egy kisbetűt kell tartalmaznia." })
  // .regex(/[0-9]/, { message: "Legalább egy számot kell tartalmaznia." })
  // .regex(/[^A-Za-z0-9]/, {
  //   message: "Legalább egy speciális karaktert kell tartalmaznia.",
  // }),
});
export function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // name: "admin2",
      // password: "Adminn2!",
      name: "admin",
      password: "admin",
    },
  });

  const onSubmit = (data: { name: string; password: string }) => {
    console.log(data);
    axios
      .post(`${URL}/user/login`, data)
      .then(function (response) {
        toast({
          variant: "default",
          title: "Sikeres bejelnetkezés",
        });
        console.log(response.data);
        dispatch(
          changeUser({ token: response.data.token, role: response.data.role })
        );
        router.push("/");
      })
      .catch(function (error) {
        toast({
          variant: "destructive",
          title: "Nem sikerült bejelentkezni",
          description: "Helytelen felhasználónév vagy jelszó.",
        });
        console.log(error);
      });
  };

  return (
    <Form {...form}>
      <form id="login" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Felhasználónév <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Felhasználónév" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.name &&
                  form.formState.errors.name.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Jelszó <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Jelszó" type="password" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password &&
                  form.formState.errors.password.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

