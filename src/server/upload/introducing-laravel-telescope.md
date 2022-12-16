Bài viết này được dịch từ nguồn [Introducing Laravel Telescope](https://mattstauffer.com/blog/introducing-laravel-telescope/) nên các ví dụ, hình ảnh minh hoạ mình xin phép được giữ nguyên từ tác giả.

# Khái quát
Laravel Telescope là một package hỗ trợ debug trong quá trình phát triển ứng dụng Laravel, được viết bởi Mohamed Said và Taylor Otwell. Laravel Telescope là mã nguồn mở, miễn phí trên GitHub và đã được release vào ngày 19-10-2018.

![](https://images.viblo.asia/07fcca7b-9b90-4256-80fb-ba6129ed9d07.png)

Nó giống như là một depedency của bên thứ ba và cài đặt thông qua Composer. Sau khi cài đặt thành công, bạn sẽ truy cập nó qua route `/telescope` trong dự án của bạn.

# Laravel Telescope là gì?
Nếu bạn đã từng sử dụng Clockwork hoặc Laravel Debugbar, thì sẽ cảm thấy rất thú vị khi biết Laravel Telescope có UI riêng biệt và siêu năng lực đặc biệt.

Telescope giống như vệ sĩ bảo vệ một cô tiểu thư nhà giàu vậy. Telescope sẽ "để ý" mọi request đi vào hệ thống của bạn, cho dù từ HTTP requests, từ command line, từ scheduler hoặc từ queue.

Những "vệ sĩ" này sẽ nắm bắt tất cả các loại thông tin về requests hay dữ liệu liên quan - những thứ như truy vấn cơ sở dữ liệu (database queries) và thời gian thực hiện (execution time), lần truy cập bộ nhớ cache (cache hits) và số lần bỏ lỡ (misses), events fired, mail và nhiều thứ khác nữa.

Dưới đây là "Black list" mà Telescope luôn theo dõi:
* Requests
* Commands
* Schedule
* Jobs
* Exceptions
* Logs
* Dumps
* Queries
* Models
* Events
* Mail
* Notifications
* Cache
* Redis

# Tabs / watchers
Mỗi tab này sẽ hiển thị những cái nó "theo dõi" tương ứng với mỗi tab. Chúng ta hãy đi qua từng tab xem nó có những gì nhé.

### 1. (HTTP) Requests
![](https://images.viblo.asia/049459e6-d349-4989-a7a1-8996cb16a36a.png)

Tab này cho phép bạn xem tất cả các HTTP requests đi vào hệ thống của bạn. Bạn sẽ có thể xem xét tất cả các HTTP requests và thông tin liên quan với mỗi request.

![](https://images.viblo.asia/ffdc26f2-1455-4f58-9cb6-82b610d89736.png)

![](https://images.viblo.asia/a2287e64-de8d-4893-b612-80b8f7ba2241.png)

![](https://images.viblo.asia/54ab9337-6a5c-4792-9593-d71b21c39e8a.png)

Mỗi request của trang cũng hiển thị bất kỳ dữ liệu nào mà nó có từ những người dùng khác có liên quan đến request này. Ví dụ, tất cả các truy vấn cơ sở dữ liệu và thời gian truy vấn; người dùng nào được xác thực cho request này; và nhiều hơn thế nữa.

![](https://images.viblo.asia/b79facdd-08b7-4cdc-aeba-daaefe1aaec2.png)

### 2. Commands
![](https://images.viblo.asia/f23c8e87-9fdd-4021-a926-578166a36d89.png)

Tab commands cho phép bạn xem danh sách tất cả các lệnh đã chạy và exit code của chúng. Khi bạn đi sâu vào, bạn cũng có thể thấy tất cả các arguments, options và các mục liên quan của chúng.

![](https://images.viblo.asia/72a0418d-ae5a-4810-b753-619006857c2a.png)

### 3. Schedule
Liệt kê các tác vụ theo lịch trình đã được chạy. Trên trang chi tiết của mỗi task, xem tất cả thông tin scheduling cũng như cron schedule.

![](https://images.viblo.asia/fcff075f-f84f-43bb-8de8-55dc36f4f5b8.png)

### 4. Jobs
![](https://images.viblo.asia/e15299ec-e4d7-4b36-ae43-af6010e40247.png)

Tab jobs liệt kê tất cả các jobs đã chạy hoặc đang chạy. Nó tương tự như Horizon, nhưng Horizon là Redis-only và không có giao diện người dùng, bên cạnh đó, nó cũng tương tác với queue works đang chạy. Mặt khác ở Telescope, nó có giao diện người dùng, đồng thời cũng làm việc với tất cả các queue drivers.

![](https://images.viblo.asia/db483e42-e296-4921-a7a0-fafb3ac0c1d0.png)

Trên trang jobs, bạn sẽ thấy được tên job, queue, connection và status khi job chạy.

Trên trang job detail bạn sẽ có thể xem tất cả dữ liệu của job và một vài thứ khác nữa: hostname, job's fully-qualified class name, connection, queue, # of tries, timeout, tags.

![](https://images.viblo.asia/9c0a9007-1c20-43b8-bdcd-f9a135623057.png)

Jobs được tự động gắn thẻ với bất kỳ Eloquent model đính kèm nào (ví dụ: `App\Video:1`), với người dùng nếu có tệp đính kèm, v.v.

> **Tags.**
> 
> Các mục như requests, commands, v.v. sẽ được tự động gán tag bởi Telescope (ví dụ: nếu đó là request của user, nó sẽ tự động được gán tag `Auth:1` cho User 1; bạn có thể nhấp vào tag đó và nó sẽ chỉ lọc các mục được gắn tag với User 1, v.v.)

Cũng giống như với các HTTP requests, bạn có thể xem tất cả các loại thông tin liên quan đến job này như các truy vấn cơ sở dữ liệu mà nó đã kích hoạt, job đã chạy và logs mà nó sinh ra.

Nếu bạn kick off a closure instead thay vì nhìn thấy `App\Jobs\RenderVideo` thì bạn sẽ thấy `Closure (web.php:43)` được hiển thị.

> **New queued closures.**
> 
> Taylor đã xây dựng một thư viện mới để đưa queued closures trở lại, mà Laravel đã từng có nhưng đã biến mất một thời gian trước đây. Với thư viện mới này, nếu bạn `use` một model để import nó vào trong closure, nó sẽ lưu trữ ID của model, không phải toàn bộ model.
> 
> ![](https://images.viblo.asia/a1957042-3b05-4ef8-a3e9-6ac0c962c3a6.png)

### 5. Exceptions
![](https://images.viblo.asia/e21acfb7-3cc8-4ffa-b27b-43bb38ff4c9c.png)

Ghi lại tất cả các exceptions và cho phép bạn kiểm tra từng exception một. Ở tab này sẽ hiển thị cho bạn dữ liệu tương tự với các tab khác, như hostname, type, request, tags, authenticated user.

![](https://images.viblo.asia/4fd4bab0-97bf-4a47-b59f-70a5f947e179.png)

Bạn sẽ thấy được vị trí dòng code, được highlight, với một vài dòng code bên trên và bên dưới nó để dễ hình dung ra đoạn đó đang làm gì.

![](https://images.viblo.asia/8d0f2b44-5e0c-4d69-be02-6173ddc5a98c.png)

![](https://images.viblo.asia/fa530769-123f-4eac-91ad-216f4ecf5836.png)

Bạn cũng có thể nhận được một liên kết đến một trang exception detail từ request khi nó được thrown.

> NOTE: In many tabs, if you're on an individual page (e.g. the page for a given exception) you will get a link to the request page that generated that one

Nếu cùng một exception xảy ra nhiều lần, chúng sẽ được nhóm trên trang danh sách, nhưng bạn vẫn có thể đi sâu vào các exception riêng lẻ từ trang hiển thị exception.

### 6. Logs
Ở tab logs này sẽ hiển thị log message cơ bản, level, khi nào nó xảy ra.

![](https://images.viblo.asia/606b7dc6-2e2d-42a3-83ee-6710bb7c9a80.png)

Khi bạn truy cập trang chi tiết của logs, bạn có thể xem thêm thông tin bao gồm mọi dữ liệu ngữ cảnh bạn đã pass đến các mục log (dưới dạng một mảng).

> Đẹp và dễ hiểu hơn trước đây, so với việc đào bới trong đống ký tự của log trước kia

Nếu truyền vào một mảng bạn có thể xem tất cả dữ liệu đó, ngoài ra còn xem request nào kích hoạt log, người dùng nào đã kích hoạt.

![](https://images.viblo.asia/38f0836d-457e-4ffe-9c8a-a7a3bf85d3fd.png)

### 7. Dump screen
![](https://images.viblo.asia/7e65e484-d056-4e1b-8d0c-dc1ad01330ee.png)

> Đây là một trong những tính năng yêu thích của tôi

Nếu bạn sử dụng hàm `dump()` và bạn mở nó trong Telescope, bạn sẽ thấy dữ liệu được dump trong Telescope chứ không phải trên giao diện hệ thống của bạn. Tương tự, với `dd()` thì bạn cũng sẽ thấy được dự liệu trong Telescope mà không làm gián đoạn khi bạn thao tác trên hệ thống. Mỗi một hàm `dump()` cũng sẽ liên kết đến request tạo ra nó.

Nếu bạn không dùng tab này nữa, thì dump lại xuất hiện trên giao diện hệ thống của bạn.

### 8. Queries
![](https://images.viblo.asia/015851a5-f662-43dc-bcf6-066593a368fd.png)

Là danh sách tất cả các truy vấn vào DB của bạn - giống như Debugbar. Xem truy vấn đầy đủ, request nào đã gọi truy vấn, mất bao lâu v.v.

Phần view đã được format rất đẹp.

![](https://images.viblo.asia/f602eb96-e989-4be7-bb5d-9d5a0fc883b4.png)

Có thể set giới hạn cho truy vấn trong service provider. Một khi một truy vấn nào mất nhiều thời gian hơn thì nó sẽ được gắn tag `slow` và cũng được đánh dấu màu đỏ trong danh sách.

### 9. Models
![](https://images.viblo.asia/0bba8091-3ea5-4786-bfab-7cc689f7a1c8.png)

Bạn có thể thấy được những action như create, update, delete để thấy những thay đổi nào đã được thực hiện.

![](https://images.viblo.asia/a397aa5e-4440-4b92-b21b-d8fb9296d494.png)

### 10. Events
![](https://images.viblo.asia/5562985b-1543-49aa-a95b-caab2db636cd.png)

Hiển thị danh sách tất cả các events, bạn có thể xem events nào được broadcast with a tag, xem danh sách tất cả các listeners được tạo ra.

![](https://images.viblo.asia/56497624-157a-4daf-89d8-72adbbccc3bd.png)

### 11. Mail
![](https://images.viblo.asia/1c476727-dae1-4225-a0de-0ade384c4c22.png)

Hiển thị danh sách tất cả các email đã được gửi, ai là người nhận, khi nào nó gửi, cho dù đó là queue và sau khi hoàn thành xong ở queue. Có thể xem email subject và khi vào sâu hơn cũng sẽ thấy bản xem trước của email như MailTrap vậy.

![](https://images.viblo.asia/567a8046-6083-4188-9145-ec98deb37b30.png)

Thậm chí có thể tải xuống tệp `.eml` thô và mở nó ở máy của bạn.

### 12. Notifications
![](https://images.viblo.asia/09c023af-a1bf-45b1-a2cc-168e9d3129ff.png)

Hiển thị tất cả thông báo, loại thông báo, v.v.

Không có bản xem trước vì một số thông báo không thể xem trước, nhưng nếu đó là thông báo qua mail, bạn có thể xem trước được nó.

Nếu thông báo được đặt trong queue, bạn cũng có thể xem nó trong phần Jobs section on the request.

### 13. Cache
Hiển thị các lượt truy cập bộ nhớ cache và các lần bỏ lỡ và cập nhật v.v

Hiển thị key, dữ liệu, khi nào hết hạn, có thể xem request nào gọi đến nó và cũng ngay trên trang request, bạn có thể xem tất cả các lần truy cập bộ nhớ cache/misses.

![](https://images.viblo.asia/1c74c886-2904-42dd-a2df-786597013f1d.png)

### 14. Redis
Tương tự như cache.

Cũng sẽ thấy được rằng load mất bao lâu, khi nào nó gọi, request nào gọi đến nó, v.v.

### 15. Authenticated user
Nhận thông tin về người dùng được xác thực trên bất kỳ tab nào.

![](https://images.viblo.asia/9ac07274-ea34-428b-ba25-dd7d6cba7a62.png)

### 16. Authorization
Có thể xem danh sách các email trong telescope service provider xem user nào có quyền truy cập trong hệ thống.

Hoặc dùng viewTelecope để xác định xem một người dùng nhất định có thể truy cập nó không.

### 17. Filtering
Bạn có thể không muốn lưu trữ mọi thứ xảy ra trong produciton, vì vậy bạn có thể lọc bớt chúng, trong Telescope service provider, chạy `Telescope::filter(function ($entry))`

```
function ($entry) {
    if (local) { return true; }

    return $entry->isReportableException ||
        $entry->isfailedJob() ||
        $entry->isScheduledTask() ||
        $entry->hasMonitoredTag();
}
```

Bạn có thể sửa cái này nếu muốn.

### 18. Monitored tags
Phần này giúp bạn có thể theo dõi một tag nào đó. Bạn có thể thấy được tất cả các request được ghi lại liên quan đến tag đó cho đến khi bạn bỏ theo dõi tag đó.

> Lưu ý: Horizon và Telescope đều làm tốt phần này, nếu bạn đang sử dụng Redis queues.

### 19. Prune
Schedule job sẽ loại bỏ các mục cũ từ Telescope. Có thể chạy hàng đêm nếu bạn muốn xóa nội dung cũ hơn _x_ giờ.

Cũng là một thiết lập trong config/telescope

Có thể kích hoạt hoặc vô hiệu hóa bất kỳ watchers nào. Ví dụ: `Watchers\CacheWatcher::class` có thể được disabled.

Ngoài ra, `TELESCOPE_LIMIT` mặc định là 100, có nghĩa là giữ 100 truy vấn cùng một lúc, 100 Redis, v.v ... Cái này có thể được cấu hình trong `.env`.

### 20. Miscellaneous
Laravel Telescope còn có chế độ ban đêm nữa, bạn có thể bật nó với `Telescope::night()`

![](https://images.viblo.asia/67a92a86-681b-4cbf-9ad4-fa913db0f93b.png)

# Q&A
* **Dữ liệu được lưu trữ ở đâu?** Redis, ngoài ra có 6-7 cách gì nữa cho bạn chọn.
* **Lưu trữ bao nhiêu dữ liệu?** Khoảng 100 mỗi lần.
* **Có thể nhận được thông báo cho Slack không?** Có.
* **Có thể lọc theo thời gian không?** Bây giờ thì không, nhưng nó là open source bạn có thể sửa nó.
* **Tác động của nó đối với thời gian khởi động (có ảnh hưởng tốc độ) không?** Chỉ có một truy vấn được thực thi mỗi lần. Ta chỉ nên dùng trên môi trường staging, vì nó là tool debug mà.
* **Có thể kiểm tra nhiều ứng dụng trong một giao diện người dùng không?** Có, chỉ cần chỉ cho họ đăng nhập thông tin của họ trong cùng một cơ sở dữ liệu.
* **Phiên bản nào của Laravel tương thích với nó?** 5.7.7+.

# Tài liệu tham khảo
https://mattstauffer.com/blog/introducing-laravel-telescope/

Bài viết trên của mình được dịch từ link trên. Cảm ơn các bạn đã đọc (bow).