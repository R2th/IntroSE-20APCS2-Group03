![](https://images.viblo.asia/fb55c212-221e-4772-9da7-d5714011f661.png)

Chào các bạn, Hôm nay mình xin giới thiệu 1 thứ hết sức thú vị cho các bạn.

Hẳn là việc làm game thì ai cũng mong muốn sản phẩm của mình được yêu thích nhất, ít lỗi nhất, và phù hợp với thị hiếu nhất.

Cách thông thường là chúng ta sẽ sử dụng tới các bài khảo sát, hoặc dựng 1 con server để thu thập ý kiến đóng góp của User.

Với việc tạo các bài khảo sát bằng Google Form sẽ rất tiện lợi nhưng để kéo user tới đó điền vào thì lại ko phải đơn giản.

Với việc dựng 1 con server, rồi nhét cái api vào trong game, thì quả thật là rất tiện lợi cho user khi có thể góp ý ngay khi đang trong game, nhưng nó kéo theo chi phí và nhân công rất phức tạp.

Và với 1 người làm indie game như mình, thì việc tối ưu chi phí phát triển, nhưng vẫn đảm bảo tính hiệu quả và độ tiện lợi cao nhất luôn là yếu tố hết sức quan trọng.

Đó chính là lý do mình tìm hiểu ra bài viết này để chia sẻ với các bạn.

Ok! nói nhiều rồi, giờ là thực hành nhé!

Chúng ta sẽ sử dụng Google Form (Google Docs) để làm nơi lưu trữ dữ liệu, xem thống kê, và phân tích dữ liệu.....

Tiếp đến chúng ta sẽ tạo 1 Popup trong game để user có thể điền thông tin câu hỏi vào đó, sau đó nó sẽ được gửi tới Google Form để lưu trữ.

Bắt đầu nào!

1. Tạo 1 Google Form.
- Các bạn vào link này : https://docs.google.com/forms/u/0/ (nhớ đăng nhập gmail)
- Sau đó ấn vào dấu + to đùng góc trái màn hình:

![](https://images.viblo.asia/5d95ef20-d820-4efc-8ce1-d7a8003931ad.PNG)

- Đặt tên tiêu đề cho Form (nó cũng sẽ là tên tiêu đề file Docs):

![](https://images.viblo.asia/9c3f0c7f-8970-4a06-96bb-af92d2aecdd8.PNG)

- Tạo câu hỏi có kiểu dữ liệu là "Đoạn":

![](https://images.viblo.asia/66048123-e51f-46f8-8ac2-dc31250b9d68.PNG)

- Nhấn vào nút 3 chấm rồi chọn "Nhận liên kết được điền trước" (lưu lại đường link vào 1 chỗ chút ta điền trong Unity):

![](https://images.viblo.asia/1c96b57b-ac75-4cea-ad6d-dbae842ff2a6.PNG)

- Ấn vào biểu tượng hình cái mắt để chuyển qua giao diện Form:

![](https://images.viblo.asia/8d56f85f-dd46-45ae-ad6d-4094b7f3269e.PNG)

- Chuột phải vào phần ô trả lời và chọn Inspect (Chrome):

![](https://images.viblo.asia/30c62145-58fd-4743-b5c2-090d111b2ce1.PNG)

- Copy phần name của Textarea (entry.xxxxxxxxx):

![](https://images.viblo.asia/f23be0c7-e99f-42d3-b397-796a9212bd25.PNG)

2. Tạo 1 Popup trong Unity.

- Các bạn tạo 1 Popup trong game có giao diện kiểu thế này:

![](https://images.viblo.asia/8ae00977-3e01-449f-aca6-b8b23cc2c199.PNG)

- Ở phần code để gửi dữ liệu từ Popup lên Google Form:

```

 IEnumerator Post(string _content)
    {
        string BASE_URL = "Nhận liên kết được điền trước";
        WWWForm form = new WWWForm();
        form.AddField("entry.xxxxxxx", _content);

        byte[] rawData = form.data;
        WWW www = new WWW(BASE_URL, rawData);
        yield return www;
        gameObject.SetActive(false);
    }
```


3. Gửi dữ liệu lấy ra được từ Popup trong Unity lên Google Form.

- Các bạn viết đoạn code sau đây cho nút GỬI:

```
public void Send()
    {
        Content = content.text;
        
        StartCoroutine(Post(Content));
    }
```


Như vậy là các bạn đã có 1 popup góp ý cho User để nâng cao chất lượng game mà hoàn toàn miễn phí, tốc độ server google thì không phải nghĩ rồi, ngoài ra với sức mạnh của Google Docs các bạn hoàn toàn có thể tận dụng để tạo ra các bản Report chất lượng nhằm mục đích đánh giá game!

Chúc các bạn thành công nhé ^_^