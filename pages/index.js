import dynamic from "next/dynamic";
import Head from "next/head";

// El componente usa window/document, fechas en vivo y ResizeObserver,
// así que se carga únicamente en el navegador (sin SSR) para evitar
// problemas de hidratación.
const PlanificadorMantenimiento = dynamic(
  () => import("../components/PlanificadorMantenimiento"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Planificador de Mantenimiento</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <PlanificadorMantenimiento />
    </>
  );
}
