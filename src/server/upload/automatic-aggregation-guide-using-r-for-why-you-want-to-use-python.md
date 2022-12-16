# Introduction
Python is worth to try in the [Collaboration](https://colab.research.google.com/notebooks/welcome.ipynb?hl=en) in an easy way. In fact, `R` can also be used from Collaboration. Colaboratory already has an R kernel, but it just hides it from the table.

So, I would like to introduce something to make it visible.

* [R Example-Colaboratory](https://colab.research.google.com/github/nozma/colab_kernel_examples/blob/master/R_Example.ipynb)

With this notebook, you can try R right away (see [R and Swift in the Collaboration](https://qiita.com/nozma/items/cbfffb223ef8155d04bf) section for a bit more detail).

Please try it as soon as you have time

# Packages that will be used

Mostly I will use `dplyr`

* [A Grammar of Data Manipulation • dplyr ](https://dplyr.tidyverse.org/)

Like `pandas`, `plyr1` is an `R` package that can handle data much more flexibly and easily (possibly) than `pandas`

`dplyr` is already in `Collaboration`. If you are using `R` instead of  `Colaboratory`, please execute the following function to install the package.

```
install.packages("dplyr")
```
Then let's load it to use the package.
```
library(dplyr)
```
# Data loading
The `.xlsx` files on the web can be read directly using the `rio` package's `import()` function (for local files, it is better to use the `readxl` package).

`rio` is not in `Collaboration`, so it needs to be installed
```
install.packages("rio")
```
Since this function is used only once, so let's use the function without loading the package for now.

```
df <- rio::import("https://pbpython.com/extras/excel-comp-data.xlsx")
```
Double check the head of the data with `head()`.
```
head(df)
```
```
...
##   postal-code    Jan    Feb   Mar
## 1       28752  10000  62000 35000
## 2       38365  95000  45000 35000
## 3       76517  91000 120000 35000
## 4       46021  45000 120000 10000
## 5       49681 162000 120000 35000
## 6       62785 150000 120000 35000
```

I could archive the data without pulling them down

Well, can you do this with `pandas`?
```
import pandas as pd
df = pd.read_excel("https://pbpython.com/extras/excel-comp-data.xlsx")
print(df.head())
```
```
##    account                         name  ...       Feb    Mar
## 0   211829   Kerluke, Koepp and Hilpert  ...     62000  35000
## 1   320563               Walter-Trantow  ...     45000  35000
## 2   648336   Bashirian, Kunde and Price  ...    120000  35000
## 3   109996  D'Amore, Gleichner and Bode  ...    120000  10000
## 4   121213                Bauch-Goldner  ...    120000  35000
## 
## [5 rows x 9 columns]
```
It is actually possible! ! ! 

No extra packages needed, and it's so handy with pandas! ! ! ! !

# Adding summary column

Let's forget it and use the `dplyr` package to add a total column from Jan to Mar.

New columns will be added with `mutate()`.
```
head(mutate(df, total = Jan + Feb + Mar))
```
```
...
##   postal-code    Jan    Feb   Mar  total
## 1       28752  10000  62000 35000 107000
## 2       38365  95000  45000 35000 175000
## 3       76517  91000 120000 35000 246000
## 4       46021  45000 120000 10000 175000
## 5       49681 162000 120000 35000 317000
## 6       62785 150000 120000 35000 305000
```
I am using the pipe operator `%>%` to be more likely in `dplyr` style. This operator does the job of passing the result of the previous processing of the pipe as the first argument of the function after the pipe. So, the above example can be written as:

```
df %>% 
  mutate(total = Jan + Feb + Mar) %>% 
  head()
```
In this way, it is possible to describe the processing on the line basis, which has the advantage that it is very easy to do trial and find error such as adding or deleting process.

Assign it to a variable to use the result again.
```
df2 <- df %>% 
  mutate(total = Jan + Feb + Mar)
  ```
By the way, since R's assignment operator can also assign to the right hand side, it can be written as follows. Assignment to the right side is a place where preferences are divided, but it is useful when assigning to a variable after trial and error using the pipe operator. You don't have to move the cursor back to the beginning of the process, so it has the advantage that makes the code writers feel good. 

```
df %>% 
  mutate(total = Jan + Feb + Mar) %>% 
  head() -> df2
  ```
  You can also use the `magrittr` package's `% <>%` operator to write something more sophisticated if you want to update the original variables.
```
library(magrittr)
df %<>% 
  mutate(total = Jan + Feb + Mar) %>% 
  head()
```
# Adding summary row
Column aggregate values can be obtained with the `summarize()` function.
```
df2 %>% 
  summarise(
    sum = sum(Jan),
    mean = mean(Jan),
    min = min(Jan),
    max = max(Jan),
    )
```

```
##       sum     mean   min    max
## 1 1462000 97466.67 10000 162000
```
More sophisticated writing can be done using `summarise_at`. In this example, `Jan` will not be repeated, so it looks better

```
df2 %>% 
  summarise_at(
    vars(Jan),
    list(~sum, ~mean, ~min, ~max)
  )
```

```
##       sum     mean   min    max
## 1 1462000 97466.67 10000 162000
```

Applying multiple aggregations to multiple columns is also easy. `vars()` has various ways to select multiple columns easily, but if you use `Jan`: `Mar`, for example, you can select 3 columns from `Jan` to `Mar` together.

```
df2 %>% 
  summarise_at(
    vars(Jan:Mar),
    list(~sum, ~mean)
  )
```

```
##   Jan_sum Feb_sum Mar_sum Jan_mean Feb_mean Mar_mean
## 1 1462000 1507000  717000 97466.67 100466.7    47800
```

By the way, you can also make choices like `Jan: Mar` with `pandas`. So useful! (Note that multiple functions can be applied as `.agg`, but `mean`, which is not in built-in functions, must be specified as a string.)

```
print(df.loc[:, "Jan":"Mar"].agg([sum, 'mean']))
```

```
##                Jan           Feb       Mar
## sum   1.462000e+06  1.507000e+06  717000.0
## mean  9.746667e+04  1.004667e+05   47800.0
```

Take care again and return to `R`. If you want the result as a named vector, `unlist()` it.

```
df2 %>% 
  summarise_at(
    vars(Jan:Mar),
    ~sum(.)
  ) %>% unlist()
```
```
##     Jan     Feb     Mar 
## 1462000 1507000  717000
```

Let's calculate the total from `Jan` to `total` and connect it to the original data frame. Use `bind_rows()` for that.

```
df2 %>% 
  summarise_at(
    vars(Jan:total),
    ~sum(.)
  ) -> df_total
df2 %>% 
  bind_rows(df_total) %>%
  tail
```
```
...
##               city       state postal-code     Jan     Feb    Mar   total
## 11        Rosaberg    Tenessee       47743   45000  120000  55000  220000
## 12   Norbertomouth NorthDakota       31415  150000   10000 162000  322000
## 13     East Davian        Iowa       72686  162000  120000  35000  317000
## 14    Goodwinmouth RhodeIsland       31919   55000  120000  35000  210000
## 15 Kathryneborough    Delaware       27933  150000  120000  70000  340000
## 16            <NA>        <NA>          NA 1462000 1507000 717000 3686000
```
Was it good?

I thought it would end here, but it will last a little more.

# Make the data look tidy and cool

By the way, the format of the data treated as an example this time is not good enough.

If you look closely, `Mon` has become the column name. Will it grow sideways if the time pass by gradually? A data format that has such an attribute expanded horizontally is called landscape.

If you keep the data sideways, the table will be compact and you will get a feeling of " being organized". Also, when you fill in data on paper, I think that you will usually fill in a horizontal format, so if you enter in Excel as it is, horizontal data is completed. Well, there is a lot of data in the world that has a lot of status.

However, horizontal data is generally not suitable for mechanical processing. So, what to do is to hold the data vertically. Vertically held data is also referred to as tidy data.

What kind of vertical data is, roughly speaking, is data that has been organized according to the rule that "data of the same attribute is put in the same column".

For example, in the previous example, if you put Jan, Feb, Mar, which were column names, as variables into the column "month", and numerical values into the column "value", they become vertical. As the name implies, it will be longer vertically.

In `R`, this kind of data conversion can be easily done using the `tidyr` package for tidy's name. Horizontally held data can be converted to vertically held by `gather()`.

```
library(tidyr)
df3 <- df %>% 
  gather(key = month, value = value,  Jan:Mar)
df3 %>% head(10)
```
```
...
##    postal-code month  value
## 1        28752   Jan  10000
## 2        38365   Jan  95000
## 3        76517   Jan  91000
## 4        46021   Jan  45000
## 5        49681   Jan 162000
## 6        62785   Jan 150000
## 7        18008   Jan  62000
## 8        53461   Jan 145000
## 9        64415   Jan  70000
## 10       46308   Jan  70000
```
Once data has been vertically held, operations such as data conversion and aggregation using `dplyr` can be described in a very simple, intuitive, and highly readable state.

```
df3 %>% 
  group_by(month) %>% 
  summarise(sum_value = sum(value))
```

```
## # A tibble: 3 x 2
##   month sum_value
##   <chr>     <dbl>
## 1 Feb     1507000
## 2 Jan     1462000
## 3 Mar      717000
```
So what can you do handle with `pandas` like this? I am worried about that.

```
print(df.melt(value_vars=['Feb', 'Mar', 'Jan']).head(10))
```
```
##   variable   value
## 0      Feb   62000
## 1      Feb   45000
## 2      Feb  120000
## 3      Feb  120000
## 4      Feb  120000
## 5      Feb  120000
## 6      Feb  120000
## 7      Feb   95000
## 8      Feb   95000
## 9      Feb  120000
```
It still can handle it! ! ! ! ! ! ! ! ! !

However, when specifying `value_vars`, writing like 'Feb': 'Jan' seemed impossible. This problem likely will happen in  `R`.