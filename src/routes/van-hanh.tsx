import { createFileRoute } from "@tanstack/react-router";
import { OpsApp } from "@/components/ops/ops-app";
import { PinGate } from "@/components/ops/pin-gate";

export const Route = createFileRoute("/van-hanh")({
  component: OpsPage,
  head: () => ({
    meta: [{ title: "Vận hành · Nhà Có Tết" }],
  }),
});

function OpsPage() {
  return (
    <PinGate>
      <OpsApp />
    </PinGate>
  );
}
