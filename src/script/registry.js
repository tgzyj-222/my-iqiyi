class Registry {
    constructor() {

    }
    init() {

        let $user = $('.phonenum');
        let $userflag = true;
        $user.on('blur', function() {
            $.ajax({
                type: 'post',
                url: 'http://localhost/iqiyi1/php/registry.php',
                data: {
                    username: $user.val()
                }
            }).done(function(result) {
                if (!result) { //不存在
                    $('.unphone').html('√').css('color', 'green');
                    $userflag = true;
                } else {
                    $('.unphone').html('改用户名已经存在').css('color', 'red');
                    $userflag = false;
                }
            });
        });



        $('form').on('submit', function() {
            if ($user.val() == '') {
                $('.nuphone').html('请输入用户名').css('color', 'red');
                $userflag = false;
            };
            if (!$userflag) {
                return false;
            }
        });


    }
}



define([], function() {
    return {
        init: function() {
            new Registry().init();
        }
    }
})