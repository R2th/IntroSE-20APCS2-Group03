# Đặt Vấn Đề
Như các bạn đã biết thì điều phối tiến trình là một vấn đề quan trọng trong quá trình xử lý các tiến trình làm
việc trên máy tính. Các thuật toán để điều phối tiến trình phải đảm bảo các tiêu chuẩn như:
1. Sử dụng CPU (Lớn nhất)
    * Mục đích của điều độ là làm CPU hoạt động nhiều nhất có thể.
    * Độ sử dụng CPU thay đổi từ 40%(Hệ thống tải nhẹ) đến 90%(Hệ thống tải nặng).
2. Thông lượng(Lớn nhất)
    * Số lượng tiến trình hoàn thành trong một đơn vị thời gian.
        * Các tiến trình dài: 1 tiến trình/giờ
        * Các tiến trình ngắn: 10 tiến trình/giây
3. Thời gian hoàn thành (Nhỏ nhất)
* Khoảng thời gian từ thời điểm gửi đến hệ thống tới khi quá trình hoàn thành.
    * Thời gian chờ đợi để đưa vào bộ nhớ
    * Thời gian chờ đợi trong hàng đợi sẵn sàng
    * Thời gian chờ đợi trong hàng đợi thiết bị
    * Thời gian thực hiện thực tế
4. Thời gian chờ đợi(Nhỏ nhất)
    * Tổng thời gian chờ đợi trong hàng đợi sẵn sàng (Giải thuật điều độ CPU không ảnh hưởng tới các tiến
    trình đang thực hiện hay đang đợi thiết bị vào ra)
5. Thời gian đáp ứng(Nhỏ nhất)
    * Từ lúc gửi câu hỏi cho đến khi câu trả lời đầu tiên được tạo ra
        * Tiến trình có thể tạo ra kết quả từng phần.
        * Tiến trình vẫn tiếp tục tính toán kết quả mới trong khi kết quả cũ vẫn gửi tới người dùng.
 <br>
Trong bài này, mình xin đưa ra 5 ví dụ về điều phối tiến trình, trong mỗi cái mình chỉ ra rõ:
    * Nguồn gốc.
    * Vấn đề đặt ra.
    * Thuật toán.

