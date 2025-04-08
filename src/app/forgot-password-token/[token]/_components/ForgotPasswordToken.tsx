"use client";

import ENDPOINTURL from "@/app/url";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

function ForgotPasswordToken() {
  const params = useParams();
  const token = params.token;
  console.log(token);
  const { toast } = useToast();
  const router = useRouter();
  const formSchema = z.object({
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data: { password: string }) => {
    console.log(data);
    fetch(`${ENDPOINTURL}/user/changePassword`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: token,
        password: data.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: "A jelszó módosítása sikerült",
            description: "Használja az új jelszavát a bejelnetkezéshez",
            variant: "default",
          });
          router.push("/login");
        } else {
          toast({
            title: "Nem sikerült a jelszó módosítása!",
            variant: "destructive",
          });
        }
      })
      .catch(() =>
        toast({
          title: "Nem sikerült a jelszó módosítása!",
          variant: "destructive",
        })
      );
  };

  return (
    <Form {...form}>
      <form
        id="forgotPasswordToken"
        className="flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Új jelszó <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl data-cy="newPassword">
                <Input placeholder="Új jelszó" {...field} type="password" />
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
export default ForgotPasswordToken;
