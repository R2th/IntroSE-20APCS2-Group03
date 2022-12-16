Bài viết này mình sẽ chia sẻ cách sử dụng inheritance trong ES6, trong ES6 nó sử dụng các từ khóa extends và super để biểu diễn sự kế thừa.<br>
Hãy xem ví dụ bên dưới:<br>
```Javascript
	class Animal {
		constructor(legs) {
			this.legs = legs;
		}

		walk() {
			console.log(`walking on ${this.legs} legs`);
		}
	}

	class Bird extends Animal {
		constructor(legs) {
			super(legs);
		}

		fly() {
			console.log('flying');
		}
	}

	let bird = new Bird(2);
	bird.walk();
	bird.fly();
```
Output:<br>
```Javascript
walking on 2 legs
index.html:24 flying
```
Cách sử dụng:<br>
Đầu tiên, mình tạo class Bird kế thừa class Animal bằng sử dụng từ khóa extends.<br>
```Javascript
class Bird extends Animal {
   // ...
}
```
Class Animal ở ví dụ trên được gọi là **base class** hoặc **parent class**, khi đó class Bird được hiểu là  **child class**. Do đó
class Bird sẽ kế thừa tất cả các phương thức và thuộc tính của class Animal.<br>
Tiếp theo, constructor trong Bird sẽ sử dụng hàm super() để gọi  constructor trong Animal và truyền theo đối số là legs.<br>
JavaScript yêu cầu child class gọi super () nếu nó có sử dụng constructor. Nếu child class không sử dụng constructor thì bạn chỉ cần viết code như dưới trong lớp Bird.<br>
```Javascript
class Bird extends Animal {
    fly() {
        console.log('flying');
    }
}
```

Ví dụ bạn muốn thêm một thuộc tính color trong class Bird, bạn có thể làm như bên dưới:<br>
```Javascript
	class Bird extends Animal {
		constructor(legs, color) {
			super(legs);
			this.color = color;
		}

		fly() {
			console.log('flying');
		}

		getColor() {
			return this.color;
		}
	}

	let pegion = new Bird(2, 'Green');
	console.log(pegion.getColor());
```
Output:<br>
```
Green
```