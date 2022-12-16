Có thể bạn đã rất quen thuộc với việc truy vấn cơ sở dữ liệu bằng ngôn ngữ SQL. SQL là ngôn ngữ truy vấn có cấu trúc được sử dụng cho các cơ sở dữ liệu quan hệ như Mysql, PostgreSQL,... . Tuy nhiên, các hệ quản trị cơ sở dữ liệu phi quan hệ NoSQL lại không sử dụng ngôn ngữ này. Nếu bạn đang tìm hiểu cơ sở dữ liệu đồ thị như Neo4j, Infinite graph,... hãy bắt đầu với Cypher.

Trong bài viết này, mình sẽ giới thiệu cho các bạn về Cypher - ngôn ngữ truy vấn cơ sở dữ liệu đồ thị.
# 1. Những khái niệm cơ bản
Cypher là ngôn ngữ truy vấn đồ thị của Neo4j cho phép người dùng lưu trữ và truy xuất dữ liệu từ cơ sở dữ liệu đồ thị. Cypher được dùng để truy vấn cũng như cập nhật các đồ thị (Graph). Cypher dựa trên nghệ thuật ASCII, vì vậy cú pháp của nó dễ hiểu và làm cho các truy vấn dễ hiểu hơn. Nó tập trung vào việc diễn đạt rõ ràng những gì cần truy xuất từ một biểu đồ, chứ không phải về cách truy vấn nó.
Cypher Được coi là ngôn ngữ truy vấn đồ thị dễ tìm hiểu nhất.
![](https://images.viblo.asia/86453ec0-7443-413e-9d06-66a8c8a76b44.png)


### 1.1 Những khái niệm cơ bản của cơ sở dữ liệu Neo4j
Vì Cypher là ngôn ngữ truy vấn của Neo4j, nên mình sẽ giới thiệu qua về một số khái niệm cơ bản của Neo4j. Để dễ hiểu, mình sẽ so sánh các khái niệm này với các khái niệm quen thuộc trong RDBMS.


|RDBMS| Neo4j |
| -------- | -------- | 
| Table     | Graph     | 
| Row | Node | 
| column and data | property and value |
| constrain | relationship | 
| join | traversal |
Neo4j lưu trữ dữ liệu trên các nút, xây dựng các cấu trúc dl khác nhau dựa trên relationships. 
* Nút (node): 
  * Là một trong hai đơn vị cơ bản tạo nên đồ thị.
  * Thường đại diện cho các thực thể (tùy thuộc vào mối quan hệ miền).
  * Các nút và các mối quan hệ đều có thể chứa các thuộc tính.
  * Đồ thị đơn giản nhất chỉ có 1 nút duy nhất.
* Các mối quan hệ (relationships):
    * Một mối quan hệ kết nối hai nút.
    * Các mối quan hệ tổ chức các nút thành các cấu trúc, cho phép biểu đồ giống với cây, danh sách, bản đồ hoặc thực thể hỗn hợp.
    * Mối quan hệ có thể có thuộc tính.
    * Mối quan hệ kết nối hai nút được đảm bảo hợp lệ từ nút bắt đầu đến nút kết thúc.
    * Mối quan hệ luôn có hướng, được xác định theo hướng đi vào hoặc đi ra một nút => là yếu tố quan trọng đc sd khi duyệt đồ thị.
    * Một nút có thể có quan hệ với chính nó. 
    * Loại mối quan hệ (relationship type): một mối quan hệ phải có chính xác loại mối quan hệ.
* Thuộc tính (property):
    * Các thuộc tính là các cặp khóa - giá trị (key-value) mà khóa chính là một chuỗi string.
    * Thuộc tính không chứa giá trị null, nếu một thuộc tính có value = null thì thuộc tính đó coi như không tồn tại.
* Nhãn (label):
    * Là tên một cấu trúc đồ thị để nhóm các node vào một tập hợp (bộ).
    * Các nhãn định hình miền bằng cách nhóm các nút thành các tập hợp có tên nhất định (label name).
    * Các nhãn có thể thêm, xóa trong thời gian chạy, được sử dụng để đánh dấu trạng thái tạm thời cho các nút. Một nút có thể có 0 hoặc nhiều nhãn.
* Duyệt đồ thị (traversal): Là cách truy vấn đồ thị, điều hướng bắt đầu từ một node đến các node liên quan.

### 1.2 Những khái niệm cơ bản của Cypher
*Tương quan giữa phương pháp truy vấn cơ bản của Cypher và SQL*

![](https://images.viblo.asia/ef99127b-0aac-4cd6-b81a-9acbbd2c80ee.png)

### 1.3 Định dạng của Cypher
* Định dạng nút (nodes)
    * **()**: nút rỗng
    * **(varname:NodeName)**: Nút có nhãn là NodeName, tên biến của nút là varname. Nút có thể không có tên biến.
    * Truy vấn clean: Gợi ý sử dụng cách đặt tên nhãn theo kiểu CamelCase(viết hoa chữ cái đầu).
    * Nên đặt tên nhãn mang tính gợi nhớ tới đối tượng, nhãn nút nên là một danh từ.
    * Tên nhãn có phân biệt chữ hoa chữ thường.
* Định dạng quan hệ (relationship)
    * **[varname:RELATIONSHIP_NAME]**: mối quan hệ có nhãn là RELATIONSHIP_NAME và biến quan hệ là varname.
    * Truy vấn clean: Gợi ý cách đặt tên nhãn theo kiểu upper_case, tất cả được viết hoa và sử dụng dấu gạch nối giữa các từ.
    Nhãn của các quan hệ nên là động từ. Tên nhãn có phân biệt chữ hoa chữ thường.
* Khóa thuộc tính, biến, tham số, bí danh và hàm:
    * Ví dụ: title, size(), count(), firstName...
    * Có phân biệt chữ hoa chữ thường.
    * Truy vấn sạch: nên viết theo định dạng camelCase(chữ cái đầu viết thường).
* Mệnh đề:
    * Ví dụ: `MATCH`, `WHERE`, `WITH`, `UNWIND`...
    * Các mệnh đề không phân biệt chữ hoa chữ thường.
    * Truy vấn sạch: các mệnh đề nên được tạo kiểu là tất cả các chữ in hoa, được đặt ở đầu mỗi dòng để dễ đọc và dễ truy vấn.
* Keyword:
    * Ví dụ: `AND`, `OR`, `IN`, `NOT`, `DISTINCT`, `STARTS WITH`, `CONTAINS`, `ENDS WITH`,...
    * Các keyword không phân biệt chữ hoa chữ thường.
    * Truy vấn sạch: Nên được viết in hoa, không cần đặt ở đầu dòng mới.
* Thụt dòng và ngắt dòng
    * Mỗi mệnh đề nên được ngắt dòng, ngoài ra, các khối truy vấn con, ON CREATE, ON MATCH nên được ngắt dòng và thụt vào 2 khoảng trắng.
    * Sử dụng dấu ngoặc nhọn để nhóm khối truy vấn con. Nếu truy vấn con chỉ có 1 dòng, không cần đặt nó xuống dòng riêng hoặc thụt lề.
* Metacharacter: 
    * Dấu nháy đơn: nên dùng cho các giá trị chuỗi bằng chữ.
    * Ví dụ: 'Mats\\' quote: "statement" ', "Cypher's a nice language"
* Backticks
    * Dùng để tránh thoát các ký tự có khoảng trắng hoặc ký tự đặc biệt.
    * Ví dụ: MATCH (\`odd-ch@racter$\`:\`Spaced Label\` {\`&property\`: 42})
* Dấu chấm phẩy
    * Dùng trong trường hợp có 1 tập các câu lệnh Cypher và cần phân tách giữa các lệnh. Không nên dùng khi chỉ có 1 lệnh.
* Giá trị null và boolean
    * Nên được viết thường trong truy vấn. 
    * Ví dụ: p.birthday = null, missingBirth = true
* Xử lý các mẫu
    * Nếu một mẫu(pattern) bị tràn dòng, nên ngắt dòng sau mũi tên, không phải trước.
    * Ví dụ: 
    ```
    MATCH (:Person)--(:Company)--> 
    (:Country)
    ```
    * Sử dụng các nút và mối quan hệ ẩn danh nếu không được sử dụng sau này trong truy vấn.
    * Ví dụ: 
    ```
    MATCH (:Person)-[:Likes]->
    (technology:Technology)
     RETURN technology
     ```
    * Các mẫu nên nối với nhau để tránh lặp lại biến.
    * Các nút được đặt tên hoặc các điểm chung nên được đặt ở đầu mệnh đề MATCH. Các mối quan hệ mẫu đi (-->) nên để trước các mối quan hệ mẫu đến (<--)
* Khoảng trắng
    * Không nên để khoảng trắng giữa không gian vị từ nhãn. Không có khoảng trắng giữa các mẫu.
    * Một khoảng trắng ở hai bên toán tử. Một khoảng trắng sau dấu phẩy.
    * Không nên để khoảng trắng giữa 2 dấu ngoặc đơn.
    * Dùng khoảng trắng giữa truy vấn con và dấu ngoặc nhọn.

![](https://dzone.com/storage/temp/13887587-1598578278320.png)
# 2. Các lệnh cơ bản trong Cypher
### **2.1 MATCH và RETURN**

Ví dụ 1: Cho label Person có 1 node với property {name:"Jennifer"}

Cypher command: 

`MATCH (p: Person {name: "Jennifer"}) RETURN p`

> [Đọc thêm tài liệu về MATCH](https://neo4j.com/docs/cypher-manual/current/clauses/match/)

### **2.2 Create data với Cypher**

Ví dụ 2: Tạo thêm một node có nhãn(label) Person với property {name: "Mark"}

Cypher command:

`CREATE (p: Person {name: "Mark"}) RETURN p`

> Lưu ý: lệnh return là không bắt buộc. Node vừa tạo sẽ đứng độc lập và chưa có mối quan hệ.

Để thiết lập mối quan hệ cho nó, ta phải sử dụng MATCH để tránh lặp lại nút đã tạo.

Cypher command:

```
MATCH (jennifer: Person {name: “Jennifer”})
MATCH (mark: Person {name: “Mark”})
CREATE (jennifer)-[rel:IS_FRIEND_WITH]->(mark)
```
> Lưu ý: Nếu không có 2 lệnh MATCH như trên, Cypher sẽ tự động tạo các node mới mà không kiểm tra xem nó đã tồn tại trong csdl hay chưa.

### **2.3 Update data với Cypher**

Sử dụng MATCH ... SET để thêm,sửa,xóa các thuộc tính(property) trong 1 nút.

Ví dụ 1: Thêm thuộc tính birthday cho Person Jennifer

Cypher command:
```
MATCH (p: Person {name: “Jennifer”})
SET p.birthday = date(“1999-01-01”)
```
Ví dụ 2: Jennifer làm việc ở công ty "Neo4j" từ năm 2018

Cypher command:

```
MATCH (:Person {name: “Jennifer”})
-[rel:WORK_FOR]->(:Company {name: “Neo4j”)
SET rel.start_year = date({year:2018})
```
### **2.4 Delete data với Cypher**

Ví dụ 1: xóa mối quan hệ bạn bè giữa Jennifer và Mark

Cypher command:

```
MATCH (j: Person {name: “Jennifer”})
-[friend: IS_FRIEND_WITH]->(m: Person {name: “Mark”})
DELETE friend
```
Ví dụ 2: xóa nút Person có property {name: "Mark"}

Cypher command:

```
MATCH (p: Person {name: “Mark”) DELETE p
```
Ví dụ 3: Xóa đồng thời nút và mối quan hệ của nó

Cypher command:

```
MATCH (p: Person {name: “Mark”}) DETACH DELETE p
```

### **2.5 Delete property với Cypher**

* REMOVE: xóa hoàn toàn thuộc tính khỏi nút và không lưu trữ nó nữa.

    Ví dụ 1: Xóa thuộc tính birthday của Jennifer 
    ```
    MATCH (p: Person {name: “Jennifer”})
    REMOVE p.birthday
    ```
* SET: Sử dụng từ khóa SET để đặt giá trị thuộc tính thành null (trong mô hình csdl Neo4j không lưu trữ giá trị null).
    
    Ví dụ 2: Đặt giá trị của thuộc tính birthday thành null
    
    ```
    MATCH (p: Person {name: “Jennifer”})
    SET p.birthday = null
    ```
 
 ### **2.6 Merge trong Cypher**
 
Merge thực hiện chọn lọc và kiểm tra dữ liệu có tồn tại trong csdl hay không, trước khi chèn vào csdl.

Ví dụ 1: Chèn Person Mark vào csdl bằng Merge

Cypher command:
```
MERGE (mark: Person {name: “Mark”})
RETURN mark
```
> Nút mark đã tồn tại trong csdl trước đó, nên câu lệnh trên sẽ không tạo thêm nút mark mới mà chỉ trả về nút mark đã có.

Merge trên 1 mối quan hệ: Sử dụng tương tự như Create. Nếu mối quan hệ chưa được thiết lập, merge sẽ thực hiện tạo mới toàn bộ (mặc dù nút đã tồn tại).

Ví dụ 2: Thực hiện tạo mối quan hệ bạn bè giữa Jennifer và Mark

Cypher command:
```
MATCH (j: Person {name: “Jennifer”})
MATCH (m: Person {name: “Mark”})
MERGE (j)-[r: IS_FRIEND_WITH]->(m)
RETURN j, r, m
```
Sử dụng MATCH để thực hiện khớp dữ liệu trước khi tạo mối quan hệ. Mối quan hệ này đã được tạo trước đó nên Merge chỉ cần trả về dữ liệu đã tồn tại.
> Lưu ý: Nếu chỉ sử dụng MERGE mà không khớp dữ liệu sẽ dẫn đến việc lệnh MERGE tạo lại các nút đã tạo nếu không tìm thấy mối quan hệ giữa các nút đó -> bị lặp dữ liệu.

### **2.7 Kết hợp MERGE, CREATE, MATCH và SET**

Nếu muốn sử dụng MERGE để đảm bảo không tạo ra các bản sao, đồng thời khởi tạo một số thuộc tính mới hoặc cập nhật lại các thuộc tính khác nếu nó chỉ được khớp, trong trường hợp này, ta sử dụng ON CREATE hoặc ON MATCH với SET.

Cypher command:
```
MERGE (m: Person {name: “Mark”})
	-[r:IS_FRIEND_WITH]-(j: Person {name: “Jennifer”})
	ON CREATE SET r.since = date(“2018-01-01”)
	ON MATCH SET r.update = date()
```
### **2.8 Mệnh đề WHERE trong Cypher**

So sánh cú pháp sử dụng truy vấn trước với cú pháp sử dụng với WHERE:

Cypher command before: 
```
MATCH (person: Person {name: “Jennifer”})
RETURN person
```

Cypher command with WHERE:
```
MATCH (person: Person)
WHERE person.name = “Jennifer”
RETURN person
```
> Cả hai truy vấn đều trả về cùng 1 kết quả. WHERE có thể làm nhiều hơn thế.

* WHERE NOT: trả về thuộc tính không khớp với mẫu.

    Cypher command:
    ```
    MATCH (person: Person)
    WHERE NOT person.name = “Jennifer”
    RETURN person
    ```
> Ngoài ra, WHERE còn có thể đi cùng với AND, OR, XOR.

Truy vấn trong một phạm vi nhất định với WHERE:
```
MATCH (person: Person)
WHERE 1999 <= person.yearBirthday <= 2000
RETURN person
```
* WHERE exists(property): kiểm tra xem thuộc tính có tồn tại trong nút hoặc một mối quan hệ có tồn tại trong mẫu.

    Cypher command:
    ```
    MATCH (varname: NodeLabel)
    WHERE exists(varname.property)
    RETURN varname
    ```
* WHERE ... IN: Kiểm tra xem giá trị thuộc tính có phải là giá trị trong danh sách đã cho.

    Cypher command:
    ```
    MATCH (varname: NodeLabel)
    WHERE varname.property IN your_array
    RETURN varname
    ```
### **2.9 Cypher xử lý chuỗi string**

STARTS WITH: tìm chuỗi bắt đầu bằng chuỗi bạn chỉ định.
```
MATCH (varname: NodeLabel)
WHERE varname.property STARTS WITH your_string
RETURN varname.property
```

-----


CONTAINS: kiểm tra xem chuỗi được chỉ định có phải 1 phần của giá trị thuộc tính không.
```
MATCH (varname: NodeLabel)
WHERE varname.property CONTAINS your_string
RETURN varname.property
```


-----


ENDS WITH: tìm chuỗi có kết thúc bằng chuỗi bạn chỉ định.
```
MATCH (varname: NodeLabel)
WHERE varname.property ENDS WITH your_string
RETURN varname.property
```


-----


Regular expressions: kiểm tra một phần giá trị của chuỗi bằng biểu thức chính quy.

Ví dụ: Tìm tất cả các nút Person có bắt đầu bằng "Jo".

Cypher command:
```
MATCH (p: Person)
WHERE p.name =~ 'Jo.*'
RETURN p.name
```
### **2.10 Optional patterns trong Cypher**

Trả về kết quả kể cả khi chúng không khớp với toàn bộ mẫu hoặc tất cả các tiêu chí. Nó tương tự như outer join trong SQL.
* OPTIONAL MATCH: nếu không tìm thấy kết quả, hàng được khớp sẽ trả về null.
    
    Ví dụ: Tìm những người có tên bắt đầu bằng 'J' và làm việc trong công ty.
    ```
    MATCH (p: Person) WHERE p.name STARTS WITH 'J'
    OPTIONAL MATCH (p)-[:WORK_FOR]->(c:Company)
    RETURN p.name, c.name
    ```
> Lệnh Cypher trên sẽ trả về tất cả những người có tên bắt đầu bằng 'J', và tên công ty mà họ đang làm việc. Những người không làm việc ở công ty, tên công ty mà họ làm việc sẽ trả về giá trị null.

### **2.11 Các mẫu phức tạp**

Ví dụ: Tìm những người cũng thích công nghệ đồ thị ngoài Jennifer và họ là bạn của Jennifer.
```
MATCH (j: Person {name: “Jennifer”})
-[:LIKES]->(:Technology {name: “Graph”})
<-[:LIKES]-(p: Person),
(j)-[:IS_FRIENDs_WITH]-(p)
RETURN p.name
```
> Ví dụ trên sử dụng dấu phẩy để nối các mẫu, dấu phẩy cho phép xâu chuỗi các mẫu lại với nhau (tương tự WHERE exists(pattern)). Tuy nhiên cấu trúc này có thể thêm nhiều mẫu khác nhau linh hoạt hơn trong đồ thị.



-----


Trên đây là bài viết tổng quan về Cypher cũng như các lệnh để truy vấn Cypher căn bản mà mình đã tổng hợp được. Hi vọng bài viết này sẽ giúp các bạn trong bước đầu tìm hiểu ngôn ngữ truy vấn mới này. Chúc các bạn có một ngày làm việc hiệu quả :hugs::hugs::hugs:
# Tài liệu tham khảo
[1. Cypher query language - for beginners](https://neo4j.com/developer/cypher/#:~:text=Cypher%20is%20Neo4j's%20graph%20query,other%20standard%20data%20access%20languages.)

[2. Tổng quan về SQL](https://quantrimang.com/tong-quan-ve-sql-142305#:~:text=SQL%2C%20vi%E1%BA%BFt%20t%E1%BA%AFt%20c%E1%BB%A7a%20Structured,s%E1%BB%9F%20d%E1%BB%AF%20li%E1%BB%87u%20quan%20h%E1%BB%87.)