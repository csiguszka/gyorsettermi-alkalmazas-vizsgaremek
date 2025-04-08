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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

function ForgotPasswordToken() {
  const { toast } = useToast();
  const router = useRouter();
  const formSchema = z.object({
    token: z.string().min(6, {
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: { email: string }) => {
    console.log(data);
    fetch(`${ENDPOINTURL}/user/forgetPassword`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: data.email,
      }),
    })
      .then(() => {
        toast({
          title: "A megadott email címre ellenőrző kódot küldtünk",
          variant: "default",
        });
        router.push("/forgot-password-token");
      })
      .catch(() =>
        toast({
          title: "A megadott email cím nincs regisztrálva",
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl data-cy="name">
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.email &&
                  form.formState.errors.email.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
export default ForgotPasswordToken;
