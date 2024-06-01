# Olkisir
- A Dispatch-Returns System

## Overview
Olkisir is a comprehensive Dispatch-Returns System designed to streamline sales order management and enhance the handling of product returns within an organization. By providing efficient tracking of goods and services from dispatch to customer premises, as well as facilitating seamless returns processing, Olkisir aims to optimize operational efficiency, reduce costs, and improve customer satisfaction.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Database](#database)
- [Features](#features)
- [Credits](#credits)
- [License](#license)

## Installation
To install Olkisir locally, follow these steps:
* `git clone https://github.com/Shadkoech/Webstack-Portfolio-Project.git`
- You will then need to run both the backend and the frontend;

#### back-end
1. Navigate to the backend directory: `cd olkisir_backend`
2. Install dependencies: `pipenv install`
3. Activate virtual env: `pipenv shell`
4. Run migrations: `python manage.py migrate`
5. Start the development server: `python manage.py runserver`

#### front-end
1. On a new window, navigate the front-end directory: `cd olkisir-frontend`
2. install dependencies: `npm install`
3. Start front end: `npm run dev`

## Usage
1. Access the web application in your browser by navigating to `http://localhost:8000`. 
2. Access the front-end by navigating to `http://localhost:5173/`
3. Register an account or log in (if you already have one). You can access olkisir as: an admin, dispatcher, transporter or a trader 
4. Onced logged in with appropriate roles, you will be navigated to different dashboards with different fucntionalities and permissions
   - **Dispatcher dashboad**: Makes, updates and views new and available orders; registers traders, transporters and products; assigns transporters new orders; receives returned orders from the trader
   - **Transporter dashboad**: Views and lists assigned orders to a particular transporter
   - **Trader dashboad**: Receives orders from the dispatcher; initiate, view or edit returns to be sent back to dispatcher dashboard


## Database
Project Olkisir utilizes PostgreSQL as its database management system. PostgreSQL is a powerful, open-source relational database that provides robust features and performance for handling data storage and retrieval.

### Why PostgreSQL?
- **Reliability**: PostgreSQL is trusted for its consistency, reliability and data integrity, making it suitable and important for this project
- **Scalability**: PostgreSQL can expand as needed to accommodate the increasing demands of any given application. 
- **Advanced Features**: PostgreSQL supports advanced features such as JSONB data type, full-text search, and advanced indexing options among others
- **Community Support**: With a large and active community, PostgreSQL receives regular updates, security patches, and community-driven extensions.


## Features
- Dispatch Management: Monitor and manage the flow of goods and services from the organization to customer premises.
- Returns Handling: Efficiently manage product returns, including reasons such as incorrect deliveries, damaged goods, and expired items.
- User-Friendly Interface: Intuitive interface with clear navigation and simple controls for ease of use.
- Real-time tracking of orders through the chain of dispatcher, transporter and customer and back
- User-friendly dashboards for data entry and monitoring in different organization department.
- Allows easy customizable configurations to suit different company needs.


## Credits
This project olkisir is a joint effort of the following:
1. Shadrack Koech - [Github](https://github.com/Shadkoech) / [Twitter](https://twitter.com/Shad_Koech)


## License
This project is licensed under the [MIT License](LICENSE).
