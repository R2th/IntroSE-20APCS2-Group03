## Giới thiệu

Tag là chức năng đặt tên hay đánh dấu cho 1 commit bất kỳ, nhằm giúp chúng ta dễ dàng tìm kiếm đến commit đó.
Nó giúp chúng ta dễ dàng tìm kiếm một commit được đánh dấu trong hàng loạt các commit.
Ngoài ra, nó còn giúp chúng ta dễ dàng đối chiếu, so sánh về sau này mà không cần nhớ checksum của mỗi commit, mà chỉ cần nhớ tag, cũng như có thể tạo thêm Branch từ tag giúp chúng ta thuận tiện hơn trong việc phân nhánh.
**Có một chú ý là một khi tạo hay gắn tag cho 1 commit cụ thể thì ta không thể thay đổi lịch sử của commit đó được nữa.**

## Phân loại tagging
Trên Git, có thể sử dụng 2 loại tag là `lightwiegh` tag và `annotated` tag 

* Lightweigh tag
    * Temporary tag là cái không thể thay đổi
    * Có thể đặt tên

    `Lightweight tag` thực chất chỉ là đánh dấu (bookmark) cho một commit, vì chúng chỉ lưu trữ hàm băm (hash) của commit mà chúng tham chiếu. Chúng được tạo chỉ gồm tên mà không có các tùy chọn -a, -s hoặc -m và không chứa bất kỳ thông tin bổ sung nào. Vì vậy, nó thường được` dùng chủ yếu tại không gian local làm việc tạm thời`
    Để tạo ra 1 Lightweigh tag tên là "v.1.0-l" cho Head commit hiện tại, chúng ta chỉ cần lệnh 
    ```GIT
    git tag v.1.0-l
    # show 
        git tag
    ```
    
    ![](https://images.viblo.asia/c2e7ffe7-791d-474e-8818-43bc4062fa70.png)
    
    
    
    Sau khi gắn tag cho commit xong, bây giờ chúng ta có thể dễ dàng hiển thị lại lịch sử thông tin tag với lệnh `git log --decorate`
        ![](https://images.viblo.asia/8e586411-913e-4bc2-a06b-f8a725ca865d.png)

* Annotated tag
    * Có thể đính kèm tên và email của người thực hiện và ngày
    * Có thể đặt tên
    * Có thể đính kèm bình luận
    * Có thể đính kèm chữ ký
    
    Ngược lại, Annotated tag ngoài việc tạo tên, nó còn cho phép chúng ta lưu trữ thêm các thông tin như owner, message, date ... Vì vậy, nó được dùng để đánh dấu các commit release và đồng thời thêm các chú thích bên cạnh các đánh dấu đó.
    Để tạo 1 annotated tag  có tên v2.0-a với tin nhắn là "Release version v2.0"
    ```git
    git tag -a v2.0-a -m "Release version v2.0"
    ```
    Với tham số `-a` để đánh dấu rằng đây là annotated tag, hay nói rằng nó sẽ chưa thông tin về người tạo tag.
    Với tham số `-m` chính là việc chúng ta sẽ thêm tin nhắn cho tag đó
    ![](https://images.viblo.asia/775e2017-a3c5-4c0d-9fa3-cfc99428086c.png)

    Xem lại lịch sử tag vừa tạo với `git log --decorate`
    ![](https://images.viblo.asia/45837081-d3a8-4216-8e43-f57650ad79f8.png)


## Một số lệnh làm việc với tag
* xem các tag và message đi kèm với `git tag -n`
![](https://images.viblo.asia/51bb0fbb-c5e5-45d8-baeb-dc4ee7ac4008.png)

* Xem chi tiết tag chỉ định với `git show name_tag`
Với lệnh này, giúp chúng ta xem được thông tin tác giá, ngày tạo message, nội dung commit (các thay đổi của file code)
![](https://images.viblo.asia/d43ea65f-f59b-48b5-badb-9830d3a3b222.png)

* Liệt kê các commit cùng với hash code của nó thì dùng lệnh `git log --pretty=oneline`
![](https://images.viblo.asia/00d0f45a-7527-4750-aa65-9aa8b98ce739.png)

    Việc show hash code  commit nhằm mục đích là đôi khi mình muốn tạo tag cho một commit trong lịch sử commits, chứ không phải là commit cuối thì chúng ta sẽ dùng lệnh `git tag -a name_tag hash_code -m "message"`

    Giả sử, với image trên, chúng ta tạo tag cho commit `ae383efaac53a962ddee5814b1ae20a3bd2585f7  (master) init` 
    ![](https://images.viblo.asia/6787c73c-509e-404d-afa0-6f1e8d1c0d0d.png)


* Quay về 1 phiên bản với tag

    Bình thường quan về một phiên bản nào đó bằng cách chỉ ra mã hash của phiên bản cũ, nhưng nếu có tag thì dùng tag sẽ gợi nhớ và có vẻ dễ dàng hơn
    ```git
    git checkout tagname
    ```
    Vì lệnh git checkout nó làm cho con trỏ HEAD bị tách ra, nên nếu muốn các commit sau thời điểm checkout được giữ lại thì có thể tạo luôn nhánh branch mới bắt đầu từ tag này
    ``` git
    git checkout -b newbranchname tagname
    ```
    
    
* Đưa tag lên Remote

    Mặc định lệnh `git push` để cập nhật một dữ liệu code lên Remote, `nó không có push các tag`. Nếu muốn cập nhật lên Remote phải chỉ ra bằng một lệnh git push cụ thể, cứ suy nghĩ mỗi tag giống như  branch
    ```
    git push origin tagname
    ```
    Cập nhật tất cả các tag
    ```
    git push origin --tags
    ```
    
* Xóa 1 tag

    Để xóa một tag thì cần thực hiện xóa cả ở Local và ở Remote (nếu đã push tag)
    ```
    git push --delete origin tagname
    git tag -d tagname
    ```

# Bài viết được tham khảo chính tại https://backlog.com/git-tutorial/vn/stepup/stepup5_4.html