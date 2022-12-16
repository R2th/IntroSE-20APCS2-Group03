Để tạo ra ứng dụng có trải nghiệm tốt nhất, tương thích với dòng thiết bị, bạn nên ghi nhớ sự khác biệt giữa 2 nền tảng iOS và Android. Các ứng dụng này không chỉ khác nhau ở phần trông như thế nào, chúng cũng khác nhau về cấu trúc và luồng ứng dụng. Bạn cần ghi nhớ những khác biệt này để cung cấp trải nghiệm người dùng tốt nhất thông qua native application design.
Các ứng dụng di động gốc cho iOS và Android có các tính năng dành riêng cho hệ điều hành. Nguyên tắc của Apple và Google khuyên bạn nên sử dụng các điều khiển điều hướng ứng dụng theo tiêu chuẩn nền tảng bất cứ khi nào có thể: page controls, tab bars, segmented controls, table views, collection views, và split views. Người dùng thường quen thuộc với cách các điều khiển này hoạt động trên mỗi nền tảng, vì vậy khi bạn sử dụng các điều khiển tiêu chuẩn, người dùng của bạn sẽ trực giác biết cách sử dụng các chức năng trong ứng dụng. 

Chúng ta tập trung vào sự khác biệt chính giữa các mẫu thiết kế tương tác trên iOS và Android để làm rõ lý do tại sao các ứng dụng trông khác nhau trên iOS và Android - và tại sao chúng nên như vậy. Chúng tôi cũng cung cấp các mẫu thiết kế native app và các ví dụ ứng dụng native để giúp bạn hình dung những gì chúng ta đang nói.
## Sự khác biệt trong các mẫu điều hướng
Di chuyển giữa các màn hình là một hành động phổ biến trong các ứng dụng di động. Nó rất quan trọng để xem xét rằng iOS và Android có các nguyên tắc thiết kế ứng dụng native khác nhau khi nói đến các mẫu điều hướng. Có một thanh điều hướng tổng quát ở dưới cùng của thiết bị Android. Sử dụng nút quay lại trong thanh điều hướng là một cách dễ dàng để quay lại màn hình hoặc bước trước đó và nó hoạt động trong hầu hết tất cả các ứng dụng Android.
![](https://images.viblo.asia/3731b9f3-1602-44dd-9270-cdbd2b68bf99.png)
Mặt khác, phương pháp thiết kế của Apple khá khác biệt. Không có thanh điều hướng toàn cục như Android, vì vậy chúng ta có thể di chuyển trở lại bằng cách sử dụng nút quay lại trong thiết kế ứng dụng iOS. Điều này ảnh hưởng đến thiết kế của các ứng dụng di động iOS. Màn hình bên trong phải có thanh điều hướng riêng với nút quay lại ở góc trên cùng bên trái.
![](https://images.viblo.asia/a771ebc2-8988-409b-9ff4-387f0de55e1a.png)
Apple cũng bao gồm một cử chỉ vuốt từ trái sang phải trong các ứng dụng để đi đến màn hình trước đó. Cử chỉ này hoạt động trong hầu hết các ứng dụng.
Sự khác biệt giữa iOS và Android trong trường hợp này là trên các thiết bị iOS trong ứng dụng gốc cử chỉ vuốt từ trái sang phải sẽ đưa bạn trở lại màn hình trước đó. Các cử chỉ tương tự trên thiết bị Android sẽ chuyển đổi các tab. Nhưng trái ngược với iOS, có một thanh điều hướng phía dưới trên các thiết bị Android có nút quay lại sẽ đưa bạn trở lại màn hình trước đó.

Điều này luôn luôn quan trọng để ghi nhớ sự khác biệt này giữa các nền tảng để duy trì tính nhất quán với các ứng dụng di động khác.

## Các mẫu điều hướng trong ứng dụng khác nhau trong iOS và Android
Có một vài tùy chọn điều hướng khác nhau trong Material Design Guidelines. Một mẫu điều hướng được sử dụng trong các ứng dụng Android là sự kết hợp giữa ngăn kéo điều hướng và các tab.

Ngăn kéo điều hướng là một menu trượt từ trái hoặc phải bằng cách nhấn biểu tượng menu hamburger. Các tab được đặt ngay bên dưới tiêu đề màn hình và cho phép tổ chức nội dung ở mức cao, cho phép người dùng chuyển đổi giữa các chế độ xem, bộ dữ liệu và các khía cạnh chức năng của ứng dụng.
![](https://images.viblo.asia/67a943a3-faca-4b02-8e6d-29d518f8f44e.png)

Ngoài ra còn có một thành phần gọi là điều hướng phía dưới trong Material Design. Thành phần này cũng quan trọng đối với ứng dụng gốc. Các thanh điều hướng phía dưới giúp bạn dễ dàng khám phá và chuyển đổi giữa các chế độ xem cấp cao nhất trong một lần chạm. Nguyên tắc Material Design không khuyến khích sử dụng các tab và điều hướng phía dưới cùng một lúc vì điều này có thể gây nhầm lẫn khi điều hướng.
![](https://images.viblo.asia/b05cc484-f990-47a3-af4d-5fc6073cf863.png)

Trong nguyên tắc giao diện con người (Human Interface Guidelines) của Apple, không có điều khiển điều hướng tiêu chuẩn nào giống với menu điều hướng ngăn kéo. Thay vào đó, Apple khuyên bạn nên đặt điều hướng toàn cầu trong một thanh tab. Thanh tab xuất hiện ở dưới cùng của màn hình ứng dụng và cung cấp khả năng chuyển đổi nhanh giữa các phần chính của ứng dụng.

Thông thường, thanh tab chứa không quá năm điểm đến. Như chúng ta có thể thấy, thành phần này tương tự như điều hướng phía dưới trong Material Design nhưng được sử dụng phổ biến hơn trong các ứng dụng iOS.
![](https://images.viblo.asia/f8de0895-ec4b-4d8c-92a4-ac521b0c2ddc.png)
Mặc dù có các yếu tố tương tự thực hiện các chức năng tương tự trong cả hai hệ điều hành (tab và điều khiển phân đoạn, điều hướng dưới cùng và thanh tab), điều hướng vẫn là một trong những khác biệt chính giữa iOS và Android. Có cả sự khác biệt khách quan, chẳng hạn như thanh điều hướng toàn cầu (phím điều hướng ảo) trong Android và thiếu trong iOS, cũng như sự khác biệt về tầm nhìn của hai hệ thống này.

Apple tin rằng các yếu tố điều hướng chính phải ở phía trước và menu hamburger chỉ nên được sử dụng để lưu trữ các chức năng phát sinh các tác vụ hàng ngày do người dùng thực hiện.

## Chế độ xem tùy chỉnh cho các điều khiển tiêu chuẩn
Nếu bạn muốn mỗi thành phần trong ứng dụng của mình trông giống nhau trên các nền tảng, bạn sẽ yêu cầu các nỗ lực phát triển bổ sung để tạo ra thiết kế ứng dụng di động tốt nhất. Các trường hợp sử dụng phức tạp nhất liên quan đến các điều khiển mặc định như nút radio, hộp kiểm, bật tắt, v.v. yêu cầu triển khai chế độ xem tùy chỉnh để hiển thị các điều khiển giống iOS trên Android hoặc điều khiển giống Android trên iOS.

Mỗi nền tảng có các tương tác độc đáo của nó. Thiết kế tốt là thiết kế tôn trọng thói quen của người dùng trong mỗi hệ điều hành. Nó thực sự quan trọng để ghi nhớ sự khác biệt giữa các nền tảng khi thiết kế một ứng dụng di động cho cả iOS và Android để bạn thiết kế các ứng dụng đáp ứng sự mong đợi của người dùng.

Một ví dụ về một yếu tố mà thường được thiết kế khác nhau trên hai nền tảng là một công cụ chọn ngày. Người dùng Android không quen với công cụ chọn ngày theo kiểu máy quay số mà phổ biến trong iOS. Sử dụng kiểu chọn ngày này trong Android sẽ yêu cầu các chế độ xem tùy chỉnh, có thể trở nên phức tạp, làm tăng sự phức tạp và thời gian phát triển và làm cho thiết kế ứng dụng của bạn trông xa lạ với nền tảng Android.

## Các kiểu nút trong iOS và Android
Có hai kiểu nút trong Material Design - phẳng và được nâng lên. Các nút này được sử dụng trong các tình huống khác nhau. Văn bản trên các nút trong Material Design thường là tất cả chữ hoa. Đôi khi chúng tôi cũng tìm thấy văn bản nút chữ hoa trong các ứng dụng iOS gốc, nhưng hầu hết chúng tôi thường tìm thấy trường hợp tiêu đề.
![](https://images.viblo.asia/aa666564-dd9a-4fa7-9eb8-6abe2cd7f149.png)
Ngoài ra còn có một loại nút nữa - các nút hành động nổi trên Android và gọi các nút hành động trên iOS. Nút hành động nổi thể hiện hành động chính trong ứng dụng.

Ví dụ: nút soạn thảo trong ứng dụng thư hoặc nút bài đăng mới trong ứng dụng mạng xã hội có thể là các nút hành động nổi. Thiết kế tương tự cho hành động chính trong ứng dụng iOS là nút gọi hành động, được đặt ở giữa thanh tab.
![](https://images.viblo.asia/adf2536d-66d3-4072-b505-d5d70e59b635.png)

## Sự khác nhau giữa các sheets dưới cùng gốc trong Android và các trang hành động & chế độ xem trong iOS
![](https://images.viblo.asia/b597ad20-9fa5-4a63-aa7d-447b1a4831c8.png)

## Sự khác biệt trong mục tiêu cảm ứng và lưới
iOS và Android có các hướng dẫn hơi khác nhau cho các mục tiêu cảm ứng (44px @ 1x cho iOS và 48dp / 48px @ 1x cho Android). Nguyên tắc Material Design cũng đề nghị sắp xếp tất cả các yếu tố vào lưới đường cơ sở vuông 8dp.

## Sự khác biệt về kiểu chữ
San Francisco là kiểu chữ hệ thống trong iOS. Roboto là kiểu chữ tiêu chuẩn trong Android. Noto là kiểu chữ tiêu chuẩn cho tất cả các ngôn ngữ trong Chrome và Android do Roboto hỗ trợ. Bạn cần phải chú ý đến các quy ước về kiểu chữ và bố cục của mỗi nền tảng.
![](https://images.viblo.asia/8e3a43c6-8003-4063-b5d5-2a87d0fb4ef0.png)

## Vi tương tác
Khi nói đến thiết kế, ấn tượng đầu tiên thường là trải nghiệm cho người dùng cuối

Đó là lý do tại sao nó rất quan trọng để thu hút sự chú ý của người dùng ngay từ đầu. Trong quá trình thiết kế và phát triển ứng dụng, chúng tôi có thể tạo ra trải nghiệm thực sự hấp dẫn cho người dùng thông qua các tương tác và hoạt hình (animation).

Xác định các quy tắc và khuyến nghị chính liên quan đến tương tác và chuyển động cho cả hai nền tảng:

Trọng tâm và tầm quan trọng - Các tương tác tập trung vào người dùng chú ý vào những gì thực sự quan trọng trong ứng dụng, do đó, cần thiết chỉ sử dụng chúng khi thực sự cần thiết. Cả hai nền tảng đều không khuyến khích animation quá mức, vì chúng làm mất tập trung và làm căng thẳng người dùng.

Tính nhất quán và phân cấp - Điều này thực sự quan trọng cần ghi nhớ rằng các tương tác giúp người dùng tự định hướng trong ứng dụng bằng cách hiển thị cách các yếu tố có liên quan với nhau. Chuyển đổi quen thuộc, mượt mà và không phô trương từ màn hình này sang màn hình khác khiến người dùng gắn bó.

Đó là lý do tại sao nó rất quan trọng để đặc biệt chú ý đến các tương tác quen thuộc sẽ cải thiện trải nghiệm người dùng và trông tự nhiên trên mỗi nền tảng.

### iOS
Người dùng iOS đã quen với các animation động tinh tế được sử dụng trong toàn bộ iOS, chẳng hạn như chuyển tiếp mượt mà, thay đổi chất lỏng trong hướng thiết bị và cuộn dựa trên vật lý. Người dùng iOS có thể cảm thấy mất phương hướng khi các chuyển động không có ý nghĩa hoặc có vẻ bất chấp các định luật vật lý. Ví dụ, nếu người dùng hiển thị chế độ xem bằng cách trượt nó xuống từ trên cùng của màn hình, họ hy vọng có thể loại bỏ chế độ xem bằng cách trượt ngược lại. Nó rất khuyến khích bởi HIG rằng, trừ khi bạn đang tạo ra một trải nghiệm tuyệt vời như trò chơi, bạn thực hiện các chuyển đổi tùy chỉnh có thể so sánh với hình ảnh động tích hợp.

### Android
Theo Material Design, trong quá trình chuyển đổi, các yếu tố giao diện được chuyển đổi được phân loại là đi, đến hoặc vĩnh viễn. Danh mục mà mục thuộc về ảnh hưởng đến cách chuyển đổi.
Một hình ảnh động hướng sự chú ý của người dùng. Khi một UI thay đổi diện mạo, chuyển động cung cấp tính liên tục giữa vị trí và sự xuất hiện của các yếu tố trước và sau khi chuyển đổi.
Chuyển tiếp điều hướng là một yếu tố quan trọng trong tương tác tổng thể với giao diện. Chúng giúp người dùng tự định hướng bằng cách thể hiện hệ thống phân cấp ứng dụng.

Ví dụ: khi một phần tử mở rộng để lấp đầy toàn bộ màn hình, hành động mở rộng biểu thị rằng màn hình mới là một phần tử con. Màn hình mà nó mở rộng là phần tử cha của nó.

Các màn hình có cùng cha mẹ (chẳng hạn như ảnh trong album, các phần trong hồ sơ hoặc các bước trong luồng) đồng loạt di chuyển để củng cố mối quan hệ của chúng. Màn hình ngang hàng trượt từ một phía trong khi anh chị em của nó di chuyển khỏi màn hình theo hướng ngược lại.
Ở cấp cao nhất của một ứng dụng, các điểm đến thường được nhóm thành các nhiệm vụ chính (có thể không liên quan đến nhau). Các màn hình này chuyển đổi tại chỗ bằng cách thay đổi các giá trị như độ mờ và tỷ lệ.

## Kết luận
Tất nhiên cũng có trường hợp ngoại lệ: một số ứng dụng iOS tuân theo Material Design (như Gmail) và một số ứng dụng Android tuân theo Human Interface Guidelines (như Instagram).
Nhưng có một điều hiển nhiên - sẽ nhanh hơn rất nhiều khi thiết kế một ứng dụng di động sử dụng các thành phần gốc cho cả hai hệ điều hành. Do đó, tốt hơn là nên dành thời gian cho thiết kế thay vì tạo ra một ứng dụng mô phỏng sự pha trộn giữa Human Interface Guidelines của Apple và các thành phần Material Design của Google và sau đó dành nhiều thời gian để phát triển vì các yếu tố tùy chỉnh.

Tham khảo: https://medium.muz.li/differences-between-designing-native-ios-apps-and-native-android-apps-e71256dfa1ca