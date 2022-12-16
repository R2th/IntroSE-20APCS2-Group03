## Functional Programming
Lập trình hướng hàm là một phương pháp lập trình lấy hàm làm đơn vị cơ bản. Ở lập trình theo kiểu làm tuần tự câu lệnh như `C, C++, Java, ...` thì chúng ta phải làm tất cả mọi thứ để đến kết quả cuối cùng. Còn ở các ngôn ngữ lập trình hướng hàm, ngôn ngữ sẽ cung cấp cho ta rất nhiều tiện tích để có thể dễ dàng xử lý bài toán. Ví dụ với một mảng và ta muốn nhân hai từng phần tử lên, ta sẽ làm như sau ở `C`:
```C
int* arr;
for (int i = 0; i < n; ++i)
    arr[i] *= 2;
```
Còn ở `Haskell`, ta sẽ làm như sau:
```Haskell
map (*2) list
[2 * a | a <- list]
```
Mặc dù nội tại hàm `map` nó không khác gì mấy so với là duyệt từng phần tử, tuy nhiên về cách hiểu, chúng ta chỉ cần quan tâm đến mô tả của nó: Nhân hai từng phần tử. Còn về phía `C` ta sẽ hiểu là: Duyệt từng phần tử và nhân hai chúng lên.

Haskell có rất nhiều tiện ích có sẵn như danh sách, `map, filter, scanl, scanr, zip, zipWith, foldl, foldr, ...` và những hàm này cực kỳ hữu ích trong việc xây dựng lại các bài toán một cách súc tích bằng cách chỉ dựa trên mô tả của bài toán. 

Ví dụ tính tổng $1 + 2x + 3x^2 + ... + nx^{n-1}$, ta hiểu là ghép `[1, 2, ..., n]` với `[1, x, x^2, ..., x^{n-1}]` tương ứng với phép nhân, nghĩa là `zipWith (*)`, `[1, 2, ...]` là `[1..]`, còn `[1, x, x^2, ...]` là `scanl (*) 1 (repeat x)` nghĩa là `[1, 2x, 3x^2, ...]` là `zipWith (*) [1..] (scanl (*) 1 (repeat x))`. Để tính tổng ta chỉ cần lấy `n` phần tử ở cấu trúc vô hạn này và tổng chúng lại.

Hoặc ta lại suy nghĩ theo hướng dùng `fold` thì nó là `foldr (flip $ (+).(*x)) 0 (take n [1...])` với tùy chọn mô tả sẽ là chuyển về cấu trúc cây và sử dụng phép thế `:` thành `+ x * ` và `[]` thành `0`

## Bắt đầu với một ví dụ đơn giản
Ta hãy bắt đầu với bài toán huyền thoại là dãy Finbonacci. Với các viết `fib n = fib (n - 1) + fib (n - 2)` thì ai cũng biết cách này có một performance rất tệ khi tính trùng rất nhiều giá trị.
Để khắc phục điều này, ta sẽ để các biến đã được tính toán ở phía trên phần tham số:
```Haskell
fib = go (0, 1)
    where
        go (a, _) 0 = a
        go (a, b) n = go (n - 1) (b, a + b)
```
Còn nếu là `n` phần tử đầu của dãy Fibonacci thì sao, cũng tương tự hàm được viết ở trên, ta sẽ thêm chút mắm muối vào:
```Haskell
fibs = go (0, 1)
    where go (a, b) n = if n == 0 then [] else a: go (b, a + b) (n - 1)
```
Và để cho nó trở thành một cấu trúc vô hạn thì ta sẽ lượt bỏ đi tham số `n` và kết quả ra rất khả quan:
```Haskell
go (a, b) = a: go (b, a + b)
fibs = go (0, 1)
```
Tuy nhiên, các cách ở trên vẫn còn rất nhiều động thái lưu lại kết quả để tính toán bước tiếp theo mà không hoàn toàn dựa vào mô tả: Số tiếp theo bằng tổng hai số trước. Với mô tả này, hàm `scanl` rất hiệu quả trong bài toán này:
```Haskell
fibs = 0 : scanl (+) 1 fibs
```

