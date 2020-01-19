class Registry {
    constructor() {

    }
    init() {

        let $user = $('input[name="username"]');
        let $userflag = true;
        $user.on('blur', function() {
            $.ajax({
                type: 'post',
                url: 'http://localhost/my-iqiyi/php/registry.php',
                data: {
                    username: $user.val()
                }
            }).done(function(result) {
                if (!result) { //不存在
                    $('.text1').html('用户名正确').css('color', 'green');
                    $userflag = true;
                } else {
                    $('.text1').html('改用户名已经存在').css('color', 'red');
                    $userflag = false;
                }
            });
        });



        $('form').on('submit', function() {
            if ($user.val() == '') {
                $('.text1').html('请输入用户名').css('color', 'red');
                $userflag = false;
            };
            if (!$userflag) {
                return false;
            }
        });



    }

}


export {
    Registry
}