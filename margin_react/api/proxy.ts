import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios, { AxiosError } from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("Proxy request received:", req.url); // Hibakereséshez
    const response = await axios.get(
      `https://palace-poker.hu/ujadmin/wp-json/wp/v2/posts${
        req.url?.replace("/api/proxy", "") || ""
      }`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://poker-szombathely.vercel.app",
    ); // Pontos origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (response.headers["x-wp-total"]) {
      res.setHeader("X-WP-Total", response.headers["x-wp-total"]);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error("Proxy error:", axiosError.message);
    res.status(axiosError.response?.status || 500).json({
      message: axiosError.message || "Unknown error occurred",
    });
  }
}
