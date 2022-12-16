Loại đối tượng Set được giới thiệu trong ECMAScript 2015 và sẵn sàng được sử dụng trong Node.js và hầu hết các trình duyệt.
Sets rất giống Arrays, nhưng hơi khác một chút. Bài viết này tìm hiểu những khác biệt này và giải thích khi nào nên sử dụng cái nào.

## Sets, the new kid in the Block

Set là một loại đối tượng đặc biệt có sẵn trong ES6. Bạn có thể tạo một set rỗng như thế này:

 `const characters = new Set()`
 
 Hoặc, bạn có thể chuyển một iterable vào hàm tạo Set Set để điền vào nó. Một iterable chỉ là một cái gì đó có thể được lặp qua, như Mảng hoặc Chuỗi.
 
 `const characters = new Set(['Rod', 'Todd', 'Sherri', 'Terri'])`
 
 ## Arrays, the Trusty Workhorse

Mảng là một loại kiểu dữ liệu thường dùng trong hầu hết các ứng dụng JavaScript, cả cũ và mới. Nếu bạn đã viết JavaScript trước đây, có lẽ bạn đã quen thuộc với chúng. Bạn có thể tạo một mảng như thế này:

`const characters = ['Rod', 'Todd', 'Sherri', 'Terri']`

## So What’s the Point?

Hai loại dữ liệu này trông có vẻ tương tự nhau nhưng sao lại phải sinh ra Set. Set được thiết kế để thể hiện 1 tập hợp của những phần tử duy nhất trong khi một mảng có mục đích chung hơn một chút. 

Một ví dụ điển hình về thứ gì đó có thể  được biểu diễn như là 1 Set sẽ là các khoá học mà một sinh viên đại học học trong 1 học kỳ. Họ có thể tham gia một hoặc nhiều môn học, nhưng hộ không thể học một môn nhiều hơn 1 lần trong 1 học kỳ.

`const courses = new Set(['English', 'Science', 'Lego Robotics'])`

Mặt khác, 1 tập hợp các thẻ bài Pokemon sẽ không phải một ví dụ cho Set bởi vì nó có thể chứa những phần tử trùng lặp. Ở ví dụ này, sử dụng mảng sẽ là lựa chọn tốt nhất để thể hiển dữ liệu

`const cards = [
  'Machop',
  'Diglett',
  'Charmeleon',
  'Machop',
  'Squirtle'
]`


Sự trùng lập có thể truyền vào 1 Set, nhưng chúng sẽ không được giữ lại. 

`new Set([
  'Machop',
  'Diglett',
  'Charmeleon',
  'Machop',
  'Squirtle'
])`

`// Set(4) {"Machop", "Diglett", "Charmeleon", "Squirtle"}`

Mảng được truyền vào Set có bao gồm 2 'Machops', nhưng Set chỉ giữ lại duy nhất 1. Hành động này rất tinh tế và rất hữu dụng.

## How Can This Be Used?

Hãy tưởng tượng rằng bạn đang phát triển một blog và muốn tạo một tính năng cho phép khách truy cập tìm kiếm các bài đăng phù hợp với một hoặc nhiều danh mục. Mỗi danh mục chỉ nên được áp dụng một lần.
Nếu bạn đang sử dụng Mảng để thể hiện danh sách các danh mục đang hoạt động, bạn cần cẩn thận để tránh trùng lặp. Điều này có thể được thực hiện bằng cách kiểm tra xem danh sách chưa chứa danh mục đang được thêm vào.
Các phương thức IndexOf hoặc Includes có thể được sử dụng để làm điều này:

> // If our list does not include the category
> 
> if (!list.includes(category)) {
> 
>  // Then add the new category to the list
>  
>   list.push(category)
>   
> }

Tôi sử dụng cách này thường xuyên trong xử lý của mình, nhưng Set có thể được sử dụng để xử lý vấn đề này một cách tự động. Bạn có thể chỉ cần đơn giản sử dụng phương thức add và Set sẽ luôn luôn giữ lại những phần tử duy nhất.

> let list = new Set()
> 
> list.add(category)

## Converting a Set Back to an Array

Chúng ta đã thấy một mảng có thể được chuyển đổi thành 1 Set bằng cách truyền mảng vào hàm khởi tạo Set. 

