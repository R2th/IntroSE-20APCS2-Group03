Nếu các bạn đã làm việc với API thì dù là BE hay FE đều phải sử dụng API Doc, đúng ko? Hãy tưởng tượng, nếu không có API Doc, các bạn sẽ giao tiếp với nhau như thế nào? Bài viết này, mình sẽ đưa ra khái niệm và các tác dụng của API Doc nhé. (go)

## 1. API Documentation là gì?
API Documentation (viết tắt là Doc) chứa các hướng dẫn về cách sử dụng và tích hợp hiệu quả các API của hệ thống. Đây là một tài liệu hướng dẫn một cách ngắn gọn các thôn tin cần thiết để làm việc với API. 

Một API sẽ được cung cấp các thông tin về đường dẫn, các tham số cần thiết, các kiểu dữ liệu trả về, phương thức sử dụng và kèm theo ví dụ tham khảo. Một APi Doc tốt thì nên có ví dụ cho các mục trên, cùng với đầy đủ ví dụ về dữ liệu trả về trong từng trường hợp.

APi Doc truyền thống thường được viết bằng các công cụ soạn thảo và thường xuyên cần được cập nhật lại các thay đổi. Ngoài ra, hiện nay có một vài công cụ giúp tự động hóa API Doc ví dụ như Swagger.
## 2. Tại sao nên dùng API Doc?
Khách hàng sử dụng API của bạn là những người đang rất bận rộn để giải quyết các bài toán phức tạp của họ. Vì vậy, họ sẽ muốn tích hợp càng nhanh càng tốt để giải quyết công việc của mình, họ cần phải hiểu và sử dụng được thật nhanh các API. API Doc giúp cho người dùng sẽ có những trải nghiệm tốt, nhanh, hiệu quả với API của bạn.

API doc rất quan trọng bởi vì nó giúp khách hàng có thể hiểu cách API làm việc, nó chứa tất cả mọi thứ mà khách hàng cần để có thể sử dụng API, giảm những sai xót trong quá trình sử dụng, giúp nó nhanh chóng mang lại hiệu quả cho khách hàng. 

Hãy tưởng tượng nếu API của bạn rất tốt, nhưng tài liệu này lại quá lởm thì khách hàng có sử dụng hay không? Nếu họ sử dụng, bạn sẽ cần bao nhiêu công sức để giúp khách hàng khắc phục lỗi hoặc chỉ đơn giản là áp dụng nó vào mục đích công việc của họ? Bạn có những API xịn xò, nhưng sẽ không ai muốn dùng nếu họ không hiểu nó hoặc nó khó dùng, phải không? Vì vậy, nếu bạn có 1 tài liệu API tốt, khách hàng sẽ muốn mua, muốn sử dụng hơn. Trong thực tế, việc code ra API sẽ dễ hơn việc viết 1 tài liệu xịn xò :)), vì tài liệu phải đảm bảo khách hàng đọc và hiểu nó, giúp tăng 'trải nghiệm nhà phát triển' (Developer Experience).

Tóm lại, API doc sẽ giúp:
* **Nâng cao sự chấp nhận của người dùng**: Nếu bạn có 1 tài liệu tốt, khách hàng sẽ nhanh chóng thấy được hiệu quả khi dùng API của bạn, thu hút được khách hàng.
* **Nâng cao nhận thức**: Khi khách hàng có thể dùng API của bạn nhanh và hiệu quả, họ sẽ trở thành khách hàng thân thiết, có thể sẽ dẫn dắt thêm được nhiều khách hàng khác hơn (Network effect).
* **Tiết kiệm thời gian, chi phí**: Nếu tài liệu API tốt, bạn sẽ không mất nhiều thời gian để hỗ trợ cũng như sửa lỗi giúp khách hàng.
* **Dễ bảo trì hơn**: Không những khách hàng có lợi mà đội ngũ phát triển cũng dễ dàng hiểu và nhanh chóng phát hiện nếu có lỗi, giúp bảo trì nhanh hơn.

Mất chút công sức để làm tài liệu ban đầu sẽ giúp bạn tiết kiệm được nhiều thời gian, công sức về sau hơn. Nên hãy đầu tư để có tài liệu xịn xò nhé.
## 3. Các tool hỗ trợ viết API Doc
Ngoài việc viết API doc bằng các trình soạn thảo, các bạn có thể triển khia nó trên các ứng dựng hỗ trợ tự động hóa API , giúp bạn có trải nghiệm trực quan hơn. 

Mình thấy có Swagger khá hay và trực quan, mọi người có thể tham khảo tại [đây](https://swagger.io/). Ngoài ra, để dùng trong team thì có thể dùng [Postman](https://www.postman.com/api-documentation-tool/), vì nó khá quen thuộc rồi nhỉ :))

## Tổng kết
Cảm ơn các bạn đã đọc đến hết bài. Hy vọng các bạn sẽ hiểu được tầm quan trọng của tài liệu API (API documentation) cũng như mường tượng được chúng ta phải cung cấp những gì trong tài liệu này cho khách hàng. 

## Tài liệu tham khảo
https://swagger.io/blog/api-documentation/what-is-api-documentation-and-why-it-matters/

https://nordicapis.com/7-items-no-api-documentation-can-live-without/