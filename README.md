# awesome_todo

A CMSC 127 Full-stack Project
## Documentation

1. [Postman](https://vrfdivino.postman.co/workspace/CMSC-127-Project~35fdb369-819b-4028-ab4a-2e2be2dd5e5b/overview) 
2. [Live Demo](http://cmsc127.koreacentral.cloudapp.azure.com/)

## Setup database

1. Open your MariaDB interpreter.
2. Inside MariaDB, enter `source ./sql/seed.sql` to seed the database.

## Setup environment
1. At the root of your project directory, create a file name ```.env```. Copy paste the code below:

```
USERNAME=
PASSWORD=
DATABASE=awesome_todo
SERVER_PORT=8000
CLIENT_PORT=3000
SECRET_KEY=2zyalxwXbyaZVoXqoXGUKJXBVQANzBo3
PORT=3306
```

2. Make sure to enter your ```USERNAME``` and ```PASSWORD``` credentials for your database. For the ```SECRET_KEY```, you can just left it like that or enter your own key.

## Setup server

1. Create a project environment by using this command `python3 -m venv ./venv`.
   This will create a new Python environment for you. You can skip this step if you want to directly run in your global Python environment.
2. Every now and then, when working in the project, activate the environment by typing
   `./venv/Scripts/activate`. If you are in WSL/Linux, prepend the `source` command.
   If succesfully done, you should see a new prompt prepended with `(venv)`.
3. Install the latest dependencies by typing the command `pip install -r requirements.txt`.
4. If you encountered error on Python Mariadb Connection, you may want to visit this [page](https://stackoverflow.com/questions/62584959/python-mariadb-pip-install-failed-missing-mariadb-config).
5. Run server using this command `python .\server\index.py`.

## Setup client

1. Go to client using this command `cd client`.
2. Install dependencies `npm install`.
3. Start the client `npm run dev`.
