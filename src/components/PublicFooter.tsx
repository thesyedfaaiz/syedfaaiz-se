import { BrandLogo, PLATFORM_KIND_KICKER, getAppSocials, getCurrentProduct, getPersonSocials, getPlatformGroups, getProductUrl, type PlatformSocialId } from "@thesyedfaaiz/ui";
import {
  AtSign,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Music2,
  Youtube,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo } from "react";
import "./PublicFooter.css";

const socialIcons: Record<PlatformSocialId, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
  threads: AtSign,
  tiktok: Music2,
};

export default function PublicFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const current = getCurrentProduct();
  const personSocials = getPersonSocials();
  const appSocials = getAppSocials(current.id);
  const groups = getPlatformGroups();

  return (
    <footer className="se-footer">
      <div className="se-footer__inner">
        <div className="se-footer__grid">
          <div>
            <a href={getProductUrl("se")} className="se-footer__brand">
              <BrandLogo brand="se" className="se-footer__logo" title="Syed Faaiz Engineering" />
              <span>Syed Faaiz Engineering</span>
            </a>
            <p className="se-footer__description">
              Software engineering, AI applications, and product systems built from interface to cloud.
            </p>
            <p className="se-footer__kicker">{PLATFORM_KIND_KICKER[current.kind]}</p>
            <div className="se-footer__socials">
              {appSocials.length > 0 && (
                <div className="se-footer__social-group">
                  <h2>Engineering socials</h2>
                  <div>
                    {appSocials.map((social) => {
                      const Icon = socialIcons[social.id];
                      return <a key={social.id} href={social.url} target="_blank" rel="noreferrer" aria-label={social.name} title={social.name}><Icon aria-hidden="true" /></a>;
                    })}
                  </div>
                </div>
              )}
              <div className="se-footer__social-group">
                <h2>Syed Faaiz socials</h2>
                <div>
                  {personSocials.map((social) => {
                    const Icon = socialIcons[social.id];
                    return <a key={social.id} href={social.url} target="_blank" rel="noreferrer" aria-label={social.name} title={social.name}><Icon aria-hidden="true" /></a>;
                  })}
                </div>
              </div>
            </div>
          </div>

          <nav aria-label="Explore engineering">
            <h2>Explore</h2>
            <ul>
              <li><a href="/">Portfolio</a></li>
              <li><a href="/case-studies">Case studies</a></li>
              <li><a href={getProductUrl("com") + "/about"}>About Syed Faaiz</a></li>
            </ul>
          </nav>

          <nav aria-label="Syed Faaiz platform">
            {groups.map((group) => (
              <div key={group.kind}>
                <h2>{group.label}</h2>
                <ul className="se-footer__products">
                  {group.apps.map((app) => (
                    <li key={app.id}>
                      {app.isAvailable ? (
                        <a href={app.url} className="se-footer__product">
                          <BrandLogo brand={app.id} className="se-footer__logo" title={app.name} />
                          <span>{app.name}</span>
                        </a>
                      ) : (
                        <span className="se-footer__product se-footer__product--pending" data-tooltip="Coming soon" tabIndex={0} aria-label={`${app.name} — coming soon`}>
                          <BrandLogo brand={app.id} className="se-footer__logo" title={app.name} />
                          <span>{app.name}</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="se-footer__bottom">
          <span>© {year} Syed Faaiz Engineering</span>
          <span>{PLATFORM_KIND_KICKER[current.kind]}</span>
        </div>
      </div>
    </footer>
  );
}
