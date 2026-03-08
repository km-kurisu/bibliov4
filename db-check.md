# Database Verification Guide

Use these SQLite commands to check the status and content of your `database.sqlite` file.

## Opening the Database

Open the database file in your terminal:

```powershell
sqlite3 database.sqlite
```

## Essential Commands

Once inside the SQLite prompt (`sqlite>`), you can run these commands:

### Verify Tables
List all tables in the database:
```sql
.tables
```

### Check Schema
See the schema for a specific table:
```sql
.schema books
```

### Query Books
View all books in the library:
```sql
SELECT id, title, author, category FROM books;
```

### Check User Profile
Verify the seeded user profile:
```sql
SELECT id, username, display_name, email FROM profiles;
```

### Check User Library
View books currently in the user's library:
```sql
SELECT profiles.username, books.title, user_library.status 
FROM user_library 
JOIN profiles ON user_library.user_id = profiles.id 
JOIN books ON user_library.book_id = books.id;
```

### Exit SQLite
```sql
.exit
```

> [!TIP]
> Use `.mode column` and `.headers on` to make the output more readable in your terminal.
