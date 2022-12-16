Kì trước chúng ta đã tìm hiểu những kiểu dữ liệu và cú pháp cơ bản nhất để xây dựng nên 1 chương trình COBOL, kì này chúng ta thử đọc vài program hoàn chỉnh xem thế nào nhé. :slightly_smiling_face:    
***
**1. Cho nhập và hiển thị thông tin do người dùng nhập lên màn hình**    
   
```             
IDENTIFICATION DIVISION.                             
PROGRAM-ID. PRG10.                                   
ENVIRONMENT DIVISION.                                
DATA DIVISION.                                       
WORKING-STORAGE SECTION.                             
77 NUM1       PIC 9(4).                              
77 NUM2       PIC 9(4).                              
77 TOTAL      PIC 9(5).                              
PROCEDURE DIVISION.                                  
  ACCEPT NUM1.                                     
  ACCEPT NUM2.                                     
  ADD NUM1 TO NUM2 GIVING TOTAL.                   
  DISPLAY TOTAL.                                 
  SUBTRACT NUM1 FROM NUM2 GIVING TOTAL.          
  DISPLAY TOTAL.                                 
  MULTIPLY NUM1 BY NUM2 GIVING TOTAL.            
  DISPLAY TOTAL.                                 
  DIVIDE NUM1 BY NUM2 GIVING TOTAL.              
  DISPLAY TOTAL.                                 
  STOP RUN.
```
Trong program trên, các bạn có thể nhập 2 số, hiển thị lên màn hình, và tổng, hiệu, tích, thương 2 số trên.  
***
**2. Nhập, hiển thị ngày tháng theo format:**  

```
IDENTIFICATION DIVISION.                   
PROGRAM-ID. SAMPLE2.                          
ENVIRONMENT DIVISION.                      
DATA DIVISION.                             
WORKING-STORAGE SECTION.                   
01 G1.                                     
   02 YY PIC X(2).                         
   02 MM PIC X(2).                         
   02 DD PIC X(2).                         
01 G2.                                     
   02 DD PIC X(2).                         
   02 FILLER PIC X VALUE '-'.              
   02 MM PIC X(2).                  
   02 FILLER PIC X VALUE '-'.     
   02 YY PIC X(2).                     
01 G3.                                 
   02 HH PIC X(2).                     
   02 MM PIC X(2).                     
   02 SS PIC X(2).                     
01 G4.                                 
   02 HH PIC X(2).                     
   02 FILLER PIC X VALUE ':'.          
   02 MM PIC X(2).                     
   02 FILLER PIC X VALUE ':'.          
   02 SS PIC X(2).                     
PROCEDURE DIVISION.                    
       ACCEPT G1 FROM DATE.            
       ACCEPT G3 FROM TIME.            
       MOVE CORRESPONDING G1 TO G2.    
       MOVE CORRESPONDING G3 TO G4.    
       DISPLAY G2.                   
       DISPLAY G4.                   
       STOP RUN.
```
Trong program trên, ngày tháng hiện tại được get theo các kí hiệu MM, DD, YY, rồi hiển thị theo format có dấu "-".
***
**3. Nhập, hiển thị điểm, tính trung bình và xếp loại:**  
Ví dụ:  
```
IDENTIFICATION DIVISION.                    
PROGRAM-ID. SAMPLE3.                           
ENVIRONMENT DIVISION.                       
DATA DIVISION.                              
WORKING-STORAGE SECTION.                    
01 G1.                                      
   02 MARK1 PIC 9(2).                      
   02 FILLER PIC X.                        
   02 MARK2 PIC 9(2).                      
   02 FILLER PIC X.                        
   02 MARK3 PIC 9(2).                      
77 TOTAL PIC 9(3).                          
77 AVG PIC 9(3)V9(3).                       
77 PER PIC 9(3)V9(3).                                  
77 GRADE PIC A(5).                                     
PROCEDURE DIVISION.                                    
MAIN-PARA.                                             
   PERFORM ACCEPT-PARA THRU DISP-PARA 5 TIMES.        
   STOP RUN.                                          
ACCEPT-PARA.                                           
   ACCEPT G1.                                         
COMP-PARA.                                             
   COMPUTE TOTAL = ( MARK1  + MARK2 + MARK3 ).        
   COMPUTE AVG = TOTAL / 3.                           
   COMPUTE PER = ( TOTAL / 300 ) * 100.               
   IF AVG > 80                                        
      MOVE "I" TO GRADE                               
   ELSE                                               
      IF AVG > 60 AND AVG < 79                                   
        MOVE "II" TO GRADE                                   
      ELSE                                                       
        IF AVG > 40 AND AVG < 60              
            MOVE "III" TO GRADE                
        ELSE                                  
            MOVE "FAIL" TO GRADE               
   END-IF.                                     
DISP-PARA.                                      
   DISPLAY "THE TOTAL IS: "    TOTAL.          
   DISPLAY "THE AVERAGE IS: "    AVG.          
   DISPLAY "THE PERCENTAGE IS: "    PER.       
   DISPLAY "GRADE IS: "    GRADE.         
```
Program trên cho phép nhập 3 cột điểm, tính tổng điểm, điểm trung bình và xếp loại I, II, III hoại FAIL cho 5 sinh viên.  
***
**4. Nhập một số, kiểm tra xem số đó có phải là số nguyên tố hay không:**  

