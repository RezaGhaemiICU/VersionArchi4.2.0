# Kombiniertes Beispiel – Dynamische Use-Cases im Ablauf

Dieses Diagramm zeigt drei zentrale Abläufe innerhalb unseres Systems in einer einzigen konsolidierten Darstellung. Jeder Bereich ist farblich markiert für bessere Lesbarkeit und thematisch unterteilt.

```mermaid
---
config:
  theme: default
  layout: TD
---

sequenceDiagram
  %% Auftrag löschen
  participant UI
  participant Gateway
  participant ExecutionService
  participant AuftragService
  participant DocumentService
  participant DLQ

  Note over UI,ExecutionService: Auftrag löschen 
  UI->>Gateway: DELETE Auftrag
  Gateway->>ExecutionService: deleteAuftrag(ID)
  ExecutionService->>AuftragService: prüfe + lösche Auftrag
  AuftragService-->>ExecutionService: OK / Fehler
  ExecutionService->>DocumentService: lösche zugehörige Doks
  DocumentService-->>ExecutionService: OK / Fehler
  alt Fehlerfall
    ExecutionService->>DLQ: Dispatch to DLQ
  end
  ExecutionService-->>UI: Antwort OK/Fehler

  %% Fehlende Dokumente
  Note over UI,DokumentService: Fehlende Dokumente abrufen 
  UI->>Gateway: GET fehlende Dokumente
  Gateway->>ExecutionService: fetchMissingDocs(ID)
  ExecutionService->>AuftragService: Auftragsdetails
  AuftragService-->>ExecutionService: Metadaten
  ExecutionService->>DocumentService: prüfe fehlende Doks
  DocumentService-->>ExecutionService: Liste
  ExecutionService-->>UI: Rückgabe Liste

  %% Unassigned Fälle
  Note over UI,ExecutionService: Nicht zugewiesene Fälle 
  UI->>Gateway: GET unassigned Fälle
  Gateway->>ExecutionService: loadUnassigned()
  ExecutionService->>AuftragService: WHERE assigned = false
  AuftragService-->>ExecutionService: Liste
  ExecutionService->>DocumentService: fehlende Doks je Fall
  DocumentService-->>ExecutionService: Result
  ExecutionService-->>UI: Komplette Übersicht