- Part 1 http://www.giaosucan.com/2019/03/toi-phong-van-o-sillicon-valley-nhu-nao.html
- Part 2 http://www.giaosucan.com/2019/03/phong-van-o-sillicon-phan-2-happy-ending.html
- Giaosucan's blog chia sẻ kiến thức theo cách bá đạo http://www.giaosucan.com/

Trước đây, mình hay đi phỏng vấn ứng viên, làm đề bài test để kiểm tra năng lực ứng viên. Nhưng giờ cũng đến lúc phải lên thớt, trở thành candidate, để người khác check hàng. Tuy nhiên, lần này là người check là một công ty ở Sillicon Valley.

Khách hàng là một unicorn (công ty vốn hóa tỉ đô) ở Sillicon Valley, vị trí cần tuyển là Back End engineer, ngôn ngữ lập trình là Java. Được biết phỏng vấn sẽ gồm 3 vòng. Vòng 1 làm bài Test, vòng 2 kiểm tra communication skill, khả năng leader ship, hiểu biết về process Scrum, vòng 3 check kiến thức kĩ thuật, khả năng design, problem solving.
Vì đã có 1 vài thanh niên tạch luôn từ vòng gửi xe, nên mình quyết định xin được thử, coi như là một cơ hội học hỏi và thử thách bản thân.
Mấy năm roài không còn sờ tới Java, chủ yếu làm mảng DevOps, Blockchain toàn code python, nodeJS là chính. Cái cert Java professional thi xong vứt xó, nên mấy ngày phải giở sách ra ôn lại, y chang như thi đại học

**Vòng 1 làm bài Test**

