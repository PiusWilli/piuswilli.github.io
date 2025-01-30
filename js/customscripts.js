window.addEventListener('DOMContentLoaded', event => {

    var request = new XMLHttpRequest();
    request.open("GET", "data/pagecontent.json", false);
    request.send(null)
    var pageData = JSON.parse(request.responseText);

    // load and add map 
    var mapRequest = new XMLHttpRequest();
    mapRequest.open("GET", "data/chilbi-map.svg", false);
    mapRequest.send(null)
    document.getElementById('map-placeholder').innerHTML = mapRequest.responseText

    navigationTemplate = document.getElementById('clubs-template').innerHTML;
    var compiledNavigationTemplate = Handlebars.compile(navigationTemplate);
    var navigationHtml = compiledNavigationTemplate(pageData);
    document.getElementById('clubs-placeholder').innerHTML = navigationHtml;

    navigationTemplate = document.getElementById('navigation-template').innerHTML;
    var compiledNavigationTemplate = Handlebars.compile(navigationTemplate);
    var navigationHtml = compiledNavigationTemplate(pageData);
    document.getElementById('navbarResponsive').innerHTML = navigationHtml;
});
