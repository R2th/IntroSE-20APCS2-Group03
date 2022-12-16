![](https://images.viblo.asia/65596f4d-f39b-4fd2-bf92-579a48ed9428.png)

# 1. Context là gì ?
Context trong Android là bối cảnh của nơi mà chúng ta đang hiện diện và tương tác.

Một vài quan điểm về context:
- Nó là bối cảnh hiện tại của ứng dụng.
- Nó có thể được sử dụng để lấy thông tin liên quan đến activity và ứng dụng.
- Nó có thể được sử dụng để truy cập vào các tài nguyên, cơ sở dữ liệu của ứng dụng, v.v.
- Cả Activity và Application đều được kế thừa từ Context class.
- Context được sử dụng hầu như ở khắp mọi nơi trong phát triển ứng dụng Android và đó là điều quan trọng nhất trong phát triển các ứng dụng Android, vì vậy chúng ta phải hiểu để sử dụng nó một cách chính xác.

Sử dụng sai ngữ cảnh có thể dẫn đến rò rỉ bộ nhớ (Memory leaks)trong một ứng dụng Android.

Vì có nhiều loại context khác nhau trong Android, chúng ta thường phải lựa chọn việc sử dụng context nào tại địa điểm nào cho phù hợp. Vì vậy, chúng ta phải hiểu từng loại context , cách sử dụng chúng và khi nào thì sử dụng cái nào cho phù hợp.

Chủ yếu có hai loại ngữ cảnh:

Application Context: Nó là bối cảnh của ứng dụng và chúng ta sẽ luôn ở trong ứng dụng. Ví dụ - MyApplication (kế thừa lớp Application). Context ờ đây là một thể hiện của lớp MyApplication.
Activity Context: Nó là bối cảnh của Activity. Với mỗi activity khác nhau chúng ta sẽ có một context khác nhau. Ví dụ - MainActivity. Context ở đây là một thể hiện của MainActivity.
Nếu bạn đang chuẩn bị cho Cuộc phỏng vấn Android tiếp theo, hãy tham gia Khóa học Android Professional của chúng tôi để tìm hiểu những thông tin mới nhất về Android và tìm việc làm tại các công ty công nghệ hàng đầu.

## 1.1 Aplication Context
Nó là một thể hiện, là singleton và có thể được truy cập trong activity thông qua `getApplicationContext()`. Application Context  được gắn với vòng đời của một ứng dụng. Application context có thể được sử dụng khi bạn cần một context có vòng đời của nó tách biệt với ngữ cảnh hiện tại hoặc khi bạn đang chuyển một ngữ cảnh vượt ra ngoài phạm vi của activity.

Ví dụ: Nếu bạn phải tạo một đối tượng singleton cho ứng dụng của mình và đối tượng đó cần một ngữ cảnh, hãy luôn sử dụng Application Context.

Nếu bạn sử dụng Activity Context ở đây, nó sẽ dẫn đến rò rỉ bộ nhớ vì nó sẽ giữ tham chiếu đến activity và activity này sẽ không bị GC thu dọn.

Trong trường hợp, khi bạn phải khởi tạo thư viện trong một activity, hãy sử dụng application context thay cho activity context.

Hãy sử dụng **getApplicationContext ()** khi bạn cần một context cho một thứ có thể tồn tại lâu hơn bất kỳ context nào khác.

## 1.2 Activity Context
Mỗi activity sẽ có context của riêng nó. Contex tnày được gắn với vòng đời của activity. Activity context nên được sử dụng khi bạn đang ở trong phạm vi của activity hoặc bạn cần context có vòng đời được gắn với ngữ cảnh hiện tại.

Ví dụ: Nếu bạn phải tạo một đối tượng có vòng đời được gắn với một activity, bạn có thể sử dụng activity context.

Hệ thống phân cấp ứng dụng trông giống như sau:

![](https://images.viblo.asia/65596f4d-f39b-4fd2-bf92-579a48ed9428.png)
Trong mô tả trên, chúng ta có
MyApplication [Ở đây chúng ta có Application context] [Nó là ngữ cảnh gần nhất]
MainActivity1 [Ở đây chúng tôi có cả context của activity (MainActivity1) và context của application (MyApplication)] [Ngữ cảnh gần nhất là Activity context]
MainActivity1 [Ở đây chúng tôi có cả context của activity (MainActivity2) và context của application (MyApplication)] [Ngữ cảnh gần nhất là Activity context]
** getContext () trong ContentProvider**
Context này là application context và có thể được sử dụng làm ngữ cảnh ứng dụng. Bạn có thể lấy nó bằng phương thức `getContext ()`.

## 1.3 Vậy sử dụng context sao cho phù hợp ?

Hãy tìm hiểu cách sử dụng context qua ví dụ sau:

Giả sử chúng ta có lớp MyApplication (kế thừa từ lớp Application). Và, một lớp MyDB khác là Singleton. Và MyDB cần được cung cấp một context để có thể thực hiện công việc. Chúng ta sẽ sử dụng context nào trong trường hợp này ?

Câu trả lời là Application Context, bởi vì nếu chúng ta sử dụng Acitivity Context (ví dụ: MainActivity1), ngay cả khi MainActivity1 không được sử dụng, MyDB sẽ giữ tham chiếu không cần thiết, dẫn đến rò rỉ bộ nhớ.

Vì vậy, hãy luôn nhớ, trong trường hợp Singleton (vòng đời được gắn vào vòng đời ứng dụng), hãy luôn sử dụng Application Context.

Vậy khi nào sử dụng Activity Context. Bất cứ khi nào bạn đang ở trong activity, đối với bất kỳ tương tác giao diện người dùng nào như hiển thị dữ liệu, hộp thoại, v.v., hãy sử dụng Activity Context.

Luôn cố gắng sử dụng ngữ cảnh gần nhất có sẵn cho bạn. Khi bạn đang ở trong Activity, ngữ cảnh gần nhất là Activity context. Khi bạn đang ở trong Ứng dụng, ngữ cảnh gần nhất là Application Context. Nếu Singleton, hãy sử dụng Application Contex.

# Tổng kết
Tham khảo : https://blog.mindorks.com/understanding-context-in-android-application-330913e32514