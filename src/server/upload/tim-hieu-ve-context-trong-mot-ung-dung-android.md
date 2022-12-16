## Context là cái gì?

Như tên cho thấy, nó là bối cảnh của trạng thái hiện tại của application/object. Nó cho phép các đối tượng mới được tạo ra hiểu những gì đang diễn ra. Thông thường bạn gọi nó để nhận thông tin liên quan đến một phần khác của chương trình của bạn (activity và package/application).

Ngoài ra, `Context` là một công cụ xử lý hệ thống, nó cung cấp các dịch vụ như giải quyết các resources, có được quyền truy cập vào cơ sở dữ liệu và các preferences, và còn nhiều thứ hơn nữa. Một ứng dụng Android có  nhiều activities. Nó giống như một người điều khiển môi trường mà ứng dụng của bạn đang chạy. Đối tượng activity kế thừa đối tượng Context. Nó cho phép truy cập vào các tài nguyên cụ thể của class và thông tin về môi trường ứng dụng.

`Context` hầu như ở khắp mọi nơi trong việc phát triển ứng dụng Android và đó là điều quan trọng nhất trong phát triển ứng dụng Android, vì vậy chúng ta phải hiểu để sử dụng nó một cách chính xác.

Có rất nhiều loại context khác nhau trong Android, vì vậy, hãy để hiểu những cái đó là gì, làm thế nào để sử dụng chúng và khi nào nên sử dụng cái nào hãy cùng xem bài viết dưới đây.

## Application Context

Nó là một thể hiện duy nhất (singleton) và có thể được truy cập trong một Activity thông qua `getApplicationContext()`. `Context` này gắn liền với vòng đời của một ứng dụng. Application context có thể được sử dụng khi bạn cần một bối cảnh có vòng đời tách biệt với context hiện tại hoặc khi bạn passing qua một context nằm ngoài phạm vi của một Activity.

Ví dụ: Nếu bạn phải tạo một đối tượng singleton cho ứng dụng của mình và đối tượng đó cần một Context, và đối tượng đó nằm ngoài phạm vi của một Activity, khi đó bạn nên sử dụng Application context.

Nếu bạn pass activity context ở đây, nó sẽ dẫn đến lỗi memory leak vì nó sẽ giữ tham chiếu đến Activity và Activity sẽ không được thu gom trong quá trình dọn rác bộ nhớ ứng dụng.

Trong trường hợp, khi bạn phải khởi tạo thư viện trong một Activity, bạn hãy sử dụng Application context chứ không nên sử dụng Activity context.

Bạn chỉ sử dụng `getApplicationContext()` khi bạn biết bạn cần một `Context` cho một cái gì đó có thể tồn tại lâu hơn bất kỳ `Context ` nào khác có thể có theo ý của bạn.

## Activity Context

Context này có sẵn trong một Activity. Context này gắn liền với vòng đời của một Activity. Activity context nên được sử dụng khi bạn passing Context trong phạm vi của một Activity hoặc bạn cần Context có vòng đời gắn liền với context hiện tại.

Ví dụ: Nếu bạn phải tạo một Object có vòng đời gắn liền với một Activity, bạn có thể sử dụng Activity Context.

## getContext() trong ContentProvider

Context này là Application context và có thể được sử dụng tương tự như Application Context đã được nói ở phía trên. Nó này có thể được truy cập thông qua phương thức getContext().

## Khi nào không nên sử dụng `getApplicationContext()`?

- Nó không phải là một Context hoàn toàn và hỗ trợ mọi thứ mà Activity context có. Nhiều thứ bạn cố gắng thực hiện với việc sử dụng Context này nhưng sẽ thất bạn, đa phần đó là các công việc có liên quan đến GUI.
- Nó có thể tạo ra lỗi memory leak nếu Context từ `getApplicationContext()` giữ một cái gì đó được tạo bởi các truy cập của ban nhưng sau đó bạn lại không clean up. Với một Activity, nếu nó giữ một thứ gì đó, một khi Activity được thu hồi trong quá trình dọn rác, mọi thứ khác cũng sẽ bị loại bỏ. Application object duy trì trong suốt vòng đời chương trình của bạn.

## The Rule of Thumb
Trong hầu hết các trường hợp, hãy sử dụng `Context` đã được cung cấp sẵn ở các component mà bạn đang làm việc ở trong đó. Bạn có thể giữ một tham chiếu đến nó một cách an toàn miễn là tham chiếu đó không vượt quá vòng đời của Component đó. Ngay khi bạn cần lưu tham chiếu đến Context từ một đối tượng nằm ngoài Activity hoặc Service của bạn, thậm chí tạm thời, hãy chuyển tham chiếu mà bạn lưu sang Application context.

Nguồn tham khảo: [Understanding Context In Android Application](https://blog.mindorks.com/understanding-context-in-android-application-330913e32514)