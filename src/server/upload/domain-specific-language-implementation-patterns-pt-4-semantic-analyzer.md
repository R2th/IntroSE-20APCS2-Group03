## **4. Semantic Analyzer**
Lexers and parsers can only build a representation of some input text. They give accurate statistics like “how many statements are there inside this block of code?”, “what is the return type of this function?”, etc. They don‟t give any additional information on what is the meaning of particular input phrase and whether it is semantically correct, i.e. whether it makes sense. Because of this, lexers are parsers are called lexical analyzers and syntactic analyzers respectively. In order to make sense of the input text, a third kind of analyzers is used, called semantic analyzer. A semantic analyzer explores an IR constructed by a parser and apply and enforce semantic rules on that IR. Semantic rules are not part of a grammar, they are spoken constraints that enforce the correctness of the IR and / or build new metadata based on the IR, such as symbol table. Inside the language application pipeline, the construction of symbol tables is one of the semantic analyzers.

Given the example below:
```java
int x;
x = 2.2;
```

Here x is first declared to be a variable, and then it is assigned. Both statements are correct in terms of their syntax. However, the data type of x is integer, so it cannot be assigned to a floating-point value. This incorrectness in meaning are not detected by lexers or parsers and should be handled using a dedicated semantic analyzer.

In order to analyze an IR, a semantic analyzer first needs a way to traverse that IR. Additionally, some language applications also need to rewrite IRs. In doing so, they are able to optimize, fix issues or perform certain actions before generation. Applications that do this are plenty, bug finders, source optimizers, code formatters all need to rewrite IRs. Because traversing and rewriting IRs have many applications, tree walker is a big part in implementing a programming language. In real implementation, tree walking is just a way to access nodes of an AST. This can be done either internally or externally. Internal tree walkers, or Embedded Tree Walkers, embed all walking procedures into the nodes themselves.

```java
// Embedded_tree_walker
class AdditionExpression // represents an arithmetic addition
operation
{
    ExpressionNode leftOperand;
    ExpressionNode rightOperand;
    public AdditionNode(ExpressionNode leftOperand, Token
        addOperator, ExpressionNode rightOperand) {
      super(addOperator);
      this.leftOperand = leftOperand;
      this.rightOperand = rightOperand;
    }
    
    public void walk() {
        // pre-order walking code
        leftOperand.walk();
        
        // in-order walking code
        rightOperand.walk();
        
        // post-order walking code
    }
}
```

The code for walking is actually just a method inside the class AdditionExpression. Here the walking code can be placed in three orders: pre-order, in-order, post-order. From this piece of code, it is clear that at very node, there are three opportunities a walker can perform an action upon a node. These actions vary on the purpose of the application. For a simple translator, the actions can simply be printing out the token. A simple expression such as 1 + 2 can be printed out using an in-order action, that is, the root node + is printed in between the two child nodes 1 and 2. Tree walkers are also used to construct many metadata table, such as symbol tables. In particular, a tree walker needs to visit almost every branch and node inside a tree in order to construct a comprehensive symbol table. Inside the semantic context of the input text, a symbol is a unique identifier for an entity such as a variable, class, or method. A symbol table is a data structure for storing and retrieving symbols located throughout the source code. Looking at this sample

```java
class Foo {
    Foo func() { ... }
    int x;
}
```

There are three recognizable symbols: “Foo”, “func”, and “x”. However, along with the name, the category of the symbol also need to be stored. Whether a symbol is a class, a variable, or a method matters and determines the correctness of many operations. Using languages like Java to implement the application, it is easy to define what a symbol is with class.

```java
public class Symbol {
    public String name; // the text of the symbol
    public TokenType tokenType; // type of the token for this symbol
}
```

Using the features of object-orientation, one could go further and implement symbol in a different way:
```java
public class Symbol {
    public String name;
}

public class VariableSymbol extends Symbol {
    public Type type;
}

public class TypeSymbol extends Symbol {
    public Type type;
}

public class OperatorSymbol extends Symbol {
    public Type leftType;
    public Type rightType;
    public Type returnType;
}
```

Here by separating each type of symbol to its corresponding class, we are able to store additional data about each type of symbol. For example, a variable symbol can store its data type, an operator symbol can store the data type of the left and right operand, along with the evaluated type.

After defining the structure of a symbol, it is now necessary to define the structure of the symbol table. For simple languages like unstructured BASIC, or properties file, where there is only one execution scope, we can store symbols inside of a flat table. In BASIC, all symbols are processed equally, so this example below will have the following symbol table, represented as a set of symbols: [S, V, N, I]
```basic
5 LET S = 0
10 MAT INPUT V
20 LET N = NUM
30 IF N = 0 THEN 99
40 FOR I = 1 TO N
45 LET S = S + V(I)
50 NEXT I
60 PRINT S/N
70 GO TO 5
99 END
```

This type of symbol table is called flat table, monolithic table, or monoscope table, which means there is only one scope and all symbols are stored inside that root scope. This type of symbol table is very easy to implement, but it is extremely simple and often does not suffice for modern languages with multiple and nested scopes. For these, a more tree-like structure for symbol tables is needed. One construct that many programming languages have is function. A function is described as an isolated block of code, in charge of performing some calculations upon some input and produce an output. Because a function is often isolated from the rest of the source code, all symbols defined and used inside it should only be valid inside the region of that function and should be destroyed when the function ends. For this property, a function is said to have its own scope. A scope is a code region with a well-defined boundary that group symbol definitions. A source unit can have multiple functions, so ultimately, there needs to be multiple scopes inside a source unit. Moreover, the source unit itself can have variables. These variables, frequently referred to as global variables, are part of the source unit and not any function. The functions that are part of the source unit also should be able to refer to the global variables. Here, the scoping mechanism must be able to nest scopes. Scope nesting allow an inner scope to refer to symbols of its parent scope and its own symbols, but not its parent‟s other child scopes‟ symbols. The mechanism got even more complicated with scope hierarchy, in which a scope not only should be able to see symbols from its parent scope, but also from its ancestor. This create a tree structure with each node being a scope. The root of the tree is usually the source unit itself. For example, for C# the root node of the tree is namespace, for Java the root node is package. Note that in languages like C# or Java, root nodes such as namespace or package can span across multiple files (compilation units). Symbol tables for these languages need to be globally linked between multiple files. Symbol tables is a core part of any language application. With symbol table, other analyzers can verify the existence of symbols, link symbols together, and do many other things. For instance, the most popular and Microsoft homemade IDE for C#, Visual Studio, has an intricate dynamic symbol table. Each time a symbol signature is changed in one file, every reference to that symbol will detect the change and propagate alerts if needed. In order to perform this dynamic operation, the symbol table has to have its own traversal mechanism for fast retrieval and modification of symbols, which is not much difference than how ASTs are traversed.