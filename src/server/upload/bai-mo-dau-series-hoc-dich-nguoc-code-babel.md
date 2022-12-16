Hello!

**Dịch ngược code Babel** là tên một phương pháp do mình đặt tên, đại ý là đọc code của các file JS đã được Babel build ra trên các website, rồi sau đó viết lại nó, có thể coi là "decode" Javascript. Đây là trường phái khá mới mẻ, có lẽ cũng không có nhiều lập trình viên đang đi theo con đường này. Đây là con đường đầy chông gai, nhưng một khi vượt qua những trở ngại bước đầu thì phần thưởng dành cho người can đảm là rất xứng đáng. 

![](https://images.viblo.asia/e195b7cc-e640-4240-8a36-721fa544fa0d.jpg)


Vậy phương pháp "Dịch ngược code Babel" sẽ mang lại cho bạn lợi ích gì? Đây là một số điều mà bạn sẽ thu được:
* Tiếp cận những thứ tinh túy nhất của thế giới lập trình Javascript, phá vỡ rào cản, giúp bạn đọc code chưa build hay đã build đều như nhau
* Nâng cấp những kiến thức kiến thức vốn có lên một tầm mới, kiểm chứng những kiến thức cũ, loại bỏ những thứ sai và kém hiệu quả ra khỏi đầu
* Nếu bạn thấy thích một phần nào của website ABC nào đó, bạn sẽ viết lại được phần đó
* Rèn luyện trí nhớ, tính tỉ mỉ, tư duy logic trong lập trình
* và rất nhiều thứ hay ho khác, ...

Với rất nhiều lợi ích như vậy, thì có lẽ không có lý do gì chúng ta không nên bắt đầu tìm hiểu nó cả. Vậy vì sao mà vẫn chưa có nhiều người theo đuổi con đường này? và đây là một số lý do:
* Khó: đúng vậy, nó rất khó, nhưng không phải là quá khó để bắt đầu.
* Mất nhiều thời gian: bạn phải chấp nhận việc dành thời gian rảnh lao đầu vào nghiên cứu nó, nếu muốn đi theo con đường này

Một điều để các bạn yên tâm hơn mà đọc series này đó là mình sẽ là người chỉ dẫn cho các bạn phương pháp tìm hiểu, sẽ không có bất cứ vấn đề nào khó ở đây cả, vấn đề còn lại chỉ là bạn có đủ kiên nhẫn để theo nó không thôi.

**Đặc biệt**: Trong series này mình sẽ code thực chiến một số Component của Facebook, Twitter, Microsoft (Stykpe web), Slack (web), ... và bất cứ một component nào của một website nào. Đến nay mình đã viết lại hầu hết toàn bộ component của Facebook web, và đang dùng nó cho các dự án thực tế của mình. Mình sẽ giới thiệu một số component trong nà. Bạn sẽ được tiếp cận nhiều phong cách và triết lý code của những team chuyên nghiệp nhất và học hỏi được rất nhiều điều từ họ.

Với cá nhân mình, phương pháp này đã thay đổi hoàn toàn tư duy và phong cách code của mình theo hướng tích cực hơn. Và mình mong muốn chia sẻ điều này đến các bạn, mình muốn xây dựng một cộng đồng để cùng nhau nghiên cứu tất cả những thứ hay ho, vì vậy hãy liên hệ với mình theo thông tin ở cuối bài viết nhé!

Nếu bạn cần tìm hiểu thêm về lý do vì sao mình lại bắt đầu chia sẻ series này, có thể đọc nó [**tại đây**](https://viblo.asia/p/lo-trinh-2-nam-de-tro-thanh-lap-trinh-vien-reactjs-chuyen-nghiep-gDVK24xvlLj). Còn bây giờ, bắt đầu thôi!

## Một vài requirements
Để học tốt phương pháp này, bạn cần một vài thứ sau:

### Kiến thức về Javascript nâng cao
Bạn cần thành thục Javascript ở mức độ nhất định, không yêu cầu quá cao siêu nhưng nếu bạn mới viết Javascript được vài tháng thì có lẽ không phù hợp series này.

### React cơ bản
Mặc dù phương pháp này không phân biệt, nhưng mình sẽ sử dụng chủ yếu bằng React, chỉ yêu cầu ở mức độ vừa phải. Chỉ cần làm vài dự án React rồi có lẽ là đủ. Nhưng nếu bạn chưa học React thì series này cũng không phù hợp

### Babel và các plugins của nó
Chắc chắn Babel là thứ quan trọng nhất, bạn cần phải biết cơ bản về Babel trước, sau đó là đến các Plugins của nó mà hay được dùng nhất, biết càng nhiều càng tốt, còn nếu chưa biết thì trong quá trình học sẽ tìm hiểu dần cũng không sao cả.

### Webpack và các plugins của nó
Giống mục trên

## Nguồn code để học
Series này mình chủ yếu chia sẻ về các component của Facebook, Twitter, Skype, Slack, mà phần lớn nhất là tập trung ở Facebook, nên nguồn code chủ yếu là các file JS của trang https://facebook.com. Ví dụ đoạn sau đây sẽ là một nguồn để làm tư liệu học:

```javascript
__d("CometHovercardTrigger.react", ["CometRelay", "React", "useBaseHovercardTrigger", 
	"useCometRelayEntrypointContextualEnvironmentProvider"], (function(a, b, c, d, e, f) {
	"use strict";
	e.exports = a;
	var g = b("React"),
		h = {};

	function a(a) {
		var c = a.popoverEntryPoint,
			d = a.popoverOtherProps;
		d = d === void 0 ? h : d;
		var e = a.popoverProps;
		a = babelHelpers.objectWithoutPropertiesLoose(a, ["popoverEntryPoint", "popoverOtherProps", "popoverProps"]);
		var f = b("useCometRelayEntrypointContextualEnvironmentProvider")();
		f = b("CometRelay").useEntryPointLoader(f, c);
		c = f[0];
		var i = f[1];
		f = b("useBaseHovercardTrigger")(babelHelpers["extends"]({}, a, {
			onLoadEntryPoint: function() {
				return i(e)
			}
		}));
		a = f[0];
		return a(g.jsx(g.Fragment, {
			children: c != null && g.jsx(b("CometRelay").EntryPointContainer, {
				entryPointReference: c,
				props: d
			})
		}))
	}
}), null);
```

Bạn có thể khá confuse khi nhìn vào đoạn code trên, nhưng hãy yêu tâm, qua hết series này của mình thì bạn sẽ hiểu hết toàn bộ đoạn code trên và cảm thấy nó cũng chả khác gì những thứ mà bạn vẫn đang viết hàng ngày cả.

[**Repo này**](https://github.com/ladifire-opensource) gồm một số mã được tải từ Facebook, nhằm mục đích nghiên cứu và học tập.

Một số trong này đã được mình phân loại, nhưng sẽ không được lưu đầy đủ, vì việc lưu chúng cũng không cần thiết, thiếu module nào ta có thể dễ dàng tải được từ Facebook. Một số trong này cũng rất lộn xộn, vì đụng đâu mà mình thấy cần lưu thì mình sẽ lưu, chứ không hề phân loại ra. Mục đích chỉ là để cá nhân mình đọc và viết lại thôi, còn trong quá trình viết lại thì gần như là mình sẽ truy cập Facebook để xem đúng mã nguồn mới nhất.

Lời khuyên cho các bạn muốn nghiên cứu đống mã nguồn này: "Hãy đọc chúng hàng ngày, mỗi khi rảnh hãy lôi ra đọc. Trước khi đi ngủ, mở chúng ta và đọc. Đọc mãi thì sẽ thành quen và hiểu dần."

Gần như toàn bộ mã trong này mình đều đã viết lại hết, không toàn bộ nhưng khoảng 80%, mình vẫn đang sử dụng chúng cho các dự án của mình. Mình cũng hi vọng sắp tới sẽ opensource được càng nhiều càng tốt.

## Thông tin liên hệ
Mình sẽ support cho những bạn đi theo series này của mình tại 2 kênh:
1. Facebook cá nhân của mình: [**Cong Nguyen**](https://www.facebook.com/congnguyen020/)
2. Group nhỏ của mình: [**Cộng đồng Stylex**](https://www.facebook.com/groups/713597106002279)

## Tạm kết
Bài này chỉ nhằm mục đích giới thiệu, từ bài sau trở đi chúng ta mới bắt đầu đi sâu vào thế giới những thứ khó nhằn nhưng cũng rất dễ gây nghiện của lập trình. Hãy chuẩn bị nhé bạn! Hẹn gặp lại bạn ở bài tiếp theo!