#  1. Giới thiệu
* Như chúng ta đã biết thì việc **Quản lý bộ nhớ** đối với một lập trình viên là rất quan trọng.    
* Mục đích quan trọng của việc quản lý bộ nhớ là cung cấp những cách thức để cấp phát động các ô nhớ cho chương trình khi được yêu cầu và giải phóng các ô nhớ đó khi không cần dùng nữa. Đây là việc rất quan trọng đối với bất kỳ hệ thống máy tính cao cấp nào vì sẽ có nhiều công việc được tiến hành ở mọi thời điểm.   
* Nhiều phương pháp đã được tìm ra để gia tăng hiệu quả của việc quản lý bộ nhớ. Những hệ thống bộ nhớ ảo giúp tách những địa chỉ ô nhớ đang được dùng ra khỏi những địa chỉ thực, từ đó cho phép chia sẻ công việc và gia tăng lượng RAM một cách hiệu quả nhờ đánh dấu địa chỉ hoặc chuyển đến vùng lưu trữ thứ hai. Chất lượng của việc quản lý bộ nhớ ảo có thể có tác dụng lớn đến hiệu năng làm việc của hệ thống nói chung.
#  2. Stack và Heap?
* Bộ nhớ Heap và bộ nhớ Stack bản chất đều cùng là vùng nhớ được tạo ra và lưu trữ trong RAM khi chương trình được thực thi.
* Bộ nhớ Stack được dùng để lưu trữ các biến cục bộ trong hàm, tham số truyền vào... Truy cập vào bộ nhớ này rất nhanh và được thực thi khi chương trình được biên dịch.
* Bộ nhớ Heap được dùng để lưu trữ vùng nhớ cho những biến con trỏ được [cấp phát động](https://www.banhoituidap.com/p/1247/co-nhung-kieu-cap-phat-dong-nao-trong-cc/) bởi các hàm  *malloc - calloc - realloc* (trong C) hoặc từ khóa *new* (trong c++, c#, java,...).

    Ví dụ trong ngôn ngữ lập trình C++:
    ```
    #include <iostream>
    using namespace std;

    void main(){
        int a = 3; //Dữ liệu biến a sẽ được lưu trong bộ nhớ Stack
        int *b = new int[10]; // Dữ liệu của con trỏ b sẽ được lưu trong bộ nhớ Heap
    }
    ```
    Ngoài ra, còn rất nhiều trọng điểm để so sánh sự khác nhau giữa bộ nhớ Heap và bộ nhớ Stack như :
* *Kích thước vùng nhớ*  
Stack: kích thước của bộ nhớ Stack là cố định, tùy thuộc vào từng hệ điều hành, ví dụ hệ điều hành Windows là 1 MB, hệ điều hành Linux là 8 MB (lưu ý là con số có thể khác tùy thuộc vào kiến trúc hệ điều hành của bạn).     
Heap: kích thước của bộ nhớ Heap là không cố định, có thể tăng giảm do đó đáp ứng được nhu cầu lưu trữ dữ liệu của chương trình.
* *Đặc điểm vùng nhớ*   
Stack: vùng nhớ Stack được quản lý bởi hệ điều hành, dữ liệu được lưu trong Stack sẽ tự động hủy khi hàm thực hiện xong công việc của mình.    
Heap: Vùng nhớ Heap được quản lý bởi lập trình viên (trong C hoặc C++), dữ liệu trong Heap sẽ không bị hủy khi hàm thực hiện xong, điều đó có nghĩa bạn phải tự tay hủy vùng nhớ bằng câu lệnh free (trong C), và delete hoặc delete [] (trong C++), nếu không sẽ xảy ra hiện tượng [rò rỉ bộ nhớ](https://www.banhoituidap.com/p/1762/ro-ri-bo-nho-trong-lap-trinh-la-gi/). Ở các ngôn ngữ lập trình bậc cao như .NET, Java, ... đã có chế dọn rác tự động (Garbage Collection), bạn không cần phải tự tay hủy vùng nhớ Heap nữa. 
> Lưu ý:  việc tự động dọn vùng nhớ còn tùy thuộc vào trình biên dịch trung gian.
*  *Vấn đề lỗi xảy ra đối với vùng nhớ*  
Stack: bởi vì bộ nhớ Stack cố định nên nếu chương trình bạn sử dụng quá nhiều bộ nhớ vượt quá khả năng lưu trữ của Stack chắc chắn sẽ xảy ra tình trạng tràn bộ nhớ Stack (Stack overflow), các trường hợp xảy ra như bạn khởi tạo quá nhiều biến cục bộ, hàm đệ quy vô hạn,...  
Ví dụ về tràn bộ nhớ Stack với hàm đệ quy vô hạn:  
    ```
    int foo(int x){
        printf("De quy khong gioi han\n");
        return foo(x);
    }
    ```
    Heap:  Nếu bạn liên tục cấp phát vùng nhớ mà không giải phóng thì sẽ bị lỗi tràn vùng nhớ Heap (Heap overflow).  
Nếu bạn khởi tạo một vùng nhớ quá lớn mà vùng nhớ Heap không thể lưu trữ một lần được sẽ bị lỗi khởi tạo vùng nhớ Heap thất bại.  
Ví dụ trường hợp khởi tạo vùng nhớ Heap quá lớn:
    ```
    int *A = (int *)malloc(18446744073709551615);
    ```
# 3. Vậy khi nào nên sử dụng bộ nhớ Heap và bộ nhớ Stack?
* Bạn sử dụng Stack nếu bạn biết chính xác lượng dữ liệu mà bạn phân bổ trước khi biên dịch và dữ liệu không quá lớn. Ngược lại, bạn nên sử dụng Heap...
> Note: Trong các ứng dụng đa luồng chạy song song (multithreading), mỗi luồng xử lý (thread) sẽ có vùng nhớ Stack riêng của nó, trong khi tất cả các luồng cùng chia sẻ một vùng nhớ Heap. Sử dụng chung vùng nhớ Heap đồng nghĩa với việc phải đồng bộ hóa để tránh tình trạng xảy ra mâu thuẫn giữa các luồng, cho nên cấp phát vùng nhớ Heap phải cài đặt thêm một số cơ chế do đó thực hiện lâu hơn so với cấp phát vùng nhớ Stack. Cấp phát và hủy vùng nhớ Heap liên tục có thể xảy ra tình trạng phân mảnh bộ nhớ, từ phân mảnh bộ nhớ có thể dẫn đến lỗi cấp phát bộ nhớ thất bại như những mô tả ở trên.
# 4. Tham khảo
* Bài viết này mình đã chia sẽ với các bạn một số kiến thức về bộ nhớ mà mình đã tìm hiểu được. Hi vọng bài viết đem lại môt số thông tin giá trị đối với bạn.  
* Các bạn có thể đọc thêm các kiến thức liên quan đến *Quản lý bộ nhớ* tại link sau:
                [Quản lý bộ nhớ trong lập trình](https://vi.wikipedia.org/wiki/Qu%E1%BA%A3n_l%C3%BD_b%E1%BB%99_nh%E1%BB%9B)