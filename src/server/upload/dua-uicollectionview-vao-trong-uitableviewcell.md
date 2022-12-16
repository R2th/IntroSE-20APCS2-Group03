Đưa CollectionVIew vào bên trong table view cell là một thiết kế phổ biến trong các Apps thịnh hành hiện nay, điển hình như Sportify, Netflix, App Store hay cả Facebook, ...  
Cách thiết kế này rất phù hợp khi chúng ta muốn hiển thị một danh sách các items theo chiều dọc (table view), mà mỗi item lại chứa 1 list các items con có thể lướt theo chiều ngang (collection view).
Thử nhìn ví dụ về AppStore, chúng ta có nhiều mục như "What We're Playing", "New Games We Love", "Top Apple Arcade Games",... Tron mỗi mục ta lại gồm danh sách các game tương ứng, kéo theo chiều ngang

Trường hợp chúng ta có ít danh sách theo chiều ngang, đưa vào một ScrollView chứa nhiều CollectionView và set Data lần lượt cho chúng cũng là một giải pháp. Cách này đơn giản nhưng thử đặt trường hợp các hạng mục của chúng ta được cập nhật thường xuyên, và có thể chứa 10, thậm chí 20 CollectionView thì cách làm này là không hợp lý. Đưa vào một TableView, trong đó mỗi Cell chứa CollectionView cũng giúp tăng tính reuse, cũng như dễ maintain trong quá trình phát triển sản phẩm.

