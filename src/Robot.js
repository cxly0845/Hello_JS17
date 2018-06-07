var Robot = ActionSprite.extend({
    _nextDecisionTime : 0,

    ctor: function () {
        this._super("#robot_idle_00.png");

        var frames = [];
        for(var i = 0;i < 5;i++){
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("robot_idle_0" + i +".png");
            frames.push(spriteFrame);
        }
        var idleAnimation = new cc.Animation(frames,1/12);
        this._idleAction = cc.repeatForever(cc.animate(idleAnimation));


        frames = [];
        for(var i = 0;i < 5;i++){
            spriteFrame = cc.spriteFrameCache.getSpriteFrame("robot_attack_0" + i +".png");
            frames.push(spriteFrame);
        }
        var attakcAnimation = new cc.Animation(frames,1/24);
        this._attackAction = cc.sequence(cc.animate(attakcAnimation),cc.callFunc(this.idle,this));


        frames = [];
        for(var i = 0;i < 6;i++){
            spriteFrame = cc.spriteFrameCache.getSpriteFrame("robot_walk_0" + i +".png");
            frames.push(spriteFrame);
        }
        var walkAction = new cc.Animation(frames,1/12);
        this._walkAction = cc.repeatForever(cc.animate(walkAction));

        //hurt animation
        frames = [];
        for(i = 0 ; i < 3 ; i++){
            frame = cc.spriteFrameCache.getSpriteFrame("robot_hurt_0" + i + ".png");
            frames.push(frame);
        }
        var hurtAnimation = new cc.Animation(frames,1/12);
        this._hurtAction = cc.sequence(cc.animate(hurtAnimation),cc.callFunc(this.idle,this));

        //knocked out animation
        frames = [];
        for(i = 0 ; i < 5 ; i++){
            frame = cc.spriteFrameCache.getSpriteFrame("robot_knockout_0" + i + ".png");
            frames.push(frame);
        }
        var knockedOutAnimation = new cc.Animation(frames,1/12);
        this._knockedOutAction = cc.sequence(cc.animate(knockedOutAnimation),cc.blink(2,10));
        frames = null;




        this._walkSpeed = 80;
        this._centerToSides = 29;
        this._centerToBotton = 39;
        this._hitPoints = 100;
        this._damage = 10;



        return true;
    },
    onEnter : function(){
        this._super();
        this._hitBox = this.createBoundingBoxWithOrigin(cc.p(-this._centerToSides,-this._centerToBotton),
            cc.size(this._centerToSides * 2,this._centerToBotton * 2));

        this._attackBox = this.createBoundingBoxWithOrigin(cc.p(this._centerToSides,-5), cc.size(25,20));
    }


});