const faqs = [
  {
    id: 1,
    question: "How does the global authentication system work?",
    answer:
      "Our authentication system is built on Supabase, which supports email/password login, OAuth providers (like Google), and magic link authentication. It works seamlessly across all regions worldwide and includes features like multi-factor authentication and session management.",
  },
  {
    id: 2,
    question: "What payment methods are supported?",
    answer:
      "Through our integration with Creem.io, we support major credit cards, PayPal, and various regional payment methods. The system handles multiple currencies and automatically manages exchange rates, making it easy to accept payments from customers worldwide.",
  },
  {
    id: 3,
    question: "Is this starter kit developer-friendly for beginners?",
    answer:
      "Absolutely! We've designed this kit with simplicity in mind. It includes comprehensive documentation, clean code structure, and follows best practices. Even if you're new to Next.js or React, you'll find it easy to understand and extend the codebase.",
  },
  {
    id: 4,
    question: "Can I deploy this application anywhere?",
    answer:
      "Yes, the application can be deployed to any modern hosting platform. We provide detailed deployment guides for Vercel, as well as instructions for deploying to traditional servers. The application is optimized to work globally with minimal configuration.",
  },
  {
    id: 5,
    question: "How do I manage subscriptions and billing?",
    answer:
      "The starter kit includes a complete subscription management system. You can define different subscription tiers, manage billing cycles, and handle customer accounts through the admin dashboard. All payment processing is handled securely by Creem.io.",
  },
  {
    id: 6,
    question: "Is the code base accessible for developers in all regions?",
    answer:
      "Yes, we've carefully selected dependencies and hosting providers that work well globally. The codebase is optimized for developers worldwide, with consideration for different network environments and accessibility requirements.",
  },
]

export default function FAQ() {
  return (
    <div id="faq" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Frequently asked questions</h2>
        <dl className="mt-20 divide-y divide-foreground/10">
          {faqs.map((faq) => (
            <div key={faq.id} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base/7 font-semibold text-foreground lg:col-span-5">{faq.question}</dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base/7 text-muted-foreground">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
} 