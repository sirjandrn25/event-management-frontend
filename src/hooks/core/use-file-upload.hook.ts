import { getClientHostName } from "@/utils/api-service.utils";
import axios from "axios";
import { useState } from "react";

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const onUpload = async (files: File[]) => {
    setIsUploading(true);
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    const headers = { "Content-Type": "multipart/form-data" };

    try {
      const response = await axios({
        headers,
        method: "post",
        data: formData,
        url: `${getClientHostName()}/v1/api/storage/upload`,
      });
      setIsUploading(false);

      return response?.data?.files || [];
    } catch (error) {
      setIsUploading(false);
      return [];
    }
  };
  return {
    onUpload,
    isUploading,
  };
};
