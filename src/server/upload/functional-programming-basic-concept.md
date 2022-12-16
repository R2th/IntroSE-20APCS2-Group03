Từ những năm 1930, trong giới tin học đã xuất hiện hai hình thái tiếp cận nguyên lý xử lý tính toán trong máy tính. Đó là Turing Machine của Alan Turing và Lambda Calculus của Alonzo Church, thường được giới chuyên môn gọi là Luận đề Church - Turing ([The Church-Turing Thesis](https://plato.stanford.edu/entries/church-turing/)).

Turing Machine đặt cơ sở trên việc xử lý state machine và trạng thái tiến trình, còn ý tưởng của Lambda Calculus lại được xây dựng dựa trên các tính chất của hàm toán học. Ở đây, mình sẽ không đi sâu vào Luận đề này, chỉ biết rằng, đây là cơ sở , khởi nguồn cho 2 trường phái, 2 phong cách lập trình (Programming Paradigm) đó là OOP (Object-Orriented Programming) và FP (Functional Programming).

Trong lịch sử công nghệ, có vẻ OOP chiếm ưu thế hơn cả so với Functional Programming, tuy nhiên vẫn có nhiều những tín đồ chọn con đường FP. Functional Programming bắt đầu được chú ý nhiều hơn vào những năm 2010, thời mà người ta bắt đầu phàn nàn nhiều hơn về OOP, như luận điểm banana-gorrila của Joe Amstrong vậy, thậm chí có những học giả trong ngành còn đề cao Functional Programming như nấc thang tiến hoá trong lịch sử lập trình.

Nghe có vẻ cực đoan, nhưng không hẳn như thế. Cũng giống như Luận đề Church-Turing, Functional Programming không bài xích OOP, nó chỉ là một cách tiếp cận khác trong khi viết code, bạn hoàn toàn có thể sử dụng kết hợp nhiều programming paradigm để đạt được mong muốn.

Nếu là một lập trình viên ReactJS như mình thì bạn có thể thấy nó coi như là 70% functional programming và 30% OOP

## What's Functional Programming?

Đơn giản thì:

*Functional Programming là phong cách lập trình lấy function làm trung tâm*
Thay vì hướng đối tượng như OOP, Functional Programming quan tâm chủ yếu vào function, kiểu như bạn chỉ quan tâm đến "cần làm gì" chứ không phải "ai cần làm gì" như OOP.

Trong Functional Programming, không có các lệnh gán, cũng không cần các biến hay trạng thái toàn cục, ta sẽ điều khiển chương trình giống như 1 dây chuyền các function, ở đó tuỳ thuộc vào cách kết hợp các function để có được kết quả mong muốn.

Để bắt đầu tìm hiểu Functional Programming, ta cần phải nắm bắt những khái niệm cơ bản như Immutability, Purity, Higher-order functions, function composition... sau đó là những thứ phức tạp hơn như Monrad, Functor ...

## Functional Programming: basic concept
Chúng ta cùng bắt đầu với tính chất đầu tiên của FP, đó là Immutability

### Immutability

Immutability dịch ra là tính bất biến.

Đây là nguyên tắc đầu tiên của FP, mọi thứ xuất hiện trong Functional programming đều không thay đổi kể từ lúc chúng được khởi tạo. Các biến hay đối tượng nếu có thì cũng phải immutable.

Đó là điều kiện lý tưởng. Trong thực tế, cần phải hạn chế tối đa sự thay đổi. Bạn có thể thấy được điều này trong sự chuyển mình của Javascript khi bỏ hẳn *var* thay vào đó là dùng *let* một cách hợp lý và khuyến khích sử dụng *const*.

Như thế này là không đáp ứng được Immutability:

```
var x = 10;
y += 2 // y đã bị thay đổi
```

### Purity

Nguyên tắc thứ 2 trong Functional Programming. Tất cả các function trong đó đều phải là *pure function*, nghĩa là không có side effects, không có tác động đến các giá trị bên ngoài, cũng không chỉnh sửa tham số đầu vào. Và tất nhiên nó cũng phải bất biến, với cùng một giá trị đầu vào, hàm sẽ luôn trả về duy nhất 1 giá trị bất chấp có gọi vào thời điểm hay bao nhiêu lần đi chăng nữa.

Ví dụ cho 1 hàm không phải là pure function
```
const sum = (a) => {
  return Math.random() + a;
}
```

Ví dụ về 1 hàm thoả mãn là pure function

```
const sum = (a, b) => {
  return a + b;
}
```

Trên đấy là 2 nguyên tắc cơ bản của Functional Programming.

## Higher-order function (HOF)

Khái niệm tiếp theo trong FP. Về cơ bản HOF là nhưng hàm mà nhận vào 1 function làm tham số hay trả về kết quả là 1 function.

Ví dụ:

```
const getResult = (process) => {
  return (data) => {
    return process(data);
  }
}
```

Lợi ích của HOF chính là việc thay đổi cách tư duy logic chương trình. Các thao tác trong chương trình sẽ được giản lược, việc xử lý logic sẽ được đẩy về "phía cuối con đường" đó chính là các hàm plugin.

Bạn có các data đầu vào, mục đích của bạn là muốn lấy ra kết quả tương ứng với các xử lý logic, các mục đích khác nhau. HOF giống như 1 giao diện tổng quát để chúng ta thao tác dữ liệu vậy. Phong cách viết như này sẽ mang lại cho chúng ta một chương trình rất dễ mở rộng.

Ví dụ sử dụng hàm getResult bên trên để tìm số lớn nhất trong 1 mảng:

```
// plugin xử lý logic tìm max từ array
const max = (arr) => {
    return Math.max(...arr);
}

// lắp ráp plugin vào getResult
const getMax = getResult(max)

// Chạy thử

const data = [1, 2, 3, 4]
getMax(data) // => 4
```

Ta lại có 1 mảng dữ liệu gồm người và tuổi của họ, muốn tìm người trẻ nhất thì sao? Vẫn có thể dùng lại getResult, chỉ cần thêm 1 plugin khác phụ trách xử lý logic thôi:

```
// plugin
const youngest = (people) => {
    return people.reduce((prev, cur) => {
        return prev.age < current.age ? prev : cur;
    });
}

const getYoungest = getResult(youngest)

const data = [
    { name: 'Nam', age: 27 }, 
    { name: 'Ngoc', age: 25 },
    { name: 'Tran', age: 30 },
];
getYoungest(data) // => { name: 'Ngoc', age: 25 }
```

Trên đây mới là một vài tính chất cơ bản của Functional Programming.

Tóm lại: Functional Programming lấy function làm đơn vị thao tác cơ bản, mọi thứ trong nó đều bất biến, mọi function đều là pure function, và đa phần các function đều là Higher-order functions.

Chúng ta sẽ tiếp tục tìm hiểu trong các phần sau.