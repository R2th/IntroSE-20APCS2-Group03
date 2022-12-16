Trước đây để chứa code các project cá nhân mình thường sử dụng gitlab, sau đó bitbucket vì có free các private project, nhưng từ khi github được Microsoft mua lại và free private projects, sau một thời gian lỗi liên tục sau khi free  thì giờ github khá ok nên mình đã chuyển dần các private project sang github. Và một trong các nhu cầu khi sử dụng git, đương nhiên rồi đó chính là CI-CD. Khi làm công ty thì hầu hết CI-CD đã được devops và system team setup hết và thường thì những công ty mình đã làm việc cũng sử dụng gitlab hoặc jenkins. Chỉ cần tập trung code, đẩy lên mọi step CI-CD đã được setup sẵn. Gần đây có 1 vài project cá nhân khá lười khi build tay rồi đẩy lên server nên đã muốn setup CI-CD để thuận tiện cho việc deploy và testing, nhu cầu cũng khá cơ bản đẩy code lên, build java cho server và reactjs cho client sau đó copy file build vào VPS đã setup sẵn môi trường. Nhu cầu đơn giản nên steps cũng khá đơn giản. Cùng điểm qua một vài step chính nhé:

Đầu tiên là phần client reactjs

```yaml
name: Continuous Deployment

on:
  push:
    branches:
      - master

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest

    env:
      SOURCE_DIR: "build/"

    steps:
      - uses: actions/checkout@v1

      - name: Install dependencies
        run: yarn

      - name: Build
        run: yarn build

      - name: Deploy production
        if: github.ref == 'refs/heads/master'
        uses: garygrossgarten/github-action-scp@release
        with:
          local: build
          remote: ${{ secrets.HOME_PATH }}
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.PASSWORD }}
```

Config trong file yml cũng không có gì phức tạp, ở đây tại step cuối mình sử dụng action garygrossgarten/github-action-scp để copy file build vào vps, những thông tin nhạy cảm mình sử dụng env trong github project secrets, bạn có thể định nghĩa tại đường dẫn 
/settings/secrets

Tương tự với phần server của java
```yaml
name: Java CI with Maven

on:
  push:
    branches:
      - master

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 1.11
        uses: actions/setup-java@v1
        with:
          java-version: 1.11

      - name: Cache Maven packages
        uses: actions/cache@v2
        with:
          path: ~/.m2
          key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
          restore-keys: ${{ runner.os }}-m2

      - name: Prepare applications properties jwt secret
        uses: jacobtomlinson/gha-find-replace@master
        with:
          find: "mySecret"
          replace: ${{ secrets.PROD_JWT_SECRET }}
          include: "application.properties"

      - name: Build with Maven
        run: mvn -B package --file pom.xml

      - name: copy file
        uses: canastro/copy-file-action@master
        with:
          source: "target/liftu-0.0.1-SNAPSHOT.war"
          target: "target/liftu.war"

      - name: Deploy production
        if: github.ref == 'refs/heads/master'
        uses: garygrossgarten/github-action-scp@release
        with:
          local: target/liftu.war
          remote: ${{ secrets.HOME_PATH }}/liftu.war
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.PASSWORD }}
```

Action jacobtomlinson/gha-find-replace dùng để replace một cụm từ với giá trị truyền vào ở trong file chỉ định.
Step thì đơn giản nhưng kết quả thì rất xịn sò, tiết kiệm thời gian deploy và testing rất nhiều :D
![](https://images.viblo.asia/f268caa8-db13-4d09-95ee-9e0ac883eaa7.PNG)