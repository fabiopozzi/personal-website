# Il mio sito personale
In questo repository sto sperimentando la creazione di un generatore di siti statici usando nodeJS che sia:
* minimalista
* adatto alle mie esigenze

Il templating delle pagine è basato solo su [Handlebars](https://handlebarsjs.com).
In questo modo il template è un semplice file HTML (no markdown).
La creazione delle pagine è meno intuitiva ma c'è più controllo sul risultato finale (almeno per me).
Mi sono affidato al classico [Bootstrap](https://getbootstrap.com) per creare un semplice layout a due colonne
Per quanto riguarda la visualizzazione delle tracce GPX sto facendo uso di [Mapbox](https://www.mapbox.com) convertendo
le tracce GPX in formato [GeoJSON](https://geojson.org) che viene poi visualizzato nelle pagine.
Ogni traccia e' descritta da un file JSON in cui sono inseriti alcuni metadati quali ad esempio:
- lunghezza traccia
- dislivello positivo
- dislivello negativo
- durata del giro
- nome della traccia gpx

A partire da questo file il sistema genera le pagine HTML che visualizzano queste informazioni e la traccia.

La struttura del sito sarà creata in base alla suddivisione in cartelle, ma senza categorie o concetti troppo elaborati
(vedi Hugo).

Le web analytics sono raccolte grazie a [Goatcount](https://www.goatcounter.com) una piattatorma open source e meno invasiva degli altri servizi di analytics.