Trước khi đi vào phần chính, hãy nhìn qua bố cục để nắm được công việc chúng ta sẽ thực hiện
![](https://images.viblo.asia/282caa4f-467b-444f-abaa-112f10ba98b8.png)

- Collection View Cells nằm trong Collecion View (Điều đương nhiên rồi 🤣)
- Collection View nằm trong một Table View Cell 
- Table View Cell nằm trong Table View (Một điều đương nhiên nữa 🤣)

Điều duy nhất không quen thuộc ở đây là việc ta đưa Collection View vào bên trong Table View Cell. Chúng đều là View nên việc biến cái này thành Subview của là điều có thể thực hiện được. Vấn đề là làm sao để set Datasource cho từng CollectionView

Có 2 cách tiếp cận cho vấn đề này

- Thông tin cần cho Collection View Data Source sẽ được lưu trữ và set trong Table View Cell. Cách này nghe có vẻ đơn giản nhưng nó lại xung đột với tư tưởng MVC, khi mà để Views truy cập trực tiếp tới Models. 
- Cách thứ 2 là chúng ta sẽ set CollectionViewDataSource tại chính Controller và tìm cách để phân biệt các CollectionView với nhau để set cho đúng. Trong bài hôm nay, chúng ta sẽ giải quyết bài toán theo cách này

Controller sẽ là datasource, delegate cho cả table view và tất cả collection view
![](https://images.viblo.asia/1d4e052d-84b0-480e-a193-9cac7f405836.png)

Nếu chúng ta chỉ có 1 collection view trong 1 controller, việc xử lý trở nên quen thuộc và đơn giản. Vấn đề là chúng ta chỉ có 1 controller nhưng lại chứa nhiều collection view. Chúng ta sẽ phải có cách để phân biệt chúng, rằng collecview nào ở row thứ nhất (trong tableview), collectionview nào ở row thứ 2 , ...
Vì tableivew trong trường hợp của chúng ta chỉ có 1 section, do đó để phân biệt các collectionview, chúng ta chỉ cần xác định được row nào của table view đang chứa nó. UIVIew cung cấp cho chúng ta một thuộc tính rất hữu dụng đó là tag. Khái niệm tag được định nghĩa như sau

![](https://images.viblo.asia/4af16e2a-2129-446a-9cc3-983f971df5f0.png)
Chúng ta sẽ dùng tag để đánh dấu cho collectionview xem nó đang được chứa ở Row nào
Trong bài viết này, mình sẽ đi vào cụ thể cách triển khai code cho trường hợp các bạn có TableViewCell và CollectionViewCell custom (thay vì Cell mặc định). Do đó chúng ta sẽ có 2 file Xib, 1 Table View Cell Class và 1 Collection View Cell Class, 1 View Controller Class và 1 Storyboard

Đầu tiên, tạo project mới, kéo một Tableview vào Main.Storyboard và layout cho nó

Ánh xạ TableView vào ViewController
![](https://images.viblo.asia/43aa3336-d944-4b9e-875f-67e06412e52d.png)

Tạo file MainTableViewCell.swift kèm XIB để custom TableViewCell
![](https://images.viblo.asia/d4566f04-6d08-4a60-a421-a6151127ae17.png)

Trong ví dụ này, mình sẽ chỉ kéo vào một CollectionView và layout cho nó fill đầy Cell
![](https://images.viblo.asia/708b7937-6fed-45d1-8fb6-4bb1ffc28fa9.png)

Tạo tiếp file ColorCell.swift kèm XIB để custom cho UICollectionViewCell. Bạn có thể tạo custom cell theo bất kì cách nào bạn muốn. Ở đây mình sẽ kéo vào một View tượng trưng và cho nó fill đầy Cell
![](https://images.viblo.asia/a38a21d1-e9ec-45d6-862a-9cff1c5356da.png)

Mở file ColorCell.swift. Ánh xạ view vừa kéo vào và thêm hàm setContentForCell(). Ở đây mình sẽ truyền vào một UIColor và set màu cho view đó
![](https://images.viblo.asia/34ca7c9c-c56f-4587-b289-4c76e44c9e3e.png)

Tới đây vẫn là những thao tác quá quen thuộc rồi đúng không. Chuyển sang MainTableCell.swift và chỉnh sửa một chút. Ở đây sẽ có một số thứ chúng ta cần quan tâm đến
- Tạo ra một hàm setUpCollectionView để register nib cho collectionView và gọi nó trong awakeFromNib()  (Đừng quên hàm này nếu bạn không muốn chương trình bị crash) 
- Hãy để ý tới hàm setCollectionViewDataSourceDelegate. Function này sẽ set Datasource, Delegate cho collectionView và gắn tag tương ứng bằng row Number. Cách viết này có thể hơi lạ một chút, đây là Protocol Composition, bạn có thể đọc thêm trong Swift Doc
- Ở cuối function này có hàm reloadData(). Lý do là vì khi set lại dataSource cho collectionView thì hàm reloadData() nên được gọi tới. Mỗi lần CollectionView xuất hiện ta sẽ set lại Datasource cho nó. Nhưng UIKit có vẻ như hiểu chúng ta đã setDataSource cho collectionview này trước đó rồi, nên khi nó được gọi lại thì nó không tự gọi reloadData() nữa -> Dữ liệu bị sai. Do đó ta phải thêm hàm này vào cuối đoạn code

![](https://images.viblo.asia/6198197c-3f43-4b67-b34d-e067d88e6c9b.png)

Bây giờ chúng ta sẽ set up cho TableView và CollectionView trong ViewController
Ở đây tôi sẽ dùng hàm generateRandomData() để sinh ra một [[UIColor]]. Chúng ta có mội tableView, dữ liệu cho 1 cell sẽ là một [UIColor]. Và mỗi element của [UIColor] đó sẽ được sử dụng để set data cho từng collectionViewCell bên trong tableViewCell đó. Bạn có thể tham khảo hàm đó ở đây\
https://github.com/ashfurrow/Collection-View-in-a-Table-View-Cell/blob/master/Table%20View%20in%20a%20Collection%20View/Helpers.swift

![](https://images.viblo.asia/3d2e5780-fcf2-4ca7-b23a-a549078021ec.png)

 Chúng ta cần một số hàm cơ bản để setup cho  TableView
 
 ![](https://images.viblo.asia/45c7ecd4-d4bc-46cb-90aa-acb5d6159d82.png)

Bây giờ chúng ta cần set Datasource, Delegate và rowNumber cho collectionview. Có một số hàm trong UITableViewDelegate có thể sử dụng trong trường hợp này. Ở đây chúng ta muốn Datasource và delegate được set lại khi Cell chuẩn bị xuất hiện, do đó mình sẽ để trong hàm willDisplayCell
![](https://images.viblo.asia/caa06f9e-db6e-4e27-8d48-92ad9ae7ce71.png)

Chúng ta sẽ thấy báo lỗi do chúng ta đang khai báo cho collection sử dụng self cho datasource và delegate nhưng ViewController lại chưa conform 2 protocol này. Nhưng đừng lo, bây giờ chúng ta sẽ khai báo cho nó
![](https://images.viblo.asia/27711aaf-1749-457d-aed6-f10217ed3738.png)

Trong 2 hàm set up datasource cho collectionview, chúng ta đều sử dụng tag để xác định dữ liệu sẽ được sử dụng để đổ lên collectionview, từ đó cũng tính được được số row cần thiết

Ở đây mình sẽ gọi thêm hàm heightForRowAt trong UITableViewDelegate để set height cho tableviewcell. 
![](https://images.viblo.asia/3269cceb-8daa-44a8-81ea-c3276bef844d.png)

Build và Run Project ta thu được kết quả như sau: 
![](https://images.viblo.asia/6818527d-f253-4736-920d-eab4fdfd45e1.png)

Trông khá ổn rồi đúng không. Nhưng nếu bạn tương tác một lúc sẽ thấy một chút vấn đề do các cell được reuse. Chúng ta mong muốn "ghi nhớ" lại vị trí người dùng đã scroll tới tại mỗi collectionview. Để làm được việc đó, mở file MainTableViewCell.swift và bổ sung thêm thuộc tính collectionViewOffSet. Giá trị này được sử dụng để trả về vị trí mà người dùng đang scroll tới.![](https://images.viblo.asia/858973f6-b132-47cd-be48-c9e49d07a09b.png)

Quay trở lại ViewController, ta cần tạo ra một biến để lưu trữ offset các collectionview. Ở đây mình sẽ sử dụng một dictionary ![](https://images.viblo.asia/5a3ab460-a60b-4ec3-999b-6404c623375d.png)


Bổ sung UITableViewDelegate
![](https://images.viblo.asia/8bf24ab1-e509-4112-a841-3270b69c8ed5.png)
- Khi Cell chuẩn bị xuất hiện, ta sẽ gắn lại Offset cho nó theo giá trị lưu lại trước đó.
Trường hợp offset của collectionview đó chưa được ghi nhận (Cell vừa được khởi tạo), ta sẽ set offSet cho nó bằng 0 (tức collectionview sẽ được scroll về vị trí đầu tiên)

- Hàm didEndDisplaying cell được gọi khi cell không còn hiện trên màn hình. Lúc này ta sẽ ghi nhận lại offet của nó bằng cách set lại cho storedOffsets ở index tương ứng

Build và Run lại Project, chúng ta đã thu được một sản phẩm hoàn chỉnh rồi.

Nguồn tham khảo:
https://ashfurrow.com/blog/putting-a-uicollectionview-in-a-uitableviewcell-in-swift/