```
IDENTIFICATION DIVISION.                                    
PROGRAM-ID. SAMPLE4.                                          
ENVIRONMENT DIVISION.                                       
DATA DIVISION.                                              
WORKING-STORAGE SECTION.                                    
77 INP-NUM      PIC 9(3).                                   
77 RES          PIC 9(1) VALUE 0.                           
77 INC          PIC 9(2)  VALUE 2.                          
77 QUO          PIC ZZ9.                                    
77 REM          PIC ZZ9.                                    
PROCEDURE DIVISION.                                         
MAIN-PARA.                                                  
   PERFORM ACCEPT-PARA.                                     
    PERFORM COMP-PARA.                                    
    PERFORM DISP-PARA.                                    
    STOP RUN.                                             
 ACCEPT-PARA.                                             
    ACCEPT INP-NUM.                                       
 COMP-PARA.                                               
    PERFORM UNTIL INC < INP-NUM                           
       DIVIDE INP-NUM BY INC GIVING QUO REMAINDER REM     
       IF REM IS EQUAL TO 0                               
          MOVE 1 TO RES                                   
          EXIT   

       ELSE                                               
        COMPUTE INC = INC + 1                             
       END-IF                                             
    END-PERFORM.                                          
DISP-PARA.                                           
   IF RES IS EQUAL TO 0                              
      DISPLAY "THE GIVEN NUMBER IS PRIME!"           
   ELSE                                              
      DISPLAY "THE GIVEN NUMBER IS NON PRIME!"       
   END-IF.
```
 
Trên đây là một số program cơ bản của COBOL, với những đề tài hết sức cơ bản mà chúng ta hay gặp khi học các ngôn ngữ lập trình mới.   
Sau đây mình xin hướng dẫn cách chạy 1 program COBOL online:  
- Các bạn vào https://www.tutorialspoint.com/compile_cobol_online.php để compile.
- Paste source code của các bạn vào tab main.cobc, các tham số truyền vào thì paste vào tab STDIN.
- Sau đó execute và kiểm tra kết quả thôi.  
Hi vọng qua 3 bài đăng của mình, các bạn đã quen thuộc hơn với ngôn ngữ lập trình cũ kĩ này. Có thắc mắc hay vấn đề gì cần trao đổi các bạn có thể post comment để cùng thảo luận nhé. :hugs:
***

Link tham khảo:  
https://surendersampath.wordpress.com/2017/11/13/cobol-sample-programs/