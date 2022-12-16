Chào các bạn, đã lâu lắm rồi mình mới trở lại với series hướng dẫn bắt đầu phát triển iOS Apps với ngôn ngữ swift.
Ở phần này chúng ta sẽ cùng nhau tạo một màn hình mới, hiển thị list các món ăn và kết quả vote của chúng base trên table view. Màn hình này sẽ được hiển thị như là màn hình đầu tiên lúc vào app.
Chúng ta sẽ thiết kế custom table cell để hiển thị mỗi món ăn như thiết kế dưới đây:

![](https://images.viblo.asia/f1803e7d-32a9-4064-b435-6934931578fd.png)

Trong phần 6.1 này chúng ta sẽ học được các kiến thức dưới đây
* Tạo được màn hình storyboard thứ 2
* HIểu được các thành phần cơ bản của table view
* Tạo và thiết kết custom table view cell

# Tạo List các món ăn
Tới phần 5, chúng ta mới có một màn hình view duy nhất hiển thị chi tiết cho một món ăn. Đây là thời điểm thích hợp để tự mình thêm một màn hình nữa để hiển thị list tất cả các món ăn và xử lý của các thành phần trong màn hình ấy. 
Ngon nghẻ là iOS có sẵn cho chúng ta một class thiết kế riêng cho việc hiển thị một list các items và cho phép scroll màn hình list items ấy, đó là class `UITableView`. Một table view được quản lý bởi table view controller (tương ứng với class `UITableViewController`).  `UITableViewController` thì lại là một subclass của `UIViewController` được thiết kế riêng biệc cho xử lý các logic liên quan tới table view. Và nhiệm vụ của chúng ta sẽ là tạo một màn hình mới sử dụng table view controller này.

**Để thêm một màn hình với table view vào storyboard **

1. Mở `storyboard` , `Main.storyboard `
2. Mở [Object library](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/GlossaryDefinitions.html#//apple_ref/doc/uid/TP40015214-CH12-SW54) (View > Utilities > Show Object Library)
3. Tìm `Table View Controller object`
4. Kéo thả nó vào bên trái của màn hình hiện tại ta sẽ được 2 màn hình như dưới đây:
![](https://images.viblo.asia/1be0376c-a7e5-472f-bc42-5b7f679eee5f.png)
Tiếp theo chúng ta sẽ cần chỉ cho Xcode biết phải hiển thị màn hình này ngay đầu tiên khi vào app

**Set màn hình list món ăn trở thành màn hình khởi đầu của app**
1. Kéo [storyboard entry point](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/GlossaryDefinitions.html#//apple_ref/doc/uid/TP40015214-CH12-SW66) từ màn hình chi tiết của món ăn sang màn hình list món ăn

Trước khi kéo

![](https://images.viblo.asia/0ec4a78b-95ec-43fe-86ff-12690d2a7c5c.png)

Sau khi kéo

![](https://images.viblo.asia/2b3dcc07-2b42-4dd4-9151-817022a63bf7.png)

Kết quả sau khi chúng ta chạy app

![](https://images.viblo.asia/c9ef15ab-155e-40a5-8e7d-b95c7da4d035.png)

Thay vì nhìn thấy màn hình với ảnh món ăn, text, ảnh sao vote như phần trước, chúng ta chỉ thấy có mỗi một màn hình trắng với các đường kẻ ngang phân định các cell của table view. Tuy nhiên chẳng có nội dung gì trong các cell ấy cả.
Chúng ta cần thay đổi một chút setting trong table view này để có thể sử dụng được nó trong app của mình.

**Cách config table view**
1. Ở storyboard, mở [outline view](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/GlossaryDefinitions.html#//apple_ref/doc/uid/TP40015214-CH12-SW56) và mở rộng phần [uitility area](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/GlossaryDefinitions.html#//apple_ref/doc/uid/TP40015214-CH12-SW72)
2. Chọn Table View
Table View sẽ nằm trong Controller Scene > Table View Controller.
![](https://images.viblo.asia/42d3150d-551a-4c55-9d90-530f4cce6171.png)
3. Mở `Size inspector` ở utility area
4. Set cho Row Height là 90

Tiếp theo đó chúng ta sẽ đi config cho thành phần cơ bản nhất trong table view, đó là các Cells.

# Thiết kế Custom Table Cells

Mỗi hàng trong table view được quản lý bởi một table view cell (`UITableViewCell`). Mỗi cell sẽ được định sẵn một vài thuộc tính hay style, tuy nhiên, vì chúng ta cần phải custom theo yêu cầu hiển thị nội dung liên quan tới các món ăn nên cần phải thêm vào và định nghĩa các style mới.

**Tạo subclass của UITableViewCell**
1. Mở rộng `Navigator area` và mở `Project navigator`.
2. Chọn File > New > File (hoặc ấn Command-N).
3. Ở top của dialog chọn iOS.
4.  Chọn Cocoa Touch Class, và click Next.
5. Ở Class field, gõ Meal.
6. Ở mục  “Subclass of”, chọn UITableViewCell.
7. Đảm bảo Language option là Swift.
8. Click Next.
9. Ở Targets section, đảm bảo app của mình được chọn và phần the tests cho app không được chọn
10. Click Create.
Xcode sẽ tạo một file định nghĩa `MealTableViewCell` class là `MealTableViewCell.swift`.
11. Ở Project navigator, sửa lại vị trí của MealTableViewCell.swift file nằm dưới các Swift files khác nếu cần thiết

Giờ chúng ta mở lại storyboard một lần nữa

![](https://images.viblo.asia/e89ef672-8cda-4c65-9763-d14ee9585a1d.png)

Cell được hiển thị này sẽ là prototype cell cho bảng của chúng ta. Chúng ta có thể design và định nghĩa các thuộc tính cho cell đó. Table có thể tạo ra instances của cell này. Tuy nhiên đầu tiên chúng ta phải kết nối `table view cell` ở màn hình và `custom cell class` mình vừa tạo ra cái đã.

**Config a custom cell cho table view**

1. Ở outline view, chọn `Table View Cell` (Table View Controller Scene > Table View Controller > Table View)
2. Mở [Attributes inspector](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/GlossaryDefinitions.html#//apple_ref/doc/uid/TP40015214-CH12-SW19) ở utility area.
3.Tìm trường `Identifier` và gõ `MealTableViewCell`. ấn Enter.
Chúng ta sẽ sử dụng identifier này để tạo instances từ prototype cell
4. Mở `Size inspector`
5. Set Row Height là 90. Đảm bảo Custom checkbox gần trường này được check.
Ấn Enter để hiển thị chiều cao mới được set trên storyboard.

![](https://images.viblo.asia/0fa9e102-70d9-4012-b53e-336f28083856.png)

6. Mở `Identity inspector`

Gọi Identity inspector cho phép bạn edit các properties của một object trong storyboard, như là object thuộc class nào chẳng hạn
7. Tìm trường Class và chọn `MealTableViewCell`

![](https://images.viblo.asia/4002735a-b024-4add-8f85-bed2b7938644.png)

**Thiết kế giao diện cho custom table cell**
1. Dùng Object library để tìm Image View object và kéo thả nó vào table cell
2. Kéo và resize cho nó thành một hình vuông ở góc trái

![](https://images.viblo.asia/b9470d6d-233d-41d5-af27-ff716a33cc38.png)

3. Với image view được chọn mở Attributies inspector 
4. Ở trường Image chọn `defaultPhoto` mà chúng ta đã thêm vào ở bài trước

![](https://images.viblo.asia/de31bb7d-1ed2-4cd3-a707-80e4f90b15e4.png)

5. Tìm Object library và kéo Label vào

![](https://images.viblo.asia/ea24951a-d011-46e9-ae30-dec0418169a5.png)

7. Resize sao cho cạnh bên phải của lable tiệm cận với cạnh phải của margin

![](https://images.viblo.asia/5a78f746-b54b-4c58-a448-05aa05c09150.png)

8. Thêm `Horizontal Stack View object` vào để chứa các sao vote
9. Set size cho nó là 44 chiều cao và 252 chiều rộng.
10. Kéo stack đó vào table cell

![](https://images.viblo.asia/226f625d-a88d-461a-80be-ab03af22cdb4.png)

11. Vào Identity inspector và setting cho Class giá trị là `RatingControl`

![](https://images.viblo.asia/259f534d-2bb6-4bcb-8217-98a981e5c3fb.png)

12. Mở Attributes inspector và set Spacing là 8, bỏ select ở `User Interaction Enabled` checkbox bởi vì chúng ta sẽ chỉ cho phép user nhìn thông tin tổng quát, chứ ko thể edit giá trị vote này. Muốn edit thì user cần vào màn hình chi tiết của món ăn.

![](https://images.viblo.asia/5d563234-e8d6-4cbd-85b1-9742b1dd5cb2.png)

Giờ là lúc chạy thử app

![](https://images.viblo.asia/cb1963a6-02b0-4828-9755-e75dd51bed3c.png)

Và kết quả y như lúc đầu. Vẫn trắng trơn (yaoming)
Tại sao vậy?
Ở trong storyboard, bạn có thể config cho table view hiển thị static data (cung cấp trong storyboard) hoặc dynamic data (được chỉ định bằng source code trong table view controller). Mặc định table view controller sẽ sử dụng dynamic data. Điều đó có nghĩa là giao diện chúng ta vừa thiết kế đơn giản chỉ là prototype cho cell của bạn trên storyboard mà thôi. Bạn vẫn cần phải  tạo thêm instances của cell và fill dữ liệu vào đó cho nó hiển thị.
Tuy nhiên ta vẫn có thể xem trước được cách nội dung sẽ được hiển thị.

**Cách xem trước (preview) interface**
1. Mở assistant editor.

![](https://images.viblo.asia/b7d43804-5779-4383-9473-a64b9f5f6ead.png)

2. Chuyển chế độ từ Automatic sang Preview > Main.storyboard (Preview).

![](https://images.viblo.asia/9e7912b3-5094-427c-a6a6-fbdac1514be7.png)

3. Ta sẽ có kết quả preview như dưới. 

![](https://images.viblo.asia/de85fc6a-2dc2-4d08-961c-6db96fd0b6e2.png)

Như các bạn thấy, phần rating control không được hiển thị ra ở preview nhưng nhìn sơ lược chúng ta vẫn có thể thấy được cấu trúc cơ bản trong cell.

**Cách thêm ảnh sample vào trong project**

Phần này khá tương tự những hướng dẫn thêm ảnh vào project ở phần trước nên mình sẽ hướng dẫn lướt qua thôi.
1. Mở assistant editor
2. Ở project navigator, chọn `Assets.xcasstes`
3. Ở góc trái phía dưới ấn nút dấu + để thêm folder
4. Đặt tên folder mới là `Sample Images`
5. Click tiếp vào dấu + để thêm set ảnh từ pop-up menu
6. Chọn các ảnh cần upload
7. Kéo thả vào 2x slot
Lặp lại các bước 5-7 để upload 3 ảnh vào folder như dưới đây.

![](https://images.viblo.asia/90ea66c4-39d8-49c1-83a2-1cda9a57b327.png)

# Tổng kết
Tới đây chúng ta đã thu thập được đầy đủ các kiến thức như phần mở đầu đã đề ra là
* Tạo được màn hình storyboard thứ 2
* HIểu được các thành phần cơ bản của table view
* Tạo và thiết kết custom table view cell

Ở phần tiếp theo 6.2 chúng ta sẽ cùng tìm hiểu thêm về
* Vai trò của table view delegate và nguồn dữ liệu cho table view
* Sử dụng mảng để lưu và làm việc với dữ liệu
* Hiển thị dynamic data ở table view.