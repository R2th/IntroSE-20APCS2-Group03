Là một lập trình viên, ắt hẳn chúng ta đã có thời gian copy paste cùng một đoạn code hay duplicate code trong app của mình. Vậy chuyện gì sẽ xảy ra nếu đoạn code bị duplicate đó có bug? Ta sẽ phải sửa ở hai hoặc nhiều chỗ, nơi mà các đoạn code được lặp đi lặp lại. Câu hỏi đặt ra là có cách nào để hạn chế tối đa việc này không?

Có chứ :D. Apple cung cấp cơ chế chia sẻ code thông qua **Swift static libraries**. Nhưng về các tài nguyên như xibs, nibs, images thì Apple cung cấp cơ chế chia sẻ khác được gọi là **resource bundle**

Hãy cùng nhau xây dựng resource bundle và static libraries thôi!

Trước tiên tôi tìm được một bài về chủ đề tương tự nhưng đối với **dynamic frameworks** ở [đây](https://medium.com/onfido-tech/reusing-code-with-swift-frameworks-cf60f5fa288a). Các **static libraries** và các **resource bundle** là một cơ chế thay thế cho các **dynamic frameworks**. Vậy sự khác biệt giữa chúng là gì?

Ở bài chia sẻ này tôi đi vào các vấn đề trọng tâm sau:

- Static libraries là gì
- So sánh Static libraries vs dynamic framework như thế nào?
- Tại sao sử dụng static libraries
- Tái sử dụng code và resrouce  sử dụng static libraries và resource bundle như thế nào
- Sử dụng static libraries và resource bundle trong 1 application

Hãy lướt qua những phần nào bạn đã biết =))

## Static libraries là gì?

Một Static library là một tập hợp các tệp mã nguồn được biên dịch. Ở ví dụ dứi đây ta có FileA.swift, FileB.swift và FileC.swift. Với static library, chúng ta có thể biên dịch các file này và wrap chúng trong một file duy nhất, có extension là `.a`, viết tắt của `archive` 

