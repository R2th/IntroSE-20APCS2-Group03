![](https://images.viblo.asia/db479b91-36e4-4309-8273-5c1dc30da01b.png)
Không có ai thích xcode compile chậm như rùa bò cả. Nó thật phiền phức làm ảnh hưởng tới các công việc của bạn. 
Tuy nhiên, chúng ta vẫn có thể cải thiện thời gian compile Xcode bằng một vài thủ thuật đơn giản. 😎
Hãy cùng tìm hiểu xem nhé:

# 1) Đo thời gian compile của bạn một cách chính xác ⏱️

Để cải thiện thời gian biên dịch của bạn, đầu tiên bạn phải biết project của mình mất bao lâu để biên dịch đã. Để đo thời gian biên dịch của bạn, hãy mở Terminal của bạn và nhập:

```
defaults write com.apple.dt.Xcode ShowBuildOperationDuration YES
```

Sau khi bạn đã bật bộ đếm thời gian, bạn sẽ thấy thời gian biên dịch của mình trong Xcode.

![](https://miro.medium.com/max/1060/1*fPeVyod8WOYBA4IV7o_kaA.png)
**Compile time trong Xcode (Không cleaning)**

Để do thời gian biên dịch một cách chính xác hơn. Bạn nên clean build folder và build lại từ đầu:

![](https://miro.medium.com/max/1038/1*Lfch2wNaJBDTKZeG1tlqgQ.png)
**Compile time trong Xcode (Đã cleaning)**

Nhưng nếu bạn muốn thời gian biên dịch chính xác nhất từ Xcode, bạn nên dọn sạch cả **Derived Data** nữa.

```
rm -rf ~/Library/Developer/Xcode/DerivedData
```

![](https://miro.medium.com/max/1044/1*wemGuEVRXOrlvbXBiwMOcQ.png)

**Compile time trong Xcode (Sau khi cleaning and xoá dữ liệu derived data)**

# 2) Hiển thị warning cho slow code ⚠️

Xcode thực sự khá thông minh và có rất nhiều tính năng thú vị. Như Xcode có thể xác định mã đang biên dịch rất chậm. 
Bạn có thể kích hoạt điều này bằng cách thêm các dòng sau vào cài đặt Build của bạn trong **Other Swift Flag**

```
-Xfrontend -warn-long-function-bodies=50
-Xfrontend -warn-long-expression-type-checking=50
```

Nếu một function mà cần nhiều hơn 50 mili giây để biên dịch, bạn sẽ nhận được cảnh báo. (Thông thường bạn sẽ lấy số cao hơn nhưng tôi muốn nhận được nhiều cảnh báo hơn để cải thiện mã của mình tốt hơn)

# 3) Cải thiện nhỏ 😃
Kích hoạt tính năng mới của Xcode từ 9.2 để build các task concurrent (đồng thời).

Tính năng mới này đã được phát hành với Xcode 9.2 và Apple đã đề cập rằng nó cũng có thể làm chậm dự án của bạn vì nó sẽ sử dụng nhiều bộ nhớ hơn. 
Để vô hiệu hóa nó, chỉ cần nhập lệnh sau vào terminal:

```
defaults write com.apple.dt.Xcode BuildSystemScheduleInherentlyParallelCommandsExclusively -bool NO
```

Trong trường hợp bạn không muốn sử dụng feature mới này, vô hiệu hóa bằng câu lệnh:

```
defaults delete com.apple.dt.Xcode BuildSystemScheduleInherentlyParallelCommandsExclusively
```


# 4) Sử dụng let
**Sử dụng let, private vvv bất cứ khi nào bạn có thể**

Sau khi thay đổi các var sang let thì thời gian biên dịch của tôi giảm từ khoảng 6,5 đến 6,3.

**Làm class dạng final**

Final class đang tăng hiệu suất của bạn và giảm thời gian biên dịch.

**Type inference**

Nếu ta định nghĩa type cho biến sẽ làm giảm thời gian compiler nhận biết kiểu dữ liệu của bạn. Nó sẽ làm giảm thời gian complie.
``` swift
// Stop 🛑
var name = getName()
// Are you a senior developer?
var name: String = getName()
```

# 5) Third party dependencies

Cách phổ biến nhất để xử lý tích hợp thư viên của bên thứ 3 trong các dự án iOS là sử dụng CocoaPods. Nó rất đơn giản để sử dụng nhưng không phải là lựa chọn tốt nhất nếu bạn quan tâm đến cải thiện thời gian complie.

Một thay thế mà bạn có thể sử dụng là Carthage. Nó khó sử dụng hơn so với CocoaPods nhưng nó sẽ cải thiện thời gian complie của bạn. Carthage đạt được điều này bằng cách chỉ xây dựng các phụ thuộc bên ngoài khi bạn thêm một thư viện mới vào dự án của bạn. Nếu bạn thêm mới một thư viện, project của bạn sẽ không phải build tất cả toàn bộ thư viện nữa thay vì như trong Pods.

Bạn có thể bắt đầu tìm hiểu Carthage qua đường dẫn: https://github.com/Carthage/Carthage

# 6) Tài liệu tham khảo
Alexandros Smponias. 2019. Improve your Xcode (Swift) Compile Time - Flawless iOS - Medium. [ONLINE] Available at: https://medium.com/flawless-app-stories/improve-your-xcode-swift-compile-time-d9c1d3786473. [Accessed 18 September 2019].

Improving Your Build Time in Xcode 10 · Patrick Balestra . 2019. Improving Your Build Time in Xcode 10 · Patrick Balestra . [ONLINE] Available at: https://patrickbalestra.com/blog/2018/08/27/improving-your-build-time-in-xcode-10.html. [Accessed 18 September 2019].