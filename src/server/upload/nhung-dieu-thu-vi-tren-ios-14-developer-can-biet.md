iOS 14 được Apple giới thiệu tại WWDC ngày 22/06/2020 vừa qua và cho tới ngày 16/09/2020 phiên bản iOS 14 đã chính thức được phát hành. Chắc hẳn bạn là người yêu thích trải nghiệm thiết bị của Apple hay tín đồ iPhone hay Developer đã cập nhật phiên bản mới này rồi chứ? 

Trong bài viết này chúng ta cùng tìm hiểu xem những điều thú vị trên iOS 14 này nhé ! Dù cho bạn là một người dùng hay là Developer chắc chắn rằng những cập nhật mới trong iOS 14 sẽ làm bạn thích thú và muốn trải nghiệm nó ngay khi có thể đấy, OK mình cùng bắt đầu nha. :D 

### 1. App Library

Đây là một tính năng mới để sắp xếp các ứng dụng trên điện thoại một cách hiệu quả hơn theo từ thư mục với chủ đề riêng biệt hoặc ứng dụng chính bạn thường xuyên sử dụng. Bên trong mỗi thư mục hiển thị các app bạn đã thêm vào nhưng với kích thước icon không giống nhau, những app nào được bạn hay dùng sẽ hiển thị to hơn và ngược lại.

**Cách dùng:**

Bạn chỉ cần lướt đến trang ứng dụng cuối cùng là App Library tại đây các app sẽ được tự động sắp xếp vào từng chủ đề, bạn có thể ẩn bớt những Library để nhìn gọn gàng hơn hoặc chỉnh sửa library theo ý thích của mình sao cho tiện nhất.

- Lúc nào đó bạn tìm không thấy ứng dụng mình cần mà đã từng tải về rồi thì có thể chạm vào dòng chữ App Library để thực hiện tìm kiếm nó, khá đơn giản và tiện.

*Hình ảnh về App Library iOS 14*

