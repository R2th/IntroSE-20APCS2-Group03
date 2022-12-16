## Dẫn dắt
AWS hiện là nhà cung cấp dịch vụ cloud đi tiên phong và đứng đầu thị trường cloud, với hơn 200 service. AWS cloud đã tạo nên một hệ sinh thái khổng lồ đáp ứng hầu hết các nhu cầu điện toán đám mây, với một hệ thống sinh thái lớn yêu cầu khả năng quản trị chặt chẽ, linh hoạt và bảo mật. Để tránh các mất mát không đáng có, việc quản trị truy cập và phân quyền là  tất yếu và vô cùng quan trọng khi sử dụng cloud. Bài viết mong muốn đem lại cái nhìn tổng quan cách AWS Identity and Access Management quản lý phân quyên trên các tài nguyên. 
![](https://images.viblo.asia/985be176-19dd-4867-8fb8-e2c1618fba51.png)
## 1. Khái niệm phân quyền
![](https://images.viblo.asia/5cc33cc1-d49e-43de-b918-a93d56c7ea3d.jpg)

> Phân quyền là việc tạo ra một tập hợp các **chính sách** quyết định "một **chủ thể** được phép thực thi một **hành động** trên một **tài nguyên** hay không"
*  Chính sách -  **policy** : là đơn vị cơ bản và quan trong nhất trong quá trính phân quyền, trong aws một hầu hết  [policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html)  có định dạng json  và có các syntax và cấu trúc được aws quy đinh củ thể.
* Chủ thể - **principal** bao gồm : user, role, federated user, application. Chủ thể gửi các request yêu cầu thực hiện một action trên resouce.
* Hành động - **action** là hành động thực hiện trên tài nguyên được định nghĩa trong từng service .
* Tài nguyên - **resource** là một đối tượng trong service.

  Với aws việc phân quyền và định danh nhằm kiểm soát các truy cập vào tài nguyên từ các định danh(IAM Identity) trong cùng tài khoản, đảm bảo việc các service làm việc với nhau an toàn và kiểm xoát các truy cập tài nguyên từ ngoài tài khoản. Bao gồm các truy cập định danh bên ngoài tài khoản và truy cập không định danh tới các tài nguyên công khai. 

 => Một service aws được phân tách thành các resource và các action trên resource của service.  
 [Tham khảo danh sách service](https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html)
## 2. [Chính sách - policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html)
Một policy được định nghĩa theo cấu trúc json và bao gồm các thuộc tính cơ bản:
![](https://images.viblo.asia/60b11ece-efad-47d5-a14b-d2501618c9e5.png)
* Statement: Mỗi một policy đều có ít nhất một statement, statement dùng để chỉ định action nào được thực thi và tài nguyên nào được truy cập. Statement gồm các thành phần  

    * **Sid**: Là một chuỗi uniq dùng để nhận dạng statement
    * **Effect**: Chỉ định các actions được liệt kê là Alllow/Deny
    * **Action**: Liệt kê các hành động bạn muốn thực thi (ec2:CreateImage, ec2:CreateNetworkAcl...)
    * **Principal**: Là tài khoản/người dùng/role được cho phép hoặc bị từ chối truy cập vào tài nguyên AWS
    * **Resource**: Chính là tài nguyên AWS mà bạn muốn áp dụng những actions bên trên
    * **Condition**: Chỉ định các điều kiện bắt buộc phải tuân theo khi áp dụng policy này dựa trên các condition key được định nghĩa theo từng resouce, action   ([service-specific condition key](https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html) ) và dựa trên các contex key ([global condition key](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html) ).
```
 {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "Stmt1571666184581",
          "Action": [
            "elasticbeanstalk:CreateApplication"
          ],
          "Effect": "Allow",
          "Resource": "arn:aws:elasticbeanstalk:ap-southeast-1:1234567:application/staging",
          "Condition": {
            "DateGreaterThan": {
              "aws:CurrentTime": "2019/10/18"
            }
          }
        }
      ]
    }
```
[reference_policies_elements](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html)  
 [Nguồn tham khảo](https://viblo.asia/p/iam-policy-4P856O0GKY3)   
   [AWS policy grammar](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_grammar.html)

> Mỗi **policy** là tập hợp của các các statement và mỗi statement quy định việc DENY/ALLOW một hoặc nhiều **action** được thực hiện trên một hoặc nhiều **resource**.
>   Policy aws có thể chỉ định chủ thể có hiệu lực  với quy tắc trên statement với **Principal** dựa trên cơ chế Resource-base policy (chỉ áp dụng với [một số resource](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html) )

## 3. [IAM Identity](https://docs.aws.amazon.com/IAM/latest/UserGuide/id.html)
>    IAM Identities (users, groups, and roles) là đối tượng chính được phân quyền và sử dụng phân quyền thực hiện các hành động.  
![](https://images.viblo.asia/42d2c45e-cb1e-4d7b-9212-af2951b59521.jpg)

*  **[AWS account root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html)**: root user được tạo khi bạn tạo một account, nó có quyền cao nhất trong account, không thể bị xoá và chỉnh sửa phân quyền. Root user chỉ nên được sử dụng các tác vụ riêng biệt. Aws khuyên cáo không nên sử dụng root user tạo các credentials và không nên sử dụng aws account root user  cho các hoạt động thông thường.[aws_tasks-that-require-root](https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html#aws_tasks-that-require-root)
*  **[IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html)** là một chủ thể được người dùng tạo trong aws và được sử dụng để đại diện cho một người hoặc một service tương tác với AWS. IAM user có thể được xác thực bằng name và password hoặc sử dụng với aws api, aws cli bằng  các credentials được tạo. 
*  **[IAM groups](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html)** là một đại diện cho tập hợp các user. Được sử dụng để phân quyên cho một nhóm các user có chung một nhóm các policy. Một group được phân quyên giống như các user dựa trên các policy được gắn và các user trong group cũng sẽ được áp dụng chung các chính sách trong policy. Nhớ đó dễ dàng quản lý phân quyên cho từng nhóm người dùng trong aws account.
*  **[IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)** tương tự như các user được gắn các policy để phân quyền nhưng thay vì  đại diên cho 1 người . Role có thể được sử dụng để ủy quyền cho một  [principal](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html) (không thể chỉ định *). Đặc điểm:
    *  Không có long-term credentials hoặc name password cho phép bạn truy cập aws
    *  Được sử dụng để cấp quyền tạm thời cho các application, user, service trước đó không có quyền truy cập 
    *  Iam role có thể cấp quyền truy cập tạm thời cho các service quyền truy cập resource của 1 service khác (aws service role) hoặc uỷ quyền truy cập cho 1 service khác ([aws service-linked role](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html),[ AWS service role for an EC2 instance](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html))
    *  Cơ chế trust police là 1 resource-based police cho phép chỉnh định  principal được phép sử dụng role.
    
*  **[Temporary credentials in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html)** là một giấy phép tạm thời được sử dụng cho các tác vụ ngắn hạn, các giấy phép tạm thời có quyền truy cập dựa trên IAM Identity được chỉ định (user hoặc role). 

## 4. [Chính sách và phân quyền trong IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)
>  Trong aws người dùng kiểm soát phân quyền bằng cách tạo ra chính sách - policies và  gắn chúng  với IAM identities (users, groups of users, or roles) hoặc AWS resources. Tập hợp các policy có hiệu lực trên chủ thể và trên resouce quyết định kết quả phân quyền ALLOW hoặc DENY

### Policy Type
Để đáp ứng các nhu cấu phân quyền cho các định danh, các resource, kiểm soát quyền của các định danh (IAM Identity) và xác đinh quyền truy cập của các account trong Origanizations. Aws sử dụng nhiều policy type cho từng mục đích khác nhau.

* [Identity-based policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_id-based)  – json policy permission các chính sách dựa trên danh tính được sử dụng để phân quyền cho các Identity (user, role, group). Có định dạng JSON và được quản lý theo 3 nhóm:

    * Managed policies là các chính sách độc lập bạn có thể sử dụng cho nhiều Identity. Được chia thành 2 loại
        * AWS managed policies: các chính sách do aws tạo và quản lý.
        * Customer managed policies: các chính sách do người dùng tạo và quản lý
    * Inline policies các chính sách do người dùng tạo và chị được gắn với một Identity duy nhất và sẽ bị xoá khi identity bị xoá.
    *  [Hướng dẫn sử dụng indentity-based policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#choosing-managed-or-inline)
* [Resource-based policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_resource-based)  – json policy permission là một inline policy được gắn với 1 resource, một resource-based policies quy định các [principal](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html) được áp dụng chính sách và sử dụng condition để kiểm soát truy cập. Nó cho phép các principal ngoài account sử dụng các tài nguyên trong account. Đặc điểm:
    * Khi resource-based policy chỉ định 1 principal là một principal của một account khác, principal vẫn cần được cấp phép sử dụng các resource bởi Identity-based policy của account sở hữa principal [ (tham khảo ví dụ)](https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html)
    *  IAM có 1 loại resource-based policy là trust role policy được gắn cho IAM role  cho phép role chỉ định Trusted entities và thực hiện cross-account access.
    *  IAM roles và resource-based policy vẫn có sự khác biệt trong cơ chế ủy quyền cross-account access [(tham khảo thêm)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_compare-resource-policies.html)
* [ Permissions boundaries](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)  – json policy permission là một managed policy được sử dụng cho role và user nhằm hạn chế giới hạn phân quyền tối đa các chủ thể có thể thực hiện.Đặc điểm:
    *  Các user hoặc role không thể thực hiện các yêu cầu vi phạm  policies mà Permissions boundaries quy định.
    *  Resource-based policy không bị giới hạn bởi Permissions boundaries
    *  Permissions boundaries không cấp quyền cho chủ thể

* [Organizations SCPs](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html) – json policy permission Sử dụng AWS Organizations service control policy (SCP) để định nghĩa phân quyền tối đa cho các account members của một [organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html) hoặc [organization unit (ou)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_ous.html). Tương tự Permissions boundaries không cấp quyền cho chủ thể. Đặc điểm:
    * Không ảnh hưởng tới các principal ngoài account trong resource-based policy
    * Không hạn chế quyền của user và role trong management account
    * SCP áp dụng cho tất cả user, role bao gồm các root user thuộc các account được thêm vào aws Organizations hoặc ou
    * SCP không áp dụng cho các [service-linked role](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html)

* [Access control lists](https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html) (ACLs)  được sử dụng để cho phép thực hiện cross-account access, acl chỉ định các principals của các account khác để kiểm soát truy cập. ACL không sử dụng đinh dạng JSON policy, acl không thể sử dụng với các principals trong cùng account.

* Session policies – json policy permission được sử dụng cho các temporary cendentials hoặc feradated user nhằm cấp quyền truy cập  cho các định danh tạm thời dựa trên Identity-based policy được áp dụng. Có thể hiểu nếu một temporary cendentials không được cấp quyền bởi một session policy sẽ bị từ chối hành động hoặc nếu request được chấp thuận bởi session policy nhưng không được cấp quyền bởi Identity-based policy  sẽ bị từ chối.

>  Nếu chia tách theo mục đính sử dụng ta sẽ có: Identity-based policy, Session policy,  Resource-based policy là các chính sách cấp quyền. Với Permission boundaries, Organization SCPs là các chính sách hạn chế quyền truy cập. 
## 5. [Policy evaluation logic](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
Khi một principal thực hiện một request thông qua aws api, aws cli, aws management console một request được gửi đến aws và được sử lý theo các bước:

1. **Authentication** -  principal được xác thực danh tính. Trong mốt số trường hợp với 1 số service như s3 cho truy cập từ các anonymous user không cần xác thực danh tính.
2. **Processing the request context** - aws sử lý thông tin trong request và xác định các policy được áp dụng
3. **Evaluating policies within a single account** - aws tổng hợp tất cả policy theo policy type, điều này ảnh hưởng đến thứ tự ưa tiên trong đánh giá policy
4. **Determining whether a request is allowed or denied within an account** - aws sẽ xác định request được cho phép hay từ chối dựa trên policy đã được tổng hợp và request context

    ### Quy trình đánh giá request ALLOW/DENY trong account
![](https://images.viblo.asia/100a5f9f-9a56-4799-a3c3-43d9d9e7c5dc.png)
Được aws chia thành 6 bước đánh giá dựa trên phân loại policy: 

1.  **Deny evaluation**  bất cứ Deny statement nào trong policy từ bất cư policy type được tổng hợp và đánh giá đầu tiên. Nếu Deny statement được áp dụng, request sẽ bị từ chối
2.  **Oraganizations policy** Nếu principal thuộc một account được áp dụng Organization policy từ SCP, request phải tuân thủ policy từ Oraganization policy, nếu không sẽ bị từ  chối . Ngay cả khi request đến từ aws account root user vẫn sẽ phải được cấp quyền  từ Oraganization policy.
3.  **Resource-based policy** Nếu policy từ Resource-based policy chấp thuận request, request sẽ được chấp thuận ngay lập tức.
4.  **IAM permission boundaries** nếu principal được áp dụng  permission boundaries và request không được cấp phép  bởi các policy trong IAM permission boundaries, request sẽ bị từ chối.
5.  **session policy** nếu principal là một temporary credentials nó phải tuân thủ session policy nếu không sẽ bị từ chối truy cập.
6.  **Identity-based policy** nếu principal không được áp dụng resource-based policy thì nó bắt buộc phải được cấp quyền bởi Identity-based policy để được thự

    ### [Quy trình đánh giá request ALLOW/DENY trong cross-account](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html)
    ![](https://images.viblo.asia/8094724f-ce03-4f4d-b917-f7fdfdbea5a7.png)
    
>    Việc truy cập tài nguyên bằng 1 định danh thuộc một account khác yêu cầu sự cho phép từ một resource-based policy được chỉ định bởi resource cần truy cập.

Quá trình đánh giá yêu cầu các bước:

1.  Tổng hợp Identity-based policy được áp dụng với principal từ Trusted AccountA  và xác nhận quyền truy cập từ các policy được áp dụng.
2.  Nếu request được chấp thuận trong Trusted AccountA sẽ được gửi đến Trusting AccountB, sẽ tiếp tục được xác nhận bởi các resource-based policy được áp dụng nên resource. Nếu được chấp thuận request sẽ được thực hiện.

## 6. [Authorization strategy](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html)
Với aws IAM cho phép bạn thực hiện 2 chiến lược phân quyền Attribute-based access control (ABAC)  và role-based access control (RBAC). Trong đó:

* RBAC phân quyền dựa trên vai trò là cách thức phân quyền theo đó bạn tạo ra các phân quyên theo vai trò người sử dụng (Dev, Database admin,...). Trong IAM, việc này tương đương với tạo ra các policy và gắn với các định danh. Điều này giúp cấp tối thiểu các đặc quyền cho người sử dụng
* ABAC phân quyền dưa trên thuộc tính theo đó các chính sách định nghĩa phân quyền dựa trên thuộc tính của tài nguyên và của người sử dụng. Từ đó đạt được sự linh hoạt và kiểm soát dễ dàng các phân quyền. Trong IAM ABAC được sử dụng dựa trên các tag được gắn với các resource và Identity để dễ dàng phân quyền theo nhóm các tài nguyên và nhóm định danh.

![](https://images.viblo.asia/e84bc904-b4f5-4c75-96f3-16e7e7bc8930.png)
## Tổng kết
Bài viết đưa ra các khái niệm cơ bản mà mọi người cần lắm được để có thể sử dụng IAM AWS, chi tiết bạn đọc có thể tham khảo các tài liệu được đính kèm trong bài viết. Phần lớn bài viết được dịch từ tài liệu của aws và một vài nhận biết cá nhân lên có thể có sai lầm nên mong được bạn đọc góp ý để hoàn thiện bài viết, mình trân trọng cám ơn mọi đóng góp xây dựng.