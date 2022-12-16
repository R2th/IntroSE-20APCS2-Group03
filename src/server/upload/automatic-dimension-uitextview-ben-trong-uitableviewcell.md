Xin chào các bạn, bài viết này mình viết về cách dynamic UITextView bên trong UITableViewCell.

Đầu tiên, mình tạo tạo viewcontroller chỉ có 1 table view bình thường, set height của cell là UITableViewAutomaticDimension để giúp UITableViewCell tự động co giãn theo nội dung bên trong:

```
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.register(UINib(nibName: "AddCell", bundle: nil), forCellReuseIdentifier: "AddCell")
        tableView.estimatedRowHeight = 155
        tableView.rowHeight = UITableView.automaticDimension
    }
}

extension ViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "AddCell", for: indexPath) as? AddCell else { return UITableViewCell() }
        cell.delegate = self
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
}
```

Tiếp đó mình sẽ tạo 1 cell có tên là "AddCell", sau khi tạo xong mình kéo 1 UITextView vào trong và auto layout như thế này:  
![](https://images.viblo.asia/6efb11bd-0997-4579-bba5-69800fd997c5.png)

Bên trong file AddCell.swift, mình implement UITextViewDelegate và tạo AddCellDelegate như bên dưới:

```
import UIKit

protocol AddCellDelegate: class {
    func addText()
}

class AddCell: UITableViewCell {

    @IBOutlet weak var textView: UITextView!
    weak var delegate: AddCellDelegate?
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        textView.delegate = self
    }
}

extension AddCell: UITextViewDelegate {
    func textViewDidChange(_ textView: UITextView) {
        self.delegate?.addText()
    }
}
```

Cuối cùng, ở file ViewController, mình implement AddCellDelegate:

```
extension ViewController: AddCellDelegate {
    func addText() {
        tableView.beginUpdates()
        tableView.endUpdates()
    }
}
```

Mình set màu của table view là gray, của text view là while để xem được rõ hơn, kết quả mình nhận được như sau:
![](https://images.viblo.asia/8dd7f411-cc60-4b81-bfe5-ea1d6c5c3960.gif)

Cảm ơn các bạn đã đọc bài viết của mình :grinning: