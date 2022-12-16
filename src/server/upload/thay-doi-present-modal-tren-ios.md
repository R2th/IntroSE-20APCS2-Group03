# 1. Giới thiệu
Ngày hôm nay, Apple đã chính thức phát hành mở bán các thiết bị mà họ đã giới thiệu hoome 10-9 và cũng là ngày họ chính thức release bản iOS 13 chính thức, trên iOS 13 thì có một sự thay đổi cách hiển thị **ViewController**, đó là ***Present Modal***. Vậy sự thay đổi này như thế nào chúng ta cùng nhau tìm hiểu trong bài viết này nhé.
# 2. Present Modal trên iOS 13
## Thay đổi hành vi mặc định 
Trên iOS 13,  Present Modal đã thay đổi cách hiển thị mặc định sang kiểu như bên dưới:

![](https://images.viblo.asia/13fab91d-eb22-4e43-a3d9-f24162ad7882.png)

Với sự thay đổi này chúng ta sẽ có sự thay đổi khi ta muốn đóng ViewController bằng cách vuốt từ trên xuống dưới, với các điện thoại màn hình lớn bây giờ việc thêm cử chỉ cho việc đóng màn hình là hết sức cần thiết, người dùng sẽ không cần phải sử dụng đến ngón tay thứ hai để đóng màn hình. Theo tôi, đây là sự thay đổi rất là đúng đắn, cho thấy là Apple đã chủ động nghiên cứu hành vì người dùng tốt như thế nào :v: 

Đây là điều rất tuyệt vời, nhưng sẽ có lúc chúng tôi muốn ngăn người dùng vuốt từ trên xuống dưới để đóng màn hình, vậy ta sẽ phải làm như nào và Apple cung cấp cho chúng ta 2 cách để xử lý việc này:

### Cách đơn giản nhất
Nếu bạn chỉ muốn đơn giản ngăn người dùng swipe, chỉ cần set *isModalInPftimeation* thành *true* 

```
vc.isModalInPftimeation = .true
present(vc, animated: true, completion: nil)

```

![](https://images.viblo.asia/4f7bf11d-9136-4738-8020-dd3c6cbf8ad8.gif)

### Nâng cao
Apple đã thêm 4 phương thức mới theo ***UIAdaptivePftimeationControllDelegate*** để cho việc nhận phản hồi cho sự tương tác của người dùng với việc swipe màn hình.

![](https://images.viblo.asia/6bdbd221-be16-4b8c-abaa-1597d069890b.png)

*UIAdaptivePftimeationControllDelegate* là một thuộc tính trong *UIPresentationController*, đầu tiên bạn phải gắn một ***modal view controller*** là 1 *delegate*, giống như này trong  *prepare(for segue: UIStoryboardSegue, sender: Any?)*

```
override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
  // Get the presented navigationController and the view controller it contains
  let navigationController = segue.destination as! UINavigationController
  let modalViewController = navigationController.topViewController

  // Set the modal view controller to be the delegate of the presentationController for this presentation,
  // so that modal view controller can respond to attempted dismissals
  navigationController.presentationController?.delegate = modalViewController
}

```

và tiếp đến chúng ta lắng nghe các phương thức và xử lý logic mong muốn:

```
func presentationControllerDidAttemptToDismiss(UIPresentationController) // Function này khi user cố gắng swipe để dismiss Present ViewController
func presentationControllerDidDismiss(UIPresentationController) // Func này được gọi khi Present ViewController đã dismiss
func presentationControllerShouldDismiss(UIPresentationController) -> Bool // Function này để chúng ta có thể set điều kiện để dismiss Present ViewController
func presentationControllerWillDismiss(UIPresentationController) // Func này được gọi trước khi Present ViewController được dismiss
```
Như ví dụ này, khi chúng ta tạo ra một Controller để input giá trị, và việc thực hiện Input giá trị đã diễn ra mà chúng ta cố gắng tắt bỏ màn hình này, lúc này sẽ cần phải confirm cho việc hủy bỏ việc nhập kí tự hay không?

![](https://images.viblo.asia/d302f8df-0ecc-4d94-af9b-e5bc801b6542.gif)

## Giữ lại hành vi cũ
Bên cạnh sự thay đổi cách hiển thị mặc định như trên, thì Apple vẫn để cho chúng ta có thể sử dụng cách hiển thị như cũ, bạn có thể sử dụng cách cũ bằng cách set *modalPresentationStyle* là *.fullScreen*

```
vc.modalPresentationStyle = .fullScreen
present(vc, animated: true, completion: nil)

```

hoặc trong storyboard:

![](https://images.viblo.asia/19900785-7269-42ae-ac66-e320eed88c6e.png)

# Phần kết luận
Đây là sự thay đổi đáng hoan nghênh đối với tôi vì các thiết bị iOS ngày càng lớn hơn, đưa ngón tay lên đỉnh để chạm vào nút đóng không còn là một nhiệm vụ dễ dàng, việc thực hiện cử chỉ này sẽ giúp ích cho vấn đề này. 

Bài viết được viết tham khảo theo [ nguồn](https://sarunw.com/posts/modality-changes-in-ios13?utm_campaign=iOS%2BDev%2BWeekly&utm_medium=email&utm_source=iOS%2BDev%2BWeekly%2BIssue%2B420).
Cám ơn các bạn đã dành thời gian đọc bài. (bow)