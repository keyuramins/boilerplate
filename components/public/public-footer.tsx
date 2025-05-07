"use client";

import React from 'react';
import Link from 'next/link';
import { projectConfig } from '@/config/project.config';
import { landingConfig } from '@/config/landing.config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();
  
  // Determine footer columns based on project configuration
  const footerColumns = [
    {
      title: "Navigation",
      links: projectConfig.navigation.public.map(item => ({
        name: item.name,
        href: item.href
      }))
    },
    {
      title: "Product",
      links: [
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Documentation", href: "/docs" },
        { name: "Roadmap", href: "/roadmap" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" }
      ]
    }
  ];
  
  // Filter out columns based on which routes are defined in publicRoutes
  const filteredColumns = footerColumns.map(column => {
    return {
      ...column,
      links: column.links.filter(link => 
        // Always include links with hash fragments like /#features
        link.href.includes('#') || 
        // Check if the route is in publicRoutes
        projectConfig.publicRoutes.includes(link.href)
      )
    };
  }).filter(column => column.links.length > 0);
  
  // Social media links
  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" }
  ];
  
  // Contact information
  const contactInfo = [
    { icon: MapPin, text: "123 Street Name, City, Country" },
    { icon: Phone, text: "+1 (123) 456-7890" },
    { icon: Mail, text: "contact@example.com" }
  ];
  
  return (
    <footer className={cn(
      "border-t bg-background px-6",
      landingConfig.footer?.variant === "dark" && "bg-muted/30"
    )}>
      <div className="container py-8 md:py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              {landingConfig.logo && (
                <img
                  src={landingConfig.logo}
                  alt={projectConfig.appName}
                  className="h-8 w-auto"
                />
              )}
              <span className="font-bold text-xl">{projectConfig.appName}</span>
            </Link>
            
            <p className="text-sm text-muted-foreground max-w-md">
              {projectConfig.appDescription}
            </p>
            
            {/* Newsletter Signup */}
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Subscribe to our newsletter</h3>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className="h-9" 
                />
                <Button size="sm" className="h-9 px-3">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <Link 
                  key={index} 
                  href={social.href}
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Navigation Columns */}
          {filteredColumns.map((column, index) => (
            column.links.length > 0 && (
              <div key={index} className="space-y-3">
                <h3 className="text-sm font-medium">{column.title}</h3>
                <nav className="flex flex-col space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            )
          ))}
          
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Contact</h3>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <info.icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{info.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {projectConfig.appName}. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              Built with Next.js, Supabase, and ShadCN UI
            </p>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
import {ThemeToggle} from '../common/theme-toggle';

