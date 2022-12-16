Chào các bạn.
Chủ nhật FA chả biết làm gì lại mở viblo lên viết bài =..=

Và hôm nay mình sẽ giới thiệu một vấn đề thực tế gặp phải khi mới học swift đó là khi lấy data từ các API về và Model của các data đó không giống nhau.

Trong bài này API được mượn tạm từ https://openweathermap.org/triggers.

1:https://samples.openweathermap.org/data/3.0/stations?appid=b1b15e88fa797225412429c1c50c122a1

2:https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22

Mình sẽ đổ dữ liệu lấy từ 2 API trên vào view.

### Bắt đầu 

API 1:  là 1 array như trong hình

![](https://images.viblo.asia/1c2d90ac-32cc-468c-99d6-893f18f181f4.png)

API2: 

![](https://images.viblo.asia/1d0b6de2-f910-4f1f-9a4a-1680a415ea8b.png)

Tạo một Project demo có 2 view. Trong các view có chứa các label như sau.

View trên mình lấy thông tin ```id, name, external_id ```  trong API số 1 sau khi tap vào button..

Tương tự như view trên, View dưới mình lấy thông tin ```id, name, cod``` từ API số 2 sau khi tap.

![](https://images.viblo.asia/a2b822f7-359a-42bd-9cfc-13e9790c154b.png)


### Model

Tạo ra 2 model tương ứng với 2 kiểu dữ liệu trong 2 API. 

Trong API rất nhiều key nhưng vì trong demo này mình chỉ dùng có 3 key trong API nên Model sẽ có dạng như sau.
```js
struct Model1: Codable {
    var id: String?
    var name: String?
    var external_id: String?
}

struct Model2: Codable {
    var id: Int?
    var name: String?
    var cod: Int?
}
```

### Request
Ứng với mỗi một API mình tạo ra 1 request lấy data và đổ ra view như sau.
###
##### Đối với view1
```js
@objc private func didTap1() {
//Sau khi tap vào button ở view1 sẽ thực hiện request lấy data, sau đó update view
        requestData1(urlString: urlStr1) { (model1Data) in
            self.updateView1(by: model1Data)
        }
    }
    
    private func requestData1(urlString: String, completion:@escaping (Model1)->()) {
        guard let url = URL(string: urlString) else { return }
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            if error != nil {
                print(error as Any)
                return
            }
            guard let data = data else { return }
            do {
                let model1Data = try JSONDecoder().decode(Model1.self, from: data)
                DispatchQueue.main.async {
                    completion(model1Data)
                }
            } catch let err {
                print("decode error: ", err)
            }
        }.resume()
    }
    
    private func updateView1(by model: Model1) {
        let id = model.id ?? "no have id"
        let name = model.name ?? "no have name"
        let externalID = model.external_id ?? "no have external ID"
        lbl1.text = id
        lbl2.text = name
        lbl3.text = externalID
    }
```
###
##### Kết quả
![](https://images.viblo.asia/49ddadca-7452-46b9-8609-5df92c39a034.png)
###
##### Tương tự đối với view2
```js
@objc private func didTap2() {
        requestData2(urlString: urlStr2) { (model2Data) in
            self.updateView2(by: model2Data)
        }
    }
    
    private func requestData2(urlString: String, completion:@escaping (Model2)->()) {
        guard let url = URL(string: urlString) else { return }
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            if error != nil {
                print(error as Any)
                return
            }
            guard let data = data else { return }
            do {
                let model2Data = try JSONDecoder().decode(Model2.self, from: data)
                DispatchQueue.main.async {
                    completion(model2Data)
                }
            } catch let err {
                print("decode error: ", err)
            }
        }.resume()
    }
    
    private func updateView2(by model: Model2) {
        let id = model.id ?? 0
        let name = model.name ?? "no have name"
        let cod = model.cod ?? 0
        v2lbl1.text = "ID: \(id)"
        v2lbl2.text = "name: \(name)"
        v2lbl3.text = "cod: \(cod)"
    }
```

### Vấn đề
Vậy chuyện gì sẽ sảy ra nếu bạn phải làm việc với 296 Models khác nhau. Tất nhiên là việc viết 296 request function cũng khả thi nhưng nó tốn khá nhiều công sức và bảo trì cũng mất công nữa.

### Generic is 神
Đúng, chính nó. Thay vì định nghĩa từng kiểu dữ liệu trả về của từng request thì đưa vào một kiểu dữ liệu chung nhất cho tất cả các request sẽ giúp bạn tiết kiệm được rất nhiều thời gian.

### Thực hành
Tự tin xoá 2 function requestData bên trên và bắt đầu cùng generic thôi anh em.
```swift
//một function có chứa generic type sẽ có kiểu như này.
private func getData<T: Codable>(urlString: String, completion:@escaping (T)->()) {
        guard let url = URL(string: urlString) else { return }
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            if error != nil {
                print(error as Any)
                return
            }
            guard let data = data else { return }
            do {
                let data = try JSONDecoder().decode(T.self, from: data)
                DispatchQueue.main.async {
                    completion(data)
                }
            } catch let err {
                print("decode error: ", err)
            }
        }.resume()
    }
```
###
##### Sử dụng 
Các bạn đã thấy sự khác biệt chưa :D.

Mỗi lần tap button thì function getData() được gọi. Và bạn chỉ cần định nghĩa kiểu dữ liệu muốn sử dụng là xong. Chứ không như function requestData bên trên, kiểu dự liệu không thể thay đổi.
```swift
@objc private func didTap1() {
        getData(urlString: urlStr1) { (model1Data: Model1) in
            self.updateView1(by: model1Data)
        }
    }
    
    @objc private func didTap2() {
        getData(urlString: urlStr2) { (model2Data: Model2) in
            self.updateView2(by: model2Data)
        }
    }
```
###
### Kết
Cho dù bạn làm việc với 19999 Model khác nhau thì cũng cuối ngày mặt vẫn tươi như hoa vì đã có generic =))

Code ngắn đi nhiều và cực kỳ dễ bảo trì.

https://github.com/nguyentienhoang810/generis-demo

Chúc các cuối tuần vui vẻ nha :D