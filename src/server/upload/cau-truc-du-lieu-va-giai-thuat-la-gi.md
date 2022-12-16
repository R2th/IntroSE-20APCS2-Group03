# Lời giới thiệu
Chào các bạn mình là viên năm cuối chuyên nghành Lập trình máy tính. Mình chỉ vừa chuyển nghành từ khách sạn, một chuyên nghành chả liên quan gì đến CNTT để trở thành một lập trình viên. :smile:  :slightly_smiling_face: Theo lập trình khá muộn những mình cũng đã tự tìm tòi học rất nhiều. Hôm nay mình xin được chia sẻ bài viết với chủ đề "Cấu trúc dữ liệu và giải thuật là gì ?" . Mình nghỉ rằng chủ đề của mình sẽ có khá nhiều bạn nhập môn lập trình tìm kiếm và xem . :smiley_cat:  
Mình cho rằng cấu trúc dữ liệu và giải thuật được xem như là 2 yếu tố quan trọng nhất trong lập trình, đúng như câu nói nổi tiếng của Niklaus Wirth: 
>  Programs (Chương trình) = Data Structures (Cấu trúc dữ liệu) + Algorithms (Giải thuật)

**Vì sao ?**  
Vì nắm vững các cấu trúc dữ liệu và các giải thuật là cơ sở để tiếp cận với việc thiết kế và xây dựng phần mềm cũng như sử dụng các công cụ lập trình hiện đại. :smile:  
#  Giải thuật  
##  1. Giới thiệu về giải thuật  
### a. Định nghĩa
#### Mục tiêu của công nghệ phần mềm là gì ?
Một sản phẩm trước khi được tạo ra nó phải trải qua nhiều bước và công đoạn. Và ngay từ ban đầu người tạo ra một sản phẩm công nghệ sẽ phải có những mục tiêu:
* Tin cậy và chính xác (Reliability – correctness)
* Hữu dụng (utility)
    * Đạt được những gì mong muốn 
    * Đáp ứng đúng thời điểm
* Mềm dẻo (flexibility)
    * Có khả năng mang chuyển được (Portability), tức là có thể dễ dàng mang cài đặt sang một hệ thống khác.
    * Khả năng tương thích
        * Dễ bảo trì
        * Dễ hiểu
        * Có thể sử dụng lại
