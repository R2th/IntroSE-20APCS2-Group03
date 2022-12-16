### Watcher là gì trong framework Vue.js?
watcher giám sát các thay đổi trong một đối tượng, sử dụng watcher có thể có cùng kết quả với các giá trị được tính toán trước trong computed property nhưng với watcher nó phức tạp hơn. Chúng ta thường sử dụng watcher với những tình huống đòi hỏi phải xử lý phức tạp như:

Các hoạt động bất đồng bộ đáp ứng lại việc thay đổi dữ liệu
Các thiết lập giá trị ngay lập tức
Hạn chế số lần thực hiện phương thức khi dữ liệu thay đổi.
Watcher có thể được khai báo trong thành phần watch của Vue instance, cú pháp như sau:

```
  new Vue({
    el: '#app',
    data: {
      // Dữ liệu gán với view
    },
    watch: {
      // Các hoạt động bất đồng bộ muốn thực hiện khi dữ liệu thay đổi
    }
  });
```
### Watch – Data cơ bản
Với các data cơ bản như Number, String,… để watch, ta sẽ define method như sau:

```
data() {
	return {
		number: 1,
		string: "abc",
	}
}
watch: {
	number(newData) { // es6 syntax
		// define your action here when this data changed
	},
	string: function(newData) { // es5 syntax
		// define your action here when this data changed 
	}
}
```
Khi mỗi lần 2 biến number, string có thay đổi, hàm tương xứng của nó trong watch sẽ được chạy 😀
Trong watcher của bạn, bạn có thể access/call hàm trong methods thoải mái thông qua this nhé 
### Watch – Watch một phần tử trong 1 Object
Ví dụ mình có 1 data như sau trong 1 object:
```
object: {
	text: "abc",
}
```
Để watch được, ta sẽ define watcher như sau:
```
watch: {
	"object.text": function(newData) {
		// your method here...
	}
}
```
### Watch – Watch toàn bộ thay đổi trong object/array
Tất nhiên là trong object hay array của chúng ta, việc nó go-deep down là chuyện bình thường nhỉ, tận 2 cấp, 3 cấp,…
Và các bạn đừng lo, Vue cũng hỗ trợ hết :D, define như sau:
```
watch: {
	object: {
		handle(newData) {
			// your method here...
		},
		deep: true, // deep watch
	}
}
```
Vậy mỗi data bất kì trong object/array đó thay đổi, watcher của bạn sẽ trigger
### Kết luận
Watcher rất hữu dụng khi ta dùng để kiểm soát cũng như quản lý sự thay đổi của data của chúng ta.
Watcher có thể apply cho cả data và prop.
Lưu ý nhỏ: ở 1 số trường hợp, watcher nó sẽ chạy liên tục gây đơ browser của bạn. Để tránh việc đó, ta nên code 1 hàm tại methods và sử dụng debounce của underscore (debounce hỗ trợ ta chỉ chạy hàm trong 1 thời gian nhất định).