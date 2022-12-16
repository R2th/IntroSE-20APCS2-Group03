Sự phát triển của web ngày nay cũng là một nguyên nhân khiến javascript có sự bùng nổ mạnh mẽ. Dù là bất kì lúc nào hay trong công đoạn này, JS luôn được ứng dụng thực tế trong các project. Theo khảo sát của StackOverflow năm 2020, Javascript là ngôn ngữ được sử dụng nhiều nhất hiện nay và số lượng người dùng nó tăng rất mạnh.

![](https://images.viblo.asia/48b32644-39f5-4bbc-b8b1-6e02381c1813.png)

Mặc dù vậy, phần lớn người dùng đều biết rằng khởi đầu của Javascript, quá trình gây dựng thực sự gặp khó khăn, thậm chí còn tạo ra một số câu chuyện cười trên internet về các chức năng của nó. Ngày nay mọi thứ đã thay đổi, và một số phiên bản của EcmaScript (hiệp hội Châu Âu về tiêu chuẩn hóa hệ thống thông tin và truyền thông) đã ra đời để chuẩn hóa các chức năng này.

Vào năm 2020, một phiên bản mới của EcmaScript xuất hiện, cùng với đó là một số tính năng đã được thêm vào trình duyệt. Trong bài viết này, chúng ta sẽ lướt qua từng loại và khám phá công dụng của nó. Bạn đã sẵn sàng chưa?

### BigInt
Số lượng biểu diễn số nguyên là một trong những tính năng có trong phiên bản mới của ES11. Trước đây, số đại diện tối đa trong javascript là **9007199254740991**.

![](https://images.viblo.asia/4131bdec-add4-4670-8ade-ff16f32163a4.png)

Giờ đây, với bigInt, chúng ta có thể vượt xa con số đó.

![](https://images.viblo.asia/163ce27d-0ef1-4d5e-a755-ca30f4c1b26a.png)


### Dynamic import
Bây giờ, với Javascript, chúng ta có thể nhập các modules động thông qua các biến (variables). Các biến nhận các modules có thể bao gồm namespace của các modules này theo cách toàn cục.

```
let Dmodule;

if ("react") {
  Dmodule = await import('react')
} else {
  Dmodule = await import('vue')
}

/* It is possible to use Dmodule. (Methods)
throughout the file globally */
```

### Exporting modules
Một cú pháp mới đã được thêm vào cho phép import các modules tương tự như đã tồn tại, hãy xem ví dụ bên dưới:

```
// Existing in JS
import * as MyComponent from './Component.js'

// Added in ES11
export * as MyComponent from './Component.js'
```

### Optional Chaining
Chuỗi tùy chọn, được biết đến với người dùng babel, hiện được hỗ trợ bởi Javascript. Chức năng này loại bỏ sự cần thiết của các điều kiện trước khi gọi một biến hoặc phương thức có trong nó.

```
const user = {
  "name": "Aryclenio Barros",
  "age": 22,
  "alive": true,
  "address": {
    "street": "Hyrule street",
    "number": 24,
  }
}

// Without optional chaining
const number = user.address && user.address.number

// With optional chaining
const number = user.address?.number
```

### Nullish Coalescing Operator
Một toán tử mới đã được thêm vào Javascript. Nó dẫn đến sự khác biệt giữa giá trị falsey của Javascript. Chúng tôi sử dụng điều kiện falsey với || operator. Các giá trị falsey là:

* 0
* undefined
* null
* false
* NaN

![](https://images.viblo.asia/32024f17-75b7-42eb-b312-38027dbeef95.png)

Toán tử mới chỉ cho phép undefined và null, cho phép các biến bao gồm phần còn lại của các giá trị là đúng trong một điều kiện. Lưu ý rằng, khác với trường hợp trên, các giá trị 0, NaN và false được giữ nguyên ngay cả khi một giá trị không phải falsey được pass.

![](https://images.viblo.asia/23179311-9b19-4261-97d2-c3876e566543.png)


### Promise.AllSettled
Thuộc tính Promise.AllSettled cho phép bạn thực hiện một điều kiện quan sát xem tất cả các promises trong một mảng đã được giải quyết hay chưa. Xem ví dụ bên dưới:

```
const myArrayOfPromises = [
    Promise.resomve(myPromise),
    Promise.reject(0),
    Promise.resolve(anotherPromise)
]

Promise.AllSettled(myArrayOfPromises).then ((result) => {
   // Do your stuff
})
```

### matchAll
Phương thức matchAll là một tính năng giúp trình bày chi tiết hơn các so sánh regex trong một chuỗi. Kết quả của nó là một mảng cho biết các vị trí, cũng như nhóm chuỗi và nguồn tìm kiếm. Xem ví dụ về regex cho phép các giá trị từ 0 đến 5 với phương thức matchAll.

![](https://images.viblo.asia/8a9106ba-33d6-4fef-9737-79c57c21be02.png)


### Conclusion
Bên cạnh các tính năng này, còn vô số tính năng mới hay ho, bạn có thể xem toàn bộ các thay đổi trên trang web chính thức của Ecma.

Link tham khảo [tại đây](https://dev.to/aryclenio/the-new-features-of-javascript-in-2020-es11-7jc)