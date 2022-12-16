## 1. Mở đầu
* Đây là một mẫu thiết kế nâng cao mà các bạn mới tiếp xúc lập trình có lẽ cũng không để ý về nó lắm. Đối với các bạn đã có kinh nghiệm thực tập hay làm việc ở các công ty – chắc hẳn cũng đã được nghe các người hướng dẫn của mình nói về nó.

* Repository Design Pattern là một trong những mẫu thiết kế được sử dụng nhiều nhất trong hầu hết các ngôn ngữ lập trình, các framework… như: .NET, Java, PHP…, trải dài từ websites, services, applications,… hay kể cả mobile apps.
![](https://images.viblo.asia/46359c10-3782-405e-abb1-541bff1cde26.png)
* Repository Design Pattern là một lớp trung gian giữa Business Logic và Data Source, các đối tượng trong lớp trung gian này được gọi là Repository. Giao tiếp giữa Business Logic và Data Source sẽ được thực hiện thông qua các Interface.
* Chúng đem lại sự chuẩn hóa cho dữ liệu ra và tách biệt hoàn toàn việc xử lí business logic và data access logic, giúp cho Business Logic hoàn toàn không cần quan tâm tới công việc của Data Source (và ngược lại). Việc chia để trị này hướng tới mục tiêu: ai làm việc nấy, điều đó cũng khiến code của bạn sáng sủa hơn, rõ ràng hơn, và dễ bảo trì hơn.
## 2. Lợi ích của Reposiory Design Pattern
* Code dễ phát triển và bảo trì khi làm việc theo nhóm.
* Giảm thiểu thay đổi code khi có thay đổi về cấu trúc dữ liệu, Data Source hoặc Business Logic.
* Business Logic và Data Source có thể test độc lập.
* Chuẩn hóa đầu ra dữ liệu.
* Giảm thiểu trùng lặp code (DRY – Don’t Repeat Yourself).
## 2. Repository Design Pattern và Laravel
Trong Laravel, Repository là “cây cầu” nối giữa Model và Controller, đây cũng là nơi tập trung xử lí các logic truy vấn dữ liệu.

Các truy vấn này trước đây được thực hiện trực tiếp ở Controller bây giờ sẽ được đưa vào Repository, lúc này Controller sẽ tương tác với Data Source thông qua Repository thay vì gọi trực tiếp Model. Việc thực hiện truy vấn như thế nào sẽ được Repository giấu kín bên trong (và Controller bản thân nó cũng chẳng cần quan tâm, cứ trả đúng – đủ dữ liệu về cho nó là được).

Thế còn phần xử lí Business Logic đâu rồi?

Trên thực tế, một số thao tác get dữ liệu đơn giản sẽ được gọi trực tiếp ở Controller thông qua Repository.

Đối với các business phức tạp sẽ có thêm một tầng Service ở giữa nữa. Có nghĩa là lúc này, Controller chỉ có trách nhiệm điều hướng xử lí logic xuống Service, và Service mới là nơi thực hiện các Business Logic và cập nhật xuống Data Source.
## 2. Triển khai Repository Design Pattern đơn giản cho Laravel
Khách hàng của chúng ta cần xây dựng một mạng xã hội cho phép các publishers chia sẻ các albums ảnh và kiếm tiền donate cũng như sự nổi tiếng.
Trước tiên chúng ta sẽ xây dựng một Model.

```
// app/Album.php namespace App;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];
}
```
Kế tiếp là Controller

```
// app/Http/Controllers/AlbumController.php

namespace App\Http\Controllers;

use App\Album;

class AlbumController extends Controller
{
    /**
     * Nội dung trang Albums List
     */
    public function index()
    {
        $albums = Album::all();

        return $albums;
    }

    /**
     * Nội dung trang Albums Details
     */
    public function show($id)
    {
        $album = Album::findOrFail($id);

        return $album;
    }
}
```
Trong Controller, Album được gọi trực tiếp để truy vấn dữ liệu. Mọi chuyện đều êm đẹp cho tới khi khách hàng muốn thay đổi cách truy vấn dữ liệu: các Album sẽ được sắp xếp theo độ tương tác, số lượng views, hoặc trang Album Details được truy vấn bằng hash_id thay vì id... Chắc chắn chúng ta sẽ cần phải cập nhật lại Controller để truy vấn dữ liệu cho phù hợp với requirements của khách hàng.

Điều này hết sức nguy hiểm và củ chuối. Bạn thử tưởng tượng không chỉ có mỗi AlbumController thực hiện các thao tác như thế này, mà rất nhiều Controller khác cũng thực hiện điều tương tự. Việc update code nhiều chỗ như vậy sẽ làm tăng khả năng bỏ sót hoặc thao tác sai lầm.

Và đây là lúc Repository lên sàn =))

Chúng ta sẽ tạo một Repository như sau
```
// app/Repositories/Eloquent/AlbumRepository.php

namespace App\Repositories\Eloquent;

use App\Album;

class AlbumRepository
{
    public function all()
    {
        return Album::orderBy('views_count', 'desc')->all();
    }

    public function find($id)
    {
        return Album::firstOrFail(['hash_id' => $id]);
    }
}
```
Cập nhật lại nội dung Controller
```
// app/Http/AlbumController.php

namespace App\Http\Controllers;

use App\Album;
use App\Repositories\Eloquent\AlbumRepository;

class AlbumController extends Controller
{
    protected $albumRepository;

    public function __construct(AlbumRepository $albumRepository)
    {
        $this->albumRepository = $albumRepository;
    }

    public function index()
    {
        $albums = $this->albumRepository->all();

        return $albums;
    }

    public function show($id)
    {
        $album = $this->albumRepository->find($id);

        return $album;
    }
}
```
Vậy là từ giờ trở đi, bạn cần thêm logic gì cứ vào Repository mà sửa, rõ ràng – sạch sẽ – khô thoáng – dễ hiểu!

Bài viết xin phép được kết thúc tại đây, có nội dung nào chưa chính xác xin mọi người góp ý vào comment bên dưới!

Cám ơn các bạn đã theo dõi.

Bài viết có tham khảo trên google search và facebook search.