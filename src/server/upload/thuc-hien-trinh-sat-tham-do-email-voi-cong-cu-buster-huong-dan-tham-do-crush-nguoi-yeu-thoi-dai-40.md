`Trinh sát - thăm dò, là một bước quan trọng cần thiết trong hacking, mục đích là biết mọi thứ (càng nhiều càng tốt) về mục tiêu đang muốn khai thác.`

Tiếp nối sau thành công cũng khá là vang dội của bài viết [Săn tìm tài khoản mạng xã hội bằng công cụ sherlock](https://manhnv.com/2019/08/san-tim-tai-khoan-mang-xa-hoi-bang-sherlock-tool/), bài viết mà đã bị trang `t.o.p.d.e.v` lấy về đổi tên thành [Hướng dẫn stalk facebook của crush thời đại 4.0](https://manhnv.com/2019/08/san-tim-tai-khoan-mang-xa-hoi-bang-sherlock-tool/). Hôm nay mình quyết định hướng dẫn cho các bạn một công cụ nâng cao hơn, sịn xò hơn công cụ ở bài kia với tiêu đề **Thực hiện trinh sát - thăm dò email với công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.**

## I. Thực hiện trinh sát - thăm dò email với công cụ buster.

### Thăm dò email.

Có nhiều cách để có được địa chỉ email của một người, từ các công cụ tìm kiếm trên các trang mạng truyền thông xã hội, nhưng hầu hết là không cung cấp phương thức này để bạn có thể tìm được email, vì nó còn liên quan đến bảo mật thông tin người dùng.

Một các khác để có được email của một người là đoán nó. Mọi người có xu hướng đăng ký tài khoản email theo các mẫu cụ thể như: năm sinh hoặc ngày sinh ngay sau tên của họ. Ví dụ: nguyenmanh1997@gmail.com, nguyen.manh.97@gmail.com. Nhưng việc đoán biết một email như vậy bằng cách thủ công thì cũng khá tốn thời gian. Có lúc còn không tìm được.

Vậy có một cách khả quan hơn là bạn dựa vào các nhà cũng cấp có dùng email để đăng ký tài khoản như facebook. Facebook thì khi bạn viết một tài khoản nào đó, bạn bấm vào khôi phục tài khoản thì sẽ có các thông tin như sau:

![Khôi phục tài khoản facebook](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/khoi-phuc-tai-khoan-facebook.png "Khôi phục tài khoản facebook")

Bây giờ với việc dựa vào thông tin của tài khoản đó bằng cách xem profile có được: first name, laste name, ngày sinh, chúng ta có thể dễ dàng đoán được toàn bộ email một cách nhanh chóng với `Buster`.

### Buster là gì?

Buster là một công cụ OSINT sử dụng để làm những việc như:

* Nhận diện tài khoản của một mạng xã hội khi biết `email`, có nhiều mạng xã hội như: **gravatar, about.me, myspace, skype, github, linkedin,...**
* Lấy được đường link (liên kết) của những trang web mà có xuất hiện của `email`.
* Lấy được tên miền (domain) mà có sử dụng `email` để đăng ký (reverse whois)
* Generate ra những username và email có thể đăng ký của một người dựa vào thông tin: first name, middle name, birthdate, last name ...
* Tìm email của một tài khoản trên mạng xã hội.

=>> Và rất nhiều tính năng khác mà mình chưa khám phá hết.

### Cài đặt Buster

Clone the repository:

```shell
git clone git://github.com/sham00n/buster
```

Khi đã clone xong buster bạn làm theo các bước sau:

```shell
cd buster/
python3 setup.py install
```

![Cài đặt Buster](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/clone-buster.png "Cài đặt Buster")

**Lưu ý:** Máy của bạn cần cài đặt python trước để chạy lệnh install của Buster.

Sau khi cài đặt xong bạn có thể kiểm tra xem Buster đã chạy được cài đặt thành công chưa bằng cách gõ:

```shell
buster -h
```

Nếu thấy kết quả như dưới thì đã thành công nha.

![Cài đặt Buster thành công](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/buster-help.png "Cài đặt Buster thành công")

### Trải nghiệm Buster

Trong một số ví dụ mình sẽ demo dưới đây, mình dùng email `nguyenmanh@gmail.com`.

1. Lấy thông tin của một email bất kỳ (kiểm tra xem nó tồn tại hay không, các trang mạng xã hội truyền thông mà email đăng ký, liên kết đến trang web có sự xuất hiện của email,....).

    ```shell
    buster -e nguyenmanh@gmail.com
    ```

    ![Kiểm tra mail](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/buster-e-email.png "Kiểm tra mail")

    Bạn cũng có thể liệt kê một danh sách mail vào file `.txt` để quét một danh sách mail.

    ```txt
    nguyenmanh@gmail.com
    manh@gmail.com
    ....
    ```

    ![Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/buster-list-email.png "Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.")

2. Tạo email phù hợp với mẫu và kiểm tra xem chúng có tồn tại hay không (Sử dụng thêm tham số -a nếu bạn muốn thêm thông tin thêm, ví dụ: -a nickname phone).

    ```shell
    buster -e n********7@g****.com -f nguyen -l manh -b ****1997
    ```

    ![Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/to-hop-mail.png "Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.")

3. Tạo username

    ```shell
    buster -f nguyen -l manh -b 28071997
    ```

    ![Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/genarate-username.png "Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.")

4. Tạo email (sử dụng -v nếu muôn validate và lấy thông tin từng email)

    ```shell
    buster -f nguyen -m van -l manh -b 28071997 -p gmail.com yahoo.com
    ```

5. Tạo 100+ email theo định dạng `username@provider.com` và trả về những email hợp lệ ( sử dụng -p nếu bạn không muốn 100+ email)

    ```shell
    buster -u nguyenmanh
    ```

    ![Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/buster-100-plus.png "Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.")

6. Tạo email công ty và trả về thông tin liên quan.

    ```shell
    buster -f nguyen -l manh -c manhnv.com
    ```

## II. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.

Vậy thì, với những thứ mình viết rông dài ở bên trên thì có liên quan gì đến việc `Hướng dẫn thăm dò crush, người yêu thời đại 4.0`. Chúng ta hãy bắt đầu phần thú vị này nhé.

Bài viết mình hướng dẫn bắt buộc phải biết một ít gì đó về crush hoặc người yêu của bạn rồi nhé, ví dụ như: hoặc là email, hoặc là tài khoản facebook. Nếu bạn crush người ta mà không biết được 1 tý gì về người ta trước thì đến trời cũng chịu. Mình chỉ hướng dẫn các bạn từ lượng thông tin ít ỏi đó thăm dò thêm nhiều thông tin khác thôi.

### Trường hợp 1: Bạn đã biết email crush hoặc người yêu.

Trường hợp này thì đơn giản nhất, các bạn chỉ cần chạy lệnh Buster lên và ngồi chờ quét hết xong tìm hiểu từng thứ một thôi.

Ví dụ: người bạn đang định tìm hiểu có email `nguyenmanh0397@gmail.com`.

```shell
buster -e nguyenmanh********@gmail.com -v
```

![Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/buster-nguyenmanh.png "Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.")

Kết quả như trên, thì các bạn có thể phân tích được là: người mình đang tìm hiểu có dùng pastebin, twitter, github, .... Các đường dẫn cũng như tài khoản github mà người đó đang hoạt động. Chúng ta đi tới các link đó để tìm hiểu thông tin sâu hơn nữa. Ở phần sources là những trang web có sự xuất hiện của mail, bạn vào 1 web bất kỳ xem nhé.

![Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/package-laravel.png "Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.")

Ồ, thế là mình đã biết được một thông tin nữa là với email kia thì có từng submit một `pakage` cho `laravel` ở trên trang `packagist`. Vậy mục tiêu chắc chắn là một developer rồi (hoặc đã từng).

=> Với cách tìm hiểu từ từ với sự giúp sức của Buster các bạn sẽ biết thêm được nhiều thông tin về crush cũng như nửa kia hơn.

### Trường hợp 2: Bạn chỉ biết tài khoản facebook, twitter, ...

Bạn vô tình gặp nửa kia ở nơi làm việc, ngoài đường, hay bất cứ đâu. Bạn gặp tình yêu sét đánh của đời mình, mò mẫm mãi cuối cùng cũng ra được tài khoản facebook của người ta. Nhưng trên trang cá nhân không có một thông tin gì hết, chỉ toàn đăng ảnh chó, mèo, hoa rơi cửa phật, ... Nhưng bạn đâu ngờ rằng, có một số bạn nữ rất ít đăng ảnh cá nhân hay bất cứ gì liên quan đến đời sống lên facebook (vì nó quá public) mà chỉ đăng lên  instagram (private hơn một chút) thôi chẳng hạn.

Vậy thì bạn làm sao có thể biết được thông tin về người ta, đến hỏi trực tiếp thì ngại, hỏi người quen cũng ngại. Hãy đọc tiếp bài cùa mình, mình sẽ hướng dẫn cho bạn cách thăm dò thông tin người đó.

Ví dụ, đây là tài khoản facebook của người ấy khi vào profile.

![Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/nguyenmanh.png "Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.")

Bạn nhìn thấy đường dẫn `https://www.facebook.com/nguyenmanh1997`, vậy tài khoản facebook của người đó là `nguyenmanh1997`.

1. Vào trang đăng nhập của facebook, nhập tài khoản vào ô email.

    ![Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/login-facebook.png "Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.")

2. Bấm vào `Đăng nhập`. Vì chưa có mật khẩu nên lập tức facebook trả về một trang đăng nhập lại.

    ![Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/re-login-facebook.png "Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.")

3. Bấm vào `Khôi phục tài khoản của bạn`. Bạn sẽ nhận được mẫu email dùng đăng ký tài khoản facebook đó.

    ![Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/khoi-phuc-facebook.png "Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.")

4. Việc tiếp theo là dùng Buster để quét mẫu mail hợp lệ.
    Chắc chắn tài khoản là `nguyenmanh1997` thì phải sinh năm 1997. First name là `nguyen` và last name phải là `manh`. Câu lệnh sẽ là:

    ```shell
    buster -e n********7@g****.com -f nguyen -l manh -b ****1997
    ```

    Chạy ra kết quả:
    ![Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.](https://manhnv.com/images/posts/hacking/thuc-hien-trinh-sat-tham-do-email-va-cong-cu-buster/tham-do-final.png "Thực hiện trinh sát - thăm dò email và công cụ buster. Hướng dẫn thăm dò crush, người yêu thời đại 4.0.")

    Như vậy rồi bạn chỉ việc chọn thông tin đúng với người mình đang muốn tìm hiểu thì đích thị là mail đó là của người đó rồi. Vì cũng chỉ có `18` email hợp lệ với điều kiện bạn đưa ra nên là cũng dễ tìm thủ công.

=>> Đến đây thì đã quay trở lại với trường hợp `bạn đã có email`. Mình xin lỗi chỉ demo đến vậy thôi, vì nêu demo tiếp thì thông tin cá nhân của mình lộ hết =))

## Tổng kết

* Bruster là một công cụ khá mạnh giúp cho việc thăm dò của bạn rất nhiều, nhưng điều kiện là bạn phải biết cách vận dụng nó như thế nào.
* Một bài viết nhằm giúp các bạn biết thêm về một công cụ mới, có những tính năng như trên.

Cuối cùng vẫn là câu quen thuộc `Cảm ơn các bạn đọc bài viết của mình.`.

Nếu thấy hay thì share cho nhiều người cùng đọc nhé. Trong lúc tìm hiểu về Buster các bạn phát hiện có tính năng nào hấp dẫn hơn có thể `bình luận` phía bên dưới để nhiều bạn khác được biết hơn.

Các bạn có thể vào blog của mình để đọc thêm nhiều bài hay nhé: [manhnv.com](https://manhnv.com/2019/08/thuc-hien-trinh-sat-tham-do-email-voi-cong-cu-buster-huong-dan-tham-do-crush-nguoi-yeu-thoi-dai-4.0/)

`Base64: xJHhuqMgxJHhuqNvIHRvcGRldg==`