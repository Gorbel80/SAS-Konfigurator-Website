import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readContent, writeContent } from "@/lib/content-store";
import type { SiteContent } from "@/content/types";

export const runtime = "nodejs";

export async function GET() {
  const content = await readContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as SiteContent | null;
  if (!body || !body.locales || !body.images || !body.companies) {
    return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
  }

  try {
    const saved = await writeContent(body);
    return NextResponse.json(saved);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          "Could not save content. On Vercel serverless, file writes may not persist — save locally and redeploy, or configure persistent storage.",
      },
      { status: 500 },
    );
  }
}
