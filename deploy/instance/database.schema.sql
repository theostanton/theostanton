drop table if exists views;
drop table if exists clicks;
drop table if exists sessions;
drop table if exists users;

-- users
create table users
(
    id varchar(64) not null
);

create unique index users_id_uindex
    on users (id);

alter table users
    add constraint users_pk
        primary key (id);


-- sessions
create table sessions
(
    id     serial      not null
        constraint sessions_pk
            primary key,
    "user" varchar(64) not null
        constraint sessions_users_id_fk
            references users
            on update cascade on delete cascade
);

alter table sessions
    owner to super;

create unique index sessions_id_uindex
    on sessions (id);

-- clicks
create table clicks
(
    id        serial    not null
        constraint clicks_pk
            primary key,
    session   integer   not null
        constraint clicks_sessions_id_fk
            references sessions
            on update cascade on delete cascade,
    target    text      not null,
    timestamp timestamp not null
);

alter table clicks
    owner to super;

create unique index clicks_id_uindex
    on clicks (id);

-- views
create table views
(
    id        serial    not null,
    session   int       not null
        constraint views_sessions_id_fk
            references sessions
            on update cascade on delete cascade,
    page      text      not null,
    timestamp timestamp not null
);

create unique index views_id_uindex
    on views (id);

alter table views
    add constraint views_pk
        primary key (id);


