Đối với những bạn mới học **JavaScript** thì this là một cái gì đó rất huyền bí. Và một trong những lỗi sai phổ biến, đó là sử dụng sai vai trò của this bên trong hàm **callback**.

Ví dụ:
```
class Helper {
  constructor() {
    this.number = 0;
  }

  increase() {
    setTimeout(function() {
      this.number++;
      console.log(this.number); // => NaN
    }, 100);
  }
}

const helper = new Helper();
helper.increase();
```

Trong đoạn code trên, console hiển thị giá trị **NaN** thay vì 1 - như suy nghĩ của hầu hết các newbie. Vậy làm sao để sử dụng đúng giá trị của this bên trong hàm callback?

# Cơ bản về this bên trong function JavaScript

Từ khoá this bên trong function JavaScript là một từ khoá đặc biệt. Giá trị của this xác định dựa trên cách mà function được gọi, chứ không phải dựa vào vị trí mà nó được định nghĩa.

Ví dụ:
```
function foo() {
  console.log(this);
}

foo(); // 'this' tương ứng với đối tượng Window

const obj = {bar: foo};
obj.bar(); // 'this' tương ứng với đối tượng 'obj'

const a = new foo(); // 'this' tương ứng với đối tượng mới tạo ra 'a'
```
Hoặc một ví dụ khác:
```
const obj = {
  number: 0,
  increase: function() {
    this.number++;
  }
}

console.log(obj.number); // => 0
obj.increase();
console.log(obj.number); // => 1
```

Trong ví dụ trên, increase là một function. Vì vậy, giá trị của this được xác định dựa trên cách mà function này được gọi. Mà increase được gọi bằng cách nào?

Chính là `obj.increase()`. Suy ra, this ở đây sẽ ứng với obj. Do đó, kết quả thu được là đúng như mong đợi.

# Một số cách sử dụng đúng giá trị của this bên trong hàm callback
## Lưu lại reference của this
Đây là cách mà mình thường dùng trước đây. Ý tưởng của phương pháp này là mình sẽ dùng một biến bất kỳ để lưu lại giá trị của this. Khi đó, mình chả cần quan tâm this bị bind với thằng nào.

Khi đó, đoạn code trên đầu bài viết sẽ thay đổi thành:
```
class Helper {
  constructor() {
    this.number = 0;
  }

  increase() {
    let self = this;

    setTimeout(function() {
      self.number++;
      console.log(self.number); // => 1
    }, 100);
  }
}

const helper = new Helper();
helper.increase();
```
Lúc này, giá trị của self sẽ ứng với this - tương ứng với Helper.
## Sử dụng phương thức bind
Phương thức bind sẽ tạo ra một function mới mà khi function này được gọi, giá trị của this sẽ tương ứng với giá trị truyền vào.

Áp dụng bind vào đoạn code trên, mình sẽ thu được:
```
class Helper {
  constructor() {
    this.number = 0;
  }

  increase() {
    setTimeout((function() {
      this.number++;
      console.log(this.number); // => 1
    }).bind(this), 100);
  }
}

const helper = new Helper();
helper.increase();
```
Kết quả thu được vẫn chính xác như mong đợi.
## Sử dụng arrow function
Arrow function khác với function thông thường là nó không có this. Vì vậy, từ khoá this bên trong arrow function sẽ được đối xử như các biến bình thường khác.

Bây giờ, đoạn code trên sẽ thay đổi thành:
```
class Helper {
  constructor() {
    this.number = 0;
  }

  increase() {
    setTimeout(() => {
      this.number++;
      console.log(this.number); // => 1
    }, 100);
  }
}

const helper = new Helper();
helper.increase();
```
## Trực tiếp set giá trị của this
Một số phương thức cho phép trực tiếp set giá trị của biến this. Ví dụ các phương thức ứng với Array như: map(), forEach(), filter(),...

Ví dụ:
```
class Helper {
  constructor() {
    this.number = [0, 1];
    this.amount = 1000;
  }

  increase() {
    this.number.forEach(function(item) {
      item += this.amount; // Uncaught TypeError: Cannot read property 'amount' of undefined
      console.log(item);
    });
  }
}

const helper = new Helper();
helper.increase();
```
Bên trong function, this có giá trị là undefined. Vì vậy, kết quả thu được là lỗi **Uncaught TypeError: Cannot read property 'amount' of undefined.**

Bây giờ, mình sẽ truyền giá trị của this vào phương thức forEach() bên trên để xem kết quả thế nào?
```
class Helper {
  constructor() {
    this.number = [0, 1];
    this.amount = 1000;
  }

  increase() {
    this.number.forEach(function(item) {
      item += this.amount;
      console.log(item);
    }, this);
  }
}

const helper = new Helper();
helper.increase();

// 1000
// 1001
```
# Lời kết
Trên đây là một số cách để sử dụng đúng giá trị của this bên trong hàm callback trong javascript.

Cảm ơn các bạn đã đọc bài viết !