Tác giả: ***[QuynhBC](https://www.facebook.com/bui.congquynh)***

Bài viết: 03.

Giống như tiêu đề bài viết. Bài viết này đi sâu vào kiểu dữ liệu có trong SAP ABAP.
## Các kiểu dữ liệu
### Data Type - Data Object
* Elementary Type
* Complex Data Type
* Reference Type.

***1.Elementary Type***

Là loại dữ liệu nhỏ nhất trong SAP và chúng không được cấu tạo từ các loại khác. Chúng sẽ được phân loại thành các loại cơ bản có độ dài cố định và độ dài thay đổi.
* Có 13 kiểu dữ liệu cơ bản có độ dài cố định được tích hợp sẵn trong ABAP. Có tám kiểu số, cụ thể là số nguyên (b, s, i, int8), số dấu phẩy động thập phân (decfloat16, decfloat34), số dấu phẩy động nhị phân (f) và số đóng gói (p). Có hai kiểu giống ký tự, đó là trường văn bản (c) và trường văn bản số (n). Có một kiểu giống như byte, cụ thể là các trường byte (x). Có hai loại ngày và giờ, đó là trường ngày (d) và trường thời gian (t). Các kiểu dữ liệu c, n, x và p là chung về độ dài. p cũng chung chung về số chữ số thập phân. Các kiểu dữ liệu số b và s không thể được chỉ định trực tiếp trong các chương trình dành cho số nguyên ngắn.
* Có hai kiểu dữ liệu cơ bản có độ dài thay đổi được tích hợp sẵn trong ABAP. Có một kiểu giống ký tự, đó là chuỗi văn bản (string). Có một kiểu giống như byte, cụ thể là chuỗi byte (xstring).

VD:

```
data: lv_c type c length 1,
      lv_string type string,
      lv_datetime type d.
```



***2.Reference Types***

* Mô tả các đối tượng dữ liệu có chứa các tham chiếu đến các đối tượng khác (các đối tượng dữ liệu và các thể hiện của các lớp), được gọi là các biến tham chiếu. Không có loại tham chiếu được xác định trước trong ABAP. Loại tham chiếu phải được định nghĩa trong chương trình ABAP hoặc trong Từ điển ABAP. Các kiểu tham chiếu tạo thành một hệ thống phân cấp, biểu thị thứ bậc của các đối tượng mà các tham chiếu có thể trỏ tới.

VD:
```
Data: go_object type ref to zclass.
```

***3.Complex Data Type***

* Bao gồm các loại khác. Chúng cho phép quản lý và xử lý các bộ dữ liệu liên quan đến ngữ nghĩa dưới một tên. Một đối tượng dữ liệu thuộc loại phức hợp có thể được truy cập tổng thể hoặc theo thành phần. Ngoại trừ cấu trúc **SY**, không có kiểu dữ liệu phức tạp nào được tích hợp sẵn trong ABAP. Một kiểu phức tạp phải được định nghĩa trong chương trình ABAP hoặc trong ABAP Dictionary.
* Có 2 loại kiểu dữ liệu phức tạp:


    * Structure Type:  là một chuỗi của bất kỳ kiểu dữ liệu cơ bản, kiểu dữ liệu tham chiếu hoặc kiểu dữ liệu phức tạp nào. Các cấu trúc được sử dụng để nhóm các khu vực làm việc lại với nhau một cách hợp lý.
    * Table Type: là kiểu dữ liệu bao gôm rất nhiều hàng mà có cùng một kiểu dữ liệu. Để truy cập vào Table Type cần xác định được khóa KEY của từng bảng.

VD:
```
  TYPES: BEGIN OF LTY_STRUC,
           LV_C   TYPE C,                 "char
           LV_STR TYPE STRING,            "string
           LV_D   TYPE D,                 "date time
         END OF LTY_STRUC.                "Structure type
  DATA: LT_TABLE TYPE TABLE OF LTY_STRUC. "Table type
```

### Object Type

* Kiểu dữ liệu là các khuôn mẫu để tạo các **data Object**. Các kiểu dữ liệu có thể được định nghĩa độc lập trong chương trình ABAP hoặc trong  **ABAP Dictionary** 

* Là thuộc tính của một đối tượng dữ liệu, các kiểu dữ liệu cũng có thể tồn tại ở trạng thái không độc lập. Các kiểu dữ liệu không sử dụng bất kỳ không gian bộ nhớ nào cho dữ liệu công việc, nhưng có thể yêu cầu bộ nhớ cho thông tin quản trị.
* Nó có thể là Class, Interface.

*Vd dưới đây là **Class** được khởi tạo trên Local hoặc Global.*

***1.Local: Class được viết trong cùng một chương trình***
```
REPORT ZPG_LOCAL_CLASS.

CLASS PERSON DEFINITION.
  PUBLIC SECTION.
    DATA: GV_NAME(20)  TYPE C,
          GV_YEAR(4)   TYPE C,
          GV_EMAIL(20) TYPE C.
    METHODS: CONSTRUCTOR IMPORTING IV_NAME  LIKE GV_NAME
                                   IV_YEAR  LIKE GV_YEAR
                                   IV_EMAIL LIKE GV_EMAIL.
    METHODS: SET_AGE.
    METHODS: DISPLAY.
  PRIVATE SECTION.
    DATA: GV_AGE(4) TYPE C.
ENDCLASS.
CLASS PERSON IMPLEMENTATION.
  METHOD CONSTRUCTOR.
    GV_NAME = IV_NAME.
    GV_YEAR = IV_YEAR.
    GV_EMAIL = IV_EMAIL.
  ENDMETHOD.
  METHOD SET_AGE.
    GV_AGE = SY-DATUM+0(4) - GV_YEAR.
  ENDMETHOD.
  METHOD DISPLAY.
    SET_AGE( ).
    WRITE: / 'Name:',GV_NAME,
    / 'Year of birth:',GV_YEAR,
    / 'Email:',GV_EMAIL,
    / 'Age:',GV_AGE.
  ENDMETHOD.
ENDCLASS.
*DATA: gv_id TYPE i VALUE 0.
CLASS STUDENT DEFINITION INHERITING FROM PERSON.
  PUBLIC SECTION.
    CLASS-DATA: STT TYPE I.
    DATA: GV_ID TYPE CHAR3.
    METHODS DISPLAY REDEFINITION.
    METHODS: CONSTRUCTOR IMPORTING IV_ID    LIKE GV_ID
                                   IV_NAME  LIKE GV_NAME
                                   IV_YEAR  LIKE GV_YEAR
                                   IV_EMAIL LIKE GV_EMAIL.
ENDCLASS.

CLASS STUDENT IMPLEMENTATION.
  METHOD CONSTRUCTOR.
    STT = STT + 1.
    SUPER->CONSTRUCTOR(
      EXPORTING
*        GV_ID = IV_ID
        IV_NAME  = IV_NAME
        IV_YEAR = IV_YEAR
        IV_EMAIL = IV_EMAIL
    ).
  ENDMETHOD.
  METHOD DISPLAY.
    WRITE: / 'STT:', STT.
    WRITE: / 'ID:',GV_ID.
    SUPER->DISPLAY( ).
  ENDMETHOD.
ENDCLASS.
DATA: GO_STUDENT TYPE REF TO STUDENT,
      GO_PERSON  TYPE REF TO PERSON.
PARAMETERS: LV_NAME(20)  TYPE C,
            LV_YEAR(4)   TYPE C,
            LV_EMAIL(20) TYPE C,
            LV_ID        TYPE CHAR3.

START-OF-SELECTION.
  CREATE OBJECT GO_STUDENT
    EXPORTING
      IV_ID    = LV_ID
      IV_NAME  = LV_NAME
      IV_YEAR  = LV_YEAR
      IV_EMAIL = LV_EMAIL.


  GO_STUDENT->DISPLAY( ).
```

***2.Class Global: Class được tạo trên SE24 và được gọi vào chương trình khi muốn sử dụng***

Trước hết các bạn cần vào Tcode se24 => tạo ZCL_DEMO_STUDENT.
![](https://images.viblo.asia/b84e1d9d-0ca9-4383-b99c-a2931a727ef5.png)
![](https://images.viblo.asia/1ef735ef-dd41-40d8-a673-6c52ef225b3c.png)
![](https://images.viblo.asia/02698dfe-0ae0-4cc0-9d56-8cc859f6e2fd.png)
![](https://images.viblo.asia/27e078e4-82b5-4b91-9022-7b593a05b8b1.png)


```
REPORT ZPG_DEMO1.

DATA: GO_OBJECT TYPE REF TO ZCL_DEMO_STUDENT.
DATA: LV_INPUT  TYPE STRING,
      LV_OUTPUT TYPE STRING.

LV_INPUT = 'QUYNHBC'.

CREATE OBJECT GO_OBJECT.

CALL METHOD GO_OBJECT->GET_NAME
  EXPORTING
    IV_NAME = LV_INPUT   " Đầu vào của Class
  IMPORTING
    EV_NAME = LV_OUTPUT. " Đầu ra sau khi chạy Class.

WRITE: LV_OUTPUT.
```