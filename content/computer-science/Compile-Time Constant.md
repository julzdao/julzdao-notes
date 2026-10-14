---
up: "[[Java]]"
title: Compile-Time Constant
cs-foundations:
  - "[[Binary]]"
tags:
  - compiler
  - l/java
type:
  - concept
description: A value that the compiler can determine entirely at compile-time
cover:
lifecycle:
  - sapling
---
A known constant
does not need to wait until runtime.
The [[Java Compiler]] calculates its value,
can validate its range
and apply special rules.

---

Imagine the **Compiler** as a super-smart cashier 🧠. Checking a pre-calculated bill.  

Normally, if you add two small items.  
(`byte` + `byte`), the cashier (the [[JVM]])   
is instructed to put the result into a larger tray (`int`)   
to prevent spillage (overflow).   
So, `byte b3 = b1 + b2;` -> fails because the result is an `int`.  

### The Exception with Compile-Time Constant

When all the numbers in.  
an arithmetic expression.  
are **fixed, known values**.  
(literals like `10` or `50`),   
the Compiler says, *"Wait, I don't need the JVM for this; I can do the math myself right now."*

**If the math works:**   
The compiler calculates `10 + 50 = 60`.   
Since 60 fits within the target [[byte]]'s range (−128 to 127),   
the compiler simply places the final value (60)   
directly into the `byte` variable.   
**No explicit cast is needed.**. 

> [!warning] If the math overflows
> If the expression was `100 + 50 = 150`, the compiler would see that 150 is outside the `byte` range and immediately throw a **compile-time error**, saving the JVM the trouble.

The core idea is that.  
the check happens   
entirely at compile time,   
making the code safer and   
more concise than if it   
were calculated at runtime.   

```java 
public class CompileTimeConstantTest {

    // Helper method to demonstrate the final output
    public static void main(String[] args) {
        System.out.println("--- 1. Success with Constant Expressions ---");
        successExamples();
        
        System.out.println("\n--- 2. Overflow Traps (Compile-Time Errors) ---");
        overflowExamples();
        
        System.out.println("\n--- 3. Non-Constant Traps (Compile-Time Errors) ---");
        nonConstantTraps();
    }

    // 1. Examples that compile due to constant folding
    public static void successExamples() {
        // RULE: Constant expression is evaluated at compile time.
        // Result (120) fits in byte (max 127). No cast needed.
        byte b1 = 50 + 70;
        System.out.println("1a. b1 (50+70): " + b1 + " (Compiles OK)");

        // RULE: The 'final' keyword makes an initialized variable a compile-time constant.
        final int MAX_VAL = 100;
        final byte OFFSET = 27;
        // MAX_VAL + OFFSET (127) is a constant expression and fits in byte.
        byte b2 = MAX_VAL + OFFSET; 
        System.out.println("1b. b2 (final + final): " + b2 + " (Compiles OK)");

        // Result (32767) fits in short (max 32767).
        short s1 = 30000 + 2767;
        System.out.println("1c. s1: " + s1 + " (Compiles OK)");
    }

    // 2. Examples that fail due to Constant Overflow
    public static void overflowExamples() {
        // The compiler evaluates 100 + 50 to 150.
        // 150 is outside the byte range [-128 to 127].
        // byte b3 = 100 + 50; // COMPILE ERROR: Incompatible types. Lossy conversion from int to byte.

        // The compiler evaluates 32000 + 1000 to 33000.
        // 33000 is outside the short range [-32768 to 32767].
        // short s2 = 32000 + 1000; // COMPILE ERROR: Incompatible types. Lossy conversion from int to short.

        System.out.println("2a & 2b. Compile Errors (commented out in code).");
    }

    // 3. Examples that fail due to Arithmetic Promotion (Not a Constant)
    public static void nonConstantTraps() {
        byte a = 10; // Not a compile-time constant (can change)
        byte b = 20; // Not a compile-time constant (can change)

        // RULE: 'a + b' is evaluated at runtime, promoting 'a' and 'b' to 'int'.
        // The result is an 'int' (30). Cannot assign 'int' to 'byte'.
        // byte c = a + b; // COMPILE ERROR: Incompatible types. Lossy conversion from int to byte.

        // FIX: The only way to make this work is to explicitly cast the result back to byte.
        byte c_fixed = (byte)(a + b);
        System.out.println("3a. c_fixed (with cast): " + c_fixed + " (Compiles OK)");

        // OCA TRAP: Even if the result is small, the promotion rule still applies!
        byte x = 5;
        // byte y = x + 1; // COMPILE ERROR: x is not final, so x + 1 is int.
        System.out.println("3b. Compile Error (commented out in code).");
    }
}
```


### 🦕 Sources 

- [Java Language Specification (JLS) - Section 5.2 (Assignment Conversion)](https://www.google.com/search?q=https://docs.oracle.com/javase/specs/jls/se17/html/jls-5.html%23jls-5.2)
- [Baeldung: Compile-Time Constant in Java](https://www.google.com/search?q=https://www.baeldung.com/java-compile-time-constant)
---