import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import useMediaQuery from "@/hooks/useMediaQuery";

interface IResponsiveOverLayProps {
  title: string;
  trigger?: React.ReactElement;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: VoidFunction;
  onOpen: VoidFunction;
  customClassname?: {
    modal?: string;
    drawer?: string;
  };
}

export const DefaultResponsiveOverlay = ({
  title,
  children,
  trigger,
  onClose,
  isOpen,
  onOpen,
  customClassname,
}: IResponsiveOverLayProps) => {
  const { isMobile } = useMediaQuery();

  return isMobile ? (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
        else onOpen();
      }}
    >
      {trigger && <DrawerTrigger>{trigger}</DrawerTrigger>}
      <DrawerContent
        className={`flex flex-col gap-3 p-2 ${customClassname?.drawer || ""}`}
      >
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="overflow-y-auto">{children}</ScrollArea>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
        else onOpen();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`${customClassname?.modal || ""}`}>
        <DialogTitle>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};
