# Elements tool (element inspector)
## Cấu trúc
Tool đầu tiên mình muốn giới thiệu với mọi người là `Elements tool`. Một tool cực kỳ quan trọng trong các `devtools`
![](https://images.viblo.asia/1477d68c-5841-4b9f-ad88-8bdc164cb263.PNG)
Có gì ở đây mà nó lại quan trọng thế? :thinking:

Đây là nơi thể hiện của cấu trúc dữ liệu DOM của trang web và được mô hình hóa bằng một cấu trúc dạng cây.

Elements tool gồm 2 phần:
- Phần element: các thẻ và thuộc tính, dữ liệu
- Phần tool: các element.style, các sự kiện trên element, các thông tin được áp dụng cho thẻ, các thuộc tính của thẻ,..
## Sử dụng
### Element
Phần cấu trúc dữ liệu dạng cây của thẻ được chia thành cấu trúc nút HTML
Theo tiêu chuẩn DOM W3C HTML, mọi thứ trong tài liệu HTML là một nút:
- Toàn bộ tài liệu là một nút tài liệu
- Mỗi phần tử HTML là một nút phần tử
- Văn bản bên trong các phần tử HTML là các nút văn bản
- Tất cả các bình luận là các nút bình luận

ví dụ: ![](https://images.viblo.asia/e90ffef5-e22f-40fd-b566-dc87a321fee6.gif)

Như vậy tất cả  trang web đều được liên kết với các nút làm cho bạn có thể quản lý, tùy chỉnh chúng một cách dễ dàng. 

Cách tìm kiếm một nút từ trang web: 
- Cách 1: Đưa chuột vào phần từ muốn tìm -> chuột phải -> inspect
![](https://images.viblo.asia/fca50ec2-802b-4295-ba1f-096ef7ff9e19.png)
- Cách 2: Ấn  (Ctl + shit + I) hoặc F12 -> Ctr+F -> gõ tên thẻ/ thuộc tính của thẻ/ ![](https://images.viblo.asia/7bcada7b-6e9f-4a05-8cd1-d0331b1ce94a.PNG)
tenthe[thuoctinh="giatri"]  -> Enter để đến thẻ cần tìm nếu có nhiều thẻ.
- Cách 3: click `Select an element` (Ctrl + Shit + C)  click vào vị trí element muốn chọn trên trang web.
- 
![](https://images.viblo.asia/eb484296-1f51-4401-b992-66aa731cb2e8.jpg)

- Cách 4: Dùng tab `Console` gõ document.querySelector('elementName') hoặc bất kỳ câu lệnh script nào trả về element. Enter rồi chuột phải vào kết quả trả về và chọn `Reveal in Elements panel`  

** strick: khi một thẻ được chọn thì sẽ có một dòng cuối cùng trên tab element để thể hiện quan hệ của thẻ với thẻ cha, cha của cha .... Dự vào đây chúng ta có thể đi đến thẻ tổ tiên của nó trong cây :laughing: 
![](https://images.viblo.asia/f016948b-4874-42d1-a19c-3a0efb38a380.PNG)

#### Các thành phần tùy chỉnh:
Với mỗi thẻ thì chúng ta đều có các thành phần đi kèm có thể tùy chỉnh như:
- `Add attribute`, 
-  `Edit attribute`,
- Hay cũng thể edit cả thẻ qua `Edit HTML`, 
- `Delete element`
- `Copy`: thẻ, đường dẫn trong cây,...
- `Force state`: Gắn các sự kiện cho thẻ: active, forcus...
- `Scroll to view`: Đưa đến vị trí thẻ trên trang web
- Break on: Tạo DOM Breakpoints
- `Store as global variable`: Lưu thẻ vào biến để sử dụng cho các `devtools` như `Console`
- .... 
 ![](https://images.viblo.asia/729dfd03-f270-4d35-829b-cd812830214a.png)
 
 
** Note: có thể kéo thả thẻ trong cây để thay cây! (thử xem nhé:upside_down_face:)
### Styles
Là nơi thể hiện CSS của element đang được lựu chọn. Nó được biên dịch từ file CSS. Biên dịch từ trên xuống dưới và khi áp dụng vào trình duyệt sẽ ngược lại (dưới lên trên theo biên dịch CSS).
Các thuộc tính CSS cũng có thể viết thêm vào các phần tử trong HTML, hay có thể tạo 1 "New style rule" mới. Ngoài ra cũng có thể thêm các thuộc tính `Focre element state`: `:active`, `:hover`, ... cho phần tử element.

Ngoài ra khi thay đổi màn hình hay thay đổi trang thái một số element sẽ được cập nhật style và nó cũng hiện ở đây để bạn có thể chỉnh sửa chúng.
** Note: khi bạn muốn copy một style của một element nào đó cần phải copy style từ dưới lên trên để khi biên dịch và chạy đúng :upside_down_face:
### Computed
Các style được áp dụng sẽ thể hiện ở đây với một sơ đồ innerHTML và outterHTML trực quan của phần tử. Chúng ta cũng có thể chỉnh các style inner hay outer ngay trong sơ đồ.

Ở đây các style có thể tìm kiếm dễ dàng qua mũ tên bên cạnh nó (nếu có).
![](https://images.viblo.asia/10c0629b-dc5f-41b5-bea8-11d43aa96df7.png)

### Event Listenners
Các event được định nghĩa trong trang web. Chúng ta có thể remove các event này hoặc edit nó trong tool `Sources`.
![](https://images.viblo.asia/26671692-7e05-4545-9599-b4349ecf741a.PNG)

### DOM Breakpoints
Sử dụng DOM Breakpoints nếu bạn muốn tạm dừng mã thay đổi nút DOM và con của nó.

Cách tạo DOM Breakpoints thì trên element mình đã nói :stuck_out_tongue_winking_eye:

Có 3 loại cơ bản:
- `Subtree modifications`: Kích hoạt khi nút con của nút hiện tại bị thêm, xóa hoặc thay đổi. Không bị kích hoạt khi thuộc tính nút con thay đổi hay thuộc tính của nút hiện tại được chọn thay đổi.
- `Attributes modifications`: Kích hoạt khi một thuộc tính được thêm, xóa hoặc thay đổi trên nút đang chọn.
- `Node Removal`: Kích hoạt khi nút đang chọn bị loại bỏ.

![](https://images.viblo.asia/aeac1014-7daf-4ec6-91c6-da7ec3003f77.PNG)
 Sau khi kích hoạt DOM Breakpoint thì sẽ chuyển sang `Source tool` đang xử lý sự thay đổi của nút đó. (cái này mình sẽ giới thiệu sau trong phần `Source tool`).
### Properties
Nơi thể hiện các thuộc tính đầy đủ nhất của thẻ. Các hàm thuộc tính mà bất kỳ thẻ nào cần phải có.
![](https://images.viblo.asia/a467a7aa-07e5-40d6-9cf7-4c77ffadc40f.PNG)

### Accessibility
Để làm cho trang web của bạn dễ được chấp nhận và thân thiện hơn, điều quan trọng là nó có thể truy cập dễ dàng. Accessibility là công cụ có thể kiểm tra tính khả dụng của trang web.
Bạn có thể tham khảo thêm các tiêu chuẩn ở [w3.org](https://www.w3.org/TR/WCAG20/)
![](https://images.viblo.asia/3c725099-ff53-4ced-b188-6eb78a8525ac.PNG)

# Kết luận
Do một số kiến thức còn yếu nên mình chỉ viết một số phần mình hiểu của `element inspector` nếu có điều gì sai sót mong nhận được comment của mọi người. 
Cảm ơn đã đọc bài viết của mình  :maple_leaf: