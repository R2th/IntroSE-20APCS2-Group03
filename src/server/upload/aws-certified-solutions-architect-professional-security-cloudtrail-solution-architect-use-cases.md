## Introduction
A quick note about AWS CloudTrail Solution Architect Use Cases. This post is a quick note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a course by Stephane Maarek.

## CloudTrail Solution Architect - Delivery to S3
The first use case for the Solution Architect example. CloudTrail delivers log files to an S3 bucket.

![image.png](https://images.viblo.asia/e4a82481-81aa-4c3a-a32d-f990cd845a4a.png)

You can deliver copies of events to Amazon S3 every five minutes. By default, Amazon S3 buckets and objects are private, you need to modify an Amazon S3 bucket to receive log files for an organization trail.

Log files sent from CloudTrail will be encryption, SSE-S3 by default, but you can set up manually SSE-KMS.

To optimize and save your costs, you could set up a lifecycle policy on your S3 bucket to transition objects to the **S3 Glacier**.

If you need notification when an S3 bucket receives an object, you can enable S3 events to notify either an SQS, SNS or Lambda function.

You can also have CloudTrail deliver notifications directly to SNS, and from SNS you could invoke SQS or Lambda.

AWS provides you with different methods based on the case.

## CloudTrail Solution Architect - Multi Account, Multi Region Logging
The second use case for the Solution Architect example. Cross Account Monitor Architect.

![image.png](https://images.viblo.asia/d7ae7aeb-4e81-481f-9120-c34de5036500.png)

In the above image, we have two accounts, account A and account B, and we have a security account that we need to send logs into it.

In the two accounts, we have CloudTrail, and we’ll set up an S3 bucket in the security account that hold the logs of all these CloudTrail.

And the only way for us to deliver log files into an S3 bucket in the security account is to define an S3 bucket policy, and that S3 bucket policy should allow CloudTrail to deliver files into S3.

## Alert for API calls
The third use case for the Solution Architect example. Alert for certain API calls is done.

![image.png](https://images.viblo.asia/0f685975-4700-4e8a-b4ec-9d7835c0fc8a.png)

From CloudTrail you can stream all these events into CloudWtach Logs, and from CloudWatch Logs, you can open up a bunch of use cases.

With the above image, after CloudWatch Logs receive log files from CloudTrail, you can create a metric filter and alarms to monitor the events in the log files.

For example, you can specify an event such as the Amazon EC2 RunInstances operation and CloudWatch will send you notifications to SNS when that event occurs, and from SNS you could invoke SQS or Lambda.

## CloudTrail: How to react to events the fastest?
Overall, CloudTrail may take up to 15 minutes to deliver events, but you can combine CloudTrail with other tools to react to events faster.

The first and fastest, most reactive way is using CloudWatch Events, which can be triggered for any API call in CloudTrail and you can set up by creating a trail.

The second way is using CloudTrail delivery to CloudWatch Logs, the events are streamed.

The third way is using CloudTrail delivery to S3, the events are delivered every five minutes.

You can have different solutions, either CloudWatch Events, CloudWatch Logs, or S3, and none of them is bad or great, it just depends on what you are trying to achieve.

## End
End quick note about AWS CloudTrail Solution Architect use cases.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập từ tháng 8 năm 2021, ban đầu chỉ có hai sếp, một bạn Backend và một bạn Front-end, mình là thành viên thứ 5 và sau đó team từ từ đã có nhiều thành viên hơn. Với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).