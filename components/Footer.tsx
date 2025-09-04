import type React from "react"
import Image from "next/image"
import { FaFacebook, FaLinkedinIn, FaWhatsapp } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";

import FooterColumn from "./FooterColumn"
import Link from "next/link"

const socialIcons = [
  {
    icon: FaFacebook,
    name: "Facebook",
    link: "https://facebook.com/panaversity/",
  },
  { 
    icon: RiInstagramFill, 
    name: "Instagram", 
    link: "https://www.instagram.com/panaversity/?igsh=cmljY3A2bmcyNzl3#" 
  },
  {
    icon: IoLogoYoutube,
    name: "Youtube",
    link: "https://www.youtube.com/channel/UCV1ZbnHzA7FwG7XXYYzE84w",
  },
  {
    icon: FaLinkedinIn,
    name: "LinkedIn",
    link: "https://www.linkedin.com/company/panaversity/",
  },
]

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer className="bg-[#031811] pt-[4.5rem] text-white">
      <div className="flex w-full justify-center">
        <div className="mx-6 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 md:mx-16 lg:max-w-[950px] lg:grid-cols-4 xl:max-w-6xl">
          {/* Left section: Logo & Social Icons */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div className="mb-6 lg:-mt-9 xl:-mt-4">
              {/* Logo */}
              <Link href="/" aria-label="Panaversity Home">
                <Image
                  src="/logo.png"
                  alt="Panaversity logo"
                  className="mb-2 h-20 w-auto cursor-pointer"
                  width={200}
                  height={80}
                />
              </Link>
              <p className="mb-1 mt-1 text-sm leading-relaxed text-gray-400">
                Panaversity is a cloud-native learning platform for Agentic AI, robotics, and next-gen AI skills.
              </p>
              <div className="flex gap-4 py-2">
                {socialIcons.map(({ icon: Icon, name, link }, index) => (
                  <Link
                    href={link}
                    key={index}
                    target="_blank"
                    aria-label={name}
                  >
                    <Icon className="h-[1.5rem] w-[1.5rem] cursor-pointer text-gray-200 transition-all duration-150 hover:text-green-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column Sections */}
          <FooterColumn
            title="Company"
            links={[
              { name: "About Us", href: "https://panaversity.org/#about" },
              { name: "Flagship Program", href: "https://panaversity.org/flagship-program" },
              { name: "Courses", href: "https://panaversity.org/flagship-program/courses" },
              { name: "Terms & Conditions", href: "https://panaversity.org/terms-and-conditions" },
              { name: "Certifications", href: "https://panaversity.org/certifications" },
            ]}
            className="lg:ml-20"
          />

          <FooterColumn
            title="Support"
            links={[
              { name: "Contact Us", href: "https://panaversity.org/contact" },
              { name: "Our Team", href: "https://panaversity.org/team" },
              { name: "Privacy Policy", href: "https://panaversity.org/privacy-policy" },
              { name: "How To Enroll", href: "https://panaversity.org/panaversity_guide.pdf" },
              { name: "FAQs", href: "https://panaversity.org/#faqs" },
            ]}
            className="lg:ml-20"
          />

          {/* WhatsApp Community section */}
          <div className="col-span-2 mt-8 w-full text-sm sm:col-span-2 md:col-span-1 md:mt-0">
            <h3 className="mb-2 text-lg font-semibold text-white">Join Our Community</h3>
            <div className="space-y-4">
              <Link
                href="https://whatsapp.com/channel/0029VanobNVHbFV2oZLXX125"
                target="_blank"
                aria-label="Join WhatsApp Community"
                className="inline-flex items-center gap-3 rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-gray-300 transition-all duration-200 ease-in-out hover:border-green-400 hover:bg-green-400/10 hover:text-green-400"
              >
                <FaWhatsapp className="h-5 w-5" />
                <span className="font-medium lg:text-xs xl:text-sm">WhatsApp Community</span>
              </Link>
              <p className="text-gray-400">
                Join our WhatsApp community for latest AI updates & discussions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="mt-14 flex h-16 items-center justify-center bg-[#041F16] text-center text-sm text-gray-400">
        © Copyright {currentYear} Panaversity, Inc.
      </div>
    </footer>
  );
};

export default Footer;