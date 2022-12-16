![](https://images.viblo.asia/72893841-7ea4-4b67-b162-719823410df2.png)

## Problem
Upload file là một công việc thường gặp khi xây dựng các ứng dụng web nói chung. Các files ở đây có thể là các file ảnh, âm thanh,... Laravel cung cấp cho chúng ta [File Storage](https://laravel.com/docs/5.6/filesystem) component với mục đích trừu tượng hóa quá trình lưu và xử lý file, trong đó có các [file được gửi lên từ phía người dùng](https://laravel.com/docs/5.6/filesystem#file-uploads). Tuy nhiên, để sử dụng component trên với từng ứng dụng cụ thể chúng ta thông thường cần phải tạo một lớp trừu tượng nữa bên trên component đó. Mục đích ở đây là giúp cho chúng ta có thể thực hiện thêm các công việc *bên lề* trước và sau quá trình upload cũng như giúp cho việc quản lý các file đó được dễ dàng hơn.

Trong bài viết này, mình sẽ trình bày cách mà mình đã thực hiện việc upload file thông qua một ví dụ đơn giản và cụ thể. Source code của ứng dụng này có thể tham khảo trong link GitHub ở cuối bài viết. Ngoài những mục đích trên, mình cũng muốn bàn luận xem chúng ta có cần *phức tạp* logic lên hay không (ở đây là logic cho việc upload file), việc đó có lợi ích và tác hại gì. Bài viết được trình bày theo suy nghĩ của mình nên nhiều lúc cũng khá mơ hồ và khó hiểu :smile: 

Let's start!

Tưởng tượng chúng ta đang xây dựng một ứng dụng để quản lý các bài học - **Lesson** (các bài học tiếng Anh chẳng hạn). Ngoài các trường cơ bản (không phải là vấn đề quá quan trong ở đây), mỗi lesson sẽ có một file âm thanh đính kèm và được lưu trong cột `audio` của database. Ngoài ra ứng dụng cũng cho phép người dùng đăng ký tài khoản và thực hiện các thao tác liên quan đến các lessons. Điều chúng ta cần chú ý là người dùng có thể thay đổi avatar của họ. Tóm lại, sẽ có hai việc liên quan đến upload file:

- Thay đổi avatar cho người dùng.
- Tạo file audio cho các bài học.

Về cấu trúc của hai bảng `lessons` và `users`, các bạn có thể tham khảo tại các migration class sau:

- [Bảng **users**](https://github.com/rnd-forests/laravel-file-uploads/blob/master/database/migrations/2014_10_12_000000_create_users_table.php) 
- [Bảng **lessons**](https://github.com/rnd-forests/laravel-file-uploads/blob/master/database/migrations/2018_03_27_072842_create_lessons_table.php)

Trên thực tế, có khá nhiều cách để lưu trữ thông tin của các file được upload. Một cách đơn giản là các cột `audio` và `avatar` sẽ chỉ lưu tên của file (thường đã được hashed hoặc mã hóa hoặc sử dụng UUID). Đường dẫn đến các file đó sẽ được cấu hình bên ngoài tạo sự mềm dẻo và dễ thay đổi về sau. Tuy nhiên, sẽ tốt hơn nếu chúng ta lưu trữ lại các chỉ số liên quan đến file được upload sử dụng một model riêng, các trường `audio` và `avatar` sẽ chỉ lưu primary key của bản ghi trong bảng `uploads` (chúng ta sẽ tạo bên dưới).  Các thông tin hoặc các biến đổi liên quan đến file sẽ được thực hiện bên trong `Upload` model.

[Laravel UploadedFile Class](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Http/UploadedFile.php) (một wrapper cho `UploadedFile` class của Symfony) cung cấp cho chúng ta khá nhiều thông tin về file được tải lên. Cụ thể  một số thông tin đó có thể là:
- name
- size
- mime
- extension
- ...

Cấu trúc của bảng `uploads` có thể tham khảo [tại đây](https://github.com/rnd-forests/laravel-file-uploads/blob/master/database/migrations/2018_04_02_160813_create_uploads_table.php). Một số trường cần chú ý trong bảng `uploads`:
- `hashed_name`: chúng ta sử dụng [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) cho tên file (không chứa extension). Trường này có thể được coi như primary key của bảng `uploads`. Các trường `audio` trong bảng `lessons` và `avatar` trong bảng `users` sẽ là foreign key với giá trị được lấy từ cột `hashed_name` trong bảng `uploads`.
- `owner_id`: thông thường một file sẽ được upload bởi một người dùng nào đó.
- `path`: lưu đường dẫn tương đối (không chứa tên file) với *root directory của Filesystem disk được sử dụng*.
- `destination_id` và `destination_type`: biểu diễn polymorphic relation, trong đó instance của một model nào đó có thể được liên kết với một hoặc nhiều instances của `Upload` model (một lesson có thể liên quan đến một hoặc nhiều file âm thanh chẳng hạn). Chú ý rằng chúng ta không sử dụng `$table->morphs('destination');` để định nghĩa hai cột trên do chúng ta cần hai trường đó là *nullable*.

OK, vậy là chúng ta đã điểm qua về cấu trúc của database cho ứng dụng. Trong phần tiếp theo của bài viết, chúng ta sẽ cùng đi qua các bước để  thực hiện chức năng upload file cho ứng dụng này. Mình sẽ chỉ đi qua các bước chính và các lưu ý cần thiết, về chi tiết các bạn có thể tham khảo thêm source code để hiểu rõ hơn, cũng như cho mình những đóng góp hữu ích.

## Solution
Phần này sẽ trình bày các bước chính để xử lý các file được tải lên từ phía người dùng. Đôi khi một bước phụ thuộc vào bước được trình bày sau nên có thể hơi khó hiểu. Tuy nhiên, mình mong nó sẽ đem lại cho các bạn một bức tranh toàn cảnh rõ ràng.

### Custom Filesystem Disks.
Laravel cung cấp cho chúng ta khá nhiều *cloud driver* để lưu trữ file như `ftp`, `sftp`, `s3` hay `rackspace`. Cấu hình cho các driver này có thể được chỉnh sửa tại `config/filesystems.php`. Tuy nhiên, trong ví dụ này chúng ta sẽ lưu file ở *local* hay trong thư mục *storage* của Laravel application. Chúng ta có thể sử dụng `local` disk cung cấp sẵn bởi framework. Nhưng để ý rằng chúng ta cần lưu cả file âm thanh và file ảnh (avatar). Do đó, cách tốt nhất là chúng ta nên tạo thêm hai *filesystem disk* mới tương ứng cho hai loại file đó:

```php
'avatars' => [
    'driver' => 'local',
    'root' => storage_path('app/avatars'),
    'visibility' => 'public',
    'url' => env('APP_URL').'/avatars',
],

'audio' => [
    'driver' => 'local',
    'root' => storage_path('app/audio'),
    'visibility' => 'public',
    'url' => env('APP_URL').'/audio',
],
```

Chú ý rằng hai disks `avatars` và `audio` đều mở rộng từ `local` disk với một số thông số cần lưu ý như sau:
- `root`: root directory của disk nơi tất cả các file sử dụng disk được lưu. Ví dụ với disk `avatars` thư mục gốc sẽ là `storage/app/avatars`. Bạn có thể thay đổi thông số này để lưu các files ở một thư mục khác thay vì *storage*. 
- `visibility`: permission của file có thể là `public` hoặc `private`.
- `url`: đây là một thông số khá quan trọng khi tạo *accessible link* đến file đã được upload. `APP_URL` environment variable cần phải chính xác nếu không file sẽ không thể truy cập được.

Các thư mục gốc của các disks trên sau này sẽ được tạo symbolic link ra thư mục `public` của application, từ đó cho phép chúng ta truy cập các file đã được upload.

OK vậy là chúng ta đã có hai *custom filesystem disk* để lưu trữ các file. Hãy cũng chuyển sang bước tiếp theo.

### Think about the "Interface".
*Brainstorming* là một bước khá quan trong trước khi xây dựng một chức năng nào đó, đặc biệt khi chúng ta chưa biết bắt đầu từ đâu.

Đối với bản thân mình, việc đầu tiên sẽ là nghĩ xem logic liên quan đến chức năng sẽ được sử dụng như thế nào (giả sử nó đã được cài đặt thành công). Mình khá thích [Fluent Interface](https://en.wikipedia.org/wiki/Fluent_interface) vì thế mình sẽ cố gắng thiết kế API theo hướng đó.

Xét trường hợp upload avatar cho người dùng. Có khá nhiều cách để cài đặt và sử dụng các logic liên quan đến việc upload. Ở đây, mình không cần quan tâm logic được cài đặt như thế nào, chỉ quan tâm đến cách sử dụng:

Trước tiên hãy bắt đầu bằng một số *interface* đơn giản :smile:

Bạn có thể bắt đầu với một service class đơn giản `Avatar` chẳng hạn.
```php
$avatar = new Avatar();
$avatar->store($user, $file);

$avatar = new Avatar($user, $file);
$avatar->store();
```

Hay thử tạo một Facade xem sao:
```php
Avatar::store($user, $file);
```

Hay sử dụng một phương thức bên trong `User` model:
```php
$user = App\User::first();
$user->storeAvatar($file);
```

Hay sử dụng một class tổng quát `Uploader` chẳng hạn:
```php
$uploader = app(Uploader::class);
$uploader->storeAvatar($user, $file);
```

Tất cả các cách trên đều không có gì sai và thường là cách cách chúng ta sẽ nghĩ đến đầu tiên. Tuy nhiên sau một thời gian suy nghĩ thì mình muốn API của mình sẽ như sau:

```php
resolve(Avatar::class)
    ->withFile($request->file('avatar')
    ->withUser($request->user())
    ->store();
```

Ở đây `withFile` và `withUser` chỉ đơn giản là các *setters*. Class `Avatar` sẽ chứa tất cả các logic liên quan đến việc upload avatar. Phương thức `store` sẽ là nơi quá trình upload bắt đầu. Tuy nhiên, đôi lúc mình không muốn sử dụng tên của class mà chỉ muốn sử dụng một string đơn giản `avatar` chẳng hạn:

```php
resolve('avatar')
    ->withFile($request->file('avatar')
    ->withUser($request->user())
    ->store();
```

Việc này có thể thực hiện dễ dàng sử dụng Laravel Service Container, chúng ta sẽ tìm hiểu trong các phần sau.

Tuy nhiên một vấn đề nữa là chúng ta không chỉ upload avatar mà còn upload các file âm thanh cho các bài học. Sẽ khá thú vị nếu chúng ta có thể chuyển các công việc upload các file riêng biệt thành các *driver* hay các *handler* riêng biệt. API có thể được viết như sau:

```php
resolve('upload')
    ->handler('avatar')
    ->withFile($request->file('avatar')
    ->withUser($request->user())
    ->store();

resolve('upload')
    ->handler('lesson-audio')
    ->withFile($request->file('audio')
    ->withUser($request->user())
    ->withLesson($lesson)
    ->store();
```

Ở đây `resolve('upload')` sẽ là nơi quản lý các *handlers* hay là một manager, ý tưởng giống như khi áp dụng [Mediator Design Pattern](https://sourcemaking.com/design_patterns/mediator). Phương thức `handler` sẽ cho ta instance của một handler tương ứng với *tên* của handler đó. Mục đích ở đây là sau này chúng ta chỉ cần thêm các handler cho một loại file khác nào đó chúng ta cần upload mà không làm ảnh hưởng đến các logic hiện tại (extensibility).

> Rất nhiều component của framework được implement dưới dạng driver-based, trong đó việc thay đổi driver chỉ thông thường đơn giản bằng cách thay đổi file environment - `.env`. Ở đây chúng ta sẽ học tập theo ý tưởng đó, tuy nhiên, sẽ có đôi chút khác biệt. Chúng ta sẽ có driver hay **handler** (từ chúng ta sẽ sử dụng sau này) cho từng loại file hay nhóm file khác nhau. Các handlers sẽ được đăng ký trong một service provider nào đó.

Khá là mơ hồ vì chúng ta chưa biết các hàm và class đó được cài đặt như thế nào :thinking: Sau khi đã có được API chuẩn chúng ta sẽ bắt đầu vào cài đặt chi tiết và cố gắng làm sao để tuân thủ đúng API đã đề ra.

Tuy nhiên còn kha khá vấn đề chúng ta cần tìm lời giải:
- Việc upload file sẽ được thực hiện như thế nào?
- Nếu chúng ta muốn thực hiện các công việc trước và sau khi file được upload, cách nào có thể giải quyết?

Trong các phần tiếp theo chúng ta sẽ làm rõ những điều mơ hồ ở trên cùng như tìm câu trả lời cho các câu hỏi trên :smile: 

Tiếp đến hãy cũng nghĩ cách để thực hiện các công việc nào đó trước và sau khi file được upload. Có lẽ cách đơn giản là sử dụng các **events**. Chúng ta sẽ *dispatch* hai events riêng biệt trước và sau quá trình upload. Điều cần chú ý ở đây là hai events này sẽ là chung cho mọi quá trình upload. Về nội dung hay dữ liệu mà các events đó *mang* theo chúng ta có thể liệt kê đơn giản như sau:

- Event trước quá trình upload sẽ gồm: user instance, `UploadedFile` instance, và các dữ liệu khác nếu cần.
- Event sau quá trình upload sẽ gồm: user instance, `Upload` model instance, và các dữ liệu khác nếu cần.

> Bạn có thể đặt câu hỏi, nếu sử dụng hai event chung như trên thì sẽ có vấn đề khi tạo các listeners tương ứng, do listener không thể chung cho mọi quá trình upload. Mình cũng đã từng vấp phải vấn đề này và cũng mất kha khá thời gian để tìm cách giải quyết. Phương pháp là chúng ta sẽ không định nghĩa listeners cho hai events đó. Hai events đó sẽ được dùng như các *hooks*, chúng ta sẽ định nghĩa listeners cho các *handlers* (không phải trong class `EventServiceProvider` class mà framework cung cấp sẵn). Nói chính xác hơn thì chúng ta sẽ không định nghĩa listeners trực tiếp cho hai events đó mà thông qua cây cầu là các handlers. Ý tưởng ở đây là mỗi listener sẽ nhận vào instance của event hiện tại và cho phép định nghĩa hai phương thức là `preprocess` và `postprocess` (tương ứng với các công việc trước và sau quá trình upload). Công việc của chúng ta là *điều hướng* các listeners đó đúng với các *handler* cụ thể.

Tiếp theo, chúng ta cần một cách nhanh gọn để đăng ký các event listeners với Laravel **event dispatcher**.

Nếu bạn đã từng tìm cách để log các database queries phục vụ cho việc debugging, một cách khá đơn giản là thêm đoạn logic sau vào phương thức `boot` của một service provider nào đó đã được đăng ký:

```php
$this->app->make('db')->listen(function ($event) {
    $this->app->make('log')->info($event->sql, $event->bindings);
});
```

Chúng ta sẽ học tập cách mà framework đã làm, và có đoạn logic tương tự như sau chẳng hạn:

```php
$this->app->make('upload')->before(function ($event) {
    //
});

$this->app->make('upload')->after(function ($event) {
    //
});
```

Ở đây `$this->app->make('upload')` sẽ cho chúng ta một instance của một manager class nào đó :) Sau khi đã có đoạn *interface* như trên, việc đăng ký các listeners sẽ đơn giản hơn một chút.

OK, vậy là chúng ta đã có những ý tưởng chung cho những gì mà chúng ta sẽ làm. Hãy cùng tìm hiểu một số điểm quang trọng khi cài đặt chức năng upload file này.

### The Abstract Upload Handler Class.
Bước đầu tiên là xây dựng các **handler classes** sử dụng cho các quá trình upload khác nhau. Tuy không bắt buộc, nhưng chúng ta sẽ bắt đầu bằng việc định nghĩa một interface (lần này là interface thực sự trong code) để liệt kê danh sách các công việc mà một handler nhất thiết cần thực hiên. Nội dung của interface này - `App\Components\Upload\UploadHandler` có thể tham khảo [tại đây](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/UploadHandler.php). Bạn có thể đọc phần comment của các *method signatures* để hiểu thêm, tuy nhiên, mình sẽ liệt kê chúng ra đây:

- `public function store();`: kích hoạt quá trình upload.
- `public function delete($file);`: xóa một file đã được upload trước đó.
- `public function url($file);`: lấy ra *accessible link* đến một file đã được upload.
- `public function withFile($file);`: tất nhiên chúng ta sẽ cần thông tin của file mà người dùng cung cấp.
- `public function withUser($user);`: thông tin về người dùng thực hiện việc upload file.
- `public function getFilePath();` trả về thông số khá quan trong là đường dẫn tương đối với thực mục gốc của disk (không bao gồm tên file). Kết quả của phương thức này sẽ xác định nơi mà file sẽ được lưu.

Hầu hết các phương thức trên là chung cho mọi handlers (ngoại trừ phương thức cuối cùng). Do đó, cách tốt nhất là tạo một abstract class - `App\Components\Upload\Uploader`. Nội dung của [class](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php) sẽ được dần làm rõ trong những phần sau. Tuy nhiên, chúng ta sẽ cùng đi qua một số bước chính. Chú ý class này triển khai interface nói trên.

Phương thức `getDiskInstance` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L150-L153) sẽ trả về thông tin của file system disk mà một handler nào đó đang sử dụng (ở đây chúng ta có `avatars` và `audio`). Instance của một disk sẽ được xác định qua tên của nó, và việc xác định tên sẽ thông qua phương thức `getDiskName` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L160-L163). Nếu chúng ta cung cấp tên cho disk trong các *handler child class* thì tên đó sẽ được sử dụng. Ngược lại thì disk mặc định (định nghĩa trong file configuration) sẽ được dùng.

Phương thức `getFilePath` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L86-L91) trả về một Exception với một message khá chi tiết. Mục đích là các child class sẽ bắt buộc phải override phương thức này. Tuy nhiên, thay vì trả về một lỗi chung chung nếu chúng ta đặt phương thức đó là *abstract* và các child class không override nó; một lỗi đầy đủ hơn sẽ được trả về.

Các phương thức `withFile` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L66-L71) và `withUser` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L76-L81) chỉ đơn giản là các setters.

Các phương thức `delete` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L48-L52) và `url` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L57-L61) sẽ sử dụng các phương thức mà framework đã cung cấp sẵn. Tuy nhiên, việc xác định đường dẫn đến một file đã được upload sẽ cần một chút phức tạp. Chúng ta có phương thức `getStoredFilePath` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L132-L143) để làm việc đó. Nếu file là một instance của `Upload` model, ta sẽ gọi đến một [custom attribute](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Upload.php#L54) - `filePath` của model. Tiếp theo nếu file là một string ta sẽ trả về giá trị đó.

Phương thức `store` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L38-L43) sẽ là nơi quá trình upload bắt đầu. Nội dung khá đơn giản, chúng ta sẽ kiểm tra xem các thông tin về file hay user có chuẩn xác không sử dụng phương thức `ensureValidFields` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L99-L108). Sau đó chúng ta sẽ *dispatch* một upload job thông qua phương thức `dispatchUploadJob` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L115-L124). Nội dung của job sẽ được bàn đến trong phần sau.

