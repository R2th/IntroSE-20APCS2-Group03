## 1. Nullish Coalescing Operator : ??

Như ta đã biết, toán tử || thường được sử dụng để đăt giá trị mặc định, nhưng sẽ là thiếu sót nếu như ở bên vế trái của || là dạng falsey (ví dụ như string rỗng, 0, undefined, null, false, NaN) và chúng ta sẽ luôn nhận được giá trị mặc định thay vì giá trị bên vế trái. **Nullish coaleascing ??** sẽ thêm cho chúng ta khả năng kiểm tra giá trị **nullish** (undefined, null) một cách chuẩn xác thay vì giá trị falsey.

```
false || 'default' // return 'default'
false ?? 'default' // return false
NaN || 'default' // return 'default'
NaN ?? 'default' // return NaN
undefined || 'default' // return 'default'
undefined ?? 'default' // return 'default'
null || 'default' // return 'default'
null ?? 'default' // return 'default'
```

## 2. Exponentiation Operator (Toán tử luỹ thừa) : **

Thay vì sử dụng Math.pow như trước đây, bạn có thể sử dụng toán tử **

```
4 ** 2 // return 16
```

## 3. Optional Chaining Operator : ?.

Toán tử optional chaining cho phép bạn truy cập vào những thuộc tính có khả năng là nullish mà không trả ra 1 ngoại lệ. Nó cho phép bạn truy cập vào những thuộc tính trong 1 đối tượng nhiều cấp mà không phải lo lắng rằng thuộc tính ấy có tồn tại hay không. Nó cũng có thể sử dụng với việc gọi hàm và mảng. Nếu giá trị không tồn tại, ***undefined*** sẽ được trả về.

```
const myobj = {x: {y: 1}}
myobj.x.y // return 1
myobj.x?.y // return 1
myobj.t.z // raise Exception TypeError
myobj.t?.z // return undefined
myobj.t?.z?.a?.b?.c // return undefined
myobj.t?.not_exist_func?.() // return undefined
myobj?.my_fake_array?.map(item => item+1) // return undefined
```

## 4. Numeric Separators: _

Những chuỗi số quá lớn sẽ khiến chúng ta khá là khó để nhận biết một cách nhanh chóng, đặc biệt là nhưng con số với những chữ số lặp lại nhiều lần. Để tăng khả năng đọc hiểu chúng, bạn có thể dùng gạch dưới như là dấu phân cách giữa các chữ số

```
let value = 1000000000000
let value = 1_000_000_000_000 // same value of 1000000000000
```

## 5. BigInt

Số lớn nhất mà bạn có thể lưu trữ như là một số nguyên trong javascript là pow(2, 53) - 1. BigInt thực sự sẽ cho phép bạn vượt xa hơn thế.

```
let mymax = Number.MAX_SAFE_INTEGER // return 9007199254740991
++mymax // return 9007199254740992
++mymax // return 9007199254740992 (that’s the same as above!)
let mybig = BigInt(9007199254740991);
++mybig // return 9007199254740992n
++mybig // return 9007199254740993n
```

## 6. Required Function Params

Mở rộng trên kỹ thuật tham số mặc định, chúng ta có thể đánh dấu một tham số là bắt buộc. Trước tiên, hãy xác định một hàm để xử lý lỗi với một thông báo lỗi.

```
let isRequired = () => {
    throw new Error('This is a mandatory parameter.');
}
```

Sau đó chỉ định function đó là giá trị mặc định cho tham số bắt buộc. Nhớ rằng, giá trị mặc định sẽ bị bỏ qua khi một giá trị được truyền vào cho tham số tại thời điểm gọi hàm. Nhưng giá trị mặc định sẽ được chọn nếu như giá trị truyền vào tham số là undefined

```
let greetings = (name=isRequired(), message='Hello,') => {
    return `${message} ${name}`;
}
console.log(greetings());
```

![](https://images.viblo.asia/bcec030b-5315-4b4b-a622-9d21d0874a59.png)