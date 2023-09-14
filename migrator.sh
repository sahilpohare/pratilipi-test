#!/bin/bash

# Directory containing SQL files
SQL_DIR="./migrations"

# Iterate through SQL files in the directory
for file in "$SQL_DIR"/*.sql; do
  if [ -f "$file" ]; then
    echo "Running SQL file: $file"
    
    # Use psql to execute the SQL file with environment variables
    PGPASSWORD="$POSTGRES_PASSWORD" psql -U "$POSTGRES_USER" -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -w -f "$file"
    
    # Check for psql errors
    if [ $? -ne 0 ]; then
      echo "Error executing $file"
      exit 1
    fi
    
    echo "Finished running $file"
  fi
done

echo "All SQL files in $SQL_DIR have been executed."