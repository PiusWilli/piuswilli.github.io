window.addEventListener('DOMContentLoaded', event => {

    var request = new XMLHttpRequest();
    request.open("GET", "data/pagecontent.json", false);
    request.send(null)
    var pageData = JSON.parse(request.responseText);

    // load and add map 
    d3.svg("/data/chilbi-map.svg").then(function(xml) {
        d3.select("#map-container1").node().appendChild(xml.documentElement);
        prepareSvgZoom();
        initOpenModalOnClick(pageData.clubs);
    });

    // render placeholders
    renderTemplateToPlaceholder('clubs-template', 'clubs-placeholder', pageData);
    renderTemplateToPlaceholder('navigation-template', 'navbarResponsive', pageData);
    renderTemplateToPlaceholder('team-template', 'team-placeholder', pageData);
    renderTemplateToPlaceholder('modal-template', 'modal-placeholder', pageData);
});

var renderTemplateToPlaceholder = function(tempalteElementName, palaceHolderElementId, data)
{
    template = document.getElementById(tempalteElementName).innerHTML;
    var compiledtemplate = Handlebars.compile(template);
    var htmlCode = compiledtemplate(data);
    document.getElementById(palaceHolderElementId).innerHTML = htmlCode;
};

var prepareSvgZoom = function() {
    var svg = d3.select("#map-container1 svg");
    let myZoom = d3.zoom().scaleExtent([0.8, 5]).on('zoom', handleZoom);

    function handleZoom(e) {
        d3.select('#map-container1 svg g')
            .attr('transform', e.transform);
    }

    function initZoom() {
        d3.select('#map-container1 svg').call(myZoom);
    }

    initZoom();
};

var setModalToggleAttributesOnElement = function(elementId, modalLink){
    var pathElementClub1 = document.getElementById(elementId);
    pathElementClub1.setAttribute('class', 'club-link');
    pathElementClub1.setAttribute('data-bs-toggle', 'modal');
    pathElementClub1.setAttribute('href', modalLink);
};

var initOpenModalOnClick = function(clubs){
    if(clubs != null){
        clubs.forEach(setMotalTogglesForClub);
    }
}

function setMotalTogglesForClub(club){
    if(club.svgPath != null){
        club.svgPath.forEach((path) => setModalToggleAttributesOnElement(path, '#clubModal' + club.id));
    }
}

// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 47.4067, lng: 8.7255 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  var myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
    ];


    


  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: position,
    mapId: "DEMO_MAP_ID",
    styles: myStyles 
  });

  // The marker, test
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Test",
  });

  // Define the LatLng coordinates for the polygon's path.
  const triangleCoords = [
    { lat: 47.40742038569232, lng:8.723718701019862  },
    { lat: 47.40743798741141, lng: 8.72376612740402 },
    { lat: 47.40746387228239, lng: 8.723750828570473 },
    { lat: 47.40744523517628, lng: 8.723700342419363 },
  ];
  // Construct the polygon.
  const bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#00AA00",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#00AA00",
    fillOpacity: 0.35,
  });

  bermudaTriangle.setMap(map);
}

initMap();