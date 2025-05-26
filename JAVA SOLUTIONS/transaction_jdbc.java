// 33. Transaction Handling in JDBC

import java.sql.*;

public class transaction_jdbc {
    public static void main(String[] args) {
        Connection con = null;
        try {
            // Load SQLite driver
            Class.forName("org.sqlite.JDBC");
            con = DriverManager.getConnection("jdbc:sqlite:bank.db");
            Statement stmt = con.createStatement();

            // Create accounts table if not exists
            stmt.executeUpdate("""
                CREATE TABLE IF NOT EXISTS accounts (
                    id INTEGER PRIMARY KEY,
                    balance INTEGER
                )
            """);

            // Insert default accounts if not already present
            ResultSet rs1 = stmt.executeQuery("SELECT COUNT(*) FROM accounts");
            if (rs1.next() && rs1.getInt(1) == 0) {
                stmt.executeUpdate("INSERT INTO accounts (id, balance) VALUES (1, 1000), (2, 500)");
                System.out.println("Inserted default accounts with balance.");
            }

            // Begin transaction
            con.setAutoCommit(false);

            // Debit from account 1
            stmt.executeUpdate("UPDATE accounts SET balance = balance - 100 WHERE id = 1");

            // Credit to account 2
            stmt.executeUpdate("UPDATE accounts SET balance = balance + 100 WHERE id = 2");

            con.commit();
            System.out.println("Transaction successful");
        } catch (Exception e) {
            try {
                if (con != null) con.rollback();
                System.out.println("Transaction failed, rolled back: " + e.getMessage());
            } catch (Exception rollbackEx) {
                System.out.println("Error during rollback: " + rollbackEx.getMessage());
            }
        } finally {
            try {
                if (con != null) con.close();
            } catch (Exception closeEx) {
                System.out.println("Error closing connection: " + closeEx.getMessage());
            }
        }
    }
}
