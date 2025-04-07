// --- backend/server.js ---
const express = require("express");
const yahooFinance = require("yahoo-finance2").default;
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/stock/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  try {
    const modules = [
      "price",
      "summaryDetail",
      "defaultKeyStatistics",
      "financialData",
      "incomeStatementHistory",
      "cashflowStatementHistory",
      "balanceSheetHistory"
    ];

    const summary = await yahooFinance.quoteSummary(symbol, { modules });

    const historical = await yahooFinance.historical(symbol, {
      period1: new Date(new Date().setFullYear(new Date().getFullYear() - 5)),
      interval: "1mo"
    });

    const price = summary.price?.regularMarketPrice;
    const marketCap = summary.price?.marketCap;
    const currency = summary.price?.currency;
    const name = summary.price?.longName || summary.price?.shortName;
    const exchange = summary.price?.exchangeName;
    const eps = summary.defaultKeyStatistics?.trailingEps;
    const bookValue = summary.defaultKeyStatistics?.bookValue;
    const revenue = summary.financialData?.totalRevenue;
    const freeCashflow = summary.financialData?.freeCashflow;
    const sharesOutstanding = summary.defaultKeyStatistics?.sharesOutstanding;

    console.log("Shares Outstanding:", sharesOutstanding);

    const per = eps && eps !== 0 ? price / eps : null;
    const pbr = bookValue && bookValue !== 0 ? price / bookValue : null;
    const psr = revenue && revenue !== 0 ? marketCap / revenue : null;
    const pcf = freeCashflow && freeCashflow !== 0 ? marketCap / freeCashflow : null;

    const avgClose =
      historical.length > 0
        ? historical.reduce((acc, point) => acc + point.close, 0) / historical.length
        : null;

    const incomeHistory = summary.incomeStatementHistory?.incomeStatementHistory || [];
    const cashflowHistory = summary.cashflowStatementHistory?.cashflowStatements || [];
    const balanceSheetHistory = summary.balanceSheetHistory?.balanceSheetStatements || [];

    let historicalPER = [], historicalPBR = [], historicalPSR = [], historicalPCF = [];
    let estimationUsed = false;
    let debugTable = [];



    console.log("price:", price);
    console.log("currency:", currency);
    console.log("name:", name);
    console.log("exchange:", exchange);
    console.log("eps:", eps);
    console.log("bookValue:", bookValue);
    console.log("revenue:", revenue);
    console.log("freeCashflow:", freeCashflow);
    console.log("Shares Outstanding:", sharesOutstanding);
	
	
    console.log("incomeHistory:", incomeHistory);
    console.log("cashflowHistory:", cashflowHistory);
    console.log("balanceSheetHistory:", balanceSheetHistory);





    for (let i = 0; i < Math.min(5, incomeHistory.length, cashflowHistory.length, balanceSheetHistory.length); i++) {
      const year = new Date(incomeHistory[i]?.endDate?.raw * 1000).getFullYear();
      const netIncome = incomeHistory[i]?.netIncome?.raw;
      const totalEquity = balanceSheetHistory[i]?.totalStockholderEquity?.raw;
      const revenueY = incomeHistory[i]?.totalRevenue?.raw;
      const opCashFlow = cashflowHistory[i]?.totalCashFromOperatingActivities?.raw;
      const capex = cashflowHistory[i]?.capitalExpenditures?.raw;


      console.log("year:", year);
      console.log("netIncome:", netIncome);
      console.log("totalEquity:", totalEquity);
      console.log("revenueY:", revenueY);
      console.log("opCashFlows:", opCashFlow);
      console.log("capex:", capex);


      const fallbackShares = sharesOutstanding || 1;
      if (!sharesOutstanding) estimationUsed = true;

      const epsY = netIncome ? netIncome / fallbackShares : null;
      const bvY = totalEquity ? totalEquity / fallbackShares : null;
      const fcfY = opCashFlow != null && capex != null ? opCashFlow - capex : null;

      debugTable.push({
        year,
        netIncome,
        totalEquity,
        revenueY,
        opCashFlow,
        capex,
        epsY,
        bvY,
        fcfY
      });

      if (price && epsY > 0) historicalPER.push({ year, value: price / epsY });
      if (price && bvY > 0) historicalPBR.push({ year, value: price / bvY });
      if (marketCap && revenueY > 0) historicalPSR.push({ year, value: marketCap / revenueY });
      if (marketCap && fcfY > 0) historicalPCF.push({ year, value: marketCap / fcfY });
    }

    console.table(debugTable);

    const avg = arr => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : null;

    const historicalRatios = {
      PER: avg(historicalPER.map(r => r.value)),
      PBR: avg(historicalPBR.map(r => r.value)),
      PSR: avg(historicalPSR.map(r => r.value)),
      PCF: avg(historicalPCF.map(r => r.value))
    };

    const fairValues = {
      PER: eps && historicalRatios.PER ? eps * historicalRatios.PER : null,
      PBR: bookValue && historicalRatios.PBR ? bookValue * historicalRatios.PBR : null,
      PSR: revenue && historicalRatios.PSR && marketCap ? (revenue / marketCap) * historicalRatios.PSR * price : null,
      PCF: freeCashflow && historicalRatios.PCF && marketCap ? (freeCashflow / marketCap) * historicalRatios.PCF * price : null
    };

    const fairValueList = Object.values(fairValues).filter(v => typeof v === "number" && !isNaN(v));
    const avgFairValue = fairValueList.length > 0 ? fairValueList.reduce((acc, val) => acc + val, 0) / fairValueList.length : null;
    const potential = avgFairValue && price ? (((avgFairValue - price) / price) * 100).toFixed(2) : null;

    res.json({
      symbol,
      name,
      exchange,
      price,
      marketCap,
      currency,
      estimationUsed,
      historical,
      ratios: {
        PER: { current: per?.toFixed(2), avg5y: historicalRatios.PER?.toFixed(2), fairPrice: fairValues.PER?.toFixed(2), history: historicalPER },
        PBR: { current: pbr?.toFixed(2), avg5y: historicalRatios.PBR?.toFixed(2), fairPrice: fairValues.PBR?.toFixed(2), history: historicalPBR },
        PSR: { current: psr?.toFixed(2), avg5y: historicalRatios.PSR?.toFixed(2), fairPrice: fairValues.PSR?.toFixed(2), history: historicalPSR },
        PCF: { current: pcf?.toFixed(2), avg5y: historicalRatios.PCF?.toFixed(2), fairPrice: fairValues.PCF?.toFixed(2), history: historicalPCF }
      },
      averageClose: avgClose?.toFixed(2),
      fairValue: avgFairValue?.toFixed(2),
      potential: potential ? `${potential}%` : "N/A"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Données introuvables pour ce symbole." });
  }
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
