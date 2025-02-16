import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  description: z.string().min(1, "Campo obrigatório"),
  category: z.string().min(1, "Campo obrigatório"),
});

export type TCreateChat = z.infer<typeof schema>;

export const useCreateChat = () => {
  const methods = useForm<TCreateChat>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
      description: "",
      name: "",
    },
  });

  return { methods, schema };
};
