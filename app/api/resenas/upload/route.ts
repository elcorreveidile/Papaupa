import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Subida pública de la foto que acompaña a una reseña del libro de visitas.
 * No exige sesión (cualquier visitante puede adjuntar una foto), pero:
 *  - solo imágenes y máximo 10 MB,
 *  - la reseña entra como "pendiente" y la foto NO se publica hasta que Paco
 *    la aprueba desde el panel. Así la moderación contiene cualquier abuso.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
        maximumSizeInBytes: 10 * 1024 * 1024, // 10 MB
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
