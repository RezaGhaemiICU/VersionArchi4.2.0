
# AiCUnet Architektur – Gesamtübersicht

Willkommen zur Dokumentation der modularen, containerisierten Architektur AiCUnet.  
Diese Dokumentation ist in thematische Bereiche gegliedert:

---

##  Hauptdokumente (`/docs/`)

- [automation.md](./automation.md)  
- [datenbanken.md](./datenbanken.md)  
- [frontend.md](./frontend.md)  
- [gateway.md](./gateway.md)  
- [microservices.md](./microservices.md)  
- [monitoring.md](./monitoring.md)  
- [reporting.md](./reporting.md)  
- [saga.md](./saga.md)  
- [security.md](./security.md)  
- [execution-flow.md](./execution-flow.md)  
- [error-handling.md](./error-handling.md)  
- [use-cases.md](./use-cases.md)

---

##  Begriffe & FAQs

- [FAQ zur Zielarchitektur](./Fragen%20und%20Antworten/FAQ_Zur_Zielarchitektur.md)  
- [Glossar](./Fragen%20und%20Antworten/Glossary.md)

---

##  Architektur-Beschreibungen (`/docs/descriptions/`)

Hier findest du alle Layer-Beschreibungen, Services & technische Konzepte:

- [Access Role Policy Layer](./descriptions/AccessRolePolicyLayer.md)  
- [Automationlayer](./descriptions/Automationlayer.md)  
- [Businesslayer](./descriptions/Businesslayer.md)  
- [Domain Driven Overview](./descriptions/Domain-Driven%20Overview.md)  
- [Frontend Interaction Layer](./descriptions/FrontendInteractionLayer.md)  
- [Gateway Details](./descriptions/gatewaydetails.md)  
- [Lightweight Architecture](./descriptions/LightweightArchitecture.md)  
- [Monitoring & Observability](./descriptions/Monitoring%20&%20Observability.md)  
- [Open API Layer / Public Integration](./descriptions/Open%20API%20Layer%20_%20Public%20Integration.md)  
- [Performance & Scalability (optional)](./descriptions/Performance%20&%20Scalability%20Layer-optional.md)  
- [Policy Layer](./descriptions/PolicyLayer.md)  
- [Preising Modul](./descriptions/PreisingModull.md)  
- [Prozesslandschaft Overview](./descriptions/ProzessLandschaftOverview.md)  
- [Request Flow Front → DB](./descriptions/RequestFlowFrontBisDB.md)  
- [Resilience & Consistency](./descriptions/Resilience%20&%20Consistency.md)  
- [Security Flow & Auth Layer](./descriptions/Security%20Flow%20&%20Auth%20Layer.md)  
- [Service Gateway Routing Layer](./descriptions/ServiceGatewayRoutingLayer.md)

---

##  Prozess-Flows (`/docs/flows/`)

Alle dokumentierten User-Flows:

- [Admin Audit Flow](./flows/admin-audit-flow.md)
- [Auftrag Löschung](./flows/AuftragLoeschung.md)
- [Beispielkombination](./flows/BeispielCombi.md)
- [Login & Rollenwechsel](./flows/Euser-login-flow.md)
- [Fehlende Dokumente](./flows/FehlendeDokumente.md)
- [MCP Ready](./flows/MCPReady.md)
- [Nicht zugewiesene Fälle](./flows/NichtzugewieseneBeispiel.md)
- [Rollen & Policies](./flows/RollenundPolicyBeispiel.md)
- [Service Request Saga Flow](./flows/ServiceRequestSagaFlow.md)
- [Report Generation Flow](./flows/report-generation-flow.md)
- [Role Switching Flow](./flows/role-switching-flow.md)
- [Vorteile – Herausforderungen – Lösungen](./flows/vorteile-herausforderungen-loesungen.md)

---

##  Diagramme (`/docs/diagrams/`)

Alle .mmd-Dateien zur visuellen Darstellung der Layer:

- [FrontendInteractionLayer.mmd](./diagrams/FrontendInteractionLayer.mmd)
- [Monitoring & Observability.mmd](./diagrams/Monitoring%20&%20Observability.mmd)
- ...

---

##  Beispiele & Tests (`/examples/`)

- [eventbus.ts](../examples/eventbus.ts)
- [basic-event-flow.test.ts](../examples/basic-event-flow.test.ts)
- [saga-runner.ts](../examples/saga-runner.ts)

---

 Letztes Update automatisch generiert.  
Weitere Infos im [README.md](./README.md)
