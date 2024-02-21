# README for SearchSmartly PoI Data Importer

## Overview

SearchSmartly needs to process data from many different sources. There are text files that we fetch from different places and we then import the contents of each file into our database.
There are lots of different types of files but, for this project, we are only concerned with the 3 file types (CSV, JSON and XML) that contain Point of Interest (PoI) data.
We need a new service that can import these files and allow their information to be browsed via the web via the Django Admin Panel. For this challenge, files will be imported via the command-line

## Requirements

- Python 3.10 or above
- Django
- React 18.2
- Additional Python packages as listed in `requirements.txt`

## Installation

### Main Repo

1. **Clone the repository:**

   ```bash
   git clone SearchSmartly
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

### Backend

3. **Navigate to the backend python directory:**

   ```bash
   cd ss_backend
   ```

4. **Set up the database:**

   • Create database and setup `.env` file. Sample `env` file can be found as `.env.sample`

   • Run Migrations

   ```bash
   python manage.py migrate
   ```

5. **Import Data**

   ```bash
   python manage.py import_pois [Path to you file]
   ```

   Examples:
   ```bash
   python manage.py import_pois pois.csv
   python manage.py import_pois data/pois.xml
   python manage.py import_pois Desktop/data/pois.json
   ```


6. **Create a superuser for Django Admin:**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run Server**
   ```bash
   python manage.py runserver
   ```

### Frontend

8. **Navigate to the frontend react directory from SearchSmartly directory:**
   ```bash
   cd ss_frontend
   ```

9. **Install nmp packages:**
   ```bash
   npm install
   ```

10. **Start Frontend Server:**
   ```bash
   npm start
   ```


## Usage

### Viewing Data in Django Admin

- Access the Django Admin Panel at `http://127.0.0.1:8000/admin`.
- Log in using the superuser credentials.
- Browse the imported PoI data.
- Access the web portal at `http://localhost:3000`
## Features

- **Command-line Data Import:** Import data from CSV, JSON, and XML files via a Django management command.
- **Django Admin Integration:** Browse PoI data through the Django Admin Panel.
- **Search and Filter Capabilities:** Search by PoI internal or external ID, and filter by category in the Django Admin Panel.

## File Specifications

- **CSV:** `poi_id, poi_name, poi_latitude, poi_longitude, poi_category, poi_ratings`
- **JSON:** `id, name, coordinates[latitude, longitude], category, ratings, description`
- **XML:** `pid, pname, platitude, plongitude, pcategory, pratings`

## Potential Improvements and Assumptions

- **Test Coverage:** Can add Pytest in order to automate the testing.
- **Error Handling:** Enhance error handling for file parsing and data importing including file format validations.
- **Data Validation:** Implement stricter data validation based on PoI data requirements.
- **API Extension:** Develop REST API endpoints for data manipulation.

## Future Additions
- **User Interface:** Create a user-friendly web interface for data import and browsing.
- **Third Party Integrations:** Allow user to integrate or import data from Google Sheets or any third party tool.
- **Read files from Online URLs:** Can add functionality to read data from files stored on cloud directory.
