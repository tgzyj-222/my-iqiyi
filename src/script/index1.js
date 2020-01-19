class Index {
    constructor() {
        this.context = $('.context')
    }
    init() {
        this.render();
        this.dl();
        this.tab();
        this.banner()
    }
    render() {
        $.ajax({
            url: 'http://localhost/my-iqiyi/php/index1.php',
            dataType: 'json'
        }).done((data) => {
            let $strhtml = '<ul class="product_item">';
            for (let value of data) {
                $strhtml += `
                            <li class="col">
                                <div class="productinfo">
                                    <a href="details.html?id=${value.id}"> 
                                        <img src="${value.picurl}" class="product_imgs">
                                    </a>
                                    <div class="product_tcho">
                                        <p class="producttitle">${value.title}</p>
                                        <p class="subtitle">
                                            <span class="tospan1"><em>${value.explain}</em></span>
                                            <span class="tospan2">${value.introduce}</span>
                                        </p>
                                        <p class="productdesc">
                                            <span class="tospan3">￥${value.price}</span>
                                            <span class="tospan4">已售：${value.shopnum}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        `;
            }
            $strhtml += '</ul>';
            this.context.html($strhtml);

        });
    }

    dl() {
        if (localStorage.getItem('username')) {
            $('.login').hide();
            $('.admin').show();
            $('.queit').show();
            $('.admin').html(localStorage.getItem('username'))
        }
        $('.queit').on('click', function() {
            $('.login').show();
            $('.admin').hide();
            $('.queit').hide();
            localStorage.removeItem('username');
        });
    }



    tab() {
        let conunt = 0;
        let $topli = $('#ri_top li')
        $('.arrow').on('click', function() {
            count++;
            if (count % 2) {
                $('#ri_top li:eq(0)').addClass('top1').siblings('$topli').removeClass('top1');
            } else {
                $('#ri_top li:eq(1)').addClass('top1').siblings('$topli').removeClass('top1');
            }

        })
    }


    banner() {
        let $baidu = $('#banner');
        let $picli = $('.piclist li');
        let $btnli = $('.btnlist li');
        let $left = $('#left');
        let $right = $('#right');
        let num = 0; //当前点击的索引
        let $piclilength = $picli.size();
        let timer = null;

        $btnli.on('click', function() {
            num = $(this).index();

            tabswitch();
        });
        $right.on('click', function() {
            num++;
            if (num > $piclilength - 1) {
                num = 0;
            }
            tabswitch();
        });
        $left.on('click', function() {
            num--;
            if (num < 0) {
                num = $piclilength - 1;
            }
            tabswitch();
        });

        function tabswitch() {
            $btnli.eq(num).addClass('active').siblings($btnli).removeClass('active');
            $picli.eq(num).animate({ opacity: 1 }).siblings($picli).animate({ opacity: 0 });
        }
        timer = setInterval(function() {
            $right.click();
        }, 3000);

        $baidu.hover(function() {
            clearInterval(timer);
        }, function() {
            timer = setInterval(function() {
                $right.click();
            }, 3000);
        });
    }

}





export {
    Index
}