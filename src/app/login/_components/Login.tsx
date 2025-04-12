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
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import MyWebSocketComponent from "@/components/twoFAuth";

export interface Login {
  profilePicture: string;
  role: string;
  token: string;
  userId: string;
}

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
  const [waitingFor2F, setWaitingFor2F] = useState<boolean>(false);
  const [twoFData, setTwoFData] = useState<{
    email: string;
    token: string;
  } | null>(null);
  const [auth, setAuth] = useState<Login[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  useEffect(() => {
    console.log(auth);
    if (auth.length > 0) {
      const lastIdx = auth.length - 1;
      toast({
        variant: "default",
        title: "Sikeres bejelnetkezés",
        description: "Hamarosan átirányítjuk a következő oldalra.",
      });
      dispatch(
        changeUser({
          token: auth[lastIdx].token,
          role: auth[lastIdx].role,
        })
      );
      if (auth[lastIdx].token === "kitchen") {
        router.push("/kitchen");
      } else if (auth[lastIdx].token === "salesman") {
        router.push("/salesman");
      } else {
        router.push(redirectRoute);
      }
    }
  }, [auth]);

  const redirectRoute = searchParams.get("route") || "/";

  const onSubmit = (data: { name: string; password: string }) => {
    setIsLoading(true);
    axios
      .post(`${ENDPOINTURL}/user/login`, data, {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      })
      .then(function (response) {
        if (response.data?.email === undefined) {
          toast({
            variant: "default",
            title: "Sikeres bejelnetkezés",
            description: "Hamarosan átirányítjuk a következő oldalra.",
          });
          dispatch(
            changeUser({ token: response.data.token, role: response.data.role })
          );
          if (response.data.token === "kitchen") {
            router.push("/kitchen");
          } else if (response.data.token === "salesman") {
            router.push("/salesman");
          } else {
            router.push(redirectRoute);
          }
        } else {
          setWaitingFor2F(true);
          setTwoFData(response.data);
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        toast({
          variant: "destructive",
          title: "Nem sikerült bejelentkezni",
          description: "Helytelen felhasználónév vagy jelszó.",
        });
        console.log(error);
        setIsLoading(false);
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
    <>
      <div className="flex justify-center items-center h-screen p-2">
        <Card className="m-auto w-[400px] card">
          <div className="bg-muted_opacity w-full rounded-t-sm h-[93px]">
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-6">
              <Logo />
            </div>
            <div className="float-right flex flex-col mr-3 mt-1 gap-3">
              {/* <LanguageToggle /> */}
              <ModeToggle />
            </div>
          </div>
          <CardHeader>
            <CardTitle>
              <h1>Bejelentkezés</h1>
            </CardTitle>
          </CardHeader>
          {!waitingFor2F ? (
            <>
              <CardContent>
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
                            Felhasználónév{" "}
                            <span className="text-destructive">*</span>
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
                            <Input
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
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between items-center gap-3">
                <Button
                  type="submit"
                  data-cy="submit"
                  form="login"
                  className="btn"
                  disabled={isLoading}
                >
                  <div className="flex items-center gap-1">
                    Bejelentkezés
                    {isLoading && <Loading />}
                  </div>
                </Button>
                <Link href="/forgot-password" className="-mb-4 text-primary">
                  Elfelejtettem a jelszavam
                </Link>
              </CardFooter>
            </>
          ) : (
            <CardContent>
              {twoFData?.token && (
                <MyWebSocketComponent<Login>
                  setAuth={setAuth}
                  token={twoFData.token}
                />
              )}
              {twoFData?.email && (
                <p>
                  Az alábbi email címen erősítse meg a bejelentkezést:{" "}
                  <span className="font-bold">{twoFData.email}</span>
                </p>
              )}
              <p>
                Ahhoz, hogy bejelentkezzen kattintson az emailben érkezett
                linkre!
              </p>
              <p className="text-sm">Ezt az ablakot ne zárja be</p>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
}
