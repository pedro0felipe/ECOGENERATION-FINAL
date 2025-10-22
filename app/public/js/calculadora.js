// lógica simples de cálculo da EcoCalculadora (mobile-first)
(function () {
  const $ = sel => document.querySelector(sel);

  const numLamps = $('#numLamps');
  const wattLamp = $('#wattLamp');
  const hoursPerDay = $('#hoursPerDay');
  const priceKwh = $('#priceKwh');
  const solarPercent = $('#solarPercent');
  const btnCalc = $('#btnCalculate');
  const btnReset = $('#btnReset');

  const resSection = $('#results');
  const resKwh = $('#res-kwh');
  const resCost = $('#res-cost');
  const resLed = $('#res-led-saving');
  const resSolar = $('#res-solar-offset');

  function formatBRL(v) {
    return Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calc() {
    const n = Math.max(0, Number(numLamps.value) || 0);
    const w = Math.max(0, Number(wattLamp.value) || 0);
    const h = Math.max(0, Number(hoursPerDay.value) || 0);
    const price = Math.max(0, Number(priceKwh.value) || 0);
    const solar = Math.min(100, Math.max(0, Number(solarPercent.value) || 0));

    // consumo diário em kWh = (n * w * h) / 1000
    const dailyKwh = (n * w * h) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const monthlyCost = monthlyKwh * price;

    // estimativa de economia trocando para LED (supondo LED 9W vs lâmpada antiga 60W)
    // se usuário já colocou potência média real, assumimos "antiga" = 60W para comparar
    const assumedOldW = 60;
    const oldDailyKwh = (n * assumedOldW * h) / 1000;
    const oldMonthlyCost = oldDailyKwh * price;
    const ledSaving = Math.max(0, oldMonthlyCost - monthlyCost);

    // solar offset em custo
    const solarOffset = (monthlyCost * (solar / 100));

    // preencher resultados
    resKwh.textContent = formatBRL(monthlyKwh);
    resCost.textContent = formatBRL(monthlyCost);
    resLed.textContent = formatBRL(ledSaving);
    resSolar.textContent = formatBRL(solarOffset);

    resSection.hidden = false;
    // rolar para resultados em telas pequenas
    resSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  btnCalc.addEventListener('click', calc);
  btnReset.addEventListener('click', () => {
    // esconde resultados ao limpar
    setTimeout(() => { resSection.hidden = true; }, 50);
  });

  // Enter em qualquer campo calcula
  document.querySelectorAll('.calc-form input').forEach(i => {
    i.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        calc();
      }
    });
  });
})();