var HudLayer = cc.Layer.extend({
    _layer : null,
    _isHeld : false,

    _direction : cc.p(0,0),

    ctor : function(){
        this._super();

        this.scheduleUpdate();

        return true;
    },

    onEnter : function(){
        this._super();

        var listener = cc.EventListener.create({
            event : cc.EventListener.KEYBOARD,
            onKeyPressed : function(keyCode,event){
                var target = event.getCurrentTarget();
               // cc.log(keyCode);
                target.updateDirectionForTouchLocation(keyCode);
            },
            onKeyReleased : function(keyCode,event){
                var target = event.getCurrentTarget();
                target._isHeld = false;
                target._direction = cc.p(0,0);
                target.simpleDPadTouchEnded();
            }
        });
        cc.eventManager.addListener(listener,this);
    },

    didChangeDirectionTo : function(){
        this._layer._hero.walkWithDirection(this._direction);

    },
    isHoldingDirection : function(){
        this._layer._hero.walkWithDirection(this._direction);
    },
    simpleDPadTouchEnded : function(){
        if(this._layer._hero._actionState == wx.ActionState.kActionStateWalk){
            this._layer._hero.idle();
        }
    },
    updateDirectionForTouchLocation : function(location){
        switch(location){
            case  68:
                this._direction = cc.p(1.0,0.0);
                this._isHeld = true;
                break;

            case 67 :
                this._direction = cc.p(1.0,-1.0);
                this._isHeld = true;
                break;

            case 83 :
                this._direction = cc.p(0.0,-1.0);
                this._isHeld = true;
                break;

            case 90 :
                this._direction = cc.p(-1.0,-1.0);
                this._isHeld = true;
                break;

            case 65:
                this._direction = cc.p(-1.0,0.0);
                this._isHeld = true;
                break;

            case  81:
                this._direction = cc.p(-1.0,1.0);
                this._isHeld = true;
                break;

            case 87 :
                this._direction = cc.p(0.0,1.0);
                this._isHeld = true;
                break;

            case 69 :
                this._direction = cc.p(1.0,1.0);
                this._isHeld = true;
                break;
        }
        if(this._isHeld === true) {
            this.didChangeDirectionTo();
        }
    },
    update : function(dt){
        if(this._isHeld){
            this.isHoldingDirection();
        }
    },

});