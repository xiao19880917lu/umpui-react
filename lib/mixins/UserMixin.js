/**
 * @file 根据英文名请求详细信息等
 * **/
import $ from 'jquery';
const UserMixin = {
    loadUser() {
        let pageUsers = [];
        $('span[data-type=user]').each(function () {
            pageUsers.push($(this).attr('data-username'));
        });

        $.getJSON('/user/data', {users: pageUsers}, function (res) {
            if (res.status.toString() === '0') {
                $.each(res.data, function (k, v) {
                    $('span[data-username=' + v.name + ']').html('<a title="姓名：' + v.username + '\n邮箱：' + v.name + '@baidu.com\n手机号：' + v.mobile + '\n分机：' + v.tel + '">' + v.username + '</a>' + ' ');
                });
            }
        });
    }
};

export default UserMixin;
