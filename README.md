# timeaxis

To write and drive your ticks.

## CAUTION

* NOT ready for end-user, working to develop
* do NOT use this server until CAUTION removed

## Usage

### setup as global dependency

    npm install -g timeaxis

### start server anywhere

    timeaxis

### deploy server

1. prepare a MySQL instance on your own server
2. execute SQL to create schema ($root/server/datasource/mysql/table.sql)
3. write connection config