## Môi trường phát triển:
- **Swift Language Version:** Swift 5
- **Xcode:** Version 10.2.1 (10E1001)
- **Deployment Target:** 11.0

## Bước 1: Tạo giao diện cho Popup View trong main.storyboard
Trong ví dụ này, ta sẽ tạo một giao diện đơn giản được bố trí như hình dưới đây:
![](https://images.viblo.asia/808fdcf3-0247-427d-ae89-1b39e6e2fa92.png)
Trong đó, Popup View được set constraint như sau:
- **Leading Constraint:** 64
- **CenterX Constraint:** safe Area 
- **CenterY Constraint:** safe Area
- **Width Constraint = Height Constraint**


![](https://images.viblo.asia/f54d8820-d87a-4fb5-ba57-6a6d6a1754ad.png)

Tiếp theo, ta set backgroundColor cho Popup View: black color với opacity = 0.5
![](https://images.viblo.asia/78557c64-9418-4ebc-81ad-55de08b641a9.png)

Đây là giao diện cuối cùng sau khi ta thiết lập: 
![](https://images.viblo.asia/52d099d3-49df-4646-920d-cf8ecfbbb6b6.png)

## Bước 2: Xử lý ẩn hiện Popup View
Trong  MainViewController, ta sẽ tạo nút Open PopupView và hàm thực thi để hiển thị Popup View:
```
@IBAction func handleOpenButtonTapped(_ sender: Any) {
    guard let vc = storyboard?.instantiateViewController(withIdentifier: "PopupViewVC") else { return }
    vc.modalPresentationStyle = .overFullScreen
    vc.modalTransitionStyle = .crossDissolve
    present(vc, animated: true)
}
```

Trong PopupViewVC, ta tạo hàm thực thi việc ẩn Popup View:
```
@IBAction func handleCloseButtonTapped(_ sender: Any) {
    dismiss(animated: true)
}
```
![](https://images.viblo.asia/b882af5e-2311-4881-a8cb-ffe5d4df08c3.gif)

## Bước 3: Truyền dữ liệu từ PopupView đến MainView
Trong PopupViewVC,  ta tạo một closure didSendData để truyền dữ liệu lấy từ textField đến MainViewController:
```
var didSendData: ((String) -> Void)?

@IBAction func handleCloseButtonTapped(_ sender: Any) {
    if let name = nameTextField.text {
        didSendData?(name)
    }
    dismiss(animated: true)
 }
```

Trong MainViewController, ta sẽ gán giá trị lấy được bên PopupView vào nameLabel
```
@IBAction func handleOpenButtonTapped(_ sender: Any) {
    guard let vc = storyboard?.instantiateViewController(withIdentifier: "PopupViewVC") as? PopupViewVC else { return }
    vc.modalPresentationStyle = .overFullScreen
    vc.modalTransitionStyle = .crossDissolve
    present(vc, animated: true)

    vc.didSendData = { [weak self] name in
        guard let self = self else { return }
        self.nameLabel.text = name
    }
}
```

Và đây là kết quả cuối cùng:
![](https://images.viblo.asia/6bb6bf65-02d2-4cea-b5bb-5a90a9f5e072.gif)

## Tài liệu tham khảo: 
https://www.youtube.com/watch?v=NBCped0ZcWE&amp;vl=en

## Link github:
https://github.com/huybnd-1816/PopupViewSample