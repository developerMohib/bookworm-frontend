import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

interface FooterLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks: FooterLink[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const legalLinks: FooterLink[] = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
    { href: '/sitemap.xml', label: 'Sitemap' },
  ];

  const socialLinks: SocialLink[] = [
    { href: 'https://facebook.com', label: 'Facebook', icon: <FaFacebook /> },
    { href: 'https://twitter.com', label: 'Twitter', icon: <FaTwitter /> },
    { href: 'https://instagram.com', label: 'Instagram', icon: <FaInstagram /> },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: <FaLinkedin /> },
    { href: 'https://github.com', label: 'GitHub', icon: <FaGithub /> },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand/Logo Section */}
          <div className="space-y-2">
            <Link href="/" className="text-2xl font-bold">
              YourBrand
            </Link>
            <p className="text-gray-400 max-w-xs">
              Building amazing experiences with modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-400 hover:text-white text-2xl transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} YourBrand. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            Built with ❤️ using Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}