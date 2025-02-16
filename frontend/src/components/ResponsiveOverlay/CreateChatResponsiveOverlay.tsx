import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { DefaultResponsiveOverlay } from "./DefaultResponsiveOverlay";
import { useState } from "react";
import { TCreateChat, useCreateChat } from "@/hooks/form/useCreateChat";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Categories } from "@/utils/enums/chatCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { api } from "@/services/api";

export const categories = Object.entries(Categories).map(([, value]) => ({
  label: value,
  value,
}));

export const CreateChatResponsiveOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { methods } = useCreateChat();

  const onClose = () => {
    setIsOpen(false);
    methods.reset();
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleCreate = (data: TCreateChat) => {
    api
      .post("/api/chat", {
        name: data.name,
        category: data.category,
        description: data.description,
      })
      .then((res) => {
        console.log(res.data);
      });
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
        <form
          onSubmit={methods.handleSubmit(handleCreate)}
          className="flex flex-col gap-4"
        >
          <FormField
            name="name"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição:</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="category"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Categorias" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-end">
            <Button className="w-full">Criar</Button>
          </div>
        </form>
      </Form>
    </DefaultResponsiveOverlay>
  );
};
