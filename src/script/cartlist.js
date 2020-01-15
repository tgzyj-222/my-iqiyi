class Cartlist {
    constructor() {
        this.itemlist = $('.item-list');
    }
    init() {
        //1.获取本地存储
        // alert(1)
        console.log(localStorage.getItem('catid'));
        console.log(localStorage.getItem('cartnum'));
        if (localStorage.getItem('catid') && localStorage.getItem('cartnum')) {
            console.log(localStorage.getItem('catid').split(','));
            console.log(localStorage.getItem('cartnum').split(','));
            let cid = localStorage.getItem('catid').split(','); //id
            let cnum = localStorage.getItem('cartnum').split(','); //数量
            for (let i = 0; i < cid.length; i++) {
                this.render(cid[i], cnum[i]);
                // alert(1)
            }
        }
    }

    //2.渲染一条数据的方法
    render(id, num) { //id:当前渲染的购物车列表的编号，num:数量。

            $.ajax({
                url: 'http://localhost/iqiyi1/php/cartlist.php',
                dataType: 'json'
            }).done((data) => {
                // alert(3)
                $.each(data, (index, value) => {
                    if (id == value.id) {
                        let $clonebox = $('.goods-item:hidden').clone(true, true);
                        $clonebox.find('.goods-pic img').attr('src', value.picurl);
                        $clonebox.find('.goods-pic img').attr('id', value.id);
                        $clonebox.find('.goods-d-info a').html(value.title);
                        $clonebox.find('.b-price strong').html(value.price);
                        $clonebox.find('.quantity-form input').val(num);
                        $clonebox.find('.b-sum strong').html((value.price * num).toFixed(2));
                        $clonebox.show();
                        $('.item-list').append($clonebox);
                        this.allprice();
                    }
                });
            });
        }
        //计算总价
    allprice() {
        let $goodsnum = 0; //商品的件数
        let $goodsprice = 0; //商品的总价
        $('.goods-item:visible').each(function(index, element) {
            if ($(element).find('input:checkbox').is(':checked')) {
                $goodsnum += parseInt($(element).find('.quantity-form input').val());
                $goodsprice += parseFloat($(element).find('.b-sum strong').html());
            }
        });
        $('.amount-sum em').html($goodsnum);
        $('.totalprice').html('￥' + $goodsprice);
    }

    //全选
    //无法获取元素对象的解决方式
    //1.渲染的下面。
    //2.将事件写入结构中(<div onclick="abc()">12345</div>)。
    //3.事件委托。
    allselect() {
            $('.allsel').on('change', () => {
                $('.goods-item:visible').find('input:checkbox').prop('checked', $('.allsel').prop('checked'));
                this.allprice(); //求和
            });
            let $checkinput = $('.goods-item:visible').find('input:checkbox'); //委托的元素。
            $('.item-list').on('click', $checkinput, () => {
                let $inputs = $('.goods-item:visible').find('input:checkbox');
                if ($('.goods-item:visible').find('input:checked').length === $inputs.length) {
                    $('.allsel').prop('checked', true);
                } else {
                    $('.allsel').prop('checked', false);
                }
                this.allprice(); //求和
            });
        }
        //文本框值的改变
    valuechange() {
            //++
            $('.quantity-add').on('click', function() {
                let $num = $(this).prev('input').val();
                $num++;
                $(this).prev('input').val($num);
                $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this))); //求单价
                local($(this).parents('.goods-info').find('.goods-pic img').attr('id'), $num); //存储数量
            });
            //--
            $('.quantity-down').on('click', function() {
                let $num = $(this).next('input').val();
                $num--;
                if ($num < 1) {
                    $num = 1;
                }
                $(this).next('input').val($num);
                $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));
                local($(this).parents('.goods-info').find('.goods-pic img').attr('id'), $num);
            });
            //直接输入
            $('.quantity-form input').on('input', function() {
                let $reg = /^\d+$/;
                let $inputvlaue = $(this).val();
                if ($reg.test($(this).val())) {
                    if ($inputvlaue < 1) {
                        $(this).val(1)
                    } else {
                        $(this).val($(this).val())
                    }
                } else {
                    $(this).val(1);
                }
                $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));
                local($(this).parents('.goods-info').find('.goods-pic img').attr('id'), $(this).val());
            });
            //封装计算单价
            function singleprice(obj) {
                let $dj = parseFloat(obj.parents('.goods-info').find('.b-price strong').html());
                let $count = parseFloat(obj.parents('.goods-info').find('.quantity-form input').val());
                return $dj * $count.toFixed(2);
            }

            //改变数量--重新本地存储。
            //通过id获取数量的位置，将当前改变的值存放到对应的位置。
            function local(id, value) { //id:当前的索引   value：数量
                if (localStorage.getItem('cartid') && localStorage.getItem('cartnum')) {
                    let arrid = localStorage.getItem('cartid').split(',');
                    let arrnum = localStorage.getItem('cartnum').split(',');
                    let index = $.inArray(id, arrid); //id在数组中的位置索引。
                    arrnum[index] = value;
                    localStorage.setItem('cartnum', arrnum.toString());
                }
            }
        }
        //删除
    delgoods() {
        let arrid = [];
        let arrnum = [];
        let _this = this;

        function getstorage() {
            if (localStorage.getItem('cartid') && localStorage.getItem('cartnum')) {
                arrid = localStorage.getItem('cartid').split(',');
                arrnum = localStorage.getItem('cartnum').split(',');
            }
        }


        //删除本地存储数组项的值。确定删除的索引。
        function delstorage(id, arrid) { //id:删除的索引，idarr:数组   delstorage(3,[2,3,4,5])
            let $index = -1;
            $.each(arrid, function(index, value) {
                if (id === value) {
                    $index = index; //接收索引值。  
                }
            });

            arrid.splice($index, 1);
            arrnum.splice($index, 1);
            localStorage.setItem('cartid', arrid.toString());
            localStorage.setItem('cartnum', arrnum.toString());
        }

        //单条删除
        $('.item-list').on('click', '.b-action a', function() {
            getstorage(); //取出本地存储，转换成数组。
            if (window.confirm('你确定要删除吗?')) {
                $(this).parents('.goods-item').remove();
            }
            delstorage($(this).parents('goods-item').find('.goods-pic img').attr('id'), arrid);
            _this.allprice();
        });


        //删除选中
        $('.operation a').on('click', function() {
            getstorage(); //取出本地存储，转换成数组。
            if (window.confirm('你确定要删除吗?')) {
                $('.goods-item:visible').each(function(index, element) {
                    if ($(this).find('input:checkbox').is(':checked')) {
                        $(this).remove();
                    }
                    delstorage($(this).find('.goods-pic img').attr('id'), arrid);
                });
            }
            _this.allprice();
        });
    }

}




define([], function() {
    return {
        init: function() {
            new Cartlist().init();
        }
    }
})