"use client";

import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Button } from "./ui/button";

interface FormSubmitButtonProps {
  text: string;
  formId: string;
}

export function FormSubmitButton({ text, formId }: FormSubmitButtonProps) {
  const [loading, setLoading] = useState(false);

  // Listen to submit event globally
  const handleSubmit = (e: SubmitEvent) => {
    if (e.target instanceof HTMLFormElement && e.target.id === formId) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  };

  // Attach once when component mounts
  useEffect(() => {
    window.addEventListener("submit", handleSubmit);
    return () => {
      window.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return (
    <Button
      type="submit"
      data-cy="submit"
      form={formId}
      className="btn"
      disabled={loading}
    >
      <div className="flex items-center gap-1">
        {text}
        {loading && <Loading />}
      </div>
    </Button>
  );
}
