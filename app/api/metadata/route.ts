import {NextResponse} from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
    const {url} = await req.json();

    try {
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

        const title = getMeta("og.title") || $("title").text() || "Untitled";
        const image = getMeta("og.image");
        const description = getMeta("og.description");
        const site = getMeta("og.site_name");

        const tags = description?.match(/#[\w]+/g) ?? [];

        return NextResponse.json({
            url,
            title,
            image,
            site,
            tags,
        });
    } catch (err) {
        return NextResponse.json(
            {error: "Failed to fetch metadata"},
            {status: 400}
        );
    }
}