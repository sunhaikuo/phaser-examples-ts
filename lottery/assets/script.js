$(function () {
    var $input = $('.input')
    $input.on('click', function () {
        for (let i = 0; i < $input.length; i++) {
            var $obj = $input.eq(i)
            if ($obj.val() == '') {
                $('.bd').eq(i).show()
            }
        }
        var cid = $(this).attr('id')
        console.log(cid)
        $('#' + cid.substr(1, cid.lenght)).hide()
    })
    $input.on('blur', function () {
        for (let i = 0; i < $input.length; i++) {
            var $obj = $input.eq(i)
            if ($obj.val() == '') {
                $('.bd').eq(i).show()
            }
        }
    })
    $('#confirm').on('click', function () {
        var xm = $('#ixm').val()
        var lxfs = $('#ilxfs').val()
        var dz = $('#idz').val()
        if (!(/^1[34578]\d{9}$/.test(lxfs))) {
            alert("手机号码有误，请重填");
            return
        }
        if (xm && lxfs && dz && rewardId != -1) {
            var param = {
                value: rewardId,
                name: xm,
                no: lxfs,
                address: dz
            }
            $.getJSON('http://lf.tongchuangjob.com/Moblie/moblie/saveUserInfo', param, function (data) {
                if (data.result == 'success') {
                    alert('您的信息保存成功，历时将有工作人员与您联系核实信息，请耐心等待！')
                } else {
                    alert('网络错误！')
                }
                console.log(data)
            })
        }
    })
})