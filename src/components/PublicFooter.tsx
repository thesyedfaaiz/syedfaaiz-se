import {
  ArrowUpRight,
  AtSign,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Music2,
  Youtube,
} from "lucide-react";
import { useMemo } from "react";
import "./PublicFooter.css";

const products = [
  ["Syed Faaiz", "https://syedfaaiz.com", true, "https://syedfaaiz.com/logo.svg"],
  ["Syed Faaiz IDP", "https://auth.syedfaaiz.com", true, "https://auth.syedfaaiz.com/logo.svg"],
  ["Nodes", "https://nodes.syedfaaiz.com", true, "https://nodes.syedfaaiz.com/logo.svg"],
  ["For Muslim", "https://muslim.syedfaaiz.com", false, "https://muslim.syedfaaiz.com/logo.svg"],
  ["Zaffixx", "https://zaffixx.com", false, "https://zaffixx.com/logo.svg"],
  ["Xcod", "https://xcod.ai", false, "https://xcod.ai/logo.svg"],
  ["Skillionaire", "https://skillionaire.com", false, "https://skillionaire.com/logo.svg"],
] as const;

const socials = [
  ["GitHub", "https://github.com/thesyedfaaiz", Github],
  ["LinkedIn", "https://www.linkedin.com/in/thesyedfaaiz/", Linkedin],
  ["YouTube", "https://www.youtube.com/@thesyedfaaiz", Youtube],
  ["Instagram", "https://www.instagram.com/thesyedfaaiz/", Instagram],
  ["Facebook", "https://www.facebook.com/thesyedfaaiz/", Facebook],
  ["Threads", "https://www.threads.net/@thesyedfaaiz", AtSign],
  ["TikTok", "https://www.tiktok.com/@thesyedfaaiz", Music2],
] as const;
const appSocials = [
  ["Engineering Instagram", Instagram],
  ["Engineering YouTube", Youtube],
  ["Engineering Facebook", Facebook],
] as const;

export default function PublicFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="se-footer">
      <div className="se-footer__inner">
        <div className="se-footer__grid">
          <div>
            <a href="https://se.syedfaaiz.com" className="se-footer__brand">
              <img src="/logo.svg" alt="" />
              <span>Syed Faaiz Engineering</span>
            </a>
            <p className="se-footer__description">
              Software engineering, AI applications, and product systems built from interface to cloud.
            </p>
            <p className="se-footer__kicker">A Syed Faaiz product</p>
            <div className="se-footer__socials">
              <div className="se-footer__social-group">
                <h2>Engineering socials</h2>
                <div>
                  {appSocials.map(([label, Icon]) => (
                    <span key={label} className="se-footer__social-pending" data-tooltip="Coming soon" tabIndex={0} aria-label={`${label} — coming soon`}><Icon aria-hidden="true" /></span>
                  ))}
                </div>
              </div>
              <div className="se-footer__social-group">
                <h2>Syed Faaiz socials</h2>
                <div>
                  {socials.map(([label, href, Icon]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                      <Icon aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <nav aria-label="Explore engineering">
            <h2>Explore</h2>
            <ul>
              <li><a href="/">Portfolio</a></li>
              <li><a href="/case-studies">Case studies</a></li>
              <li><a href="https://syedfaaiz.com/about">About Syed Faaiz</a></li>
            </ul>
          </nav>

          <nav aria-label="Syed Faaiz platform">
            <h2>Syed Faaiz platform</h2>
            <ul className="se-footer__products">
              {products.map(([name, href, available, image]) => (
                <li key={name}>
                  {available ? (
                    <a href={href} className="se-footer__product">
                      <img src={image} alt="" />
                      <span>{name}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : (
                    <span
                      className="se-footer__product se-footer__product--pending"
                      data-tooltip="Coming soon"
                      tabIndex={0}
                      aria-label={`${name} — coming soon`}
                    >
                      <img src={image} alt="" />
                      <span>{name}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="se-footer__bottom">
          <span>© {year} Syed Faaiz Engineering</span>
          <span>Building useful things for the web.</span>
        </div>
      </div>
    </footer>
  );
}
