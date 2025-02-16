import { useRouter } from "next/router";

export const ChatCard = ({ data }: { data: IChat }) => {
  const { push } = useRouter();
  const { category, createdAt, name, id, description } = data;
  return (
    <div
      className="border p-2 rounded-md cursor-pointer "
      onClick={() => push(`/chat/${id}`)}
    >
      <h4 className="font-bold text-lg">{name}</h4>
      <p>descrição: {description}</p>
      <p>Categoria: {category}</p>
      <p>Criado em: {new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
};
