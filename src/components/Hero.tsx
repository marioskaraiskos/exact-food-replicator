import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Food delivery hero" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hungry?
            <br />
            <span className="text-yellow-accent">Order now!</span>
          </h1>
          
          <p className="text-xl mb-8 text-white/90">
            Discover the best restaurants in your area and get your favorite food delivered fast.
          </p>

          {/* Address Search */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Enter your delivery address"
                    className="pl-10 border-0 text-foreground"
                  />
                </div>
              </div>
              <Button size="lg" className="md:w-auto w-full">
                <Search className="h-4 w-4 mr-2" />
                Find Restaurants
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-8 text-white/80">
            <div>
              <span className="font-bold text-2xl text-white">2000+</span>
              <br />
              <span className="text-sm">Restaurants</span>
            </div>
            <div>
              <span className="font-bold text-2xl text-white">30min</span>
              <br />
              <span className="text-sm">Avg Delivery</span>
            </div>
            <div>
              <span className="font-bold text-2xl text-white">4.8★</span>
              <br />
              <span className="text-sm">User Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;