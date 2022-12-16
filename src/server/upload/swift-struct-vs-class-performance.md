Trong quá trình phát triển ứng dụng iOS, bạn chắc đã phải đối mặt với một tình huống mà bạn cần phải lựa chọn giữa Class và Struct. Làm thế nào để bạn có thể quyết định lựa chọn giữa chúng ?  Chúng ta cần cân nhắc trước khi lựa chọn: 
1. Chúng ta cần 1 kiểu giá trị tham chiếu(Reference Types) hay là kiểu tham trị (Value Types)
2. Chúng ta có cần hỗ trợ kế thừa không (inheritance)?
Hầu hết chúng ta cần cân nhắc lựa chọn 2 vấn đề trên khi lựa chọn Struct và Class. Nhưng hiệu suất của chúng thì sao ? Bạn phải xem xét các vấn đề sau : 
1. Cái nào trong Struct và Class hoạt động nhanh hơn ?
2. Cái nào làm tối ưu hoá bộ nhớ hơn ?
3. Cái nào nhanh ?
Trong bài viết này, tôi sẽ chủ yếu tập trung vào quản lý hiệu suất và bộ nhớ của Struct và Class.

###     Performance and Memory management between Struct and Class: 


Khi nói đến hiệu suất, chúng ta luôn phải xem xét các sự kiện sau : 
Kiểu tham trị (Value Types) nhanh hơn kiểu giá trị tham chiếu (Reference Types) bởi vì tham trị được lưu trữ trong Stack còn tham chiếu được lưu trong Heap. Vì vậy quá trình lưu trữ trong Heap tốn nhiều thời gian hơn. Ngoài ra khi lưu trữ kiểu tham chiếu , còn có phải chịu trách nhiệm thêm  việc quản lí "retain count " của object.
Vì vậy, dựa vào lí thuyết trên, chúng ta có thể nói rằng Struct nhanh hơn Class vì :
1. Để lưu trữ trong class, đầu tiên Apple tìm thấy bộ nhớ trong Heap, sau đó duy trì trường bổ sung để đếm số "Retain count". Cũng vậy lưu trữ tham chiếu của Heap vào Stack. Vì vậy, khi nói đến phần truy cập,  nó phải xử lí stack và heap.  Xem hình ảnh ví dụ từ video của Apple sau: 

