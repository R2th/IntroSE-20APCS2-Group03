*Chả là dự án mình đang phát triển một feature lớn, phải thiết kế thêm nhiều bảng, anh em dự án cứ bảo "Khách Hàng chẳng tuân thủ chuẩn hóa DB gì cả", mình mặc dù cũng có nhớ thời ĐH học rồi, cơ mà để chắc chắn điều anh em nói, mình tìm hiểu loanh quanh trên Google; Và giờ chia sẻ lại cho anh em nhé". :laughing:*

*Khái niệm* 

Chuẩn hóa là một kĩ thuật trong thiết kế DB, được sử dụng để thiết kế table của [CSDL quan hệ](https://en.wikipedia.org/wiki/Relational_database) lên "những" tiêu chuẩn cao hơn. 

Để tiến lên cấp độ sau yêu cầu cấp độ trước đó phải được thỏa mãn. Ví dụ, ta đang có bộ data [dạng chưa chuẩn hóa](https://en.wikipedia.org/wiki/Unnormalized_form) (đây là cấp thấp nhất) và ta đang mong muốn đạt được cấp độ chuẩn hóa cao nhất. Thì bước đầu tiên trước hết phải đảm bảo [dạng chuẩn hóa I](https://en.wikipedia.org/wiki/First_normal_form) được tuân thủ, sau đó chúng ta thiết kế tiếp tục DB để thỏa mãn các yêu cầu riêng của  [dạng chuẩn hóaII](https://en.wikipedia.org/wiki/Second_normal_form),... và cứ như thế cho đến khi bộ data của chúng ta đạt đến [dạng chuẩn hóa thứ VI](https://en.wikipedia.org/wiki/Sixth_normal_form).

---
**NOTE**

*Dạng chuẩn hóa thứ IV* trở lên chỉ mang tính chất lý thuyết, các vấn đề mà các dạng này hướng đến giải quyết thường **hiếm** xuất hiện trong thực tế. 

---

### Data khởi tạo 
Dưới đây là ví dụ về bộ data khởi tạo - chưa được chuẩn hóa. 

|                      Title                       |    Author    | Author Nationality |  Format   | Price |        Subject        | Pages | Thickness | Publisher | Publisher Country | Publication Type | Genre ID | Genre Name |
| :----------------------------------------------: | :----------: | :----------------: | :-------: | :---: | :-------------------: | :---: | :-------: | :-------: | :---------------: | :--------------: | :------: | :--------: |
| Beginning MySQL Database Design and Optimization | Chad Russell |      American      | Hardcover | 49.99 | MySQL,Database,Design |  520  |   Thick   |  Apress   |        USA        |      E-book      |    1     |  Tutorial  |

*Ta đặt giả định là 1 sách thì chỉ thuộc về 1 tác giá*

### 1NF - Dạng chuẩn hóa I

Để thỏa mãn *1NF*, giá trị trong mỗi cột cần phải là 1 giá trị đơn lẻ. 

Nhìn vào bảng trên, cột **Subject** đang chứa nhiều hơn một giá trị, khiến bảng này chưa thỏa mãn *1NF*. 

Một cách để đạt 1NF trong trường hợp này là tách các giá trị đó ra nhiều cột **Subject** khác.

|                      Title                       |  Format   |    Author    | Author Nationality | Price | Subject 1 | Subject 2 | Subject 3 | Pages | Thickness | Publisher | Publisher country | Genre ID | Genre Name |
| :----------------------------------------------: | :-------: | :----------: | :----------------: | :---: | :-------: | :-------: | :-------: | :---: | :-------: | :-------: | :---------------: | :------: | :--------: |
| Beginning MySQL Database Design and Optimization | Hardcover | Chad Russell |      American      | 49.99 |   MySQL   | Database  |  Design   |  520  |   Thick   |  Apress   |        USA        |    1     |  Tutorial  |

Kết quả trên đã đáp ứng được chuẩn *1NF* song có một **vấn đề**. Nếu một cuốn sách thuộc nhiều hơn 3 chủ đề, ta sẽ không thể thêm chủ để mới đó vào bảng mà không thêm một cột nữa vào bảng này. 

Để giải quyết **vấn đề** này một cách tinh tế hơn, việc cần làm trước tiên là xác định các **đối tượng** xuất hiện trong bảng và chia chúng ra thành các bảng tương ứng. Với đề bài lần này, 3 bảng sẽ là: **Book**, **Subject** and **Publisher** 

|                      Title                       |  Format   |    Author    | Author Nationality | Price | Pages | Thickness | Genre ID | Genre Name | *Publisher ID* |
| :----------------------------------------------: | :-------: | :----------: | :----------------: | :---: | :---: | :-------: | :------: | :--------: | :------------: |
| Beginning MySQL Database Design and Optimization | Hardcover | Chad Russell |      American      | 49.99 |  520  |   Thick   |    1     |  Tutorial  |      *1*       |
**Bảng Publisher**

| **Publisher_ID** | **Name** | **Country** |
| :--------------: | :------: | :---------: |
|        1         |  Apress  |     USA     |

**Bảng Subject**

| **Subject ID** | **Subject name** |
| :------------: | :--------------: |
|       1        |      MySQL       |
|       2        |     Database     |
|       3        |      Design      |


Rõ ràng, khi tách bảng thế này sẽ khiến data không còn liên kết với nhau nữa. Có nghĩa ta sẽ phải *bằng cách nào* đó biểu diễn mối quan hệ giữa các bảng này. 

Các bạn để ý cột *Publisher ID* ở Bảng Books là [khóa ngoại](https://en.wikipedia.org/wiki/Foreign_key) xác định mối quan hệ [một - nhiều](https://en.wikipedia.org/wiki/Many-to-one) giữa  book và publisher.

Mặt khác, 1 book có thể thuộc nhiều subject khác nhau, cũng như một subject có thể thuộc về nhiều quyền sách. Do vậy, ta cần một mối quan hệ  [nhiều-nhiều](https://en.wikipedia.org/wiki/Many-to-many_(data_model)) được biểu diễn ở **bảng trung gian** dưới đây: 

**Bảng Title - Subject**

|                      Title                       | ***Subject ID*** |
| :----------------------------------------------: | :--------------: |
| Beginning MySQL Database Design and Optimization |        1         |
| Beginning MySQL Database Design and Optimization |        2         |
| Beginning MySQL Database Design and Optimization |        3         |

Đến thời điểm này, ta đã có tổng cộng là 4 bảng được tách ra từ bảng khởi tạo đầu tiên - chỉ để tuân theo chuẩn *1NF* :laughing:

### 2NF - Dạng chuẩn hóa II

Để xác định 1 book, với bảng dưới ta cần dùng [Khóa hợp](https://en.wikipedia.org/wiki/Composite_key) của **{Title, Format}**

|                          Title                          |  Format   |    Author    | Author Nationality | Price | Pages | Thickness | Genre ID |   Genre Name    | *Publisher ID* |
| :-----------------------------------------------------: | :-------: | :----------: | :----------------: | :---: | :---: | :-------: | :------: | :-------------: | :------------: |
|    Beginning MySQL Database Design and Optimization     | Hardcover | Chad Russell |      American      | 49.99 |  520  |   Thick   |    1     |    Tutorial     |      *1*       |
|    Beginning MySQL Database Design and Optimization     |  E-book   | Chad Russell |      American      | 22.34 |  520  |   Thick   |    1     |    Tutorial     |      *1*       |
| The Relational Model for Database Management: Version 2 |  E-book   |   E.F.Codd   |      British       | 13.88 |  538  |   Thick   |    2     | Popular science |      *2*       |
| The Relational Model for Database Management: Version 2 | Paperback |   E.F.Codd   |      British       | 39.99 |  538  |   Thick   |    2     | Popular science |      *2*       |

Ta thấy các cột mà không phải thuộc khóa hợp **{Title, Format}** đều chỉ phụ thuộc vào *Title*, mỗi cột *Price* thì phụ thuộc vào cả 2 *Title* và *Format*.

Để thỏa mãn chuẩn *2NF*, ta cần đảm bảo rằng không có thuộc tính (cột) nào chỉ phụ thuộc **1 phần** vào *khóa hợp*. Hay nói cách khác, trong chuẩn *2NF*, mọi thuộc tính phải phụ thuộc **hoàn toàn** vào *khóa hợp*. 

Với bài toán hiện tại, ta sẽ tách ra một bảng để cột **Title** trở thành khóa chính, tất cả các thuộc tính (cột) còn lại phụ thuộc hoàn toàn vào nó; còn cột **Price** thì tách ra bảng khác nơi mà nó phụ thuộc vào cột **Format** (và tất nhiên là cả **Title**)

**Bảng Books**

|                          Title                          |    Author    | Author Nationality | Pages | Thickness | Genre ID |   Genre Name    | *Publisher ID* |
| :-----------------------------------------------------: | :----------: | :----------------: | :---: | :-------: | :------: | :-------------: | :------------: |
|    Beginning MySQL Database Design and Optimization     | Chad Russell |      American      |  520  |   Thick   |    1     |    Tutorial     |      *1*       |
| The Relational Model for Database Management: Version 2 |   E.F.Codd   |      British       |  538  |   Thick   |    2     | Popular science |      *2*       |

Bảng Books giờ đây đã đạt chuẩn *2NF*

**Bảng Format - Price**

|                          Title                          |  Format   | Price |
| :-----------------------------------------------------: | :-------: | :---: |
|    Beginning MySQL Database Design and Optimization     | Hardcover | 49.99 |
|    Beginning MySQL Database Design and Optimization     |  E-book   | 22.34 |
| The Relational Model for Database Management: Version 2 |  E-book   | 13.88 |
| The Relational Model for Database Management: Version 2 | Paperback | 39.99 |

Bảng Formats - Price vẫn chưa đạt chuẩn *2NF* đâu nhé..

### 3NF - Dạng chuẩn hóa III

Bảng **Books** lúc này vẫn đang xảy ra một hiện tượng gọi là: *phụ thuộc bắc cầu*, cụ thể: {Author Nationality} thì phục thuộc vào {Author},  và {Author} thì phục thuộc vào {Title}. 

Nhược điểm của nó là: nếu giá trị {Author} bị thay đổi, thì ta sẽ phải tìm và thay đổi toàn bộ các {Author Nationality} tương ứng ở các dòng khác (nếu có) trong bảng.

*Tương tự chuyện xảy ra giữa {Genre Name} {Genre ID} và {Title}*

Ta nói rằng bảng **Books** giờ đây chưa đạt chuẩn *3NF*.

Để tuân thủ chuẩn này, ta sẽ thiết kế lại như sau:  Tách Books ra thành 3 bảng với 2 bảng mới tương ứng là Authors và Genres. 

**Bảng Books**
|                          Title                          |    Author    | Pages | Thickness | Genre ID | *Publisher ID* |
| :-----------------------------------------------------: | :----------: | :---: | :-------: | :------: | :------------: |
|    Beginning MySQL Database Design and Optimization     | Chad Russell |  520  |   Thick   |    1     |      *1*       |
| The Relational Model for Database Management: Version 2 |   E.F.Codd   |  538  |   Thick   |    2     |      *2*       |

**Bảng Authors**

|    Author    | Author Nationality |
| :----------: | :----------------: |
| Chad Russell |      American      |
|   E.F.Codd   |      British       |

**Bảng Genres**

| Genre ID |   Genre Name    |
| :------: | :-------------: |
|    1     |    Tutorial     |
|    2     | Popular science |

### 4NF

Trước tiên muốn đạt chuẩn này cần đạt chuẩn BCNF, tức là mọi thuộc tính (cột) đều phải là thành phần của khóa hợp; hay chỉ cần có một cột không thuộc thành phần của khóa hợp là sai chuẩn BCNF. 

Tiếp theo, chuần 4NF yêu cầu bên trong một table quan hệ **KHÔNG** được phép có nhiều hơn 1 *quan hệ nhiều giá trị.*. 

Cùng xem ví dụ sau:

Giả định các Books này được sở hữu bởi các Franchisee (Doanh nghiệp)  có trụ sở tại nhiều Bang tại Mỹ. Lúc này ta cần thêm một bảng mới mô tả 1 books đang có mặt tại địa điểm nào. 
*Giả định: mọi Franchisee đều có sách tại mọi trụ sở của nó*

**Bảng Franchisee - Book - Location**

| Franchisee ID |                          Title                          |  Location  |
| :-----------: | :-----------------------------------------------------: | :--------: |
|       1       |    Beginning MySQL Database Design and Optimization     | California |
|       1       |    Beginning MySQL Database Design and Optimization     |  Florida   |
|       1       |    Beginning MySQL Database Design and Optimization     |   Texas    |
|       1       | The Relational Model for Database Management: Version 2 | California |
|       1       | The Relational Model for Database Management: Version 2 |  Florida   |
|       1       | The Relational Model for Database Management: Version 2 |   Texas    |
|       2       |    Beginning MySQL Database Design and Optimization     | California |
|       2       |    Beginning MySQL Database Design and Optimization     |  Florida   |
|       2       |    Beginning MySQL Database Design and Optimization     |   Texas    |
|       2       | The Relational Model for Database Management: Version 2 | California |
|       2       | The Relational Model for Database Management: Version 2 |  Florida   |
|       2       | The Relational Model for Database Management: Version 2 |   Texas    |
|       3       |    Beginning MySQL Database Design and Optimization     |   Texas    |

Ta thấy có 2 quan hệ ở đây:
1.  Franchisee  ->> Location (1 Franchisee có nhiều trụ sở)
2.  Franchisee ->> Book (1 Franchisee bán nhiều cuốn sách)

Lúc này, ta có thể nói bảng này có 2 *quan hệ nhiều giá trị*.

Để tuân thủ *4NF* ta phải thiết kế lại sao cho chỉ có một quan hệ giá nhiều giá trị trong một bảng. Ta tách như sau:

**Bảng Franchisee - Book** 

| Franchisee ID |                          Title                          |
| :-----------: | :-----------------------------------------------------: |
|       1       |    Beginning MySQL Database Design and Optimization     |
|       1       | The Relational Model for Database Management: Version 2 |
|       2       |    Beginning MySQL Database Design and Optimization     |
|       2       | The Relational Model for Database Management: Version 2 |
|       3       |    Beginning MySQL Database Design and Optimization     |

**Bảng Franchisee - Location**

| Franchisee ID |  Location  |
| :-----------: | :--------: |
|       1       | California |
|       1       |  Florida   |
|       1       |   Texas    |
|       2       | California |
|       2       |  Florida   |
|       2       |   Texas    |
|       3       |   Texas    |


## Tổng kết

Các chuẩn còn lại rất nhiều song anh em lập trình mình biết tới đây chắc OK rồi nhỉ. Anh em nào muốn đọc kĩ hơn tài liệu gốc hãy xem các nguồn dưới đây thêm nhé: 

### Nguồn tham khảo
https://en.wikipedia.org/wiki/Database_normalization; 
https://www.geeksforgeeks.org/introduction-of-4th-and-5th-normal-form-in-dbms/; 
https://www.guru99.com/database-normalization.html