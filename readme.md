# Walidator Dostępności

Walidator dostępności HTML dostosowany do stron dynamicznie renderowanych przez JS

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
* color - Porównywanie kontraksu na stronie

### Todos

 * Dodanie tłumaczenia na język angielski
 * Lepsze informacje w raporcie 

### Bugs

 * checkLinksAndButtons - bug wyłapuje z svg znacznik style i twierdzi że to textContent BUG#2
 * Problemy z pobieraniem css na niektórych stronach 

### License

MIT
