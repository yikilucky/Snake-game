//定义表示记分牌的类
class ScorePanel{
    score:number=0;
    level:number=1;
    scoreEle: HTMLElement;
    levelEle:HTMLElement;
    //设置变量限制等级
    maxLevel:number;
    //设置一个变量表示每多少分升级
    upScore:number;
    constructor(maxLevel:number=10,upScore:number=5){
        this.scoreEle=document.getElementById('score')!;
        this.levelEle=document.getElementById('level')!;
        this.maxLevel=maxLevel;
        this.upScore=upScore;
    }

    //设置加分的方法
    addScore(){
        this.score++;
        this.scoreEle.innerHTML=this.score+'';
        if(this.score%this.upScore===0){
            this.addLevel();
        }
    }

    //提升等级
    addLevel(){
        if(this.level<this.maxLevel){
            this.levelEle.innerHTML=++this.level+'';
        }
    }
}

export default ScorePanel;