# Functors trong JavaScript là gì?
Functors là gì? Đôi khi, logic chính xác sẽ là bất khả thi bởi sự phức tạp của data trong thế giới lập trình. Do đó, data trừu tượng (data abstraction) là một tool rất hữu ích giúp ta tạo một đại diện đơn giản cho data

Để có thể đạt được điều này, chúng ta tạo ra ‘Containers’, những container này sẽ chỉ chứa data và không làm gì khác. Ta cũng không cung cấp cho chúng những properties hoặc methods như trong lập trình hướng đối tượng OOP.


**Tìm hiểu 4 thuộc tính cơ bản của OOP là gì?**

Khi cho một giá trị vào container thì nó sẽ giúp giữ giá trị đó được an toàn, trong khi được pass qua functional logic. Và ta chỉ lấy nó khi rất cần thiết. Như vậy, container có 2 task chính:

* Chứa giá trị bên trong chính nó
* Trả giá trị lại khi chúng ta cần
Và nó cũng không làm biến đổi giá trị.

Thật ra, những container này cũng không có gì mới, chúng ta đã sử dụng chúng kể từ khi bắt đầu JavaScripting.

Khi làm về functional programming, những containers này cực kì quyền năng, bởi chúng góp phần vào nền tảng cho cấu trúc của functional, và giúp chúng ta với những kĩ thuật như Pure Functional Error Handling và Asynchronous Actions (cùng nhiều cái khác nữa).

Trước khi đi sâu vào những container này thì mình sẽ nói về một loại container đặc biệt là Functors.

**Functors là gì? Functors chính là container có thể được dùng với ‘map’ function.**

Trước khi chúng ta tạo ra container cho riêng mình, hãy nhìn lại những loại container mà ta thường dùng trước đây:

## Các loại container thường dùng

**Arrays**

Arrays là loại container phổ biến nhất mà chúng ta thường dùng trong lập trình hàng ngày, thay vì chỉ chứa duy nhất một giá trị thì chúng chứa được nhiều hơn. Array là dạng đơn giản nhất của Data trừu tượng nhưng lại vô cùng mạnh mẽ.
```

const arr = [ 8, 10, 23, 35, 54 ];

```
Vậy giá trị ta có thể lấy ra giá trị trong như như sau

`const b = a[1];`

Giờ, nếu bạn hứa là chỉ dùng những operation này trong array, thì nó sẽ trở thành trợ thủ trung thành nhất của bạn.

Đừng bao giờ modify array như thế này:
```

arr.push(45) 
or
arr[1] = 45

```
Nhưng bạn có thể dùng nó để tạo ra các array mới
```

const arr2 = [ ...arr, 38, 52 ]
or
const even = filter(x => x%2 === 0, arr)
```
**Chúng ta không thay đổi bất cứ giá trị nào trong array, mà chỉ đơn giản là tạo ra array hoặc lấy giá trị ra từ nó.**

Và Array cũng chính là một Functor.

**Một Functor là một container mà có thể được map lên bởi một Unary function.**



Nói cách khác, container có thể sử dụng với những function đặc biệt (fmap hoặc map) và nó cũng áp dụng lên mọi unary function cho đến các nội dung trong container này.


Với array, function đặc biệt được gọi đơn giản là map function.

## Map Function


Map function lấy một array và áp dụng một vài function cụ thể lên toàn bộ yếu tố của nó từng cái một và trả về một array khác.

```
[1,2,3,4].map(multiplyBy2) 
//=> [2,4,6,8]
or
map(multiplyBy2, [1,2,3,4]) 
//=> [2,4,6,8]
where multiplyBy2 = x => x * 2 and map = (fn, arr) => arr.map(fn)

```


Từ đó, chúng ta sẽ luôn có một array mới từ map, ta cũng có thể map nó để tạo ra một chain của array.
```

[1,2,3].map(x => x * 3).map(x => x * 2).map(x => x / 6)
```
Map function không chỉ đơn thuần là một iterator function, nên nhớ rằng, với giá trị trong một container ta không thể cứ trực tiếp áp dụng một function lên nó và chờ đợi giá trị thay đổi. Ví dụ:

```
const a = [1, 2, 3]
String(a) = ‘[1 ,2, 3]’ and not [‘1’, ‘2’, ‘3’]
```
Một map function sẽ cho function truy cập vào nội dung của content

`map(String, [1, 2, 3]) = [‘1’, ‘2’, ‘3’]`
Ngoài ra, map function không bao giờ thay đổi container, thay vào đó nó chỉ hành động dựa trên nội dung của container..

Một map sẽ không thay đổi loại của container nhưng nó sẽ thay đổi loại content bên trong.

Type của content có thể thay đổi, và chúng ta có thể xem từ type definition của map function.

```
map :: a -> b -> [a] -> [b]
or
fmap :: a -> b -> F a -> F b
```
Với  a và b có thể cùng hoặc khác loại.


