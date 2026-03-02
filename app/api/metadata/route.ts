import {NextResponse} from "next/server";
import * as cheerio from "cheerio";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY!,});

export async function POST(req: Request) {
    const {url} = await req.json();

    let title = "";
    let image = "";
    let site = "";
    let description = "";
    const platform = detectPlatform(url);
    site = platform;    

    try {
        if (platform === "TikTok") {
            const oembedResponse = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
            const data = await oembedResponse.json();
            image = data.thumbnail_url || "";
        } else {
            const res = await fetch(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                },
            });
        
        const html = await res.text();
        const $ = cheerio.load(html);

        const getMeta = (name: string) =>
            $(`meta[property="${name}"]`).attr("content") ||
            $(`meta[name="${name}"]`).attr("content");

         title = getMeta("og:title") || $("title").text() || "";
         image = getMeta("og:image") || "";
    }
    //     description = getMeta("og:description") || "";
    //     site = getMeta("og:site_name") || "";
    
    } catch {
        
    }

    const prompt = `A user saved this link to a hobby and craft inspiration app: ${url}
    Platform: ${platform}
    Metadata title (may be empty or very generic): "${title}"
    Metadata description (may be empty): "${description}"
    
    Based on the URL and any available information such as the caption and the title, generate:
    1. A short, friendly title guessing what this content is about (e.g. "Macrame wall art tutorial", "Easy sourdough focaccia recipe", "Watercolor painting for beginners"). If you truly cannot tell, just use the platform name.
    2. 2-4 relevant hobby or craft tags from this list or similar: crafts, cooking, baking, DIY, nail art, beauty, art, drawing, painting, sewing, knitting, crochet, fiber arts, woodworking, gardening, photography, fitness, home decor, journaling, ceramics, embroidery, candle making.

    Respond ONLY with raw JSON, no markdown, no backticks, no explanation:
    { "title": "...", "tags": ["...", "..."] }`;

    let aiTitle = title;
    let tags: string[] = [];

    try {
       // const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });
        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

        if (!text) throw new Error("No AI text returned");


        const clean = text.replace(/```json|```/g, "").trim();
        
        let parsed: any;
        try {
            parsed = JSON.parse(clean);
        } catch {
            throw new Error("AI returned invalid JSON");
        }
        if (typeof parsed === "object" && parsed !== null){
            //if (!title || title.length < 5) {
            aiTitle = typeof parsed.title === "string" ? parsed.title : site;
            if (Array.isArray(parsed.tags)){
                tags = parsed.tags.filter(
                    (t: any) => typeof t === "string"
                );
            }
        }
    } catch (err) {
        console.error("Gemini error: ", err);
        tags = description?.match(/#[\w]+/g) ?? [];
    }
    return NextResponse.json({
        url,
        title: aiTitle,
        image,
        site,
        tags,
    });
}

function detectPlatform(url: string): string {
    try {
        if (url.includes("tiktok.com")) return "TikTok";
        if (url.includes("instagram.com")) return "Instagram";
        if (url.includes("youtube.com") || url.includes("youtu.be")) return "YouTube";
        if (url.includes("pinterest.com")) return "Pinterest";
        if (url.includes("twitter.com") || url.includes("x.com")) return "X / Twitter";
        if (url.includes("reddit.com")) return "Reddit";
        return new URL(url).hostname.replace("www.", "");
    } catch {
        return "Unknown";
    }
}