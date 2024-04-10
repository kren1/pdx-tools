import React from "react";
import { InfoDrawer } from "./InfoDrawer";
import { SaveMode } from "../../components/save-mode";
import {
  SideBarButtonProps,
  SideBarButton,
} from "../../components/SideBarButton";
import { SideBarContainerProvider } from "../../components/SideBarContainer";
import { DownloadButton } from "./DownloadButton";
import { useEu4Meta, useServerSaveFile } from "../../store";
import { Sheet } from "@/components/Sheet";
import { Eu4MeltButton } from "./Eu4MeltButton";

const InfoSideBarTitle = () => {
  const meta = useEu4Meta();
  const remoteFile = useServerSaveFile();
  return (
    <div className="flex grow items-center gap-2">
      <SaveMode mode={meta.mode} />
      <Sheet.Title className="overflow-hidden text-ellipsis max-w-md">
        {meta.save_game || "EU4 Save Game"}
      </Sheet.Title>
      <div className="drawer-extras mr-4 flex grow items-center justify-end gap-2">
        {remoteFile && <DownloadButton />}
        {!meta.encoding.includes("text") && <Eu4MeltButton />}
      </div>
    </div>
  );
};

export const InfoSideBarButton = ({
  children,
  ...props
}: SideBarButtonProps) => {
  return (
    <Sheet modal={false}>
      <Sheet.Trigger asChild>
        <SideBarButton {...props}>{children}</SideBarButton>
      </Sheet.Trigger>
      <SideBarContainerProvider>
        <Sheet.Content
          onInteractOutside={(e) => e.preventDefault()}
          side="right"
          className="flex w-[800px] max-w-full flex-col dark:bg-slate-900 bg-white pt-4"
        >
          <Sheet.Header className="z-10 px-4 pb-4 shadow-md items-center">
            <Sheet.Close />
            <InfoSideBarTitle />
          </Sheet.Header>
          <Sheet.Body className="px-4 py-6">
            <InfoDrawer />
          </Sheet.Body>
        </Sheet.Content>
      </SideBarContainerProvider>
    </Sheet>
  );
};
