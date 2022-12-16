# 5 điểm khác nhau giữa function thường và arrow function

Lựa chọn cách viết nào cho phù hợp theo tính huống đang cần là cái chúng ta sẽ có được câu trả lời khi đi qua 5 điểm khác biệt này

**Function thường là những function được khai báo ở 2 dạng sau**


```
function hello() {
    return 'Xin Chào'
}
```

Còn arrow function là dạng chắc ai cũng biết

```
const hello = () => {
    return 'Xin Chào Bạn Nhé'
}
```

## 1. giá trị của this

Với function thường giá trị của this khá khó lường, tùy thuộc thời điểm chúng ta gọi nó. Như tình huống sau, nếu không có strict mode, thì giá trị nó là global object (window), còn có strict mode nó sẽ là undefined


```
function myFunction() {
  console.log('this',this);
}
```

Giá trị nó sẽ tùy thuộc vào ngữ cảnh, như trong trường hợp này, nó chính là object chính chủ của phương thức

```
const myObject = {
  method() {
    console.log(this);
  }
};

```
Với arrow function, this sẽ luôn bằng với giá trị của function ở ngoài, arrow function không khai báo thêm vùng tự trị riêng (execution context), mà dùng chung với thằng cha


```
const myObject = {
  myMethod(items) {
    console.log(this); // "myObject"
    const callback = () => {
      console.log(this); // "myObject"
    };
    items.forEach(callback);
  }
};

myObject.myMethod([1, 2, 3]);

```

Đây là một đặc tính giúp chúng ta không còn dùng đến self = this hay callback.bind(this)

## 2. Constructor

Để khởi tạo một object với function bình thường

```
function Car(color) {
    this.color = color;
}

const redCar = new Car('red');
redCar instanceof Car; // => true

```

Cũng không có vùng tự trị riêng, nên arrow function không thể dùng như một constructor

```
const Car = (color) => {
  this.color = color;
};

const redCar = new Car('red');
// => TypeError: Car is not a constructor

```

3. Object arguments

Bên trong một function thông thường sẽ được nhét thêm một object đặc biệt arguments, chứa toàn bộ tham số truyền vào cho function đó

```
function myFunction() {
  console.log(arguments);
}

myFunction('a', 'b'); 
// => { 0: 'a', 1: 'b'}

```

Arrow function sẽ không có object này, và nếu bạn đặt nó vào trong một function bình thường, thì lúc đó giá trị arguments này sẽ của thằng bọc ngoài

```
function myRegularFunction() {
  const myArrowFunction = () => {
    console.log(arguments);
  }

  myArrowFunction('c', 'd');
}

myRegularFunction('a', 'b'); 
// => { 0: 'a', 1: 'b' }

```

## 4. Ngầm định có return


Với function thông thường, chúng ta phải rất rõ ràng là return về cái gì

```
function myFunction() {
  return 42;
}

myFunction(); 
// => 42

function myEmptyFunction() {
  42;
}

function myEmptyFunction2() {
  42;
  return;
}

myEmptyFunction();  
// => undefined
myEmptyFunction2(); 
// => undefined

```
Với arrow function nó có hơi đặc biệt, nếu chỉ có một expression, bỏ qua dấu ngoặc đơn luôn, thì giá trị của expression sẽ được return

```
const increment = (num) => num + 1;

increment(41); 
// => 42

```

## 5. Phương thức

Các function thông thường sẽ là lựa chọn hàng đầu khi viết phương thức cho class

```
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }

  logName() {
    console.log(this.heroName);
  }
}

const batman = new Hero('Batman');

```


Nhưng khi bạn không muốn thay đổi giá trị của this, arrow function sẽ là lựa chọn hợp lý hơn

```
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }

  logName = () => {
    console.log(this.heroName);
  }
}

const batman = new Hero('Batman');
```
Tài liệu muốn tìm hiểu thêm ở đây nhé các bạn :

[https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/)