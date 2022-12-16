# Mở đầu
Đôi khi phát triển hệ thống, mình có đôi khi bắt gặp trường hợp yêu cầu gọi một phương thức post từ một function khác trong Laravel. Các function này có thể có hoặc không nằm trong cùng một controller/class. Trước đây khi xử lý các trường hợp này, cách xử lý của mình rất thô sơ và việc xử lý trường hợp này khiến code của mình rất rắc rối và gây khó khăn cho người khác khi đọc code nếu không thực sự hiểu mục đích đoạn code của mình. Sau một thời gian tìm hiểu thì mình cũng tìm ra cách tốt hơn để xử lý trường hợp này, vậy thì hôm nay mình sẽ giới thiệu cho các bạn cách xử lý của mình khi phải gọi một phương thức post từ một function khác trong laravel.

# Bài toán
Giả sử bạn có một method rất phức tạp mà nhận tham số đầu vào là một `Illuminate\Http\Request $request`. Method này bình thường sẽ được gọi từ một form hoặc một hàm AJAX. Vậy thì làm thế nào bạn có thể gọi method đó từ một method khác - thậm chí là trong một class khác?

Để bài toán dễ tưởng tượng hơn, mình sẽ đi vào code cụ thể. Dưới đây là một method rất phức tạp mà chúng ta khởi tạo, và giả sử chúng ta không muốn phải sửa lại chút nào. 

**The Very Complex Method**
{@embed: https://gist.github.com/thangcx-1985/bffb82811f10d04f9e312c35b7d85c90}

Trong khi đó chúng ta có một method khác mà tại đây chúng ta muốn gọi đến `veryComplexMethod()`

**The Simple Method**
{@embed: https://gist.github.com/thangcx-1985/0df0ef1ca7d548a4118c2a42ff400138}
# Cách xử lý đơn giản
Đây là cách trước đây mình hay dùng, đó là chúng ta tạo ra một hàm "Calling", copy toàn bộ phần code xử lý của `veryComplexMethod` sang một function khác mà chúng ta có thể gọi từ hàm hiện tại. Về bản chất, bạn sẽ tạo một function để lấy dữ liệu từ post request và sau đó gọi một hàm khác - thực tế hàm này mới là nơi thực hiện các xử lý - bằng cách truyền tham số từ Request sang. Vì thế, giờ đây khi `veryComplexMethod` được gọi, nó sẽ trích xuất dữ liệu từ Request và truyền nó sang `veryComplexMethodProcessing` - đây mới là function xử lý thực sự.

{@embed: https://gist.github.com/thangcx-1985/e310d10b3759f7a143776c9219a066da}

**Ưu điểm:**
- Don’t Repeat Yourself: Bạn đang tuân thủ nguyên tắc DRY, bạn không cần phải viết lại bất kì đoạn code nào.

**Nhược điểm:**
- Refactor: Bạn phải sửa lại một số thứ và thay đổi một số function để code của bạn hoạt động.
- Không nhất quán: Không phải tất cả các phương thức của bạn cần điều này, tức là cuối cùng bạn sẽ có một số function sử dụng hàm "calling" trong khi một số thì không.
- Trong trường hợp bạn có sự nhất quán và tất cả các phương phức post của bạn đều có sử dụng function "calling", bạn sẽ làm tăng lên số lượng function mà bạn phải xử lý.

# Cách xử lý tốt hơn
Để xử lý những nhược điểm bên trên, hãy tạo một class mà có thể tạo một request có thể excute bất kì phương thức nào chúng ta muốn rồi chỉ cần truyền Request đó vào làm tham số. Nói cách khác, chúng ta sẽ có gắng bắt chước những gì một form hay một AJAX sẽ làm.

Để ví dụ mình sẽ tạo ra một class `PostCaller`

{@embed: https://gist.github.com/thangcx-1985/20b15dfcea793396dcb3fb262b9998a4}

Trong class này chúng ta sẽ định nghĩa một số tham số và truyền vào trong `construct` và cuối cùng là `call` function để xử lý việc gọi tới một function và nhận về response.

Giải pháp này giải quyết được một số vấn đề mà cách trước không xử lý được.
- Đầu tiên, nó trở thành một hàm gọi chung hoạt động với bất kỳ phương thức nào nhận một Request là đầu vào - ở bất kì class nào.
- Thứ hai, nó thực sự gửi một `Request` làm tham số, điều này có thể hoặc không quan trọng đối với function mà bạn đang gọi.
- Thứ ba, bạn không cần phải refactor lại method mà bạn đang cố gọi đến. Trong cách trước chúng ta phải chuyển phần xử lý dữ liệu từ `Request` sang "calling" function và sau đó truyền dữ liệu sang.

Cùng giải thích một chút về phương thức `call` của `Postcaller`

```php
app($this->class)
```

Ở đây ta đang tạo một Laravel service container instance và binding nó với class mà bạn đang chọn. Có một số ưu điểm khi bạn sử dụng service container bằng cách này:
- Bạn không cần sử dụng từ khóa `new`
- Nó trả về một instance của class mà bạn có thể sử dụng chỉ trong một dòng code
- Bạn không cần import class namespace vào trong scope của `PostCaller` thông qua từ khóa `use`

Thêm vào đó là các lợi ích khác của [service container](https://laravel.com/docs/6.x/container).

```php
{$this->method}()
```

Gọi một method cụ thể bên trong class mà chúng ta đã truyền vào. Sử dụng cú pháp {}, chúng ta có thể tự động gọi một method. Vì vậy, nếu class của chúng ta là `TestingClass::class` và method là `runTest`, điều này sẽ tương ứng với `app(TestingClass::class)->{'runTest'}()`.

```php
$this->requestClass::createFromBase($this->requestSending)
```
Chúng ta tạo một Illuminate request từ Symfony Instance. Chúng ta có thể truyền vào `requestClass` - có thể là một `Illuminate\Http\Request` tuy nhiên cũng có thể là một [custom FormRequest](https://laravel.com/docs/6.x/validation#creating-form-requests)

```shell
return $response
```

Sau đó chúng ta có thể return về bất kì response nào mà method đó trả về cho chúng ta. Sau đó bạn có thể dùng response này để xử lý dữ liệu trả về.

Cuối cùng, làm thế nào để sử dụng. Đây là một ví dụ về cách sử dụng `PossCaller`

{@embed: https://gist.github.com/thangcx-1985/b3bde4b3c1c5263138372392656274fd}

# Tổng kết
Trên đây là một cách để ta có thể gọi một method nhận tham số `Request` từ một method khác trong Laravel. Có thể sẽ có nhiều cách khác để làm việc này, trên đây chỉ là một trong những cách mình tìm hiều được. Hi vọng cách xử lý trên có thể giúp các bạn một chút trên con đường trở thành một lập trình viên có tâm và có tầm của mình :D.