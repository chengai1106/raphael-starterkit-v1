'use client'

export default function Contact() {
  return (
    <div id="contact" className="relative isolate bg-background px-6 py-24 sm:py-32 lg:px-8">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-border [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-64}
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-64} className="overflow-visible fill-muted">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
          Get in touch with our team
        </h2>
        <p className="mt-2 text-lg/8 text-muted-foreground">
          Have questions about implementation or need custom solutions? We're here to help developers worldwide.
        </p>
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form action="#" method="POST" className="lg:flex-auto">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-foreground">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground/60 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-foreground">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground/60 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-semibold text-foreground">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground/60 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm/6 font-semibold text-foreground">
                  Company
                </label>
                <div className="mt-2.5">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground/60 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm/6 font-semibold text-foreground">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project or questions"
                    className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground/60 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus:outline-primary"
              >
                Send message
              </button>
            </div>
            <p className="mt-4 text-sm/6 text-muted-foreground">
              By submitting this form, I agree to the{' '}
              <a href="#" className="font-semibold text-primary">
                privacy&nbsp;policy
              </a>
              .
            </p>
          </form>
          <div className="lg:mt-6 lg:w-80 lg:flex-none">
            <img
              alt="Raphael logo"
              src="https://tailwindcss.com/plus-assets/img/logos/workcation-logo-indigo-600.svg"
              className="h-12 w-auto"
            />
            <figure className="mt-10">
              <blockquote className="text-lg/8 font-semibold text-foreground">
                <p>
                  "Raphael Starter Kit saved us months of development time. The global authentication and payment systems work flawlessly for our international customer base."
                </p>
              </blockquote>
              <figcaption className="mt-10 flex gap-x-6">
                <img
                  alt="Customer photo"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
                  className="size-12 flex-none rounded-full bg-muted"
                />
                <div>
                  <div className="text-base font-semibold text-foreground">Sarah Chen</div>
                  <div className="text-sm/6 text-muted-foreground">CTO, GlobalTech Solutions</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
} 