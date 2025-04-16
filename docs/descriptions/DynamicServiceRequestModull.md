Dynamic Service Request Modul

Dieses Modul ermöglicht es, zusätzliche Services dynamisch und benutzerfreundlich anzufordern – abhängig von vertraglichen Vereinbarungen, Budgets und individueller Genehmigung.

Funktionsübersicht:
	1.	Serviceauswahl durch den Benutzer
Der Assignee sieht eine Auswahl von verfügbaren Zusatzservices (z. B. “Settling In”, “Application A1”). Diese werden über das System dynamisch generiert – basierend auf Verträgen, Region und Berechtigung.
	2.	Systemprüfung (vertraglich oder individuell)
	•	Wenn der Service bereits Teil des bestehenden Vertrages ist, wird er direkt zur Fallbearbeitung aktiviert.
	•	Wenn es sich um einen individuellen Zusatzwunsch handelt, wird geprüft, ob der Auftraggeber (z. B. HR-Abteilung) diesen genehmigen muss.
	3.	Budget-Check
Für Services außerhalb des vertraglichen Rahmens erfolgt ein automatischer Abgleich mit dem Budget, das dem Fall zugeordnet ist.
	4.	Genehmigungslogik
	•	Ist Budget vorhanden, wird automatisch eine Anfrage an den zuständigen HR-Manager gesendet.
	•	Ist kein Budget vorhanden, wird dem Assignee die Möglichkeit geboten, die Leistung selbst zu bezahlen.
	5.	Zahlung via Payment-Integration
Für individuelle Services ohne Genehmigung oder Budgetgrenze wird der Nutzer optional zu einer externen Bezahlseite weitergeleitet.
	6.	Serviceaktivierung
Nach erfolgreicher Genehmigung oder Bezahlung wird der Service automatisch dem Case zugeordnet und aktiviert.

Technische Aspekte:
	•	Dynamische Service-Liste: Services werden auf Basis von Konfiguration, Nutzertyp und Fallkontext generiert.
	•	Zentrale Regelprüfung: Ein interner Dienst bewertet, ob Budgetprüfung, Genehmigung oder Zahlung notwendig ist.
	•	Mehrstufige Entscheidungskette: System kann automatisch entscheiden, ob Genehmigung notwendig ist oder Self-Payment aktiviert werden muss.
	•	Zahlungsmodul (optional): Für individuelle Käufe kann eine nahtlose Integration mit einem externen Zahlungssystem (z. B. über API) erfolgen.
	•	Audit-Funktion: Jeder Schritt (Auswahl, Genehmigung, Zahlung, Aktivierung) wird nachvollziehbar protokolliert.
