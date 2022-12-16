CSS đôi khi rất đơn giản, đôi khi lại đầy phức tạp, hay thậm chí là trông có vẽ lỗi thời.

Tại sao CSS lại gây ra nhiều cảm xúc khác nhau cho các developers như vậy? Lý do có thể là chúng ta cần một số mindset nhất định để viết CSS tốt hơn.

Có lẽ chúng ta đã có những mindset về coding nói chung, nhưng bản chất của CSS khiến nó đặc biệt khó nằm bắt. Các ngôn ngữ lập trình thường hoạt động trong môi trường được kiểm soát. Mặt khác, CSS hoạt động ở một nơi không bao giờ có thể kiểm soát hoàn toàn.
Thực ra những mindset để viết CSS thường đến sau khi mọi thứ đã gần như hoàn thành. Nó không đơn giản chỉ là nắm bắt các kỹ thuật, mà còn là ý tưởng đằng sau ngôn ngữ.

Sau đây là một số Mindset nên lưu ý khi code CSS

### Mọi thứ (nên) là hình chữ nhật
Điều này là hiển nhiên rồi, vì khái niêm box model là điều đầu tiên mọi người tìm hiểu về CSS. Tuy nhiên khi làm đôi khi chúng ta hay bỏ quên nó. Hãy hình dung mỗi DOM element là một cái hộp dù nó là inline, block, hay flex. Bọc chúng lại trong một hình chữ nhật và đảm bảo chúng vẫn hoạt động tốt ở các bổi cảnh khác nhau.

Để kiểm tra, chúng ta có thể mở devtools lên, di chuột qua các phần tử để nhìn một cách trực quan các ranh giới của mỗi phần tử.

### "Cascade" là "bạn"
Cascade có nghĩa là "dòng thác", hiểu đơn giản là code CSS của chúng ta sẽ đi từ trên xuống và ở dưới thì độ ưu tiên cao hơn.
Mặc dù có một số lý do để tránh Cascade, nhưng không có nghĩa là Cascade trong CSS là xấu. Trong thực tế, khi được sử dụng một cách chính xác, nó là cho code của chúng ta tuyệt vời hơn.

Điều quan trọng là chúng ta phải phân biệt được những styles thuộc phạm vi toàn cầu và styles nào được giới hạn là tốt nhất. Nó giúp các styles mặc định được truyền lại và chúng ta không cần phát lặp lại các khai báo đó.

### Càng ít càng tốt, cần thiết thì phải nhiều
Ít thuộc tính hơn có nghĩa là thừa kế ít hơn, ít rắc rối hơn. Tuy nhiên hãy suy nghĩ về ý nghĩa của selector của chúng ta đang viết, thực hiện vừa đủ điều đó, tránh các styles không cần thiết hoặc không liên quan đến ý nghĩa mà selector đó mang lại.

### Nắm rõ các Shorthands (cách viết ngắn)
Một số thuộc tính trong CSS có thể được viết bằng cú pháp ngắn. Điều này giúp khai báo các thuộc tính liên quan với nhau trên một dòng. Mặc dù điều này rất tiện lợi, nhưng hãy lưu ý khi dùng shorthand thì các giá trị mặc định cũng được khai báo khi không được thiết lập rõ ràng. Khi viết:
```
background: white;
```
các thuộc tính liên quan sẽ được thiết lập:
```
background-color: white;
background-image: none;
background-position: 0% 0%;
background-size: auto auto;
background-repeat: repeat;
background-origin: padding-box;
background-clip: border-box;
background-attachment: scroll;
```
Tốt hơn là nên chỉ rõ ra chúng ta muốn dùng ```background-color```

### Cố gắng giữ cho mọi thứ linh hoạt
CSS xử lý một lượng lớn các biến không xác định: kích thước màn hình, nội dung động,... Nếu styles cứng các thuộc tính, khả năng cao kết quả của chúng ta sẽ sai so với thiết kế.
```
.thing {
    width: 218px; /* sao lại là 218px ??? */
}
```
Hãy cố gắng nghĩ về một tỉ lệ, hơn là một con số.

### Nhớ rằng content luôn có thể thay đổi
Hãy chia nhỏ các thành phần ra, nghĩ đến phần tử lớn hơn là một cái hộp chứa các phần tử nhỏ, và hãy đảm bảo rằng các phần tử này dù ở đâu cũng không bị vớ styles.

Những trường hợp thường cần dự đoán: chuỗi rất dài/ chứa các ký tự đặc biệt; ảnh có thể bị thiếu hoặc tỉ lệ ảnh "kỳ cục"; màn hình có thể rất hẹp hoặc cực kỳ rộng.