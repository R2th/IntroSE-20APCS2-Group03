![](https://images.viblo.asia/6f0c022b-bc91-477e-9a1d-570702afe459.png)

***React.js*** hiện đang là thư viện JavaScript phổ biến nhất dành cho các front-end developers. Được phát minh bởi ***Facebook***, nhưng lại có sẵn dưới dạng `mã nguồn mở`, và được các nhà phát triển, các tập đoàn lớn trên toàn thế giới sử dụng rộng rãi.

***React*** thực sự đã thay đổi cách thức mà chúng ta xây dựng các ứng dụng single-page (***SPA***) - và một trong những tính năng tuyệt vời nhất của **React** chính là ***hooks***. <br>
***Hooks*** được giới thiệu bởi `Sophie Alpert` và `Dan Abramov` tại `React Conf 2018` trong phiên bản ***React 16.8***, nó cho phép chúng ta sử dụng các ***functional components*** thay vì các ***class-based components*** trong khi xử lý ***state***. Bên cạnh các hook tích hợp, React cũng cung cấp cho chúng ta các cách để triển khai các hook tùy chỉnh của riêng mình.

Dưới đây là một số ví dụ về custom hooks và cách triển khai chúng mà bạn cũng có thể sử dụng trong các ứng dụng và dự án của mình.

## 1. useTimeout
Với hook này, chúng ta có thể implement ***setTimeout*** bằng cách sử dụng phương pháp khai báo. 
- Đầu tiên, chúng ta tạo một custom hook với ***callback*** và ***delay***. 
- Sau đó sử dụng ***useRef*** hook để tạo ***ref*** cho hàm ***callback***.
- Cuối cùng, sử dụng ***useEffect*** hai lần: một lần để ghi nhớ ***callback*** gần nhất và một lần để thiết lập ***timeout*** và dọn dẹp.

Ví dụ cho thấy việc triển khai một timer:
![](https://images.viblo.asia/a26d4cde-09b7-47ed-b87b-2d9a1ed4c49c.png)

## 2. usePrevious
Đây là một custom hook tuyệt vời khác mà chúng ta có thể sử dụng trong các ứng dụng của mình. Với nó, chúng ta có thể lưu trữ các ***props*** hoặc ***states*** trước đó. 
- Đầu tiên, cần tạo một custom hook nhận vào một giá trị. 
- Sau đó, sử dụng ***useRef*** hook để tạo tham chiếu ***ref*** cho giá trị. 
- Cuối cùng, dùng ***useEffect*** để ghi nhớ giá trị mới nhất.

Ví dụ, triển khai một counter:
![](https://images.viblo.asia/364758e2-0f69-477c-9648-d99577e6864f.png)

## 3. useClickInside
Nếu bạn xử lý sự kiện click inside vào các components được bọc thì ***useClickInside*** hook là một lựa chọn phù hợp. 
- Đầu tiên, tạo một custom hook nhận tham chiếu ***ref*** và ***callback*** để xử lý ***click event***. 
- Sau đó, sử dụng ***useEffect*** để ***append*** và ***"xóa"*** event click.
- Cuối cùng, chúng ta sử dụng ***useRef*** để tạo tham chiếu cho component được click và chuyển nó vào ***useClickInside*** hook.

![](https://images.viblo.asia/3f167ba2-fd36-4ceb-8e6f-d144f81c6a71.png)

## 4. useClickOutside
***useClickOutside*** hook khá giống với ***useClickInside*** hook nhưng nó thực hiện việc click bên ngoài một component được bọc chứ không phải bên trong. Vì vậy, một lần nữa, chúng ta
- Tạo một custom hook lấy tham chiếu ***ref*** và ***callback*** để xử lý ***click*** event.
- Sau đó, sử dụng ***useEffect*** để ***append*** và ****"dọn dẹp"**** click event. 
- Kết thúc, sử dụng ***useRef*** để tạo tham chiếu cho component và ***chuyển nó vào*** ***useClickOutside*** hook.

![](https://images.viblo.asia/722ce8bb-68a6-4919-b0eb-39dd8ad3b2b3.png)

## 5. useFetch
***useFetch*** hook có thể được sử dụng để thực thi ***fetch*** theo cách `khai báo`. 
- Đầu tiên, sử dụng ***useState*** để khởi tạo các biến ***response*** và ***error state***.
- Sử dụng ***useEffect*** để ***gọi*** fetch và ***cập nhật*** trạng thái `không đồng bộ`. 
- Sau cùng trả về một object có `chứa` các biến response/error.

Ví dụ, fetch một character từ Star Wars API và hiển thị name của nó:
![](https://images.viblo.asia/56069611-cc22-4093-b4e3-09a7ba01f154.png)

## 6. useInterval
Nếu bạn muốn triển khai ***setInterval*** theo cách `khai báo`, bạn có thể sử dụng hook được gọi là ***useInterval***.
- Đầu tiên, tạo một custom hook nhận ***callback*** và ***delay***. 
- Sử dụng ***useRef*** để tạo ***ref*** cho ***callback***. 
- Cuối cùng, dùng ***useEffect*** để `ghi nhớ` callback gần nhất và `thiết lập` khoảng thời gian cũng như dọn dẹp.

Ví dụ cho thấy một triển khai cho custom ResourceCounter có thể được sử dụng trong một browser game.
![](https://images.viblo.asia/d8d8d320-cc61-4e46-a337-9a26216c1c03.png)

## 7. useComponentDidMount
Hook này là một ví dụ nhỏ về cách thực hiện `callback` ngay sau khi một component được ***mounted***. Đối với đối số thứ hai, chúng ta chỉ cần sử dụng ***useEffect*** với một ***array trống*** để thực hiện callback được cung cấp ngay khi component được gắn.

![](https://images.viblo.asia/a9b7fae1-0a52-46f0-8613-9ebe94a08170.png)

## 8. useComponentWillUnmount
***useComponentWillUnmount*** tương tự như ví dụ trên nhưng sẽ thực hiện callback ngay sau khi component được ***unmounted***. Vì vậy, chúng ta sử dụng lại ***useEffect*** với một ***array trống*** làm ***đối số thứ hai*** để thực hiện callback đã cung cấp ngay trước khi dọn dẹp.

![](https://images.viblo.asia/33a4f533-67cf-45a4-af68-1d6484b77d09.png)

### Tham khảo
[8 Awesome React Hooks](https://medium.com/better-programming/8-awesome-react-hooks-2cb31aed4f3d)