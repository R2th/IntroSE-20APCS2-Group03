Trong bài viết này, chúng ta sẽ cùng nói về một bộ công cụ mới giúp chúng ta tự động hóa việc lặp lại các thao tác lên nhiều giá trị, tiết kiệm thời gian viết code và đồng thời nâng cao tính linh động cho giải pháp xử lý nhiều tác vụ.

## Bộ dữ liệu collection

Bộ sưu tập hay `collection` là kiểu dữ liệu phức hợp có mặt trong nhiều ngôn ngữ lập trình phổ biến, được thiết kế để hỗ trợ lưu trữ nhiều giá trị đồng thời tại một địa chỉ tham chiếu, tạo tiền đề cho việc tự động hóa lặp lại các thao tác xử lý lên nhiều giá trị khác nhau. Các phần tử bên trong `collection`  thường được truy xuất bằng số chỉ vị trí thay vì truy xuất bằng tên như các giá trị lưu trữ trong `object`.

Chúng ta sẽ tận dụng code HTML sẵn có của `dropdown` đã xây dựng trước đó để thực hiện một ví dụ truy xuất các phần tử của một `collection`.

```dropdown.html
<div class="dropdown">
   <button id="the-btn" class="dropdown-btn primary">
      Toggle List
   </button>

   <div id="the-list" class="dropdown-list hidden">
      <a class="dropdown-item" href="#">The rose is red</a>
      <a class="dropdown-item" href="#">The sky is sunny</a>
      <a class="dropdown-item" href="#">The river is blue</a>
      <a class="dropdown-item" href="#">The grass is green</a>
   </div>
</div><!-- .dropdown -->
```

```dropdown.js
var itemList = document.getElementsByTagName('a');

var firstElement = nodeList[0];
console.log( firstElement.textContent );
// Kết quả: 'The rose is red'

var secondElement = nodeList[1];
console.log( secondElement.textContent );
// Kết quả: 'The sky is sunny'
```

