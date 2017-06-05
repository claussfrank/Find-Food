var cargarPagina = function(){
    
     
};
function initMap() {
  var uluru = {lat: 19.417575, lng: -99.164701};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}





$(document).ready(cargarPagina);