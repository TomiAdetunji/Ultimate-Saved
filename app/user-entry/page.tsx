export default function Page() {
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
                        className="w-full max-w-2xl rounded-md border border-zinc-300 px-4 py-3 text-base 
                                    text-zinc-900 placeholder-zinc-400 
                                    focus:outline-none focus:ring-2 focus:ring-black 
                                    dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                        />
                </div>
            </main>
        </div>
    )
}