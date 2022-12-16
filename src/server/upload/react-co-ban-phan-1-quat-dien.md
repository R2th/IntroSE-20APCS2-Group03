Chào các bạn, mình đang tìm hiểu reactJs và học được nhiều thứ rất hay ho từ đó, mình nghĩ nên chia sẻ cùng mọi người, vừa để giúp mình củng cố kiến thức cũng như giúp các bạn mới học tiếp cận react một cách dễ dàng hơn. Ở bài viết đầu tiên này mình cũng sẽ không nói về react là gì, lịch sử hình thành hay sức mạnh thần thánh của nó như thế nào trong thời gian gần đây, các bạn tự mình tìm hiểu nhé, hãy cùng bắt đầu với những khái niệm cơ bản nhất và những vướng mắc khó hiểu mà các bạn có thể gặp trong quá trình tự tìm hiểu react.
# 1.	Components
Để ý một giao diện website (hay layout ) bạn thấy trên đó có rất nhiều thành phần cấu tạo ví dụ : menu, sidebar, content, footer. Trong content thì lại có các item nhỏ  hơn, cứ như vậy chia nhỏ từng thành phần ta có thành phần cha chứa các thành phần con trong đó, Trong react chúng được gọi là component, việc chia nhỏ ứng dụng thành những component riêng lẻ, độc lập làm cho chúng ta dễ dáng sửa chữa, tái sử dụng và dễ quản lý, nói cách khác tất cả những gì hiển thị trên web cũng có thể được định nghĩa như một component.
```
const helloworld = React.createClass ({
    render() {
        return(<p>Hello world !</p>)
    }
})
```
Để tạo một component ta dùng phương thức `createClass` nhận đầu vào là một đối tượng mô tả đặc tính của component. Tiếp theo khi đã sẵn sàng để hiển thị trên page ta dùng phương thức `render`.
# 2.	JSX – Javascript syntax extension
Hiểu đơn giản là một syntax extension của javascript, giúp bạn viết javascript kiểu HTML/XML, có các tag là những lời gọi hàm được định nghĩa trước đó, đôi khi bạn có thể hiểu những tag này là những component. Sau đó nhờ react code chúng sẽ được chuyển đổi dưới dạn HTML và render vào trong DOM. Trong một ứng dụng react không bắt buộc phải dùng JSX, tuy nhiên xem qua ví dụ nhỏ này bạn sẽ thấy sự tiện lợi và dễ hiểu khi sử dụng JSX

Trường hợp không sử dụng JSX
```
React.createElement(‘div’, {className: ‘items’}, 
	‘Hello, this is basic component.’ )
```
Còn sử dụng JSX thì sao
```
<div className=”items”>
	Hello, this is basic component.  
</div>
```
# 3.	Babel
Có thể trong quá trình học bạn bắt gặp khái niệm Babel, và có thể thấy ngay rằng nó chả liên quan gì đến react cả, vì chạy theo thời thế chúng ta code react dùng ES6 javascript, tuy nhiên nhiều browser hiện nay chưa hoàn toàn support  ES6. Vậy Babel là một javascript transpiler, babel sẽ chuyển ES6 qua ES5 để đảm bảo mọi trình duyệt đều hoạt động tốt.
# 4.	Props & State
Trong react có 2 kiểu dữ liệu mà bạn cần phải hiểu rõ đó là Prop và State. Khác biệt giữa hai kiểu này là Prop được truyền theo thứ tự từ component cha xuống component con, và không truyền ngược lại, dữ liệu prop là bất biến. Còn State là dự liệu private, được quản lý bởi chính component chứa State đó.

Thật sự khi mới tiếp cận, để hiểu được hai khái niệm này là rất khó khăn, mình sẽ lấy một ví dụ tượng hình cho các bạn dễ hình dung:

![](https://images.viblo.asia/a57c8c37-2fb1-4406-b62b-348a1ad2e45d.jpg)

Trên tường nhà bạn có một ổ cắm điện được cấp điện từ ngoài vào, và bạn có 1 thiết bị điện ví dụ như quạt, bạn phải cắm phích cắm của quạt vào ổ điện thì quạt mới có thể hoạt động, và khi quạt hoạt động chúng ta đã có một application hoàn chỉnh. Ở đây hãy hiểu điện chính là data, ổ cắm là component cha, và phích cắm là component con nhận data truyền xuống từ component cha (ổ cắm). Các bạn phải để ý thật kỹ chỗ này … chính là chỗ tiếp xúc giữa 2 đầu của phích cắm và 2 lỗ của ổ cắm (Những cái lỗ thường rất nguy hiểm và dễ gây nhầm lẫn :) ). Chỗ đó là nơi truyền dữ liệu giữa hai component với nhau. 

