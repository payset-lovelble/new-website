// Payset Website components, available as window.PaysetWeb.<Name>.
import * as React from "react";

export interface Link { label: string; href?: string; }

export interface ButtonProps {
  children: React.ReactNode;
  /** primary (default) · accent (dark grounds only) · secondary · ghost */
  variant?: "primary" | "accent" | "secondary" | "ghost";
  /** md 44px (default) · lg 56px */
  size?: "md" | "lg";
  /** Renders an <a> when set. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Trailing arrow for forward motion. */
  arrow?: boolean;
  className?: string;
}

export interface PillProps {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "inverse";
  dot?: boolean;
  className?: string;
}

export interface LogoProps {
  /** true: white file · false: money-green file · omitted: follows the theme */
  onDark?: boolean;
  /** Height in px, default 28, minimum 20. */
  height?: number;
}

export interface NavBarProps {
  links?: Link[];
  ctaLabel?: string;
  ctaHref?: string;
  signInLabel?: string;
  signInHref?: string;
  homeHref?: string;
  tone?: "light" | "dark";
}

export interface HeroProps {
  title: React.ReactNode;
  lead?: React.ReactNode;
  eyebrow?: string;
  primaryCta?: Link;
  secondaryCta?: Link;
  /** Cards or Objects asset url (transparent ground). Without it the hero centres. */
  image?: string;
  imageAlt?: string;
  tone?: "light" | "dark";
  /** display (default, home page) · h1 (inner pages) */
  size?: "display" | "h1";
  align?: "left" | "center";
}

export interface FeatureCardProps {
  title: string;
  body?: string;
  /** Objects asset url. */
  image?: string;
  imageAlt?: string;
  link?: Link;
  tone?: "raised" | "subtle" | "brand";
}

export interface ProductShowcaseProps {
  /** Product UI asset url. */
  image: string;
  imageAlt: string;
  title: string;
  body?: string;
  eyebrow?: string;
  points?: string[];
  reverse?: boolean;
}

export interface TestimonialProps {
  quote: React.ReactNode;
  name: string;
  role?: string;
  company?: string;
  photo?: string;
  photoAlt?: string;
}

export interface CTABandProps {
  title: React.ReactNode;
  eyebrow?: string;
  body?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tone?: "inverse" | "brand";
}

export interface FooterProps {
  columns?: { title: string; links?: Link[] }[];
  tagline?: string;
  /** FCA authorisation line with FRN and company number. Required on every page. */
  legal?: string;
}

export declare function Button(props: ButtonProps): JSX.Element;
export declare function Pill(props: PillProps): JSX.Element;
export declare function Logo(props: LogoProps): JSX.Element;
export declare function NavBar(props: NavBarProps): JSX.Element;
export declare function Hero(props: HeroProps): JSX.Element;
export declare function FeatureCard(props: FeatureCardProps): JSX.Element;
export declare function ProductShowcase(props: ProductShowcaseProps): JSX.Element;
export declare function Testimonial(props: TestimonialProps): JSX.Element;
export declare function CTABand(props: CTABandProps): JSX.Element;
export declare function Footer(props: FooterProps): JSX.Element;
