Bạn có thể đã thấy việc nhận dạng khuôn mặt trước đây. Ngay khi bạn chia sẻ hoặc upload một bức ảnh về gia đình, bạn bè ... lên Facebook, bạn sẽ nhận thấy các viền xung quanh tất cả các khuôn mặt được phát hiện. Và với nhận diện khuôn mặt , đôi khi nó còn tự động gắn thẻ người bạn chính xác. Nó không phải lúc nào cũng chính xác 100%, nhưng nó vẫn là một kỹ thuật tuyệt vời!

**Ứng dụng nhận diện khuôn mặt**

Trong bài viết này, chúng tôi sẽ bắt đầu và chạy bằng Google Cloud Vision API để phát hiện khuôn mặt. Chúng tôi sẽ sử dụng một hình ảnh hiện có và chúng tôi sẽ vẽ một viền hình vuông xung quanh mỗi khuôn mặt được phát hiện.
Có một số trường hợp sử dụng trong thực tế để phát hiện khuôn mặt. Một số trong số này bao gồm:

- Phát hiện xem một hình ảnh được upload có bất kỳ khuôn mặt nào hay không. Đây có thể là một bước sàng lọc như là một phần của quy trình nhận biết khách hàng của bạn.
- Kiểm duyệt hình ảnh cho các ứng dụng mà cho phép người dùng tạo nội dung
- Khả năng cung cấp việc gắn tag, giống như cách các mạng xã hội làm.

**Các chức năng khác có sẵn trong API của Cloud Vision**

Phát hiện khuôn mặt chỉ là một trong nhiều chức năng có sẵn trong API này. Nó hỗ trợ các chức năng bổ sung sau:

- Phát hiện các logo phổ biến.
- Khả năng phát hiện tất cả các loại áp dụng cho một hình ảnh. Ví dụ, một bức ảnh của một con mèo có thể tạo ra các thể loại: mèo, động vật có vú, động vật có xương sống.
- Trích xuất văn bản từ hình ảnh.
- Chạy Safe Search Detection để gắn cờ cho các hình ảnh có chứa nội dung người lớn hoặc bạo lực.

**Thiết lập nền tảng đám mây của Google**

