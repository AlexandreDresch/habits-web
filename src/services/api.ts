import axios from "axios";

const apiKey = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
    baseURL: apiKey,
});