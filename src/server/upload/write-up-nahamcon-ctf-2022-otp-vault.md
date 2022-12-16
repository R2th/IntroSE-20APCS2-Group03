![](https://images.viblo.asia/5715262b-9da8-4591-91ae-1ec23dd04f52.png)

# 1. Phân tích
OTP Vault là một thử thách ở mức độ trung bình, thuộc mục Mobile - khai thác lỗ hổng trên ứng dụng di động. Khi cài đặt vào máy ảo Android thì dễ thấy được chức năng của ứng dụng vô cùng đơn giản.

![](https://images.viblo.asia/f1235eda-06c9-4af7-bf83-039318f9b73a.png)

Ứng dụng chỉ bao gồm một trường nhập liệu, 1 nút bấm và 1 trường hiển thị kết quả. Khi nhập vào một chỗi bất kỳ thì chúng ta thấy giá trị của trường hiển thị kết quả đã thay đổi. Như vậy có thể đoán được rằng flag sẽ trả về tại đây nếu chúng ta nhập vào một chuỗi đúng.

![](https://images.viblo.asia/aa313998-10b7-4fe2-a0ba-3270eb44fa54.png)

# 2. Dịch ngược ứng dụng
Việc tiếp theo chúng ta sẽ làm là cố gắng dịch ngược ứng dụng, xem xem có bất cứ thông tin nào về chuỗi cần nhập đúng hay không.

## 2.1. Decompile tệp tin apk bằng apktool
Sử dụng công cụ apktool để decompile tệp tin apk với câu lệnh quen thuộd: ```java -jar apktool.jar -d OTPVault```

![](https://images.viblo.asia/bca70f09-b5dc-4afd-9d47-cf79b8b865d2.png)

Trong thư mục decompile được, chúng ta phát hiện 1 tệp tin **index.android.bundle** trong thư mục assets. Như vậy đây là một ứng dụng code bằng React Native, và tệp tin **index.android.bundle** chứa mã nguồn Javascript của ứng dụng.

![](https://images.viblo.asia/1c9d711a-2d5b-4903-b284-8ac0e13bc36b.png)

## 2.2. Decompile tệp tin index.android.bundle
Chúng ta có thể trực tiếp mở tệp tin .bundle lên bằng các text editor như VSCode, tuy nhiên mã nguồn đã bị làm rối và vô cùng khó đọc.

![](https://images.viblo.asia/3d305355-a975-43a3-97aa-0d7c6d666e90.png)

Vì vậy chúng ta cần tìm cách gỡ rối mã nguồn và chia nhỏ phạm vi tìm kiếm ra với công cụ **react nativce decompiler**. Công cụ này có thể được cài đặt qua NPM. Thông tin thêm về công cụ này có thể tìm được tại [đây](https://www.npmjs.com/package/react-native-decompiler).

![](https://images.viblo.asia/2772d08c-c502-4dee-8e01-904749dd9c52.png)

Sau khi cài đặt công cụ qua NPM, chúng ta sử dụng lệnh ```rnd -i ./index.android.bundle -o ./output``` để giải nén mã nguồn React Native trong tệp tin bundle.

![](https://images.viblo.asia/7a55cc24-43b3-48c5-949d-839568992d1e.png)

Như vậy mã nguồn đã được gỡ rối 1 phần, và tách ra thành nhiều tệp tin khác nhau.

# 3. Tìm flag
Tới phần này thì có 2 cách để lấy được flag:
- Cách 1: vô cùng đơn giản, chỉ cần dịch ngược mã nguồn, rà soát trong mã nguồn viết bằng Javascript là chúng ta có thể lấy được flag.
- Cách 2: cần patch app

## 3.1. Cách 1
Khi đọc qua mã nguồn thì chúng ta có thể phát hiện được tệp tin **396.js** chứa rất nhiều thông tin thú vị.

![](https://images.viblo.asia/568f8f8d-b729-49f5-9523-74d9644a9542.png)

Bắt đầu từ dòng thứ 72 trở đi, chúng ta thấy một module sẽ thực hiện http request tới địa chỉ ```http://congon4tor.com:7777/flag``` để đọc nội dung flag. Trong request có kèm HTTP header **```Authorization: Bearer KMGQ0YTYgIMTk5Mjc2NzZY4OMjJlNzAC0WU2DgiYzE41ZDwN```**. Nếu thiếu header này thì server sẽ không trả về nội dung flag, thay vào đó chúng ta nhận được thông báo: ```{"error":"Missing authorization header"}```

Như vậy chỉ cần thực hiện HTTP request với đầy đủ thông tin, chỉ với một lệnh curl là chúng ta sẽ có được flag.

![](https://images.viblo.asia/79210789-252a-4af3-bab2-e06fbf873b9e.png)

## 3.2. Cách 2
Với cách này thì chúng ta sẽ không cần để ý tới phần mã nguồn thực hiện gửi HTTP request bên trên. Chúng ta chỉ cần biết rằng **n.GetFlag** sẽ thực hiện request để lấy flag là được. Giờ thì nhìn xuống phần mã nguồn ở ngay đoạn dưới, dòng thứ 133.

![](https://images.viblo.asia/b7b072b1-4eff-4112-b53a-1506dd42a347.png)

Đây là phần mã nguồn sẽ thực thi khi chúng ta nhấn vào nút "Submit": một câu điều kiện if sẽ được thực hiện, và nếu kết quả của điều kiện so sánh là **True** thì ứng dụng sẽ thực hiện HTTP request để lấy flag, còn nếu kết quả là **False** thì sẽ hiển thị "Invalid OTP".

Ở cách này chúng ta sẽ thực hiện sửa đổi mã nguồn để khi nút "Submit" được nhấn thì ứng dụng sẽ thực hiện HTTP request lấy flag luôn.

Đối với ứng dụng React Native, mã nguồn chính sẽ được viết bằng Javascript và lưu trong tệp tin **index.android.bundle**. Trong một số trường hợp, khi dịch ngược tệp tin apk của ứng dụng chúng ta còn thấy tệp tin **index.android.bundle.map** - tệp tin cho thấy cách mã nguồn trong index.android.bundle được liên kết với nhau.

Khi ứng dụng hoạt động thì sẽ đọc dữ liệu trong tệp tin **index.android.bundle** và thực hiện xử lý tuỳ theo tình huống.

Như vậy để thay đổi luồng hoạt động của ứng dụng, chúng ta chỉ cần thay đổi mã nguồn JS trong tệp tin **index.android.bundle**, sau đó tiến hành recompile ra tệp tin apk mới.

Chỉ với một thao tác đơn giản là bấm tổ hợp phím Ctrl + F và nhập vào từ khoá "Invalid OTP", chúng ta đã tìm được phần mã nguồn cần sửa đổi.

![](https://images.viblo.asia/e7d98e0c-fa7c-42ed-92fa-327779dc7f29.png)

Chúng ta sẽ sửa cả đoạn ```t===n.state.text?n.getFlag():n.setState({output:'Invalid OTP'})``` thành ```n.getFlag()```

Tiếp theo chỉ cần build ra tệp tin apk mới như trong bài viết về [dịch ngược và patch file apk](https://viblo.asia/p/tim-hieu-dang-ctf-reverse-android-dich-nguoc-va-patch-file-apk-Eb85okv252G).

Kết quả sau khi patch app:

![](https://images.viblo.asia/6f80f526-8259-4c90-9e35-a34aec00abc0.png)