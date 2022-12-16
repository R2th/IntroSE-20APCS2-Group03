![](https://images.viblo.asia/08d0407b-a316-42fe-91c0-16bd716dd355.jpeg)

Không quan trọng công cụ bạn sử dụng mạnh đến mức nào trừ khi bạn biết cách sử dụng nó một cách tốt nhất. Chúng ta thật may mắn khi có được một công cụ mạnh như Android Studio nhờ vào Google, tuy nhiên bạn đã biết cách sử dụng nó một cách hiệu quả chưa?

Trong quá trình học cách làm việc hiệu quả với studio, điều đầu tiên tôi học là giảm việc sử dụng chuột trong khi code, vì vậy nội dung chính của bài viết này là về các phím tắt cơ bản mà bất kỳ nhà phát triển Android nào cũng nên biết.
<br><br>

**1. Basic code suggestions**

Bạn không cần phải tự mình viết mọi thứ trong khi sử dụng Android Studio. Ví dụ: khi cần sử dụng TextView thì bạn chỉ cần nhập Text và nhấn Ctrl + Space và Android Studio sẽ đưa ra cho bạn các gợi ý tương ứng, bao gồm cả TextView.

Windows: `ctrl + space`
<br>
Mac: `cmd + space`

<br>

**2. Find anything in the project**

Ví dụ, nếu bạn đang tìm kiếm một class, file layout, drawable, v.v ... bất cứ thứ gì trong dự án chỉ cần nhấn phím shift và nhập tên tệp.

Windows: `double shift`
<br>
Mac: `double shift`

<br>

**3. Import libraries easily**

Ví dụ: khi bạn copy và paste code vào, một số thư viện sẽ không được import do đó gây ra lỗi, bạn chỉ cần đặt con trỏ vào lỗi đó và nhấn alt + enter, nếu có bất kỳ thư viện nào chưa được import thì nó sẽ được import ngay.

Windows: `alt + enter`
<br>
Mac: `option + enter`

<br>

**4. Find anything in the active tab (class, layout, drawable)**

Nhấn **ctrl + F** và nhập những gì bạn cần tìm kiếm, sẽ có mũi tên lên xuống để bạn tìm xem từ bạn cần tìm được xuất hiện bao nhiêu lần trong tab hiện tại.

![](https://images.viblo.asia/0c9f5ce5-5034-4ff0-9b5f-6629b70a7624.png)

Windows: `ctrl + F`
<br>
Mac: `cmd + F`

<br>

**5. Find & Replace anything in active tab**

Nhấn **ctrl + R** sau đó nhập từ cũ -> Nhấn vào nút **Tab** và nhập từ mới -> Nhấn vào **Replace** để thay thế toàn bộ từ cũ bởi từ mới.

Windows: `ctrl + R`
<br>
Mac: `cmd + R`

<br>

**6. Format the code**

Nếu mã của bạn có các khoảng trắng thừa hoặc dòng không đều, chỉ cần nhấn **ctrl + alt + L** để định dạng.

Windows: `ctrl + alt + L`
<br>
Mac: `cmd + option + L`

<br>

**7. Close active tab**

Để đóng tab đang hoạt động, nhấn **ctrl + F4**.

Windows: `ctrl + F4`
<br>
Mac: `cmd + w`

<br>

**8. Go to specific line number**

Nhấn **ctrl + G** và nhập số dòng rồi ấn **enter** để nhảy đến dòng đó.

Windows: `ctrl + G`
<br>
Mac: `cmd + L`

<br>

**9. Return to editor window**

Android Studio thường hiển thị các gợi ý trong một `tool window`, sẽ có lúc bạn muốn ẩn cửa sổ đó và quay lại trình chỉnh sửa, khi đó bạn chỉ cần ấn **Esc**.

Windows: `Esc`
<br>
Mac: `Esc`

<br>

**10. Jump to source**

Nếu bạn muốn xem mã nguồn của một file resource (string, drawable, color, ...) chỉ cần nhấn **ctrl + chuột trái** vào resource đó. Ví dụ:

![](https://images.viblo.asia/5931edd1-9768-471c-9b46-a4dc3cf36421.gif)

Windows: `alt + chuột trái`
<br>
Mac: `cmd + mũi tên xuống`

<br>

**11. Move between tabs**

Để chuyển giữa các tab, nhấn **alt + mũi tên phải / trái** dựa vào phía mà bạn muốn chuyển.

Windows: `alt + mũi tên trái / phải`
<br>
Mac: `cmd + mũi tên trái / phải`

<br>

**12. Move between Design / Text tabs**

Trong file layout của mình, nếu bạn muốn chuyển giữa định dạng text hay design thì chỉ cần nhấn **alt + shift + mũi tên trái / phải**.

Windows: `alt + shift + mũi tên trái / phải`
<br>
Mac: `cmd + mũi tên trái / phải`

<br>

**13. New window**

Nhấn **shift + F4** để mở tab đang chọn trên một cửa sổ mới.

Windows: `shift + F4`
<br>
Mac: `shift + F4`

<br>

**14. Show/Hide line numbers**

Nhấp chuột phải vào cạnh trái của trình chỉnh sửa, một popup sẽ được hiện lên với lựa chọn "Show line number":

![](https://images.viblo.asia/5ae9530b-550b-4b08-ba58-38203a98d9dc.gif)

<br>

**15. Increase and Decrease character size in editor**

Chọn **File -> Settings -> General**.

Sau đó, bạn sẽ thấy tùy chọn thay đổi kích thước phông chữ bằng **Ctrl + Mouse Wheel**.

<br>

**16. Move hardcoded strings to resources**

Đặt con trỏ chuột vào hardcoded string của bạn và nhấn **alt + enter**, cửa sổ Extract Resource sẽ mở ra và bạn cần nhập vào tên cho chuỗi string đó trong file resource:

![](https://images.viblo.asia/e29a5d92-f178-49d0-9849-de2615c2eff3.gif)

Windows: `alt + enter`
<br>
Mac: `cmd + N`

<br>

**17. Collapse Method Body**

Khi thời gian trôi qua, dự án của bạn sẽ phình to ra, cả số lượng phương thức trong các class cũng vậy. Trong những lúc như vậy, thật khó để xem hết một file code. Và khi đó, tip này thực sự là cứu tinh của bạn, để thu gọn một phương thức cụ thể nhấn **ctrl + minus** và để thu gọn tất cả các phương thức nhấn **ctrl + shift + minus**.

Phương thức cụ thể:
<br>
Windows: `ctrl + minus`
<br>
Mac: `cmd + minus`

Tất cả các phương thức:
<br>
Windows: `ctrl + shift + minus`
<br>
Mac: `cmd + shift + minus`

<br>

**18. Expand Method Body**

Ngược lại với tip ở trên, sau khi bạn đã thu gọn các phương thức là mà muốn mở rộng lại chúng ra, hãy làm theo cách sau.

Phương thức cụ thể:
<br>
Windows: `ctrl + plus`
<br>
Mac: `cmd + plus`
<br>

Tất cả các phương thức:
<br>
Windows: `ctrl + shift + plus`
<br>
Mac: `cmd + shift + plus`

<br>

**19. Usage of REGION in Studio**

Một công cụ mạnh mẽ hơn để thu gọn code thuận tiện cho việc quản lý, thay vì thu gọn chỉ trong mức phương thức như trên thì bạn có thể chia file code của mình thành các vùng (region) có liên quan đến nhau. Xem ví dụ để hiểu rõ hơn:

![](https://images.viblo.asia/1f9fd578-d0e5-4c99-8623-b67cd825d46e.gif)


<br>

**20. Choose from the last copy/pastes (manage your clipboard)**

Nhấn **ctrl + shift + v** để mở cửa sổ quản lý clipboard (lưu lại tối đa 5 lệnh):

![](https://images.viblo.asia/6296581b-da15-46eb-861d-84f2496a3ad7.gif)

Windows: ctrl + shift + V
<br>
Mac: cmd + shift + V

<br>

**21. Override methods**

Để ghi đè các phương thức cho một class, nhấn **ctrl + O** khi con trỏ chuột đang ở trong class đó.

Windows: `ctrl + O`
<br>
Mac: `ctrl + O`

<br>

Đây là các tip khá cơ bản mình sử dụng khi lập trình với Android Studio. Bài viết tiếp theo sẽ là các tip nâng cao hơn một chút.

Chúc các bạn một ngày vui vẻ và có được nhiều thông tin hữu ích.

Nguồn: https://medium.com/android-dev-hacks/android-studio-tips-tricks-for-beginners-703bc9a36259