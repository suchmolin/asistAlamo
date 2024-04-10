function formatDateAmPm(date) {
  const dia = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const mes =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const anio = date.getFullYear();
  let meridian = "";
  let hora;
  if (date.getHours() <= 12) {
    meridian = "am";
    hora = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  } else {
    meridian = "pm";
    hora =
      date.getHours() - 12 < 10
        ? "0" + (date.getHours() - 12)
        : date.getHours() - 12;
  }
  const min =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return `${dia}/${mes}/${anio} ${hora}:${min} ${meridian}`;
}

function formatDateAmPmHora(date) {
  let meridian = "";
  let hora;
  if (date.getHours() <= 12) {
    meridian = "am";
    hora = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  } else {
    meridian = "pm";
    hora =
      date.getHours() - 12 < 10
        ? "0" + (date.getHours() - 12)
        : date.getHours() - 12;
  }
  const min =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return `${hora}:${min} ${meridian}`;
}

export { formatDateAmPm, formatDateAmPmHora };
