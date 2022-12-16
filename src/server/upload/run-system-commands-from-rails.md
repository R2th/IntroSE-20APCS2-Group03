Làm cách nào để gọi các lệnh shell từ bên trong chương trình Rails? Làm cách nào để lấy lại kết quả từ các lệnh này vào Ruby?
Làm cách nào chúng ta có thể sử dụng các lệnh bên ngoài từ ruby. Bài viết này sẽ hướng dẫn các cách để thực thi các lệnh (shell/ Linux Commands) nhé.
## Sử dụng system method
Syntax: ```system("cmd")```

Ex: 
![](https://images.viblo.asia/b624585e-f059-4b3d-8952-8f3bc60eb49c.png)
- Hệ thống có thể trả về 3 giá trị có thể có:
1. True nếu lệnh hoạt động
2. False nếu lệnh trả về lỗi
3. Nil nếu không tìm thấy lệnh
## Kernel#` VÀ %X
NếU muốn nhận đầu ra từ lệnh bạn đang chạy thì có thể sử dụng phương thức %x hoặc Kernel#`.

Syntax:
```
`cmd`
%x( cmd )
```
Ex:
![](https://images.viblo.asia/1c44496c-5a5c-48ee-81a7-1cb507aaaa91.png)


## exec
Process hiện tại được thay thế và không bao giờ tiếp tục. Điều này có nghĩa là chương trình Rails của bạn sẽ kết thúc.

Syntax: ```exec "cmd"```
Ex:
![](https://images.viblo.asia/c83ead6b-de4f-4383-8d7e-01faa9187449.png)
## Fork + Exec 
Sử dụng exec thì Process hiện tại sẽ được thay thế. Chúng ta không muốn điều này và có thể lấy được kết quả thì phải làm thế nào, với sự kệt hợp với Fork thì chúng ta đã có điều mình mong muốn.
Fork tạo một bản sao của process hiện tại của bạn (ứng dụng Ruby)

> Lưu ý: Fork không sử dụng được trên windows nhé
> 
Syntax:`fork { exec("cmd") }`

Ex:
![](https://images.viblo.asia/f586cea7-8ee8-44ed-9f52-10798ee0f0df.png)


Hy vọng với bài viết này mọi người có thể thao tác được với các system command. Hãy cẩn thận khi sử dụng những lệnh này vì đó là lệnh system sẽ có nguy cơ về security. Đầu vào cần phải validate.

Happy coding!!

### references
https://stackoverflow.com/questions/2232/how-to-call-shell-commands-from-ruby

https://www.rubyguides.com/2018/12/ruby-system/