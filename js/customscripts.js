window.addEventListener('DOMContentLoaded', event => {

    // MAP
    const mapContainer = document.getElementById("map-container1");
    let scale = 1;
    let posX = 0, posY = 0;
    let startX = 0, startY = 0;
    let isDragging = false;

    // Mouse wheel zoom with cursor as center
    mapContainer.addEventListener("wheel", (event) => {
        event.preventDefault();
        let rect = mapContainer.getBoundingClientRect();
        let offsetX = (event.clientX - rect.left - posX) / scale;
        let offsetY = (event.clientY - rect.top - posY) / scale;
        let scaleDelta = event.deltaY * -0.001;
        let newScale = Math.min(Math.max(0.5, scale + scaleDelta), 3);
        let scaleFactor = newScale / scale;
        
        posX -= offsetX * (scaleFactor - 1) * scale;
        posY -= offsetY * (scaleFactor - 1) * scale;
        scale = newScale;
        updateTransform();
    });

    // Prevent page zooming on mobile Safari
    document.addEventListener("gesturestart", (e) => e.preventDefault());
    document.addEventListener("gesturechange", (e) => e.preventDefault());

    // Touch pinch zoom
    let startDistance = 0;
    mapContainer.addEventListener("touchstart", (event) => {
        if (event.touches.length === 2) {
            startDistance = getDistance(event.touches[0], event.touches[1]);
        } else if (event.touches.length === 1) {
            startX = event.touches[0].pageX - posX;
            startY = event.touches[0].pageY - posY;
            isDragging = true;
        }
    });

    mapContainer.addEventListener("touchmove", (event) => {
        if (event.touches.length === 2) {
            event.preventDefault();
            let newDistance = getDistance(event.touches[0], event.touches[1]);
            let zoomFactor = newDistance / startDistance;
            let newScale = Math.min(Math.max(0.5, scale * zoomFactor), 3);
            let scaleFactor = newScale / scale;
            
            let rect = mapContainer.getBoundingClientRect();
            let centerX = (event.touches[0].pageX + event.touches[1].pageX) / 2 - rect.left;
            let centerY = (event.touches[0].pageY + event.touches[1].pageY) / 2 - rect.top;
            
            posX -= centerX * (scaleFactor - 1);
            posY -= centerY * (scaleFactor - 1);
            scale = newScale;
            updateTransform();
            startDistance = newDistance;
        } else if (event.touches.length === 1 && isDragging) {
            posX = event.touches[0].pageX - startX;
            posY = event.touches[0].pageY - startY;
            updateTransform();
        }
    });

    mapContainer.addEventListener("touchend", () => {
        isDragging = false;
    });

    // Dragging with mouse
    mapContainer.addEventListener("mousedown", (event) => {
        event.preventDefault();
        startX = event.clientX - posX;
        startY = event.clientY - posY;
        isDragging = true;
        mapContainer.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (event) => {
        if (isDragging) {
            posX = event.clientX - startX;
            posY = event.clientY - startY;
            updateTransform();
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        mapContainer.style.cursor = "grab";
    });

    function getDistance(touch1, touch2) {
        return Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
    }

    function updateTransform() {
        mapContainer.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }
    // END MAP

    var request = new XMLHttpRequest();
    request.open("GET", "data/pagecontent.json", false);
    request.send(null)
    var pageData = JSON.parse(request.responseText);

    // load and add map 
    var mapRequest = new XMLHttpRequest();
    mapRequest.open("GET", "data/chilbi-map.svg", false);
    mapRequest.send(null);
    document.getElementById('map-container1').innerHTML = mapRequest.responseText;
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
