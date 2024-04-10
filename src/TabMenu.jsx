export default function TabMenu(props) {
  const { setViewState } = props;

  const changeView = (view) => {
    setViewState(view);
    const lis = document.querySelectorAll("li");
    lis.forEach((li) => {
      li.classList.remove("bg-white");
      li.classList.add("bg-neutral-400");
    });
    document.getElementById(view).classList.remove("bg-neutral-400");
    document.getElementById(view).classList.add("bg-white");
  };
  return (
    <div className="w-full bg-neutral-700 flex justify-center hidden-print">
      <ul className="w-10/12 flex gap-8 pt-10 px-5 ">
        <li
          id="ingreso"
          onClick={() => changeView("ingreso")}
          className="cursor-pointer bg-white px-7 h-10 text-center items-center flex text-xl rounded-t-md"
        >
          Ingreso
        </li>
        <li
          id="agregar"
          onClick={() => changeView("agregar")}
          className="cursor-pointer bg-neutral-400 px-7 h-10 text-center items-center flex text-xl rounded-t-md"
        >
          Agregar
        </li>
        <li
          id="registro"
          onClick={() => changeView("registro")}
          className="cursor-pointer bg-neutral-400 px-7 h-10 text-center items-center flex text-xl rounded-t-md"
        >
          Regsitro
        </li>
      </ul>
    </div>
  );
}
