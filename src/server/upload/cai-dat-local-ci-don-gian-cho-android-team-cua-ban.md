Chào mọi người, hôm rồi mình có hướng dẫn [dùng ktlint và detekt để check code style, lint cho android](https://viblo.asia/p/check-android-code-style-va-code-smell-dung-ktlint-va-detekt-yMnKMbwmZ7P). Hôm nay, tiếp tục *seri* cải thiện *code*, mình chia sẻ tiếp về cách chạy các *tool* trên tự động mỗi khi *commit code*.

OK, bắt đầu thôi !
## Git Hooks
Trước đây, mình vẫn luôn mong muốn tìm một công cụ để giúp loại bỏ những lỗi cơ bản về *git* và *coding convention*  trước khi gởi *PR*, như *commit message* theo chuẩn công ty, *code* phải được *format* chung, *unit test* phải đc chạy *pass* ở *local* hay lỗi *lint* phải được xử lý hết... tìm hoài không thấy nên phải thường nhắc nhở anh em, đôi khi nhắc hoài nó lại dỡ. Bởi lẽ *code* mọi người đều quản lý trên máy cá nhân, ai làm gì thì sao can thiệp, cứ ngỡ rồi mình sẽ mãi bị ghét vì suốt ngày lãi nhãi, nhắc đi nhắc lại mấy chuyện kiểu "Ừ biết rồi, khổ lắm, nói mãi". Và rồi...

Như vô tình nhặt được bí kíp, mình tình cờ tìm kiếm cách *check* từ khoá `commit message rule git` và `git hooks` hiện ra như cứu cánh. Với *git hooks*, mọi vấn đề của mình đã gần như hoàn toàn được giải quyết.

### Git hooks là gì?
Về chi tiết các loại [git hooks các bạn có thể đọc thêm ở bài viblo này](https://viblo.asia/p/introduction-to-git-hooks-1qm6RWaNGeJE)

> Giống như các hệ thống quản lý *version* khác, *Git* cũng cung cấp cho chúng ta một cách để can thiệp vào một số quá trình đặc biệt của nó bằng những *custom script*, đó là `hook`. 

### Git hooks trở thành vị cứu tinh như thế nào?

Mình chọn ngay 2 `client hook` phù hợp cho việc kiểm tra *commit message rule*, và chạy các *tool/task* tự động *code style*, *lint*, *unit test* trước khi *commit*.

1. `pre-commit`: *Hook* này được gọi đầu tiên, thực thi trước khi bạn nhập nội dung cho *commit message*. *Hook* này được sử dụng để kiểm tra nội dung các tập tin được commit. Bạn có thể viết *script* để kiểm tra *code convention*, *run test* hoặc chạy *static analysis* trước khi *commit*. Nếu *script* trả về kết quả lớn hơn 0, quá trình *commit* sẽ bị hủy bỏ.

2. `commit-msg`: Nó được gọi sau khi chúng ta đã nhập nội dung *message* cho *commit*. Thích hợp trong việc chuẩn hóa *commit message*. Chỉ có một tham số được nhận trong *hook* này, đó là tên *file* chứa *commit message*. Tương tự, nếu *script* này trả về kết quả lớn hơn 0 thì quá trình *commit* sẽ bị hủy.

## Cài đặt

Tạo một `folder team-props` có cấu trúc như sau:

![](https://images.viblo.asia/7fb6b32d-150e-4895-ad33-5c404fcf3d69.png)

> Lưu ý: nếu các bạn thay đổi tên hoặc cấu trúc thư mục, các bước bên dưới các bạn phải tự tìm kiếm và sửa đường dẫn đến các file theo đúng thư mục của bạn.

### Tạo script checking commit message (`commit-msg.sh`)

```bash
#!/usr/bin/env bash
echo "Checking your commit message"

<<comment
  Bạn có thể comment theo cú pháp này.
  Bạn có thể thay đổi message regex theo mong muốn.
  Lưu ý có sự khác nhau regex trên Mac vs Linux.
comment

commit_regex='^\[\b(add|modify|fix|revert|hotfix)\b\]\s.+$' 
error_msg="Aborting commit. Your commit message does not follow the commit message rule"

if ! grep -iqE "$commit_regex" "$1"; then
    echo "$error_msg" >&2
    exit 1
fi
```
*For Linux:*
```bash
commit_regex='^\[\b(add|modify|fix|revert|hotfix)\b\]\s.+$' 
```
*For Mac:*
```bash
commit_regex='^\[\b(?i)(add|modify|fix|revert|hotfix)\b\]\s.+$'
```

Bạn có thể thay thế *regex* theo đúng mong muốn, hiện tại mình đang *follow* theo *rule* của *project*.

Ví dụ, những *commit* sau sẽ là hợp lệ: 
```
[Add] Feature A
[Modify] Feature B
[Fix] Correct layout C
[Revert] Feature B
[Hotfix] Sometime popup is not dismissed in main page production.
...
```
### Tạo script chạy tự động các gradle task và Unit test (`pre-commit.sh`)

```bash
#!/usr/bin/env bash
echo "Running static analysis..."

echo "Start running ktlint"
./gradlew ktlintFormat ktlintCheck --daemon
status0=$?
if [[ "$status0" = 0 ]] ; then
    echo "ktlint found no problems."
else
    echo 1>&2 "ktlint found violations, it could not fix. Please check ktlint report at \"build/reports/ktlint/ktlint.html\" "
    exit 1
fi

echo "Start running detektCheck"
./gradlew detekt --daemon
status1=$?
if [[ "$status1" = 0 ]] ; then
    echo "detekt found no problems."
else
    echo 1>&2 "ktlint found violations. Please check ktlint report at \"build/reports/detekt/detekt-report.html\" "
    exit 1
fi

echo "Start running unit test"
./gradlew testDevelopDebug --daemon
status2=$?
if [[ "$status2" = 0 ]] ; then
    echo "run unit test success."
    git add .
else
    echo 1>&2 "run unit test failure, please re-check"
    exit 1
fi
```

Trong đoạn *code* trên mình kết hợp sử dụng lại các *gradle task* trong bài dùng [`ktlint và detekt để kiểm tra code convention và code smell`](https://viblo.asia/p/check-android-code-style-va-code-smell-dung-ktlint-va-detekt-yMnKMbwmZ7P) . 

Lỗi ở điểm nào thì mình dừng ngay tại thời điểm đó luôn. Commit chỉ thành công khi tất cả các bước trên thành công.

**Lưu ý:** cú pháp *run unit test* có dạng như bên dưới, bạn có thể tuỳ chỉnh theo cách của *project* đang hoạt động.

```kotlin
./gradlew test[Flavor][BuildType]
```

### Copy Hooks to git hooks folder

Bây giờ mình cùng tạo 1 *gradle task* để *copy hooks* vào đúng thư mục dự án `.git/hooks` nào.

```kotlin
fun isLinuxOrMacOs(): Boolean {
    return isMac() || isLinux()
}

fun isLinux(): Boolean {
    return System.getProperty("os.name").toLowerCase().contains("linux")
}

fun isMac(): Boolean {
    val osName = System.getProperty("os.name").toLowerCase()
    return osName.contains("mac os")
            || osName.contains("macos")
}

tasks.register("copyGitHooks", Copy::class) {
    description = "Copies the git hooks from team-props/git-hooks to the .git folder."
    val path = if (isLinux()) "$rootDir/team-props/git-hooks/linux"
    else "$rootDir/team-props/git-hooks/mac" // diff paths from Linux & Mac environment
    from(path) {
        include("**/*.sh")
        rename("(.*).sh", "$1")
    }
    into("$rootDir/.git/hooks")
    onlyIf { isLinuxOrMacOs() }
}

tasks.register("installGitHooks", Exec::class) {
    description = "Installs the pre-commit git hooks from team-props/git-hooks."
    group = "git hooks"
    workingDir = rootDir
    setCommandLine("chmod", "-R", "+x", ".git/hooks/")
    dependsOn("copyGitHooks")
    onlyIf { isLinuxOrMacOs() }
    doLast {
        logger.info("Git hook installed successfully!")
    }
}

afterEvaluate {
    tasks["clean"].dependsOn("installGitHooks")
}

```
Trong đoạn *code* trên, sẽ có 2 *task* là `copyGitHooks` và `installGitHooks`, 2 *task* sẽ tự động chạy mỗi khi bạn *clean code*. Do vậy, chỉ khi bạn chạy *clean project* ít nhất 1 lần thì các (thay đổi) *git hooks* mới được *copy* và chạy đúng mong muốn.

Sau khi hoàn thành tạo *task* này, bạn hãy thêm vào `build.gradle` *level project*:
```kotlin
buildscript {

    apply(from = "$rootDir/team-props/git-hooks.gradle.kts")
    
    repositories {
     //...
    }
    dependencies {
     //...
    }
}
```
### Test kết quả
Bây giờ hay *clean project* 1 lần, sau đó thử *edit* và tạo 1 *commit*. Hãy ăn mừng nếu *gradle task* được chạy thành công ! (beer)(beer)(beer).

## Conclusion
Ok, như vậy là mình đã hướng dẫn các bạn tự tạo một `local CI` nhỏ, giúp *check* qua *code* của anh em trong *team* về *code style, lint, unit test* trước khi tạo *Pull Request*. Hy vọng bài viết mang lại lợi ích cho mọi người.

Tham khảo:  [Source Code](https://github.com/namnh-0652/AndroidSetup/pull/2/commits/21cbff18c266c775846f5ccecb43be54b431c8fe)

**HAPPY CODING !**