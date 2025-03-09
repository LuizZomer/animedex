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
import { TRegister, useRegisterForm } from "@/hooks/form/useRegisterForm";
import { api } from "@/services/api";
import { useRouter } from "next/router";

const Register = () => {
  const { methods } = useRegisterForm();
  const { push } = useRouter();

  const handleRegister = (data: TRegister) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "photo") {
        formData.append(key, value);
      }
    });

    if (data.photo instanceof File) {
      formData.append("photo", data.photo);
    }

    api
      .post("/api/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        push("/login");
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleRegister)}>
          <FormField
            name="photo"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto de perfil:</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      field.onChange(file);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="username"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome usuário:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha:</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirmPassword"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha:</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Registrar</Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
