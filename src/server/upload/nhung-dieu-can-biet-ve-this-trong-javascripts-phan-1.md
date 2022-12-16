# I. Tìm hiểu về biến this
Từ khóa this của JavaScript là một trong những khái niệm cơ bản nhưng cũng dễ gây nhầm lẫn nhất của ngôn ngữ này. Trong bài viết này, chúng ta sẽ dần dần tìm hiểu và làm sáng tỏ this, sao cho từ bây giờ, bạn không cần phải lo lắng về nó nữa. Chúng ta sẽ tìm hiểu cách sử dụng this một cách chính xác trong các tình huống khác nhau, kể cả những trường hợp nhạy cảm, nơi mà this rất khó nắm bắt.  

- Trong JavaScript, chúng ta dùng từ khóa this để đại diện cho một đối tượng. Đối tượng đó là chủ thế của ngữ cảnh, hoặc là chủ thế của code đang được chạy.

```
let student = {
	name: "John",
	courses: ["Android", "PHP", "Java"],
	showInfo: function(){
		this.courses.forEach(function(course){
			console.log(`${this.name} study ${course}`);
		})
	}
}
student.showInfo();
```

Các bạn quan sat ví dụ trên mình giải thích như sau : 
```
this.courses.forEach(function(course){
		console.log(`${this.name} study ${course}`);
})
```
Dòng code trên nó sẽ không hiểu được `${this.name}` lí do mình đang gọi  `this.courses.forEach(function(course)` mà name đang năm ngoài `this.courses.forEach(function(course)`  thi nói trên thì nó sẽ ko chạy được . Để giải quyết mình vấn đề này các bạn quan sát mình sẽ chỉ các bạn 3 cách thông dụng để giải tuyết vấn đề nói trên 
- Dùng  **_this**    trong function showInfo

```
let student = {
	name: "Peter",
	courses: ["Android", "PHP", "Java"],
	showInfo: function(){
		var _this = this;
		this.courses.forEach(function(course){
			console.log(`${_this.name} study ${course}`);
		})
	}
}

student.showInfo();
```

- Dùng bind để bind biến this 

```
let student = {
	name: "Ronaldo",
	courses: ["Android", "PHP", "Java"],
	showInfo: function(){
		this.courses.forEach(function(course){
			console.log(`${this.name} study ${course}`);
		}.bind(this))
	}
}

student.showInfo();
```

- Dùng Arrow Function
```
let student = {
	name: "josh",
	courses: ["Android", "PHP", "Java"],
	showInfo: function(){
		this.courses.forEach(course => console.log(`${this.name} study ${course}`))
	}
}

student.showInfo();
```

# Kết luận
Trên đây là những khái niện cơ bản nhất về this trong Javascripts , thông qua bài viết này hi vọng các bạn nắm được về this trong Javascripts và áp dụng kiến thức đó vào thực tế một cách hiệu quả