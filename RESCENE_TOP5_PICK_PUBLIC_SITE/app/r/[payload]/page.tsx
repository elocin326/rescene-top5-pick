import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { decodeResultPayload, SONG_TITLES } from "@/lib/share";

type Props = { params: Promise<{ payload: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { payload } = await params;
  const result = decodeResultPayload(payload);
  if (!result) return { title: "RESCENE TOP5 PICK 결과" };
  const names = result.top.map(id => SONG_TITLES[id]);
  const description = `나의 RESCENE TOP5: ${names.join(" · ")}`;
  const image = `/r/${payload}/opengraph-image`;
  return {
    title: "MY RESCENE TOP 5",
    description,
    alternates: { canonical: `/r/${payload}` },
    openGraph: { type: "website", url: `/r/${payload}`, title: "MY RESCENE TOP 5", description, images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: "MY RESCENE TOP 5", description, images: [image] }
  };
}

export default async function SharedResult({ params }: Props) {
  const { payload } = await params;
  if (!decodeResultPayload(payload)) notFound();
  return <iframe className="shared-frame" src={`/game.html#result=${payload}`} title="RESCENE TOP5 PICK 공유 결과" />;
}
