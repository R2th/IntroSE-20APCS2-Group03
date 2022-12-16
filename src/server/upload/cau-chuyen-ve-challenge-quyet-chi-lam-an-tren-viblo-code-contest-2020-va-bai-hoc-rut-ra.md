**Viblo Code Contest 2020: Step into the Future** là một trong 3 sự kiện diễn ra [kỷ niệm 5 năm ngày ra đời Viblo](https://5years.viblo.asia/). Viblo Code Contest 2020 được diễn ra từ 20h ngày 18/4 đến 16h ngày 19 tháng 4. Như vậy ở thời điểm viết bài này, cuộc thi đang dần đi đến hồi kết. 

Và bài viết này Viblo Team thực hiện với mong muốn gửi một lời xin lỗi đến toàn thể người chơi tham gia Code Contest, cũng như để chia sẻ rõ ràng đến mọi người về một vấn đề mà Viblo Team đã gặp phải với một Challenge trong Contest, Challenge "Quyết chí làm ăn".

*Thực ra Viblo Code Contest lần này cũng còn gặp chút vấn đề với test case ở 2 bài khác, do vấn đề kỹ thuật khi upload đề lên production, nhưng chúng đã được phát hiện và chỉnh sửa kịp thời để không làm ảnh hưởng đến nhiều người. Chỉ có bài "Quyết chí làm ăn" là hơi đặc biệt, và trong bài viết này, chúng tôi xin được chia sẻ những trải nghiệm của mình về Challenge này*

## Nội dung bài toán và cách giải
Nội dung đầy đủ của Challenge "Quyết chí làm ăn" như sau:

> An quyết tâm tu chí làm ăn, và quyết định vay vốn ngân hàng Công Nghiệp Việt Nam. An sử dụng gói vay startup để vay $n$ đồng với lãi suất 1 năm là $x$, tính lãi theo tháng, và thời hạn trả nợ tối đa là 50 năm. An đặt ra quyết tâm sẽ trả dần nợ ngay từ tháng đầu tiên, với số tiền trả hàng tháng là $y$ đồng (nếu $y$ > số nợ hiện tại thì sẽ chỉ trả bằng đúng số nợ). Bạn hãy tính giúp An đến tháng thứ $k$ thì An còn nợ ngân hàng bao nhiêu tiền, và sau bao nhiêu tháng nữa An mới có thể trả hết nợ. Biết rằng An bắt đầu vay từ ngày 1 của tháng mới, bắt đầu trả nợ vào ngày mùng 1 của các tháng tiếp theo, và lãi ngân hàng được cộng dồn vào cuối mỗi tháng.
> ### Input 
> - Dòng thứ 1 gồm các số $n$ $x$ $y$
> - Số nguyên n là số tiền mà An sẽ vay với $1,000,000 < n < 100,000,000,000$
> - Số thực $x$ là phần trăm lãi suất ngân hàng một năm với $0 < x < 20$ 
> - Số nguyên $y$ là số tiền mà An sẽ trả hàng tháng $1,000 < n < 100,000,000,000$
> - Dòng thứ 2 là số nguyên k là số tháng tính từ khi vay, với $0 < k < 600$
> ### Output
> - Dòng thứ 1là số tiền còn nợ sau $k$ tháng (chỉ in ra phần nguyên, bỏ qua phần thập phân nếu có). Nếu ở thời điểm đó An đã trả được hết nợ rồi thì in ra là 0
> - Dòng thứ 2 là số tháng còn phải trả cho nữa cho đến khi hết nợ. Nếu với số tiền trả nợ hàng tháng là $y$ không thể giúp An trả được hết nợ trong khoảng thời hạn 600 tháng thì in ra là -1, còn nếu ở thời điểm đó An đã trả được hết nợ rồi thì in ra là 0

![](https://images.viblo.asia/e5830d2f-120c-49d9-82f8-fee56ca03150.png)

Thực ra đây là một Challenge khá là đơn giản, được đưa vào với mục đích giúp cuộc thi tiếp cận được với nhiều đối tượng người dùng, để cả những bạn không đặt mục tiêu *try hard* cũng có thể "giật điểm". Bài này chỉ thuộc rank D, với số điểm là 180, trên tổng điểm 6,825 của cả cuộc thi (tức chỉ chiếm 2% số điểm). Nó cũng là bài có số điểm thấp ... thứ 3 từ dưới lên, chỉ xếp trên hai bài rank E khác.

Thuật toán để giải Challenge này rất đơn giản. Có thể được miêu tả qua một vài bước như sau:
- Với $n$ là số tiền An còn đang nợ ngân hàng ở thời điểm hiện tại, thì sang đầu tháng sau, số tiền nợ sẽ là $n = (1 + x/100/12) * n - y$, với $x$ là lãi suất ngân hàng, và $y$ là số tiền An trả lại ngân hàng mỗi đầu tháng 
- Do đề bài giới hạn thời gian trả nợ là 600 tháng, nên ta chỉ cần chạy một vòng `for` lặp tối đa 600 lần để biết cuối cùng An có trả hết nợ được hay không, hay ở thời điểm tháng thứ $k$ thì An còn nợ bao nhiêu, hay đến tháng thứ bao nhiêu thì An sẽ trả hết nợ

Cách giải của bài toán này đơn giản đến mức nó chả cần có thuật toán gì đặc biệt, và sau khi generate ra test case, **chúng tôi cũng đã check nhanh trên môi trường staging, thì cả 3 người submit đều thành công**. 

Tuy nhiên, Viblo Team đã không lường trướng được rằng, trong bài toán mà mình nghĩ ra này, có ẩn chứa một **"cái bẫy"** bất ngờ.

## Vấn đề nảy sinh

Do cũng là một bài toán khá dễ dàng, thế nên ngay từ khi Contest bắt đầu, chúng tôi cũng không để ý nhiều đến nó, mà thay vào đó tập trung vào quan sát những bài rank cao để xem có ai làm được không, đề thi có vấn đề gì không, hay ngoài ra cũng phải liên tục check khả năng chịu tải của hệ thống để đáp ứng nhu cầu sử dụng dịch vụ cao bất thường lần này. Mãi đến sáng ngày hôm nay, sau một đêm làm việc căng thẳng, thì một thành viên trong Viblo Team khi check tình hình các bài tập, đã nhận ra rằng có điều bất thường: **Tỉ lệ giải được bài "Quyết chí làm ăn"** thấp một cách khó hiểu. Nó không phải thuộc dạng không có ai làm được, để mà mình nhận ra ngay được vấn đề với đề thi, hay test cases, mà vẫn có nhiều người submit thành công, chỉ là tỉ lệ số người làm được chỉ là khoảng 20%, tức là còn thấp hơn cả những bài rank B, rank A, rank S khó hơn. Cũng vì Challenge này được đặt ở đầu tiên, thế nên đã có rất nhiều người dùng tham gia giải. Thế nhưng số người giải được lại là rất thấp.

Check kỹ hơn tại màn hình quản lý, chúng tôi thấy được đúng là có gì đó không bình thường 

![](https://images.viblo.asia/4c3b38cf-2c4d-4d13-95b2-9a1739ef95d9.png)

Như các bạn thấy ở trên là ảnh chụp score board từ màn hình quản lý của Viblo Code: Trong top 5 người dẫn đầu, thì có đến ... 3 người là không làm được. Chẳng có lẽ nào các bạn có thể dùng rất nhiều thuật toán phức tạp, để qua được bài rank A, rank S, mà lại fail ở bài rank D này.

Thế là chúng tôi quyết định tiếp tục điều tra thêm, bằng cách check lại solution mà các bạn đứng top đầu từng submit. Nhìn chung tất cả đều từng làm qua bài này rồi, chứ không phải là "để dành" đến phút cuối. Và tất cả đều submit vài ba lần, trước khi dừng lại (bởi luật của Code Contest lần này là Challenge sẽ bị trừ dần điểm sau mỗi lần submit sai, cũng như điểm sẽ giảm theo thời gian nữa, nên nhìn chung bài tập này cũng còn lại không nhiều điểm đối với các bạn). Đi sâu vào phân tích, chúng tôi nhận ra rất nhiều lời giải của các bạn có đặc điểm chung, **đó là chỉ pass 52/54 test cases**. Trong khi ngay từ ban đầu, chúng tôi đã không hề có chút ý thức gì về việc mình có test case đặc biệt để "bẫy" người dùng cả.

![](https://images.viblo.asia/d8d963a9-ee87-4476-8e3a-76c2307c3572.png)

Check qua 3 trong 5 bạn đứng đầu bảng xếp hạng, ở thời điểm 7:30 sáng, thì các bạn đều gặp tình trạng trên. Do đó, chúng tôi đã thử phân tích và thử chạy solution của mọi người xem thế nào. Và cuối cùng, đã tìm ra được 2 test case mà mọi người fail.

2 test case đó là:

```
Test case 1
Input
46853397962 15.31 4639648
437

Expected Output:
11841757673991
-1

Test case 2
Input
88798075945 15.47 41453941
360

Expected Output:
8614429058707
-1
```

Nhưng lần lượt chạy qua code của cả 3, thì output của mọi người là `11841757673990` và `8614429058706` tức ... **bị lệnh đi 1 đơn vị so với expected output của hệ thống**. 

Và lúc này, chúng tôi bắt đầu lờ mờ đoán ra được rằng vấn đề có thể nằm ở việc bài toán lần này có các phép nhân chia số thực, dẫn đến xảy ra yếu tố làm tròn chăng.

Nhưng mà nếu mà output của mọi người là sai, thì tại sao lại nhiều người sai giống nhau thế?

Chúng tôi bắt đầu đi sâu vào phân tích từng đoạn code hơn, và so sánh chúng với đoạn code mà chúng tôi đã sử dụng để gen test case.

## "Cạm bẫy" khi thực hiện phép chia với số thực

Sau một hồi vất vả debug, và thử nghiệm nhiều ý tưởng, cuối cùng một thành viên của Viblo Code Team đã phát hiện ra vấn đề. Hãy cùng nhìn lại nó, thông qua phần code dưới đây (Viblo Team xin phép được mượn tạm solution của 1 trong những bạn nằm top đầu đã submit, nhưng bị fail mất 2 test case)

```cpp
#include <iostream>
using namespace std;
int main() {
	double n, y;
	int k;
	double x;
	cin >> n; // tong tien vay
	cin >> x; // lai
	cin >>y; // tien tra hang thang
	cin >> k;
	x /=100;
	x /=12;
//	cout << x;
	for(int i=0; i<k; i++){
		n += n*x;
		n -= y;
		if(n <0) n = 0;
//		cout << n<<endl;
	}
    long long ret = n;
	cout << ret << endl;
    if(n*x >= y){
        cout << -1;
        return 0;
    }
	int i = 0;
    while(n >0 && i + k <= 601){
        i++;
        n += n*x;
		n -= y;
    } 
	if(n > 0) cout << -1;
	else {
        if(i+k > 598) cout << 0;
        else cout << i;
    }
    return 0;
}
```

![](https://images.viblo.asia/7da82b75-9c73-4120-b677-7207e322a63b.png)

Khi thử nghiệm trên Viblo Code, sử dụng chức năng custom input để nhập input tùy ý vào, thì với input 
```
46853397962 15.31 4639648
437
```
hệ thống cho ra output là 
```
11841757673990
-1
```

Tuy nhiên, với một thay đổi nhỏ, thay vì viết `n += n*x`, hay `n = n + n*x`, ta viết lại thành `n *= 1+x` hay `n = n * (1+x)` thì sẽ được kết quả khác.

![](https://images.viblo.asia/c05a6b44-ec26-4497-925f-bd7a33da0eda.png)

**và lần này chúng ta mới nhận được giá trị giống với expected output của hệ thống**.

Check lại thì thấy đúng thật là trong solution gốc mà Viblo Team làm để gen test case cho bài này, chúng tôi đã sử dụng cách viết $n = (1 + x/100/12) * n - y$. Và còn oái ăm thay, các solution mà các bạn khác trong team viết để test trên staging cũng đều viết theo cách này, nên đã không ai nhận ra được vấn đề từ trước.

Vấn đề làm tròn khi nhân chia số thực thì vốn không chỉ xuất hiện ở C++ mà có lẽ các ngôn ngữ khác cũng gặp phải. Ít nhất, khi mà chúng tôi check lại solution bằng **Python** của mình, thì cũng đã tái hiện được vấn đề đó. Bạn cũng có thể thử bằng cách đơn giản là mở terminal python lên, và chạy thì sẽ thấy với một phép tính đơn giản cho các thông số đầu vào là `46853397962 15.31 4639648` thì sẽ sai khác như sau:

![](https://images.viblo.asia/a5c8bb4c-c2db-494b-9668-f9b9f93ae720.png)

Mặc dù sự khác biệt là rất nhỏ, nhưng khi chạy vài trăm vòng `for` để thực hiện phép tính theo công thức như trên, thì sự sai lệch giữa 2 cách viết càng ngày càng lớn hơn, cuối cùng mức chênh lệch lên đến hàng đơn vị, do đó nó đã gây ra sự khác biệt giữa các solution viết bởi 2 cách khác nhau.

## Bài học rút ra

Thực tế, cũng rất khó khẳng định được đâu mới là kết quả đúng cuối cùng của bài toán này. Hơn nữa, cách làm của những bạn pass được Challenge này, với những bạn "**fail 2 test cases**" thì nó cũng không phải đến từ sự khác biệt của thuật toán, hay hiệu quả của việc tối ưu thuật toán, mà ở bài toán lần này, nó chỉ là đến từ 2 cách viết cho một vấn đề: $n = n + n * x$ và $n = n * (1 + x)$.

Và cũng chính vì thế, Viblo Code Team đã bàn bạc và đi đến thống nhất là sẽ check lại solution bài **Quyết chí làm ăn** của top các bạn đứng đầu mà có 2 test case bị fail. **Viblo Code Team sẽ tiến hành remove 2 test case "đặc biệt" được đề cập ở trên, rồi cho chạy lại các solution của các bạn top đầu đã submit, và sẽ tiến hành update lại điểm số cho các bạn theo thời điểm mà mọi người có solution đúng đầu tiên. Tức là nếu lần đầu các bạn submit bị fail 2 test case ở trên, thì các bạn hoàn toàn có khả năng sẽ nhận lại đủ được 180 điểm cho bài này**.

Đây cũng là một bài học kinh nghiệm dành cho đội ngũ Viblo Code Team, để có thể ra những đề bài hợp lý hơn, trong những Contest sau này. Và hy vọng nó cũng sẽ cung cấp cho các bạn một chút kiến thức vui vẻ và bổ ích. ;)

Một lần nữa, xin chân thành lỗi các bạn đã bị ảnh hưởng bởi Challenge này. Hy vọng tất cả mọi người đều đã có được những giờ phút học tập vui vẻ với Viblo Code Contest. Và hy vọng mọi người sẽ tiếp tục dõi theo và ủng hộ Viblo Code, cũng như các dịch vụ khác của Viblo trong thời gian tới. Trước mắt là [Viblo CTF Contest](https://ctf.viblo.asia/) sẽ diễn ra vào cuối tuần sau ;)