document.addEventListener("DOMContentLoaded", function(event) {
// Get the canvas DOM element
var canvas = document.getElementById('renderCanvas');
canvas.width = 720;
canvas.height = 800;
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// CreateScene function that creates and return the scene
var createScene = function(){
    // Create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);
    // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
    //var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    // Target the camera to scene origin
    //camera.setTarget(BABYLON.Vector3.Zero());
    // Attach the camera to the canvas
    //camera.attachControl(canvas, false);
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);

    //BABYLON.SceneLoader.Append("", "parallel_bars.obj", scene, function(scene){
    BABYLON.SceneLoader.ImportMesh("", "", "parallel_bars.obj", scene, function (newMeshes) {
        var bars = newMeshes[0];
        var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
        myMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.34, 0.04);
        bars.material = myMaterial;
        myMaterial.wireframe = true;
        bars.physicsImpostor = new BABYLON.PhysicsImpostor(bars, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
        var angle = 0.01;
    /*var earthAxis = new BABYLON.Vector3(Math.sin(0 * Math.PI/180), Math.cos(0 * Math.PI/180), 0);
    scene.registerBeforeRender(function() {
        bars.rotate(earthAxis, angle, BABYLON.Space.WORLD);
    })*/
        scene.createDefaultCamera(true, true, true);
        // run the render loop
        engine.runRenderLoop(function(){
        scene.render();
        });
    });
    
    // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
    var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
    
    
    // Return the created scene
    return scene;
}
// call the createScene function
var scene = createScene();

// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});
});
