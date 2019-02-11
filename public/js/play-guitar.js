AFRAME.registerComponent('play-guitar', {
    schema: {},
    init : function() {
        const Context_AF = this;
        Context_AF.soundElem = document.querySelector('#playGuitarLoop');
        Context_AF.el.isDown = false;
        Context_AF.el.ogPosition = JSON.parse(JSON.stringify((Context_AF.el.object3D.position)));  // grab original (unpressed) button position
        Context_AF.el.loadGuitarist = false;
        
        Context_AF.el.addEventListener('mousedown', function(event) {
            Context_AF.playGuitarLoop();
        });
    },
    playGuitarLoop : function() {
        const Context_AF = this;
        let light = document.querySelector('#spotlight1');
        let lightBeam = document.querySelector('#spotlight1Beam');
        let scene = document.querySelector('a-scene');
        var myAudio = document.getElementById('play-guitar-loop');
        
        if(Context_AF.el.loadGuitarist  == false)
        {
            guitarist = document.createElement('a-entity');
            guitarist.setAttribute('obj-model', {obj:'/assets/models/guitarist.obj'});
            guitarist.setAttribute('position', {x:-3.773, y:6.500, z:-2.778});
            guitarist.setAttribute('rotation', {x:0, y:-69.471, z:0});
            guitarist.setAttribute('id', 'guitarist');
            scene.appendChild(guitarist);  
            Context_AF.el.loadGuitarist = true;
            console.log("created");

            
        }

        if( Context_AF.el.isDown == 0 )
        {
            light.setAttribute('light', 'intensity', '0.7');
            lightBeam.setAttribute('material', 'visible', 'true');
            
            //myAudio.play();
            Context_AF.soundElem.components['sound'].playSound();
            Context_AF.el.isDown = 1;
            Context_AF.el.object3D.position.set(0, 8.13, 0);
            Context_AF.el.setAttribute('material', {color: 'green'});
            guitarist.object3D.position.set(-3.773, 6.500, -2.778);
        }
        else{
            light.setAttribute('light', 'intensity', '0.0');
            lightBeam.setAttribute('material', 'visible', 'false');
            //myAudio.pause();
            Context_AF.soundElem.components['sound'].stopSound(); 
            Context_AF.el.isDown = 0;
            Context_AF.el.object3D.position.set(Context_AF.el.ogPosition.x, Context_AF.el.ogPosition.y, Context_AF.el.ogPosition.z);
            Context_AF.el.setAttribute('material', {color: 'red'});
            guitarist.object3D.position.set(0, 0, 0);

            //THIS DELETES THE ELEMENT AND MAKES IT LOAD IN A NEW ONE EVERY TIME. I PUT THIS IN HERE TO SHOW I CAN DO IT BUT I DONT WANT TO LOAD A NEW ONE EVERY TIME WHEN I CAN JUST HIDE THE EXISTING ENTITY
            //drummer.parentNode.removeChild(drummer);
            //Context_AF.el.loadDrummer  = false; 
        } 
    }
});