Bây giờ mình sẽ code ví dụ này để các bạn hiểu hơn
```
var dienAm = "Điện âm";
var dienDuong = "Điện dương";

// Tạo phích cắm có 2 chăn cắm
var PhichCam = React.createClass({
    render() {
        return (
            <div>
                <h3>Điện ở chân 1: {this.props.chan1}</h3>
                <h3>Điện ở chân 2: {this.props.chan2}</h3>
            </div>
        );
    }
});

// Ổ điện với 2 lỗ cắm điện
var Odien = React.createClass({
    render(){
        return (
            <div>
                <h1> Ổ cắm LIOA </h1>
                <PhichCam 
                  chan1={this.props.lo1} // chấn 1 cắm vào lỗ 1
                  chan2={this.props.lo2} // chân 2 cắm vào lỗ 2
                />
            </div>
        );
    }
});

// cấp điện cho ổ cắm
ReactDOM.render(<Odien lo1={dienAm} lo2={dienDuong}/>,  document.getElementById("app"));
```
Từ đoạn code trên các bạn có thể thấy component con nhận data từ component cha bằng `this.props` , và props ở đây như là điện vậy, chỉ được truyền 1 chiều từ ổ cắm sang phích cắm để làm hoạt động quạt chứ không thể truyền ngược lại từ quạt sang ổ cắm, và hãy nhớ rằng prop là bất biến (imutable) như kiểu nguồn điện lúc nào cũng ổn định 220V vậy.

Như vậy từ ví dụ và code trên các bạn đã phần nào hiểu được prop trong react như thế nào. Vậy State thì sao ???  Các bạn hãy xem đoạn code dưới đây:
```
var dienAm = "Điện âm";
var dienDuong = "Điện dương";

// Tạo phích cắm có 2 chăn cắm
var PhichCam = React.createClass({
    render() {
        return (
            <div>
                <h3>Điện ở chân 1: {this.props.chan1}</h3>
                <h3>Điện ở chân 2: {this.props.chan2}</h3>
            </div>
        );
    }
});

// Ổ điện với 2 lỗ cắm điện
var Odien = React.createClass({
    
    // Khởi tạo state
    getInitialState() {
        return {
            dienAp: '200V'
        }
    },
    
    dungLiOA () {
      this.setState({
        dienAp: '220V'
      })
    },
    render(){
    
        return (
            <div>
                <h1> Ổ cắm LIOA </h1>
                <button type="submit" onClick={this.dungLiOA}>LIOA</button>
                
                <h2> Điện áp hiện tại là : {this.state.dienAp}</h2>
                
                <PhichCam 
                  chan1={this.props.lo1 + ' Điện áp ' + this.state.dienAp} // chấn 1 cắm vào lỗ 1
                  chan2={this.props.lo2 + ' Điện áp ' + this.state.dienAp} // chân 2 cắm vào lỗ 2
                />
            </div>
        );
    }
});

// cấp điện cho ổ cắm
ReactDOM.render(<Odien lo1={dienAm} lo2={dienDuong}/>,  document.getElementById("app"));
```
Vậy State trong ví dụ trên chỉ thuộc quản lý của một component nhất định, và có thể thay đổi giá trị bằng các hàm ngay bên trong component đó, và để truyền state từ component cha sang component con thì bạn lại truyền theo kiểu props. Kiểu như sau khi tăng điện áp thì lại truyền sang cho quạt qua phích cắm vậy. 
# Kết luận
Như vậy là mình đã giới thiệu cho các bạn một vài khái niệm cơ bản trong react, có thể hơi dài dòng một chút nhưng mình hy vọng qua ví dụ của mình sẽ giúp các bạn mới tìm hiểu về react có cái nhìn đa chiều hơn và dễ dàng hơn trong những bước đi tiếp theo. Cảm ơn các bạn đã theo dõi bài viết của mình. Hẹn gặp các bạn trong các bài viết sau.