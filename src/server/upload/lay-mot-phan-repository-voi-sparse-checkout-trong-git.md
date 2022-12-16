Bài viết gốc tại [**Lấy một phần repository với sparse-checkout trong Git**](https://www.tuann.dev/2022/09/lay-mot-phan-repository-voi-sparse-checkout-trong-git.html).

Khi sử dụng Git để quản lý source code, sẽ có những lúc chúng ta cần checkout về một phần nhỏ của repo, thay vì toàn bộ repo đó. Ví dụ khi làm việc trên một monorepo rất to, nhưng bạn chỉ cần phụ trách một module rất nhỏ.

![](https://images.viblo.asia/eb71168f-9a0f-490a-a501-6d57b9f525de.png)

Lấy ví dụ một mono repository dùng chung cho cả backend, frontend và mobile team, mỗi team có 3 project là `X`, `Y` và `Z`, cấu trúc như sau:
```
├── backend
│   ├── X
│   ├── Y
│   └── Z
├── frontend
│   ├── X-UI
│   ├── Y-UI
│   └── Z-UI
└── mobile
    ├── X-APP
    ├── Y-APP
    └── Z-APP
```
Lưu ý khi mình nói mono repository, thì nó là mono repository, tất cả mọi project đều thuộc cùng 1 git repository chứ không có submodule gì hết nhé.

Bạn là một frontend developer thuộc team `Y`, để làm việc thì bạn chỉ cần 2 thư mục `backend/Y` và `frontend/Y-UI.` Không có lý do gì để bạn phải clone toàn bộ repository trên. Để rồi mỗi lần pull code là phải ngồi chờ git nó pull luôn cả những project mà mình không cần làm.

Đầu tiên, chúng ta clone repository này về, và thêm vào option `--no-checkout` để lấy về tracking info của repo chứ không lấy về bất cứ file/folder nào cả.

`git clone --no-checkout git@github.com:tuanndev/master-project`

Lúc này, nếu truy cập vào thư mục `master-project`, bạn sẽ không thấy nội dung gì cả.

Tiếp theo, sử dụng lệnh `git sparse-checkout set` để chỉ định các thư mục muốn pull về:

`git sparse-checkout set /backend/Y /frontend/Y-UI`

Kiểm tra danh sách các sparse checkout bằng lệnh:

`git sparse-checkout list`

Bây giờ có thể checkout các file trong list này về bằng lệnh:

`git checkout`

Lúc này bạn sẽ thấy 2 folder `backend` và `frontend`, bên trong mỗi folder sẽ chỉ có project `Y`.

Khi gõ lệnh `git status` thì bạn sẽ thấy nội dung kiểu như này:

```
On branch master
Your branch is up to date with 'origin/master'.
 
**You are in a sparse checkout with 7% of tracked files present.**
 
nothing to commit, working tree clean
```
Chứng tỏ hiện tại chúng ta chỉ đang có khoảng 7% nội dung project trên working copy này.

Lưu ý là chức năng `sparse-checkout` chỉ có từ phiên bản git v2.26.0 trở lên.