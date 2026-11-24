export const BRAND = "SkillUp";
export const courses = [
  {
    id: "excel",
    title: ["Excel pour tous", "Excel for everyone"],
    desc: [
      "Gère ton stock, ta caisse et tes marges. Excel devient ton meilleur allié au quotidien.",
      "Manage stock, cash and margins. Make Excel your everyday business partner.",
    ],
    cat: 0,
    icon: "excel",
    color: "green",
    duration: "3 h",
    count: 8,
    topics: [
      "Découvrir Excel et créer un tableau",
      "Tenir le stock de ta boutique",
      "Calculer les totaux",
      "Suivre ta caisse",
      "Calculer tes marges",
      "Organiser une tontine",
      "Construire un tableau de bord",
      "Ton projet final",
    ],
    en: [
      "Discover Excel and create a table",
      "Track your shop inventory",
      "Calculate totals",
      "Track cash flow",
      "Calculate margins",
      "Organise a savings group",
      "Build a dashboard",
      "Your final project",
    ],
  },
  {
    id: "word",
    title: ["Word & PowerPoint", "Word & PowerPoint"],
    desc: [
      "Un CV qui se démarque. Des présentations qui convainquent.",
      "A CV that stands out. Presentations that persuade.",
    ],
    cat: 0,
    icon: "word",
    color: "blue",
    duration: "2 h 30",
    count: 8,
    topics: [
      "Créer un document clair",
      "Rédiger un CV convaincant",
      "Écrire une lettre",
      "Mettre en page un rapport",
      "Découvrir PowerPoint",
      "Raconter une histoire",
      "Préparer une soutenance",
      "Ton projet final",
    ],
    en: [
      "Create a clear document",
      "Write a compelling CV",
      "Write a letter",
      "Format a report",
      "Discover PowerPoint",
      "Tell a story",
      "Prepare your defence",
      "Your final project",
    ],
  },
  {
    id: "vente",
    title: ["Vendre et communiquer", "Sell & communicate"],
    desc: [
      "Trouve tes premiers clients et développe tes ventes sur WhatsApp.",
      "Find your first customers and grow your sales on WhatsApp.",
    ],
    cat: 1,
    icon: "sale",
    color: "beige",
    duration: "3 h",
    count: 8,
    topics: [
      "Comprendre ton client",
      "Créer une offre simple",
      "Fixer un prix",
      "Vendre sur WhatsApp",
      "Créer un catalogue",
      "Répondre aux objections",
      "Fidéliser tes clients",
      "Ton plan de vente",
    ],
    en: [
      "Understand your customer",
      "Create a simple offer",
      "Set your price",
      "Sell on WhatsApp",
      "Create a catalogue",
      "Handle objections",
      "Build loyalty",
      "Your sales plan",
    ],
  },
  {
    id: "argent",
    title: ["Argent et temps", "Money & time"],
    desc: [
      "Prends le contrôle de ton budget et fais du temps ton allié.",
      "Take control of your budget and make time your ally.",
    ],
    cat: 3,
    icon: "money",
    color: "green",
    duration: "2 h",
    count: 8,
    topics: [
      "Comprendre ton budget",
      "Noter tes dépenses",
      "Épargner régulièrement",
      "Éviter les dettes",
      "Choisir tes priorités",
      "Planifier ta semaine",
      "Garder tes habitudes",
      "Ton plan personnel",
    ],
    en: [
      "Understand your budget",
      "Track your spending",
      "Save regularly",
      "Avoid debt",
      "Set priorities",
      "Plan your week",
      "Build habits",
      "Your personal plan",
    ],
  },
  {
    id: "negociation",
    title: ["Prise de parole et négociation", "Speaking & negotiation"],
    desc: [
      "Exprime tes idées avec confiance et négocie sans stress.",
      "Express your ideas confidently and negotiate without stress.",
    ],
    cat: 2,
    icon: "talk",
    color: "blue",
    duration: "2 h",
    count: 8,
    topics: [
      "Structurer ton message",
      "Gérer le trac",
      "Captiver ton public",
      "Écouter activement",
      "Préparer une négociation",
      "Défendre ta valeur",
      "Trouver un accord",
      "Mise en pratique",
    ],
    en: [
      "Structure your message",
      "Manage nerves",
      "Engage your audience",
      "Listen actively",
      "Prepare a negotiation",
      "Defend your value",
      "Reach an agreement",
      "Practice",
    ],
  },
  {
    id: "gratuit",
    title: ["Prise de parole en 5 leçons", "Public speaking in 5 lessons"],
    desc: [
      "Fais le premier pas. Apprends à prendre la parole, gratuitement.",
      "Take your first step. Learn to speak confidently, for free.",
    ],
    cat: 2,
    icon: "talk",
    color: "green",
    duration: "45 min",
    count: 5,
    free: true,
    topics: [
      "Oser prendre la parole",
      "Organiser tes idées",
      "Respirer et ralentir",
      "Raconter une histoire",
      "Ton premier discours",
    ],
    en: [
      "Dare to speak",
      "Organise your ideas",
      "Breathe and slow down",
      "Tell a story",
      "Your first speech",
    ],
  },
];
export const categories = [
  ["Toutes les formations", "All courses"],
  ["Outils bureautiques", "Office tools"],
  ["Vente et marketing", "Sales & marketing"],
  ["Communication", "Communication"],
  ["Argent et organisation", "Money & organisation"],
  ["Développement personnel", "Personal development"],
  ["Leadership", "Leadership"],
];
export const upcoming = [
  ["Intelligence émotionnelle", "Emotional intelligence"],
  ["Réseau et networking", "Networking"],
  ["Esprit critique", "Critical thinking"],
  ["Leadership", "Leadership"],
  ["Culture digitale", "Digital literacy"],
  ["Gestion de projet", "Project management"],
  ["Collaboration", "Collaboration"],
  ["Résilience", "Resilience"],
];
export function lessonText(id: string, n: number, en: boolean) {
  if (id === "gratuit" && n >= 2 && n < 5) {
    const fr = [
      "Avant de parler, pose tes pieds au sol. Inspire doucement pendant quatre secondes, puis expire pendant six secondes. Répète trois fois. Lis ta première phrase à voix haute et marque une pause entre les idées. Une pause te laisse réfléchir et aide ton public à suivre.\n\nExercice : enregistre une minute de présentation. Écoute-la et repère les endroits où tu parles trop vite. Recommence en laissant deux secondes entre chaque idée.",
      "Une histoire rend ton message concret. Présente une personne, un problème et ce qui a changé. Exemple : une étudiante aidait sa tante à vendre au marché. Elle a créé un catalogue WhatsApp et les clients ont pu commander sans se déplacer. Ne promets pas de chiffres que tu ne peux pas vérifier.\n\nExercice : raconte une difficulté que tu as résolue en trois phrases. Explique la situation, ton action et le résultat.",
      "Prépare ton premier discours d’une minute. Commence par ton idée principale. Donne un exemple de ton quotidien et termine par une invitation à agir. Regarde une personne à la fois. Si tu oublies un mot, fais une pause et continue avec une phrase simple.\n\nExercice final : présente une compétence que tu souhaites apprendre. Demande à un proche de te dire ce qu’il a retenu. Note un point réussi et une chose à améliorer. Bravo : tu as terminé ces cinq premières étapes !",
    ];
    const english = [
      "Before speaking, place your feet on the ground. Breathe in gently for four seconds and out for six seconds. Repeat three times. Read your opening sentence aloud and pause between ideas. Pauses give you time to think and help your audience follow.\n\nPractice: record a one-minute presentation. Listen for places where you rush. Try again with two seconds between each idea.",
      "A story makes your message concrete. Describe a person, a problem and what changed. For example, a student helped her aunt sell at the market. She created a WhatsApp catalogue so customers could order without travelling. Do not promise numbers you cannot verify.\n\nPractice: tell a story about a problem you solved in three sentences: the situation, your action and the result.",
      "Prepare your first one-minute speech. Start with your main idea, give an everyday example and end with an invitation to act. Look at one person at a time. If you forget a word, pause and continue with a simple sentence.\n\nFinal practice: present a skill you want to learn. Ask someone what they remember. Write down one success and one thing to improve. Well done: you have completed your first five steps!",
    ];
    return (en ? english : fr)[n - 2];
  }
  const intro: Record<string, string[]> = {
    excel: [
      "Ouvre Excel et crée un nouveau classeur. Chaque case est une cellule. Écris Produit dans A1, Quantité dans B1 et Prix unitaire dans C1. Ajoute Riz, 10 et 500 sur la deuxième ligne. Tu viens de créer ton premier tableau de boutique.\n\nExercice : ajoute trois produits vendus dans ton quartier. Utilise une seule ligne par produit. Enregistre le fichier sous le nom Stock-boutique.",
      "Pour suivre le stock, note chaque entrée et chaque vente. Commence avec 20 sacs de riz. Si tu vends 3 sacs, ton stock restant est 17. Dans Excel, écris =B2-C2 pour retirer les ventes du stock initial.\n\nExercice : prépare cinq lignes de produits. Vérifie chaque soir que le stock réel correspond au tableau.",
    ],
    word: [
      "Un document clair commence par une idée simple. Ouvre Word. Écris ton nom, un titre et un paragraphe court. Choisis une police lisible et garde la même taille pour tous les paragraphes.\n\nExercice : rédige une courte présentation pour demander un stage à Douala.",
      "Ton CV montre ce que tu sais faire. Indique ton contact, ta formation et tes expériences. Une aide dans la boutique familiale compte : précise les tâches réalisées.\n\nExercice : écris trois compétences et donne un exemple concret pour chacune.",
    ],
    vente: [
      "Avant de vendre, écoute. Qui est ton client ? Quel problème veut-il résoudre ? Une coiffeuse peut proposer un rendez-vous rapide aux étudiantes qui ont peu de temps.\n\nExercice : interroge trois personnes sur leurs besoins avant de choisir ton offre.",
      "Une bonne offre dit quoi, pour qui et à quel prix. Exemple : livraison de repas au campus à midi pour 1 500 FCFA. Évite les promesses vagues.\n\nExercice : écris ton offre en une phrase et demande à un ami de la reformuler.",
    ],
    argent: [
      "Un budget est une liste de tes entrées et sorties d’argent. Si tu reçois 50 000 FCFA, réserve d’abord le transport, la nourriture et le logement. Épargne une petite somme avant les dépenses facultatives.\n\nExercice : note tes ressources et tes trois dépenses principales.",
      "Pendant sept jours, note chaque dépense, même un trajet de moto-taxi. Regroupe les dépenses par catégorie. Tu verras où part ton argent.\n\nExercice : choisis une dépense que tu peux réduire sans te priver de l’essentiel.",
    ],
    negociation: [
      "Un message simple a trois parties : ton idée, un exemple et une action. Pour présenter ta boutique, explique ce que tu vends, à qui et comment commander.\n\nExercice : présente ton projet en trente secondes à un ami.",
      "Le trac est normal. Pose tes pieds au sol et respire lentement. Prépare la première phrase. Tu n’as pas besoin d’être parfait pour être compris.\n\nExercice : enregistre une présentation courte et repère un point à améliorer.",
    ],
    gratuit: [
      "Ta voix compte. Choisis une idée qui te tient à cœur. Explique-la à une personne de confiance en deux phrases. Le but n’est pas de faire un discours parfait, mais de commencer.\n\nExercice : présente-toi en trente secondes.",
      "Note trois idées avant de parler. Commence par la plus importante. Ajoute un exemple de ton quotidien et termine par ce que tu proposes.\n\nExercice : explique pourquoi tu souhaites apprendre une nouvelle compétence.",
    ],
  };
  if (en) {
    const texts: Record<string, string[]> = {
      excel: [
        "Open Excel and create a workbook. Type Product in A1, Quantity in B1 and Unit price in C1. Add Rice, 10 and 500 on the second row. You have built your first shop table.\n\nPractice: add three products sold in your neighbourhood. Save your file as Shop-stock.",
        "Record stock received and each sale. Start with 20 bags of rice. Sell 3 and you have 17 left. Use =B2-C2 to subtract sales from your initial stock.\n\nPractice: create five product rows and compare your table with the real stock each evening.",
      ],
      word: [
        "Open Word. Write your name, a heading and a short paragraph. Pick a readable font and keep consistent text sizes.\n\nPractice: write a short introduction for an internship application in Douala.",
        "Your CV shows what you can do. Include contact details, education and experience. Helping in your family shop counts: describe your tasks.\n\nPractice: list three skills with a concrete example for each.",
      ],
      vente: [
        "Listen before selling. Who is your customer? What problem do they need to solve? A hairdresser can offer quick appointments to busy students.\n\nPractice: ask three people about their needs.",
        "A clear offer explains what, for whom and at what price. Example: lunch delivered to campus at noon for 1 500 FCFA.\n\nPractice: describe your offer in one sentence.",
      ],
      argent: [
        "A budget lists income and spending. If you receive 50 000 FCFA, first plan for transport, food and housing. Save a small amount before optional expenses.\n\nPractice: list your income and three main expenses.",
        "Record every expense for seven days, including motorbike taxi rides. Group spending by category.\n\nPractice: choose one expense you can reduce.",
      ],
      negociation: [
        "A clear message has an idea, an example and an action. Explain what your shop sells, who it serves and how to order.\n\nPractice: present your project in thirty seconds.",
        "Nerves are normal. Put your feet on the ground and breathe slowly. Prepare your opening sentence.\n\nPractice: record a short presentation and find one thing to improve.",
      ],
      gratuit: [
        "Your voice matters. Choose an idea you care about. Explain it in two sentences to someone you trust. The goal is to start, not to be perfect.\n\nPractice: introduce yourself in thirty seconds.",
        "Write down three ideas before speaking. Start with the most important. Add an everyday example and finish with your proposal.\n\nPractice: explain why you want to learn a new skill.",
      ],
    };
    return n < 2
      ? texts[id]?.[n]
      : "This lesson is being prepared. The full learning content and practice files will be added before sales open.";
  }
  return n < 2
    ? intro[id]?.[n]
    : "Cette leçon est en préparation. Le contenu complet et les fichiers pratiques seront ajoutés avant l’ouverture des ventes.";
}
