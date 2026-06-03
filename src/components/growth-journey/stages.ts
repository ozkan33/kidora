/**
 * The six real photo frames for the scroll "Growth Journey", in logical age
 * order. Files live in /public. The scroll progress (0→1) cross-fades through
 * these like a time-lapse of the same child growing up.
 */
export type Stage = {
  id: string;
  src: string;
  age: string;
  title: string;
  note: string;
  accent: string;
};

export const STAGES: Stage[] = [
  {
    id: "newborn",
    src: "/new born.png",
    age: "Yenidoğan",
    title: "İlk günler",
    note: "Bağ kurma, duyusal uyanış ve her şeyin temelini oluşturan güven duygusu.",
    accent: "var(--color-coral)",
  },
  {
    id: "6m",
    src: "/6 month old.png",
    age: "6 aylık",
    title: "Oturmaya başlıyor",
    note: "Gelişen gövde kasları ve yepyeni bir bakış açısı dünyaya merak uyandırıyor.",
    accent: "var(--color-sunny)",
  },
  {
    id: "12m",
    src: "/12 month old.png",
    age: "12 aylık",
    title: "Hareket zamanı",
    note: "Emekleme ve tutunarak yürüme; koordinasyonu, problem çözmeyi ve keşfetme cesaretini güçlendirir.",
    accent: "var(--color-teal)",
  },
  {
    id: "18m",
    src: "/18 month.png",
    age: "18 aylık",
    title: "İlk adımlar",
    note: "Denge, ilk kelimeler ve büyük duygular — çocukluğa doğru atılan adım.",
    accent: "var(--color-sky)",
  },
  {
    id: "2y",
    src: "/2 year old.png",
    age: "2 yaş",
    title: "Küçük kaşif",
    note: "Dil gelişir, oyun hayal gücüyle dolar ve bağımsızlık kendini gösterir.",
    accent: "var(--color-sunny)",
  },
  {
    id: "3y",
    src: "/3 year old.png",
    age: "3 yaş",
    title: "Artık koşuyor",
    note: "Özgüvenli hareket, merak ve kendine özgü bir kişilik — sırada ne varsa ona hazır.",
    accent: "var(--color-coral)",
  },
];
