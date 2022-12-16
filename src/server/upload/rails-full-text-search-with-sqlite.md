## Getting Start
When it comes to full text search there are many ways that one can achive it, by using SQL **LIKE** query, **Elasticsearch** or **Solr** for example. In this article we will look at another tool that we can achive similar effect and that is by using **FTS** virtual table. I'll walk you through how to setup a virtual table module in SQLite, create a table, indexing our data and finally integrate it with **ActiveRecord**.

## Setting Up
Before we begin make sure you have SQLite with FTS module enabled install on your machine. If you haven't already got one you can do so with the following.

```SH
$ curl -O https://www.sqlite.org/2020/sqlite-autoconf-3310100.tar.gz
$ tar -xzvf sqlite-autoconf-3310100.tar.gz
$ cd sqlite-autoconf-3310100
$ ./configure --enable-fts4
$ make
$ sudo make install
```

Next create a new rails project using SQLite database
```SH
$ rails new demo -T
$ cd demo
$ rake db:create
```

## Create Model
Lets create an anime model that we can use for our demo project. Because an anime can have multiple titles I decided to store them as serializable array. We want to be able to search on both **title** and **titles** so these column will be used as index in our virtual table.

```SH
$ rails g model Anime title:string desc:text titles:text
```
```Ruby
# app/models/anime.rb
class Anime < ApplicationRecord
  serialize :titles, Array
end
```

Next lets setup a virtual table

```SH
$ rails g migration create_fts_animes_table
```
```Ruby
# db/migrate/20200318120308_create_fts_animes_table.rb
class CreateFtsAnimesTable < ActiveRecord::Migration[6.0]
  def up
    execute('CREATE VIRTUAL TABLE fts_animes USING fts4(title, anime_id)')
  end

  def down
    execute('DROP TABLE IF EXISTS fts_animes')
  end
end
```
```Ruby
class FtsAnime < ApplicationRecord
  self.primary_key = :rowid
end
```
```SH
$ rake db:migrate
```

With this will ended up with two tables **animes** and **fts_animes**. **Anime** will be where our actual data live and **FtsAnime** will be use for full text search.

## Create Indexes
Before we can start doing full text search on our data we need to create indexes first. Lets take a look at the following code snippet.

```Ruby
# app/models/anime.rb
class Anime < ApplicationRecord
  # rest of the code

  def self.build_indexes
    values = all.map { |anime| build_index(anime) }
    sql = <<~SQL.strip
      INSERT INTO fts_animes(title, anime_id)
      VALUES #{values.join(',')}
    SQL
    connection.execute(sql)
  end

  private

  def self.build_index(anime)
    titles = anime.titles.map { |title| "(#{connection.quote title}, #{anime.id})" }
    (titles + ["(#{connection.quote anime.title}, #{anime.id})"]).join(',')
  end
end
```

All this code does is copy all data from animes table into fts_animes table. We need each title to be indexed and that of course including alias titles from titles column that's why we also loop on those titles and build sql statement.

## Search Anime
Now on to the actual search implementation. What we want to do is to do full text search using a special **MATCH** query on our virtual table(fts_animes) to get our matched result with order of relevance, take anime_id and use it to find our actual data on animes table.
We can do this in two separate steps, but because virtual table is also work like a regular table we can also do a join query between animes and fts_animes like the following snippet

```Ruby
# app/models/anime.rb
class Anime < ApplicationRecord
  has_many :fts_animes, dependent: :destroy

  scope :search, (text) -> do
    self.distinct.joins(:fts_animes).where('fts_animes.title MATCH ?', text)
  end

  # rest of the code
end
```

With this we are now be able to perform full text search for a certain anime title.

First lets try for anime title that contains the term 'sword'. There are 10 result matched the 9th result doesn't have the term 'sword' in title column, but it was in alias titles so it also match.

