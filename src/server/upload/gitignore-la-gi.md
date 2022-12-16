# Giới thiệu
Khi làm việc trong 1 team, bạn có bao giờ gặp tình trạng pull request của các member cứ conflict lên xuống vì mấy file biên dịch hay log chưa ?
Nếu đã từng gặp qua thì ắt là bạn không thể quên được cảm giác khó chịu ấy.
Và như vậy lag Gitignore ra đời để giải quyết cục tức này ! Ngay cả cái tên cũng gợi tả cách hoạt động của phương pháp này , ignore - bỏ qua, loại bỏ
# Cách hoạt động
Để sử dụng được Gitignore, thứ duy nhất bạn cần là 1 file .gitignore, sẽ không phải cài đặt hay cấu hình thêm bất kì thứ gì cả vì file này do git quy định, tự đọc hiểu.


Ý tưởng của nó thì khá dễ hiểu, đơn giản đó là .gitignore sẽ liệt kê tên những file, folder trong project mà bạn không muốn bị parse mỗi khi thao tác với git.


Git sẽ bỏ qua những file này, không quan tâm tới chúng nó luôn, và bạn yên tâm thay đổi bất kì config hay những file là lạ đang muốn test ở máy cá nhân mà chẳng sợ bất kì conflict nào chúng gây ra, loại bỏ rủi ro đẩy nhầm code config quan trọng lên server thật.
# Cú pháp, quy định trong .gitignore
Mỗi dòng trong một .gitignore chỉ định một mẫu gợi tả về đường dẫn file, folder cần ignore.

Khi quyết định bỏ qua một file, folder theo đường dẫn đã phát hiện, Git thường kiểm tra các mẫu gitignore từ nhiều nguồn, theo thứ tự ưu tiên sau, từ cao nhất đến thấp nhất (trong một mức độ ưu tiên, mẫu phù hợp cuối cùng quyết định kết quả được ignore). 

Nhiều nguồn ở đây có nghĩa là những khoanh vùng ignore trong .gitignore có thể bị chồng lấn vào nhau, hay các ignore được xác định từ nhiều file .gitignore (bạn có thể có vài file .gitignore trong cùng 1 project ở các cấp thư mục khác nhau) . Git sẽ xem xét điều này và hướng đến ignore  thỏa mãn nhiều mẫu kê khai nhất có thể, nếu ignore cả file con và folder cha thì tất nhiên thứ được chọn ignore sẽ là folder cha rồi !
## Tầm ảnh hưởng
File .gitignore có quyền hạn gây ảnh hưởng đến những folder, file có phân cấp bằng hoặc nhỏ hơn nó xét về cấu trúc thư mục.

Có nghĩa là trong đó ta có thể liệt kê các file, folder anh em cùng cấp hoặc nằm trong thư mục con của chúng. 

Thường thì file .gitignore sẽ được đặt luôn tai thư mục root của project, bao quát được toàn bộ đường dẫn của project. 
## Cú pháp
* Một dòng trống sẽ không khớp với bất kì 1 mẫu gợi tả nào về file, folder,  vì vậy nó có thể dùng làm dấu phân cách cho dễ đọc thôi.
* Một dòng bắt đầu bằng # có tác dụng như 1 comment chú thích. 
* Dấu gạch chéo ngược "  \  "  cuối dòng mô tả vùng lưu trữ được đề cập ngay phía trước sẽ bị bỏ qua. Điều nàu chỉ có tác dụng với folder, nó sẽ không ám chỉ file cụ thể nếu có bị trùng tên với thư mục đi chăng nữa.
* Nếu không có dấu " \ ", mẫu này sẽ được coi là shell glob và kiểm tra sự trùng khớp với tên đường dẫn liên quan đến vị trí của file .gitignore, kết quả có thể là file hoặc folder hoặc symbolic link
* Dấu  " ! " mang ý nghĩa phủ định,  bất kỳ file phù hợp nào được loại bỏ bởi một mẫu trước đó sẽ được include vào lại. Nhưng không thể include lại file đó nếu thư mục cha của nó bị loại trừ.
* Dấu " * " khớp với mọi thứ ngoại trừ " / ", " ? " và khớp với bất kỳ một ký tự nào ngoại trừ " / " và " [ ] ". Với điều này " * " có thể được hiểu như tên của file, tên folder. Khá hữu ích khi muốn ignore toàn bộ 1 dạng file (*.xml,  template/*.xlsx, ... ). Sử dụng ** để ignore cho các thư mục không cần định rõ tên. Ví dụ:  **/foo sẽ ignore tất cả file hoặc thư mục có tên là foo ở mọi nơi trong phạm vi project, " foo/** " tương đương với " foo/ ",  " a/**/b "  sẽ matches với các cấu trúc folder  " a/b ", " a/x/b ", " a/x/y/b " .

### Ví dụ về .gitignore
![](https://images.viblo.asia/ed2bac66-62ae-4738-9d7e-35c697413eed.png)

# Chú ý
## Khi nào nên tạo .gitignore
Câu trả lời là làm ngay và luôn nhé, từ khi build project thì khởi tạo luôn để sử dụng. tất nhiên là tạo xong rồi thì phải định nghĩa luôn những vùng sẽ cần ignore đi.


Tuy nhiên nếu project của bạn đã chạy trước đó rồi mà giờ mới sử dụng nó thì cũng không sao cả, phần dưới đây sẽ giúp cho bạn hiểu lý do và cách xử lí.
## Git cache
Bạn có thể hình dung ra rằng tập những file được Git parse mỗi khi có sự thay đổi đều được list ra ở trong vùng cache này để tực tiếp làm việc. Và nếu giữa chừng mà chỉ tạo, cập nhật mỗi file .gitignore thì sẽ chẳng có thay đổi nào đâu, những thứ bạn cho thêm vào sẽ vô tác dụng, bạn vẫn sẽ pull push đều đều bọn chúng lên pull request. 
Như vậy giri pháp ở đây sẽ là xóa file hoặc folder đó ra khỏi git cache và nó sẽ hoạt động đúng, chỉ bằng 1 dòng lệnh :
```
git rm -r --cached /path/to/file_or_folder
```
Nếu có quá nhiều thứ bạn cần ignore mới thì chỉ cần 
```
git rm -r --cached
```
Rồi sau đó load lại toàn bộ vào như sau
```
git add
```

Thế là mọi chuyện đã được giải quyết !

*Nguồn https://git-scm.com/docs/gitignore*