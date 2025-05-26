//40. Virtual Threads (Java 21)
public class virtualthreads {
    public static void main(String[] args) {
        for (int i = 0; i < 100_000; i++) {
            Thread.startVirtualThread(() -> System.out.println("Hello from virtual thread!"));
        }
    }
}
