import { NextResponse } from "next/server";
import {
  createSessionToken,
  getAdminPassword,
  sessionCookieOptions,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    password?: string;
  } | null;

  const password = body?.password ?? "";
  if (password !== getAdminPassword()) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createSessionToken();
  const response = NextResponse.json({ ok: true });
  const cookie = sessionCookieOptions(token);
  response.cookies.set(cookie.name, cookie.value, cookie);
  return response;
}
