import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import restaurant1 from "@/assets/restaurant-1.jpg";
import restaurant2 from "@/assets/restaurant-2.jpg";
import restaurant3 from "@/assets/restaurant-3.jpg";

const restaurants = [
  {
    id: "1",
    name: "Taverna Mykonos",
    cuisine: "Greek Traditional",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: 0,
    minOrder: 15,
    image: restaurant1,
    isOpen: true,
    tags: ["Greek", "Traditional", "Healthy"]
  },
  {
    id: "2",
    name: "Mario's Pizza Palace",
    cuisine: "Italian • Pizza",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 2.5,
    minOrder: 12,
    image: restaurant2,
    isOpen: true,
    tags: ["Pizza", "Italian", "Fast Food"]
  },
  {
    id: "3",
    name: "Sakura Sushi",
    cuisine: "Japanese • Sushi",
    rating: 4.9,
    deliveryTime: "30-40 min",
    deliveryFee: 0,
    minOrder: 20,
    image: restaurant3,
    isOpen: true,
    tags: ["Sushi", "Japanese", "Fresh"]
  },
  {
    id: "4",
    name: "Burger House",
    cuisine: "American • Burgers",
    rating: 4.4,
    deliveryTime: "15-25 min",
    deliveryFee: 1.5,
    minOrder: 10,
    image: restaurant2,
    isOpen: false,
    tags: ["Burgers", "American", "Fast Food"]
  },
  {
    id: "5",
    name: "Pasta La Vista",
    cuisine: "Italian • Pasta",
    rating: 4.7,
    deliveryTime: "25-35 min",
    deliveryFee: 2.0,
    minOrder: 14,
    image: restaurant1,
    isOpen: true,
    tags: ["Pasta", "Italian", "Comfort Food"]
  },
  {
    id: "6",
    name: "Dragon Wok",
    cuisine: "Chinese • Asian",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: 0,
    minOrder: 16,
    image: restaurant3,
    isOpen: true,
    tags: ["Chinese", "Asian", "Spicy"]
  }
];

interface RestaurantGridProps {
  selectedCategory: string;
}

const RestaurantGrid = ({ selectedCategory }: RestaurantGridProps) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (selectedCategory === "all") return true;
    return restaurant.tags.some(tag => 
      tag.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  const handleRestaurantClick = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId);
    // Here you would typically navigate to restaurant details page
    console.log("Selected restaurant:", restaurantId);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {selectedCategory === "all" ? "All Restaurants" : `${selectedCategory} Restaurants`}
        </h2>
        <span className="text-muted-foreground">
          {filteredRestaurants.length} restaurants found
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => handleRestaurantClick(restaurant.id)}
          />
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No restaurants found for "{selectedCategory}" category.
          </p>
          <p className="text-muted-foreground">
            Try selecting a different category or check back later.
          </p>
        </div>
      )}
    </section>
  );
};

export default RestaurantGrid;