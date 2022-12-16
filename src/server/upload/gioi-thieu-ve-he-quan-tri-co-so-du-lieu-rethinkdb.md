# 1. Giới thiệu chung
 RethinkDB là một cơ sở dữ liệu mã nguồn mở NoSQL,  có khả
năng mở rộng được phạm vi, được thiết kế cho nền tảng của các ứng dụng thời gian
thực. RethinkDB cho phép lập trình viên có thể xây dựng được các
ứng dụng thời gian thực có thể mở rộng phạm vi trong một khoảng thời gian với công
sức là ít nhất.

  RethinkDB sử dụng ngôn ngữ truy vấn ReQL, một ngôn ngữ cụ thể được sử dụng riêng
cho `Ruby, Python, Java và JavaScript (bao gồm Node JS)`
![](https://images.viblo.asia/359c44c8-9b1e-42b5-9935-71057824f121.png)
# 2. Khi nào nên dùng RethinkDB
RethinkDB là một lựa chọn tuyệt vời khi các ứng dụng của bạn có những mối quan hệ
chặt chẽ từ nguồn cấp dữ liệu thời gian thực cho dữ liệu của bạn.

Mô hình truy cập cơ sở dữ liệu truy vấn - phản hồi hoạt động tốt trên web bởi vì nó
ánh xạ trực tiếp đến giao thức HTTP request - response. Tuy nhiên, các ứng dụng hiện
đại yêu cầu gửi dữ liệu trực tiếp cho khách hàng trong thời gian thực. Sử dụng trong
các trường hợp mà các công ty được hưởng lợi từ kiến trúc đẩy thời gian thực của
RethinkDB. 

    Ứng dụng:
    
        *         Ứng dụng dành cho thiết bị di động và web cộng tác.
        *         Ứng dụng truyền tải và phân tích trực tuyến.
        *         Trò chơi nhiều người chơi.
        *         Thương mại điện tử thời gian thực.
        *         Các thiết bị đã được kết nối.
       
   ![](https://images.viblo.asia/7c68fb96-c89a-4591-9968-d7935117ec97.png)
   
#    3.Đặc điểm và thành phần của RethinkDB
##    3.1 Kiến trúc của RethinkDB
###        3.1.1 Chia mảnh và nhận rộng
 RethinkDB sử dụng một thuật toán phân mảnh theo phạm vi (range sharding algorithm) dựa trên khóa chính của các bảng để phân vùng dữ liệu.
   Dựa trên các điều kiện người dùng yêu cầu hệ thống sẽ kiểm tra các số liệu thống kê của bảng để đưa ra các điểm phân chia tối ưu cho bảng đó. Các điểm đó sẽ đảm bảo   các mảnh sẽ chứa số lượng các bản ghi tương tự nhau và chúng sẽ được phân bố tự động trên toàn bộ cụm (cluster).
   Các chức năng sharding và relipcation được cài đặt trong bảng cấu hình, chúng cho
phép người dùng chỉ định số mảnh và số bản sao trên mỗi bảng hoặc tất cả các bảng
bên trong cơ sở dữ liệu.
   RethinkDB giữ một thư mục nội bộ theo dõi tình tình trạng hiện tại của cụm (cluster):
có bao nhiêu máy chủ có thể truy cập được, dữ liệu nào được lưu trữ trên mỗi máy
chủ,... Các cấu trúc dữ liệu theo dõi thư mục được tự động cập nhật khi cụm (cluster)
thay đổi.

### 3.1.2 Đánh chỉ mục
Chỉ mục của mỗi bản ghi sẽ được RethinkDB sử dụng để đưa đến mảnh thích hợp. Và
chỉ mục bên trong mỗi mảnh sẽ sử dụng cấu trúc dữ liệu` B-Tree`. Truy vấn sử dụng chỉ
mục này sẽ rất hiệu quả bởi vì truy vấn sẽ được đưa ngay lập tức đến mảnh tương ứng
và bản ghi sẽ được tìm kiếm nhanh chóng trên` B-Tree`.   
RethinkDB hỗ trợ cả chỉ mục thứ cấp và chỉ mục đa mức.
### 3.1.3 Thực hiện truy vấn
Khi nhận được một truy vấn để thực hiện thì hệ thống sẽ đánh giá truy vấn đó và lập
một kế hoạch bao gồm một ngăn xếp chứa các thao tác bên trong. Ngăn xếp đó sẽ mô
tả đầy đủ các truy vấn trong một cấu trúc dữ liệu.

RethinkDB cho phép thực hiện đồng thời các truy vấn đọc và ghi bất cứ khi nào một
hoạt động ghi xảy ra cùng lúc với đọc đã được thực hiện, trạng thái của B-Tree cho mỗi
mảnh có liên quan sẽ được lưu lại và tạm thời giữ các phiên bản khác nhau của các
khối để thực hiện các hoạt động đọc và ghi đồng thời.

![](https://images.viblo.asia/8af6ee07-c8a2-4eac-b90d-91abe30bfecf.jpg)

Ví dụ:
> Tạo và hủy cơ sở dữ liệu:
>
```
    Tạo cơ sở dữ liệu: `r.dbCreate('advanced_db');`
 
     Hủy cơ sở dữ liệu:` r.dbDrop('advanced_db');`
```


> Tạo và hủy bảng:
> 
> Tạo bảng:
> 
```
       r.tableCreate('landmarks', {primaryKey: "landmark_id"});
    
       r.tableCreate('creators');
```
> 
> Nếu không định nghĩa trường khóa chính thì mặc định RethinkDB sẽ tự tạo một trường
> ID làm khóa chính.
> 
```
     r.tableDrop("landmarks");
     r.tableDrop("creators");`
```
> 
> Chèn dữ liệu vào bảng:
> 
```
     r.table('creators').insert(
 
        "landmark_id":  "7644aaf2-9928-4231-aa68-4e65e31bf219",
        "name": " founder 1",
        "field": "Sciences"
      );

```
>Đọc dữ liệu từ bảng:
```
    r.table("landmarks").pluck("name", "city");
    r.table("landmarks").filter({name: "ULB"});// Tìm chính xác
    r.table("landmarks").filter(function (doc) {
    return r.expr(["ULB","Atomium"])
    .contains(doc("name"));
    });
```
>Nối bảng:
>
>`Nối trong:`
```
    r.table("creators").innerJoin(
    r.table("landmarks"),
    function (creator, landmark) {
    return
    creator("landmark_id").eq(landmark("landmark_id"
    ));
    }).zip();
```
>`Nối ngoài:`
```
    r.table("creators").eqJoin(
    "landmark_id",
    r.table("landmarks"),
    {index: "landmark_id"}
    ).zip();
```
>Sắp xếp
```
    r.table("landmarks").orderBy("name");
```
>Nhóm và đếm số bảng ghi:
```
    r.table('landmarks').group('city').count();
```
## 3.2 Phương pháp và kĩ thuật xử lý các truy vấn/giao tác đồng thời
Trong bộ môn cơ sở dữ liệu, kiểm soát truy cập đồng thời là một phương pháp đảm
bảo các giao dịch cơ sở dữ liệu được thực hiện một cách an toàn (không bị mất mát
hay sai lệch dữ liệu)

Các cơ sở dữ liệu quan hệ truyền thống thường sử dụng khóa ở các cấp khác nhau
trong quá trình truy cập vào cơ sở dữ liệu. Trong một cơ sở dữ liệu NoSQL điển hình
sử dụng khóa, một khi có yêu cầu viết tất cả các người đọc sẽ bị chặn lại cho đến khi
hoàn thành việc ghi. Điều này có nghĩa là trong trường hợp có nhiều yêu cầu ghi, kiến
trúc này sẽ khiến việc đọc cơ sở dữ liệu phải xếp hàng đợi, dẫn đến việc suy giảm hiệu
suất.

Để việc thực hiện các truy cập đồng thời được hiệu quả `RethinkDB` có sử dụng kiểm
soát truy cập đồng thời mức khối (`block-level Multi-version concurrency control`) - một
phương pháp được sử dụng cho các hệ thống quản lý cơ sở dữ liệu cung cấp truy cập
đồng thời vào cơ sở dữ liệu mà không khóa nó.

Bất cứ khi nào khi một hoạt động ghi diễn ra trong khi quá trình đọc vẫn đang diễn ra.
`RethinkDB` sẽ ghi lại trạng thái của `B-tree `cho mỗi phần liên quan và tạm thời duy trì
các phiên bản khác nhau của các khối để việc đọc ghi diễn ra đồng thời.

`RethinkDB` độc quyền trong việc khóa mức khối trong trường hợp các tiến trình ghi
được thực hiện trong các bản ghi gần nhau trên `B-tree`. Nếu các khối tương tranh đã
được n`ạp sẵn trong cache` thì việc `khóa` diễn ra nhanh chóng, còn nếu chúng vẫn còn
nằm trong đĩa cứng thì việc này sẽ mất thời gian hơn. Việc “khóa” này không ảnh
hưởng nhiều lắm đến hiệu năng của cơ sở dữ liệu vì đa phần các `B-tree `mức cao luôn
được được nạp vào bộ nhớ cùng với các khối thường xuyên được sử dụng. Vậy nên
trong phần lớn các quá trình ghi hệ thống chủ yếu là `không khóa`.
# 4.Kết luận
Mục đích chính của RethinkDB là cho phép người dùng có thể dễ dàng tạo ra một cách
nhanh chóng các ứng dụng thời gian thực trên cả nền tảng `web` và `di động`. Các đối
tượng hướng đến chủ yếu của RethinkDB là các ứng dụng truyền thông tin đa phương
tiện trực tiếp (`Streaming`), các ứng dụng phân tích trực tuyến, trò chơi nhiều người
chơi (`multi-player`), các ứng dụng di động kết hợp nền web
# 5. Tham khảo
* Gianluca Tiepolo. Getting Started with RethinkDB: 2016
* Leif Walsh, Vyacheslav Akhmechet, and Mike Glukhovsky. RethinkDB —
Rethinking Database Storage: 2009.
* Nikos Koufos Antonis Matakos Thanos Pappas. Raft & RethinkDB: A thorough
Examination: 2017.
* www.RethinkDB.com