import { getLatestSpin } from "@/lib/spin";
import { SpinHeader } from "./spin-header";

export async function SiteHeader({ home = false }: { home?: boolean }) {
  const spin = await getLatestSpin();
  return <SpinHeader initial={spin} home={home} />;
}
