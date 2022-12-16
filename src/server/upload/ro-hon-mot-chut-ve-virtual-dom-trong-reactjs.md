## Nội dung: 
Nếu bạn đã làm bất kỳ 1 ứng dụng SPA bằng reactjs rồi thì việc load lại trang khi thực hiện các hoạt động thay đổi DOM từ việc thay đổi nhỏ như nhấn like 1 bài viết nào đó trên facebook, đến việc chuyển trang đều không xảy ra.
Có thể bạn đã nghe qua React VirtualDOM nhưng cách thức nó hoạt động và thuật toán gì nó được áp dụng thì mình sẽ giới thiệu nó trong bài này.

Trước tiên mình đi vào khái niệm DOM và Virtual DOM trước
- DOM(Document Object Model) là giao diện lập trình cho văn bản HTML và XML, nó xác định cấu trúc logic của chúng và cách chúng được truy cập và thao tác. Khi 1 trang web được load, trình duyệt sẽ tạo DOM cho page đó dưới dạng các node hược object có mô hình cơ bản như sau:
![](https://images.viblo.asia/7394788f-408f-4577-acb4-17a1864ac367.gif)


- Do việc tạo và update DOM khá tốn thời gian, nên đội ngũ phát triển của facebook đã tạo ra Virtual DOM nhằm tăng tốc độ update DOM trong ứng dụng ReactJS của mình. 
- Virtual DOM được thiết kế nhỏ gọn, và bản chất của nó là 1 Object copy lại DOM do trình duyệt tạo ra.

Virtual DOM hoạt động theo 3 bước:
- Khi state hoặc prop thay đổi, toàn bộ UI sẽ render lại tại Virtual-DOM
- Kiểm tra sự khác biệc giữa DOM và Virtual DOM theo thuật toán kiểm tra khác biệt
![](https://images.viblo.asia/bbdff152-503d-42fc-a9c6-fd8994ff11aa.png)

- Update DOM với những thay đổi đã tìm được bằng thuật toán ở bước 2:
![](https://images.viblo.asia/682d1c38-b818-4c80-891f-304ee8f0307f.png)

 Giờ đến phần thuật toán kiểm tra sự khác biệt:
 - Khi so sánh 2 cây (ở đây bạn hiểu là DOM và Virtual DOM), react sẽ so sánh root của 2 cây.
 Khi root mà thay đổi, toàn bộ cây sẽ huỷ đi và xây lại mới. khi cây bị huỷ, các hoạt động unmout sẽ được gọi như thực thi clear cache, remote event listener... Và ngược lại, trong hoạt động đựng lại mới thì các hoạt động khởi tạo sẽ được thực thi.
 Khi mà root không thay đổi, react tiếp tục kiểm tra các thuộc tính của element, nếu thay đổi thì nó chỉ update phần này.
 VD:
 
 ```
     <div className="initial-div" title="facebook" />
     <div className="new-div" title="facebook" />
 ```
Ở đây, khi so sánh, React sẽ cho biết là className thay đổi

- Sau khi so sánh root là so sánh các element con:
    React sẽ lặp qua tất cả các element con của node cha 1 cách đồng thời và tạo ra 1 biến đổi mỗi khi gặp phải 1 element thay đổi. Mỗi element con nếu là 1 list các element giống nhau phải có 1 key riêng biệt để react biết và chỉ update đúng vị trí có key thay đổi
    VD: 
 
    ```
        <ul>
          <li key="100">James</li>
          <li key="101">John</li>
        </ul>

        <ul>
          <li key="102">Joe</li>
          <li key="100">James</li>
          <li key="101">John</li>
        </ul>
    ```
## Kết luận:
 Hy vọng bài này sẽ giúp bạn hiểu hơn về ReactJS, nice coding.
 
 Tài liệu tham khảo:
  - https://blog.zairza.in/how-reactjs-works-behind-the-scene-e25689f4b2c5