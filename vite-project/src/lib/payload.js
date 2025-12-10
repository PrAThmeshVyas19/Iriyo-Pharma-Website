// src/lib/payload.js

const PAYLOAD_URL = import.meta.env.VITE_PAYLOAD_URL || "http://localhost:3000";

export const fetchCollection = async (collection, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${PAYLOAD_URL}/api/${collection}?${query}`;
  
  const res = await fetch(url);
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error fetching ${collection}: ${res.statusText} - ${errorText}`);
  }

  const json = await res.json();
  return json;
};

// ✅ UPDATED: Forces the backend URL onto relative image paths
export function getPayloadImage(image) {
  // 1. Safety Check: Is image empty?
  if (!image) return "";

  // 2. Safety Check: Did we receive just an ID instead of the full object?
  // (This happens if you forget ?depth=2 in your fetch)
  if (typeof image === 'string') {
    return ""; 
  }

  // 3. Get the URL
  const url = image.url;
  if (!url) return "";

  // 4. If it's already a full link (like from Cloudinary or AWS S3), use it.
  if (url.startsWith('http')) {
    return url;
  }

  // 5. If it's a relative path (like /media/img.jpg), add the Backend URL.
  return `${PAYLOAD_URL}${url}`;
}
