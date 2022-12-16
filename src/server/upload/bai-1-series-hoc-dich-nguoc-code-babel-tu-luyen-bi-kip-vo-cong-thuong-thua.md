Hello,

Chúng ta cùng trở lại hành trình chinh phục series "**Học dịch ngược code Babel**" - Đây là series giúp bạn từng bước 
nắm vững được các nguyên tắc và kiến thức cần có để có thể đọc được code Javascript đã được transpile bằng Babel, đã minify. Hay cụ thể hơn là đọc và viết lại code Javascript trên các trang web. Đây quả thực là môn võ công rất khó tu luyện, đến nay tại hạ vẫn chưa gặp được ai khác ngoài mình tu luyện nó. Nhưng như đã quảng cáo ở bài trước, nếu tu luyện xong môn võ công này, các hạ có thể tự tin vác đao đi ngang dọc giang hồ, công lực sẽ tăng lên bội phần. (có thể xem chém gió ở [**bài trước**](https://viblo.asia/p/bai-mo-dau-series-hoc-dich-nguoc-code-babel-4dbZNG1alYM) nếu chưa đọc.)

Cũng nên nhớ rằng: **Nhạc Bất Quần**, **Lâm Bình Chi** khi xưa muốn luyện **Tịch Tà Kiếm Phổ**, **Đông Phương Bất Bại** muốn luyện **Quỳ Hoa Bảo ĐIển** còn phải xuống đao tự cung. Phàm là võ công tuyệt thế thì muốn học phải có hi sinh, không thì khó mà luyện thành được. (Huống chi ở đây tại hạ cũng đâu bắt mọi người phải tự cung trước khi đọc series này?!)

Để tăng tính tò mò và kích thích đồng đạo võ lâm tu luyện cùng, tại hạ quyết định Public thư viện **Virtual Scroll** mà mình đã cover lại của Slack mấy năm trước, trải qua mấy lần nâng cấp đến nay cũng đã ngon lành rồi. Nhưng sẽ được public khi hết series này. Trải qua từng bài trong series, chúng ta sẽ viết từ từ nó, đến cuối cùng thì sẽ có được 1 repo hoàn thiện.

Ưu điểm của cái Virtual scroll này so với những thứ đang Open source hiện tại thì mình cũng đã nói trong [**bài này**](https://viblo.asia/p/lo-trinh-2-nam-de-tro-thanh-lap-trinh-vien-reactjs-chuyen-nghiep-gDVK24xvlLj). Ở đây xin nhắc lại một điểm tâm đắc nhất mà vì sao mình lại yêu thích cái Virtualized list này đến vậy, đó là việc xử lý load ngược (load khi scroll lên phía trên) rất tốt với trường hợp các items có chiều cao thay đổi thường xuyên (các items chứa ảnh, khi mỗi ảnh được load thì chiều cao của item lại thay đổi, dẫn đến position của tất cả items trong list đều bị thay đổi). Có lẽ ngay thời điểm đọc bài này bạn vẫn chưa thể hình dung được tại sao vấn đề lại phức tạp quá vậy, chỉ khi nào bạn implement một trường hợp cụ thể chẳng hạn như một danh sách tin nhắn của cuộc trò chuyện, và khi đó bạn sẽ thấy vấn đề load ngược để **bảo toàn vị trí scroll** sẽ quan trọng và khó khăn đến mức nào, tất nhiên là chỉ trong virtualized list thôi.

![](https://images.viblo.asia/7846f7f1-dc57-4fe6-838a-2f80914eccb8.gif)

Như bạn thấy trong ảnh GIF trên, khi scroll chuột lên phía trên của danh sách, những tin nhắn cũ hơn sẽ được load, mỗi tin nhắn có một chiều cao khác nhau, và như ta đã biết với một virtualized scroll thì chúng ta phải quy định giá trị TOP cho nó trong danh sách:

```html
// Bắt đầu virtualized list
<div style="position: relative; height: 1000px;...">
    // Item 1
    <div style="height: 100px; position: absolute; top: 0; left: 0;...">
        // ...
    </div>
    // Item 2
    <div style="height: 100px; position: absolute; top: 100px; left: 0;...">
        // ...
    </div>
    // Item 3
    <div style="height: 100px; position: absolute; top: 200px; left: 0;...">
        // ...
    </div>
    ...
</div>
```

Như vậy giả sử **Item2** thay đổi chiều cao thành **150px** thì DOM sẽ phải là:

```html
// Bắt đầu virtualized list
<div style="position: relative; height: 1000px;...">
    // Item 1
    <div style="height: 100px; position: absolute; top: 0; left: 0;...">
        // ...
    </div>
    // Item 2
    <div style="height: 150px; position: absolute; top: 100px; left: 0;...">
        // ...
    </div>
    // Item 3
    <div style="height: 100px; position: absolute; top: 250px; left: 0;...">
        // ...
    </div>
    ...
</div>
```

Ta thấy sự khác nhau của 2 đoạn DOM trên là ở đoạn sau, vị trí của các item 2, 3 đã bị thay đổi. Đương nhiên sự thay đổi này sẽ kéo theo việc vị trí của thanh cuộn sẽ bị đẩy đi chỗ khác. Hãy tưởng tượng có đến 100 items cùng thay đổi chiều cao một lúc thì vị trí thanh cuộn sẽ nhảy loạn xạ như thế nào nhỉ? Vì vậy mà chúng ta sẽ cần phải tính toán vị trí Scrollbar để khi có bất kỳ thay đổi nào trên cái DOM kia thì vị trí của thanh cuộn trong Scrollbar vẫn giữ nguyên như cũ. Không được xê dịch một chút nào, vì như vậy sẽ tạo ra cảm giác khó chịu cho người dùng.

Ví dụ về Virtualized list **không đạt** được yêu cầu trên các bạn có thể thử trên **Zalo** sẽ thấy ngay. Khi bạn load ngược các tin nhắn cũ hơn trong hội thoại của Zalo, vị trí con trỏ ngay lập tức vị thay đổi, đấy là Zalo còn chưa sử dụng virtualized scroll đâu đấy.

Slack đã giải quyết khá triệt để vấn đề trên, thuật toán như thế nào thì tạm thời sẽ không nói ra ở đây được, vì chúng ta sẽ phải đi tìm hiểu từ từ mới có thể hiểu được. Ngoài ra dạo gần đây mình quan sát thấy Skype bản web của Microsoft cũng đã giải quyết rất tốt bài toán này. Còn các thư viện Opensource nổi tiếng hiện có như React-Virtualized, Infinitive list, ... thì không thể làm được điều này.

Bắt đầu hack thôi nào!

## Giai đoạn 1: Nghiên cứu và thu thập thông tin cần thiết

Ở giai đoạn này chúng ta sẽ phải nghiên cứu kỹ về cách bố trí component này của Slack, cũng là bước đầu tiên khi bắt đầu RECOVER lại bất cứ component nào sau này.

Đầu tiên, chúng ta cần tìm hiểu sơ bộ về cấu trúc thông qua DOM, inspect cái list sẽ có kết quả như hình dưới đây:

![](https://images.viblo.asia/02bd9005-4b9e-40b2-ae24-f9f7f80827b5.jpg)

Trông cũng không có gì phức tạp nhỉ, nhìn vào DOM thì nó cũng như cái List bình thường thôi nhỉ, đại khái nó sẽ như thế này:

```batch
<List>
    <Scroll position="150">
        <Item1 top="0"/>
        <Item1 top="100"/>
        <Item1 top="200"/>
        ...
    </Scroll>
</List>
```

Bây giờ sang xem **Virtual DOM** xem sao:

![](https://images.viblo.asia/b02dfcbb-1368-4c40-b9b8-96f7d826924a.jpg)

Wow, bắt đầu thấy hoa mắt chóng mặt rồi nhỉ, nói chung là nếu đã xác định nghiên cứu về React thì phải nắm chắc về **VirtualDOM**, như mình đã nói ở trên rồi, chỗ nào cần giải thích thì mình sẽ giải thích, và cái ảnh này thì sẽ được mổ xẻ như sau:

Chỗ này:

```javascript
MessageList forwardRef
    MessageList forwardRef
        MessageList memo
```

Chúng ta cần biết rằng, một Component sẽ được hiển thị trên VirtualDOM theo quy luật sau:

```javascript
import React from 'react';

class Button extends React.Component {
	constructor(props) {
      super(props);
    }
}
```

Sau khi build, nó sẽ trở thành, đại khái:
```javascript
"use strict";

var _react = babelHelpers.interopRequireDefault(require("react"));

var Button = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inheritsLoose(Button, _React$Component);

  function Button(props) {
    return _React$Component.call(this, props) || this;
  }

  return Button;
}(_react["default"].Component);
```

Bạn cần sử dụng [Babel.io](https://babeljs.io/) để thực hành nhé, lưu ý là ở chỗ này mình thiết lập Babel: preset = env, loose = true, force all transform, và thêm 1 plugin là "**@babel/plugin-externel-helper**". [**Xem link này**](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=true&code_lz=JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4AoctAGxQGc64AhAVxhggDs4kAPGJJwAmjZOhgA6AMK5InQfADe5AJBoudGFBYZoACjA4wdAJRxlcS1boswSKAaOmKVuAF9yboA&debug=false&forceAllTransforms=true&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=env%2Creact%2Cstage-3&prettier=false&targets=&version=7.14.2&externalPlugins=%40babel%2Fplugin-external-helpers%407.12.13)

Cũng xin nhắc bạn là bắt đầu từ đoạn này, mọi thứ đã trở nên phức tạp dần, chỉ khi bạn thực sự đam mê và tỉ mỉ thì mới có thể theo được. Hãy đọc đi đọc lại nhiều lần và thực hành theo từng bước mình chỉ dẫn thì chắc chắn bạn sẽ hiểu ra thôi. Nhưng cũng đừng hi vọng là đọc đến đâu hiểu đến đấy được, vì như mình đã nói, đây là những thứ rất khó nhằn.

Câu hỏi đặt ra ở đây là:

> Cái Button kia sẽ hiển thị trên VirtualDOM như thế nào?

Vẫn là Button ư? Câu trả lời chính xác là **hên xui**. Để hiểu lý do tại sao, chúng ta cùng đọc lại lý thuyết về ```displayName``` của ```react```

> The displayName string is used in debugging messages. Usually, you don’t need to set it explicitly because it’s inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component, see Wrap the Display Name for Easy Debugging for details.

Thông thường ```displayName``` sẽ được lấy là tên class hoặc function, nhưng khổ nỗi cái Button kia sau khi build ở chế độ production thì nó có thể sẽ bị minify thành:

```javascript
function xxx(){}
```

Vì thế mà trên ```VirtualDOM``` nó sẽ được hiển thị là ```xxx```.

Đến đây chúng ta đã có được một kiến thức giúp đọc VirtualDOM dễ hơn rồi đúng không? vậy tại sao cái VirtualDOM của Slack lại hiển thị như trên:
```javascript
MessageList forwardRef
    MessageList forwardRef
        MessageList memo
```

Chắc chắn rằng khi viết, nó phải có đoạn khai báo như thế này:

```javascript
class MessageList extends ....

MessageList.displayName = 'MessageList';
```

Dòng ```MessageList.displayName = 'MessageList';``` sẽ đảm bảo tên hiển thị trên VirtualDOM phải là **MessageList**, nhằm mục đích dễ dàng hơn cho Debug thôi.

Cái ```forwardRef```, ```memo``` chắc có lẽ không cần phải giải thích gì thêm đâu nhỉ? Nhưng tại sao lại có 3 cái ```MessageList``` lồng nhau như thế:

Chẳng lẽ là:

```javascript
<MesageList ...{props}>
    <MesageList ...{props}>
        <MesageList ...{props}>
            // ...
        </MesageList>
    </MesageList>
</MesageList>
```

Không! Lý do là vì đoạn trên có sử dụng các Wrapper, HOC như là ```connect``` của ```react-redux```, ```memo``` của react, nên có thể code chỉ là:

```javascript
class _MessageList extends ....
const _MessageListConnected = connect(mapStateToProps)(__MessageList);
const _MessageListWithMemo = React.memo(_MessageListConnected);
_MessageListWithMemo.displayName = 'MessageList';
export default _MessageListWithMemo;
```

Đó cũng chỉ là dự đoán, nhưng không quan trọng lắm, điều quan trọng là chúng ta cần phải hiểu nó như vậy để đơn giản hóa cái VirtualDOM khi nhìn vào thôi, còn cụ thể nó như thế nào thì xem code là ra ngay.

### Lưu mã về để đọc

Khi chúng ta đã có từ khóa là ```MessageList``` rồi, thì việc tìm ra đoạn mã chứa nó thực là dễ dàng. Debug bằng Chrome, chuyển sang tab ```source``` và tìm kiếm nó:

![](https://images.viblo.asia/cae4a99a-c3a0-4656-bc1c-e89f63bf1c92.jpg)

Copy nó, beautify nó và lưu về máy thôi. Thú thực là mình thấy ghét kiểu build config Webpack của Slack, nó làm cho file đích siêu nặng luôn, kích thước của file này có thể tới 10MB nên việc minify nó và đọc nó ở máy cũng khó chịu lắm. Nhưng không còn cách nào khác cả. (Bạn có thể ngồi tỉa code ra thành những file nhỏ hơn để lưu cho dễ mở, dễ đọc.)

Tương tự như trên, lần lượt tải code những phần khác xuống máy. Đôi khi cái file trên sẽ chứa toàn bộ rồi, nên có thể chỉ cần tách nó ra thôi, nhưng cần phải tách ra thật nhỏ để dễ dàng làm việc.

##  Giai đoạn 2: Tìm hiểu về nguyên lý hoạt động của Component, bắt đầu viết lại

Ở bước này, chúng ta sẽ cần phải đọc trong đống code vừa thu được về thật nhiều, nhưng việc đọc nó không hề dễ dàng, vì vậy mà ở đây mình sẽ lấy một ví dụ cụ thể luôn.

Cụ thể ở đây, hãy tìm đến đoạn code của **MesageList** trong file vừa tải về, tách nó ra thì được như này:

```javascript
SHa9: function(e, t, n) {
		"use strict";
		n.d(t, "a", (function() {
			return MessageList
		}));
		var a = n("qAkX"),
			s = n("F294"),
			r = n("ifKl"),
			i = n("4Z3G"),
			o = n("q1tI"),
			c = (n("aK/h"), n("YLnb")),
			l = n("cqtq");
		const d = {
			oldest: void 0,
			latest: void 0,
			startTs: !1,
			startTsOffset: 0,
			highlightKey: void 0,
			requestHistory: r.a,
			reachedStart: !0,
			reachedEnd: !0,
			layout: void 0,
			isFileExpanding: !1,
			onVisibleRowsChanged: r.a,
			onScroll: void 0
		};
		class MessageList extends o.PureComponent {
			constructor(e) {
				super(e), this.onScroll = this.onScroll.bind(this), this.setListRef = this.setListRef.bind(this), this.loadAround = this.loadAround.bind(this), this.loadPre = this.loadPre.bind(this), this.loadPost = this.loadPost.bind(this), this.focus = this.focus.bind(this), this.onListScrolled = this.onListScrolled.bind(this), this.debouncedOnListScrolled = Object(l.a)(this.onListScrolled, 150), this.list = null, this.layout = e.layout || new c.a, this.layout.setAnchor(e.startTs), e.startTsOffset && (this.layout.anchorOffset = e.startTsOffset), this.layout.setStickToBottom(e.reachedEnd), this.state = {
					isLoading: !1
				}
			}
			UNSAFE_componentWillReceiveProps(e) {
				if (!this.list) throw new Error("MessageList needs a ref to List");
				(e.startTs !== this.props.startTs || e.highlightKey && e.highlightKey !== this.props.highlightKey) && (e.timestamps === this.props.timestamps ? this.list.scrollToKey(e.startTs, {
					lazy: !0
				}) : this.layout.setAnchor(e.startTs))
			}
			componentDidUpdate(e) {
				!e.reachedEnd && this.props.reachedEnd && this.layout.setAnchor(!1);
				!!e.isFileExpanding && !this.props.isFileExpanding ? this.layout.setStickToBottom(!1) : this.layout.setStickToBottom(this.props.reachedEnd), this.updateVisibleRows()
			}
			onListScrolled() {
				this.updateVisibleRows()
			}
			onScroll(e) {
				this.layout.setAnchor(!1), this.debouncedOnListScrolled(), this.props.onScroll && this.props.onScroll(e)
			}
			getScrollmark() {
				if (!this.list) return null;
				const e = this.list.getScrollTop(),
					t = this.layout.shouldStickToBottom(e),
					n = this.props.timestamps,
					a = this.layout.findAnchor(n, n, e);
				return {
					mark: a,
					offset: this.layout.getTop(a) - e,
					stickToBottom: t
				}
			}
			setListRef(e) {
				this.list = e
			}
			focus() {
				this.list && this.list.focus()
			}
			loadAround() {
				if (this.state.isLoading) return !1;
				const {
					oldest: e,
					latest: t,
					reachedStart: n,
					reachedEnd: r,
					timestamps: o,
					startTs: c
				} = this.props;
				if (r) return this.loadPre();
				if (n) return this.loadPost();
				const l = t || Object(s.a)(o) || c,
					d = e || Object(a.a)(o) || c,
					u = this.props.requestHistory({
						latest: l,
						oldest: d
					});
				return u && (u.finally((() => i.a.delay(250))).then((() => this.setState((() => ({
					isLoading: !1
				}))))), this.setState((() => ({
					isLoading: "around"
				})))), u
			}
			loadPost() {
				if (this.state.isLoading) return !1;
				const {
					latest: e,
					reachedEnd: t,
					timestamps: n,
					startTs: s
				} = this.props;
				if (t) return !1;
				this.isLoading = !0;
				const r = e || Object(a.a)(n) || s,
					o = this.props.requestHistory({
						oldest: r
					});
				return o && (o.finally((() => i.a.delay(250))).then((() => this.setState((() => ({
					isLoading: !1
				}))))), this.setState((() => ({
					isLoading: "pre"
				})))), o
			}
			loadPre() {
				if (this.state.isLoading) return !1;
				const {
					oldest: e,
					reachedStart: t,
					timestamps: n,
					startTs: a
				} = this.props;
				if (t) return !1;
				const r = e || Object(s.a)(n) || a,
					o = this.props.requestHistory({
						latest: r
					});
				return o && (o.finally((() => i.a.delay(250))).then((() => this.setState((() => ({
					isLoading: !1
				}))))), this.setState((() => ({
					isLoading: "pre"
				})))), o
			}
			updateVisibleRows() {
				if (!this.list) return;
				const {
					start: e,
					end: t
				} = this.list.getVisibleRange(void 0, !1), {
					start: n,
					end: a
				} = this.list.getVisibleRange(void 0, !0);
				this.props.onVisibleRowsChanged(this.props.timestamps.slice(e, t), this.props.timestamps.slice(n, a))
			}
			render() {
				const {
					reachedStart: e,
					reachedEnd: t,
					timestamps: n
				} = this.props;
				return this.props.listRenderer({
					reachedStart: e,
					reachedEnd: t,
					keys: n,
					layout: this.layout,
					onScroll: this.onScroll,
					loadAround: this.loadAround,
					loadPre: this.loadPre,
					loadPost: this.loadPost,
					ref: this.setListRef
				})
			}
		}
		MessageList.displayName = "MessageList", MessageList.defaultProps = d
```

Nếu bạn đã đọc qua bài viết [**Viết một trình đóng gói code tương tự Webpack**](https://viblo.asia/p/viet-mot-trinh-dong-goi-code-tuong-tu-webpack-aWj53jjYl6m) của mình, thì chúng ta sẽ biết, theo cơ chế đóng gói của Webpack thì ```SHa9``` là mã định danh của module này (MessageList). Các tham số e, t, n trong hàm ```SHa9: function(e, t, n) {``` có thể là ```require, module, exports``` được inject từ ngoài global vào.

Như vậy đoạn:
```javascript
n.d(t, "a", (function() {
			return MessageList
		}));
```

...sẽ được hiểu là, chúng ta sẽ export một module có ID = SHa9, và nó chính là component MesageList, nhưng để trỏ đến nó chúng ta phải thông qua thuộc tính **"a"**. Vì nguyên tắc này mà ở dưới bạn sẽ nhìn thấy ```r = n("ifKl")``` rồi lại ```onVisibleRowsChanged: r.a,```.

***Hãy chắc chắn rằng bạn vẫn đang thu nạp được, nếu không, hãy dừng lại một chút và đọc lại vài lần nữa, vừa đọc vừa suy ngẫm thật kỹ!***

Như vậy đoạn này sẽ không còn gì khó hiểu nữa đúng không bạn?:
```javascript
var a = n("qAkX"),
			s = n("F294"),
			r = n("ifKl"),
			i = n("4Z3G"),
			o = n("q1tI"),
			c = (n("aK/h"), n("YLnb")),
			l = n("cqtq");
```

Chẳng qua đại khái chỉ là từ chỗ này mà ra thôi:

```javascript
import React from 'react';
import xxx from 'xxx';
...
```

OK, xử đoạn tiếp theo nào:

```javascript
const d = {
			oldest: void 0,
			latest: void 0,
			startTs: !1,
			startTsOffset: 0,
			highlightKey: void 0,
			requestHistory: r.a,
			reachedStart: !0,
			reachedEnd: !0,
			layout: void 0,
			isFileExpanding: !1,
			onVisibleRowsChanged: r.a,
			onScroll: void 0
		};
```

Nhìn vào thì thấy đơn giản chỉ là định nghĩa một Object thôi, có gì ghê gớm đâu. Nhưng không, chúng ta cần phải hiểu tường tận nó một lần, để lần sau khi nhìn đến là đoán ra ngay.

Hãy tìm xuống đoạn dùng nó:

```javascript
MessageList.defaultProps = d
```

Wow, mọi việc đã sáng tỏ, như vậy đoạn trên thực chất là:

```javascript
const defaultProps = {
	oldest: undefined,
	latest: undefined,
	startTs: false,
	startTsOffset: 0,
	highlightKey: undefined,
	requestHistory: noop,
	reachedStart: true,
	reachedEnd: true,
	layout: undefined,
	isFileExpanding: false,
	onVisibleRowsChanged: noop,
	onScroll: undefined
};

MessageList.defaultProps = defaultProps;
```

Thực ra để truy ra được đoạn trên cũng không dễ dàng, chủ yếu là phải dựa vào kiến thức và chắc chắn phải có kinh nghiệm code mới có thể đọc vị được như vậy. Ở đây cái làm khó chúng ta chắc hẳn là:

```javascript
onVisibleRowsChanged: r.a,
```

Vận dụng kiến thức về Class Component của React, chúng ta nên nhớ rằng: (Ôn lại kiến thức cũ)

> Chúng ta phải thiết lập ```defaultProps``` cho những props mà nó không ```required```, mục đích là tránh trường hợp gây ra lỗi do thiếu props, trong trường hợp người viết code không truyền giá trị cho props, thì giá trị mặc định sẽ được lấy.

Như vậy ```onVisibleRowsChanged``` phải cần 1 giá trị mặc định, mà với phong cách viết ```PropTypes``` của Class Component thì hàm ```noop``` của ```lodash``` chính là hàm rỗng (hàm chẳng làm quái gì cả), hay ```function(){}```.

Cũng như thế chúng ta hiểu ra đoạn này là:

```javascript
import _ from 'lodash';

...

onVisibleRowsChanged: _.noop;
```

Đến đây bạn có thể thở phào nhẹ nhõm, bời vì nếu bạn đọc và hiểu đến đây, tôi xin cam đoan là bạn đã đặt một chân vào lĩnh vực "Dịch ngược code Babel" rồi.

Tiếp theo, đoạn:
```javascript
class MessageList extends o.PureComponent {
	constructor(e) {
		super(e);
		this.onScroll = this.onScroll.bind(this);
		this.setListRef = this.setListRef.bind(this);
		this.loadAround = this.loadAround.bind(this);
		this.loadPre = this.loadPre.bind(this);
		this.loadPost = this.loadPost.bind(this);
		this.focus = this.focus.bind(this);
		this.onListScrolled = this.onListScrolled.bind(this);
		this.debouncedOnListScrolled = Object(l.a)(this.onListScrolled, 150);
		this.list = null;
		this.layout = e.layout || new c.a;
		this.layout.setAnchor(e.startTs);
		e.startTsOffset && (this.layout.anchorOffset = e.startTsOffset);
		this.layout.setStickToBottom(e.reachedEnd);
		this.state = {
			isLoading: !1
		}
	}
}
```

...đã dễ nhằn hơn rồi nhỉ, cõ lẽ cũng không có gì khó hiểu ở đây ngoại trừ ```this.debouncedOnListScrolled = Object(l.a)(this.onListScrolled, 150);```, lúc này bạn sẽ không biêt nó là cái gì cả, nhưng như đã nói, bằng kiến thức và kinh nghiệm thì mình cũng bắt được nó chính là 
```this.debouncedOnListScrolled = _.debounce(this.onListScrolled, 150);``` (hàm ```debounce``` của ```lodash```);

Thực ra nếu sử dụng kiến thức đã giải thích ở trên vẫn có thể suy ra được ```Object(l.a)``` là cái gì, bằng cách lần theo ```l = n("cqtq");``` và trỏ đến thuộc tính "a" xem nó tương đương với hàm nào, thì kết quả cuối cùng vẫn là ra ```debounce``` của ```lodash``` thôi.

```javascript
this.layout = e.layout || new c.a;
```

Đoạn này là gì? tạm thời chưa cần quan tâm, chỉ cần hiểu là ```c.a``` chính là 1 cái class nào đó, chúng ta sẽ tạo ra một instance của nó và gán cho ```this.layout```

Đoạn:

```javascript
e.startTsOffset && (this.layout.anchorOffset = e.startTsOffset);
```

... thì tương đương với:

```javascript
if (props.startTsOffset) {
    this.layout.anchorOffset = props.startTsOffset;
}
```

## Tạm kết

Đến đây thì mặc dù chưa xong MessageList, nhưng bài đã dài quá rồi và mình cũng đã mỏi tay, đói bụng, nên sẽ tạm dừng ở đây. Hi vọng bạn sẽ tự mình hiểu được đoạn còn lại, nếu có phần nào không hiểu thì hãy comment hoặc liên hệ mình, mình sẽ giải thích.

Cách liên hệ thì mình đã nói trong Bài mở đầu rồi!

Thanks you, hẹn gặp lại.