Tiếp nối chuỗi serise về hệ phân tán, ở phần này mình sẽ giới thiệu về lý do tại sao sao lưu lại tốt và tập trung vào tính thống nhất dữ liệu cũng như cách thức xem nó hoạt động thế nào. 

**Mục lục**
1. Giới thiệu về sao lưu và thống nhất dữ liệu 
2. Các mô hình sao lưu hướng dữ liệu
3. [Các mô hình sao lưu hướng client](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-6-sao-luu-va-thong-nhat-du-lieu-part-2-bWrZnWe9lxw#_3-cac-mo-hinh-sao-luu-huong-client-0)
4. [Quản lý các bản sao](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-6-sao-luu-va-thong-nhat-du-lieu-part-2-bWrZnWe9lxw#_4-quan-ly-cac-ban-sao-6)
5. [Các giao thức sao lưu](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-6-sao-luu-va-thong-nhat-du-lieu-part-2-bWrZnWe9lxw#_5-cac-giao-thuc-dam-bao-thong-nhat-12)

Mình sẽ chia phần này thành 2 phần con. Ở bài này mình sẽ xin giới thiệu mục 1 và 2 của bài. Cùng tìm hiểu nhé!
# 1. Giới thiệu
## 1.1. Vì sao phải sao lưu
Có 2 lý do chính để thực hiện việc sao lưu:
* Để tăng tín tin cậy (tính sẵn sàng) cho hệ thống:  Trong quá trình đọc hoặc ghi dữ liệu, nếu dữ liệu đó bị lỗi hay vì một nguyên nhân nào đó mà không thể dùng được, ta có thể dùng ngay bản sao dữ liệu đó để hệ thống không phải dừng lại và tránh được tình trạng sử dụng các dữ liệu không chính xác.
* Để tăng hiệu năng của hệ thống: Tăng quy mô của hệ thống cả về số lượng lẫn phạm vi địa lý. 
    * Ví dụ: nếu số lượng máy tăng => tải trên mỗi máy trong hệ phân tán cũng ko tăng lên nhiều hơn, phạm vi địa lý tăng => có thể sử dụng các bản nhân bản gần khu vực địa lý đó 

## 1.2. Thống nhất dữ liệu
Đồng độ các bản sao sao cho các hệ thống luôn được đồng bộ về dữ liệu: khi một bản sao được cập nhật thì tất cả những bản còn lại cũng phải được cập nhật theo để đảm bảo tính thống nhất của dữ liệu

=> Điều này ảnh hưởng rất lớn đến hiệu năng của hệ thống.
## 1.3. Khó khăn
* Sao lưu như 1 kỹ thuật mở rộng các bản sao, có thể tăng hiệu năng của hệ thống vì chúng giúp làm giảm các trễ truy cập. 
* Tuy nhiên chúng lại là nguyên nhân gây khó khăn cho việc duy trì tính thống nhất của dữ liệu. 
* Các bản sao được phân tán trên diện rộng , vấn đề đặt ra là làm sao xác định được bản sao ở đâu đang được cập nhật 1 cách nhanh chóng nhất . 
* Nếu các bản sao ở xa thì việc cập nhật 1 bản được update sẽ gây ra tốn đường truyền trong mạng ( đồng bộ toàn bộ các bản sao ) mà việc thực hiện sao lưu này nhằm tăng hiệu năng của hệ thống  => nếu đồng bộ không hợp lý thì sẽ làm giảm hiệu năng của toàn hệ thống 
* Đồng bộ từng phần tử rồi lan truyền sang các phần tử kế bên , việc này sẽ làm tăng hiệu năng nhưng sẽ dẫn đến việc có những thời điểm các bản sao là ko giống nhau.
* Trong một số trường hợp ta cần phải nới lỏng những ràng buộc về tính thống nhất dựa trên: 
    * Tần suất truy cập và cập nhật dữ liệu. 
    * Mục đích sử dụng.

# 2. Các mô hình sao lưu hướng dữ liệu
* Đây là kiểu mô hình sao lưu được sử dụng rộng rãi nhất.
*  Trong kiểu mô hình này, bất kì người sử dụng nào truy cập vào kho dữ liệu cũng sẽ nhìn thấy các thao tác được sắp xếp theo mô hình.
*  Điều này trái ngược với các mô hình sao lưu hướng client (mình sẽ nói sau) nơi client được yêu cầu một mô hình sao lưu cụ thể và các client khác nhau sẽ nhìn thấy các thao tác theo những trật tự khác nhau. 
*  Kho dữ liệu có thể được đọc hay ghi bởi bất cứ tiến trình nào trong một hệ phân tán. 
*  Tuy nhiên dữ liệu ghi vào một bản sao cục bộ phải đảm bảo cũng được truyền tới tất cả các bản sao ở xa.
*   Vì nguyên nhân này mà các mô hình thống nhất đã ra đời, mục đích là để giúp ta có thể hiểu rõ về các cơ chế khác nhau được sử dụng để thực hiện phần việc này. 
*   Một mô hình thống nhất có thể được coi là một bản hợp đồng giữa một kho dữ liệu của hệ phân tán với các các tiến trình của nó. Nếu các tiến trình đồng ý với các điều khoản của hợp đồng thì kho dữ liệu sẽ hoạt động đúng như tiến trình mong muốn. 
## 2.1. Mô hình thống nhất liên tục
Mô hình này hoạt động dựa trên việc xác định xem việc ko thống nhất nào là có thể chấp nhận được dựa vào việc xác định các thông tin sau: 
* Độ lệch bằng số giữa các bản sao 
* Độ lệch theo trạng thái giữa các bản sao 
* Độ lệch trong thứ tự các lần cập nhật 

Như vậy trong hệ thống sẽ quy định một độ lệch giữa các bản sao . 
* Nếu một phiên bản được cập nhật mà độ lệch chưa đạt tới giá trị quy định thì giữa bản sao đó và các bản sao khác vẫn được coi là thống nhất và ko phải thực hiện cập nhật .
*  Độ lệch bằng số giữa các bản sao: 
    *  Thường sử dụng với các chương trình có dữ liệu là số . 
    *  Có 2 dạng của độ lệch này là: độ lệch tương đối và độ lệch tuyệt đối .
    *  Có thể xác định số này là số lượng bản cập nhật cho 1 bản sao nào đó . 
*  Độ lệch về trạng thái giữa các bản sao: 
    *  Liên quan đến thời gian cuối cùng 1 bản sao đã được cập nhật . 
    *  Với 1 số ứng dụng thì nó có thể chấp nhận dữ liệu cũ , miễn là ko quá cũ . 
    *  Ví dụ: trong dự báo thời tiết , máy chủ liên tục nhận được các thông tin về thời tiết nhưng chỉ đồng bộ 30’/lần … 
*  Độ lệch trong thứ tự cập nhật: 
    *  Thứ tự cập nhật được phép khác nhau ở các bản sao khác nhau khi sự khác nhau vẫn trong giới hạn. 
    *  Khi nhận được yêu cầu cập nhật thì bản sao tạm thời cập nhật và chờ sự đồng ý của các bản sao khác về quá trình cập nhật. 
    *  Như vậy cần có thêm 1 bản sao phụ để nếu không nhận được sự đồng ý cập nhật của các bản sao khác thì quay lại bản cũ . 
    *  Có thể sau nhiều lần cập nhật tạm thời thì bản sao mới được cập nhật lâu dài.
    
    => Tóm lại , các bản sao có thể vẫn được sử dụng nếu sự khác nhau vẫn nằm trong giới hạn được chấp thuận . Nói một cách khác là khi 1 bản sao được cập nhật thì nó sẽ chờ để được xác nhận trước khi cập nhật lên tất cả các bản sao khác => thứ tự cập nhật rắc rối . Cách làm này cần lưu trữ thêm 1 bản để có thể quay lại nếu bản cập nhật không được chấp thuận .
    
##    2.2. Mô hình thống nhất theo thứ tự thao tác
* Truy cập tương tranh đến các tài nguyên chia sẻ
* Tài nguyên chia sẻ là dữ liệu được sao lưu
* Mạnh hơn mô hình liên tục
* Khi thực hiện cập nhật, thứ tự cập nhật được thống nhất giữa các bảo sao

### 2.2.1. Thống nhất chặt
Là mô hình thỏa mãn điều kiện sau: 
* Thao tác đọc bất kỳ trên mục dữ liệu x đều trả về một giá trị tương ứng với kết quả của thao tác ghi gần nhất trên x đó.
* Sử dụng khái niệm thời gian tuyệt đối. 
* Thời gian tuyệt đối này là tổng thể cho cả hệ thống để xác định đúng khái niệm "gần nhất". => Điều này là khó khả thi với hệ phân tán.

![](https://images.viblo.asia/57451ee2-e662-4ffd-8726-95e052869e57.png)
* Các kí hiệu:
    * Wi(x)a: thao tác ghi được thực hiện bởi tiến trình P(i) lên mục dữ liệu x với giá trị a.
    * Ri(x)b: thao tác đọc được thực hiện bởi tiến trình P(i) lên mục dữ liệu x cho kết quả b.
    * Giá trị khởi tạo của các dữ liệu là NIL (x = null)

Do việc lan truyền cục bộ của P1 chưa tới P2 nên P2 đọc dữ liệu x vẫn là giá trị null ban đầu.
=> Mô hình này là không khả thi 

### 2.2.2.Thống nhất tuần tự
* Là mô hình lỏng lẻo hơn, yếu hơn mô hình thống nhất chặt. 
* Các tiến trình đều có một chuỗi thao tác cục bộ
* Nó thỏa mãn các yêu cầu sau:
    * Kết quả của sự thực hiện bất kỳ là như nhau nếu thao tác đọc và ghi do các tiến trình thực hiện trên kho dữ liệu một cách tuần tự và các thao tác của mỗi tiến trình xuất hiện trong chuỗi thao tác này chỉ ra bởi chương trình của nó.
    * Khi các tiến trình chạy đồng thời trên các máy khác nhau thì cho phép sự đan xen của các thao tác nhưng tất cả các tiến trình đều phải nhận biết được sự đan xen của các thao tác đó là như nhau.
* Tất cả các tiến trình đều nhìn thấy một thứ tự của các thao tác ghi

![](https://images.viblo.asia/64778d95-8da9-4c3d-8172-abdc2d861a1c.png)
+ (a) Mô hình nhất quán tuần tự. 
* (b) Không là mô hình nhất quán tuần tự.
### 2.2.3. Thống nhất tuyến tính
* Là mô hình yếu hơn mô hình thống nhất chặt nhưng mạnh hơn mô hình thống nhất tuần tự. 
* Mô hình này thỏa mãn điều kiện sau: 
    * Kết quả của bất kì sự thực hiện nào là như nhau nếu các thao tác (đọc và ghi) của tất cả các tiến trình lên dữ liệu được thực hiện môt cách tuần tự và các thao tác của mỗi tiến trình xuất hiện trong chuỗi thao tác này phải theo thứ tự đã được chỉ ra trong chương trình của nó. 
### 2.2.4. Thống nhất nhân quả
*  Đây là mô hình lỏng lẻo hơn mô hình thống nhất tuần tự. 
*  Mô hình này phân biệt các sự kiện có quan hệ nhân quả và các sự kiện không có quan hệ nhân quả.
*  Nếu sự kiện b được gây ra hoặc bị tác động bởi một sự kiện a xảy ra sớm hơn thì tính nhân quả đòi hỏi mọi thực thể khác phải "nhìn" thấy a trước rồi mới thấy b sau.
*  Các thao tác ghi đồng thời có thể được nhận biết theo thứ tự khác nhau trên những máy khác nhau.
*  Hai thao tác ghi được coi là có quan hệ nhân qủa với nhau nếu việc thực hiện một thao tác có khả năng gây ảnh hưởng đến dữ liệu được ghi bởi thao tác kia
*  Mô hình thống nhất nhân quả thỏa mãn các điều kiện sau: 
    *  Một thao tác đọc có quan hệ nhân quả với thao tác ghi cung cấp dữ liệu cho nó. 
    *  Một thao tác ghi có quan hệ nhân quả với một thao tác đọc xảy ra trước nó trong cùng một tiến trình
*  Nếu các thao tác không có quan hệ nhân quả với nhau thì chúng được coi là xảy ra đồng thời. 
*  Các thao tác đọc đồng thời có thể được thực hiện theo bất kì trật tự nào miễn là chúng tuân theo trình tự của chương trình. 

![](https://images.viblo.asia/68b8d56b-92fc-4b51-b316-ce856465d8c8.png)

### 2.2.5. Thống nhất FIFO 
* Thống nhất FIFO còn được gọi là nhất quán PRAM. 
* Đây là mô hình yếu nhất vì mô hình này bỏ qua giới hạn về trật tự của bất kì thao tác đồng thời nào. 
* Mô hình thỏa mãn điều kiện: 
    * Các thao tác ghi bởi một tiến trình đơn phải được tất cả các tiến trình khác nhìn thấy theo cùng một trật tự mà chúng đề ra. 
    * Nhưng thao tác ghi bởi nhiều tiến trình khác nhau có thể được thấy theo những trật tự khác nhau bởi các tiến trình khác nhau.
    
![](https://images.viblo.asia/c0378b64-65b9-4379-8f3c-4668952dbb38.png)
### 2.2.6. Thống nhất yếu
* Mô hình này không tập trung vào các thao tác trên dữ liệu mà chúng quan tâm đến trật tự các nhóm lệnh bằng việc sử dụng các biến được đồng bộ.
* Mô hình có ba đặc tính sau:
    * Việc truy cập đến một biến đồng bộ hóa được kết hợp với kho dữ liệu là một thống nhất tuần tự.
    * Không có thao tác nào lên các biến đồng bộ hóa được phép thực hiện cho đến khi tất cả các thao tác ghi trước đó được hoàn thành ở mọi nơi.
    * Không có thao tác đọc hay ghi dữ liệu lên các mục dữ liệu nào được phép thực hiện cho đến khi tất cả các thao tác trước đó lên các biến đồng bộ hóa được thực hiện.
    
![](https://images.viblo.asia/5780419b-7819-436f-bea2-2561aafff31d.png)

* (a) Mô hình nhất quán yếu. 
* (b) Không là mô hình nhất quán yếu

### 2.2.7 Thống nhất đi ra (Release consistency)
* Sử dụng thêm hai lệnh: 
    * Lệnh **acquired**: để báo muốn vào vùng tới hạn (critial region)
    * Lệnh **release**: để báo giải phóng vùng tới hạn.
* Hai lệnh này cũng có hai cách thực thi khác nhau như: bằng một biến hoặc bằng một lệnh đặc biệt. 
* Hai thao tác này chỉ thực hiện với các dữ liệu dùng chung chứ không áp dụng cho tất cả các dữ liệu.
* Điều kiện thỏa mãn:
    * Trước khi thực hiện một thao tác đọc hay ghi lên dữ liệu chia sẻ thì tất cả các thao tác acquire do tiến trình này thực hiện trước đó phải hoàn tất.
    * Trước khi một thao tác release được phép thực hiện thì tất cả các thao tác đọc và ghi do tiến trình này thực hiện trước đó phải được hoàn tất.
    * Truy cập vào các biến đồng bộ hóa là nhất quán FIFO (Không yêu cầu nhất quán tuần tự).
     
![](https://images.viblo.asia/28bb943b-a0fb-4fcf-9f3f-f9da9423a2a2.png)

### 2.2.7 Thống nhất đi vào (Entry consistency)
+ Giống mô hình thống nhất đi ra, mô hình thống nhất đi vào cũng sử dụng hai lệnh **acquired** và **release** khi muốn sử dụng vào vùng tới hạn. 
+ Tuy nhiên các lệnh này thao tác trên từng mục dữ liệu của vùng dữ liệu chia sẻ. Tiến trình nào muốn sử dụng mục dữ liệu thì phải đợi cho tất cả các tiến trình khác giải phóng mục dữ liệu đó.
+ Để ghi lên một mục dữ liệu, client phải có được biến đồng bộ hoá của mục đó trong chế độ dành riêng. Điều đó có nghĩa là không client nào khác có thể sử dụng biến đó. Khi client cập nhật xong mục dữ liệu, thì nó giải phóng biến đó .
+ Khi client muốn đọc một mục dữ liệu nào đó, nó phải có được biến đồng bộ hóa kết hợp ở chế độ không dành riêng. 
+ Nhiều client có thể giữ một biến đồng bộ hóa ở chế độ không dành riêng.
+ Khi thực hiện một thao tác acquire, client lấy về phiên bản mới nhất của mục dữ liệu từ tiến trình cuối cùng thực hiện thao tác acquire trên biến đó.
+ Điều kiện sau:
    + Một thao tác acquire để truy cập vào một biến đồng bộ hóa không được phép thực hiện trong một tiến trình cho đến khi tất cả các cập nhật lên mục dữ liệu trong tiến trình đó được thực hiện.
    + Trước khi một truy cập trong chế độ dành riêng của một tiến trình tới một biến đồng bộ hóa được phép thực hiện thì không tiến trình nào khác còn được giữ các biến đồng bộ hóa, trong chế độ không dành riêng thì không cần yêu cầu như vậy.
    + Sau khi một truy cập trong chế độ dành riêng lên một biến đồng bộ hóa được thực hiện thì bất kì sự truy cập của tiến trình nào khác trong chế độ không dành riêng lên biến đó cũng không được thực hiện cho đến khi chủ nhân của biến đồng bộ thực hiện xong việc truy cập của mình.

![](https://images.viblo.asia/e064256e-480d-4dcc-a899-812c5aca6df4.png)

Part 1 đến đây là kết thúc.  Ở [phần tiếp theo](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-6-sao-luu-va-thong-nhat-du-lieu-part-2-bWrZnWe9lxw) mình sẽ nóí tiếp về các mục còn lại ở phần mục lục nhé!

Thanks for reading:sparkling_heart:

**Tài liệu tham khảo**: Bài giảng Hệ phân tán - ĐHBKHN