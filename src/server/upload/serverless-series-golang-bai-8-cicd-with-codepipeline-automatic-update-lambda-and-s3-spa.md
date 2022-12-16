## Giới thiệu
Chào các bạn tới với series về Serverless, ở bài trước chúng ta đã tìm hiểu về Lambda version và alias để tổ chức các môi trường phát triển khác nhau cho một application. Ở bài này chúng ta sẽ tìm hiểu về cách xây dựng luồng CI/CD để nó tự động cập nhật lại Lambda version của ta khi ta thay đổi function code và push nó lên git repo, với luồng CI/CD cho trang Single Page Application.

Có rất nhiều tool để ta xây dựng CI/CD, phổ biến nhất là Jenkins, Gitlab CI, Circle CI. Ở bài này mình sẽ không dùng mấy tool đó mà mình sẽ dùng CodePipeline của AWS, vì khi ta làm việc với AWS thì CodePipeline cung cấp cho ta khá nhiều cách native intergate với các dịch vụ của AWS, giúp việc triển khai CI/CD của ta đơn giản hơn nhiều. Git repo mà mình sẽ sử dụng là github.

Hình minh họa system ta sẽ xây dựng. CI/CD cho Lambda, main branch.

![](https://images.viblo.asia/11916a45-5e23-47b0-a858-2ce9da0030be.jpg)

Dev branch.

![image.png](https://images.viblo.asia/1fb5f255-74d8-4350-8048-fa86121ec226.png)

CI/CD cho Single Page Application

![](https://images.viblo.asia/db073448-9012-48c2-adab-50e8d4bc9cca.jpg)

## Provisioning previous system
Mình sẽ dùng terraform để tạo lại hệ thống, nếu các bạn muốn biết cách tạo bằng tay từng bước thì các bạn xem từ [bài 2](https://viblo.asia/p/serverless-series-golang-bai-2-build-rest-api-with-aws-api-gateway-6J3Zga3L5mB) nhé. Các bạn tải source code ở git repo này https://github.com/hoalongnatsu/serverless-series.git.

Di chuyển tới folder bai-8/terraform-start. Ở file policies/lambda_policy.json, dòng "Resource": "arn:aws:dynamodb:us-west-2:<ACCOUNT_ID>:table/books", cập nhật lại <ACCOUNT_ID> với account id của bạn. Xong sau đó chạy câu lệnh.

```
terraform init
terraform apply -auto-approve
```

Sau khi Terraform chạy xong, nó sẽ in ra terminal URL của API Gateway và website.

```
base_url = {
  "api_production" = "https://n4fh8jwgsk.execute-api.us-west-2.amazonaws.com/production"
  "api_staging" = "https://n4fh8jwgsk.execute-api.us-west-2.amazonaws.com/staging"
  "web" = "d2mj9ialjyrxnm.cloudfront.net"
}
```

## CodePipeline
Là một dịch vụ của AWS giúp ta trong việc xây dựng luồng pipeline cho CI/CD. Một pipeline sẽ bao gồm nhiều **Stage**. Stage có thể hiểu như là một step trong pipeline, ta phải đi qua từng step để hoàn hành một pipeline. Đây là giao diện của một pipeline ở trên AWS.

![image.png](https://images.viblo.asia/9f53dbab-1650-4bd9-9b8c-4a3e819e1d59.png)

Từng  Stage sẽ một hoặc nhiều **Action**, action giống như job, là công việc mà Stage đó cần thực hiện, ví dụ như là pull source code, đánh tag, build source code.

![image.png](https://images.viblo.asia/959a9642-61eb-4163-a65b-6d62705cb403.png)

Từng action sẽ có các category khác nhau. Ba category mà ta hay xài sẽ là Source (pull code), Build (build source), Deploy (deploy code). Khi ta chọn action với category là Build sẽ trigger **CodeBuild**, action với category là Deploy sẽ trigger **CodeDeploy**.

### CodeBuild
CodeBuild sẽ thực hiện vai trò build source code cho ta, có thể là dùng nó để build bundle code bằng yarn hoặc build container image dùng docker. Hoặc ta cũng có thể dùng nó để tiến hành bước deploy code lên server, vì CodeDeploy chỉ hỗ trợ deploy một vài service như S3, ECS, … chứ không có hỗ trợ hết. Ví dụ như ta muốn deploy image mới lên trên K8S, ta không thể dùng CodeDeploy được.

CodeBuild sẽ thực hiện các câu lệnh build thông qua một config file yaml, AWS gọi file đó là file buildspec, nó sẽ chứa toàn bộ câu lệnh build và các cấu hình liên quan.

Cấu trúc file buildspec đơn giản sẽ gồm các thuộc tính sau.

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      <runtime-versions>
    commands:
      - <command>
      - <command>
  pre_build:
    commands:
      - <command>
      - <command>
  build:
    commands:
      - <command>
  post_build:
    commands:
      - <command>
      - <command>
```

`install` sẽ chứa các câu lệnh cài đặt những thứ cần thiết cho môi trường của ta, nó sẽ có trường runtime-versions chỉ định runtime mà ta sẽ xài cho quá trình build này, như là nodejs, java, golang, docker.

`pre_build` sẽ được chạy trước câu lệnh build, dùng để cài module cần thiết cho source của ta, ví dụ ta sẽ chạy yarn install ở bước này.

`build` sẽ chứa những câu lệnh build code, ví dụ như yarn build.

`post_build` sẽ chứa các câu lệnh mà ta cần chạy sau khi build xong, như là clear cache.

### CodeDeploy
CodeDeploy hỗ trợ deploy code lên trên một vài dịch vụ của AWS cho ta, thay vì ta phải tự viết buildspec. 

Ví dụ, muốn deploy code lên S3, ta phải viết file buildspec rồi dùng câu lệnh như sau để deploy.

```
aws s3 cp <dir> s3://<bucket>/ --recursive
```

Thì CodeDeploy hỗ trợ sẵn cho ta bước này mà không cần phải viết câu lệnh deploy nào cả.

## Create CI/CD for Lambda
### Flow
Từ hệ thống ở [bài trước](https://viblo.asia/p/serverless-series-golang-bai-7-organization-environment-with-lambda-version-and-alias-V3m5WkMb5O7), ta sẽ có API Gateway với hai Stage là staging và production, với function ở staging sẽ chỉa tới Lamda version $LATEST, production sẽ chỉa tới Lambda alias là production, và alias production sẽ chỉa tới Lambda version mới nhất.

Luồng CI/CD của ta sẽ như sau, ta sẽ có một branch staging để dev, khi ta có thay đổi thì thì push lên nhánh staging, CI/CD sẽ build code rồi update function cho ta, khi ta gọi tới API Gatewate với Stage là staging thì nó sẽ nhận được code mới. Xong khi ta thấy mọi thứ ok, ta sẽ merge từ nhánh staging vào nhánh main, CI/CD sẽ tạo một Lambda version mới từ function hiện tại của nhánh staging mà ta đã thấy ok, sau đó nó sẽ cập nhật lại version của Lambda alias production.

Đầu tiên ta sẽ tạo một repository ở trên github trước, chọn public mode nhé, sau đó các bạn push code của list function lên trên repo đó. Code các bạn tải ở repository này `https://github.com/hoalongnatsu/codepipeline-list-function`, sau đó bạn tạo thêm một branch staging nữa.

![image.png](https://images.viblo.asia/1ec014a0-db50-4bd8-b74f-4de98b98773c.png)

### Connect to git repository
Tiếp theo ta sẽ lên AWS Console để tạo connection tới git repository của ta, để CodePipeline có thể pull source code của ta xuống được. 

1. Truy cập https://console.aws.amazon.com/codesuite/settings/connections.
2. Bấm vào Create connection.
3. Mục **Select a provider** chọn GitHub. Tên connection điền vào tùy ý.

![image.png](https://images.viblo.asia/5e31c9bf-6396-4dce-8d08-eb0756545435.png)

4. Bấm Connect to GitHub, nó sẽ dẫn ta qua trang có UI bên dưới, bấm vào Install a new app.

![image.png](https://images.viblo.asia/f1cea15d-d4aa-4dbd-a24c-5087c7d6102a.png)

5. Nó sẽ dẫn ta qua trang UI bên dưới, các bạn chọn All repositories, bấm Save.

![image.png](https://images.viblo.asia/71b1d3e2-d536-4b25-b895-1e2f7e38701f.png)

Ở trên là khi tạo repo ở public mode, còn nếu bạn tạo private mode thì nó sẽ có thêm một bước nữa là authentication với github thôi, ví dụ nếu bạn tạo ở private mode thì khi bấm Install new app, nó sẽ dẫn bạn qua trang sau.

![image.png](https://images.viblo.asia/21b2cc28-e31a-4435-86fc-eadb3738b0a7.png)

Ta chỉ việc chọn tài khoản github của mình thôi, cũng đơn giản.

5. Sau khi bấm Save, nó sẽ dẫn ta quay vễ chỗ tạo connect, ta bấm Connect, ta sẽ thấy connection của ta.

![image.png](https://images.viblo.asia/dd1ddab8-1f07-466d-8e45-3dce161d43d8.png)

### Create pipeline for branch staging
Tiếp theo ta sẽ tiến hành tạo pipeline.

1. Truy cập CodePipeline console https://console.aws.amazon.com/codesuite/codepipeline.
2. Bấm Create pipeline. Nó sẽ dẫn ta qua trang tạo, nhập vào tên tùy ý, ở **Service role** chọn New service role. Bấm Next.

![image.png](https://images.viblo.asia/f8489c3a-2813-484e-88bb-f8af02edf506.png)

3. Mục **Source**, ta chọn GitHub version 2.

![image.png](https://images.viblo.asia/cf11388c-b4a9-4e92-9459-947f34cb1989.png)

4. Chỗ **Connection**, chọn connection ta vừa tạo, chọn repo name và branch staging. Bấm Next.

![image.png](https://images.viblo.asia/446de170-d449-497c-adc2-c017c05b2858.png)

5. **Build provider** ta chọn CodeBuild. Chỗ project name, ta có thể chọn CodeBuild có sẵn hoặc tạo mới CodeBuild khác, ta sẽ tạo mới. Bấm vào Create project để tạo CodeBuild. 

Nó sẽ hiển thị một modal để ta nhập thông tin của CodeBuild project. Chỗ project name ta nhập tùy ý.

![image.png](https://images.viblo.asia/82146c62-1450-4658-972f-74db180c1861.png)

Chỗ Enviroment, chọn Ubuntu.

![image.png](https://images.viblo.asia/05ce53d8-40a5-40df-89dc-7660bbbcebef.png)

Runtime(s) chọn Standard, image chọn version mới nhất. **Check vào Privileged khi ta cần CodeBuild chạy build image cho container.**

![image.png](https://images.viblo.asia/035fe28e-08b4-4be6-ae63-55e37eb01424.png)

Ở mục Service role, chọn New service role.

![image.png](https://images.viblo.asia/3550307f-c8f3-4290-b416-040b2b2a940d.png)

Mấy phần còn lại để mặc định và kéo xuống tới cuối bấm Continue to CodePipeline. Build type ta chọn Single build. Bấm Next.

![image.png](https://images.viblo.asia/d5a7210e-562a-443c-b3e9-a20b38df2e35.png)

6. Ở mục Deploy, ta bấm Skip deploy stage, vì ta chưa cần. Nó sẽ hiện lên cái modal, ta bấm Skip.
7. Review và bấm Create pipeline. Ta sẽ thấy pipeline của ta được trigger chạy, nhưng ở Build Stage nó sẽ bị lỗi.

![image.png](https://images.viblo.asia/859d883e-ef79-46b3-abcd-41c237faa585.png)

Vì ta chưa viết file build cho CodeBuild, giờ ta sẽ tiến hành viết file buildspec ở trong repo chứa code của ta.

### Create file buildspec
Tạo một file tên là buildspec.yaml.

```buildspec.yaml
version: 0.2

phases:
  install:
    runtime-versions:
       golang: 1.x
  pre_build:
    commands:
      - go get
  build:
    commands:
      - sh build.sh
  post_build:
    commands:
      - aws lambda update-function-code --function-name books_list --zip-file fileb://list.zip
```

Oke, commit và push code lên, ta sẽ thấy pipeline của ta chạy lại. Nhưng bạn vẫn sẽ thấy nó bị lỗi, để kiểm tra lỗi, ta cần phải vào xem log.

![image.png](https://images.viblo.asia/2fd9e27e-f364-4cae-a7bf-a69a7a770596.png)

Khi kiểm tra log, ta sẽ thấy nó có lỗi là.

```
An error occurred (AccessDeniedException) when calling the UpdateFunctionCode operation: User: arn:aws:sts::<ACCOUNT_ID>:assumed-role/codebuild-test-build-service-role/AWSCodeBuild-f37d61c4-000c-41a9-bf89-bc42e7a59a50 is not authorized to perform: lambda:UpdateFunctionCode on resource: arn:aws:lambda:us-west-2:<ACCOUNT_ID>:function:books_list because no identity-based policy allows the lambda:UpdateFunctionCode action
```

![image.png](https://images.viblo.asia/f69b6433-0e3c-47f8-93e5-a1ea574af786.png)

Lý do là vì CodeBuild của ta chưa có quyền để thực hiện cập nhật lại Lamda function. Để fix lỗi này, ta cần thêm quyền cho IAM Role của CodeBuild (ở phần tạo CodeBuild ta có chọn New service role).

1. Truy cập IAM console https://console.aws.amazon.com/iamv2/home.
2. Chọn menu **Roles**. Chọn role name của CodeBuild, của mình là codebuild-test-build-service-role.
3. Ở tab **Permissions**, mở Policy CodeBuildBasePolicy-test-pipeline-us-west-2 ra. Và bấm vào Edit policy.

![image.png](https://images.viblo.asia/640d5713-71f7-4183-a88a-c978e4c1bdcf.png)

4. Ở mục Eidt, các bạn bấm qua JSON, thêm vào đoạn json sau.

```
{
    "Effect": "Allow",
    "Action": [
        "lambda:UpdateFunctionCode"
    ],
    "Resource": [
        "*"
    ]
}
```

![image.png](https://images.viblo.asia/e3a32a40-58b6-433b-b72c-d7cc59dc76ad.png)

Sau đó ta Save lại. Oke, giờ ta quay lại CodePipeline, chọn pipeline của ta và bấm Retry lại Build Stage.

![image.png](https://images.viblo.asia/48b2d0f9-a86d-41dc-bf08-a9f06c2224d0.png)

Đợi nó chạy và ta sẽ thấy nó build thành công 😁. Kiểm tra log nào.

![image.png](https://images.viblo.asia/ccc8b453-eb6e-42b8-ac3d-067fa4f94109.png)

Giờ các bạn chỉ cần thay đổi code và push nó lên github, API staging `https://kvpspx1bw0.execute-api.us-west-2.amazonaws.com/staging/books` mà ta tạo ra ở trên sẽ được tự động cập nhật code mới.

### Create pipeline for branch main
Tiếp theo ta sẽ tạo pipeline cho nhánh main, CI/CD của nhánh main sẽ tạo một Lambda version mới từ function hiện tại của nhánh staging, sau đó nó sẽ cập nhật lại version của Lambda alias production.

Các bạn tạo thêm một pipeline theo như hướng dẫn ở trên với tên là function-list-prod, chỉ khác ở chỗ khi chọn Branch name thì ta chọn là main.

![image.png](https://images.viblo.asia/3574a943-fa48-43e0-8040-e97f01284fec.png)

Với khi tạo CodeBuild project, ta nhập vào file buildspec tên là deployspec.yaml

![image.png](https://images.viblo.asia/5cfbc0d6-77d9-4f19-b50a-cadcc6704330.png)

**Sau khi tạo xong, các bạn nhớ cập nhật lại permission cho IAM role của CodeBuild mới như ở trên để nó có quyền tạo version và cập nhật alias cho lambda. Ta thêm vào permission sau cho IAM role của CodeBuild mới**.

```
{
    "Effect": "Allow",
    "Action": [
        "lambda:*"
    ],
    "Resource": [
        "*"
    ]
}
```

Sau đó ta tạo thêm một file tên là deployspec.yaml trong source code.

```deployspec.yaml
version: 0.2

phases:
  install:
    runtime-versions:
       golang: 1.x
  pre_build:
    commands:
      - go get
  build:
    commands:
      - aws lambda publish-version --function-name books_list > res.json
      - export VERSION=$(jq -r '.Version' res.json)
      - aws lambda update-alias --function-name books_list --function-version $VERSION --name production
```

Commit code và push lên github nhánh staging, sau đó ta merge từ nhánh staging vào main, lúc này ta sẽ thấy pipeline cho nhánh main của ta đã được trigger và chạy.

![image.png](https://images.viblo.asia/da2b9ec9-0ec7-48a9-9e67-e9c9864cdb87.png)

Oke, vậy là CI/CD cho Lambda function của ta đã chạy thành công. Kiểm tra log thử.

![image.png](https://images.viblo.asia/347a2ab6-0ef4-4a06-b8eb-0da9909c4c4b.png)

**Lưu ý là các bạn cần làm theo luồng là merge từ nhánh staging lên nhánh main, nếu các bạn thay đổi thẳng trên nhánh main và push nó lên thì Lambda alias production nó sẽ không nhận được code mới**. Tiếp theo ta sẽ làm CI/CD cho source code front-end.

## Create CI/CD for Single Page Application
Code phần SPA ở repo này nhé `https://github.com/hoalongnatsu/serverless-series-spa`. Sau khi clone xuống các bạn nhớ thay đổi giá trị `REACT_APP_API_URL` bằng URL của API Gateway ở trong file `.env-cmdrc` nhé.

Ta tạo thêm một pipeline cho source SPA với tên là serverless-series-spa theo như hướng dẫn ở trên, chỉ khác ở phần lúc tạo CodeBuild project, ở mục **Environment variables**, các bạn thêm vào một biến tên là **CLOUDFRONT_DISTRO_ID**, với giá trị ta lấy ở CloudFront Console, ở dưới mình sẽ giải thích về giá trị này 😁.

![image.png](https://images.viblo.asia/29f33f83-1de7-4573-8b9c-d21d1c160ae1.png)

![image.png](https://images.viblo.asia/978fab76-ffd4-4c37-bb86-b4dee4329e5e.png)

Với điểm khác tiếp theo là khi ở mục Deploy stage, ta sẽ không bấm Skip deploy stage nữa.

![image.png](https://images.viblo.asia/f53e1b00-fd52-4e13-89fd-78e24ba3e884.png)

Mà ta sẽ chọn như sau. Mục **Deploy provider**, ta chọn S3, chọn bucket mà hosting trang SPA của ta, nhớ check vào **Extract file before deploy**.

![image.png](https://images.viblo.asia/1556bbfa-1fff-4481-9f5c-180ae5f41dbe.png)

Bấm Next, Review và bấm Create pipeline. **Sau khi tạo xong ta nhớ cập nhật lại permission cho CodeBuild của SPA, thêm vào permission sau đây.**

```
{
  "Effect": "Allow",
  "Action": [
    "cloudfront:CreateInvalidation"
  ],
  "Resource": "*"
}
```

Vào thư mục chứa source code front-end, tạo một file buildspec.yaml

```buildspec.yaml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: latest
    commands:
      - yarn install
  build:
    commands:
      - yarn build:staging
  post_build:
    commands:
      - echo clear cloudfront cache
      - aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRO_ID --paths "/*"
artifacts:
  base-directory: build
  files:
    - '**/*'

cache:
  paths:
    - /root/.npm/**/*
```

Ở đây chỗ CodeBuild sẽ build ra một bundle code nằm trong folder build, sau đó nó sẽ chuyển folder này tới Deploy Stage với dạng zip, ở phần Deploy thì ta chọn chức năng deploy lên S3 mà AWS đã hỗ trợ cho ta, ta không cần phải viết file buildspec deploy gì nữa cả.

Vì ta có xài CloudFront để cache lại static content của trang SPA, nên trước khi ta deploy code mới, ta phải clear cache của CloudFront đi. Bằng cách dùng câu lệnh CLI ở trên, đó là lý do vì sao ta cần biến environment **CLOUDFRONT_DISTRO_ID**. Oke, commit code và push lên github, ta sẽ thấy pipeline của SPA được trigger.

![image.png](https://images.viblo.asia/f995d99f-9c45-4dbb-93da-272a9248c4f4.png)

Đợi một chút ta sẽ thấy nó build và upload source mới lên trên S3 thành công.

## Create CI/CD with Terraform
Nếu các bạn thấy mình phải thao tác bằng tay nhiều quá thì thực ra khi làm thực tế hiếm có ai thao tác trên AWS Console để tạo nhiều như vậy cả, mà ta sẽ dùng các công cụ IAC (Infrastructure as Code), dưới đây là đoạn code để tạo nguyên luồng CI/CD cho CodePipeline. Mình sẽ viết một bài khác trong series về Terraform để giải thích code sau 😅.

```terraform
locals {
  click_fe_build = "click-fe-build-${var.environment}"
}

resource "aws_codebuild_project" "click_fe_build" {
  name         = local.click_fe_build
  service_role = var.codebuild_role_arn

  artifacts {
    name      = var.codepipeline_bucket
    packaging = "NONE"
    type      = "CODEPIPELINE"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:5.0"
    image_pull_credentials_type = "CODEBUILD"
    type                        = "LINUX_CONTAINER"
  }

  logs_config {
    cloudwatch_logs {
      status = "DISABLED"
    }
  }

  source {
    git_clone_depth     = 0
    insecure_ssl        = false
    report_build_status = false
    type                = "CODEPIPELINE"
  }

  cache {
    type  = "LOCAL"
    modes = ["LOCAL_CUSTOM_CACHE"]
  }

  tags = local.tags
}

resource "aws_codepipeline" "click_fe" {
  name     = "click-fe-${var.environment}"
  role_arn = var.codepipeline_role_arn

  artifact_store {
    location = var.codepipeline_bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name     = "Source"
      category = "Source"
      owner    = "AWS"
      provider = "CodeStarSourceConnection"
      version  = "1"
      output_artifacts = [
        "SourceArtifact"
      ]

      configuration = {
        ConnectionArn    = var.codestar_connection
        FullRepositoryId = "<your-repo-id>"
        BranchName       = "dev"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name      = "Build"
      category  = "Build"
      owner     = "AWS"
      provider  = "CodeBuild"
      run_order = 1
      version   = "1"
      input_artifacts = [
        "SourceArtifact",
      ]
      output_artifacts = [
        "BuildArtifact",
      ]

      configuration = {
        "EnvironmentVariables" = jsonencode(
          [
            {
              name  = "CLOUDFRONT_DISTRO_ID"
              type  = "PLAINTEXT"
              value = aws_cloudfront_distribution.s3_distribution.id
            },
          ]
        )
        "ProjectName" = local.click_fe_build
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name      = "Deploy"
      category  = "Deploy"
      owner     = "AWS"
      provider  = "S3"
      run_order = 1
      version   = "1"
      input_artifacts = [
        "BuildArtifact",
      ]

      configuration = {
        "BucketName" = aws_s3_bucket.hpi_click_front_end.bucket
        "Extract"    = "true"
      }
    }
  }

  tags = local.tags
}
```

Khi ta muốn tạo một pipeline khác thì ta chỉ cần sửa một vài biến và chạy câu lệnh terraform, cực kì nhanh và tiện.

## Kết luận
Vậy là ta đã tìm hiểu xong về CodePipeline, thêm với đó là cách viết CI/CD file cho CodeBuild, sử dụng CodePipeline sẽ giúp ta dễ dàng hơn nhiều trong việc triển khai CI/CD với hệ thống của AWS, nó sẽ có nhiều thứ có sẵn mà nếu ta xài công cụ khác thì ta sẽ cần viết shell script rất nhiều, chưa chắc là nó có thể đảm bảo secutiry tốt, chưa kể ta cần server để host con CI/CD nữa. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo.

## Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.