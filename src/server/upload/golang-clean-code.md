# 0. Mở đầu
Nếu bạn chỉ viết code cho 1 mình bạn dùng và chỉ viết cho những project nhỏ. Liệu clean code có cần thiết?
Nhưng khi project mở rộng, logic xử lý phức tạp và bạn đọc lại những gì mình viết thì liệu bạn có hiểu không?
Nếu bạn viết code cho project với nhiều thành viên khác trong nhóm, làm sao để ng khác cũng hiểu được logic để maintain và bảo trì.
Vậy nên việc bạn viết clean code luôn cần thiết trong mọi ngôn ngữ và trong mọi hoàn cảnh.

# 1. Linting tool
Linting tool là gì? 1 chương trình chạy tự động check các lỗi cơ bản của lập trình viên
Hiện nay, linting tool phổ biến nhất cho golang là https://github.com/golangci/golangci-lint

Lý do bao gồm:
* golangci-lint tổng hợp của nhiều bộ linter khác nhau
* golangci-lint chạy với tốc độ cao: theo như document thì golangci-lint call trực tiếp các bộ linter và reuse lại việc parser object
* golangci-lint dễ customize: bạn có thể config thêm/bỏ bộ linter,  include/exclude chạy trên thư mục nào
* dễ tích hợp vơi CI/CD: Download bản binary về và excute. 2ez =))))

https://github.com/golangci/golangci-lint#binary 
# 2. Có 1 style-guide
Đối với open-source project nói riêng và project có nhiều thành viên nói chung, việc có 1 quy ước về code, sẽ giúp các thành viên viết đoạn code theo cùng 1 format, dễ đọc và follow hơn
Bạn có thể tham khảo coding style của Uber:

https://github.com/uber-go/guide/blob/master/style.md

Tất nhiên là tiếp thu cũng nên có chọn lọc, tùy theo tính chất của project mà quyết định xem có nên theo coding style đó không
1 số rule phổ biến nên theo trong coding style trên là 
* Group import
* Reduce nesting
* Nil is valid slice
* Use Field Names to Initialize Structs
* Use Raw String Literals to Avoid Escaping
# 3. Kết:
Có lẽ nói những điều này là thừa thãi nhưng bạn nên:
* Comment, comment and comment: 
    * tricky code: comment
    * public struct mà ai trong team bạn cũng biết: comment hộ cái nhỡ ông nào mới vào đọc code thì sao
    * function của bạn implement 1 logic nào đó, fix 1 issue nào đó: link docs pls
    * comment trong PR giải thích mọi thứ: tốt khi 1 member nào đó trace lại xem tại sao lại code như thế
    * uint test có cần comment không: có để ng khác biết bạn đang code cái gì
    * bạn không giỏi tiếng anh để comment: học IT mà không giỏi tiếng Anh thì vứt đi :)))
* Re-use code: Không chỉ trong golang mà trong tất cả các ngôn ngữ khác, chúng ta nên reuse code càng nhiều càng tốt
    *  Bạn có 1 đoạn code mà cả 2 function đều dùng -> reuse it
    *  Bạn có 2 đoạn code tương tự nhau mà 2 function đều dùng, bạn nói rằng logic khác nhau nên không thể reuse: reuse chúng bằng 1 function với parameters
    *  1 function của bạn quá dài và có 1 vài đoạn của logic trong funtion đó bị lặp lại: reuse với nested function (https://sharbeargle.gitbooks.io/golang-notes/nested-functions.html)
* Reduce complexity: Bạn có 1 struct với hành vi phức tạp. Sợ người khác không hiểu nó. Sao không:
    * viết interface chỉ có những function cần dùng (người khác có thể sử dụng nó mà ko cần quan tâm hoạt động ra sao)
    * chia thành những đơn vị nhỏ hơn và xử lý logic riêng biệt (đồng thời dễ dàng cho việc test-mock)
    * tham khảo design pattern, hỏi ý kiến người khác
     
Bạn không nên:
* Viết lại toàn bộ code: Khác nào tự dưng tạo potential bug
* Mất quá nhiều thời gian vào refactor code: đây là kỹ năng cơ bản nên làm vào thời gian rảnh rỗi hoặc viết code đến đâu đảm bảo clean code đến đấy. Chả ai thích review 1 PR dài 100 files 1 lúc sửa hết lỗi cả. One step at a time.