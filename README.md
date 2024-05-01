FirstHome

Prerequisites
- Docker
- WSL required for windows
- Make sure the docker application is Running

To run the application in development envirnment:
- Run docker compose up
    - This will create the frontend and database container
    - Once the frontend container is running, it will display the port to access the application (8000 if available)

To run production:
- Run docker compose -f  docker-compose.prod.yml up
    - This will create only the frontend container as our BE is hosted over an AWS lightsail instance
    - The command line will display port to access the application