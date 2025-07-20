import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg font-bold text-xl mb-4 inline-block">
              e-food
            </div>
            <p className="text-background/80 mb-4">
              Greece's leading food delivery platform. Order from thousands of restaurants and get your favorite meals delivered fast.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-background hover:text-primary">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:text-primary">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">How it Works</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Restaurants</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Become a Partner</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-background/80">+30 210 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-background/80">support@e-food.gr</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-background/80">Athens, Greece</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60">
            © 2024 e-food Greece. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;