"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ENDPOINTURL from "@/app/url";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { changeUser } from "@/state/user";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "A felhasználó név túl rövid.",
  }),
  password: z
    .string()
    .min(4, {
      message: "A jelszónak legalább 8 karakter hosszúnak kell lennie.",
    })
    .regex(/[A-Z]/, { message: "Legalább egy nagybetűt kell tartalmaznia." })
    .regex(/[a-z]/, { message: "Legalább egy kisbetűt kell tartalmaznia." })
    .regex(/[0-9]/, { message: "Legalább egy számot kell tartalmaznia." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Legalább egy speciális karaktert kell tartalmaznia.",
    }),
});
export function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const user = useSelector((state: RootState) => state.states.user.value);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "admin2",
      password: "Adminn2!",
    },
  });
  const redirectRoute = searchParams.get("route") || "/";

  const onSubmit = (data: { name: string; password: string }) => {
    axios
      .post(`${ENDPOINTURL}/user/login`, data, {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      })
      .then(function (response) {
        toast({
          variant: "default",
          title: "Sikeres bejelnetkezés",
        });
        dispatch(
          changeUser({ token: response.data.token, role: response.data.role })
        );
        console.log(response.data.token + "ÁTIRÁNYÍTÁS");
        if (response.data.token === "kitchen") {
          router.push("/kitchen");
        } else if (response.data.token === "salesman") {
          router.push("/salesman");
        } else {
          router.push(redirectRoute);
        }
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

  useEffect(() => {
    console.log(user.role + "ÁTIRÁNYÍTÁS 2!");
    if (user) {
      if (user.role === "kitchen") {
        router.push("/kitchen");
      } else if (user.role === "salesman") {
        router.push("/salesman");
      } else if (user.role === "admin") {
        router.push("/");
      }
    }
  }, [user, router]);

  return (
    <Form {...form}>
      <form
        id="login"
        className="flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Felhasználónév <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl data-cy="name">
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
              <FormControl data-cy="password">
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
