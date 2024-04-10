import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { useState } from "react";
import appFirebase from "./firebase/firebase.config";
import ModalErrorIngreso from "./ModalErrorIngreso";
import ModalIngreso from "./ModalIngreso";

export default function Ingreso() {
  const [handleInput, setHandleInput] = useState("");
  const [modalError, setModalError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [dataIngreso, setDataIngreso] = useState({ name: "", date: "" });
  const db = getFirestore(appFirebase);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const barCode = document.getElementById("barcode");
    barCode.disabled = true;

    const openSuccessModal = () => {
      setModalSuccess(true);
      setTimeout(() => {
        setModalSuccess(false);
        setHandleInput("");
        barCode.disabled = false;
        barCode.focus();
      }, 3000);
    };

    const q = query(
      collection(db, "personal"),

      where("idPersonal", "==", handleInput.trim())
    );
    const querySnapshot = await getDocs(q);
    const array = [];
    querySnapshot.forEach((doc) => {
      array.push({
        id: doc.id,
        idPersonal: doc.data().idPersonal,
        nombre: doc.data().nombre,
        cedula: doc.data().cedula,
        cargo: doc.data().cargo,
      });
    });

    if (array.length === 0) {
      setDataIngreso((prevState) => ({
        ...prevState,
        msg: "Identificador no Registrado",
      }));
      setModalError(true);
      setTimeout(() => {
        setModalError(false);
        setHandleInput("");
        barCode.disabled = false;
        barCode.focus();
      }, 3000);
    } else {
      const date = new Date();
      setDataIngreso({ ...array[0], date });
      const dia = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const mes =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const anio = date.getFullYear();
      const q = query(
        collection(db, "asistRegistro"),
        where("idPersonal", "==", array[0].idPersonal),
        where("fechaCreado", ">=", new Date(`${anio}-${mes}-${dia} 00:00`))
      );
      const querySnapshot = await getDocs(q);
      const array2 = [];
      querySnapshot.forEach((doc) => {
        array2.push({
          id: doc.id,
          idPersonal: doc.data().idPersonal,
          fechaEntrada: doc.data().fechaEntrada,
          fechaEntrada2: doc.data().fechaEntrada2,
          fechaSalida: doc.data().fechaSalida,
          fechaSalida2: doc.data().fechaSalida2,
        });
      });

      if (array2.length === 0) {
        await addDoc(collection(db, "asistRegistro"), {
          idPersonal: array[0].idPersonal,
          cargo: array[0].cargo,
          cedula: array[0].cedula,
          nombre: array[0].nombre,
          fechaEntrada: date,
          fechaCreado: date,
        });
        openSuccessModal();

        return;
      }

      if (array2[0].fechaSalida2) {
        setDataIngreso((prevState) => ({
          ...prevState,
          msg: "No se Admiten mas de 2 Turnos en el dia",
        }));
        setModalError(true);
        setTimeout(() => {
          setModalError(false);
          setHandleInput("");
          barCode.disabled = false;
          barCode.focus();
        }, 3000);
        return;
      }
      if (array2[0].fechaEntrada2) {
        updateDoc(doc(db, "asistRegistro", array2[0].id), {
          fechaSalida2: date,
        });
        openSuccessModal();

        return;
      }
      if (array2[0].fechaSalida) {
        updateDoc(doc(db, "asistRegistro", array2[0].id), {
          fechaEntrada2: date,
        });
        openSuccessModal();

        return;
      }
      if (array2[0].fechaEntrada) {
        updateDoc(doc(db, "asistRegistro", array2[0].id), {
          fechaSalida: date,
        });
        openSuccessModal();

        return;
      }
    }
  };
  return (
    <div className="w-full h-full flex items-center">
      <div className="w-full flex flex-col gap-5 justify-center items-center -mt-20">
        <h2 className="text-xl md:text-3xl">Ingresar Codigo de Barra</h2>
        <img src="./barcode.png" alt="" className="h-32" />
        <form onSubmit={(e) => handleSubmit(e)} action="#">
          <input
            id="barcode"
            type="text"
            value={handleInput}
            onChange={(e) => setHandleInput(e.target.value)}
            className="text-center w-44 md:w-96 ring-1 rounded-sm"
            autoFocus
          />
        </form>
        {modalError && (
          <ModalErrorIngreso
            handleInput={handleInput}
            dataIngreso={dataIngreso}
          />
        )}
        {modalSuccess && (
          <ModalIngreso handleInput={handleInput} dataIngreso={dataIngreso} />
        )}
      </div>
    </div>
  );
}
