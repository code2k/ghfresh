import React from "react";
import { Link } from "@material-ui/core";

type ColorType =
  | "initial"
  | "inherit"
  | "primary"
  | "secondary"
  | "textPrimary"
  | "textSecondary"
  | "error";

interface Props {
  href: string;
  className?: string;
  color?: ColorType;
  children: React.ReactNode;
}

const ExternalLink = ({ children, color, className, href }: Props) => {
  return (
    <Link
      className={className}
      color={color}
      href={href}
      target="_blank"
      rel="noopener"
    >
      {children}
    </Link>
  );
};

export default ExternalLink;
