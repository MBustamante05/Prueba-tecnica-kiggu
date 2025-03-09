function orderObj(arr) {
  const impar = [];
  const par = [];

  arr.forEach((item) => {
    if (item.prioridad % 2 == 0) {
      par.push(item);
    } else {
      impar.push(item);
    }
  });

  return [...impar, ...par];
}
console.log(
  orderObj([
    { id: 1, prioridad: 5 },
    { id: 2, prioridad: 2 },
    { id: 3, prioridad: 4 },
    { id: 4, prioridad: 3 },
    { id: 5, prioridad: 1 },
  ])
);
