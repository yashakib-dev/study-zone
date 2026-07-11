'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'Is StudyZone completely free to use?',
    answer: 'Yes, absolutely. StudyZone is free for all students and educators. There are no hidden fees, subscriptions, or paywalls — just open access to quality learning resources.',
  },
  {
    question: 'How do I upload my own study resources?',
    answer: 'Once you create an account, you can upload notes, PDFs, code snippets, and more directly from your Dashboard. All uploads go through a brief review to ensure quality.',
  },
  {
    question: 'What types of resources can I find here?',
    answer: 'You will find lecture notes, cheat sheets, code repositories, video links, past exam papers, and collaborative study guides across subjects like computer science, mathematics, science, and more.',
  },
  {
    question: 'Can I collaborate with other students?',
    answer: 'Yes! StudyZone supports study groups where you can invite peers, share resources privately, and discuss topics in real time. Just head to the Explore page to find or create a group.',
  },
  {
    question: 'Is my uploaded content safe and private?',
    answer: 'You control the visibility of everything you upload. Resources can be set to public, group-only, or private. We never share your data with third parties.',
  },
  {
    question: 'How is content quality maintained?',
    answer: 'Every uploaded resource can be rated and reviewed by the community. Our moderation team also reviews flagged content to keep the library accurate and reliable.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-slate-950 py-20 lg:py-28 border-t border-slate-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
            Everything you need to know about StudyZone. Can&apos;t find an answer?{' '}
            <a href="/contact" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">
              Reach out to us.
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-indigo-500/40 bg-slate-900/60'
                    : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-white sm:text-base">
                    {faq.question}
                  </span>
                  <span className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-200 ${
                    isOpen
                      ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400 rotate-45'
                      : 'border-slate-700 bg-slate-800/50 text-slate-400'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-slate-400">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