> Thông thường một handler class (mở rộng từ `Uploader` class) sẽ phải override hoặc implement hai phương thức là:
> - `getCustomDiskName`: tên của disk tương ứng với quá trình upload. Ví dụ trong trường hợp upload avatar thì tên của disk sẽ là *avatars* (định nghĩa trong file configuration).
> - `getFilePath`: trả về đường dẫn tương đối của file.

### Extract Upload Process to a Job.
`ProcessUpload` job [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/ProcessUpload.php) là nơi quá trình upload thực sự diễn ra. Các dữ liệu cần thiết cho quá trình upload gồm các thông tin cơ bản như:

- `$file`: một instance của `UploadedFile` class.
- `$path`: đường dẫn trả về bởi phương thức `getFilePath` nói trên.
- `$user`: người dùng thực hiện việc upload.
- `$disk`: disk instance đang sử dụng.

Tuy nhiên chúng ta có thêm một property nữa - `$context`. Property này (một associative array) sẽ chứa các thông tin bổ sung mà các events sẽ sử dụng. Giá trị của property này sẽ được xác định qua phương thức `eventContext` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L182-L187) trong `Uploader` class ở trên. Mặc định context ở đây sẽ chứa một key là *handler* - instance của handler class hiện tại [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L182-L187). Nếu bạn muốn truyền thêm các dữ liệu khác, công việc là override phương thức `extraEventContext` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Uploader.php#L194-L197) bên trong handler class. Trong ví dụ của chúng ta khi tạo handler cho việc upload audio cho một lesson, chúng ta cần thông tin của lesson đó cho các xử lý sau này. Dó đó việc [override phương thức trên](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Handlers/LessonAudio.php#L48-L51) là cần thiết.

