import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-cream px-5 pt-28">
      <div className="text-center">
        <div className="text-5xl" aria-hidden>
          🧸
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Bu sayfa kaybolmuş gibi görünüyor
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Sizi doğru
          yere ulaştıralım.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-coral px-7 py-3.5 font-bold text-cream transition-transform hover:-translate-y-0.5"
          >
            Ana sayfa
          </Link>
          <Link
            href="/services"
            className="rounded-full border-2 border-ink/10 px-7 py-3.5 font-bold text-ink transition-colors hover:border-coral"
          >
            Hizmetler ve atölyeler
          </Link>
        </div>
      </div>
    </div>
  );
}
