AFRAME.registerComponent('play-piano', {
    schema: {},
    init : function() {
        const Context_AF = this;
        Context_AF.soundElem = document.querySelector('#playPianoLoop');
        Context_AF.el.isDown = false;
        Context_AF.el.ogPosition = JSON.parse(JSON.stringify((Context_AF.el.object3D.position)));  // grab original (unpressed) button position
        Context_AF.el.loadPianist= false;
        
        Context_AF.el.addEventListener('mousedown', function(event) {
            Context_AF.playPianoLoop();
        });
    },
    playPianoLoop : function() {
        const Context_AF = this;
        let light = document.querySelector('#spotlight3');
        let lightBeam = document.querySelector('#spotlight3Beam');
        let scene = document.querySelector('a-scene');
        
        if(Context_AF.el.loadPianist  == false)
        {
            pianist = document.createElement('a-entity');
            pianist.setAttribute('obj-model', {obj:'/assets/models/pianist.obj'});
            pianist.setAttribute('position', {x:5.358, y:6.500, z:-3.631});
            pianist.setAttribute('rotation', {x:0, y:-117.080, z:0});
            pianist.setAttribute('id', 'pianist');
            scene.appendChild(pianist);  
            Context_AF.el.loadPianist  = true;
            console.log("created");
        }

        if( Context_AF.el.isDown == 0 )
        {
            light.setAttribute('light', 'intensity', '0.7');
            lightBeam.setAttribute('material', 'visible', 'true');
            Context_AF.soundElem.components['sound'].playSound();
            Context_AF.el.isDown = 1;
            Context_AF.el.object3D.position.set(0, 8.13, 0);
            Context_AF.el.setAttribute('material', {color: 'green'});
            pianist.object3D.position.set(5.358, 6.500, -3.631);
        }
        else{
            light.setAttribute('light', 'intensity', '0.0');
            lightBeam.setAttribute('material', 'visible', 'false');
            Context_AF.soundElem.components['sound'].stopSound(); 
            Context_AF.el.isDown = 0;
            Context_AF.el.object3D.position.set(Context_AF.el.ogPosition.x, Context_AF.el.ogPosition.y, Context_AF.el.ogPosition.z);
            Context_AF.el.setAttribute('material', {color: 'red'});
            pianist.object3D.position.set(0, 0, 0);

            //THIS DELETES THE ELEMENT AND MAKES IT LOAD IN A NEW ONE EVERY TIME. I PUT THIS IN HERE TO SHOW I CAN DO IT BUT I DONT WANT TO LOAD A NEW ONE EVERY TIME WHEN I CAN JUST HIDE THE EXISTING ENTITY
            //drummer.parentNode.removeChild(drummer);
            //Context_AF.el.loadDrummer  = false; 
        } 
    }
});