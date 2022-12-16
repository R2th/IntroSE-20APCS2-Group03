Đây là bài chia sẻ được dịch từ bài viết của tác giả Anna Monus  (https://www.hongkiat.com/blog/code-optimization-coding-antipatterns/). Trong bài chia sẻ này, có một số chỗ được mình sửa đổi, bổ sung để cho phù hợp.

![](https://images.viblo.asia/dc997ce2-d475-4783-b473-9481a7b0fc3d.png)

Thiết kế kiến trúc của một website hay một ứng dụng, hoặc thiết lập một coding workflow hiệu quả thường xuyên khiến chúng ta phải đối mặt với những vấn đề nan giải, thường xuyên gặp phải. Chúng ta không cần thiết phải giải quyết những vấn đề thiết kế này từ con số 0, vì ta có thể **tái sử dụng** được những giải pháp ở cấp độ kiến trúc cũng như những đoạn code ở tầng vi mô.

[Design patterns](https://sourcemaking.com/design_patterns) là một trong những **giải pháp tái sử dụng** trong một số trường hợp nhất định, có thể **hữu ích để giải quyết những sự cố thường xảy ra** và có thể giúp chúng ta **tối ưu những đoạn codes** của mình.

![](https://images.viblo.asia/c6fd43f9-c410-444a-b394-66ec8b61c590.jpg)

Mặc dù `Design patterns` là phương tiện tuyệt vời để cải thiện quy trình phát triển của chúng ta bằng cách sử dụng những công thức đã được kiểm chứng tốt. Tuy nhiên, đôi khi những `Design patterns` đó cũng mang lại những hậu quả tiêu cực đối với chúng. Lúc này, chúng được gọi là những `Antipatterns`.

## Antipatterns là gì?
Thuật ngữ `"antipatterns"` xuất hiện lần đầu tiên trong một cuốn sách mang tên [AntiPatterns](https://www.amazon.com/exec/obidos/ASIN/0471197130/theantipatterngr) vào năm 1998. 

Nó đề cập đến **những giải pháp tái sử dụng mà ban đầu trông có vẻ hữu ích**, nhưng dần sau đó, **chúng lại trở nên có hại hơn là lợi**.

Điều này có thể xảy ra vì nhiều lý do khác nhau, ví dụ như nếu chúng ta không sử dụng những `patterns` đúng bối cảnh, cài đặt, hay thời gian phù hợp (các giải pháp có hiệu quả trong quá khứ không phải lúc nào cũng hoạt động đúng ở thời điểm hiện tại), hoặc trong những trường hợp xấu hơn là toàn bộ mô hình đã không tốt ngay từ khi bắt đầu rồi (>''<)'.

![](https://images.viblo.asia/3fa65af6-e426-47ea-9495-a940a0ee2db8.jpg)

`Antipatterns` cũng thường được gọi là **những mô hình thất bại**. Tuy nhiên, tin vui là chúng ta **hoàn toàn có thể nhận biết và né tránh chúng**.

Trong bài viết này, tôi sẽ giới thiệu qua cho các bạn 10 antipatterns phổ biến hay gặp phải trong quá trình phát triển web. (Chú ý rằng những antipatterns tôi liệt kê dưới đây không hoàn toàn giống với những gì bạn có thể tìm thấy trong cuốn sách tôi đã đề cập ở trên).

## 10 Antipatterns phổ biến

### 1. Premature Optimization (Tối ưu sớm)
**Thời điểm tốt** là một trong những yếu tố quan trọng trong việc tối ưu hóa các đoạn codes. Nếu chúng ta để ý đến những hiệu quả nhỏ và tối ưu hóa chúng quá sớm trong quá trình phát triển, trước khi chúng ta biết chính xác những điều cần làm, rất có thể chúng ta sẽ dễ dàng mắc phải antipattern **"Tối ưu sớm"**. 

![](https://images.viblo.asia/c7de7f0d-26b5-44ff-910b-00ae0485b09e.jpg)

Theo câu nói nổi tiếng của [Donald Knuth](https://www-cs-faculty.stanford.edu/~knuth/): ["Tối ưu sớm là gốc rễ của mọi điều ác"](https://en.wikiquote.org/wiki/Donald_Knuth#Computer_Programming_as_an_Art_.281974.29), nó có thể hơi bị cường điệu hóa lên một chút, nhưng có thể cho thấy rằng những vấn đề nghiêm trọng về tối ưu hóa sớm có thể gây ra trong tương lai như thế nào.

Nếu chúng ta tối ưu hóa hiệu năng trước khi xây dựng một kiến trúc hiệu quả, nó có thể gây ra **codes trở nên khó đọc**, **việc debug và bảo trì khó khăn hơn**, và **những đoạn codes thừa bị đẩy vào mã nguồn** của chúng ta.

Một ý tưởng tốt để ngăn chặn việc tối ưu sớm là tuân theo nguyên tắc lập trình [YAGNI (You Aren’t Gonna Need It)](http://wiki.c2.com/?YouArentGonnaNeedIt), nó khuyên chúng ta nên tuân thủ **"cần cái gì thì thêm cái đó"**, chứ đừng có mà **"chắc là sau này sẽ cần đến"**.

### 2.Reinventing the Wheel
**Reinventing the wheel - Tái phát minh bánh xe** có thể hiểu nôm na là cái bánh xe nó đã được phát minh từ rất lâu rồi, và nó cũng rất tốt rồi, đừng có mất thời gian đi phát minh lại nó nữa :))). Trong lập trình cũng vậy, nhiều khi bạn muốn **tự mình làm tất tần tật mọi thứ** và **viết tất cả mọi thứ từ đầu**, mà không biết rằng, đã có rất nhiều API, thư viện đã có sẵn, và rất tuyệt vời rồi.

![](https://images.viblo.asia/ba52acbe-c48e-4852-b7b1-50eced5455bc.jpeg)

**Reinventing the wheel** không chỉ gây ra lãng phí thời gian, mà còn những giải pháp tùy chọn, đặc biệt là những chức năng cơ bản hiếm khi tốt hơn những **chuẩn** mà nhiều nhà phát triển hay người dùng đã thử nghiệm rất kĩ rồi.

### 3. Dependency Hell
Trái ngược với **"reinventing the wheel"**, chúng ta có một antipattern khác cũng phổ biến đó là **"dependency hell"**.

Nếu, thay vì cặm cụi viết mọi thứ từ đầu, chúng ta lại **quá lạm dụng việc sử dụng thư viện bên thứ ba dựa trên những phiên bản cụ thể của những thư viện khác**. Điều này sẽ khiến bạn dễ dàng phải đối mặt với những tình huống khó quản lý mỗi khi muốn cập nhật thư viện, vì đôi khi những dependencies này sau khi cập nhật lại không tương thích với những cái khác.

![](https://images.viblo.asia/1d2b7365-a394-4fc6-9d20-bd7908eb59d2.jpg)

**Dependency hell** có thể được giải quyết bằng cách sử dụng các **package managers** có khả năng cập nhật thông minh các dependencies để chúng vẫn có thể tương thích được với nhau. Nếu chúng ta vấp phải quá nhiều vấn đề, việc refactoring cũng có thể là một ý tưởng hay.

### 4. Spaghetti Code
**"Spaghetti code"** có lẽ là antipattern nổi tiếng nhất. Nó miêu tả **một ứng dụng khó debug và điều chỉnh do thiếu kiến trúc phù hợp**.

Kết quả của một thiết kế kiến trúc kém là một đống codes chồng chất lên nhau giống như một bát mì Spaghetti vậy, rất **rối rắm và phức tạp**. Những **Spaghetti codes** rất khó để đọc và hầu như khó có thể hiểu được nó hoạt động như thế nào (>'<)'.
![](https://images.viblo.asia/c07924ec-a6c9-4c18-80dd-acc4365dc368.jpg)

Spaghetti codes thường xuất phát từ sự kết hợp của nhiều loại mã codes không tốt khác nhau, ví dụ như codes không chứa những khối điều kiện thích hợp, có quá nhiều câu lệnh goto, exceptions và threads, có những functions hoặc methods không thể tái sử dụng được,...

### 5. Programming by Permutation
**"Programming by Permutation"** hay **"programming by accident"** xảy ra khi bạn cố gắng tìm giải pháp cho một vấn đề bằng cách thử nghiệm liên tục những thay đổi nhỏ (giống như kiểu hoán vị vậy), test và đánh giá từng sự thay đổi nhỏ và cuối cùng lựa chọn cách đầu tiên làm cho codes của bạn hoạt động đúng. Cách tiếp cận này đôi khi có vẻ hấp dẫn khi mà lập trình viên không hoàn toàn hiểu rõ về đoạn codes đó và họ tin rằng một hoặc nhiều sửa đổi nhỏ sẽ có thể làm cho codes của họ hoạt động đúng.

![](https://images.viblo.asia/fb00a272-3c16-40e2-b07a-5d17aac9807a.png)

**Programming by Permutation** có thể dễ dàng **gây phát sinh ra nhiều lỗi mới**, tệ hơn nữa, những lỗi đó chúng ta khó có thể nhận ra ngay được =='. Trong nhiều trường hợp, tìm được giải pháp hiệu quả cho tất cả các tình huống có thể xảy ra là một nhiệm vụ bất khả thi.

### 6. Copy and Paste Programming
**"Copy and Paste Programming"** antipattern xảy ra khi chúng ta không tuân thủ theo nguyên tắc [Don't Repeat Yourself (DRY)](http://wiki.c2.com/?DontRepeatYourself), thay vì tạo ra giải pháp giải quyết vấn đề, bạn lại đi cóp nhặt từng **mẩu codes** hết chỗ này đến chỗ khác, sau đó chỉnh sửa lại nó cho phù hợp với ngữ cảnh.

![](https://images.viblo.asia/8bf5ff74-e66b-4cf7-b0cc-0d350c5472e2.jpeg)

Kết quả của phương pháp này là chúng ta có **những đoạn codes bị lặp đi lặp lại**, vì hầu hết chúng chỉ khác nhau ở một vài điểm nhỏ.

**Copy and paste programming** không chỉ thấy ở những lập trình viên mới, mà còn ở những lập trình viên đã có kinh nghiệm, bởi vì nhiều người trong số họ có xu hướng **sử dụng những đoạn codes đã được viết sẵn, kiểm tra kĩ lưỡng của họ cho những tác vụ cụ thể**, điều này dễ dàng gặp phải sự lặp lại không mong muốn.

### 7. Cargo-Cult Programming
Cái tên **“cargo-cult programming”** được bắt nguồn từ một hiện tượng dân tộc học mang tên "cargo cult". [Cargo cults](https://www.scientificamerican.com/article/1959-cargo-cults-melanesia/) xuất hiện ở Nam Thái Bình Dương sau thế chiến thứ II, khi tiếp xúc với nền văn minh tiên tiến, người bản địa cứ nghĩ rằng các sản phẩm như Coca-Cola, TVs, hay tủ lạnh trong những tàu chở hàng mang lên đảo, đều được tạo bởi những thế lực siêu nhiên, và họ tin rằng mỗi khi thực hiện **những nghi lễ ma thuật** tương tự như phong tục của người phương Tây, những thùng chất đầy hàng hóa đó sẽ lại xuất hiện trở lại.

![](https://images.viblo.asia/b06079a4-de08-4315-a995-5af55467571b.jpg)

Antipattern này cũng có những biểu hiện tương tự như vậy. Ta sử dụng những frameworks, thư viện, giải pháp, hay các design patterns,...có lợi cho chúng ta, mà **không thực sự hiểu tại sao chúng ta cần phải dùng đến chúng** hay **những công nghệ đó hoạt động ra sao**.

**Cargo cult programming** xảy ra ở những lập trình viên không có kỹ năng hoặc là lập trình viên mới (hoặc là những người thiếu kỹ năng về mặt nào đó), họ sao chép những mã nguồn từ nơi này đến nơi khác trong ứng dụng mà hầu như ít hoặc không hiểu biết về ý nghĩa thật sự của chúng. Antipattern này không chỉ tệ vì làm cho ứng dụng của chúng ta bị **"bơm căng phồng"**, mà còn có thể dễ dàng đưa những lỗi mới vào mã nguồn của chúng ta.

### 8. Lava Flow
Chúng ta nhắc đến **"Lava flow"** antipattern mỗi khi cần phải xử lý **những đoạn mã codes thừa hoặc có chất lượng thấp** mà **dường như không thể tách rời** với ứng dụng, nhưng chúng ta không hoàn toàn hiểu được chúng có tác dụng gì hoặc ảnh hưởng của chúng đến toàn bộ ứng dụng như thế nào. Vì vậy, việc loại bỏ chúng là một việc rất rủi ro.

Điều này thường xuyên xảy ra với những **legacy codes**, hoặc là khi **đoạn codes này được viết bởi những người khác** (thường thiếu tài liệu chính xác), hoặc là khi dự án được chuyển từ giai đoạn development sang production quá nhanh.

Cái tên của antipattern này thể hiện sự tương đồng với dung nham núi lửa, ban đầu thì di chuyển nhanh, trôi chảy khó phòng ngừa, nhưng sau đó thì cứng lại và khó loại bỏ.

![](https://images.viblo.asia/7defacc5-842c-49be-8470-50df2dd7d6e4.jpg)

Trên lý thuyết, ta có thể loại bỏ **lava flows** sau khi đã **kiểm tra và refactoring kĩ lưỡng**,  nhưng trong thực tế, **việc thực hiện nó dường như rất khó khăn hoặc thậm chí là không thể**. Do **lava flows** thường có chi phí thực hiện cao, nên tốt hơn hết để ngăn chặn chúng là ta thiết lập được kiến trúc thiết kế tốt và một workflow làm việc hiệu quả ngay từ ban đầu ^_^.

### 9. Hard Coding
**"Hard coding"** là một antipattern được nhắc đến rất nhiều trong những cuốn sách về phát triển web ngay ở lời nói đầu. Hard coding xảy ra khi chúng ta **lưu trữ những cấu hình hoặc là dữ liệu đầu vào** (ví dụ như các đường dẫn file, remote host name hay một đoạn văn bản ở ngôn ngữ cụ thể nào đó) ở trong mã nguồn ứng dụng thay vì lưu chúng ở trong những file cấu hình, database, user input hay từ một external api nào đó.

![](https://images.viblo.asia/2b703627-7a31-4d67-aadc-66a4af1c6d2e.jpg)

Vấn đề gặp phải ở đây là những hard code đó sẽ **chỉ hoạt động chính xác trong một môi trường nhất định nào đó**, và khi mà điều kiện thay đổi, chúng sẽ không còn hoạt động chính xác nữa.

Ví dụ như, ở môi trường development, bạn sử dụng một s3-bucket có tên `s3-foo-development`, nhưng ở môi trường production bạn lại sử dụng một s3-bucket khác có tên `s3-foo-production`, hãy thử tưởng tượng, những `s3 access key` đã được fix cứng ở trong code rồi thì làm sao bạn có thể sử dụng 2 s3-bucket khác nhau trên 2 môi trường khác nhau như vậy. Cách giải quyết ở đây là bạn phải lưu những `s3 access key` đó ở trong biến môi trường cho từng môi trường cụ thể.

### 10. Soft Coding
Nếu như cứ cố gắng quá mức để tránh **hard coding**, bạn có thể vô tình chạm trán với một antipattern ngược lại với nó gọi là **"soft coding"**.

Trong soft coding, chúng ta **đưa những thứ mà đáng ra nó nên được để ở trong mã nguồn ứng dụng ra những tài nguyên bên ngoài**, ví dụ chúng ta lưu trữ business logic trong database =='. Lý do phổ biến nhất mà chúng ta thường làm thế, là do lo lắng những business rules sẽ thay đổi trong tương lai, và lúc đó sẽ phải viết lại codes.

Trong những trường hợp cực đoan, một ứng dụng với những soft coded có thể **trở nên quá trừu tượng và phức tạp đến mức gần như không thể hiểu được nó** (đặc biệt là đối với những thành viên mới vào team), và **cực kỳ khó để debug và bảo trì**.

## Kết luận
Bài chia sẻ trên đã giới thiệu qua những **Antipatterns** mà chúng ta thường mắc phải trong quá trình phát triển ứng dụng cũng như cách để khắc phục chúng. Hi vọng bạn đọc sẽ chú ý để tránh mắc phải chúng trong sự nghiệp lập trình của mình nhé ^_^.