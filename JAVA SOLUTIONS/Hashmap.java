// 25. HashMap Example

import java.util.HashMap;
import java.util.Scanner;

public class Hashmap {
    public static void main(String[] args) {
        HashMap<Integer, String> map = new HashMap<>();
        Scanner sc = new Scanner(System.in);
        map.put(1, "Alice");
        map.put(2, "Bob");
        map.put(3, "Charlie");

        System.out.print("Enter ID to search: ");
        int id = sc.nextInt();
        System.out.println("Name: " + map.getOrDefault(id, "Not found"));
    }
}
