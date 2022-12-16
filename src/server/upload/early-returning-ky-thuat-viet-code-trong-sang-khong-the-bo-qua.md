Return một object hay giá trị từ một function là một khái niệm cốt lõi của hầu hết các ngôn ngữ lập trình. Nó cho chúng ta biết được output của function dựa vào các thông số input và logic xử lý của function đó.

Trong thực tế, không ít lần chúng ta gặp phải hoặc viết ra những function có độ phức tạp cao mà số lượng các điều kiện if lồng vào nhau dài cả cây số - những thứ mà chỉ sau 1 vài tháng đọc lại, chúng ta sẽ tự hỏi: Thằng nào đã viết ra đống shit này!!!

Để giảm thiểu độ phức tạp cũng như giúp code dễ đọc hơn, trong sáng hơn, chúng ta nên sử dụng kỹ thuật Early Return (hay Early Exit) trong quá trình viết code. Ý tưởng của nó là chúng ta hãy return khỏi function sớm nhất có thể.

## Return early, return often

Để dễ dàng hiểu và áp dụng kỹ thuật Early Return chúng ta hãy cùng xem xét cải thiện cấu trúc cho đoạn code ví dụ dưới đây. Trong ví dụ này, chúng ta sẽ làm việc với NotificationCenter API cho một ứng dụng ghi chú, và những gì chúng ta phải làm là cập nhật lại dữ liệu khi mội bản ghi chú được cập nhật.

Để tải ghi chú được cập nhật, trước tiên chúng ta phải trích xuất ID của nó từ Notification được truyền vào, việc lấy ra bản ghi chú từ database đang được xử lý bằng cách kiểm tra các điều kiện if lồng nhau - như sau:

```
class NoteListViewController: UIViewController {
    @objc func handleChangeNotification(_ notification: Notification) {
        let noteInfo = notification.userInfo?["note"] as? [String : Any]

        if let id = noteInfo?["id"] as? Int {
            if let note = database.loadNote(withID: id) {
                notes[id] = note
                tableView.reloadData()
            }
        }
    }
}
```

Đoạn code trên đã hoạt động đúng như mong muốn, tuy nhiên chúng hơi khó đọc và khó hiểu một chút do chúng bao gồm 2 điều kiện if lồng vào nhau và code bị thụt lề. Chúng ta cùng cải thiện đoạn code trên xem sao nhé!

Điều đầu tiên chúng ta sẽ làm là áp dụng kỹ thuật Early Return, bằng cách làm cho function của chúng ta luôn return ngay khi có thể. Thay vì sử dụng các câu lệnh if let lồng nhau để unwrap optionals và ép kiểu, chúng ta sẽ sử dụng câu lệnh guard và return ngay trong trường hợp không lấy được dữ liệu mong muốn:

```
class NoteListViewController: UIViewController {
    @objc func handleChangeNotification(_ notification: Notification) {
        let noteInfo = notification.userInfo?["note"] as? [String : Any]

        guard let id = noteInfo?["id"] as? Int else {
            return
        }

        guard let note = database.loadNote(withID: id) else {
            return
        }

        notes[id] = note
        tableView.reloadData()
    }
}
```

Lợi ích của việc return sớm giống như đoạn code thực hiện bên trên là làm cho các trường hợp fail của function rõ ràng hơn. Nó không chỉ giúp cho code có thể dễ dàng đọc hơn mà còn làm giảm thụt lề cho các dòng code, code thẳng hàng hơn.

Chúng ta thậm chí có thể cải thiện hơn một chút nữa bằng cách chuyển đoạn code giải nén ID của ghi chú vào trong một private extension của Notification. Bằng cách này, mã xử lý Notification chỉ chứa logic thực tế khi sử dụng ID của ghi chú để thực hiện cập nhật, dẫn đến việc triển khai rõ ràng hơn - như dưới đây:

```
private extension Notification {
    var noteID: Int? {
        let info = userInfo?["note"] as? [String : Any]
        return info?["id"] as? Int
    }
}

class NoteListViewController: UIViewController {
    @objc func handleChangeNotification(_ notification: Notification) {
        guard let id = notification.noteID else {
            return
        }

        guard let note = database.loadNote(withID: id) else {
            return
        }

        notes[id] = note
        tableView.reloadData()
    }
}
```

Cấu trúc code bằng cách sử dụng early return và câu lệnh guard cũng giúp cho việc debug những trường hợp thất bại thực hiện dễ dàng hơn. Thay vì việc chạy qua từng dòng code, chúng ta có thể đặt breakpoints ở mỗi guard statement's return, và chúng ta sẽ ngay lập tức dừng lại ở điều kiện gây ra lỗi.

