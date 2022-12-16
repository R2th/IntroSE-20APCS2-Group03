@(BLOG)[nodejs, env, vi, package, npm]

## Tổng quan

Chả là việc viết code NodeJS nó cũng rối ren và phức tạp quá, với lại nhiều dự án dùng đi dùng lại những đoạn code giống nhau, utils giống nhau, core giống nhau, ... thế nên là phải đóng gói và đẩy nó lên đâu đó rồi mỗi khi cần sẽ lấy về dùng.

- `package`: Cái này là tập hợp những đoạn code mà sẽ sử dụng nhiều lần ở nhiều nơi khác nhau trong một hoặc nhiều dự án. VD: `lodash`
- `Nơi nào đó`: Ở đây có nghĩa là `npmjs.org` hay còn gọi là npm package registry
- `Đóng gói`: Nói thì sang, chớ thật ra tôi ở trong thư mục của cái packge cần publish, tôi chạy lệnh `npm publish` rồi npm nó tự khắc nén lại thành file có đuôi `.tar.gz` rồi nó đẩy lên trên npm packge registry giúp tôi
- `Lấy về dùng`: Có nghĩa là `npm i -S package_name` hoặc `yarn add package_name` đó


## Bắt đầu như thế nào

Chắc là phải nói về cái luồng thì nó hợp lý hơn nhẩy:
- Create project (Tạo thư mục tên package): `mk -p package_name`
- init nodejs project `yarn init`
- Install mấy package cần thiết cho cái đống này
- Viết code gì đó (thường là các đồng chí hay copy từ cái mình đã viết rồi, quăng qua đây)
- Viết Unit Test: Bởi vì là mình sẽ dùng đi dùng lại nhiều ở nhiều nơi khác nhau, nên cần phải đảm bảo mọi code mình viết ra là dùng được và không bị thừa thãi. Và quan trọng hơn là chạy được, không bị sai =))
- Bundle: Là cái mọe gì vậy? Đơn giản là việc mình gộp các code mình viết ra thành 1 hoặc nhiều file rồi mang ra một thư mục khác (VD: `dist`)
	- Nếu dùng babel thì bắt buộc phải transpile nó ra dạng javascript thuần để có thể sử dụng được ở chỗ khác
	- Nếu dùng TypeScript thì dĩ nhiên là cũng phải transpile nó ra javascript thuần để có thể sử dụng được ở chỗ khác luôn
	- Nếu dùng Javascript mà muốn bundle lại thì cũng chơi luôn.
- Đóng gói và publish: Gần như chả bao giờ cần phải quan tâm vì nó được support bởi `npm` tool hết rồi. :D

## Bắt tay vào làm

