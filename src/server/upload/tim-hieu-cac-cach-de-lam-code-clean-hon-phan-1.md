Trong quá trình viết code, các lập trình viên chúng ta sẽ phải gặp những đoạn code trong nhiều trường hợp khác nhau. Bài viết này sẽ tìm hiểu về các cách để giúp code dễ đọc hơn, qua đó có thể giúp cho người đồng nghiệp có thể hiểu được những đoạn code một cách dễ dàng hơn.
# I. Làm cho luồng code dễ đọc hơn
## 1. Thứ tự của các biến trong điều kiện
Hãy xem thứ tự code 2 trường hợp sau: <br>
``` java
    if(length >= 10) 

    và 

    if(10 <= length)
```
có thể nhận thấy cách viết đầu tiên cho ta cảm giác dễ đọc hiểu hơn.  <br>
Xét tiếp 2 trường hợp sau: <br>
``` java
    while (bytes_received < bytes_expected) 
    
    và
    
    while (bytes_expected > bytes_received)
```
Cách viết đầu tiên vẫn dễ đọc hiểu hơn. :-?  Sau đây là công thức để cho các thứ tự trên: <br>
```
Trường hợp so sánh lớn hơn: thường dùng khi so sánh với hằng số 
Trường hợp so sánh nhỏ hơn: thường dùng khi điều kiện so sánh có tính thẩm vấn, chất vấn
```
## 2. Thứ tự của if/else
Khi chúng ta viết đoạn code thực hiện if, else thường tự do lựa chọn thứ tự của chúng. Ví dụ chúng ta có thể viết <br>
``` java 
if (a == b) { 
    // Case One ... 
} else { 
    // Case Two ... 
}
```
hoặc viết: 
``` java
if (a != b) { 
    // Case Two ... 
} else { 
    // Case One ... 
} 
```
Có một số nguyên tắc cho thằng này như sau: <br>
* ưu tiên trường hợp positive trước thay vì negative,
``` java
    nên viết là if(debug) thay vì viết if(!debug)

    nên viết là if(a.contains(...)) thay vì viết if(!a.contains(...)) 
```
* Ưu tiên case đơn giản trước <br>
Có một số trường hợp case phủ định đứng trước sẽ dễ đọc hơn <br>
vd: 
``` java
    if !file
      //Log the error ...
    else
      //...
```
## 3. Tránh dùng do/while, goto
- Khi đọc code ta đọc logic từ trên xuống dưới, nên trường hợp sử dụng do/while làm người đọc code sẽ khó hiểu, thay vào đó hãy sử dụng while sẽ làm code dễ đọc, dễ hiểu hơn.
## 4. Sử dụng return trong function
- Một số người thường nghĩ sử dụng quá nhiều return trong function là không tốt, điều này là không hợp lý. Chúng ta có thể sử dụng return trong function để khiến code dễ đọc và làm cho logic của function đơn giản hơn. Việc sử dụng return có thể thu gọn lại code như trong các ví dụ bên dưới. <br>
Ví dụ: <br>
``` java
    // Hàm kiểm tra 2 string có bằng nhau không
    public boolean Contains(String str, String substr) {
        if (str == null || substr == null) return false;
        if (substr.equals("")) return true;
        return false;
    }
```
## 5. Tối thiểu hóa nesting
- Khi sử dụng quá nhiều if lồng nhau sẽ dẫn đến khó hiểu cho người đọc. <br>
- Ví dụ <br>
``` java
    if (user_result == SUCCESS) {
        if (permission_result != SUCCESS) {
            reply.WriteErrors("error reading permissions");
            reply.Done();
            return;
        }
        reply.WriteErrors("");
    } else {
        reply.WriteErrors(user_result);
    }
    reply.Done();
```
Khi nhìn vào thẻ đóng đầu tiên của **permission_result != SUCCESS** người đọc sẽ thường hiểu, tiếp theo sẽ đến trường hợp **permission_result == SUCCESS** và quên mất rằng điều kiện này đang nằm trong một điều kiện khác là **user_result == SUCCESS**. <br>
Chúng ta có thể tối thiểu hóa bằng cách sử dụng return như trên. <br>
``` java
    if (user_result != SUCCESS) {
        reply.WriteErrors(user_result);
        reply.Done();
        return;
    }
    if (permission_result != SUCCESS) {
        reply.WriteErrors(permission_result);
        reply.Done();
        return;
    }
    reply.WriteErrors("");
    reply.Done();
```
Bằng cách sử dụng return sớm như trên ta có thể chuyển về dạng một vòng lặp khiến code dễ đọc và logic cũng dễ hiểu hơn <br>
- Loại bỏ nesting khỏi vòng lặp <br>
Ví dụ <br>
``` java
    for (int i = 0; i < results.size(); i++) {
        if (results[i] != NULL) {
            non_null_count++;
            if (results[i]->name != "") {
            cout << "Considering candidate..." << endl;
            }
        }
    }
```
Ta có thể sử dụng return và continue để loại bỏ if lồng <br>
``` java
    for (int i = 0; i < results.size(); i++) {
        if (results[i] == NULL) continue;
        non_null_count++;
        if (results[i]->name == "") continue;
        cout << "Considering candidate..." << endl;
        ...
    }
```
# II. Tối ưu biểu thức lớn
## 1. Dùng biến
- Trường hợp dùng biến để giải thích. Ví dụ
``` java
    // Thay vì viết
    if line.split(':')[0].strip() == "root":
    ...
    // sẽ làm người đọc khó hiểu
    // Hãy dùng biến để giải thích cho đoạn code trên
    username = line.split(':')[0].strip()
   if username == "root":
    ...
```
- Một ví dụ khác về sử dụng biến làm code dễ hiểu hơn <br>
``` java
    if (request.user.id == document.owner_id) {
        // người dùng có thể edit document
    }
    
    if (request.user.id != document.owner_id) {
        // document chỉ cho phép đọc
    }
```
+ Logic ở đây là người dùng có phải là chủ sở hữu của document?  Nên ta có thể viết lại code <br>
``` java
    final boolean user_owns_document = (request.user.id == document.owner_id);
    if (user_owns_document) {
        // người dùng có thể sửa document
    }
    ...
    if (!user_owns_document) {
        // document chỉ được phép đọc
    }
```
Việc sử dụng biến trên có thể khiến người đọc dễ hiểu hơn, hơn nữa có thể giúp người đọc hiểu được mục đích của hàm ta viết ra. <br>

## 2. Luật morgan
- Ta có thể sử dụng luật De Morgan như sau: 
```
    1. not (a or b or c) <=> (not a) and (not b) and (not c)
    2. not (a and b and c) <=> (not a) or (not b) or (not c)
```
Ví dụ
``` java
 // Thay vì viết
 if (!(file_exists && !is_protected)) Error("Sorry, could not read file.");
 // Ta có thể viết
 if (!file_exists || is_protected) Error("Sorry, could not read file.");
```
# III Kết luận
Trên đây là những kiến thức mình tìm hiểu được để giúp code dễ đọc, dễ review hơn. Hi vọng bài viết sẽ có ích cho mọi người. Nếu có gì góp ý hay thảo luận hãy để lại bình luận phía dưới. Trong bài viết tới mình sẽ trình bày phần 2 về chủ đề này. (seeyou)
# IV Reference
- Cuốn: **THE ART OF READABLE CODE**