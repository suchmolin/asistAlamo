import { VscError } from "react-icons/vsc";
export default function ModalErrorIngreso(props) {
  const { handleInput, dataIngreso } = props;
  return (
    <div className="absolute w-full h-full flex justify-center items-center bg-[rgb(0,0,0,0.5)]">
      <div className="h-5/6 w-8/12 rounded-lg bg-[rgb(255,255,255,0.95)] py-7 flex justify-center items-center flex-col">
        <span className="text-9xl text-red-500 flex justify-center">
          <VscError />
        </span>
        <h3 className="w-full text-center text-3xl py-3">{dataIngreso.msg}</h3>
        <p className="text-xl text-red-500">{handleInput}</p>
      </div>
    </div>
  );
}