[Published Package](https://github.com/ltv/env) - Anh em vào cái này để check source demo nhá. Thực tế là đang dùng luôn

### Init project

Tối là tôi đang để project ở cái đường dẫn này. Anh em có thể để đâu cũng được luôn.

```bash
mkdir -p ~/ws/ltv/demo-env
```

Rồi, giờ vô init

```bash
cd ~/ws/ltv/demo-env
yarn init
```

Mặt mũi sau đó nó thế này:

```bash
❯ yarn init
yarn init v1.22.10
question name (demo-env):
question version (1.0.0): 0.1.0
question description: Demo safty environment parser
question entry point (index.js):
question repository url: https://github.com/ltv/demo-env.git
question author: Luc <luc@ltv.vn>
question license (MIT):
question private:
success Saved package.json
✨  Done in 65.90s.
```

Đấy. Check trong thư mục thì các đồng chí kiếm được file `package.json`

### Dùng cái gì?

- Mình muốn strongly type nên mình quyết định dùng `TypeScript` cho nó dễ viết. :D
- Sau khi viết bằng TypeScript mình sẽ build ra `javascript` và đóng gói cái đống `javascript` mang đi
- Vậy giờ dùng những package gì để hỗ trợ việc viết code bằng `TypeScript` nhẩy

| Package name | version | reason |
| --- | --- | --- |
| typescript | 4.2.3 |  Khắc khỏi cần giải thích |
| ts-node | 9.1.1 | Bởi vì là mình sẽ dùng cái đống ngày ở server side nên mình dùng `ts-node` để có những api cần thiết |
| @types/node | 14.14.35 | Cái này là để có type của nodejs nè |

Cơ bản vậy là đủ rồi. Chả cần gì nhiều hơn.

- Nói thì nói vậy. Chớ muốn viết code tốt thì mình cần phải có unit test, nên mình quyết định dùng `jest`. Với kinh nghiệm của mình thì `jest` is the best.

| Package name | version | reason |
| --- | --- | --- |
| ts-jest | 26.5.4 | Dùng TypeScript nên cần thêm thằng này để hỗ trợ transpile |
| jest | 26.6.3 | Phải có là đương nhiên |
| jest-config | 26.6.3 | Hỗ trợ cho việc configuration |
| @types/jest | 26.0.21 | Cái này là type của jest đây |

- Đấy, thế là test ok rồi nhá. Giờ tính đến chuyện `lint` code, để đảm bảo mình code theo đúng cái chuẩn nào đó, chứ code linh tinh riết rồi không biết mình code thế nào thì bỏ mọe. Vậy là mình dùng `eslint`

| Package name | version | reason |
| --- | --- | --- |
| eslint | 7.22.0 | Để lint code nha |
| eslint-config-prettier | 8.1.0 | Dùng chung với prettier - ông nôi Microsoft recommend đây |
| eslint-plugin-jest | 24.3.2 | Cái này là lint mấy cái jest unit test |
| @typescript-eslint/eslint-plugin | 4.18.0 | eslint cho TypeScript |
| @typescript-eslint/parser| 4.18.0 | eslint parser cho TypeScript |

- Nghe có vẻ là ổn rồi đấy, nào là test code, nào là check code. Nhưng mà méo. Vẫn còn nhé. Ngoài mấy việc trên, mình cần phải `commit` code với message chuẩn chỉnh. VD. Các đồng chí hay chơi trò: `commit code` hoặc `fix cái gì đó` hoặc `refactor`, ... Nhìn vô méo muốn review code huống chi là merge.

- Đến khúc này chắc các đồng chí sẽ nói: `Thôi thôi, ông im mẹ nó mồm đi, vậy giờ nó thế nào mới đúng?`
- Ờ thì các đồng chí hỏi tôi sẽ trả lời. Nó nhìn na ná thế này đây:

```bash
2021-03-28 09:12 +0700 Luc o [main] {origin/main} feat: add dotenv for loading process.env
2021-03-21 20:04 +0700 Luc o <v1.1.0> v1.1.0
2021-03-21 20:03 +0700 Luc o v1.0.0
2021-03-21 20:02 +0700 Luc o <v0.0.0> 0.0.0
2021-03-21 19:46 +0700 Luc o ci: add NPM_TOKEN, NPM_USERNAME, NPM_EMAIL for authenticating npmjs registry
2021-03-21 19:37 +0700 Luc o <v1.0.0> ci: add GITHUB_TOKEN
2021-03-21 18:55 +0700 Luc o ci: fixed: Failed all unit test
2021-03-21 18:48 +0700 Luc o refactor: change npm registry
2021-03-21 18:39 +0700 Luc o ci: seperate test & release steps
2021-03-21 18:26 +0700 Luc o chore: change github https to ssh
2021-03-21 18:24 +0700 Luc o chore: move release config to package.json
2021-03-21 18:19 +0700 Luc o feat: nodeJs Environment Utils
```

- Vậy chớ giờ làm sao? Làm cái mọe gì nữa? Install cái đống ni vô:

| Package name | version | reason |
| --- | --- | --- |
| commitizen | 4.2.3 | |
| cz-conventional-changelog | 3.3.0 | |
| @commitlint/cli | 12.0.1 | |
| @commitlint/config-conventional | 12.0.1 | |

- Và khi commit, các đồng chí đừng dùng `git commit` nữa nha. Dùng `git-cz` hộ tôi phát.
- Nếu thêm vào `scripts` trong file `package.json` thì có thể dùng thế này:

package.json
```json
"scripts": {
  "commit": "git-cz"
}
```

Execute command
```bash
yarn commit
```

Rồi rồi, nó sẽ trông thế này:

![Alt text](https://blog.ltv.dev/content/images/size/w1000/2021/03/yarn_commit_example.png)

Đấy, nhìn thấy sướng hơn chưa. Giờ thì tha hồ mà chọn kiểu commit, rồi điền thông tin vô nhá.

![Alt text](https://blog.ltv.dev/content/images/size/w1000/2021/03/yarn_commit_all.png)

- Rồi ok. Còn gì nữa không? Còn. Các bố có linting rồi, nhưng mà trước khi commit, các bố quên thì sao? Là một đống 💩 trong code chứ mọe gì nữa. Ấy vậy nên chúng nó nghĩ ra cái `lint-staged` để đảm bảo các bố nhớ việc lint trước khi commit

| Package name | version | reason |
| --- | --- | --- |
| lint-staged | 10.5.4 | Ở trên kìa |

- Mọe. Dài quá bác ơi. Thì dài thật, nhưng mà, đi tiếp tí nữa đi. Nhá. Còn tí xíu nữa thôi. Vì các bố làm các bố còn phải format code cho nó đẹp tí xíu, nên tôi recommend các bố add thêm cái này nha:

| Package name | version | reason |
| --- | --- | --- |
| prettier | 2.2.1 | |

- Xém hết rồi, ráng lên xíu nhá. Gần tới bước cuối. Có vẻ mọi thứ đã gần như là ok. Giờ đến khúc release rồi này. Các đồng chí sẽ phải thắc mắc đặt tên version như thế nào. Ok. Có một cái tên là semantic-release =)). Install tiếp nhá. Ở bước cuối cùng của bài viết này tôi sẽ lôi các bố vô để giải thích.

| Package name | version | reason |
| --- | --- | --- |
| semantic-release | 17.4.2 | |

- Rồi. Đến cuối rồi. Khi mà các bố push code lên repo, các bố nên chạy cái unit test rồi check xem các bố viết được bao nhiêu unit test, cover được bao nhiêu code viết ra, nhìn vào đó, người ta sẽ quyết định có nên dùng package của bố viết không. Nói thì nói là người ta chớ bản thân các bố cũng tin tưởng mà dùng. Vậy nên tôi recommend các bố dùng cái này nha: ĐỂ PUSH VÀ LƯU VÀ SHARE COVERAGE REPORT. Nhá.

| Package name | version | reason |
| --- | --- | --- |
| coveralls | 3.1.0 | |

> Ban đầu tính là add thêm cái link cho từng package để các đồng chí xem, nhưng mà nghĩ lại. Ăn sẵn nhiều quá nó hư người. Nên các đồng chí chịu khó chép cái tên package rồi mang lên Google search hộ tôi phát nhé. Linh động lên.

Rồi rồi. Phần 1 kết thúc tại đây. Tôi sẽ lại tranh thủ viết tiếp.

Hóng hộ tôi cái nha. Tôi cũng sẽ quay lại việc làm Video trên Youtube. Chứ mệt quá bỏ cả năm rồi. Bài viết ngày tôi viết lúc rảnh, khi ngồi trên xe đi làm. =))

Còn video thì sẽ làm khi sáng sớm thức giấc.

Các đồng chí ủng hộ tôi tiếp nha.

- Blog: [BLOG.LTV.DEV - Bài này luôn](https://blog.ltv.dev/toi-viet-cai-package-ltv-env-nhu-the-nao/)
- Youtube Channel: [https://www.youtube.com/c/LTVOfficial](https://www.youtube.com/c/LTVOfficial)