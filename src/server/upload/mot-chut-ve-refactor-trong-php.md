![](https://images.viblo.asia/e5df98b6-5de4-465c-9acd-f965cb9c8456.png)
Nhận biết một lập trình viên giỏi có rất nhiều yếu tố, trong đó chất lượng code cũng là một yếu tố quan trọng. Trong thời đại công nghệ 4.0 này, code tốt có nghĩa là tiết kiệm được đồng tiền cho công việc testing, updating, mở rộng hoặc sửa lỗi. Trong bài viết này, tôi sẽ cho bạn thấy các ví dụ thực tế về một số kỹ thuật và ý tưởng sẽ giúp bạn code clean hơn và refactor để cho đoạn code tối ưu hơn. Những kỹ thuật này không chỉ giúp bạn cấu trúc lại code cũ mà còn cung cấp cho bạn những ý tưởng tuyệt vời về cách viết code clean từ bây giờ.

## Refactor là gì và tại sao ta cần refactor?
Refactor đề cập đến các kỹ thuật và các bước giúp bạn viết code sạch. Điều này rất quan trọng đối với những người cùng dự án, để họ có thể đọc, mở rộng và sử dụng lại code đó mà không cần phải chỉnh sửa nhiều.
Tiếp theo mĩnh sẽ demo một số ví dụ về refactor và làm cho nó tốt hơn.

## Đừng bao giờ refactor lại code trên production nếu không có unit tests.
Lời khuyên đầu tiên của mình là đừng bao giờ refactor nếu không có unit tests cho function đó. Lý do rất rõ ràng: những function dính bug sẽ rất khó để fix vì ta sẽ không thể biết bug đó sai ở đâu. Do đó, nếu bạn cần refactor lại nó, hãy viết unit tests trước. Phải chắc rằng phần ta refactor đã được cover hết bởi unit tests.

## Bắt đầu refactor từ phần sâu nhất của code của bạn.
Đoạn code dưới đây nằm trong một dự án thực tế cho một hệ thống quản trị khách sạn mà mình tìm thấy trên Github.
![](https://images.viblo.asia/5feb822d-1e76-4eb3-b7c6-e7e6bc07869a.png)
Ở function trên, có ba cấp được đánh dấu màu đỏ. Phần sâu nhất là khối if/else lồng trong câu điều kiện if đầu tiên. Thông thường, phần này nên tập trung vào một logic duy nhất giúp ta dễ dàng refactor hơn.

## Làm cho các methods ngắn hơn bằng cách chia chúng thành một method nhỏ hơn.
Đối với đoạn code trên, ta có thể đưa ra thành một method riêng như sau:
![](https://images.viblo.asia/cfba29e8-b9e3-4e69-a5db-9d512db9399f.png)

Tiếp theo là lấy data bài post và đưa ra views. Bây giờ, function add () đã có thể dễ đọc hơn, fix bug dễ hơn sau khi các function khác đã được refactor.
![](https://images.viblo.asia/f1792dcd-ac91-4aea-9a9c-a56a353144d7.png)

## Luôn sử dụng {} trong if-statements.
Hầu hết các ngôn ngữ lập trình đều hỗ trợ một câu lệnh if đầy đủ nhưng khi chúng ta code lại hay dùng những câu lệnh if ngắn vì nó đơn giản, tuy nhiên, nó có thể sinh ra bug vì một dòng trống có thể phá vỡ cấu trúc điều kiện. Xem sự khác biệt giữa hai ví dụ:
```
// NOT GOOD
public function checkLogin()
{
    if (!UID)
        redirect('login');
}

// VERY GOOD
public function checkLogin()
{
    if (!UID) {
        redirect('login');
    }
}
```

## Không sử dụng magic numbers hoặc magic strings.
Trong ví dụ tiếp theo, if ($rooms > 250), nó sẽ trả về một thông báo lỗi. Trong trường hợp này, 250 được coi là một magic number. Nếu bạn không phải là người viết ra đoạn code này, bạn sẽ rất khó để fix nó nếu nó theo một logic phức tạp nào đó.
```
public function availableRooms($rooms)
{
    if ($rooms > 250) {
        return 'No rooms available';
    } else {
        return true;
    }
}
```

Để refactor, chúng ta có thể gán biến $maxAvailableRooms = 250. Bây giờ, nó dễ hiểu hơn đối với những người sẽ maintain sau này.
```
public function availableRooms($rooms)
{
    $maxAvailableRooms = 250;
    
    if ($rooms > $maxAvailableRooms) {
        return 'No rooms available';
    } else {
        return true;
    }
}
```

## Không sử dụng else-statements nếu nó không quá cần thiết.
Trong câu lệnh if của function availablerooms (), chúng ta có thể không cần dùng else nhưng logic vẫn sẽ giống nhau.
```
public function availableRooms($rooms)
{
    $maxAvailableRooms = 250;
    
    if ($rooms > $maxAvailableRooms) {
        return 'No rooms available';
    }
    
    return true;
}
```

## Sử dụng tên có ý nghĩa cho hàm và biến.
Trong ví dụ sau, bạn có thể thấy hai hàm index() và room_m(). Nhìn vào hai hàm này, ta không thể xác định mục đích của đoạn code này là gì.
![](https://images.viblo.asia/065d8ba8-bb6b-4eff-894d-10639334493c.png)

## Sử dụng tối đa khả năng của ngôn ngữ lập trình của bạn.
Nhiều người không sử dụng toàn bộ khả năng của ngôn ngữ lập trình mà họ có. Nhiều trong số các tính năng này có thể giúp ta tiết kiệm effort và làm cho code của ta tối ưu hơn. Ví dụ tiếp theo có thể dễ dàng có được kết quả tương tự với ít code hơn bằng cách chỉ sử dụng gợi ý.
![](https://images.viblo.asia/794ab7ce-8cdb-43c2-bf22-5e5df06fb24a.png)

![](https://images.viblo.asia/79e3bd10-e87d-49ce-a5d6-caf612aa425c.png)

### Mình muốn kết thúc bài này với một vài mẹo giúp code tốt hơn.
* Sử dụng mảng mới với [] thay vì array().
* Sử dụng toán tử === thay vì == trừ khi điều quan trọng là không kiểm tra dataType.
* Chỉ sử dụng tên chung với các hàm implement interfaces, ví dụ add() và sử dụng tên mô tả cho các hàm dùng riêng nhw addUser() hoặc addDocument().
* Loại bỏ các phương thức không sử dụng.
* Sử dụng tiền tố is/has với các hàm trả về boolean, ví dụ: isAdmin($user), hasPermission($user).
* Đưa các hàm public lên đầu.
* Luôn để một hàm xử lý một chức năng duy nhất.

Tham khảo:
* https://medium.com/
* https://hackernoon.com/