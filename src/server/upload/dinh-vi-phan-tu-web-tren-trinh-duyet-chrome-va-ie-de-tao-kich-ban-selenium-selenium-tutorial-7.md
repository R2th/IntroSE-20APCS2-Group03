Trong những bài hướng dẫn trước, chúng ta đã có những cách để xác định phần tử web trên trình duyệt Firefox như ID, Classes, Xpaths, Link texts, CSS Selectors... để hỗ trợ tạo ra kịch bản test với Selenium. Tuy nhiên do nhu cầu của người sử dụng internet và sự đa dạng của các trình duyệt, nên các ứng dụng cũng sẽ linh hoạt hơn để đáp ứng điều này. Trong bài hướng dẫn hôm nay, chúng ta sẽ mở rộng ra các trình duyệt phổ biến khác là Chrome và Internet Explorer - IE để xác định các phần tử nhằm hỗ trợ tạo Script Selenium.

## Locate các phần tử web với trình duyệt Google Chrome

Tương tự như trình duyệt Firefox sử dụng add-on Firebug để xác định vị trí của các phần tử Web. Google Chrome cũng có công cụ riêng để làm nhiệm vụ này. Tuy nhiên có một điểm khác biệt, người dùng không cần tải và cài đặt trên trình duyệt do nó đã được nhà cung cấp tích hợp sẵn trong bộ cài Google Chrome.

### Xác định phần tử trên Google Chrome

**1. Bước 1**: Khởi động tool của Google Chrome bằng cách nhấn phím F12 và màn hình sẽ hiển thị như sau.

![](https://images.viblo.asia/70c723ee-d89d-4781-b575-8915ecd44ec0.png)

Trên màn hình, tab "Element" sẽ được highlight và hiển thị tất cả thông tin các phần tử HTML của trang web hiện tại. 

Ngoài cách sử dụng phím F12, người dùng có thể click chuột phải vào bất kỳ phần tử nào trên trang và chọn "Inspect Element" - thao tác này cũng tương tự như với Firebug.

**2. Bước 2**: Định vị phần tử web. Click vào mũi tên trên màn hình và di chuột đến phần tử cần xác định. Thông tin thuộc tính HTM của phần tử web phù hợp sẽ được highligh. Chúng ta có thể định vị bằng ID, Class, Link...

### Tạo Xpath trong Developer tool.

Ở những bài trước chúng ta đã thảo luận và hướng dẫn về các loại và cách tạo ra các Xpath, nên ở bài này chúng ta sẽ kiểm tra tính hợp lệ của Xpath tạo ra với công cụ của Google Chrome.

**1. Bước 1**: Để tạo Xpath, chúng ta sẽ mở tab Console

**2. Bước 2**: Tạo ra Xpath như cách thông thường, tuy nhiên với Chrome sẽ thêm "$x(Xpath)". Ví dụ $x("//input[@id='regacc_fullname']").

![](https://images.viblo.asia/493c7e3b-2691-407f-a1f2-4d6193023bc4.png)

**3. Bước 3**: Nhấn Enter để xem tất cả các phần tử HTML phù hợp với Xpath ở bước 2. Trường hợp tìm được chính xác 1 phần tử duy nhất, khi di chuột vào phần tử đó trên file HTML thì phần tử web tương ứng sẽ được đánh dấu trên trang web.

![](https://images.viblo.asia/6dacdcde-4c23-404c-84f3-12dee0269320.png)

Với cách này, tất cả các Xpath được tạo và kiểm tra tính hợp lý ngay trên màn hình Console.

Mọi thông tin liên quan tới CSS tương ứng với từng phần tử web có thể tìm thấy trong công cụ của Chrome.

![](https://images.viblo.asia/f31645c1-5b2d-43cf-8f8a-afa2b9505749.png)

## Locate các phần tử web với trình duyệt Internet Explorer - IE.

Tương tự như Google Chrome, Internet Explorer cũng có công cụ để xác định vị trí của phần tử web. Người dùng sẽ không phải tải và cài đặt bất cứ 1 ứng dụng hay plug-in nào để sử dụng, tất cả đã được xây dựng cũng như tích hợp sẵn trong trình duyệt IE.

### Xác định phần tử trên IE - Internet Explorer

**1. Bước 1**: Khởi động tool của Internet Explorer bằng cách nhấn phím F12 và màn hình sẽ hiển thị như sau.

![](https://images.viblo.asia/e73be967-e086-4d72-a24b-89118389582d.png)

Trên màn hình, tab "Element" sẽ được highlight và hiển thị tất cả thông tin các phần tử HTML của trang web hiện tại. Có thể mở rộng tab HTML để xem thông tin thuộc tính của các phần tử trên trang web.

**2. Bước 2**: Là bước định vị phần tử mong muốn. Cách thứ nhất: chọn phẩn tử HTML và phần tử tương ứng sẽ được highlight lên. Do đó với cách này, người dùng có thể xác định được ID, Class, Link...

![](https://images.viblo.asia/8e783bc0-ded1-43bb-bff2-045422735333.png)

Cách thứ hai: để xác định phần tử web, người dùng sẽ click vào nút "Find" trên menu hoặc icon chuột và click vào phần tử mong muốn trên trang web hiện tại. Thuộc tính HTML tương ứng với phần tử đó sẽ được highlight.

![](https://images.viblo.asia/e034f3e1-0f2f-477b-8d6f-f5ff140f5169.png)

Như vậy, bằng cách sử dụng tool này, người dùng có thể tìm ra được ID, Class, Tag name và tạo ra các Xpath để xác định phần tử web.

Cũng tương tự như công cụ của Chrome, tool của IE có một màn hình riêng để hiển thị thông tin liên quan đến CSS.

![](https://images.viblo.asia/e1580284-3342-49f2-8e3f-1db4023aea43.png)

## Tổng kết

Trong bài hướng dẫn này, chúng ta đã cùng tìm hiểu và làm rõ với nhau về cách định vị các phần tử web trên các trình duyệt Google Chrome và Internet Explorer

Nguồn bài viết: https://www.softwaretestinghelp.com/locate-elements-in-chrome-ie-selenium-tutorial-7/