var Hero = ActionSprite.extend({
    ctor : function(){
        this._super("#hero_idle_00.png");

        //idle animation
        var Frames = [];
        for(var i = 0;i < 6; i++){
            var frame = cc.spriteFrameCache.getSpriteFrame("hero_idle_0" + i + ".png");
            Frames.push(frame);
        }
        var idleAnimation = new cc.Animation(Frames,1/12);
        this._idleAction = cc.repeatForever(cc.animate(idleAnimation));

        //attack animation
        Frames = [];
        for(i = 0; i < 3; i++){
            frame = cc.spriteFrameCache.getSpriteFrame("hero_attack_00_0" + i + ".png");
            Frames.push(frame);
        }
        var attackAnimation = new cc.Animation(Frames,1/24);
        this._attackAction = cc.sequence(cc.animate(attackAnimation),cc.callFunc(this.idle,this));

        //walk animation
        Frames = [];
        for(i = 0 ; i < 8 ; i++){
            frame = cc.spriteFrameCache.getSpriteFrame("hero_walk_0" + i + ".png");
            Frames.push(frame);
        }
        var walkAnimation = new cc.Animation(Frames,1/12);
        this._walkAction = cc.repeatForever(cc.animate(walkAnimation));

        //hurt animation
        Frames = [];
        for(i = 0 ; i < 3 ; i++){
            frame = cc.spriteFrameCache.getSpriteFrame("hero_hurt_0" + i + ".png");
            Frames.push(frame);
        }
        var hurtAnimation = new cc.Animation(Frames,1/12);
        this._hurtAction = cc.sequence(cc.animate(hurtAnimation),cc.callFunc(this.idle,this));

        //knocked out animation
        Frames = [];
        for(i = 0 ; i < 5 ; i++){
            frame = cc.spriteFrameCache.getSpriteFrame("hero_knockout_0" + i + ".png");
            Frames.push(frame);
        }
        var knockedOutAnimation = new cc.Animation(Frames,1/12);
        this._knockedOutAction = cc.sequence(cc.animate(knockedOutAnimation),cc.blink(2,10));
        Frames = null;


        this._centerToBotton = 39;
        this._centerToSides = 29;
        this._hitPoints = 100;
        this._damage = 20;
        this._walkSpeed = 80;



        return true;
    },
    onEnter : function(){
        this._super();
        this._hitBox = this.createBoundingBoxWithOrigin(cc.p(-this._centerToSides,-this._centerToBotton),
            cc.size(this._centerToSides * 2,this._centerToBotton * 2));

        this._attackBox = this.createBoundingBoxWithOrigin(cc.p(this._centerToSides,-10), cc.size(20,20));

    }


});