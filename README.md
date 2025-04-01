
# 📊 Exploration des APIs Yahoo Finance & Marketstack

Ce projet permet de récupérer un maximum de données financières sur une action boursière en combinant les APIs **Yahoo Finance** et **Marketstack**, avec affichage lisible et graphique.

---

## 🔷 Yahoo Finance API – Modules disponibles

### ✅ Modules actuellement utilisés

| Module               | Description |
|----------------------|-------------|
| `price`              | Données de marché en temps réel : prix, devise, market cap, exchange |
| `summaryDetail`      | Détails comme : PER, dividendes, rendement, PSR, volatilité |
| `financialData`      | Fondamentaux : revenus, marges, cash par action, endettement |
| `defaultKeyStatistics` | Statistiques clés : PER, PCF, PBR, bêta, actions en circulation |
| `calendarEvents`     | Prochaines dates de publication de résultats |
| `earnings`           | Historique et prévisions de revenus et bénéfices |
| `esgScores`          | Score ESG (Environnement, Social, Gouvernance) |

---

### 🔄 Modules supplémentaires disponibles

| Module                    | Description |
|---------------------------|-------------|
| `assetProfile`            | Secteur, industrie, description, employés, dirigeants |
| `recommendationTrend`     | Recommandations d’analystes (achat, neutre, vente) |
| `upgradeDowngradeHistory` | Historique des recommandations (agences, dates, actions) |
| `insiderHolders`          | Actionnaires internes (dirigeants, membres du board) |
| `insiderTransactions`     | Transactions récentes d’insiders |
| `majorHoldersBreakdown`   | Répartition : institutionnels, fonds, particuliers |
| `incomeStatementHistory`  | Compte de résultat : chiffre d'affaires, bénéfices |
| `balanceSheetHistory`     | Bilan : actifs, passifs, capitaux propres |
| `cashflowStatementHistory`| Flux de trésorerie opérationnel/investissement/financement |
| `netSharePurchaseActivity`| Historique des rachats ou émissions d’actions |
| `sectorTrend`             | Tendances par secteur (peut être vide selon les cas) |
| `quoteType`               | Type d’actif (action, ETF, crypto, etc.) |

> 📌 **Exemple d’appel complet :**


---

## 🟨 Marketstack API – Endpoints disponibles

### ✅ Endpoints utilisés

| Endpoint            | Description |
|---------------------|-------------|
| `/v1/eod/latest`    | Dernier cours de clôture (EOD = End Of Day) |
| `/v1/eod`           | Historique des cours (limite max : 5 ans env.) |

---

### 🔄 Autres endpoints disponibles

| Endpoint                    | Description |
|-----------------------------|-------------|
| `/v1/tickers`               | Liste complète des tickers et leurs métadonnées |
| `/v1/exchanges`             | Marchés supportés (NASDAQ, NYSE, Euronext…) |
| `/v1/intraday` *(PRO)*      | Données intraday minute par minute |
| `/v1/dividends` *(PRO)*     | Historique des dividendes (date, montant) |
| `/v1/splits` *(PRO)*        | Historique des splits d’actions |
| `/v1/tickers/{symbol}` *(PRO)* | Métadonnées d’un ticker donné |

---

### ✅ Exemple de réponse `/eod/latest`

```json
{
  "symbol": "AAPL",
  "exchange": "XNAS",
  "date": "2025-03-28T00:00:00+0000",
  "open": 175.00,
  "high": 178.00,
  "low": 173.50,
  "close": 176.25,
  "volume": 78945600
}


## 🔚 Comparatif global des APIs

| Source         | Type        | Données financières | Ratios | Profil entreprise | Recos analystes | ESG  | Intraday       | Historique |
|----------------|-------------|----------------------|--------|-------------------|------------------|------|----------------|------------|
| **Yahoo Finance**  | Modules     | ✅ Oui               | ✅ Oui | ✅ Oui            | ✅ Oui           | ✅   | ❌             | ✅          |
| **Marketstack**    | Endpoints   | ❌                   | ❌     | ❌                | ❌               | ❌   | ✅ *(PRO uniquement)* | ✅          |


