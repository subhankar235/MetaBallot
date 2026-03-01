import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Github, Linkedin, Twitter, Mail, ArrowRight, CheckCircle } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Security', 'Pricing', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'API Reference', 'Status', 'Support'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Compliance'],
};

export default function MegaFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#050505] pt-24 pb-12 px-6 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF9900]/50 to-transparent" />
      
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF9900]/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Ahead of the Curve
          </h3>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Get the latest updates on blockchain voting, security insights, and exclusive early access.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-full focus:border-[#FF9900] focus:ring-[#FF9900]/20"
              />
            </div>
            <Button
              type="submit"
              disabled={subscribed}
              className="h-14 px-8 bg-[#FF9900] hover:bg-[#FFB84D] text-black font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              {subscribed ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FF9900] flex items-center justify-center">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold text-white">Meta Ballot</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Revolutionizing democracy with secure, transparent, and immutable blockchain voting.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-white/50 hover:text-[#FF9900] transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Meta Ballot. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF9900]/20 hover:text-[#FF9900] transition-all text-white/60"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF9900]/20 hover:text-[#FF9900] transition-all text-white/60"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF9900]/20 hover:text-[#FF9900] transition-all text-white/60"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}