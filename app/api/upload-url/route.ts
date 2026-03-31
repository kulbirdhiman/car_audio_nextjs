import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { s3 } from "@/lib/s3";

function sanitizeFileName(fileName: string) {
  const lastDotIndex = fileName.lastIndexOf(".");
  const name =
    lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName;
  const ext =
    lastDotIndex !== -1 ? fileName.slice(lastDotIndex).toLowerCase() : "";

  const cleanName = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return `${cleanName || "file"}${ext}`;
}

function createUniqueFileName(fileName: string) {
  const cleanName = sanitizeFileName(fileName);
  const lastDotIndex = cleanName.lastIndexOf(".");
  const name =
    lastDotIndex !== -1 ? cleanName.slice(0, lastDotIndex) : cleanName;
  const ext = lastDotIndex !== -1 ? cleanName.slice(lastDotIndex) : "";

  const uniqueId = randomUUID();
  const timestamp = Date.now();

  return `${name}-${timestamp}-${uniqueId}${ext}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fileName = body?.fileName;
    const fileType = body?.fileType;

    if (!fileName || !fileType) {
      return NextResponse.json(
        { success: false, message: "fileName and fileType are required" },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];

    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type" },
        { status: 400 }
      );
    }

    const uniqueFileName = createUniqueFileName(fileName);
    const key = `uploads/${uniqueFileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 60,
    });

    const fileUrl = `${process.env.AWS_BUCKET_URL}/${key}`;

    return NextResponse.json({
      success: true,
      data: {
        uploadUrl,
        fileUrl,
        key,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to generate upload url",
      },
      { status: 500 }
    );
  }
}