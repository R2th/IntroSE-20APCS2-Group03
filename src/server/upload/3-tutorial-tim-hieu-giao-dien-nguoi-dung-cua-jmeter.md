Trong 2 bài chia sẻ trước, mình có tìm hiểu về [Giới thiệu tổng quan về JMeter](https://viblo.asia/p/tu-hoc-kiem-thu-tu-dong-voi-jmeter-ep1-gioi-thieu-tong-quan-ve-jmeter-3P0lPYqp5ox) và [Tìm hiểu các element trong JMeter](https://viblo.asia/p/tu-hoc-kiem-thu-tu-dong-voi-jmeter-ep2-tim-hieu-cac-element-trong-jmeter-maGK7q9alj2). Trong bài viết này, chúng ta sẽ tập trung vào tìm hiểu về  **Test Plan** . Chúng ta sẽ đi vào tìm hiểu làm thế nào để thêm, xóa, element trong JMeter, làm thế nào để tải lên và lưu các element đó. Cùng với đó, chúng ta tìm hiểu làm thế nào để config JMeter element. Cuối cùng là lưu một Test Plan, chạy và dừng test trong JMeter. 

Với JMeter 4.0, sau khi cài đặt và mở JMeter, chúng ta sẽ có giao diện như sau:<br>

![](https://images.viblo.asia/35e54d33-99ad-44e7-a4d4-481af7fd87c7.JPG)
*Apache JMeter 4.0*

## 1. Test Plan là gì?

Test Plan là nơi thêm các Element yêu cầu cho JMeter test của bạn. Các Element đó bao gồm: <br>
* Thread Groups
* Logic controllers
* Sample generating controllers
* Listeners
* Timers
* Assertions
* Config elements.

## 2. Làm thế nào để add Element?

Thêm các Element là bước thiết yếu để xây dựng một Test Plan vì nếu không thêm Element, JMeter không thể thực thi Test Plan. 

Một Test Plan bao gồm nhiều Element ví dụ như Listener, Controller và Timer
Bạn có thể thêm một Element vào Test Plan bắng cách click chuột phải vào Test Plan và chọn Element mới từ "Add" list.

Ví dụ, bạn muốn thêm 2 Element vào Test Plan là "Graph Result" và "HTTP Request Defaults":
* Right click Test Plan -> Add -> Listener -> Graph Result
* Right click Test Plan -> Add -> Config Elements -> HTTP Request Defaults


![](https://images.viblo.asia/f1363cf4-2f2f-45f8-95b3-6d45af8efcc8.png)
*Add Element*

<br>
Bạn cũng có thể remove những element không cần sử dụng đến ví dụ như "HTTP Request Defaults" bằng cách:
Chọn element "HTTP Request Defaults" -> Right click -> Chọn "Remove" -> Chọn "Yes"

## 3. Loading và Saving Element
* Loading Element

Để load element từ file có sẵn, chọn 1 element từ cây Test Plan hiện tại cái mà bạn muốn load một element khác thêm vào -> Right click -> Chọn "Merge" -> Chọn file từ một Elements đã được save ở ngoài. JMeter sẽ merge element đó vào cây Test Plan. <br>

![](https://images.viblo.asia/e0367db1-fe3e-4f6e-9936-e090d6169ad8.JPG)
*Load Element*

* Saving Element

Để save element, chọn element muốn save từ cây Test Plan -> right click -> Chọn “Save Selection As…”. JMeter sẽ lưu element được chọn và tất cả các phần tử con bên dưới nó. 

Khi lưu element, nó sẽ được lưu với tên mặc định của element đó ví dụ như "HTTP Request Defaults.jmx". Bạn có thể giữ nguyên hoặc chỉnh sửa tên trước khi lưu.

![](https://images.viblo.asia/93938dfd-2990-48d2-914b-a4203235a794.JPG)
*Saving Element*
## 4. Làm thế nào để Configure Element

Để config bất cứ element nào, làm theo các bước sau:
1. Click chọn Element trong Test Plan
2. Cài đặt config cho element đó ở cửa sổ bên phải


![](https://images.viblo.asia/15803798-4f9f-4d74-9814-7e0d8b39e0d3.JPG)
*Config Element*
## 5. Làm thế nào để lưu Test Plan

Trước khi chạy test, đầu tiên, bạn nên lưu Test Plan. Lưu Test Plan giúp bạn tránh các lỗi không mong muốn when đang chạy test plan. 
1. File -> Save Test Plan as-> một hộp thoại xuất hiện
2. Nhập tên file Test Plan ->click Save


![](https://images.viblo.asia/551e3240-1db9-4da2-ac8e-9c113934f24a.JPG)
*Save Test Plan*

Lưu ý: Lưu Test Plan khác so với lưu Element

| Lưu Test Plan | Lưu Test Element | 
| -------- | -------- | 
| Test Plan chứa 1 hoặc nhiểu Element     | Element chỉ là một  yếu tố cơ bản của JMeter    | 
| Khi  lưu Test Plan, tất cả các Element trong Test Plan sẽ được lưu     | Khi lưu Element thì chỉ Element đó được lưu   | 

## 6. Run Test Plan
* Khi chạy một hoặc nhiều Test Plan, click vào Start( Ctrl + R) từ Run menu 

![](https://images.viblo.asia/d3b177ac-07a7-491a-939d-ba133c516cbb.JPG)
*Start run Test Plan*
<br>

* Để stop run test, click Stop button (Ctrl + '.' )

![](https://images.viblo.asia/1257fc4b-8f56-4569-bdd3-28ce221d55a6.JPG)
*Stop run Test Plan*


Như vậy, chúng ta đã tìm hiểu được các thành phần và thao tác cơ bản với Test Plan trên giao diện của Apache JMeter. Trong bài chia sẻ tiếp theo, mình sẽ tìm hiểu cách để thực thi test performace với JMeter.

**Tham khảo:**<br>
https://www.guru99.com/hands-on-with-jmeter-gui.html
https://www.softwaretestingclass.com/hands-on-with-jmeter-tutorial-series-4/