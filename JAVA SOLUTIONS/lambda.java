//27. Lambda Expressions

import java.util.*;

public class lambda {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("banana", "apple", "cherry", "date");
        list.sort((s1, s2) -> s1.compareTo(s2));
        System.out.println("Sorted: " + list);
    }
}
