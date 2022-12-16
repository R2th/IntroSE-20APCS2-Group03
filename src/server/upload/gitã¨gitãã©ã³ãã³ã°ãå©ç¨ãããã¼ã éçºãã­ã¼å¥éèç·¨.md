## チーム開発フロー

### はじめに

プログラミングを始めたばかりで、Gitの使い方にそこまで慣れていないメンバーで構成されたチーム開発を想定しています。<br />
したがって、masterブランチから機能ごとにブランチを切って開発をしていくといった開発フローの紹介となります。

### 開発ブランチの作成と移動

masterブランチから開発ブランチを切り、その開発ブランチに移動する。
 ```
     やり方A（master上で）
         git checkout -b ブランチ名
             例）git checkout -b edit-readme
             
     やり方B
         git branch ブランチ名
             例）git branch edit-readme
         git checkout ブランチ名
             例）git checkout edit-readme
```

### 開発ブランチ上で開発

作成した開発ブランチで開発を行う

### ステージングエリアに変更を追加

開発ブランチで編集した内容をステージングエリアに加える<br />
```
    やり方A（一括追加）
        git add -A / git add .
        
    やり方B（追加ファイルの個別指定）
        git add ファイルA　ファイルB　ファイルC・・・
```

### ローカルリポジトリに変更をコミット

ステージングエリアに加えた内容をローカルリポジトリにコミットする
```
    git commit -m "コミットメッセージ"
        例）git commit -m "Edit readme for test"
```

### リモートリポジトリに変更をプッシュ

ローカルリポジトリにコミットした内容をリモートリポジトリにプッシュする。<br />
Rails Tutorialでは、ローカルで開発ブランチをmasterブランチにマージしてからプッシュしていたが、<br />
ここでは開発ブランチをプッシュし、Github上でレビュアーの了承後にmasterブランチにマージする。
```
    git push origin ブランチ名
        例）git push origin edit-readme
```

### Github上でプルリクエスト

開発者はGithubを開いて、自分のブランチに対してcompare & pull requestをクリックして、プルリクエストをする。<br />
プルリクエスト画面の右サイドバーで、reviewerの欄にレビュアーの名前を登録すると良い。

### レビュアーによるプルリクエストのレビュー

通知を受けたレビュアーはそのプルリクエストをレビューする。<br />
問題なしの場合は、プルリクエストページ上でapproveをする。（labelに自分の名前のラベルを追加すると良い）<br />
問題ありの場合は、プルリクエストページ上でcomment / request changesをして、開発者に知らせる。<br />
```
    ブランチを移動する前に、自分の開発ブランチで作業をしているか否か
        Yes => この状態で動作確認をすると現状の作業内容が消える可能性があるので、下記のプロセスを先に行う
            1. 作業内容の保存（自分の開発ブランチ上）
                git stash save
                
            2. 下記の動作確認プロセスへ
            
            3. 自分の作業内容を復元する（レビュー後に、自分の開発ブランチ上）
                git checkout 自分の開発ブランチ名
                git stash apply
                
         No  => 下記の動作確認プロセスへ
```
```
    動作確認プロセス
        レビュアーは確認したいブランチを自分のパソコンに反映させて、動作確認をします。
            1. masterブランチを最新に更新（masterブランチ上）
                    git checkout master
                    git fetch
                    git reset --hard origin master
                    
            2. レビューするブランチ上に移動し、サーバーを起動させて、動作確認をする
                    git checkout レビューするブランチ名
                    rails server
                    動作確認
                    
            3. masterに戻り、Github上でレビュー結果を更新する
                    git checkout master
```

### Github上で開発ブランチをmasterにマージ

全レビュアーがそのプルリクエストを承認したら、Github上でmergeする