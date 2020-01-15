require.config({
    baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/', //设置模块的公共路径
    paths: {
        'jquery': 'jquery/1.12.4/jquery.min',
        'jquerycookie': 'jquery-cookie/1.4.1/jquery.cookie.min',
        'jquerylazyload': 'jquery.lazyload/1.9.1/jquery.lazyload.min'
    }
});


require(['jquery', 'jquerylazyload'], function() {

    let targetpage = $('#currentpage').attr('target-page'); //script/index_module.js
    if (targetpage) {
        require([targetpage], function(targetpage) {
            targetpage.init();
        });
    }

})