Bài viết này mình xin phép không chia sẻ về các vấn đề kĩ thuật nhưng mình muốn nói đến các vấn đề lùm xùm gần đây của TopDev với những luận điệu thiếu sự minh bạch của họ trong vấn đề vi phạm bản quyền bài viết của các tác giả trên rất nhiều blog công nghệ khác nhau. Trong bài này mình sẽ cung cấp các dữ liệu cũng như phân tích sự sai sót trong các phát ngôn từ phía đại diện TopDev nên rất mong nhận được sự chia sẻ của cộng đồng.  Chúng ta sẽ bắt đầu ngay vào vấn đề nhé 

> **Note**: Bài viết này dựa trên các số liệu của trang TopDev. Còn một trang blog công nghệ khác do cùng một công ty chủ quản với TopDev là Techtalk. Bọn mình cũng sẽ cập nhật số liệu của Techtalk sớm nhất. 

## Ngày thứ 4 biến động 

Câu chuyện TopDev có clone bài viết từ các nguồn khác nhau và bị nhiều người trong cộng đồng công nghệ lên tiếng khi tự nhiên bài của họ bị cho lên TopDev với một nội dung hoàn toàn khác, có khi sai khác hoàn toàn với nội dung gốc đã là một vấn đề có từ rất lâu rồi. Thế nhưng một ngày đẹp trời gần đây, admin của một group về AI khá nổi tiếng đăng bài tố cáo TopDev về việc lấy cắp bài viết lại mà chưa xin phép sau đó đã chỉnh sửa nội dung lại của bài viết đó theo hướng loại bỏ tất cả những yếu tố cá nhân liên quan đến tác giả. 

