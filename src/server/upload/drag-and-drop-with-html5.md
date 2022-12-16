Drag & drop (kéo và thả) là một tính năng rất hữu ích và phổ biến trong các website hiện nay. Tính năng này cho phép người dùng có thể di chuyển các đối tượng từ vị trí này sang vị trí khác trên trang web.
Trong bài viết này tôi sẽ triển khai tính năng kéo thả đơn giản bằng HTML5.

HTML5 đã đưa ra API drag and drop (DnD) mang đến hỗ trợ DnD gốc cho trình duyệt giúp việc mã hóa dễ dàng hơn nhiều.
HTML 5 DnD được hỗ trợ bởi tất cả các trình duyệt chính như Chrome, Firefox 3.5 và Safari 4,...

Đầu tiên chúng ta sẽ tìm hiểu một số event phục vụ cho DnD:
## 1. Drag and drop Events



| Event | On Event Handel | Fires when… |
| -------- | -------- | -------- |
| drag     | ondrag     | Khi một đối tượng được kéo     |
| dragend | ondragend | Khi kết thúc thao tác kéo đối tượng (VD: thả chuột hoặc nhấn Esc) |
| dragenter     | ondragenter     | Kích hoạt khi con trỏ chuột lần đầu di chuyển qua element trong khi nó đang kéo 1 đối tượng khác. Một listener cho event này nên biết xem có được drop lên khu vực này hay không. Nếu không có listener hoặc listener không thực hiện hành động nào thì sẽ k được drop. |
| dragexit     | ondragexit     | Text     |
| dragleave | ondragleave | Khi đối tượng rời khỏi mục tiêu thả hợp lệ. |
| dragover     | ondragover     | Khi con trỏ chuột di chuyển qua element khi đang kéo 1 đối tượng khác. Luồng xử lí gần như sẽ tương tự như dragenter     |
| dragstart | ondragstart | Khi người dùng bắt đầu kéo đối tượng |
| drop     | ondrop     | Khi đối tượng được thả vào mục tiêu thả hợp lệ.     |

Trên đây là các event sử dụng trong việc drag and drop và mục đích của chúng, chúng ta sẽ tìm hiểu các dùng cụ thể ở ví dụ phần sau:
## 2. Interface

Các `Interface` của HTML Drag and Drop là `DragEvent`, `DataTransfer`, `DataTransferItem` and `DataTransferItemList`.

Giao diện `DragEvent` có một constructor và một thuộc tính `dataTransfer`, cũng là một đối tượng `DataTransfer`.

Đối tượng `DataTransfer` bao gồm trạng thái của drag event, như là loại drag đang thực thi (copy, move), dữ liệu được kéo (một hoặc nhiều item), và loại MIME của một item. Đối tượng `DataTransfer` còn có các phương thức để thêm hoặc xóa item khỏi dữ liệu kéo.

`DragEvent` và `DataTransfer` được hỗ trợ rộng rãi trên các trình duyệt. Trong khi đó, `DataTransferItemvà` và `DataTransferItemList` lại bị hạn chế. Vì vậy ở tính năng này chúng ta sẽ chỉ sử dụng `DragEvent` và `DataTransfer`.

## 3. Các bước xây dựng chức năng Drag and Drop


### *Bước 1: Xác định đối tượng có thể kéo*

Để chỉ định một đối tượng có thể kéo, bạn cần đặt đối tượng đó với thuộc tính `dragable = "true"` cùng với event dragstart để lắng nghe, lưu trữ dữ liệu được kéo và cài đặt các hiêu ứng cho phép.

Ví dụ dứoi đây chỉ định box A là đối tượng người dùng có thể kéo:


``` 
      <center>
         <h2>Drag and drop HTML5</h2>
         <div>Drag box A around page.</div>
         
         <div id = "boxA" draggable = "true" ondragstart = "return onDragStartHandle(ev)">
            <p>Drag Me</p>
         </div>
         
         <div id = "boxB">Drop zone</div>
      </center>
```

Thêm sự kiện dragstart:

Mỗi drag event có một thuốc tính dataTransfer chứa dứ liệu của event đó. Chúng ta sử dụng phương thức setData() để thêm dữ liệu vào event như sau:

```  
         function onDragStartHandle(ev) {
            ev.dataTransfer.effectAllowed = 'move';
            ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
            ev.dataTransfer.setDragImage(ev.target,0,0);
            
            return true;
         }
```

Lúc này chúng ta có thể kéo đối tượng box A quang trang web:

![](https://images.viblo.asia/03fd0bc0-1e2a-4473-aabe-b75aac8d6275.png)


### *Bước 2: Thả đối tượng*
Để chấp nhận thả, mục tiêu cần thả phải lắng nghe ít nhất ba event.

- `dragenter`: xác định liệu mục tiêu thả có chấp nhận thả hay không.

- `dragover`: xác định những thông tin phản hồi để hiển thị cho người dùng. Nếu sự kiện bị hủy, thì phản hồi (thường là con trỏ) được cập nhật dựa trên giá trị của thuộc tính dropEffect.

- `drop`: cho phép thực hiện thả thực tế.

Sau đây là ví dụ để thả một đối tượng vào một đối tượng khác:

```
<center>
         <h2>Drag and drop HTML5</h2>
         <div>Drag box A around page and drop Dropzone</div>
         <div id="boxA" draggable="true" ondragstart="return onDragStartHandle(event)">
            <p>Drag Me</p>
         </div>
         <div id="boxB" ondragenter="return onDragEnterHandle(event)" ondrop="return onDropHandle(event)" ondragover="return onDragOverHandle(event)">Drop zone</div>
      </center>
```

```
function onDragStartHandle(ev) {
            ev.dataTransfer.effectAllowed='move';
            ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
            ev.dataTransfer.setDragImage(ev.target,0,0);
            return true;
         }
         function onDragEnterHandle(ev) {
            event.preventDefault();
            return true;
         }
         function onDragOverHandle(ev) {
            return false;
         }
         function onDropHandle(ev) {
            var src = ev.dataTransfer.getData("Text");
            ev.target.appendChild(document.getElementById(src));
            ev.stopPropagation();
            return false;
         }
```


Có nhiều trường hợp mà chúng ta có thể áp dụng drag và drop, ví dụ như việc upload file bằng drag & drop. Chúng ta cũng có thể custom thêm nhiều hiêu ứng để góp phần tiện ích hơn cho ứng dụng website của mình.

### *Tài liệu tham khảo:*
https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API