> Ngoài hai phương thức là `getCustomDiskName` và `getFilePath`, một handler cũng có thể override phương thức `extraEventContext` để cung cấp thêm các thông tin cho hai events mà chúng ta sẽ bàn luận trong phần sau.

Logic cho việc upload file cũng khá đơn giản như sau:

```php
DB::transaction(function () {
    UploadProcessing::dispatch($this->user, $this->file, $this->context);
    
    $upload = $this->storeUploadedFile();
    
    UploadProcessed::dispatch($this->user, $upload, $this->context);
    
    return $upload;
});
```

Khá dễ hiểu phải không, trước và sau khi lưu trữ file cung cấp từ người dùng chúng ta sẽ fire hai events tương ứng là `UploadProcessing` và `UploadProcessed`. Qua tên của hai event bạn cũng có thể đoán chúng có ý nghĩa gì. Việc upload file cũng khá là đơn giản:

```php
/**
 * Store the file from client.
 *
 * @return \App\Upload
 */
protected function storeUploadedFile()
{
    $upload = Upload::create(
        array_merge(
            ['owner_id' => $this->user->id, 'path' => $this->path],
            (new ClientFile($this->file))->toAttributes()
        )
    );
    
    $this->disk->putFileAs($upload->path, $this->file, $upload->basename);
    
    return $upload;
}
```

