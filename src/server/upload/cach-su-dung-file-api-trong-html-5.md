Trong HTML 5 trên Firefox, File API đã được thêm vào trong DOM, nó cho phép yêu cầu user chọn file trên local và đọc nội dung của các file đó. Việc chọn này được dùng thông qua thẻ `<input type="file">` hay bằng cách kéo và thả (drag and drop)

Nếu bạn muốn sử dụng DOM File API từ extension khác hoặc từ chrome, bạn có thể nhưng sẽ có một vài tính năng bổ sung. Nếu muốn biết rõ hơn các tính năng trong chrome thì bạn có thể tham khảo trong [DOM File API in chrome code](https://developer.mozilla.org/en-US/docs/Extensions/Using_the_DOM_File_API_in_chrome_code)

### Truy cập các file được chọn 

Với mã HTML:

```ruby
<input type="file" id="input" multiple>
```

File API giúp bạn dễ dàng truy cập vào một `FileList` chứa các đối tượng `File` biểu diễn các file được chọn bởi người dùng.

Với thuộc tính `multiple` trong thẻ input cho phép user chọn nhiều file 

Muốn truy cập vào file được chọn đầu tiên thì sử dụng selector DOM thông thường: 

```ruby
const selectedFile = document.getElementById('input').files[0];
```

#### Truy cập file được chọn trong sự kiện change

Để truy cập vào FileList thông qua sự kiện change, bạn chỉ cần dùng `EventTarget.addEventListener()` để thêm listener cho sự kiện change:

```ruby
const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
}
```

### Lấy thông tin từ file được chọn 

Đối tượng FileList của DOM sẽ hiện toàn bộ các file được chọn bởi user, mỗi file là một đối tượng File. Bạn có thể xác định có bao nhiêu file mà user chọn bằng cách kiểm tra giá trị length của danh sách file.

```ruby
const numFiles = fileList.length;
```

Các đối tượng File có thể được truy cập chỉ đơn giản bằng cách truy cập vào danh sách như một mảng:

```ruby
for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
  const file = fileList[i];
  // ...
}
```

Có 3 thuộc tính được cung cấp bởi đối tượng File sẽ chứa các thông tin cần thiết:

- name: tên của file 
- size: kích thước của file 
- type: MINE type của file, hoặc trả về " " nếu như type không xác định được  

### Sử dụng thẻ input file hidden và hàm click() 

Bạn có thể ẩn thẻ `<input>` file nhìn khá là xấu và hiện một giao diện chọn file của bạn và hiển thị các file mà user đã chọn. Bạn có thể làm điều đó bằng cách ẩn thẻ input với `display:none` và gọi hàm `click()` trong thẻ <input>

```ruby
# code HTML
<input type="file" id="fileElem" multiple accept="image/*" style="display:none">
<button id="fileSelect">Select some files</button>

# code JS
const fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
}, false);
```

Giờ bạn có thể thoải mái trang trí lại button chọn file.

### Sử dụng thẻ label để trigger thẻ input file ẩn 
    
Để cho phép mở cửa sổ chọn file mà không dùng hàm JS click(), ta có thể dùng thẻ `<label>`. 

Ta có mã HTML:

```ruby
<input type="file" id="fileElem" multiple accept="image/*" class="visually-hidden">
<label for="fileElem">Select some files</label>
```

Ta dùng CSS để chỉnh sửa:

```ruby
.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

/* Separate rule for compatibility, :focus-within is required on modern Firefox and Chrome */
input.visually-hidden:focus + label {
  outline: thin dotted;
}
input.visually-hidden:focus-within + label {
  outline: thin dotted;
}
```

Không cần phải dùng Javascript code gọi hàm click(), bạn chỉ cần style lại label như bạn muốn.

### Chọn file bằng cách dùng drag và drop 

Bạn cũng có thể cho phép user drag và drop file vào ứng dụng web 

Đầu tiên là cần tạo một drop zone. Những nội dung mà sẽ chấp nhận drop phụ thuộc vào thiết kế của ứng dụng bạn, nhưng hãy tạo một thẻ để nhận sự kiện drop:

```ruby
let dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
```

Trong vd, chúng ta chuyển element với id dropbox vào trong drop zone của chúng ta. Nghĩa là cần thêm listener các sự kiện dragenter, dragover, drop.

Chúng ta không cần thực sự cần làm cái gì với sự kiện dragenter và dragover trong trường hợp này, vì nhưng hàm này là đơn giản. Chúng ta chỉ cần chặn sự kiện phát sinh và hành động mặc định được xảy ra:

```ruby
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
} 
```

và hàm cần thực thi là drop()

```ruby
function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}
```

Ở đây, chúng ta lấy trường dataTransfer từ sự kiện, lấy danh sách file ra và sau đó truyền vào handleFiles(). Theo quan điểm này, việc xử lý file tương tự như khi user sử dụng thẻ input hay kéo và thả.

#### VD: Hiển thị các ảnh đại diện mà user chọn 

Giả sử bạn muốn sử dụng HTML để hiển thị các ảnh xem trước thumbnail trước khi user upload chúng. Bạn có thể tạo thẻ input hay drop zone giống như ở trên và gọi hàm handleFiles()

```ruby
function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (!file.type.startsWith('image/')){ continue }
    
    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    preview.appendChild(img); // Giả sự preview là thẻ div để hiện nội dung 
    
    const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
}
```

Ở đây, vòng lặp các file user chọn sẽ kiểm tra từng thuộc tính type của file và xem nếu type MINE bắt đầu bằng từ "image/". Nếu file đó là ảnh, chúng ta sẽ tạo một thẻ img. CSS được dùng để thêm border, shadow hay chỉ ra kích thước của ảnh.

Mỗi ảnh có lớp CSS obj được thêm vào, để dễ dàng tìm thông qua cây DOM. Chúng ta cũng thêm thuộc tính file cho mỗi image để xác định đối tượng File cho ảnh đó, điều đó cho phép chúng ta lấy image để cho việc upload sau. Chúng ta cũng dùng `Node.appendChild()` để thêm thumbnail cho preview trong DOM. 

Kế tiếp, chúng ta dùng FileReader để xử lý việc load ảnh bất đồng bộ và gán nó vào thẻ img. Sau khi tạo đối tượng FileReader, chúng ta cài đặt hàm onload và gọi readAsDataURL() để bắt đầu quá trình đọc ở background. Khi toàn bộ nội dung ảnh đã được load, chúng sẽ convert thành data URL và truyền vào callback của onload. Và sẽ thêm vào thuộc tính src của img để ảnh được load sẽ hiển thị trên màn hình user.

### Sử dụng đối tượng URL 

Hàm `URL.createObjectURL()` và `URL.revokeObjectURL()` của DOM cho phép bạn tạo chuỗi URL đơn giản để có thể được dùng tham chiếu bất cứ dữ liệu gì liên quan đến một đối tượng File DOM, bao gồm file trên local.

Khi bạn có một đối tượng File tham chiếu đến URL trong HTML, bạn có thể tạo một đối tượng URL:

```ruby
const objectURL = window.URL.createObjectURL(fileObj);
```

Đối tượng URL là một chuỗi để xác định đối tượng File. Mỗi khi bạn gọi URL.createObjectURL(), một đối tượng duy nhất URL được tạo ra dù cho bạn đã tạo một đối tượng URL trước đó rồi.

```ruby
URL.revokeObjectURL(objectURL);
```

#### Sử dụng đối tượng URL để hiển thị ảnh 

VD, sử dụng đối tượng URL để hiển thị ảnh thumbnail. Và hiển thị thêm các thông tin file khác như name và kích thước.

Code HTML sẽ là:

```ruby
<input type="file" id="fileElem" multiple accept="image/*" style="display:none">
<a href="#" id="fileSelect">Select some files</a> 
<div id="fileList">
  <p>No files selected!</p>
</div>
```

Nó sẽ tạo thẻ <input> như link. Sử dụng hàm click() cho thẻ input file ẩn 

Hàm handleFiles() sẽ như sau:

```ruby
const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

fileElem.addEventListener("change", handleFiles, false); 

function handleFiles() {
  if (!this.files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
  } else {
    fileList.innerHTML = "";
    const list = document.createElement("ul");
    fileList.appendChild(list);
    for (let i = 0; i < this.files.length; i++) {
      const li = document.createElement("li");
      list.appendChild(li);
      
      const img = document.createElement("img");
      img.src = URL.createObjectURL(this.files[i]);
      img.height = 60;
      img.onload = function() {
        URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);
      const info = document.createElement("span");
      info.innerHTML = this.files[i].name + ": " + this.files[i].size + " bytes";
      li.appendChild(info);
    }
  }
}
```

#### Sử dụng object URLs để hiển thị PDF 

Đối tượng URL có thể được dùng cho nhiều kiểu file hơn là mỗi ảnh. Chúng ta có thể dùng để hiển thị file PDF hay các file khác phụ thuộc vào trình duyệt hỗ trợ.

Trong filefox, bạn có thể hiển thị PDF nhưng được nhúng trong thẻ iframe, khi đó thuộc tính pdfjs.disabled phải được set thành false.

```ruby
<iframe id="viewer">
```

và ta chỉ cần thay đổi thuộc tính src

```ruby
const obj_url = URL.createObjectURL(blob);
const iframe = document.getElementById('viewer');
iframe.setAttribute('src', obj_url);
URL.revokeObjectURL(obj_url);
```

#### Sử dụng object URLs với các loại file khác

Bạn có thể dùng đối tượng URLs cho nhiều loại file khác, vd với video 

```ruby
const video = document.getElementById('video');
const obj_url = URL.createObjectURL(blob);
video.src = obj_url;
video.play();
URL.revokeObjectURL(obj_url);
```