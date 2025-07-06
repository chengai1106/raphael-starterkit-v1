import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" className="md:pb-12">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="relative rounded-3xl border bg-background px-4 py-12 sm:px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-5xl leading-[1.1]">
              Ready to get started?
            </h2>
            <p className="mt-4 text-sm sm:text-lg text-muted-foreground sm:mt-6">
              Join thousands of developers building modern web applications with
              our starter kit. Get started for free and upgrade when you need
              to.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Button className="w-full sm:w-auto" asChild size="lg">
                <Link href="/sign-up">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="outline"
                size="lg"
                asChild
              >
                <Link href="#" className="flex items-center">
                  <Github className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Link>
              </Button>
            </div>
          </div>
          <div
            className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-gradient-to-b from-transparent to-muted/20 opacity-30"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
