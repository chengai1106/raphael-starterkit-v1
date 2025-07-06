export default function LogoCloud() {
  return (
    <div className="-my-4 md:-my-6 lg:-my-12">
      <div className="bg-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Built with Technologies You'll Love</h2>
            <div className="mx-auto mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:grid-cols-6">
              {/* Next.js Logo */}
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="Next.js"
                  src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg"
                  width={80}
                  height={48}
                  className="max-h-12 w-auto object-contain filter dark:invert"
                />
                <span className="text-sm font-medium">Next.js</span>
              </div>

              {/* Supabase Logo */}
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="Supabase"
                  src="https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png"
                  width={80}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
                <span className="text-sm font-medium">Supabase</span>
              </div>

              {/* TailwindCSS Logo */}
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="TailwindCSS"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png"
                  width={80}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
                <span className="text-sm font-medium">TailwindCSS</span>
              </div>

              {/* ShadCN UI Logo */}
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="ShadCN UI"
                  src="https://avatars.githubusercontent.com/u/139895814?s=280&v=4"
                  width={80}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
                <span className="text-sm font-medium">ShadCN UI</span>
              </div>

              {/* TypeScript Logo */}
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="TypeScript"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png"
                  width={80}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
                <span className="text-sm font-medium">TypeScript</span>
              </div>

              {/* Creem.io Logo */}
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="Creem.io"
                  src="/images/creem-logo.png"
                  width={80}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
                <span className="text-sm font-medium">Creem.io</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
