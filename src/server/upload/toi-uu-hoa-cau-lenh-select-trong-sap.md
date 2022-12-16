Author: ***[QuynhBC](https://www.facebook.com/bui.congquynh/)***

Xin chào các bạn. Ở bài viết ***[04](https://viblo.asia/p/structure-va-table-trong-sap-abap-4P856rq35Y3)*** lần trước mình có đề cập tới Structure và Table type vì vậy trong lần tiếp theo này mình nói về cách mà chúng ta nên tối ưu hóa hiệu suất của câu lệnh SELECT trong quá trình lấy Data truyền vào STructure và Table Type.

**1.DATABASE**

* SAP DB là một hệ thống cơ sở dữ liệu SQL dựa trên mã nguồn mở, độc lập với nền tảng, được cung cấp bởi SAP cho các doanh nghiệp. Cơ sở dữ liệu này có thể hỗ trợ các ứng dụng SAP và không phải SAP và có khả năng mở rộng cao. SAP DB cần ít dung lượng đĩa hơn các hệ thống cơ sở dữ liệu khác như Oracle hoặc Informix, và cung cấp cho các tổ chức một giải pháp cơ sở dữ liệu hoàn chỉnh, sẵn có. SAP DB chạy thành công trên các bản cài đặt ở mọi kích thước.
* Có thể hiểu là: cơ sở dữ liệu dùng để chỉ một chương trình có nhiệm vụ là lưu trữ và quản lý dữ liệu.
* Note: Ổ cứng hay các thiết bị lưu trữ ngoại vi có được coi là một database hay không bởi vì nó cũng có thể dùng để lưu trữ dữ liệu. Không hoàn toàn bởi vì nó chỉ có thể dùng lưu trữ data mà thôi. Còn database thì yêu cầu lưu trữ theo một nguyên tác nào đó hay thường được dùng nhất là Hàng  ( Rows ) hoặc Cột (Cell ) và được đi kèm theo hệ thống hay chương trình dùng quản lý Data đó được gọi là Hệ quản trị cơ sở dữ liệu ( Database Management System - DBMS ) va muốn làm việc với nó thì cần thông qua một giao tiếp là SQL - Structure Query Language.
* Các loại Database phổ biến: MySQL, Oracle, MaxDB, ...


**2.SELECT SQL Statements.**
```
SELECT [SINGLE [FOR UPDATE]]
       { select_clause
         FROM source }
      |{ FROM source
         FIELDS select_clause }
       [[FOR ALL ENTRIES IN itab] WHERE sql_cond]
       [GROUP BY group] [HAVING group_cond]
       [UNION [ALL|DISTINCT]  select]
       [ORDER BY sort_key]
       INTO|APPENDING target
       [additional_options].
  ...
[ENDSELECT].

```

* SELECT là câu lệnh SQL mở để đọc dữ liệu từ một hoặc nhiều bảng cơ sở dữ liệu, dạng xem cổ điển hoặc thực thể CDS thành các đối tượng dữ liệu.
* Câu lệnh SELECT tạo tập kết quả nhiều hàng hoặc một hàng được gán cho các đối tượng dữ liệu ABAP phù hợp.
* SELECT Statements select_clause xác định cấu trúc của tập kết quả của câu lệnh SELECT. Nó chủ yếu bao gồm một danh sách SELECT xác định các cột của tập kết quả.
* Sau FROM, các nguồn dữ liệu, từ đó cơ sở dữ liệu được đọc, được chỉ định trong nguồn. Tất cả các nguồn dữ liệu phải được xác định trong ABAP Dictionary.
* Tập kết quả có thể bị hạn chế bằng cách sử dụng thêm WHERE.
* Việc bổ sung GROUP BY hợp nhất nhiều hàng cơ sở dữ liệu thành một hàng của tập kết quả. Việc bổ sung HAVING hạn chế các hàng đã hợp nhất.
* UNION bổ sung tạo ra sự kết hợp của các hàng trong bộ kết quả của hai câu lệnh SELECT.
* Việc bổ sung ORDER BY sắp xếp tập hợp kết quả. Nếu ORDER BY không được chỉ định, thứ tự của các hàng trong tập kết quả không được xác định.
* Sau khi INTO hoặc APPENDING, các đối tượng dữ liệu mà tập kết quả được chỉ định theo hàng hoặc theo gói, được chỉ định trong mục tiêu.


Dưới dây là môt vài VD bạn có thể gặp:
```
DATA WA TYPE SPFLI.

SELECT SINGLE *
       FROM SPFLI
       INTO CORRESPONDING FIELDS OF WA
       WHERE CARRID = 'LH' AND
             CONNID = '0400'.
```
```
PARAMETERS: P_CITYFR TYPE SPFLI-CITYFROM,
            P_CITYTO TYPE SPFLI-CITYTO.

TYPES: BEGIN OF WA,
         FLDATE   TYPE SFLIGHT-FLDATE,
         CARRNAME TYPE SCARR-CARRNAME,
         CONNID   TYPE SPFLI-CONNID,
       END OF WA.
DATA: LT_TABLE TYPE TABLE OF WA.
SELECT C~CARRNAME
       P~CONNID
       F~FLDATE
  FROM SCARR AS C

  INNER JOIN SPFLI AS P ON P~CARRID  = C~CARRID  AND
                           P~CITYFROM = P_CITYFR AND
                           P~CITYTO   = P_CITYTO
  INNER JOIN SFLIGHT AS F ON F~CARRID = P~CARRID AND
                             F~CONNID = P~CONNID
  INTO CORRESPONDING FIELDS OF TABLE LT_TABLE
  WHERE P~CITYFROM = P_CITYFR AND
        P~CITYTO   = P_CITYTO.
```


**3. Tối ưu hóa SELECT SQL Statements.**

* Đảm bảo rằng dữ liệu được chọn với hỗ trợ khóa chính / chỉ mục phụ với các trường trong mệnh đề WHERE của câu lệnh select theo thứ tự giống như các trường trong chỉ mục.
* Câu lệnh SQL phải có mệnh đề WHERE chỉ truyền một lượng dữ liệu tối thiểu. Tránh sử dụng điều kiện NOT trong mệnh đề WHERE. Chúng không thể được xử lý thông qua một chỉ mục. 
* Sử dụng SELECT column1 column2…  không nên dùng SELECT *
* Mệnh đề WHERE phải đơn giản; nếu không, trình tối ưu hóa có thể quyết định chỉ mục sai hoặc hoàn toàn không sử dụng chỉ mục. Mệnh đề WHERE đơn giản nếu nó chỉ định từng trường của chỉ mục bằng cách sử dụng AND và điều kiện bằng = .
* Chọn bằng phép nối thay vì các câu lệnh chọn lồng nhau, nếu số lượng bản ghi được tìm nạp nhiều hơn 5. Đảm bảo rằng các trường nối là trường được khóa. Giới hạn các bảng trong một phép nối thành ba bảng
* Sử dụng  FOR ALL ENTRIES trong câu lệnh SELECT trong câu lệnh LOOPS.
```
DATA: LT_EKPO TYPE TABLE OF EKPO,
      LT_EKKO TYPE TABLE OF EKKO.
      
      SELECT * FROM EKKO INTO TABLE OF LT_EKKO.
      IF LT_EKKO IS NOT INTINIAL.
          SORT LT_EKKO BY EBELN.
          DELETE ADJACENT DUPLICATES FROM LT_EKKO.
          SELECT EBELN
                 EBELP
              FROM EKPO
              INTO CORRESPONDING FIELD OF TABLE LT_EKPO
              FOR ALL ENTRIES IN LT_EKKO
              WHERE EBELN = LT_EKKO-EBELN.
      ENDIF.
```