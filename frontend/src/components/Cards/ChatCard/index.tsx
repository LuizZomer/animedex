import { useRouter } from "next/router";

export const ChatCard = ({ data }: { data: IChat }) => {
  const { push } = useRouter();
  const { category, createdAt, name, id } = data;
  return (
    <div className="border" onClick={() => push(`/forum/${id}`)}>
      <h4>{name}</h4>
      <p>Categoria: {category}</p>
      <p>Criado em: {new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
};
