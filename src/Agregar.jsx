import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  or,
  query,
  where,
} from "firebase/firestore";
import { GrStatusGood } from "react-icons/gr";
import { VscError } from "react-icons/vsc";
import { useState } from "react";
import appFirebase from "./firebase/firebase.config";

export default function Agregar() {
  const initial = {
    cedula: "",
    nombre: "",
    cargo: "",
    idPersonal: "",
  };
  const [handleInputs, setHandleInputs] = useState(initial);
  const [emptyValues, setEmptyValues] = useState(false);
  const [errorDupe, setErrorDupe] = useState(false);
  const [success, setSuccess] = useState(false);
  const db = getFirestore(appFirebase);

  const handleForm = async (e) => {
    e.preventDefault();
    setEmptyValues(false);
    setErrorDupe(false);
    setSuccess(false);
    for (const key in handleInputs) {
      if (handleInputs[key].trim() === "") {
        setEmptyValues(true);
        return;
      }
    }

    const q = query(
      collection(db, "personal"),
      or(
        where("idPersonal", "==", handleInputs.idPersonal.trim()),
        where("cedula", "==", handleInputs.cedula.trim())
      )
    );
    const querySnapshot = await getDocs(q);
    const array = [];
    querySnapshot.forEach((doc) => {
      array.push({ id: doc.id, idPersonal: doc.data().idPersonal });
    });
    if (array.length > 0) {
      setErrorDupe(true);
      return;
    }

    await addDoc(collection(db, "personal"), {
      idPersonal: handleInputs.idPersonal.trim(),
      cargo: handleInputs.cargo.trim(),
      cedula: handleInputs.cedula.trim(),
      nombre: handleInputs.nombre.trim(),
      fechaCreado: new Date(),
    });

    document.querySelector("select").value = "";
    setHandleInputs(initial);
    setSuccess(true);
  };
  return (
    <div className="w-full h-full flex items-center flex-col">
      <h2 className="w-full ml-12 text-3xl mb-10">Agregar Personal</h2>
      <form
        action="#"
        onSubmit={(e) => handleForm(e)}
        className="pb-10 w-full px-8"
      >
        <div className="flex flex-col py-3">
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
        <div className="flex flex-col py-1">
          <label htmlFor="idPersonal">Identificador</label>
          <input
            value={handleInputs.idPersonal}
            onChange={(e) => {
              setHandleInputs((prevState) => ({
                ...prevState,
                idPersonal: e.target.value,
              }));
            }}
            name="idPersonal"
            type="text"
            className="ring-1 rounded-sm w-56 px-3"
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="cedula">Cédula de Identidad</label>
          <input
            value={handleInputs.cedula}
            onChange={(e) => {
              setHandleInputs((prevState) => ({
                ...prevState,
                cedula: e.target.value,
              }));
            }}
            name="cedula"
            type="text"
            className="ring-1 rounded-sm w-56 px-3"
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="nombre">Nombre y Apellido</label>
          <input
            value={handleInputs.nombre}
            onChange={(e) => {
              setHandleInputs((prevState) => ({
                ...prevState,
                nombre: e.target.value,
              }));
            }}
            name="nombre"
            type="text"
            className="ring-1 rounded-sm w-56 px-3"
          />
        </div>
        {emptyValues && (
          <p className="text-red-500">
            <span className="text-xl px-1">
              <VscError />
            </span>
            Todos los campos son requeridos
          </p>
        )}
        {errorDupe && (
          <p className="text-red-500 flex items-center py-1">
            <span className="text-xl px-1">
              <VscError />
            </span>
            Identificador o cedula de identidad, ya se encuentra registrado
          </p>
        )}
        {success && (
          <p className="text-green-500 flex items-center py-1">
            <span className="text-xl px-1">
              <GrStatusGood />
            </span>
            Personal agregado con Exito{" "}
          </p>
        )}
        <div className="mt-5">
          <button className="bg-[#03a7bb] px-3 py-1 rounded-sm hover:bg-[#047280] text-white">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
