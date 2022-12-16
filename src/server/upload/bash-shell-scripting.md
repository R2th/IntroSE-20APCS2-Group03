# String
A string variable contains a sequence of text characters. It can include letters, numbers, symbols and punctuation marks. Some examples: abcde, 123, abcde 123, abcde-123, &acbde=%123.

String operators include those that do comparison, sorting, and finding the length. The following table demonstrates the use of some basic string operators:

![](https://images.viblo.asia/5e2b4cbd-5459-44eb-8be7-7e68ad015842.png)

## Parts of a String

At times, you may not need to compare or use an entire string. To extract the first n characters of a string we can specify: `${string:0:n}`. Here, 0 is the offset in the string (i.e., which character to begin from) where the extraction needs to start and n is the number of characters to be extracted.

To extract all characters in a string after a dot (.), use the following expression: `${string#*.}`

![](https://images.viblo.asia/e7f99faa-681a-4341-bce4-37cbfeff7dad.png)

# Structure of the case Statement
![](https://images.viblo.asia/61e7b16e-ade9-4a89-8e11-db35dd4380c5.png)

Here is the basic structure of the case statement:
```

case expression in
   pattern1) execute commands;;
   pattern2) execute commands;;
   pattern3) execute commands;;
   pattern4) execute commands;;
   * )       execute some default commands or nothing ;;
esac
```
# Looping Constructs
![](https://images.viblo.asia/25bb240f-e52c-4bf0-bb6e-6844866d8932.png)

By using looping constructs, you can execute one or more lines of code repetitively, usually on a selection of values of data such as individual files. Usually, you do this until a conditional test returns either true or false, as is required.

Three type of loops are often used in most programming languages:
```

for
while
until
```
All these loops are easily used for repeating a set of statements until the exit condition is true.

## The 'for' Loop
![](https://images.viblo.asia/d07cb7c2-d4b4-49b4-b4d6-6c8ecb5dc165.png)
The for loop operates on each element of a list of items. The syntax for the for loop is:

```
for variable-name in list
do
    execute one iteration for each item in the list until the list is finished
done
```

In this case, variable-name and list are substituted by you as appropriate (see examples). As with other looping constructs, the statements that are repeated should be enclosed by do and done.

The screenshots here show an example of the for loop to print the sum of numbers 1 to 10.

## The 'while' Loop
![](https://images.viblo.asia/47d69661-93d2-49d4-9799-2801fc92f989.png)

The while loop repeats a set of statements as long as the control command returns true. The syntax is:
```

while condition is true
do
    Commands for execution
    ----
done
```

The set of commands that need to be repeated should be enclosed between do and done. You can use any command or operator as the condition.  Often, it is enclosed within square brackets ([]).

## The 'until' loop
![](https://images.viblo.asia/f8d6b4be-97f4-4964-981f-8423af5a3df6.png)

The until loop repeats a set of statements as long as the control command is false. Thus, it is essentially the opposite of the while loop. The syntax is:
```

until condition is false
do
    Commands for execution
    ----
done
```

## Redirecting Errors to File and Screen
In UNIX/Linux, all programs that run are given three open file streams when they are started as listed in the table: 

![](https://images.viblo.asia/ffedfdbb-7676-425b-8c34-16ac82c2a227.png)

Using redirection, we can save the stdout and stderr output streams to one file or two separate files for later analysis after a program or command is executed.

# Creating Temporary Files and Directories
Consider a situation where you want to retrieve 100 records from a file with 10,000 records. You will need a place to store the extracted information, perhaps in a temporary file, while you do further processing on it.

Temporary files (and directories) are meant to store data for a short time. Usually, one arranges it so that these files disappear when the program using them terminates. While you can also use touch to create a temporary file, this may make it easy for hackers to gain access to your data.

The best practice is to create random and unpredictable filenames for temporary storage. One way to do this is with the mktemp utility, as in the following examples.

The XXXXXXXX is replaced by the mktemp utility with random characters to ensure the name of the temporary file cannot be easily predicted and is only known within your program.

![](https://images.viblo.asia/72b6c544-b917-4455-8ded-c05f623d1a03.png)