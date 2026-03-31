"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

type UploadFieldItem = {
  image?: string;
  color?: string;
};

type Props = {
  values: Record<string, any>;
  setValues: React.Dispatch<React.SetStateAction<any>>;
  customClass?: string;
  errors?: Record<string, any>;
  deleteFiles: string[];
  setDeleteFiles: React.Dispatch<React.SetStateAction<string[]>>;
  fieldName: string;
};

const UploadImage = ({
  values,
  setValues,
  customClass,
  errors,
  setDeleteFiles,
  fieldName,
}: Props) => {
  const [isUploading, setIsUploading] = useState(false);

  const imageBaseUrl = useMemo(() => {
    const envUrl = process.env.NEXT_PUBLIC_S3_IMG_URL || "";
    if (!envUrl) return "https://d198m4c88a0fux.cloudfront.net/";
    return envUrl.endsWith("/") ? envUrl : `${envUrl}/`;
  }, []);

  const uploadSingleImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "https://api.kayhanaudio.com.au/v1/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const uploadedKey = response?.data?.data?.data?.key;

    if (!uploadedKey) {
      throw new Error("Upload key not found in response");
    }

    return uploadedKey;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadedKeys: string[] = [];

      for (const file of Array.from(files)) {
        const key = await uploadSingleImage(file);
        uploadedKeys.push(key);
      }

      setValues((prev: any) => {
        const oldImages = Array.isArray(prev?.[fieldName]) ? prev[fieldName] : [];

        return {
          ...prev,
          [fieldName]: [
            ...oldImages,
            ...uploadedKeys.map((key) => ({
              image: key,
              color: "",
            })),
          ],
        };
      });

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Image is not uploaded");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const removeImage = (removeIndex: number) => {
    const currentImage = values?.[fieldName]?.[removeIndex]?.image;

    if (currentImage) {
      setDeleteFiles((prev) => [...prev, currentImage]);
    }

    setValues((prev: any) => ({
      ...prev,
      [fieldName]: (prev?.[fieldName] || []).filter(
        (_: any, index: number) => index !== removeIndex
      ),
    }));
  };

  const handleColorChange = (imageIndex: number, color: string) => {
    setValues((prev: any) => {
      const updated = [...(prev?.[fieldName] || [])];
      updated[imageIndex] = {
        ...updated[imageIndex],
        color,
      };

      return {
        ...prev,
        [fieldName]: updated,
      };
    });
  };

  const images: UploadFieldItem[] = Array.isArray(values?.[fieldName])
    ? values[fieldName]
    : [];

  return (
    <div className={customClass || ""}>
      <div className="rounded-2xl border border-dashed border-gray-300 p-4 dark:border-gray-700">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/png,image/jpeg,image/jpg,image/webp"
          disabled={isUploading}
          className="block w-full cursor-pointer text-sm disabled:cursor-not-allowed disabled:opacity-60"
        />

        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Allowed: jpg, jpeg, png, webp
        </p>

        {isUploading && (
          <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
            Uploading...
          </p>
        )}

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
            {images.map((item: UploadFieldItem, imageIndex: number) => {
              const imageSrc = item.image
                ? item.image.startsWith("http")
                  ? item.image
                  : `${imageBaseUrl}${item.image}`
                : "";

              return (
                <div
                  key={`${item.image || "image"}-${imageIndex}`}
                  className="relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900"
                >
                  {item.image ? (
                    <Image
                      src={imageSrc}
                      alt={`Uploaded ${imageIndex + 1}`}
                      width={300}
                      height={200}
                      className="h-28 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-28 w-full items-center justify-center text-sm text-gray-400">
                      No image
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(imageIndex)}
                    className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow hover:bg-red-700"
                  >
                    ×
                  </button>

                  {values?.is_color === "1" && (
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Enter color"
                        value={item.color || ""}
                        onChange={(e) =>
                          handleColorChange(imageIndex, e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-black dark:border-gray-600 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                      />

                      {errors?.[fieldName]?.[imageIndex]?.color_message && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[fieldName][imageIndex].color_message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;

export const setImageErrors = (
  values: Record<string, any>,
  setErrors: React.Dispatch<React.SetStateAction<any>>,
  fieldName: string
) => {
  const newErrors: Record<number, string> = {};
  let isError = false;

  (values?.[fieldName] || []).forEach(
    (field: UploadFieldItem, index: number) => {
      if (!field?.image) {
        isError = true;
        newErrors[index] = "Image is required";
      }
    }
  );

  setErrors((prev: any) => ({
    ...prev,
    [fieldName]: newErrors,
  }));

  return isError;
};  