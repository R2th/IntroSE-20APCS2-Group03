## Tại sao lại là conventional commits?
- Thống nhất được conversion của các member trong team.
- Generate được change log chuyên nghiệp như các package.
- Người review PR dễ hiểu hơn, biết được làm feature gì, fix bug gì.
- Dễ revert, fix bug hơn.

## Conventional commits?
Nó quy định một bộ các quy tắc của message khi commit. Để hiểu rõ hơn các định nghĩa bạn có thể đọc thêm tại [đây](https://www.conventionalcommits.org/en/v1.0.0/#summary).

### Mỗi commit message dùng strucrure như sau
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

1. fix: commit có type là fix để fix một bug trong dự án
2. feat: commit có type là feat để nói về một feature mới trong dự án
3. Các type khác chúng ta có thể tham khảo [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (Được base trên [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) build:, chore:, ci:, docs:, style:, refactor:, perf:, test:).

### Examples
#### Commit message with description and breaking change footer
```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files

```

#### Commit message with ! to draw attention to breaking change
```
refactor!: drop support for Node 6
```

#### Commit message with both ! and BREAKING CHANGE footer
```
refactor!: drop support for Node 6

BREAKING CHANGE: refactor to use JavaScript features not available in Node 6.
```

#### Commit message with no body

```
docs: correct spelling of CHANGELOG
```

#### Commit message with scope
```
feat(lang): add polish language
```

#### Commit message with multi-paragraph body and multiple footers
```
fix: correct minor typos in code

see the issue for details

on typos fixed.

Reviewed-by: Z
Refs #133
```

## Hook
Để config hook mỗi khi có một commit mới, nó sẽ tự động check theo conventional commits ở trên chúng ta cần các bước sau.

### Install npm package
Chúng ta sẽ sử dụng package **yorkie**
```bash
yarn add --dev yorkie
```

### Create NodeJs script
Chúng ta cần một đoạn code để check commit message. Ví dụ dưới đây mình dùng sẵn script được viết trong các package của vue

> scripts/verifyCommit.js
```js
// Invoked on the commit-msg git hook by yorkie.

const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`
    )}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${chalk.green(
        `fix(view): handle keep-alive with aborted navigations`
      )}\n` +
      `    ${chalk.green(
        `fix(view): handle keep-alive with aborted navigations (close #28)`
      )}\n\n` +
      chalk.red(`  See .github/commit-convention.md for more details.\n`)
  )
  process.exit(1)
}
```
Example: https://github.com/FrontLabsOfficial/vue-i18n-lite/blob/master/scripts/verifyCommit.js

### Config hook trong file package.json
Config gitHooks nó sẽ verify message theo đoạn script chúng ta đã viết bên trên.

```
{
  "name": "vue-i18n-lite",
  "version": "1.0.1",
  "devDependencies": {
    "yorkie": "^2.0.0"
  },
  "gitHooks": {
    "commit-msg": "node scripts/verifyCommit.js"
  }
}
```

Example: https://github.com/FrontLabsOfficial/vue-i18n-lite/blob/master/package.json

## Change log
Hầu hết các phần mềm khi release version sẽ đều có change log. Chúng được fix bug gì, thêm feature gì... Từ đó người dùng có thể dễ dàng theo dõi được sự thay đổi của mỗi version.
Chúng ta hoàn toàn có thể sử dụng commit messages để tạo change log cho version đấy dễ dàng.

### Install npm package
```bash
yarn add --dev conventional-changelog-cli
```


### Thêm script trong package.json
```
{
  "name": "vue-i18n-lite",
  "version": "1.0.1",
  "devDependencies": {
    "yorkie": "^2.0.0",
    "conventional-changelog-cli": "^2.1.1"
  },
  "scripts": {
      "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 1"
  },
  "gitHooks": {
    "commit-msg": "node scripts/verifyCommit.js"
  }
}
```

Example: https://github.com/FrontLabsOfficial/vue-i18n-lite/blob/master/package.json

### Generate change log
```bash
yarn changelog
```

Example: https://github.com/FrontLabsOfficial/vue-i18n-lite/blob/master/CHANGELOG.md


## Tạm kết
Từ các khái niệm và ví dụ ở trên. Các bạn có thể thấy được lợi ích của việc commit message đúng chuẩn. Nhất là khi chúng ta open source một dự án nào đó. Hi vọng có chia sẻ thêm với anh em về quy trình release một package vào một dịp khác.