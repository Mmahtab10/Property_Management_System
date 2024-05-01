# FirstHome Database Schema and Seeding Script

This documentation provides an overview of the database setup and initial data seeding for the FirstHome project. It details the schema initialization and seeding processes, highlighting the structure and purpose of each database table created and populated.

## Schema Script (`init.sql`)

### Users Table
- **Purpose**: Stores information about users.
- **Fields**: Includes user ID, email, first name, last name, password, salt and isSeller. It ensures that the email field is unique for every user.

### Listings Table

- **Purpose**: Stores information about property listings.
- **Fields**: Includes details such as seller ID, email, property type, price, address, number of baths and beds, square footage, lease duration, utilities included, availability date, status, property description, and up to 8 images.

### Reports Table

- **Purpose**: Keeps track of reports made against listings for various reasons.
- **Fields**: Includes report ID, listing ID, reason for the report, date reported, user ID, and report count.

## Seeding Script (`seeding.sql`)

- **Process**: Populates the `Users`, `Listings` and `Reports` tables with initial data to simulate real-world application use.
- **Users Data**: Includes users and their required attributes.
- **Listings Data**: Includes a variety of property types (e.g., apartments, houses, townhouses) with comprehensive details for each listing.
- **Reports Data**: Contains example reports for certain listings, demonstrating the reporting functionality with reasons and report counts.

## Setup Instructions

### Database Initialization and Seeding with MySQL Workbench

### Prerequisites

- MySQL Workbench installed on your machine.
- Access credentials to your MySQL server instance (e.g., host, username, and password).

### Steps

1. **Open MySQL Workbench**:
   - Launch MySQL Workbench on your computer.

2. **Create a New Connection**:
   - Click on the "+" symbol beside "MySQL Connections" to create a new connection.
   - In the "Setup New Connection" dialogue, enter your database connection details:
     - Connection Name: Choose a name for your connection.
     - Hostname: `<redacted>`
     - Port: `<redacted>`
     - Username: `<redacted>`
     - Password: Click "Store in Vault" and enter your password.
   - Click "Test Connection" to ensure everything is set up correctly, then click "OK" to save the connection.

3. **Connect to Your Database**:
   - From the home screen of MySQL Workbench, double-click the connection you just created to connect to your database.

4. **Open a New SQL Tab**:
   - Once connected, click on the icon to open a new SQL tab for executing queries.

5. **Execute the `init.sql` Script**:
   - Copy the contents of your `init.sql` script into the SQL tab.
   - Execute the script by clicking the lightning bolt icon or pressing `Ctrl + Enter`. This step creates the `Listings` and `Reports` tables in your database.

6. **Execute the `seeding.sql` Script**:
   - Copy the contents of your `seeding.sql` script into the SQL tab.
   - Execute the script to populate the `Listings` and `Reports` tables with initial data.

7. **Verify the Data**:
   - To verify that the data has been inserted correctly, you can run:
     ```
     SELECT * FROM Users;
     SELECT * FROM Listings;
     SELECT * FROM Reports;
     ```
   - This will display the rows added to each table, allowing you to confirm that the seeding process was successful.

By following these instructions, you will have successfully set up your database schema and seeded initial data using MySQL Workbench.