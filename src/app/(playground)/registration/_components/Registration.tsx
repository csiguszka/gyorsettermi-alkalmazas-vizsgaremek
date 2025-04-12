"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import ENDPOINTURL from "@/app/url";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormSubmitButton } from "@/components/FormSubmitButton";

const formSchema = z
  .object({
    name: z.string().min(4, {
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
    role: z.string().nonempty({
      message: "Kérjük válassza ki a dolgozó státuszát.",
    }),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "A jelszavak nem egyeznek.",
    path: ["passwordRepeat"],
  });

export function Registration() {
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.states.user.value);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordRepeat: _passwordRepeat, ...dataToSubmit } = data;

    axios
      .post(`${ENDPOINTURL}/user/register/admin`, dataToSubmit, {
        headers: { "Accept-Language": "hu", Authorization: user.token },
      })
      .then(function (response) {
        toast({
          variant: "default",
          title: "Sikeresen rögzítette a dolgozót",
        });
        console.log(response.data);
        form.reset();
        // router.push("/");
      })
      .catch(function (error) {
        const description =
          error.response.status === 400 ? error?.response.data.message : "";
        toast({
          variant: "destructive",
          title: "Nem sikerült az új dolgozót felvenni",
          description: description,
        });
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center p-2">
      <Card className="m-auto w-[400px] card">
        <CardHeader>
          <CardTitle>
            <h1>Új dolgozó felvétele</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="newEmploy"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="font-bold">
                      Felhasználónév <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        data-cy="name"
                        className="shadow-md"
                        placeholder="Felhasználónév"
                        {...field}
                      />
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
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="font-bold">
                      Email <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-cy="email"
                        className="shadow-md"
                        placeholder="Email"
                        {...field}
                      />
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
                  <FormItem className="">
                    <FormLabel className="font-bold">
                      Jelszó <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-cy="password"
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
                  <FormItem className="">
                    <FormLabel className="font-bold">
                      Jelszó újra <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-cy="passwordRepeat"
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Dolgozó státusza <span className="text-red-600">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="shadow-md">
                          <SelectValue
                            data-cy="role"
                            placeholder="Dolgozó státusza"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem data-cy="kitchen" value="kitchen">
                          Konyhai dolgozó
                        </SelectItem>
                        <SelectItem data-cy="salesman" value="salesman">
                          Pultban dolgozó
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage>
                      {form.formState.errors.role?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between items-center gap-3">
          <FormSubmitButton text="Felvétel" formId="newEmploy" />
        </CardFooter>
      </Card>
    </div>
  );
}
