# Vim Editor 
1. Giới thiệu:

    - Vim là một trong những trình biên soạn dòng lệnh mạnh và phổ biến nhất. Nó chỉ sẵn có trên nền của Linux và Unix, những sau đó nó cũng xuất hiện cả trên Windows. 
    - Giao diện của nó thì gọn gàng và đơn giản, và bạn có thể kết hợp các phím để thực hiện các công việc như copy-paste, tìm kiếm và thay thế, xóa một số dòng, và nhiều chức năng khác nữa. 
    - Ưu điểm của VIM là mọi thao tác đều có thể thực hiện thông qua các phím tắt, vì vậy bạn không cần dùng tới con chuột khi dùng VIM nữa

    2 -  Cài đặt:
    
         apt-get install vim
  - Các mode trong vim
                    
       Normal Mode 
          : - Được sử dụng để chỉnh sửa, sao chép, dán, di chuyển, xóa và thay đổi văn bản được thực hiện từ trong chế độ này.
          
       - Trong vim, các chức năng chỉnh sửa được thực hiện bằng cách đặt vim vào chế độ "Normal". Chế độ "Normal" là chế độ mà Vim đang hoạt động khi mở chương trình. Chế độ này được sử dụng để thực hiện chỉnh sửa. Không dùng chế độ "Nomal" để nhập data
  
    - Phím tắt để vào chế độ "Normal" :  Esc 
    
    Insert Mode 
     : - Được sử dụng để update hay thay đổi data,text... 
     
     - Để update hay thay đổi data or text ta cần vào chế độ Insert.  Các phím tắt vào chế độ Insert 


            i - Đưa chế độ chèn vào vị trí con trỏ hiện tại.
            a - Đưa chế độ chèn sau vị trí hiện tại.
            I - Đưa chế độ chèn vào đầu dòng hiện tại.
            A - Đưa chế độ chèn vào cuối dòng hiện tại.


    Visual Mode (bôi đen)
    : - Được sử dụng để lựa chọn hình ảnh
    -  Chế độ được sử dụng để lựa chọn hình ảnh và thao tác văn bản. Các vùng văn bản được đánh dấu như một mục tiêu của các lệnh chỉnh sửa hoặc định dạng tiếp theo.
    -  Các phím tắt vào Visual Mode:
   
           v - Bật chế độ hình ảnh thông thường. Lựa chọn được thực hiện bằng cách di chuyển con trỏ lên, xuống, trái, và phải.
           V - Bật chế độ Visual theo dòng. Có thể điều chỉnh bằng nút lên xuống
   

    Command mode
    : - Chế độ này được sử dụng để lưu tài liệu, thoát khỏi chương trình, thực hiện tìm kiếm....
   
     - Phím tắt để vào mode Command
             
             - : 

   - Các phím tắt cơ bản trong Vim: ( Normel Mode)

         h : sang trái 
         l : sang phải 
         j: xuống 
         k: lên
         gg: lên đầu của thư mục 
         G : xuống dưới cùng của thư mục
         w: từ kế tiếp
         e: kết thúc của từ hiện tại
         0: đầu dòng
         $: cuối dòng
 
 
     3: Một số chức năng của Vim
 
        - Trong Vim chúng ta có thể edit nhiều file cùng 1 lúc bằng cách sử dụng buffers (bộ đệm):
    
     
     Chúng ta mở nhiều file để edit : 
             
             vim test.sh test1.sh test2.sh
       
      Chúng ta có thế xem buffers bằng cách : ( Insert Mode)
 
            :buffers
          1 %a   "test.sh"                      line 1
          2      "test1.sh"                     line 0
          3      "test2.sh"                     line 0
            Press ENTER or type command to continue

     Để chuyển qua file edit tiếp theo trong buffers ta dùng :bn hoặc :b + tên file
     
         :bn Chuyển tới file edit tiếp theo trong buffers
         :b + tên file : chuyển tới file muốn edit
  
  
     Dưới đây là một số câu lệnh để quản lí buffers:
     
     
        
     

| : ls | Liệt kê tất cả các file giống lệnh :buffers |
| -------- | -------- | -------- |
| : bn    | Chuyển sang file tiếp theo|
| : bp   | Chuyển sang file trước đó     |
| : bfirst     | Chuyển tới file đầu tiên    |
| : blast     | Chuyển tới file cuối cùng   |
| : bdelete     | Xóa file hiện tại     |
| : badd     | Mở một file với tên file theo sau  |
| : e     | Chỉnh sửa một file trong một buffers mới và chuyển sang nó.    |

 
   - Chúng ta có thể edit file dễ dàng hơn bằng cách sử dụng chắc năng windows song song trong vim
           
         :sp: Chia 2 file thành 2 cửa sổ theo chiều ngang
         :vs: Chia 2 file thành 2 cửa sổ theo chiều dọc 
         
      Note: Có thể đánh số trước :sp , :vs để chỉnh kích thước của cửa sổ mới 
      


          ctrl-ww: Thay đổi trỏ chuột sang cửa sổ tiếp theo
          ctrl-wc: Đóng cửa sổ hiện tại
          ctrl-w +: Tăng kích thước của cửa sổ hiện tại
          ctrl-w-: Giảm kích thước cửa sổ hiện tại
          ctrl-w =: Đặt tất cả các cửa sổ bằng kích thước
          ctrl-wn: Mở một cửa sổ mới với một bộ đệm mới

        Cũng giống như windows chúng ta có thể mở các tab trong vim một cách dễ dàng bằng cách dùng command
        
          :tabnew
          
     Một số câu lệnh quản lí tab thường dùng : 
              
           :tabclose : Đóng tab hiện tại 
           :tabn or (gt) : chuyển tới tab kế tiếp
           :tabp or (gT): chuyển về tab trước
           :tabs: liệt kê các tab hiện có 
          
          
        4. Một số lệnh chi tiết khi sử dụng Vim:
      
        - Tìm kiếm một từ khóa : ( Trong Normal mode ) 
           
              /tên từ khóa 
              eg: /host
          
        - Hoặc chúng ta có thể tìm kiếm và thay thế theo cách sau : 
        
                :%/host/testvim/gc
          
          Sau đó hệ thống sẽ hoi chúng ta:
          
                replace with testvim (y/n/a/q/l/^E/^Y)?   
                y -> done
          
          
          Sau khi hoàn tất các việc chỉnh sửa, ta có thể lưu hoặc thoát
              
                 :q : Thoát khỏi Vim
                 :q! : Thoát không cần lưu
                 :w : Lưu file
                 :w! : ghi đè file ( bắt buộc )
                 :wq : lưu file rồi thoát