System Design Document

1. Architectural and Technology Choices

Technology Stack: The application is built with React and JavaScript for component-based development, using Vite for a fast build process. Material UI was chosen for a clean, production-ready UI, and React Router DOM handles all client-side navigation.

Component Design: The application is divided into a modular component architecture:

UrlShortenerPage: Contains the main form and displays results.

UrlShortenerForm: An encapsulated component for form logic and validation.

Logger Service: A separate module for handling all logging functionality, ensuring a clear separation of concerns.

Data Modeling: All data is managed client-side using localStorage. The application stores a list of objects, each containing the originalUrl, shortenedUrl, and timestamps for creation and expiration.

2. Key Decisions and Assumptions

API Connectivity: Due to a CORS error (TypeError: Failed to fetch), direct network calls to the provided APIs from the frontend were blocked. As a result, API responses for logging and URL shortening were mocked. This allowed the core application functionality and logging integration to be fully implemented and demonstrated.

Authorization: The API access_token has a very short lifespan, requiring frequent refreshes. For this submission, a valid token was hardcoded for testing purposes, assuming a real-world application would implement an automated token refresh mechanism.

Missing API Endpoints: The URL shortening API endpoint was not provided. A mock endpoint was used to simulate a successful API call, enabling the implementation of the form submission logic and result display.
