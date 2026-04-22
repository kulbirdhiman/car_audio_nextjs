"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

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

/* ================= SORTABLE ITEM ================= */
const SortableItem = ({
  item,
  index,
  removeImage,
  imageBaseUrl,
  values,
  handleColorChange,
  errors,
  fieldName,
  setPreviewImage,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.image });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const imageSrc = item.image
    ? item.image.startsWith("http")
      ? item.image
      : `${imageBaseUrl}${item.image}`
    : "";

  return (
    <div ref={setNodeRef} style={style}>
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900">

        {/* ✅ IMAGE CLICK FOR PREVIEW */}
        {item.image ? (
          <Image
            src={imageSrc}
            alt={`Uploaded ${index + 1}`}
            width={300}
            height={200}
            onClick={() => setPreviewImage(imageSrc)}
            className="h-28 w-full object-cover cursor-pointer"
          />
        ) : (
          <div className="flex h-28 items-center justify-center text-sm text-gray-400">
            No image
          </div>
        )}

        {/* ❌ REMOVE BUTTON */}
        <button
          type="button"
          onClick={() => removeImage(index)}
          className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
        >
          ×
        </button>

        {/* 🔄 DRAG HANDLE (optional improvement) */}
        <div
          {...attributes}
          {...listeners}
          className="absolute left-2 top-2 cursor-grab text-xs bg-black/50 text-white px-2 py-1 rounded"
        >
          Drag
        </div>

        {/* 🎨 COLOR INPUT */}
        {values?.is_color === "1" && (
          <div className="p-2">
            <input
              type="text"
              placeholder="Enter color"
              value={item.color || ""}
              onChange={(e) =>
                handleColorChange(index, e.target.value)
              }
              className="w-full rounded-md border px-2 py-1 text-sm"
            />

            {errors?.[fieldName]?.[index]?.color_message && (
              <p className="text-xs text-red-500 mt-1">
                {errors[fieldName][index].color_message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
const UploadImage = ({
  values,
  setValues,
  customClass,
  errors,
  deleteFiles,
  setDeleteFiles,
  fieldName,
}: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const imageBaseUrl = useMemo(() => {
    const envUrl = process.env.NEXT_PUBLIC_S3_IMG_URL || "";
    if (!envUrl) return "https://d198m4c88a0fux.cloudfront.net/";
    return envUrl.endsWith("/") ? envUrl : `${envUrl}/`;
  }, []);

  /* ================= UPLOAD ================= */
  const uploadSingleImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "https://api.kayhanaudio.com.au/v1/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const uploadedKey = response?.data?.data?.data?.key;
    if (!uploadedKey) throw new Error("Upload key not found");

    return uploadedKey;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    try {
      const uploadedKeys: string[] = [];

      for (const file of Array.from(files)) {
        const key = await uploadSingleImage(file);
        uploadedKeys.push(key);
      }

      setValues((prev: any) => {
        const oldImages = prev?.[fieldName] || [];

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
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  /* ================= REMOVE ================= */
  const removeImage = (index: number) => {
    const current = values?.[fieldName]?.[index]?.image;

    if (current) {
      setDeleteFiles((prev) => {
        if (prev.includes(current)) return prev;
        return [...prev, current];
      });
    }

    setValues((prev: any) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_: any, i: number) => i !== index),
    }));
  };

  /* ================= COLOR ================= */
  const handleColorChange = (index: number, color: string) => {
    setValues((prev: any) => {
      const updated = [...prev[fieldName]];
      updated[index] = { ...updated[index], color };
      return { ...prev, [fieldName]: updated };
    });
  };

  /* ================= DRAG ================= */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setValues((prev: any) => {
      const items = [...prev[fieldName]];

      const oldIndex = items.findIndex((i) => i.image === active.id);
      const newIndex = items.findIndex((i) => i.image === over.id);

      return {
        ...prev,
        [fieldName]: arrayMove(items, oldIndex, newIndex),
      };
    });
  };

  const images: UploadFieldItem[] = values?.[fieldName] || [];

  return (
    <div className={customClass || ""}>
      <div className="rounded-2xl border border-dashed p-4">

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          disabled={isUploading}
          className="w-full"
        />

        {isUploading && (
          <p className="text-blue-500 mt-2">Uploading...</p>
        )}

        {images.length > 0 && (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((i: any) => i.image)}
              strategy={rectSortingStrategy}
            >
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
                {images.map((item, index) => (
                  <SortableItem
                    key={item.image}
                    item={item}
                    index={index}
                    removeImage={removeImage}
                    imageBaseUrl={imageBaseUrl}
                    values={values}
                    handleColorChange={handleColorChange}
                    errors={errors}
                    fieldName={fieldName}
                    setPreviewImage={setPreviewImage}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;

/* ================= ERROR HANDLER ================= */
export const setImageErrors = (
  values: Record<string, any>,
  setErrors: React.Dispatch<React.SetStateAction<any>>,
  fieldName: string
) => {
  const newErrors: Record<number, any> = {};
  let isError = false;

  (values?.[fieldName] || []).forEach((field: UploadFieldItem, index: number) => {
    if (!field?.image) {
      isError = true;
      newErrors[index] = { message: "Image is required" };
    }
  });

  setErrors((prev: any) => ({
    ...prev,
    [fieldName]: newErrors,
  }));

  return isError;
};