'use client'

export default function Hero() {
  return (
    <div className="bg-background">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-background lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-3 py-1 text-sm/6 text-muted-foreground ring-1 ring-border hover:ring-ring">
                    Global Authentication & Payment Solutions{' '}
                    <a href="#" className="font-semibold whitespace-nowrap text-primary">
                      <span aria-hidden="true" className="absolute inset-0" />
                      Learn more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
                <h1 className="text-5xl font-semibold tracking-tight text-pretty text-foreground sm:text-7xl">
                  Build Without Borders
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
                  Launch your global business with seamless authentication and payment processing. 
                  Built for developers worldwide, with tools that work everywhere.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Get started
                  </a>
                  <a href="#" className="text-sm/6 font-semibold text-foreground">
                    View documentation <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            alt="Global business illustration"
            src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
            className="aspect-3/2 object-cover lg:aspect-auto lg:size-full"
          />
        </div>
      </div>
    </div>
  )
}
