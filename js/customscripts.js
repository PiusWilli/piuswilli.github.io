window.addEventListener('DOMContentLoaded', () => {
    var request = new XMLHttpRequest();
    request.open("GET", "data/pagecontent.json", false);
    request.send(null)
    var pageData = JSON.parse(request.responseText);

    // load and add map 
    d3.svg("/data/chilbi-map.svg").then((xml) => {
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

function renderTemplateToPlaceholder(tempalteElementName, palaceHolderElementId, data) {
    template = document.getElementById(tempalteElementName).innerHTML;
    var compiledtemplate = Handlebars.compile(template);
    var htmlCode = compiledtemplate(data);
    document.getElementById(palaceHolderElementId).innerHTML = htmlCode;
};

function prepareSvgZoom() {
    function handleZoom(e) {
        d3.select('#map-container1 svg #g1')
            .attr('transform', e.transform);
    }
    var svg = d3.select("#map-container1 svg");
    svg.call(d3.zoom().scaleExtent([0.8, 5]).on('zoom', handleZoom));
};

function resetSvgZoom() {
    d3.select('#map-container1 svg #g1').attr('transform', null);
    var zoom = d3.zoom();
    var svg = d3.select('#map-container1 svg');
    zoom.scaleTo(svg, 1);
    zoom.translateTo(svg, 400, 350);
}

function setModalToggleAttributesOnElement(elementId, clubid) {
    var pathElementClub1 = d3.select("#" + elementId);
    pathElementClub1.classed('club-link');
    pathElementClub1.attr('data-bs-toggle', 'modal');
    pathElementClub1.attr('href', '#clubModal' + clubid);
};

function initOpenModalOnClick(clubs) {
    if (clubs != null) {
        clubs.forEach(setModalToggleForClubs);
    }
}

function setModalToggleForClubs(club) {
    if (club.svgPath != null) {
        club.svgPath.forEach((path) => setModalToggleAttributesOnElement(path, club.id));
    }
}

function blink(elementId) {
    var element = d3.select("#" + elementId);
    var otherPins = d3.selectAll('.club-pin').filter(function () { return this.id !== ("#" + elementId); });
    otherPins.transition().duration(900).style("opacity", "0");
    element.classed("spinner-grow", true);
    setTimeout(function () { element.classed("spinner-grow", false); otherPins.transition().duration(800).style("opacity", "100"); }, 3000);
}

function scrollTo(elementId) {
    var element = document.getElementById(elementId);
    element.scrollIntoView();
}

function highlightSvgElement(elementId) {
    resetSvgZoom();
    scrollTo("map-placeholder");
    blink(elementId);
}