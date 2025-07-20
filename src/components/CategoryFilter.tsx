import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "burger", name: "Burgers", icon: "🍔" },
  { id: "sushi", name: "Sushi", icon: "🍣" },
  { id: "greek", name: "Greek", icon: "🥙" },
  { id: "italian", name: "Italian", icon: "🍝" },
  { id: "asian", name: "Asian", icon: "🥢" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
  { id: "coffee", name: "Coffee", icon: "☕" },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <section className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">What are you craving?</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => onCategoryChange(category.id)}
              className="flex-shrink-0 h-auto py-3 px-4 flex flex-col items-center gap-1 min-w-[80px]"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;