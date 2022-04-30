# awesome_todo

A CMSC 127 Full-stack Project

## Setup database

1. Open your MariaDB interpreter.
2. Inside MariaDB, enter `source ./sql/seed.sql` to seed the database.

## Documentation

1. Postman https://vrfdivino.postman.co/workspace/CMSC-127-Project~35fdb369-819b-4028-ab4a-2e2be2dd5e5b/overview

## Setup python

1. Create a project environment by using this command `python3 -m venv ./venv`.
   This will create a new Python environment for you.
2. Every now and then, when working in the project, activate the environment by typing
   `./venv/Scripts/activate`. If you are in WSL/Linux, prepend the `source` command.
   If succesfully done, you should see a new prompt prepended with `(venv)`.
3. Install the latest dependencies by typing the command `pip install -r requirements.txt`.
4. Run server using this command `python .\server\index.py`.
5. Run client using this command `npm run dev`.
