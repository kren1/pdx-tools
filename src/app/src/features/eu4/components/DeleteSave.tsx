import React from "react";
import { Modal, Button } from "antd";
import type { ButtonProps } from "antd/lib/button";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { rakalyApi } from "@/services/rakalyApi";
const { confirm } = Modal;

interface DeleteSaveProps {
  saveId: string;
  type?: ButtonProps["type"];
  redirect?: boolean;
}

export const DeleteSave: React.FC<DeleteSaveProps> = ({
  saveId,
  type,
  redirect,
}) => {
  const router = useRouter();
  const [trigger] = rakalyApi.endpoints.deleteSave.useMutation();
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure this save should be deleted?",
      icon: <ExclamationCircleOutlined />,
      content:
        "The save will no longer be accessible and any records will be removed",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await trigger(saveId);
        if (redirect && router) {
          router.back();
        }
      },
      onCancel() {},
    });
  };
  return (
    <>
      <Button type={type} onClick={showDeleteConfirm} danger>
        Delete
      </Button>
    </>
  );
};
