import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-5xl font-semibold leading-10 tracking-tight items-center text-black dark:text-zinc-50">
            Welcome to the Ultimate Saved!
          </h1>
          <p className="text-xl leading-8 text-zinc-600 py-14 dark:text-zinc-400">
            The Ultimate Saved is a website where you can post all those posts you find across Instagram, Tiktok, Pinterest, and more 
            to help you keep on top of al the crafts and recipes you wanna get done!
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[175px]"
            href="/user-entry"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try it!
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            >
            Log in
          </a>
        </div>
      </main>
    </div>
  );
}
