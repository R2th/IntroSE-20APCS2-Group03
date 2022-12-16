View controllers có xu hướng tập trung nhiều code trong nhiều ứng dụng xây dựng trên nền tảng của Apple. Nó quản lý các khía cạnh chính của giao diện người dùng, cung cấp cầu nối cho các chức năng của hệ thống như device orientation và status bar appearance, và thường phản hồi tương tác của người dùng -  như chạm vào nút và nhập văn bản. 
Vì chúng thường có vai trò chính như vậy, do đó, không có gì đáng ngạc nhiên khi nhiều view controller thường rất phức tạp - khi chúng kết thúc quá nhiều trách nhiệm, dẫn đến nhiều logic đan xen, thường bị trộn lẫn với view và layout code.
Mặc dù chúng ta đã khám phá nhiều cách giảm thiểu và phá vỡ large view controllers - chẳng hạn như sử dụng composition, di chuyển code điều hướng sang các loại chuyên dụng, sử dụng lại data source và sử dụng logic controller - Trong bài viết này, hãy xem xét kỹ thuật cho phép chúng tôi trích xuất các core action của view controllers mà không phải đưa ra bất kỳ khái niệm trừu tượng hoặc kiến trúc bổ sung nào.
## Awkward awareness
Một nguyên nhân gốc rễ rất phổ biến gây ra các vấn đề kiến trúc và cấu trúc là một số loại chứa quá nhiều domain và detail. Khi một phạm vi nhận thức loại Lôi khác được đưa ra, thì thường thì trách nhiệm của nó và - như là một hiệu ứng trực tiếp - số lượng mã mà nó chứa.
Giả sử rằng chúng ta đang xây dựng view controller của trình soạn tin nhắn cho ứng dụng nhắn tin và để có thể thêm người nhận từ danh bạ của người dùng và cho phép tin nhắn được gửi, chúng tôi hiện cung cấp cho view controllers truy cập trực tiếp vào cơ sở dữ liệu và networking code:
```
class MessageComposerViewController: UIViewController {
    private var message: Message
    private let userDatabase: UserDatabase
    private let networking: Networking

    init(recipients: [Recipient],
         userDatabase: UserDatabase,
         networking: Networking) {
        self.message = Message(recipients: recipients)
        self.userDatabase = userDatabase
        self.networking = networking
        super.init(nibName: nil, bundle: nil)
    }
}
```
Những điều trên có vẻ không phải là vấn đề lớn - chúng ta sử dụng dependency injection và nó có vẻ không làm view controllers của chúng ta có số lượng lớn code phụ thuộc. Tuy nhiên, mặc dù view controllers của chúng ta chưa biến thành một khối lớn, nhưng nó có khá nhiều hành động cần xử lý - chẳng hạn như thêm người nhận, hủy và gửi tin nhắn - tất cả hiện đang thực hiện trong view controllers:
```
private extension MessageComposerViewController {
    func handleAddRecipientButtonTap() {
        let picker = RecipientPicker(database: userDatabase)

        picker.present(in: self) { [weak self] recipient in
            self?.message.recipients.append(recipient)
            self?.renderRecipientsView()
        }
    }

    func handleCancelButtonTap() {
        if message.text.isEmpty {
            dismiss(animated: true)
        } else {
            dismissAfterAskingForConfirmation()
        }
    }

    func handleSendButtonTap() {
        let sender = MessageSender(networking: networking)

        sender.send(message) { [weak self] error in
            if let error = error {
                self?.display(error)
            } else {
                self?.dismiss(animated: true)
            }
        }
    }
}
```
Việc các view controllers thực hiện các hành động của riêng chúng có thể thực sự tiện lợi và đối với các view controllers đơn giản hơn, rất có thể nó sẽ không gây ra bất kỳ vấn đề nào - nhưng như chúng ta có thể thấy bằng cách chỉ xem đoạn trích trên từ MessageComposerViewController, nó thường yêu cầu các bộ điều khiển xem của chúng ta làm những việc mà nó không nên quá quan tâm - chẳng hạn như kết nối mạng, tạo các đối tượng logic và đưa ra các giả định về cách chúng được trình bày.
Vì hầu hết các view controllers đã khá bận rộn với những việc như tạo và quản lý views, thiết lập các layout constraints và detect các tương tác của người dùng - hãy xem liệu chúng ta có thể trích xuất các hành động trên không và làm cho view controllers của chúng ta đơn giản hơn không.
## Actions
Các hành động thường có hai biến thể riêng biệt - đồng bộ và không đồng bộ. Một số hành động chỉ yêu cầu chúng tôi nhanh chóng xử lý hoặc chuyển đổi một giá trị nhất định và trả lại trực tiếp, trong khi những hành động khác sẽ mất thêm một chút thời gian để thực hiện.
Để mô hình hóa cả hai loại hành động đó, chúng ta sẽ tạo một enum generic action - có hai loại, một cho các hành động đồng bộ và một cho các hành động không đồng bộ:
```
enum Action<I, O> {
    typealias Sync = (UIViewController, I) -> O
    typealias Async = (UIViewController, I, @escaping (O) -> Void) -> Void
}
```
Sử dụng enum ở trên, bây giờ chúng ta có thể xác định một tuple chứa tất cả các hành động mà MessageComposerViewController chúng ta có thể thực hiện - như thế này:
```
extension MessageComposerViewController {
    typealias Actions = (
        addRecipient: Action<Message, Message>.Async,
        finish: Action<Message, Error?>.Async,
        cancel: Action<Message, Void>.Sync
    )
}
```
Với những điều đã nêu ở trên, giờ đây chúng ta có thể bắt đầu đơn giản hóa rất nhiều view controllers của mình - bắt đầu bằng cách loại bỏ nhận thức về các loại cơ sở dữ liệu và mạng lỗi của chúng ta, và thay vào đó làm cho nó chỉ nhận thức được các Action được truyền vào nó:
```
class MessageComposerViewController: UIViewController {
    private var message: Message
    private let actions: Actions

    init(recipients: [Recipient], actions: Actions) {
        self.message = Message(recipients: recipients)
        self.actions = actions
        super.init(nibName: nil, bundle: nil)
    }
}
```
Tiếp theo, để thực sự sử dụng bộ sưu tập hành động mới của chúng tôi, chúng ta để cập nhật tất cả các code thực hiện hành động của chúng ta từ trước đến giờ, chỉ cần gọi một trong những hành động được xác định trước đã được thông qua như một phần của trình init của view controllers, như thế này:
```
private extension MessageComposerViewController {
    func handleAddRecipientButtonTap() {
        actions.addRecipient(self, message) { [weak self] newMessage in
            self?.message = newMessage
            self?.renderRecipientsView()
        }
    }

    func handleCancelButtonTap() {
        actions.cancel(self, message)
    }

    func handleSendButtonTap() {
        let loadingVC = add(LoadingViewController())

        actions.finish(self, message) { [weak self] error in
            loadingVC.remove()
            error.map { self?.display($0) }
        }
    }
}
```
Đáng chú ý là là một phần của việc refactor này, đó là chúng ta cũng đã cải thiện cách thức người nhận được thêm vào tin nhắn. Thay vì có view controllers tự thực hiện thay đổi mô hình của nó, thay vào đó chúng ta chỉ đơn giản trả về một giá trị Tin nhắn mới là kết quả của hành động addRecipient của nó.
Cái hay của cách tiếp cận trên là view controllers của chúng ta giờ đây có thể tập trung vào những gì view controllers làm tốt nhất - control views - và để bối cảnh tạo ra nó xử lý các chi tiết như kết nối mạng và trình bày RecipientPicker. Ở đây, cách mà bây giờ chúng ta có thể present một trình soạn thảo message ở các view controllers khác, ví dụ như trong một coordinator hoặc navigator:
```
func presentMessageComposerViewController(
    for recipients: [Recipient],
    in presentingViewController: UIViewController
) {
    let composer = MessageComposerViewController(
        recipients: recipients,
        actions: (
            addRecipient: { [userDatabase] vc, message, handler in
                let picker = RecipientPicker(database: userDatabase)

                picker.present(in: vc) { recipient in
                    var message = message
                    message.recipients.append(recipient)
                    handler(message)
                }
            },
            cancel: { vc, message in
                if message.text.isEmpty {
                    vc.dismiss(animated: true)
                } else {
                    vc.dismissAfterAskingForConfirmation()
                }
            },
            finish: { [networking] vc, message, handler in
                let sender = MessageSender(networking: networking)

                sender.send(message) { error in
                    handler(error)

                    if error == nil {
                        vc.dismiss(animated: true)
                    }
                }
            }
        )
    )

    presentingViewController.present(composer, animated: true)
}
```
Vì tất cả các view controllers của chúng ta bây giờ chỉ là các hàm đơn giản, code của chúng ta trở nên linh hoạt hơn và dễ kiểm tra hơn - vì chúng ta có thể dễ dàng mock behaviors và xác minh rằng các hành động chính xác được gọi trong các trường hợp khác nhau.
## An actionable overview
Một lợi ích lớn khác của việc trích xuất các hành động từ các phương thức riêng tư và thêm vào một bộ sưu tập chuyên dụng, là việc có được cái nhìn tổng quan về loại hành động mà view controllers thực hiện - ví dụ như ProductViewController này, có một danh sách rất rõ ràng chứa 4 hành động đồng bộ và không đồng bộ:
```
extension ProductViewController {
    typealias Actions = (
        load: Action<Product.ID, Result<Product, Error>>.Async,
        purchase: Action<Product.ID, Error?>.Async,
        favorite: Action<Product.ID, Void>.Sync,
        share: Action<Product, Void>.Sync
    )
}
```
Việc thêm hỗ trợ cho các hành động mới cũng thường trở nên dễ dàng, vì thay vì phải thêm các phụ thuộc mới và viết các triển khai cụ thể cho từng view controllers, chúng ta có thể dễ dàng sử dụng logic dễ dàng chia sẻ hơn và chỉ cần thêm một thành viên mới vào bộ hành động của mình - và sau đó gọi nó khi tương tác người dùng tương ứng xảy ra.

