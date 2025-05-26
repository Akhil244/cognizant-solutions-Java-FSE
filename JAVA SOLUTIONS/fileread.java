// 23. File Reading

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class fileread {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader("output.txt"));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
        reader.close();
    }
}
