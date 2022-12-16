> Trong [phần 1](https://viblo.asia/p/9-thu-thuat-cho-nha-phat-trien-javascript-nam-2019-phan-1-maGK7pAeZj2) tôi có để cập đến một vài thủ thuật nho nhỏ như:  Async / Await, Async control flow, Destructuring & default values, Truthy & falsy values. Trong phần cuối này tôi xin đề cập tới một vài tip nữa, hy vọng sẽ giúp ích cho các bạn.

### 5. Logical and ternary operators 

Một lần nữa, chúng được sử dụng để rút ngắn mã của bạn, giúp bạn tiết kiệm các dòng mã quý giá. Thường thì chúng là những công cụ tốt và giúp giữ cho mã của bạn sạch sẽ, nhưng chúng cũng có thể tạo ra một số nhầm lẫn, đặc biệt là khi xâu chuỗi chúng.

#### Logical operators

Các toán tử logic về cơ bản kết hợp hai biểu thức và sẽ trả về một trong hai `true`, `flase` hoặc giá trị khớp và được biểu thị bằng `&&` , có nghĩa là `and` - cũng như `||`, có nghĩa là `or`. Nào chúng ta hay xem:

```javascript
console.log(true && true) // true
console.log(false && true) // false
console.log(true && false) // false
console.log(false && false) // false
console.log(true || true) // true
console.log(true || false) // true
console.log(false || true) // true
console.log(false || false) // false
```

Chúng ta có thể kết hợp các toán tử logic phía sau các giá trị `truthy` và `falsy`. Khi sử dụng toán tử logic, các quy tắc sau sẽ được áp dụng:

* `&&` : Giá trị `falsy` đầu tiên được trả về, nếu không có giá trị `truthy` cuối cùng sẽ được trả về.

* `||` : Giá trị `truthy` đầu tiên được trả về, nếu không có giá trị nào, thao tác sẽ bằng giá trị `falsy` cuối cùng.

```javascript
console.log(0 && {a: 1}) // 0
console.log(false && 'a') // false
console.log('2' && 5) // 5
console.log([] || false) // []
console.log(NaN || null) // null
console.log(true || 'a') // true
```

#### Ternary operator

Toán tử ternary rất giống với toán tử logic, nhưng có ba phần:

1. Sự so sánh, sẽ là `falsy` hoặc `truthy`.
2. Giá trị trả về đầu tiên, trong trường hợp so sánh là đúng
3. Giá trị trả về thứ hai, trong trường hợp so sánh là sai

Dưới đây là một ví dụ:

```javascript
const lang = 'German'
console.log(lang === 'German' ? 'Hallo' : 'Hello') // Hallo
console.log(lang ? 'Ja' : 'Yes') // Ja
console.log(lang === 'French' ? 'Bon soir' : 'Good evening') // Good evening
```

### 6. Optional chaining

Bạn đã bao giờ có vấn đề truy cập một thuộc tính đối tượng lồng nhau, mà không biết liệu đối tượng hoặc một trong các thuộc tính phụ có tồn tại không? Bạn có thể sẽ kết thúc với một cái gì đó như thế này:
```javascript
let data
if(myObj && myObj.firstProp && myObj.firstProp.secondProp && myObj.firstProp.secondProp.actualData) 
    data = myObj.firstProp.secondProp.actualData
```

Điều này thật tẻ nhạt và có một cách tốt hơn, ít nhất là một cách được đề xuất. Nó được gọi là chuỗi tùy chọn và hoạt động như sau:

```javascript
const data = myObj?.firstProp?.secondProp?.actualData
```

Tôi nghĩ rằng đó là một cách khá hay ho để kiểm tra các thuộc tính lồng nhau và làm cho cách mã sạch hơn.

> Hiện tại, chuỗi tùy chọn không phải là một phần chính thức của javascript. Bạn phải thêm [@babel/plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining) trong `babelrc` của bạn để sử dụng nó.

### 7. Class properties & binding

Các hàm liên kết trong JavaScript là một nhiệm vụ phổ biến. Với việc giới thiệu các hàm mũi tên trong thông số ES6, giờ đây chúng ta có cách auto-binding các hàm với bối cảnh khai báo - rất hữu ích và thường được sử dụng giữa các nhà phát triển JavaScript. Khi các lớp được giới thiệu lần đầu tiên, bạn không còn thực sự có thể sử dụng các hàm mũi tên vì các phương thức lớp phải được khai báo theo một cách cụ thể. Chúng tôi cần liên kết các hàm ở nơi khác, ví dụ như trong hàm tạo (thực hành tốt nhất với React.js). Với cú pháp thuộc tính trong lớp, chúng ta có thể sử dụng lại các hàm mũi tên và nhận được các lợi thế của auto-binding. Chức năng mũi tên bây giờ có thể được sử dụng trong lớp. Dưới đây là một ví dụ với `_increasCount` bị ràng buộc:


```javascript
class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { count: 0 }
    }
    
    render() {
        return(
            <div>
                <h1>{this.state.count}</h1>  
                <button onClick={this._increaseCount}>Increase Count</button>
            </div>
        )
    }
    
    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 })
    }
}
```

Hiện tại, thuộc tính lớp không phải là một phần chính thức của javascript. Bạn phải thêm [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/next/babel-plugin-proposal-class-properties.html)

### 8. Sử dụng parcel

Là một nhà phát triển frontend, bạn gần như chắc chắn đã gặp phải bundling and transpiling code. Trên  thực tế,  trong một thời gian dài webpack được sử dụng để giải quyết vấn đề này. Lần đầu tiên tôi sử dụng webpack trong phiên bản 1, điều đó thật khó khăn. Loay hoay với tất cả các tùy chọn cấu hình khác nhau, tôi đã dành vô số thời gian để cố gắng để bundling và runing. Nếu tôi có thể làm như vậy, tôi không muốn chạm vào nó một lần nữa để không phá vỡ bất cứ điều gì. Một vài tháng trước, tôi đã xem qua [parcel](https://parceljs.org/), nó là cứu cánh ngay lập tức. Nó cũng hỗ trợ một hệ thống plugin, tương tự như `webpack` hoặc `babel` và cực kỳ nhanh. Nếu bạn không biết `parcel`, bạn có thể dùng thử nó ngay!

### 9. Write more code yourself

Đây là một chủ đề tốt, đã có rất nhiều cuộc thảo luận khác nhau về nó. Ngay cả đối với CSS, rất nhiều người có xu hướng sử dụng một thư viện thành phần như bootstrap. Đối với JavaScript, tôi vẫn thấy mọi người sử dụng jQuery và các thư viện nhỏ để validation, sliders, v.v. Mặc dù có thể có ý nghĩa khi sử dụng các thư viện, tôi thực sự khuyên bạn nên tự viết nhiều mã hơn là cài đặt các gói npm một cách mù quáng. Khi có các thư viện lớn (hoặc thậm chí các frameworks), trong đó cả một nhóm đang xây dựng nó, chẳng hạn như `Moment.js` hoặc `datepicker`, sẽ không có ý nghĩa gì khi tự mình thử viết code. Tuy nhiên, bạn có thể viết hầu hết các mã bạn đang sử dụng cho mình. Điều này sẽ cung cấp cho bạn ba lợi thế chính:

1. Bạn biết chính xác những gì đang diễn ra trong mã của bạn.
2. Tại một số điểm, bạn sẽ bắt đầu thực sự hiểu lập trình và cách mọi thứ hoạt động phía bên dưới.
3. Bạn ngăn không cho codebase của bạn bị phình ra.

Ban đầu, việc sử dụng gói `npm` sẽ dễ dàng hơn. Sẽ mất nhiều thời gian hơn để tự thực hiện một số chức năng. Nhưng điều gì sẽ xảy ra nếu gói không thực sự hoạt động như mong đợi và bạn phải chuyển nó sang gói khác, dành nhiều thời gian hơn để đọc cách API của chúng được thiết lập. Khi tự mình thực hiện nó, bạn có thể điều chỉnh nó một trăm phần trăm cho usecase của bạn.
<br>
<br>
Thank for reading! :D

[source](https://levelup.gitconnected.com/9-tricks-for-kickass-javascript-developers-in-2019-eb01dd3def2a)