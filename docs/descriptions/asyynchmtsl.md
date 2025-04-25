# Warum mTLS bei asynchroner Kommunikation notwendig ist

In unserer Architektur verwenden wir asynchrone Kommunikation – das bedeutet, dass Services nicht direkt aufeinander warten, sondern Nachrichten oder Events senden, ohne eine sofortige Antwort zu erwarten.

Gerade in so einem System ist **Vertrauen** besonders kritisch – denn man weiß nie genau, wer auf der anderen Seite ist. Deshalb setzen wir auf ein **Zero Trust Modell**:

> Niemandem wird standardmäßig vertraut – jeder Service muss sich eindeutig ausweisen.

---

## Was ist mTLS?

**mTLS** (mutual TLS) ist eine Erweiterung von TLS, bei der sich nicht nur der Server, sondern auch der Client mit einem Zertifikat ausweist. So wissen **beide Seiten**, dass sie mit dem echten Kommunikationspartner sprechen.

---

## Warum ist mTLS bei Async-Architektur notwendig?

1. **Kein direkter Kontakt**  
   In asynchronen Systemen reden Services über Events oder Messaging – nicht direkt. Das heißt: klassische Netzwerk-Sicherheit (IP-Whitelisting, Firewalls) reicht nicht.

2. **Zero Trust – überall**  
   Da jeder Service potenziell erreichbar ist, brauchen wir ein System, das sicherstellt:  
   Nur autorisierte und vertrauenswürdige Services dürfen senden oder empfangen.

3. **mTLS sichert den Kanal**  
   mTLS sorgt dafür, dass:
   - Nur registrierte Services eine Verbindung aufbauen können
   - Alle Verbindungen verschlüsselt und authentifiziert sind

4. **Spoofing vermeiden**  
   Ohne mTLS könnte ein Angreifer so tun, als wäre er z. B. der ExecutionService – mit mTLS ist das nicht möglich, da er kein gültiges Zertifikat besitzt.

---

## Fazit

In einer **asynchronen Zero-Trust-Architektur** ist mTLS kein „Nice-to-have“, sondern eine **Grundvoraussetzung**.  
Es ersetzt das klassische Vertrauen auf Netzwerkinfrastruktur und bringt Sicherheit direkt auf Protokollebene – genau dort, wo wir es brauchen.