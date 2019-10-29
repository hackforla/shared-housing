create extension pgcrypto;

create table if not exists clientinfo(
    uuid uuid default gen_random_uuid(),
    firstname varchar not null,
    lastname varchar not null,
    email varchar,
    birthdate date,
    gender varchar,
    ethnicity varchar,
    recorded_date timestamp,
    constraint uuid_pk primary key (uuid)
);

create or replace function insertclient(
    p_firstname varchar, 
    p_lastname varchar, 
    p_email varchar, 
    p_birthdate date, 
    p_gender varchar, 
    p_ethnicity varchar
) returns integer 
as $$
    begin
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
    end;
$$ language plpgsql;

create or replace function getclients
() 
returns table
(
    uuid uuid,
    firstname varchar,
    lastname varchar,
    email varchar,
    birthdate date,
    gender varchar,
    ethnicity varchar,
    recorded_date timestamp
) 
as $$
    begin
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
    end;
$$ language plpgsql;












-- client
create table if not exists client(
    client_uuid uuid default gen_random_uuid(),
    first_name varchar not null,
    last_name varchar not null,
    email varchar,
    phone varchar,
    birthdate date,
    gender varchar,
    ethnicity varchar,
    record_date timestamp,
    constraint client_uuid_pk primary key (client_uuid)
);

-- location
create table if not exists dwelling(
    dwelling_uuid uuid default gen_random_uuid(),
    latitude number,
    longitude number,
    altitude number,
    constraint dwelling_uuid_pk primary key (dwelling_uuid)
);

-- program
create table if not exists program(
    program_uuid uuid default gen_random_uuid(),
    program_name varchar not null,
    constraint program_uuid_pk primary key (program_uuid)
);

-- pet
create table if not exists pet(
    pet_uuid uuid default gen_random_uuid(),
    program_name varchar not null,
    constraint pet_uuid_pk primary key (pet_uuid)
);

-- programaffiliation
create table if not exists program_affiliation(
   foreign key (program_uuid_fk) references program (program_uuid),
   foreign key (client_uuid_fk) references client (client_uuid)
);

-- pettolerance
create table if not exists pet_tolerance(
    tolerance_level number,
   foreign key (pet_uuid_fk) references pet (pet_uuid),
   foreign key (client_uuid_fk) references client (client_uuid)
);

-- smoketolerance
-- smokefrequency
-- locationpreference

-- 



/*
    
*/