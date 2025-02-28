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
    res.setHeader("Access-Control-Allow-Origin", "*"); // Vagy pontos origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.status(response.status).json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    res.status(axiosError.response?.status || 500).json({
      message: axiosError.message,
    });
  }
}
