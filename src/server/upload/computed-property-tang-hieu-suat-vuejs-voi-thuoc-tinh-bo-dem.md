***Chúng ta cùng xem xây dựng một ứng dụng cần những gì:***

- Logic trong ứng dụng: dữ liệu có thuộc tính data, xử lý dữ liệu có thuộc tính methods*.
- Hiển thị, gán giá trị: cú pháp {{}}, v-bind, v-model. Xử lý hiển thị điều kiện, lặp có v-if, v-for

Vậy thuộc tính **computed** của **Vue instance** là cái gì? Bạn có nhớ ví dụ trong câu hỏi số 4 ở bài [Xây dựng phương thức với thuộc tính methods trong Vue.js](https://viblo.asia/p/xay-dung-phuong-thuc-voi-thuoc-tinh-methods-trong-vue-instance-GrLZDWBeKk0), Vue không thể biết được các phương thức nào cần chạy khi có cập nhật.
![](https://images.viblo.asia/d48a604c-0f14-4c88-ba96-1da32f936fea.gif)

Với **computed** property chúng có thể được giám sát các biến cần cho việc tính toán trước và chỉ chạy khi cần thiết. Chúng ta xem ví dụ ở câu hỏi số 4 được viết lại khi sử dụng computed property thế nào:
```php
<html>
<head>
    <title>Computed property trong Vue.js</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div id="app">
        <p>A = {{ propertyA }}</p>
        <p>B = {{ propertyB }}</p>
        <button v-on:click="a++">Thêm 1 vào a</button>
        <button v-on:click="b++">Thêm 1 vào b</button>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <script type="text/javascript">
        new Vue({
            el: '#app',
            data: {
                a: 0,
                b: 0
            },
            computed: {
                propertyA: function(){
                    console.log('Tính toán thuộc tính A');
                    return this.a;
                },
                propertyB: function(){
                    console.log('Tính toán thuộc tính B');
                    return this.b;
                }
            }
        });
    </script>
</body>
</html>
```



  Bạn hãy mở **console** lên, lúc này các giá trị cần hiển thị chỉ được gọi tính toán khi có sử dụng các biến liên quan. Như vậy mới đúng chứ nếu cứ gọi tất cả các phương thức như lúc đầu thì sẽ phải tính toán dư thừa quá nhiều. Vậy tại sao có computed property mà vẫn có methods? Computed property hoạt động như thế nào?... Tất cả câu trả lời sẽ có ở phần tiếp theo.

![](https://images.viblo.asia/92296856-86af-4582-80f7-ab9a8e1150cc.gif)

# 1. Computed property là gì?
**Computed property** hay các thuộc tính được tính toán trước hay tính toán có "bộ đệm" giống như tên gọi, nó được tính toán và lưu vào bộ đệm và chỉ thực hiện lại việc này khi các biến phụ thuộc thay đổi. Trong thực tế, khi Vue instance được khởi tạo, các thuộc tính dạng computed sẽ được chuyển dạng thành một thuộc tính của Vue với các getter và setter giống như các biến, đối tượng trong thuộc tính data (Xem lại bài viết Hoạt động bên trong của Vue.js). Do vậy, bạn không thể gọi một computed property giống phương thức và computed property cũng không chấp nhận tham số. Trở lại ví dụ đầu bài viết, các thuộc tính computed khi được in ra với cú pháp {{ propertyA }} ở dạng thuộc tính chứ không như gọi phương thức {{ addA() }}. Cách khai báo computed property cũng giống với khai báo các phương thức, chỉ khác là thay vì khai báo trong thuộc tính methods thì giờ khai báo trong thuộc tính computed của Vue instance. Chúng ta thử đưa tham số vào computed property xem sao:
```php
<p>A = {{ propertyA(5) }}</p>
...
computed: {
    propertyA: function(x){
        console.log('Tính toán thuộc tính A');
        return this.a + x;
    },
    ...
}
```

Mở **console** lên bạn sẽ thấy lỗi từ Vue thông báo ra:
![](https://images.viblo.asia/3a8e14f1-d88d-4fec-85b7-1cc8c0d7c6bc.png)

Tại sao vậy, **computed** property có khai báo trông giống phương thức cơ mà, cũng sử dụng từ khóa function??? chúng ta cùng tìm hiểu hoạt động bên trong của Computed property nhé.
# 2. Thêm getter, setter cho thuộc tính computed


Computed property là một thuộc tính do vậy chúng ta có thể lấy giá trị hoặc thiết lập giá trị cho chúng thông qua các hàm getter và setter. Mặc định, thuộc tính computed chỉ có hàm getter để lấy giá trị (Xem lại ví dụ đầu tiên của bài viết):

```php
computed: {
    propertyA: function(){
        console.log('Tính toán thuộc tính A');
        return this.a;
    },
    ...
}
```

Tuy nhiên bạn có thể cài đặt hàm setter để gán giá trị cho nó, để thực hiện điều này chúng ta cần thay đổi computed property từ một hàm (function) thành một đối tượng (object) với hai thuộc tính là get và set. Các thuộc tính get và set này sẽ là các hàm và nó được gọi đến khi chúng ta sử dụng computed property để lấy hoặc thiết lập giá trị. Cấu trúc khai báo computed property có đầy đủ getter và setter như sau:


```php
computed: {
    propertyA: {
        get: function() {
            console.log('Tính toán thuộc tính A');
            return this.a;
        },
        set: function(number) {
            this.propertyA = number;
        }
    },
    ...
}
```

Như vậy nội dung của hàm get() giống với nội dung ban đầu mà chúng ta thiết kế cho thuộc tính computed propertyA. Hàm set của computed property có thể có tham số, ở đây chúng ta truyền vào một số và thiết lập giá trị thuộc tính propertyA bằng đúng số đó.

```php
<html>
<head>
    <title>Computed property trong Vue.js</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div id="app">
        <p>A = {{ propertyA }}</p>
        <p>B = {{ propertyB }}</p>
        <button v-on:click="a++">Thêm 1 vào a</button>
        <button v-on:click="b++">Thêm 1 vào b</button>
        <button v-on:click="propertyA = 100">Gán a = 100</button>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <script type="text/javascript">
        new Vue({
            el: '#app',
            data: {
                a: 0,
                b: 0
            },
            computed: {
                propertyA: {
                    get: function() {
                        console.log('Tính toán thuộc tính A');
                        return this.a;
                    },
                    set: function(number) {
                        this.a = number;
                    }
                },
                propertyB: function(){
                    console.log('Tính toán thuộc tính B');
                    return this.b;
                }
            }
        });
    </script>
</body>
</html>
```

Chú ý, nếu các thuộc tính computed mà không có hàm setter thì khi bạn thiết lập giá trị cho nó, Vue sẽ báo lỗi.
![](https://images.viblo.asia/b2acb0d4-2c29-46c5-a858-f45ddb703334.png)


# 3. Hoạt động bên trong computed property
Nếu bạn đã đọc các Hướng dẫn về framework Vue.js một cách tuần tự, bạn sẽ biết Vue.js là một reactivity system, nó sử dụng Object.defineProperty kết hợp với getter và setter để tạo ra các thuộc tính có thể tự cập nhật (reactivity property). Với thuộc tính computed, chúng ta cần biết được các thuộc tính mà nó phụ thuộc thay đổi như thế nào? Vue.js sử dụng lớp Dep (viết tắt của dependency) để làm việc này, mỗi instance của Dep sẽ có một danh sách các biến có liên quan và nó sẽ thực thi các công việc khi các biến này thay đổi thông qua các hàm callback. (Xem thêm Mô phỏng hoạt động computed property bằng Javascript)

# 4. So sánh computed và methods
Trong hầu hết các ví dụ về methods và computed từ phần Vue instance, chúng ta đều thấy kết quả giống nhau, vậy computed và methods có gì khác nhau, khi nào thì sử dụng computed, khi nào dùng methods? Tất nhiên mọi thứ sinh ra đều có cái lý của nó. Trở lại ví dụ đầu tiên của bài viết chúng ta đã thấy được sự khác biệt giữa các phương thức khai báo trong methods và thuộc tính trong computed đó là thuộc tính computed được cache lại nhằm nâng cao hiệu năng. Thuộc tính computed chỉ được tính toán lại khi cần thiết hay khi các dữ liệu nó phụ thuộc vào thay đổi. Với phương thức thì nó được thực hiện mỗi khi trang được render (với mọi thay đổi). Phương thức cho phép có tham số còn thuộc tính computed thì không. Dựa vào những khác biệt trên, computed và methods chỉ nên dùng khi:

* Chỉ dùng đến phương thức được khai báo trong methods khi cần đến một hàm thuần túy hoặc khi cần có tham số cần truyền vào.
* Với computed property, sử dụng chúng khi bạn muốn thao tác với dữ liệu có trong Vue instance, ví dụ như khi bạn muốn lọc một mảng dữ liệu, chuyển đổi dạng dữ liệu...


Tiếp theo chúng ta sẽ xem xét các ví dụ và phân tích xem tại sao chỉ nên dùng computed hay methods.

**Ví dụ 1:** Trong ví dụ này chúng ta có hai nút A và B, khi nhấp vào nút A hiển thị thông báo "Nút A được nhấn", khi nhấp vào nút B cũng hiển thị thông báo "Nút B được nhấn" nhưng message ở dạng khác. Ngay khi nhận được yêu cầu này chúng ta thấy có thể thiết kế một phương thức với tham số đầu vào là dạng message, như vậy chúng ta chỉ nên sử dụng phương thức khai báo trong methods cho trường hợp này.

```php
<p v-if='message'>{{ message }}</p>
<button @click="action(1)">A</button>
<button @click="action(2)">B</button>
```

```php
data: {
    message: '';
},
methods: {
    action: function (messageType){
        if (messageType == 1) {
            alert('Nút A được nhấn');
        } else if (messageType == 2) {
            this.message = 'Nút B được nhấn';
        }
    }
}
```

**Ví dụ 2:** Cho một mảng chứa các đối tượng gồm các thuộc tính tên và điểm môn học. Hiển thị tổng điểm các môn học. Trong trường hợp này chúng ta sẽ sử dụng computed property do nó liên quan đến việc thao tác với dữ liệu có sẵn.
```php
data: {
    subjects: [
        {name: 'Triết học', mark: 5},
        {name: 'Vật lý đại cương', mark: 10},
        {name: 'Kỹ thuật nhiệt', mark: 8}
    ];
},
computed: {
    totalMark: function (){
        let total = 0;
        for(let i = 0; i < this.subjects.length; i++){
           total += parseInt(this.subjects[i].mark);
        }
        return total;
    }
}
```
Đến giờ thì bạn hẳn đã phân biệt được khi nào dùng computed và khi nào dùng methods. Với những kiến thức trong bài, hy vọng các bạn sẽ áp dụng tốt cho các dự án thực tế, tối ưu hóa tối đa, nâng cao hiệu năng hệ thống.

# 5. Lời kết
Kiến thức trong bài viết được đúc kết trong quá trình nghiên cứu framework Vue.js cũng như trải qua một số dự án thực tế, nhưng cũng không tránh khỏi chủ quan duy ý chí, vậy nên có bất kỳ góp ý nào các bạn hãy để lại qua các comment cuối bài. Thắc mắc nhiều giúp chúng ta tìm hiểu kỹ hơn và càng hiểu một cách cụ thể hơn. Trong bài viết có khá nhiều ví dụ nên các bạn hãy cố gắng viết lại và tự tìm hiểu ở các khía cạnh khác nhau, khi có ý tưởng về một bài tập, nội dung sẽ được cập nhật sau. Hẹn gặp lại các bạn trong bài viết kế tiếp.