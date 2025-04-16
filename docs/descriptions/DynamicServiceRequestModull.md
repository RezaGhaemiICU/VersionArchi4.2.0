# 🧩 Dynamic Service Request Modul

Dieses Modul ermöglicht es, zusätzliche Services **dynamisch** und **benutzerfreundlich** anzufordern – abhängig von **vertraglichen Vereinbarungen**, **Budgets** und **individueller Genehmigung**.

---

##  Funktionsübersicht

1. **Serviceauswahl durch den Benutzer**  
   Der *Assignee* sieht eine Auswahl von verfügbaren Zusatzservices (z. B. „Settling In“, „Application A1“).  
   Diese werden dynamisch generiert – basierend auf Vertrag, Region und Berechtigungen.

2. **Systemprüfung (vertraglich oder individuell)**  
   - Ist der Service im Vertrag enthalten → **sofortige Aktivierung**  
   - Individueller Wunsch → Prüfung, ob eine Genehmigung durch HR oder Budgetfreigabe nötig ist

3. **Budget-Check**  
   Für nicht-vertragliche Services prüft das System automatisch, ob das zugewiesene **Case-Budget** ausreicht.

4. **Genehmigungslogik**  
   - **Budget vorhanden** → automatische Anfrage an HR-Manager zur Freigabe  
   - **Kein Budget** → Assignee kann optional den Service **selbst bezahlen**

5. **Zahlung via Payment-Integration**  
   Bei individueller Buchung ohne Genehmigung/Budget wird der Nutzer zu einem externen **Zahlungsmodul** weitergeleitet.

6. **Serviceaktivierung**  
   Nach Genehmigung oder Zahlung wird der Service automatisch dem Case **zugeordnet und aktiviert**.

---

##  Technische Aspekte

- **Dynamische Service-Liste**  
  Basierend auf Konfiguration, Nutzertyp und Case-Kontext

- **Zentrale Regelprüfung**  
  Interner Logikdienst prüft:  
  → Vertraglich abgedeckt?  
  → Budgetprüfung notwendig?  
  → Genehmigung oder Self-Payment?

- **Mehrstufige Entscheidungskette**  
  Automatisches Routing je nach Fallkonstellation (inkl. Retry & Fallback)

- **Zahlungsmodul (optional)**  
  Integrierbar über API für Self-Payment und Transaktionsverfolgung

- **Audit-Funktion**  
  Jeder Schritt (Auswahl, Prüfung, Zahlung, Aktivierung) wird **vollständig protokolliert**

---

> Dieses Modul bringt maximale Flexibilität und Transparenz für individuelle Servicebuchungen – automatisiert, nachvollziehbar und mandantenspezifisch.
