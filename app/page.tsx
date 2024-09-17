"use client";

import { title, subtitle } from "@/components/primitives";
import UploadExcelPage from "./upload/page";

export default function Home() {

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Transformez vos&nbsp;</h1>
        <h1 className={title({ color: "green" })}>données en insights&nbsp;</h1>
        <br />
        <h1 className={title()}>
          puissants avec notre outil d'analyse.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Analysez facilement vos fichiers Excel et obtenez des recommandations détaillées.
        </h2>
      </div>

      <UploadExcelPage />

    </section>
  );
}
