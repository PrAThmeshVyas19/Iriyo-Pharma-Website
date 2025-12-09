// src/lib/payload.js

// Change this to your deployed URL later
const PAYLOAD_URL = import.meta.env.VITE_PAYLOAD_URL || "http://localhost:3000";

export async function fetchCollection(collection, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `${PAYLOAD_URL}/api/${collection}?${query}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${collection}`);

    const json = await res.json();
    return json; // Payload returns object with { docs: [], totalDocs: ... }
}

export function getPayloadImage(image) {
    if (!image?.url) return null;
    return `${PAYLOAD_URL}${image.url}`;
}