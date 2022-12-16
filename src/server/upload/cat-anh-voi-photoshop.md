Designer có thể dùng rất nhiều phần mềm để thiết kế web, thường là Adobe XD, Sketch, Figma, Photoshop... Và trong bài viết này, mình sẽ nói các thao tác với file Photoshop để làm công việc cắt ảnh cho các Dev Front-end (Áp dụng cho bản CS6)

**NO DEEP SHIT!!** Mình sẽ nói đơn giản hết sức có thể.

## Những điều cần biết để cắt ảnh trong Photoshop
- Move Tool (phím tắt là V): Đây là công cụ để t dịch dời các layer cũng như là chọn layer ảnh ta cần để xuất file ra ngoài.

![](https://images.viblo.asia/969a55f7-b098-44ed-91c6-42593f14c788.png)

- Danh sách layer (F7): Một file thiết kế photoshop thực chất là tổng hợp rất nhiều lớp (Layer) nằm đè lên nhau. Nó có thể là một lớp layer màu, lớp layer chữ, lớp layer ảnh nằm đè lên nhau, v.v...
Và để xem danh sách các layer, cũng như là chọn layer ảnh, ta cần bật danh sách layer thông qua Window -> Layers hoặc ấn F7

![](https://images.viblo.asia/3352d8ad-4a6e-4b89-86cb-7f0b9bca7a58.png)

- Crop Tool (C): Để crop ảnh.

- Ctrl + Alt + Z: Để undo nếu bạn có làm hỏng thứ gì đó :grimacing:

## Cách cắt
Ấn V để chuyển sang move tool -> click vào lớp ảnh bạn muốn cắt -> kiểm tra lớp layer bạn chọn. Mình sẽ ví dụ với 1 thiết kế sau:

![](https://images.viblo.asia/3b41ef41-2e75-4e52-8f13-61007e14246e.png)

Như bạn thấy, sau khi click vào logo với Move tool, mình đã chọn được layer muốn xuất. Nếu bạn không chắc chắn đó có phải layer ảnh mình muốn xuất hay không (Vì rất nhiều designer không đặt tên Layer cụ thể mà chỉ để tên là Layer 68 86 gì đó), hãy **ấn vào biểu tượng hình con mắt** bên cạnh cái layer đó để xem có đúng lớp ảnh mình cần xuất biến mất không

Sau đó, ấn chuột phải vào layer đó -> Rasterize Layer Style (**Chỉ nên làm bước này khi layer đó là một Smart Object. Smart Object có icon file cạnh tên layer**) ![](https://images.viblo.asia/9004ef51-1845-4db5-90ce-ca712dced83a.jpg)

![](https://images.viblo.asia/410c1134-8ba6-4603-a4e3-94171204c72f.png)

Tiếp theo, bạn chuột phải tiếp vào layer vừa xong -> Convert to Smart Object. Sau đó chuột phải tiếp vào lớp đó -> Edit Contents. Khi đó bạn sẽ sang một màn hình mới như thế này: 
![](https://images.viblo.asia/8006b023-baf8-47e4-bf8b-25ed377f7331.png)

Bước cuối cùng, ấn **Ctrl + Alt + Shift + S** để xuất ảnh cho web.
![](https://images.viblo.asia/ef0478a7-94d8-4bb7-bc26-d59dde5f7a6b.png)

Chọn định dạng ảnh mà bạn muốn, thường thì PNG-24 cho ảnh bạn cần nền trong suốt và JPEG cho ảnh không cần nền trong suốt, sau đó ấn Save thôi.

Voila! Vậy là bạn đã có file ảnh để đưa lên web của bạn.

## Lời kết
Cảm ơn bạn đã xem! Nếu có sai sót, hãy bình luận phía dưới để mình biết. Nếu thấy hay, hãy upvote và share :grinning: nó sẽ cho mình động lực để viết tiếp các bài tiếp