Để tiếp nối chủ đề " Automation test mà không cần code" thì hôm nay mình sẽ viết tiếp phần 2. Bạn có thể đọc lại phần 1 nếu quan tâm nha: [Automation test mà không cần code (Phần 1)](https://viblo.asia/p/automation-test-ma-khong-can-code-3P0lP3mbZox)

Trong phần 2 này mình sẽ giới thiệu cho các bạn về :

:bowing_man: Xử lý điều kiện trong Selenium IDE


### Xử lý điều kiện trong Selenium IDE

Nếu như phiên bản cũ của Selenium vào những năm trước thì chúng ta không thể nào sử dụng được các câu điều kiện như if - else và những trường hợp phức tạp như vòng lặp for,  while - repeat if hoặc 1 số những điều kiện khác. Mà một dự án Automation testing thì thực sự rất cần sử dụng những điều kiện này, tại vì chúng ta không thể nào xử lý các hard flow suốt được mà có nhiều trường hợp hoặc để tối ưu hóa thì ta phải cần dùng đến các điều kiện.

Selenium IDE kết hợp với tool thì đã cho ra đời phiên bản rất thông minh như hiện nay, đó là Selenium 2021

Vậy làm sao để xử lý điều kiện như if - else trong Selenium 

**Bài toán**: Trong 1 số dự án thường sẽ có các popup hiện lên bất ngờ, những trường hợp như vậy thì các bạn phải verify popup đó hoặc tắt nó đi để làm việc tiếp. Đối với trường hợp đó thì chúng ta phải đưa vào xử lý if - else. Bây giờ chúng ta cùng đi tìm hiểu xem làm sao để có thể xử lý trường hợp này bằng Selenium IDE nha các bạn.

Trang web mình demo lần này vẫn là: https://the-internet.herokuapp.com/

Mở dự án Entry Ad => verify trang web sau khi click vào link "Elemental Selenium"

![](https://images.viblo.asia/d0a39418-8c5c-43f3-99d2-dfa44ab87359.PNG)
Khi đó sẽ mở ra trang demo, lần đầu sẽ hiển thị 1 popup lên trên giao diện. Cơ chế hoạt động của popup này là lần đầu hiển thị, nếu tắt đi thì phải bấm hyperlink "click here" thì mới hiển thị popup lần nữa.

![](https://images.viblo.asia/01734c5a-1022-471c-a3af-9024856c0295.PNG)


Bạn mở Selenium IDE và tạo mới 1 project rồi đặt tên cho nó, tại đây mình đặt là "Control Popup"
![](https://images.viblo.asia/8359dea9-e6db-4582-9080-90adb822abbf.PNG)

Trong project tạo mới 1 test case để xử lý điều kiện đặt tên là "Condition"

![](https://images.viblo.asia/044cb776-ab42-4db4-ac7a-03f5800540f0.PNG)

Truyền url cần test vào ô textbox base url
![](https://images.viblo.asia/068882a8-ca52-4593-afe2-86d392424d93.PNG)

Thêm hàm Open và target là" /entry_ad" để mở trang cần test.  Việc này có ý nghĩa là nếu cần test 1 trang khác trong cùng 1 url thì chỉ cần thay đổi target cần test là chúng ta có thể sử dụng được mà không cần thay đổi cả Base URL

Bây giờ chúng ta bắt đầu record test case và verify kết quả
![](https://images.viblo.asia/26803f5f-6d9a-4e6c-85bf-f32d9f297541.png)
{@embed: https://www.youtube.com/watch?v=G266p7ysV14}

Tuy nhiên vẫn chưa giải quyết được bài toán. Yêu cầu đặt ra cần check nếu hiển thị popup thì phải tắt đi, sau đó mới bấm vào hyperlink "Elemental Selenium"

Tại đây ta thêm điều kiện if => tuy nhiên để selenium ide đọc được thì ta cần 1 đoạn javascript như sau


`document.querySelector('#modal')&&document.querySelector('#modal').offsetHeight!==0`


Bạn nào k biết javascript cũng không sao, bạn chỉ cần hiểu #modal - là gọi class modal => đoạn javascript có ý nghĩa là kiểm tra xem có popup với class modal trong page hay không và modal đó có đang show lên trên màn hình hay không?

![](https://images.viblo.asia/3cfd7e6b-0cf6-42ad-8e9c-bb941964e5fd.png)
![](https://images.viblo.asia/f1a5cc75-abaa-46cc-8893-5db8a1d0a648.PNG)
Để mình chạy lại cho các bạn xem nha
{@embed: https://www.youtube.com/watch?v=Jd6nqriCdyw}


Bài tiếp theo mình sẽ viết về cách Debug trong Selenium IDE. Mời các bạn đón đọc nhé