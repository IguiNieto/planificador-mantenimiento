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
      </Head>
      <PlanificadorMantenimiento />
    </>
  );
}
