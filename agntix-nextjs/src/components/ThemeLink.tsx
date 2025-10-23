"use client";
import Link from "next/link";

interface ThemeLinkProps extends React.ComponentProps<typeof Link> {
  themeDefault?: string;
}

export default function ThemeLink({ href, onClick, ...props }: ThemeLinkProps) {

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}