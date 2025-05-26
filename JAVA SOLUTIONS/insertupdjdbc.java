// 32. Insert and Update Operations in JDBC

import java.sql.*;

class StudentDAO {
    Connection con;

   public StudentDAO() throws Exception {
    Class.forName("org.sqlite.JDBC");
    con = DriverManager.getConnection("jdbc:sqlite:students.db");

    Statement stmt = con.createStatement();
    stmt.executeUpdate("CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT)");

    // Clear existing rows for fresh testing
    stmt.executeUpdate("DELETE FROM students");
}

    public void insert(int id, String name) throws Exception {
        PreparedStatement ps = con.prepareStatement("INSERT INTO students (id, name) VALUES (?, ?)");
        ps.setInt(1, id);
        ps.setString(2, name);
        ps.executeUpdate();
        System.out.println("Inserted: " + name);
    }

    public void update(int id, String name) throws Exception {
        PreparedStatement ps = con.prepareStatement("UPDATE students SET name=? WHERE id=?");
        ps.setString(1, name);
        ps.setInt(2, id);
        ps.executeUpdate();
        System.out.println("Updated ID " + id + " to " + name);
    }
}

public class insertupdjdbc {
    public static void main(String[] args) {
        try {
            StudentDAO dao = new StudentDAO();
            dao.insert(1, "Alice");
            dao.insert(2, "Bob");
            dao.update(1, "Alicia");
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
