import type { Metadata } from "next";
import ContactView from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Get in touch",
  description: "Contact Logistics Studio in Bentonville, AR. Phone +1 (216) 293 7917, info@logisticsstudio.com.",
};

export default function Page() {
  return <ContactView />;
}
