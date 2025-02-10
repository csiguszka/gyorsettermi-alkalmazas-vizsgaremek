"use client";

import { role } from "@/app/model/decoded-model";
import { useLoginValidation } from "../app/hooks/useLoginValidation";
import LoginValidateText from "./LoginValidateText";

function Authorize({
  roles,
  children,
}: {
  roles?: role[];
  children: React.ReactNode;
}) {
  const loading = useLoginValidation(roles);

  if (loading) {
    return <LoginValidateText />;
  }
  return <>{children}</>;
}
export default Authorize;
