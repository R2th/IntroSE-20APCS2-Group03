Ở bài viết này mình sử dụng kỹ thuật sử Dụng" estimatedHeightForRowAtIndexPath" để coding giao diện cho 1 tableView giả sử các bạn phải coding một giao diện show - hidden như thế này:

+ Hidden như thế này: ![](https://images.viblo.asia/853457cf-10c1-44ec-87ee-b351818d2b2d.png)

+ Show như thế này: ![](https://images.viblo.asia/3fcd1206-33a0-4a20-97a0-8bc3be6f686f.png)

Yêu cầu là khi người dùng click vào các thanh màu xám thì các thanh màu xám không được xê dịch, nằm im tại điểm chạm và sẽ show ra các content cho người dùng hoặc hidden chúng vào. Để thiết kế được giao diện kiểu này khá đơn giản:

- Toàn bộ giao diện là một UITableView gồm 6 section
- Mỗi thanh màu xám là một headerView section của tableView
- Khi các section hidden thì khoảng cách màu trắng giữa các section chính là footer view của mỗi section
- Mỗi section sẽ có vài cell tuỳ theo yêu cầu, trong cell các bạn add thêm các custom view khác như là textfields, labels,...
- Khi chạm vào header các bạn thực hiện reload section đó để update data + giao diện cho section đó, khi reload section nó sẽ gọi tới các delegate method:

+ Gọi tới method sau để updata lại data của cell:

    ```override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell```
    
+ Gọi tới method sau để update chiều cao của cell:

    ```override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat```
    
> Ta sẽ sử dụng một mẹo để show/hidden:
>
> ở đây là nếu show thì chiều cao của cell = UITableViewAutomaticDimension còn nếu hidden lại thì chiều cao của cell là = 0.

+ Gọi tới method sau để estimate chiều cao của cell:

    ``` override func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat ```
    
+ Gọi tới một số method khác để set header, footer nữa,... 

```
import UIKit

class TableViewController: UITableViewController {
    var arr = Array<Bool>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        arr = [false,false,false,false]
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 4
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 2
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.textLabel?.text = "\(indexPath.row)"
        return cell
    }
    
    override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 50
    }
    
    override func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return 10
    }
    
    override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let headerView = UIView(frame: CGRect(x: 0, y: 0, width:
            tableView.bounds.size.width,height:50))
        headerView.backgroundColor = .gray
        let btnShow = UIButton(frame: CGRect(x: tableView.frame.size.width - 50, y: 15, width:
            25, height: 25))
        btnShow.setTitle("+", for: .normal)
        btnShow.titleLabel?.font = UIFont.boldSystemFont(ofSize: 30)
        btnShow.backgroundColor = .red
        btnShow.setTitleColor(.white, for: .normal)
        btnShow.contentHorizontalAlignment = .center
        btnShow.tag = section
        btnShow.addTarget(self, action: #selector(self.tapShow(_:)), for: .touchUpInside)
        headerView.addSubview(btnShow)
        return headerView
    }
    
    @objc func tapShow(_ sender: UIButton) {
        
        arr[sender.tag] = !arr[sender.tag]
        print(arr[sender.tag], sender.tag)
        tableView.reloadSections(IndexSet.init(integer: sender.tag), with: .none)
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        
        print(arr[indexPath.section],indexPath.section )
        
        if  arr[indexPath.section] == false {
            return 0
        }
        return UITableViewAutomaticDimension
    }
    
    override func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
        switch indexPath.section {
        case 0:
            return 50
        case 1:
            return 50
        case 2:
            return 50
        case 3:
            return 50
        default:
            break
        }
        return UITableViewAutomaticDimension
    }
}

```