Hiện tại các bạn dev thường setting gửi thông báo từ một service đến chatbox của Slack, Chatwork. Ví dụ như thông báo từ Github chẳng hạn.
Hôm nay mình sẽ giới thiệu cách gửi thông tin chi phí sử dụng AWS đến Chatwork hoặc Slack.
Cụ thể là các thông tin sau :
* Tổng chi phí sử dụng hôm qua
* Chi phí sử dụng của từng service của ngày hôm qua

# Get thông tin chi phí sử dụng
## Tạo hàm Lambda
Chúng ta sẽ tạo hàm Lambda để định kỳ gửi thông báo đến Slack, Chatwork.

### IAM Policy
Đầu tiên, cần set quyền để có thể chạy API「GetCostAndUsage」.
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "ce:GetCostAndUsage",
            "Resource": "*"
        }
    ]
}
```
Hãy tạo IAM Role attach policy ở trên rồi liên kết đến Lambda.

### Souce code
Đoạn code dưới đây focus vào cách get chi phí sử dụng của từng sản phẩm.
Về cách get tổng chi phí thì mình sẽ giới thiệu ở bài viết sau.
```go
package main

import (
    "fmt"
    "log"
    "time"

    "github.com/aws/aws-lambda-go/lambda"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/costexplorer"
    "github.com/aws/aws-sdk-go/service/costexplorer/costexploreriface"
)

// Get cost
func GetCost(svc costexploreriface.CostExplorerAPI) (result *costexplorer.GetCostAndUsageOutput) {

    // Granularity
    granularity := aws.String("DAILY")

    // Metrics
    metric := "UnblendedCost"
    metrics := []*string{&metric}

    // TimePeriod
    // Get current time
    jst, _ := time.LoadLocation("Asia/Tokyo")
    now := time.Now().UTC().In(jst)
    dayBefore := now.AddDate(0, 0, -1)

    nowDate := now.Format("2006-01-02")
    dateBefore := dayBefore.Format("2006-01-02")

      // Từ hôm qua đến hôm nay
    timePeriod := costexplorer.DateInterval{
        Start: aws.String(dateBefore),
        End:   aws.String(nowDate),
    }

    // GroupBy
    group := costexplorer.GroupDefinition{
        Key:  aws.String("SERVICE"),
        Type: aws.String("DIMENSION"),
    }
    groups := []*costexplorer.GroupDefinition{&group}

    // Tạo Input
    input := costexplorer.GetCostAndUsageInput{}
    input.Granularity = granularity
    input.Metrics = metrics
    input.TimePeriod = &timePeriod
    input.GroupBy = groups

    // Run xử lý
    result, err := svc.GetCostAndUsage(&input)
    if err != nil {
        log.Println(err.Error())
    }

    return result
}

/**************************
    Run xử lý
**************************/
func run() error {
    log.Println("Batch get cost Start")
    log.Println("Create session")
    svc := costexplorer.New(session.Must(session.NewSession()))

    log.Println("Get code Run")
    cost := GetCost(svc)
    log.Println("Get cost Complete")

    fmt.Println(cost)

    log.Println("Batch get cost Complete")
    return nil
}

/**************************
    Main
**************************/
func main() {
    lambda.Start(run)
}
```

### Kết quả chạy
Dưới đây là kết quả được trích ra từ log chạy hàm Lambda
```json
2020/05/06 03:59:54 Batch get cost Start
2020/05/06 03:59:54 Create session
2020/05/06 03:59:54 Get cost Run
2020/05/06 03:59:55 Get cost Complete
{
  GroupDefinitions: [{
      Key: "SERVICE",
      Type: "DIMENSION"
    }],
  ResultsByTime: [{
      Estimated: true,
      Groups: [
        {
          Keys: ["AWS Cost Explorer"],
          Metrics: {
            UnblendedCost: {
              Amount: "0.05",
              Unit: "USD"
            }
          }
        },
        {
          Keys: ["AWS Lambda"],
          Metrics: {
            UnblendedCost: {
              Amount: "0.0000019028",
              Unit: "USD"
            }
          }
        },
      ],
      TimePeriod: {
        End: "2020-05-06",
        Start: "2020-05-05"
      },
      Total: {

      }
    }]
}
2020/05/06 03:59:55 Batch get cost Complete
```

### Giải thích

API「GetCostAndUsage」- dùng khi get tổng chi phí sử dụng, có 3 element input như sau :
* Granularity
* Metrics
* TimePeriod

Lần này, để get chi phí của từng service thì sẽ add thêm element *GroupBy*.
Element GroupBy có thể group 1 nhóm lại với nhau theo 1 điều kiện nào đó. Để chỉ định điều kiện group thì sẽ setting Key và Type.

Key là tiêu chuẩn nhận định, Type nghĩa là sẽ phân loại như thế nào. 
Để biết được chi phí sử dụng của từng service thì làm như sau:
```go
Key:  aws.String("SERVICE"),
Type: aws.String("DIMENSION"),
```

Đoạn code trên nghĩa là chúng ta sẽ group theo DIMENSION của SERVICE.

Chú ý là khi add thêm element GroupBy thì không thể get được tổng chi phí nữa. Nên, để vừa get được tổng chi phí sử dụng, vừa get được chi phí của từng service như đầu bài đưa ra thì cần phải request 2 lần.

# Kết
Vì không thể get cả tổng chi phí và chi phí sử dụng của từng service trong 1 lần request nên cần phải chạy API 2 lần. Tuy nhiên việc chạy api 2 lần khá phiền phức nên bạn cũng có thể chạy api để get chi phí sử dụng của từng service rồi tự cộng lại cũng được.

Ví dụ ban có thể cộng lại như sau:
```go
func SumCost(cost *costexplorer.GetCostAndUsageOutput) (total string){

    sum := 0.0
    for _, data := range cost.ResultsByTime[0].Groups {
        amount, _ := strconv.ParseFloat(*data.Metrics["UnblendedCost"].Amount, 64)
        sum = sum + amount
    }
    total = fmt.Sprintf("%.10f", sum)
    return total
}
```

Vì cost get về có dạng String, nên sẽ chuyển vê dạng float64 rồi cộng tổng lại với nhau.