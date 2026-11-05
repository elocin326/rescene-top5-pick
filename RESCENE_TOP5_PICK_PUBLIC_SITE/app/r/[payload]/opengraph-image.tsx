import { ImageResponse } from "next/og";
import { decodeResultPayload, SONG_TITLES } from "@/lib/share";

export const runtime = "edge";
export const alt = "MY RESCENE TOP 5";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ payload: string }> };
export default async function OpenGraphImage({ params }: Props) {
  const { payload } = await params;
  const result = decodeResultPayload(payload);
  const names = result ? result.top.map(id => SONG_TITLES[id]) : [];
  return new ImageResponse(
    <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", padding:"48px 76px", background:"linear-gradient(135deg,#fffafd 0%,#f4deeb 100%)", color:"#382b36", fontFamily:"Georgia,serif" }}>
      <div style={{ display:"flex", fontSize:17, letterSpacing:8, color:"#a45e89", marginBottom:20 }}>A SCENT THAT STAYS</div>
      <div style={{ display:"flex", alignItems:"baseline", gap:22, fontSize:49, marginBottom:24 }}>
        <span>MY RESCENE</span><span style={{ color:"#b56596" }}>TOP <span style={{ fontFamily:"Times New Roman, serif" }}>5</span></span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {names.map((name,i)=><div key={`${i}-${name}`} style={{ display:"flex", alignItems:"center", gap:22, borderBottom:"1px solid rgba(181,101,150,.22)", paddingBottom:8, fontFamily:"Arial,sans-serif", fontSize:27, fontWeight:700 }}>
          <span style={{ width:42, color:"#b56596", fontFamily:"Georgia,serif", fontWeight:400 }}>{String(i+1).padStart(2,"0")}</span><span>{name}</span>
        </div>)}
      </div>
      <div style={{ display:"flex", marginTop:22, fontSize:15, letterSpacing:2, color:"#94617f" }}>#RESCENE　#리센느　#RESCENE_TOP5</div>
    </div>, { ...size }
  );
}
