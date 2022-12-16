"*Clean code is simple and direct. Clean code reads like well-written prose. Clean code never obscures the designer's intent but rather is full of crisp abstractions and straightforward lines of control.*" - ***Robert C.Martin***

## 1. Magic number

Magic number nghĩa là chúng ta đang gán một con số không có ý nghĩa rõ ràng. Đôi khi chúng ta sử dụng một giá trị cho một mục đích cụ thể và chúng ta không chỉ định giá trị cho biến đó một cách có ý nghĩa. Vấn đề là khi ai đó làm việc với code của bạn, thì người đó sẽ khó có thể biết được ý nghĩa của giá trị trực tiếp đó.

```
//Bad practice
for(let i = 0; i < 50; i++){
    //do something
}
//Good practice
let NUMBER_OF_STUDENTS= 50
for(let i = 0; i < NUMBER_OF_STUDENTS; i++){
    //do something
}
```

## 2. Deep nesting

Đôi khi chúng ta sử dụng các vòng lặp lồng nhau nhìn rất khó hiểu. Cách để xử lý vấn đề này là chúng ta sẽ tách hết tất cả các vòng lặp thành các hàm riêng biệt để thay thế.

Giả sử chúng ta có một mảng của một mảng khác và lại chứa một mảng khác, bài toán đặt ra là chúng ta muốn giá trị nằm ở mảng trong cùng. Chúng ta có thể viết vòng lặp lồng nhau, tất nhiên nó sẽ hoạt động đúng với yêu cầu ta đặt ra. Nhưng đây không phải là cách thích hợp. việc tách ra một hàm có thể làm điều tương tự có thể làm code của của chúng ta gọn gàng, ít lặp lại, có thể dễ đọc hơn và có tính tái sử dụng.

```
// bad practice
const array = [ [ ['Shoaib Mehedi'] ] ]
array.forEach((firstArr) =>{
    firstArr.forEach((secondArr) => {
        secondArr.forEach((element) => {
            console.log(element);
        })
    })
})

// good practice
const array = [ [ ['Shoaib Mehedi'] ] ]
const getValuesOfNestedArray = (element) => {
    if(Array.isArray(element)){
        return getValuesOfNestedArray(element[0])
    }
    return element
}
getValuesOfNestedArray(array)
```

3. Comments

Comments giúp mọi người sau này khi đọc lại code có thể dễ dàng hiểu đoạn code này đang làm gì và nhằm mục đích gì. Chúng giúp các lập trình viên khác làm việc trong cùng một dự án. Comment trong code có thể đồng nghĩa với việc là code của bạn không thể tự giải thích. Đây là một câu nói nổi tiếng về việc viết bình luận trong code của Jeff Atwood

> “While comments are neither inherently good or bad, they are frequently used as a crutch. You should always write your code as if comments didn’t exist. This forces you to write your code in the simplest, plainest, most self-documenting way you can humanly come up with.” — Jeff Atwood

Nhận xét nên tốt, nhưng mã của bạn cần phải tự giải thích.

## 4. Avoid large function

Khi một hàm hoặc một lớp lớn hơn nhiều, thì bạn nên tách chúng thành nhiều phần. Điều này sẽ làm cho mã của chúng ta dễ đọc, sạch sẽ, dễ hiểu và cũng có thể tái sử dụng. Giả sử chúng ta cần cộng và trừ hai số.  Chúng ta có thể làm điều đó với một hàm duy nhất. Nhưng cách thực hiện tốt hơn là chia chúng thành hai. Khi có các chức năng riêng lẻ, thì điều này sẽ được sử dụng lại trong toàn bộ ứng dụng.

```
// bad practice
const addSub = (a,b) => {
    // add
    const addition = a+b
    // sub
    const sub = a-b
    // returning as a string
    return `${addition}${sub}`
}

// good practice
// add
const add = (a,b) => {
    return a+b
}
// sub
const sub = (a,b) => {
    return a-b
}
```

## 5. Code Repetition
Mã lặp lại có nghĩa là một khối mã được lặp lại trong mã của bạn nhiều hơn một lần. Điều này có nghĩa là phần mã của bạn cần được trích xuất thành một hàm. Đây là một ví dụ mà chúng ta sử dụng trong mục 2, Deep nesting. Nhìn vào phần đầu tiên, chúng ta đã lặp lại điều tương tự ba lần. Giải pháp làm cho một chức năng riêng lẻ làm cùng một việc là giải pháp tốt hơn, ngoài ra, điều này có thể tái sử dụng.

```
// bad practice
const array = [ [ ['Shoaib Mehedi'] ] ]
array.forEach((firstArr) =>{
    firstArr.forEach((secondArr) => {
        secondArr.forEach((element) => {
            console.log(element);
        })
    })
})

// good practice
const array = [ [ ['Shoaib Mehedi'] ] ]
const getValuesOfNestedArray = (element) => {
    if(Array.isArray(element)){
        return getValuesOfNestedArray(element[0])
    }
    return element
}
getValuesOfNestedArray(array)
```

## 6. Variable Naming
Camel case là tiêu chuẩn đặt tên cho tất cả các biến và hàm, cũng như các định danh khác. Điều này có nghĩa là tên phải bắt đầu bằng một chữ cái in thường và mọi chữ cái đầu tiên của từ tiếp theo sẽ là chữ viết hoa.

Cả hàm và biến đều phải tuân thủ quy tắc.

```
let camelCase = ''
const thisIsCamelCase = () => {
    //so something
}
```

## 7. Meaningful Names.
Một cái tên có ý nghĩa là một trong số những quy ước quan trọng nhất. Luôn sử dụng tên biến có ý nghĩa cho các biến, hàm và các tên khác. Chọn một cái tên thể hiện ý nghĩa, mục đích của bạn.

Nếu chúng ta cần một hàm lấy thông tin ngân hàng của người dùng, thì chúng ta không được sử dụng tên như "getUserInfo" hoặc những thứ tương tự. Chúng ta nên sử dụng "getUserBankInfo" hoặc thậm chí là cụ thể hơn.

## 8. Favor Descriptive Over concise
Cố gắng sử dụng chi tiết cho bất kỳ cách đặt tên nào. Giả sử chúng ta cần một chức năng sẽ tìm một người dùng với số điện thoại của họ. Ở đây chúng ta có thể sử dụng những cái tên có ý nghĩa, nhưng rất có thể xảy ra sai sót nếu có những chức năng khác tương tự. Chúng ta phải sự dụng một cái tên chi tiết, có ý nghĩa và thể hiện được ý nghĩa một cách tóm tắt.
```
//We want a function for search user against phone no
//Bad practice
const searchUser = (phone) => {
//Do something
}
//Good practice
const searchUserByPhoneNo = (phone) => {
//Do something
}
```