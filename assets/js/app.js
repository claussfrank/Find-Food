var restaurantes = [
    {
        "restaurant":"Café de Tacuba",
        "direccion":"Calle de Tacuba 28, Cuauhtémoc, Centro, 06010 Ciudad de México, CDMX",
        "foto":"assets/img/Tacuba.png", 
        "latitud":"19.4357584",
        "longitud":"-99.1398417"
    },
    
    {
        "restaurant":"Te Mataré Santana",
        "direccion":"San José Insurgentes, 03900 Ciudad de México, CDMX",
        "foto":"assets/img/Santana.png",
        "latitud":"19.3638354",
        "longitud":"-99.185198"
    },
    
    {
        "restaurant":"La Poblanita de Tacubaya",
        "direccion":"Gobernador Luis G. Vieyra 12, San Miguel Chapultepec I Secc, 11850 Miguel Hidalgo, CDMX",
        "foto":"assets/img/poblana.png",
        "latitud":"19.404869",
        "longitud":"-99.1841983"
    }
];

var plantillaRestaurante = '<div class="row restaurant">' +
            '<div class="col s12 m7 offset-m1 ">' +
                '<h5 class="header">**Restaurante**</h5>' +
                '<div class="card horizontal">' +
                    '<div class="card-image">' +
                        '<img src="**Foto**">' +
                    '</div>' +
                    '<div class="card-stacked">' +
                        '<div class="card-content">' +
                          '<p>**Direccion**</p>' +
                        '</div>' +
                        '<div class="card-action">' +
                          '<a class="lugar" data-latitud="**latitud**" data-longitud="**longitud**">Ver Ubicación</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

var cargarPagina = function(){
    obtenerUbicacionActual();
    //lo  utilizamos  para   crear  el  elemento que  que  no  se  crean  en  el html  y  se hacen  dinamicamente
    $(document).on('click','.lugar', cambiarUbicacion);    
    $("#search-form").submit(filtrarRestaurante); 
};

var filtrarRestaurante = function(e){
    e.preventDefault();
    
    //tomamos  el  valor  de que  ingresa  el  usuario y lo pasamos  a minusculas
    var criterioBusqueda = $("#search").val().toLowerCase();
    console.log(criterioBusqueda);
    
    //Declaramos  la  función filtar  para tomar  los  valores  del objeto  que  ya   declaramos.
    // Declaramos  una  función anomina  para que nos  de  los  objetos 
    var contactosFiltrados = restaurantes.filter(function(restaurant){
        return restaurant.restaurant.toLowerCase().indexOf(criterioBusqueda) >= 0;
    });
    mostrarRestaurante(contactosFiltrados);
};

var mostrarRestaurante = function (restaurantes){
    var plantillaFinal= "";
    
    restaurantes.forEach(function(restaurant){
    plantillaFinal += plantillaRestaurante.replace("**Restaurante**",restaurant.restaurant)
        .replace("**Direccion**",restaurant.direccion)
        .replace("**Foto**",restaurant.foto)
        .replace("**latitud**",restaurant.latitud)
        .replace("**longitud**",restaurant.longitud);
    });
    $(".cartasContainer").html(plantillaFinal);
};

 function obtenerUbicacionActual(){
     if (navigator.geolocation){
         navigator.geolocation.getCurrentPosition(mostrarPossicionActual);
     } else {
         alert("Geolocalización no es soportado en tu navegador");
     }
 }

function mostrarPossicionActual(posicion){
    var latitud = posicion.coords.latitude;
    var longitud = posicion.coords.longitude;
    
    var coordenadas ={
        lat:latitud,
        lng:longitud
    };
   mostrarMapa(coordenadas); 
}

// @coordenadas: { lat: <number>, lng: <number> }
function mostrarMapa(coordenadas) {
  var map = new google.maps.Map($('.map')[0], {
    zoom: 18,
    center: coordenadas
  });
  var marker = new google.maps.Marker({
    position: coordenadas,
    map: map
  });
}

function cambiarUbicacion(){
  var latitud = $(this).data("latitud");
  var longitud = $(this).data("longitud");

  var coordenadas = {
    lat: latitud,
    lng: longitud
  };

  console.log(coordenadas);
  mostrarMapa(coordenadas);
}





//function initMap() {
//  var uluru = {lat: 19.417575, lng: -99.164701};
//  var map = new google.maps.Map(document.getElementById('map'), {
//    zoom: 17,
//    center: uluru
//  });
//  var marker = new google.maps.Marker({
//    position: uluru,
//    map: map
//  });
//}
//
//



$(document).ready(cargarPagina);