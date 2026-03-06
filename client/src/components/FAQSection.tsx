// Design: Electric Stadium — FAQ accordion for SEO
// SEO: FAQ structured content for search engines

import { FAQ_ITEMS } from "@/lib/constants";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="py-16 lg:py-24 relative" id="faq">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            <span className="text-white">คำถามที่พบบ่อย</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            รวมคำถามที่สมาชิกถามบ่อยเกี่ยวกับ RGB789
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl overflow-hidden border-0"
                style={{
                  boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                }}
              >
                <AccordionTrigger
                  className="px-6 py-5 text-left hover:no-underline [&[data-state=open]>svg]:text-yellow-400"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  <span className="text-white font-semibold text-base pr-4">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5">
                  <p className="text-white/60 leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
