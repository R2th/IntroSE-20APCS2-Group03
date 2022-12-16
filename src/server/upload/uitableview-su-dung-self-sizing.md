Xin chào các bạn, chắc hẳn trong các dự án các bạn đã hoặc đang làm đều sẽ gặp trường hợp cần **UITableViewCell** tự động co giãn dựa theo nội dung mà nó chứa bên trong đúng không? Mình thì hầu hết các dự án đã làm đều cần phải thực hiện việc thiết kế giao diện như vậy. Nếu như các bạn chưa từng làm giao diện thì bài viết này là dành cho bạn. Bài viết này mình sẽ hướng dẫn cách sử dụng self-sizing để giúp **UITableViewCell** tự động co giãn theo nội dung bên trong.
### Tạo project 
Đầu tiên mình sẽ tạo một project chỉ bao gồm ViewController có chứa 1 tableview. Tiếp đó mình sẽ tạo 1 cell có tên là "CharacterTableViewCell". 
Sau khi tạo xong project và cell mình sẽ layout cho cell đó. Tiếp đến là fake dữ liệu như hình dưới đây.
![](https://images.viblo.asia/30687714-0096-4744-a592-d5fb792f4110.png)
Vì nội dung mô tả cho từng cell khá dài nên mình sẽ tạo riêng một file để lưu lại.
```
struct Text {
    static let characters = ["\"Monkey D. Luffy (モンキー･D･ルフィ Monkī D. Rufi?) là nhân vật chính của One Piece và là thuyền trưởng của băng Hải tặc Mũ Rơm, anh có biệt danh là \"Luffy Mũ Rơm ((麦わらのルフィ Mugiwara no Rufi?). Luffy trở thành người người cao su sau khi ăn trái ác quỷ Gomu Gomu (ゴムゴムの実 Gomu Gomu no Mi?) hệ Paramecia. Luffy có ước mơ là trở thành Vua Hải tặc và là người tìm thấy kho báu \"One Piece\". Ước mơ này cũng như mong muốn ra biển và trở thành Hải tặc của Luffy được truyền cảm hứng từ Shanks - Hải Tặc đã cứu anh lúc 7 tuổi. Luffy sau đó được ông nội gửi lên cho một sơn tặc và 10 năm sau, Luffy lên đường tìm kiếm đồng đội để thành lập băng hải tặc của riêng mình, cuộc hành trình của Luffy bắt đầu và cái tên \"Luffy Mũ Rơm\" dần dần nổi tiếng trong toàn thế giới One Piece. Sau sự ra đi của người anh em kết nghĩa Portgas D. Ace, Luffy cảm thấy mình còn quá yếu. Anh đã quyết định nhắn toàn băng đi luyện tập và hẹn gặp lại tại quần đảo Sabaody sau 2 năm để tiến vào Tân Thế giới. Dưới sự kèm cặp và hướng đẫn của huyền thoại hải tặc Sliver Rayleigh, trong 2 năm luyện tập Luffy đã có thể kiểm soát được Haoshoku Haki và thành thục cả ba loại haki cũng như hoàn thiện các kĩ năng chiến đấu, sáng tạo thêm các chiêu thức mới. Luffy có tính cách khá hài hước và đôi khi hơi ngốc nghếch, nhưng đồng thời anh cũng là thiên tài khi chiến đấu, với khả năng ứng biến tuyệt vời. Luffy rất tin tưởng, yêu quý và tôn trọng các đồng đội của mình. Số tiền truy nã của Luffy hiện tại có giá 1,500.000.000\"", "\"Sanji (サンジ Vinsumōku Sanji?) là Đầu Bếp của băng hải tặc Mũ Rơm và là thành viên thứ năm của băng. Anh có biệt danh Sanji Chân Đen (黒脚のサンジ Kuro Ashi no Sanji?) và có sở trường chiến đấu bằng chân. Ước mơ của Sanji là tìm thấy vùng biển huyền thoại \"All Blue\". Sanji là một đầu bếp tài ba và giỏi trong cả chiến đấu lẫn nấu ăn. Sanji rất lịch thiệp với phụ nữ chuẩn với hình mẫu của người đàn ông kiểu Pháp và cũng hơi \"dê\" một chút. Ngay từ khi còn bé Sanji đã làm phụ bếp trên một con tàu ở du lịch trước khi xảy ra biến cố với hải tặc Zeff \"Chân Đỏ\" và băng hải tặc Cook của ông ta. Zeff đã ăn một chân của mình và nhường lại phần lương thực cho Sanji khi cả hai bị kẹt trên một đảo đá. Sau đó Sanji đã cùng với Zeff gây dựng nên Nhà hàng trên biển Baratie và trở thành Phó Đầu Bếp tại đây cho tới khi gặp Luffy. Sanji học kĩ năng nấu nướng và phong cách chiến đầu bằng chân được truyền lại từ Zeff. Sau cuộc đụng độ với băng hải tặc Krieg, Sanji quyết định gia nhập băng hải tặc Mũ Rơm và trở thành thuyền viên thứ tư của băng. Trong hai năm luyện tập, Sanji được gửi tới vương quốc Kamabakka (モモイロ島 Momoiro Airando?) và luyện tập dưới sự hướng dẫn của \"Nữ hoàng Okama\" Ivankov. Sanji còn thường hay tự xưng là \"Mr. Prince\" (Mr. プリンス Misutā Purinsu?). Sanji có tên thật là Vinsmoke Sanji (ヴィンスモーク・サンジ Vinsumō\"", "\"Roronoa Zoro (ロロノア・ゾロ?) là kiếm sĩ của băng hải tặc Mũ Rơm, anh là thành viên thứ hai của băng Mũ Rơm. Zoro theo \"Tam Kiếm Phái\" và có biệt danh là \"Thợ săn Hải tặc Zoro ((海賊狩りのゾロ Kaizoku Gari no Zoro?), anh là chủ sở hữu của bốn thanh kiếm nằm trong các thanh kiếm quý của thế giới One Piece. Ước mơ của Zoro là hoàn thành lời hứa với người bạn thân quá cố, trở thành kiếm sĩ mạnh nhất thế giới. Và để làm được điều đó anh phải đánh bại người nắm giữ vị trí này, \"Mắt Diều Hâu Dracule Mihawk\". Zoro đã ra khơi để lên đường thực hiện ước mơ của mình và làm nghề săn tiền thưởng để kiếm sống trước khi gặp Luffy, biệt danh cũng như sự nổi tiếng của Zoro ở East Blue cũng này bắt nguồn từ lý do này. Luffy gặp Zoro tại Shells Town, Zoro bị bắt giam ở đây do vướng vào rắc rối với hai cha con Đại tá Chi Nhánh Hải Quân Morgan \"Tay Rìu\" và Helmeppo. Luffy đã cứu Zoro và trở thành thuyền viên đầu tiên của băng hải tặc Mũ Rơm. Trong khoảng thời gian hai năm luyện tập, Zoro trở thành học trò của Mihawk và ông đã dạy cho anh kiếm pháp cũng như cách sử dụng Haki. Số tiền truy nã của Zoro là 320.000.000 Berrysymbol.png.\""]
}
```

=> Như các bạn đã thấy thì nội dung của phần mô tả cho mỗi cell rất dài, tuy nhiên như trên hình thì mỗi cell chỉ hiển thị có một chút data. Nếu như muốn hiển thị thêm thì chúng ta cần phaiar cho chiều cao của cell đó tăng lên.
Vậy làm thế nào để chúng ta có thể biết chính xác được chiều cao để có thể hiển thị hết được nội dung? 

### Self-sizing
Để có thể khiến cho cell tự động tính toán chiều cao và co giãn dựa theo nội dung  thì chúng ta sẽ sử dụng self-sizing.
Để sử dụng self-sizing thì chúng ta có 2 cách đó là viết bằng code hoặc chọn trực tiếp trên storyboard. Tuy nhiên để dùng 2 cách dưới đây thì chúng ta cần phải layout cell sao cho các view bên trong cần phải được neo vào top và bottom của cell content view.
#### Viết code.
Cách này rất đơn giản chúng ta chỉ cần set thuộc tính như sau cho tableview 
```

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak fileprivate var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        tableView.register(UINib(nibName: "CharacterTableViewCell", bundle: nil), forCellReuseIdentifier: "CharacterTableViewCell")
        tableView.estimatedRowHeight = 100
        tableView.rowHeight = UITableView.automaticDimension
    }

    
}

extension ViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return Text.characters.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "CharacterTableViewCell", for: indexPath) as! CharacterTableViewCell
        cell.configCell(desc: Text.characters[indexPath.row])
        return cell
    }
   
}

```
#### Chọn trên storyboard
Nếu như mình nhớ ko nhầm thì tính năng này mới có trên xcode 10.
Đê sử dụng tính năng này, chúng ta cần mở mục InspectorsInspectors ở bên trái của Xcode.
Tiếp theo chọn mục Size Inspectors. Khi chọn vào tableview chúng ta sẽ thấy có các mục như hình dưới đây. Đối với Xcode 10 trở lên thì khi kéo một tableview vào controller self-sizing đã được mặc định thiết lập 
![](https://images.viblo.asia/3b6c5244-2e13-4db7-967a-1d6f95957630.png)
#### Kết quả.
Và dưới đây là kết quả sau khi sử dụng self-sizing. Chiều cao của cell được tự động co dãn theo nội dung chứa bên trong đó.
![](https://images.viblo.asia/b23a0a8c-d5e5-4754-984b-cd110fc4b062.png)

Cảm ơn các bạn đã đọc bài viết này, hy vọng nó sẽ giúp ích được các bạn trong việc học or làm việc với IOS 

Link github:https://github.com/dungkv-1044/self-sizing/tree/master/SelfSizing