# ExcelGuru-AI

**ExcelGuru-AI** est une application innovante de visualisation et d'analyse de données Excel. Utilisant Next.js 14 et NextUI, cette application vous permet de télécharger des fichiers Excel, d'analyser les données, de créer des graphiques modernes, et d'obtenir des recommandations basées sur les données fournies.

[Essayez-le sur Vercel](https://excel-guru-ai-daaq.vercel.app)

## Technologies Utilisées

- [Next.js 14](https://nextjs.org/docs/getting-started) – Framework pour React avec des fonctionnalités de rendu côté serveur et de génération de site statique.
- [NextUI v2](https://nextui.org/) – Bibliothèque de composants UI moderne et élégante pour React.
- [Tailwind CSS](https://tailwindcss.com/) – Framework CSS utilitaire pour un design rapide et réactif.
- [Tailwind Variants](https://tailwind-variants.org) – Gestion des variantes pour Tailwind CSS.
- [TypeScript](https://www.typescriptlang.org/) – Langage de programmation qui améliore JavaScript avec des types statiques.
- [Framer Motion](https://www.framer.com/motion/) – Librairie d'animations pour React.
- [next-themes](https://github.com/pacocoursey/next-themes) – Gestion des thèmes pour Next.js.

## Comment Utiliser

### Utiliser le modèle avec create-next-app

Pour créer un nouveau projet basé sur ce modèle avec `create-next-app`, exécutez la commande suivante :

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```
```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
