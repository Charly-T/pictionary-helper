import { Category } from "../constants";
import { categories } from "../categories";
import "./Card.css";

interface CardProps {
  category: Category;
}

export default function Card({ category }: CardProps) {
  const colorMap: Record<Category, string> = {
    [Category.personPlaceAnimal]: "yellow",
    [Category.object]: "blue",
    [Category.action]: "orange",
    [Category.difficult]: "green",
    [Category.allPlay]: "red",
  };
  const array = new Uint32Array(1);
  const r = crypto.getRandomValues(array)[0];
  const randomWord = categories[category][r % categories[category].length];

  return (
    <div className={`card ${colorMap[category]}`}>
      <div>{category}</div>
      <div>{randomWord}</div>
    </div>
  );
}
