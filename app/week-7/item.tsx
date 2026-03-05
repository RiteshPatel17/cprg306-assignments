interface ItemProps {
  name: string;
  quantity: number;
  category: string;

  // NEW: a function the parent gives us, called when user clicks the item
  onSelect: () => void;
}

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li
      onClick={onSelect}
      className="border p-3 m-2 rounded cursor-pointer hover:bg-gray-100"
    >
      <p className="font-bold">{name}</p>
      <p>Quantity: {quantity}</p>
      <p className="capitalize">Category: {category}</p>
    </li>
  );
}