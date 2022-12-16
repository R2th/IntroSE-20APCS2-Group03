Link bài viết gốc - [Kubernetes Practice - Quản lý user và phân quyền trên ArgoCD](https://devopsvn.tech/kubernetes-practice/quan-ly-user-va-phan-quyen-tren-argocd)

Hướng dẫn cách tạo user mới và phân quyền trên ArgoCD. Trên tài liệu của ArgoCD thì không có hướng dẫn kĩ phần này nên mọi người mò khá lâu, do đó mình viết một bài hướng dẫn ngắn để mọi người tìm hiểu nhanh hơn.

![](https://images.viblo.asia/ca59ccf8-b0fd-4c39-8265-d343d1238b0e.png)

Mặc định ArgoCD cung cấp cho ta một user với toàn bộ quyền là admin. Nếu ta làm việc một mình thì không có vấn đề gì, nhưng tới khi đội của ta có nhiều người hơn thì sếp sẽ bảo với bạn là: "Có cách nào để các bạn developer vào xem được logs của ArgoCD mà không cần phải nhờ tới em không?". Ta không thể cấp user với quyền admin cho các bạn developer được, nên ta phải tạo tài khoản mới và gán cho tài khoản đó các quyền phù hợp.

## Tạo tài khoản
Trong ArgoCD để tạo tài khoản cho user mới khá đơn giản, ta chỉ cần thao tác với ConfigMap tên là `argocd-cm` ở namespace mà ta cài ArgoCD, ví dụ mình cài ở namespace tên là `argocd` thì cấu hình mặc định của `argocd-cm` như sau:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
  labels:
    app.kubernetes.io/name: argocd-cm
    app.kubernetes.io/part-of: argocd
data:
  url: https://argocd.example.com
```

Các bạn sao chép cấu hình mặc định và tạo một file tên là `argocd-cm.yaml` sau đó dán đoạn cấu hình trên vào. Tiếp theo ta cập nhật `argocd-cm` để tạo user với tên đăng nhập là hanli.

```argocd-cm.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
  labels:
    app.kubernetes.io/name: argocd-cm
    app.kubernetes.io/part-of: argocd
data:
  url: https://argocd.example.com
  accounts.hanli: login
```

Trong thuộc tính `data` của `argocd-cm` ConfigMap ta khai báo user ta muốn tạo, định dạng như sau:

```yaml
accounts.<username>: <capabilities>
```

Giá trị capabilities ta sẽ có hai giá trị là `apiKey` và `login`:
+ apiKey cho phép user có thể tạo ra token để truy cập API
+ login cho phép user có thể login vào ArgoCD

Cấu hình ở trên ta đặt tên cho user là hanli và nó chỉ có quyền login, cập nhật ConfigMap.

```
kubectl apply -f argocd-cm.yaml
```

ArgoCD sẽ tạo một user có tên là hanli, tiếp theo ta cần cập nhật mật khẩu cho user hanli để nó có thể đăng nhập được vào ArgoCD, ta chạy câu lệnh sau.

```bash
argocd account update-password --account hanli --new-password hanli --current-password <admin-password> --grpc-web
```

Giá trị của `current-password` là mật khẩu của admin. Bây giờ thì user hanli đã có thể đăng nhập được vào ArgoCD, mở giao diện ArgoCD lên và đăng nhập.

![](https://images.viblo.asia/c5b3d102-c33d-4bd3-a5ba-0720987a561c.png)

Với Username và Password là hanli ta đã cấu hình ở trên. Mặc định khi ta tạo user mới thì nó chỉ có quyền là readonly, không thể thao tác bất kì hành động nào khác. Ví dụ user hanli cần restart Deployment để toàn bộ Pod của Deployment đó được cập nhật lại cấu hình mới, thì khi user hanli thao tác ArgoCD sẽ báo lỗi.

Tiếp theo ta sẽ tìm hiểu cách phân quyền cho user trên ArgoCD.

## Phân quyền
Để phân quyền cho user thì ta sẽ thao tác với ConfigMap tên là `argocd-rbac-cm`, cấu hình mặc định của nó như sau.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
data:
  policy.default: role:readonly
```

Như ta thấy nó sẽ có một trường là `policy.default: role:readonly`, trường này sẽ cấp quyền readonly mặc định cho user nếu user đó không được cấp quyền ở bất cứ đâu. Sao chép và dán nó vào file tên là `argocd-rbac-cm.yaml`,  để cấp quyền cho một user, ta sẽ thêm vào một trường tên là `policy.csv` như sau.

```argocd-rbac-cm.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
data:
  policy.default: role:readonly
  policy.csv: |
```

Ta sẽ định nghĩa quyền ở trong trường ` policy.csv` với định dạng.

```
p, <role/user/group>, <resource>, <action>, <object>
```

Hoặc.

```
p, <role/user/group>, <resource>, <action>, <appproject>/<object>
```

Trong đó `<role/user/group>` là tên của role hoặc user hoặc group.

Resource sẽ có các giá trị `clusters`, `projects`, `applications`, `<project-name>/<application-name>`, `repositories`, `certificates`, `accounts`, `gpgkeys`, `logs`, `exec`.

Actions sẽ có các giá trị `get`, `create`, `update`, `delete`, `sync`, `override`, `action/<group/kind/action-name>`

Ta đang muốn user có quyền restart được Deployment thì ta sẽ định dạng như sau.

```argocd-rbac-cm.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
data:
  policy.default: role:readonly
  policy.csv: |
    p, hanli, applications, action/apps/Deployment/restart, default/*, allow
```

Resource ta sẽ để là `applications`, và với action theo định dạng `action/<group/kind/action-name>` thì ta sẽ có action để restart Deployment là `action/apps/Deployment/restart`.

Tiếp theo giá trị `<object>` ta để là `default/*`, mặc định khi ta cài ArgoCD thì nó sẽ có một project tên là default, và nếu ta không tạo thêm project thì toàn bộ applications mà ta đang chạy sẽ nằm trong project default này, và giá trị `default/*` có nghĩa là ta muốn quyền này được áp dụng cho toàn bộ application trong project default. Nếu bạn muốn giới hạn trong một application thì khai báo là `default/<application-name>`.

Tuy nhiên nếu ta có nhiều user thì ta cần phải sao chép lại toàn bộ quyền ở trên, lúc này ConfigMap của ta sẽ khá dài dòng, ví dụ:

```argocd-rbac-cm.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
data:
  policy.default: role:readonly
  policy.csv: |
    p, hanli, applications, action/apps/Deployment/restart, default/*, allow
    p, natsu, applications, action/apps/Deployment/restart, default/*, allow
    p, lucy, applications, action/apps/Deployment/restart, default/*, allow
```

Ta có thể rút gọn nó bằng cách tạo một role chung và gán nó cho các user khác nhau, ví dụ như sau:

```argocd-rbac-cm.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
data:
  policy.default: role:readonly
  policy.csv: |
    p, role:deployment-restart, applications, action/apps/Deployment/restart, default/*, allow

    g, hanli, role:deployment-restart
    g, natsu, role:deployment-restart
    g, lucy, role:deployment-restart
```

Cập nhật lại `argocd-rbac-cm` ConfigMap thì user của ta sẽ có các quyền tương ứng.

```bash
kubectl apply -f argocd-rbac-cm.yaml
```

Done 😁. Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông tin về DevOps hàng ngày nhé.

## Kết luận
Vậy là ta đã tìm hiểu xong cách tạo user và phân quyền trên ArgoCD, các bạn tham khảo thêm ở đây [RBAC Configuration](https://argo-cd.readthedocs.io/en/stable/operator-manual/rbac/). Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).

Đồng đội [Junior Backend Engineer](https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067).

Đồng đội [Junior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/junior-frontend-engineer-1068).

Đồng đội [Onsite Merchandising (Web Admin)](https://tuyendung.hoang-phuc.com/careers/job/945)