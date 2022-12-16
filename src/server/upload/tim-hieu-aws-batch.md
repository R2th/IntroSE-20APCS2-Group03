Hello các bạn, hôm nay mình sẽ giới thiệu với các bạn 1 service của amazon web services, đó chính là aws batch. Nói qua tiểu sử của aws batch thì nó chính thức được đặt chân lên aws vào 5-1-2017. Sau đó trải qua các lần release thì mới nhất là vào 5-4-2018. Cũng khá là mới mẻ so với các dịch vụ khác của aws.

## 1. AWS Batch là gì? 

- Để giới thiệu về aws batch thì trên trang chủ của aws đã nói rất rõ rồi (đây là [link](https://aws.amazon.com/vi/batch/), có tiếng việt để các bạn xem luôn nhé). Mình chỉ tóm tắt lại 1 số điểm của aws batch:
    - là service sinh ra để xử lý các job cụ thể
    - không cần cài đặt, quản lý backend 
    - chạy bằng ecs, sử dụng container để xử lý process
    - Có 2 dạng on-demain và spot để lựa chọn cho ecs

## 2. Các thành phần của AWS Batch 

#### 2.1. Compute environments: là nơi tạo môi trường cho ECS. Tất cả các thành phần khác phải dựa vào compute environment mới chạy được.
- container instance trên ec2. có 2 loại: managed (aws scale và config instance) và unmanaged (tự quản lý)
- service role: role cho container trong job
- instance role: dùng cho ecs instance (tạo ecs, ecr, cloudwatch logs ...)
- resource: có thể chọn on-demand hoặc spot
- min vcpu = 0 (không có instance khi không có work)
- có thể chỉ định AMI
- network: chỉ định VPC, subnet, SG

#### 2.2. Job queue
- 1 queue dựa trên compute environment
- job submit vào sẽ được đẩy lên queue
- priority: job queue càng cao thì dộ ưu tiên sẽ càng lớn

#### 2.3. Job definition
- định nghĩa sẵn các job (giống template) nó sẽ chứa image, command, cpu ....  
- Job role: sử dụng Amazon ECS IAM roles cho task functionality

#### 2.4. Jobs
- nơi submit 1 job 
- xác định job type (single hay array: thực hiện tách thành nhiều job con trong 1 job to)
- trạng thái các job

| Trạng thái | Miêu tả |
| -------- | -------- |
| SUBMITTED     | job được đưa vào queue     |
| PENDING | chuẩn bị compute environment nếu chưa được tạo hoặc check những job khác, nếu có dependency thì xử lý các dependency trước. nếu không thì chuyển sang trạng thái RUNNABLE|
| RUNNABLE | job sẵn sàng chạy khi có đủ resource hoặc pending mãi nếu ko đủ resource hoặc thiếu role tạo cloudwatch log | 
| STARTING | job được đưa vào container instance để xử lý |
| RUNNING | job tiến hành xử lý |
| SUCCEEDED | job xử lý thành công. lưu trên batch 24h |
| FAILED | job xử lý lỗi (sau số lần timeout). lưu trên batch 24h |

## 3. Demo
#### 3.1. Miêu tả

![](https://images.viblo.asia/19bf7f0a-6ca0-44e0-ae23-f8b8510d11ff.png)

Mình sẽ demo cho các bạn thử 1 ví dụ như trên. 

Cụ thể: Khi người dùng upload file "color.txt" lên s3. 

color.txt: 
```
red
orange
yellow
green
blue
indigo
violet
```
lambda sẽ thực thi submit 2 job. 
- Job 1 sẽ xử lý: cắt các dòng từ color.txt thành 7 file con có dạng: 
```
My favorite color of the rainbow is red.
```

- Job 2 sẽ tổng hợp 7 file thành 1 file chung "mycolor" và đẩy kết quả lên s3:
```
My favorite color of the rainbow is red.
My favorite color of the rainbow is orange.
My favorite color of the rainbow is yellow.
My favorite color of the rainbow is green.
My favorite color of the rainbow is blue.
My favorite color of the rainbow is indigo.
My favorite color of the rainbow is violet.
```

#### 3.2. Các bước thực hiện
- Tạo S3 bucket
- Tạo image xử lý cho 2 job
- Up image lên ecr
- Tạo compute environment
- Tạo queue
- Tạo 2 job definition
- Tạo lambda
- Tạo trigger event S3 

OK. Giờ mình sẽ đi vào chi tiết.

##### 3.2.1. Tạo S3: phần này các bạn có thể tạo bất cứ bucket nào nhé.

##### 3.2.2. Tạo image
- Đối với job 1: 
    - File print.sh
```
#!/bin/sh
aws s3 cp s3://bucket/color.txt .
LINE=$((AWS_BATCH_JOB_ARRAY_INDEX + 1))
COLOR=$(sed -n ${LINE}p colors.txt)
echo My favorite color of the rainbow is $COLOR >> line$LINE
aws s3 cp line$LINE s3://bucket/
```

    - Dockerfile: phần này có lưu ý là region các bạn để lại đúng region đang test nhé
```
FROM ubuntu:16.04
RUN apt-get update
RUN apt-get install -y awscli
RUN aws configure set default.region xxxxx
COPY print.sh /opt/print.sh
RUN chmod +x /opt/print.sh
ENTRYPOINT /opt/print.sh
WORKDIR /opt
```

- Job 2:
    - File entrypoint.sh
```
#!/bin/bash
aws s3 cp s3://bucket/ . --rescusive
for i in `ls |grep line`
do
cat $i >> mycolor
done
aws s3 cp mycolor s3://bucket/mycolor
```
    - Dockerfile
```
FROM ubuntu:16.04
RUN apt-get update
RUN apt-get install -y awscli
RUN aws configure set default.region xxxx
COPY entrypoint.sh /opt/entrypoint.sh
RUN chmod +x /opt/entrypoint.sh
ENTRYPOINT entrypoint.sh
WORKDIR /opt
```

##### 3.2.3. Up image lên ecr
- Tạo ecr: Services -> Elastic Container Service -> Repositories -> Create repository -> cuongtv
- sau khi tạo ecr, các bạn có thể thấy cách push image = button "View push command"
- build image: 
```
# docker build -t job1 .
# docker build -t job2 .
```
- tag image:
```
# docker tag job1 xxxxx.dkr.ecr.us-east-2.amazonaws.com/cuongtv:job1
# docker tag job2 xxxxx.dkr.ecr.us-east-2.amazonaws.com/cuongtv:job2
```
- push image:
```
# docker push xxxxx.dkr.ecr.us-east-2.amazonaws.com/cuongtv:job1
# docker push xxxxx.dkr.ecr.us-east-2.amazonaws.com/cuongtv:job2
```
nếu bạn nào bị báo 
```
denied: Your Authorization Token has expired. Please run 'aws ecr get-login --no-include-email' to fetch a new one.
```
thì hãy xem lại phần **push command** nhé

##### 3.2.4. Tạo compute environment
- Service -> Batch -> Compute Environments -> Create a compute environment
    - Compute environment type: managed
    - Compute environment name: cuongtv-environment
    - Service role: Create new role (batch tạo role AWSBatchServiceRole)
    - Instance role: Create new role (batch tạo role ecsInstanceRole)
    - Key pair: cá nhân nhé
    - Provisioning model: On-demand or spot
    - Allowed instance types: optimal (cho aws tự chọn type phù hợp)
    - Minimum vCPUs: 0
    - Desired vCPUs: 0
    - Maximum vCPUs: 255
    - VPC Id: id của vpc
    - Subnets
    - Security groups
=> Create

##### 3.2.5. Tạo queue
- Service -> Batch -> Job queues -> Create queue:
    - Queue name: cuongtv-queue
    - Priority: 1
    - Enable Job queue
    - Select a compute environment: cuongtv-environment (vừa tạo)
=> Create

##### 3.2.6. Tạo 2 job definition
- Service -> Batch -> Job definitions -> Create 
    - Job definition name: cuongtv-defi-job1
    - Job role: "AmazonECSTaskS3BucketPolicy" trước khi tạo role thì bạn phải tạo IAM role có quyền access s3 trước
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1465589882000",
            "Effect": "Allow",
            "Action": [
                "s3:*"
            ],
            "Resource": [
                "arn:aws:s3:::*"
            ]
        }
    ]
}
```

    - Container image: xxxxx.dkr.ecr.us-east-2.amazonaws.com/cuongtv:job1
=> Create Job definition

- Tương tự với job 2: image: xxxxx.dkr.ecr.us-east-2.amazonaws.com/cuongtv:job2

##### 3.2.7. Tạo lambda
- Service -> lambda -> Create function
    - Name: lambda-event
    - Runtime: Nodejs 8.10
    - Role: Create custome role (AWSBatchFullAccess + CloudWatchLogsFullAccess + AmazonS3FullAccess) mình làm demo nên cho full quyền. các bạn giới hạn lại sau nhé
=> Create function

```
'use strict';

