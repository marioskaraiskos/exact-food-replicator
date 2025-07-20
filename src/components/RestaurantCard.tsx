import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Truck } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  image: string;
  isOpen: boolean;
  tags: string[];
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard = ({ restaurant, onClick }: RestaurantCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
            <span className="text-white font-medium">Closed</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          {restaurant.deliveryFee === 0 && (
            <Badge className="bg-success hover:bg-success">Free Delivery</Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{restaurant.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{restaurant.rating}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3">{restaurant.cuisine}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck className="h-4 w-4" />
            <span>{restaurant.deliveryFee === 0 ? 'Free' : `€${restaurant.deliveryFee}`}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {restaurant.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground">
          Min. order: €{restaurant.minOrder}
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;