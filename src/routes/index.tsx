import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Menu, Wallet, Plus, ChevronDown, Search, Volume2, Mail, Flame, ChevronLeft,
  ChevronRight, Star, Home, LogOut, LogIn, Gift, User, Fish, Sparkles, X,
} from "lucide-react";
import banner from "@/assets/banner.jpg";
import aviator from "@/assets/g-aviator.jpg";
import chicken from "@/assets/g-chicken.jpg";
import aviatrix from "@/assets/g-aviatrix.jpg";
import mines from "@/assets/g-mines.jpg";
import fish from "@/assets/g-fish.jpg";
import slot from "@/assets/g-slot.jpg";

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

type Cat = "Popular" | "PG Slot" | "Spribe" | "Fishing" | "InOut";
const cats: { label: Cat; icon: React.ReactNode }[] = [
  { label: "Popular", icon: <Flame className="h-7 w-7 fill-brand text-brand" /> },
  { label: "PG Slot", icon: <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-xs font-bold text-primary-foreground">PG</span> },
  { label: "Spribe", icon: <span className="rounded border-2 border-brand px-1 text-xs font-black text-brand">777</span> },
  { label: "Fishing", icon: <Fish className="h-7 w-7 text-brand" /> },
  { label: "InOut", icon: <span className="text-xl font-black italic text-brand">iN</span> },
];

const games = [
  { id: 1, name: "Aviator", brand: "SPRIBE", img: aviator, cats: ["Popular", "Spribe"] },
  { id: 2, name: "Chicken Road 2", brand: "InOut", img: chicken, cats: ["Popular", "InOut"] },
  { id: 3, name: "Aviatrix", brand: "CRASH GAME", img: aviatrix, cats: ["Popular"] },
  { id: 4, name: "Mines", brand: "SPRIBE", img: mines, cats: ["Popular", "Spribe"] },
  { id: 5, name: "Fortune Ox", brand: "PG", img: slot, cats: ["Popular", "PG Slot"] },
  { id: 6, name: "Shark Hunter", brand: "FISHING", img: fish, cats: ["Fishing"] },
  { id: 7, name: "Chicken Road", brand: "InOut", img: chicken, cats: ["InOut"] },
  { id: 8, name: "Mega Fishing", brand: "FISHING", img: fish, cats: ["Fishing"] },
  { id: 9, name: "Lucky Gold", brand: "PG", img: slot, cats: ["PG Slot"] },
];

const slides = [
  { t1: "Get", big: "100%", sub: "Bonus on Your First Deposit", amt: "RS. 50,000" },
  { t1: "Daily", big: "10%", sub: "Cashback on All Games", amt: "RS. 5,000" },
  { t1: "Invite", big: "Friends", sub: "Earn per Referral", amt: "RS. 500" },
  { t1: "Weekly", big: "VIP", sub: "Rewards for Members", amt: "RS. 25,000" },
];

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 2 });

