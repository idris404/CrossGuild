/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, AnimatePresence, motion as m } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  fetchPublishedFaqs,
  submitFaqQuestion,
  type PublishedFaq,
} from "@/features/cms/services/cms.service";
import arrow from "@/public/Vector.png";
import { toast } from "sonner";

const Faqs = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [question, setQuestion] = useState("");
  const [faqs, setFaqs] = useState<PublishedFaq[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFaqs = async () => {
      setLoading(true);
      try {
        const publishedFaqs = await fetchPublishedFaqs();
        setFaqs(publishedFaqs);
      } catch {
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    loadFaqs();
  }, []);

  const handleToggle = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  const handleSend = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    try {
      await submitFaqQuestion(question);
      setMessageSent(true);
      setQuestion("");
      toast.success("Your question has been sent successfully!");

      // Reset the success message after 3 seconds
      setTimeout(() => {
        setMessageSent(false);
      }, 3000);
    } catch (error) {
      toast.error("Failed to send your question. Please try again.");
    }
  };

  // Animation variants
  const fadeInVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Define default FAQs as a fallback
  const defaultFaqs = [
    {
      id: "default-1",
      question: "WHAT MAKES YOUR STORE DIFFERENT FROM OTHERS?",
      answer:
        "Our AI leverages advanced algorithms to ensure relevance and creativity.",
      isPublished: true,
    },
    {
      id: "default-2",
      question: "HOW LONG DOES SHIPPING TAKE?",
      answer:
        "Shipping takes 3 to 7 business days for standard delivery and 1 to 3 business days for express shipping, with a tracking number provided upon dispatch.",
      isPublished: true,
    },
    {
      id: "default-3",
      question: "WHAT'S YOUR RETURN POLICY?",
      answer:
        "You can return an unused item in its original packaging within 14 days of receipt, with potential return shipping fees depending on the reason; contact our support team with your order number to initiate a return.",
      isPublished: true,
    },
  ];

  // Always ensure we have an array to work with
  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section id="faq" className="cg-section mx-auto w-full max-w-3xl px-4 sm:px-6">
      {/* Header Section */}
      <motion.div
        className="mb-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariant}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h1 className="inline-block text-3xl font-bold text-foreground sm:text-4xl">
          FAQ&apos;s
        </h1>
        <p className="mt-3 text-base text-foreground/80 sm:text-lg">
          Providing answers to your questions
        </p>
      </motion.div>

      {/* Accordion Section */}
      <Accordion type="single" collapsible className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          displayFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInVariant}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem
                value={faq.id}
                className="overflow-hidden rounded-md border-2 border-primary bg-background transition-colors hover:border-accent"
              >
                <AccordionTrigger
                  className="flex min-h-16 w-full items-center justify-between bg-background p-5 text-left text-base font-bold transition-colors hover:bg-purple-50 dark:hover:bg-accent/10 sm:text-lg"
                  onClick={() => handleToggle(faq.id)}
                >
                  <span className="pr-4">
                    {typeof faq.question === "string"
                      ? faq.question.toUpperCase()
                      : faq.question}
                  </span>
                  <Image
                    src={arrow}
                    alt="arrow"
                    width={20}
                    height={20}
                    className={`transition-transform duration-300 flex-shrink-0 ${
                      openItem === faq.id ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </AccordionTrigger>
                <AnimatePresence initial={false} mode="wait">
                  {openItem === faq.id && (
                    <m.div
                      key={faq.id + "-content"}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-primary/40"
                    >
                      <AccordionContent className="bg-background p-5 text-center text-sm leading-relaxed text-foreground/90 sm:text-base">
                        {faq.answer}
                      </AccordionContent>
                    </m.div>
                  )}
                </AnimatePresence>
              </AccordionItem>
            </motion.div>
          ))
        )}
      </Accordion>

      {/* Contact Section */}
      <motion.div
        className="mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariant}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <textarea
          className="h-40 w-full resize-none rounded-md border-2 border-foreground bg-background p-5 text-foreground transition-colors placeholder:text-foreground/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="Ask us what you want to know..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
          <div className="flex-1">
            <p className="text-sm text-foreground/80">
              We will answer your question via email within 48 hours.
            </p>
            {messageSent && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-2"
              >
                Your question has been sent successfully.
              </motion.p>
            )}
          </div>

          <button
            onClick={handleSend}
            className="rounded-md bg-accent px-6 py-2.5 font-semibold text-white shadow-md transition-colors hover:bg-[#4f38d8] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Faqs;