# Một số ví dụ về điều phối tiến trình
## 1. Đường Ray ở Andes (Railways in the Andes)
### Vấn đề thực tiễn
Một dãy núi cao ở Andes, ở đó có 2 tuyến đường sắt tròn. Một đường ở Peru, một cái khác ở Bolivia. Họ cùng dùng
chung , một phần của đường ray, nơi mà các đường băng qua một đèo núi nằm trên biên giới quốc tế(Gần hồ Titicaca).
<br>
![](https://images.viblo.asia/3b447e92-5424-4c50-9fff-a76d7fef3e8c.png)
<br>
 Thật không may mắn, các đoàn tàu của Peru và Bolivian thỉnh thoảng va chạm nhau khi đồng thời đi vào phần
chung của đường ray (đèo núi). Vấn đề là những người lái xe của cả hai tàu đều bị mù và điếc, do đó họ không thể
nhìn thấy hay nghe thấy nhau. <br>
Hai người lái tàu đã thống nhất về phương pháp ngăn ngừa va chạm sau đây. Họ đặt một bát lớn ở lối vào đèo.
Trước khi vượt qua, người lái xe phải dừng tàu, đi qua bát, và chạm vào nó để thấy nó có chứa một tảng đá hay
không. Nếu bát trống, người lái xe phải tìm một hòn đá và bỏ nó vào bát, cho biết chuyến tàu của mình đang đi qua;
Một khi đoàn tàu của ông đã vượt qua được, ông phải đi bộ trở lại bát và loại bỏ đá của ông, để báo hiệu rằng chỗ
dùng chung đó không có ai sử dụng nữa. Cuối cùng, anh ta quay trở lại tàu và tiếp tục lái xe. <br>
Nếu người lái xe kia lái xe đến đèo tìm thấy trong bát có một hòn đá thì người đó phải rời chỗ chung đường ray
đó để tránh va chạm. Do vậy anh ta phải cho đoàn tài nghỉ ngơi và kiểm tra lại cái tô cho đến khi thấy nó trống rỗng.
Sau đó anh ta bỏ 1 hòn đá vào tô và cho tàu anh ta vào đèo. Một sinh viên thông minh đến từ đại học LaPaz (Bolivia)
cho rằng cái cách này có thể làm cho chặn đường tàu mãi mãi. Nhưng người lái xe ở Bolivia chỉ cười và nói rằng điều
đó không thể đúng bởi vì nó không bao giờ xảy ra.<br>
Thật không may, vào một ngày cả 2 đàu đâm vào nhau.<br>
Sau vụ tai nạn. Sinh viên đó được gọi đến để tư vấn để đảm bảo răng sẽ không xảy ra tai nạn nữa. Anh ấy nói rằng
cái bát đã được sử dụng sai cách. Người lái xe ở Bolivia phải đợi tại lối vào đèo cho đến khi cái bát trống, lái xe qua
đèo và đi bộ trở lại để đặt một tảng đá vào bát. Người lái xe người Peru phải chờ đến khi bát có chứa đá, lái xe qua
đèo và đi bộ để lấy tảng đá khỏi bát. Chắc chắn, phương pháp của ông ngăn ngừa tai nạn. Trước khi sắp xếp này, tàu
của Peru chạy hai lần một ngày và tàu Bolivian chạy mỗi ngày một lần. Người Peru rất không hài lòng với cách sắp
xếp mới.<br>
Do đó, sinh viên này được kêu gọi trở lại và được yêu cầu tìm giải pháp khác để ngăn ngừa được tai nạn và tránh
được vấn đề phương pháp trước đây. Sau một thời gian suy nghĩ, sinh viên này đã đề nghị răng nên sử dụng 2 cái bát,
một cho mỗi người lái tàu, và cách thức hoạt động như sau: Khi lái xe đến chỗ vào đầu tiên anh ta thả hòn đá vào tô
của mình sau đó kiểm tra cái tô khác để xem nó có hòn đá nào không. Nếu nó trống thì anh ta lái xe của mình thông
qua đường chuyền. Sau đó dừng lại và đi trở lại để loại bỏ hòn đá của mình. Nhưng nếu anh ta tìm thấy một hòn đá
trong bát khác thì anh ta trở lại bát của mình và lấy đá của mình ra.Tiếp theo, anh ta nghỉ ngơi và đợi cho đến lúc
cho cái bát kia trống rỗng và bỏ hòn đá vào tô của mình... Phương pháp này hoạt động tốt cho đến cuối tháng 5, khi
hai chuyến tàu đồng thời bị chặn tại cửa khẩu.<br>
### Phân tích vấn đề.
Sau đây chúng ta cùng tìm hiểu thuật toán của bài toán này sao cho nó hiệu quả nhất. Thực ra nếu để ý kĩ thì bạn thấy đây là một bài toán có dạng như producer- consumer. Nhưng bây giờ chúng ta sẽ làm nó với signals và waits.<br>
BINARYSEMAPHONE                       mutex=1 <br>
COUNTINSEMAPHORE                   empty = n;                full=0;<br>
Ta xem mutex là cái đèn báo, và ở đây ta quy về bài toán producer – consumer. Do đó ta có thuật toán sau đây:<br>
    Procedure: <br>
    ![](https://images.viblo.asia/aac5e8c2-9a5c-47c0-aa2e-f7837d35d414.png)
    <br>
    Customer:
    <br>
    ![](https://images.viblo.asia/50bd0135-95b9-4b71-b207-4d3048d0e387.png)

## 2. Vấn đề của người hút thuốc lá(Cigarette Smoker’s Problem)
### Vấn đề thực tiễn
Lần đầu tiên được trình bày bởi Suhas Patil in 1971.<br>
Có 4 người trong vấn đề này: 3 người hút thuốc lá và một người đại lý. .Mỗi người hút thuốc lá sẽ trải qua 2 quá
trình là làm thuốc lá và hút thuốc. Để làm ra một điếu thuốc thì yêu cầu phải có thuốc lá(tobacco) , giấy và diêm.Mỗi
người hút thuốc lá có vô hạn 1 trong 3 cái: Thuốc lá, hoặc giấy hoặc diêm . Người đại lý có một nguồn vô tận của cả
ba. Người đại lý sẽ chọn ngẫu nhiên 2 trong 3 món đồ đó đặt lên trên bàn. Còn người hút thuốc có thể lấy 2 cái trên
bàn đó , với điều kiện là 2 cái đó khác với cái mình đang có để làm ra 1 điếu thuốc và sau đó hút.<br>
Ở đây thì người đại lý bán thuốc đại diện cho hệ điều hành, còn người hút thuốc đại diện cho tiến trình.
Người bán thuốc muốn phân bố các nguồn nhân lực cần thiết cho các quá trình và tránh trường hợp rơi vào bế
tắc.<br>
![](https://images.viblo.asia/6e810e0e-7123-4866-9154-1ca1fd53f1f9.png)
<br>
Ví dụ: Người A có giấy, người B có thuốc lá, và người C có diêm . Nếu người đại lý đưa ra giấy và thuốc(tobacco) thì
người A và B sẽ không tạo được thuốc lá do thiếu diêm.
### Giải pháp (Solution)
Sau đây là một giải pháp khá dễ dàng . Cả 3 người sẽ làm được điếu thuốc lá và hút nó. Nếu người nào không làm
được điếu thuốc thì sẽ ngồi nghỉ 1 chỗ nào đó (Sleep) . Khi người đại lý đặt hai vật lên trên bàn, và sẽ kêu (Wake up)
người tương ứng có thể tạo ra thuốc để hút, sau đó thì đi ngồi nghỉ tiếp. Sau đây sẽ là thuật toán giải quyết vấn đề này.
##### Thuật toán cho người đại lý:
![](https://images.viblo.asia/0279767b-36eb-4e4f-8f35-84a587876cff.png)
##### Thuật toán của người hút thuốc:
![](https://images.viblo.asia/7ee52c0c-9fe7-45ea-8a06-3ff936180a3f.png)
<br>
Người hút thuốc ngay lập tức ngủ, khi người đại lý đưa 2 vật lên bàn, sau đó đại lý sẽ đánh thức người hút thuốc
tương ứng. Người hút thuốc sau đó sẽ lấy đồ vật và đánh thức các đại lý. Trong khi người hút thuốc lá đang hút,
người đại lý có thể đaẹt hai vật lên bàn và đánh thức một người khác (Nếu vật người đó có không giống với 2 đồ vật
trên bàn). Người đại lý ngủ ngay lập tức sau khi đặt các vật ra. Giải thuật này giống với vấn đề Producer-Consumer
.Ngoại trừ Producer chỉ có thể sản xuất 1 mặt hàng (Mặc dù lựa chọn 3 mặt hàng) cùng 1 lúc.
## 3. Ông già Noel (Bài toán Santa claus)
Đây là một vấn đề được lấy từ sách Hệ điều hành của William. Nhưng được cho là của ông John Trono, ở trường
đại học Michael ở Vermont
### 1. Vấn đề thực tiễn
Santa Claus đang ngủ ở trong cửa hàng của ông ấy ở Bắc Cực, ông ấy chỉ có thể được đánh thức bởi:
<br>
1. Cả 9 con tuần lộc trở về từ kì nghỉ hè ở Thái Bình Dương
2. 3 trong số các chú lùn gặp khó khăn trong việc làm đồ chơi đến nhờ ông già Noel giúp.<br>
Một số lưu ý trong bài toán này:
    * Khi 3 chú lùn đang nhờ ông già Noel giúp, bất kì chú lùn nào đến gặp ông già Noel phải đợi những chú lùn kia trở về.
    * Nếu ông già Noel thức dậy nhìn thấy 3 chú lùn ở ngoài cửa cùng với con tuần lộc cuối cùng trở về từ vùng nhiệt
    đới thì những chú lùn có thể phải đợi đến sau giáng sinh, bởi vì việc quan trọng lúc này là chuẩn bị các xe trượt
    tuyết.
    * Giả thiết rằng các con Tuần Lộc không muốn rời khỏi vùng nhiệt đới, muốn ở lại đó đến giây phút cuối cùng có
    thể.
    * Con Tuần Lộc cuối cùng đến nơi phải đón ông già Noel trong khi những con khác chờ đợi trong một túp lều
     nóng lên trước khi được đưa vào xe trượt tuyết.
### 2. Phân tích
* Sau khi con tuần lộc thứ 9 đến, ông già noel phải chuẩn bị xe trượt tuyết (prepareSleigh) , và sau đó cả 9 con
tuần lộc phải được buộc dây thừng (getHitched)
* Nếu trường hợp ông gìa Noel thức giấc chỉ có 3 chú lùn, ông già Noel phải giúp đỡ các chú lùn (helpElves), và
điều đó cũng có nghĩa là các chú lùn được giúp đỡ (getHelp).
* Tất cả 3 chú lùn phải được giúp đỡ trước khi chú lùn nào khác được bổ sung.
### 3. Giải pháp cho bài toán
**Khởi tạo**
<br>
![](https://images.viblo.asia/e86f31a0-3d71-4676-8f99-3543d14ce3d2.png)
<br>
**Ông già Noel (Santa Claus)**
<br>
![](https://images.viblo.asia/4a3f2a59-7712-4ee0-bda2-b482ee85fde1.png)
<br>
**Reindeer**
<br>
![](https://images.viblo.asia/7ab8a9d3-726d-46a1-95f3-eea3277750c0.png)
<br>
**Elves**
<br>
![](https://images.viblo.asia/8dcf0a71-018c-4332-9556-4cb0d7374635.png)
<br>
## 4. Vấn đề vượt sông (River Crossing Problem)
### Vấn đề thực tiễn
Đây là vấn đề được viết bởi Anthony Joseph ở U.C.Berkeley . Nhưng không xác định chính xác ai là tác giả của
bài toán này. Nó tương tự như vấn đề của bài toán tạo phần tử nước theo nghĩa nó là loại rào cản đặc biệt chỉ cho
phép các luồng truyền qua các kết hợp nhất định.<br>
Một nơi nào đó gần Redmond, Washington có một chiếc thuyền buồm chở hàng được sử dụng bởi cả tin tặc
(Hacker) làm việc cho Linux và nhân viên của Microsoft để chuyển họ qua sông. Phà có thể giữ 4 người , nó sẽ không
rời bờ với nhiều hoặc ít hơn số lượng vừa nói trên. Để đảm bảo an toàn cho khách hàng thì không cho phép đưa một
hacker vào thuyền với ba.<br>
### Hướng giải quyết (Solution)
1. Ở đây với mọi người lên thuyền mình sử dụng hàm BoardBoat() Các tình huống đó với 3 nhân viên và 1 hacker,
hoặc ngược lại.<br>
2. Khi chiếc thuyền chở đúng số người , thì mỗi người ở trên đó gọi là hàm RowBoat().<br>
3. Chỉ một người có thể truy cập thuyền tại một thời điểm nhất định.<br>
4. Hacker và nhân viên ở bên ngoài thuyền đợi , ta sẽ sử dụng các biến để biểu diễn các sự kiện này waitingToBoardH
và waitingToBoardE. Người ở trong thuyền sẽ đợi tàu rời đi, ta sử dụng biến waitingToRow để biểu diễn sự kiện
này.<br>
5. Thứ nhất, cần phải biết số lượng hackers đang chờ đợi để được chỉ định cho một thuyền ( int wH) và số
lượng nhân viên chờ đợi để được giao cho một thuyền (int wE). Cũng cần phải biết số lượng tin tặc chưa lên
tàu nhưng đã được chỉ định cho thuyền (int aH) và số lượng nhân viên đó (int aE). Cuối cùng , người cuối cùng
trong thuyền cần phải xếp hàng , vì vậy cần phải biết số người trên thuyền (int inBoat). Tất cả các biến này
đều được khởi tạo thành 0.<br>
**Thuật toán giải**
<br>
![](https://images.viblo.asia/b6c8d87d-d67b-43f8-bf28-d8a6b100f3e9.png)
<br>
![](https://images.viblo.asia/c31a1c76-25e8-46e6-877f-1ea9e6e017b0.png)
## 5. The dining savages problem
### Vấn đề thực tiễn
Vấn đề này từ quyển Concurrent Programming của Andrews.<br>
Một bộ tộc hoang dã ăn tối chung từ một cái nồi lớn có thể chứ được M khẩu phần ăn được nấu chín. Khi một người
muốn ăn anh ấy sẽ tự lấy ở nồi nếu còn. Nếu nồi rỗng , người ấy đánh thức đầu bếp dậy và đợi cho đến khi đầu bếp
cho thức ăn vào nồi.
### Phân tích và giải pháp
Tất cả các thành viên của bộ tộc đều sử dụng hàm lấy thức ăn:<br>
![](https://images.viblo.asia/eb69b807-819e-428d-be11-44f4d37d9339.png)
<br>
Một tiến trình nấu ăn sẽ chạy lệnh:<br>
![](https://images.viblo.asia/dd1779c0-75e9-402d-bdf7-66f6c9aad864.png)
<br>
**Điều kiện ràng buộc giữa các tiến trình là:**
<br>
* Người không thể lấy thức ăn (chạy hàm getDervingFromPot()) nếu nồi rỗng.
* Đầu bếp chỉ có thể bỏ thêm thức ăn (chạy hàm putServingInPot())khi nồi rỗng.
Chúng ta sử dụng biến đếm servings để đếm số lượng thức ăn còn lại trong nồi. Nếu servings =0 thì đầu bếp sẽ chạy
hàm putServingInPot() . Đèn bào emptyPot để chỉ nồi rỗng và fullPot để chỉ nồi đã đầy.
![](https://images.viblo.asia/cc16cced-efac-4dd0-8816-82900839ce11.png)
<br>
Người nấu ăn:<br>
![](https://images.viblo.asia/18a62ed4-bbb8-4309-8967-e694bd2b03fe.png)
<br>
Khí có tín hiệu báo nồi đã rỗng thì cook sẽ thực hiện hàm putServingsInPot() để đưa thêm thức ăn vào nồi. Khi nồi
đầy sẽ chạy tiến trình fullPot.signal().// Savage (người trong bộ tộc)://
<br>
![](https://images.viblo.asia/07e7a744-467f-46c7-bcb6-0e5413507142.png)
<br>
Mỗi thành viên trong bộ tộc sẽ phải đợi đèn hiệu mutex để được lấy thức ăn. Nếu nhận thấy nồi rỗng thì sẽ đợi cho
đến khi tín hiệu nồi đầy (fullPot) từ tiến trình Cook để thiết lập biến chỉ số lượng thức ăn trong nồi là servings = M
và chạy tiếp chương trình. Mỗi tiến trình sẽ lấy một khẩu phần ăn từ nồi và giảm biến đếm đi 1 đơn vị . Sau khi lấy
xong tiến trình này sẽ trả lại mutex cho các tiến trình đang đợi khác và thực hiện hàm eat().
<br>
# TÀI LIỆU THAM KHẢO
1. The Little Book of Semaphores. Allen B. Downey. Version 2.1.5.
2.  Synchronization Problem Solutions https://inst.eecs.berkeley.edu/cs162/fa13/hand-outs/synch-solutions.html.
3.  https://web.cs.wpi.edu/cs3013/c07/lectures/Section06-Sync.pdf.
4.  https://www.youtube.com/watch?v=M_G6nDtQarg