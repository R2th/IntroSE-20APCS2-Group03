Chào mừng các bạn đã quay trở lại với blog của mình, lại là mình đây (dù chả ai biết mình là ai :sunglasses:)

Hôm nay không Docker cũng chẳng VueJS :D, mà chúng ta sẽ cùng nhau tìm hiểu cách cải thiện chất lượng code và nâng cao hiệu suất trong quá trình làm việc nhóm với Eslint, Prettier, Husky, Lint-staged và CommitLint, cùng với đó là tận dụng CICD (Gitlab CI) để có thể tự động hoá những công đoạn này, và sản phẩm là những dòng code đẹp đẽ được lưu trên repository nhé ;)

# Lời mở đầu
Trong quá trình phát triển phần mềm, 1 dự án thường có  nhiều hơn 1 người người, và thường kéo dài trong 1 khoảng thời gian, số lượng code, chức năng ngày một nhiều. Việc làm sao để code luôn được viết theo chuẩn, chung 1 style sẽ giúp tất cả các thành viên trong nhóm luôn "đi cùng 1 con đường", không có chuyện người thích dùng dấu "chấm phẩy" người thì không, người thích có khoảng trắng ở tên Function người thì không. Mà khi làm việc nhóm tất cả đều nên được setup để sử dụng chung một chuẩn, như thế code của các thành viên mới cùng một "chủng tộc" :rofl::rofl:

Thứ nữa là khi làm nhóm nhiều người, việc commit làm sao cho rõ ràng, để người khác có thể review, hiểu được từng commit liên quan tới điều gì, làm gì cũng là 1 điều ta cần phải để ý. Và làm cách nào để tất cả các thành viên luôn tuân thủ các quy định về việc commit code sẽ giúp cho history của chúng ta luôn có 1 style thống nhất, dễ dàng generate CHANGELOG tự động từ commit,...

Nếu các bạn để ý, các repo open source trên Github mà nổi nổi họ hầu như đều phải có những quy chuẩn rất nghiêm khi commit code, vì không thể nào trông đợi vào việc lập trình viên "tự chú ý" được mà phải có chuẩn nghiêm ngặt và có kiểm tra tự động để đảm bảo là code được commit lên repo chung luôn sạch sẽ :joy::joy:

Việc chú ý những về đề bên trên mình tin rằng sẽ cải thiện đáng kể chất lượng code, cùng với đó là hiệu suất làm việc của mỗi developer. Ở bài này chúng ta sẽ cùng nhau tìm hiểu những vấn đề đó nhé
# Chuẩn bị
Đầu tiên các bạn clone code của mình [ở đây](https://gitlab.com/maitrungduc1410/productive-coding) (nhánh `master` nhé). Clone về các bạn nhớ chạy `npm install` hoặc `yarn install` nhé.

Ở đây mình có chuẩn bị sẵn cho các bạn 1 project NodeJS, dùng framework NestJS, viết bằng Typescript, đây là một framework khá nổi hiện nay cho NodeJS, vì kiến trúc của nó khá là tốt (xây dựng dựa theo kiến trúc Angular), mình cũng thâý như thế sau một thời gian sử dụng, support rất nhiều thứ (cả microservice). Và vì kiến trúc học theo Angular nên có 1 thứ mình cực ưng ở Nest đó là Dependency Injection, các bạn có thể search google để biết nó là gì nhé. Thôi mình lại chuẩn bị quảng cáo dài hơi rồi đấy :rofl::rofl:.

Ở project này, các bạn mở `src/app.controller.ts` ta có 3 route:
```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('name')
  getName(): string {
    return this.appService.getName();
  }

  @Get('age')
  getAge(): number {
    return this.appService.getAge();
  }
}
```
Nhìn qua ta có thể biết ngay chúng làm gì: trả về Hello World, trả về tên và tuổi.

Sau đó ta chạy thử project lên, các bạn chạy command sau:
```
npm run start:dev
```
Sau đó ta mở thử trình duyệt ở địa chỉ `localhost:3000` và test thử 3 route `/`, `/name` và `/age` để đảm bảo mọi thứ hoạt động trơn tru nhé :)

# Cải thiện chất lượng code với Eslint Và Prettier
Có thể có nhiều bạn đã biết tới 2 cái tên Eslint và Prettier mình nói ở trên, nhưng mình nghĩ cũng có rất nhiều người không biết tới chúng, hoặc bình thường có dùng mà không để ý hoặc không phân biệt được sự khác biệt và lợi ích do chúng mang lại.