Bước đầu tiên là tạo mới một instance của `Upload` model với các thông tin cần thiết. `ClientFile` là một [helper class](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/ClientFile.php) với nhiệm vụ thu thập các thông tin đến file được upload. Phương thức `toAttributes` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/ClientFile.php#L83-L94) đơn giản là tạo một mapping các thông tin đó với các attribute của `Upload` model. File sẽ được lưu trữ sử dụng phương thức `putFileAs` [{code}](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Filesystem/FilesystemAdapter.php#L205). Chúng ta sử dụng phương thức này do nó cho phép định nghĩa *custom name* cho file mà chúng ta sẽ lưu trữ. Tên của file sẽ được xác định qua một [custom attribute](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Upload.php#L46-L49) trong `Upload` model - `basename` (nó đơn giản là một concatenation string của UUID và extension của file).

### Fire Custom Events and Define Manager Class.
Như đã đề cập khi lên kế hoạch để xây dựng chức năng upload. Chúng ta sẽ sử dụng event để tạo các *hooks* trước và sau quá trình upload. Cụ thể hai events đó là:

- `UploadProcessing` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/UploadProcessing.php) tạo hook trước khi quá trình upload diễn ra.
- `UploadProcessed` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/UploadProcessed.php) tạo hook sau khi quá trình upload thành công.

