import MenuTakeaway from "@/components/menu/MenuTakeaway";
import { getCarta } from "@/lib/carta";

export const metadata = {
  title: "La carta · Papaupa",
  description:
    "Carta de Papaupa: entrantes, ceviches, principales, postres y más. Pide para recoger en el Realejo, Granada.",
};

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const carta = await getCarta();
  return <MenuTakeaway carta={carta} />;
}
