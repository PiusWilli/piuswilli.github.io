window.addEventListener('DOMContentLoaded', event => {

    var request = new XMLHttpRequest();
    request.open("GET", "data/pagecontent.json", false);
    request.send(null)
    var pageData = JSON.parse(request.responseText);

    // load and add map 
    var mapRequest = new XMLHttpRequest();
    mapRequest.open("GET", "data/chilbi-map.svg", false);
    mapRequest.send(null);
    document.getElementById('map-placeholder').innerHTML = mapRequest.responseText;
    setModalToggleAttributesOnElement('path1688', '#clubModal1');
    setModalToggleAttributesOnElement('path21104', '#clubModal2');
    setModalToggleAttributesOnElement('path21070', '#clubModal3');
    setModalToggleAttributesOnElement('path21068', '#clubModal3');
    setModalToggleAttributesOnElement('path21066', '#clubModal3');
    setModalToggleAttributesOnElement('path21114', '#clubModal4');


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

var setModalToggleAttributesOnElement = function(elementId, modalLink){
    var pathElementClub1 = document.getElementById(elementId);
    pathElementClub1.setAttribute('clase', 'club-link');
    pathElementClub1.setAttribute('data-bs-toggle', 'modal');
    pathElementClub1.setAttribute('href', modalLink);
};
