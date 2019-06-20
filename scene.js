document.addEventListener("DOMContentLoaded", function(event) {
// Get the canvas DOM element
var canvas = document.querySelector('#renderCanvas');
canvas.width = "1280";
canvas.height = "680";
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// CreateScene function that creates and return the scene
var delayCreateScene = function() {
	var scene = new BABYLON.Scene(engine);
	
    //var box = BABYLON.MeshBuilder.CreateBox("box", {});
    //var ground = BABYLON.MeshBuilder.CreateGround("ground", {});
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
    var ground = BABYLON.MeshBuilder.CreateGround("gd", {width: 6, height: 6, subdivisions: 4}, scene);

    BABYLON.SceneLoader.Append("", "parallel_bars.obj", scene, function (scene) {
    scene.createDefaultCamera(true, true, true);
    });
    
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