const AWS = require('aws-sdk');
const S3  = new AWS.S3();

// AWS Batch Setting
const BATCH         = new AWS.Batch({apiVersion: '2016-08-10'});

console.log('Loading function');

exports.handler = (event, context, callback) => {

    // let bucket = event.Records[0].s3.bucket.name;
    // let key = event.Records[0].s3.object.key;
    // let filePath = bucket + '/' + key;
    // console.log(filePath);

    let params = {
        jobDefinition: 'cuongtv-defi-job1', 
        jobName: 'lambda-job1',
        jobQueue: 'cuongtv-queue',
        arrayProperties: { 
            size: 7
        }
    };

    // Submit the Batch Job
    BATCH.submitJob(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
        if (err) {
            console.error(err);
            const message = `Error calling SubmitJob for: ${event.jobName}`;
            console.error(message);
            callback(message);
        } else {
            const jobId = data.jobId;
            console.log('jobId:', jobId);
            callback(null, jobId);
            
                // submit job 2
                let params2 = {
                    jobDefinition: 'cuongtv-defi-job2', 
                    jobName: 'lambda-job2',
                    jobQueue: 'cuongtv-queue',
                    dependsOn: [{
                        jobId: jobId,
                        type: 'SEQUENTIAL',
                    }]
                };
            
                // Submit the Batch Job
                BATCH.submitJob(params2, function (err, data2) {
                    if (err) console.log(err, err.stack);
                    else console.log(data2);
                    if (err) {
                        console.error(err);
                        const message = `Error calling SubmitJob for: ${event.jobName}`;
                        console.error(message);
                        callback(message);
                    } else {
                        const jobId2 = data2.jobId;
                        console.log('jobId2:', jobId2);
                        callback(null, jobId2);
            
        } 
    });
        } 
    });
};
```
=> Create

##### 3.2.8. Tạo trigger event S3 
- S3 -> Bucket -> Properties -> Events -> Add notification 
    - Events: Put
    - Prefix: Lambda 
    - Function -> lambda-event => Save

##### 3.2.9. Test
ok. mọi việc chuẩn bị đã xong. giờ các bạn hãy thử put file color.txt lên bucket và đợi nhé. lambda sẽ tự submit 2 job trên aws batch. và batch sẽ xử lý lần lượt job 1 xong sẽ tới job 2. kết quả sẽ được update lên s3.

![](https://images.viblo.asia/c72eec8c-5497-41a1-b547-924a1f4194d0.png)

![](https://images.viblo.asia/93342370-2cfc-4a32-afa2-f045e710b332.png)

Tài liệu tham khảo: 
https://docs.aws.amazon.com/batch/latest/userguide/array_index_example.html
https://aws.amazon.com/batch/