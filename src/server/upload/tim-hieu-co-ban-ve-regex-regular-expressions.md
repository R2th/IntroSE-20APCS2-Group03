## **1/10**<br>
Regular expressions tìm kiếm các phần của chuỗi khớp với mẫu.<br>
Trong JS chúng được tạo giữa cặp `//` hoặc `new RegExp()` và sau đó được sử dụng bằng phương thức như `match`, `test` hoặc `replace`.
Bạn có thể định nghĩa Regex trước hoặc trực tiếp khi gọi phương thức<br>
![](https://images.viblo.asia/4bde60d2-aed3-48f7-af75-2f0daf2a1f38.png)<br>
## **2/10**<br>
Tìm từng ký tự một hoặc đặt nhiều ký tự trong ngoặc vuông `[]` để bắt bất kỳ ký tự nào, bắt một loạt các ký tự sử dụng dấu gạch nối `-`<br>
![](https://images.viblo.asia/168856e2-fd9c-45ae-95db-61e71f0bea91.png)<br>
## **3/10**<br>
Thêm cờ tùy chọn vào cuối regex để sửa đổi cách hoạt động của trình so khớp. Trong JavaScript, có những loại cờ sau:<br>
`i` = Tìm kiếm không phân biệt hoa thường<br>
`m` = Tìm đa dòng<br>
`g` = Tìm kiếm toàn cục<br>
![](https://images.viblo.asia/27654f98-9969-43b8-8142-374a4802c9b8.png)
## **4/10**<br>
Sử dụng dấu mũ `^` khi bắt đầu với ý nghĩa "bắt đầu chuỗi".<br>Sử dụng ký hiệu `$` ở cuối có ý nghĩa "kết thúc chuỗi".
![](https://images.viblo.asia/379347a2-ef1f-47e0-8434-2dab55c03ad6.png)<br>
## **5/10**<br>
Sử dụng ký tự đại diện và ký tự thoát đặc biệt để khớp với các ký tự lớn hơn:<br>
`.` = bất kỳ ký tự nào ngoại trừ xuống dòng<br>
`\d` = khớp với một ký tự số, tương đương [0-9]<br>
`\D` = khớp với một ký tự không phải số<br>
`\s` = khớp với một ký tứ khoảng trắng<br>
`\S` = khớp với một ký tự không phải khoảng trắng<br>
`\n` = khớp với ký tự xuống dòng<br>
![](https://images.viblo.asia/0a6f8a51-2771-44fa-9183-7ec4bde2a63a.png)<br>
## **6/10**<br>
Chỉ khớp với một số lượng nhất định của các ký tự hoặc nhóm được khớp:<br>
`*` = 0 lần hoặc nhiều lần<br>
`+` = 1 hoặc nhiều lần<br>
`?` = 0 hoặc 1<br> 
`{3}` = chính xác 3 lần <br> 
`{2,4}` = 2,3,4 lần<br>
`{2,}` = 2 hoặc nhiều hơn:<br>
![](https://images.viblo.asia/1a3fda23-dc25-495c-ba95-7bae7a9d2d23.png)<br>
## **7/10**<br>
Sử dụng cặp ngoặc `()` để khớp 1 nhóm. Nếu không sử dụng cờ  `g`,  `match` sẽ trả về toàn bộ nhóm khớp với mẫu đã cho <br> Có thể sử dụng `|` trong `()` với ý nghĩa `|` = hoặc<br>![](https://images.viblo.asia/d6ec18a8-d590-4139-8118-5b926c13daca.png)<br>
## **8/10**<br>
Để tìm kiếm ký tự đặc biệt, sử dụng `\`<br>
Các ký tự đặc biệt trong JS regex: `^ $ \ . * + ? ( ) [ ] { } | ![]`
![](https://images.viblo.asia/02c5ac44-d5e8-462b-8b77-f7f89b5902ed.png)<br>
## **9/10**<br>
Để khớp bất kỳ thứ gì nhưng ngoại trừ một ký tự nào đó, sử dụng `^` bên trong dấu ngoặc vuông `[]`<br>
Điều này dẫn đến `^` có 2 nghĩa, có thể gây nhầm lẫn. Nó có nghĩa là "bắt đầu chuỗi" khi nó ở phía trước biểu thức chính quy và "không phải ký tự này" khi được sử dụng bên trong dấu ngoặc vuông<br>
![](https://images.viblo.asia/fb167242-c3f8-4eee-942e-39ae87edba2b.png)<br>
## **10/10**<br>
Regex có thể tìm và khớp tất cả mọi thứ, từ url đến tên tệp.<br>
Tuy nhiên! hãy cẩn thận với tác vụ phức tạp, chẳng hạn như phân tích địa chỉ email hoặc HTML (không phải là ngôn ngữ thông thường và do đó không thể được phân tích cú pháp đầy đủ bằng một biểu thức thông thường)<br><br>
Tất nhiên, còn nhiều hơn nữa để regex như lazy, greedy, lookahead, nhưng hầu hết những gì các lập trình viên web muốn làm với các biểu thức thông thường chỉ cần sử dụng các khối xây dựng cơ sở này.<br>
Bài viết được dịch và tham khảo tại [đây](https://dev.to/chrisachard/intro-to-regex-for-web-developers-2fj4?fbclid=IwAR03y8jIenOjRtE_rcJMvoqfvvD2gdQc6YKyj_pEdrK3h6RnbdLEF0cmji0)