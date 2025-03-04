import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LanguageToggle } from "./LanguageToggle";
import { FormSubmitButton } from "./FormSubmitButton";

function FormCard({
  children,
  title,
  submitButtonText,
  formId,
}: {
  children: React.ReactNode;
  title: string;
  submitButtonText: string;
  formId: string;
}) {
  return (
    <div className="flex justify-center items-center h-screen p-2">
      <Card className="m-auto w-[400px] card">
        <div className="bg-muted_opacity w-full rounded-t-sm h-[93px]">
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-6">
            <Logo />
          </div>
          <div className="float-right flex flex-col mr-3 mt-1 gap-3">
            <LanguageToggle />
            <ModeToggle />
          </div>
        </div>
        <CardHeader>
          <CardTitle>
            <h1>{title}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <FormSubmitButton text={submitButtonText} formId={formId} />
        </CardFooter>
      </Card>
    </div>
  );
}
export default FormCard;
