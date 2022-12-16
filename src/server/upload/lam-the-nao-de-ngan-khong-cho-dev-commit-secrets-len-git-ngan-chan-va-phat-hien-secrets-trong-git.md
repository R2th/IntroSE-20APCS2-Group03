`Ngày dài, Tháng nhớ, Năm mong để viết được một bài blog mới`

Chuyện là dạo gần đây, mình có tìm hiểu mấy thứ liên quan về DevSecOps và cũng có được tham gia một dự án có áp dụng DevSecOps thì mình cũng có nhìn thấy một số vấn đề, và bài viết này là một trong những vấn đề mình nhìn thấy.

## I. Giới thiệu

Câu chuyện nó giống như thế này “[Thôi xong, tui push secret key lên github rồi](https://viblo.asia/p/thoi-xong-tui-push-secret-key-len-github-roi-1Je5ED0GlnL)“, mọi người có thể đọc câu chuyện và nắm được tình huống. Nhưng, trong bài viết này của tác giả [@kiendinang](https://viblo.asia/u/kiendinang) ( một người anh đáng kính mình có quen :D, hâm mộ thực sự ) chỉ nói đến việc **xử lý thế nào sau khi lỡ push secret key lên github ⇒ *Vậy cách của anh [@kiendinang](https://viblo.asia/u/kiendinang) là cách chữa bệnh.***

`Vậy hôm nay mình sẽ viết một bài về cách phòng bệnh: Làm thế nào để ngăn không cho Dev commit secrets lên git?` `Ngăn chặn và phát hiện secrets trong Git`

( Người ta vẫn có câu `Phòng bệnh hơn chữa bệnh` )

Chúng ta bắt đầu đi vào tìm hiểu cách phòng bệnh nhé!!!!!!

## II. Ngăn chặn Dev vô tình commit secrets

Trước khi bạn thực hiện các thay đổi (commit changes), hãy kiểm tra để đảm bảo các secrets key không bị thêm vào history của git.

[Yelp's Detect Secrets](https://github.com/Yelp/detect-secrets) là một công cụ dùng để phát hiện các secret key trước khi commit code.

Một thành viên nào đó bất kỳ trong nhóm Dev có quyền push code lên repository của dự án có thể sử dụng lệnh dưới đây để tạo một `pre-commit hook` trong repository.

### 1. Thêm detect-secrets vào repository (Chỉ cần thực hiện một lần duy nhất)

Cài đặt `detect-secrets` và `pre-commit`

```bash
pip install detect-secrets==v1.2.0 pre-commit
```

Vào folder source code của dự án ( Ở đây tôi đã có 1 dự án tạo sẵn, nên tôi sẽ clone nó về)

```bash
git clone https://github.com/0xmanhnv/precommit-with-detect-secrets.git
```

```bash
cd precommit-with-detect-secrets
```

![Screen Shot 2022-03-26 at 00.54.32.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_00.54.32.png)

Cấu hình `pre-commit framework.` Tôi sẽ tạo một file có tên là `.pre-commit-config.yaml` trong dự án.

```bash
cat > .pre-commit-config.yaml <<EOL
repos:
- repo: git@github.com:Yelp/detect-secrets
  rev: v1.2.0
  hooks:
  - id: detect-secrets
    args: ['--baseline', '.secrets.baseline']
EOL
```

![Screen Shot 2022-03-26 at 00.56.44.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_00.56.44.png)

Cài đặt `git hooks`

```bash
pre-commit install
```

![Screen Shot 2022-03-26 at 00.58.22.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_00.58.22.png)

Trước khi tiếp tục, chúng ta phải thực hiện `scan` xem trong source code hiện tại có tồn tại secret key nào hay không và đưa chúng vào baseline. Để loại bỏ false positive.

```bash
detect-secrets scan > .secrets.baseline
```

![Screen Shot 2022-03-26 at 01.07.24.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.07.24.png)

![Screen Shot 2022-03-26 at 01.07.35.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.07.35.png)

Đánh giá thủ công một baseline để kiểm tra tính validity của các secrets đã được tìm thấy. 

```bash
detect-secrets audit .secrets.baseline
```

![Screen Shot 2022-03-26 at 01.09.00.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.09.00.png)

Nếu như những gì xuất hiện là một secret key quan trọng, thì chúng ta cần thực hiện xóa nó ra khỏi source code, xóa như thế nào thì các bạn lại đọc lại “****[Thôi xong, tui push secret key lên github rồi](https://viblo.asia/p/thoi-xong-tui-push-secret-key-len-github-roi-1Je5ED0GlnL) “**, nếu không phải là secret key (false positive) thì chúng ta sẽ commit `.secrets.baseline` để `detect-secrets` sẽ ignore nó đi cho những lần sau.

*(Trong case này của tôi, tôi cứ coi như nó là **false positive**)*

```bash
git add .secrets.baseline .pre-commit-config.yaml
```

![Screen Shot 2022-03-26 at 01.35.32.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.35.32.png)

Thực hiện commit cấu hình pre-commit cũng như secrets baseline vào git.

```bash
git commit -m "Add .secrets.baseline .pre-commit-config.yaml"
```

![Screen Shot 2022-03-26 at 01.36.47.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.36.47.png)

Lần đầu tiên cài đặt, commit sẽ `Passed` Tôi sẽ push nó lên remote.

```bash
git push origin main
```

![Screen Shot 2022-03-26 at 01.37.57.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.37.57.png)

![Screen Shot 2022-03-26 at 01.38.41.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.38.41.png)

Như vậy là tôi đã cài đặt và cấu hình xong `detect-secrets` và `pre-commit`, từ bây giờ team Dev chỉ cần `clone | pull` source code về vào thực hiện các bước dưới đây để sử dụng.

### 2. Cài đặt repo với pre-commit (Dành cho các Dev)

Mỗi thành viên trong nhóm DevOps phải hoàn thành các bước này sau khi hoàn tất quá trình thiết lập ở trên.

[pre-commit](https://pre-commit.com/) là một Frame-work để quản lý và duy trì multi-language pre-commit hooks. Nó được sử dụng ở đây để đảm bảo rằng mỗi Dev đang sử dụng cùng một version của `Yelp's detect-secrets`.

Bây giờ tôi đóng vai trò là một Dev trong dự án. Tôi sẽ clone source code về và cài đặt như sau.

```bash
git clone https://github.com/0xmanhnv/precommit-with-detect-secrets.git
```

![Screen Shot 2022-03-26 at 01.47.55.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.47.55.png)

Cài đặt `pre-commit`

```bash
pip install pre-commit
```

```bash
pre-commit install
```

![Screen Shot 2022-03-26 at 01.49.32.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.49.32.png)

### 3. Ví dụ tạo một file có chứa secret key

Tạo file `test-secrets.txt`

```bash
cat > test-secrets.txt<<EOL
password=7a854a65fa34cf5c274f018ace6847ef64a60a0f
EOL
```

![Screen Shot 2022-03-26 at 01.51.38.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.51.38.png)

Add `test-secrets.txt` vào git.

```bash
git add test-secrets.txt
```

![Screen Shot 2022-03-26 at 01.52.04.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.52.04.png)

Bây giờ, tôi sẽ thực hiện `commit` và xem kết quả.

```bash
git commit -m "Add test-secrests.txt"
```

![Screen Shot 2022-03-26 at 01.53.23.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.53.23.png)

Secret key trong file `test-secrets.txt` đã được phát hiện. Bây giờ, chúng ta cần thực hiện xóa bỏ nó, hoặc đưa nó vào baseline để đánh dấu là **False positive** thì sau đó mới có thể commit được.

Thực hiện xóa bỏ secret key. Có 3 cách để xóa bỏ nó.

- Đưa `test-secrets.txt` và `.gitignore` để bỏ qua file này khi commit code.

```bash
vi .gitignore
```

![Screen Shot 2022-03-26 at 01.58.15.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_01.58.15.png)

- Xóa bỏ file test-secrets.txt trước khi commit.

```bash
rm -rf test-secrets.txt
```

- Xóa bỏ nội dung secret key trong file `test-secrets.txt` trước khi commit.

```bash
vi test-secrets.txt
```

![Screen Shot 2022-03-26 at 02.00.50.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_02.00.50.png)

⇒ Cách mình khuyến nghị là:

- **Đưa `test-secrets.txt` và `.gitignore` để bỏ qua file này khi commit code.** Nếu đó là file cấu hình hoặc không cần thiết phải commit lên git.
- **Xóa bỏ nội dung secret key trong file `test-secrets.txt` trước khi commit.** Nếu đó là một file cần thiết phải đưa lên git.

Trong trường hợp này của tôi, tôi cần đưa file `**test-secrets.txt`**  lên git. Nên chọn phương án **Xóa bỏ nội dung secret key trong file `test-secrets.txt` trước khi commit.**

Trước tiên cần xóa bỏ secret key ra khỏi `**test-secrets.txt`** và add lại file vào git.

![Screen Shot 2022-03-26 at 02.11.05.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_02.11.05.png)

Bây giờ thử commit lại và xem kết quả.

```bash
git commit -m "Add test-secrests.txt"
```

![Screen Shot 2022-03-26 at 02.11.52.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_02.11.52.png)

Như vậy là đã `passed`, bây giờ chỉ cần push lên remote.

```bash
git push origin main
```

![Screen Shot 2022-03-26 at 02.12.56.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_02.12.56.png)

![Screen Shot 2022-03-26 at 02.13.17.png](https://manhnv.com/images/posts/DevSecOps/lam-the-nao-de-ngan-khong-cho-dev-commit-secrets-len-git-ngan-chan-va-phat-hien-secrets-trong-git/Screen_Shot_2022-03-26_at_02.13.17.png)

## III. Detecting **Secrets**

Nếu một `secret` được commit, một công cụ như [GitHub's Secret Scanning](https://docs.github.com/en/code-security/secret-security/about-secret-scanning) có thể gửi cho bạn thông báo rằng một secrets đã bị lộ.

[GitHub's Secret Scanning](https://docs.github.com/en/code-security/secret-security/about-secret-scanning)  được bật mặc định cho các repository GitHub public.Tuy nhiên đối với private repositories, Có thể đọc [Enabling secret scanning for private repositories](https://docs.github.com/en/code-security/secret-security/configuring-secret-scanning-for-your-repositories#enabling-secret-scanning-for-private-repositories).

Nhưng trong bài này tôi muốn nhúng `Yelp's detect-secrets` vào để thay cho [GitHub's Secret Scanning](https://docs.github.com/en/code-security/secret-security/about-secret-scanning).

Để thêm `Yelp's detect-secrets` vào GitHub workflow, bạn có thể sử dụng ví dụ .github/workflows/detect-secrets.yaml sau:

```yaml
name: Detect Secrets

on: pull_request

jobs:
  detect-secrets:
    runs-on: ubuntu-latest
    container: python:latest

    steps:
    - uses: actions/checkout@v2

    - name: Install Yelp's detect secrets
      run: |
        apt-get update && apt-get install -y jq
        pip install yq
        pip install detect-secrets==$(yq -r .repos[0].rev .pre-commit-config.yaml)
    - name: Detect potential secrets
      run: find -type f -not -path './.git/*' -printf '%P\n' | xargs detect-secrets-hook --baseline .secrets.baseline
```

## IV. Kết luận

Để có thể ngăn chặn Dev commit secret key linh tinh lên git, thì trong bài viết này mình đã giới thiệu các nội dung như sau:

- Ngăn chặn Dev vô tình commit secrets
- Thêm detect-secrets vào repository
- Cài đặt repo với pre-commit
- Detecting Secrets bằng cách nhúng `Yelp's detect-secrets` và GitHub workflow

Hi vọng kiến thức trên có thể đâu đó giúp bạn được phần nào để áp dụng vào thực tế.

Cảm ơn các bạn đã đọc bài của mình.

Các bạn có thể đọc nhiều bài viết hơn của mình tại: https://manhnv.com
Ngoài ra mình còn lập một số chanel để các bạn trao đổi về DevSecOps:

- Facebook group: [https://www.facebook.com/groups/1263207130787754/](https://www.facebook.com/groups/1263207130787754/)
- Discord: [https://discord.gg/EuumFWhH3U](https://discord.gg/EuumFWhH3U)