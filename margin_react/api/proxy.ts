import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios, { AxiosError } from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
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
    // CORS fejlécek
    res.setHeader("Access-Control-Allow-Origin", "*"); // Vagy pontos origin, pl. "https://poker-szombathely.vercel.app"
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    // X-WP-Total fejléc továbbítása
    if (response.headers["x-wp-total"]) {
      res.setHeader("X-WP-Total", response.headers["x-wp-total"]);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    res.status(axiosError.response?.status || 500).json({
      message: axiosError.message || "Unknown error occurred",
    });
  }
}
