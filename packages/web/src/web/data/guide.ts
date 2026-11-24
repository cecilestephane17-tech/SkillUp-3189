export const guideSections = [
  {
    id: "section-1",
    title: "Réalisé",
    body: "- Accueil responsive, catalogue avec recherche et catégories.\n- Six formations : cinq de lancement et une gratuite ; huit sujets pour chaque formation payante et cinq pour la gratuite.\n- Pages de formation, programme, tarifs Petite/Moyenne/Premium en FCFA, partage WhatsApp.\n- Bouton FR/EN : interface, titres et contenu des leçons traduits ; préférence enregistrée. Les illustrations contiennent quelques textes décoratifs français.\n- Inscription avec nom, email, téléphone, mot de passe ; connexion email/mot de passe, déconnexion. Better Auth stocke les mots de passe hachés et les sessions en base.\n- Tableau de bord, lecteur, enregistrement réel de progression en base, téléchargement texte hors ligne.\n- Contrôle serveur : seules les deux premières leçons payantes et les cinq leçons gratuites sont accessibles. Les autres leçons payantes sont explicitement provisoires.\n- Pages de récapitulatif d'achat sans encaissement : aucun numéro marchand fictif.\n- Liste d'attente enregistrée en base, formulaire de contact enregistré en base.\n- Administration protégée par rôle, consultation des listes d'attente, messages et progressions.\n- À propos, FAQ, confidentialité, conditions, remboursement : textes de départ à faire valider.\n- Photo optimisée WebP, illustrations CSS sans bibliothèques lourdes.",
  },
  {
    id: "section-2",
    title: "Installation et commandes",
    body: "Le projet utilise Bun, React, Vite, Hono, oRPC, Drizzle et une base SQLite/Turso provisionnée.\n\n```sh\nbun install\n# depuis packages/web :\nbun run db:push\n# depuis la racine :\nbun run dev\nbun run build\nbun run lint\n```\nLe port web est défini par `__ports.cjs` (4200). Ne pas modifier ce fichier.",
  },
  {
    id: "section-3",
    title: "Configuration",
    body: "Toutes les variables sont dans `.env` à la racine. Ne pas committer ce fichier.\n- `DATABASE_URL`, `DATABASE_AUTH_TOKEN` : accès à la base provisionnée.\n- `BETTER_AUTH_SECRET` : secret généré pour cette livraison ; utiliser une valeur propre à chaque environnement.\n- `WEBSITE_URL` : URL HTTPS finale à configurer avant production.\n- Variables d'analytics déjà fournies par la plateforme : conserver l'intégration.\n\nNom : `BRAND` dans `packages/web/src/shared/courses.ts`. Certaines références éditoriales à SkillUp sont présentes dans les traductions et à harmoniser avant un changement de nom ultérieur.\nTraductions : `src/web/locales/copy.ts`. Contenu bilingue : `src/shared/courses.ts`.",
  },
  {
    id: "section-4",
    title: "Administrateur",
    body: "Créer un compte normal puis attribuer `role='admin'` dans la table `user` via un accès serveur de confiance. Ne jamais exposer cette action dans le navigateur. Aucun mot de passe administrateur universel n'est livré.",
  },
  {
    id: "section-5",
    title: "Base et contenu",
    body: "Migrations via `bun run db:generate`, puis `bun run db:migrate` depuis `packages/web`. Les tables actuelles sont celles de Better Auth, `progress`, `waitlist` et `messages`. Les formations sont pour l'instant dans un fichier de données, pas dans une table administrable.",
  },
  {
    id: "section-6",
    title: "Ce qui reste à développer pour respecter tout le PDF",
    body: "1. Catalogue et paramètres modifiables en base : formations, prix, niveaux, fichiers privés, vidéos, ordre, brouillons et publication.\n2. Paiements manuels complets : coordonnées marchand/QR, preuves privées, ID de transaction unique, validation/refus/remboursement journalisés, droits d'accès payants, mises à niveau au tarif différentiel.\n3. Administration complète : statistiques de vente, utilisateurs, exports CSV, coupons, témoignages, avis et paramètres.\n4. Quiz, certificats PDF et page de vérification publique ; supports PDF réels (actuellement fichiers TXT).\n5. SMTP, modèles modifiables, emails de bienvenue/confirmation, rappels et rapport hebdomadaire. Aucun email ni notification WhatsApp automatique n'est envoyé actuellement.\n6. Connexion par téléphone, récupération de mot de passe avec SMTP, suppression autonome du compte, validation serveur renforcée du numéro +237.\n7. Révision de sécurité production : origines de confiance fixes, protections d'entrée, limites anti-spam, en-têtes HTTPS/CSP, tests d'accès payants et de validation de transaction.\n8. SEO complet, sitemap, Open Graph, découpage du bundle et police locale pour réseau lent.\n9. Finaliser leçons payantes, identité légale et politique de conservation. Vérifier les droits d'usage de la photo ou la remplacer par une photo propriétaire.",
  },
  {
    id: "section-7",
    title: "Paiements automatiques futurs",
    body: "À implémenter après le flux manuel : interface fournisseur avec `createPayment`, `verifyPayment` et `refund`; fournisseurs Orange, MTN ou agrégateur. Stocker la transaction externe avec contrainte d'unicité. Vérifier la signature du webhook côté serveur, gérer l'idempotence et accorder l'accès dans une transaction atomique. Ne jamais accepter le statut payé envoyé par le navigateur. Aucun fournisseur automatique n'est encore intégré.",
  },
  {
    id: "section-8",
    title: "Emails, tâches et sauvegardes",
    body: "SMTP et tâches planifiées ne sont pas câblés : prévoir une file d'envoi, un worker idempotent, suivi des erreurs et journal d'exécution. Rappels J+3/J+7, rapport hebdomadaire, sauvegarde quotidienne. Configurer des sauvegardes chez le fournisseur de base et tester une restauration ; aucune sauvegarde automatique n'a été mise en place par cette livraison. Prévoir chiffrement et rétention adaptée aux données personnelles.",
  },
  {
    id: "section-9",
    title: "Mise en ligne",
    body: "1. Finaliser les fonctions de paiement et d'administration avant de vendre.\n2. Ajouter des contenus et supports pédagogiques complets.\n3. Configurer nom/numéro de support, identité légale, marchand Orange/MTN et SMTP.\n4. Définir l'URL HTTPS, valider les origines de connexion et réaliser l'audit sécurité.\n5. Tester sur Android avec réseau lent, ainsi que tout le circuit achat → validation → accès → remboursement.\n6. Publier et gérer le domaine via les options de publication de la plateforme Runable.\n7. Vérifier les sauvegardes et surveiller les erreurs avant d'inviter les premiers clients.",
  },
  {
    id: "section-10",
    title: "Vérifications effectuées",
    body: "Build TypeScript/Vite, lint ; navigateur desktop et mobile sans débordement horizontal ; bouton anglais, recherche catalogue, création de compte, lecture et progression persistante, refus d'accès anonyme. Les tests de paiement du PDF ne sont pas encore possibles car le module n'est pas implémenté.",
  },
];
