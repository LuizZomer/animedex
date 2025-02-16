import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/Auth/useAuthContext";
import { TLogin, useLoginForm } from "@/hooks/form/useLoginForm";
import { useRouter } from "next/router";

const Login = () => {
  const { methods } = useLoginForm();
  const { signIn } = useAuthContext();
  const { push } = useRouter();

  const handleLogin = async (data: TLogin) => {
    signIn({ password: data.password, username: data.username }).then(() => {
      push("/chat/list");
    });
  };

  return (
    <div>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleLogin)}>
          <FormField
            control={methods.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Insira seu nome de usuario" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Insira sua senha" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Entrar</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