function Index() {
  const [cat, setCat] = useState<Cat>("Popular");
  const [balance, setBalance] = useState(8891.2);
  const [jackpot, setJackpot] = useState(10799004.2);
  const [slide, setSlide] = useState(0);
  const [favs, setFavs] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [modal, setModal] = useState<null | "deposit" | "menu" | "promo" | "profile" | "inbox">(null);
  const [signedIn, setSignedIn] = useState(true);
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [amount, setAmount] = useState("1000");
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const a = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4000);
    const b = setInterval(() => setJackpot((j) => j + Math.random() * 25), 1200);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? games.filter((g) => g.name.toLowerCase().includes(q)) : games.filter((g) => g.cats.includes(cat));
    return showAll ? base : base.slice(0, 6);
  }, [cat, query, showAll]);

  const needAuth = () => { if (!signedIn) { toast.error("Please sign in first"); return true; } return false; };

  const play = (name: string) => {
    if (needAuth()) return;
    if (balance < 10) { toast.error("Low balance — please deposit"); setModal("deposit"); return; }
    const bet = 10, win = Math.random() < 0.45 ? Math.round(bet * (1 + Math.random() * 4)) : 0;
    setBalance((b) => b - bet + win);
    win ? toast.success(`${name}: you won Rs. ${win}!`) : toast(`${name}: lost Rs. ${bet}. Try again!`);
  };

  const deposit = () => {
    const n = Number(amount);
    if (!n || n < 100) return toast.error("Minimum deposit is Rs. 100");
    const bonus = bonusClaimed ? 0 : Math.min(n, 50000);
    setBalance((b) => b + n + bonus);
    if (bonus) setBonusClaimed(true);
    setModal(null);
    toast.success(`Deposited Rs. ${n}${bonus ? ` + Rs. ${bonus} bonus` : ""}`);
  };

  const scrollCats = (d: number) => catRef.current?.scrollBy({ left: d * 120, behavior: "smooth" });
  const s = slides[slide];

  return (
    <div className="mx-auto min-h-screen max-w-md bg-brand-gradient pb-28">
      <header className="flex items-center gap-2 px-4 py-4 text-primary-foreground">
        <button aria-label="Menu" onClick={() => setModal("menu")}><Menu className="h-7 w-7" /></button>
        <div className="flex items-center gap-1 text-xl font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-card text-brand">9</span>B9 Game
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => !needAuth() && setModal("deposit")} className="flex items-center gap-2 rounded-lg bg-card px-2 py-1.5 text-sm font-semibold text-chart-1">
            <Wallet className="h-4 w-4 text-brand" />{signedIn ? fmt(balance) : "--"}
            <Plus className="h-5 w-5 rounded-full bg-brand p-0.5 text-primary-foreground" />
          </button>
          <button onClick={() => !needAuth() && setModal("deposit")} className="flex items-center rounded-lg bg-card px-2 py-1.5 text-sm text-foreground">Deposit<ChevronDown className="h-4 w-4" /></button>
          <button aria-label="Search" onClick={() => setSearchOpen((o) => !o)}><Search className="h-6 w-6" /></button>
        </div>
      </header>

      {searchOpen && (
        <div className="px-4 pb-3">
          <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search games..." className="w-full rounded-xl bg-card px-4 py-2 text-foreground outline-none" />
        </div>
      )}

      <main className="space-y-3 rounded-t-3xl bg-background p-3">
        <section className="relative overflow-hidden rounded-2xl">
          <img src={banner} width={1280} height={576} alt="Promotion" className="h-48 w-full object-cover object-right" />
          <div className="absolute inset-0 flex flex-col justify-center pl-5 text-primary-foreground">
            <p className="text-2xl font-bold">{s.t1} <span className="text-4xl font-black">{s.big}</span></p>
            <p className="max-w-[55%] font-semibold leading-tight">{s.sub}</p>
            <p className="mt-1 text-3xl font-black text-gold-gradient">{s.amt}</p>
            <button onClick={() => !needAuth() && setModal("deposit")} className="mt-2 flex w-fit items-center gap-1 rounded-full bg-brand px-4 py-1 text-sm font-semibold">Claim Now <ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, i) => (
              <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all ${i === slide ? "w-5 bg-card" : "w-2 bg-card/50"}`} />
            ))}
          </div>
        </section>

        <div className="flex items-center gap-2 rounded-xl bg-brand-soft px-3 py-2 text-sm">
          <Volume2 className="h-5 w-5 shrink-0 text-brand" />
          <div className="flex-1 overflow-hidden"><p className="animate-marquee whitespace-nowrap">Get 100% Bonus on Your First Deposit &amp; Start Winning!</p></div>
          <button aria-label="Inbox" onClick={() => setModal("inbox")}><Mail className="h-8 w-8 rounded-lg bg-brand p-1.5 text-primary-foreground" /></button>
        </div>

        <nav className="flex items-center rounded-2xl bg-card px-1 py-3 shadow-sm">
          <button aria-label="Previous" onClick={() => scrollCats(-1)}><ChevronLeft className="h-5 w-5 text-muted-foreground" /></button>
          <div ref={catRef} className="flex flex-1 gap-4 overflow-x-auto px-2 [scrollbar-width:none]">
            {cats.map((c) => (
              <button key={c.label} onClick={() => { setCat(c.label); setQuery(""); setShowAll(false); }} className="flex min-w-14 flex-1 flex-col items-center gap-1 text-sm">
                <span className="grid h-9 place-items-center">{c.icon}</span>
                <span className={`whitespace-nowrap ${c.label === cat ? "border-b-2 border-brand pb-1 font-semibold" : "pb-1 text-muted-foreground"}`}>{c.label}</span>
              </button>
            ))}
          </div>
          <button aria-label="Next" onClick={() => scrollCats(1)}><ChevronRight className="h-5 w-5 text-muted-foreground" /></button>
        </nav>

        <section className="rounded-2xl bg-brand-soft p-4 text-center">
          <p className="flex items-center justify-center gap-1 text-2xl font-black text-brand-dark"><Sparkles className="h-4 w-4" />JACKPOT<Sparkles className="h-4 w-4" /></p>
          <p className="mx-auto mt-2 w-fit rounded-full border border-gold bg-card px-6 py-2 text-3xl font-bold tabular-nums">{jackpot.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </section>

        <section className="rounded-2xl bg-card p-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold"><Flame className="h-6 w-6 fill-brand text-brand" />{query ? "Results" : cat}</h2>
            <button onClick={() => setShowAll((v) => !v)} className="flex items-center rounded-full bg-brand-soft px-3 py-1 text-sm">{showAll ? "Show Less" : "View All"} <ChevronRight className="h-4 w-4" /></button>
          </div>
          {list.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No games found</p>}
          <div className="grid grid-cols-3 gap-2">
            {list.map((g) => {
              const fav = favs.includes(g.id);
              return (
                <div key={g.id} role="button" onClick={() => play(g.name)} className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl transition-transform active:scale-95">
                  <img src={g.img} alt={g.name} loading="lazy" width={736} height={912} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-foreground/30" />
                  <button aria-label="Favorite" onClick={(e) => { e.stopPropagation(); setFavs((f) => fav ? f.filter((x) => x !== g.id) : [...f, g.id]); }} className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-card">
                    <Star className={`h-4 w-4 text-gold ${fav ? "fill-gold" : ""}`} />
                  </button>
                  <span className="absolute left-2 top-2 text-[10px] font-bold text-primary-foreground underline">{g.brand}</span>
                  <span className="absolute inset-x-1 bottom-2 text-center text-sm font-bold text-primary-foreground">{g.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-1/2 z-10 flex w-full max-w-md -translate-x-1/2 items-end justify-around rounded-t-2xl bg-card px-2 pb-3 pt-2 text-xs text-muted-foreground shadow-lg">
        <button onClick={() => { setModal(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex flex-col items-center text-brand"><Home className="h-6 w-6 fill-brand" />Home</button>
        <button onClick={() => { setSignedIn((v) => !v); toast(signedIn ? "Signed out" : "Welcome back!"); }} className="flex flex-col items-center">
          {signedIn ? <LogOut className="h-6 w-6" /> : <LogIn className="h-6 w-6" />}{signedIn ? "Sign Out" : "Sign In"}
        </button>
        <button onClick={() => !needAuth() && setModal("deposit")} className="flex flex-col items-center"><span className="-mt-8 mb-1 grid h-16 w-16 place-items-center rounded-full bg-brand text-primary-foreground shadow-lg"><Wallet className="h-7 w-7" /></span>Deposit</button>
        <button onClick={() => setModal("promo")} className="flex flex-col items-center"><Gift className="h-6 w-6" />Promotions</button>
        <button onClick={() => !needAuth() && setModal("profile")} className="flex flex-col items-center"><User className="h-6 w-6" />Profile</button>
      </footer>

      {modal && (
        <div className="fixed inset-0 z-20 flex items-end justify-center bg-foreground/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-t-3xl bg-card p-5 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold capitalize">{modal === "promo" ? "Promotions" : modal}</h3>
              <button aria-label="Close" onClick={() => setModal(null)}><X className="h-5 w-5" /></button>
            </div>

            {modal === "deposit" && (
              <div className="space-y-3">
                {!bonusClaimed && <p className="rounded-lg bg-brand-soft p-2 text-sm text-brand-dark">100% first deposit bonus active (up to Rs. 50,000)</p>}
                <div className="grid grid-cols-4 gap-2">
                  {[500, 1000, 5000, 10000].map((v) => (
                    <button key={v} onClick={() => setAmount(String(v))} className={`rounded-lg border py-2 text-sm ${amount === String(v) ? "border-brand bg-brand-soft font-semibold" : ""}`}>{v}</button>
                  ))}
                </div>
                <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))} inputMode="numeric" className="w-full rounded-lg border px-3 py-2" placeholder="Amount (Rs.)" />
                <button onClick={deposit} className="w-full rounded-full bg-brand py-3 font-semibold text-primary-foreground">Deposit Now</button>
              </div>
            )}

            {modal === "menu" && (
              <ul className="space-y-1">
                {cats.map((c) => (
                  <li key={c.label}><button onClick={() => { setCat(c.label); setModal(null); }} className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-brand-soft">{c.icon}{c.label}</button></li>
                ))}
              </ul>
            )}

            {modal === "promo" && (
              <div className="space-y-2">
                {slides.map((p) => (
                  <div key={p.sub} className="flex items-center justify-between rounded-xl bg-brand-soft p-3">
                    <div><p className="font-bold">{p.t1} {p.big}</p><p className="text-sm text-muted-foreground">{p.sub} · up to {p.amt}</p></div>
                    <button onClick={() => { setModal(signedIn ? "deposit" : null); if (!signedIn) toast.error("Please sign in first"); }} className="rounded-full bg-brand px-3 py-1 text-sm text-primary-foreground">Claim</button>
                  </div>
                ))}
              </div>
            )}

            {modal === "profile" && (
              <div className="space-y-2 text-sm">
                <p><b>User:</b> Player9821</p>
                <p><b>Balance:</b> Rs. {fmt(balance)}</p>
                <p><b>First deposit bonus:</b> {bonusClaimed ? "Claimed" : "Available"}</p>
                <p><b>Favorites:</b> {favs.length ? games.filter((g) => favs.includes(g.id)).map((g) => g.name).join(", ") : "None yet"}</p>
              </div>
            )}

            {modal === "inbox" && (
              <ul className="space-y-2 text-sm">
                <li className="rounded-lg bg-brand-soft p-3">🎉 Welcome to B9 Game! Claim your 100% first deposit bonus.</li>
                <li className="rounded-lg bg-brand-soft p-3">🔥 Jackpot is over 10 million — play now!</li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
