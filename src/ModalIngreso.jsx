import { GrStatusGood } from "react-icons/gr";
import { formatDateAmPm } from "./formatDateAmPm";
export default function ModalErrorIngreso(props) {
  const { handleInput, dataIngreso } = props;
  const { date } = dataIngreso;
  const fecha = formatDateAmPm(date);
  return (
    <div className="absolute w-full h-full flex justify-center items-center bg-[rgb(0,0,0,0.5)]">
      <div className="h-5/6 w-8/12 rounded-lg bg-[rgb(255,255,255,0.95)] py-7 flex justify-center items-center flex-col">
        <span className="text-9xl text-green-600 flex justify-center">
          <GrStatusGood />
        </span>
        <h3 className="w-full text-center text-3xl py-3">
          Bienvenido {dataIngreso.nombre}
        </h3>
        <p className="text-xl text-blue-500">
          Fecha de ingreso: <span className="text-black">{fecha}</span>
        </p>
      </div>
    </div>
  );
}
