## Meccanismo gestione tracce
Per ogni file nella cartella `track_data/`
Ho dei metadati associati alla traccia gpx `['nome', 'data', 'km percorsi', 'nome_file_gpx', 'nome_template']`
A questo punto vado a prendere il file gpx nella cartella `gpx/`
leggo e converto il file in [GEOjson](https://geojson.org)
a quel punto vado a fare il render del template bici e genero una pagina


## Mappa
- aggiungere marker inizio e fine DONE
- usare leafletJS al posto di mapbox DONE
- usare leaflet-elevation per fare disegno altitudine
- ottenere mappe con indicazione profilo altimetrico

## Template
- aggiungere funzione logica che non inserisce riga se la proprietà non ha valore
- aggiungere descrizione testuale itinerario alle tracce bici
- aggiungere link download tracce


## Altro
- scrivere post su setup del tema
- scrivere post su creazione generatore via nodeJS DONE
- aggiunte analytics via goatanalytics DONE

