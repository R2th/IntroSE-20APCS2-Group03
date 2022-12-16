Trong Android API 26 (Oreo) giới thiệu TextClassification, và nó được hỗ trợ tốt hơn trong API 28 (Pie). Trong bài viết này sẽ xem xét điều này, cách sử dụng nó.
	
TextClassification là một cơ chế mà hệ thống xác định một loại văn bản cụ thể và thêm vào các hành động thích hợp khi người dùng chọn văn bản đó. Một số loại phổ biến là số điện thoại, địa chỉ email, URL và các loại này sẽ kích hoạt các hành động tương ứng với hệ thống:  gọi điện, mở ứng dụng email và trình duyệt web.
	
Chúng ta có thể lấy  TextClassificationManager mặc định bằng cách truy xuất từ system service:

    textClassificationManager = getSystemService(Context.TEXT_CLASSIFICATION_SERVICE) as TextClassificationManager

Khi thực hiện phân loại văn bản, đây là hoạt động gây tốn kém về tính toán vì hệ thống mặc định TextClassification sử dụng mô hình Machine Learning để thực hiện. Vì thế chúng ta phải đặt code của chúng ta trong async khi đó nó sẽ chạy trên background thread:
```
  

private  fun classifier()  =  async(CommonPool)  {
	textClassificationManager  =  getSystemService(Context.TEXT_CLASSIFICATION_SERVICE)  as  TextClassificationManager
...
}
```

Ví dụ để phân loại 1 địa chỉ email đầu tiên chúng ta phải có *_TextClassifier_* instance từ  *_TextClassificationManager_* và class method  *classifyText()*
```
val textClassifier = textClassificationManager.textClassifier
val emailClassification = textClassifier.classifyText(emailText, 0, emailText.length, LocaleList.getDefault())
println(emailClassification)
```
TextClassification instance trả về dữ liệu có dạng như sau: 

    TextClassification {text=dummy@email.com, entities={email=1.0}, actions=[android.app.RemoteAction@4e67771, android.app.RemoteAction@eb7956], id=androidtc|en_v6|754483982}

Chúng ta thấy rằng nó xác định văn bản như một địa chỉ email với mức độ tin cậy là 1.0 (trên thang điểm 0 -1.0 do đó là một kết quả nhất định). Mặc dù rõ ràng đây là 1 email giả nhưng nó vẫn thỏa mãn được là 1 email hợp lệ.

Tiếp theo chúng ta thực hiện phân loại URL:
```
val urlClassification = textClassifier.classifyText(urlText, 0, urlText.length, LocaleList.getDefault())
println(urlClassification)
```
Lần này TextClassification kết quả xác định đây là một URL:

    TextClassification {text=https://blog.stylingandroid.com, entities={url=1.0}, actions=[android.app.RemoteAction@33dd4e2], id=androidtc|en_v6|-1332134748}
   
   Việc xác định các loại văn bản củ thể, TextClassification sẽ trả về không có hoặc nhiều Action có thể xử lý loại đã được xác định. Nó được đóng gói trong RemoteAction object, bao gồm cả PendingIntent. Chúng ta có thể gọi RemoteAction sẽ kích hoạt PendingIntent ví dụ: nếu văn bản là email thì sẽ khởi chạy ứng dụng soạn thảo email, nếu là URL thì khởi chạy trình duyệt web để xem URL...
   
   Một điều quan trọng cần lưu ý là khi gọi *classifyText()* giá trị bắt đầu và kết thức của văn bản cần phân loại phải chính xác chuỗi con chứa một kiểu phân loại đã cho. Nếu chúng ta sử dụng chuỗi: "Email: dummy@email.com " thì việc thực hiện phân loại toàn sẽ không trả về loại địa chỉ email mà là khác. Nếu chúng xác định chuỗi " dummy@email.com " thì nõ là địa chỉ email chính xác.

Điều này đặt câu hỏi: làm thế nào để chúng ta xác định bắt đầu và kết thúc của chuỗi con để có thể phân loại chính xác?. TextClassification cung cấp phương thức *suggestSelection()* để xác định chuỗi con cần phân loại. Khi đó người dụng nhấn lên màn hình vị trí chuỗi bắt đầu và select chuỗi đến vị trí cần kết thúc.

Chúng ta có thể thấy điều này trong hành động bằng cách gọi `suggestSelection()`với cùng một bộ đối số như `classifyText()`. Trong trường hợp này, các vị trí bắt đầu và kết thúc sẽ phân tách một ký tự đơn xuất hiện trong phần địa chỉ email của chuỗi:
```
val suggestions  =  textClassifier.suggestSelection(hybridText,  10,  11,  LocaleList.getDefault())

println(suggestions)
```
Và nó se trả về TextSelection chủa cả vị trí bắt đầu và kết thúc của chuỗi con, gói gọn trong địa chỉ email được phát hiện: 

    TextSelection  {id=androidtc|en_v6|-456509634,  startIndex=7,  endIndex=22,  entities={email=1.0}}

Chúng ta có thể sử dụng giá start và end để gọi *classifyText()*. TextClassifier có thể sử dụng được trong TextView và WebView.  
![](https://images.viblo.asia/59c07c70-913c-4c26-9baf-8764bc5b6267.gif)

Mã nguồn cho bài viết này có sẵn [tại đây ](https://github.com/StylingAndroid/TextClassification/tree/Part1)