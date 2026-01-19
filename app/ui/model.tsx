import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  cn?: string;
  footer?: React.ReactNode;
  header?: string;
  description?: string;
}

export const CustomModal: React.FC<ModalProps> = ({
  open,
  onClose,
  cn,
  children,
  footer,
  header,
  description,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal content */}
      <Card className={`relative z-10 w-full max-w-sm ${cn}`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-accent cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        {header && (
          <CardHeader>
            <CardTitle>{header}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}

        <CardContent>{children}</CardContent>

        {footer && (
          <CardFooter className="flex-col gap-2 ">{footer}</CardFooter>
        )}
      </Card>
    </div>
  );
};
