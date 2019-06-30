document.addEventListener("DOMContentLoaded", function(event) {
// Get the canvas DOM element
var canvas = document.getElementById('renderCanvas');
canvas.width = 720;
canvas.height = 800;
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// CreateScene function that creates and return the scene
var createScene = function(){
    var scene = new BABYLON.Scene(engine);

    //Adding a light
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);

    //Adding an Arc Rotate Camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);

    // The first parameter can be used to specify which mesh to import. Here we import all meshes
    BABYLON.SceneLoader.ImportMesh("", "", "sls_amg.obj", scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        camera.target = newMeshes[0];
    });

    // Move the light with the camera
    scene.registerBeforeRender(function () {
        light.position = camera.position;
    });

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