![](https://images.viblo.asia/b64e5069-af10-4a00-b284-90a0b29d6881.png)

![](https://images.viblo.asia/32fe2b9a-3d97-441a-b918-3e3dfa619349.png)


##  So sánh Static libraries vs dynamic framework như thế nào?

iOS cho phép chúng ta sử dụng hai phương pháp nhóm code lại với nhau để phân phối:
Sự khác biệt giữa hai cái mà tôi sẽ đề cập trong bài viết này là:
- Dynamic framework có thể chứa resource (..., images), static libraries thì không thể
- Dynamic framework được liên kết lỏng lẻo với app, static library được liên kết cứng với app

Để giải thích việc liên kết trên, hãy xem xét các ví dụ cho từng cơ chế nhóm.

### Dynamic framework linking

Khi app sử dụng dynamic code, code sẽ không được load cùng với app khi app được launch. Hệ thống tải của app, lần lượt cho hệ thống biết rằng nó yêu cầu sử dụng một số code để chạy. Hệ thống sau đó load các đoạn code cần thiết mà ứng dụng dựa vào. *Tất cả điều này xảy ra trong thời gian chạy.*

Một ví dụ về điều này là UIKit. Ứng dụng iOS sử dụng UIKit. Tuy nhiên, UIKit không được bao gồm trong mỗi app. Thay vào đó, app có tham chiếu đến nó và chức năng mà nó yêu cầu để hoạt động chứ không phải code thực tế. UIKit được bao gồm trong hệ điều hành. Hệ thống sẽ load UIKit nếu nó chưa được load.
![](https://images.viblo.asia/161722e2-f026-4f55-8382-e0a3e835f30f.png)

Còn các Dynamic framework không được bao gồm trong hệ điều hành thì sao? Còn các framework mà chúng ta xây dựng và phân phối với app thì sao?

ConsumerApp không thể làm việc mà không cần MyDocateFramework nếu không nó sẽ bị crash. Do đó hệ thống phải load nó. Do đó, nó phải được bao gồm trong app package.
Xcode tạo một folder trong app package có tên là **Frameworks**. Folder này là nơi lưu trữ các dynamic framework mà app yêu cầu.

![](https://images.viblo.asia/8ab3e22b-dd83-445c-85c1-42ada9e57861.png)

Điều gì xảy ra nếu framework không có trong folder Framework app package hoặc trong hệ thống? App crash tại thời gian chạy💥.

### Static library linking

Khi app  sử dụng code static, code mà nó sử dụng sẽ được sao chép vào tệp nhị phân thực thi của app.

![](https://images.viblo.asia/82dda363-bd0f-4a6b-b6c1-1aed28cfd39b.png)
Khi hệ thống load app, chức năng static library được load cùng với nó dưới dạng thực thi duy nhất.

![](https://images.viblo.asia/69fabd70-1bf1-493e-8b3d-707be303ec10.png)

## Tại sao sử dụng static libraries

Một số lý do để sử dụng các static library tương tự như đối với các dynamic framework:

- Tái sử dụng code
- Ẩn code không liên quan đến ứng dụng (sử dụng quyền truy cập private và internal)

Đối với cả static library và dynamic framework nếu chỉ phân phối form đã biên dịch thì  ta cũng có thể:
- Tránh chia sẻ code private của chúng ta và chỉ phân phối chức năng
- Giảm thời gian biên dịch ứng dụng

Nhưng tại sao sử dụng các static library hơn là các dynamic framework? Các ứng dụng có static library load nhanh hơn các ứng dụng có dynamic librart. Hãy đi sâu hơn một chút để hiểu lý do tại sao nha

Các dynamic framework có lợi thế là được load vào bộ nhớ một cách lazily trong thời gian chạy và khả năng được chia sẻ với nhiều tiến trình. Điều đó hoạt động rất tốt nếu dynamic framework được sử dụng bởi nhiều app trong iOS.

Các dynamic framework của hệ thống iOS được sử dụng bởi nhiều ứng dụng và chúng có thể được load trước khi ứng dụng của bạn khởi chạy, do đó tiết kiệm thời gian chạy ứng dụng. Tuy nhiên, trong trường hợp các dynamic framework được nhúng trong các ứng dụng (đây là các framework được bao gồm trong ứng dụng của bạn chứ không phải bởi hệ điều hành), thời gian khởi chạy có thể chậm hơn nhiều. Chậm hơn bao nhiêu?

Để kiểm tra, tôi đã bọc ba file Swift vào hai target khác nhau:
- Dynamic framework
- Static library

Tôi đã tạo một ứng dụng sameple. Tôi đã configure app để print thời gian load lên console. Sau đó, tôi  link app với một dynamic framework. Tôi đã chạy ứng dụng trên một Simulator (không được cache trong bộ nhớ). Kết quả:
```
Total pre-main time: 1.0 seconds (100.0%)
        dylib loading time: 193.54 milliseconds (18.3%)
        rebase/binding time: 760.93 milliseconds (71.9%)
        ObjC setup time:  60.19 milliseconds (5.6%)
        initializer time:  42.81 milliseconds (4.0%)
        slowest intializers :
            libSystem.B.dylib :  18.22 milliseconds (1.7%)
```

Lặp lại quá trình trên nhưng link app tới static library. Static library chứa code giống với dynamic framework ở ví dụ trên
```
Total pre-main time: 290.34 milliseconds (100.0%)
        dylib loading time:  44.15 milliseconds (15.2%)
        rebase/binding time:  54.60 milliseconds (18.8%).
        ObjC setup time:  60.76 milliseconds (20.9%)
        initializer time: 130.68 milliseconds (45.0%)
        slowest intializers :
            libSystem.B.dylib :   3.08 milliseconds (1.0%)
            libMainThreadChecker.dylib : 118.62 milliseconds (40.8%)
```
Thời gian khởi chạy ứng dụng nhanh hơn gần 4 lần khi được liên kết static!

Trên đây là khảo sát cá nhân của bản thân, nếu bạn có phản hồi. Hãy thể hiện cảm xúc và comment để cùng phát triển.

Ở phần tiếp theo tôi sẽ viết về việc sử dụng static library và bundle resource trong thực tế như thế nào. Cảm ơn bạn đã theo dõi bài viết. See you soon!

Refs: https://medium.com/onfido-tech/reusing-code-and-resources-with-swift-static-libraries-and-resource-bundles-d070e82d3b3d