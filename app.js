async function loadStock() {
  const symbol = document.getElementById("symbol").value.trim().toUpperCase();
  const res = await fetch(`http://localhost:3000/api/stock/${symbol}`);
  const data = await res.json();
  const container = document.getElementById("result");

  if (data.error) {
    container.innerHTML = `<p>Erreur : ${data.error}</p>`;
    return;
  }

  container.innerHTML = `
    <h2>${data.name} (${data.symbol}) - ${data.exchange}</h2>
    <p><strong>Prix actuel :</strong> ${data.price} ${data.currency}</p>
    <p><strong>Capitalisation :</strong> ${formatNumber(data.marketCap)} ${data.currency}</p>
    <h3>Ratios</h3>
    <ul>
      <li><strong>PER :</strong> ${data.ratios.PER.current} (Moy 5y: ${data.ratios.PER.avg5y}) | Juste valeur: ${data.ratios.PER.fairPrice}</li>
      <li><strong>PBR :</strong> ${data.ratios.PBR.current} (Moy 5y: ${data.ratios.PBR.avg5y}) | Juste valeur: ${data.ratios.PBR.fairPrice}</li>
      <li><strong>PSR :</strong> ${data.ratios.PSR.current} (Moy 5y: ${data.ratios.PSR.avg5y}) | Juste valeur: ${data.ratios.PSR.fairPrice}</li>
      <li><strong>PCF :</strong> ${data.ratios.PCF.current} (Moy 5y: ${data.ratios.PCF.avg5y}) | Juste valeur: ${data.ratios.PCF.fairPrice}</li>
    </ul>
    <p><strong>Juste valeur moyenne :</strong> ${data.fairValue} ${data.currency}</p>
    <p><strong>Potentiel :</strong> ${data.potential}</p>
  `;

  const labels = data.historical.map(point => point.date.split("T")[0]);
  const prices = data.historical.map(point => point.close);
  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Cours de clôture (5 ans)",
        data: prices,
        fill: false,
        borderColor: "blue",
        tension: 0.1
      }]
    }
  });

  const pot = parseFloat(data.potential);
  if (!isNaN(pot)) drawGauge(pot);

  drawRatioCharts(data.ratios);
}

function formatNumber(num) {
  if (!num) return "N/A";
  return Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
}

function drawGauge(potential) {
  const gauge = document.getElementById("gauge");
  if (isNaN(potential)) return;
  const width = 300, height = 150;
  const centerX = width / 2, centerY = height;
  const radius = 100;
  const angle = (Math.min(Math.max(potential, -50), 50) + 50) * Math.PI / 100;

  gauge.innerHTML = `
    <svg width="${width}" height="${height + 20}">
      <path d="M0,${height} A${radius},${radius} 0 0,1 ${width},${height}" fill="#eee" stroke="#ccc" stroke-width="2" />
      <line x1="${centerX}" y1="${centerY}" x2="${centerX + radius * Math.cos(Math.PI - angle)}" y2="${centerY - radius * Math.sin(Math.PI - angle)}" stroke="red" stroke-width="3" />
      <text x="${centerX}" y="${height + 15}" text-anchor="middle">Potentiel : ${potential.toFixed(2)}%</text>
    </svg>
  `;
}

function drawRatioCharts(ratios) {
  const container = document.getElementById("ratios");
  container.innerHTML = "";
  Object.entries(ratios).forEach(([name, obj]) => {
    if (!obj.history || obj.history.length === 0) return;

    const canvas = document.createElement("canvas");
    canvas.id = `chart_${name}`;
    canvas.width = 400;
    canvas.height = 200;
    container.appendChild(document.createElement("h4")).innerText = `Historique ${name}`;
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const labels = obj.history.map(item => item.year);
    const values = obj.history.map(item => item.value.toFixed(2));

    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: name,
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.6)"
        }]
      }
    });
  });
}
