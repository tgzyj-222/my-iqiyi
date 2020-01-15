class Details {
    constructor() {
        //接收sid
        this.id = location.search.substring(1).split('=')[1];

        this.pd_item = $('.pd_item');
        this.count = $('#count');
    }

    init() {

            //将接收的id传给后端。
            $.ajax({
                url: 'http://localhost/iqiyi1/php/getid.php',
                data: {
                    id: this.id
                },

                dataType: 'json'

            }).done((objdata) => {

                $('.pd_tit').html(objdata.title)
                    // $('.b_img img').attr('src', objdata.picurl)
                $('h3').html(objdata.title);
                $('.pd_price em').html(objdata.price);
                $('.panel em').html(objdata.shopnum);
                let piclist = objdata.urls.split(',');
                let $strhtml = '';
                $.each(piclist, function(index, value) {
                    $strhtml += `<li id="list"><img src="${value}" /></li>`;
                    $('.b_img img').attr('src', piclist[0]);
                    $('#bf img').attr('src', piclist[0]);
                });

                this.pd_item.html($strhtml)

            });
            //执行添加购物车操作
            this.addcart();
        }
        //添加购物车操作
    addcart() {
        let goodsnum = []; //商品的数量
        let goodid = []; //商品的编号

        //cartnum  catid:本地存储的key值
        function getcookie() {
            if (localStorage.getItem('cartnum') && localStorage.getItem('catid')) {
                goodsnum = localStorage.getItem('cartnum').split(',');
                goodid = localStorage.getItem('catid').split(',');
            }
        }
        $('.pd-btn').on('click', () => {

            getcookie();

            if ($.inArray(this.id, goodid) === -1) { //第一次点击,将id传入，取到数量直接传入
                goodid.push(this.id);
                localStorage.setItem('catid', goodid); //存入id
                goodsnum.push(this.count.val());
                localStorage.setItem('cartnum', goodsnum); //存入数量
            } else {
                let index = $.inArray(this.id, goodid); //当前id在数组中对应的位置
                let newnum = parseInt(goodsnum[index]) + parseInt(this.count.val()); //原来存储的值+当前的值
                goodsnum[index] = newnum; //新的数量
                localStorage.setItem('cartnum', goodsnum); //存入数量
            }
        });
    }
}



class Fdj {
    constructor() {
        this.wrap = $('.pd_text');
        this.spic = $('.b_img');
        this.sf = $('#sf');
        this.bf = $('#bf');
        this.bpic = $('#bpic');
        // this.left = $('#left');
        // this.right = $('#right');
        this.ulmove = $('.pd_item');
        this.list = $('.pd_item li');
    }
    init() {

        //1.鼠标移入移出显示隐藏小放和大放。
        let _this = this;
        this.spic.hover(() => {
            $('#sf').css('visibility', 'visible');
            $('#bf').css('visibility', 'visible');

            //3.求小放的尺寸和比例
            this.sf.css({
                width: this.spic.outerWidth() * this.bf.outerWidth() / this.bpic.outerWidth(),
                height: this.spic.outerHeight() * this.bf.outerHeight() / this.bpic.outerHeight()
            });
            //求比例
            this.bili = this.bpic.outerWidth() / this.spic.outerWidth();

            //2.鼠标在小图中移动，小放跟随鼠标
            this.spic.on('mousemove', (e) => {
                let $l = e.pageX - this.wrap.offset().left - this.sf.width() / 2;
                let $t = e.pageY - this.wrap.offset().top - this.sf.height() / 2;
                if ($l < 0) {
                    $l = 0;
                } else if ($l >= this.spic.outerWidth() - this.sf.outerWidth()) {
                    $l = this.spic.outerWidth() - this.sf.outerWidth() - 2;
                }

                if ($t < 0) {
                    $t = 0;
                } else if ($t >= this.spic.outerHeight() - this.sf.outerHeight()) {
                    $t = this.spic.outerHeight() - this.sf.outerHeight() - 2;
                }

                this.sf.css({
                    left: $l,
                    top: $t
                });

                //大图进行赋值
                this.bpic.css({
                    left: -$l * this.bili,
                    top: -$t * this.bili
                });
            });
        }, () => {
            $('#sf,#bf').css('visibility', 'hidden');
        });


        //4.点击对应的li切换缩放的图片
        //#list ul li:委托的元素
        //$(this):委托的元素。
        this.ulmove.on('mousemove', 'li', function() {
            let $imgurl = $(this).find('img').attr('src');
            _this.spic.find('img').attr('src', $imgurl);
            _this.bpic.attr('src', $imgurl);
        });

    }
}






define([], function() {
    return {
        init: function() {
            new Details().init();
            new Fdj().init();

        }
    }
});