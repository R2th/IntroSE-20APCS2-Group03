Xin chào tất cả mọi người! Chắc hẳn ai đã từng học hay mới học thì cũng chẳng bỏ lỡ được mấy seri đầu căn bản nhất của Vue. Ở bài này, chúng ta cùng nhau tìm hiểu về Vue Instance để có thể nhìn sâu và hiểu rõ hơn nhé.
# Vue Instance là gì?

Theo tài liệu [Document](https://vuejs.org/v2/guide/instance.html) của Vue có nói:

> Một số tài liệu kĩ thuật ở Việt Nam dịch “instance” là “thể hiện.” Chúng tôi cho rằng cách dịch này nghe rất lạ tai với người Việt, nên sẽ dịch “instance” là “đối tượng” và giữ nguyên “object” là “object” như trong bản tiếng Anh.

Một ứng dụng Vue luôn được bắt đầu bằng cách khởi tạo một `đối tượng Vue` (Vue instance) sử dụng hàm Vue:

```js
var vm = new Vue({
// các tùy chọn
})
```

Khi một `đối tượng Vue` Instance được khởi tạo, thường bao gồm thông tin:

* `data`: danh sách dữ liệu truyền vào.
* `methods`: danh sách các phương thức xử lí. 

```js
var vue = new Vue({
  el: "#app",
  data: {
   title: 'Vai dieu ve Vue Instance',
   showParagraph: false,
  },
  methods: {
  	show: function() {
    	this.showParagraph = true;
    }
  }
})
```

Bạn có thể xem bản demo đầy đủ tại đây: https://jsfiddle.net/nguyentienquan/7rhd3pjx/ 

Để hiểu rõ hơn về 1 Vue Instance thế nào, bạn có thể tham khảo thêm tại [Document](https://vuejs.org/v2/guide/instance.html) trên trang chủ, hoặc có thể ghé qua bài viết của mình, mình đã có 1 bài nói riêng về [Vòng đời Vue](https://viblo.asia/p/lifecycle-diagram-vuejs-WAyK8QznZxX).

Vậy thì, sau khi đã nắm được `khái niệm Vue Instance`.  Mình đã tự đặt ra cho bản thân mình câu hỏi:
1. Liệu rằng chúng ta có thể tạo nhiều Instance ở trong cùng file được không?
2. Nếu có thể tạo được nhiều Instance, vậy liệu có thể truy cập từ Instance này đến Instance khác được không?

Vì mình mới học Vue nên việc đặt những câu hỏi vậy, sẽ giúp mình hiểu sâu hơn về 1 phần nào đó. Để trả lời 2 câu hỏi trên thì các bạn cùng tìm hiểu rồi cùng mình giải đáp nó ngay ở dưới đây nhé!

# Câu hỏi 1: Có thể tạo nhiều Instance ở trong cùng file được không? (Mutiple VueJS Instance)

Câu trả lời là có.

Để hiểu tại sao lại như vậy, đầu tiên chúng ta sẽ tạo thêm 1 Instance nữa
```js
var vn = new Vue ({
	el: '#app',
  data: {
  	title: 'Vai dieu ve Vue Instance',
    showParagraph: false,
  },
  methods: {
  	show: function() {
    	this.showParagraph = true
    }
  }
});

var jp = new Vue ({
	el: '#app2',
  data: {
  	title: 'Hello World',
  },
});
```
Xem bản demo đầy đủ tại đây: https://jsfiddle.net/nguyentienquan/47xthdj9/

Và kết quả ta thu được:
![](https://images.viblo.asia/8b104eb6-4768-479e-9869-7de741720f97.png)
Ta thấy rằng, mặc dù mình đã cố tình đặt chung thuộc tính là `title` để xem là liệu rằng 2 Instance này nó có bị ảnh hưởng với nhau hay không? Nhưng kết quả ta thu được rằng, nó không liên quan gì đến nhau cả. 

Vậy ta có thể rút ra điều là trong VueJS, ta hoàn toàn có thể tạo nhiều Instance cùng 1 lúc để quản lý nhiều đối tượng. Và mỗi Instance được phân chia ra và nó không hề liên quan đến giữa các biến hay nếu có thử thì hàm (bạn có thể viết thêm 1 hàm để thử nha :D )cũng chắc chắn cũng sẽ khác hoàn toàn nhau thôi.

Hiểu đơn giản thì bạn coi mỗi 1 Instance là 1 đất nước. Với ví dụ trên ta có 2 đất nước là đất nước tên là `vn` và đất nước tên `jp`. Mỗi nước có 1 người dân có đặc điểm là tên, tuổi, thói quen hay phong tục tập quán giống nhau, nhưng rõ ràng vẫn là 2 người dân của 2 nước khác nhau thôi mà. Vậy nên chẳng liên quan gì đến nhau, dân mày chết thì kệ mày thui nhể =))

# Câu hỏi 2: Có thể truy cập từ Instance này đến Instance khác được không?
Câu trả lời cũng là có luôn :laughing:

Hơi khó hiểu nhỉ??? Hừm. Ở trên mình vừa nói 2 người dân của 2 nước khác nhau, chẳng liên quan gì đến nhau, vậy sao nó lại truy cập được. Mặc dù, 2 người dân là 2 nước khác nhau nhưng `dân A` của `nước vn` nghèo đói gì đâu, giàu nhất luôn ==> vậy sao không bay qua chơi `nước jp` xem như nào rồi thăm luôn thằng `dân B` luôn phát nhể? Được chứ phải không. Thằng `dân đen A` là người có điều kiện mà :blush::blush::blush:

```html
<div id="app2">
  <h1>{{ title }}</h1>
  <button @click="onChangeTitle">Change title of first Vue</button>
</div>
```
```js
var jp = new Vue ({
	el: '#app2',
  data: {
  	title: 'Hello World',
  },
  methods: {
  	onChangeTitle: function () {
    	vn.title = "Change Title"
    }
  }
});
```
Xem demo đầy đủ tại đây: https://jsfiddle.net/nguyentienquan/dn6voL08/

Kết quả khi chưa click vào button: `Change title of first Vue`.
![](https://images.viblo.asia/aecc273c-40df-4710-a7a2-98501b10fa22.png)

Kết quả khi click vào button: `Change title of first Vue`.
![](https://images.viblo.asia/af66a97b-0d80-4d6f-a167-da30295cf214.png)

# VueJS quản lí data và method như nào?
Từ câu hỏi 2, mình lại nghĩ thêm vậy tại sao Vue có thể biết được. Rõ ràng, chúng ta thấy rằng `dân A` đã sang bên nước ngoài - `nước jp` rồi mà nó vẫn có thể truy cập được vào bên trong property.
Bởi vì, với mỗi 1 phần tử hay là 1 thuộc tính method, property ... mà được tạo ra ở trong Instance thì đều được VueJS tạo ra 1 `cấu trúc watcher` (cấu trúc theo dõi), cấu trúc watcher bao gồm `setter`, `getter`. Nếu đã từng học lập trình hướng đối tượng thì cũng chẳng lạ lẫm gì với keyword này nên mình sẽ bỏ qua giải thích nó ạ :D. Để kiểm tra điều đó có đúng hay không hãy thử `console log` nó ra. Ở đây mình sẽ `console` instance có tên vn

![](https://images.viblo.asia/424000d1-3d7e-4e2d-9a8f-bd2b451cc628.png)

Khi bạn tạo bất kỳ 1 thành phần nào trong Instance thì nó đều tạo ra 1 `cấu trúc watcher` để theo dõi phần tử vừa tạo ra.

Vậy nếu ta thử tạo phẩn tử ở bên ngoài Instance thì vấn đề gì xảy ra?
```js
var vn = new Vue ({
	el: '#app',
  data: {
  	title: 'Vai dieu ve Vue Instance',
    showParagraph: false,
  },
  methods: {
  	show: function() {
    	this.showParagraph = true
    }
  }
});
vn.description='Tien Quan';
console.log(vn);
```
Xem demo đầy đủ tại đây: https://jsfiddle.net/nguyentienquan/dn6voL08/14/

Kết quả là không có bộ watcher nào được tạo ra.
![](https://images.viblo.asia/dfb4e606-eaf3-4657-a0ea-d03a32d1dcb9.png)

![](https://images.viblo.asia/8928217a-ee2a-4444-beb4-73ff1b03bea8.png)

**Kết luận:** Chỉ có thể tạo ra bộ `watcher` (bộ theo dõi) <=> Tạo các phần tử hay là thuộc tính method, property ở trong Instance.

# Tổng kết

Qua bài viết này, mong rằng sẽ giúp các bạn có thể hiểu sâu hơn về `Vue Instance`. Vì mình cũng mới đang tìm hiểu Vue nên vẫn còn nhiều sai sót mong mọi người có thể góp ý để mình càng tiến bộ hơn. 

Cảm ơn các bạn đã theo dõi và ủng hộ mình ạ!


### Tài liệu tham khảo:

https://vuejs.org/v2/guide/