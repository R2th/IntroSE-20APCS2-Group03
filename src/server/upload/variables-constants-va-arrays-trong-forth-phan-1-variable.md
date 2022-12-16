Mình mới tìm hiểu về forth, lên trong bài viết này mình sẽ dịch bài về Variables, Constants, và Arrays trong Forth với mục đích tìm hiểu các vấn đề cơ bản trong forth. 
##### 1. Variable:
- Để bắt đầu chúng ta sẽ đến với ví dụ về việc sử dụng variabale trong việc lưu trữ ngày: 
    + khai báo variable:      VARIABLE DATE
    + gán giá trị cho DATE: 12 DATE !
    + Khi thực hiện như trên, chúng ta đã lưu giá trị 12 vào tên biến DATE.
- để thực hiện show giá trị của DATE chúng ta sử dụng DATE @
- Chúng ta sẽ khai báo thêm 2 biến tháng và năm để bổ sung thêm thông tin: 

            
             VARIABLE DATE   VARIABLE MONTH   VARIABLE YEAR

    + để define các thông tin YEAR và MONTH đc gọi thông qua DATE
         
           : !DATE  YEAR !  DATE !  MONTH ! ; 
           
         Việc này giống với định nghĩa một hàm có tên hàm là !DATE và trong hàm có 3 biến đc gán theo các đối số truyền vào cho hàm lần lượt là YEAR, DATE, MONTH
    + gán gá trị cho DATE, MONTH, YEAR
  
           7 31 03 !DATE
    + In giá trị của DATE, MONTH, YEAR
    
          : .DATE  MONTH ?  DATE ?  YEAR ? ;
        
##### 2. Cơ chế của forth với variable
- Khi bạn sử dụng định nghĩa biến bằng cách:
  
      VARIABLE DATE
      
   Trong forth điều này tương đương với việc bạn đã compiling vào từ điển một từ mới DATE.
![](https://images.viblo.asia/7fee869b-4d60-46ca-8dba-f4ffba7edc4b.gif)

- Trong từ điển của bạn DATE được xác định bằng từ VARIABLE và ko có định nghĩa về nhiệm vụ của DATE.
- Khi bạn gọi
    
        12 DATE !
    12 sẽ được đẩy vào stack. Sau đó trình biên dịch sẽ tìm từ DATE trong từ điển được định nghĩa từ bên trên. Và chỉ nó cho bộ phận EXECUTE.
    ![](https://images.viblo.asia/92eb262e-4101-46e7-917a-1081a86f0b91.gif)
    EXECUTE sẽ thực hiện bằng cách copy địa chỉ của variable trống vào stack.
    
![](https://images.viblo.asia/0f3f3b5d-0de6-4638-bb3f-783986ed3016.gif)
 
   Khi chương trình chạy đến ký tự "!" thì sẽ lấy địa chỉ bên trên và giá trị bên dưới lưu trữ vào vị trí đó. Có một lưu ý là bất cứ số nào đc lưu trữ ở vị trí đó lúc trước sẽ đều bị thay thế.
![](https://images.viblo.asia/d5652520-4834-4043-86eb-616404b8f00f.gif)

Từ @ chỉ ứng với 1 đối số,  trong trường hợp này được cung cấp bởi tên của biến như trong: DATE @

 Sử dụng giá trị trên stack làm địa chỉ, từ khóa @ sẽ đẩy nội dung của giá trị đó lên stack và xóa bỏ địa chỉ, nhưng nội dung của địa chỉ đó thì vẫn còn nguyên vẹn.
 
 ![](https://images.viblo.asia/89a3496d-316d-4f4a-9e4b-2944e39c4646.gif)
 
 ##### 3. Ứng dụng variable trong việc đếm số.
  Trong forth thì một biến là cách lý tưởng để lưu trữ số lượng một cái gì đó. Chúng tôi sử dụng trong ví dụ đếm số trứng rơi xuống băng truyền trong vòng 1 ngày.

![](https://images.viblo.asia/6a3b5e85-a53f-4990-9cb3-0340d3d68a59.gif)

 Đầu tiên chúng ta phải define:
     
   - VARIABLE EGGS
   
Để giữ cho việc đếm luôn bắt đầu đúng. Chúng ta cần phải có một hàm reset lại số trứng mỗi khi bắt đầu thực hiện:

   - : RESET  0 EGGS ! ;

Và mỗi khi 1 quả trứng đi qua vị trí check.

- 1 EGGS +!

"+!" sẽ thực hiện thêm giá trị đã cho vào nội dung của địa chỉ đã cho.

Chúng ta có thể thay đổi bằng việc thêm vào một hàm:
- : EGG 1 EGGS +! ;

Và khi kết thúc một ngày chúng ta gọi:
 - EGGS @

      ![](https://1scyem2bunjw1ghzsf1cjwwn-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/ch8-pronounce-1.gif)
             
Trên đây là phần giới thiệu về VARIABLE trong forth. Trong bài sau mình sẽ tiếp tục dịch về phần Constants, và Arrays trong forth.
Do vốn TA có hạn lên bài dịch còn nhiều chỗ không được chuẩn + mình cũng thay đổi nhiều theo ý hiểu của bản thân. Lên nếu có vấn đề gì xin các bạn góp ý!!!
Thanks!!!
bài viết gốc: https://www.forth.com/starting-forth/8-variables-constants-arrays/