```SH
[8] pry(main)> Anime.search('sword').count
   (2.6ms)  SELECT COUNT(DISTINCT "animes"."id") FROM "animes" INNER JOIN "fts_animes" ON "fts_animes"."anime_id" = "animes"."id" WHERE (fts_animes.title MATCH 'sword')
=> 10
[9] pry(main)> Anime.search('sword').pluck(:title, :titles)
   (0.4ms)  SELECT DISTINCT "animes"."title", "animes"."titles" FROM "animes" INNER JOIN "fts_animes" ON "fts_animes"."anime_id" = "animes"."id" WHERE (fts_animes.title MATCH 'sword')
=> [["Sword Art Online", ["ソードアート・オンライン", "Sword Art Online", "Sword Art Online", "Sword Art Online"]],
 ["Sword Art Online: Extra Edition", ["Sword Art Online: Extra Edition", "Sword Art Online: Extra Edition", "Sword Art Online: Extra Edition", "ソードアート・オンライン Extra Edition"]],
 ["Sword Art Online II", ["Sword Art Online II", "Sword Art Online II", "Sword Art Online II", "ソードアート・オンライン II"]],
 ["Momo Kyun Sword", ["Momokyun Sword", "Momo Kyun Sword", "Momokyun Sword", "モモキュンソード"]],
 ["Sword Art Online II: Debriefing", ["Sword Art Online II: Debriefing", "Sword Art Online II: Debriefing", "Sword Art Online II: Debriefing", "ソードアート・オンライン II"]],
 ["Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka Gaiden: Sword Oratoria",
  ["Sword Oratoria: Is it Wrong to Try to Pick Up Girls in a Dungeon? On the Side",
   "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka Gaiden: Sword Oratoria",
   "Sword Oratoria: Is it Wrong to Try to Pick Up Girls in a Dungeon? On the Side",
   "ダンジョンに出会いを求めるのは間違っているだろうか外伝 ソード・オラトリア"]],
 ["Thunderbolt Fantasy: The Sword of Life and Death", ["Thunderbolt Fantasy: The Sword of Life and Death"]],
 ["Sword Art Online Alternative: Gun Gale Online", ["ソードアート・オンライン オルタナティブ ガンゲイル・オンライン", "Sword Art Online Alternative: Gun Gale Online"]],
 ["Ken En Ken: Aoki Kagayaki", ["Xuan Yuan Sword Luminary", "Ken En Ken: Aoki Kagayaki", "軒轅剣・蒼き曜"]],
 ["Sword Art Online: Alicization", ["Sword Art Online: Alicization", "Sword Art Online: Alicization", "ソードアート・オンライン アリシゼーション"]]]
[10] pry(main)>
```

Now lets try for anime title that contains the term 'sword' but only appear at the start. This time only 7 result matched, **Momo Kyun Sword**, **Thunderbolt Fantasy** and **Ken En Ken: Aoki Kagayaki** has the term but it doesn't appear at the beginning so it didn't return.

```SH
[10] pry(main)> Anime.search('^sword').count
   (0.3ms)  SELECT COUNT(DISTINCT "animes"."id") FROM "animes" INNER JOIN "fts_animes" ON "fts_animes"."anime_id" = "animes"."id" WHERE (fts_animes.title MATCH '^sword')
=> 7
[11] pry(main)> Anime.search('^sword').pluck(:title, :titles)
   (0.4ms)  SELECT DISTINCT "animes"."title", "animes"."titles" FROM "animes" INNER JOIN "fts_animes" ON "fts_animes"."anime_id" = "animes"."id" WHERE (fts_animes.title MATCH '^sword')
=> [["Sword Art Online", ["ソードアート・オンライン", "Sword Art Online", "Sword Art Online", "Sword Art Online"]],
 ["Sword Art Online: Extra Edition", ["Sword Art Online: Extra Edition", "Sword Art Online: Extra Edition", "Sword Art Online: Extra Edition", "ソードアート・オンライン Extra Edition"]],
 ["Sword Art Online II", ["Sword Art Online II", "Sword Art Online II", "Sword Art Online II", "ソードアート・オンライン II"]],
 ["Sword Art Online II: Debriefing", ["Sword Art Online II: Debriefing", "Sword Art Online II: Debriefing", "Sword Art Online II: Debriefing", "ソードアート・オンライン II"]],
 ["Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka Gaiden: Sword Oratoria",
  ["Sword Oratoria: Is it Wrong to Try to Pick Up Girls in a Dungeon? On the Side",
   "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka Gaiden: Sword Oratoria",
   "Sword Oratoria: Is it Wrong to Try to Pick Up Girls in a Dungeon? On the Side",
   "ダンジョンに出会いを求めるのは間違っているだろうか外伝 ソード・オラトリア"]],
 ["Sword Art Online Alternative: Gun Gale Online", ["ソードアート・オンライン オルタナティブ ガンゲイル・オンライン", "Sword Art Online Alternative: Gun Gale Online"]],
 ["Sword Art Online: Alicization", ["Sword Art Online: Alicization", "Sword Art Online: Alicization", "ソードアート・オンライン アリシゼーション"]]]
[12] pry(main)>
```

## Conclusion
I hope this article will be useful for you. Although SQLite might not be a good solution for large project, but it is good enough for small project that want to do full text search but don't want to go to extra length to setup a full blown full text search engine.