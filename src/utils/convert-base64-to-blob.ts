export default function convertBase64ToBlob(
  Base64Image: string | null | undefined
) {
  if (!Base64Image) return null;
  // SPLIT INTO TWO PARTS
  const parts = Base64Image.split(";base64,");
  // HOLD THE CONTENT TYPE
  const imageType = parts[0].split(":")[1];
  // DECODE BASE64 STRING
  const decodedData = window.atob(parts[1]);
  // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
  const uInt8Array = new Uint8Array(decodedData.length);
  // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }
  // RETURN BLOB IMAGE AFTER CONVERSION
  return new Blob([uInt8Array], { type: imageType });
}
