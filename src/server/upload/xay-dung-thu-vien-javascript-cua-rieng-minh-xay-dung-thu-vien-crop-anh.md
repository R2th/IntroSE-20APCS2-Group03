# Giới thiệu

Xin chào các bạn! Thông thường khi cần có chức năng nào đó chúng ta thường lên mạng để tìm thư viện hỗ trợ chúng ta xử lý vấn đề đó. Ví dụ như crop ảnh chẳng hạn có rất nhiều thư viện có thể thực hiện rất hiệu quả yêu cầu này bạn có thể tìm hiểu trên mạng. Nhưng hôm nay, chúng ta sẽ cùng nhau tự xây dựng một thư viện crop ảnh cho riêng mình. Qua đó chúng ta sẽ có cái nhìn rõ hơn về cách hoạt động của thư viện cũng như cách để tạo ra nó. Để có cái nhìn chi tiết hơn, trong bài viết này mình sẽ tạo một thư viện crop ảnh nhỏ, không sử dụng các công cụ đóng gói như Webpack, Rollup,... Như vậy các cú pháp sử dụng phải là cú pháp javascript thuần để cho trình duyệt có thể hiểu được.

# Yêu cầu và chức năng

**Thư viện crop ảnh phải thỏa mãn các yêu cầu sau:**

- Không phụ thuộc vào thư viện khác
- Kích thước thư viện nhỏ
- Ô crop ảnh hiển thị giới hạn, cố định và có thể thay đổi được kích thước
- Ảnh crop xong có thể chỉnh sửa lại

**Chức năng của thư viện:**

- Cuộn chuột để phóng to, thu nhỏ ảnh
- Kéo thả chuột để di chuyển vị trí của ảnh

Để các bạn dễ hiểu hơn phần 1 này mình sẽ trình bày các mục:

- Xây dựng bản mẫu thư viện
- Xây dựng template html
- Load file image vào view
- Xoay file image đúng hướng: khi bạn chụp ảnh bằng một số điện thoại hoặc một số máy ảnh, lúc xoay máy ảnh thì ma trận điểm ảnh sẽ không xoay theo đúng chiều mà sẽ có một thuộc tính trong ảnh quy định về hướng của ảnh đó. Khi hiển thị lên ta phải xoay lại đúng chiều mà ảnh được chụp.

Ở phần tiếp theo sẽ có các mục:

- Tạo các event di chuyển ảnh theo thao tác chuột của người dùng
- Crop ảnh sử dụng canvas
- Upload ảnh lên server laravel
- Edit lại ảnh đã được crop và upload

Chúng ta bắt đầu thôi!

# Xây dựng bản mẫu cho thư viện
Bản mẫu thư viện mình sử dụng như sau:

```javascript
window.ImageCropper = (function () {
    const DEFAULT_OPTIONS = {};
    var instances = {};
    
    function replace(inputId, options) {
    }

    function replaceOptions(options = {}) {
        return Object.assign({}, DEFAULT_OPTIONS, options);
    }

    return {
        replace: replace,
        instances: instances,
    };
}());
```

Như bạn đã thấy mình đã sử dụng một Closure vô danh để đặt tất cả các code của mình vào đó. Đây là điển hình của [immediately invoked function expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/). Điều này giúp chúng ta giấu các biến khỏi không gian toàn cục và chỉ trả về các hàm cần thiết thông qua một object. Ở đây mình trả về một hàm `replace` và các instances được tạo ra. Hàm replace sẽ nhận vào id của phần tử `input`và các `options` cấu hình cho thư viện. Với mỗi lần `replace` cho một input mình sẽ tạo 1 instance để thao tác về sau. Tất cả các instance sẽ đều được lưu vào object `instances` với tên chính là `inputId`. Ngoài ra trong chương trình có hàm `replaceOptions` để tạo options riêng biệt cho các instance được tạo ra, người dùng có thể truyền các options cấu hình khác nhau từ bên ngoài vào.

Cuối cùng Object trả về sẽ được gán cho một biến toàn cục là `ImageCropper` để sử dụng.

# Xây dựng html template

Template crop ảnh sẽ có 2 thành phần chính: một nút để click chọn ảnh và phần hiển thị ảnh. Tại sao mình không nói đến thẻ input để chọn file ở đây là vì đó là thẻ mình sẽ tạo ra bằng tay chứ không phải code của thư viện sẽ sinh ra. 

