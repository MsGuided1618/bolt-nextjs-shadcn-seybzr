"use client";

import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { FoundingFathersCarousel } from "@/components/founding-fathers-carousel";
import { RecentDiscussions } from "@/components/recent-discussions";
import { QuestionInput } from "@/components/question-input";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { BackgroundDecorator } from "@/components/ui/background-decorator";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <BackgroundDecorator />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <PageHeader />

        <PageSection title="Present Your Inquiry">
          <QuestionInput />
        </PageSection>
        
        <PageSection title="Distinguished Company">
          <FoundingFathersCarousel />
        </PageSection>

        <PageSection title="Recent Deliberations">
          <RecentDiscussions />
        </PageSection>

        <PageSection title="Stay Informed">
          <NewsletterSignup />
        </PageSection>
      </div>
    </main>
  );
}