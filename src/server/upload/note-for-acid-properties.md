# ACID Transactions

## What is transaction?
**Transactions** must adhere to a set of **requirements**, known as the **ACID properties**. ACID is an acronym for four interdependent properties: **Atomicity**, **Consistency**, **Isolation**, and **Durability**. Much of the architecture of any modern relational database is founded on these properties. Understanding the ACID properties of a transaction is a **prerequisite** for understanding many **facets of SQL Server**.

### Example: Bank Transfer  
- Check sufficient funds (0)  
- Subtract from payer's account (1)  
- Add to receiver account (2)  
- Mark transfer as successful (3) 
In this example. Transaction is (0) + (1) + (2) + (3).
```sql
SELECT [...] (0)  
UPDATE [...] (1)  
UPDATE [...] (2)  
UPDATE [...] (3)  
```

Systems that do not meet the ACID criteria are sometimes called BASE, which stands for Basically Available, Soft state, and Eventual consistency. This is even more vague than the definition of ACID. It seems that the only sensible definition of BASE is “not ACID”.
Let’s dig into the definitions of atomicity, consistency, isolation, and durability, as this will let us refine our idea of transactions

## Atomic
> All or nothing

In general, atomic refers to something that cannot be broken down into smaller parts. The word means similar but subtly different things in different branches of computing. For example, in multi-threaded programming, if one thread executes an atomic operation, that means there is no way that another thread could see the half-finished result of the operation. The system can only be in the state it was before the operation or after the operation, not something in between.
By contrast, in the context of ACID, atomicity is not about concurrency. It does not describe what happens if several processes try to access the same data at the same time
Rather, ACID atomicity describes what happens if a client wants to make several writes, but a fault occurs after some of the writes have been processed. For example, a process crashes, a network connection is interrupted, a disk becomes full, or some integrity constraint is violated. If the writes are grouped together into an atomic transaction, and the transaction cannot be completed (committed) due to a fault, then the transaction is aborted and the database must discard or undo any writes it has made so far in that transaction.


## Consistent
> After transaction is committed, data is still in a valid state (ie. Constraints)

The idea of ACID consistency is that you have certain statements about your data (invariants) that must always be true. For example, in an accounting system, credits and debits across all accounts must always be balanced. If a transaction starts with a database that is valid according to these invariants, and any writes during the transaction preserve the validity, then you can be sure that the invariants are always satisfied.
However, this idea of consistency depends on the application’s notion of invariants, and it’s the application’s responsibility to define its transactions correctly so that they preserve consistency. This is not something that the database can guarantee: if you write bad data that violates your invariants, the database can’t stop you. (Some specific kinds of invariants can be checked by the database, for example using foreign key constraints or uniqueness constraints. However, in general, the application defines what data is valid or invalid—the database only stores it.)
Atomicity, isolation, and durability are properties of the database, whereas consistency (in the ACID sense) is a property of the application. The application may rely on the database’s atomicity and isolation properties in order to achieve consistency, but it’s not up to the database alone. Thus, the letter C doesn’t really belong in ACID.


## Isolation  
> The statements are executed in a seemingly sequential way.

Most databases are accessed by several clients at the same time. That is no problem if they are reading and writing different parts of the database, but if they are accessing the same database records, you can run into concurrency problems (race conditions).
Isolation in the sense of ACID means that concurrently executing transactions are isolated from each other: they cannot step on each other’s toes. The classic database textbooks formalize isolation as serializability, which means that each transaction can pretend that it is the only transaction running on the entire database. The database ensures that when the transactions have committed, the result is the same as if they had run serially (one after another), even though in reality they may have run concurrently.

## Durability
> Provide a safe place where data can be stored without fear of losing data.

Durability is the promise that once a transaction has committed successfully, any data it has written will not be forgotten, even if there is a hardware fault or the database crashes.