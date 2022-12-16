**Animation** là một phần không thể thiếu trong việc thiết kế và các ứng dụng hay trang web ngày nay, nó mang `linh hồn` vào cho những thứ tưởng như vô tri vô giác, tạo ra trải nghiệm độc đáo và sống động cho người dùng. Những sản phẩm vượt trội trên thị trường thì ngoài việc đảm bảo đầy đủ tính năng thì `UI/UX` chính là một điểm nhấn quan trọng khác để nâng tầm sản phẩm lên, và nói đến `UI/UX` thì không thể thiếu `animation` rồi.
<br><br>
Tuy nhiên, việc thiết kế ra một `animation` đi vào lòng người đã khó, triển khai nó bằng `code` đối với các lập trình viên ... có lẽ còn đau đầu hơn rất nhiều. Đã bao giờ các bạn `developer` mất cả mấy ngày liền để triển khai đống `animation` hóc búa mà khách hàng yêu cầu chưa nhỉ (mà có khi trông rất đơn giản nhưng cũng rất khó để triển khai rồi)? Hay các bạn `designer` có bao giờ thiết kế ra một cái `animation` lung linh nhưng khi đưa cho team dev thì họ lắc đầu ngao ngán, thậm chí từ chối triển khai chưa? Nếu câu trả lời là có thì **[Lottie](https://airbnb.design/lottie/)** chính là cứu tinh cho chúng ta đó.

![](https://images.viblo.asia/b883ad35-3207-49b3-adca-f82a04408326.gif)

# 1. Lottie
**Lottie** là một thư viện có thể dùng cho cả **Android, iOS, React Native** hay **Web**, với chức năng chính là triển khai các `animation` cực kì chất thông qua việc `parse` các `animation` từ **Adobe After Effects** (được xuất ra dưới dạng **[json](https://www.json.org/)** thông qua **Bodymovin**), sau đó các `animation` này sẽ được `render` ngay trên `platform` tương ứng. 

`Lottie` được phát triển bởi **[Airbnb](https://en.wikipedia.org/wiki/Airbnb)** và nhận được sự ủng hộ rất lớn từ cộng đồng **developer** và cả các **designer** nữa, các `repo` của Lottie cho mỗi platform tính tại thời điểm bài viết này đều nhận được 10000 - 25000 **star**. Bởi vì như mình đã đề cập ở trên, để tạo ra được các animation `vi diệu` bằng code đối với các lập trình viên là ... khá khoai (ít nhất là đối với mình, thậm chí là cực khoai nếu nó quá `vi diệu`); nhưng với sự giúp đỡ của các `designer` tài năng cùng với `Lottie` thì việc đó chỉ còn tốn ... **5 phút** cuộc đời (nhớ cảm ơn các bạn `designer` và team `Airbnb` nhé). Ngoài ra, `Lottie` vẫn đang được cập nhật thường xuyên cùng với `documentation` cũng rất chi tiết nên rất đáng tin cậy nhé.

# 2. Lottie for developers
**Lottie** có một hệ thống **[documentation](http://airbnb.io/lottie/)** rất chi tiết cho từng `platform` và việc triển khai cũng rất đơn giản nên kể cả nếu bạn chưa làm việc với `Lottie` bao giờ thì chắc chắn cũng không gặp khó khăn gì đâu (trải nghiệm thực tế của mình, cách sử dụng đơn giản nhưng thành quả thì quả thật `outstanding`). 

Đường dẫn `Github` của `Lottie` cho từng `platform`: [**Android**](https://github.com/airbnb/lottie-android), [**iOS**](https://github.com/airbnb/lottie-ios), [**React Native**](https://github.com/react-native-community/lottie-react-native) và [**Web**](https://github.com/airbnb/lottie-web).

Một vài ví dụ hấp dẫn mà các bạn có thể triển khai ngay mà không phải đụng tới đoạn code nào liên quan tới `animation`, chỉ cần `Lottie` và một `file json` của `animation` bạn mong muốn:
![](https://images.viblo.asia/8cf03b52-bd89-4dbd-9d32-99ea57c49bdf.gif)
![](https://images.viblo.asia/e402d849-a222-4f49-a491-8edc92fbda98.gif)
![](https://images.viblo.asia/e5fb1b96-b71a-4eda-a172-7f70492910a8.gif)
![](https://images.viblo.asia/573b3d29-8d62-4786-b714-193450854fb4.gif)

Nếu bạn là một `developer` hay một nhóm `developer` đơn độc, không có team design ở sau chống lưng thì cũng đừng lo; [**cộng đồng**](https://www.lottiefiles.com/) chia sẻ các `animation` trên `Lottie` rất lớn, chất lượng cũng cực chất không khác gì thậm chí còn hơn `hàng nhà làm`.

# 3. Lottie for designers
Như mình đã đề cập ở trên, các `animation` sẽ được `parse` từ các file json xuất từ `Adobe After Effects` nên nếu thiếu các bạn `designer` thì đã thiếu hẳn điều kiện cần rồi. Với công cụ này, các bạn `designer` sẽ cảm thấy cực kì `mạnh mẽ` vì giờ đã có thể tự mình gánh vác các ông bà `developer` trên đôi vai mình rồi. Bất cứ ý tưởng nào của bạn đều sẽ được hiện thực hóa mà không gặp phải vướng mắc về kĩ thuật từ phía team dev nữa, thật tuyệt vời phải không nào!

Về tài liệu chi tiết các bạn có thể xem ở **[đây](http://airbnb.io/lottie/after-effects/getting-started.html)**. Nhưng về cơ bản, bạn sẽ cần 3 công cụ chính để thực hiện việc này: 
<br><br>
**[Adobe After Effects](http://www.adobe.com/products/aftereffects.html)**
<p><img src="https://images.viblo.asia/88ccf4e2-b70b-4c31-a167-0af411c9c12b.png"></p>
<br>

**[Bodymovin](http://airbnb.io/lottie/after-effects/bodymovin-installation.html)**
<p><img src="https://images.viblo.asia/20d7793f-4e58-4af5-86de-dc0685487d1d.png"></p>
<br>

**Lottiefiles preview app** trên **[Google Play Store](https://play.google.com/store/apps/details?id=com.airbnb.lottie)** hay **[App Store](https://www.lottiefiles.com/ios)**.
<p><img src="https://images.viblo.asia/63591bb5-c6a6-44c6-af85-9324b548bff3.png"></p>
<br>

`Adobe After Effects` thì chắc hẳn không xa lạ gì đối với các bạn `designer` nữa rồi. `Bodymovin` là một `extension` cho `After Effects` giúp các bạn `export` các `animation` từ đó thành HTML, JS, SVG, Canvas hay Json. Và cuối cùng `Lottiefiles preview app` là một ứng dụng để bạn có thể tham khao rất nhiều `animation` được làm bằng `Lottie` và cả các cách khác nhau để bạn có thể áp dụng `Lottie` trong ứng dụng thực tế.

Chúc các bạn có thể `ship` tất cả `animation` lung linh nhất mà mình muốn lên `màn ảnh` nhé :stuck_out_tongue_winking_eye: