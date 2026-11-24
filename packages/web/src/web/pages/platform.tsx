import { copy } from "../locales/copy";
import { useState, createContext, useContext, useEffect } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Check,
  BookOpen,
  Clock,
  Download,
  Globe,
  Menu,
  X,
  Play,
  ShieldCheck,
  Smartphone,
  MessageCircle,
  Lock,
  Search,
  TrendingUp,
  Mic,
  Wallet,
  CheckCircle2,
  GraduationCap,
  Leaf,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { courses, categories, upcoming, BRAND } from "../../shared/courses";
import { authClient } from "../lib/auth";
import { client } from "../lib/api";
import {
  progressOptions,
  lessonOptions,
  adminOptions,
} from "../queries/learning";
const Language = createContext({
  en: false,
  t: (fr: string, _en: string) => fr,
});
const useLang = () => useContext(Language);
type Course = (typeof courses)[number];
function CourseArt({ course }: { course: Course }) {
  return (
    <div className={"course-art " + course.color}>
      {course.icon === "excel" ? (
        <>
          <div className="sheet">
            <span className="app-letter">X</span>
            <div className="sheet-title">{BRAND} · Excel</div>
            <div className="cells">
              {Array.from({ length: 20 }, (_, i) => (
                <span key={i}>
                  {[0, 5, 10, 15].includes(i)
                    ? ["Produit", "Riz", "Huile", "Sucre"][i / 5]
                    : i % 5 === 4
                      ? "✓"
                      : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="art-note">
            <TrendingUp size={22} /> + votre potentiel
          </div>
        </>
      ) : course.icon === "word" ? (
        <>
          <div className="document">
            <span className="app-letter word">W</span>
            <strong>CURRICULUM VITAE</strong>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="slide">
            <span>P</span>
            <div />
            <div />
            <div />
          </div>
        </>
      ) : course.icon === "sale" ? (
        <>
          <div className="phone">
            <MessageCircle size={27} />
            <div />
            <div />
            <span>Nouvelle commande ✓</span>
          </div>
          <div className="art-bubble">
            <TrendingUp size={24} />
          </div>
        </>
      ) : (
        <>
          <div className="art-symbol">
            {course.icon === "talk" ? <Mic size={60} /> : <Wallet size={60} />}
          </div>
          <span className="art-spark">✳</span>
        </>
      )}
    </div>
  );
}
function CourseCard({ course }: { course: Course }) {
  const { en, t } = useLang();
  return (
    <Link className="course-card" href={"/formations/" + course.id}>
      <div className="art-wrap">
        <CourseArt course={course} />
        <span className={"badge " + (course.free ? "free" : "")}>
          {course.free
            ? t(...copy.text1)
            : course.id === "excel"
              ? t(...copy.text2)
              : categories[course.cat + 1][+en]}
        </span>
      </div>
      <div className="card-content">
        <div className="card-category">{categories[course.cat + 1][+en]}</div>
        <h3>{course.title[+en]}</h3>
        <p>{course.desc[+en]}</p>
        <div className="course-meta">
          <span>
            <Clock size={14} />
            {course.duration}
          </span>
          <span>
            <BookOpen size={14} />
            {course.count} {t(...copy.text3)}
          </span>
          <span>{t(...copy.text4)}</span>
        </div>
        <div className="card-bottom">
          <span>
            {course.free ? (
              <strong>{t(...copy.text5)}</strong>
            ) : (
              <>
                {t(...copy.text6)} <strong>2 000 FCFA</strong>
              </>
            )}
          </span>
          <ArrowUpRight size={20} />
        </div>
      </div>
    </Link>
  );
}
function Home() {
  const { t } = useLang();
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span /> {t(...copy.text7)}
          </span>
          <h1>
            {t(...copy.text8)}
            <br />
            <span>
              {t(...copy.text9)}
              <br />
              {t(...copy.text10)}
            </span>
          </h1>
          <p>{t(...copy.text11)}</p>
          <div className="hero-actions">
            <Link className="button" href="/catalogue">
              {t(...copy.text12)}
              <ArrowUpRight size={19} />
            </Link>
            <Link className="text-button" href="/formations/gratuit">
              <Play size={15} />
              {t(...copy.text13)}
            </Link>
          </div>
          <div className="hero-reassurance">
            <ShieldCheck size={18} />
            {t(...copy.text14)}
            <span /> <Smartphone size={17} />
            {t(...copy.text15)}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo">
            <img src="/images/learner.webp" alt={t(...copy.text16)} />
            <span className="photo-label">
              <span />
              {t(...copy.text17)}
            </span>
          </div>
          <div className="floating-card learn-card">
            <span className="icon-box">
              <GraduationCap />
            </span>
            <div>
              <strong>{t(...copy.text18)}</strong>
              <span>{t(...copy.text19)}</span>
            </div>
          </div>
          <div className="floating-card progress-card">
            <div>
              <span className="mini-icon">
                <Check size={14} />
              </span>
              <strong>{t(...copy.text20)}</strong>
            </div>
            <div className="progress-line">
              <i />
            </div>
            <span>{t(...copy.text21)}</span>
          </div>
          <span className="decor-star">✳</span>
          <div className="visual-bottom">
            <Leaf size={16} />
            {t(...copy.text22)}
          </div>
        </div>
      </section>
      <div className="benefit-strip">
        <div className="container">
          <span>
            <Smartphone />
            {t(...copy.text23)}
          </span>
          <span>
            <Download />
            {t(...copy.text24)}
          </span>
          <span>
            <Wallet />
            {t(...copy.text25)}
          </span>
          <span>
            <ShieldCheck />
            {t(...copy.text26)}
          </span>
        </div>
      </div>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t(...copy.text27)}</span>
            <h2>{t(...copy.text28)}</h2>
            <p>{t(...copy.text29)}</p>
          </div>
          <Link className="text-button" href="/catalogue">
            {t(...copy.text30)}
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="course-grid">
          {courses.slice(0, 3).map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
      <section className="free-banner container">
        <div className="free-illustration">
          <Mic size={66} />
          <span>5</span>
        </div>
        <div>
          <span className="eyebrow">{t(...copy.text31)}</span>
          <h2>{t(...copy.text32)}</h2>
          <p>{t(...copy.text33)}</p>
        </div>
        <Link href="/formations/gratuit" className="button dark">
          {t(...copy.text34)}
          <ArrowUpRight size={18} />
        </Link>
      </section>
      <section className="section container">
        <div className="center">
          <span className="eyebrow">{t(...copy.text35)}</span>
          <h2>{t(...copy.text36)}</h2>
        </div>
        <div className="steps">
          {[
            [t(...copy.text37), t(...copy.text38)],
            [t(...copy.text39), t(...copy.text40)],
            [t(...copy.text41), t(...copy.text42)],
          ].map(([a, b], i) => (
            <div key={i}>
              <span className="step-number">0{i + 1}</span>
              <h3>{a}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="pricing-section">
        <div className="container">
          <div className="center">
            <span className="eyebrow">{t(...copy.text43)}</span>
            <h2>{t(...copy.text44)}</h2>
            <p>{t(...copy.text45)}</p>
          </div>
          <Plans />
        </div>
      </section>
      <section className="section container faq-layout">
        <div>
          <span className="eyebrow">{t(...copy.text46)}</span>
          <h2>{t(...copy.text47)}</h2>
          <p>{t(...copy.text48)}</p>
          <Link className="text-button" href="/contact">
            {t(...copy.text49)}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <FAQ />
      </section>
    </>
  );
}
function Plans({ id }: { id?: string }) {
  const { t } = useLang();
  const names = [t(...copy.text50), t(...copy.text51), t(...copy.text52)];
  return (
    <div className="plans">
      {[2000, 5000, 10000].map((price, i) => (
        <div className={"plan " + (i === 1 ? "recommended" : "")} key={price}>
          {i === 1 && (
            <span className="recommend-label">{t(...copy.text53)}</span>
          )}
          <h3>{names[i]}</h3>
          <p>{[t(...copy.text54), t(...copy.text55), t(...copy.text56)][i]}</p>
          <div className="price">
            {price.toLocaleString("fr-FR")} <span>FCFA</span>
          </div>
          <small>{t(...copy.text57)}</small>
          <ul>
            {[
              t(...copy.text58),
              ...(i > 0 ? [t(...copy.text59), t(...copy.text60)] : []),
              ...(i === 2
                ? [t(...copy.text61), t(...copy.text62), t(...copy.text63)]
                : []),
            ].map((s) => (
              <li key={s}>
                <Check size={17} />
                {s}
              </li>
            ))}
          </ul>
          <Link
            className={"button " + (i === 1 ? "" : "outline")}
            href={id ? `/paiement/${id}/${i}` : "/catalogue"}
          >
            {t(...copy.text64)}
            <ArrowRight size={17} />
          </Link>
        </div>
      ))}
    </div>
  );
}
function FAQ() {
  const { t } = useLang();
  return (
    <div className="faq">
      {[
        [t(...copy.text65), t(...copy.text66)],
        [t(...copy.text67), t(...copy.text68)],
        [t(...copy.text69), t(...copy.text70)],
        [t(...copy.text71), t(...copy.text72)],
      ].map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <ChevronDown size={17} />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
function Catalogue() {
  const { en, t } = useLang();
  const [search, setSearch] = useState(""),
    [cat, setCat] = useState(0),
    [waiting, setWaiting] = useState(""),
    [msg, setMsg] = useState(""),
    [busy, setBusy] = useState(false);
  return (
    <main className="container section">
      <span className="eyebrow">{t(...copy.text73)}</span>
      <h1 className="page-title">{t(...copy.text74)}</h1>
      <p>{t(...copy.text75)}</p>
      <div className="search-box">
        <Search size={20} />
        <input
          aria-label={t(...copy.text76)}
          placeholder={t(...copy.text77)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="filters">
        {categories.map((c, i) => (
          <button
            className={cat === i ? "active" : ""}
            key={i}
            onClick={() => setCat(i)}
          >
            {c[+en]}
          </button>
        ))}
      </div>
      <div className="course-grid">
        {courses
          .filter(
            (c) =>
              (cat === 0 || c.cat === cat - 1) &&
              c.title[+en].toLowerCase().includes(search.toLowerCase()),
          )
          .map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
      </div>
      <h2 className="upcoming-title">{t(...copy.text78)}</h2>
      <div className="upcoming-grid">
        {upcoming.map((c) => (
          <div key={c[0]}>
            <span className="badge">{t(...copy.text79)}</span>
            <h3>{c[+en]}</h3>
            <button
              className="text-button"
              onClick={() => {
                setWaiting(c[+en]);
                setMsg("");
              }}
            >
              {t(...copy.text80)}
              <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>
      {waiting && (
        <div className="modal-backdrop">
          <form
            className="modal"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              const data = new FormData(e.currentTarget);
              try {
                await client.learning.wait({
                  course: waiting,
                  contact: String(data.get("contact")),
                });
                setMsg(t(...copy.text81));
              } catch {
                setMsg(t(...copy.text82));
              } finally {
                setBusy(false);
              }
            }}
          >
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => setWaiting("")}
            >
              <X />
            </button>
            <span className="eyebrow">{t(...copy.text83)}</span>
            <h2>{waiting}</h2>
            <label>
              {t(...copy.text84)}
              <input
                aria-label={t(...copy.text84)}
                name="contact"
                required
                minLength={5}
              />
            </label>
            <label className="consent">
              <input type="checkbox" required aria-label={t(...copy.text85)} />
              {t(...copy.text85)}
            </label>
            <button className="button" disabled={busy}>
              {busy ? "…" : t(...copy.text80)}
            </button>
            {msg && <output>{msg}</output>}
          </form>
        </div>
      )}
    </main>
  );
}
function Detail({ id }: { id: string }) {
  const { en, t } = useLang();
  const c = courses.find((c) => c.id === id);
  if (!c) return <NotFound />;
  return (
    <main>
      <section className="detail-hero">
        <div className="container detail-grid">
          <div>
            <Link href="/catalogue" className="text-button">
              ← {t(...copy.text86)}
            </Link>
            <span className="eyebrow">{categories[c.cat + 1][+en]}</span>
            <h1 className="page-title">{c.title[+en]}</h1>
            <p>{c.desc[+en]}</p>
            <div className="course-meta">
              <span>
                <Clock size={17} />
                {c.duration}
              </span>
              <span>
                <BookOpen size={17} />
                {c.count} {t(...copy.text3)}
              </span>
            </div>
            <Link className="button" href={`/apprendre/${c.id}/0`}>
              {t(...copy.text13)}
              <ArrowRight size={18} />
            </Link>
          </div>
          <CourseArt course={c} />
        </div>
      </section>
      <section className="container section detail-body">
        <div>
          <h2>{t(...copy.text87)}</h2>
          <p>{t(...copy.text88)}</p>
          <div className="syllabus">
            {c.topics.map((topic, i) => (
              <Link key={topic} href={`/apprendre/${c.id}/${i}`}>
                <span className="lesson-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <strong>{en ? c.en[i] : topic}</strong>
                  <span>
                    {i < 2 || c.free
                      ? t(...copy.text89)
                      : i < 4
                        ? t(...copy.text90)
                        : i < 6
                          ? t(...copy.text91)
                          : "Premium"}{" "}
                    · {i < 2 ? "8" : "10"} min
                  </span>
                </div>
                {i < 2 || c.free ? <Play size={17} /> : <Lock size={17} />}
              </Link>
            ))}
          </div>
        </div>
        <aside className="learning-aside">
          <h3>{t(...copy.text92)}</h3>
          <p>{t(...copy.text93)}</p>
          <p>
            <Smartphone size={20} />
            {t(...copy.text94)}
          </p>
          <p>
            <ShieldCheck size={20} />
            {t(...copy.text95)}
          </p>
          <a
            className="text-button"
            target="_blank"
            rel="noreferrer"
            href={`https://wa.me/?text=${encodeURIComponent(c.title[+en] + " — " + window.location.href)}`}
          >
            <MessageCircle size={18} />
            {t(...copy.text96)}
          </a>
        </aside>
      </section>
      {!c.free && (
        <section className="container section">
          <div className="center">
            <h2>{t(...copy.text97)}</h2>
            <p>{t(...copy.text98)}</p>
          </div>
          <Plans id={c.id} />
        </section>
      )}
      <section className="container section">
        <FAQ />
      </section>
    </main>
  );
}
function Auth() {
  const { t } = useLang();
  const [signup, setSignup] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const [, navigate] = useLocation();
  return (
    <main className="auth-layout container">
      <div className="auth-story">
        <span className="eyebrow">{t(...copy.text99)}</span>
        <h1>
          {t(...copy.text100)}
          <br />
          <span>{t(...copy.text101)}</span>
        </h1>
        <p>{t(...copy.text102)}</p>
        <GraduationCap size={100} />
      </div>
      <form
        className="auth-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError("");
          const f = new FormData(e.currentTarget);
          try {
            const result = signup
              ? await authClient.signUp.email({
                  name: String(f.get("name")),
                  email: String(f.get("email")),
                  password: String(f.get("password")),
                  phone: String(f.get("phone")),
                } as Parameters<typeof authClient.signUp.email>[0])
              : await authClient.signIn.email({
                  email: String(f.get("email")),
                  password: String(f.get("password")),
                });
            if (result.error)
              setError(result.error.message || t(...copy.text103));
            else navigate("/espace");
          } catch {
            setError(t(...copy.text104));
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="auth-tabs">
          <button
            type="button"
            className={!signup ? "selected" : ""}
            onClick={() => setSignup(false)}
          >
            {t(...copy.text105)}
          </button>
          <button
            type="button"
            className={signup ? "selected" : ""}
            onClick={() => setSignup(true)}
          >
            {t(...copy.text106)}
          </button>
        </div>
        <h2>{signup ? t(...copy.text107) : t(...copy.text108)}</h2>
        {signup && (
          <>
            <label>
              {t(...copy.text109)}
              <input
                aria-label={t(...copy.text109)}
                name="name"
                required
                minLength={2}
              />
            </label>
            <label>
              {t(...copy.text110)}
              <input
                aria-label={t(...copy.text110)}
                name="phone"
                type="tel"
                placeholder="+237 6XXXXXXXX"
                pattern="\+237[ ]?[6][0-9]{8}"
                required
              />
            </label>
          </>
        )}
        <label>
          {t(...copy.text111)}
          <input
            aria-label={t(...copy.text111)}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label>
          {t(...copy.text112)}
          <input
            aria-label={t(...copy.text112)}
            name="password"
            type="password"
            autoComplete={signup ? "new-password" : "current-password"}
            required
            minLength={8}
          />
        </label>
        {signup && (
          <label className="consent">
            <input type="checkbox" required aria-label={t(...copy.text113)} />
            {t(...copy.text113)}
          </label>
        )}
        <button className="button" disabled={busy}>
          {busy
            ? t(...copy.text114)
            : signup
              ? t(...copy.text115)
              : t(...copy.text116)}
          <ArrowRight size={18} />
        </button>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <p className="form-note">{t(...copy.text117)}</p>
      </form>
    </main>
  );
}
function Guard({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  const s = authClient.useSession();
  if (s.isPending)
    return <div className="container section">{t(...copy.text118)}</div>;
  if (!s.data)
    return (
      <main className="container section center">
        <Lock size={40} />
        <h2>{t(...copy.text119)}</h2>
        <p>{t(...copy.text120)}</p>
        <Link href="/connexion" className="button">
          {t(...copy.text121)}
        </Link>
      </main>
    );
  return <>{children}</>;
}
function Dashboard() {
  const { t } = useLang();
  const s = authClient.useSession();
  const progress = useQuery(progressOptions());
  return (
    <main className="container section">
      <span className="eyebrow">{t(...copy.text122)}</span>
      <h1 className="page-title">
        {t(...copy.text123)}, {s.data?.user.name.split(" ")[0]}.
      </h1>
      <p>{t(...copy.text124)}</p>
      {progress.isLoading ? (
        <p>{t(...copy.text118)}</p>
      ) : progress.isError ? (
        <p role="alert">{t(...copy.text125)}</p>
      ) : (
        <div className="course-grid">
          {courses.map((c) => {
            const done =
              progress.data?.filter((p) => p.course === c.id).length || 0;
            return (
              <div key={c.id} className="dashboard-card">
                <CourseCard course={c} />
                <div className="dashboard-progress">
                  <div className="progress-line">
                    <i style={{ width: `${(done / c.count) * 100}%` }} />
                  </div>
                  <p>
                    {done}/{c.count} {t(...copy.text126)}
                  </p>
                  <Link
                    href={`/apprendre/${c.id}/${Math.min(done, c.free ? c.count - 1 : 1)}`}
                    className="text-button"
                  >
                    {done ? t(...copy.text127) : t(...copy.text128)}
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
function Reader({ id, n }: { id: string; n: number }) {
  const { en, t } = useLang();
  const c = courses.find((c) => c.id === id);
  const q = useQuery(lessonOptions(id, n, en));
  const qc = useQueryClient();
  const [done, setDone] = useState(false),
    [busy, setBusy] = useState(false),
    [msg, setMsg] = useState("");
  useEffect(() => {
    setDone(false);
    setMsg("");
  }, [id, n]);
  if (!c || n < 0 || n >= c.count) return <NotFound />;
  return (
    <main className="container section reader">
      <aside>
        <Link className="text-button" href="/espace">
          ← {t(...copy.text129)}
        </Link>
        <h3>{c.title[+en]}</h3>
        {c.topics.map((s, i) => (
          <Link
            className={i === n ? "current" : ""}
            key={i}
            href={`/apprendre/${id}/${i}`}
          >
            <span>{i + 1}.</span>
            {en ? c.en[i] : s}
            {!c.free && i > 1 && <Lock size={13} />}
          </Link>
        ))}
      </aside>
      <article>
        <span className="eyebrow">
          {t(...copy.text130)} {n + 1} / {c.count}
        </span>
        <h1 className="page-title">{en ? c.en[n] : c.topics[n]}</h1>
        {q.isLoading ? (
          <p>{t(...copy.text118)}</p>
        ) : q.isError ? (
          <div className="locked">
            <Lock size={35} />
            <h2>{t(...copy.text131)}</h2>
            <p>{t(...copy.text132)}</p>
            <Link className="button" href={`/formations/${id}`}>
              {t(...copy.text133)}
            </Link>
          </div>
        ) : (
          <>
            <div className="lesson-text">
              {q.data?.text.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <button
              className="text-button"
              onClick={() => {
                const blob = new Blob([c.title[+en] + "\n\n" + q.data?.text], {
                  type: "text/plain;charset=utf-8",
                });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = `SkillUp-${id}-${n + 1}.txt`;
                a.click();
                URL.revokeObjectURL(a.href);
              }}
            >
              <Download size={18} />
              {t(...copy.text134)}
            </button>
            <div className="reader-actions">
              <button
                className="button"
                disabled={busy || done}
                onClick={async () => {
                  setBusy(true);
                  try {
                    await client.learning.complete({ course: id, lesson: n });
                    setDone(true);
                    qc.invalidateQueries(progressOptions());
                  } catch {
                    setMsg(t(...copy.text135));
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                {busy ? "…" : done ? t(...copy.text136) : t(...copy.text137)}
                <CheckCircle2 size={18} />
              </button>
              {n < c.count - 1 && (
                <Link
                  className="text-button"
                  href={`/apprendre/${id}/${n + 1}`}
                >
                  {t(...copy.text138)}
                  <ArrowRight size={18} />
                </Link>
              )}
            </div>
            {msg && <p role="alert">{msg}</p>}
          </>
        )}
      </article>
    </main>
  );
}
function Checkout({ id, plan }: { id: string; plan: number }) {
  const { en, t } = useLang();
  const c = courses.find((c) => c.id === id);
  if (!c || ![0, 1, 2].includes(plan)) return <NotFound />;
  return (
    <main className="container section checkout">
      <span className="eyebrow">{t(...copy.text139)}</span>
      <h1 className="page-title">{t(...copy.text140)}</h1>
      <div className="checkout-grid">
        <div className="panel">
          <h2>{c.title[+en]}</h2>
          <p>{[t(...copy.text141), t(...copy.text142), "Premium"][plan]}</p>
          <div className="price">
            {[2000, 5000, 10000][plan].toLocaleString("fr-FR")}{" "}
            <span>FCFA</span>
          </div>
          <p>
            <ShieldCheck size={18} /> {t(...copy.text143)}
          </p>
        </div>
        <div className="panel">
          <h3>{t(...copy.text144)}</h3>
          <p>{t(...copy.text145)}</p>
          <div className="operator-row">
            <span>Orange Money</span>
            <span>MTN MoMo</span>
          </div>
          <button disabled className="button">
            {t(...copy.text146)}
            <Lock size={16} />
          </button>
          <Link className="text-button" href={`/apprendre/${id}/0`}>
            {t(...copy.text147)}
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}
function Contact() {
  const { t } = useLang();
  const [busy, setBusy] = useState(false),
    [msg, setMsg] = useState("");
  return (
    <main className="container section contact-layout">
      <div>
        <span className="eyebrow">{t(...copy.text148)}</span>
        <h1 className="page-title">{t(...copy.text149)}</h1>
        <p>{t(...copy.text150)}</p>
        <MessageCircle size={70} />
        <p className="form-note">{t(...copy.text151)}</p>
      </div>
      <form
        className="panel"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const f = new FormData(e.currentTarget);
          try {
            await client.learning.contact({
              name: String(f.get("name")),
              email: String(f.get("email")),
              message: String(f.get("message")),
            });
            setMsg(t(...copy.text152));
          } catch {
            setMsg(t(...copy.text153));
          } finally {
            setBusy(false);
          }
        }}
      >
        <label>
          {t(...copy.text154)}
          <input
            aria-label={t(...copy.text154)}
            name="name"
            required
            minLength={2}
          />
        </label>
        <label>
          {t(...copy.text155)}
          <input
            aria-label={t(...copy.text155)}
            name="email"
            type="email"
            required
          />
        </label>
        <label>
          {t(...copy.text156)}
          <textarea
            aria-label={t(...copy.text156)}
            name="message"
            required
            minLength={10}
            rows={5}
          />
        </label>
        <label className="consent">
          <input type="checkbox" required aria-label={t(...copy.text157)} />
          {t(...copy.text157)}
        </label>
        <button disabled={busy} className="button">
          {busy ? "…" : t(...copy.text158)}
          <ArrowUpRight size={17} />
        </button>
        {msg && <output>{msg}</output>}
      </form>
    </main>
  );
}
function Admin() {
  const { t } = useLang();
  const q = useQuery(adminOptions());
  return (
    <main className="container section">
      <span className="eyebrow">ADMINISTRATION</span>
      <h1 className="page-title">{t(...copy.text159)}</h1>
      {q.isLoading ? (
        <p>{t(...copy.text118)}</p>
      ) : q.isError ? (
        <div className="panel">
          <Lock />
          <h2>{t(...copy.text160)}</h2>
          <p>{t(...copy.text161)}</p>
        </div>
      ) : (
        <>
          <div className="steps">
            {[
              [t(...copy.text162), q.data?.waitlist.length],
              [t(...copy.text163), q.data?.messages.length],
              [t(...copy.text164), q.data?.progress.length],
            ].map(([a, b]) => (
              <div key={a}>
                <h3>{a}</h3>
                <h2>{b}</h2>
              </div>
            ))}
          </div>
          <h2>{t(...copy.text165)}</h2>
          {q.data?.waitlist.map((w) => (
            <p className="admin-row" key={w.id}>
              {w.course} · {w.contact}
            </p>
          ))}
          <h2>{t(...copy.text166)}</h2>
          {q.data?.messages.map((m) => (
            <div className="panel" key={m.id}>
              <strong>
                {m.name} · {m.email}
              </strong>
              <p>{m.message}</p>
            </div>
          ))}
          <p>{t(...copy.text167)}</p>
        </>
      )}
    </main>
  );
}
function Legal({ type }: { type: string }) {
  const { t } = useLang();
  const texts: Record<string, string[]> = {
    apropos: [t(...copy.text168), t(...copy.text169)],
    confidentialite: [t(...copy.text170), t(...copy.text171)],
    conditions: [t(...copy.text172), t(...copy.text173)],
    remboursement: [t(...copy.text174), t(...copy.text175)],
  };
  const s = texts[type] || texts.apropos;
  return (
    <main className="container section legal">
      <span className="eyebrow">SKILLUP</span>
      <h1 className="page-title">{s[0]}</h1>
      <p>{s[1]}</p>
      <Link className="button" href="/contact">
        {t(...copy.text176)}
        <ArrowRight size={18} />
      </Link>
    </main>
  );
}
function NotFound() {
  const { t } = useLang();
  return (
    <main className="container section">
      <h1>404</h1>
      <p>{t(...copy.text177)}</p>
      <Link href="/">{t(...copy.text178)}</Link>
    </main>
  );
}
export default function Platform() {
  const [en, setEn] = useState(localStorage.getItem("skillup-lang") === "en"),
    [menu, setMenu] = useState(false);
  const [location] = useLocation();
  const session = authClient.useSession();
  const t = (fr: string, english: string) => (en ? english : fr);
  useEffect(() => {
    document.documentElement.lang = en ? "en" : "fr";
    document.title = "SkillUp — " + copy.text179[+en];
    localStorage.setItem("skillup-lang", en ? "en" : "fr");
  }, [en]);
  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Language.Provider value={{ en, t }}>
      <div className="topbar">
        {t(...copy.text180)}
        <Link href="/formations/gratuit">
          {t(...copy.text181)}
          <ArrowRight size={13} />
        </Link>
      </div>
      <header className="header container">
        <Link className="logo" href="/">
          <span className="logo-mark">
            <TrendingUp size={24} />
          </span>
          {BRAND}
          <span className="logo-dot">.</span>
        </Link>
        <nav className={menu ? "open" : ""}>
          <Link href="/" className={location === "/" ? "active" : ""}>
            {t(...copy.text182)}
          </Link>
          <Link
            href="/catalogue"
            className={location === "/catalogue" ? "active" : ""}
          >
            {t(...copy.text183)}
          </Link>
          <Link href="/apropos">{t(...copy.text184)}</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="header-actions">
          <button
            className="language"
            onClick={() => setEn(!en)}
            aria-label={en ? "Passer en français" : "Switch to English"}
          >
            <Globe size={16} />
            {en ? "EN" : "FR"}
            <ChevronDown size={12} />
          </button>
          {session.data ? (
            <Link className="text-button" href="/espace">
              {t(...copy.text129)}
            </Link>
          ) : (
            <Link className="login-link" href="/connexion">
              {t(...copy.text185)}
            </Link>
          )}
          <Link
            className="button small"
            href={session.data ? "/espace" : "/connexion"}
          >
            {t(...copy.text186)}
            <ArrowUpRight size={16} />
          </Link>
          <button
            className="mobile-menu"
            aria-label="Menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/catalogue" component={Catalogue} />
        <Route path="/formations/:id">{(p) => <Detail id={p.id} />}</Route>
        <Route path="/connexion" component={Auth} />
        <Route path="/espace">
          <Guard>
            <Dashboard />
          </Guard>
        </Route>
        <Route path="/apprendre/:id/:n">
          {(p) => (
            <Guard>
              <Reader id={p.id} n={Number(p.n)} />
            </Guard>
          )}
        </Route>
        <Route path="/paiement/:id/:plan">
          {(p) => <Checkout id={p.id} plan={Number(p.plan)} />}
        </Route>
        <Route path="/contact" component={Contact} />
        <Route path="/faq">
          <main className="container section">
            <h1 className="page-title">{t(...copy.text187)}</h1>
            <FAQ />
          </main>
        </Route>
        <Route path="/admin">
          <Guard>
            <Admin />
          </Guard>
        </Route>
        {["apropos", "confidentialite", "conditions", "remboursement"].map(
          (s) => (
            <Route key={s} path={"/" + s}>
              <Legal type={s} />
            </Route>
          ),
        )}
        <Route component={NotFound} />
      </Switch>
      <footer>
        <div className="container footer-top">
          <div>
            <Link className="logo" href="/">
              <span className="logo-mark">
                <TrendingUp size={24} />
              </span>
              {BRAND}.
            </Link>
            <p>{t(...copy.text188)}</p>
            <span className="footer-tag">{t(...copy.text189)}</span>
          </div>
          <div>
            <strong>{t(...copy.text190)}</strong>
            <Link href="/catalogue">{t(...copy.text183)}</Link>
            <Link href="/formations/gratuit">{t(...copy.text191)}</Link>
            <Link href="/espace">{t(...copy.text129)}</Link>
          </div>
          <div>
            <strong>SkillUp</strong>
            <Link href="/apropos">{t(...copy.text184)}</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <div>
            <strong>{t(...copy.text192)}</strong>
            <p>{t(...copy.text193)}</p>
            <Link href="/contact" className="text-button">
              <MessageCircle size={18} />
              {t(...copy.text194)}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} {BRAND}. {t(...copy.text195)}
          </span>
          <div>
            <Link href="/conditions">{t(...copy.text196)}</Link>
            <Link href="/confidentialite">{t(...copy.text197)}</Link>
            <Link href="/remboursement">{t(...copy.text198)}</Link>
            {session.data && (
              <button onClick={() => authClient.signOut()}>
                {t(...copy.text199)}
              </button>
            )}
          </div>
        </div>
      </footer>
      <Link
        href="/contact"
        className="support-button"
        aria-label={t(...copy.text200)}
      >
        <MessageCircle size={23} />
        <span>{t(...copy.text201)}</span>
      </Link>
    </Language.Provider>
  );
}
