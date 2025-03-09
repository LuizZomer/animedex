import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    username: z.string().min(1, "Campo obrigatório"),
    email: z.string().email("Email obrigatório").min(1, "Campo obrigatório"),
    password: z.string().min(1, "Campo obrigatório"),
    confirmPassword: z.string().min(1, "Campo obrigatório"),
    photo: z.instanceof(File).optional(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "As senhas precisam ser iguais!",
      });
    }
  });

export type TRegister = z.infer<typeof schema>;

export const useRegisterForm = () => {
  const methods = useForm<TRegister>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return { methods, schema };
};
