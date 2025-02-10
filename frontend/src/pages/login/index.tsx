import { Form } from "@/components/ui/form";
import { useLoginForm } from "@/hooks/form/useLoginForm";

const Login = () => {
  const { methods } = useLoginForm();

  return (
    <div>
      <Form {...methods}>
        <form></form>
      </Form>
    </div>
  );
};

export default Login;
