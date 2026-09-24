/**
 * Forces a true local download regardless of file type or hosting origin
 * (S3/MinIO/CDN). The `download` HTML attribute alone only works for
 * same-origin files — for cross-origin files (your CMS media bucket),
 * browsers ignore it and just navigate to/open the file instead. Fetching
 * as a blob and triggering the save via a same-origin blob: URL sidesteps
 * that limitation for any file type (PDF, DOCX, ZIP, images, etc).
 */
export async function downloadFile(url: string, filename?: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch file: ${res.status}`);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename || "download";
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(blobUrl);
}