## **3. Syntactic Analyzer (cont.)**
In order to construct an IR (Intermediate Representation), a parser is required. Parsers are also called syntactic analyzers because they operate and examine the syntactic structure of a sequence of tokens. Similar to lexer implementations, there are multiple ways to implement a parser. Based on the complexity of a grammar, the parser will need to employ different techniques, which may affect performance. For languages with simple syntax, a simple LL(1) top-down parser should suffice. LL(1) parser uses a single look-ahead token to make parsing decisions. In order to make parsing decisions, LL(1) parsers inspect the current parsing context – what is the current token, what is its meaning – to create a possible look-ahead set and match the current actual look-ahead token. If the actual look-ahead token matches one of the tokens in the look-ahead set, the parser proceeds to make a parsing decision. The problem with this approach is that the parsing options must be deterministic, meaning the options in the lookahead set must be unique. For a statement grammar like this:

```sql
Statement: 'if' ...
         | 'while' ...
         | 'for' ...
```
It is easy for the parser to make a decision based on a token as all the options are disjoint, they don‟t have anything in common. However, once more complicated language features are required, a single lookahead token isn‟t nearly enough. For instance, many languages allow the terminating semi-colon to be optional. This leads to problems where the parser couldn‟t decide if a semi-colon is denoting an empty statement, or if it belongs to a statement. This piece of code, when given to a parser, can easily confuse it into wondering whether the code returns nothing, or if it returns a after it is being assigned with the value 2.

```sql
Arith: ID '+' ...
     | ID '-' ...
```

In this simple grammar, after ID, there could be multiple paths a parser could take. With LL(1) parsers, they can only look at 1 token at a time. So when meet with a token that is an ID, the parser can‟t determine whether it will be an addition or a subtraction. When meet with this issue, there are some common ways to resolve this. One way is to simply modify the grammar of the language and simplify it to the point where the parser could understand. Because of the limitations of LL(1) parsers, the grammar must be deterministic. This results in not having basic features in infix operations. Familiar arithmetic operations like 2 + 3 cannot be implemented, instead, a prefix operator must be in place: + 2 3. The other way to fix this issue is to implement a more capable parser, with the ability with looking up 2 or more tokens at once. This spawns an array of parser types: LL(2), LL(3), ..., LL(n). These parsers have the ability to look up 2, 3, ..., n tokens when it needs to determine a parsing decision. These types of parsers have a common name, called LL(k). A LL(k) parser is defined as a syntactic analyzer that is capable of analyzing the syntactic structure of a sequence of tokens using k>1 lookahead tokens. This implementation pattern is an extension of LL(1). With a larger lookahead buffer, LL(k) parsers can solve nondeterministic parsing decisions to a certain extent, like the previous sample. However, more complex languages like C++, C#, Java have what is known as circular lookahead complexity, meaning the lookahead options can loop back to a previously known option, resulting in an infinite amount of lookahead possibilities. With this type of languages, LL(k) parsers aren‟t powerful enough, a more dynamic parser is required. Sometimes, having a fixed lookahead set is just not enough. Moderately-complex programming languages often have very similar constructs, with the only difference located at the right side of the structure.

```java
void func(int x, string y) { }
void func(int x, string y);
```