## Conditional construction

Khi cấu trúc instances mới của các đối tượng, chúng ta thường xuyên gặp phải trường hợp đối tượng cần khởi tạo phụ thuộc vào một chuỗi các điều kiện. Như ví dụ sau, việc hiển thị màn hình nào khi khởi động app phụ thuộc vào 2 điều kiện sau:

* User đã login chưa?
* User đã qua màn hình giới thiệu hay chưa?

Việc khởi tạo màn hình nào dựa vào các điều kiện trên có thể thực hiện bằng cách sử dụng một chuỗi các câu lệnh kiểm tra điều kiện if/else:

```
func showInitialViewController() {
    if loginManager.isUserLoggedIn {
        if tutorialManager.isOnboardingCompleted {
            navigationController.viewControllers = [HomeViewController()]
        } else {
            navigationController.viewControllers = [OnboardingViewController()]
        }
    } else {
        navigationController.viewControllers = [LoginViewController()]
    }
}
```

Một lần nữa, đây là một tình huống mà early return sẽ giúp chúng ta viết code dễ đọc và dẽ debug hơn, như cách viết dưới đây:

```
func makeInitialViewController() -> UIViewController {
    guard loginManager.isUserLoggedIn else {
        return LoginViewController()
    }

    guard tutorialManager.isOnboardingCompleted else {
        return OnboardingViewController()
    }

    return HomeViewController()
}

func showInitialViewController() {
    let viewController = makeInitialViewController()
    navigationController.viewControllers = [viewController]
}
```

## Codified conditions

Cuối cùng, chúng ta hãy xem xét cách các hàm có thể giúp làm cho các điều kiện phức tạp dễ hiểu hơn rất nhiều. Dưới đây, chúng ta sẽ xây dựng một viewController phụ trách việc hiển thị một comment trong một ứng dụng mạng xã hội. Trong đó, việc hiển thị nút edit phụ thuộc vào việc thỏa mãn 3 điều kiện khác nhau.

```
class CommentViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        if comment.authorID == user.id {
            if comment.replies.isEmpty {
                if !comment.edited {
                    let editButton = UIButton()
                    ...
                    view.addSubview(editButton)
                }
            }
        }

        ...
    }
}
```

Vì việc kiểm tra ba điều kiện lồng nhau hiện đang được đặt trong một method được sử dụng để thiết lập các subview cho viewController, nên có thể hơi khó hiểu tại sao chúng lại ở đó. Và trừ khi chúng ta có một tài liệu rõ ràng giải thích lý do tại sao các điều kiện đó liên quan đến việc người dùng có thể chỉnh sửa nhận xét hay không, dễ dàng cho ai đó (bao gồm cả chúng ta) vô tình thay đổi hoặc xóa một trong những điều kiện đó trong tương lai.

Thay vào đó, chúng ta sẽ chuyển 3 điều kiện đó thành 1 function - được đặt tên rõ ràng và được implement trong extension của Comment type:

```
extension Comment {
    func canBeEdited(by user: User) -> Bool {
        guard authorID == user.id else {
            return false
        }

        guard comment.replies.isEmpty else {
            return false
        }

        return !edited
    }
}
```

Với sự thay đổi trên, viewController của chúng ta lúc này chỉ tập trung vào việc thiết lập UI trong viewDidLoad, và chúng trở nên rõ ràng hơn rất nhiều khi nào thì edit button sẽ được thêm vào:

```
class CommentViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        if comment.canBeEdited(by: user) {
            let editButton = UIButton()
            ...
            view.addSubview(editButton)
        }

        ...
    }
}
```

Kết hợp cách tiếp cận trên với một vài unit test đơn giản, chúng ta sẽ giảm thiểu được phần lớn những rủi ro cho những đoạn code phức tạp trong tương lai.

## Kết luận

Sử dụng function với các câu lệnh guard và early return không phải là những khái niệm bắt buộc khi viết code - nhưng việc lãng quên chúng sẽ là một sự thiếu sót lớn, bởi sự mạnh mẽ của chúng khi áp dụng cho logic phân nhánh, các điều kiện phức tạp hay việc xử lý đa optionals. Và nếu chúng ta có thể cấu trúc code của chúng ta như các hàm thuần túy với các điều kiện rõ ràng, thì đoạn code của chúng ta sẽ trở nên rõ ràng, dễ đọc, dễ test hơn nhiều.