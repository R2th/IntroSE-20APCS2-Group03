# 1. Shell Script là gì
- Shell Script là 1 file thực thi có extension là `sh` có thể thực thi trên các thiết bị Unix.
- Để làm quen thì ta có thể tạo 1 file `hello-world.sh` với nội dung như sau:
    ```sh
    #!/bin/bash

    # Author: thanhlt-1007
    # Description: Hello World Schell Script

    echo "Hello World"
    ```
- Các thành phần của file shell script bao gồm:
- `#!/bin/bash`: thông báo với system chuẩn bị có file shell script chuẩn bị được chạy.
- `# Author`: comment code.
- `echo`: script được thực thi.
- Để chạy file shell script cần cấp quyền cho file qua câu lệnh `chmod`:
    ```sh
    chmod +x hello-world.sh
    ```
- Chạy file shell script:
    ```sh
    sh hello-world.sh
    ```
- Tiếp theo chúng ta sẽ tìm hiểu các loại script có thể thực thi trên shell script.

# 2. Shell Script với Unix/Linux command
-  Trong Unix/Linux ta có thể thực thi 1 số commnd trên terminal, ví dụ echo, ls, ... hoặc date, whoami
-  Những command này cũng có thể được sử dụng trong shell script
-  Ví dụ tạo file `command.sh` với nội dung như sau
    ```sh
    #!/bin/bash

    echo "Unix/Linux command"

    MESSAGE=$(printf "To day is %s, Hello %s" "$(date)" "$(whoami)")
    echo $MESSAGE
    ```
- Kết quả thu được khi chạy file
    ```sh
    Unix/Linux command
    To day is Tue Sep 1 15:02:01 +07 2020, Hello SUN-ASTERISK\le.tan.thanh
    ```

# 3. Shell Script với variables
- Cũng như các ngôn ngữ lập trình khác, chúng ta cũng có thể sử dụng variable với shell script.
- Để sử dụng variable trong shell script cần chú ý 1 số điểm như sau
- Không có space xung quanh `=` khi khởi tạo giá trị cho biến
    ```sh
    #!/bin/bash
    # Invalid assignment
    VAR = "value"

    # Valid assignment
    VAR="value"
    ```
- Chúng ta cũng có thể sử dụng command `read` để nhận giá trị do người dùng nhập vào từ terminal
    ```sh
    #!/bin/bash
    echo "What is your name ?"
    read MY_NAME
    echo "Hello $MY_NAME"
    ```
-  Kết quả thu được
    ```sh
    What is your name ?
    le tan thanh
    Hello le tan thanh
    ```
- Enter khi đã nhập xong nội dung muốn nhập.

# 4. Loops:
- Shell Script hỗ trợ `for` và `while` để thực hiện các thao tác được lặp lại nhiều lần
## a. for:
- Ví dụ về `for`
    ```sh
    #!/bin/bash
    for i in 1 2 3 4 5
    do
      echo "Looping ... i is set to $i"
    done
    ```
- Kết quả thu được
    ```sh
    Looping ... i is set to 1
    Looping ... i is set to 2
    Looping ... i is set to 3
    Looping ... i is set to 4
    Looping ... i is set to 5
    ```
- Các giá trị được gọi trong vòng loop ví dụ trên là mảng số nguyên `[1, 2, 3, 4, 5]`.
- Chúng ta có thể sử dụng các giá trị khác, ví dụ `[hello, 1, goodbye]`.
    ```sh
    #!/bin/bash
    for i in hello 1 goodbye
    do
      echo "Looping ... i is set to $i"
    done
    ```
- Kết quả thu được
    ```sh
    Looping ... i is set to hello
    Looping ... i is set to 1
    Looping ... i is set to goodbye
    ```

## b. while:
- Ví dụ về `while`
    ```sh
    #!/bin/sh
    INPUT_STRING=""
    while [ "$INPUT_STRING" != "bye" ]
    do
      echo "Please type something in (bye to quit)"
      read INPUT_STRING
      echo "You typed $INPUT_STRING"
   done
   ```
- Kết quả thu được
    ```sh
    Please type something in (bye to quit)
    hello
    You typed hello
    Please type something in (bye to quit)
    bye
    You typed bye
    ```
- Trong trường hợp sử dụng `:`, mệnh đề `while :` trả về `true` và đoạn code bên trong `do done` được thực thi
    ```sh
    #!/bin/sh
    INPUT_STRING=""
    while :
    do
      echo "Please type something in (^C to quit)"
      read INPUT_STRING
      echo "You typed $INPUT_STRING"
    done
    ```
- Kết quả thu được
    ```sh
    Please type something in (CTRL + C to quit)
    bye
    You typed bye
    Please type something in (CTRL + C to quit)
    ^C
    ```

# 5. If:
## a. if 
- Ví dụ về `if`
    ```sh
    #!/bin/sh
    if true
    then
      echo "If statement"
    fi
    ```
- Nhớ kết thúc câu lệnh với `fi` (ngược lại của `if`).
- Kết quả thu được
    ```sh
    If statement
    ```

## b. else
- Ví dụ về `else`
    ```sh
    #!/bin/sh
    if false
    then
      echo "If statement"
     else
       echo "Else statement"
    fi
    ```
- Với `else` thì chúng ta không cần `then`.
- Kết quả thu được.
    ``sh
    Else statement
    ``
    
## c. elif
- Ví dụ về `elif`
    ```sh
    #!/bin/sh
    if false
    then
      echo "If statement"
    elif true
    then
      echo "Elif statement"
    fi
    ```
- Kết quả thu được
    ```sh
    Elif statement
    ```
    
# 6. case:
- Ví dụ về `case`
```sh
#!/bin/sh
echo "Please talk to me ..."
read INPUT_STRING
case $INPUT_STRING in
  hello)
    echo "Hello yourself!"
    ;;
  bye)
    echo "See you again!"
    ;;
  *)
   echo "Sorry, I don't understand"
   ;;
esac
```
- Case sẽ đi với `in` và `esac` (ngược lại của `case`)
- Các giá trị được so sánh theo sau bởi `)`
- Giá trị mặc định là `*`
- Kết qủa thu được
    ```sh
    Please talk to me ...
    hello
    Hello yourself!
    ```
    ```sh
    Please talk to me ...
    bye
    See you again!
    ```
    ```sh
    Please talk to me ...
    ahihi
    Sorry, I don't understand
    ```

# 7. Document
- Trên đây chỉ là 1 vài ví dụ đơn giản về shell script
- Bạn có thể tham khảo thêm tại https://www.shellscript.sh/