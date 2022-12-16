![](https://images.viblo.asia/8660d6ad-d92e-4d5f-845f-de33dfbc201d.png)
Thống kê từ [google trends](https://trends.google.com/trends/explore?date=all&q=splice%20vs%20slice) cho thấy có khá nhiều người quan tâm đến vấn đề so sánh [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) và [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice). Hai hàm này cũng không có gì quá đặc biệt, nó chỉ là các hàm trong prototype của mảng, được xếp cùng loại với các hàm built-in như `map`, `filter`,... nhưng đôi lúc bạn có thể sẽ nhầm lẫn giữ `slice` (danh từ, đọc là [/slaɪs/](https://www.oxfordlearnersdictionaries.com/definition/english/slice_1) ) và `splice` (động từ, đọc là [/splaɪs/](https://www.oxfordlearnersdictionaries.com/definition/english/splice_1) ) hay  thậm chí là nhầm với  `split` ( [/splɪt/](https://www.oxfordlearnersdictionaries.com/definition/english/split_1) - chỉ dùng để tách chuỗi thành mảng).

Các hàm built-in trong prototype của mảng chia thành 2 loại là *mutable* và *immutable*, `slice` thuộc nhóm immutable, có nghĩa là sau khi `slice` thực thi xong mảng ban đầu không bị thay đổi, `slice` return một mảng mới khác, tương tự như `map`, `filter`,... Còn `splice` thuộc nhóm mutable mảng ban đầu, hàm `splice` thực thi xong sẽ làm mảng đó bị thay đổi như hàm `pop`, `shift`, `unshift`,... Khi search google bạn sẽ tìm thấy một số định nghĩa:

Cú pháp `slice`
```javascript
slice()
slice(start)
slice(start, end)
```
Cú pháp `splice`
```javascript
splice(start)
splice(start, deleteCount)
splice(start, deleteCount, item1)
splice(start, deleteCount, item1, item2, itemN)
```

![](https://images.viblo.asia/be52a9e7-37fc-4141-a8c1-b0d5cca0d3e2.png)
![](https://images.viblo.asia/7adf6db8-f8c1-4500-9d98-e80138e00520.png)
![](https://images.viblo.asia/ae0054f1-cbf2-4743-a185-bdaa9bbb63b7.jpg)
__________________________________________

Mặc dù định nghĩa là như vậy nhưng đến lúc áp dụng thực tế thì vẫn bị nhầm lẫn thôi 😂 bởi vì chúng khác nhau chỉ mỗi chữ **p**, xét về ý nghĩa của từ vựng thì chúng làm ta liên tưởng đến sự chia tách, ban đầu có một vật thể nào đó nguyên vẹn, sau khi `slice` hoặc `splice` thì nó bị chia nhỏ ra. Nhưng quái lạ là `splice` nghĩa là sau cắt, chia tách thì cái ban đầu bị thay đổi trong khi `slice` cũng có nghĩa là cắt mà lại không làm thay đổi cái ban đầu.

## Phân biệt dựa vào nghĩa của từ
* `slice` là một danh từ biểu thị một mảng mới, 2 mảng độc lập với nhau nhưng mảng sau khi `slice` có bản chất là một phần của mảng ban đầu.
![](https://images.viblo.asia/5cbf9b92-22e6-4e18-8629-d9548c11a278.png)
____________________________________________________________________
* `splice` cũng như vậy nhưng đây là một động từ hướng đến hành động cắt mảng ban đầu, hậu quả là làm số lượng phần tử mảng ban đầu bị thay đổi. 
 ![](https://images.viblo.asia/a56a74ed-a1aa-4cdf-b969-275d5e76d813.png)


Khi nhắc đến tên của một trong 2 hàm này, chúng ta có thể liên tưởng đến tính từ ***SP**litting*. Từ `splice` đã bao gồm ký tự **SP** trong ***SP**litting*. Còn `slice` thì không có **SP** nên không làm ảnh hưởng mảng ban đầu. 

##  Liên tưởng tới "specifiy length"
 
3 ký tự đầu tiên của hàm `splice` là **SPL** hãy nghĩ nó là viết tắt của "**sp**ecifiy **l**ength" nghĩa là đối số thứ 2 là số lượng các phần tử trong mảng cần cắt ra, trong khi đối số thứ 2 của `slice` là vị trí của một phần tử trong mảng.

## Biểu diễn về mặt toán học 

```javascript
const input = [3, 5, 7, 9, 11];

const output1 = input.slice(1, 3); // [5,7]
console.log("sau khi slice", input); // [3, 5, 7, 9, 11]

const output2 = input.splice(1, 2); // [5,7]
console.log("sau khi splice", input) // [3, 9, 11]
```
hàm `slice` cắt mảng input kể từ vị trí 1 cho đến vị trí của các phần tử có index nhỏ hơn 3. Tương đương với:
```
 5 ≤ output1 < 9
```
biểu diễn output1 trên trục số: 

```
-----[-------)------>
3    5   7   9   11  
```

Nên kết quả có giá trị là 5 và 7.


Còn đối với `splice`:

* Đối số thứ nhất là index của phần tử được cắt đầu tiên, nghĩa là phần tử tại ở đối số thứ nhất sẽ bị mất. Nếu đối số thứ nhất đặt giá trị âm thì vị trí phần tử đầu tiên tính từ cuối mảng trở về trước.


|Index dương |   0   |   1   |   2   |   3   |   4   |
| ----- | -------- | -------- | -------- | -------- | -------- |
| **Giá trị**   |   3   |   5   |   7   |   9   |   11   |
| **Index âm** |   **-5**  |   **-4**  |   **-3**  |   **-2** |   **-1**   |

* Đối số thứ 2 là số lượng phần tử bị cắt và luôn đếm theo chiều dương (từ trái sang phải) cho dù đối số thứ nhất giá trị âm hay dương.
```javascript
const input = [3, 5, 7, 9, 11];
const output3 = input.splice(-2, 2); // [5,7]
console.log("sau khi splice", input) // [3, 5, 7]
```
số `-2` đầu tiên sẽ cho ra giá trị `9`, số `2` tiếp theo là cắt 2 phần tử kể từ vị trị -2 tức số `9` và số `11` (tại vị trí -2 đã chiếm 1 đơn vị số lượng, tức là chỉ cần cắt bỏ thêm 1 phần nữa là đủ 2) 

Đối số thứ hai nếu bỏ trống có nghĩa là bắt đầu cắt từ vị trí đối số thứ nhất cho đến hết.
```javascript
const input = [3, 5, 7, 9, 11];

const output4 = input.splice(1); // [5,7,9,11]
console.log("sau khi splice", input) // [3]
```
* Các đối số còn lại nghĩa là lắp đầy các vị trí vừa cắt bằng các giá trị này:

```javascript
const input = [3, 5, 7, 9, 11];
const output4 = input.splice(1, 2, 77, 88, 99); // [5,7]
console.log("sau khi splice", input) // [3, 77, 88, 99, 9, 11]
```

## Liên tưởng tới "quả xoài ma thuật"

* Mời bạn xem qua bài viết giải thích tại sao `slice` thuộc loại **shallow clone** ở topic trước của tôi https://viblo.asia/p/top-nhung-cach-copy-mang-object-ma-lap-trinh-vien-js-khong-the-bo-qua-RnB5pAODKPG
* Bài viết gốc về "magic mango": https://medium.com/@dvschakradhar/you-will-not-forget-slice-and-splice-in-javascript-hereafter-9a621b2fdd15