![](https://images.viblo.asia/13ff9261-f224-4507-ab26-45e101499eb0.png)

Vì vậy, nếu bạn nhìn vào hình ảnh,  lưu trữ trong Class chúng ta có :

  - Ngăn xếp để lưu trữ tham chiếu đống
   - Heap để lưu trữ biến lớp x và y
   - Thêm một trường để duy trì số lượng giữ lại cho lớp đó.
       
 Vì vậy, bạn có thể hiểu rằng trong trường hợp này nếu bạn muốn truy cập các biến lớp, nó phải tìm cả hai thứ ngăn xếp và đống.

2. Bây giờ nếu chúng ta nói về Struct, Nó chỉ sử dụng Stack để lưu trữ các giá trị, vì vậy trong khi đọc giá trị, chúng ta chỉ đọc trực tiếp từ ngăn xếp trong thời gian O (1). Hãy xem ví dụ dưới đây bằng cách sử dụng Stack nơi chúng ta cần lưu trữ x và y.
 
 ![](https://images.viblo.asia/8ec34b14-22cf-40b3-8678-276f36b714c5.png)

Vì vậy, nếu bạn nhìn vào ví dụ trên, đây giống như lớp một nhưng ở đây chúng ta không cần bất kỳ Heap nào. Vì vậy, 2 điểm ở đây:

   - Không có heap nào được sử dụng khi sử dụng struct
   - Gán cho một biến ngăn xếp khác tạo một bản sao khác
       
Vì vậy, dựa trên điều trên, chúng ta có thể nói rằng Struct luôn thực hiện nhanh sau đó lớp. Nhưng hãy đợi nếu đó là trường hợp:

   - Tại sao chúng ta cần class  nếu chúng chậm hơn struct ?
    - Struct luôn luôn nhanh hơn struct?

Vâng, có một tình huống mà struct có thể quá tốn kém đối với bạn. Hãy xem xét một trường hợp trong đó cấu trúc của bạn chứa nhiều biến kiểu tham chiếu, ví dụ: String. Vì vậy, chúng tôi có một vấn đề ở đây:

   - Swift luôn lưu trữ kiểu tham chiếu vào heap, vì vậy tất cả các kiểu tham chiếu sẽ được lưu trữ vào heap.
   - Hành vi cấu trúc, nếu chúng ta truyền struct cùng  8–10 phương thức và lớp, điều gì sẽ xảy ra? Vâng, nếu chúng ta nói về hành vi cấu trúc, nó sẽ tạo ra rất nhiều phân bổ heap, vì việc gán struct sẽ tạo ra một bản sao. Nhưng quả táo có thực sự làm được như thế này không? Câu trả lời là không. Ở đây chúng ta đến với một cách tiếp cận** Copy on Write**. *Hãy xem nó là gì. *
        
### Copy On Write:
Trong tình huống mà chúng ta có quá nhiều loại tham chiếu được lưu trữ vào struct,  Apple chỉ tạo một bản sao của struct khi chúng tôi sửa đổi một số thuộc tính của struct. Vì vậy, chúng ta hãy hiểu bằng ví dụ:
![](https://images.viblo.asia/28ea3fe3-6cbc-4d3f-87f8-3b5ba179b1dd.png)



Vì vậy, nếu chúng ta nhìn vào ví dụ trên, chúng ta đã gán một đối tượng Employee cho một đối tượng khác. Vì vậy, bạn có nghĩ rằng có một bản sao được tạo vào bộ nhớ? Chà, câu trả lời là KHÔNG lớn ở đây.

Theo Apple, họ chỉ tạo bản sao nếu chúng tôi sửa đổi một số thuộc tính của đối tượng . Điều này là để tối ưu hóa bộ nhớ bị lãng phí, vì vậy chỉ sao chép tất cả  chỉ khi bất kỳ đối tượng nào đang sửa đổi.

![](https://images.viblo.asia/35de2379-b13c-4dd7-85c4-bdde46b2c248.png)

Hình ảnh trên là từ video WWDC của Apple, nơi họ đề cập rõ ràng rằng nếu chúng ta chỉ gán các biến cấu trúc, nó sẽ tiếp tục trỏ đến cùng một heap cho đến khi bất kỳ sửa đổi nào không được thực hiện.

Vì vậy, quyết định giữa Struct và Class có thể được thực hiện bằng cách xem xét các sự kiện trên. Nếu Struct có nhiều kiểu tham chiếu và chúng ta cần thay đổi nhiều đối tượng thì lớp có thể hữu ích trong trường hợp này. Nhưng một lần nữa nó phụ thuộc vào từng trường hợp.

### More in Depth:

Nếu bạn không có cơ hội xem video WWDC của Apple, thì tôi sẽ thêm một ảnh chụp màn hình cho một ví dụ nữa, cách chúng tôi có thể cải thiện hiệu suất trong ứng dụng của mình. Ý tưởng là tránh tạo nhiều trường hợp kiểu tham chiếu: 

![](https://images.viblo.asia/c99456b5-b43f-4bc2-a8d2-5d2e69e2c4b6.png)

Nếu chúng ta nhìn vào ví dụ trên:

  Có một bản đồ, hình ảnh trong đó khóa là một String. Vì vậy, nếu bạn lấy một ví dụ nếu một chế độ xem tableview mà đối với mỗi ô, chúng ta cần tải xuống HOẶC lấy từ bộ nhớ cache.Vì vậy, trong nhiều  trường hợp,  chúng tôi tiếp tục gọi hàm "makeBalloon" để tiếp tục tạo khóa String . Vì vậy, bây giờ bạn phải biết mất nhiều tài nguyên như thế nào để tạo loại tham chiếu.
 
"***Vì vậy, Apple đề nghị rằng chúng ta nên tránh những trường hợp này càng nhiều càng tốt để cải thiện hiệu suất ứng dụng."***

Ví dụ trên có thể được giải quyết theo cách sau: 

![](https://images.viblo.asia/05bdd6b3-5eea-4a84-8544-d762d1413d0d.png)


"*Thay vì dùng **String** làm khóa, Bây giờ chúng ta có **Attributes**  làm khóa. Vì vậy, việc tạo biến struct không phải là quá trình tốn thời gian. Vì vậy, điều này sẽ giúp cải thiện hiệu suất rất nhiều*."

Đây là phần cuối của bài viết này, vì vậy dựa trên các dữ kiện trên, chúng ta phải luôn rất cẩn thận khi lựa chọn giữa  Kiểu tham chiếu và Kiểu tham trị .

Nguồn :  https://medium.com/macoclock/swift-struct-vs-class-performance-29b7be73d9fd