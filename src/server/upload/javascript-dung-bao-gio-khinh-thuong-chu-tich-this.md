Con trỏ **this** chắc cũng chẳng mấy xa lạ gì với anh em dev.

Trong Javascript định nghĩa về **this** như sau:
> The JavaScript this keyword refers to the object it belongs to.

Trong trường hợp bình thường thì nó cũng chả khác gì so với this trong Java hay C#,
nhưng trong nhiều trường hợp, nó sẽ gây ra kha khá bug nếu bạn không để ý.

Vì thế chúng ta hãy cùng tìm hiểu qua từng ví dụ:

### **1. This trong các trường hợp bình thường**

Đây là lúc mà chủ tịch **this** đóng giả dân thường và dĩ nhiên cũng khá dễ hiểu.

Khi bạn sử dụng **this** trong Global, nó sẽ bị ràng buộc bởi Global object (object **window** trong trình duyệt)
```
document.write(this);  // [object Window]
```

Vì thế nếu một hàm được viết và gọi ở Global nó vẫn sẽ trỏ đến Global object
```
function f()
{
    return this;
}
document.write(window.f()); // [object Window]
```

Nếu hàm chứa **this** nằm trong một object và được gọi bởi object đó thì nó sẽ trỏ tới chính object đó
```
const person = {
  name: 'Tuan Dep Zai',
  sayName: function() {
    console.log(this.name);
  },
};

person.sayName(); // Tuan Dep Zai
```

### **2. This trong callback**

Ta xét ví dụ sau:
```
const person = {
  name: 'Tuan Dep Zai',
  sayName: function() {
    console.log(this.name);
  },
};

person.sayName(); // Tuan Dep Zai

$('button').click(person.sayName); // undefined
```
Ta muốn khi người dùng click vào button thì sẽ show ra name của person.

Nhưng đen thay trong trường hợp này, cái mà **this** trỏ đến không phải là person mà là object button.

Vì thế kết quả sẽ là ***undefined***.

Để giải quyết vấn để này ta có thể sử dụng một anonymous function hoặc hàm ***bind*** để xác định tham số **this**.
 
 ### **3. This trong closure**
 
 ```
const persons = {
  names: ['Ngoc Trinh', 'Tuan', 'Kha Banh'],
  sayNames: function() {
    for(let i = 0; i < this.names.length; i++) 
      console.log(this.names[i]);
  },
  sayNamesThis: function() {
    this.names.forEach(function(name){
      console.log(name + ' ' + this.names);
    });
  },
};

persons.sayNames(); // Hàm này in ra danh sách names

persons.sayNamesThis(); // Hàm này this.names là undefined
```

Với hàm **sayNames** ta dùng ***for*** và hàm chạy bình thường, hàm **sayNamesThis** dùng closure là ***forEach*** nên this được trỏ về object ***Window***.

Để giải quyết trường họp này ta đặt một biến *self = this* ở ngoài closure để sử dụng
```
const self = this;
```

### **4. This trong trường hợp gán hàm cho một biến**

Xét ví dụ:
```
const person = {
  name: 'Tuan Dep Zai',
  sayName: function() {
    console.log(this.name);
  },
};

const sayNameFunc = person.sayName;
sayNameFunc(); // undefined
```

Khi đó context của object chứa this cũng bị thay đổi và this trỏ vào object Window.
Để giải quyết trường hợp này ta có thể dùng hàm **bind**.

### **5. This trong hàm mượn**

```
const person = {
  name: 'Tuan Dep Zai',
  sayName: function() {
    console.log(this.name);
  },
};
const anhBanh = {
    name: 'Kha Banh',
};
person.sayName.apply(anhBanh); // Kha Banh
```

Ở đây ta thấy object person có hàm ***sayName*** trong khi anh Bảnh thì không có.

Với khả năng đòi nợ thuê của mình thì hiển nhiên anh Bảnh muốn mượn function ***sayName*** của chúng ta.

Khi ấy có thể sử dụng hàm **apply** hoặc **call** để mượn.

### **6. Sự khinh thường this và cái kết**

Chủ tịch **this** thường giả vờ đáng yêu và dễ thương trong các trường hợp cơ bản.

Nhưng nếu ta khinh thường và không chú ý đến một số trường hợp đặc biệt thì sẽ có nguy cơ cao dính phải một vài bug khá đắng lòng.

Bản thân Javascript cũng là một ngôn ngữ khá bệnh hoạn và có lẽ mình sẽ cố gắng phân tích sự bệnh hoạn này trong thời gian tới với phương châm:
> Trên đời này chỉ có 2 loại ngôn ngữ: ngôn ngữ bị nhiều người chửi và ngôn ngữ chả ai thèm dùng.