Dữ liệu đi kèm các events đã được đề cập trong các phần trước của bài viết.

Trong Laravel **Manager Pattern** được sử dụng khá nhiều đặc biết với các component ở dạng *driver-based* như Queue, Authentication, Database,... Mục đích chính của các manager class là chúng cho phép chúng ta khởi tạo các drivers liên quan đến một components nào đó (thường thì quá trình này sẽ nắm trong một service provider). Nếu bạn đọc documentation của Laravel thì đôi khi chúng ta thấy framework cho chúng ta mở rộng các component có sẵn của nó sử dụng các phương thức như `extend` chẳng hạn, việc này thực chất là tạo *custom driver* trong manager class.

Do pattern này là khá phổ biến nên framework cũng cung cấp cho chúng ta *boilerplate* để tự tạo các manager class nếu muốn. Cụ thể là chúng ta có thể extend class `Illuminate\Support\Manager` [{code}](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Support/Manager.php). Việc tạo một manager class cũng khá đơn giản, chúng ta chỉ cần chú ý một số phương thức sau:

- `getDefaultDriver` [{code}](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Support/Manager.php#L47): driver mặc định mà manager sẽ sử dụng. Trong ví dụ của chúng ta driver mặc định sẽ là `avatar` (chú ý ở đây không phải tên của disk, nó đơn giản chỉ là một string).
- `extend` [{code}](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Support/Manager.php#L118): tạo custom driver sử dụng closure.
- `driver` [{code}](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Support/Manager.php#L55): trả về instance của một driver nào đó (được xác định qua tên của driver)

Việc tạo instance của một driver nào đó sẽ được thực hiện thông qua việc gọi một phương thức (nếu có) được suy đoán từ tên của driver. Giả sử driver của chúng ta có tên là `graph` thì framework sẽ kiểm tra xem trong manager class có phương thức với tên `createGraphDriver` không. Nếu phương thức đó tồn tại và driver chưa tồn tại, nội dung của phương thức đó sẽ được thực thi để trả về instance của driver. Pattern ở đây là `create<DriverName>Driver`.

Chúng ta có thể sử dụng cách trên để tạo mới một driver. Tuy nhiên, việc đăng ký các driver có thể được thực hiện hoàn toàn trong service provider. Nó phụ thuộc vào cách mà bạn *đăng ký things* với service container của framework. Trong ví dụ của chúng ta, các upload drivers hay upload handlers sẽ được khởi tạo bên trong service provider.

Sử dụng manager pattern cũng là cách mà chúng ta tạo upload manager class - `UploadManager` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/UploadManager.php) của riêng mình.

Việc sử dụng manager cũng giải thích cho chúng ta tại sao có thể sử dụng `resolve('upload')->handler('avatars')`. Ở đây phương thức `handler` chỉ là một [wrapper](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/UploadManager.php#L48-L51) cho phương thức `driver` mà class `Illuminate\Support\Manager` đã cung cấp.

Trong `UploadManager` class của chúng ta, bạn có thể thấy có ba phương thức nữa:

- `public function before($callback)`
- `public function after($callback)`
- `public function cycle($callback)`

Khi *brainstorming* về chức năng upload, chúng ta đã để cập đến việc đăng ký các listeners cho một event nào đó, tuy nhiên chúng ta chưa đề cập đến cách thực hiện như thế nào. Bạn có thể sử dụng event component của framework khá nhiều, nhưng *có thể* một số API đằng sau sẽ ít được sử dụng. **Laravel Event Dispatcher** cung cấp cho chúng ta [phương thức](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Contracts/Events/Dispatcher.php#L14) `listen` cho phép chúng ta đăng ký các listeners mới một hoặc một nhóm các events.

Ở đây ba phương thức `before` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/UploadManager.php#L15-L18), `after` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/UploadManager.php#L26-L29) và `cycle` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/UploadManager.php#L37-L40) tương ứng với việc đăng ký listeners cho `UploadProcessing` event, `UploadProcessed` event, và nhóm của hai event đó. Các phương thức này sẽ được sử dụng trong service provider của chúng ta để gọi các listeners cho một handler tương ứng nào đó.

### Define Listeners.
Tất cả các listener sẽ extend từ `App\Components\Upload\Listeners\Listener` class [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Listeners/Listener.php). Listener thông thường sẽ nhận vào instance của event được *fire* trong quá trình upload. Ở đây là `UploadProcessing` hoặc `UploadProcessed` event. Các listener class có thể định nghĩa hai phương thức là:

- `preprocess`: các công việc cần thực hiện trước quá trình upload file.
- `postprocess`: các công việc cần thực hiên sau khi quá trình upload file thành công.

Để dễ hiểu, trong ví dụ của chúng ta một listener sẽ được tạo cho quá trình upload avatar của người dùng `StoreAvatarForUser` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Components/Upload/Listeners/StoreAvatarForUser.php). Nếu đọc logic của class đó chúng ta có thể thấy:

- `preprocess`: kiểm tra xem avatar của user đã tồn tại hay chưa, nếu đã tồn tại chúng ta sẽ xóa avatar cũ của người dùng đi.
- `postprocess`: đặt giá trị cho trường `avatar` của `User` model, giá trị này sẽ là tên hay UUID của avatar mà người dùng vừa upload.


### Custom Service Provider.
Như các bạn có thể thấy, trong các phần trước chúng ta đã định nghĩa khá nhiều thứ như: upload handlers, upload listeners, upload manager, upload events. Tuy nhiên, chúng ta chưa thấy chúng liên quan gì đến nhau cả. Chúng ta cần một thứ để gắn kết các thành phần đó lại một cách *đẹp đẽ* nhất. Đối với Laravel thì service provider là ứng cử viên hàng đầu. Trước khi bắt đầu xây dựng service provider, mình cũng đã có một số bài viết khá chi tiết liên quan đến service container, service provider,... Nếu có thời gian, bạn có thể đọc chúng tại đây:

- [Các Request được xử lý như thế nào trong Laravel Framework?](https://viblo.asia/p/4dbZN0NQ5YM)
- [Laravel Service Container in Depth & Tips to Customize Your Application](https://viblo.asia/p/RQqKLnqNl7z)

Các kiến thức cơ bản này sẽ giúp chúng ta xây dựng service provider nói riêng và các components khác nói chung dễ dàng và hiệu quả hơn.

Nội dung của `UploadServiceProvider` mà chúng ta sẽ tạo có thể tham khảo [tại đây](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Providers/UploadServiceProvider.php). Service provider này có hai nhiệm vụ chính:
- Đăng ký manager và các handlers
- Gọi các listeners tương ứng với các handlers.

#### Register Manager and Handler Classes.
Việc đăng ký manager class sẽ được thực hiện bên trong phương thức `register` của service provider. Cụ thể như sau:

```php
/**
 * Register the upload manager.
 *
 * @return void
 */
protected function registerManager()
{
    $this->app->singleton('upload', function ($app) {
        return tap(new UploadManager($app), function ($manager) {
            $this->registerHandlers($manager);
        });
    });
}
```

Ở đây chúng ta tạo một *singleton binding* với key là `upload`, giá trị trả về khi *resolving* key đó từ service container sẽ là một instance của `UploadManager` class. Điều này giải thích tại sao chúng ta có thể sử dụng `app('upload')` hay `resolve('upload')` khi muốn truy cập đến upload manager class.

Tuy nhiên, giá trị trả về bên trong closure có phải là một instance của `UploadManager` class hay không? Câu trả lời là có, nhưng có một chút khác biệt. Thay vì trả về instance đó trực tiếp chúng ta sẽ thực hiện việc đăng ký các upload handlers với instance mới của manager class.

> Phương thức `tap` [{code}](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Support/helpers.php#L1035) là một helper function cung cấp bởi framework. Nhiệm vụ của nó là thực hiện một closure trên một giá trị và đồng thời cũng trả về chính giá trị đó. Function này khá hữu dụng nhưng đôi khi cũng khá khó hiểu cho người mới làm quen.

Service provider của chúng ta chứa một property với tên `$handlers` với nội dung như sau:

```php
/**
 * Map between upload handlers and their associated listeners.
 *
 * @var array
 */
protected $handlers = [
    Handlers\Avatar::class => Listeners\StoreAvatarForUser::class,
    Handlers\LessonAudio::class => Listeners\StoreLessonAudio::class,
];
```

Property này là một mapping giữa các handlers và các listeners tương ứng của chúng. Nó giống như property `$listen` bên trong `EventServiceProvider` được cung cấp sẵn bởi framework. Trong ví dụ này, mỗi handler chỉ có một listener duy nhất. Nếu có nhiều listeners cho một handler chúng ta truyền vào một mảng thay vì một string (classname) như ở trên.

Trong phần trước mình cũng đã nói đến việc đăng ký các handlers (drivers) bên trong service provider thay vì bên trong `UploadManager` class. Để đăng ký chúng ta sẽ làm như sau:

```php
/**
 * Register the upload handlers.
 *
 * @param  \App\Components\Upload\UploadManager $manager
 * @return void
 */
protected function registerHandlers($manager)
{
    foreach (array_keys($this->handlers) as $handler) {
        $this->app->singleton($handler, function ($app) use ($handler) {
            return new $handler($app);
        });
    }

    foreach ([
        'avatar',
        'lesson-audio',
    ] as $key) {
        $this->{'add'.Str::studly($key).'Handler'}($manager, $key);
    }
}
```

Đầu tiên chúng ta sẽ tạo *singleton bindings* cho các handlers được định nghĩa bên trong `$handlers` property. Tiếp đến chúng ta sẽ đăng ký các *custom drivers* cho manager class của chúng ta. Tương tự như trong phần trước, chúng ta sẽ sử dụng pattern là `add<HandlerName>Handler`. Tức là chúng ta sẽ dựa vào tên của handler để tìm và gọi một phương thức tương ứng bên trong service provider class.

Ở đây chúng ta có hai handlers với tên là `avatar` và `lesson-audio` nên chúng ta phải định nghĩa hai phương thức tương ứng là `addAvatarHandler` và `addLessonAudioHandler`. Việc đăng ký driver đơn giản là việc mở rộng manager class sử dụng phương thức `extend`. Ví dụ đối với trường hợp của `avatar` driver:

```php
/**
 * @param \App\Components\Upload\UploadManager $manager
 * @param string $key
 */
protected function addAvatarHandler($manager, $key)
{
    $manager->extend($key, function () {
        return $this->app->make(Handlers\Avatar::class);
    });
}
```

Để ý rằng chúng ta sẽ *resolving* instance của handler từ service container thay vì sử dụng từ khóa `new` do chúng ta đã có sẵn các bindings cho các handlers trong bước trước.

Sau khi đã đăng ký xong manager cũng như các handlers, chúng ta có thể sử dụng chúng như sau:

```php
// Get an instance of App\Components\Upload\UploadManager class
$manager = resolve('upload');
```

```
// Get an instance of App\Components\Upload\Handlers\Avatar class
$avatarHandler = resolve('upload')->handler('avatar');
$avatarHandler = resolve('upload')->driver('avatar');
```

Đến bước này chúng ta đã có thể sử dụng được *interface* mà chúng ta muốn khi *brainstorming* :smile:

#### Call Listeners.
Vẫn còn một việc nữa chúng ta cần phải làm đó là thực thi các listeners tương ứng với các handlers khi quá trình upload được thực hiện. Trong phương thức `boot` của service provider, chúng ta sẽ làm như sau:

```php
/**
 * Bootstrap services.
 *
 * @return void
 */
public function boot()
{
    $this->app->make('upload')->cycle(function ($event) {
        $this->callListeners($event);
    });
}
```

Ở đây chúng ta đã sử dụng phương thức `cycle` trong manager class mà chúng ta đã đề cập ở trên để đăng ký các listeners cần thiết thông qua phương thức `callListeners`. Chúng ta có thể sử dụng các phương thức `before` và `after` nếu muốn, tuy nhiên sẽ dài dòng hơn.

Phương thức `callListeners` có lẽ là phương thức *phức tạp* nhất trong service provider class của chúng ta.

```php
/**
 * Call custom event listeners for uploading events.
 *
 * @param  mixed $event
 * @return void
 */
protected function callListeners($event)
{
    $listeners = Arr::get($this->handlers, $this->getHandlerClass($event));

    if (is_null($listeners)) {
        return;
    }

    if (is_string($listeners)) {
        $listeners = (array) $listeners;
    }

    foreach ($listeners as $listener) {
        if (!class_exists($listener)) {
            continue;
        }

        $listener = $this->makeListener($listener, $event);
        if (!$listener instanceof Listeners\Listener) {
            continue;
        }

        $this->callListener($listener, $event);
    }
}
```
Các bước có thể trình bày ngắn gọn như sau:

- Đầu tiên chúng ta sẽ lấy ra danh sách các listeners tương ứng với một handler nào đó. Thông tin về handler có thể được truy cập qua context của event.
- Nếu không có listeners nào tồn tại, dừng lại.
- Nếu listeners là một string, chuyển nó thành mảng.
- Với mỗi listener chúng ta sẽ kiểm tra xem nó có tồn tại hay không, nếu có chúng ta sẽ tạo mới instance của listener và gọi các phương thức bên trong nó.

Nhớ rằng các listener sẽ nhận vào một instance của event thông qua constructor. Do đó việc tạo mới listener là khá đơn giản:

```php
/**
 * Create new listener instance.
 *
 * @param  string $listener
 * @param  mixed $event
 * @return \App\Components\Upload\Listeners\Listener
 */
protected function makeListener($listener, $event)
{
    return $this->app->makeWith($listener, ['event' => $event]);
}
```

> Phương thức `makeWith` chỉ là một alias cho phương thức `make` của service container. Sử dụng phương thức này cho chúng ta biết rõ hơn là chúng ta cần chỉ định các parameters khi resolving instance của một class nào đó.

Việc gọi các listeners cũng khá đơn giản. Trong phần trước chúng ta cũng đề cập đến việc sử dụng các events `UploadProcessing` và `UploadProcessed` như những cầu nối. Cụ thể như sau:

```php
/**
 * Call appropriate methods on listener.
 *
 * @param  \App\Components\Upload\Listeners\Listener $listener
 * @param  mixed $event
 * @return void
 */
protected function callListener($listener, $event)
{
    foreach ([
        UploadProcessing::class => 'preprocess',
        UploadProcessed::class => 'postprocess',
    ] as $class => $method) {
        if ($event instanceof $class && method_exists($listener, $method)) {
            $listener->$method();
        }
    }
}
```

Chúng ta sẽ kiểm tra xem `$event` hiện tại là instance của `UploadProcessing` hay `UploadProcessed` event. Nếu là event đầu tiên chúng ta sẽ gọi đến hàm `preprocess` bên trong listener. Nếu là event sau, chúng ta sẽ gọi đến hàm `postprocess` bên trong listener. Tất nhiên các hàm đó phải tồn tại bên trong listener class.

Công việc cuối cùng là thêm `App\Providers\UploadServiceProvider::class` vào danh sách các providers bên trong file `config/app.php`. 

### Directory Links Command.
Sau khi các file đã được upload thành công, nếu bạn muốn truy cập các file đó trên trình duyệt, hay trả về các đường dẫn đến các file đó trong response của một API nào đó. Do chúng ta đang lưu file sử dụng *local disk*, cách đơn giản nhất là tạo các *symbolic links* từ các thư mục gốc của `avatars` và `audio` disks ra thư mục `public` của framework.

Chúng ta sẽ xây dựng một Artisan command đơn giản để thực hiện việc đó - `php artisan uploader:create-links`. Nội dung của command có thể tham khảo [tại đây](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Console/Commands/UploadLink.php).

Việc tạo các *symbolic links* là khá đơn giản khi sử dụng [Filesystem component](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Filesystem/Filesystem.php) mà framework đã cung cấp sẵn. 

```php
foreach ($dirs as $origin => $destination) {
    if (file_exists(public_path($destination))) {
        $this->error("The [{$destination}] directory already exists.");
        continue;
    }
    
    $filesystem->link(storage_path($origin), public_path($destination));
    $this->info("The [${origin}] directory has been linked.");
}
```

Nội dung của command cũng khá dễ hiểu. Nếu symbolic link cho một thư mục nào đó đã tồn tại trong thư mục `public` chúng ta sẽ trả về thông báo lỗi. Ngược lại thì một symbolic link mới sẽ được tạo.

Bạn có thể chạy Artisan command này thủ công, tuy nhiên ở trong ví dụ này chúng ta có một Artisan command khác dùng để tiến hành các bước cài đặt cơ bản cho ứng dụng - `php artisan app:install`. Trong command đó có một bước để [khởi tạo các symbolic links cho việc upload](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Console/Commands/Installation.php#L94-L100).

### Notes
- Khi nói đến user trong các phần trước, instance của user không nhất thiết phải là của `User` model, nó chỉ cần là một model mà triển khai `Illuminate\Contracts\Auth\Authenticatable` interface. Tất nhiên mục đích là làm cho logic mềm dẻo hơn.
- Trong ví dụ của chúng ta mỗi handler chỉ có một listener tương ứng, tuy nhiên bạn có thể sử dụng một mảng các listeners cho một handler nếu muốn.
- Việc validate file được upload có thể thực hiện bên trong controller, tuy nhiên nếu muốn bạn có thể mở rộng và validate nó trực tiếp trong các handler.
- Nếu handler của bạn có thêm các dữ liệu khác ngoài người dùng và file được upload. Tạo mới một property và setter cho property đó bên trong listener class. Nếu bạn muốn validate property mới đó, override phương thức `ensureValidFields` của `Uploader` class và nhớ gọi `parent::ensureValidFields()` ở cuối của phương thức đã override. Một ví dụ là `LessonAudio` handler trong ứng dụng nho nhỏ của chúng ta khi nó cần thêm thông tin về một lesson nào đó.
- Hiện tại thì các handlers và listeners được lưu ở các thư mục tương ứng là `app/Components/Upload/Handlers` và `app/Components/Upload/Listeners`. Tuy nhiên, bạn có thể lưu chúng ở bất kì đâu bạn thích.
- Một model có thể tương ứng một một hoặc nhiều instances của `Upload` model. Ví dụ đối với `Lesson` model, chúng ta có thể lấy ra file audio hiện tại thông qua trường `audio` - `currentAudio` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Lesson.php#L21-L24). Hoặc lấy ra danh sách tất cả các audio đã được upload cho một lesson nào đó thông qua polymorphic relations - `audioFiles` [{code}](https://github.com/rnd-forests/laravel-file-uploads/blob/master/app/Lesson.php#L31-L34).
- Các logic đã trình bày ở trên đều có thể được cải thiện và thay đổi thêm nếu bạn muốn.

## A Recap
Trong bài viết này, mình đã trình bày cách mà mình xử lý việc upload files trong Laravel, mình đã từng làm chức năng này trong một dự án mà mình *đã* từng tham gia. Sau khi cài đặt xong chức năng này mình thấy có một số điểm cần lưu ý như sau:

### Pros
- Việc mở rộng chức năng là khá đơn giản, chúng ta chỉ cần tạo mới một disk (nếu cần), handler cũng như các listeners tương ứng và đăng ký chúng trong `UploadServiceProvider`.
- Các logic phức tạp chỉ cần thực hiện một lần, công việc sau đó chỉ là định nghĩa các class theo một template định sẵn.
- Dễ dàng hơn trong việc quản lý các loại file khác nhau do mỗi loại đều có một disk, một handler và các listeners riêng biệt.
- Dễ dàng mở rộng và thay đổi về sau do các component không *tight coupling* với nhau.
- Dễ dàng cho việc viết test.

### Cons
- Đòi hỏi bạn phải có những kiến thức cơ bản về service container, service provider cũng như manager pattern của framework.
- Logic đôi khi khó nắm bắt cho người mới tiếp xúc lần đầu, do có quá nhiều lớp trừu tượng.

Để hiểu rõ hơn những gì mình nói, các bạn có thể tham khảo source code của project trên GitHub repository. Tất nhiên, mục đích chính là đưa ra ý tưởng, các bạn có thể tùy biến hoặc thay đổi các logic nếu cần thiết. Cuối cùng mình cũng mong nhận được những phản hồi từ các bạn do mình mất khoảng 1 ngày để làm chức năng này nên cũng có thể còn nhiều sai sót.

:pear: :peach: :peanuts: :orange: :apple: :avocado: :banana: :grapes: :pineapple: :mandarin: :kiwi_fruit: :jack_o_lantern: :lemon: :cherries: :melon: :watermelon: :strawberry: :tangerine: :cucumber: :chestnut: :rofl: 

Source code: https://github.com/rnd-forests/laravel-file-uploads