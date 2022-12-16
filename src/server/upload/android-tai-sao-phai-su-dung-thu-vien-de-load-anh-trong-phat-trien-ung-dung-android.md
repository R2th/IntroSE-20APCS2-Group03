Khi sử dụng công cụ Android Studio để phát triển ứng dụng trên nền tảng Android thì chắc hẳn thư viện load ảnh sẽ là một thứ không thể thiếu trong project của các lập trình viên Android. Và tiêu biểu trong đó ta có thể thấy một số thư viện load ảnh phổ biến hiện nay như là Glide hay là Picasso. Nhưng câu hỏi đặt ra là: Tại sao lại phải sử dụng thư viện để load ảnh ? Trong các thư viện ấy có điều gì đặc biệt mà mọi lập trình viên Android đều sử dụng ? 

Trong bài viết này mình sẽ tìm hiểu để cùng mọi người giải đáp câu hỏi này nhé :grinning:

## 1: Tại sao phải sử dụng thư viện để load ảnh ?

Chúng ta sẽ tìm câu trả lời trong ví dụ dưới đây:
![](https://images.viblo.asia/b1a22f8f-271d-4197-b70e-2329e380bdd8.png)

Nhìn đoạn code trên ta có thể thấy ảnh đang được load ở trên Main Thread hay còn gọi là UI Thread. Điều này được khuyến cáo là không nên áp dụng khi phát triển một project bởi vì Main Thread chỉ nên làm những tác vụ liên quan đến vẽ UI hoặc những tác vụ nhẹ mà không chiếm quá nhiều thời gian chạy. Nếu bạn tạo một tác vụ đòi hỏi thời gian chạy lâu trên UI thread như ví dụ trên chẳng hạn thì rất có thể chương trình của bạn sẽ bị chạy chậm hoặc có thể crash vì lỗi UI not responding. Vậy giải pháp ở đây là gì ?

Nếu không thể load ảnh ở main thread thì ta có thể tạo ra 1 thread mới để thực hiện công việc đó và update lên UI thread sau khi ảnh đã được load về. Hãy xem ví dụ sau nhé:

![](https://images.viblo.asia/88d30de8-0795-4fd9-acff-17305fd77f27.png)

Trong đoạn code ví dụ trên mình đã tạo ra 1 thread mới bằng việc sử dụng Asyntask để load ảnh từ một URL sau đó update lên UI sau khi ảnh được tải về. Tuy nhiên, việc sử dụng đoạn code trên lại sinh ra một số vấn đề mà lập trình viên sẽ phải đau đầu để giải quyết được nó. Đó là một số vấn đề có thể phát sinh khi chạy ứng dụng như :

1. Out of Memory Error
2.  Slow Loading
3.  UI Unresponsive.

Những lỗi này hoàn toàn có thể sinh ra nếu ta sử dụng code như 2 ví dụ trên và không sử dụng thư viện. Tuy nhiên, câu hỏi đặt ra là:  Những vấn đề trên nó sẽ xảy ra khi nào và các thư viện sẽ giaỉ quyết các lỗi này như thể nào ?

Cùng mình tìm hiểu ngay bây giờ nhé. Let's go

## 2: Các lỗi thường gặp khi load ảnh 

### 2.1: Out of memory Error

Ngay khi đọc tên thì các bạn cũng có thể hiểu được lỗi này xảy ra khi nào rồi đúng không nhỉ :joy:

Out of memory xảy ra khi ứng dụng của bạn sử dụng cùng lúc nhiều bức ảnh có kích thước lớn đòi hỏi thiết bị phải liên tục tạo ra các vùng nhớ để lưu trữ ảnh dẫn đến việc vượt quá bộ nhớ cho phép của thiết bị và gây ra OOM Error.

*Vậy thì thư viện sẽ xử lí bug này như thế nào ?*

Các thư viện hiện nay như Glide, Picasso ... sẽ có 1 phương pháp để tránh OOM error đó là phương pháp *downsampling* để giảm kích thước của bức ảnh sao cho bằng với kích thước của view nhằm giảm tải bộ nhớ cần thiết cho ứng dụng.
 
 Ví dụ: Ta có một bức ảnh với kích thước là 200x200 nhưng view chỉ có kích thước khoảng 50x50 thì việc đưa toàn bộ ảnh với kích thước đầy đủ vào sẽ là không cần thiết.Vì vậy các thư viện sẽ resize lại bức ảnh được tải xuống thành kích thước 50x50 để vừa với view và tránh tạo bộ nhớ lớn để lưu ảnh. Vì thể OOM sẽ ít xảy ra hơn

Với mỗi thư viện sẽ có cách resize ảnh khác nhau. Glide sẽ resize ảnh ngay khi ảnh được down về và lưu lại trong bộ nhớ còn với Picasso thì ảnh sẽ được lưu trực tiếp và khi nào cần sử dụng đến sẽ được resize và update vào view. Chính vì thế nên tốc độ update view ban đầu của Picasso sẽ nhanh hơn Glide.

### 2.2: Slow Loading

Lỗi này tạm dịch là làm chậm chương trình, nó sẽ xuất hiện bởi nguyên nhân khi các tác vụ đã hoàn thành nhiệm vụ và update lên view tuy nhiên vẫn chưa được cancel. Giống như ví dụ tạo task load ảnh sử dụng Asyntask mà mình ví dụ ở trên. Các task load ảnh, decode ảnh vẫn sẽ xuất hiện trong chương trình mà không hề bị hủy đi dù view đã hiển thị xong hoặc đã về trạng thái background - không hiển thị nữa.

Điều này sẽ gây ảnh hưởng đến những task đang chạy trong chương trình gây ra lỗi Slow loading.

Để giải quyết vấn đề này thì các thư viện sẽ có 2 cơ chế sinh ra đó là:
1. Hủy tất cả các tác vụ mà đã hoàn thành mà view không còn hiển thị trên màn hình nữa và tập trung vào các tác vụ mà hiện tại đang hiển thị trên màn hình mà chưa được update.
2. Lưu ảnh đã được tải về dưới dạng bitmap vào bộ nhớ cache, disk để không cần load lại ảnh đó khi nó được tái sử dụng:

Quy trình lưu ảnh và lấy ảnh từ bộ nhớ được thực hiện như hình bên dưới

![](https://images.viblo.asia/2f62ce25-9c17-4417-add5-711ad4d3e35f.png)

Bức ảnh sẽ được tải về vào lần đầu tiên sau đó lưu vào trong bộ nhớ ứng dụng và lấy ra khi nó được gọi đến trong lần sử dụng tiếp theo. Điều này sẽ giảm thiểu việc load đi load lại một bức ảnh khi sử dụng và tránh gây ra lỗi Slow Loading 

Vậy là vấn đề đã được giải quyết rồi đúng không :heart_eyes:

### 2.3: UI not responsive

UI not responsive tạm dịch là ứng dụng không thể update UI hay ứng dụng tạm dừng hoạt động. Nghe có vẻ khá là nguy hiểm đúng không ? :cry:   

Vậy thì lỗi này sẽ xảy ra khi nào?

Ứng dụng Android của chúng ta sẽ update đều đặn 16ms một lần để cập nhật lại UI. Và việc skip quá trình update này sẽ gây đến lỗi UI not responsive. Việc skip này xảy ra khi ứng dụng load số lượng lớn ảnh hoặc các bức ảnh có kích thước lớn vào view khiến chương trình liên tục phải phân bổ bộ nhớ stack vào heap để lưu trữ các bức ảnh này. Khi bộ nhớ mới liên tục được tạo ra như vậy thì đòi hỏi phải có 1 công cụ nào đó để dọn đi những phần bộ nhớ dư thừa đã được tạo ra và sử dụng trước đó mà không còn cần thiết nữa. 

Đó chính là lúc GC( Garbage Collector ) thực hiện công việc của nó. GC là một tiến trình dọn rác tự động của chương trình sinh ra để xóa bỏ các vùng nhớ không còn được sử dụng trong chương trình. Bạn có thể hiểu khi GC chạy là lúc chương trình sẽ tạm ngưng hoạt động, UI skip update. GC chạy càng nhiều thì chương trình càng skip nhiều. Và đó chính là nguyên nhân dẫn đến UI not responsive.

Bây giờ, làm thế nào để hạn chế việc GC hoạt động xuống ít nhất có thể ? :roll_eyes:

Các thư viện như Glide, Picasso... sẽ có 1 cơ chế được gọi là *Bitmap pool* dựa trên thuộc tính *inBitmap* để  tái sử dụng view và giải quyết vấn đề này.
Bitmapool có thể hiểu là 1 list các bitmap được tạo ra khi load ảnh vào ứng dụng mà tại đó nó có thể được tái sử dụng
Ví dụ: Ta có hai bức ảnh bitmap cần được đưa vào view( bitmapOne, bitmapTwo). Khi ta load bức ảnh 1 với bitmapOne chương trình sẽ tạo ra 1 vùng nhớ để lưu bitmap này. Tuy nhiên khi bức ảnh này đã được load xong và không còn được sử dụng nữa thì nó thì nó sẽ không bị xóa đi bởi GC mà thay vào đó nó sẽ được lưu lại vào Bitmap pool và tái sử dụng để chứa bitmapTwo khi nó được khởi tạo.

Điều này cho phép các vùng nhớ được tạo ra trong chương trình được tái sử dụng và tránh đi việc lặp lại việc tạo ra các vùng nhớ mới.Từ đó GC sẽ ít được gọi đến hơn.

Ta có thể xem cách hoạt động của nó trong đoạn code dưới đây

![](https://images.viblo.asia/df78b678-7048-4aa5-856e-2995a44929b8.png)

Trong đoạn code trên bạn có thể thấy bitmapOne được tạo ra trước đó. Khi bitmapTwo được tạo ra sẽ sử dụng option được định nghĩa dựa trên bitmapOne để khởi tạo và tái sử dụng. Phương thức inJustDecodeBounds = true khai báo để thông báo với chương trình không khởi tạo 1 vùng nhớ mới khi bitmapTwo được tạo ra và từ đó vùng nhớ bitmapOne có thể được tái sử dụng. Thật tuyệt vời phải không nào :laughing:

Tuy nhiên vẫn sẽ có 1 số lưu ý khi sử dụng cơ chế reuse bộ nhớ này đó là:
1. Kích thước của hình ảnh sau phải lớn hơn hoặc bằng khích thước của ảnh trước đó. Nếu không thì chương trình sẽ tạo ra 1 vùng nhớ mới
2. Các thiết thị version trước Honeycomb thì sẽ không được hỗ trợ cơ chế này. Nếu muốn sử dụng thì sẽ phải thêm 1 thư viện thứ 3. Các bạn có thể đọc về thư viện này trong đường link bên dưới.


    https://github.com/amitshekhariitbhu/GlideBitmapPool

## Kết luận:
Trên đây là một số tìm hiểu của mình để trả lời cho câu hỏi: Tại sao lại phải sử dụng thư viện load ảnh trong Android ?

Hy vọng bài viết của mình hữu ích với mọi người. Thông tin bài viết mình có tham khảo bài viết trên trang:

https://blog.mindorks.com/how-the-android-image-loading-library-glide-and-fresco-works-962bc9d1cc40#:~:text=Glide%20knows%20the%20dimension%20of,of%20memory%20error%20is%20solved