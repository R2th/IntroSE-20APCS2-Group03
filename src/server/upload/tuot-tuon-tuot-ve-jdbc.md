### 1. JDBC – người nguyên thủy.

Trước tiên, nhắc tới **JDBC (Java Database Connectivity)**, ai trong số các bạn cũng liên tưởng về một API xưa cổ dùng để connect tới database và query dữ liệu.

Nói nó xưa cổ là vì JDBC là công cụ **thô sơ nhất, mộc mạc nhất** dùng để kết nối tới cơ sở dữ liệu. Cái chân chất mộc mạc này tuy chán, nhưng lại là kiến thức nền tảng quan trọng cần phải nắm thật vững.

Hiểu thật rõ về bản chất của **JDBC** có thể giúp ta vững vàng tìm hiểu thêm các frameworks mới và mạnh mẽ như **Hibernate, JPA**. Tất cả chúng, tựu chung đều sử dụng JDBC để thực hiện kết nối và lấy dữ liệu.

![](https://images.viblo.asia/e832d1ef-84d2-4d48-bc1f-a2e933bf07e6.png)
<div align="center">
     Hình : Vị trí của JDBC trong application
 </div>

Bài viết này mình sẽ chú trọng tới **bản chất và mô hình của JDBC**. 
Mong rằng bài viết này sẽ giúp đỡ các bạn nhiều!.

-----

### 2.	JDBC – cái nhìn tổng quan qua ví dụ hàng hóa.

Để hiểu JDBC, chúng ta cùng xem xét ví dụ thường gặp trong đời sống là lấy hàng từ kho. Một khách hàng muốn thực hiện lấy hàng từ một trong số các kho (Oracle, MySql, Sql Server, ...), các bước tiến hành của anh ta như sau:

1. 	**Khởi tạo connection** (liên lạc viên): trước tiên, khi muốn lấy hàng từ bất cứ kho hàng nào, điều đầu tiên luôn cần phải làm là thực hiện kết nối (getConnection) tới kho hàng. Việc làm này thường thông qua một người điều phối (DriverManager).

2.	**Tạo đối tượng Statement** (người liên lạc): sau khi đã có được kết nối tới kho hàng (database), kho hàng sẽ cần biết những thứ nào bạn cần lấy, lúc này người liên lạc sẽ làm nhiệm vụ, anh ta sẽ cầm một tờ giấy với tất cả những món hàng cần lấy, mang tới và giao cho kho hàng.

3.	 **Thực hiện lấy hàng** (Pass a SQL statement): với danh sách món hàng lấy được từ người liên lạc (statement), kho hàng (database) sẽ thực hiện lấy hàng từ kho.

4.	 **Gửi hàng lên xe** (Result Set): các món hàng được lấy từ kho sẽ được mang lên xe để trả về cho khác hàng yêu cầu.

Sau khi đã có cái nhìn khách quan về JDBC, phần 3 sẽ tìm hiểu sâu **từng công đoạn** mà JDBC thực hiện.

![](https://images.viblo.asia/31d58a8f-02d8-4078-ae8d-33385ef6193b.png)
<div align="center">
     Hình : Luồng thực hiện trong JDBC
 </div>

-----


### 3.	JDBC – ruột gan có gì?.

##### 1.	JDBC Driver Manager (người điều phối).

Vì có rất nhiều kho hàng (database) tồn tồn tại độc lập khác nhau, nên DriverManager sẽ quản lý cách thức kết nối tới các kho hàng. Cụ thể, khi muốn sử dụng driver, ta cần đăng kí trước khi sử dụng.

Có 2 cách đăng kí driver thông qua DriverManager.

* Thứ nhất: **sử dụng class.forName()** : phương thứ này chỉ đơn giản là load class với tên được đăng kí sẵn.

* Thứ hai: **sử dụng DriverManager.registerDriver()** : phương thức này sẽ thực hiện đăng kí driver, nhưng có một bất cập nhỏ là driver có thể sẽ bị đăng kí tới 2 lần.

~~**Hỏi vui:** ~~
1.	Phương thức ExecuteUpdate nên là:
	* A.	public **int** executeUpdate(String sql) throws SQLException;
    * B.	public **ResultSet** executeUpdate(String sql) throws SQLException;
    * C.    public **boolean** executeUpdate(String sql) throws SQLException;


##### 2.	Statement (người liên lạc).

Có 3 loại statement là **statement**, **preparedStatement**, và **CallableStatement**

* **Statement** (liên lạc chỉ để lấy hàng, không có thêm điều kiện): sử dụng cho các câu SQL query không kèm tham số.
* **PreparedStatement** (liên lạc lấy một mặt hàng nhất định): sử dụng tốt cho các câu SQL lặp lại nhiều lần, chấp nhận tham số truyền vào.
* **CallableStatement** (liên lạc để thay đổi một số mặt hàng trong kho): thướng sử dụng với storeProcedure, chấp nhận tham số truyền vào.

~~**Hỏi vui:** ~~
1.  Có thể thực hiện SELECT banh,keo FROM **?**, với ? truyền vào là tiemtaphoa được không?
    * A.	Có
    * B.	Không

2.	Có thể thực hiện statement.execute(**"SELECT pornStarName FROM pornTable WHERE boobSize=1; SELECT pornStarCountry FROM user WHERE braSize=2"**);
    * A.	Có
    * B.	Không


##### 3. ExecuteStatement method (kẻ thực thi).

Có 3 loại execute là **execute()**, **executeQuery()**, **executeUpdate()**

* **Execute** (làm việc đa năng): phương thức này sử dụng khi ta **không rõ kiểu** của statement.
* **ExecuteQuery** (chỉ lấy hàng trong kho): sử dụng chủ yếu cho các câu **query select**.
* **ExecuteUpdate** (chỉ thêm hàng, hủy hàng, cập nhật hàng): phương thức này sử dụng cho các câu **insert, update, delete**, chỉ trả về giá trị **row count hoặc 0** cho các câu SQL không trả về kết quả gì. 

![](https://images.viblo.asia/62be2094-2819-45d3-840e-efa7bd60518d.png)
<div align="center">
     Hình : Mô tả phương thức query dữ liệu của 3 loại Execute Statement
 </div>

~~**Hỏi vui:** ~~
1.	Phương thức ExecuteUpdate nên là:
	* A.	public **int** executeUpdate(String sql) throws SQLException;
    * B.	public **ResultSet** executeUpdate(String sql) throws SQLException;
    * C.    public **boolean** executeUpdate(String sql) throws SQLException;



-----


### 4. JDBC - bằng cách nào?.

#### 1. ResultSet đã lấy dữ liệu từ SQL query bằng cách nào?.

Câu trả lời là ResultSet thực hiện lấy dữ liệu từ SQL Query bằng con trỏ, phương thức chính của ResultSet là next()
Khi khởi tạo một đối tượng ResultSet, con trỏ sẽ trỏ tới record đầu tiên, sau khi đã xử lý dữ liệu (bao gồm columnName, objectValue) thì sẽ thực hiện 
di chuyển tới record tiếp theo.

Thật ra không quá khó hiểu rằng tại sao lại sử dụng con trỏ đối với ResultSet, câu trả lời là con trỏ cực kì linh động (giống như số record vậy), chúng ta không biết trước có bao nhiêu record được lấy ra).
Việc xử lý dữ liệu đối với từng record mà con trỏ trỏ vào cũng tương đối đơn giản, vì vậy con trỏ được sử dụng cho ResultSet để đọc từng dòng dữ liệu từ SQL Query

![](https://images.viblo.asia/4bd323c5-f035-4dba-99ca-ebbc6467f197.png)
<div align="center">
     Hình : Mô phỏng cách thức di chuyển tới record tiếp theo bằng phương thức next()
 </div>

~~**Hỏi vui:** ~~
1. Cùng thực hiện method **record.getColumnName() **ở hai cơ sở dữ liệu Postgres và Oracle thì sự khác nhau sẽ là:
     * A. Postgres viết thường, Oracle viết hoa.
     * B. Postgres viết hoa, Oracle viết thường.
     * C. Không có gì khác biệt

#### 2. Có thể vừa di chuyển con trỏ vừa thực hiện update dữ liệu không?. Nếu có thì bằng cách nào?.

Câu hỏi này đặt ra cho nhiều thanh niên làm biếng, và mình cũng thế!. Tại sao không vừa lấy dữ liệu vừa cần thì update tại chỗ luôn cho tiện, khỏi cần add vào Map hay List gì đó, rồi lại phải lấy ra mất thời gian, công sức lấy ra để update.

Vâng, tuyệt vời thay, **JDBC** có hỗ trợ cho **ResultSet** thực hiện update tại chỗ. 
Để thực hiện được, ngay từ lúc khởi tạo statement, ta set thêm thuộc tính **ResultSet.CONCUR_UPDATEABLE**, vậy là vừa có thể thực hiện di chuyển con trỏ, vừa thực hiện update, thật là tiện phải không nào?.

![](https://images.viblo.asia/150b4d1a-f9d3-4622-998c-36f8abe08074.png)
<div align="center">
     Hình : Thực hiện update giá trị PRICE sau khi con trỏ đã di chuyển về record đầu tiên.
 </div>

~~**Hỏi vui:** ~~
1. Mặc định con trỏ sẽ di chuyển từ trên xuống dưới, **để đảo ngược kết quả** từ **ResultSet** thì kiểu di chuyển cho con trỏ nên là:
     * A. TYPE_SCROLL_INSENSITIVE.
     * B. TYPE_FORWARD_ONLY.

### 5. Kết Luận.

Bài viết này mình viết về JDBC, tuy rằng là **công nghệ cũ**, nhưng mình nghĩ nó **là bản chất**, rất nhiều framework cũng phát triển lên từ nó, nên hiểu thật rõ bản chất và **cách thức hoạt động sẽ hữu ích về lâu về dài**. 


Một lần nữa, cảm ơn đã dành thời gian đọc bài viết của mình. Để đọc thêm các bài viết hay và bổ ích khác. Hãy truy cập blog của mình ([kieblog.vn](https://kieblog.vn))

Notes: Nếu có thắc mắc về đáp án thì contact nltkien.94@gmail.com nhé!).