## Các phép toán trên ma trận
Đầu tiên ta sẽ viết phép nhân vô hướng của hai vector:

Với hai vector $a = (a_1, a_2, ..., a_n)$ và $b = (b_1, b_2, ..., b_n)$ thì tích vô hướng $<a, b> = a_1b_1+a_2b_2 + ...+a_nb_n$

Với một cách bình thường, ta sẽ suy nghĩ theo kiểu đệ quy là:
```Haskell
vecmul [] _ = 0
vecmul _ [] = 0
vecmul (x:xs) (y:ys) = x * y + vecmul xs ys
```

Một cách nghĩ khác, ta để ý rằng từng phần tử tương ứng nhân lại với nhau nên ta nghĩ ngay đến hàm `zipWith`, sau đó là thực hiện phép tổng thì sẽ là hàm `sum`:
```Haskell
vecmul = sum $ zipWith (*)
```
Với phép chuyển vị ma trận, ta sẽ lấy phần tử đầu của từng hàng rồi đặt thành một hàng. Rồi làm tương tự với phần còn lại, nên phép chuyển vị sẽ là:
```Haskell
transpose ([]:_) = []
transpose x = [head a | a <- x]: transpose [tail a | a <- x]
```
Trong phép cộng hai ma trận, ta phải cộng từng hàng với nhau, do đó ta sẽ có một hàm cộng hàng:
```Haskell
rowadd [] _ = []
rowadd _ [] = []
rowadd (x:xs) (y:ys) = (x + y): rowadd xs ys
```
Và rồi thực hiện trên toàn ma trận:
```Haskell
matadd [] _ = []
matadd _ [] = []
matadd (x:xs) (y:ys) = (rowadd x y): matadd xs ys
```

