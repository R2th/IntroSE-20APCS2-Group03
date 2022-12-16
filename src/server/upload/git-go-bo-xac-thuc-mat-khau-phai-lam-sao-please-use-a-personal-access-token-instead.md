# **"Support for password authentication was removed. Please use a personal access token instead"**

Chắc hẳn vài ngày trở lại đây chúng ta ít nhiều người đã bắt đầu nhận được câu câu trả lời dạng warning đến từ một partner thân thương "Gít húp" (GITHUB :laughing:) mà hằng ngày luôn luôn tương tác.

Và mình chắc chắn cũng không ngoại trừ đâu. Nên mình sẽ chia sẻ cách của mình - một cách lười biếng nhất và nhanh nhất.

Chính xác là vậy, đó là một đêm Sài Gòn không trăng không sao (còn mưa nữa :satisfied::satisfied: ) mình đang chỉnh một chức năng cho dự án freelance của mình và commit push lên cho khách. Ồh wow

```
Macintosh-HD:xxx-helper macintoshhd$ git push
remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
fatal: unable to access 'https://github.com/abc/xyz.git/': The requested URL returned error: 403
```

Nhận tin tức bất ngờ đến từ bạn GIT thân thương vậy thì mình bắt tay ngay vào việc gọi cô bạn gái hờ hỏi ngay.
Alo Google, em giúp anh cái này anh thưởng cho một hôm dạo phố nắm tay nhé. Nhưng đời thì không như là mơ, toàn là một đống dữ liệu mơ hồ và cách thức mà GIT đã vẽ ra để đánh lừa một đứa khờ khạo và code dỏm như mình. Thế là mình phải mất một buổi để... ngủ và suy nghĩ giải pháp trong mơ. Trong mơ mình thấy một con đom đóm (nhạy cảm quá) dắt mình đến bên một Cây rơm tràn ra (stackoverflow tách ra 2 chữ dịch vậy cho nó lạ thôi chứ mọi người đừng có chém mình nhé).

Và sau một trận ngủ long trời lỡ đất của mình thì mình thức dậy và làm theo giấc mơ chỉ bảo. Các bạn ai lười giống mình thì làm theo mình nhé. Đảm bảo lười mà nhanh vcd luôn.

## Bước 1: truy cập thẳng vào ổ chứa Token của thằng github của chính mình, chọn Generate Token

[https://github.com/settings/tokens](https://github.com/settings/tokens) 
![image.png](https://images.viblo.asia/a656467c-dbad-4d43-a42e-0d604777be07.png)
Ai chưa đăng nhập thì đăng nhập, còn ai chưa tạo xác thực 2 bước thì vào xác thực 2 bước, đề xuất easy nhất là dùng Microsoft Authenticator, tải về xong quét quét là xong các bạn. Rồi bước tạo token này thì các bạn muốn thêm thắt gì đó thì chọn thêm theo đúng tên của các cái quyền mà github cho. 

Đặt tên cho token ở phần Note, chọn các quyền cần thiết ở dưới.
![image.png](https://images.viblo.asia/49c9e27e-b41d-4c18-aee0-a96092b6cb73.png)

Ở đây chỉ là một phần thôi, bên dưới còn nhiều nữa, nhưng quan trọng bạn nhớ đánh dấu tick xanh vào phần repo để có thể dùng token này tương tác các repo trên git.
Xong nhấn "Generate Token".

Hoặc bạn chọn **Setting > Developer Settings > Personal access token > Generate new Token**

## Bước 2: xóa thông tin của biến global trong máy của bạn. Mở terminal lên và

```
git config --global user.name ""
git config --global user.email ""
```

xong bạn vào project có repo của bạn

```
git remote set-url origin https://<token>@github.com/<username>/<repo>
```

Sau đó git sẽ hướng dẫn bạn set user.name và user.email lại. Sau khi bạn cập nhật lại cho biến global thì bạn làm một bước cuối cùng.

À quên không còn bước nào nữa nhe :laughing::laughing::laughing: