*Trong quá trình dịch mình gặp được rất nhiều cụm từ merge code, merge branch hay rebase code. Quá hỗn loạn với các khái niệm nên bài report này mình sẽ tìm hiểu về sự khác nhau giữa rebase code và merge code. Bài viết này mình sẽ phân tích vấn đề đứng trên quan điểm của một comtor.*
# Chúng là gì?
Trước hết chúng ta phải hiểu đại khái 2 khái niệm Rebase và Merge này nó đang muốn nói về vấn đề gì. Giả sử chúng ta có 2 thanh tre với nhiều đốt tre , khi chúng ta muốn chập 2 thanh tre này thành một khối, thì ta sẽ nối các mấu đốt tre lại với nhau bằng nhiều cách thức. Thì rebase và merge ở đây là 2 cách thức dùng để nối các mấu đốt tre. Hay nói một cách chuyên môn thì chúng dùng để tích hợp các thay đổi từ các branches vào 1 base branch ( có thể hiểu là master ) . Sau khi dùng  2 cách thức này để nối , chúng ta sẽ đều có được một khối liên kết chặt chẽ giữa các thanh tre, nhưng hình dạng của chúng sẽ hoàn toàn khác nhau. 

# Merge là gì?
Bài toán đặt ra là chúng ta có 2 thanh tre làm sao để chập thành một khối. Với merge chúng ta sẽ phải thực hiện bằng cách chập 2 đầu mấu đốt lại theo hình chữ V và buộc vào với nhau. Ban đầu 2 thanh tre sẽ có những đầu mấu đốt riêng của chúng, sau khi chập lại kèm với keo hoặc dây buộc chúng sẽ có 1 đầu mấu mới là đầu mấu chung .
Hay nói một cách chuyên môn thì khi dùng merge để tích hợp 2 nhánh với nhau, câu lệnh merge sẽ lấy snapshot mới nhất của mỗi branch (thanh tre ) rồi combine với nhau để tạo ra một merge commit ( mỗi commit chúng ta có thể hiểu là một mấu đốt tre ) 
![](https://images.viblo.asia/ba10b9cf-33de-48b4-b50d-ac8c34afae35.PNG)

# Rebase là gì?
Nếu như ở merge chúng ta tiến hành nối 2 thanh tre theo hình chữ V thì ở rebase chúng ta sẽ tiến hành nối các thanh tre lại thành một thanh tre có nhiều đốt hơn . chúng ta sẽ đặt các thanh tre thành một đường thẳng ngay ngắn , và gắn chúng ta sao cho không tạo ra them mấu đốt nào nữa . 
Nói một cách chuyên môn thì khi tích hợp vào nhánh master , nó sẽ copy tất cả các changes từ nhánh feature đặt lên đầu của master . Có thể hiểu là nó lấy tất cả các commit từ lúc chúng ta tách nhánh feature từ master rồi đem từng commit đó đặt lên master theo đúng thứ tự
![](https://images.viblo.asia/5fe2edb1-c4fc-489f-bdf4-78c0d8a0a921.PNG)

# Rebase hay merge anh nào ngon hơn?
Chắc chắn mỗi một cách thức sẽ có điểm mạnh và điểm tiện lợi riêng của nó, Các bạn hãy hình dung khi chúng ta có một thanh tre dài ( tạm gọi là master ) nếu chúng ta dùng cách thức merge để nối các thanh tre ngắn khác ( feature ) vào thì nó sẽ gần giống với hình xương cá, hay nói cách khác dù có 5 người cùng gắn các thanh tre cũng sẽ cứ theo tuần tự gắn và sẽ có các mấu đốt mới. Khi đó history của repo ( thanh tre dài ) sẽ không bị phá mất. Ngược lại nếu khi chúng ta dùng cách thức rebase thì hình dáng thanh tre dài sẽ thanh thoát hơn , sẽ chỉ là một đường thẳng đẹp đẽ nhưng nếu chúng ta không đặt đúng thứ tự các thanh tre ngắn vào thanh dài thì sẽ dẫn đến fail bất cứ lúc nào. 

**Vậy khi nào cần dùng rebase** : Khi muốn một history ( thanh tre dài ) rõ ràng dễ nhìn, hay còn gọi là linear history và tránh được trường có thêm các merge commit 

**Vậy khi nào cần dùng merge** : Nếu muốn lưu vết hay bảo toàn được history của repo ( Vd như xem được commit này từ branch nào ) và tránh đươc trường hợp rewrite lại tất cả các changes 

# Tổng kết:
Túm váy lại thì việc lựa chọn sử dụng cách thức nào sẽ còn tùy vào project , git flow của project đó. Bài viết này mình chia sẻ dựa trên quan điểm của một comtor, mặc dù không thể hiểu sâu về git nhưng nắm được cơ chế hay bản chất vấn đề sẽ dễ dàng trong công việc hơn.

Nguồn tham khảo: [Merge và Rebase ???](https://medium.com/@lvhan/merge-v%C3%A0-rebase-e72236c40368)