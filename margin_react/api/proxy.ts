import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios, { AxiosError } from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("Proxy request received:", req.url);
    const apiUrl = `https://palace-poker.hu/ujadmin/wp-json${
      req.url?.replace("/api/proxy", "") || ""
    }`;
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://poker-szombathely.vercel.app",
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (response.headers["x-wp-total"]) {
      res.setHeader("X-WP-Total", response.headers["x-wp-total"]);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error(
      "Proxy error:",
      axiosError.message,
      axiosError.response?.status,
    );
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://poker-szombathely.vercel.app",
    );
    res.status(axiosError.response?.status || 500).json({
      message: axiosError.message || "Unknown error occurred",
      status: axiosError.response?.status,
    });
  }
}
