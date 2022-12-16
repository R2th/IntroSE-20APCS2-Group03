Thông thường trong một dự án sẽ có một designer đảm nhiệm phần giao diện UI nhưng trên thực tế không phải dự án nào cũng có designer, hoặc có những dự án designer chỉ thuê theo tháng, tuy nhiên sẽ có phát sinh thêm màn mới buộc các dev sẽ phải "tự biên tự diễn", không may mắn hơn nữa là có những dự án chỉ có wireframe buộc các dev sẽ phải tự xử lý cả phần UI. Khi đối mặt với trường hợp này, các dev sẽ phải căng não nghĩ xem liệu thế này đã đẹp chưa, UI như vậy đã hợp lí chưa. Vậy nên với bài này mình sẽ giúp các dev đỡ đau đầu hơn bằng những tips về UI dưới đây nhé!

## 1. Tạo color palette bằng cách điều chỉnh opacity
Thông thường ở mỗi một dự án ta sẽ có một color palette nhất định, và màu primary color thì sẽ chỉ có từ 1 đến 3 màu là cùng, vậy thì từ một màu chính ta có thể pha ra nhiều màu khác nhau bằng cách điều chỉnh opacity

![](https://images.viblo.asia/d337d5d2-2ff3-428c-9202-de975e71f08e.png)

Từ một màu chính là #50A6B1 chúng ta có thể tạo ra các màu với sắc độ nhạt hơn bằng cách điều chỉnh opacity bằng cách sau: 
Ví dụ từ màu #50A6B1 muốn thành màu #62AFB9 chúng ta chỉ cần giảm độ opacity của màu #50A6B1 xuống còn 90% 
![](https://images.viblo.asia/fafb4158-3a5b-4592-91ef-53f5422af6ba.png)
Tuy nhiên, đừng quên dùng tool chấm màu để chấm màu lại vì nếu để opacity thì nếu lên trình duyệt web màu của chúng ta sẽ bị đục và bị mờ.  Và thể là ta sẽ được màu mới là #62AFB9 với sắc độ nhạt hơn màu primary color.

## 2. Sử dụng color và font-weight để tạo phân cấp
Thông thường trong một bài post ta sẽ có một đoạn title kèm theo là một đoạn description hoặc một sub title nữa, vậy thì làm thế nào để thể hiện được rõ đâu là title đâu là đoạn mô tả? Cá chắc là nhiều bạn đang nghĩ đến việc dùng font-size to cho title font bé cho description? Thế nhưng liệu trong một bài post vừa có cả title, có sub title và có cả đoạn description thì sao? Chẳng lẽ font chữ cứ bé dần? Để giải quyết điều này thì mình gợi ý cho các bạn một cách đó là sử dụng color và font weight. 
![](https://images.viblo.asia/196918b4-3187-45a9-928c-f9d954b1eb82.png)
Với màu sắc, chúng ta có thể sử dụng như sau:
- Màu đậm: cho content chính, như title hoặc headline.
- Màu xám: cho content chứa đoạn mô tả.
- Màu xám nhạt: cho những thông tin kèm theo.

Với font-weight, thông thường sẽ dùng 2 mức độ là 400 và 700
- 400: cho các đoạn text văn bản thông thường
- 700: cho các đoạn title, những dòng text bạn muốn nhấn mạnh.

## 3. Không sử dụng text màu xám trên một background có màu
Ở trên mình có nói, dùng màu xám cho những đoạn chứa phần mô tả đúng không? Tuy nhiên nếu ở trên một background có màu thì chúng ta ko nên làm như vậy, vì sao? Điều này sẽ khiến đoạn text của chúng ta chìm nghỉm, không sạch sẽ, và không có độ phân cấp mạnh. Để giải quyết điều này chúng ta có thể quay lại cách 1, đó là điều chỉnh sắc độ.

![](https://images.viblo.asia/9ca0d2a9-7095-496a-b1e7-3dea8367f803.png)

Hãy điều chỉnh sao cho màu text mô tả có sắc độ nhạt hơn màu background bằng cách điều chỉnh saturation và lightness

![](https://images.viblo.asia/28f0ca4c-5d5d-4bfb-b8ea-4c9fe1f1f113.png)

## 4. Sử dụng ít border hơn
Giả sử bạn có một list các contact như bên dưới, và bạn đang muốn ngăn cách chúng với nhau. Border không phải là cách duy nhất, sử dụng quá nhiều border sẽ khiến cho chúng ta có cảm giác trật trội, không clean, vì thế hãy sử dụng các cách dưới đây
![](https://images.viblo.asia/0ca0adbf-deee-4200-bd4f-28273ede6e7a.png)

### Box shadow
Box shadows đảm nhiệm rất tốt việc phân các element cũng tương tự như border nhưng nó sẽ nhìn tinh tế hơn và không có cảm giác dày đặc, dễ bị xao nhãng như border
![](https://images.viblo.asia/520c6593-5517-44c5-8b46-8b90f6d43908.png)

### Background color
Background sẽ đảm nhiệm rất tốt việc phân các section, ví dụ trong một card ta có header, body và footer, thì mình có thể phân cấp header với các phần còn lại bằng cách cho header một một background riêng biệt.
![](https://images.viblo.asia/38dd8f34-dad6-4d38-90a3-e0b1281928ee.png)

## 5. Đừng nên để icon quá to 
Đối với icon, nhiều bạn sẽ mắc lỗi để icon quá to, khiến cho dòng text bị chìm ngỉm và nhìn text thì rất thô, để khắc phục điều này, chúng ta có thể bọc ngoài icon bằng một hình khối có background, như vậy sẽ khiến cho icon và đoạn văn bản nhìn cân đối và tương xứng hơn.
![](https://images.viblo.asia/cb8cf39f-5c2e-4bc5-810e-7ddcff08f4a1.png)

Trên đây là một vài tips để các dev có thể tự xoay xở khi phải đối mặt với các task giao diện, để khi phải làm việc mà không có designer thì UI nhìn vẫn xịn và mượt!

<hr>
Bài viết tham khảo tại: https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886