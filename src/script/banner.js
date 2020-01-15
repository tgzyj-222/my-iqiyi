class Banner {
    constructor() {
        // this.banner = $('#banner'); //大盒子
        // this.btns = $('.btnlist li'); //小按钮
        // this.pics = $('.piclist li'); //图片
        // this.arrowright = $('#right'); //右
        // this.arrowleft = $('#left'); //左
        // this.index = 0; //存储索引。
        // this.timer = null;
    }
    init() {

        var index = 0;
        /*当鼠标放到顺序按钮上时：
        1.将当前这个顺序按钮增加样式为红色背景
        2.移除周围其他同级元素红色背景样式
        3.获取当前顺序按钮的index
        4.通过index获取该位置图片
        5.一秒钟渐入该图片
        6.一秒钟渐出其他相邻图片
        7.防止移动过快导致的效果闪现，使用stop方法
        */
        $(".btnlist").mousemove(function() {
            $(this).addClass("current").siblings().removeClass("current");
            index = $(this).index();
            $(".piclist li").eq(index).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
        });
        /*设置每一秒钟自动轮播：
        1.获取当前位置序号：自加操作；当超过图片最大序号时序号设置为0
        2.设置下侧顺序按钮及轮播图显示
        */
        var time = setInterval(move, 1000);

        function move() {
            index++;
            if (index == 7) {
                index = 0
            }
            $(".btnlist li").eq(index).addClass("current").siblings().removeClass("current");
            $(".piclist li").eq(index).stop().fadeIn(3000).siblings().stop().fadeOut(3000);
        };
        /*当鼠标划入、划出轮播图区域时：
        1.划入时停止自动轮播
        2.划出时继续自动轮播
        */
        $("#banner").hover(function() {
                clearInterval(time);
            },
            function() {
                time = setInterval(move, 1000);
            });
        /*点击右侧按钮时执行*/
        $("#right").click(function() {
            move();
        });
        /*点击左侧按钮时执行*/
        function moveL() {
            index--;
            if (index == -1) {
                index = 7
            }
            $(".btnlist li").eq(index).addClass("current").siblings().removeClass("current");
            $(".piclist li").eq(index).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
        }
        $("#left").click(function() {
            moveL();




        });
    }
}