```html
<div class="image-cropper-container">
    <div class="image-view" id="image-view"></div>
    <label for="file-input" class="file-label">
        Chọn ảnh
    </label>
</div>
<input type="file" id="file-input" class="file-input" accept="image/x-png,image/jpeg"/>
```

Hiển thị ra sẽ trông như sau

![](https://images.viblo.asia/371aa3bc-096f-41db-ae69-6c72b3a092a8.png)

Bây giờ mình sẽ tạo const `TEMPLATE` cho vào chương trình của mình. `icId` sẽ được tạo ra bằng `IC_PREFIX` + `inputId`. `icViewId` được tạo ra bằng `IC_VIEW_PREFIX` + `inputId`.

```javascript
const IC_PREFIX = 'ic-';
const IC_VIEW_PREFIX = 'ic-view-';

const TEMPLATE = '<div class="image-cropper-container" id="@%icId%@">' +
    '<div class="image-view" id="@%icViewId%@" style="width: @%width%@px;height: @%height%@px;"></div>' +
    '<label for="@%inputId%@" class="file-label">' +
    'Chọn ảnh' +
    '</label>' +
    '</div>';
```

Như vậy khi tạo một instance `image-cropper` 2 option đầu tiên có thể truyền vào là chiều rộng và chiều cao của `image-view`. Mặc định nó sẽ là 200px;

```javascript
const DEFAULT_OPTIONS = {
    width: 200,
    height: 200
};
```

Hàm replace sẽ kiểm tra sự tồn tại của input element tạo instance và gọi hàm `drawTemplate` để vẽ template cho instance đó.

```javascript
function replace(inputId, options) {
    if (instances[inputId]) {
        return instances[inputId];
    }

    var inputElement = document.getElementById(inputId);

    if (!inputElement) {
        console.log('Input element not found');
        return null;
    }

    var instance = makeInstance(inputId, options);
    
    drawTemplate(instance); // vẽ giao diện
    instances[inputId] = instance;

    return instance;
}

function makeInstance(inputId, options) {
    return {
        inputId: inputId,
        options: replaceOptions(options)
    };
}
```

Hàm `drawTemplate` sẽ sử dụng template mẫu, thay thế các biến bằng các option của `instance` và chèn đoạn html được sinh ra vào trước thẻ `input`, cuối cùng sẽ là ẩn thẻ input đi.

```javascript
function drawTemplate(instance) {
    var inputElement = document.getElementById(instance.inputId);
    var html = TEMPLATE.replace(/@%inputId%@/g, instance.inputId)
        .replace(/@%icId%@/g, IC_PREFIX + instance.inputId)
        .replace(/@%icViewId%@/g, IC_VIEW_PREFIX + instance.inputId)
        .replace(/@%width%@/g, instance.options.width)
        .replace(/@%height%@/g, instance.options.height);
    inputElement.insertAdjacentHTML('beforebegin', html);
    inputElement.style.display = 'none';
}
```

Kết quả cây DOM được tạo ra đúng như mong đợi.

![](https://images.viblo.asia/454fca54-8f9e-479c-940d-64c68865cef7.png)

# Tạo hàm add events

Để add event ta sử dụng hàm `element.addEventListener(name, func);`, còn khi loại bỏ event thì sử dụng `element.removeEventListener(name, func);`. Như bạn đã biết thì để thêm event listener và loại bỏ event listener ta đều phải có 3 thành phần là element, tên event và hàm thực hiện event đó. Vì vậy mình sẽ lưu các events của instance thành thuộc tính của nó. Hàm khởi tạo instance ta thêm một thuộc tính là events.

```javascript
function makeInstance(inputId, options) {
    return {
    /*....................*\
    |Cấu trúc của 1 event  |
    |    {                 |
    |        elementId:    |
    |        name:         |
    |        func:         |
    |    }                 |
    \*....................*/
        events: [],
    //....................
    }
}
```

Từ đó ta có thể viết được hàm lắng nghe các events và hàm hủy lắng nghe các events.

```javascript
function listenEvents(instance) {
    instance.events.forEach(function (event) {
        var element = document.getElementById(event.elementId);
        if (!element) {
            console.log('Element #' + event.elementId + ' not found');
            return;
        }
        element.addEventListener(event.name, event.func);
    });
}

function removeEventsListener(instance) {
    instance.events.forEach(function (event) {
        var element = document.getElementById(event.elementId);
        if (!element) {
            console.log('Element #' + event.elementId + ' not found');
            return;
        }
        element.removeEventListener(event.name, event.func);
    });
}
```

# Load file

Thêm sự kiện khi thay đổi file của input thì thêm file vào instance và hiển thị ra view.

```javascript
function addImageChangeEvents(instance) {
    var inputElement = document.getElementById(instance.inputId);
    var onChangeFile = function (event) {
        var files = event.target.files;
        instance.file = files.length > 0 ? files[0] : null;
        changeImage(instance);
    };
    instance.events.push({
        elementId: instance.inputId,
        name: 'change',
        func: onChangeFile
    });
}

function changeImage(instance) {
    var img;
    img = new Image();
    img.onload = function() {
        var width = img.width,
            height = img.height,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0);
        instance.imageOptions.originWidth = width;
        instance.imageOptions.originHeight = height;

        setImageToView(instance, canvas.toDataURL());
    };
    img.src = URL.createObjectURL(instance.file);
}
```

Ở hàm `changeImage` mình cần phải lưu lại chiều cao và chiều rộng gốc của ảnh load được. Hãy tạo thêm thuộc tính mặc định cho instance nhé:

```javascript
function makeInstance(inputId, options) {
    return {
        //............................
        imageOptions: makeImageOptions(),
        file: null
    };
}

function makeImageOptions() {
    return {
        originWidth: 0,
        originHeight: 0
    };
}
```

Thử nhập vào một ảnh xem có hiện lên view không nào.

![](https://images.viblo.asia/37ece2e6-2e4d-472f-a75f-ee248200d3c5.png)

# Chỉnh image đúng hướng

Như mình nói ở trên một số ảnh sẽ sử dụng thuộc tính **orientation** để quy định hướng của ảnh. Cơ bản thì giá trị của nó ảnh hưởng tới ảnh như này đây:

![](https://images.viblo.asia/f873ff0e-6211-46ed-8fec-d59009e564e2.gif)

Mình sử dụng hàm `getOrientation` để lấy orientation của ảnh. Hàm này mình tham khảo trên mạng nên các bạn cứ thế lấy và dùng thôi nhé. :money_mouth_face: 

```javascript
function getOrientation(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var view = new DataView(e.target.result);
        if (view.getUint16(0, false) != 0xFFD8) {
            return callback(-2);
        }
        var length = view.byteLength, offset = 2;
        while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
                if (view.getUint32(offset += 2, false) != 0x45786966) {
                    return callback(-1);
                }
                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++) {
                    if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
                    }
                }
            }
            else if ((marker & 0xFF00) != 0xFF00) break;
            else offset += view.getUint16(offset, false);
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file);
}
```

Hàm `addImageChangeEvents` sẽ sửa lại như sau:

```javascript
function addImageChangeEvents(instance) {
    var inputElement = document.getElementById(instance.inputId);
    var onChangeFile = function (event) {
        var files = event.target.files;
        instance.file = files.length > 0 ? files[0] : null;
        getOrientation(instance.file, function (orientation) {
            instance.imageOptions.orientation = orientation;
            changeImage(instance);
        });
    };
    //............................
```

Hãy thêm thuộc tính `orientation` mặc định cho instance

```javascript
function makeImageOptions() {
    return {
        orientation: 1,
        //..............
    }
}
```

Hàm `changeImage` sẽ được viết thêm như sau:

```javascript
function changeImage(instance) {
    var img;
    img = new Image();
    img.onload = function() {
        var width = img.width,
            height = img.height,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        if (4 < instance.imageOptions.orientation && instance.imageOptions.orientation < 9) {
            canvas.width = height;
            canvas.height = width;
        } else {
            canvas.width = width;
            canvas.height = height;
        }

        switch (instance.imageOptions.orientation) {
            case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
            case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
            case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
            case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
            case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
            case 7: ctx.transform(0, -1, -1, 0, height , width); break;
            case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
            default: break;
        }

        ctx.drawImage(img, 0, 0);

        instance.imageOptions.originWidth = width;
        instance.imageOptions.originHeight = height;

        setImageToView(instance, canvas.toDataURL());
    };

    img.src = URL.createObjectURL(instance.file);
}
```

Đây là code phần 1 này nhé: https://github.com/HoangHoi/image-cropper/tree/viblo_post_1

# Kết luận

Phù! Đã xong 1 nửa thư viện. Phần tiếp theo chúng ta sẽ cùng nhau hoàn thành nốt thư viện này nhé.

Cảm ơn các bạn đã đọc bài viết của mình.

Hi vọng bài viết giúp ích được cho các bạn.

Nếu có bất kì thắc mắc gì hãy comment xuống bên dưới.

Nếu thấy bài viết hay hãy upvote và chia sẻ với bạn bè nhé. :)