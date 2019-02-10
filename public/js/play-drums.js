AFRAME.registerComponent('play-drums', {
    schema: {},
    init : function() {
        const Context_AF = this;
        Context_AF.soundElem = document.querySelector('#playDrumLoop');
        Context_AF.el.isDown = false;
        Context_AF.el.ogPosition = JSON.parse(JSON.stringify((Context_AF.el.object3D.position)));  // grab original (unpressed) button position
        
        Context_AF.el.addEventListener('click', function(event) {
            console.log("mousedown");
            //object clicked - lets create a cow!
            Context_AF.playDrumLoop();
        });
    },
    playDrumLoop : function() {
        const Context_AF = this;
        if( Context_AF.el.isDown == 0 )
        {
            Context_AF.soundElem.components['sound'].playSound();
            Context_AF.el.isDown = 1;
            Context_AF.el.object3D.position.set(0, 8.13, 0);
            Context_AF.el.setAttribute('material', {color: 'green'});
        }
        else{
            Context_AF.soundElem.components['sound'].stopSound(); //stop first so we aren't trying to play more than once at same time
            Context_AF.el.isDown = 0;
            Context_AF.el.object3D.position.set(Context_AF.el.ogPosition.x, Context_AF.el.ogPosition.y, Context_AF.el.ogPosition.z);
            Context_AF.el.setAttribute('material', {color: 'red'});
        } 
    }
});