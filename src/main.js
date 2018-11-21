function gltf_rv(canvasId, index, headless = false, onRendererReady = undefined)
{
    let canvas = document.getElementById(canvasId);
    if (!canvas)
    {
        console.warn("Failed to retrieve the WebGL canvas!");
        return null;
    }

    gl = getWebGlContext();
    if (!gl)
    {
        console.warn("Failed to get an WebGL rendering context!");
        return null;
    }

    let viewer = new gltfViewer(canvas, index, headless, onRendererReady);

    canvas.onmousedown = viewer.onMouseDown.bind(viewer);
    document.onmouseup = viewer.onMouseUp.bind(viewer);
    document.onmousemove = viewer.onMouseMove.bind(viewer);
    canvas.onwheel = viewer.onMouseWheel.bind(viewer);
    canvas.ontouchstart = viewer.onTouchStart.bind(viewer);
    document.ontouchend = viewer.onTouchEnd.bind(viewer);
    document.ontouchmove = viewer.onTouchMove.bind(viewer);

    canvas.ondrop = viewer.dropEventHandler.bind(viewer);
    canvas.ondragover = viewer.dragOverHandler.bind(viewer);

    return viewer; // Succeeded in creating a glTF viewer!
}

function getWebGlContext()
{
    const parameters = { alpha: false, antialias: false };
    const names = [ "webgl", "experimental-webgl" ];
    let context;
    for (const name of names)
    {
        context = canvas.getContext(name, parameters);
        if (context)
        {
            return context;
        }
    }
}
