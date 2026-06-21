import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Youtube,
  LucideMessageCircle,
} from "lucide-react";
const Footer = () => {
  const instagramLink =
    import.meta.env.VITE_INSTAGRAM_PAGE_LINK ||
    import.meta.env.INSTAGRAM_PAGE_LINK;
  const facebookLink =
    import.meta.env.VITE_FACEBOOK_PAGE_LINK ||
    import.meta.env.FACEBOOK_PAGE_LINK;
  const googleMapLink =
    import.meta.env.VITE_GOOGEL_MAP_LINK ||
    import.meta.env.GOOGEL_MAP_LINK ||
    import.meta.env.VITE_GOOGLE_MAP_LINK ||
    import.meta.env.GOOGLE_MAP_LINK;
  const linkedinLink =
    import.meta.env.VITE_LINKEDIN_PAGE_LINK ||
    import.meta.env.LINKEDIN_PAGE_LINK;
  const youtubeLink =
    import.meta.env.VITE_YOUTUBE_PAGE_LINK || import.meta.env.YOUTUBE_PAGE_LINK;
  const whatsappLink =
    import.meta.env.VITE_WHATSAPP_LINK || import.meta.env.VITE_WHATSAPP_LINK;
  const address =
    import.meta.env.VITE_ADDRESS ||
    "Sector 1, Aimnabad, Bisrakh Jalalpur, Greater Noida, Bisrakh Jalalpur, Uttar Pradesh 201318";
  const contactEmail =
    import.meta.env.VITE_CONTACT_EMAIL || "contact@sukoonworld.org";
  const supportPhone =
    import.meta.env.VITE_SUPPORT_PHONE_NUMBER || "+91 8447579022";
  const socialLinks = [
    instagramLink && {
      href: instagramLink,
      label: "Instagram",
      icon: Instagram,
    },
    facebookLink && { href: facebookLink, label: "Facebook", icon: Facebook },
    googleMapLink && { href: googleMapLink, label: "Google Map", icon: MapPin },
    linkedinLink && { href: linkedinLink, label: "LinkedIn", icon: Linkedin },
    youtubeLink && { href: youtubeLink, label: "YouTube", icon: Youtube },
    whatsappLink && {
      href: whatsappLink,
      label: "WhatsApp",
      icon: LucideMessageCircle,
    },
  ].filter(Boolean);

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="https://horizons-cdn.hostinger.com/1a2fb3d2-1219-4a66-9589-2aa950922210/a2073af892b9d00a489372d787acc8a2.jpg"
                alt="Sukoon World Logo"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A safe, confidential space for stress and anxiety relief. Where
              peace finds you.
            </p>
            <address className="not-italic text-sm text-gray-300 mb-4 max-w-md block">
              {address}
            </address>
            <p className="text-sm text-red-300 font-medium">
              ⚠️Sukoon World is not an emergency or crisis service. If you're in
              immediate danger, contact your local helpline.
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-6">
                <span className="text-sm font-semibold uppercase tracking-wide text-gray-300">
                  Follow Us
                </span>
                <div className="flex flex-wrap gap-3 mt-3">
                  {socialLinks.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 hover:border-white/30"
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="text-lg font-poppins font-semibold mb-4 block">
                Quick Links
              </span>
              <div className="space-y-2">
                <Link
                  to="/about"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
                <Link
                  to="/services"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </Link>
                <Link
                  to="/blog"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="mt-6">
              <span className="text-sm font-semibold uppercase tracking-wide text-gray-300 block">
                Contact Us
              </span>
              <div className="mt-3 text-sm text-gray-300">
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="text-lg font-poppins font-semibold mb-4 block">
                Legal
              </span>
              <div className="space-y-2">
                <Link
                  to="/privacy"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/cancellation"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Cancellation Policy
                </Link>
              </div>
            </div>
            <div className="mt-6">
              <span className="text-sm font-semibold uppercase tracking-wide text-gray-300 block">
                Phone Number
              </span>
              <div className="mt-3 text-sm text-gray-300">
                <a
                  href={`tel:${supportPhone}`}
                  className="hover:text-white transition-colors"
                >
                  {supportPhone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Sukoon World. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Designed and Developed by{" "}
            <a
              href="https://linkedin.com/in/shivdix"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Shivam Dixit
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
