CREATE EXTENSION pgcrypto;

CREATE TABLE IF NOT EXISTS clientinfo(
    uuid UUID DEFAULT gen_random_uuid(),
    firstname varchar not null,
    lastname varchar not null,
    email varchar,
    birthdate date,
    gender varchar,
    ethnicity varchar,
    recorded_date timestamp,
    CONSTRAINT uuid_pk PRIMARY KEY (uuid)
);

CREATE OR REPLACE FUNCTION insertClient(
    p_firstname varchar, 
    p_lastname varchar, 
    p_email varchar, 
    p_birthdate date, 
    p_gender varchar, 
    p_ethnicity varchar
) RETURNS integer 
AS $$
    BEGIN
        insert into clientinfo
        (
            firstname,
            lastname,
            email,
            birthdate,
            gender,
            ethnicity,
            recorded_date
        )
        values
        (
            p_firstname, 
            p_lastname, 
            p_email, 
            p_birthdate, 
            p_gender, 
            p_ethnicity,
            current_timestamp
        );
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getClients
() 
RETURNS TABLE
(
    uuid UUID,
    firstname varchar,
    lastname varchar,
    email varchar,
    birthdate date,
    gender varchar,
    ethnicity varchar,
    recorded_date timestamp
) 
AS $$
    BEGIN
        return query select 
            uuid,
            firstname,
            lastname,
            email,
            birthdate,
            gender,
            ethnicity,
            recorded_date
        from clientinfo;
    END;
$$ LANGUAGE plpgsql;