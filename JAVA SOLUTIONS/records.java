// 29. Records (Java 16+)

import java.util.*;

record Person(String name, int age) {}

public class records{
    public static void main(String[] args) {
        List<Person> people = List.of(new Person("Alice", 30), new Person("Bob", 20));
        people.stream().filter(p -> p.age() >= 25).forEach(System.out::println);
    }
}
