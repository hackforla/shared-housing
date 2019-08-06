# DROP TABLES

clientinfo_table_drop = "DROP TABLE IF EXISTS clientinfo"
clientbackground_table_drop = "DROP TABLE IF EXISTS clientbackground"
clientpreference_table_drop = "DROP TABLE IF EXISTS clientpreference"

# CREATE TABLES
# CREATE FACT TABLE 
clientinfo_table_create = ("""CREATE TABLE IF NOT EXISTS clientinfo(
                            clientid varchar not null,
                            firstname varchar not null,
                            lastname varchar not null,
                            email varchar,
                            birthdate date,
                            gender varchar,
                            ethnicity varchar,
                            recorded_date timestamp,
                            PRIMARY KEY(clientid))""")

# CREATE DIMENSION TABLES
clientbackground_table_create = ("""CREATE TABLE IF NOT EXISTS clientbackground(
                        clientid varchar not null,
                        relationship varchar,
                        num_children int,
                        children_location varchar,
                        smoker varchar,
                        drug_user varchar,
                        drinker varchar,
                        pet varchar,
                        religion varchar,
                        spa_preference varchar,
                        city_preference varchar,
                        PRIMARY KEY(clientid))""")

clientpreference_table_create = ("""CREATE TABLE IF NOT EXISTS clientpreference(
                        clientid varchar not null,
                        gender varchar,
                        min_age int,
                        max_age int,
                        religion varchar,
                        pet varchar,
                        smoker varchar,
                        drug_user varchar,
                        drinker varchar,
                        ethnicity varchar)""")

# INSERT RECORDS

clientinfo_table_insert = ("""INSERT INTO clientinfo(clientid, firstname, lastname, email, birthdate, gender, ethnicity, recorded_date)
                              VALUES(%s, %s, %s, %s, %s, %s, %s, %s)
                              ON CONFLICT(clientid)
                              DO NOTHING""")

clientbackground_table_insert = ("""INSERT INTO clientbackground(clientid, relationship, num_children, children_location, smoker, drug_user, drinker, pet, religion, spa_preference, city_preference)
                                    VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                                    ON CONFLICT (clientid) 
                                    DO NOTHING""")

clientpreference_table_insert = ("""INSERT INTO clientpreference(clientid, gender, min_age, year, max_age, religion, pet, smoker, drug_user, drinker, ethnicity)
                                    VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                                    ON CONFLICT (clientid) 
                                    DO NOTHING""")


# FIND client

client_select = ("""SELECT * FROM CLIENTINFO 
                  WHERE clientid=%s;
                  """)

# QUERY LISTS

create_table_queries = [clientinfo_table_create, clientbackground_table_create, clientpreference_table_create]
drop_table_queries = [clientinfo_table_drop, clientbackground_table_drop, clientpreference_table_drop]
