import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/landing-page";
import { CATALOG, minPrice } from "@/lib/catalog";
import { PAGE_DESCRIPTION, PAGE_TITLE, SHOP } from "@/lib/config";

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "OnlineStore",
      name: SHOP.name,
      description: PAGE_DESCRIPTION,
      telephone: "+84901741879",
      currenciesAccepted: "VND",
      paymentAccepted: "Cash",
      areaServed: "VN",
    },
    {
      "@type": "ItemList",
      name: PAGE_TITLE,
      itemListElement: CATALOG.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: item.name,
          description: item.blurb,
          image: item.image,
          brand: { "@type": "Brand", name: SHOP.name },
          offers: {
            "@type": "Offer",
            priceCurrency: "VND",
            price: minPrice(item),
          },
        },
      })),
    },
  ],
}).replaceAll("<", "\\u003c");

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: jsonLd }],
  }),
});

function Home() {
  return <LandingPage />;
}
