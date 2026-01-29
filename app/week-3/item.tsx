interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item(props: ItemProps) {
  return (
    <li className="border p-3 m-2 rounded">
      <p className="font-bold">{props.name}</p>
      <p>Quantity: {props.quantity}</p>
      <p>Category: {props.category}</p>
    </li>
  );
}