Ví dụ: giả sử rằng chúng tôi muốn quay lại MessageComposerViewController của chúng ta trước đó và thêm hỗ trợ để lưu các bản nháp của các tin nhắn chưa hoàn thành. Bây giờ chúng tôi có thể triển khai toàn bộ tính năng đó mà không cần chạm vào code của view controllers - tất cả những gì chúng ta phải làm là cập nhật hành động hủy của nó:
```
let composer = MessageComposerViewController(
    recipients: recipients,
    actions: (
        ...
        cancel: { [draftManager] vc, message in
            if message.text.isEmpty {
                vc.dismiss(animated: true)
            } else {
                vc.presentConfirmation(forReason: .saveDraft) { 
                    outcome in
                    switch outcome {
                    case .accepted:
                        draftManager.saveDraft(message)
                        vc.dismiss(animated: true)
                    case .rejected:
                        vc.dismiss(animated: true)
                    case .cancelled:
                        break
                    }
                }
            }
        },
        ...
    )
)
```
Mặc dù các loại khả năng trên mang lại cho chúng tôi rất nhiều tính linh hoạt, chúng tôi cũng cần cẩn thận, đừng đặt quá nhiều logic phức tạp vào các free closures, vì điều đó có thể khiến một cơ sở mã khá khó navigate và debug. Rất may, một khi logic của chúng tôi được tách rời khỏi UI và các bộ điều khiển xem của chúng tôi, việc chuyển nó sang các loại chuyên dụng - như MessageSender và DraftManager - thường khá dễ dàng.

Hy vọng bài viết sẽ có ích với các bạn

Reference: https://www.swiftbysundell.com/posts/extracting-view-controller-actions-in-swift