// Script para contador de quantidade na página lampada
document.addEventListener('DOMContentLoaded', function() {
  const minus = document.getElementById('btn-minus');
  const plus = document.getElementById('btn-plus');
  const qty = document.getElementById('quantidade');
  const comprar = document.getElementById('btn-comprar');

  function sanitize() {
    let v = parseInt(qty.value, 10);
    if (isNaN(v) || v < 1) v = 1;
    if (v > 99) v = 99;
    qty.value = v;
  }

  minus.addEventListener('click', () => {
    sanitize();
    let v = parseInt(qty.value, 10);
    if (v > 1) qty.value = v - 1;
  });

  plus.addEventListener('click', () => {
    sanitize();
    let v = parseInt(qty.value, 10);
    if (v < 99) qty.value = v + 1;
  });

  qty.addEventListener('input', sanitize);

  // Exemplo mínimo: quando clicar em comprar, o valor da quantidade está disponível em qty.value.
  comprar.addEventListener('click', () => {
    // Substitua por integração com carrinho/checkout conforme neces
    console.log('Quantidade selecionada:', qty.value);
  });
});