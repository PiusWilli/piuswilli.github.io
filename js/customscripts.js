/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    testTemplate = document.getElementById('test-template').innerHTML;
    var compiledTestTemplate = Handlebars.compile(testTemplate);
    var context = { title: "My New Post"};
    var html = compiledTestTemplate(context);
    document.getElementById('test-handlebarplaceholder').innerHTML = html;
});
