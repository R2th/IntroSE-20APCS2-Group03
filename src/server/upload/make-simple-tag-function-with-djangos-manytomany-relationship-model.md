# Introduction
Today i will be talking about how to create a simple tag function using Django's ManyToMany relationship model.

# Environment
* Ubuntu 16.04 LTS
* Django 2.1
* Python 3.6

# Things will be created
We will be creating a function that can creating tags for sorting genres for all of our articles - which is being very popular in programming today. In which we can add-delete tags for a certain article, and also create a model that can execute searching for articles that have been bounded to a specific tag

# Model
The model created this time is `Tag` which simply defines the tag and `Article` which defines the article.

I will use `ManyToManyFiled` to bound the article to the tag. By doing this, an intermediate table linking the many-to-many relationship between Tag-Article is automatically generated on Django side.

* models.py

```
from django.db import models

# tag
class Tag(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name

# article
class Article(models.Model):
    title = models.CharField(max_length=128)
    tags  = models.ManyToManyField(Tag)

    def __str__(self):
        return self.title
```

# How to use
## From creating instances to Tag adding

```
# Create Tags
t1 = Tag.objects.create(name="Django")
t2 = Tag.objects.create(name="Python")

# Create Article
a = Article.objects.create(title="Create tag function by Django")

# Add tag to articles
a.tags.add(t1)
a.tags.add(t2)

# Update
a.save()
```

## Handle the Article as a starting point
An operation starting from Article that sets `ManyToManyField` to be able to perform operations using various methods such as `all`, `add`, and `remove` of the attribute of the variable itself.

## Obtaining the tag attached to the article
To check the tag attached to the Article instance, you can get it with the `all` method.

```
a = Article.objects.get(name="Create tag function by Django")

tag_list = a.tags.all()
```

## Add tag to article

Adding tags can be done with the `add` method.

```
a = Article.objects.get(name="Create tag function by Django")
t = Tag.objects.get(name="Django")

a.tags.add(t)
```

## Set (Replace) tags of the articles 

Tag settings can also be changed at once by the `set` method.

Note: It is not adding the shortage, it is replacing everything, so be careful.

```
t1 = Tag.objects.get(name="Django")
t2 = Tag.objects.get(name="Python")
a = Article.objects.get(name="Create tag function by Django")

a.tags.set([t1, t2])
```

## Delete specific tag from article
If you want to delete the associated tag, you can delete it by specifying the instance of the tag you want to delete with the `remove` method.

Note: This only deletes the relation between the Article `Article` and the tag `Tag`, and the tag `Tag` itself is not deleted.
```
a = Article.objects.get(name="Create tag function by Django")
t = Tag.objects.get(name="Django")

a.tags.remove(t)
```

## Delete all tags from articles

Using the `clear` method, it is also possible to delete the associated tags at once.

Note: This also deletes only the relation between the Article `Article` and the tag `Tag`, and the tag `Tag` itself is not deleted
```
a = Article.objects.get(name="Create tag function by Django")

a.tags.clear()
```

## Search and acquire articles tagged with specific tags
When searching for an article tagged with a specific tag, you can search by specifying an instance of `Tag` as a condition with the filter method like a normal refinement.

```
t = Tag.objects.get(name="Django")

article_list = Article.objects.filter(tags=t)
```
In addition to searching with instances of tags, it is also possible to search using the attributes of tag Tag as follows.

```
# Tag's name gets all the articles tagged with Django
article_list = Article.objects.filter(tags__name="Django")
```

## Handle the tag as a starting point
You can also operate on the tag side that did not set ManyToManyField in the form of reverse reference.
Since the attribute named `_set` is automatically added to the opposite side, use this to handle

## Retrieving articles with specific tags
From the tag, it is possible to retrieve all the articles with the corresponding tag attached by the all method of model name `_set`.

```
t = Tag.objects.get(name="Django")

article_list = t.article_set.all()
```
## Attach a specific tag to a specific article
If we are tagging articles, tags can be added with the `add` method.
```
a = Article.objects.get(name="Create tag function by Django")
t = Tag.objects.get(name="Django")

t.article_set.add(a)
```

## Remove specific tags from specific articles
We can remove tags with remove method.
```
a = Article.objects.get(name="Create tag function by Django")
t = Tag.objects.get(name="Django")

t.article_set.remove(a)
```

## Delete specific tags from all articles
At a certain time, it is possible to delete from all the articles attached with the tag with the `clear` method.

Regarding this operation, it seems that it is simpler to go to the origin of the tag rather than to manipulate from the article.

```
t = Tag.objects.get(name="Django")

t.article_set.clear()
```
## Note: Notes on using ManyToManyField
In order to use `ManyToManyField` to realize a many-to-many relationship, both instances to be linked need to have a primary key.

In Django's model, you do not need to explicitly set the primary key. But by default a variable that will become the primary key of id is added. This is done by either creating an instance with the create method or calling the save method to the DB for the first time 

Attention is necessary because values are confirmed / generated when saved.

If adding an element using the add method while the primary key is not finalized will result in an error.

* Error example

```
>>> a = Article(title="Create tag function by Django")
>>> a.tags.add(t1)
ValueError: "<Article: Create tag function by Django>" needs to have a value for field "id" before this many-to-many relationship can be used.
```

If you create it by `create` or `save` it to DB before setting it to ManyToManyField, it will not cause an error, but it will temporarily be saved in the DB halfway 

Therefore, if you do not want to save it to the DB until it is completed completely, you need to use the function of transaction control.

* Transaction implementation example
```
from django.db import transaction

with transaction.atomic():
    a = Article(title="Create tag function by Django")
    a.save() # Here the DB is not changed

    t = Tag.objects.get(name="Django")
    a.tags.add(t)
    a.save() # Here the DB is not changed

# Changes are committed to the DB when you exit the block
```