Nghĩ theo một hướng khác, cộng từng hàng tương ứng, là `zipWith f` nào đó. Và việc cộng hai hàng sẽ là cộng từng ô tương ứng, nghĩa là `f = zipWith (+)`, vậy:
```Haskell
matadd = zipWith (zipWith (+))
```
Tương tự với phép nhân `element-wise`, ta chỉ cần đổi `(+)` thành `(*)`. Tiếp theo ta đến với phép tích `dot`, với phân tích là ô `i, j` sẽ là tích vô hướng của hàng `i` ma trận đầu với cột `j` ma trận sau. Vậy thì nếu chuyển vị ma trận sau rồi thì nó sẽ là tích vô hướng của hàng `i` ma trận đầu và hàng `j` ma trận sau. Như thế thì ta sẽ có công thức sau:
```Haskell
dot x y = [[vecmul xr yc | yc <- transpose y] | xr <- x]
```
Với một số phân tích đơn giản thì ta có thể viết các hàm tính toán ma trận cơ bản một cách dễ dàng. Điều ra rút ra được từ các ví dụ trên là hãy viết hàm dựa theo mô tả của hàm, không biết hàm dựa vào các bước tính toán.
## Một số thuật toán sắp xếp
Ta hãy thử viết các thuật toán sắp xếp bằng Haskell. Đầu tiên ta hãy viết thuật toán Quick Sort. Theo tài liệu [ở đây](https://en.wikipedia.org/wiki/Quicksort) thì Quick Sort sẽ chia ra 3 công đoạn:
1. Chọn một phần tử bất kỳ, gọi là `pivot`
2. Với phần còn lại, chia làm hai phần, một phần chỉ chứa phần tử nhỏ hơn `pivot` và phần còn lại chứa phần tử lớn hơn hoặc bằng `pivot`
3. Làm tương tự với các phần nhỏ, sau đó ghép chúng lại theo thứ tự : phần nhỏ hơn -> `pivot` -> phần lớn hơn

Ta có thể chọn `pivot` ở bất kỳ nơi nào nên ta sẽ chọn ở vị trí đầu tiên của danh sách, sau đó việc lấy các phần tử nhỏ hơn hay lớn hơn hoặc bằng được xử lý bằng filter:
```Haskell
quickSort [] = []
quickSort (x:xs) = (quickSort [a | a <- xs, a < x]) ++ (x: quickSort [a | a <- xs, a >= x])
```
Chúng ta hãy nhìn vào cách mà thuật toán mô tả, chúng ta không cần quan tâm rằng thuật toán của chúng ta chạy từng bước như thế nào. Và kết quả nhận được là một hàm được viết rất gọn.

Tiếp theo hãy đến với Bubble Sort, với một mô tả như sau:  Đổi chỗ hai phần tử kề nhau nếu nó là nghịch thế là di chuyển đến đỉnh tiếp theo.
```Haskell
bubbleSort = foldr go []
    where
        go x [] = [x]
        go x (y:ys) = min x y : go (max x y) ys
```

Cũng tương tự ta có thể viết thuật toán Insertion Sort như sau với một mô tả: Đưa một phần tử vào đúng vị trị của nó ở một dãy đã được sắp xếp.
```Haskell
insertionSort [] = []
insertionSort (x:xs) = go x (insertionSort xs)
    where
        go x [] = []
        go x (y:ys) = if x < y then x:y:ys else y: go x ys
```

## Đến bài toán tìm đường đi ngắn nhất
Haskell tương tác tốt với toán học, nên các giải thuật mang tính toán học sẽ được viết một cách hiệu quả nhất. Ta sẽ chọn phương pháp `min-plus` để giải quyết bài toán đường đi ngắn nhất.

Trên $\mathbb{R}\cup\{+\infty\}$, ta định nghĩa $a \oplus b = \text{min} \{a, b\}$ và $a\otimes b = a + b$, trong đó $+\infty$ và $0$ là phần tử trung hòa đối với $\oplus$ và $\otimes$

Với một ma trận $G$ là ma trận kề trên một đồ thị $n$ đỉnh thì ta sẽ tính $\bigoplus\limits_{i = 1}^{n} G^{i}$, trong đó $G^k = \bigotimes\limits_{i = 1}^{k} G$

Để tiện, ta sẽ chỉ xét với đồ thị trọng số không âm, lấy $-1$ tương ứng với dương vô cùng. Và phải định nghĩa lại phép toán cộng và nhân trong `min-plus` như sau:
```Haskell
oplus x y = if x == -1 || y == -1 then x + y + 1 else min x y
otimes x y = if x == -1 || y == -1 then -1 else x + y
```
Phép cộng hai ma trận được định nghĩa tương tự như trên:
```Haskell
matadd = zipWith (zipWith oplus)
```

Phép nhân vô hướng hai vector sẽ khác đi vì thay phép $+$ thành $\oplus$ và phép nhân thành $\otimes$. Để làm được điều này, ta sẽ dùng hàm `foldr` với giá trị khởi tạo là phần tử trung hòa với phép $\oplus$ là `-1`:
```Haskell
vecmul a b = foldr oplus (-1) (zipWith otimes a b)
```
Và phép nhân hai ma trận được định nghĩa lại như sau:
```
dot x y = [[vecmul a b | b <- transpose y] | a <- x]
```
Đã có đủ công cụ để dùng, ta chỉ còn thiếu phép tính `1+x+...+x^n` nữa là xong, và hàm `foldl` sẽ thực hiện tốt những mô tả còn lại:
```Haskell
calc x y = matadd (dot x y) y
shortestPath g = foldl calc g (take (length g - 1) (repeat g))
```
Đây là một cách rất ngắn gọn để mô tả lại thuật toán tìm đường đi ngắn nhất.