# Giới thiệu
Hi, xin chào mọi người.

Lâu rồi mới dạo quanh 1 vòng các blog của Việt Nam thấy blog này phát triển quá tự nhiên cảm thấy muốn tham gia giao lưu chia sẻ kiến thức cùng mọi người để cùng nhau góp 1 phần nhỏ cho sự phát triển ngành IT Việt Nam.
Giới thiệu sơ qua mình từng là sinh viên Bách Khoa Hà Nội khóa Hedspi K52 và cựu du học sinh trường Keio Nhật Bản. Hiện tại thì mình đang làm cho cty sàn giao dịch tiền mã hóa của Nhật Bản là Bitbank.

# Bài toán
Vào vấn đề chính hôm nay mình sẽ giới thiệu 1 cấu trúc dữ liệu giải thuật là BTree mà cụ thể hơn là B+Tree và ứng dụng của nó trong việc giải quyết 1 bài toán nhìn qua thì thấy rất đơn giản nhưng để **scale up** với kích thước dữ liệu lớn và các thao tác diễn ra với tần suất cao thì thực sự lại là 1 vấn đề khác.

Các bạn có thể tham khảo cách thức hoạt động của B+tree đã được trực quan hóa *visualization* [ở đây](https://visual-algo.firebaseapp.com/)

Bài toán đặt ra như sau chúng ta có 1 tập các số được sắp xếp theo thứ tự tăng dần ví dụ như `[1,2,3,5,7,8,9,12]`. Và yêu cầu đặt ra là chúng ta phải thêm hoặc xóa bớt 1 số phần tử sao cho vẫn đảm bảo thứ tự tăng dần. Rất đơn giản đúng không và như bình thường chúng ta cũng có cách giải quyết đơn giản dùng cấu trúc dữ liệu mảng và giải thuật tìm kiếm tuần tự (**linear search**) (những phần code minh họa trong bài viết mình sẽ sử dụng **typescript**).

## Cách giải đơn thuần
```ts
const arr = [1,2,3,5,7,8,9,12];

// insert
function insert(value: number) {
  // tìm vị trí phần tử đầu tiên lớn hơn hoặc bằng ${value}
  const pos = arr.find((a) => a >= value);
  // chèn value vào vị trí này
  arr.splice(pos, 0, value);
}

// delete
function delete(value: number) {
  // tìm vị trí phần tử đầu tiên lớn hơn hoặc bằng ${value}
  const pos = arr.find((a) => a >= value);
  // xóa vị trí này nếu tìm thấy
  if (arr[pos] === value) {
    arr.splice(pos, 1);
  }
}
```

Dễ thấy độ phức tạp cho mỗi thao tác `insert` hoặc `delete` của cách làm này là O(n) với `n = arr.length`. Giả sử vị trí cần tìm là k (0 <= k <= n) chúng ta cần k + 1 phép so sánh để tìm được vị trí này sau đó để `insert` hay `delete` ta cũng cần reindex toàn bộ các phần tử phía sau tổng cộng là cần n thao tác tức là `O(n)` để hoàn thành.

## Cải tiến với binary search trên array
Với cấu trúc dữ liệu mảng array chúng ta có thể truy cập đến phần tử ở vị trí bất kỳ với thời gian O(1). Tận dụng điều này ta có thể áp dụng **binary search** trên mảng đã sắp xếp để tăng tốc thao tác tìm kiếm.

```ts
function binarySearchPosition(value: number, firstIndex: number, lastIndex: number): number {
  if (firstIndex === lastIndex) {
    return firstIndex;
  }
  
  const middleIndex = Math.floor((firstIndex + lastIndex) / 2);
  if (arr[middleIndex] === value) {
    return middleIndex;
  }
  
  return arr[middleIndex] < value
    ? binarySearchPosition(value, middleIndex + 1, lastIndex)
    : binarySearchPosition(value, firstIndex, middleIndex);
}
```

Áp dụng hàm tìm kiếm này chúng ta cải tiến cài đặt ban đầu bằng việc thay thế dòng lệnh tìm kiếm tuần tự như sau:

```ts
// 'const pos = arr.find((a) => a >= value)' thay bằng
const pos = binarySearchPosition(value, 0, arr.length);
```

Ta thấy cài đặt phần search đã được cải tiến ở chỗ với mỗi phép so sánh với phần tử giữa số lượng mảng tìm kiếm của chúng ta đã giảm đi 1 nửa chứ không phải chỉ giảm 1 như cài đặt ban đầu. Ta làm được điều này là do tính chất có thể truy cập đến phần tử giữa 1 cách tức thì của mảng. Và điều này cũng có sự đánh đổi khi thao tác modify mảng (insert, delete) vẫn cần đảm bảo tính chất này bằng cách phải reindex toàn bộ các phần tử phía sau vị trí bị thay đổi. Thời gian tính toán của thao tác này tùy thuộc vị trí thay đổi nhưng về trung bình mà nói cơ bản vẫn là O(n) mặc dù cải tiến là rất đáng kể so với cài đặt ban đầu.

Ở chiều hướng khác cấu trúc dữ liệu `LinkedList` cho phép insert, delete ở vị trí xác định với thời gian tức thì O(1) nhưng với `LinkedList` không có cách nào để truy cập nhanh phần tử giữa mà không phải duyệt như trên mảng do đó vẫn phải sử dụng tìm kiếm tuần tự với độ phức tạp O(n).

Rất may chúng ta có giải pháp kết hợp điểm mạnh của cả 2 cấu trúc dữ liệu kể trên là `Array` và `LinkedList`.

## Cải tiến với cấu trúc dữ liệu B+tree
`B+Tree` có thể được nhìn dưới góc độ như là sự kết hợp giữa `Array` và `LinkedList`:
 - **Tìm kiếm (search)**: mỗi phép so sánh cho phép ta loại 1 cơ số phần tử để đến với vị trí cần tìm nhanh hơn.
 - **Chỉnh sửa (modify)**: thao tác insert, delete ở 1 vị trí xác định không làm ảnh hưởng đến toàn bộ các phần tử còn lại.

`B+Tree` là cấu trúc dạng cây tìm kiếm và là tổng quát của cây tìm kiếm nhị phân (Binary Search Tree - **BST**) với 1 node gốc (**root**), các node trong (**internal node**) có chứa các node con và các node dưới cùng không chứa node con gọi là node lá (**leaf node**).
 - Các node trong chứa **n** phần tử gọi là khóa tìm kiếm (**key**) và tương ứng là **n+1** node con có tính chất:
```
key[i-1] <= {child[i].data} < key[i]
```
 - Số lượng khóa và node con trong 1 node dao động trong 1 khoảng hằng số nhỏ được xác định bởi giá trị **order** (dịch là bậc) của B+tree.
 - Tất cả các phần tử của tập cần quản lý đều nằm ở node lá.
 - Tất cả node lá đều có cùng độ cao và được liên kết nhau theo thứ tự bằng pointer như `linkedlist`.

> Chúng ta có thể tìm kiếm nhanh trên cây này bằng cách bắt đầu từ node gốc so sánh các khóa trên từng node để đi vào nhánh phù hợp. Các node trong chứa các phần tử chỉ đóng vai trò là các khóa trung gian để tìm kiếm.

Chúng ta có thể hình dung về `B+tree` theo cách khác như sau: 
 - Có 1 tập các phần tử đã được sắp xếp thứ tự `[1,2,3,4,5,6,7,8,9,10,11,12]`
 - Tách tập này thành các khối 2 phần tử, liên kết nhau theo kiểu linkedlist `(1,2)->(3,4)->(5,6)->(7,8)->(9,10)->(11,12)`
 - Từ khối thứ 2 trở đi chọn ra phần tử đầu tiên làm đại diện ta có tập các phần tử ở tầng thứ 2 `[3,5,7,9,11]`

Ở đây ta có cấu trúc dạng cây với 1 nút gốc chứa 5 khóa (gọi là key) và 6 nút con mỗi nút chứa 2 phần tử có tính chất kẹp giữa.
```
             (3,5,7,9,11)
(1,2)->(3,4)->(5,6)->(7,8)->(9,10)->(11,12)
```

Khi tìm kiếm trên cấu trúc này ta sẽ bắt đầu từ node trên tìm kiếm tuần tự để tìm ra nhánh chứa phần tử cần tìm. Dễ thấy với mỗi phép so sánh mà chưa tìm ra, ta sẽ loại được 1 nhánh với nhiều phần tử mà trong trường hợp này là 2. Tiếp tục lặp lại thao tác với tầng thứ 2 ta có tầng thứ 3:
```
                   (7,11)
             (3,5) (7,9) (11)
(1,2)->(3,4)->(5,6)->(7,8)->(9,10)->(11,12)
```

Tương tự mỗi phép so sánh ở tầng 3 cho phép loại 2 phần tử ở tầng 2 tương ứng 4 phần tử tầng dưới cùng (tầng cần tìm kiếm). Tập tất cả các node dưới cùng gọi là lá (leaf) chính là tập các phần tử mà ta có ban đầu. Với số lượng phần tử nhiều hơn bất kỳ ta có thể làm các thao tác trên lặp lại cho đến khi còn 1 node trên cùng với 2 phần tử. Đây chính là cấu trúc dữ liệu B+tree với bậc là 3.

### Độ phức tạp tính toán của B+tree
Kích thước node là các giá trị dao động trong 1 khoảng nhỏ (vd: 1->2, 2->3) xác định đại diện bởi giá trị `order` (dịch là bậc) của B+tree. Độ phức tạp trong tìm kiếm được tính bởi số phép so sánh mà ta phải làm (trong trường hợp xấu nhất) để đi đến vị trí cần tìm đó là:
```
Kích thước node (đại diện bởi order) * Độ cao cây (h)
```
Với `order` là 1 constant được xác định từ trước và độ cao h là biến số tỉ lệ thuận với kích thước tập ví dụ với kích thước mỗi node là 2 có thể coi như `h = log n` thì như vậy ta có độ phức tạp tính toán đạt được trong tìm kiếm là `O(log n)`, đây là hiệu suât tốt hơn rất nhiều so với `O(n)`.

Khi đã tìm được vị trí thì chi phí cho thao tác insert hay delete trong phạm vi 1 node (các phần tử lưu trong 1 node bởi cấu trúc mảng) là không đáng kể vì kích thước node là 1 hằng số nhỏ (đại diện bởi order).

Tiếp theo sau khi đã modify (insert hoặc delete) B+tree này chúng ta phải duy trì tính chất của tree và **sự cân bằng** để đảm bảo tính đúng đắn và hiệu quả, độ phức tạp cho các thao tác này vẫn là `O(log n)`. Chúng ta hãy cùng đi vào cài đặt cụ thể.

> B+tree tăng hiệu quả trong thao tác tìm kiếm bằng cách sử dụng thêm bộ nhớ (extra memory) cho các tầng trên để lưu đại diện cho tập ở tầng dưới. Nhờ đó độ phức tạp cho các thao tác cơ bản tìm kiếm, thêm, xóa tỉ lệ thuận với độ cao của cây `h = log n`, với số lượng phần tử tăng rất nhiều thì độ cao của cây chỉ tăng rất ít.

## Cài đặt B+tree
Như đã đề cập ở trên kích thước mỗi node giới hạn trong 1 hằng số nhỏ đại diện bởi giá trị gọi là bậc **order** của **B+tree**. Cụ thể một **B+tree** được gọi là có bậc **m** nếu:
 - Mỗi node trong (**internal node**) có nhiều nhất là **m** node con tương ứng nhiều nhất là **m-1** khóa.
 - Các node trong mà ngoài node gốc có thể có ít nhất là **m/2+1** node con tương ứng ít nhất **m/2** khóa.
 - Các node lá (**leaf node**) có nhiều nhất **m-1** khóa và ít nhất là **m/2** khóa.
 - Node gốc (**root** - có thể là lá hoặc node trong) **không bị giới hạn dưới** số khóa và số node con (**>= 0**)

Theo mình thấy định nghĩa số lượng node con và khóa ở trên là **tương đối** (chưa xét lúc m chẵn hoặc lẻ) và có sai khác theo một số tài liệu và khi mình triển khai thật thì cũng hơi khác 1 chút tuy nhiên ta không cần quá bận tâm chi tiết này mà chỉ cần nắm được ý tưởng chung đó là giúp duy trì số lượng khóa và node con trong 1 khoảng nhỏ xác định nhằm giữ sự cân bằng (**balance**) cho cây không để xảy ra tình trạng 1 node có **0** khóa trong khi node khác lại có **1000** khóa, để đạt hiệu quả tìm kiếm tốt nhất. Do đó số lượng này có sai khác 1 2 đơn vị cũng không thành vấn đề. Chúng ta sẽ thấy rõ điều này hơn khi cài đặt và quan sát cách thức hoạt động cụ thể.

### Thêm (Insert)
Giả sử chúng ta đã có 1 B+tree cân bằng với 1 số phần tử xác định (tất cả đều nằm ở node lá) muốn thêm vào phần tử mới `value`:
 1. Bắt đầu từ node gốc lần theo các nhánh của cây tìm kiếm tìm đến node lá phù hợp.
 2. Thêm phần tử mới vào node lá vừa tìm được ở vị trí thích hợp.

### Xóa (Remove)
Cũng tương tự như trên chúng ta làm theo 2 bước:
 1. Bắt đầu từ node gốc lần theo các nhánh của cây tìm kiếm tìm đến node lá phù hợp.
 2. Xóa phần tử nếu nó được tìm thấy trên node lá này.

### Tái cân bằng (Rebalancing)
Sau khi đã thêm hoặc xóa ở node lá ta đã có 1 B+tree với 1 node lá được cập nhật (thêm hoặc bớt), điều này có thể dẫn đến không thỏa mãn điều kiện cây bậc **m** ở trên. Ta thực hiện tái cân bằng cây theo các bước:
 1. Nếu số lượng khóa vượt quá **m-1**
  - Nhìn các node bên cạnh (**adjacents** - tối đa là 2), nếu số lượng khóa của nó chưa đạt max (**m-1**) thực hiện **rotateLeft** hoặc **rotateRight** để chuyển bớt 1 phần tử sang node bên cạnh và kết thúc.
  - Nếu ko tồn tại node bên cạnh như vậy ta thực hiện chia tách node này làm 2 (**sẽ hơi khác ở thao tác này với node lá và node trong**). Thao tác này đồng nghĩa với việc phải **insert** thêm 1 khóa và 1 node con vào node cha (**parent**), hoặc tạo node parent mới với 1 khóa và 2 node con.
  - Sau khi insert 1 phần tử và 1 node con vào node cha, lặp lại bước 1 như trên với node cha.
 2. Nếu số lượng khóa nhỏ hơn **m/2** và không phải **root**
  - Nhìn các node bên cạnh (**adjacents** - tối đa là 2), nếu số lượng khóa của nó chưa đạt min (**m/2**) thực hiện **rotateLeft** hoặc **rotateRight** để chuyển bớt 1 phần tử từ node bên cạnh đó sang và kết thúc.
  - Nếu không tồn tại node bên cạnh như vậy, tức là node bên cạnh đã đạt min (**m/2**), với node hiện tại (**m/2-1**), ta thực hiện chập (**merge**) 2 node này làm 1 node con mới với **m-1** khóa (**sẽ hơi khác ở thao tác này với node lá và node trong**). Thao tác này đồng nghĩa với việc phải **remove** 1 khóa và 1 node con ở node cha.
  - Sau khi remove ở node cha, lặp lại bước 2 với node cha.

Chúng ta sẽ đi vào kỹ hơn vào các thao tác chia node (**split**), xoay trái (**rotate left**), xoay phải (**rotate right**), chập node (**merge**) cho cả 2 trường hợp node lá và node trong
 - **Split node lá**
     - Chọn ra phần tử giữa `middleIndex`.
     - Chia mảng keys độ dài n làm 2 phần: `[0, ..., middleIndex -1], [middleIndex,...,n-1]`.
     - Chèn phần tử giữa và node con mới vào node parent ở vị trí thích hợp.
     - Cập nhật link liên kết cho các node lá.
     - Kiểm tra node parent và lặp lại thao tác split nếu cần.
```
(1,2,3,4,5) => (1 2) 3 (3 4 5)
```
 - **Split node trong**
     - Chọn ra phần tử giữa `middleIndex`.
     - Chia mảng keys độ dài n làm 2 phần: `[0, ..., middleIndex -1], [middleIndex + 1,...,n-1]`.
     - Cập nhật parent cho các node con được tách ra.
     - Chèn phần tử giữa và node con mới vào node parent ở vị trí thích hợp.
     - Kiểm tra node parent và lặp lại thao tác split nếu cần.
```
(1,2,3,4,5) => (1 2) 3 (4 5)
```
 - **Xoay trái node lá**: chuyển 1 khóa từ node phải sang node trái.
     - Lấy key đầu tiên của node phải chuyển sang phía cuối node trái.
     - update key tương ứng (kẹp giữa 2 node trái và phải) trên node parent bằng key đầu tiên của node phải mới.
```
(1) 2 (3 4 5) => (1 3) 4 (4 5)
```
 - **Xoay trái node trong**
     - Lấy key tương ứng ở node parent chèn vào cuối node trái.
     - Chuyển key đầu tiên ở node phải lên vị trí key parent.
     - Chuyển node con đầu tiên bên node phải sang cuối node trái.
```
(1) 2 (3 4 5) => (1 2) 3 (4 5)
```
 - **Xoay phải node lá**: chuyển 1 khóa từ node trái sang node phải.
     - Lấy key cuối cùng của node trái chèn vào phần tử đầu tiên node phải.
     - Update key tương ứng trên node parent bằng key đầu tiên của node phải mới.
```
(1 2 3) 4 (5) => (1 2) 3 (3 5)
```
 - **Xoay phải node trong**
     - Lấy key tương ứng trên node parent chèn vào vị trí đầu tiên của node phải.
     - Chuyển key cuối ở node trái lên vị trí key ở parent.
     - Chuyển node con cuối node trái sang đầu node phải
```
(1 2 3) 4 (5) => (1 2) 3 (4 5)
```
 - **Merge node lá**: chuyển hết các thành phần bên node phải sang node trái và xóa node phải.
     - Chuyển hết các key của node phải sang node trái.
     - Xóa key tương ứng và node con trỏ đến node phải trên parent.
     - Cập nhật link liên kết cho các node lá.
     - Xóa node phải.
```
(1 2) 3 (4) => (1 2 4)
```
 - **Merge node trong**
     - Chuyển key trên parent và tất cả các key của node phải sang node trái.
     - Chuyển hết các node con của node phải sang node trái.
     - Cập nhật parent mới cho các node con của node phải vừa chuyển.
     - Xóa key tương ứng và node con trỏ đến node phải trên parent.
     - Xóa node phải.
```
(1 2) 3 (4) => (1 2 3 4)
```

## Test thử performance
Ok bây giờ chúng ta đã có 1 **B+tree** được cài đặt và hoạt động đúng, giờ là lúc kiểm chứng hiệu quả của giải thuật này khi áp dụng vào bài toán đặt ra ban đầu bằng cách sinh ra test tương đối lớn để chạy thử và so sánh thời gian chạy với cách giải khác. Cách giải khác ở đây mình sẽ sử dụng là giải thuật áp dụng mảng **array** với **binary search** (Cách giải với *array* và *linear search* thì quá đuối rồi nên mình sẽ ko chạy thử cho đỡ mất thời gian). 

|             | B+tree   | Array Binary Search |
| ----------- | -------- | ------------------- |
| Init 50K    |          |                     |
| Insert 20K  | 60       | 252                 |
| Delete 20K  | 73       | 201                 |
|             |          |                     |
| Init 100K   |          |                     |
| Insert 50K  | 98       | 1246                |
| Delete 50K  | 152      | 996                 |
|             |          |                     |
| Init 500K   |          |                     |
| Insert 100K | 199      | 23476               |
| Delete 100K | 277      | 20677               |

Qua kết quả trên ta thấy *B+tree* tỏ ra hiệu quả tốt hơn và với test càng lớn thì điều này càng trở nên rõ ràng.

Các bạn có thể tham khao source code [ở đây](https://github.com/dang1412/bplustree)

Hy vọng các bạn có thêm được 1 chút kiến thức hữu ích qua bài viết này. Những bước giải thuật phía trên mình viết có thể còn nhiều chỗ chưa rõ nghĩa hoặc sai sót, rất mong nhận được sự góp ý của các bạn. :)