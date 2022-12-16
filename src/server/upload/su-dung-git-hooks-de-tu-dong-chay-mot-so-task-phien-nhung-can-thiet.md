> Bài viết gốc [Use Git Hooks to Automate Necessary but Annoying Tasks](https://thoughtbot.com/blog/use-git-hooks-to-automate-annoying-tasks)

Một số tasks thật sự cần chạy sau khi pull code hoặc check out sang một branch chẳng hạn như cập nhật các dependencies hoặc migrate database, re-index `ctags` để cải thiện trải nghiệm tốt hơn khi phát triển các ứng dụng. Bên cạnh đó các bạn dev thường xuyên quên làm nó dẫn đến dễ bị lỗi. Để xác định vấn đề gần đây có một bộ `git` hooks với [dotfiles](https://github.com/thoughtbot/dotfiles/commit/cbdcbce01dea1ab3850be2311f33f00d75f6088b) để tự động làm các task đó.

### Git Hooks

Git có tính năng thường sử dụng đó là [hooks](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) . Các bạn có thể coi một hook là một event kích hoạt trước và sau một số trạng thái trong quá trình kiểm soát sửa đổi. Các hooks cần chú ý gồm có:

- `prepare-commit-msg` - Fire trước commit message.
- `pre-commit` - Fire trước một `git commit`.
- `post-commit` - Fire sau một `git commit`.
- `post-checkout` - Fire sau thay đổi các branches.
- `post-merge` - Fire sau merging các branches.
- `pre-push` - Fire trước code pushed lên một remote.

### Mở rộng các Hooks

Dotfiles [convention for extension](https://github.com/limkimhuor/dotfiles/blob/master/README.md) là nơi để tùy chỉnh các hooks trong các file `{pre,post}-$EVENT` trong thư mục `{~/.git_template.local/hooks}`.
Đến đây bất cứ chúng ta thêm vào các hook files sẽ tự động thực thi chạy các task mà chúng ta thường xuyên quên.

### Các tasks thường xuyên quên

> Quên chạy re-index `ctags`!

Các [dòng code](https://github.com/limkimhuor/dotfiles/blob/master/git_template/hooks/ctags) dưới đây sẽ re-index cho các bạn sau mỗi command `git` 

``` shell
# ~/.git_template.local/hooks/ctags
#!/bin/sh

set -e

PATH="/usr/local/bin:$PATH"
dir="$(git rev-parse --git-dir)"
trap 'rm -f "$dir/$$.tags"' EXIT
git ls-files | \
  "${CTAGS:-ctags}" --tag-relative=yes -L - -f"$dir/$$.tags" --languages=-javascript,sql
mv "$dir/$$.tags" "$dir/tags"
```

> Quên chạy `bundle install` sau khi checkout sang branch khác

Tự động cài các gem mới

``` shell
# ~/.git_template.local/hooks/post-checkout

# use `hookup` gem if it's installed
if command -v hookup > /dev/null; then
  hookup post-checkout "$@"
else
  # otherwise, do it yourself
  [ -f Gemfile ] && bundle install > /dev/null &
fi
```

> Quên chạy các pending migrations

Tự động chạy các migrations

``` shell
# ~/.git_template.local/hooks/post-checkout

# use `hookup` gem if it's installed
if command -v hookup > /dev/null; then
  hookup post-checkout "$@"
else
  # otherwise, do it yourself
  [ -f db/schema.rb ] && bin/rake db:migrate > /dev/null &
fi
```

> Viết document API với [fdoc](https://github.com/square/fdoc) nhưng quên generate các page

Tự động generate các docs HTML

``` shell
# ~/.git_template.local/hooks/post-checkout

bin/fdoc convert ./spec/fixtures --output=./html > /dev/null &
```

> Quên Go commitment sang standard code format cho các files

Chạy `go fmt` trước commit

``` shell
# ~/.git_template.local/hooks/pre-commit

gofiles=$(git diff --cached --name-only --diff-filter=ACM | grep '.go$')
[ -z "$gofiles" ] && exit 0

function checkfmt() {
  unformatted=$(gofmt -l $gofiles)
  [ -z "$unformatted" ] && return 0

  echo >&2 "Go files must be formatted with gofmt. Please run:"
  for fn in $unformatted; do
    echo >&2 "  gofmt -w $PWD/$fn"
  done

  return 1
}

checkfmt || fail=yes

[ -z "$fail" ] || exit 1

exit 0
```

Trong đó các bạn có thể tìm hiểu thêm về gem [Hookup](https://github.com/tpope/hookup) dành cho Rails bao gồm các phiên bản hook của Bundler và migration.

Chúng ta có thể tập trung cho việc quan trong hơn bằng cách đơn giản hóa và tự động hóa các phần việc nhỏ nhói trong quá trình phát triển rồi đấy ;)

Cảm ơn các bạn đã đọc bài viết.

#### Tài liệu tham khảo

- [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [Shell Scripting](https://www.shellscript.sh/)