import Link from "next/link";
import { BsDiamondFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";

export type NavbarProps = {
  options: {
    label: string;
    href: string;
    target?: string;
    onClick?: () => void;
  }[];
  title?: string;
  href?: string;
  className?: string;
};

export default function Navbar({
  options,
  title,
  href,
  className,
}: NavbarProps) {
  const navbarTitle = title || "brunotatsuya.dev";
  const navbarHref = href || "/";

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${className}`}
      id="mainNav"
    >
      <div className="container" id="containerNavbar">
        <Link href={navbarHref} className="navbar-brand">
          <BsDiamondFill className="spinner-element" />
          <span className="mx-3 fs-5">{navbarTitle}</span>
        </Link>
        <button
          className="navbar-toggler font-weight-bold text-white btn-primary btn-round"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
        <div
          className="collapse navbar-collapse font-monospace"
          id="navbarResponsive"
        >
          <ul className="navbar-nav ms-auto">
            {options.map((option) => (
              <li className="nav-item mx-0 mx-lg-1" key={option.href}>
                <Link
                  onClick={option.onClick}
                  href={option.href}
                  target={option.target}
                  className="nav-link py-3 px-0 px-lg-3"
                >
                  {option.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
