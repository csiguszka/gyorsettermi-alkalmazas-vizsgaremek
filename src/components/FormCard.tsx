import Logo from "./Logo";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function FormCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex justify-center items-center h-screen p-2">
      <Card className="m-auto w-[400px]">
        <CardHeader>
          <div className="m-auto">
            <Logo />
          </div>
          <CardTitle className="text-3xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
export default FormCard;
