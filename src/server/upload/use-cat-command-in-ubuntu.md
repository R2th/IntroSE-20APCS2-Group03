1. **Concatenate files**
Đây là mục đích chính của ```cat```
    ```
    cat test1.txt test2.txt test3.txt > test.txt
    ```

2. **Printing the Contents of a File**

    - Sử dụng ```cat``` để in nội dung của 1 tệp.
        ```
        cat test.txt
        ```
        Lệnh trên sẽ in ra nội dung của file test.txt.
    
    - Nếu tệp tin chứa các kí tự không phải là mã ASCII, có thể dùng 
        ```
        cat -v test.txt
        ```
        để hiển thị các kí tự đó một cách tượng trưng.
     - Ngoài ```cat``` chúng ta có thể sử dụng ```less```, ```more``` để xem nội dung của tập tin.
         ```
         lest test.txt
         #or
         more test.txt
         ```
     - Để liệt kê ngược nội dung của file từ cuối lên, ta có thể dùng lệnh ```tac```:
        
        ```
        tac text.txt
        ```
    - Để hiện thị thêm số dòng của file chúng ta thêm option -n:
        ```
        cat -n test.txt
        ```
   

3. **Write to a file**
    ```
    cat >file.txt
    ```
    Lệnh này sẽ cho phép bạn thêm nội dung ngay trên command, và nội dung sẽ tự lưu sau khi bạn thoát khỏi nó bằng command ```Ctrl+D``` hoặc ```Ctrl+z```.
    
    Nếu lại lại dùng lệnh trên một lần nữa, nó sẽ mặc định ghi đè lên tất cả nội dung cũ mà không cần xác nhận gì cả. Nên điều này là rất nguy hiểm.

4. **Read from standard input**

    ```
    cat < file.txt
    ```
    Lệnh này cũng tương tự như lệnh:
    ```
    cat > file.txt
    ```
    Nhưng nó khác là nó đọc từ đầu vào tiêu chuẩn thay vì đọc trực tiếp từ file.
    
    ```
    printf "first line\nSecond line\n" | cat -n
    ```
    Lệnh printf thực hiện trước in ra hai dòng. Sau đó lệnh cat sẽ tác động vào đồng ra để thêm số dòng.
 
5. **Display line numbers with output**

    Như có nói ở trên thì để hiển thị số dòng của file thì thêm option 
    ```
    cat -n file.txt
    #or
    cat --number file.txt
    ```
    với lệnh này thì khi in ra  nó sẽ đếm luôn cả những dòng trằng.
    ví dụ:
    ![](https://images.viblo.asia/163950c8-7dd4-4a9a-9a16-a8e4fb4bb7ae.png)
    Nếu không muốn đếm những dòng trắng thì thêm option:
    ```
    cat --number-nonblank file.txt
    #or
    cat -b file.txt
    ```
    ![](https://images.viblo.asia/fa4f7684-ee8e-4396-a692-e0b0f4e5a9cf.png)

6. **Concatenate gzipped files**

    Các tệp được nén bởi ```gzip``` có thể được nối thành 1 tệp lớn hơn.
    ```
    cat file1.gz file2.gz file3.gz > combined.gz
    ```
    Điều này thì kém hiệu quả hơn so với việc nối tất cả các file vào trước rồi ```gzip``` kết quả đó.
    ```
    cat file1 file2 file3 | gzip > combined.gz
    ```
   
7. **Kết luận**

    Trên đây là một số lệnh của lệnh ```cat```. Hi vọng sẽ giúp ích một chút cho công việc của các bạn. Cảm ơn đã đọc bài
    
    Tham khảo: Bash Note For Professionals.