# Walidator Dostępności

Walidator dostępności html dostosowany do stron napisanych w angularze

# Start
- pobierz projekt git clone
- w konsoli wpisz npm install
- wpisz npm start

## Script
  - npm start - uruchamianie projektu
  - npm run lint - eslinter(airbnb) + prettier
  - npm run test - uruchamianie testów

### Tech

* Electron - Aplikacje desktopowe w JavaScript
* Nightmare - Pozwala na zdalną pracę na wygenerowanym DOM
* dom-parser - Zarządzanie wirtualnym DOM z poziomu node.js
* color - porównywanie kontraksu na stronie

### Todos

 * Cytaty powinny się znajmować w <blockquote> lub <q>
 * Tytuły stron
 * Kwestia dzięków - znacznik <video> powinien zawierać alternatywne napisy
 * Wielkośc czcionek ???
 * Skip linki
 * Walidacja modali
 * Walidacja aria (Sztuczna inteligencja ???)
 * Pokrycie walidatora testami
 * Znalazłem buga w focusie - elementy niewidoczne na stronie, nie mogę złapać focusa przez do ich style były zestawiane z stylami document.body, naprawiłem to ograniczając sprawdzanie focusa na tylko widoczne elementy ale trzeba przemyśleć co zrobić z resztą.

### License

MIT
