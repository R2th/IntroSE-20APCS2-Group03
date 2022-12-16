Đối với những bạn còn đi học hay chưa có nhiều kinh nghiệm, đều nghĩ  rằng "code cho nó chạy được, rồi tính sau". Và rồi sau khoảng 3-6 tháng, bạn quay trở lại gặp nó, chính nó cũng không thể nhận ra đây là chủ nhân đã tạo ra nó. Vì chính bạn còn không hiểu được những dòng code mà bạn tạo ra, thì việc nó không nhận ra bạn là điều rất đỗi bình thường. Trong việc viết code chuẩn, thì comment code là một phần không thể thiếu đối với những lập trình viên chuyên nghiệp. Trong bài viết hôm nay, mình xin chia sẻ đôi chút kinh nghiệm về vấn đề comment code cho những function dựa trên tài liệu JSDOC 3

Link: https://jsdoc.app/about-getting-started.html

Chú thích:
* Editor: `VsCode`
* Ngôn ngữ: `Javascript`

Nội dung

1. Giới thiệu về `JSDOC 3`
2.  Sử dụng một số `JSDoc tags` để thêm thông tin comment
-----

### 1. Giới thiệu về `JSDOC 3`
JSDOC 3 là một trình tạo Document API cho Javascript, giống như Javadoc hay phpDocument. Bạn thêm những comment trực tiếp vào source code của mình. Tool JSDOC sẽ quét qua source code của bạn và tạo ra một Website Document HTML cho bạn.

Những comment sẽ được đặt ngay sau những dòng code. Mỗi comment phải bắt đầu với `/**`  và kết thúc với `*/`

```javascript
/** Đây là mô tả về function foo */
function foo() {
  
}
```
Khi đưa chuột vào function foo ta sẽ thấy một mô tả về hàm này: 
![](https://images.viblo.asia/5acbd0ea-4fec-44a6-9430-e06d9a8afc30.png)

### 2. Sử dụng một số `JSDoc tags` để thêm thông tin comment
Để thêm thông tin comment như param của function, version, giá trị trả về,... Ta sẽ cần phải sử dụng những tags riêng biệt khác:

Mình xin đưa ra một ví dụ về một số tag. Các bạn có thể tìm hiểu chi tiết hơn tại đây: https://jsdoc.app/index.html#block-tags
* **Thẻ `@async`: Chi định hàm đó là asynchronous  (1)**
* **Thẻ `@param`: Cung cấp name, type, và description của một function paramater  (2)**
* **Thẻ `@returns`: Chỉ định giá trị trả về cho function  (3)**
* **Thẻ `@version`: Chỉ định phiên bản của một danh mục  (4)**
* **Thẻ `@see`: Tham chiếu tới một liên kết để biết thêm thông tin  (5)**

Ví dụ:
```javascript
/**
 * `fetchData` lấy dữ liệu từ url đưa vào function
 * @async
 * @param {string} url - url để lấy dữ liệu
 * @returns {Promise<string>} dữ liệu được lấy từ url
 * @version 1.1
 * @see https://viblo.asia/
 */
export async function fetchData(url) {
  const result = await fetch(url);

  return result;
}
```

Popup hiển thị khi đưa chuột vào function:
![](https://images.viblo.asia/e1075e15-ef03-497a-9d55-70cccb41e8f3.png)


### Tổng kết:
Giờ các bạn sẽ cảm thấy được răng, những function mà mình viết ra nó có ý nghĩa hơn, dễ đọc hơn khi gặp lại nó ở những lần sau. Và quan trọng hơn hết là những người khác đọc code của bạn. Họ sẽ hiểu được bạn đang viết cái gì.<br>

Tài liệu tham khảo:
- https://jsdoc.app/about-getting-started.html