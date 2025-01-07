const fechaFormateada= () => {
  const fecha = new Date();
  return fecha.toISOString(); // Devuelve la fecha en formato ISO
};
export default fechaFormateada;