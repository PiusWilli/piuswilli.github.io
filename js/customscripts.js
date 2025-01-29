window.addEventListener('DOMContentLoaded', event => {

    var request = new XMLHttpRequest();
    request.open("GET", "data/pagecontent.json", false);
    request.send(null)
    var pageData = JSON.parse(request.responseText);

    navigationTemplate = document.getElementById('navigation-template').innerHTML;
    var compiledNavigationTemplate = Handlebars.compile(navigationTemplate);
    var navigationHtml = compiledNavigationTemplate(pageData);
    document.getElementById('navbarResponsive').innerHTML = navigationHtml;
});
