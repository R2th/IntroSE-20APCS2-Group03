> Trong JavaScript, tại sao một mảng rỗng lại không bằng một mảng rỗng khác? Đâu là sự khác nhau giữa hai objects "giống hệt nhau" này?
> ![](https://images.viblo.asia/769c29f4-44da-43ca-8e5d-414a3ed74c09.png)

Với những người đã có kinh nghiệm làm việc với JavaScript thì điều này khá minh bạch: ```firstArr``` và ```secondArr``` là 2 mảng khác biệt, và do đó, dĩ nhiên chúng sẽ không "*equal*". Tuy nhiên, đối với một lập trình viên Ruby thì cái nhìn của họ không như vậy: 2 mảng này có cùng content, do đó chúng "*equal*". 

Vấn đề ở đây là sự khác biệt về quan điểm giữa ý nghĩa của toán tử so sánh giữa 2 ngôn ngữ Ruby và JavaScript. Một ngôn ngữ sử dụng khái niệm về **object equivalence** (đối tượng tương đồng) để so sánh cấu trúc dữ liệu, trong khi ngôn ngữ còn lại thì lại kiểm tra thông qua **object identity** (đồng nhất thức đối tượng).

![](https://images.viblo.asia/b8892c04-5f2f-4ba4-84f1-cd50f71a2a56.png)

# Tính tương đồng của cấu trúc dữ liệu trong Ruby

Khi bạn thực hiện so sánh cấu trúc dữ liệu sử dụng toán tử built-in ```==``` trong Ruby, thực chất bạn đang so sánh nội dung bên trong của 2 object - và trong ví dụ trên thì là 2 mảng, và đồng thời cũng kiểm tra thứ tự các phần tử của 2 mảng liệu có khớp nhau. Điều này nghĩa là 2 biến trỏ tới 2 objects khác nhau trong bộ nhớ có thể bằng nhau:
```ruby
first_array, second_array = [1,2,3], [1,2,3]

first_array == second_array #=> true
```

Nếu bạn thực sự muốn kiểm tra xem liệu 2 biến đó có trỏ tới cùng 1 object, bạn có thể kiểm tra object ID, hoặc, tốt hơn hết là sử dụng hàm ```.equal?```
```ruby
first_array, second_array = [1,2,3], [1,2,3]

first_array.object_id #=>47291249293100
second_array.object_id #=>47291249293080
first_array.object_id == second_array.object_id #=> false
first_array.equal?(second_array) #=> false
```

Không giống JavaScript, toán tử so sánh trong Ruby thực chất là một hàm được định nghĩa trong class mà chúng ta thực hiện so sánh. Và vì ```===``` chỉ là một method, chúng ta có thể ghi đè nó nếu muốn. Cách tiếp cận này khá là hợp lý nếu chúng ta muốn định nghĩa 1 class tùy biến và cần so sánh với class khác. 
```ruby
class Pepe
    def self.== other
        true
    end
end

Pepe == 'Oy' #=> true
Pepe == 2 #=> true
Pepe == false #=> true
```
![](https://images.viblo.asia/3cfbdb2a-e71f-4b80-b1d5-2f4a2a0a807d.png)

# Tính tương đồng của cấu trúc dữ liệu trong JavaScript
Không giống Ruby, JavaScript không công khai unique ID cho object bởi vì nó **không cần thiết**. Cấu trúc dữ liệu trong JavaScript mặc định được so sánh thông qua đồng nhất thức. Nếu 2 biến là tương đương, chúng chắc chắn phải trỏ tới cùng một object trong bộ nhớ
```js
const firstArray = [1, 2, 3]
const secondAray = [1, 2, 3]
firstArray === secondArray /* false */
```
Nếu bạn muốn kiểm tra 2 cấu trúc dữ liệu tách biệt có cùng content, bạn phải tự định nghĩa hàm logic của mình, hoặc dùng một vài hàm built sẵn của các thư viện - ví dụ như [Lodash](https://lodash.com/docs/4.17.11#isEqual) chẳng hạn
```js
const arraysAreEqual = (array1, array2) => {
  return array1.every((el, index) => el === array2[index])
}
arraysAreEqual([1,2,3],[1,2,3]) /* true */
> arraysAreEqual([1,2,3],['a','b','c']) /* false */
```

# TL;DR
Toán tử ```===``` trong JavaScript kiểm tra 2 đối tượng được so sánh liệu có bằng nhau về giá trị, trong khi hàm ```==``` trong Ruby kiểm tra xem content của 2 mảng hoặc hash có bằng nhau hay không.
![](https://images.viblo.asia/f5b9417a-339e-48c4-9a49-2fc5cd17a364.png)

Dòng lệnh ```[1,2,3] == [1,2,3]``` trong Ruby sẽ được dịch thành ```[1,2,3].every((el, index) => el === [1,2,3][index])``` trong JavaScript.

Trong JavaScript, ```[1,2,3] === [1,2,3]``` tương đương với ```[1,2,3].equal?([1,2,3])``` trong Ruby


-----

*Nguồn bài viết: [Equality of Data Structures: Ruby vs. JavaScript](https://dev.to/annarankin/equality-of-data-structures-ruby-vs-javascript-48b7)*