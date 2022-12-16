# 1. Sử dụng Message Filter để làm gì?
Bạn đã bao giờ nhận một đống tin nhăn quảng cáo từ các số máy lạ? Từ những tổng đài không bao giờ biết chúng từ đâu? Đang làm việc tập trung và thấy có thông báo tin nhắn mới. Mở ra xem chỉ là những tin nhắn quảng cáo mua cái này bán cái kia với giá ưu đãi, chắc hẳn lúc đấy bạn rất thất vọng và tức giận. Có sự làm phiền không hề nhẹ và bạn muốn chặn luôn những số này đi. Để chúng không làm phiền nữa. Rất may trong WWDC 2017 Apple đã giới thiệu một loại Extension hỗ trợ trên iOS 11 giúp các nhà phát triển có thể dễ dàng chặn và lọc những tin nhắn rác này. Để không làm phiền cho người sử dụng với những tin nhắn quảng cáo không mấy hữu ích. Đó là Message Filter Extension. Chúng ta hãy cùng tìm hiểu nhé.

Lưu ý là extension này chỉ hỗ trợ tin nhắn từ những số lạ không có trong danh bạ và chỉ hỗ trợ SMS hoặc MMS, không hỗ trợ iMessage kể cả iMessage từ những người lạ.

# 2. Cơ chế hoạt động của Message Filter như thế nào?
Khi có một tin nhắn từ người lạ ứng dụng Messages trong máy sẽ yêu cầu ứng dụng có Message Filter Extension (đã được cài đặt từ trước). Và lúc này Message Filter Extension sẽ phát huy công dụng của mình, sẽ đọc được tin nhắn này và sẽ kiểm tra xem có đủ điều kiện lọc tin nhắn này đi không. Nếu tin nhắn tình nghi là spam Message Filter Extension sẽ lọc nó vào tin nhắn spam không đáng tin cậy. Lúc đó người dùng sẽ không thấy âm thanh hay điện thoại rung lên như những tin nhắn bình thường, mà tin nhắn này sẽ bị lọc và cho vào tin nhắn Unknown & Junk.

Dưới đây là sơ đồ hoạt động của Message Filter Extension.

![](https://images.viblo.asia/98bb7e7c-e1fc-44e3-83c6-49c0ecf37854.png)

Nếu bạn không muốn việc quyết định lọc tin nhắn offline bạn có thể sử dụng server để hỗ trợ việc này. Và đây là sơ đồ hoạt động sử dụng server.

![](https://images.viblo.asia/aa0bc57b-96f4-4e75-ba61-7a98e4809924.png)
# 3. Xây dựng ứng dụng sử dụng Message Filter Extension.
Để tạo một ứng dụng thêm vào Message Filter Extension rất đơn giản. Bạn tạo Project của mình sau đấy add thêm extension Message Filter Extension như hình sau.

![](https://images.viblo.asia/fc1e08f3-6fb0-4e2a-a369-9c41887d73e2.png)

Sau khi thêm Extension này chúng ta sẽ thêm đoạn code như sau vào:
```swift
extension MessageFilterExtension: ILMessageFilterQueryHandling {
    var words : [String] {
        get {
            return ["deal","giảm giá", "khuyến mãi"]
        }
    }
    
    func handle(_ queryRequest: ILMessageFilterQueryRequest, context: ILMessageFilterExtensionContext, completion: @escaping (ILMessageFilterQueryResponse) -> Void) {
        let offlineAction = self.offlineAction(for: queryRequest)
        switch offlineAction {
        case .allow, .filter:
            let response = ILMessageFilterQueryResponse()
            response.action = offlineAction
            completion(response)
        case .none:
            context.deferQueryRequestToNetwork() { (networkResponse, error) in
                let response = ILMessageFilterQueryResponse()
                response.action = .none
                if let networkResponse = networkResponse {
                    response.action = self.action(for: networkResponse)
                } else {
                    NSLog("Error deferring query request to network: \(String(describing: error))")
                }
                completion(response)
            }
        }
    }
    
    private func offlineAction(for queryRequest: ILMessageFilterQueryRequest) -> ILMessageFilterAction {
        guard let messageBody = queryRequest.messageBody?.lowercased() else { return .none }
        for word in self.words {
            if messageBody.contains(word.lowercased()) {
                return .filter
            }
        }
        return .allow
    }
    
    private func action(for networkResponse: ILNetworkResponse) -> ILMessageFilterAction {
        // Replace with logic to parse the HTTP response and data payload of `networkResponse` to return an action.
        return .none
    }
}
```
Theo đoạn code trên ta thấy các từ khoá mà nếu có tin nhắn từ người lạ mà chứa một trong các từ trong mảng words bên trên chúng ta sẽ filter nó đi, và cho nó vào thư mục spam. Tin nhắn này sẽ không bị xoá đi mà vẫn ở trong Messages chỉ là nó sẽ không có chuông báo, không rung nên người nhận không cần quan tâm hoặc bị làm phiền.

Bên đoạn code trên ta có thể thấy có hai trường hợp xử lí offline và xử lý thông qua server. Để thao tác với server trong file Info.plist chúng ta cần thêm đoạn key sau vào:
```swift
<key>NSExtension</key>
    <dict>
        <key>NSExtensionPrincipalClass</key>
            <string>MessageFilterExtension</string>
        <key>NSExtensionAttributes</key>
            <dict>
                <key>ILMessageFilterExtensionNetworkURL</key>
                <string>https://www.example-sms-filter-application.com/api</string>
            </dict>
        <key>NSExtensionPointIdentifier</key>
        <string>com.apple.identitylookup.message-filter</string>
     </dict>
```
trong đó lưu ý nhất là đường dẫn tơi server mà chúng ta cần thông tin trả về từ key ILMessageFilterExtensionNetworkURL.

Sau khi build app thành công chúng ta cần phải vào cài đặt để cấp quyền cho extension này truy cập vào tin nhắn.

**Bước 1:** Vào Settings -> Chọn Messages -> Ở mục Message filtering chọn Unknown & Spam

**Bước 2:** Sau khi cài đặt ứng dụng vừa build ở trên ta sẽ thấy ứng dụng của chúng ta hiển thị lên ở mục SMS Filtering. Chúng ta Enable nó lên như hình sau:

![](https://images.viblo.asia/0592b6c1-6be5-4879-81b6-1711768f0f9f.png)

Và đây là kết quả sau khi có tin nhắn từ người lạ có chữ deal ở trong tin nhắn. Chữ deal có chữa ở trong list chữ trong mảng words ở trên. Nên nó sẽ bị lọc và cho vào tab Unknown & Junk.

![](https://images.viblo.asia/fc0fd311-f354-4679-84ec-5aa883e86c60.PNG)

Nguồn tham khảo: https://developer.apple.com/videos/play/wwdc2017/249/