![](https://images.viblo.asia/b9793421-b8d7-4518-b434-61d156863038.jpg)




### 2. Widgets

Tính năng mới được thiết kế lại trên iOS 14 cho phép bạn thêm Widgets ngay tại màn hình chính điều mà bạn đã biết trước đây khi xem thời tiết, biểu đồ, thời gian .v.v Nhưng hiện tại có khác một chút là bạn có thể tùy chỉnh được kích thước, người dùng có thể lựa chọn tính năng ưa thích để nó hiển thị ngay tại màn chính cho dễ theo dõi liên tục. Điều này giúp ích cho bạn rất nhiều, có ngay thông tin cần thiết của 1 ứng dụng mà không cần truy cập trực tiếp vào nó.

Lúc này Apple đã thêm WidgetKit để developer có thể thêm phần tùy chỉnh này cho ứng dụng của mình, mang thêm trải nghiệm chính của app ra màn Home cho người dùng sử dụng thường xuyên hơn. Dưới đây là một ví dụ nhỏ sử dụng WidgetKit: 

```
import SwiftUI
import WidgetKit

struct WidgetData{
    let weight: Measurement<UnitMass>
    let date: Date
}

extension WidgetData{
    static let previewData = WidgetData(weight: Measurement<UnitMass>(value: 66.99, unit: .kilograms), date: Date().advanced(by: (-60*29)))
}

struct WidgetView: View {
    let data: WidgetData
    
    var body: some View {
        ZStack{
            Color(.yellow)
            VStack(alignment: .leading) {
                WeightView(data: data)
                Spacer()
                LastUpdatedView(data: data)
                
            }
            .padding(.all)
        }
        
    }
}

struct WidgetView_Previews: PreviewProvider {
    static var previews: some View {
        Group{
            WidgetView(data: .previewData).previewContext(WidgetPreviewContext(family: .systemSmall))
            WidgetView(data: .previewData).previewContext(WidgetPreviewContext(family: .systemMedium))
            WidgetView(data: .previewData).previewContext(WidgetPreviewContext(family: .systemLarge))
        }
    }
}



struct WeightView: View {
    var data: WidgetData
    var body: some View {
        HStack{
            VStack(alignment: .leading){
                Text("Weight")
                    .font(.body)
                    .foregroundColor(.purple)
                    .bold()
                Spacer()
                Text(MeasurementFormatter().string(from: data.weight))
                    .font(.title)
                    .foregroundColor(.purple)
                    .bold()
                    .minimumScaleFactor(0.7)
            }
            Spacer()
        }
        .padding(.all, 8)
        .background(ContainerRelativeShape().fill(Color(.cyan)))
    }
}

struct LastUpdatedView: View {
    let data: WidgetData
    var body: some View {
        VStack(alignment: .leading){
            Text("Last Updated")
                .font(.body)
                .bold()
                .foregroundColor(.purple)
            Text("\(data.date, style: .relative) ago")
                .font(.caption)
                .foregroundColor(.purple)
        }
    }
}
```

*Kết quả như hình dưới đây:*


![](https://images.viblo.asia/a73ec0e4-7d03-4df0-8912-79447e5cc4ca.png)

### 3. Ảnh trong ảnh 

Khi bạn xem một bộ phim hay và muốn tiếp tục xem nó khi thực hiện 1 tác vụ khác thì giờ đây điều đó là hoàn toàn có thể. Bạn sẽ thu nhỏ phần ứng dụng video Youtube trên màn hình và đi đến tác vụ số 2 mình cần thực hiện.

### 4. Messages

Việc nhắn tin sẽ tiện lợi hơn khi giờ đây bạn có thể đặt nhóm chat mình muốn theo dõi lên trên cùng (pin top) và chỉ nhận thông báo tin nhắn mới khi được người khác mention(đề cập) trực tiếp và ngược lại bạn sẽ làm như vậy khi muốn người khác chú ý ngay lập tức tới tin nhắn của mình mặc dù nhóm đang có nhiều tin nhắn mới. Một trải nghiệm khá hay để thử :) 

### 5. CarPlay (Chìa khóa xe điện tử)

Nghe cái tên đã cho thấy hơi hướng xịn của nó rồi phải không anh em. :D Tính năng này bạn có thể mở khóa xe của mình từ xa bằng chiếc iPhone chạy iOS 14, chìa khóa này được lưu trữ trong phần bảo mật của iPhone và nó có thể chia sẻ quyền truy cập cho người khác thông qua iMessage hoặc bị xóa bỏ thông qua iCloud. Tính năng này hoạt động dựa trên công nghệ NFC nhưng trong tương lai Apple sẽ nghiên cứu sử dụng nó với công nghệ Ultra Wideband dòng chip U1.

Rất thú vị phải không nào, nhưng có 1 điều đáng tiếc là ngoài việc có trên tay iPhone iOS 14 thì bạn cần có 1 chiếc xe **BMW 5 đời 2021** để có thể sử dụng công nghệ này. Trước mắt anh em chăm chỉ chịu khó code để tậu em xế này rồi khi ấy anh em dùng hẳn iOS phiên bản khóa xịn hơn nữa khỏi lo về lỗi tính năng. Đùa chút xíu thôi, hiện tại Apple cũng đang thương thảo với tập đoàn BMW để tích hợp trong nhiều dòng xe khác và hãng khác nữa để mức độ bao phủ được phổ thông hơn.

### 6. App Privacy

![](https://images.viblo.asia/2e1d2430-42ad-4333-8aed-16cb9b64ee36.jpg)


Apple cập nhật chính sách mới bổ xung quyền riêng tư hơn cho người dùng, từ đó khi ứng dụng cần sử dụng quyền riêng tư nào sẽ lập tức thông báo tới người dùng và yêu cầu được cấp quyền mới sử dụng tính năng đó như: location, danh bạ, microphone, call v.v Ngoài ra App Privacy cũng cho bạn biết ứng dụng có đang tracking thông tin cá nhân hay lịch sử thanh toán không. 

Tiếp theo đó còn có 1 biểu tượng nhỏ bên góc phải ứng dụng cho biết ứng dụng hiện tại đang dùng microphone hay camera của bạn.

### 7. App Clips

Đây là một cập nhật lớn của App Store, một tính năng mới mà bạn có thể khởi động thông qua Safari, Messages hoặc Maps. Đây không phải là một ứng dụng hoàn chỉnh mà chỉ là một phần nhỏ của ứng dụng giúp bạn thực hiện 1 tính năng mà bạn cần dùng. 

Ví dụ như bạn mua một món đồ và lúc này sẽ cần quét mã QR thì nó sẽ mở chỉ duy nhất QR code để bạn thực hiện được việc thanh toán của mình mà không phải tải cả ứng dụng về và ứng dụng cũng không xuất hiện trong màn Home. Nó được phát triển dựa trên tiêu chí của Apple là khi cần phải NHANH và MỞ NHANH.

### 8. Maps

![](https://images.viblo.asia/3e25d7d0-c413-45d1-b4f0-2c9ab336d1e8.jpg)



Có lẽ đây sẽ là tính năng mà anh em ở thành phố lớn hay sử dụng khi bị lạc ở "nơi đây" nhiều năm và luôn tìm MAP để thoát ra :D

Với sự update mới này bạn sẽ biết được tuyến đường bạn đang tham gia và sắp tới khu vực có bị tắc nghẽn không. Ngoài ra nếu bạn đang sử dụng xe điện nó sẽ hiển thị các trạm sạc gần đó, ngoài ra còn hiển thị chỉ dẫn cho người đi xe đạp để giúp bạn biết có đi vào đoạn đường dốc hay có cầu thang không. 

Hiện tại tính năng đang có sẵn ở các thành phố New York, Los Angeles, San Francisco, Thượng Hải, và Bắc Kinh. Sắp tới sẽ mở rộng ra ở các quốc gia Anh, Ireland và Canada.

### 9. Tổng kết 

Trên đây là những thông tin mà mình tìm hiểu về iOS 14, hy vọng sẽ giúp ích được các bạn đang là Developer hoặc các bạn yêu thích công nghệ đặc biệt là về hệ điều hành iOS. 

Nếu bạn biết thêm những điều hữu ích khác về phiên bản mới này hoặc trải nghiệm của bạn có thể thoải mái chia sẻ dưới phần bình luận để mình và nhiều bạn khác được biết thêm điều hay. Xin chào các bạn nhé !