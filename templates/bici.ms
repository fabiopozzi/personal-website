<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    crossorigin="anonymous">

    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css" rel="stylesheet" />
    <link href="css/bici.css" rel="stylesheet" />

    <title>Fabio Pozzi</title>
  </head>
  <body>
    <div class="container-fluid">
        <div class="row min-vh-100 flex-column flex-md-row">
            <aside class="col-12 col-md-2 p-0 flex-shrink-1">
                <nav class="min-vh-100 navbar navbar-expand navbar-light bg-light flex-md-column flex-row align-items-start py-2">
                    <div class="collapse navbar-collapse ">
                        <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                            <li class="nav-item">
                                <a class="nav-link pl-0 text-nowrap text-dark" href="index.html"><h2>Fabio Pozzi</h2></a>
                            </li>
                            <li class="nav-item">
                            {{#sidebar}}
                                <a class="nav-link pl-0 text-info" href="{{link}}">{{title}}</a>
                            {{/sidebar}}
                            </li>
                            <li class="nav-item">
                                <a class="social-icon" href="https://github.com/fabiopozzi" target="_blank" rel="noopener" title="GitHub">
                                    <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" fill="#ABABAB" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink">
                                        <path d="M13.9988029,1.32087331 C6.82105037,1.32087331 1,7.14112562 1,14.3212723 C1,20.0649109 4.72454649,24.9370678 9.89038951,26.6560892 C10.5408085,26.7757983 10.7778323,26.374374 10.7778323,26.0296121 C10.7778323,25.7215609 10.7666595,24.9035493 10.760275,23.8189856 C7.14426471,24.6042767 6.38131925,22.0760223 6.38131925,22.0760223 C5.78995672,20.5740732 4.93762853,20.1742451 4.93762853,20.1742451 C3.75729765,19.3682044 5.02701126,19.3841656 5.02701126,19.3841656 C6.33183953,19.4759425 7.01817121,20.7241085 7.01817121,20.7241085 C8.17775254,22.7104801 10.0611744,22.1366749 10.8017741,21.8038838 C10.919887,20.9643246 11.2558703,20.3913175 11.6269683,20.066507 C8.74038491,19.7385043 5.70536235,18.6228163 5.70536235,13.6413251 C5.70536235,12.2223743 6.21213051,11.0611968 7.04370914,10.1530044 C6.90963504,9.82420367 6.46351945,8.50181809 7.17139875,6.71256734 C7.17139875,6.71256734 8.26234691,6.36301702 10.7459099,8.04532771 C11.78259,7.75642995 12.8950858,7.61277914 14.000399,7.60719272 C15.1049142,7.61277914 16.2166119,7.75642995 17.2548881,8.04532771 C19.736855,6.36301702 20.8262071,6.71256734 20.8262071,6.71256734 C21.5356825,8.50181809 21.0895669,9.82420367 20.9562909,10.1530044 C21.7894656,11.0611968 22.2922435,12.2223743 22.2922435,13.6413251 C22.2922435,18.6355852 19.2524325,19.734514 16.3570705,20.0561322 C16.8231376,20.4575564 17.2389269,21.2508282 17.2389269,22.4638795 C17.2389269,24.2012564 17.2229657,25.603448 17.2229657,26.0296121 C17.2229657,26.3775663 17.4575954,26.7821827 18.116793,26.6552912 C23.2786458,24.9322794 27,20.0633148 27,14.3212723 C27,7.14112562 21.1789496,1.32087331 13.9988029,1.32087331"></path>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
            <main class="col bg-faded py-3 flex-grow-1">
              <div class="container-fluid">
                <div class="row">
                  <div id='map' class='col-md-6'> </div>
                  <div class='col-md-6'>
                    Statistiche giro:
                    <ul>
                      <li>lunghezza in km</li>
                      <li>velocita' media</li>
                    </ul>
                  </div>
                  <button id="zoomto" class="btn-control">Zoom to bounds</button>
                  <script>
                        mapboxgl.accessToken = '{{mapbox_key}}';
                        var geojson = {{{gpx}}} ;
                        var map = new mapboxgl.Map({
                          container: 'map',
                          style: 'mapbox://styles/mapbox/light-v10',
                          center: [11.11, 45.98],
                          zoom: 10
                        });
                        map.on('load', function() {
                          map.addSource('LineString', {
                            'type': 'geojson',
                            'data': geojson
                          });
                          map.addLayer({
                            'id': 'LineString',
                            'type': 'line',
                            'source': 'LineString',
                            'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                          },
                          'paint': {
                            'line-color': '#BF93E4',
                            'line-width': 5
                          }
                        });
                        map.addControl(new mapboxgl.NavigationControl());

                        document.getElementById('zoomto').addEventListener('click', function() {
                          // Geographic coordinates of the LineString
                          var coordinates = geojson.features[0].geometry.coordinates;

                          // Pass the first coordinates in the LineString to `lngLatBounds` &
                          // wrap each coordinate pair in `extend` to include them in the bounds
                          // result. A variation of this technique could be applied to zooming
                          // to the bounds of multiple Points or Polygon geomteries - it just
                          // requires wrapping all the coordinates with the extend method.
                          var bounds = coordinates.reduce(function(bounds, coord) {
                            return bounds.extend(coord);
                          }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
                          map.fitBounds(bounds, {
                            padding: 20
                          });
                        });
                      });
                  </script>
                </div>
              </div>
            </main>
        </div>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
  </body>
</html>
