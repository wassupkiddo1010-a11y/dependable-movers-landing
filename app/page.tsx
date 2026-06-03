import { TestimonialDemo } from "@/components/demo/testimonial-demo";

export default function Home() {
  return (
    <main>
      <div className="border-b border-border bg-[#16335B] px-6 py-4 text-center text-sm text-white">
        React component preview — production landing page is{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5">index.html</code>
      </div>
      <section className="py-16">
        <h1 className="mb-10 text-center font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#1A1A1A]">
          What Our Happy Clients Say
        </h1>
        <TestimonialDemo />
      </section>
    </main>
  );
}
