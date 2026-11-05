import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { decodeResultPayload, SONG_TITLES } from "@/lib/share";

type Props = {
  searchParams: Promise<{ share?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const payload = typeof params.share === "string" ? params.share : "";
  const result = decodeResultPayload(payload);

  if (!result) {
    return {
      title: "RESCENE TOP5 PICK",
      description: "리센느의 노래 30곡 중 나만의 TOP5를 골라보세요.",
      openGraph: {
        type: "website",
        title: "RESCENE TOP5 PICK",
        description: "리센느의 노래 30곡 중 나만의 TOP5를 골라보세요."
      },
      twitter: {
        card: "summary_large_image",
        title: "RESCENE TOP5 PICK",
        description: "리센느의 노래 30곡 중 나만의 TOP5를 골라보세요."
      }
    };
  }

  const names = result.top.map((id) => SONG_TITLES[id]);
  const description = `나의 RESCENE TOP5: ${names.join(" · ")}`;
  const image = `/r/${payload}/opengraph-image`;
  const url = `/?share=${encodeURIComponent(payload)}`;

  return {
    title: "MY RESCENE TOP 5",
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: "MY RESCENE TOP 5",
      description,
      images: [{ url: image, width: 1200, height: 630, alt: "MY RESCENE TOP 5" }]
    },
    twitter: {
      card: "summary_large_image",
      title: "MY RESCENE TOP 5",
      description,
      images: [image]
    }
  };
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const payload = typeof params.share === "string" ? params.share : "";
  const result = decodeResultPayload(payload);

  if (!result) redirect("/game.html");

  return (
    <iframe
      className="shared-frame"
      src={`/game.html#result=${payload}`}
      title="RESCENE TOP5 PICK 공유 결과"
    />
  );
}
