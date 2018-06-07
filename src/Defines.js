var wx ={};

wx.SCREEN = cc.winSize;
wx.CENTER = cc.p(wx.SCREEN.width / 2,wx.SCREEN.height / 2);


wx.random_range = function(low,high){
    return Math.random() * (high - low) + low;
}


wx.ActionState = {
    kActionStateNone : 0,
    kActionStateIdle : 1,
    kActionStateAttack : 2,
    kActionStateWalk : 3,
    kActionStateHurt : 4,
    kActionStateKnockedOut : 5
}

var BoundingBox = function(){
    this.original = cc.rect(0,0,0,0);
    this.actual = cc.rect(0,0,0,0);

}

function GetCurTime(){
    var time = new Date();
    return (time.getSeconds() * 1000) + (time.getMilliseconds() / 1000);
}
