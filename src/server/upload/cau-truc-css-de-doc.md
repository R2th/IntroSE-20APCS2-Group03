Một trong những khó khăn mà các lập trình viên gặp phải khi viết CSS là thực tế là thuộc tính bạn tìm kiếm có thể nằm trong bất kỳ dòng nào bên trong selector. Để giúp giải quyết vấn đề đó, tôi đã nghĩ về một cấu trúc để sắp xếp các style để bạn có thể biết nơi viết và tìm kiếm các thuộc tính bạn cần. Cấu trúc này bao gồm việc chia nhỏ các thuộc tính của một selector thành các khối để bạn biết nơi cần tìm các thuộc tính bằng cách đi thẳng đến khối tương ứng của chúng.

## Cấu trúc

Bao gồm: 

- Khối định vị (Positioning Block)
- Khối cấu trúc (Structure Block)
- Khối kiểu chữ (Typography Block)
- Khối bổ trợ (Modifier Block)

![Cấu trúc CSS dễ đọc](https://images.viblo.asia/8a408832-bfba-45a2-9e4c-321227007d0a.png)

## Khối định vị (Positioning Block)

Các thuộc tính thay đổi vị trí tuyệt đối của phần tử trên trang như vị trí, trên cùng, phải, dưới cùng, bên trái.

![Positioning Block](https://images.viblo.asia/606659ba-5b41-459b-8645-8a91d4b8246c.png)

## Khối cấu trúc (Structure Block)

Các thuộc tính sửa đổi cấu trúc, hình dạng, kích thước và chi tiết của phần tử như `display, flex and grid properties, margin, padding, background, border...`

![Structure Block](https://images.viblo.asia/b16b252c-914d-4afc-8600-82e2662d140e.png)

## Khối kiểu chữ (Typography Block)

Mọi thứ liên quan đến chữ nói chung, các thuộc tính của văn bản và phông chữ như `font, text-align, color, text-decoration, text-transform...`

![Typography Block](https://images.viblo.asia/b2b9b8ad-f885-4256-8f53-e822e839128d.png)

## Khối bổ trợ (Modifier Block)

Thuộc tính CSS thay đổi phần tử theo bất kỳ cách nào hoặc thêm một số chi tiết vào nó và không nằm trong các khối trên. Trong trường hợp này, tôi thường đặt các thuộc tính như `transition, transform, box-shadow, cursor, animation...`

![Modifier Block](https://images.viblo.asia/bd4c27c8-6059-4c2e-8832-fced2eda0fd3.png)

Source: dev.to