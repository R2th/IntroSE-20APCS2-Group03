Đối với Performance Testing thì việc đánh giá, phân tích report sau khi đã chạy test, là một điều không phải đơn giản, cho dù tool đó có "cool" đến mức nào, hiển thị report chi tiết đến mức nào thì cuối cùng, người test vẫn phải là người đọc hiểu và đưa ra kết luận cho report đó. JMeter cũng không ngoại lệ, report của JMeter đầy đủ những thông tin cần thiết, nhưng làm thế nào để hiểu? Chúng ta sẽ cùng tìm hiểu tổng quan về các thông số của report và có thể áp dụng để đánh giá được status của hệ thống sau khi test.

Chúng ta sẽ tập trung vào 1 trong những Report hữu ích của JMeter, đó là Aggregate Report.

![](https://images.viblo.asia/294823b8-2bcd-413e-b423-348d6d188393.png)

## 1. Các số liệu trong report

Chúng ta có thể thấy Aggregate Report là 1 report dạng table, với 12 columns ứng với 12 thông số. Chúng ta sẽ tìm hiểu xem ý nghĩa của từng thông số là gì nhé

• Label: Hiển thị tên của từng requests có trong test plan

Mặc định, tất cả những request bị trùng tên trong test plan, sẽ chỉ hiển thị 1 dòng duy nhất trong table này, cho dù nội dung của các request đó có khác nhau hay nằm khác Thread Group đi chăng nữa. Vì vậy, khi đặt tên cho các Request, chúng ta lưu ý nhớ điều này, và đặt tên khác nhau nhé. Tham khảo hình bên dưới:

![](https://images.viblo.asia/08a08b86-0339-423e-b1d4-4058101faaa3.png)


“Include group name in the label?” is UNCHECKED by default

Nếu lựa chọn “Include group name in the label?” được check, thì những request sẽ được gán thêm tiền tố = tên của Thread Group chứa request đó. Tham khảo hình bên dưới:

![](https://images.viblo.asia/4344b6cb-7493-4939-928f-2b69ef45fe30.png)

“Include group name in the label?” is CHECKED

• # Samples: Tổng số lần run của request. Công thức:
`# Samples = Number of Threads (users) * Loop Count`
Ví dụ 1: Thread Group có cấu hình
– Number of Threads (users): 10
– Loop Count: 3
Thì 1 HTTP Request của Thread Group này sẽ run 10 x 3 = 30 (lần)
—> # Samples: 30

Tuy nhiên, công thức trên sẽ không còn đúng trong 1 số trường hợp: đó là khi Request của bạn nằm bên dưới 1 Logic Controller nào đó, chẳng hạn như Logic Controller, such as Loop Controller, Once Only Controller, While Controller, v.v...
Ví dụ 2: Tiếp tục với ví dụ 1 ở trên, nhưng lần này thì hãy để HTTP Request vào 1 Logic Controller, là Loop Controller, và để giá trị Loop Count cho controller này là 2. Lúc này request của bạn sẽ run: 10 x 3 x 2 = 60 (lần).
—> # Samples: 60

• Average (millisecond): Thời gian phản hồi trung bình (Response Time) của request, tính cho đến lần run cuối cùng.

Ví dụ 3: Một Request A run tổng cộng 4 lần với các kết quả Response Time tương ứng là 101ms, 106ms, 153ms, và 128ms. Thì Response Time trung bình của Request A sẽ là 122ms (Công thức tính giá trị trung bình chắc mình không cần nhắc lại nữa nhỉ :D )

• Min (millisecond): Respone Time thấp nhất của request tính cho toàn bộ tất cả các lần run.

Trong ví dụ 3 ở trên thì Min = 101ms

• Max (millisecond): Respone Time cao nhất của request tính cho toàn bộ tất cả các lần run.

Trong ví dụ 3 ở trên thì Max = 153ms

• Percentiles (millisecond): nói một cách đơn giản Percentiles sẽ là một con số x, và đi kèm theo 1 giá trị A. Nghĩa là sẽ có x% có giá trị thấp hơn giá trị A, còn lại (100-x)% sẽ có giá trị lớn hơn giá trị A.

Lấy 1 ví dụ đơn giản. Sau một bài kiểm tra ở lớp học, cô giáo nói 90th Percentile điểm số là 6. Nghĩa là 90% số điểm của lớp sẽ dưới 6 điểm, còn lại 10% sẽ cao hơn 6 điểm. Hay một ví dụ khác, sau khi làm bài đánh giá năng lực để pv vào 1 công ty, người ta thông báo cho bạn điểm số của bạn có Percentile là: 74%. Nghĩa là trong số tất cả những người đã làm bài test này, có 74% số người có điểm thấp hơn bạn, và 26% còn lại có điểm số cao hơn bạn.
• Median (millisecond): Nó gần giống với trung bình, nhưng ý nghĩa thì khác hoàn toàn. Median + một giá trị A, sẽ chia toàn bộ các giá trị của bạn thành 2 phần bằng nhau, một phần sẽ chứa những giá trị < A, phần còn lại sẽ chứa những giá trị > A. Median cũng được hiểu như là 50th Percentile. Quay lại Performance, thì Median sẽ chỉ ra, sẽ có 50% số request có response time nhỏ hơn giá trị (hiển thị trên table), và 50% số request còn lại có response time lớn hơn giá trị này
• 90% Line (90th Percentile) (millisecond):nghĩa là 90% số requests sẽ có response time nhỏ hơn giá trị hiển thị trong table, 10% số requests còn lại sẽ có response time lớn hơn giá trị hiển thị trong table
• 95% Line (90th Percentile) (millisecond):nghĩa là 95% số requests sẽ có response time nhỏ hơn giá trị hiển thị trong table, 5% số requests còn lại sẽ có response time lớn hơn giá trị hiển thị trong table
• 99% Line (90th Percentile) (millisecond):nghĩa là 99% số requests sẽ có response time nhỏ hơn giá trị hiển thị trong table, 1% số requests còn lại sẽ có response time lớn hơn giá trị hiển thị trong table
3 thông số percentile 90th, 95th và 99th là những thông số rất được hay sử dụng trong percentile, không chỉ Performance Testing mà còn trong những lĩnh vực khác nữa. Và những con số này hoàn toàn có thể cấu hình được trong JMeter thông qua file jmeter.properties, từ phiên bản 2.12. Mở file này từ folder /JMETER_HOME/bin/ và tìm đến những dòng như bên dưới:
```
CODE: SELECT ALL

#---------------------------------------------------------------------------
# Aggregate Report and Aggregate Graph - configuration
#---------------------------------------------------------------------------
#
# Percentiles to display in reports
# Can be float value between 0 and 100
# First percentile to display, defaults to 90%
#aggregate_rpt_pct1=90
# Second percentile to display, defaults to 95%
#aggregate_rpt_pct2=95
# Second percentile to display, defaults to 99%
#aggregate_rpt_pct3=99
```
Sau đó hãy uncomment các giá trị aggregate_rpt_pct1, aggregate_rpt_pct2 hoặc aggregate_rpt_pct3 bằng cách xoá dấu # ở đầu, và sửa lại bằng giá trị mà bạn muốn. Như mình, mình đã sửa aggregate_rpt_pct1=75, sau đó save file, restart JMeter, hãy xem nó sẽ hiển thị như thế nào nhé:

![](https://images.viblo.asia/3710554b-8e5c-4e0f-972f-8beabf4b82b6.png)


Note: thay đổi giá trị này, nó sẽ thay đổi label của header trong report, đồng thời cũng tính toán lại cho đúng với con số mới.

• Error %: % số lượng request bị fail, bị lỗi. Ví dụ bạn run request A 100 lần và thấy có 15% errors, nghĩa là request A đã fail/error 15 lần (100*15%)

• Throughput: Thông lượng. Con số này cho bạn biết được số lượng requests được hệ thống (server) xử lý trong 1 đơn vị thời gian, có thể là giây, phút, hoặc giờ. Công thức tính throughput là
Throughput = (Tổng số lượng requests) / (Tổng thời gian) * (Đơn vị chuyển đổi)
Với:
- Tổng số lượng requests = Tổng số lần request này được run
- Tổng thời gian = (Thời gian bắt đầu chạy của request cuối cùng) + (Thời gian chạy/Response Time của request cuối cùng) - (Thời gian bắt đầu chạy của request đầu tiên)
- Đơn vị chuyển đổi: Mặc định nó sẽ tính theo millisecond, nên để đổi về second thì số này sẽ là 1000, hoặc 1000*60 nếu bạn muốn chuyển về phút.

Ví dụ 4: Mình sẽ run 1 test với 5 threads và 2 lần Loop Count, test này chỉ có duy nhất 1 HTTP Request và access vào google. Hãy xem kết quả bên dưới

![](https://images.viblo.asia/613f5b1d-a8a8-43d0-8d21-d6f2a6940782.png)


Trong bài test này thì mình đã sử dụng thêm 1 Listener nữa đó là View Result in Table để có thể thấy các thông số về thời gian start, response time một cách nhanh nhất.

Thời gian bắt đầu chạy của request đầu tiên: 17:24:55.911 (1476095095911 in ms)
Thời gian bắt đầu chạy của request cuối cùng: 17:24:56.838 (1476095096838 in ms)
Thời gian chạy/Response Time của request cuối cùng: 155ms
Tổng thời gian = (1476095096838 + 155 – 1476095095911) = 1082
Tổng số lượng requests = 10

Throughput = 10 / 1082 * 1000 ≈ 9.2/sec

Lưu ý: Đối với JMeter thì nó luôn luôn hiển thị Throughput > 1.0, vì vậy trong 1 số trường hợp số này < 1.0 thì nó sẽ convert qua 1 đơn vị khác để hiển thị. Ví dụ 0.5 requests/second, 0.5 ko thoả điều kiện, nên nó sẽ hiển thị là 30requests/min. Cũng tương đường mà, phải không bạn ;) Nhưng nếu bạn ghi kết quả ra file CSV, thì con số throughput luôn luôn ở dạng request/second, nên trong trường hợp này nó sẽ hiển thị là 0.5

• KB/sec: Cũng là thông lượng, nhưng ko đo lường bằng số request, mà đo Kilobytes/second. Công thức là
Throughput KB/sec = (Throughput * Average Bytes) / 1024
Với Aggregate Report thì mình không thấy được thông số Average Bytes. Bạn có thể xem thông số này từ Summay Report.

• Total: Trong report có 1 dòng cuối cùng đó là Total, nó sẽ tổng kết lại toàn bộ kết quả từ những request bên trên. Ngoại trừ # Samples, Throughput và KB/sec, nó sẽ được cộng lại theo đúng nghĩa "Total". Còn các thông số còn lại đều được tính Total bằng cách lấy giá trị trung bình từ tất cả những request ở trên.

## 2. Phân tích Report:

Sau khi đọc xong phần 1 ở trên, thì ít nhất các bạn cũng đã có cái nhìn tổng quan về các thông số trong report. Ý nghĩa của từng thông số là gì. Bước tiếp theo đây, hãy nhìn vào những con số đó và đưa ra một đánh giá phù hợp.

Hãy tập trung vào 2 thông số quan trọng nhất của mọi Performance Report:

Response Time: chỉ ra được việc xử lý request NHANH hay CHẬM. Và đương nhiên, Response Time thì phải càng THẤP càng tốt.
Throughput: chỉ ra được số lượng requests được server xử lý trong một đơn vị thời gian. Vậy thì, cùng một thời gian, càng xử lý được càng nhiều càng tốt. Nên với Throughput thì nó phải càng CAO càng tốt

Dựa vào đó, chúng ta có những trường hợp như sau:
1. Response Time: THẤP and Throughput: THẤP --> Trường hợp này sẽ không bao giờ xảy ra. Vì Response Time THẤP nghĩa là thời gian đáp ứng rất nhanh, nhưng Throughput THẤP lại chỉ ra rằng số request được xử lý rất ít. Noooo, chuyện này là vô lý
2. Response Time: THẤP and Throughput: CAO --> Đây là một kết quả lý tưởng phải không nào các bạn? Thời gian xử lý thấp và số lượng request xử lý cùng đồng thời lại cao. Còn chần chờ gì nữa mà không tự tin báo cáo rằng Server đang rất tốt. Hãy xem xét khả năng mở rộng các tính năng, hoặc tăng thêm số lượng test để tìm xem giới hạn của server là bao nhiêu.
3. Response Time: CAO and Throughput: THẤP --> Ngược lại với bên trên, đây là lúc mà Performance Test của bạn đã bị fail. Test chỉ ra rằng thời gian xử lý quá cao, và lượng request được xử lý lại rất thấp. Phải xem xét để improve về phía sever side.
4. Response Time: CAO and Throughput: CAO --> Khá nhạy cảm, vì bạn có thể thấy Throughput cao, tức là server đang làm việc rất tốt, vậy tại sao thời gian xử lý lại cũng cao (không tốt). Có thể vấn đề lúc này đế từ phía Client, hoặc cụ thể là đến từ JMeter, có thể đoạn script của bạn viết chưa được tối ưu, khiến quá trình nó xử lý mất nhiều thời gian chẳng hạn? Hãy kiểm tra lại để chắc chắn rằng mình có một kết quả test chính xác nhé.