Nếu bạn để ý kỹ thì map function đang lấy một function từ  a -> b  trả lại một function từ  Fa -> Fb

Tại đây, a -> b  có nghĩa là bất cứ unary function nào lấy a và trả lại b  như

`multiplyBy2(3) = 6 // is a -> b as 3 -> 6`

và Fa -> Fb ám chỉ bất kì unary function nào lấy một Container với a bên trong và trả lại một Container  với b bên trong.

`multiplyArrBy2([1]) = [2] // is Fa -> Fb as [1] -> [2], F is []`

Giờ map function đã thay đổi từ multiplyBy2 to multiplyArrBy2

```
const multiplyBy2 = no => no * 2

// We need to partially apply our map function to explain this

const map = mappingFn => arr => arr.map(mappingFn) 
```


Kể từ giờ, function multiplyBy2, vốn được dùng cho integer, sẽ hành động với array của integer. Nói cách khác, map function đã promote hoặc nâng function lên để nó có thể hành động trên containers hoặc arrays trong trường hợp này.

Ta thường áp dụng một phần map function khi có thể để tạo ra các function mới hoặc dùng nó với compose function, và khi có trường hợp cực kỳ khẩn cấp của Data thì ta sẽ dùng map function bình thường.

**Vậy sao lại áp dụng một phần map function?**

Trước khi đi xa hơn, hẳn bạn cũng đã hiểu là ta dùng container để chứa giá trị. Ta cũng biết về Functor, vốn là những container đặc biệt mà ta có thể dùng map operation lên nó. Mặt khác, ta cũng biết cách thức map function được dùng trên Arrays, ngoài bạn cũng đã biết cách tạo ra một Container và Functor từ những ví dụ trên.

## Bây giờ, Tôi xin giới thiệu container tiếp theo vốn cũng là một functor. Container đã đi cùng chúng ta ngay từ khi cuộc phiêu lưu vừa mới băt đầu.

## Functions
**Thế nào mà Functions lại là container?**

Container chứa data, nhưng function rõ ràng là chứa logic, thế thì làm sao function có thể là container?

Đó là bởi function, khi được called sẽ trả lại một giá trị. Thế nên ta có thể hiểu là nó chứa giá trị nhưng chỉ là giá trị đó được dynamically computed.

```

aFunction(45) // => 90
So aFunction gives the value 90, when it is passed 45

```

Hãy nghĩ chúng là những arrays chứa vô hạn các value và khi bạn muốn một giá trị nào đó thì phải call function như sao:



**Vậy Function cũng chính là container như Array?**

argument được pass
```

const a = [ 8, 10, 23, 35, 54 ]
const f = z => z * 2 
a[1] = 10
f(2) = 4
```
Chỉ có điều là Array yếu hơn khi nó chỉ cho kết quả khi các số nguyên là index. Còn function thì có thể lấy bất cứ type nào của arguments bởi không hề có một giới hạn nào. Thậm chí nó còn lấy những function khác làm arguments luôn.
Vậy nếu chúng là Functors thì hẳn cũng có map luôn đúng không?

Chính xác, nó là như thế này:
```

const fnMap = (f, mappingFn) => (x => f(mappingFn(x)))
```
Cũng như map function lấy array, áp dụng function vào content và trả lại array. Tương tự, fnMap lấy một function, áp dụng một function vào kết quả của nó và return lại function, theo cách mà nó kết hợp 2 function sao cho kết quả của một function là  argument của function thứ hai.

Được rồi hãy dùng thử cái này


```

const multiplyBy6 = fnMap(multiplyBy2, multiplyBy3)

```

Vậy function cũng có một map function và nếu ta mapping một function tới function khác, ta sẽ như đang kết hợp chúng lại và cho ra Compose function.

* Ví dụ ta có một function là  multiplyBy2 
* Trước khi lấy giá trị hay làm gì khác thì ta sẽ map nó với multiplyBy3
* Vậy là toàn bộ giá trị trong  multiplyBy2 sẽ được nhân 3.
* Do đó, khi ta call multiplyBy2  với giá trị  x thì kêt quả thu được sẽ là  x * 3 * 2

Như vầy thì hẳn bạn sẽ dễ hiểu hơn

```

const fnMap = (f, mappingFn) => (x => f(mappingFn(x)))

```

Functions cũng là arrays, một dạng data trừu tượng. Chỉ có function tính toán data theo yêu cầu của ta.

Nói cách khác, Array giống như function nhưng chỉ đưa giá trị ngay lập tức khi ta dùng ‘[]’ lên chúng.

Chỉ cần nhớ một điều rằng giá trị chỉ có ý nghĩa khi nó nằm trong một container.
Do đó trong lập trình, đừng bao giờ sử dụng Data một cách thô sơ, hãy luôn cho nó vào trong container.