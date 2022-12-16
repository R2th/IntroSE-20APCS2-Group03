## Open-Closed Principle là gì ?

**Open-Closed Principle** được hiểu là **nguyên tắc Mở Nhưng Đóng**. Tức là mỗi thành phần của hướng đối tượng đều nên được **mở** trong việc mở rộng **nhưng đóng** trong việc sửa đổi. Một số blog lập trình tiếng Việt phát biểu đầy đủ nguyên lý này như sau:

>### Class nên được ƯU TIÊN MỞ RỘNG, nhưng cần HẠN CHẾ SỬA ĐỔI
> (Objects or entities should be open for extension, but closed for modification)

![](https://images.viblo.asia/3fbcd307-3282-4cd0-832e-dc094aa8ada7.jpeg)

## Giải thích nguyên tắc này

Một cô gái ngoại hình chưa được đẹp lắm, cô ấy nên dùng mỹ phẩm trang điểm để trở nên đẹp hơn hay là sang Hàn Quốc phẫu thuật để sửa đổi ngoại hình ? Tôi sẽ khuyên cô ấy dùng mỹ phẩm hơn là đi phẫu thuật. Có lẽ bạn cũng sẽ đồng ý với tôi.

![](https://images.viblo.asia/1065a036-2fdb-4d0a-bb86-a4a55827083b.jpg)

Việc phẫu thuật có những ảnh hưởng gì ?

* Tốn kém tiền bạc, thời gian
* Phải chịu đau đớn
* Có thể xảy ra biến chứng

Trong khi đó, nếu dùng mỹ phẩm. Sau khi không cần nữa, ta có thể tẩy trang. Ta không nhất thiết phải sửa đổi cơ thể mình để có thể trở nên đẹp hơn và cũng tránh những ảnh hưởng đến kinh tế cũng như sức khỏe lâu dài. (Tất nhiên đây là quyền của mỗi người nhưng tôi chỉ đưa vào đây như một ví dụ minh họa.)

Trong lập trình hướng đối tượng, một class có thể được triển khai ở rất nhiều nơi trong toàn hệ thống. Vì vậy ta không nên sửa đổi nó để tránh gây ảnh hưởng tới logic cũng như duy trì tính ổn định của toàn hệ thống. Ta chỉ nên mở rộng thêm các tính năng của nó khi cần mà thôi.

## Áp dụng nguyên lý này cho các class

Ở [phần trước](https://viblo.asia/p/lam-chu-solid-single-responsibility-principle-phan-1-gDVK2p3wlLj) tôi đã lấy ví dụ về class `ConBò` nên lần này tôi sẽ tiếp tục lấy ví dụ về nó. `ConBò` có một thuộc tính là `tuổi`. Và giả sử mọi con bò dưới 1 tuổi thì đều ăn bằng cách bú sữa mẹ, những con lớn hơn thì sẽ luôn chỉ ăn cỏ. Cách thông thường thì ta sẽ viết hàm kiểm tra tuổi của bò để thực hiện việc ăn tương ứng.

```Java
boolean đã_lớn_chưa() {
    if(tuổi > 1.0) {
        return true;
    }
    return false;
}

void ăn() {
    boolean lớn_rồi = đã_lớn_chưa();
    if (lớn_rồi) {
        // ăn cỏ
    } else {
        // bú sữa
    }
}
```

![](https://images.viblo.asia/e097efce-5348-460c-80ab-af6b13dddac5.jpg)

Giả sử bây giờ yêu cầu của nông trại là nếu bò già (trên 10 tuổi) thì phải có chế độ ăn riêng (ăn cám) thì ta phải làm sao ?? Có lẽ là phải sửa lại phương thức ăn, thêm một lần kiểm tra đã già chưa để thực hiện ăn cám như sau:

```Java
boolean đã_lớn_chưa() {
    if (tuổi > 1.0) {
        return true;
    }
    return false;
}

boolean đã_già_chưa() {
    if(tuổi > 10.0) {
        return true;
    }
    return false;
}

void ăn() {
    boolean lớn_rồi = đã_lớn_chưa();
    boolean già_rồi = đã_già_chưa();
    if (già rồi) {
        // ăn cám
    } else if (lớn_rồi) {
        // ăn cỏ
    } else {
        // bú sữa
    }
}
```

Trong trường hợp bò có nhiều chế độ ăn nữa như bò ốm, bò gầy cần tẩm bổ, bò béo cần ăn bớt đi thì việc xử lý sẽ ngày một phức tạp và tốn kém.

Do vậy ta cần hạn chế việc sửa đổi class mà hãy mở rộng nó. Bằng cách kế thừa lại class `ConBò` với các class `ConBê`, `BòGià`, `BòỐm`..., ta có thể ghi đè phương thức `ăn()` của `ConBò` để mỗi con có một cách ăn uống riêng, việc xử lý logic sẽ đơn giản hơn và cũng giúp chương trình của ta hoạt động ổn định hơn.

```Java

class ConBò {
    
    // ...
    
    void ăn() {
        // ăn cỏ
    }
}

class ConBê extends ConBò {
    
    // ...
    
    @Override
    void ăn() {
        // bú sữa
    }
}

class BòGià extends ConBò {
    
    // ...
    
    @Override
    void ăn() {
        // ăn cám
    }
}
```

Bằng việc tạo ra nhiều class mở rộng từ class `ConBò`, ta cũng dễ dàng thêm các phương thức khác cho từng kiểu bò cụ thể mà không cần phải thay đổi bất kỳ dòng code nào trong class `ConBò`.

## Áp dụng cho cả các phương thức

Một ví dụ khác từ con bò đó là con bò có phương thức `chạy()`. Ban đầu ta chỉ muốn nó thực hiện một hành động chạy bình thường. Nhưng sau đó, giả sử ta muốn chia trường hợp bò chạy bình thường và bò lồng (chạy mất kiểm soát). Thì ta sẽ nghĩ đến việc truyền thêm một tham số boolean `có_lồng_không` và sửa phương thức `chạy()` thành phương thức `chạy(boolean có_lồng_không)`, nếu lồng thì thực hiện thêm việc gì đó chẳng hạn. Việc đó sẽ ảnh hưởng tới tất cả những nơi nào phương thức `chạy()` đang được gọi.

Thay vì thế, ta có thể overload phương thức này bằng cách viết thêm một phương thức `chạy(boolean có_lồng_không)` chẳng hạn. Hoặc đơn giản hơn (nên vậy), viết hẳn một phương thức `lồng()` dành riêng cho việc lồng. Nhớ đặt tên chính xác chứ đừng thiếu chữ `g`.

![](https://images.viblo.asia/7e3979d4-0f56-489a-b20d-450fc0211c79.jpg)

Ta hoàn toàn không phải đau đầu cho việc sửa code, sửa logic những chỗ mà phương thức này đang được gọi trong chương trình nữa.

## Ví dụ trong thực tế

Một ví dụ trong thực tế đó là trong business logic của chương trình có 3 cấp bậc người dùng là user, moderator và administrator:

- User: có các quyền của người dùng như đăng bài, bình luận
- Mod: có tất cả các quyền của user + quyền xoá bài người khác
- Admin: có tất cả các quyền của mod + quyền khoá tài khoản, thiết lập quyền cho các user

Thay vì tạo duy nhất một class `User` duy nhất với thuộc tính `privilege`. Sau đó với mỗi thao tác đều kiểm tra quyền của `User` là gì để quyết định có thực hiện các hàm đó không, ta nên tạo ra class `Moderator` kế thừa class `User`, sau đó tạo ra class `Administrator` kế thừa class `Moderator`. Như vậy, class `Moderator` có thể kế thừa lại hết các phương thức của User, class `Administrator` có thể kế thừa lại hết các phương thức của `Moderator`. Việc xử lý logic sẽ đơn giản hơn.

Ta cũng có thể thoải mái thêm các cấp bậc khác bằng cách mở rộng các lớp mới từ các lớp đã có, không cần phải chỉnh sửa class đã có mỗi khi một cấp bậc mới mới được thêm vào nữa.

## Tổng kết 

Các cụ ta đã có những câu:
- Rút dây động rừng
- Rút gạch chân tường

để nói rằng việc sửa đổi một thứ gì đó dù nhỏ nhưng nằm ở vị trí quan trọng cũng sẽ ảnh hưởng tới cả một hệ thống to lớn hơn dính dáng tới nó. Ta không nên sửa chữa những thứ đã có nếu nó đã hoạt động đúng và tốt. Thay vào đó ta nên mở rộng chúng bằng cách viết thêm. Hãy hiểu rõ ý nghĩa của chữ O trong SOLID và áp dụng nó khi xây dựng phần mềm.

> **Class nên được ưu tiên mở rộng và hạn chế sửa đổi**

-----

- Series: [Làm chủ SOLID - Full series](https://viblo.asia/s/lam-chu-solid-full-series-bq5QL7dmlD8)
- My Blog: https://phucynwa.wordpress.com/2019/09/12/lam-chu-solid-open-closed-principle-phan-2/