Như chúng ta đã biết, khi truy vấn vào cơ sở dữ liệu bất cứ ở môi trường nào (test, develop hay là production) thì tối ưu hóa các câu lệnh truy vấn là điều bắt buộc chúng ta phải làm để tối ưu hóa performance của ứng dụng. Một truy vấn không hiệu quả có thể là gánh nặng cho cơ sở dữ liệu và gây hiệu suất chậm, thậm chí có thể làm mất kết nối tới ứng dụng nếu câu truy vấn sql có lỗi. Do đó, điều quan trọng nhất là tối ưu hóa các câu truy vấn sql để tác động tối thiểu đến hiệu suất của cơ sở dữ liệu cũng như ứng dụng.

I. Xác định yêu cầu business trước khi bắt đầu.

Các bạn có thể tham khảo bài viết [tại đây](https://www.sisense.com/blog/requirements-elicitation-enterprise-business-analytics/), nó đề cập đến việc xác định yêu cầu business cho BI một các tốt nhất. Những thực tiễn trong bài viết là cở sở để áp dụng trong việc tối ưu hóa các truy vấn vào cơ sở dữ liệu, bao gồm:

* *Xác định các bên liên quan (stakeholders)*:  hãy chắc chắn rằng tất cả các bên liên quan đang thảo luận để phát triển truy vấn của các bạn. Khi truy vấn cơ sở dữ liệu production, hãy đảm bảo team DBA phải được tham gia vào.
* *Tập trung vào kết quả đầu ra của business* : hãy chắc chắn rằng truy vấn database có một mục đích xác định và duy nhất. Việc điều tra thêm về cơ sở dữ liệu production cho việc lập báo cáo thăm dò hoặc khám phá chúng trước để tránh các rủi ro là cần thiết.
* *Khung thảo luận cho các requirements tốt*:  Xác định chức năng (function) và phạm vi (scope) của báo cáo bằng cách xác định các đối tượng dự định của nó. Điều này làm tập trung các truy vấn trong bảng (tables) có độ chi tiết chính xác.
* *Phát triển các requirements bằng cách đặt ra các câu hỏi tốt*: những câu hỏi đó thường theo dạng 5W - Who? What? Where? When? Why?
* *Viết rõ và cụ thể nhất các requirements và phải confirm chúng với các bên liên quan (stakeholders)*: hiệu suất của cơ sở dữ liệu là cực kì quan trọng và liên quan tới một requirements rõ ràng hay là mơ hồ. Đảm bảo các requirements rõ ràng và cụ thể nhất càng tốt và xác nhận requirements với tất cả các bên liên quan trước khi chạy các truy vấn tới cở sở dữ liệu.

II. Định nghĩa các SELECT fields thay vì dùng SELECT *

Khi chạy các truy vấn vào databas, rất nhiều nhà phát triển SQL sử dụng SELECT * (nghĩa của nó là select ra toàn bộ) như một các viết quen tay để chọn ra tất cả các dữ liệu có sẵn trong một bảng. Tuy nhiên nếu một bảng có nhiều trường và rất nhiều dữ liệu sẵn có ở trong đó, việc chọn ra tất cả chúng là không cần thiết.

Chúng ta cần xác định các fields trong lệnh SELECT để chỉ lấy ra các dữ liệu cần thiết đáp ứng yêu cầu nghiệp vụ (business requirements). Hãy xem xét một ví dụ trong đó yêu cầu nghiệp vụ yêu cầu lấy địa chỉ gửi thư cho khách hàng.

Truy vấn không hiệu quả:

```
SELECT *
FROM customers
```

Truy vấn này có thể lấy cả những fields khác trong dữ liệu đầu ra ở bảng `customers`, ví dụ như số điện thoại, ngày hoạt động, ngày tạo ra (created_at), ngày chỉnh sửa (updated_at) ...

Truy vấn hiệu quả:

```
SELECT FirstName, LastName, Address, City, State, Zip
FROM customers
```

Truy vấn này sẽ chỉ lấy những thông tin cần thiết cho việc gửi thử.

III. Chọn nhiều fields để tránh việc dùng SELECT DISTINCT

SELECT DISTINCT là một cách thuận tiện để loại bỏ những trùng lặp khỏi truy vấn. SELECT DISTINCT hoặc động bằng các nhóm (GROUP) tất cả các trường (FIELD) trong truy vấn để phục vụ cho việc tạo ra các kết quả không trùng lặp. Để thực hiện được việc này thì cần một lượng lớn process. Ngoài ra dữ liệu có thể được nhóm lại không chính xác. Để tránh sử dụng DISTINCT trong truy vấn, nên chọn nhiều trường để tạo ra kết quả duy nhất và không bị lặp

Truy vấn không hiệu quả và không chính xác:

```
SELECT DISTINCT FirstName, LastName, State
FROM customers
```

Truy vấn này không lấy ra nhiều người cùng state, first name và last name. Những các tên nổi tiếng như David Smith hay Diane Johnson sẽ được nhóm lại với nhau, gây ra số lượng record không chính xác. Trong lượng cơ sở dữ liệu lớn, có nhiều khác hàng tên David Smith hay Diane Johnson sẽ làm truy vấn chậm chạp.

Truy vấn hiệu quả và chính xác:

```
SELECT FirstName, LastName, Address, City, State, Zip
FROM customers
```

Bằng cách sử dụng nhiều trường, các bản ghi không được trùng lặp đã được trả về mà không sử dụng DISTINCT trong truy vấn. Cơ sở dữ liệu không phải nhóm bất kì trường nào, và một số lượng lớn record trả về là chính xác.

IV. Sử dụng JOINS và INNER JOIN sẽ tốt hơn dùng WHERE

Một số người làm việc với SQL thích kết nối bảng bằng việc dùng WHERE, chẳng hạn như sau:

```
SELECT Customers.CustomerID, Customers.Name, Sales.LastSaleDate
FROM Customers, Sales
WHERE Customers.CustomerID = Sales.CustomerID
```

Loại kết nối các bảng này tạo ra một Cartesian Join, hay còn gọi là Cartesian Product hay CROSS JOIN. Trong một  Cartesian Join, tất cả các kết hợp của các biến được tạo ra. Ở trong ví dụ này, nếu chúng ta có 1000 customers với 1000 sales, trước tiên truy vấn sẽ tạo ra 1.000.000 kết quả, và sau đó chỉ lọc 1000 bản ghi trong đó có ID được kết nối chính xác. Đây là việc sử dụng tài nguyên cơ sở dữ liệu không hiệu quả, vì cơ sở dữ liệu đã thực hiện nhiều hơn 100 lần so với yêu cầu.  Cartesian Join là 1 vấn đề trong giải quyết cơ sở dữ liệu quy mô lớn, bởi vì  Cartesian Join gồm 2 bảng lớn có thể tạo ra hàng nghìn hoặc hàng tỉ kết quả.

Để tránh ra việc tạo Cartesian Join, nên sử dụng INNER JOIN để thay thế:

```
SELECT Customers.CustomerID, Customers.Name, Sales.LastSaleDate
FROM Customers
   INNER JOIN Sales
   ON Customers.CustomerID = Sales.CustomerID
```

Câu truy vấn sẽ chỉ tạo ra 1000 bản ghi mong muốn trong đó customer_id bằng nhau.

Một số hệ thống DBMS có thể nhận ra việc dùng WHERE và tự động chạy chúng dưới dạng INNER JOIN. Trong các hệ thống DBMS đó, sẽ không có sự khác biệt giữa hiệu xuất của việc dùng WHERE và INNER JOIN. Tuy nhiên thì INNER JOIN được công nhận được tất cả các hệ thống DBMS. DBA sẽ tư vấn cho bạn nên dùng cái nào là tốt nhất.

V. Sử dụng WHERE thay vì việc sử dụng HAVING trong việc lọc records.

Tương tự như khái niệm đã đề cập ở trên, mục tiêu của 1 truy vấn hiệu quả là chỉ lấy ra các bản ghi cần thiết từ cơ sở dữ liệu. Theo thứ tự hoạt động của SQL, câu lệnh HAVING được thực hiện sau câu lệnh WHERE. Nếu mục đích chỉ để lọc query dựa trên các điều kiện thì câu lệnh WHERE hiệu quả hơn.

Ví dụ: giả sử 200 sales đã được thực hiện trong năm 2019 và muốn truy vấn số lượng sales trên mỗi customer năm 2019

```
SELECT Customers.CustomerID, Customers.Name, Count(Sales.SalesID)
FROM Customers
   INNER JOIN Sales
   ON Customers.CustomerID = Sales.CustomerID
GROUP BY Customers.CustomerID, Customers.Name
HAVING Sales.LastSaleDate BETWEEN #1/1/2016# AND #12/31/2019#
```

Câu lệnh sẽ lấy ra 1000 bản ghi sales ở trong database, và lọc 200 bản ghi được tạo ra năm 2019, cuối cùng đếm số bản ghi trong bộ dữ liệu.

Trong so sánh, các mệnh đề WHERE giới hạn số lượng bản ghi:

```
SELECT Customers.CustomerID, Customers.Name, Count(Sales.SalesID)
FROM Customers 
  INNER JOIN Sales
  ON Customers.CustomerID = Sales.CustomerID
WHERE Sales.LastSaleDate BETWEEN #1/1/2016# AND #12/31/2019#
GROUP BY Customers.CustomerID, Customers.Name
```

Truy vấn này sẽ lấy 200 bản ghi năm 2019, sau đó đếm các bản ghi trong bộ dữ liệu. Bước đầu tiên trong mệnh đề HAVING đã được loại bỏ hoàn toàn. 

HAVING chỉ nên dùng khi chúng ta lọc trên trường tổng hợp. Trong truy vấn trên, chúng ta có thể lọc cho các customers có sales lớn hơn 5 bằng cách sử dụng HAVING.

```
SELECT Customers.CustomerID, Customers.Name, Count(Sales.SalesID)
FROM Customers
   INNER JOIN Sales 
   ON Customers.CustomerID = Sales.CustomerID
WHERE Sales.LastSaleDate BETWEEN #1/1/2016# AND #12/31/2016#
GROUP BY Customers.CustomerID, Customers.Name
HAVING Count(Sales.SalesID) > 5
```

VI. Chỉ sử dụng kí tự đại diện (%) ở cuối cụm từ khóa lọc.

Khi tìm kiếm dữ liệu văn bản, chẳng hạn như các thành phố hoặc tên riêng, kí tự đại diện (%) sẽ tạo ra tìm kiếm rộng nhất có thể. Tuy nhiên, tìm kiếm rộng nhất theo kiểu này cũng không phải là hiệu quả nhất.

Khi sử dụng kí tự đại diện ở trên đầu, đặc biệt là kết hợp với kí tự đại diện kết thúc. Cơ sở dữ liệu có nhiệm vụ tìm kiếm tất cả các bản ghi mà có trường đã chọn được match với từ khóa chứa kí tự đại diện.

Hãy xem truy vấn sau đây để lấy các customers của thành phố có tên bắt đầu với từ `Char`:

```
SELECT city FROM customers
WHERE city LIKE ‘%Char%’
```