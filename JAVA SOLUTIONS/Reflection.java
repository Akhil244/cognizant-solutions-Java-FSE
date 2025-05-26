//  39. Reflection in Java
import java.lang.reflect.*;

class Person {
    public void sayHello() {
        System.out.println("Hello!");
    }
}

public class Reflection {
    public static void main(String[] args) throws Exception {
        Class<?> cls = Class.forName("Person");
        Object obj = cls.getDeclaredConstructor().newInstance();
        Method[] methods = cls.getDeclaredMethods();
        for (Method m : methods) {
            System.out.println("Method: " + m.getName());
            m.invoke(obj);
        }
    }
}
