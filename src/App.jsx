import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Ingreso from "./Ingreso";
import TabMenu from "./TabMenu";
import Agregar from "./Agregar";
import Regsitro from "./Regsitro";

function App() {
  const [viewState, setViewState] = useState("ingreso");
  return (
    <main className="flex w-full items-center flex-col h-screen">
      <Navbar />

      <TabMenu setViewState={setViewState} />
      <div className="w-full pb-10 h-full bg-neutral-700 flex justify-center">
        <section className="w-10/12 h-full bg-white rounded-md p-3 md:p-10 relative">
          {viewState === "ingreso" && <Ingreso />}
          {viewState === "agregar" && <Agregar />}
          {viewState === "registro" && <Regsitro />}
        </section>
      </div>
    </main>
  );
}

export default App;
