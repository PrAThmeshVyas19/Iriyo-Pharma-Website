// src/hooks/usePayload.js
import { useState, useEffect } from "react";
import { fetchCollection } from "../lib/payload";

export function usePayload(collection, params = {}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const result = await fetchCollection(collection, params);
                setData(result.docs); // Payload puts array data in 'docs'
            } catch (err) {
                console.error("Payload Fetch Error:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [collection, JSON.stringify(params)]);

    return { data, loading, error };
}