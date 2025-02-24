"use client";

import { useState } from "react";
import Loading from "./Loading";
import { Button } from "./ui/button";

interface FormSubmitButtonProps {
  text: string;
  formId: string;
}

export function FormSubmitButton({ text, formId }: FormSubmitButtonProps) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      type="submit"
      data-cy="submit"
      form={formId}
      className="btn"
      onClick={() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }}
    >
      <div className="flex items-center gap-1">
        {text}
        {loading && <Loading />}
      </div>
    </Button>
  );
}
