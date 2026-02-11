import { redirect } from "next/navigation";

// 後方互換: /app → / にリダイレクト
export default function AppsRedirect() {
  redirect("/");
}
