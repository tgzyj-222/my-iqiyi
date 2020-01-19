class Login {
    constructor() {

    }
    init() {

        $('.sub').on('click', function() {
            $.ajax({
                type: 'post',
                url: 'http://localhost/my-iqiyi/php/login.php',
                data: {
                    user: $('.username').val(),
                    pass: $('.password').val()
                }
            }).done(function(result) {
                if (result) { //匹配成功
                    location.href = 'index1.html';
                    localStorage.setItem('username', $('.username').val());
                    // console.log(localStorage.getItem());

                } else { //匹配失败
                    $('.password').val('');
                    alert('用户名或者密码错误');
                }
            });
        });
    }
}






export {
    Login
}