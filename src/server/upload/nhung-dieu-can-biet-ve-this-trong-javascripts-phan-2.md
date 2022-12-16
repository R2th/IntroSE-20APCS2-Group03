# I. Tìm hiểu về biến this
Như bài trước mình đã giới thiệu về biến this , giờ mình muốn mở rộng thêm một số vấn đề , các bạn quan sát ví dụ như sau :

```javascript
var mouse = {
  name: 'Mickey',
  sayHi: function () {
    console.log('Hi, my name is ' +this.name)
  }
};

//mouse.sayHi();

var say = mouse.sayHi;
say();
```

Mình giải thích như sau về sự khác nhau 2 vấn đề trên
```javascript
var say = mouse.sayHi;
say();
```

**var say = mouse.sayHi** thì nó đồng nghĩa **say = function () {}**  , lúc này funtion này được gọi nó đóng vai trò không có object nào phía trước hay còn gọi **không có context**   hay   **context của nó  là global context**

Và khi chạy hàm đó kết quả sẽ như sau 
```javascript
Hi, my name is undefined
```

Để fix cái cái vấn đề này mình cần fix lại như sau 
```javascript
var say = mouse.sayHi.bind(mouse);
say();
```

```javascript
mouse.sayHi();
```
Cái này có nghĩa context của **sayHi** chính là mouse và biến this trong **sayHi** nó trỏ đến **mouse** dẫn đến nó vẫn chạy bình thường và không có lỗi.


# II. Call trong javascript
**Các bạn xem ví dụ sau:**
```javascript
function greeting(name, age) {
  console.log(`Hi ! ${name}. I am ${age}.`)
}

greeting.call(null, 'Tom ', 10)
```

Như ví dụ trên thì chạy bình thường không vấn đề gì , giờ mình mở rộng vấn đề thêm 
```javascript
function greeting() {
  console.log(`Hi ! ${this.name}. I am ${this.age}.`)
}

greeting.call()
```

Nếu sau khi chạy funtion nói trên thì nó sẽ ra kêt quả như này 

```javascript
Hi ! undefined. I am undefined.
```

Để fix vấn đề nói trên mình sẽ fix như sau: 

```javascript
function greeting() {
  console.log(`Hi ! ${this.name}. I am ${this.age}.`)
}

const cat = {
  name: 'Tom',
  age: '50'
}

greeting.call(cat);
```

Kết quả sẽ được như sau: 
```javascript
Hi ! Tom. I am 50.
```

# III. Tổng kết
Qua 2 bài về biến  **this trong javascript**  ,  và **call trong javascripts** , tôi hi vọng sẽ giúp bạn tìm hiểu nhanh hơn và áp dụng vào thực tế một cách hiệu quả hơn