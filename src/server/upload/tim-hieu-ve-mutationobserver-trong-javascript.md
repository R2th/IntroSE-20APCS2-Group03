#  Tổng quát
MutationObserver là một API Web được cung cấp bởi các trình duyệt hiện đại để phát hiện các thay đổi trong DOM. Với API này, người ta có thể lắng nghe các element mới được thêm vào hoặc loại bỏ, các thay đổi thuộc tính hoặc các thay đổi trong nội dung văn bản của các element.

Tại sao bạn muốn làm điều đó?

Có khá nhiều trường hợp mà API MutationObserver có thể thực sự hữu ích. Ví dụ:

* Bạn muốn thông báo cho khách truy cập ứng dụng web của mình rằng một số thay đổi đã xảy ra trên trang mà anh ấy hiện đang truy cập.
* Bạn đang làm việc trên một khung JavaScript tải các mô-đun JavaScript động dựa trên cách DOM thay đổi.
* Bạn có thể đang làm việc trên một trình soạn thảo WYSIWYG, cố gắng triển khai chức năng hoàn tác / làm lại. Bằng cách tận dụng API MutationObserver, bạn biết những thay đổi nào đã được thực hiện tại bất kỳ thời điểm nào, vì vậy bạn có thể dễ dàng hoàn tác chúng.
 
 ![](https://images.viblo.asia/99300cc3-810c-4e7f-a045-e3a1b3f5fd8b.png)

# Cách sử dụng MutationObserver

Việc triển khai MutationObservervào ứng dụng của bạn khá dễ dàng. Bạn cần tạo một biến MutationObserver bằng cách chuyển cho nó một hàm sẽ được gọi mỗi khi xảy ra đột biến. Đối số đầu tiên của hàm là tập hợp tất cả các đột biến đã xảy ra trong một đợt duy nhất. Mỗi đột biến cung cấp thông tin về loại của nó và những thay đổi đã xảy ra.
 
```javascript
var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });
});

```

Đối tượng được tạo có ba phương thức:

* observe- bắt đầu lắng nghe các thay đổi. Lấy hai đối số - DOM element bạn muốn quan sát và một đối tượng cài đặt
* disconnect - ngừng lắng nghe các thay đổi
* takeRecords - trả về loạt thay đổi cuối cùng trước khi lệnh gọi lại được kích hoạt.

```javascript
// Starts listening for changes in the root HTML element of the page.
mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});
```
Bây giờ, giả sử bạn có một số div rất đơn giản trong DOM:

```
<div id="sample-div" class="test"> Simple div </div>
```
Sử dụng jQuery, bạn có thể xóa class khỏi div đó:
```
$("#sample-div").removeAttr("class");
```

Sau khi gọi, mutationObserver.observe(...) chúng ta sẽ thấy thay đổi trong console của MutationRecord tương ứng :
![](https://images.viblo.asia/8e98d42d-ce4d-4e9f-b355-caedd41b566b.png)


Đây là đột biến do xóa class.
Và cuối cùng, để ngừng quan sát DOM sau khi hoàn thành công việc, bạn có thể làm như sau:
```
// Stops the MutationObserver from listening for changes.
mutationObserver.disconnect();
```

# Giải pháp thay thế
## MutationEvents
Vào năm 2000, API MutationEvents được giới thiệu. Mặc dù hữu ích, các sự kiện đột biến được kích hoạt trên mỗi thay đổi trong DOM, điều này lại gây ra các vấn đề về hiệu suất. Ngày nay, MutationEventsAPI đã không còn được dùng nữa và các trình duyệt hiện đại sẽ sớm ngừng hỗ trợ hoàn toàn.

## CSS Animation
Một sự thay thế hơi kỳ lạ là một sự thay thế dựa trên hoạt ảnh CSS . Nghe có vẻ hơi khó hiểu. Về cơ bản, ý tưởng là tạo một hoạt ảnh sẽ được kích hoạt khi một phần tử đã được thêm vào DOM. Thời điểm hoạt ảnh bắt đầu, sự kiện animationstart sẽ được kích hoạt: nếu bạn đã đính kèm một trình xử lý sự kiện vào sự kiện đó, bạn sẽ biết chính xác khi nào phần tử đã được thêm vào DOM. Khoảng thời gian thực thi của hoạt ảnh phải nhỏ đến mức người dùng thực tế không nhìn thấy được.
Đầu tiên, chúng ta cần một phần tử cha, bên trong đó, chúng ta muốn lắng nghe các thao tác chèn element:
```
<div id=”container-element”></div>
```
Để xử lý việc chèn element, chúng ta cần thiết lập một loạt các hoạt ảnh khung hình chính sẽ bắt đầu khi element được chèn:

```
@keyframes nodeInserted { 
 from { opacity: 0.99; }
 to { opacity: 1; } 
}
```
Với các khung hình chính được tạo, hoạt ảnh cần được áp dụng trên các yếu tố bạn muốn nghe. Lưu ý các khoảng thời gian nhỏ - chúng đang làm giãn dấu chân hoạt ảnh trong trình duyệt:
```
#container-element * {
 animation-duration: 0.001s;
 animation-name: nodeInserted;
}
```
Điều này thêm hoạt ảnh vào tất cả các nút con của container-element. Khi hoạt ảnh kết thúc, sự kiện chèn sẽ kích hoạt.

Chúng ta cần một hàm JavaScript sẽ hoạt động như một trình xử lý sự kiện. Hàm event.animationName phải được kiểm tra để đảm bảo đó là hoạt ảnh mà chúng ta muốn.

```javascript
var insertionListener = function(event) {
  // Making sure that this is the animation we want.
  if (event.animationName === "nodeInserted") {
    console.log("Node has been inserted: " + event.target);
  }
}
```

```javascript
document.addEventListener(“animationstart”, insertionListener, false); // standard + firefox
document.addEventListener(“MSAnimationStart”, insertionListener, false); // IE
document.addEventListener(“webkitAnimationStart”, insertionListener, false); // Chrome + Safari

```

MutationObservercung cấp một số lợi thế so với các giải pháp nêu trên. Về bản chất, nó theo dõi mọi thay đổi có thể xảy ra trong DOM và nó được tối ưu hóa hơn. Trên hết, MutationObserverđược hỗ trợ bởi tất cả các trình duyệt hiện đại, cùng với một vài polyfills sử dụng MutationEvents.