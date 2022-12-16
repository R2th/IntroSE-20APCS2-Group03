![](https://images.viblo.asia/7b8a9a1e-6acf-4e72-a596-d77970b13db6.png)
ES6 là một bước tiến lớn cho web và nó đã giới thiệu nhiều tính năng mới giải quyết các điểm đau khác nhau tồn tại cho tất cả các nhà phát triển JavaScript.Nhưng một số tính năng của nó đặc biệt phù hợp để giải quyết các vấn đề phát sinh khi phát triển với Vue.js. 
Bài viết này sẽ đề cập đến bốn trong số các tính năng dành riêng cho Vue.

# Tính năng 1: Method definition shorthand
Tính năng đầu tiên này tôi muốn nói đến có tác dụng hoàn toàn về mặt thẩm mỹ, nhưng nó thực sự giúp làm cho mã của bạn dễ đọc nhất có thể. ES6 đã giới thiệu cách viết tắt này để gán các hàm ngắn gọn hơn cho các đối tượng, chúng ta luôn làm trong Vue cho các phương thức, các thuộc tính được tính toán, các trình theo dõi và các phương thức vòng đời. Đây là một ví dụ về cách bạn có thể áp dụng nó cho mã Vue của mình: <br/>
```
// Without shorthand
{
	methods: {
		getValue: function() { // ... }
	},
	computed: {
		halfValue: function() { // ... }
	},
	created: function() { // ... }
}

// With ES6 shorthand
{
	methods: {
		getValue() { // ... }
	},
	computed: {
		halfValue() { // ... }
	},
	created() { // ... }
}
```

đây là một thay đổi nhỏ, nhưng nó có thể tạo ra sự khác biệt lớn cho khả năng đọc.

# Tính năng 2: Destructuring

Destructuring là một tính năng được thêm vào trong ES6 giúp dễ dàng kéo các thuộc tính ra khỏi một đối tượng và gán chúng cho một biến. Trước khi chúng ta tìm hiểu cách điều này giúp chúng ta trong mã Vue của mình, đây là một ví dụ rất cơ bản về cách thức Destructuring đối tượng hoạt động: <br>

```
const person = { name: 'Jake', email: 'jake@example.com', phone: '555-555-5555' }

// With destructuring
const { name, email, phone } = person

// Without destructuring
const name = person.name
const email = person.email
const phone = person.phone
```

Hai ví dụ trên (có / không Destructuring) hoạt động giống hệt nhau. Phiên bản sử dụng hàm hủy chỉ là một mẫu mã sạch hơn để đạt được kết quả tương tự. <br>

Vì vậy, làm thế nào bạn có thể sử dụng Destructuring trong cơ sở mã Vue của bạn? Có hai lĩnh vực chính nơi Destructuring tỏa sáng trong Vue: Destructuringcác thuộc tính từ this và nhận đạo cụ từ các khe trong phạm vi. Chúng ta hãy đi qua từng trường hợp sử dụng.

### Destructuring from this

Trong Vue, để tham chiếu dữ liệu, phương thức hoặc bất cứ thứ gì trên Vue hoặc cá thể thành phần của bạn, bạn sử dụng this. Nhưng đôi khi thật tuyệt khi truy cập vào các thuộc tính cá thể đó mà không cần tham khảo this nhiều lần. Để tôi chỉ cho bạn một mẹo nhỏ để kéo các thuộc tính this vào phạm vi chức năng cục bộ của bạn:<br>

```
data() {
	return {
		endpoint: 'example.com/api',
	}
},
methods: {
	postForm() { // this is just an example method we can call in submitForm }
	submitForm() {
		// Without destructuring
		const endpoint = this.endpoint
		const postForm = this.postForm

		// With destructuring
		const { endpoint, postForm } = this
  }
}
```


Mẫu này cho phép chúng tôi không chỉ sử dụng các biến này mà không có thistiền tố, nó còn cho chúng tôi rõ ràng về những phần dữ liệu và / hoặc phương thức mà hàm của chúng tôi dựa vào.<br>


### Scoped slots

Các vị trí cho phép chúng tôi chuyển các mẫu vào các thành phần của chúng tôi và các vị trí trong phạm vi cho phép các thành phần của chúng tôi cung cấp một số dữ liệu thành phần cho các mẫu đó. Nếu bạn không quen thuộc với các vị trí có phạm vi, điều này có thể không có ý nghĩa nhiều, nhưng hy vọng ví dụ này ít nhất có thể củng cố cách thức Destructuring hoạt động và cách bạn có thể sử dụng nó trong nhiều tình huống khác nhau: <br>
```

<!-- Without Destructuring -->
<User v-slot="slotProps">
	<div>Name: {{ slotProps.name }}</div>
	<div>Email: {{ slotProps.email }}</div>
</User>

<!-- With Destructuring -->
<User v-slot="{ name, email }">
	<div>Name: {{ name }}</div>
	<div>Email: {{ email }}</div>
</User>
```

Không giống như việcDestructuring các kiểu dữ liệu từ this mô hình, không chỉ Destructuring các đạo cụ vị trí của chúng tôi cho phép chúng tôi truy cập các biến của mình mà không cần sử dụng slotProps tiền tố mà còn cho chúng tôi biết chính xác những thuộc tính nào chúng tôi chấp nhận thông qua vị trí.<br>

# Tính năng 3: Functional array methods


ES6 đã giới thiệu nhiều phương thức mới được tích hợp trong nguyên mẫu Array. Các phương thức này cho phép bạn tương tác với dữ liệu trong mảng theo các cách khác nhau, như chuyển đổi từng mục ( map), sắp xếp một mảng hoặc lọc một mảng. Phương pháp mảng ưa thích của tôi mà tôi sử dụng phổ biến trong các ứng dụng Vue là filter, map, forEach, và includes. Đây là một ví dụ sử dụng filter: <br>

```
computed: {
	// Without "filter" functional array method
	oldFilteredItems() {
		const filtered = []
		for (const item in this.items) {
			if(item.value > 10) {
				filtered.push(item)
			}
		}
		return filtered
	},
	// With "filter" functional array method
	filteredItems() {
		return this.items.filter((item) => item.value > 10)
	}
}
```

Điều này làm giảm mã chúng ta phải viết (và đọc!) Từ bảy dòng xuống chỉ còn một dòng! <br>

# Tính năng 4: Arrow functions

Trước khi chúng tôi tìm hiểu về các Arrow functions, cách chúng hoạt động và cách sử dụng chúng trong mã Vue của bạn, hãy xem xét vấn đề chúng giải quyết. Kiểm tra mã sau đây: <br>

```
data() {
	return {
		scrolled: false
	}
},
mounted() {
	window.addEventListener('scroll', function() {
		this.scrolled = true
	})
}
```

Mã này không hoạt động. Tại sao? Bởi vì khi bạn tạo một hàm mới, giá trị của thisđược liên kết lại bằng với thể hiện của hàm thay vì thể hiện Vue. Nếu bạn đã từng gặp phải vấn đề này, có thể bạn đã thử cách tiếp cận sau để khắc phục sự cố này: <br>

```
mounted() {
	var self = this
	window.addEventListener('scroll', function() {
		self.scrolled = true
	})
}
```

Mặc dù điều này không khắc phục được vấn đề, nhưng điều này chắc chắn không lý tưởng khi bạn vứt rác xung quanh mã của mình, đặc biệt khi đây là một vấn đề có thể giải quyết được với (hàm trống xin vui lòng) các hàm mũi tên! **var self = this** <br>

Các hàm mũi tên rất giống với các hàm tiêu chuẩn, nhưng một điểm khác biệt chính là các hàm mũi tên không liên kết lại **this**, điều này rất hữu ích trong các ứng dụng Vue! Đây là phiên bản cập nhật của ví dụ trước, trong đó chúng tôi đã thay thế hàm tiêu chuẩn bằng hàm mũi tên để **this** không bị ràng buộc lại: <br>

```
mounted() {
	window.addEventListener('scroll', () => {
		this.scrolled = true
	})
}
```

Đây là một quy tắc mà tôi thấy hữu ích để tuân theo khi viết ứng dụng Vue: trong các thành phần Vue, thisphải luôn luôn tham khảo ví dụ Vue. Điều này không khó để đạt được nếu bạn sử dụng các hàm mũi tên và nó giúp mã của bạn dễ hiểu hơn. <br>

Nếu bạn không quen với các chức năng mũi tên, chúng chắc chắn đáng để học hỏi. Mặc dù chúng đặc biệt hữu ích trong kịch bản này, nhưng chúng cũng cho phép bạn viết các hàm ngắn gọn hơn nhiều, có thể áp dụng cho nhiều kịch bản khác. Một nơi khác mà họ có lợi được kết hợp với các phương thức mảng! Nếu bạn nhìn vào filteredItems hàm của tôi trong Tính năng số 4 , bạn có thể thấy tôi đã sử dụng hàm mũi tên làm đối số đầu tiên của filter phương thức mảng! <br>


# Tóm lại

Trước khi tôi đăng xuất, tôi muốn nói về cách tôi đã xác định bốn cải tiến này và cách bạn có thể tìm hiểu những nơi có thể sử dụng cải tiến trong (các) cơ sở mã của bạn. Dưới đây là một vài lời khuyên! <br>

### Look for repetition.

Không phải tất cả sự lặp lại là xấu, nhưng nhìn thấy bất cứ điều gì lặp đi lặp lại trong mã của bạn sẽ khiến bạn tự hỏi liệu có cơ hội cho một sự trừu tượng tốt hay để tìm hiểu một mô hình hoặc tính năng ngôn ngữ mới giải quyết vấn đề bạn đang làm việc xung quanh.

### Be aware of language changes

Không thể biết rằng bạn có thể đơn giản hóa nhiều vòng lặp trong mã của mình bằng cách sử dụng các phương thức mảng nếu bạn không theo kịp các thay đổi đối với JavaScript. Điều đó nói rằng, bạn không cần phải tìm hiểu sâu về mọi thứ mới, nhưng hãy cố gắng có một nhận thức về những gì có sẵn trong ngôn ngữ mà bạn đang làm việc. Sau đó, khi bạn gặp phải một vấn đề, hy vọng bạn sẽ được nhắc nhở về một tính năng ngôn ngữ giải quyết vấn đề bạn gặp phải.

### Read other people’s code

Nếu bạn làm việc trong một nhóm, hãy yêu cầu xem lại mã của người khác với họ hoặc yêu cầu họ xem lại mã của bạn. Xem mã của người khác, hoặc nhận xét của họ về bạn, sẽ cho phép bạn tìm hiểu cách người khác làm những việc khác nhau. Và khi bạn thấy một mẫu mã mà bạn không nhận ra, hãy tìm ra nó là gì và, nếu nó có ý nghĩa, hãy áp dụng nó cho mã của bạn.


# Thanks All