![](https://images.viblo.asia/full/70a295a0-da1b-4131-a47e-a81e5d7836a4.png)

Ngay sau đó là việc lên tiếng của một admin của cộng đồng về Machine Learning lớn nhất Việt Nam có lên tiếng về vụ việc này trên chính trang chủ của Facebook page và nhận được sự chú ý của rất nhiều người. Nếu ở trong group bạn có thể xem tại [đây](https://www.facebook.com/groups/machinelearningcoban/permalink/1035133513610722/).  Câu chuyện sẽ chẳng có gì đáng nói vì mình biết có rất nhiều người comment theo đám đông chứ không thực sự bị ảnh hưởng hay cũng không thực sự bị TopDev clone bài. Tuy nhiên nó chỉ trở nên căng thằng hơn khi có một bạn tự xưng là đại diện của TopDev vào trả lời khiến cho mình có rất nhiều thứ nghi hoặc và mình muốn làm rõ trong bài viết này bằng các số liệu thực. 

![](https://images.viblo.asia/full/1840150b-3987-4ded-b12c-23c16a67989c.png)

Các bình luận của bạn đó thì rất nhiều và mình xin được trích ra một vài luận điểm chính như sau:

* **Thường tất cả các bài đều được trích dẫn đầy đủ**
* **70% số bài trên TopDev đang được dần xin phép và kí thoả thuận với các tác giả.** Chúng ta sẽ cùng phân tích con số này trong những phần tiếp theo 
* **Thường tất cả các bài dù có xin phép hay không xin phép đều có trích nguồn đầy đủ, với mục đích và tiêu chí là promote cho trang blog của tác giả đó (đồng thời backlink luôn cho website đó)** mình cũng sẽ chỉ rõ ràng điều này là không có cơ sở trong các phần tiếp theo. 
* **Có một số tác giả dùng từ ngữ chưa phù hợp hoặc viết sai chính tả, hay format, thì đội biên tập sẽ giúp edit lại cho hoàn thiện**: Việc này thực sự  đã làm sai lệch đi nội dung của bài viết mà đôi khi là những phần rất quan trọng trong bài viết bị ngắt bỏ. Trong đó có rất nhiều phần đó là ngắt bỏ các Backlink đến bài viết gốc. 

Sơ qua câu chuyện là như vậy. Chúng ta sẽ cùng đi sâu vào bàn luận từng vấn đề một nhé 

## Con số 70% - chẳng có ý nghĩa gì cả

> 70% số bài trên TopDev đang được dần xin phép và kí thoả thuận với các tác giả. 

Đây quả là một trong những xảo thuật ngôn từ rất đáng nói của người đại diện TopDev bởi vì nếu đã kí thoả thuận hết 70% số liệu đó thì không cần phải ghi rằng **ĐANG DẦN ĐƯỢC XIN PHÉP** mà ghi hẳn là **ĐÃ XIN PHÉP ĐƯỢC 70%** tác giả rồi. Còn nếu ghi mập mờ như vậy thì cũng không nói lên được ý nghĩa gì. Kĩ thuật ngôn từ này thường được các nhà quảng cáo hay tuyển dụng tận dụng triệt để theo kiểu **Lương upto 5000$** và TopDev cũng đã xin phép được **Up To 70%** người dùng rồi. Nhưng thực ra là dân công nghệ chúng ta không nên lươn lẹo ngôn từ như thế. 


## Thực sự TopDev đã làm gì 
 
Điều này đặt cho mình câu hỏi rằng **Thực ra họ đã xin phép bao nhiêu người ???**. Để trả lời cho câu hỏi đó mình xin phép được public data của TopDev gồm các mục sau:

* URL của bài viết trên TopDev 
* URL của nguồn được trích dẫn 
* Các trạng thái có trích dẫn / không có trích dẫn 
* Các trạng thái trích dẫn có  backlink / không có backlink 
* Các trạng thái trích dẫn có backlink nhưng để ở **rel=nofollow**  hay không 
* Đối với những bài được clone từ Viblo nói riêng mình có thêm các trường author để các bạn tham khảo 
* Published date của các bài viết trên TopDev 

Dữ liệu này mình xin được public tại [đây](https://drive.google.com/file/d/1mdRN1rmIaGqcIQ4vTT-Qwz3GSr-sYDFD/view?usp=sharing) và bản xem trước trên [Google sheet](https://drive.google.com/file/d/19wbNLXzXtdrexYNbH033hvODefpHrYeI/view?usp=sharing)

Đây là dữ liệu được tổng hợp từ sitemap public của TopDev được cập nhật lần cuối ngày **27/8/2020**. 

![](https://images.viblo.asia/full/8ce82438-206e-4313-8ce4-4d56d1bf9b68.png)


### Việc lấy trộm bài này đã diễn ra từ khá lâu 
Như đã nói ở các phần trên, việc **chôm** bài viết này của TopDev đã diễn ra từ khá lâu và cũng không ít lần hứng chịu gạch đá từ phía cộng đồng tuy nhiên không hiểu vì sao TopDev vẫn tiếp tục việc này khi chưa có những quy định và thông báo rõ ràng về vấn đề bản quyền tác giả. Mình xin được dẫn chứng ra một số thông tin như sau:

```python 
df.loc[(df['is_ref'] == True)].sort_values(by='publish_date', ascending=True).head(5)
```

![](https://images.viblo.asia/full/2509bf1b-9789-4340-9996-9c543aed1724.png)

Chúng ta có thể thấy bài viết đầu tiên của TopDev trích dẫn vào khoảng cuối năm 2016. Với Viblo nói riêng thì việc clone các bài viết bắt đầu từ khoảng cuối 2018, đầu 2019. 

![](https://images.viblo.asia/full/7a255730-0479-4be5-b41a-2ce39c198935.png)

###  Trích dẫn không đầy đủ 
Bằng một vài lệnh đơn giản các bạn có thể check xem được khá nhiều các thông tin. Nếu các bạn lười check thì có thể làm theo một vài dòng code rất đơn giản sau 

```python 
import pandas as pd 

df = pd.read_csv('data_topdev.csv', sep='|')
print(df.shape)
>>> (2743, 9)
```

Đây chính là tổng số bài viết trên các blog hiện tại của TopDev. Tổng cộng là có 2743 bài viết. Theo như đại diện TopDev đã tuyên bố thì họ hoàn toàn chưa có platform riêng để viết bài, đồng nghĩa với tất cả các bài phải được clone từ một nguồn khác hoặc phải chứng minh được đó là nội dung gốc của họ. Mình muốn kiểm tra số lượng bài viết được trích dẫn trước tiên 

```python 
print(df.loc[(df['is_ref'] == True)].shape)
>>> (1913, 9)
```

Có **1913 / 2743 tương đương 69%** số bài viết là có trích dẫn. Tức có dòng chữ **TopDev via ....** hoặc chữ **Nguồn ...** ở cuối bài viết. Điều này có vẻ cũng đúng với những gì mà đại diện bên TopDev đã ghi nhận.  Dù việc trích dẫn này là chưa được đẩy đủ (còn khoảng hơn 800 bài viết chưa được trích dẫn) nhưng dù sao thì nó cũng khá sát với các con số mà đại diện TopDev đưa ra.  

### Trích dẫn ngược dẫn đến hiểu lầm
Tuy nhiên điều đáng nói ở chỗ không biết vì vô tình hay hữu ý mà các trích dẫn của TopDev rất phổ biến theo dạng **TopDev via XXX** khiến cho người đọc dễ bị hiểu nhầm rằng chính bài của TopDev mới là bài viết gốc. Việc trích dẫn mập mờ này rất không nên mà mình nghĩ các bạn TopDev nên sửa 

### Trích dẫn như không có backlink 

Chúng ta cứ nghĩ rằng việc ghi nguồn thì sẽ cần phải có backlink đến trang gốc tuy nhiên sau khi chạy lệnh sau 

```python 
df.loc[(df['is_ref'] == True) & (df['is_backlink'] == False)].shape
>>> (99, 9)
```

Điều này cho thấy chúng ta vẫn có những bài viết không hề được gắn link nào. Hay nói cách khác là **Trích dẫn cho có**

### Để lại backlink đến bài viết gốc, nhưng lại kèm theo HTML attribute là rel="nofollow"
Nếu như với người dùng thì việc có dofollow trên backlink hay không thì cũng chẳng ảnh hưởng gì nhưng với site gốc thì có đấy các bạn ạ. Dù sao thì TopDev cũng đã có ý thức trích bài viết gốc dù cho đã xào xáo lại rất nhiều nội dung. Điều đó thì thôi cũng tạm chấp nhận được tuy nhiên mình không đồng tình với quan điểm của người phát ngôn TopDev rằng 

> **Thường tất cả các bài dù có xin phép hay không xin phép đều có trích nguồn đầy đủ, với mục đích và tiêu chí là promote cho trang blog của tác giả đó (đồng thời backlink luôn cho website đó)**

Nhưng chúng ta hoàn toàn có thể kiểm tra điều đó 
```python 
df.loc[(df['is_backlink'] == True) & (df['is_nofollow'] == False)].shape
>>> (0, 9)
```

Vậy là tất cả các bài viết có chèn backlink ở phần trích dẫn thì **TopDev** đều để **rel=nofollow**. Nếu bạn là dân SEO thì chắc hẳn phải biết rằng ý nghĩa của điều này như thế nào. Điều này chẳng khác nào nói với bộ index của search engine rằng backlink này chẳng có tác dụng gì cả, mày không cần quan tâm đến đâu. Vậy nên nếu TopDev nói **backlink luôn cho website gốc** là hoàn toàn **LỪA DỐI CỘNG ĐỒNG**


### Xoá hết các backlink của bài viết gốc 

Hiện tượng này thì cũng không còn lạ lẫm gì ở các bài viết của TopDev, bạn đọc có thể tham khảo một bài viết bất kì trên dữ liệu mà mình gửi cũng khó có thể tìm thấy một backlink nào dù cho bài viết gốc có chứa nhiều backlink. Đây là một ví dụ nhỏ. Bài viết gốc được mình hoạ như hình đưới 

![](https://images.viblo.asia/full/5321bb0d-c3bc-43a8-9c4d-52ec35286f9d.png)

Nhưng khi sang TopDev thì toàn bộ backlink sẽ được gỡ bỏ. 

![](https://images.viblo.asia/full/26c0397f-17c1-450a-af70-a38314ca8304.png)

Việc xoá hết các backlink là hoàn toàn không tôn trọng cả tác giả và độc giả. Độc giả sẽ mất đi các liên kết đáng quý mà tác giả đã link đến chưa kể việc loại bỏ backlink hoàn toàn làm mất đi **quyền lợi** của trang được reference với bộ index của Google. Và với đội SEO mạnh mẽ của TopDev thì việc này có thể làm cho bài viết clone của TopDev còn có thứ hạng cao hơn cả bài viết gốc - nơi mà tác giả bỏ rất nhiều tâm huyết ra để viết mà lại vô tình bị TopDev **dìm hàng**

## TopDev clone từ những nguồn nào 

Chạy thử câu lệnh sau các bạn sẽ thấy ngay kết quả 

```python 
df['ref_name'].value_counts()
```
Kết quả của chúng như sau 

```python 
Viblo                                      809
Medium                                      71
cafebiz.vn                                  71
Vuilaptrinh                                 62
genk.vn                                     61
Cafebiz                                     35
TopDev                                      33
blog.topdev.vn                              31
VuiLapTrinh                                 25
Applancer Careers                           24
cafebiz                                     24
 Vuilaptrinh                                23
Techtalk                                    23
Hackernoon                                  20
Freecodecamp                                13
medium                                      12
hackernoon                                  11
VNTALKING                                   10
genk                                         9
YBOX                                         9
tuoitre.vn                                   7
CafeDev                                      6
medium.freecodecamp.com                      6
thaunguyen.com                               6
manhnv.com                                   5
Scotch                                       5
 Freecodecamp                                5
quantrimang.com                              5
Nghệ thuật coding                            5
vuilaptrinh.com                              4
                                          ... 
Techtalk                                     1
```

Chúng ta có thể thấy trong tất cả các bài viết có đến **809 bài viết của Viblo** nếu không chỉ tính các bài có backlink đầy đủ thì đã chiếm đến **809/(1913 - 99) ~ 44.6%**. Tiếp theo đó là các nền tảng như Medium, Cafebiz .... Mà theo mình biết thì Viblo chưa hề có thông báo gì về việc hợp tác, cho phép Topdev chỉnh sửa và đăng tải lại nội dung của người dùng cả.  Liệu trong số đó có bao nhiêu % là thực sự đã xin phép tác giả như lời đại diện của TopDev khẳng định? Và nếu chưa được sự đồng ý từ tác giả thì con số  44.6% bài viết trên TopDev là của Viblo liệu có **VI PHẠM QUÁ NHIỀU** rồi không ???.

Chúng ta có thể theo dõi tỉ lệ các bài viết bị copy qua hình sau 
![](https://images.viblo.asia/189caa05-58e6-4970-ad02-955b3598cc7b.png)

## Những tác giả Viblo nào bị clone bài viết 
Chạy thử câu lệnh 
```python 
df['viblo_user'].value_counts()
```

Và kết quả 

```python 
Vietnam Mobile Day        9
Mai Trung Đức             8
Minh Monmen               8
Hoàng Nguyễn              7
Trần Xuân Thắng           7
Vương Minh Thái           7
Phạm Anh Tuấn             6
Quách Đại Phúc            6
Vương Hưng                6
Phạm Văn Toàn             6
duthaho                   6
Nguyen Anh Tien           6
Ngô Văn Nghĩa             6
Do Trung Kien             6
Nguyen Ngoc Trung         6
tran minh chien           5
Nguyen Duc Anh Tuan       5
Nguyễn Tuấn Quang         5
Phạm Thu Hằng             5
Hoàng Đức Quân            5
Nguyễn Văn Quy            5
manhhomienbienthuy        4
Phạm Hoàng Anh            4
dinhhoanglong91           4
Tran Duc Trung            4
Bui Thi Huyen             4
Thanh Phan                4
Cảnh Sát Chính Tả         4
Hoang Dinh Thoi           4
Nguyễn Văn Minh           4
                         ..
```

Mình đăng danh sách này lên để những bạn nào thực sự quan tâm xem TopDev đã làm gì với bài viết của mình thì có thể tham khảo. Các bạn cũng có thể lọc chi tiết các bài viết của mình đã bị clone trên TopDev bằng câu lệnh sau 

```python 
df.loc[df['viblo_user'] == 'Phạm Văn Toàn']
```

Kết quả là 
![](https://images.viblo.asia/full/0087652b-3313-4402-9e63-c8662d937884.png)

Và tất nhiên là cả 6 bài này mình đều **CHƯA ĐƯỢC XIN PHÉP**  để đăng trên TopDev cho đến thời điểm hiện tại. Riêng cá nhân mình cũng đã có một lần report bài viết [Ông Toằn Vi Lốc - Ứng dụng Deep Learning tự động sinh ra series audio truyện ma siêu to khổng lồ
](https://viblo.asia/p/ong-toan-vi-loc-ung-dung-deep-learning-tu-dong-sinh-ra-series-audio-truyen-ma-sieu-to-khong-lo-bJzKmwqkl9N) của chính mình khi đăng trái phép và chỉnh sửa nội dung hoàn toàn so với bài gốc. Và cũng đã tỏ rõ quan điểm rằng mình không muốn bị TopDev tự ý đăng bài của mình khi chưa được sự cho phép  nhưng đến thời điểm hiện tại thì mình vẫn bị clone 6 bài. Nếu có tên trong danh sách các bạn cũng thử check xem nhé. 

## Trang report bài viết  

Hiện tại  có lẽ do sức ảnh hưởng của vụ việc này thì TopDev đã có trang report các bài viết vi phạm tại [đây](https://docs.google.com/forms/d/1cAwkQgZ5eS5ibZOoyrYyT-USPSE_zZ1CQmH6EsTIUuA/viewform?edit_requested=true) 

Tuy nhiên việc bắt chính tác giả phải tìm và report bài viết bị **clone** của mình là một điều rất không hợp lý và mất thời gian. Nếu bạn nào thực sự muốn report thì có thể tìm nhanh bằng dữ liệu mình đã cung cấp. Tuy nhiên form report này cũng có rất nhiều trường bắt buộc nhập như Tên công ty, chức vụ ... mà thực sự mình không biết là lấy thông tin này để làm gì trong khi đã có khi nếu cần liên lạc thì chỉ cần email là đủ rồi ???

![](https://images.viblo.asia/full/1512022f-097b-4ca0-b54c-665af2dcec23.png)

## Lời nhắn nhủ  

Mục đích của bài viết này mình muốn chỉ ra một vài điểm chưa hợp lý trong cách làm của TopDev. Chính điều đó làm cho chúng ta có một cộng đồng IT không minh bạch. Mình xin nhắc lại là mình không GHÉT BỎ TOPDEV cũng như lên án tất cả những thành viên hay bộ phận thuộc TOPDEV. Thậm chí mình cũng đã từng hợp tác với TOPDEV rất nhiều lần trước đây qua các hoạt động truyền thông cộng đồng, các hội thảo công nghệ. Tuy nhiên mình thực sự không thể chấp nhận được cách làm của TOPDEV trong chiến dịch làm content bằng cách đi **LẤY CẮP VÀ XÀO XÁO BÀI VIẾT** của những tác giả khác . Đó là hai chuyện hoàn toàn khác nhau. Mình thực sự mong những thông cáo truyền thông chính thức của TopDev bày tỏ những thiện chí về sự việc này để cộng đồng công nghệ của chúng ta càng ngày càng phát triển mạnh mẽ hơn trong sự minh bạch cần thiết.

## P/s: Hãy chia sẻ với hashtag sau 

Vì một cộng đồng IT minh bạch. Mình mời gọi các độc giả hãy chia sẻ trên các cộng đồng IT với hashtag sau **#topdev_stop_copy #topdev_stop_steal**.