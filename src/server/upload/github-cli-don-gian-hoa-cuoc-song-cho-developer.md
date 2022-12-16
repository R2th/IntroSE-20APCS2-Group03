# 1. Giới thiệu
Đối với một developer, làm việc nhóm là một điều bắt buộc hiện này và công cụ hỗ trợ tốt nhất để tối ưu hóa việc coop đó là Github. Chuyện là sau khi mình chuyển sang hệ điều hành mới, việc clone các project quả là cực hình với mình vì phải liên tục mở github để copy remote link, rồi tiến hành clone về và setup. 

Cách đây một năm, Github đã release Github CLI tool khá là thú vị và tiện lợi cho developer để giải quyết các vấn đề về workflow như ví dụ mình kể trên. Các chức năng chính có thể tóm gọn là đem cả Github của bạn từ web lên môi trường terminal.

![Hình ảnh giới thiệu Github CLI](https://images.viblo.asia/eea5bdc9-4044-45c2-af1d-26ed21c5fbfc.png)

# 2. Cách cài đặt
[Trang chủ Github CLI](https://cli.github.com/)

Do là con cưng của Microsoft nên các tutorial rất rõ ràng. Các bạn có thể install dựa trên hướng dẫn từ trang chủ.
https://github.com/cli/cli#installation

# 3. Tính năng
Khi đã cài đặt xong chúng ta hãy cùng thử một vài chức năng cơ bản.
Đầu tiên chúng ta cùng dùng lệnh:
```bash
gh
```
![](https://images.viblo.asia/63603f09-db31-4269-a06b-c5642d67c0a5.png)
Các chức năng của Github CLI  sẽ được liệt kê đầy đủ.
Việc đầu tiên chúng ta cần làm là Login vào tài khoản Github bằng lệnh:
```bash
gh auth login
```

Sẽ có 2 lựa chọn đó là login bằng web hoặc dán authentication token vào (về authentication token thì Github hiện đang chuyển dần sang dùng phương thức này cho các tác vụ cần liên kết với tài khoản [Hướng dẫn về authentication token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)).



-----


Trong bài viết này mình sẽ giới thiệu về tính năng mà mọi người dùng nhiều nhất trong Github đó là tương tác với repo thông qua COMMAND `gh repo`:

Chức năng đầu tiên là tạo repo `gh repo create [<name>]`, chỉ với một câu lệnh là chúng ta đã pass được cả đống thứ lằng nhằng lúc tạo repo trên web.


![github cli create repo](https://images.viblo.asia/eeb62a73-7951-439d-b24f-db5d66cccfb9.png)
Và đương nhiên nó sẽ thay chúng ta cả việc setup repo github ở local

![github cli congfig git remote](https://images.viblo.asia/e3db6c1b-9c59-43a1-9379-65b09de3c9cb.png)


-----

Chức năng tiếp theo đó là clone repo về bằng câu lệnh `gh repo clone [<url>]`
Tuy nhiên thường thì chúng ta chỉ clone repo cá nhân lúc chuyển đổi môi trường làm việc, nhưng Github CLI lại không hỗ trợ lệnh `gh repo list` (vẫn còn trong diện issue).

Sau quá trình research thì mình tìm ra được một tips rất hay của người dùng [mislav](https://github.com/cli/cli/issues/642#issuecomment-693598673).
Chúng ta sẽ mở file ~/.config/gh/config.yml và thêm đoạn config này vào.
```yaml
# ~/.config/gh/config.yml
aliases:
    repos: |
        !gh api --paginate graphql -f owner="$1" -f query='
          query($owner: String!, $per_page: Int = 100, $endCursor: String) {
            repositoryOwner(login: $owner) {
              repositories(first: $per_page, after: $endCursor, ownerAffiliations: OWNER) {
                nodes { nameWithOwner }
                pageInfo { hasNextPage endCursor }
              }
            }
          }
        ' | jq -r '.data.repositoryOwner.repositories.nodes[].nameWithOwner' | sort
```

Mục đích là dùng câu lệnh `gh api` và thư viện [jq](https://github.com/stedolan/jq) (nhớ cài đặt đấy nhé) để có thể handle GraphQL response mà Github trả về.


Sau khi config xong chúng ta có thể dùng lệnh `gh repos [<username>]` để list tất cả repo của một người dùng bất kỳ.

![Github list repo](https://images.viblo.asia/53515d5a-b991-46ac-b786-84d7ec193d7d.png)

Các chức năng khác như view hoặc fork thì cũng tương tự như vậy, bạn có thể dùng lệnh `gh repo --help` nó sẽ có đầy đủ các documents hướng dẫn (con cưng có khác).

# 4. Tổng kết
Hôm nay mình đã giới thiệu về Github CLI, một công cụ tuyệt vời dành cho developer. Mong rằng các bạn sẽ áp dụng được nó và tối ưu hóa workflow để code tốt hơn. Chúc mừng năm mới. :clap::clap::clap: