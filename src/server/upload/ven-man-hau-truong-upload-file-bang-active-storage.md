Active Storage là một framework của Ruby giúp chúng ta dễ dàng tải lên các tệp và truy cập chúng ở nơi lưu trữ. Nó được tích hợp sẵn trong Ruby On Rails 6, nhưng nó cũng có một thư viện JavaScript. 
Trong bài đăng này, bạn sẽ thấy Active Storage thực sự hoạt động như thế nào từ bên trong. Chúng ta sẽ theo dõi luồng chính của chương trình và xem cách nó xử lý tệp khi được người dùng tải lên thông qua trình duyệt bằng JavaScript. Và sau đó, làm thế nào tập tin được tải lên server với Ruby. Bắt đầu nào.

## Autostart

Tất cả bắt đầu từ đây, với autostart. Đây là chức năng bắt đầu mọi thứ trong thế giới của Active Storage. Nó gọi hàm start() nếu đối tượng ActiveStorage xuất hiện trong thuộc tính window của trình duyệt. Đây là nó:
```js
function autostart() {
        if (window.ActiveStorage) {
            start() // Imported from ujs.js  
        }
}
```
Sau đó, Active Storage sử dụng chức năng setTimeout để tự động gọi chức năng tự khởi động sau một mili giây:
```js
setTimeout(autostart, 1)
```

## Start

Vậy hàm start() này có chức năng gì? Nhìn vào function start(), đầu tiên, nó thực hiện kiểm tra để đảm bảo ứng dụng chưa khởi động và nếu vậy, nó sẽ đổi trạng thái của biến started thành true. Điều tiếp theo nó làm là đính kèm một event listener vào sự kiện submit với trình xử lý didSubmitForm. Điều đó có nghĩa là didSubmitForm sẽ chạy mỗi khi sự kiện submit  được kích hoạt bởi người dùng. Sự kiện sẽ được kích hoạt sau khi người dùng đã gửi biểu mẫu cùng với tệp họ chọn để tải lên. Hàm start sẽ trông như thế này:
```js
export function start() {
    if (!started) {
        started = true
        // ...   
        document.addEventListener("submit", didSubmitForm)
    }
}
```

## Did Submit Form

Khi người dùng đã tải lên một tệp, Active Storage sẽ chạy trình xử lý didSubmitForm. didSubmitForm sẽ truyền event sang cho handleFormSubmissionEvent và kích hoạt nó.
```js
function didSubmitForm(event) {
    handleFormSubmissionEvent(event)
}
```

## Handle Form Submission Event

Vậy chức năng của handleFormSubmissionEvent là gì? Nó tạo ra một instance của DirectUploadsControll với biến truyền vào là form mà người dùng đã gửi. Và nó bắt đầu nó với controller.start ().
```js
function handleFormSubmissionEvent(event) {  
    // ...  
    const controller = new DirectUploadsController(form)
  
    controller.start()
}
```

## Direct Uploads Controller

Trong controller Direct Uploads, Active Storage tạo một instance mới của model DirectUpload JavaScript, truyền cho nó tệp mà người dùng đang tải lên, url của nó và một instance của controller.
```ruby
export class DirectUploadsController {
    this.directUpload = new DirectUpload this.file, this.url, this
}
```

## Direct Upload

Chính ở trong hai model này quá trình xử lý cốt lõi đang diễn ra. Nó thực hiện hai điều: Nó tạo ra một instance blob mới từ model BlobRecord, giúp lưu dữ liệu meta của tệp mà người dùng đang tải lên trong cơ sở dữ liệu mà không thực sự lưu vào ổ cứng của servẻ. Và sau đó, nó gọi method create() trên instance blob và chuyển cho nó một callback. Lại chính trong callback này việc tải lên tập tin thực sự xảy ra.

Cách thức thực hiện là bằng cách tạo một upload instance mới từ class model BlobUpload và chuyển vào biến blob.
```ruby
export class DirectUpload {  
    create() 
    {    
        // ...    
        const blob = new BlobRecord(this.file, checksum, this.url)    
        blob.create( =>
            const upload = new BlobUpload(blob)   
        ) 
    }
}
```

## Blob Record

Model BlobRecord tạo ra một yêu cầu AJAX POST đến server. Từ đây, Rails controller ở back-end tiếp quản quá trình xử lý request của người dùng.
```ruby
export class BlobRecord { 
    constructor {
        // ...   
        this.xhr = new XMLHttpRequest   
        this.xhr.open("POST", url, true)  
    } 
    create() {   
        this.xhr.send() 
    }
}
```

## Direct Uploads Controller


Active Storage có base controller riêng kế thừa trực tiếp từ ActionContoder::Base. Nó có tên là ActiveStorage::BaseContoder.

The controller có tên created_b Before_direct_upload chỉ gọi lệnh tạo và tạo một instance mới của model back-end ActiveStorage::Blob trong Ruby. Ở đây, nó chủ yếu viết dữ liệu meta của tệp được tải lên cơ sở dữ liệu. Máy chủ trả về một chuỗi JSON có url và các service headers để tải lên trực tiếp.
```ruby
class ActiveStorage::DirectUploadsController < ActiveStorage::BaseController  
    def create
        blob = ActiveStorage::Blob.create_before_direct_upload!(blob_args)    
        render json: direct_upload_json(blob)
    end
end
```

## Blob Upload


Đây là yêu cầu AJAX thứ hai mà Active Storage gửi tới máy chủ. Lần này, nó là một PUT request, sẽ gửi trực tiếp tới DiskContoder ở back-end, lần lượt tải tệp lên tới các service (trong trường hợp này là đĩa cục bộ).
```
export class BlobUpload { 
    constructor {    
        this.xhr = new XMLHttpRequest    
        this.xhr.open("PUT", url, true)  
    }  
    create() {    
        this.xhr.send(this.file.slice())  
    }
}
```

## Disk Controller

Cuối cùng, việc tải tệp lên ổ cứng xảy ra ở đây. Controller phản hồi với một hành động cập nhật trong đó ủy quyền cho ActiveStorage::Blob và gọi dịch vụ tải lên. Tại thời điểm này, quá trình được hoàn thành và tập tin đã nằm trong service tải lên.
```ruby
class ActiveStorage::DiskController < ActiveStorage::BaseController  
    def update    
        ActiveStorage::Blob.service.upload  
    end
end
```

## Focusing on the main flow

Tất nhiên, có rất nhiều thứ khác trong quá trình tải tệp lên bằng Active Storage và tôi đã đơn giản hóa mọi thứ một chút. Nhưng tôi chỉ muốn hiểu về dòng chảy chính của chương trình. Framework này được documented rất chi tiết vì vậy tôi khuyên bạn nên đọc kỹ về nó nếu có nhu cầu. Cảm ơn bạn đã đọc bài viết!