Eslint là một tool để phân tích code Javascript để xác định các đoạn code có lỗi (hoặc có khả năng có lỗi), và có thể fix tự động cho chúng ta. Hiện tại VSCode support cực mạnh cho Eslint, lỗi được detect trực tiếp ngay tại thời điểm ta viết code, và có thể fix tự động (khi ta bấm lưu file chẳng hạn)

Prettier là `code formatter`, cái tên nói lên tất cả, việc của Prettier là chỉ tập trung vào format code, chứ không phân tích được lỗi như Eslint.

Thông thường khi sử dụng các bạn có thể thấy "hình như Prettier hơi thừa thãi" vì thấy chả khác gì cả vì Eslint cũng có thể format được code rồi. Nhưng thực tế là có rất nhiều trường hợp mà Eslint bó tay, nhưng Prettier lại làm khá tốt. Và ở bài này ta dùng Prettier như một "người đứng sau" đảm bảo code được format chuẩn sau khi Eslint hoàn thành công việc của nó. Kết hợp bộ đôi này đảm bảo code của chúng ta luôn được check lỗi + format chặt chẽ, đẹp đẽ ;)

Ta cùng xem có gì đặc biệt ở 2 anh bạn này nhé :D
## Eslint
Với Eslint và sự support mạnh mẽ của VSCode, ta có thể thấy được kết quả phân tích lỗi hiển thị realtime ngay khi ta viết code, các bạn mở `src/app.controller.ts`, ta thử sửa lại như sau:
```ts
@Get()
  getHello(): string {
    const a = 1
    return this.appService.getHello();
}
```
Ngay lập tức ta sẽ thấy báo lỗi, biến a khai báo mà không sử dụng:

