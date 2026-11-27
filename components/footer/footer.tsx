import React from "react";
import Link from "next/link";
import { FaYoutube, FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import Title from "@/components/ui/text";
import { NewsletterForm } from "./newsletter-form";
import { cn } from "@/lib/utils";

const CONTACT_ITEMS = [
  {
    title: "Visit Us",
    description:
      "123 Shopping Street, Commerce District, New York, NY 10001, USA",
    href: "https://maps.google.com/?q=123+Shopping+Street+Commerce+District+New+York+NY+10001+USA",
    icon: MapPin,
  },
  {
    title: "Call Us",
    description: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    icon: Phone,
  },
  {
    title: "Working Hours",
    description: "Monday - Friday: 9AM - 6PM",
    href: undefined,
    icon: Clock,
  },
  {
    title: "Email Us",
    description: "support@shopcart.com",
    href: "mailto:support@shopcart.com",
    icon: Mail,
  },
];

const QUICK_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "FAQs", href: "/faqs" },
  { label: "Help", href: "/help" },
];

const CATEGORIES = [
  { label: "Mobiles", href: "/shop?category=mobiles" },
  { label: "Appliances", href: "/shop?category=appliances" },
  { label: "Smartphones", href: "/shop?category=smartphones" },
  { label: "Air Conditioners", href: "/shop?category=air-conditioners" },
  { label: "Washing Machine", href: "/shop?category=washing-machine" },
  { label: "Kitchen Appliances", href: "/shop?category=kitchen-appliances" },
  { label: "Gadget Accessories", href: "/shop?category=gadget-accessories" },
];

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
];
function SmartFooter() {
  return (
    <footer className="bg-white border-t border-gray-200/80 text-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {/* الصف العلوي: معلومات التواصل الأربع */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-gray-200/80">
          {CONTACT_ITEMS.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-start gap-3.5 group">
                <div className="mt-0.5 text-gray-600 group-hover:text-gray-900 transition shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed group-hover:text-gray-700 transition">
                    {item.description}
                  </p>
                </div>
              </div>
            );

            if (item.href) {
              const isExternal = item.href.startsWith("http");
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  {content}
                </Link>
              );
            }

            return <div key={item.title}>{content}</div>;
          })}
        </div>

        {/* القسم الأوسط: 4 أعمدة (البراند + Quick Links + Categories + Newsletter) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-gray-200/80">
          {/* العمود الأول: الشعار والوصف وأيقونات التواصل */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-1.5">
              <Title className="text-xl font-extrabold tracking-tight text-gray-900">
                SHOPCART
              </Title>
              <span className="text-amber-500 font-bold text-lg">.</span>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed">
              Discover amazing products at ShopCart, your trusted online
              shopping destination for quality items and exceptional customer
              service.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              {SOCIAL_LINKS.map((social) => {
                const SocialIcon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="h-10 w-10 rounded-full border border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-shop_dark_green hover:border-shop_dark_green hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs"
                  >
                    <SocialIcon className="h-4.5 w-4.5 stroke-[1.8]" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* العمود الثاني: Quick Links */}
          <div>
            <Title className="text-sm font-semibold text-gray-900 mb-4">
              Quick Links
            </Title>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: Categories */}
          <div>
            <Title className="text-sm font-semibold text-gray-900 mb-4">
              Categories
            </Title>
            <ul className="space-y-2.5">
              {CATEGORIES.map((category) => (
                <li key={category.label}>
                  <Link
                    href={category.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الرابع: Newsletter */}
          <div>
            <Title className="text-sm font-semibold text-gray-900 mb-3">
              Newsletter
            </Title>
            <NewsletterForm />
          </div>
        </div>

        {/* شريط الحقوق السفلي */}
        <div className="pt-6 text-center text-xs sm:text-sm text-gray-500">
          © 2026{" "}
          <h2
            className={cn(
              "text-2xl font-extrabold tracking-tight   text-gray-900 transition-colors duration-300",
            )}
          >
            My Shoppin
            <span className="text-emerald-600 transition-colors duration-300 group-hover:text-emerald-800">
              g
            </span>
          </h2>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default SmartFooter;
