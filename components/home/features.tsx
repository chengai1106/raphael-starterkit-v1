'use client'

import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Global Authentication',
    description:
      'Seamless sign-in experience for users worldwide. Support for email/password, OAuth providers, and advanced security features that work across all regions.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Secure Payments',
    description:
      'Accept payments in multiple currencies with support for international payment methods. Our integration with Creem.io ensures smooth transactions for global customers.',
    icon: LockClosedIcon,
  },
  {
    name: 'Developer Friendly',
    description:
      'Built with Next.js and TypeScript for a modern development experience. Clean code structure and comprehensive documentation to help you get started quickly.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Subscription Management',
    description:
      'Ready-to-use subscription models and credit systems. Monitor usage, handle billing cycles, and manage customer accounts - all out of the box.',
    icon: ArrowPathIcon,
  },
]

export default function Features() {
  return (
    <div id="features" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-primary">Global-Ready Platform</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl lg:text-balance">
            Everything you need for worldwide business
          </p>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            Our starter kit provides all the essential tools to build applications that work globally. 
            From authentication to payments, we've designed a solution that helps developers launch 
            faster with features that work across borders.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-foreground">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon aria-hidden="true" className="size-6 text-primary-foreground" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
