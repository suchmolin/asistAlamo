import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import appFirebase from "./firebase/firebase.config";
import { VscError } from "react-icons/vsc";
import { formatDateAmPmHora } from "./formatDateAmPm";

export default function Regsitro() {
  const initial = {
    desde: "",
    hasta: "",
    cargo: "",
  };
  const [handleInputs, setHandleInputs] = useState(initial);
  const [consultaLista, setConsultaLista] = useState([]);
  const [emptyValues, setEmptyValues] = useState(false);
  const db = getFirestore(appFirebase);

  const consultarLista = async () => {
    setEmptyValues(false);
    for (const key in handleInputs) {
      if (handleInputs[key].trim() === "") {
        setEmptyValues(true);
        return;
      }
    }

    const q = query(
      collection(db, "asistRegistro"),
      where("fechaCreado", ">=", new Date(handleInputs.desde + " 00:00")),
      where("fechaCreado", "<=", new Date(handleInputs.hasta + " 23:59")),
      where("cargo", "==", handleInputs.cargo),
      orderBy("fechaCreado")
    );
    const querySnapshot = await getDocs(q);
    const array = [];
    querySnapshot.forEach((doc) => {
      array.push({
        id: doc.id,
        idPersonal: doc.data().idPersonal,
        cedula: doc.data().cedula,
        nombre: doc.data().nombre,
        fechaEntrada: doc.data().fechaEntrada.toDate(),
        fechaEntrada2: doc.data().fechaEntrada2?.toDate(),
        fechaSalida: doc.data().fechaSalida?.toDate(),
        fechaSalida2: doc.data().fechaSalida2?.toDate(),
        fechaCreado: doc.data().fechaCreado,
      });
    });
    setConsultaLista(array);
  };

  return (
    <>
      <div className="flex gap-5 justify-center">
        <div className="flex flex-col py-1">
          <label htmlFor="desde">Desde</label>
          <input
            value={handleInputs.desde}
            onChange={(e) => {
              setHandleInputs((prevState) => ({
                ...prevState,
                desde: e.target.value,
              }));
            }}
            name="desde"
            type="date"
            className="ring-1 rounded-sm w-40"
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="hasta">Hasta</label>
          <input
            value={handleInputs.hasta}
            onChange={(e) => {
              setHandleInputs((prevState) => ({
                ...prevState,
                hasta: e.target.value,
              }));
            }}
            name="hasta"
            type="date"
            className="ring-1 rounded-sm w-40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="cargo">Cargo</label>
          <select
            name="cargo"
            id="cargo"
            className="ring-1 rounded-sm w-56 py-1"
            defaultValue={handleInputs.cargo}
            onChange={(e) => {
              setHandleInputs((prevState) => ({
                ...prevState,
                cargo: e.target.value,
              }));
            }}
          >
            <option value="">Selecciona un Cargo</option>
            <option value="docente">Docente</option>
            <option value="administrativo">Administrativo</option>
          </select>
        </div>
      </div>
      {emptyValues && (
        <p className="w-full text-red-500 flex gap-2 text-center justify-center">
          <span className="text-xl px-1">
            <VscError />
          </span>
          Todos los campos son requeridos
        </p>
      )}
      <div className="w-full flex justify-center py-2">
        <button
          onClick={consultarLista}
          className="bg-[#03a7bb] px-3 py-1 rounded-sm hover:bg-[#047280] text-white"
        >
          {" "}
          Buscar{" "}
        </button>
      </div>
      {consultaLista.length === 0 ? (
        <>
          <h3 className="text-2xl">Sin Registros</h3>
          <p className="text-sm text-[#03a7bb]">
            Selecione un rango de fechas, un cargo y presione <b>Buscar</b>...
          </p>
        </>
      ) : (
        <table className="table-auto w-full text-sm width100">
          <thead>
            <tr className="border-black border-2">
              <th>Fecha</th>
              <th>C.I.</th>
              <th>Nombre</th>
              <th>Entrada</th>
              <th>Salida</th>
            </tr>
          </thead>
          <tbody>
            {consultaLista.map((item) => {
              const date = item.fechaCreado.toDate();
              const dia =
                date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
              const mes =
                date.getMonth() + 1 < 10
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1;
              const anio = date.getFullYear();
              const fecha = `${dia}/${mes}/${anio}`;

              return (
                <>
                  <tr key={item.id} className="border-y-2 text-center">
                    <td>{fecha}</td>
                    <td>{item.cedula}</td>
                    <td>{item.nombre}</td>
                    <td>{formatDateAmPmHora(item.fechaEntrada)}</td>
                    <td>
                      {item.fechaSalida
                        ? formatDateAmPmHora(item.fechaSalida)
                        : ""}
                    </td>
                  </tr>
                  {item.fechaEntrada2 && (
                    <tr key={`${item.id}B`} className="border-y-2 text-center">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{formatDateAmPmHora(item.fechaEntrada2)}</td>
                      <td>
                        {item.fechaSalida2
                          ? formatDateAmPmHora(item.fechaSalida2)
                          : ""}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
