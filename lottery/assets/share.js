  var title = "一大波西瓜人让你清凉一夏";
  var desc = "马上参与，抓住淘气的西瓜人，赢中国移动A3s手机！";
  var link = "http://lf.tongchuangjob.com/aaa/lottery/index.html";
  var imgUrl = "http://lf.tongchuangjob.com/aaa/3002.jpg";
  var aaa = window.location.href;
  aaa = encodeURI(aaa);
	var params = {
			"from" : aaa,
			"r" : Math.random()
		};
	var apiUrl = "http://lf.tongchuangjob.com/Captcha/pandaCoin/test";
	$.post(apiUrl, params, function(data) {
		if(data.status == 200){
				wx.config({
					debug: false,						  // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: 'wx9b3c36f605349628',          // 必填，公众号的唯一标识
					timestamp: data.time,                 // 必填，生成签名的时间戳
					nonceStr: 'zhuchuanxiao',             // 必填，生成签名的随机串
					signature: data.encode,               // 必填，签名，见附录1
					jsApiList: [
					'onMenuShareAppMessage',
					'onMenuShareTimeline'
					]       // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
		}
	}, "json");

	wx.ready(function () {  
		wx.onMenuShareTimeline({  
		  title: title,  
		  link: link,  
		  imgUrl: imgUrl,  
		  trigger: function (res) {  
		  },  
		  success: function (res) {  
	
		  },  
		  cancel: function (res) {  

		  },  
		  fail: function (res) {  

		  }  
		});  

		wx.onMenuShareAppMessage({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () { 
				// 用户确认分享后执行的回调函数
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}
		});


	  
	  wx.error(function (res) {  
	  });  
	});