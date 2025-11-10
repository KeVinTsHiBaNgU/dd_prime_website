// app/devis/page.js
import { getDevisPage } from "@/lib/cms";
import DevisForm from "@/components/DevisForm";

export const dynamic = "force-dynamic";

export default async function DevisPage() {
  const content = await getDevisPage(); // récupération CMS côté serveur

  return <DevisForm content={content} />;
}
