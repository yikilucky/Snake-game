// 定义食物类
class Food{
    element:HTMLElement;
    constructor(){
        //获取dom并赋给element
        this.element=document.getElementById('food')!; // ！是非空断言操作符
    }

    //获取食物x轴坐标的方法
    get X(){
        return this.element.offsetLeft;
    }

    //获取食物y轴坐标的方法
    get Y(){
        return this.element.offsetTop;
    }
    
    //修改食物位置的方法
    change(){
        //生成随机位置
        //食物的最小位置是0 最大是290
        // 蛇移动一次就是一格，一格的大小就是10，所以就要求食物的坐标必须是整十
        let left = Math.round(Math.random()*29) * 10;
        let top = Math.round(Math.random()*29) * 10;
        this.element.style.left=left+'px';
        this.element.style.top=top+'px';
    }
}
export default Food;