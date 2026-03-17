// Cloudinary upload utility - uses API route to avoid Node.js fs dependency in browser
// Use Next.js frontend URL (port 3000), not backend API URL (port 8080)
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Upload image file to Cloudinary via API route
 * @param file - File object from input
 * @param folder - Folder in Cloudinary (default: "outfy/upload")
 * @returns Cloudinary upload result with URL
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = "outfy/upload",
): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch(`${NEXT_PUBLIC_URL}/api/upload/cloudinary`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Upload failed" }));
    throw new Error(error.error || "Upload failed");
  }

  return response.json();
}

/**
 * Upload image from blob URL
 * @param blobUrl - Blob URL to upload
 * @param folder - Folder in Cloudinary
 * @returns Cloudinary upload result with URL
 */
export async function uploadBlobToCloudinary(
  blobUrl: string,
  folder: string = "outfy/upload",
): Promise<CloudinaryUploadResult> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = `image_${Date.now()}.png`;
  const file = new File([blob], fileName, { type: blob.type });
  return uploadToCloudinary(file, folder);
}

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of File objects
 * @param folder - Folder in Cloudinary
 * @returns Array of Cloudinary upload results
 */
export async function uploadMultipleToCloudinary(
  files: File[],
  folder: string = "outfy/upload",
): Promise<CloudinaryUploadResult[]> {
  const results = await Promise.all(
    files.map((file) => uploadToCloudinary(file, folder)),
  );
  return results;
}
