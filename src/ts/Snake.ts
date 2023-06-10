class Snake{
    //表示蛇头的元素
    head:HTMLElement;
    bodies:HTMLCollectionOf<HTMLElement>;
    //获取蛇的容器
    element:HTMLElement;
    constructor(){
        this.element=document.getElementById('snake')!;
        this.head=document.querySelector('#snake>div')!;
        this.bodies=this.element.getElementsByTagName('div');
    }

    //获取蛇的坐标
    get X(){
        return this.head.offsetLeft;
    }

    get Y(){
        return this.head.offsetTop;
    }

    //设置蛇的坐标
    set X(value){
        if(this.X===value){
            return;
        }

        if(value<0||value>290){
            throw new Error('蛇撞墙啦！');
        }

        // 因为不能掉头移动，所以要判断键盘是否按了反方向键
        // 如果发生的掉头，让蛇向反方向继续移动
        if(this.bodies[1]&& this.bodies[1].offsetLeft===value){
            //如果value大于旧值X，则说明蛇原本是在向左走
            if(value>this.X){
                value=this.X-10;
            }else if(value<this.X){
                value=this.X+10;
            }
        }
        this.moveBody();
        this.head.style.left=value+'px';
        this.checkHeadBody();
    }

    set Y(value){
        if(this.Y===value){
            return;
        }

        if(value<0||value>290){
            throw new Error('蛇撞墙啦！');
        }

        if(this.bodies[1]&& this.bodies[1].offsetTop===value){
            //如果value大于旧值Y，则说明蛇原本是在向上走
            if(value>this.Y){
                value=this.Y-10;
            }else if(value<this.Y){
                value=this.Y+10;
            }
        }
        this.moveBody();
        this.head.style.top=value+'px';
        this.checkHeadBody();
    }

    //蛇增加身体的方法
    addBody(){
        this.element.insertAdjacentHTML("beforeend",'<div></div>');
    }

    //移动身体方法
    moveBody(){
        /*
        *将后边的身体设置为前边身体的位置
        * 举例子：
        * 第四节 == 第三节的位置
        * 第三节 == 第二节的位置
        * 第二节 == 第一节的位置
        * */
        for(let i=this.bodies.length-1;i>0;i--){
            //获取前边身体位置
            let x=this.bodies[i-1].offsetLeft;
            let y=this.bodies[i-1].offsetTop;
            //将值设置到当前身体上
            this.bodies[i].style.left=x+'px';
            this.bodies[i].style.top=y+'px';
        }
    }

    //检查蛇头是否撞到身体
    checkHeadBody(){
        //获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i=1;i<this.bodies.length;i++){
            if(this.X===this.bodies[i].offsetLeft&&this.Y===this.bodies[i].offsetTop){
                //进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到自己啦！');
            }
        }
    }
}

export default Snake;