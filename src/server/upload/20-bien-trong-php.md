# Giới thiệu
Ở bài trước, chúng ta đã viết được  một chương trình tuyệt vời in ra `Hello World` ở trong PHP. Hôm nay hãy cùng mình `Hello World` và thêm `Hello PHP` thêm nhiều lần nữa để có tinh thần phấn chấn.  Các bạn hãy truy cập https://replit.com/languages/php_cli và bắt đầu gõ lệnh như sau. Các bạn sẽ thấy có thêm `. PHP_EOL`,  cái này hiện tại các bạn hiểu là xuống dòng nhé, mình sẽ giải thích kĩ hơn ở phần sau.

![](https://images.viblo.asia/33899e7b-1a6e-414c-af1e-12e7a1253f3b.png)
# Vấn đề
Bây giờ mình muốn thay đổi một chút, thay vì `Hello World` mình sẽ đổi thành `Hello Programming World` và `Hello PHP` thì sẽ đổi thành `Hello PHP Programming Language`. Cùng thay đổi thử nhé.

![](https://images.viblo.asia/ce943eed-bc5b-458b-b020-108d73f5962a.png)

Chắc hẳn các bạn sẽ thấy một điều là chỉ có thêm một vài từ mà chúng ta phải tìm kiếm rất nhiều nơi, và thay đổi thành từ chúng ta mong muốn. Vậy nếu như từ chúng ta muốn thay đổi xuất hiện 1000 lần thì sẽ như thế nào? Đương nhiên chúng ta cần đến 1000 chỗ đó và thay đổi thành từ chúng ta muốn. Cực phải không? 

Dù vậy, có một phương pháp đơn giản mà hữu hiệu, đó là copy paste. Cũng như vậy, chỉ cần đổi một chỗ, rồi copy paste ra nhiều chỗ, khá là đơn giản. Tuy nhiên, thứ nhất, chúng ta vẫn cần tìm đến những chỗ cần thay đổi và paste vào. Thứ hai, dễ mắc sai lầm, nếu các bạn để ý kĩ, hình một trong phần giới thiệu ở dòng thứ 9 là `Hello PHp` không phải `Hello PHP` và mình không hề muốn thay đổi `Hello PHp` thành `Hello PHP Programming Language`. Mặc dù vậy, trong quá trình copy paste, vì kiếm quá nhiều chỗ và thường cũng giống nhau nên mình đã mắc sai lầm là thay đổi luôn dòng code không cần thay đổi.

Vậy có cách nào để khi thay đổi thì mình không cần tìm đến nhiều chỗ và không mắc những sai lầm không nên có không? Câu trả lời là dùng biến sẽ giúp cho bạn khắc phục được những nhược điểm này. Trước hết chúng ta hãy cùng tìm hiểu biến là gì, cách dùng biến trong PHP và cách biến giúp chúng ta giải quyết vấn đề.
# Biến
## Biến là gì
Biến là tên tượng trưng dùng để gán với một giá trị nào đó. Các bạn tham khảo hình bên dưới (mình tô màu cho dễ phân biệt).

![](https://images.viblo.asia/fd9e86a2-b244-4191-8f7e-3ab4347190f0.png)

Nhìn hình các bạn tưởng tượng giúp mình là biến giống như một cái hộp. Trong đó, sẽ có tên biến (màu tím) và giá trị của biến đó (màu đỏ). Và, mỗi lần truy cập vào biến `message` thì mình sẽ nhận được giá trị của biến đó là `World`.
## Cách dùng
Để khai báo biến trong PHP, chúng ta sẽ thêm dấu $, tiếp theo là tên biến, sau đó là dấu `=` và cuối cùng là giá trị của biến. Chúng ta có thể xem giá trị của biến bằng cách in ra biến đó, cách làm như sau:

![](https://images.viblo.asia/44c374f2-c7c2-4143-a403-84a879ee7bb7.png)

Ở dòng 2 có nghĩa là tạo biến tên là `message` sau đó gán giá trị là `'World'` và trong biến message này. Dòng thứ 3 có nghĩa là in ra giá trị của biến tên `message` và xuống dòng.
# Giải quyết vấn đề
Vậy biến sẽ giúp chúng ta giải quyết vấn đề như thế nào? Viết lại code dùng biến, mình sẽ có như thế này:

![](https://images.viblo.asia/806a6690-8c70-4ed9-ae80-ad8fdba154da.png)

Giải thích một chút về code, dòng 2 là tạo biến tên `message1`, sau đó gán giá trị `'World'` cho biến này. Dòng 3 là tạo biến có tên là `message2` và gán giá trị `'PHP'` cho biến này. Các bạn sẽ thấy thay vì code cứng giá trị, thì chúng ta sẽ gán vào biến và sử dụng biến ở những chỗ cần thiết. Như các bạn thấy, chúng ta sẽ tách được `Hello PHp` ra và khi thay đổi biến, sẽ không làm thay đổi dòng này. 

Tiếp theo, hãy thử thay đổi và wow, chỗ duy nhất chúng ta cần thay đổi là giá trị của biến, không cần tìm đến những chỗ sử dụng biến đó và thay đổi như trước, chỉ cần thay đổi giá trị của biến thì tất cả những chỗ sử dụng biến đó cũng sẽ thay đổi.

![](https://images.viblo.asia/1ff1ed40-e801-4509-bdbb-7618d752f9f2.png)

Như vậy chúng ta đã giải quyết được vấn đề nêu trên: 
- Khi thay đổi thì mình không cần tìm đến nhiều chỗ
- Không mắc những sai lầm không nên có không
# Bonus
Còn một lợi ích mà biến đem lại nữa đó là sẽ giúp code dễ đọc hơn, phần này mình nghĩ là hơi nâng cao nên chỉ giới thiệu sơ qua cho các bạn trước. Lấy ví dụ chúng ta muốn tính trung bình cộng của hai số, công thức tính trung bình cộng sẽ là lấy tổng hai số và chia cho hai. Trong ví dụ này, chúng ta sẽ tính trung bình cộng của 6 và 10. Viết ra code thì sẽ như thế này:

![](https://images.viblo.asia/76e92bc0-6c39-4a07-92d0-183199c38508.png)

Nhìn cũng ok nhưng sẽ rõ ràng hơn nếu chúng ta có thể đọc là trung bình cộng hai số thì bằng tổng hai số chia cho 2 thay vì đọc là sáu cộng mười tất cả chia hai như đoạn code trên. Cùng viết lại và sử dụng biến để dễ đọc hơn nhé:

![](https://images.viblo.asia/a6100f19-6fe8-4399-8cfd-4d09d278d52f.png)

Dài dòng văn tự hơn, tuy nhiên, dễ đọc hơn. Đọc vào sẽ hiểu là trung bình cộng của hai số là lấy tổng hai số chia cho hai.

Nói đến vấn đề dễ đọc, hãy cùng bàn luận thêm về cách đặt tên biến sao cho người đọc cảm thấy vui vẻ. Đợi xíu, tại sao không phải cho người viết vui vẻ mà là người đọc vui vẻ. Vì code để cho người đọc và máy thực thi, cùng lặp lại nào, code để cho người đọc và máy thực thi, lần nữa, code để cho người đọc và máy thực thi. Và còn nữa, bạn sẽ không muốn một ngày nào đó, anh đồng nghiệp thân thiết của bạn cạch mặt bạn sau khi được giao task maintain code của bạn. Hoặc là đọc code của ai đó và bạn bắt đầu chửi @#$%! vì code lộn xộn, không thể nào hiểu được và tệ hơn là chợt nhận ra code đó là của mình. Đặt tên biến sao cho người đọc vui vẻ, code dễ maintain là môt chủ đề khá rộng, cho nên mình sẽ không bàn luận sâu trong bài này. Mình chỉ chia sẻ cho các bạn một vài cách nho nhỏ để tên biến các bạn có ý nghĩ, dễ đọc, dễ hiểu. 

Nên đặt tên biến theo `camelCase` hoặc `snake_case`. `camelCase` nghĩ là viết thường từ đầu và viết hoa những từ tiếp theo, `snake_case` nghĩa là dùng dấu `_` cách giữa mỗi từ. Tùy theo style code của team, nếu team dùng `snake_case` thì bạn cũng nên dùng `snake_case` và team dùng `camelCase` thì bạn nên dùng `camelCase`, việc này sẽ làm cho code style được đồng bộ, dễ đọc hơn. Một số ví dụ về `snake_case`: `my_car`, `my_house`, `weather_data`. Một số ví dụ về `camel_case`: `myCar`, `myHouse`, `weatherData`.

Đặt tên có ý nghĩa và nghĩa nên sát với ngữ cảnh. Giả sử bạn yêu quý những chiếc xe đua và bạn cảm thấy nó rất là đáng yêu. Vì vậy, trong code bạn sẽ ưu ái và đặt tên biến cho những chiếc xe đua là lovelyCar.

![](https://images.viblo.asia/a37c1aa5-57db-4f65-bf10-b1fe5ed5c49c.png)

Nhìn thì vui đấy, cho đến một ngày người khác đọc code của bạn, hoặc một thời gian lâu sau bạn không còn nghĩ xe đua đáng yêu nữa mà đối với bạn bây giờ nó thật tệ. Vậy thì lúc này bạn hay người khác đọc vào những dòng code này và sẽ tự hỏi `lovelyCar` nghĩa là gì, có ăn được không. Sau một vài giờ nghiên cứu thì cuối cùng cũng phát hiện ra à, lovelyCar ý ám chỉ xe đua. Thấy không, đặt tên không theo ngữ cảnh, không sát với nghĩa của nó thì rất dễ gây hiểu lầm, tốn thời gian tìm hiểu. Thay vì vậy, chúng ta nên đặt tên như thế này:

![](https://images.viblo.asia/4e4d9a89-b145-4e2f-a12b-603893d07c1b.png)

Đọc vào là biết ngay đang nói đến xe đua. Kĩ thuật đặt tên biến cần nhiều thời gian để thành thạo, cho nên bạn đừng thấy nản khi tên biến mình đặt chả ai hiểu hoặc nó thật kì cục. Phương pháp của mình là mắc sai lầm, học hỏi từ sai lầm, sau đó làm tốt hơn. Vì vậy đừng ngại suy nghĩ cách đặt tên biến, mắc sai lầm vì tên biến khó hiểu, không phù hợp ngữ cảnh, sau đó học hỏi từ sai lầm đó và đặt tên biến tốt hơn. 
# Lời kết
Như vậy qua bài này chúng ta đã:
- Tìm hiểu về biến
- Những vấn đề mà biến giải quyết
- Cách khai báo và sử dụng biến trong PHP
- Cách đặt tên biến
- Kĩ thuật và lí do cần đặt tên biến phù hợp