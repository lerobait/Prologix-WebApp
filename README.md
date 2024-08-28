# PROLOGIX E-commerce Web Application

The PROLOGIX E-commerce Web Application is an online store developed for the PROLOGIX brand. The project includes various pages to facilitate user navigation, product search and filtering, as well as a user account section with authentication and registration features.

## Key Features

- **Home Page**: Contains filters and a search bar for easy browsing and selection of products.
- **Product Page**: Displays detailed information about a specific product, including images, specifications, and description.
- **About Brand Page**: Provides information about the PROLOGIX brand, its mission, and values.
- **Team Page**: Information about the team members involved in the project development.
- **Tech Stack Page**: Lists the technologies used in the project.
- **User Dashboard**: Features for user authentication and registration, along with account management capabilities.

## Technical Specifications

- **Backend**: Server based on Express.js, with server-side rendering of pages.
- **Frontend**: Uses HTML, CSS, and JavaScript for creating the user interface.
- **Database**: PostgreSQL is used for storing product data.
- **Containerization**: The application runs in Docker containers for easy deployment and management.
- **Documentation**: API documentation is created using Swagger to simplify integration and testing.

## Installation and Setup

### Installation Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/lerobait/Prologix-WebApp.git
    ```

2. **Set up the environment:**

    Create a `.env` file based on `.env.example` and fill in the required variables.

3. **Build Docker containers:**

    ```bash
    make build
    ```

4. **Start Docker containers:**

    ```bash
    make start
    ```

5. **Run the application:**

    The application will be available at `http://localhost:3000`.

## Data Update

Product data is loaded from a provided API and updated daily using the `node-cron` scheduler. This ensures that the information on the site remains up-to-date.

## Technologies Used

- **HTML** and **CSS**: For creating the structure and style of the pages.
- **JavaScript**: Main programming language for developing interactive interfaces.
- **Express.js**: Backend framework for creating the API and managing the server.
- **PostgreSQL**: Relational database used for storing product and user information.
- **Docker**: Used for containerizing the application and ensuring easy deployment.
- **Swagger**: For creating and documenting the API.