* Hiệu quả (efficiency)
    * Người lập trình (không mất quá nhiều công sức cho việc lập trình)
    * Máy
    * Thời gian
    * Bộ nhớ  

 Để đạt được các mục tiêu này thì chắc chắn chúng ta phải viết các giải thuật và lưu trữ, tổ chức dữ liệu có thứ tự, có hệ thống để dữ liệu có thể được sử dụng một cách hiệu quả.   
 **Giải thuật**  
 > Giải thuật hay còn gọi là thuật toán - tiếng Anh là Algorithms:  là một tập hợp hữu hạn các chỉ thị để được thực thi theo một thứ tự nào đó để thu được kết quả mong muốn. Nói chung thì giải thuật là độc lập với các ngôn ngữ lập trình, tức là một giải thuật có thể được triển khai trong nhiều ngôn ngữ lập trình khác nhau.  
 
   ![](https://images.viblo.asia/e0f180da-885f-4250-a76d-d451b92e1f6d.png)  
#### Cách viết một giải thuật ?
* Giống như tất cả các bạn mình cũng đã tìm kiếm để có thể trả lời cho câu hỏi này nhưng chả có bài viết nào nói về cách viết một giải thuật cả, bởi vì sẽ không có bất kỳ tiêu chuẩn nào cho trước để viết các giải thuật.  
* Như bạn đã biết, các ngôn ngữ lập trình đều có các vòng lặp (do, for, while) và các lệnh điều khiển luồng (if-else), … Bạn có thể sử dụng những lệnh này để viết một giải thuật.  
* Chúng ta viết các giải thuật theo cách thức là theo từng bước một. Viết giải thuật là một tiến trình và được thực thi sau khi bạn đã định vị rõ ràng vấn đề cần giải quyết. Từ việc định vị vấn đề, chúng ta sẽ thiết kế ra giải pháp để giải quyết vấn đề đó và sau đó là viết giải thuật.   
 => Chính các bạn đã và đang viết ra các giải thuật hằng ngày mà các bạn lại không biết thôi !    :smile:   
#### Lập trình hướng thủ tục và hướng đối tượng 
* **Cả hai cách tiếp cận này đều thực hiện theo phương pháp tinh chỉnh từng bước (stepwise refinement):** 
* **Tiếp cận hướng thủ tục (Function Oriented):** 
    * Tập trung vào các hàm và việc phân rã các hàm
    * Các cấu trúc dữ liệu (ở mức ngôn ngữ lập trình) được định nghĩa sớm.
    * Các cấu trúc dữ liệu khó có thể thay đổi

* **Tiếp cận hướng đối tượng (Object Oriented)**
    * Tập trung vào các đối tượng trừu tượng
    * Các cấu trúc dữ liệu trừu tượng được định nghĩa sớm
    * Cấu trúc dữ liệu chi tiết mức ngôn ngữ chưa được định nghĩa
    * Cấu trúc dữ liệu dễ thay đổi hơn  

 :smiley_cat: 

![](https://images.viblo.asia/b51cf3a5-05c1-440a-b785-d31ad2558aa3.jpg)

#### Ví dụ viết giải thuật: 
**Bài toán**: Lập chương trình nhập vào tọa độ các đỉnh của 1 tam giác bất kỳ trong mặt phẳng. Tính diện tích và chu vi của tam giác đó. In kết quả lên màn hình
Với bài toán trên bạn sẽ lập từng bước như thế nào để giải bài toán? (Hãy dừng lại vài phút thử nghĩ xem nhé.) :smiley: 
##### Tiếp cận hướng thủ tục
* Xây dựng các hàm:
    * Định nghĩa cấu trúc dữ liệu biểu diễn một tam giác
    * Nhập dữ liệu
    * Tính diện tích
    * Tính chu vi
    * Xây dựng hàm main() sử dụng các hàm ở trên
##### Tiếp cận hướng đối tượng
```
class Tamgiac{
   private:
		     float xA, yA, xB,yB, xC, yC;
	public:
		void Nhap();
		float Dientich();
		float Chuvi();
};
```
### b. Phân tích các thuật toán 
#### Tính hiệu quả của thuật toán
1. Thuật toán đơn giản, dễ hiểu 
2. Thuật toán dễ cài đặt
3. Thuật toán cần ít bộ nhớ
4. Thuật toán chạy nhanh  

#####  => Khi cài đặt thuật toán chỉ để sử dụng một số ít lần thì ưu tiên tiêu chí 1 và 2   
##### => Khi cài đặt thuật toán mà sử dụng rất nhiều lần, trong nhiều chương trình khác nhau: sắp xếp, tìm kiếm, đồ thị… thì ưu tiên tiêu chí 3 và 4 
#### Các khía cạnh cần phân tích
* **Bộ nhớ (Space)**
	Xác định tổng dung lượng bộ nhớ cần thiết để lưu trữ toàn bộ dữ liệu đầu vào, trung gian và kết quả đầu ra.  
**Ví dụ:** Sắp xếp một dãy n phần tử.  
	Bộ nhớ cần cho bài toán là: Bộ nhớ lưu biến n, lưu n phần tử của dãy, lưu các biến i, j, tg  (nếu là thuật toán Bubble Sort)
* **Thời gian chạy của thuật toán (Running time)**
## 2. Giả mã (Pseudocode)
Khi nghiên cứu về Cấu trúc dữ liệu và giải thuật các bạn sẻ được nghe về cụm từ "Giả mã", vậy nó là gì?  
Như tên của nó, không phải là mã thực :smile:  dùng để biểu diễn thuật toán, xác định một tập hợp các bước cần được thi hành để có được đáp án bài toán, nó chỉ đưa ra các bước cần làm. Chúng ta phải dùng một ngôn ngữ lập trình khác để viết mã thực cho việc thực thi các bước này.  Các bác chỉ cần nhớ những ý sau: 
> - Mô tả thuật toán ở mức trừu tượng cao  
> - Nhiều cấu trúc hơn ngôn ngữ tự nhiên  
> - Kém chi tiết hơn chương trình  
> - Sử dụng nhiều ký hiệu để mô tả

##### Ví dụ: 
```
Algorithm arrayMax(A,n)
   Input: Mảng A có n số nguyên
   Output: Giá trị lớn nhất của A
    Max <- A[0]
    for i <- 1 to n-1 do
       if A[i] > Max then
            Max <- A[i]
     return Max
```
## 3. Đệ qui (Recursion)
Ở đây mình cho các bạn một vd trước.
#### Một cuộc hành trình 1000 bước và việc thực hiện hành trình bắt đầu ở bước thứ nhất  
Làm thế nào thế nào để hoàn thành cuộc hành trình này?  
Đó là thực hiện bước một bước và tạo ra cuộc hành trình mới có 999 bước, rồi thực hiện bước một bước (tức là bước thứ hai) và tạo ra cuộc hành trình mới có 998 bước,...  
Bạn có thấy rằng khi bạn bước 1000 bước thì bạn chỉ thực hiện bước một bước nhưng lặp đi lặp lại nó một 1000 lần . :smiley:   
#### Hàm (phương thức) đệ qui:
**Định nghĩa:**  
> Đệ quy xảy ra khi người viết các phương thức (hàm) tự gọi (hoặc định nghĩa lại) chính nó.
```
Ví dụ tính giai thừa:
n! = 1· 2· 3· ··· · (n-1)· n
```
![](https://images.viblo.asia/68d0fadb-b09c-4f96-b73e-02d49269e630.png)
```
// hàm đệ qui tính giai thừa 
int  recursiveFactorial(int n) { 
    if  (n  ==  0)  return  1;		// trường hợp cơ sở
    else return  n  *  recursiveFactorial(n- 1);	
}

```
**Ví dụ: Cộng các phần tử của một mảng**   
Cho mảng A có n phần tử  
![](https://images.viblo.asia/3f6bed9a-a2fb-4cca-9970-7a201512886f.png)  
Thử tính xem kết quả  :smile:   
**Ví dụ đơn giản cho đệ qui tuyến tính**
```
Algorithm LinearSum(A, n):
Input: 
  Một mảng A có kiểu nguyên và số nguyên n ≥ 1, A có ít nhất n phần tử
Output: 
   Tổng của n số nguyên đầu tiên trong A
if n = 1 then
  return A[0]
else
  return LinearSum(A, n - 1) + A[n - 1]
```
![](https://images.viblo.asia/f28cba19-1cd0-4ba6-b5dc-78dcd1f79480.png) 

Trên đây một số khái niệm và định nghĩa cơ bản của giải thuật
Có dễ hiểu không các bạn ? Mới đầu tìm hiểu nó mình đã sang chấn tâm lý  :sweat_smile:   
Bài chia sẻ này mình đã tham khảo các tài liệu trên mạng và đúc kết được khi tham gia buổi talk của cô giáo  Vũ Thị Thanh Huyền Trưởng bộ môn CNTT Trường Cao đẳng thực hành FPT Polytechnic ĐN. Mong mọi nguời bỏ qua sai xót và góp ý cho mình cải thiện . :smiley:  mình xin dừng bài viết ở đây! Cảm ơn mọi người đã theo dõi.  :heart:  
***Phần tiếp theo:***
* [Cấu trúc dữ liệu](https://viblo.asia/p/cau-truc-du-lieu-va-giai-thuat-la-gi-tt-vyDZO3AOZwj)