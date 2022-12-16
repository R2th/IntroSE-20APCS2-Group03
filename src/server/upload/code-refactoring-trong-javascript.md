# I. Giới thiệu
## 1. Sơ lược
Đối với ai mới theo IT, khi đọc qua cái tiêu đề này mình nghĩ chắc còn khá lạ lẫm. Bất kì một dự án lớn nào khi đến cuối quá trình hoàn tất nhìn lại những gì mọi người trong team đã làm trong suốt thời gian qua thì số lượng code quả là rất lớn. Tuy nhiên thì việc để xem lại và tính toán lại sự phức tạp của hàng nghìn hàng vạn dòng code thì...nó lại không hợp lí tí nào🤔

Vì vậy chúng ta phải cần đến quá trình Refactoring Code trong dự án.

![](https://images.viblo.asia/ee8293d1-3628-4f62-851d-c5155a477d22.jpeg)

## 2. Refactoring là gì?
Là quá trình chúng ta thay đổi source code trong dự án mà không sửa đổi bất kì hành vi hay chức năng của nó, nhằm cải thiện performance và một số thuộc tính khác để làm sao cho chương trình chạy *trơn tru* hơn.

Trích lời **Martin Fowler**:
> **Refactoring** is a disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior.
> 
> Its heart is a series of small behavior preserving transformations. Each transformation (called a "refactoring") does little, but a sequence of these transformations can produce a significant restructuring. Since each refactoring is small, it's less likely to go wrong. The system is kept fully working after each **refactoring**, **reducing** the chances that a system can get seriously broken during the **restructuring**.

# II. Quá trình
## 1. Module hóa hoặc lọc ra các functions riêng biệt
Tổ chức lại dự án thành nhiều modules hoặc function trong đó mỗi mudule chịu 1 trách nhiệm riêng biệt và không liên quan đến nhau
Lợi ích:
* Tên các functions ngắn hơn.
* Miêu tả đúng tính năng và hành vi thực hiện của các function đó.
* Hạn chế viết comments khi không cần thiết.

## 2. DRY 
Có một thuật ngữ mà bên nước ngoài được sử dụng khá là phổ biến đó là DRY - Don’t Repeat Yourself (đừng lặp lại chính mình).

Một số những ưu điểm của kĩ thuật "DRY Code":
* **Khả năng bảo trì**: Việc bảo trì code diễn ra dễ dàng khi chúng ta có logic rành mạch. Trong trường hợp muốn update code ta chỉ cần update ở một nơi tùy vào độ phức tạp của dự án mà không làm rối tung mọi thứ lên.
* **Khả năng tái sử dụng**: một chức năng hay 1 module có thể được tái sử dụng ở bất kì đâu.
* **Khả năng dễ dàng truy cập**: Mọi thứ cần phải thực sự dễ đọc hiểu và tiết kiệm được thời gian khi debug.
* Tiết kiệm thời gian và không gian lưu trữ.

![](https://images.viblo.asia/b5166650-cdc1-4fe1-a0fd-1229ddfdfec2.png)

Đi cùng với ưu điểm là nhược điểm của nó:

Nhiều khi để mở rộng DRY Code còn gây ra khó hiểu hơn vì 1 số code logic cần phải giữ nguyên vị trí. Khi dự án được implementation nếu không nắm rõ Dry Code dự án sẽ hoàn toàn bị trì trệ.

### Ví dụ minh họa

Giả sử mình có dữ liệu ở dạng Object (có thể nó không quan trọng lắm :v) 

```javascript
let animals = {
    cat: ['LMC', 'NDN', 'NVH'],
    chicken: ['VLP', 'DDQA'],
    fish: ['TQT'],
}
```

Bây giờ việc mình sẽ làm đó là viết chức năng để hiển thị thông tin lên Web từ dữ liệu trên bằng DOM:

```javascript
const viewData = (id, animal, name) => {
    let div = document.createElement('div')
    div.id = id
    div.textContent = animal + ' : ' + name
    document.querySelector('body').appendChild(div)
}
```
Đó là quá trình mình thực hiện hoàn toàn thủ công từ việc nhận và dữ liệu -> tạo thẻ `div` -> inner nó vào html

Đến quá trình thực hiện đoạn code trên khi ta muốn gọi hàm nó sẽ trông như này:

```javascript
viewData(animals.cat, 'cat', animals.cat)
viewData(animals.chicken, 'chicken', animals.chicken)
viewData(animals.fish, 'fish', animals.fish)
```

Oh nhìn nó thật là f\*cking wowsh\*t😢

Để fix lại bằng DRY Code mình sẽ làm như này:

```javascript
const viewData = animals => {
    Object.keys(animals).map(item => {
        let div = div = document.createElement('div')
        div.id = `${item}`
        span = document.createElement('span')
        span.textContent = `${item}: ${animals[item].join(',')}`
        div.appendChild(span)
        document.querySelector('body').appendChild(div)
    })
}
```

Nhìn nó đã dễ nhìn hơn rất nhiều, nhiều khi ta cần phải hi sinh đi sự ngắn gọn để làm cho cde trông dễ nhìn hơn.

## 3. Truyền nhiều tham số là đối tượng cho function

Trong nhiều trường hợp thì tham số truyền vào hàm thường liên quan đến nhau như ví dụ mình đã lấy ở trên đó và có thể nhóm chúng lại thành 1 Object từ đó ta sẽ xác định được rõ mối quan hệ mang lại sự linh hoạt cho tính năng.

Khi truyền Object vào tham số của hàm, ta sẽ không cần phải bận tâm đến thứ tự (index). Khả năng mở rộng cũng rất dễ dàng, trong trường hợp trong tương lai muốn thêm 1 số tham số cho function ta chỉ cần tham vào methods cho Object tương tự, cú pháp hàm không hề bị thay đổi từ đó làm giảm bớt khối lượng công việc (tiết kiệm kha khá thời gian và tiền bạc). 😎

Trong javascript thì khởi tạo hàm trong Class thường được sử dụng đó là prototypes, thay vì viết:

```javascript
function Animal(name) {
    this.name = name
}
Foo.prototype.getName = function() {
    return this.name
}
```

Mình có thể viết là:

```javascript
class Animal {
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
}
```

Với cấu trúc Class, ta sẽ biết rõ được các phương thức của hàm, nếu muốn kế thừa:

```javascript
function Animal(name) {
    this.name = name;
}
Animal.prototype.getName = function() {
    return this.name;
}
function Cat(name) {
    Animal.call(this, name);
}
Cat.prototype.constructor = Animal;
```
`extends` để kế thừa Class:

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
}
```
Thay vì tự khởi tạo hàm mới với thừa kết từ hàm trc t có thể sử dụng `extends`

## 4. Tránh dùng các chức năng cơ bản (hạn chế)
Một số tính năng cơ bản từ ES2015 đã được thêm và bổ sung hoàn thiện khiến ta bớt tốn thời gian hơn trong khi viết code.

Ví dụ như sự xuất hiện của method `Array.map()`.
Khi chưa có ES6:

```javascript
function double(arr) {
    let newArr = []
    for(let i = 0; i <= arr.length; i++) {
        newArr[i] = arr[i]
    }
     return newArr
}
```

Khi có ES6:

```javascript
const double = arr => arr.map(item => item * 2)
```

Nhìn nó rất dễ nhìn đúng không 😋

# III. Tóm tắt
Việc refactoring code là thực sự rất cần thiết cho mọi dự án.