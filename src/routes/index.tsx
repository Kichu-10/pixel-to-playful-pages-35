import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu, Wallet, Plus, ChevronDown, Search, Volume2, Mail, Flame, ChevronLeft,
  ChevronRight, Star, Home, LogOut, Gift, User, Fish, Sparkles,
} from "lucide-react";
import banner from "@/assets/banner.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "B9 Game — Play Aviator, Chicken Road & More" },
      { name: "description", content: "Get 100% bonus on your first deposit up to Rs. 50,000. Play popular games on B9 Game." },
      { property: "og:title", content: "B9 Game — Play & Win" },
      { property: "og:description", content: "100% first deposit bonus, jackpot and popular games." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const cats = [
  { label: "Popular", icon: <Flame className="h-7 w-7 fill-brand text-brand" /> },
  { label: "PG Slot", icon: <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-xs font-bold text-primary-foreground">PG</span> },
  { label: "Spribe", icon: <span className="rounded border-2 border-brand px-1 text-xs font-black text-brand">777</span> },
  { label: "Fishing", icon: <Fish className="h-7 w-7 text-brand" /> },
  { label: "InOut", icon: <span className="text-xl font-black italic text-brand">iN</span> },
];

const games = [
  { name: "Aviator", brand: "SPRIBE", bg: "from-brand to-brand-dark" },
  { name: "Chicken Road 2", brand: "iN", bg: "from-chart-5 to-chart-1" },
  { name: "Aviator", brand: "SPRIBE", bg: "from-brand to-brand-dark" },
  { name: "Aviatrix", brand: "CRASH GAME", bg: "from-chart-3 to-foreground" },
  { name: "Mines", brand: "SPRIBE", bg: "from-chart-2 to-chart-3" },
  { name: "Chicken", brand: "iN", bg: "from-destructive to-chart-1" },
];

function Index() {
  const [cat, setCat] = useState(0);
  return (
    <div className="mx-auto min-h-screen max-w-md bg-brand-gradient pb-28">
      <header className="flex items-center gap-2 px-4 py-4 text-primary-foreground">
        <Menu className="h-7 w-7" />
        <div className="flex items-center gap-1 text-xl font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-card text-brand">9</span>B9 Game
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-card px-2 py-1.5 text-sm font-semibold text-chart-1">
            <Wallet className="h-4 w-4 text-brand" />8,891.2
            <Plus className="h-5 w-5 rounded-full bg-brand p-0.5 text-primary-foreground" />
          </div>
          <button className="flex items-center rounded-lg bg-card px-2 py-1.5 text-sm text-foreground">Deposit<ChevronDown className="h-4 w-4" /></button>
          <Search className="h-6 w-6" />
        </div>
      </header>

      <main className="space-y-3 rounded-t-3xl bg-background p-3">
        <section className="relative overflow-hidden rounded-2xl">
          <img src={banner} width={1280} height={576} alt="First deposit bonus" className="h-48 w-full object-cover object-right" />
          <div className="absolute inset-0 flex flex-col justify-center pl-5 text-primary-foreground">
            <p className="text-2xl font-bold">Get <span className="text-4xl font-black">100%</span></p>
            <p className="font-semibold leading-tight">Bonus<br />on Your First Deposit</p>
            <p className="mt-1 text-3xl font-black text-gold-gradient">RS. 50,000</p>
            <button className="mt-2 flex w-fit items-center gap-1 rounded-full bg-brand px-4 py-1 text-sm font-semibold">Claim Now <ChevronRight className="h-4 w-4" /></button>
          </div>
        </section>

        <div className="flex items-center gap-2 rounded-xl bg-brand-soft px-3 py-2 text-sm">
          <Volume2 className="h-5 w-5 text-brand" />
          <span className="flex-1 truncate">Get 100% Bonus on Your First Deposit &amp; Start Winning!</span>
          <Mail className="h-8 w-8 rounded-lg bg-brand p-1.5 text-primary-foreground" />
        </div>

        <nav className="flex items-center rounded-2xl bg-card px-1 py-3 shadow-sm">
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          <div className="flex flex-1 justify-around">
            {cats.map((c, i) => (
              <button key={c.label} onClick={() => setCat(i)} className="flex flex-col items-center gap-1 text-sm">
                <span className="grid h-9 place-items-center">{c.icon}</span>
                <span className={i === cat ? "border-b-2 border-brand pb-1 font-semibold" : "pb-1 text-muted-foreground"}>{c.label}</span>
              </button>
            ))}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </nav>

        <section className="rounded-2xl bg-brand-soft p-4 text-center">
          <p className="flex items-center justify-center gap-1 text-2xl font-black text-brand-dark"><Sparkles className="h-4 w-4" />JACKPOT<Sparkles className="h-4 w-4" /></p>
          <p className="mx-auto mt-2 w-fit rounded-full border border-gold bg-card px-6 py-2 text-3xl font-bold">10,799,004.20</p>
        </section>

        <section className="rounded-2xl bg-card p-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold"><Flame className="h-6 w-6 fill-brand text-brand" />Popular</h2>
            <button className="flex items-center rounded-full bg-brand-soft px-3 py-1 text-sm">View All <ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {games.map((g, i) => (
              <div key={i} className={`relative flex aspect-[4/5] flex-col justify-between rounded-xl bg-gradient-to-b ${g.bg} p-2 text-primary-foreground`}>
                <Star className="absolute right-2 top-2 h-6 w-6 rounded-full bg-card fill-brand-dark p-1 text-brand-dark" />
                <span className="text-xs font-bold underline">{g.brand}</span>
                <span className="text-center text-lg font-black italic leading-tight">{g.name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 items-end justify-around rounded-t-2xl bg-card px-2 pb-3 pt-2 text-xs text-muted-foreground shadow-lg">
        <span className="flex flex-col items-center text-brand"><Home className="h-6 w-6 fill-brand" />Home</span>
        <span className="flex flex-col items-center"><LogOut className="h-6 w-6" />Sign Out</span>
        <span className="flex flex-col items-center"><span className="-mt-8 mb-1 grid h-16 w-16 place-items-center rounded-full bg-brand text-primary-foreground shadow-lg"><Wallet className="h-7 w-7" /></span>Deposit</span>
        <span className="flex flex-col items-center"><Gift className="h-6 w-6" />Promotions</span>
        <span className="flex flex-col items-center"><User className="h-6 w-6" />Profile</span>
      </footer>
    </div>
  );
}
