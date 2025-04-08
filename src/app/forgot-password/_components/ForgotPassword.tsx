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
import { useForm } from "react-hook-form";
import { z } from "zod";

function ForgotPassword() {
  const { toast } = useToast();
  const formSchema = z.object({
    email: z.string().email({
      message: "Kérjük valós email címet adjon meg.",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: { email: string }) => {
    console.log("here");
    const url = process.env.NEXT_PUBLIC_URL;
    fetch(`${ENDPOINTURL}/user/forgetPassword`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        url: url,
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: "A megadott email címre ellenőrző kódot küldtünk",
            variant: "default",
          });
          form.reset();
        } else {
          toast({
            title: "A megadott email cím nincs regisztrálva",
            variant: "destructive",
          });
        }
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
        id="forgotPassword"
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
export default ForgotPassword;
