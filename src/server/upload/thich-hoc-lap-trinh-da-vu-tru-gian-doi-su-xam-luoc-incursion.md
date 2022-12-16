# Định nghĩa
Đa là nhiều, vũ là múa và trụ là cột. Đa vũ trụ có nghĩa là nhiều vũ trụ :D. Sự xâm lược xảy ra khi người trong vũ trụ này sang vũ trụ khác làm series `Đi đâu đó ` thì sự xâm lược sẽ xảy ra và hủy hoại cả 2 vũ trụ. Để không lâm vào tình trạng cả 2 vũ trụ đều trở về với cát bụi thì vũ trụ này phải tiêu diệt vũ trụ kia để duy trì sự tồn tại vũ trụ của mình. 
# Đa vũ trụ giận dỗi trong lập trình
## Viễn cảnh tươi đẹp
Trong lập trình, chúng ta cũng có đa vũ trụ giận dỗi. Trong lập trình, đa vũ trụ không giận dỗi khi nhà ai nấy ở, việc ai náy làm, không liên can gì đến ai. Đây là hình ảnh viễn cảnh tươi đẹp đó được vẽ ra:
Viễn cảnh n với n là số > 0 và <=1:
![image.png](https://images.viblo.asia/2d417d89-353a-4ab0-933a-8e808c1537f7.png)
Viễn cảnh n với n là số > 1 và <=2:
![image.png](https://images.viblo.asia/ca44599f-2b2e-45dc-9089-465baee1f976.png)
So trong 2 viễn cảnh này, mọi thứ điều tốt đẹp vì nhà ai nấy ở việc ai nấy làm. 
## Ai đó xâm lấn
Đa vũ trụ trở nên giận dữ khi người trong vũ trụ này xâm lấn người trong vũ trụ khác. Mà thường theo mạch logic thì người xâm lấn phải tiêu diệt người trong vũ trụ hiện tại thì người xâm lấn này mới tiếp tục tồn tại được. Lí do là một rừng thể có 2 hổ và 1 vũ trụ không thể có 2 người giống nhau. 

Đây là một thí dụ. Trong thí dụ này, người của earth113 đã xâm lấn đến earth119 làm hủy hoại vũ trụ này. Thay vì chào vũ trụ 119 thì do bị xâm lấn nên đã đổi thành chào earth113.
![image.png](https://images.viblo.asia/904ff177-c3e9-48f5-8107-df6bb0babbbc.png)
Kết quả:
![image.png](https://images.viblo.asia/11b35d1a-e978-4210-b00d-7cbd678ec72e.png)
Điều tương tự cũng có thể xảy ra cho viễn cảnh thứ 2:
![image.png](https://images.viblo.asia/ba789b1b-d63e-4064-8f2f-c3ffc7467848.png)
Kết quả:
![image.png](https://images.viblo.asia/55378c5e-c8e1-4659-81c9-e01f6b3ff8f2.png)
Thật nguy hiểm khi sự xâm lấn xảy ra và như các bạn thấy, earth113 đã buộc phải tiêu diệt earth119 để tiếp tục tồn tại. Nguy hiểm hơn nữa, nó sẽ có thể gây ra viễn cảnh nhiều vũ trụ bị tiêu diệt khi người xâm chiếm ghé thăm vũ trụ đó dù với bất kì thân phân, tên tuổi gì. Trong viễn cảnh này, người xâm lược đã đổi tên tuổi khác, kiểu đổi từ Strange sang Weird :D. Thì trong earth115, khi vào trong vũ trụ này, người xâm lược tiếp tục gây ra hiện tượng xâm lấn và earth 113 đã bị tiêu diệt hoàn toàn. Chỉ còn có earth 115, dù có kêu gọi thế nào thì earth 113 cũng không trả lời vì đã bị tiêu diệt.
![image.png](https://images.viblo.asia/d4486b0d-e4e6-4002-82ee-4bd4b331eb42.png)
Kết quả:
![image.png](https://images.viblo.asia/987c239b-bc65-4455-8c3b-e04839620287.png)
Bài học rút ra là sự xâm lấn thật đáng sợ, đừng xâm lấn và cũng đừng để ai xâm lấn.
## Block scope, local variable và global variable
Trong lập trình, chúng ta có những thứ gần như tương tự. Mỗi một vũ trụ sẽ được giới hạn lại và chúng ta hay thường gọi nó là block scope. Tên biến, tên hàm,... sẽ chỉ tồn tại trong một block scope nhất định nào đó. Cùng quay lại với ví dụ này:
![image.png](https://images.viblo.asia/2d417d89-353a-4ab0-933a-8e808c1537f7.png)
Trong ví dụ này, biến greetingMessage đầu tiên chỉ tồn tại trong hàm greetEarth113, đi ra khỏi hàm này thì không ai biết biến greetingMessage và nếu cố tình truy xuất đến biến greetingMessage ở bên ngoài thì chương trình sẽ báo lỗi vì không tìm thấy greetingMessage ở đâu cả. Tương tự cho greetingMessage trong greetEarth119, nó chỉ tồn tại trong greetEarth119 thôi. Những biến này được gọi là local variable. Với sự tồn tại của local variable trong mỗi block scope riêng như vầy, đảm bảo được rằng là chúng ta không có bất kì sự xâm lấn nào cả. greetEarth113 là 1 block scope riêng, và greetEarth119 là một block scope riêng. 
![image.png](https://images.viblo.asia/904ff177-c3e9-48f5-8107-df6bb0babbbc.png)
Xét đến ví dụ này, khi đưa biến greetingMessage ra ngoài như thế này, thì block scope sẽ lớn hơn. Block scope lúc này sẽ không còn nằm trong greetEarth113 hay greetEarth119 nữa mà nó nằm ngang hàng với hai cái này, lúc này chúng ta gọi là global variable vì trong bất kì block scope, nếu không có biến tên greetMessage, thì chúng ta đều sẽ truy cập đến cái greetMessage ở ngoài cùng này. Vì lí do này, nó gây ra sự xâm lấn. Khi gọi đến greetingEarth119, do không có khai báo greetMessage trong block scope của greetEarth119 nên đã tìm đến bên ngoài và vô tình thấy greetMessage ở bên ngoài, lấy vào làm greetingMessage của mình và gây ra tai họa là cả hàm này bị hư. Hoặc nguy hiểm hơn là trường hợp này:
![image.png](https://images.viblo.asia/d4486b0d-e4e6-4002-82ee-4bd4b331eb42.png)
Khi greetEarth15 gán biến vào greetingMessage, nó không tìm thấy greetingMessage trong block scope của nó nên đã lấy greetingMessage bên ngoài và gán vào `Hello earth 115`, điều này giữ lại sự tồn tại cho earth115 nhưng đã hủy diệt sự tồn tại của earth113. 

Do vậy, khi lập trình, chúng ta nên để ý cẩn thận đến block scope, local variable và global variable để tránh xảy ra trường hợp chương trình chúng ta viết ra kết quả không mong muốn vì bị xâm chiếm. Global variable chỉ hợp lí trong trường hợp mà chúng ta sure rằng, cả hai hàm sẽ sử dụng chung một variable này, bất kì thay đổi nào cũng vẫn ra được kết quả mong muốn. Nếu không thì .... đa vũ trụ sẽ giận dỗi.