![](https://images.viblo.asia/2a8626e9-3109-4d37-b7b2-31a0a108c473.jpg)

Bài Test là một list câu hỏi về lập trình Java, SQL, thuật toán yêu cầu trả lời dưới hình thức tự luận ví dụ như

* Trình bày sự khác nhau giữa StringBuilder và StringBuffer
* Nếu như table trong database mà sử dụng nhiều indexes quá thì sao, chú xử lý như thế nào
* Xử lý Garbage Collector trong Java
* Vấn đề collission trong Java Object

Thực tế thì mình nhận thấy bài Test cũng không đến nỗi quá khó, nếu như có kiến thức tương đối vững về Java, SQL database thì có thể vượt qua. Ví dụ như StringBuilder và StringBuffer thì sự khác biệt rõ nhất là StringBuffer là thread safe và synchronized còn StringBuilder thì không
Anyway, vòng gửi xe qua được

**Vòng 2 phỏng vấn leadership**

![](https://images.viblo.asia/3f70ba63-ee01-4ed3-9ca5-e0142708b8ce.png)

Vòng 2 mục đích chính là muốn kiểm tra khả năng communication, leadership, biết cách xử lý tình huống. Hình thức phỏng vấn online qua Google Hangout. Uầy, từ xưa tới giờ toàn coding, có bao giờ làm quản lý lãnh đạo đâu, nhưng thôi cố tra GG thuộc sẵn mấy câu interview rồi tùy cơ ứng biến vậy
Người phỏng vấn là một bác người Anh, senior manager, qua giao tiếp thì nhận thấy bác này ko phải chuyên về tech mà thiên về quản lý hơn. Rất may mắn là người Anh, nên phát âm khá chuẩn, không gặp khó khăn gì trong vấn đề nghe hiểu
Cố thuộc sẵn mấy câu interview trong bộ đề nhưng đến lúc interview chả trúng cái nào, được duy nhất trúng tủ là các câu hỏi về Scrum process, Extreme programming (mô tả quy trình làm việc, các thuật ngữ trong Scrum như restros, grooming…) các câu hỏi khá ngẫu nhiên kiểu như

* Nếu ý kiến của bạn bị team phản đối thì bạn làm thế nào?
* Nếu phải tuyển dụng 1 ứng viên cho team, bạn cho tiêu chí nào?
* Dự án đang trong critical situation, xử lý ra sao?

Cơ bản những câu hỏi này đòi hỏi khả năng chém gió hươu vượn, ứng biến nhanh của ứng viên, nếu trả lời ngập ngừng, luống cuống là xác định tạch.
Cũng may do đã chinh chiến nhiều năm lại cũng gặp nhiều tính huống tương tự nên basic thì cũng pass nổi.

**Vòng 3 phỏng vấn kĩ thuật**


![](https://images.viblo.asia/84607ede-52dc-4832-a62c-cf87a2e3eb0f.jpg)

Đây là vòng quyết định. Trong vòng này, ứng viên sẽ phải trả lời các câu hỏi kiếm tra kiến thức kĩ thuật, viết code lập trình để xử lý thuật toán nào đó trên Google Doc. Người phỏng vấn sẽ quan sát cách ứng viên viết code để đánh giá năng lực. Nó cũng tương tự như kiểu viết code trên bảng trắng, run và debug bằng niềm tin.
Người phỏng vấn là 1 bác Director of Software engineering người Ấn, nói tiếng Anh dập như máy khâu, giọng lơ lớ, nghe đúng là khốn khổ, xem CV LinkedIn của bác thì tí ngất, với trên 20 năm kinh nghiệm lâp trình đa luồng, chuyên về machine learning, extensive experience working with concurrency primitives such as atomic reference, read write lock, countdownlatch. Bác còn tự build một mạng xã hội khoảng mấy trăm nghìn user truy cập mỗi ngày. 
Xem thông tin biết lần này là gặp trùm cuối Thanos rồi, nhưng thôi đành nhắm mắt đưa trym vậy.
Sau màn chào hỏi, giới thiệu bản thân xong thì bắt đâu nhà zô code
Viết code mô tả singleton class 
Đù mừng như bắt được vàng, món này code suốt rồi. Thế rồi mồm chém tay code, kinh nghiệm là tuyệt đối không được im lặng ngồi code, cần trình bày ý tưởng trước rồi mới code, code đến line nào trình bày line đấy

```
class Singleton 
{ 
    private static Singleton instance= null; 
    private Singleton() 
   {
    } 
    
    public static Singleton getInstance() 
    { 
        if (instance == null) 
            instance = new Singleton();

        return instance; 
    } 
}
```

Cụ xem xong cười “Cái này đíu phải singleton”. À cụ muốn hỏi đến chỗ đa luồng, code này single thread thì OK, gặp multi-thread thì tạch ok a để e sửa code tí
Có 2 cách sửa thêm synchronized vào method
```

public static synchronized Singleton getInstance(){
    if(instance == null){
        instance = new Singleton ();
    }
    return instance;
}

Hoặc kiểu lazy như dưới

// Lazy Initialization (If required then only)
public static Singleton getInstance() {
    if (instance == null) {
        // Thread Safe. Might be costly operation in some case
        synchronized (Singleton.class) {
            if (instance == null) {
                instance = new Singleton();
            }
        }
    }
    return instance;
}
```
Roài, OK, sau một vài câu hỏi như bỏ synchronized ở method với block code có gì khác nhau… thêm cụ chốt 
Có trường hợp nào mà Singleton lại tạo ra nhiều instance không?
Dạ không anh
Có đấy, giải thích vì sao có đi
Móa, căng roài, confuse quá, mục đính Singleton là để tạo ra 1 object, sao lại ra lắm instance được. Sau một hồi cắn bật máu môi đành chốt
Nếu mà tạo ra nhiều instance thì không còn là Singleton nữa ạ. Thật sự là không có
Cụ phán: Thôi next sang câu thứ 2, viết code xử lý thuật toán
Bài 1:
Viết code đảo ngược mảng array kí tự, yêu cầu phải optimize nhất, cấm chú chơi kiểu for loop cả mảng
Dạ, có thể dùng thuật toán đổi chỗ phần tử đầu với cuối là đaỏ ngược được. 
Sau đó là lạch cạch lọc cọc một lúc thì xong

```
char[] reverse(char[] letters){
char temp;
int left = 0; 
int right = letters.length-1;
while (left < right) {
    temp = letters[left];
    letters[left] = letters[right];
    letters[right] = temp;
    left++;
    right--;
}
return letters;             
}`
```
Độ phức tạp thuật toán là bao nhiêu, chơi for-loop cả mảng thì thế nào?
Dạ O(n/2) vì em duyệt có nửa mảng, còn cái kia duyệt cả mảng nên O(n)
Rồi sang bài 2
Cho số dương integer n, tìm số cách để để chia n thành 5 số dương nhỏ hơn sao cho cộng lại thì vẫn là n
Ví dụ n = 5 thì output 1 vì chỉ có 1 case (1, 1, 1, 1, 1)

Móa, mấy cái này cho mấy chú sinh viên thi CodeWar làm thì thần sầu roài, mình già đầu óc chậm chạp rồi
Sau một hồi lọ mọ thì cũng nghĩ ra cách kiểu brute force, 5 vòng lặp duyệt từng thứ tự để ra kết quả, chắc có nhiều cách hay hơn nhưng bí quá roài. Thực tế trong tình huống chỉ có vài phút để suy nghĩ giải pháp và viết code, cộng thêm 1 ông còn đang soi code của mình, thì chọn quick dirty solutions mà vẫn work còn hơn là ko có solutions nào

```
int findNumWays(int n) {
    int count = 0;
    int i, j, k, l,m = 0;
    for (i = 1; i < n; i++)  
        for (j = i; j < n; j++)  
            for (k = j; k < n; k++)  
                for (l = k; l < n; l++) 
                   for (m = l; m < n; m++)  
                        if (i + j + k + l + m == n)  
                            count++;
    return count;
  }
```
5 vòng lặp nên độ phức tạp là O(n^5)
Còn cách nào optimize hơn ko ku, chú lặp nhiều quá
Lạy anh, em tắc rồi ạ
OK, thôi xong phần coding, đến phần câu hỏi Design
Anh có hệ thống mà lượng read data chiếm 99% còn write data chiếm 1% thì chọn là kiểu dữ liệu nào?
Em cho rằng dùng ArrayList là ổn, vì ArrayList sử dụng index, tốc độ truy cập nhanh hơn nhưng loại LinkedList chỉ phù hợp write data
Ờ , thế hệ thống này dùng Multi-thread thì sao ku?
Thế chơi Vector vì nó thread safed
Vector có throughtput ko?
Ôi dek mịa, throughtput là gì ta, chưa nghe bao giờ, móa có cái GG ở đây thì ngon biết mấy.
Tắc tịt
Thế em xài HashTable, vì HashTable là thread-safed.
Anh muốn dùng List cơ
Khóc ra tiếng mán, lại tịt, giờ chắc mỗi anh GG mới biết
![](https://images.viblo.asia/5d18edaf-a927-4b7c-bd8e-8124127d32db.png)
Rồi, câu cuối cùng, anh có service expose API cho client, nếu anh dùng GET api call service qua HTTPS chú thấy có secure ko?

Ờ may, câu này thì biết, theo em thì data parameters trong GET URL sẽ được encrypted trong HTTPs nên nếu hacker có capture được data thì cũng ko view được. Tuy nhiên, một số server có thể lưu log có chứa data parameters trong GET request trên dạng plan-text, nên khuyến cáo là không nên dùng GET với sensitive data.
Roài , kết thúc phỏng vấn, chú cần hỏi gì hỏi nhanh a còn đi ngủ
Cuộc phỏng vấn kết thúc 
Ngày sau nhận kết quả phỏng vấn: Not Good, tạch
alt text

**Kết luận**

Sau cuộc phỏng vấn, mình mới nhận thấy, kiến thức thực sự là bao la, trình độ của mình còn quá non kém so với kĩ sư của Sillicon Valley. Ngay cả một ngôn ngữ lập trình như Java, gần như các thanh niên dev Vietnam ai cũng biết, nhưng để hiểu hết, hiểu sâu là gần như là impossible. Nhất là kiểu làm việc outsourcing công nghệ gì cũng mó một tí, chưa vững đã phải sang cái khác.

**(Còn tiếp)**