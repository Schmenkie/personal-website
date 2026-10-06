import { getLatestSpin } from "@/lib/spin";
import { SpinHeader } from "./spin-header";

export async function SiteHeader({ showName = true }: { showName?: boolean }) {
  const spin = await getLatestSpin();
  return <SpinHeader initial={spin} showName={showName} />;
}
