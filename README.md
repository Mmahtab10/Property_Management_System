# FirstHome Property Management Software

## Prerequisites

- **Docker**: Ensure Docker is installed and running on your system.
- **WSL (Windows Subsystem for Linux)**: Required for running Docker on Windows.

## Getting Started

![fH](https://github.com/Mmahtab10/Property_Management_System/assets/53919885/14a020b8-ae58-4e9c-91f3-cac4a735ad44)


### Development Environment

To set up and run the application in a development environment:

1. **Clone the repository to your local**
2. **Start Docker**: Make sure the Docker application is running.
3. **Run Docker Compose**:
    ```bash
    docker compose up
    ```
    This command will create the frontend and database containers.
4. **Access the Application**: Once the frontend container is running, it will display the port to access the application (default: 8000, if available).

### Production Environment

To set up and run the application in a production environment:

1. **Start Docker Compose for Production**:
    ```bash
    docker compose -f docker-compose.prod.yml up
    ```
    This command will create only the frontend container, as the backend is hosted on an AWS Lightsail instance.
2. **Access the Application**: The command line will display the port to access the application.

## Technologies Used
1. Node.js
2. AWS (EC2, S3, Route 53)
3. Next.js
4. Express.js
5. Tailwind CSS
6. Redux
7. Docker

## Additional Information

- **Frontend Container**: Hosts the user interface for the application.
- **Database Container**: Manages the application's data storage (only in development).

Ensure you have the necessary permissions and network configurations to run Docker and access the application ports.

For any issues or further instructions, please refer to the [documentation](https://yuja.ucalgary.ca/V/Video?v=1038151&node=5500102&a=148689269).
