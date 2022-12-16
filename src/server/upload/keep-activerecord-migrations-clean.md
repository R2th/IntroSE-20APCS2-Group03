## Mở đầu
Là một developer Ruby on Rails, bạn thường xuyên phải làm việc với migration. Bạn tạo migration trong khi thêm một model mới vào ứng dụng của bạn hoặc khi bạn thực hiện các hoạt động như thêm, cập nhật hoặc xóa các cột trong một bảng hiện có.
Vấn đề với việc migration được kết nối với tuổi thọ của ứng dụng, điều đó có nghĩa là khi ứng dụng của bạn ngày càng hoàn thiện, bạn thêm ngày càng nhiều model hoặc chỉnh sửa các model đã tồn tại - nó ảnh hưởng đến thư mục `db/migration` của bạn, ngày càng lớn hơn.

Giữ tất cả lịch sử của việc thay đổi có thể không có giá trị, bạn thực sự không cần biết về mọi thay đổi được thực hiện bởi đồng nghiệp của mình, người đã thực hiện hàng tá di chuyển vì anh ta không thể tìm thấy tên tốt nhất cho một trong các filed trong model nào đó hoặc chuyển một số giá trị mặc định trong quá trình phát triển. Bạn muốn bám vào schema hiện tại của database, nhưng trong một số trường hợp, bạn không thể xóa các di chuyển cũ như thế. Nhưng tôi đã có một giải pháp mà tôi muốn chia sẻ với bạn.

Tôi muốn giới thiệu cho bạn một gem, nó sẽ giúp bạn với chuỗi các tệp migration vô tận - Nó được gọi là [Squasher] https://github.com/jalkoby/squasher.

Mục tiêu chính của nó là hợp nhất tất cả các tệp migrations cho đến khoảng thời gian nhất định và tạo một tệp duy nhất với trạng thái cuối cùng của cơ sở dữ liệu từ khoảng thời gian nhất định. Nó sẽ hữu ích khi ứng dụng của bạn ở trạng thái ổn định và bạn không cần phải xem nhiều tệp lịch sử, bởi vì bạn thậm chí không mở chúng thường xuyên. Một lợi ích khác của việc sử dụng Squasher là trong quá trình di chuyển, nó sẽ xóa tất cả các thao tác trên các bản ghi hoặc những yêu cầu một số dịch vụ.

## Ví dụ 

```
$ squasher 2018
```

Nó sẽ thay đổi thư mục `db/migations` của bạn mãi mãi, sau khi vào thư mục bạn sẽ chỉ thấy một tệp chứa tất cả các lần di chuyển từ khoảng thời gian trước đó.

## Sử dụng

* Thêm gem "squasher"vào Gemfile của bạn
* tạo cơ sở dữ liệu gọi là `squasher` - nó sẽ là cơ sở dữ liệu tạm thời có tất cả dữ liệu được chèn trong khi di chuyển. Squasher sẽ hỏi bạn sau này về việc lưu nó cho tương lai hay không
* Sử dụng `squasher DATE` để hợp nhất tất cả các lần di chuyển trước DATE

Chắc răng sau thao tác này, thư mục migrations của bạn sẽ trông như thế này

![](https://images.viblo.asia/edabeb68-ed7e-4aee-8f03-a39ba9a2a24c.png)

Trong khi trước đây nó trông như thế này:
![](https://images.viblo.asia/341fa80f-8021-4bd1-8bb0-f6512a3e85b9.png)

Nó thực sự khác biệt!
![](https://images.viblo.asia/e4dfa8b2-a95b-4e71-bc8a-e3815a791b38.gif)

Hi vọng bạn có thể sử dụng gem này trong công việc hàng ngày và có thể giữ cho thư mục migrations của bạn clean.