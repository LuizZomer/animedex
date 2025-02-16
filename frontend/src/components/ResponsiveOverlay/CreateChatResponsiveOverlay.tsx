import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { DefaultResponsiveOverlay } from "./DefaultResponsiveOverlay";
import { useState } from "react";
import { TCreateChat, useCreateChat } from "@/hooks/form/useCreateChat";
import { Form } from "../ui/form";

export const CreateChatResponsiveOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { methods } = useCreateChat();

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleCreate = (data: TCreateChat) => {
    console.log(data);
  };

  return (
    <DefaultResponsiveOverlay
      onOpen={onOpen}
      isOpen={isOpen}
      onClose={onClose}
      title="Criar um novo chat"
      trigger={
        <Button>
          <Plus /> Criar Chat
        </Button>
      }
    >
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleCreate)}></form>
      </Form>
    </DefaultResponsiveOverlay>
  );
};
