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
    renderTemplateToPlaceholder('team-template', 'team-placeholder', pageData.team);
    renderTemplateToPlaceholder('modal-template', 'modal-placeholder', pageData);
    renderTemplateToPlaceholder('schedule-template', 'schedule-placeholder', pageData.schedule);
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

var resetSvgZoom = function(){
    d3.select('#map-container1 svg g').attr('transform', null);
}

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

function blink(elementId){
    var element = document.getElementById(elementId);
    element.classList.add("spinner-grow");
    setTimeout(function(){element.classList.remove("spinner-grow");},3000);
}

function scrollTo(elementId){
    var element = document.getElementById(elementId);
    element.scrollIntoView();
}

function highlightSvgElement(elementId){
    resetSvgZoom();
    scrollTo("map-placeholder");
    blink(elementId);
}

document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.show-on-map')) return;

    var clubId = event.target.getAttribute('club-id');
    highlightSvgElement('pin-' + clubId);
    // Don't follow the link
	event.preventDefault();
    if(event.stopPropagation) event.stopPropagation();

}, false);