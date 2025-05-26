//17. Class and Object Creation
class Car {
    String make, model;
    int year;

    void displayDetails() {
        System.out.println(make + " " + model + " " + year);
    }
}

public class classobj {
    public static void main(String[] args) {
        Car car1 = new Car();
        car1.make = "Toyota";
        car1.model = "Camry";
        car1.year = 2020;
        car1.displayDetails();
    }
}
