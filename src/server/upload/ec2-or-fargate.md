## EC2 or AWS Fargate
Là một trong 2 model chính khi phát triển ứng dụng của bạn trên cloud với containers. Vậy đâu sẽ là sự lựa chọn tốt nhất cho bạn? Hãy cùng tìm hiểu một chút và tự trả lời câu hỏi của mình nhé

Nếu bạn chưa nắm rõ được ý nghĩa và sự khác biệt thì hãy đọc qua ví dụ này nhé:
Khi hệ thống của bạn yêu cầu phải quản lý chặt chẽ các tùy chỉnh ban đầu hoặc muốn mở rộng chúng sau này thì EC2 là lựa chọn phù hợp. Hay đơn giản là bạn cần các tác vụ xử lý liên quan đến GPU(hãy GG nếu b chưa biết), vì hiện tại Fargate không support.
Và nếu không cần những yêu cầu trên bạn hoàn toàn có thể lựa chọn [AWS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html) để phát triển, nó sẽ không thông qua EC2 instance để quản lý các containers của bạn nên bạn sẽ không thể quản lý hay tùy chỉnh.

Trên đây chỉ là yếu tố đầu tiên để bạn lựa chọn xem mình nên tiếp cận viêc triển khai containers trên cloud theo cách nào mà thôi (vì ngoài 2 cách trên còn có khá nhiều cách: Lambda), vậy ta sẽ cùng thêm 1 vài tiêu chí khác cho sự lựa chọn của bạn được tối ưu nhất nhé :))

## Pricing
### EC2
Đương nhiên sẽ được tính dựa vào cái EC2 instance mà bạn chọn rồi đúng không =)). À quên, còn phụ thuộc vào loại instance mà bạn chọn nữa
- On-Demand intances: tính chi phí dựa trên số giờ mà bạn sử dụng các optimize
- Spot instance: Cái nì khá phức tạp. Có thể hiểu là bạn đấu giá thầu cho 1 instance dự phòng (DỰ PHÒNG). Và khi giá thị trường giảm ↓ thì instance dự phòng của bạn cũng bốc hơi theo => b sẽ không mất phí để duy trì cái con instance dự phòng của bạn nữa :))
- Reserve instance: Mua dài hạn với mức giá được discount :)) (giảm giá), cách này thì bạn phải dự trù được các phương án về resource của bạn rồi mới có thể due cái này
Nếu bạn muốn hiểu chi tiết hơn về các loại trên có thể tham khảo [link](https://www.virtana.com/blog/demystifying-terminology-aws-instances/#:~:text=AWS%20Instance%20Pricing)

### AWS Fargate
Phí sẽ được tính dựa trên số lượng CPU cores, memory bao nhiêu GB cho các tác vụ của mỗi container (tính trên s :v). Và bạn sẽ chỉ phải trả cho những gì bạn sử dụng, không phải trả cho lượng dung lượng không được sử dụng của EC2

## Use cases
### Large workload, optimized for price (khối lượng công việc lớn, điều chính giá)
Nếu workload của bạn có nhu cầu phải nhiều CPU cores và GB cho memory, có thể điều chính giá sau này thì EC2 là lựa chọn phù hợp - nhất là reserve instance hay spot (hoặc kết hợp cả 2 luôn đi :v). 
=> Như vậy bạn sẽ phải chịu các khoản phí cho việc maintainance và optimize sau này, và cũng có thể tận dụng những điểm lợi mà reserve instance và spot instance mang lại để tiết kiệm

### Large workload, optimized fow low overhead(khối lượng cv lớn, ưu tiên chi phí thấp)
- Phải quản lý một số lượng lớn cluster của EC2 instance
- Đảm bảo tất cả instance phải được sửa chữa(khi có lỗ hổng), secure và được cài đặt phiên bản Docker mới nhất
- ....

Nếu bạn đã phát ngán với những vấn đề trên thì AWS Fargate sẽ là điểm nhất trong cuộc đời bạn

Như khi có thông báo của AWS về một lỗ hổng nào đó, bạn lo sốt vó lên mạng search blog/stackover/youtube ... để tìm cách khắc phục (vá lỗi). Hãy quê nó đi! và set ignore cho mọi thông báo từ AWS (just kidding!) và để AWS Fargate lo phần lại của thế giới! :satisfied::satisfied::satisfied:

### Small workload, with occasional burts
Khi mà bạn cần demo một ứng dụng nhỏ nhỏ thôi, `ban ngày chạy ban đêm ngủ` hãy chọn Fargate, Fargate sẽ luôn đồng hành cùng bạn. Bạn có thể scale container của bạn xuống mức nhỏ nhất để tiết kiệm chi phí, đương nhiên ban ngày thì phải set up scale up lên nha.

### Tiny workload
Còn gì phù hợp hơn khi bạn chỉ muốn test ứng dụng của bạn chạy trên production nó sẽ ntn.
Hãy lực chọn EC2, EC2 instance mới là chân lý ... chỉ khi bạn cần con server đủ mạnh cho hệ thống của bạn nhé :)

### Batch workloads
Trường hợp bạn có những tasks định kì, cần phải giải quyết một giờ một lần @@ - Fargate chính là chân lý

`Nó sẽ giúp bạn khi bạn cần và ra đi khi bạn không cần`

=> translate vn-to-vn

`AWS Fargate sẽ run container để xử lý task vụ của bạn khi bạn cần và stop khi bạn stop container`


## Conclusion
Trên thực tế có thể sẽ có rất nhiều trường hợp mà bạn cần phải quyết định xem nên rẽ trái hay rẽ phải, trên đây cũng chỉ là một cái bảng chỉ dẫn nhỏ nhỏ(hints) để giúp lựa chọn của bạn thêm phần chính xác!. Cuối cùng hãy vui vẻ học một điều gì đó mới mỗi ngày nhé!

Have a nice weekend!!!

-D-