![](https://images.viblo.asia/0a10d282-c756-4dd4-a8e6-8551ad462631.png)

Ta lại thử sửa tiếp lại như sau:
```ts
@Get()
  getHello(): string {
    const b = 3
    b++
    return this.appService.getHello();
}
```
Thì ta sẽ thấy lỗi "biến b là `const` nên không được gán giá trị sau khi khai báo":

![](https://images.viblo.asia/e5c584b7-7953-44fd-b40f-ec653a1956bf.png)

Tiếp đó ta sửa lại như sau:
```ts
@Get()
  getHello(): string {
    return 123;
}
```
Sẽ thấy báo lỗi rằng method yêu cầu trả về `string` trong khi ta đang trả về `number`

![](https://images.viblo.asia/d28a1d36-f2c0-4408-aee2-14fa9f005b8a.png)

Tiếp theo ta mở file `.eslintrc.js` thêm vào `rules` 1 giá trị như sau:
```json
rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    semi: ["error", "always"]  ---->>>> thêm vào dòng này
  },
```
Ý dòng trên mình bảo là "Eslint ơi tôi muốn có dấu chấm phẩy ở mỗi dòng code". Sau đó ở VScode ta gõ `CMD+SHIFT+P` và chọn như sau:

![](https://images.viblo.asia/81cc287c-a077-4eb1-8712-110d9ce30f5a.png)

Và ở file `settings.json` các bạn thêm vào:
```json
"editor.codeActionsOnSave": {
      "source.fixAll.tslint": true,
      "source.fixAll.eslint": true
    },
```
Đoạn bên trên để bảo VSCode rằng, khi save file thì tự động fix lỗi Eslint luôn, và ta có kết quả như sau:

<div align="center">
    <img src="https://images.viblo.asia/3317fb6d-10bd-4993-a6f2-310ab11e299f.gif">
</div>
Như các bạn thấy ở trên nếu ta xoá dấu chấm phẩy đi khi lưu lại thì VSCode tự fix theo chuẩn của Eslint do ta định nghĩa luôn.

Eslint còn vô số điều tuyệt vời nữa mà thực sự từ khi dùng nó mình đã đỡ được rất nhiều lỗi ngay từ lúc còn viết code, không phải chờ build xong chạy rồi thấy lỗi mới sửa. Tiết kiệm được rất nhiều thời gian

Từ đây có một câu hỏi là: Ô thế vậy tôi không dùng VSCode thì sao??????? :joy::joy:

Bạn đang thắc mắc đúng rồi đấy, đương nhiên ta không thể bắt buộc developer dùng Vscode được, đó tuỳ thuộc vào sở thích của họ. Do vậy ở bài này mình đã định nghĩa sẵn command `npm run lint` để chạy Eslint, check lỗi và fix các lỗi liên quan. Các bạn tự test thử xem sao nhé :)

Lại có 1 câu hỏi nữa: ơ thế vậy developer quên ko chạy `npm run lint` trước khi commit code thì sao, không thể tin tưởng rằng developer sẽ luôn nhớ mà chạy command đó được????

Bạn lại thắc mắc đúng rồi đấy, do vậy nên mình mới viết bài này :joy::joy:. Lát nữa bên dưới ta sẽ cùng xem điều đó nhé ;)
## Prettier
Ta thử sửa lại file `app.controller.ts` như sau:
```ts
import { Controller, Get } from '@nestjs/common';
import {AppService 



} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(      )
  getHello(): string {



    return this.appService.getHello();
  }

  @Get('name')
  getName(): string {


    return this.appService.getName();
  }

  @Get('age')
  getAge(): number {
    
    return this.appService.getAge();
  }
}
```
Sau đó ta lưu lại đã nhé.

Như các bạn thấy file của chúng ta khá là nát :D, style linh tinh, Eslint không phát hiện được, giờ mà commit file này lên thì tối leader chửi cho sấp mặt :joy::joy:

Và để fix điều này thì ta đã có Prettier cứu cánh. Ta chạy command sau:
```
npm run format
```
Ngay sau đó các bạn sẽ thấy file của chúng ta lại được format đẹp đẽ trở lại. Nếu các bạn muốn xem Prettier đã làm gì, thì ta mở `package.json` tìm tới `scripts` là `format` sẽ thấy Prettier sẽ format các file trong folder `src` và `test` sau đó tự động lưu lại với option `--write`

Ở đây lại nảy sinh một câu hỏi tương tự với Eslint: Vậy nếu developer quên không chạy `format` trước khi commit code????

Và đó vẫn là lí do vì sao mình viết bài này :joy::joy: lát nữa bên dưới ta cùng xem cách giải quyết nhé

**Note**: nếu bạn nào để ý có thể thấy rằng cái file `app.controller.ts` nát nát bên trên, ta vẫn có thể cấu hình để Eslint hiểu và tự fix được không cần thiết tới Prettier, nhưng ở bài này để demo cho các bạn dễ hiểu thì mình cấu hình Eslint ở mức cơ bản để nó hơi "ngu" chút, để Prettier còn có việc để làm chứ :D. Nhưng thực tế dù có cấu hình Eslint khá kĩ càng nhưng mình vẫn gặp nhiều trường hợp phải có Prettier cứu cánh mới có được code theo chuẩn như mình muốn


Ta bắt đầu vào tiết mục chính của ngày hôm nay thôi nào
# Tự động hoá với Lint-staged và Husky
Giả sử ta có một project to bự, cỡ trăm file (thực tế thường vậy lắm), mà ở lần commit này ta chỉ sửa có mỗi 1 file.

Nếu ta chạy `npm run lint` để Eslint check cú pháp hoặc `npm run format` để Prettier format code, thì chúng sẽ được chạy trên toàn bộ source code của chúng ta, mà ta sửa có mỗi 1 file, các file còn lại thì đã được format sẵn từ lần commit trước rồi. Điều này dẫn tới việc ta phải tốn thêm thời gian chờ đợi, và nó là thừa thãi. 

Do vậy ở đây ta có [lint-staged](https://github.com/okonet/lint-staged) làm cứu cánh. bằng việc sử dụng `lint-staged` cho phép ta thực hiện một hoặc một số công việc **chỉ** với những file được git `staged`, hiểu đơn giản là những file vừa được thêm vào hoặc có sự thay đổi ở thời điểm hiện tại. Do đó thay vì format cả 100 file, ta chỉ cần format 1 file mà ta vừa sửa, giúp ta tiết kiệm thời gian.

Ta cùng bắt đầu nhé ;)

Đầu tiên ta cần cài `lint-staged`, các bạn chạy command sau:
```
npm install --save-dev lint-staged

# hoặc dùng yarn (mình thích yarn hơn vì nó nhanh ;))
yarn add --dev lint-staged
```
Sau khi cài xong, các bạn mở file `package.json`, ở `scripts` các bạn thêm vào cuối file `package.json` cấu hình của `lint-staged`:
```json
"lint-staged": {
    "*.ts": [
      "npm run lint",
      "npm run format",
      "git add ."
    ]
}
```
Ở trên ta định nghĩa command `npm run lint:staged`, command đó sẽ chạy `lint-staged`, và nó sẽ tìm tới cấu hình ta định nghĩa bên dưới, đó là check toàn bộ các file có đuôi `.ts` xem có file nào vừa được Git `staged` không, nếu có thì thực hiện theo thứ tự các công việc như trên.

Chú ý ở trên mình có `git add .` ở cuối, lí do để đảm bảo nếu những file mà chúng có bị thay đổi sau quá trình `lint-staged` thì ta thêm luôn chúng vào Git luôn, chứ không cần tự ta phải chạy bằng tay nữa.

Oke rồi đó, nom project của chúng ta hiện giờ sẽ như sau:

![](https://images.viblo.asia/0cd5cf07-9e55-428a-b415-919b83486230.png)

Như các bạn thấy ở trên folder `src` hay `test` ta chưa hề sửa gì.

Giờ ta cùng mở `src/app.controller.ts` và sửa lại nội dung như sau nhé:
```ts
import {Controller, Get } from '@nestjs/common';
import { AppService} from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
    
    ) {

  }

  @Get()
  getHello(): string {
    const a = 1;
    return this.appService.getHello();
  }

  @Get('name')
  getName(): string {

    
    return this.appService.getName()
    ;
  }

  @Get('age')
  getAge(): number {


    return this.appService.getAge();
  }
}
```
Sau đó ta nhớ lưu lại nhé.

Như các bạn thấy file `app.controller.ts` của chúng ta bây giờ lại khá là nát :joy::joy:

Tiếp theo ta sẽ cài đặt và cấu hình [Husky](https://github.com/typicode/husky) nhé. Husky là một tool mà nó có thể bắt được event khi ta thao tác với Git repository (add, commit,...) và từ đó ta có thể thực hiện các hành động tương ứng, hoặc ngăn không cho commit. Husky và Lint-staged là 1 cặp bài trùng thường đi cùng với nhau, cực kì hữu dụng trong việc đảm bảo code khi được commit lên repository luôn được chạy qua những công đoạn kiểm tra để chắc chắn "code sạch, code đẹp" :joy::joy:.

Các bạn cài husky bằng command:
```bash
npm install --save-dev husky

# hoặc
yarn add --dev husky
```
Sau đó các bạn chạy command sau để khởi tạo cấu hình cho husky:
```bash
npx husky install
```
Sau khi chạy xong các bạn sẽ thấy 1 folder mới tên là `.husky`:

![](https://images.viblo.asia/31bfb787-562e-46ec-afcb-c5e434e3731e.png)

Tiếp theo ta để set Husky bắt lấy event tại thời điểm user gõ `git commit` thì các bạn chạy command sau:
```bash
npx husky add .husky/pre-commit "yarn lint-staged"
```
Ở trên các bạn thấy là ta bắt event `pre-commit` thì chạy command `yarn lint-staged`. Ngay sau đó các bạn sẽ thấy Husky sinh ra 1 file tên là `pre-commit` trong folder `.husky` với nội dung như sau:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged
```

Tiếp theo để đảm bảo là khi ta code chung với các member khác trong team thì quá trình setup husky được tự động ko cần các members làm lại nữa thì các bạn thêm vào file `package.json` 1 script như sau:
```json
"scripts": {
...
"postinstall": "husky install"
}
```
`postinstall` sẽ được chạy ngay sau khi ta chạy `npm/yarn install`

Âu cây ổn rồi đó, giờ ta thử commit code xem nhé:
```bash
git add .
git commit -m "test husky, lint-staged"
```
Ngay lập tức ta thấy in ra như sau:

![](https://images.viblo.asia/b725dccd-03fc-4103-a5e8-4f3ece22bade.png)

Như ta thấy ở trên Husky sẽ chạy `lint-staged` và các công việc cần thiết được thực hiện, và khi mọi thứ ô xờ kê ta thấy như sau, và ở đây các công việc khai báo ở `lint-staged` chỉ phải chạy cho duy nhất file `app.controller.ts` vì chỉ file này có đuôi `.ts` và đang được Git `staged`:

![](https://images.viblo.asia/eeece66d-b47c-4e2c-b535-9ede4127a003.png)

Giờ đây code của chúng ta đã sẵn sàng để push. 

Tiếp theo ta thử sửa lại file `.eslintrc.js` thêm vào `rules` 1 dòng như sau:
```json
rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    semi: ["error", "always"],
    "no-unused-vars": ["error", { "vars": "all" }] // thêm vào dòng này
  },
```
Ở trên ta thêm vào 1 rule ý bảo "Eslint, báo lỗi nếu thấy có biến nào không được dùng tới", trước đó Eslint chỉ báo Warning (màu vàng), giờ sẽ báo đỏ :x:

Ta thử mở `app.controller.ts` sẽ thấy báo đỏ như sau:

![](https://images.viblo.asia/56af9e86-6bd3-4545-9802-080e4e072bb1.png)

Như trên ta thấy VSCode báo lỗi đỏ là biến `a` được khai báo nhưng không dùng. Đương nhiên ai không dùng VSCode thì không có chức năng này, và do vậy ta cần kiểm tra lúc commit để đảm bảo code luôn được check lỗi (dù có dùng VSCode hay không :)).

Ta thử commit code lần nữa nhé:
```
git add .
git commit -m "demo error message"
```
Và ta thấy kết quả như sau:

![](https://images.viblo.asia/ae868298-bd63-427f-b9bc-435143c5d1b2.png)

Lint-staged báo lỗi, và commit của chúng ta không thành công.

Giờ ta xoá dòng code bị lỗi ở file `app.controller.ts` đi, sau đó tiến hành commit lại:
```
git add .
git commit -m "fix unused var"
```
Và ta lại thấy mọi thứ ô xờ kê :sunglasses::sunglasses:

Qua đây ta thấy được bằng việc tận dụng Husky và Lint-staged và sẽ đảm bảo được code của chúng ta khi commit lên repository luôn được check lỗi và format theo chuẩn dù các member trong team có dev ở các điều kiện khác nhau

Câu hỏi ở đây là: Vậy nếu ta dùng PHP, Python,... có được hay không?

Vì nếu các bạn để ý Eslint chỉ dành cho Javascript, Prettier thì có hỗ trợ đã ngôn ngữ. Vậy nếu dùng PHP hay Python thì sao?

Trong trường hợp đó các bạn chỉ cần thay thế Eslint bằng 1 linter tương ứng với ngôn ngữ bạn đang dùng, theo mình biết PHP hay Python cũng đều có, các ngôn ngữ khác cũng có luôn. Husky và Lint-staged tách biệt hoàn toàn với Eslint hay Prettier và vẫn hoạt động bình thường nhé ;)

# Commit theo chuẩn với CommitLint
Ở trên ta đã có code theo chuẩn, format sạch đẹp rồi ấy thế mà giờ commit lại nát nữa thì đầu voi đuôi chuột :rofl::rofl:. Kiểu lúc commit bí quá:
```
git commit -m "update something"
```
Ủa `something` ở đây là cái gì????

Thì đó mở log lên thấy file nào đổi thì là `something` đó :rofl::rofl:

Thế rồi team lại có 10 người, và ta có 10 commit:
```
git commit -m "update something 1"

git commit -m "update something 2"
...
git commit -m "update something 10"
```
Sau đó Leader review code kiểu: :flushed::flushed::flushed::flushed::flushed::flushed:

Và đây là lúc [CommitLint](https://github.com/conventional-changelog/commitlint) xuất hiện, ông "kẹ" canh gác cánh cổng cuối cùng trước khi code thực sự được commit lên repository :japanese_goblin::japanese_goblin:

Bằng việc dùng CommitLint ta sẽ đảm bảo được tất cả các commit đều phải có nội dung theo chuẩn. Ta cùng bắt đầu để xem nó hoạt động ra sao nhé.

Đầu tiên ta cài CommitLint:
```bash
npm install --save-dev @commitlint/{config-conventional,cli}
```
Ở trên ta vừa cài CommitLint ta cài luôn cả `config-conventional` đây là cấu hình commit dựa theo [chuẩn commit của Angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines), mình thấy chuẩn này khá ổn và rất nhiều repository nổi trên Github họ đều dùng chuẩn này.

Tiếp theo ta setup Husky để nó bắt được event và lấy ra commit message nhé, các bạn chạy command sau:
```bash
npx husky add .husky/commit-msg ""
```
Sau đó mở file `.husky/commit-msg` và sửa lại nội dung như sau:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```
Ở trên ta lấy ra commit message của cái commit gần nhất (tính tới thời điểm ta vừa gõ xong `git commit` nếu có)

Tiếp đó ở root project ta tạo file `.commitlintrc.js` với nội dung như sau:
```js
module.exports = {extends: ['@commitlint/config-conventional']};
```

Giờ đây ta thử commit lại xem thế nào nhé:
```
git add .
git commit -m "this is my commit"
```
Và ta sẽ thấy lỗi in ra như sau:

![](https://images.viblo.asia/d4f0d0ab-a843-4e0c-acc5-1200501aed30.png)

Ở trên ta thấy CommitLint báo 2 lỗi đó là `subject` và `type` không được để trống.

Giờ đây ta cùng xem 1 commit theo chuẩn của Angular như nào nhé.

Theo chuẩn Angular (chuẩn mà ta sử dụng ở bài này), 1 commit message sẽ theo cấu trúc như sau:
```
type(scope?): subject
```

`type` ở trên có thể là:
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Gitlab CI, Circle, BrowserStack, SauceLabs)
- chore: add something without touching production code (Eg: update npm dependencies)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- revert: Reverts a previous commit
- style: Changes that do not affect the meaning of the code (Eg: adding white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

`scope` thì là optional, và nếu có thì nó nên là tên của package mà commit hiện tại làm ảnh hưởng. Mình thấy `scope` thường dùng ở các repository mà chứa nhiều packages dạng `monorepo`, ví dụ [repo của Vue 3](https://github.com/vuejs/vue-next), scope sẽ là tên của 1 package nào đó ở folder `packages`

`subject` là nội dung của commit

Tất cả những thứ trên được setup sẵn theo chuẩn của Angular, nếu các bạn muốn sửa đổi hoặc thêm vào các chuẩn của riêng mình thì ta sẽ thêm ở file `.commitlintrc.js`, các bạn xem hướng dẫn ở repo chính của [CommitLint](https://github.com/conventional-changelog/commitlint#config) nhé.

Giờ ta sẽ thử sửa lại commit của chúng ta theo chuẩn và tiến hành commit xem sao nhé. Các bạn chạy command sau:
```
git commit -m "chore: lint commit message"
```
Tới đây ta thấy rằng ta đã commit thành công :muscle::muscle:

> Ở trên mình để type là `chore` vì ở lần commit này chúng ta chỉ cài `commitlint`, không động gì tới source code

Ngoài ra với các commit mà ta có nhiều sửa đổi hoặc nhiều thứ cần "thổ lộ", ta có thể dùng tới message body để diễn tả càng chi tiết càng tốt nhé:
```
git commit -m "chore: lint commit message" -m "This is message body. In this commit we added CommitLint which lints commit message"
```
Tới đây chúng ta đã hoàn thành setup CommitLint, và từ giờ ta đã đảm bảo được mỗi commit vào repo chung từ bất kì ai cũng sẽ đều phải tuân theo 1 chuẩn chung, dễ dàng thuận tiện cho việc xem lại history, code review,... Mà nom setup cũng đơn giản không khó khăn lắm phải không nào ;)

# Mọi thứ đã thực sự ổn?
Ở trên ta đã tìm hiểu về Eslint, Prettier, các setup Husky và Lint-staged để tự động chạy Eslint và Prettier trước khi commit code để đảm bảo code không lỗi lầm, sạch đẹp.

Cùng với đó ta cũng setup CommitLint để đảm bảo mọi commit đều thực sự "có ý nghĩa" và theo chuẩn :sunglasses::sunglasses:.

Thế nhưng đến đây ta đã có thể gác gối yên giấc ngủ và tin rằng mọi thứ đã chạy theo quỹ đạo hay chưa, liệu rằng có trường hợp nào nữa mà có người nào đó vô tình hay cố ý commit trong khi không chạy Eslint/Prettier, rồi Commit Message thì có nội dung lung tung vớ vẩn được không???? :thinking::thinking:

Nếu để ý ta thấy rằng ta có thể commit trực tiếp từ trang giao diện repository nơi ta lưu source code, và đương nhiên ở trên đó thì làm gì có Husky, Lint-staged hay CommitLint tự biết mà chạy, và nếu không để ý thì code ta vẫn có thể có lỗi, commit vẫn có thể có những cái tên củ chuối xuất hiện. Hoặc trong trường hợp khi có người cố tình commit với option `--no-verify` thì Husky sẽ bỏ qua không chạy, dẫn tới việc cả CommitLint, Lint-staged đều không được chạy:
```
git commit -m "test dummy message" --no-verify
```

Và để giải quyết việc này ta sẽ tận dụng CICD như là bước cuối cùng để kiểm tra lại 1 lần để đảm bảo mọi thứ đều ổn khi khi code được commit vào repository nhé.

Ta tiến hành thôi nào ;)
# Tận dụng Gitlab CI
Ở đây ta sẽ dùng Gitlab CI để chạy CICD, do vậy điều kiện tối thiểu là các bạn cần phải có tài khoản Gitlab nhé.

Đầu tiên ta cần tạo 1 repo với tên `test-productive-code`.

Sau đó ta quay lại project của chúng ta ở local. Vì project này ban đầu các bạn clone từ repo của mình nên giờ ta cần thay thế `origin` để trỏ về repo mới mà ta vừa tạo. Các bạn chạy command sau:
```
git remote rm origin
git remote add origin https://gitlab.com/maitrungduc1410/test-productive-code.git
```
Bên trên các bạn nhớ đổi tên username về thành của các bạn nhé.

Sau đó ta tiến hành push code lên:
```
git push -u origin master
```
Sau khi push code, quay trở lại repo trên Gitlab, F5 để kiểm tra code của ta đã lên tới repo:

![](https://images.viblo.asia/d089da99-224a-4537-993b-9e35fdb314ac.png)

Giờ ta quay trở lại local, ở root project, ta tạo file `.gitlab-ci.yml`. 

Cho bạn nào chưa biết, file này là file cấu hình CICD với Gitlab, khi ta commit, Gitlab sẽ tự động đọc nếu thấy có file này thì sẽ tiến hành chạy CICD pipeline, các bạn có thể xem lại bài [nhập môn CICD với Gitlab](https://viblo.asia/p/nhap-mon-cicd-voi-gitlab-07LKX9WPZV4) của mình nhé.

Ở trong file `.gitlab-ci.yml` các bạn để nội dung như sau:
```yml
# do not use "latest" here, if you want this to work in the future
image: node:12.18-alpine

services:
  - docker:19.03.13-dind

# global cache (apply for all jobs in all stages)
cache:
  key: ${CI_COMMIT_REF_SLUG} # only apply for current branch
  paths:
  - node_modules/

stages:
  - install
  - linting

# install npm dependencies so it'll be cache in subsequent jobs
# note: we can't do this in linting stage as in that stage, 2 jobs run concurrently and both need node_modules
install_dependencies:
  stage: install
  script:
    - npm install

# this job make sure commit message is conventional
lint-commit-msg:
  stage: linting
  script:
    - echo "$CI_COMMIT_MESSAGE" | npx commitlint

# this job make sure code is linted
lint-code:
  stage: linting
  script:
    - npm run lint
```
Ta cùng xem CICD pipeline của chúng ta có gì nhé:
- Đầu tiên ta có image `node:12.18-alpine`, đây là môi trường mà code của chúng ta sẽ được chạy, trong đó có cài sẵn NodeJS phiên bản 12.18 trên bản phân phối Alpine Linux
- Tiếp theo ta có `service: docker:dind`, như mình đã giải thích ở bài [Nhập môn CICD](https://viblo.asia/p/nhap-mon-cicd-voi-gitlab-07LKX9WPZV4#_bat-dau-voi-gitlab-cicd-4), vì Gitlab Runner sẽ tạo môi trường Docker, trong môi trường đó có 1 môi trường nữa của image `node:12.18-alpine` và job của chúng ta thực hiện ở đây, do vậy ta mới cần tới `docker:dind` (dind = Docker-in-Docker)
- Tiếp theo ta có cache lại folder `node_modules`, lý do bởi vì ta sẽ có 2 job 1 job  chạy CommitLint, job còn lại để chạy Eslint, và 2 job này đều cần chạy `npm install`, và vì chạy `npm install` sẽ lâu do vậy ta sẽ tạo ra 1 job "nhỏ" tên là `install_dependencies` cho chạy trước, được folder `node_modules` ta cache lại để 2 job phía sau sử dụng luôn và chạy cho nhanh
- Nội dung của 2 job `lint-commit-msg` và `lint-code` là gì thì tự code đã nói lên tất cả, các bạn tự xem nhé ;)

Và bây giờ ta sẽ tiến hành commit và push code lên xem thế nào nhé:
```
git add .
git commit -m "ci: add CICD pipeline"
git push origin master
```
Sau đó ta quay trở lại repo trên Gitlab, F5 sẽ thấy như sau (chú ý ô màu đỏ):

![](https://images.viblo.asia/4f489c16-bfd6-4953-bf4f-ae0ddbde2904.png)

Vậy là pipeline của ta đã bắt đầu, click vào xem ta sẽ thấy có các job như sau:

![](https://images.viblo.asia/ffb7f24f-adde-48f2-b6d9-5316ecd395e7.png)

Các bạn có thể click vào từng job để xem log in ra realtime trong quá trình chạy.

Sau đó ta chờ tầm vài phút, sau đó quay trở lại F5 thấy toàn tích xanh :white_check_mark: là ngon nghẻ rồi nhé :D:

![](https://images.viblo.asia/4cbe4515-5723-4613-8bc0-c0ce4439ac44.png)


Và giờ ta sẽ thử tạo thử 1 commit trực tiếp từ trang giao diện của Gitlab ở đó ta sửa nội dung 1 file bất kì để có lỗi xảy ra với Eslint cùng với đó ta để commit message lung tung xem thế nào nhé.

Ở giao diện repo trên Gitlab, các bạn mở file `app.controller.ts` và click vào `Edit`:

![](https://images.viblo.asia/4ba59007-7167-4122-b4fe-218e3e1e6ead.png)

Sau đó ta sửa lại 1 chút như sau (ở dòng mình comment nhé):

![](https://images.viblo.asia/a474a72f-25d1-45a4-9beb-776044d29969.png)

Ở trên ta thấy rằng ta thêm vào biến `a` mà không hề sử dụng nó, và như ban đầu ta có thêm 1 rule ở Eslint là sẽ báo lỗi đỏ :no_entry_sign: và khi chạy `npm run lint` sẽ fail nếu có biến nào được khai báo mà không sử dụng.

Ở bên dưới phần commit message các bạn nhập vào 1 đoạn text linh tinh và bấm `Commit changes`:

![](https://images.viblo.asia/3eaa6ebc-83b7-4c72-8c28-0429a27ad952.png)

Sau đó quay trở lại trang chính của repo ta sẽ thấy pipeline đã bắt đầu chạy:

![](https://images.viblo.asia/07eb967a-1481-489f-b709-8ff8ca7c18af.png)

Ta tiếp tục chờ tầm vài phút và sẽ thấy kết quả như sau:

![](https://images.viblo.asia/640109ea-d106-46c6-9922-38c4ae4189b4.png)


Đúng như điều ta mong muốn, Eslint đã fail khi check code, CommitLint đã fail khi check commit message :sunglasses::sunglasses:
 
Vậy là với 1 vài setup đơn giản ta đã có Gitlab CI để chạy lại lần cuối những kiểm tra khi code commit vào repo chính. 

Mặc dù dùng cách này không thể ngăn chặn code bị commit vào repo, vì CICD được chạy **sau khi code được commit**, nhưng ta có thể biết ngay được khi CICD pipeline báo fail để từ đó ta review lại những đoạn có lỗi (Gitlab sẽ gửi mail về mail của các bạn mỗi khi chạy pipeline fail)
# Lời khuyên từ tận con tim
Ở bài này chúng ta đã cùng nhau tìm hiểu các công cụ rất hữu hiệu để đảm bảo code luôn sạch đẹp, tránh các lỗi tiềm tàng, luôn theo chuẩn nhất định do ta định nghĩa, cùng với đó là áp dụng CommitLint để "ép" tất cả commit cũng phải theo chuẩn, giúp ích cho quá trình code review, check history hoặc generate CHANGELOG sau này.

Việc đưa project vào chuẩn mình thấy rất cần thiết để đảm bảo code của mọi người trong team đều "là người trên một hành tinh" :rofl::rofl:. Và project càng nhiều người thì điều này càng cần phải được làm và làm chặt chẽ để tránh việc sau một thời gian ta có 1 mớ hổ lốn với 1 project có đủ "50 sắc thái" ;).

Việc áp dụng những chuẩn khi viết code, viết commit cũng tự động tạo cho chúng ta thói quen suy nghĩ khi viết commit message, rèn cách viết code sạch đẹp, phát hiện và fix lỗi ngay trong quá trình code. Từ đó hiệu quả, năng suất được cải thiện mỗi ngày :rocket::rocket:

Cám ơn các bạn đã theo dõi, nếu có thắc mắc các bạn để lại comment bên dưới nhé. Hẹn gặp lại các bạn vào những bài sau ^^

# Bonus
> Update 24/05/2022

Bên dưới là list VSCode Extensions của mình, mình dùng đám này lâu lắm rồi và đủ cho mình chinh chiến mọi mặt trận: React, Angular, Vue, SCSS, Docker, Kubernetes,...

![](https://images.viblo.asia/6691a84c-4f6c-4588-aa01-407b3490aad4.png)