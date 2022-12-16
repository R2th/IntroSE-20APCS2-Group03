Kì trước chúng ta đã tìm hiểu tổng quan về khái niệm ngôn ngữ COBOL, kì này chúng ta tiếp tục cùng nhau lướt qua những kiểu dữ liệu và cú pháp cơ bản nhất để xây dựng nên 1 chương trình COBOL nhé.:slightly_smiling_face:    
***
**1. Các kiểu dữ liệu của COBOL**    
COBOL thực chất chỉ có 2 kiểu dữ liệu: **SỐ** và **CHUỖI**.    
Các biến trong COBOL được tạo nên dựa trên 2 kiểu này, thường được khai báo theo kiểu Elementary Item và Group Item.  
Các bạn có thể tham khảo ví dụ khai báo biến dưới đây:   
```
DATA DIVISION.
WORKING-STORAGE SECTION.
01 WS-NAME    PIC X(25).                               ---> ELEMENTARY ITEM 
01 WS-CLASS   PIC 9(2)  VALUE  '10'.                   ---> ELEMENTARY ITEM

01 WS-ADDRESS.                                         ---> GROUP ITEM
   05 WS-HOUSE-NUMBER    PIC 9(3).                     ---> ELEMENTARY ITEM
   05 WS-STREET          PIC X(15).                    ---> ELEMENTARY ITEM
   05 WS-CITY            PIC X(15).                    ---> ELEMENTARY ITEM
   05 WS-COUNTRY         PIC X(15)  VALUE 'INDIA'.     ---> ELEMENTARY ITEM
```
Trong ví dụ trên, các bạn có thể thấy biến WS-NAME được khai báo kiểu chuỗi, gồm 25 kí tự, còn biết WS-CLASS được khai báo kiểu số, gồm 2 kí tự.  
Khi khai báo thì có thể gán luôn giá trị bằng từ khoá VALUE như trên: WS-CLASS có giá trị là '10', WS-COUNTRY có giá trị là 'INDIA'.  
Thay vì viết kiểu PIC X(n) hay PIC 9(n) với n là số các kí tự, còn có thể khai báo theo kiểu như sau:  
```
01 WS-CLASSA  PIC 9(2).
01 WS-CLASSB  PIC 99.
```
2 cách khai báo WS-CLASSA và WS-CLASSB như trên là như nhau.  
Khi các bạn muốn thực hiện khai báo cho field gồm cả kí tự chữ và số (ví dụ như Zip Code), chúng ta có thể khai báo kiểu trộn cả chữ và số như sau:  
```
05  ZIP-PLUS-9      PIC 99999X9999 VALUE '01886-2001'.
```
***
**2. Các cú pháp cơ bản trong lập trình COBOL:**  
Sau đây mình sẽ liệt kê một số lệnh cơ bản thường dùng trong chương trình COBOL và ví dụ để các bạn cùng tham khảo.  

COMPUTE: lệnh dùng để tính toán giá trị.
Ví dụ:  
```
COMPUTE NUMC = (NUM1 * NUM2).
```
có nghĩa là NUMC được gán giá trị bằng cách nhân NUM1 và NUM2.  
  
DIVIDE-BY-GIVING: lệnh chia 2 số.
Ví dụ:  
```
DIVIDE NUMA BY NUMB GIVING RES-DIV.
```
có nghĩa là REST-DIV được gán giá trị bằng kết quả phép chia NUMA cho NUMB.  
Tương tự cho các lệnh MULTIPLY (nhân), SUBTRACT (trừ), ADD (cộng).  
  
  MOVE: lệnh dùng để gán giá trị.  
Ví dụ:
```
MOVE NUMA TO RES-MOV.
```
có nghĩa là gán giá trị RES-MOV bằng giá trị của NUMA.  
Lệnh MOVE có thể gán đồng loạt cho nhiều biến như sau: 
```
MOVE 25 TO WS-NUM1 WS-NUM3.
```
nghĩa là gán giá trị 25 cho cả 2 biến WS-NUM1 và WS-NUM3.

DISPLAY: lệnh dùng để in ra màn hình (in giá trị của biến hoặc chuỗi kí tự)  
Ví dụ:
```
MOVE 15 TO WS-NUM1.
DISPLAY WS-NUM1.
DISPLAY 'THIS IS A STRING'.
```
  
Lệnh IF: câu lệnh điều kiện, gần giống với các ngôn ngữ khác.
Ví dụ:
```
   MOVE 25 TO WS-NUM1 WS-NUM3.
   MOVE 15 TO WS-NUM2 WS-NUM4.
   
   IF WS-NUM1 > WS-NUM2 THEN
      DISPLAY 'IN LOOP 1 - IF BLOCK'
      
      IF WS-NUM3 = WS-NUM4 THEN
         DISPLAY 'IN LOOP 2 - IF BLOCK'
      ELSE
         DISPLAY 'IN LOOP 2 - ELSE BLOCK'
      END-IF
      
   ELSE
      DISPLAY 'IN LOOP 1 - ELSE BLOCK'
   END-IF.
```
Kết quả hiển thị ra sẽ như bên dưới:  
IN LOOP 1 - IF BLOCK  
IN LOOP 2 - IF BLOCK  
Ta có thể sử dụng điều kiện phủ định với từ khoá IF NOT thay cho IF.

Lệnh EVALUATE: đây là lệnh tương đương với lệnh Switch trong C.  
Ví dụ:
```
MOVE 3 TO WS-A.
   
   EVALUATE TRUE
      WHEN WS-A > 2
         DISPLAY 'WS-A GREATER THAN 2'

      WHEN WS-A < 0
         DISPLAY 'WS-A LESS THAN 0'

      WHEN OTHER
         DISPLAY 'INVALID VALUE OF WS-A'
   END-EVALUATE.
```
kết quả sẽ là: WS-A GREATER THAN 2

Trên đây là một số cú pháp cơ bản của COBOL, kì tới chúng ta sẽ thử ứng dụng những lệnh này để viết một chương trình nho nhỏ. 
***

Link tham khảo:  
https://medium.com/@yvanscher/7-cobol-examples-with-explanations-ae1784b4d576