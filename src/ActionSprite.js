var ActionSprite = cc.Sprite.extend({
    _idleAction : null,
    _attackAction : null,
    _walkAction : null,
    _hurtAction : null,
    _knockedOutAction : null,

    _actionState : wx.ActionState,

    _walkSpeed : 0,
    _hitPoints : 0,
    _damage : 0,

    _velocity : null,
    _desiredPosition : cc.p(0,0),

    _centerToSides : 0,
    _centerToBotton : 0,

    _hitBox : null,
    _attackBox : null,

    ctor : function(file){
        this._super(file);


        return true;
    },
    onEnter : function(){
        this._super();

        // this.drawNode = new cc.DrawNode();
        // this.getParent().getParent().addChild(this.drawNode);

    },

    update : function(dt){
        if(this._actionState == wx.ActionState.kActionStateWalk){
            //精灵每帧期望到达的位置
            this._desiredPosition = cc.pAdd(this.getPosition(),cc.pMult(this._velocity,dt));
        }

        //this.draw();
    },
    draw : function(){
        this.drawNode.clear();
        this.drawNode.drawRect(this._hitBox.actual.origin,cc.p(29 * 2 + this._hitBox.actual.origin.x,39 * 2 + this._hitBox.actual.origin.y),
            null,2,cc.color(255,0,0,255));
        this.drawNode.drawRect(this._attackBox.actual.origin, cc.p(20 + this._attackBox.actual.origin.x,20 + this._attackBox.actual.origin.y),
            null,2,cc.color(0,255,255,255));
    },
    idle : function(){
        if(this._actionState != wx.ActionState.kActionStateIdle){
            this.stopAllActions();
            this.runAction(this._idleAction);
            this._actionState = wx.ActionState.kActionStateIdle;
            this._velocity = cc.p(0,0);
        }

    },
    attack : function(){
        if(this._actionState === wx.ActionState.kActionStateIdle ||
            //this._actionState === wx.ActionState.kActionStateAttack ||
            this._actionState === wx.ActionState.kActionStateWalk
            ){
            this.stopAllActions();
            this.runAction(this._attackAction);
            this._actionState = wx.ActionState.kActionStateAttack;
        }

    },
    hurtWithDamage : function(damage){
        if(this._actionState !== wx.ActionState.kActionStateKnockedOut){
            this.stopAllActions();
            this.runAction(this._hurtAction);
            this._actionState = wx.ActionState.kActionStateHurt;
            this._hitPoints -= damage;

            if(this._hitPoints <= 0){
                this.knockout();
            }
        }
    },
    knockout : function(){
        this.stopAllActions();
        this.runAction(this._knockedOutAction);
        this._hitPoints = 0;
        this._actionState = wx.ActionState.kActionStateKnockedOut;

    },
    walkWithDirection(direction){
        if(this._actionState == wx.ActionState.kActionStateIdle){
            this.stopAllActions();
            this.runAction(this._walkAction);
            this._actionState = wx.ActionState.kActionStateWalk;
        }
        if(this._actionState == wx.ActionState.kActionStateWalk) {
            this._velocity = cc.p(direction.x * this._walkSpeed, direction.y * this._walkSpeed);
            if (this._velocity.x > 0) {
                this.scaleX = 1.0;
            }
            else if(this._velocity.x < 0) {
                this.scaleX = -1.0;
            }
        }

    },
    createBoundingBoxWithOrigin : function(origin,size){
        var boundingBox = new BoundingBox();
        boundingBox.original.origin = origin;
        boundingBox.original.size = size;

        boundingBox.actual.origin = cc.pAdd(this.getPosition(),cc.p(boundingBox.original.origin.x,boundingBox.original.origin.y));
        boundingBox.actual.size = size;
        return boundingBox;
    },
    transformBoxes : function(){
        this._hitBox.actual.origin = cc.pAdd(this.getPosition(),cc.p(this._hitBox.original.origin.x,this._hitBox.original.origin.y));
        this._attackBox.actual.origin = cc.pAdd(this.getPosition(),
            cc.p(this._attackBox.original.origin.x + (this.getScaleX() === -1 ? (- this._attackBox.original.size.width - this._hitBox.original.size.width): 0),
            this._attackBox.original.origin.y));
        //cc.log("更新包围盒");

    },
    setPosition : function(posx,posy){
        this._super(posx,posy);
        this.transformBoxes();

    },

    // setPositionX : function(position){
    //     //this._super();
    //     this._position.x = position;
    //     //this.transformBoxes();
    // },
    // setPositionY : function(position){
    //     this._super(position);
    //     //this._y = position;
    //     this.transformBoxes();
    // },


});

//ActionSprite.id = 0;