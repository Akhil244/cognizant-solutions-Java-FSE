//35. TCP Client-Server Chat
import java.io.*;
import java.net.*;

public class TCP_client {
    public static void main(String[] args) throws Exception {
        Socket socket = new Socket("localhost", 5000);
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        BufferedReader user = new BufferedReader(new InputStreamReader(System.in));
        String line;
        while (true) {
            System.out.print("You: ");
            out.println(user.readLine());
            System.out.println("Server: " + in.readLine());
        }
    }
}