Bước đầu tiên liên quan đến việc tạo new project trong Google Cloud Platform console.
![](https://cdn-images-1.medium.com/max/800/0*uhNzb67M6tzn_F2X.png)

Di chuyển qua dashboard và create new project.
![](https://cdn-images-1.medium.com/max/800/0*oJc-uwwL9bQaQgFv.png)

Khi tạo project thành công bạn nên nhớ Project ID
![](https://cdn-images-1.medium.com/max/800/0*g9RQpBKdAouM_0og.png)

Thực hiện theo các bước sau:

- Khi bạn có project của mình, hãy truy cập trang [Create Service Account Key](https://console.cloud.google.com/apis/credentials/serviceaccountkey) .
- Đảm bảo Facial Detection project của bạn được chọn ở trên cùng.
- Dưới “Service Account ” , chọn “New service account”.
- Nhập tên vào mục "Service account name".
- Trong mục nhập "Role", chọn "Project" > "Owner"
- Cuối cùng, hãy nhấp vào "Create" để có tệp thông tin xác thực JSON được tải xuống tự động.

![](https://cdn-images-1.medium.com/max/800/0*_s7qrvmN--r11QcP.png)

Bạn cũng có thể cần enable API Cloud Vision thông qua phần API Library.

**Setup Laravel project**

Bước tiếp theo liên quan đến việc thiết lập một dự án Laravel. Chi tiết hướng dẫn các bạn có thể xem [Laravel installer](https://laravel.com/docs/5.5#installing-laravel)

**Cài đặt Google cloud-vision package**

Chạy lệnh sau để thêm `google/cloud-vision` vào project của bạn:

```composer require google/cloud-vision```

Bạn có thể đặt tệp thông tin JSON credentials đã tải xuống trong thư mục gốc của ứng dụng. Đừng đặt nó trong thư mục "public" và hãy đổi tên nó. Đừng commit file lên repo của bạn.

**Let's start coding**

Thứ nhất, đảm bảo bạn đã cài đặt và kích hoạt [thư viện GD](http://php.net/manual/en/image.setup.php). Hầu hết các nền tảng đều được bật theo mặc định.

Tạo một route trong "routes/web.php" file:

```Route::get('/', 'SampleController@detectFaces');```

Tôi đã tạo một `SampleController` để thực hiện action detectFaces. Trong một ứng dụng production, tôi thực sự khuyên bạn nên sử dụng các class service riêng biệt cho bất kỳ business logic nào. Bằng cách này, các controller sẽ tinh gọn và bám sát mục đích ban đầu của chúng: kiểm soát input/output.

Chúng ta sẽ bắt đầu với một simple controller, include Google Cloud ServiceBuilder class:

```
<?php
namespace App\Http\Controllers;
use Google\Cloud\Core\ServiceBuilder;
class SampleController extends Controller
{
    public function detectFaces()
    {
        // Code will be added here
    }
}
```
Điều đầu tiên chúng ta sẽ làm là tạo một instance của `ServiceBuilder` để có thể chỉ định thông tin đăng nhập Project ID và JSON credentials.
```
$cloud = new ServiceBuilder([ 
    'keyFilePath' => base_path('fda.json'), 
    'projectId' => 'facial-detection-app' 
]);
```

Tiếp theo, chúng ta sẽ tạo một instance của `VisionClient`.
```
$vision = $cloud->vision();
```

Bây giờ chúng ta có một instance và có thể bắt đầu sử dụng Vision API. Chúng tôi sẽ sử dụng hình ảnh sau đây làm ví dụ. Vui lòng tải xuống hình ảnh này, đặt tên cho nó là Friends `friends.jpg` và đặt nó vào thư mục của bạn.
![](https://cdn-images-1.medium.com/max/800/0*hz8T0-prht25n_O3)


Trước tiên chúng ta sẽ tạo new image sử dụng thư viện GD `imagecreatefromjpeg()`. Sử dụng function helpper Laravel `public_path ()` để tham chiếu đến hình ảnh của chúng tôi được đặt trong thư mục "public".
```
$output = imagecreatefromjpeg(public_path('friends.jpg'));
```

Tiếp theo, sẽ tạo một  Cloud Vision `Image` object có cùng hình ảnh này và chỉ định rằng muốn chạy facial detection:
```
$image = $vision->image(file_get_contents(public_path('friends.jpg')), ['FACE_DETECTION']);
```

Bạn sẽ nhận thấy một sự thay đổi nhỏ ở đây. Thay vì cung cấp đường dẫn đến hình ảnh, chúng tôi đang cung cấp hình ảnh thực tế dưới dạng chuỗi sử dụng `file_get_contents()`.

Sau đó, chúng ta chạy method `annote()`thức trên hình ảnh:
```
$results = $vision->annotate($image);
```

Bây giờ chúng ta đã có kết quả, chỉ cần lặp qua các mặt được tìm thấy và vẽ các viền hộp xung quanh chúng bằng các đỉnh được cung cấp trong kết quả:
```
foreach ($results->faces() as $face) {
    $vertices = $face->boundingPoly()['vertices'];
    $x1 = $vertices[0]['x'];
    $y1 = $vertices[0]['y'];
    $x2 = $vertices[2]['x'];
    $y2 = $vertices[2]['y'];
    imagerectangle($output, $x1, $y1, $x2, $y2, 0x00ff00);
}
```

Một khi điều này được thực hiện, chúng ta có thể xuất hình ảnh và giải phóng bộ nhớ:
```
header('Content-Type: image/jpeg'); 
imagejpeg($output); 
imagedestroy($output);
```

Và đây là kết quả:
![](https://cdn-images-1.medium.com/max/800/1*TXSrJWlK-W8IOG64706n6Q.jpeg)

Đây là final code:
```
<?php
namespace App\Http\Controllers;
use Google\Cloud\Core\ServiceBuilder;
class SampleController extends Controller
{
    public function detectFaces()
    {
        $cloud = new ServiceBuilder([
            'keyFilePath' => base_path('fda.json'),
            'projectId' => 'facial-detection-app'
        ]);
        $vision = $cloud->vision();
        $output = imagecreatefromjpeg(public_path('friends.jpg'));
        $image = $vision->image(file_get_contents(public_path('friends.jpg')), ['FACE_DETECTION']);
        $results = $vision->annotate($image);
        foreach ($results->faces() as $face) {
            $vertices = $face->boundingPoly()['vertices'];
            $x1 = $vertices[0]['x'];
            $y1 = $vertices[0]['y'];
            $x2 = $vertices[2]['x'];
            $y2 = $vertices[2]['y'];
            imagerectangle($output, $x1, $y1, $x2, $y2, 0x00ff00);
        }
        header('Content-Type: image/jpeg');
        imagejpeg($output);
        imagedestroy($output);
    }
}
```

Bài viết được sưu tầm và lược dịch từ: https://medium.freecodecamp.org/easy-facial-detection-in-your-laravel-php-application-11664ac9c9b9