Nhưng làm cách nào để chuyển đổi ngược lại?

Có 1 tuỳ chọn là gọi mảng từ phương thức tĩnh:

>const set = new Set(['Casablanca', 'The Wizard of Oz', 'Jaws'])
>
>const arr = Array.from(set)
>
>console.log(arr)
>
>// (3) ["Casablanca", "The Wizard of Oz", "Jaws"]


Hoặc có thể sử dụng spread operator trong ES6 cũng là 1 lựa chọn:

> const set = new Set(['Casablanca', 'The Wizard of Oz', 'Jaws'])
> 
> const arr = [...set]
> 
> console.log(arr)
> 
> // (3) ["Casablanca", "The Wizard of Oz", "Jaws"]
> 
Set không hỗ trợ các phương thức functional programming như map, filter, reduce nên thông thường chúng ta phải chuyển đổi chúng về mảng để xử lý.

## How Do Sets Know Which Values Are Unique?

Chúng ta đã thấy Set chỉ giữ lại những giá trị duy nhất, nhưng chính xác thì bằng cách nào Set xác định các giá trị duy nhất. Cùng thử qua 1 ví dụ.

Đầu tiên, thêm 1 phần từ 3 vào 1 Set 2 lần:

>new Set([1, 2, 3, 4, 3])
>
> // Set(4) {1, 2, 3, 4}
> 

số 3 thứ hai biến mất. Điều này phù hợp với những gì chúng tôi đã học được cho đến nay, nhưng nếu số 3 cuối cùng được thêm vào dưới dạng chuỗi thì sao?

> new Set([1, 2, 3, 4, '3'])
> 
>// Set(5) {1, 2, 3, 4, "3"}
>
Thật  thú vị. Set coi 3 khác với '3'. Điều gì xảy ra nếu chúng ta thêm các mảng giống nhau vào một Set?

> new Set([['Jesse Pinkman'], ['Jesse Pinkman']])
> 
>// Set(4) {['Jesse Pinkman'], ['Jesse Pinkman']}
>

Trong trường hợp này Set giữ lại 2 mảng có cùng nội dung, còn Object thì sao?

> new Set([{name: 'Ron Burgundy'}, {name: 'Ron Burgundy'}])
> 
>// Set(2) {{name: 'Ron Burgundy'}, {name: 'Ron Burgundy'}}
>

Cũng tương tự, Object với nội dung giống nhau vẫn được coi là khác nhau.

## How Can All This Be Explained?

Sets sử dụng (===) để xác định giá trị nào là duy nhất. Điều này giải thích tại sao Set duy trì một bản sao của cả 3 (số) và '3' (chuỗi).
Nó cũng giải thích tại sao Mảng và đối tượng bằng chữ có cùng nội dung được tìm thấy là duy nhất. JavaScript so sánh các đối tượng bằng tham chiếu của chúng, không phải nội dung của chúng và Mảng chỉ là một loại đối tượng cụ thể.

## Summary

Set cung cấp cho các nhà phát triển JavaScript một cách mới để biểu diễn dữ liệu. Mặc dù Mảng vẫn là đặc điểm chung của các ứng dụng JavaScript, Set được dự định đại diện cho một bộ giá trị duy nhất.

Chuyển đổi giữa Bộ và Mảng rất dễ dàng. Bạn có thể sử dụng Set để đảm bảo dữ liệu của bạn vẫn duy nhất và sau đó chuyển đổi nó thành Mảng để tận dụng các phương thức như map, filter, reduce.

Set sử dụng đẳng thức nghiêm ngặt để so sánh các giá trị và xác định cái gì là duy nhất. Vì JavaScript so sánh các đối tượng theo tham chiếu, Mảng và nghĩa đen của đối tượng có thể được coi là duy nhất ngay cả khi chúng chứa cùng một nội dung.

Set sẽ là một lựa chọn tuyệt vời cho những tập hợp dữ liệu cơ bản, thuần tuý chỉ có một kiểu dữ liệu mà yêu cầu phải duy nhất, không cần thêm những bước để loại bỏ sự trùng lặp.

[Source: https://medium.com/better-programming/javascript-sets-vs-arrays-25337bea7939](https://medium.com/better-programming/javascript-sets-vs-arrays-25337bea7939)