Hiện tại để nâng cao chất lượng của dự án hiện tại, mình đã bắt đầu sử dụng AWS để pipelining process bên dưới là các tools mình sử dụng

	* AWS Code commit (Code repository)
	* AWS Code build ( For build and integration)
	* AWS Code pipeline (For pipelining process )

Tuy nhiên có một  điều khá phiền toái khi sử dụng code build là : 
	* Mỗi lần update lại file build mình phải push file build đó lên repo
	* Trigger build bằng AWS Console 

Thực sự thì khá là lòng vòng và ngu. Đang suy nghĩ không biết có cách nào để build project ở local mà không cần dựng jenkins được không thì mình tìm thấy bài viết này 

[Announcing Local Build Support for AWS CodeBuild | AWS DevOps Blog](https://aws.amazon.com/blogs/devops/announcing-local-build-support-for-aws-codebuild/)

Ngon -> có thể dựng thử build local mà không cần phải dựng jenkins rồi.
Tại sao mình lại muốn AWS Images ?
	* Gần giống nhất với môi trường build cloud mình đang sử dụng 
	* Đơn giản là mình thích tools của AWS thôi (cái này không cần bàn cãi : D)

Tuy nhiên khi kéo repo codebuild của aws về thì hỡi ơi nó vẫn chưa support cho PHP 7.1 ( tôi cần PHP 7.1 ) 
Sau một hồi google thì đã có cách.

## Dựng docker images với codebuild cho PHP 7.1
Có một bác khác đã tạo một pull request sẵn từ tháng 5.2018, nhưng không hiểu sao đến giờ vẫn chưa được merge vào trong repo của AWS Codebuild (không lẽ sắp bị drop ?? )

[GitHub - rdehnhardt/aws-codebuild-docker-images: Official AWS CodeBuild repository for managed Docker images http://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref.html](https://github.com/rdehnhardt/aws-codebuild-docker-images)

Thực hiện các step bên dưới để kéo repo này về local repo của AWS Codebuild

### Pull từ repo của https://github.com/rdehnhardt/aws-codebuild-docker-images.git về 
Thực hiện câu lệnh bên dưới
```bash
https://github.com/rdehnhardt/aws-codebuild-docker-images.git master
```


### Thực hiện build images :

	* Di chuyển đến thư mục lưu source code build 
	
	`project/aws-codebuild-docker-images/ubuntu/php/7.1`
    
	* Thực hiện câu lệnh build
	
	`docker build -t aws/codebuild/php:7.1 .`

**Note**:
Trong lúc build có thể bạn sẽ gặp một vài lỗi như 
	* `libmysqlclient-dev=5.6.20 does not exist` ...các bạn chỉ cần sửa lại tương tự như trong file `Dockerfile` của version php:7.0 là ok

### Kéo docker images chứa agent để build local
Thực hiện câu lệnh bên dưới để kéo images về:
```
docker pull amazon/aws-codebuild-local:latest --disable-content-trust=false
```

### Chạy câu lệnh thực hiện build local

```
docker run -it -v /var/run/docker.sock:/var/run/docker.sock -e "IMAGE_NAME=aws/codebuild/php:7.1" -e "ARTIFACTS={artifacts_path}" -e "SOURCE={source_path}" amazon/aws-codebuild-local
```

**Kết quả**
```
Removing network agentresources_default
Removing volume agentresources_user_volume
Removing volume agentresources_source_volume
Creating network "agentresources_default" with the default driver
Creating volume "agentresources_user_volume" with local driver
Creating volume "agentresources_source_volume" with local driver
Creating agentresources_agent_1 ...
Creating agentresources_agent_1 ... done
Creating agentresources_build_1 ...
Creating agentresources_build_1 ... done
Attaching to agentresources_agent_1, agentresources_build_1
agent_1  | [Container] 2018/09/26 15:00:28 Waiting for agent ping
agent_1  | [Container] 2018/09/26 15:00:29 Waiting for DOWNLOAD_SOURCE
agent_1  | [Container] 2018/09/26 15:00:39 Phase is DOWNLOAD_SOURCE
agent_1  | [Container] 2018/09/26 15:00:39 CODEBUILD_SRC_DIR=/codebuild/output/src438773449/src
agent_1  | [Container] 2018/09/26 15:00:39 YAML location is /codebuild/output/src438773449/src/buildspec.yml
agent_1  | [Container] 2018/09/26 15:00:39 Processing environment variables
agent_1  | [Container] 2018/09/26 15:00:39 Moving to directory /codebuild/output/src438773449/src
agent_1  | [Container] 2018/09/26 15:00:39 Registering with agent
agent_1  | [Container] 2018/09/26 15:00:39 Phases found in YAML: 2
agent_1  | [Container] 2018/09/26 15:00:39  PRE_BUILD: 1 commands
agent_1  | [Container] 2018/09/26 15:00:39  BUILD: 1 commands
agent_1  | [Container] 2018/09/26 15:00:39 Phase complete: DOWNLOAD_SOURCE Success: true
agent_1  | [Container] 2018/09/26 15:00:39 Phase context status code:  Message:
agent_1  | [Container] 2018/09/26 15:00:39 Entering phase INSTALL
agent_1  | [Container] 2018/09/26 15:00:40 Phase complete: INSTALL Success: true
```

Như vậy là đã build xong, artifacts sẽ được output ra ở thư mục mà chúng ta đã chỉ định