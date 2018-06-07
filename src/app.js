/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var GameLayer = cc.Layer.extend({
    _hero : null,
    _robots : [],
    _tileMap : null,
    _actors : null,

    ctor:function () {
        this._super();
        this.initTileMap();

        cc.spriteFrameCache.addSpriteFrames(res.pd_sprites_plist);
        this._actors = new cc.SpriteBatchNode(res.pd_sprites_png);
        this.addChild(this._actors,-5);

        this.initHero();
        this.initRobots();

        this.scheduleUpdate();

        return true;
    },
    initTileMap : function(){
        this._tileMap = new cc.TMXTiledMap(res.pd_tileMap_tmx);
        this.addChild(this._tileMap, -6);
    },
    initHero : function(){
        this._hero = new Hero();
        this._actors.addChild(this._hero);
        this._hero.x = this._hero._centerToSides;
        this._hero.y = 80;
        this._hero._desiredPosition = this._hero.getPosition();
        this._hero.idle();
    },
    initRobots : function(){
        var robotCount = 10;
        for(var i = 0; i< robotCount; i++){
            var robot = new Robot();
            this._actors.addChild(robot);
            this._robots.push(robot);

            var minX = wx.SCREEN.width / 2 + robot._centerToSides;
            var maxX = this._tileMap.getMapSize().width * this._tileMap.getTileSize().width - robot._centerToSides;

            var minY = robot._centerToBotton;
            var maxY = 3 * this._tileMap.getTileSize().height + robot._centerToBotton;
            robot.scaleX = -1;
            robot.x = wx.random_range(minX,maxX);
            robot.y = wx.random_range(minY,maxY);
            robot._desiredPosition = robot.getPosition();
            robot.idle();
        }

    },

    onEnter : function(){
        this._super();

        var listener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function(touch,event){
                var target = event.getCurrentTarget();
                target._hero.attack();

                if(target._hero._actionState == wx.ActionState.kActionStateAttack){
                    for(var i = 0; i < target._robots.length; i++){
                        var robot = target._robots[i];
                        if(robot._actionState !== wx.ActionState.kActionStateKnockedOut){
                            if(Math.abs(target._hero.y - robot.y) < 10){

                                target.createRect(target._hero,robot);

                                if(cc.rectIntersectsRect(target.rect1,target.rect2)){
                                    robot.hurtWithDamage(target._hero._damage);
                                }
                            }
                        }
                    }
                }
            },
        })
        cc.eventManager.addListener(listener,this);

    },
    createRect : function(hero,robot){
        this.rect1 = cc.rect(hero._attackBox.actual.origin.x,
        hero._attackBox.actual.origin.y,
        hero._attackBox.actual.size.width,
        hero._attackBox.actual.size.height);

        this.rect2 = cc.rect(robot._hitBox.actual.origin.x,
            robot._hitBox.actual.origin.y,
            robot._hitBox.actual.size.width,
            robot._hitBox.actual.size.height);
},
    update : function(dt){
        this._hero.update(dt);
        this.updateRobots(dt);
        this.updatePositions();
        this.setViewpointCenter(this._hero.getPosition());
        this.reorderActors();

    },
    updatePositions : function(){
        var posX = Math.min(this._tileMap.getMapSize().width * this._tileMap.getTileSize().width -
                            this._hero._centerToSides, Math.max(this._hero._centerToSides,this._hero._desiredPosition.x));

        var posY = Math.min( 3 * this._tileMap.getTileSize().height + this._hero._centerToBotton,
                            Math.max(this._hero._desiredPosition.y,this._hero._centerToBotton));
         //this._hero.x = posX;
         //this._hero.y = posY;
        this._hero.setPosition(posX,posY);

        for(var key in this._robots){
            var robot = this._robots[key];

            posX = Math.min(this._tileMap.getMapSize().width * this._tileMap.getTileSize().width -
                            robot._centerToSides,Math.max(robot._centerToSides,robot._desiredPosition.x));

            posY = Math.min(3 * this._tileMap.getTileSize().height + robot._centerToBotton,
                            Math.max(robot._centerToBotton,robot._desiredPosition.y));
            robot.setPosition(cc.p(posX,posY));

        }


    },
    setViewpointCenter : function(position){
        var x = Math.max(position.x,wx.SCREEN.width / 2);
        var y = Math.max(position.y,wx.SCREEN.height/2);

        x = Math.min(x,this._tileMap.getMapSize().width *this._tileMap.getTileSize().width - wx.SCREEN.width / 2);
        y = Math.min(y,this._tileMap.getMapSize().height * this._tileMap.getTileSize().height - wx.SCREEN.height / 2);

        var actualPosition = cc.p(x,y);
        var centerofView = cc.p(wx.SCREEN.width / 2, wx.SCREEN.height / 2);

        var viewPoint = cc.pSub(centerofView,actualPosition);
       // cc.log(viewPoint);
        this.setPosition(viewPoint);
    },

    reorderActors : function(){
        for(var i = 0;i < this._actors.getChildrenCount();i++){
            var sprite = this._actors.getChildren()[i];
            this._actors.reorderChild(sprite,(this._tileMap.getMapSize().height * this._tileMap.getTileSize().height)
                                        - sprite.y);
        }
    },
    updateRobots : function(dt){
        var alive = 0;
        var distanceSQ = 0;
        var randomChoice = 0;
        for(var key in this._robots){
            var robot = this._robots[key];
            robot.update(dt);
            if(robot._actionState !== wx.ActionState.kActionStateKnockedOut){
                //1
                alive++;
                //2
                if(GetCurTime() > robot._nextDecisionTime){
                    distanceSQ = cc.pDistanceSQ(robot.getPosition(),this._hero.getPosition());
                    //3
                    if(distanceSQ <= 50 * 50){
                        robot._nextDecisionTime = GetCurTime() + wx.random_range(0.1,0.5) * 1000;
                        randomChoice = Math.round(wx.random_range(0,1));
                        if(randomChoice === 0){
                            if(this._hero.x > robot.x){
                                robot.scaleX = 1.0;
                            }
                            else
                            {
                                robot.scaleX = -1.0;
                            }

                            //4
                            robot._nextDecisionTime += wx.random_range(0.1,0.5)* 2000;
                            robot.attack();
                            if(robot._actionState === wx.ActionState.kActionStateAttack){
                                if(Math.abs(this._hero.y - robot.y) < 10){
                                    this.createRect(robot,this._hero);
                                    if(cc.rectIntersectsRect(this.rect1,this.rect2)){
                                        this._hero.hurtWithDamage(robot._damage);

                                        //end game checker here
                                    }
                                }

                            }
                        }
                        else{
                            robot.idle();
                        }
                    }
                    else if(distanceSQ <= wx.SCREEN.width * wx.SCREEN.width){
                        //5
                        robot._nextDecisionTime = GetCurTime() + wx.random_range(0.5,1.0) * 1000;
                        randomChoice = Math.round(wx.random_range(0,2));
                        if(randomChoice == 0){
                            var moveDirection = cc.pNormalize(cc.pSub(this._hero.getPosition(),robot.getPosition()));
                            robot.walkWithDirection(moveDirection);
                        }
                        else{
                            robot.idle();
                        }
                    }

                }
            }

        }
        //end game checker here

    },


});

var GameScene = cc.Scene.extend({
    _gameLayer : null,
    _hudLayer : null,

    onEnter:function () {
        this._super();
        this._gameLayer = new GameLayer();
        this.addChild(this._gameLayer,0);
        this._hudLayer = new HudLayer();
        this._hudLayer._layer = this._gameLayer;
        this.addChild(this._hudLayer,1);
    }
});

