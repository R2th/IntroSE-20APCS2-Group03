### Chào các bạn hôm nay mình xin giới thiệu bài về sử dụng Cloudwatch Events để thông báo về Slack khi AWS ECS task gặp sự cố

* **CloudWatch Events là gì ?**

    Khi sử dụng CloudWatch Events, bạn sẽ định nghĩa một event pattern cho một AWS resources. Theo đó khi mà resources đó có hành động giống như trong pattern mình đã định nghĩa thì trigger sẽ được kích hoạt. 
    Hôm nay mình sẽ giới thiệu sử dụng Lambda để gửi tin nhắn đến Slack thông báo khi mà ECS task bị Stopped vì một lý do nào đó (Có thể healthcheck Load Balancer failed, do user cố ý stop ECS task, ...)
    
* **Cấu trúc tổng quát**
    ![](https://images.viblo.asia/42fa6ff3-09b1-4a2d-9af7-0b3c3d55b848.png)
    
* `handler.js`
    ```javascript
    const axios = require('axios');
   // Search GG để lấy webhook url
    const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK; 
    const AWS_REGION = process.env.AWS_REGION;

    module.exports.notification = event => {

      if(event['source'] && event['source'] === 'aws.ecs') {
        const detail = event['detail'];
        const header = 'ECS task bị stop rồi đại ca ơi!!!';

        let clusterName = detail['clusterArn'].split('/')[1];
        let taskId = detail['taskArn'].split('/')[1];
        let taskDefinition = detail['taskDefinitionArn'].split('/')[1];

        let detailJson = JSON.stringify(detail, null, 2);
        let url = `https://${AWS_REGION}.console.aws.amazon.com/ecs/home?region=${AWS_REGION}#/clusters/${clusterName}/tasks/${taskId}/details`;

        let attachments = {
          'text': `${header} \n Cluster: *${clusterName}* \n Task Definition: *${taskDefinition}* \n ${url}\n ` + "```" + `${detailJson}` + "```",
          'color': 'danger'
        };
        axios.post(SLACK_WEBHOOK, {attachments: [attachments]});
      }
    };
    ```
    
*  `serverless.yml`
    ```yaml
    service: notification-ecs

    provider:
      name: aws
      stackName: ecs-${self:provider.stageName}-notification-lambda
      runtime: nodejs12.x
      region: ap-northeast-1
      stageName: ${opt:stageName,self:custom.stageName}
      timeout: 30
      memorySize: 128
      
      custom:
          stageName: dev
          accounts: XXXXXXXXX
          
   resources:
      Resources:
        IamRoleLambdaExecution:
          Type: AWS::IAM::Role
          Properties:
            RoleName: EcsNotificationRole
            AssumeRolePolicyDocument:
              Version: '2012-10-17'
              Statement:
                - Effect: Allow
                  Principal:
                    Service:
                      - lambda.amazonaws.com
                  Action: sts:AssumeRole
            Policies:
              - PolicyName: myPolicyName
                PolicyDocument:
                  Version: '2012-10-17'
                  Statement:
                  - Effect: "Allow"
                    Action:
                      - "s3:*"
                      - "logs:CreateLogGroup"
                      - "logs:CreateLogStream"
                      - "logs:PutLogEvents"
                    Resource: "*"
   functions:
        notificationECS:
        handler: handler.notification
        environment:
          SLACK_WEBHOOK: 'https://hooks.slack.com/services/XXXXXXXX/YYYYYYYYY/VVVVVVVVVVVVVVVVVVVVVVVV'
        events:
          - eventBridge:
              pattern:
                source:
                  - "aws.ecs"
                detail-type:
                  - "ECS Task State Change"
                detail:
                  clusterArn:
                      - !Sub "arn:aws:ecs:${self:provider.region}:${self:custom.accounts.${self:provider.stageName}}:cluster/ecs-${self:provider.stageName}-cluster"
                  lastStatus:
                    - "STOPPED"
    ```
    
* Deploy
   ```shell
   $ sls deploy --profile xxxxxx --region aa-bbbbbb-Z
   ```
* Test

    Thử stop ECS task để xem tin nhắn đã về chưa !!


Cảm ơn các bạn đã đọc tới đây. Nếu có gì thắc mắc hãy comment dưới bài mình sẽ trả lời trong tầm hiểu biết của mình. 
Hẹn gặp lại các bạn ở bài tiếp theo!!!