Trong ví dụ ở trên, chúng ta sử dụng hàm [`getElementsByTagName`](https://www.w3schools.com/jsref/met_document_getelementsbytagname.asp) của `document` để truy vấn tất cả các phần tử `<a>` trong văn bản HTML; Kết quả thu được là một `collection` chứa các object `Element` mô phỏng các phần tử `<a>` của `dropdown` mà chúng ta đang có ở đây. Việc truy xuất tới các phần tử bên trong `collection` được thực hiện bằng các dấu ngoặc vuông `[]` và truyền vào trị số chỉ vị trí của các phần tử, bắt đầu từ `0` cho phần tử đầu tiên và tăng dần đối với các phần tử tiếp theo.

> Các lập trình viên thường bắt đầu đếm từ `0` và điều này là hoàn toàn bình thường.  
> *_Một người yêu thích lập trình*

## Tự động hóa việc lặp một thao tác xử lý lên nhiều đối tượng dữ liệu

Để cung cấp một giao diện sử dụng đơn giản và thuận tiện cho tác vụ này, JavaScript và nhiều ngôn ngữ khác có cung cấp một kiểu `collection` phổ biến có tên gọi là mảng `Array`.

- [Tài liệu về Array của W3schools](https://www.w3schools.com/jsref/jsref_obj_array.asp).
- [Tài liệu về Array của MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

Một mảng trong JavaScript có thể được tạo ra bằng 2 cách cơ bản, đó là khởi tạo trực tiếp hoặc tạo ra từ kiểu `collection` khác. Code ví dụ dưới đây sẽ khởi tạo một mảng trực tiếp và thực hiện in lần lượt các giá trị ra `console`.

```array.js
var mixedArray = [null, 0, 1, 'word', true, false, {name:'Kei'}];

var printArrayItem = function(item, index) {
   console.log('mixedArray[' + index + '] : ' + item);
};

mixedArray.forEach(printArrayItem);

// Kết quả:
// mixedArray[0] : null
// mixedArray[1] : 0
// mixedArray[2] : 1
// mixedArray[3] : word
// mixedArray[4] : true
// mixedArray[5] : false
// mixedArray[6] : [object Object]
```

Trong các ngôn ngữ lập trình quản lý kiểu dữ liệu linh động như JavaScript, các mảng được thiết kế với khả năng lưu trữ cùng lúc nhiều kiểu dữ liệu khác nhau. Trong ví dụ ở trên chúng ta đã thử lưu trữ các kiểu dữ liệu bao gồm `null`, các giá trị số học, các giá trị `boolean`, và cuối cùng là `object`.

Thao tác in một phần tử của mảng `mixedArray` ra `console` được lặp lại trên từng giá trị lưu trữ trong mảng bằng cách truyền thao tác `printArraytItem` vào hàm [`forEach`](https://www.w3schools.com/jsref/jsref_foreach.asp) (đối với mỗi phần tử) của mảng. 

Trong định nghĩa hàm `printArraytItem`, chúng ta có thể có thêm 1 biến tiếp nhận dữ liệu đầu vào là địa chỉ tham chiếu của mảng đang được sử dụng. Như vậy code bên trong hàm sẽ có thể sử dụng biến nội bộ của hàm để tham chiếu thủ công tới các phần tử khác vị trí đang lặp tới hoặc thực hiện thao tác nào đó khác. Điều này giúp chúng ta có thể sử dụng một hàm xử lý cho nhiều mảng khác nhau mà không cần định nghĩa lại nhiều lần.

```array.js
var printArrayItem = function(item, index, theArray) {
   var numberOfNextItems = theArray.length - (index+1);
   console.log('mixedArray[' + index + ']: ' + item);
   console.log('Còn ' + numberOfNextItems + ' phần tử đứng sau.');
};
```

Bây giờ chúng ta sẽ sử dụng mảng để lặp qua các phần tử trong danh sách của `dropdown`. Tuy nhiên do giá trị trả về của hàm truy vấn `getElementsByTagName` là một kiểu `collection` không hỗ trợ thao tác lặp như trên; Chúng ta sẽ tạo ra một mảng từ `collection` này và sau đó thực hiện thao tác lặp để in ra nội dung của từng phần tử.

```dropdown.js
var elementList = document.getElementsByTagName('a');
var elementArray = Array.from(elementList);

var printElementContent = function(element) {
   console.log(element.textContent);
};

elementArray.forEach(printElementContent);

// Kết quả:
// The rose is red
// The sky is sunny
// The river is blue
// The grass is green
```

## Viết lại code cho 1001 `dropdown` trong một trang đơn

Bây giờ chúng ta sẽ chỉnh sửa lại code `dropdown` mà chúng ta đang có một chút. Mục đích là để chúng ta có thể gắn nhiều `dropdown` trong cùng một trang đơn với số lượng bao nhiêu tùy ý.

Điểm xuất phát là từ ý tưởng mà CSS sử dụng các `class` để quy định phong cách thiết kế cho thành phần có thể lặp vô số lần trong một trang đơn. Chúng ta có thể có 1001 `dropdown` có phong cách hiển thị như nhau mà không cần viết lại code CSS nhiều lần. Vậy bây giờ nếu chúng ta thực hiện truy vấn bằng tên class `.dropdown-btn` hiển nhiên chúng ta sẽ có thể có được tất cả 1001 nút nhấn; Và việc cần làm lúc này là lặp lại thao tác gắn hàm xử lý sự kiện cho tất cả các nút nhấn. Với cách xử lý này chúng ta không cần sử dụng tới các `id` nữa và code HTML trông sẽ có phần gọn gàng hơn.

```dropdown.html
<div class="dropdown">
   <button class="dropdown-btn primary">
      Toggle List
   </button>

   <div class="dropdown-list hidden">
      <a class="dropdown-item" href="#">The rose is red</a>
      <a class="dropdown-item" href="#">The sky is sunny</a>
      <a class="dropdown-item" href="#">The river is blue</a>
      <a class="dropdown-item" href="#">The grass is green</a>
   </div>
</div><!-- .dropdown -->

<!-- Copy/Paste 1000 .dropdown nữa ở đây để test code lặp :D -->
```

```dropdown.js
   /* Tạo hàm xử lý sự kiện */

var toggleList = function(event) {
   var theButton = event.target;
   var theList = theButton.nextElementSibling;

   var theListIsHidden = theList.className.includes('hidden');
   if (theListIsHidden)
      theList.className = 'dropdown-list shown';
   else
      theList.className = 'dropdown-list hidden';
};

   /* Gắn hàm xử lý sự kiện */

var buttonList = document.getElementsByClassName('dropdown-btn');
var buttonArray = Array.from(btnList);

buttonArray.forEach(function(button) {
   button.onclick = toggleList;
});
```

Lúc này các `dropdown` của chúng ta đã có thể hoạt động được rồi. Tuy nhiên thì khi chúng ta sử dụng web, thông thường thì nên chỉ có một `dropdown` được mở ở một thời điểm nhất định. Tức là khi chúng ta mở một `dropdown` bất kỳ, nếu như có `dropdown` nào đó khác trong trang đang được mở thì nó sẽ được tự động đóng lại. Như vậy lúc này hàm `toggleList` của chúng ta sẽ phải thực hiện 2 tác vụ:

- Thay đổi trạng thái hiển thị của danh sách tương ứng với nút nhấn đang nhận click.
- Lặp qua tất cả các danh sách còn lại và đảm bảo rằng tất cả đều có `class="dropdown-list hidden"`.

```dropdown.js
    /* Thay đổi trạng thái hiển thị của danh sách đang nhận click */

var toggleTheList = function(event) {
   var theButton = event.target;
   var theList = theButton.nextElementSibling;

   var theListIsHidden = theList.className.includes('hidden');
   if (theListIsHidden)
      theList.className = 'dropdown-list shown';
   else
      theList.className = 'dropdown-list hidden';
}; // toggleTheList

    /* Ẩn tất cả các danh sách của các dropdown khác */

var hideOtherLists = function(event) {
   var theButton = event.target;
   var theList = theButton.nextElementSibling;

   var allList = document.getElementsByClassName('dropdown-list');
   var allListArray = Array.from(allList);

   var otherLists = allListArray.filter(function(list) {
      return list != theList
   });
   
   otherLists.forEach(function(list) {
      list.className = 'dropdown-list hidden';
   });
}; // hideOtherLists

   /* Hàm xử lý tổng quan */

var toggleList = function(event) {
   toggleTheList(event);
   hideOtherLists(event);
};

   /* Gắn hàm xử lý tổng quan */

var buttonList = document.getElementsByClassName('dropdown-btn');
var buttonArray = Array.from(buttonList);

buttonArray.forEach(function(button) {
   button.onclick = toggleList;
});
```

Ở hàm xử lý thao tác ẩn danh sách của các `dropdown` khác, chúng ta có thêm một hàm hỗ trợ lặp khác có tên là `filter`. Hãy cùng tìm hiểu thêm trong phần tiếp theo.

## Các hàm hỗ trợ lặp phổ biến

Các mảng trong JavaScript còn cung cấp các hàm lặp khác để đáp ứng nhiều nhu cầu sử dụng khác nhau. Và dưới đây là danh sách của một số hàm phổ biến:

- [`array.map()`](https://www.w3schools.com/jsref/jsref_map.asp) - lặp và tạo ra một mảng mới từ kết quả thu được khi áp dụng thao tác lên từng phần từ của mảng cũ.
- [`array.filter()`](https://www.w3schools.com/jsref/jsref_filter.asp) - lặp và sàng lọc ra tất cả các phần tử đáp ứng một tiêu chí nào đó trong mảng. Kết quả là một mảng mới lưu các giá trị phù hợp.
- [`array.reduce()`](https://www.w3schools.com/jsref/jsref_reduce.asp) - lặp và thu về kết quả tổng hợp của thao tác áp dụng lên từng phần tử.

Trong ví dụ dưới đây, chúng ta sẽ khởi tạo một mảng lưu trữ các giá trị số nguyên và thử dùng hàm `map` để tạo ra một mảng mới có các phần tử có giá trị được nhân đôi so với ở mảng cũ.

```map.js
var numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var doubleNumberValue = function(num) {
   return num * 2;
};

var doubleArray = numberArray.map(doubleNumberValue);

console.log('=== numberArray');
console.log(numberArray);

console.log('=== doubleArray')
console.log(doubleArray);

// kết quả:
// '=== numberArray'
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// '=== doubleArray'
// [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

Tiếp theo chúng ta sẽ thử lọc ra các số lẻ có trong mảng bằng hàm `filter`.

```filter.js
var numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var checkIfNumberIsOdd = function(num) {
   return (num % 2) == 1
};

var oddNumberArray = numberArray.filter(checkIfNumberIsOdd);

console.log('=== numberArray');
console.log(numberArray);

console.log('=== oddNumberArray');
console.log(oddNumberArray);

// Kết quả:
// '=== numberArray'
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// '=== oddNumberArray'
// [1, 3, 5, 7, 9]
```

Cuối cùng chúng ta sẽ tính tổng các giá trị số nguyên trong mảng ban đầu bằng hàm `reduce`. Ở đây cơ chế thực hiện tính toán của `reduce` là chúng ta có một biến lưu giá trị tổng `total` có giá trị khởi tạo là `0`. Khi lặp tới một phần tử `num` bất kỳ thì chúng ta cần trả về giá trị tổng mới là `total + num` để sử dụng làm giá trị khởi tạo `total` cho lần lặp tiếp theo.

```reduce.js
var numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var getSumOfTotalAndTheNumber = function(total, num) {
   return total + num;
};

var sum = numberArray.reduce(getSumOfTotalAndTheNumber, 0);

console.log(sum);
// result: 45
```

Bạn lưu ý thêm là các hàm hỗ trợ lặp nói chung bao gồm cả `map`, `filter`, `reduce`, và nhiều hàm khác nữa, đều hỗ trợ thêm các tham số về trị số chỉ vị trí của phần tử đang lặp tới `index` và địa chỉ tham chiếu của mảng ban đầu `theArray`.

Bài viết về `collection` và các công cụ tự động hóa việc lặp các thao tác xử lý của chúng ta tới đây là kết thúc. Như vậy là tính cho tới thời điểm hiện tại, chúng ta đã được gặp khá đầy đủ các công cụ cơ bản của ngôn ngữ JavaScript nói riêng và các công cụ dựng sẵn của trình duyệt web hỗ trợ thay đổi kiến trúc của văn bản HTML. Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về một `object` dựng sẵn, giúp chúng ta thực hiện các thao tác lên trình duyệt web, thuộc nhóm tiện ích thứ 3 mà chúng ta đã nói đến trong bài viết mở đầu của Series.

> Trích đoạn bài viết mở đầu:  
> *Chức năng thứ ba, đó là JavaScript còn có thể thực hiện những thao tác người dùng đối với chính phần mềm trình duyệt web. Ví dụ như đóng/mở một cửa sổ trình duyệt, hoặc thay đổi kích thước cửa sổ trình duyệt và di chuyển cửa sổ trên màn hình của người dùng máy tính. JavaScript cũng có thể gửi yêu cầu truy vấn thêm dữ liệu tới máy chủ web hoặc chuyển điều hướng tới địa chỉ web khác.*

[[JavaScript] Bài 8 - Window & Request](https://viblo.asia/p/jvElaR465kw)