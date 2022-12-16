![](https://images.viblo.asia/dd57a97d-448b-40a5-aae7-412a89116ef3.png)
Trên thị trường framework JS hiện nay có rất nhiều điển hình như: Angular(được hỗ trợ bởi google), React(được hỗ trợ bởi Facebook),... Ngoài ra một trong số đó nữa không thể kể đến là VueJS. 
# 1.Giới thiệu
Vue là một framework Javascript hiện nay rất nhiều nhà phát triển dùng để xây dựng giao diện người dùng. Thư viện của Vue là VueJS chỉ tập trung vào lớp hiển thị, rất đơn giản để tiếp cận và dễ dàng tích hợp vào các hệ thống web.

Ngoài ra Vue cũng có khả năng cung cấp làm "Single Page Application" cho chúng ta kết hợp kết hợp nhiều các ngôn ngữ back-end khác như PHP,...Mặc dù mới chào làng vào năm 2015 nhưng VueJS cũng đã sớm khẳng định được tên tuổi của mình, vì thế mà framework back-end Laravel đã tích hợp sẵn VueJS trong đó.
# 2.Mô hình MVVM
![](https://images.viblo.asia/a5f04f64-e3fc-40e1-9ebc-5116b688450b.jpg)
Đầu tiên chúng ta sẽ tìm hiểu mô hình MVVM xem nó là cái gì nhé. Thứ nhất đây là mô hình mà VueJS áp dụng, nó là sự kết hợp của (Model-View-ViewModel) với 3 đối tượng tham gia chính là Model, View, ViewModel. Chúng ta có thể hiểu View có thể là bất kỳ thành phần nào trong HTML, còn gọi là DOM. Model là một đối tượng thuần thúy trong Javascript. Còn ViewModel là một instance của Vue class, hay nói một cách khác nó là cầu nối giữa View và Model. Lấy một ví dụ đi cho nó dễ hiểu
```HTML
<!DOCTYPE html>
<html>
<head>
	<title>Ví dụ thứ hai về Vue.js - All Laravel</title>
</head>
<body>
	<div id="app">
		<label for="name">My name:</label>
  		<input type="text" v-model="name"/>
        <p>{{ name }}</p>
	</div>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.5/vue.min.js"></script>
	<script type="text/javascript">
		var myViewModel = new Vue({
			el: '#app',
			data: {
                name: "Nguyễn Hoàng"
            }
		});
	</script>
</body>
</html>
```

Khi chúng ta chạy chương trình thì giá trị của name khai báo trong thuộc tính data của Vue instance có cả trong thẻ ô input và trong thẻ p. Và khi chúng ta thay đổi giá trị trong ô input thì giá trị của name trong thẻ p cũng thay đổi theo. Đây chính là ví dụ minh họa thực hiện chức năng 2 chiều của ViewModel.
# 2. Vue instance && Directive
Khi ta học về VueJS thì chúng ta không thể không nhắc Vue instance, nó khá là quan trọng cho những ai mới bắt đầu học. Chúng ta sẽ đi lần lượt tìm hiểu các thuộc tính của nó và các directive. Mình sẽ đưa ra một ví dụ nho nhỏ để nói về 2 vấn đề này nhé.
Bây giờ chúng ta sẽ làm một site nho nhỏ có chức năng là hiển thị sản phẩm, thêm vào giỏ hàng, checkout.
Source code các bạn có thể dowload tại đây: https://github.com/pipinamngua/demoEcommerceVueJS.git

## 2.1 Vue instance
Đầu tiên chúng ta có cấu trúc thư mục đơn giản của project như sau :
![](https://images.viblo.asia/3ec6523b-e71b-43bd-bf6a-501cf243f6f3.png)

Đầu tiên chúng ta mở file `js/app.js`:
```Javascript
new Vue({
    el: '#app',
    data: {
        isShowingCart: false,
        cart: {
            items: []
        },
        isCheckout: false,
        products: [
            {
                id: 1,
                name: 'MacBook Pro (15 inch)',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 2999,
                inStock: 50
            },
            {
                id: 2,
                name: 'Samsung Galaxy Note 7',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 299,
                inStock: 755
            },
            {
                id: 3,
                name: 'HP Officejet 5740 e-All-in-One-printer',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 149,
                inStock: 5
            },
            {
                id: 4,
                name: 'iPhone 7 cover',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 49,
                inStock: 42
            },
            {
                id: 5,
                name: 'iPad Pro (9.7 inch)',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 599,
                inStock: 0
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 19,
                inStock: 81
            }
        ]
    }
});
```
**data property**: đây là thuộc tính để cho Vue instance khai báo các biến (hoặc object) và giá trị của nó. Một tips cho các bạn là cứ khai báo biến (hoặc object) và gía trị mặc định cho nó như 0, '', null. Tại sao chúng ta lại phải làm công việc này, vì nếu như khai báo trong thuộc tính data thì Vue instance sẽ tự động gán 2 hàm là `functionProxyGetter()` và `functionProxySetter()` để phát hiện khi chúng ta muốn gán hoặc lấy giá trị của biến hoặc object. Chúng ta có thể console.log Vue instance ra để thấy được nó tự động gán các hàm proxy cho các biến. Ví dụ chúng ta muốn lấy giá trị products ra xem thì chúng ta có thể  `console.log(vm.$data.products)`. Lúc này Vue instance sẽ tự động gọi đến hàm getter proxy ngay lập tức để lấy được giá trị của products ra. Nếu như chúng ta dùng `vm.products` - đây là cú pháp conventnient proxy function mà Vue tự động có sãn cho chúng ta. Khi chúng ta sử dụng cách gọi này thì phải rất cẩn thận - tức là nếu mà đặt tên products trong thuộc tính data rồi thì ta không nên đặt tên products trong bất cứ computed, methods,...

![](https://images.viblo.asia/2809c3aa-e248-437a-b596-8dfe76ddc40a.png)

**filters property**: đây là thuộc tính các bạn cứ hiểu như là nó sẽ làm nhiệm vụ format lại giá trị khi được in ra màn hình cho người dùng xem.
![](https://images.viblo.asia/726507b1-8220-4b42-9544-0ff0cc434284.png)

Trong demo mình có viết 1 hàm mà sẽ format lại giá của sản phẩm, khi chúng ta muốn dùng hàm currency này thì chúng ta sẽ dùng với cú pháp `{{ product.price | currency }}` thì tự động giá trị product.price sẽ được đưa vào hàm currency trong filter và sẽ gen ra giá trị sau khi format xong cho người dùng xem.

**methods property**: khi viết các ứng dụng chúng ta cần có nhiều các phương thức để có thể sử dụng lại được ở nhiều nơi. Để làm được điều này thì chúng ta sẽ viết các hàm trong thuộc tính methods của Vue instance.

![](https://images.viblo.asia/17fe3f4c-e601-4c99-82e6-049a7a9df417.png)

Các phương thức này có thể được gọi qua các drective `v-on, v-submit,...`

**computed property**: đây là thuộc tính sẽ tính toán lại những biến hoặc object được khai báo trong thuộc tính data mỗi lần render lại. Hay nói một cách khác nó cho phép khai báo các phương thức trả về giá trị giống như methods nhưng chỉ tính toán lại khi có thay đổi, còn các phương thức trong methods thì luôn được tính toán lại mỗi lần gọi. Ở trong ví dụ này mình viết hàm để tính toán lại tổng giá trị sản phẩm trong giỏ hàng và tổng số lượng sản phẩm mỗi khi người dùng thêm vào giỏ hàng.

![](https://images.viblo.asia/cf7894cb-3c33-464d-85e8-679e8bbb0833.png)

## 2.2 Directives
Một directive trong Vue được bắt đầu bằng `v-` để chỉ rõ rằng đây là thuộc tính riêng do Vue cung cấp, đồng thời thuộc tính này sẽ áp dụng một hành vi đặc biết lên kết quả DOM được render ra.

**v-text**: truyền 1 đoạn text vào thẻ
```Javascript
<div v-text="Xin chao ban"></div>
```
Sau khi gen ra sẽ được:
```Javascript
<div>
    Xin chao ban
</div>
```
Một điều đặt ra khi chúng ta truyền vào đoạn text có chứa các thẻ trong đó thì `v-text` sẽ in ra luôn chứ không nhận biết được. Vì thế chúng ta cần dùng `v-html`.

**v-html**: đây là drective bind 1 đoạn text trong đó có chứa các thẻ, Vue sẽ tự động hiểu để gen ra.
```Javascript
<div v-html="<p>Xin chao ban</p>"></div>
```
Sau khi gen ra thì các bạn sẽ được:
```HTML
<div>
    <p>Xin chao ban</p>
</div>
```
**v-model**: thường xuất hiện trong thẻ input(ta viết như thuộc tính của thẻ input). Trình biên dịch khi xử lý đoạn mã này nó sẽ biết v-model là câu lệnh nhằm chỉ thị gán giá trị đối tượng 

```HTML
<div id="app">
    <input type="text" v-model="name" />
    <p>{{ name }}</p>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            name: ''
        }
    });
</script>
```
 Khi chúng ta điền vào ô input thì tự động dòng text dưới ô input sẽ tự động fill theo. Thực chất cơ chế của nó là như này `v-model="name" - @input="name == $event.target.value"` Vue sẽ sử dụng event .change để bắt lấy khi chúng ta nhập cái gì thì sẽ cập nhật giá trị vào ngay biến.

Ngoài ra `v-model` có một số các option cho chúng ta tùy chọn nữa các bạn có thể tham khảo
* v-model.lazy : sẽ đồng bộ giá trị input với dữ liệu sau sự kiện change của input.
* v-model.number: cast giá trị từ input nhập vào từ kiểu string thành kiểu số.
* v-model.trim: tự động loại bỏ khoảng trắng trước và sau giá trị trong input.

Các bạn chú ý rằng sẽ bỏ qua các giá trị khởi tạo của các thuộc tính value, checked hoặc selected trong mọi phần tử của form. Nó luôn xem data trong đối tượng Vue là nguốn đáng tin duy nhất. Chúng ta nên khai báo các giá trị khởi tạo trong JS, bên trong option data của component.

**v-bind**: câu lệnh tham số, tức là chúng ta muốn truyền giá trị cho thuộc tính của thẻ thì ta sẽ sử dụng với cú pháp `v-bind:<tên_thuộc_tính>`
```HTML
<td class="btn btn-primary" colspan="3" v-bind:style="float=right">
    <button @click="checkout">Checkout</button>
    //checkout là 1 methods trong thuộc tính methods của Vue.
</td>
```
Chúng ta có thể viết tắt `v-bind:style` thành `:style`.

**v-on**: đây là drective sử dụng để kích hoạt các events trong Javascript với các phần tử HTML.

```HTML
<div class="text-right pull-right cart-info">
     <span class="stats">{{ totalItemCart }} <template v-if="cart.items.length < 2">item</template> <template v-else>items</template> in cart, totalling {{ totalPriceCart | currency }}</span>
     <button class="btn btn-primary" v-on="isShowingCart = true">View Cart</button>
</div>
```

Chúng ta cũng có thể viết tắt `v-on` thành `@click` Vue cũng hiểu được hết. Ngoài ra `v-on` còn có thêm các option khác để chúng ta dễ tùy chọn để thay đổi sự kiện gốc như sau:
* v-on.stop
* v-on.prevent
* v-on.capture
* v-on.self
* v-on.once
Các bạn có thể tham khảo thêm trong [doc Vuejs](https://vuejs.org/v2/guide/events.html).

**v-if, v-else-if, v-else**: đây là những drective điều kiện, nhằm dùng muốn cho các tag nào được hiện ra hoặc ko hiện ra cho người dùng xem
![](https://images.viblo.asia/5e686a3d-0e0d-4906-9003-62d9124e8edd.png)

**v-show**: khác với `v-if` ở chỗ `v-show` render tất cả các phần tử html và sau đó các phần tử này hiên thị hay không thông qua thuộc tính CSS `display:none` haowcj không có thuộc tính này.

**v-for**: đây là directive dùng để lặp các phần tử trong một mảng.
````HTML
<div v-for="n in 10">
    <p>{{ n }}</p>
</div>
````
Trong khi lặp các bạn nên bind thêm thuộc tính key.
````HTML
<div v-for="n in 10" :key="n">
    <p>{{ n }}</p>
</div>
````

Ngoài dùng `n in 10` các bạn còn có thể dùng `n of 10`.

**v-cloak**: dùng để hiển thị phần tử trong một thời gian cố định, tức là vào trang web sẽ không hiển thị phần tử này ngay mà sau khoảng 1 khoảng time sẽ hiện thị. Khi kết hợp với CSS `display: none` nữa thì sẽ hiệu quả hơn.




# 3. Một chút lan man

![](https://images.viblo.asia/5caec3fb-7bab-48c7-bdda-67e390083fe0.png)

Đây là sơ đồ mình có tham khảo được, nó nói về quá trình khi chúng ta thao tác với dữ liệu trong thuộc tính data của Vue instance. Mình sẽ giải thích sơ đồ này một chút. Đầu tiên khi chúng ta gán giá trị mới cho một variable hoặc object trong thuộc tính data của Vue instance thì hàm đầu tiên được gọi là hàm setter. Nó sẽ set giá trị mới và sau đó thông báo cho watcher - cái mà được đính kèm với Vue instance để theo dõi những sự thay đổi giá trị của variable hoặc object trong data. Tiếp theo watcher sẽ kích hoạt re-render được gọi bởi render function. Hay nói một cách khác hàm này có chức năng re-render lại Vue instance hoặc component. Sau đó Virtual DOM được cập nhật lại, giá trị mới sau khi gán được hiển thị ra cho người dùng xem đó chinh là khi hàm getter của thuộc tính data được kích hoạt.

Bây giờ chúng ta sẽ có một ví dụ như này nhé. Trường hợp đầu tiên chúng ta sẽ có variable name trong data property. 
```Javascript
var vm2 = new Vue({
	el:'#app-2',
  data: {
  	x : 1,
    message: "Hoang"
  },
  methods: {
  	output: function () {
    	alert("Chao mung ban " + message);
    }
  }
});
```
Trường hợp số hai
```Javascript
var vm2 = new Vue({
	el:'#app-2',
  data: {
  	x : 1
  },
  methods: {
  	output: function () {
    	alert("Chao mung ban " + message);
    }
  }
});
vm2.message = "Nguyen Minh Hoang";
```
Thì sau khi bạn chạy nó sẽ báo lỗi như sau :
```Javascript
[Vue warn]: Property or method "message" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.
```
Mình sẽ giải thích chỗ này nhé. Khi chúng ta khai báo message variable trong data property thì Vue sẽ tự động gán các proxy và reactive function. Còn khi chúng ta không khai báo message variable trong data property thì Vue sẽ gán thêm 1 thuộc tính message có giá trị chúng ta set vào trong Vue instance.

![](https://images.viblo.asia/f5032c23-7184-440b-875b-d062470f183e.png)


Và khi đó hàm output vẫn lấy ra được giá trị của message bình thường. Vậy tóm lại chúng ta nên khởi tạo variable trong thuộc tính data của Vue instance nhé.
Một vấn đề nữa đó là sự bất đồng bộ trong hàng đợi thay đổi.
```Javascript
var vm = new Vue({
    el: '#app',
    data: {
        message: "Nguyen Hoang"
    }
});

vm.message = "Hoang"
console.log(vm.$el.textContent); // ket qua : Nguyen Hoang 
// điều này chúng tỏ khi chúng ta thay đổi giá trị biến message trong data nhưng giá trị này vẫn chưa được cập nhật vào DOM
```
Thuộc tính `$el` của Vue instance là chỉ chứa phần tử root DOM mà Vue instance quản lý, là type của nó là một kiểu HTMLElement. Lý do mà output text trong DOM chưa được cập nhật bởi vì the event loop chưa được đánh dấu và kết quả là sự thay đổi của hàng đợi chưa được  "flushed".
```Javascript
Vue.nextTick(function() {
  alert(vm.$el.textContent);
});
// Hàm này được gọi tới Vue đã cập nhât DOM
```

DOM ảo được định như sau :
```Javascript
The virtual DOM is basically an abstraction on top of the DOM that uses custom JavaScript objects. 
```
Hay nói một cách khác nó là một bản sao của DOM thật. Nó thừa hưởng tất cả những gì có ở DOM thật, khi chúng ta thêm một phần tử vào DOM ảo 
Lợi ích khi dùng Virtual DOM:
* Khi có sự thay đổi trong DOM thì chỉ cập nhật lại node thay đổi thôi mà không cập nhật lại cả DOM hay nói một cách khác là nó chỉ update những thành phần nào thay đổi trong DOM.
* Hiệu năng cao hơn
* Là một bản sao của DOM thật nên nó thừa hưởng được những gì mà DOM thật nó đang có.
* Tránh được những rủi ro khi làm trên DOM thật
* ...
# 4.Kết luận
Qua những gì mình tìm hiểu được về VueJS ở trên mong rằng giúp mọi người phần nào có thể hiểu thêm được về VueJS. Các bạn có thể xem thêm code ở repo của mình đã có sẵn trên đầu bài. Cảm ơn các bạn đã đọc bài tìm hiểu của mình.
# 5.Tham khảo
https://vuejs.org/v2/guide/

https://codingexplained.com/coding/front-end/vue-js