Here these two function definition and function declaration only differ in the last tokens, after going through nine tokens. Obviously a LL(10) parser won‟t solve this problem because the amount of tokens can be virtually infinite due to a variable amount of parameters. Instead, to solve this problem, a new kind of parsers must be used, called LL(\*) parsers. Functionally, a LL(\*) parser works similarly to a LL(k) parser, in that it parses input text from left to right in one direction. However, a LL(\*) can make accurate parsing decisions by looking as far in the token sequence as possible. In order to do this, a LL(k) parser doesn‟t keep a token buffer, instead it speculatively match an alternative until a token does not match, it go back to the original token and start on another path. Importantly, a LL(\*) parser doesn‟t make parsing decisions right away, it speculatively decides on a path and if that path actually works out, it will make a formal decision; else, it chooses the next alternative. Because of this property, it is possible to specify a precedence when two alternatives of a rule match the same input. Going back to the previous example, if the input text is only “void func(int x, string y)”, its syntax is incorrect. Normally, the parser needs to output some error message for the programmer to correct their errors. In this instance, if the function declaration rule is placed before function definition, the parser will identify this as an incomplete function declaration and notify the programmer accordingly. However, LL(\*) parsers are not the definitive solution. Backtracking parsers are often extremely low, due to the amount of tokens they normally need to look at before a parsing decision can be made. To reduce the performance overhead, a backtracking parser can use what is known as syntactic predicates, wherein the decision-making flow can be directed by telling the parser where to go first. A classic parsing problemis the C++ statement grammar rule. It looks like this:

```sql
Statement : (
                (Declaration)? Declaration
            | Expression
            ) ';'
;
```

This grammar rule says three things:
*  If a statement looks like a declaration, then it is; otherwise
*  If that statement looks like an expression, then it is; otherwise
*  That statement contains syntax errors

Here the rule has a syntactic predicate at the alternative Declaration, only when the predicate is satisfied, that is the predicate evaluates to true, this alternative can be regarded as a possibility. Internally, the parser is trying to match the input text with the alternative Declaration. If the match is correct, the parser will match that alternative again the second time as a formal decision. In practical implementation, the above grammar rule would translate to:
```java
Statement()
{
    if (Declaration())
    {
        GoToOriginalToken(); // backtrack
        Declaration();
    }
    else
    {
        GoToOriginalToken(); // backtrack
        Expression();
    }
    LiteralToken(";");
}
```
A syntactic predicate can be thought of as a safeguard against an unlikely alternative.
Using syntactic predicates, the grammar can be more concise and the parser can be more optimized in the paths it takes. However, there are still situations where alternatives can be identical to each other and they can only be distinguished with meaning. In C++, to access an array element, the programmer would use parentheses; to invoke a function, the programmer would also use parentheses; and to make a constructor call of a class, the programmer also uses parentheses. So a single text input I(x) can match three alternatives. In this situation, relying solely on the syntactic differences is not plausible, as there are none. We have to rely on the semantic differences instead, we know that I is a symbol, so a lookup is needed to identify the type of I, if it is a type, then the input text is a constructor call; if it is a function declaration, then the input text is a function invocation; lastly, if it is a variable declaration symbol, then the input text is a variable reference. The determination of semantic features is called semantic predicates. As the name suggests, similar to syntactic predicates, semantic predicates are evaluations of expressions that determine whether an alternative is possible given the current context. Back to the last example, using the semantic predicate, the problem can be easily solved.
```java
// #semantic_predicate_introduction
Expression : (
                {is_type()} => ConstructorCall
             |
                {is_function()} => FunctionCall
             |
                ArrayIndexer
             ) '(' ... ')'
```
This grammar rule would be translated to the following practical code:
```java
// #semantic_predicate_implementation
Expression()
{
    if (CurrentToken.IsType())
    {
        ConstructorCall();
    }
    else if (CurrentToken.IsFunction())
    {
        FunctionCall();
    }
    else
    {
        ArrayIndexer();
    }
}
```
In real world language applications, not everybody is implementing C++ from scratch, so the most widely used parser pattern is LL(1) parsers, because it is either to understand and implement, while keeping things simple for light language applications such as property file reader, XML parser, etc. Programs like Markdown-to-HTML converter don‟t even need a parser as they can translate input text into the target language almost one to one. Programming language implementations, however, often need much more powerful parsers to be able to resolve grammatical problems mentioned earlier.

> ![](https://images.viblo.asia/84969604-40eb-4628-8fdd-8636bb28408b.PNG)
> A visualization of a parser program

-----
**To be continue**