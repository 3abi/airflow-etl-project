===============================
DOCUMENTATION TECHNIQUE - CODE API MARKETSTACK & YAHOO FINANCE
===============================

1. ENDPOINTS API UTILISÉS - MARKETSTACK
----------------------------------------

[ID] eod_latest
[Endpoint] /eod/latest
[Description]
  Récupère les données de clôture les plus récentes (latest close) pour un symbole donné.
  Inclut : open, close, high, low, volume, date.

[ID] eod_history
[Endpoint] /eod
[Description]
  Récupère l’historique complet des prix quotidiens (EOD = End Of Day) sur plusieurs années.
  Utilisé pour tracer un graphique d’évolution du prix sur 5 ans.

[ID] ticker
[Endpoint] /tickers/{symbol}
[Description]
  Retourne des métadonnées sur le titre :
  - Nom de l’entreprise
  - Symbole
  - Marché boursier (exchange)
  - Devise

[ID] exchanges
[Endpoint] /exchanges
[Description]
  Liste complète des marchés boursiers disponibles dans Marketstack.
  Exemple : NASDAQ, NYSE, EURONEXT, etc.

[ID] intraday
[Endpoint] /intraday
[Description]
  Récupère les données minute par minute d’un titre (interval=1min, limit=50).
  Affiché sous forme de graphique interactif.
  **Accessible uniquement avec un plan PRO.**

[ID] dividends
[Endpoint] /dividends
[Description]
  Retourne l’historique des dividendes pour un titre donné (montant, date, etc.).
  **Disponible avec plan payant avancé.**

[ID] splits
[Endpoint] /splits
[Description]
  Donne les informations sur les fractionnements d’actions (splits).
  Exemple : split 2 pour 1 → chaque action devient 2, à moitié du prix.

--------------------------------------------------

2. MODULES YAHOO FINANCE UTILISÉS
----------------------------------

L’API de Yahoo est appelée via :
  https://yfapi.net/v11/finance/quoteSummary/{symbol}?modules=...

Liste des modules appelés :

- price :
    Dernier prix, capitalisation boursière, volume

- summaryDetail :
    PER, dividende, beta, rendement

- financialData :
    Chiffre d'affaires, bénéfice net, cashflow

- defaultKeyStatistics :
    EPS, shares outstanding, market cap

- calendarEvents :
    Prochains résultats, dividendes à venir

- earnings :
    Résultats financiers trimestriels et annuels

- esgScores :
    Score ESG (Environnement, Social, Gouvernance)

- assetProfile :
    Description de l’entreprise, secteur, pays, employés

- recommendationTrend :
    Recommandations des analystes

- upgradeDowngradeHistory :
    Changements de notation des analystes

- insiderHolders :
    Infos sur les actionnaires internes

- insiderTransactions :
    Achats/ventes récents des dirigeants

- majorHoldersBreakdown :
    Répartition actionnariale

- incomeStatementHistory :
    Compte de résultat

- balanceSheetHistory :
    Bilan

- cashflowStatementHistory :
    Flux de trésorerie

- netSharePurchaseActivity :
    Achat net d’actions

- sectorTrend :
    Tendances sectorielles

- quoteType :
    Type de l’actif : Action, ETF, etc.

--------------------------------------------------

3. MÉCANISMES DU SCRIPT
------------------------

- Tous les endpoints sont appelés séquentiellement.
- Si une API échoue (ex: 403, 429), une section d’erreur est affichée.
- Les données sont présentées sous forme :
    - JSON brut (pour inspection technique)
    - Affichage lisible pour les données importantes (nom, symbole, exchange, etc.)
- Deux graphiques sont générés :
    - Graphique historique EOD (5 ans)
    - Graphique intraday (1min)

--------------------------------------------------

4. CONDITIONS D’UTILISATION / LIMITES
-------------------------------------

- L’API Marketstack limite certains endpoints aux plans payants ou PRO.
- L’API Yahoo nécessite une clé `x-api-key` valide.
- Certaines données peuvent ne pas être disponibles selon le symbole recherché.

--------------------------------------------------

FIN DU DOCUMENT
