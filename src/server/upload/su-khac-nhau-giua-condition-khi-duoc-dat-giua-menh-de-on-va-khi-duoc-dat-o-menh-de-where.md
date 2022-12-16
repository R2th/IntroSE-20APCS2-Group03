Sql, là những khái niệm cơ bản nhất của việc lập trình, tuy nhiên, có thể một số bạn vẫn chưa biết, hoặc thiếu để ý đúng mức một số vấn đề ===> dẫn đến việc xảy ra bug :

# Sự khác nhau giữa condition khi được đặt giữa mệnh đề ON và khi được đặt ở mệnh đề WHERE
Ta có một ví dụ đơn giản như sau :
```
SELECT CUS.*
FROM Customers AS CUS 
LEFT JOIN Orders AS ORD 
ON CUS.CustomerID = ORD.CustomerID
WHERE ORD.OrderDate >'20090515'
```
```
SELECT CUS.*
FROM Customers AS CUS 
LEFT JOIN Orders AS ORD 
ON CUS.CustomerID = ORD.CustomerID
AND ORD.OrderDate >'20090515'
```

Ở câu query đầu tiên, ta thấy câu điều kiện được đặt ở mệnh đề WHERE, dưới đây là cách thức xử lý của sql :
1. Select từ table Orders các record có điều kiện ORD.CustomerID = CUS.CustomerID
2. Join kết quả của 2 table
3. Lọc kết quả đã tìm được với điều kiện ORD.OrderDate >'20090515' và trả về

Với câu query thứ 2, cách thức xử lý của sql :
1. Select từ table Orders các record có đồng thời điều kiện (ORD.CustomerID = CUS.CustomerID) và (ORD.OrderDate >'20090515'). Tức filtered. 
2. Join kết quả của 2 table và trả về

Do đó :
- Về performance, vì data ở query thứ 2 đã được lọc(filtered) trước khi join 2 bảng với nhau, nên performance có thể cải thiện hơn so với query thứ 1(!?!)(Theo như **Một số** comment trên Stackoverflow. Not sure :|)
- Về kết quả, ở query thứ 1, data sau khi trả về sẽ bị lọc bỏ những record có ORD.OrderDate >'20090515'. Nhưng vấn đề ở đây là ta đang sử dụng LEFT JOIN(tức liệt kê toàn bộ những kết quả của table Customers), do đó một số kết quả sẽ bị missed so với kết quả ta mong muốn. Ngược lại, đặt điều kiện ở mệnh đề ON sẽ bảo toàn được dữ liệu ta mong muốn.

Nên :
- Ta chỉ nên đặt các điều kiện ở mệnh đề WHERE khi đó là điều kiện đang tương tác với các trường ở Table bên Trái.

Note :
- Tương tự với RIGHT JOIN.
- Kết quả INNER JOIN là tương đương nhau, không như LEFT và RIGHT JOIN.

Nguồn : http://www.sqlviet.com/blog/left-join-voi-menh-de-where, https://stackoverflow.com/questions/354070/sql-join-where-clause-vs-on-clause