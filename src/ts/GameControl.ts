import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";
//游戏控制器，控制其他所有类
class GameControl{
    snake:Snake;
    food:Food;
    scorePanel: ScorePanel;
    direction:string='';
    //创建一个变量来判断游戏是否结束
    isLive:boolean=true;
    // 清除定时器
    timer:number=0;

    constructor(){
        this.snake=new Snake();
        this.food= new Food();
        this.scorePanel=new ScorePanel();

        this.init();
    }

    //游戏的初始化，调用后游戏将开始
    init(){
        document.addEventListener('keydown',this.keydownHandler.bind(this));
        //调用run
        this.run();
    }

    //创建一个键盘按下的回调函数
    keydownHandler(event:KeyboardEvent){
        this.direction=event.key;
    }

    //创建一个控制蛇移动的方法
    //根据方向(this.direction)来使蛇位置发生改变
    run(){
        let X=this.snake.X;
        let Y=this.snake.Y;
        //根据方向修改值
        switch(this.direction){
            case 'ArrowUp':
            case 'Up':
                Y-=10;
                break;
                case 'ArrowDown':
                    case 'Down':
                        Y+=10;
                        break;
                    case 'ArrowLeft':
                    case 'Left':
                        X -=10;
                        break;
                    case 'ArrowRight':
                    case 'Right':
                        X += 10;
                        break;
        }
        this.checkEat(X,Y);
        try{
            //修改X和Y的值
            this.snake.X=X;
            this.snake.Y=Y;
        }catch(e){
            //出现异常进入到catch
            alert((e as Error).message+'GAME OVER!');
            this.isLive=false;
        }
        clearTimeout(this.timer);
        this.isLive&& (this.timer=window.setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30));
    }

    //定义方法检查蛇是否吃到食物
    checkEat(X:number,Y:number){
        if(X===this.food.X&&Y===this.food.Y){
            //重置食物的位置
            this.food.change();
            //增加分数
            this.scorePanel.addScore();
            //蛇要增加一节
            this.snake.addBody();
        }
    }
}

export default GameControl;