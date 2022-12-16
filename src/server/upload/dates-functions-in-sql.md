> Trong quá trình làm việc với data bạn sẽ cần dùng rất nhiều đến Date Functions. Bạn muốn tính con số Today, This weeks, This Month, Last month, MTD, YTD,... bla bla? Hy vọng bài viết này sẽ cung cấp được 1 cái nhìn tổng quát nhất các cách thức có thể xử lý với Date Functions.
> Note: Bài viết dùng Oracle DB

## 1. Datatypes of dates
 Có 3 kiểu dữ liệu về ngày tháng ở oracle: 
* DATE: DATE là kiểu dữ liệu lâu đời nhất và được sử dụng phổ biến nhất để làm việc với ngày tháng trong các ứng dụng Oracle. Kiểu dữ liệu này lưu trữ ngày và giờ. Nó không bao gồm timezone.
* TIMESTAMP — TIMESTAMP tương tự như DATE nhưng có 02 sự khác biệt sau:
(1) Có thể lưu trữ và thao tác các thời gian được phân giải chính xác đến từng phần tỷ giây (độ chính xác 9 chữ số thập phân) và 
(2) bạn có thể liên kết timezone với TIMESTAMP và Cơ sở dữ liệu Oracle sẽ tính đến timezone đó khi thao tác trên TIMESTAMP.
* INTERVAL — Trong khi DATE và TIMESTAMP ghi lại một thời điểm cụ thể, INTERVAL ghi lại và tính toán khoảng thời gian. Bạn có thể chỉ định khoảng thời gian theo năm và tháng hoặc ngày và giây.

## 2. Getting the current date and time
Function	Time Zone	Datatype Returned
CURRENT_DATE	Session	DATE
CURRENT_TIMESTAMP	Session	TIMESTAMP WITH TIME ZONE
LOCALTIMESTAMP	Session	TIMESTAMP
SYSDATE	Database server	DATE
SYSTIMESTAMP	Database server	TIMESTAMP WITH TIME ZONE

## 3. Converting dates to strings 
* `TO_CHAR (SYSDATE,'Day', DDth Month YYYY')`
* Cách xem quý hiện tại là gì?
`SELECT TO_CHAR (SYSDATE, 'Q') FROM dual;`
* Cách xem ngày thuộc năm (1-366)?
```
TO_CHAR (SYSDATE, 'DDD')
SELECT TO_CHAR (SYSDATE, 'DDD') FROM dual;
```
* Cách xem giờ phút giây chi tiết, nếu như Oracle của bạn chỉ hiển thị ngày tháng năm, nhưng bạn muốn xem chi tiết đến giờ phút giây --> sẽ làm cách nào --> Chỉ cần to_char để kiểm tra. 
`select TO_CHAR (created_at, 'YYYY-MM-DD HH24:MI:SS') from ABC`

##  4.EXTRACT ()
*  Để trích xuất và trả về giá trị của một phần tử được chỉ định của ngày.
* What year is it?
`EXTRACT (YEAR FROM SYSDATE)`
* What is the day for today’s date?
`EXTRACT (DAY FROM SYSDATE) `

## 5. To convert a string to a date, 
* Dùng TO_DATE hoặc TO_TIMESTAMP để convert từ string sang dates
`TO_DATE ('January 12 2011', 'Month DD YYYY');`

## 6/ Date truncation
* Cách sử dụng hàm TRUNC phổ biến nhất là TRUNC (DATE) : thời gian sẽ được set về 00:00:00
* Hàm này cắt bớt ngày tháng. Sử dụng chức năng tích hợp TRUNC để cắt bớt một ngày thành đơn vị đo lường được chỉ định. mà không có bất kỳ mặt nạ định dạng nào được chỉ định. Trong trường hợp này, TRUNC chỉ cần đặt thời gian là 00:00:00. 
Cùng theo dõi các ví dụ sau sẽ hình dung ngay được nhé!

Set l_date to today’s date, but with the time set to 00:00:00:
* `TRUNC (SYSDATE);`
Get the first day of the month for the specified date:
* `TRUNC (SYSDATE, 'MM');`
Get the first day of the quarter for the specified date:
* `TRUNC (SYSDATE, 'Q');`
Get the first day of the year for the specified date:
* `TRUNC (SYSDATE, 'Y');`
## 7. Một số function bổ sung khác
* ADD_MONTHS—adds the specified number of months to or subtracts it from a date (or a time stamp)
* NEXT_DAY—returns the date of the first weekday named in the call to the function
* LAST_DAY—returns the date of the last day of the month of the specified date

## 8. TIPS and detail examples

```
SELECT 
 TO_CHAR (SYSDATE, 'DDD')
 ,TO_CHAR (SYSDATE, 'YYYY-MM-DD HH24:MI:SS')
 ,CURRENT_DATE
 ,CURRENT_TIMESTAMP
 ,LOCALTIMESTAMP
 ,SYSDATE
 ,SYSTIMESTAMP
 ,SYSDATE - SYSTIMESTAMP
 ,EXTRACT (YEAR FROM SYSDATE)
 ,EXTRACT (DAY FROM SYSDATE)
 ,TRUNC (SYSDATE)
 ,TRUNC (SYSDATE, 'MM')
 ,TRUNC (SYSDATE, 'Q')
 ,TRUNC (SYSDATE, 'Y')
 ,SYSDATE + 1
 ,TO_CHAR(SYSDATE - 1/24,'YYYY-MM-DD HH24:MI:SS')
 ,To_CHAR(SYSDATE + 10 / (60 * 60 * 24),'YYYY-MM-DD HH24:MI:SS')
 ,ADD_MONTHS (SYSDATE, 1)
 ,ADD_MONTHS (SYSDATE, -3)
 ,ADD_MONTHS (TO_DATE ('31-jan-2011', 'DD-MON-YYYY'), 1)
 ,ADD_MONTHS (TO_DATE ('28-feb-2011', 'DD-MON-YYYY'), -1)
 ,NEXT_DAY (SYSDATE, 'SAT')
 ,NEXT_DAY (SYSDATE, 'SATURDAY')
 ,LAST_DAY(SYSDATE)
FROM dual;
```
ngoài ra có thể tìm min or max của date theo cú pháp: 
```
select min ( order_datetime ) start_date, 
         max ( order_datetime ) end_date 
```
Trên đây là ví dụ mình dùng với sysdate. Nếu các bạn muốn áp dụng các date functions trên cho 1 column cụ thể nào đó của bảng chỉ cần thay sysdate bằng column_name là được. 
Hoặc muốn lồng nhiều các function vào nhau thì các bạn tùy biến thay đổi để phục vụ cho mục đích sử dụng của mỗi người. 
Ví dụ: 
ADD_MONTHS(LAST_DAY(hire_date), 5)) "Sample Date".
Or các công thức trên chỉ cần thay đổi số là có thể tính toán được như mong muốn. 
Năm vững cách xử lý về date functions sẽ giúp tự tin hơn rất nhiều trong quá trình làm việc với SQL.
## 9. Tài liệu tham khảo
1. https://www.oracletutorial.com/oracle-date-functions/
2. https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions050.htm
3. https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions183.htm
4. https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions072.htm