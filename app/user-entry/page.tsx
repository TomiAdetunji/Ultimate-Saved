"use client"

import {useState} from "react"

type linkData = {
    url:string;
    title: string;
    image?: string;
    site?: string;
    tags: string[];
};

export default function LinkCollection() {
    const [input, setInput] = useState("")
    const [links, setLinks] = useState<linkData[]>([])
    const [loading, setLoading] = useState(false)
    
    async function handleSubmit() {
        if (!input) return

        setLoading(true)

        const res = await fetch("/api/metadata", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: input}),
        });
        const data = await res.json();

        if (!data.error) {
            setLinks((prev) => [...prev, data])
            setInput("")
        }
        setLoading(false)
    }
    
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="text-5xl font-semibold leading-10 tracking-tight items-center text-black dark:text-zinc-50">
                        Enter your links here!
                    </h1>
                    <input
                        type="url"
                        placeholder="Paste your link here"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full max-w-2xl rounded-md border border-zinc-300 px-4 py-3 text-base 
                                    text-zinc-900 placeholder-zinc-400 
                                    focus:outline-none focus:ring-2 focus:ring-black 
                                    dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                        />
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-md bg-white px-6 py-3 text-black"
                    >
                        {loading ? "Adding..." : "Add"}
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {links.map((link,i) => (
                        <div key={i} className="rounded-lg border overflow-hidden">
                            {link.image && (
                                <img
                                    src={link.image}
                                    alt={link.title}
                                    className="h-40 w-full object-cover"
                                />
                            )}
                            <div className="p-4 space-y-1">
                                <p className="font-semibold">{link.title}</p>
                                <p className="text-sm text-zinc-500">{link.site}</p>
                                <div className="flex flex-wrap gap-3 mt-2">
                                    {link.tags.map((tag) => (
                                        <span key={tag}
                                        className="text-xs bg-zinc-100 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}