document.addEventListener("DOMContentLoaded", function(event) {
// Get the canvas DOM element
var canvas = document.querySelector('#renderCanvas');
canvas.width = "1280";
canvas.height = "680";
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// CreateScene function that creates and return the scene
var createScene = function() {
	var scene = new BABYLON.Scene(engine);
	
    //var box = BABYLON.MeshBuilder.CreateBox("box", {});
    var light = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    light.diffuse = new BABYLON.Color3(1, 0, 0);
    BABYLON.SceneLoader.Append("", "parallel_bars.obj", scene);
    scene.createDefaultCamera(true, true, true);

    
    return scene;
};
// call the createScene function
var scene = createScene();
// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});
});
