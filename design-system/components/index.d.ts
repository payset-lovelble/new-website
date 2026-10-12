// Payset Website components, available as window.PaysetWeb.<Name>.
import * as React from "react";

export interface Link { label: string; href?: string; }
export interface TagLink extends Link { tone?: "light" | "black" | "neon" | "outline" | "chip"; }

export interface ButtonProps {
  children: React.ReactNode;
  /** primary: black pill, neon label (default) · contact: neon rectangle, charcoal label · secondary: outline · ghost: text · accent: neon pill (dark grounds) */
  variant?: "primary" | "contact" | "secondary" | "ghost" | "accent";
  /** md 40px (default, nav) · lg 51px (heros and cards) */
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

export interface TagProps {
  children: React.ReactNode;
  href?: string;
  /** light (default, on taupe/sand tiles) · black (neon label) · neon · outline (white, on dark cards) · chip (segment list on dark cards) */
  tone?: "light" | "black" | "neon" | "outline" | "chip";
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
  /** The bold H2 under a centred hero. */
  subtitle?: React.ReactNode;
  /** Regular paragraph, for inner-page heros. */
  lead?: React.ReactNode;
  eyebrow?: string;
  /** Neon rectangle, first: "Talk to us". */
  contactCta?: Link;
  /** Black pill, second: "Request an invitation". */
  primaryCta?: Link;
  /** @deprecated use contactCta */
  secondaryCta?: Link;
  /** Show the Trustpilot TrustBox under the buttons. */
  trustpilot?: boolean;
  /** Cards or Objects asset url. Without it the hero centres. */
  image?: string;
  imageAlt?: string;
  tone?: "light" | "dark";
  /** display (default, home page) · h1 (inner pages) */
  size?: "display" | "h1";
  align?: "left" | "center";
}

export interface TrustBoxProps {
  /** light: Micro Star (default) · dark: Micro Combo, on dark cards */
  theme?: "light" | "dark";
  /** Defaults to the Payset business unit. */
  businessUnitId?: string;
  className?: string;
}

export interface PhotoCardProps {
  /** Photography asset url. */
  image: string;
  imageAlt?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** Glass rows, bottom right: example payments, amounts as "250 000 EUR". */
  rows?: { label: string; status?: string; amount: string }[];
  rowsLabel?: string;
  tag?: TagLink;
}

export interface TileProps {
  title: string;
  body?: string;
  /** taupe (default) · sand · pewter · stone (UI renders) · espresso */
  tone?: "taupe" | "sand" | "pewter" | "stone" | "espresso";
  /** Objects asset url: bleeds off the bottom-right corner. */
  object?: string;
  /** Product UI asset url: centred, on a stone tile. */
  ui?: string;
  uiAlt?: string;
  tag?: TagLink;
  /** Fill the height of a two-tile column beside it. */
  tall?: boolean;
}

export interface SectionCardProps {
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** stone (default) · dark · green */
  tone?: "stone" | "dark" | "green";
  children?: React.ReactNode;
}

export interface IconPointProps {
  icon: "headset" | "bell" | "layers" | "badge" | "vault" | "key" | "globe" | "swap" | "chart";
  title: string;
  body?: string;
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
  /** Neon contact button before the primary: "Talk to us". */
  secondaryLabel?: string;
  secondaryHref?: string;
  /** stone (default) · inverse · brand */
  tone?: "stone" | "inverse" | "brand";
  trustpilot?: boolean;
}

export interface FooterProps {
  columns?: { title: string; links?: Link[] }[];
  tagline?: string;
  /** FCA authorisation line with FRN and company number. Required on every page. */
  legal?: string;
}

export declare function Button(props: ButtonProps): JSX.Element;
export declare function Tag(props: TagProps): JSX.Element;
export declare function Pill(props: PillProps): JSX.Element;
export declare function Logo(props: LogoProps): JSX.Element;
export declare function NavBar(props: NavBarProps): JSX.Element;
export declare function Hero(props: HeroProps): JSX.Element;
export declare function TrustBox(props: TrustBoxProps): JSX.Element;
export declare function PhotoCard(props: PhotoCardProps): JSX.Element;
export declare function Tile(props: TileProps): JSX.Element;
export declare function SectionCard(props: SectionCardProps): JSX.Element;
export declare function IconPoint(props: IconPointProps): JSX.Element;
export declare function FeatureCard(props: FeatureCardProps): JSX.Element;
export declare function ProductShowcase(props: ProductShowcaseProps): JSX.Element;
export declare function Testimonial(props: TestimonialProps): JSX.Element;
export declare function CTABand(props: CTABandProps): JSX.Element;
export declare function Footer(props: FooterProps): JSX.Element;
