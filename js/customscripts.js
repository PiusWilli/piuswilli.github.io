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

    renderTemplateToPlaceholder('clubs-template', 'clubs-placeholder', pageData);
    renderTemplateToPlaceholder('navigation-template', 'navbarResponsive', pageData);
    renderTemplateToPlaceholder('modal-template', 'modal-placeholder', pageData);
    
});

var renderTemplateToPlaceholder = function(tempalteElementName, palaceHolderElementId, data)
{
    template = document.getElementById(tempalteElementName).innerHTML;
    var compiledtemplate = Handlebars.compile(template);
    var htmlCode = compiledtemplate(data);
    document.getElementById(palaceHolderElementId).innerHTML = htmlCode;
};
