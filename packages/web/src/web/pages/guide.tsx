import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCheck,
  ChevronRight,
  Code2,
  Copy,
  FileText,
  Layers,
  Menu,
  Search,
  ShieldAlert,
  TrendingUp,
  X,
} from "lucide-react";
import { guideSections } from "../data/guide";
import "./guide.css";
function Inline({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
        .map((part, i) =>
          part.startsWith("`") ? (
            <code key={i}>{part.slice(1, -1)}</code>
          ) : part.startsWith("**") ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
          ) : (
            part
          ),
        )}
    </>
  );
}
function Command({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="guide-command">
      <div>
        <span>
          <Code2 size={14} /> Terminal
        </span>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
          aria-label="Copier les commandes"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
          {copied ? "Copié" : "Copier"}
        </button>
      </div>
      <pre>{text}</pre>
    </div>
  );
}
function Content({ body }: { body: string }) {
  const chunks = body.split(/```(?:sh)?\n([\s\S]*?)```/g);
  return (
    <>
      {chunks.map((chunk, index) =>
        index % 2 ? (
          <Command key={index} text={chunk.trim()} />
        ) : (
          <div key={index}>
            {chunk
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((block, j) => {
                const lines = block.split("\n");
                if (lines.every((line) => line.startsWith("- ")))
                  return (
                    <ul className="guide-bullets" key={j}>
                      {lines.map((line, k) => (
                        <li key={k}>
                          <Check size={15} />
                          <span>
                            <Inline text={line.slice(2)} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                if (lines.every((line) => /^\d+\. /.test(line)))
                  return (
                    <ol className="guide-numbered" key={j}>
                      {lines.map((line, k) => (
                        <li key={k}>
                          <Inline text={line.replace(/^\d+\. /, "")} />
                        </li>
                      ))}
                    </ol>
                  );
                return (
                  <p key={j}>
                    <Inline text={block} />
                  </p>
                );
              })}
          </div>
        ),
      )}
    </>
  );
}
const launchSteps = guideSections
  .find((s) => s.title === "Mise en ligne")!
  .body.split("\n")
  .filter((s) => /^\d+\. /.test(s))
  .map((s) => s.replace(/^\d+\. /, ""));
export default function Guide() {
  const [search, setSearch] = useState(""),
    [menu, setMenu] = useState(false),
    [active, setActive] = useState("overview");
  const [checked, setChecked] = useState<number[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("skillup-launch-checklist") || "[]",
      );
    } catch {
      return [];
    }
  });
  useEffect(() => {
    document.title = "SkillUp — Guide technique & feuille de route";
    document.documentElement.lang = "fr";
  }, []);
  useEffect(() => {
    localStorage.setItem("skillup-launch-checklist", JSON.stringify(checked));
  }, [checked]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll(".guide-section")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [search]);
  const sections = guideSections.filter((s) =>
    (s.title + " " + s.body)
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase()),
  );
  return (
    <div className="guide-app">
      <header className="guide-header">
        <Link className="logo" href="/">
          <span className="logo-mark">
            <TrendingUp size={23} />
          </span>
          SkillUp<span className="logo-dot">.</span>
        </Link>
        <span className="guide-header-divider" />
        <span className="guide-header-label">Guide technique</span>
        <span className="guide-version">VERSION INITIALE</span>
        <Link href="/" className="guide-back">
          Voir la plateforme <ArrowUpRight size={16} />
        </Link>
        <button
          className="guide-menu"
          aria-label="Ouvrir le sommaire"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <div className="guide-layout">
        <aside className={"guide-sidebar " + (menu ? "is-open" : "")}>
          <div className="guide-search">
            <Search size={17} />
            <input
              aria-label="Rechercher dans le guide"
              placeholder="Rechercher dans le guide…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                aria-label="Effacer la recherche"
                onClick={() => setSearch("")}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <span className="guide-nav-label">DANS CE GUIDE</span>
          <nav aria-label="Sommaire du guide">
            <a
              href="#overview"
              className={active === "overview" ? "selected" : ""}
              onClick={() => setMenu(false)}
            >
              <BookOpen size={16} />
              Vue d’ensemble
            </a>
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={"#" + s.id}
                className={active === s.id ? "selected" : ""}
                onClick={() => setMenu(false)}
              >
                <span className="guide-nav-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title ===
                "Ce qui reste à développer pour respecter tout le PDF"
                  ? "Fonctions restantes"
                  : s.title}
              </a>
            ))}
            <a
              href="#launch-checklist"
              onClick={() => setMenu(false)}
              className={active === "launch-checklist" ? "selected" : ""}
            >
              <CheckCheck size={16} />
              Checklist de lancement
            </a>
          </nav>
          <div className="guide-side-note">
            <ShieldAlert size={21} />
            <strong>Pas encore prêt à vendre</strong>
            <p>
              La plateforme est fonctionnelle, mais les paiements et plusieurs
              outils restent à développer.
            </p>
          </div>
          <span className="guide-source">SOURCE · GUIDE TECHNIQUE LIVRÉ</span>
        </aside>
        <main className="guide-main">
          <section className="guide-section guide-intro" id="overview">
            <div className="guide-breadcrumb">
              SkillUp <ChevronRight size={12} /> Documentation{" "}
              <ChevronRight size={12} /> Livraison
            </div>
            <span className="guide-kicker">
              LE POINT DE DÉPART. LA SUITE. LE LANCEMENT.
            </span>
            <h1>
              Un guide clair.
              <br />
              <span>Pour avancer sereinement.</span>
            </h1>
            <p className="guide-lead">
              Ce qui fonctionne aujourd’hui, les choix techniques et les étapes
              à terminer avant d’accueillir tes premiers clients payants.
            </p>
            <div className="guide-intro-actions">
              <a href="#section-6" className="button">
                Voir les fonctions restantes <ArrowUpRight size={16} />
              </a>
              <a href="#launch-checklist" className="text-button">
                Préparer le lancement <ChevronRight size={16} />
              </a>
            </div>
            <div className="guide-status-grid">
              <div>
                <span className="guide-stat-icon done">
                  <CheckCheck size={20} />
                </span>
                <span>ÉTAT ACTUEL</span>
                <strong>Fondation fonctionnelle</strong>
                <small>Comptes, leçons et progression</small>
              </div>
              <div>
                <span className="guide-stat-icon">
                  <Layers size={20} />
                </span>
                <span>SOCLE TECHNIQUE</span>
                <strong>Bun · React · Hono</strong>
                <small>oRPC · Drizzle · SQLite / Turso</small>
              </div>
              <div>
                <span className="guide-stat-icon pending">
                  <ShieldAlert size={20} />
                </span>
                <span>MISE EN VENTE</span>
                <strong>Paiements désactivés</strong>
                <small>Développement et configuration requis</small>
              </div>
            </div>
            <div className="guide-warning">
              <ShieldAlert size={20} />
              <p>
                <strong>Ce guide ne change pas l’état du produit.</strong> Il
                documente la première version : ce n’est pas encore la
                plateforme complète prête à encaisser décrite dans le cahier des
                charges.
              </p>
            </div>
          </section>
          {search && (
            <output className="guide-results">
              {sections.length} section{sections.length !== 1 ? "s" : ""} pour «{" "}
              {search} »
            </output>
          )}
          {sections.map((s, i) => (
            <section
              className="guide-section guide-document"
              id={s.id}
              key={s.id}
            >
              <div className="guide-section-top">
                <span className="guide-section-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  {s.id === "section-1"
                    ? "DISPONIBLE"
                    : s.id === "section-6"
                      ? "À DÉVELOPPER"
                      : "DOCUMENTATION"}
                </span>
              </div>
              <h2>
                {s.title ===
                "Ce qui reste à développer pour respecter tout le PDF"
                  ? "Les fonctions restantes."
                  : s.title}
              </h2>
              <Content body={s.body} />
            </section>
          ))}
          <section
            className="guide-section guide-checklist"
            id="launch-checklist"
          >
            <span className="guide-kicker">TON PLAN DE MISE EN LIGNE</span>
            <h2>Avant d’ouvrir les portes.</h2>
            <p>
              Coche les étapes que tu as réellement terminées. Cette liste est
              personnelle : elle reste enregistrée dans ce navigateur et ne
              vérifie pas le site automatiquement.
            </p>
            <div className="guide-check-progress">
              <span>
                {checked.length} / {launchSteps.length} étapes cochées
              </span>
              <div>
                <i
                  style={{
                    width: `${(checked.length / launchSteps.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            {launchSteps.map((step, i) => (
              <label
                key={i}
                className={
                  "guide-check-row " + (checked.includes(i) ? "completed" : "")
                }
              >
                <input
                  type="checkbox"
                  aria-label={step}
                  checked={checked.includes(i)}
                  onChange={() =>
                    setChecked((old) =>
                      old.includes(i)
                        ? old.filter((n) => n !== i)
                        : [...old, i],
                    )
                  }
                />
                <span>
                  <strong>Étape {String(i + 1).padStart(2, "0")}</strong>
                  {step}
                </span>
              </label>
            ))}
            <button className="text-button" onClick={() => setChecked([])}>
              Réinitialiser ma checklist
            </button>
          </section>
          <section className="guide-format-note">
            <FileText size={24} />
            <div>
              <h3>Un site ou une présentation ?</h3>
              <p>
                <strong>Le site est le meilleur format pour ce guide :</strong>{" "}
                recherche, commandes copiables, détails techniques et checklist.
                Une présentation serait plus adaptée à une réunion avec des
                partenaires : résumer l’état du projet, les priorités et le plan
                de lancement en quelques diapositives.
              </p>
            </div>
          </section>
          <div className="guide-bottom">
            SkillUp · Guide de la première version{" "}
            <Link href="/">
              Retour à la plateforme <ArrowUpRight size={14} />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
