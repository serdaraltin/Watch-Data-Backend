--
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'ISO_8859_8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "watch-data";
--
-- Name: watch-data; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "watch-data" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "watch-data" OWNER TO postgres;

\connect -reuse-previous=on "dbname='watch-data'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'ISO_8859_8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Age; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Age" (
    id integer NOT NULL,
    person_id integer,
    age_range character varying(20),
    confidence numeric(5,4),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Age" OWNER TO postgres;

--
-- Name: Age_age_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Age_age_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Age_age_id_seq" OWNER TO postgres;

--
-- Name: Age_age_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Age_age_id_seq" OWNED BY public."Age".id;


--
-- Name: AppUser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AppUser" (
    id integer NOT NULL,
    branch_id integer,
    username character varying(50),
    password_hash character varying(255) NOT NULL,
    email character varying(255),
    full_name character varying(100),
    role character varying(20),
    last_login timestamp with time zone,
    account_status character varying(20),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."AppUser" OWNER TO postgres;

--
-- Name: AppUser_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AppUser_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AppUser_user_id_seq" OWNER TO postgres;

--
-- Name: AppUser_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AppUser_user_id_seq" OWNED BY public."AppUser".id;


--
-- Name: Branch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Branch" (
    id integer NOT NULL,
    company_id integer,
    parent_branch_id integer,
    name character varying(255) NOT NULL,
    location character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Branch" OWNER TO postgres;

--
-- Name: Branch_branch_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Branch_branch_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Branch_branch_id_seq" OWNER TO postgres;

--
-- Name: Branch_branch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Branch_branch_id_seq" OWNED BY public."Branch".id;


--
-- Name: Camera; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Camera" (
    id integer NOT NULL,
    branch_id integer,
    model character varying(255),
    resolution character varying(20),
    install_date date,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    label character varying(255),
    protocol character varying(20),
    host character varying(255),
    port integer,
    "user" character varying(50),
    password character varying(50),
    channel integer,
    type character varying(30),
    status boolean,
    additional json
);


ALTER TABLE public."Camera" OWNER TO postgres;

--
-- Name: Camera_camera_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Camera_camera_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Camera_camera_id_seq" OWNER TO postgres;

--
-- Name: Camera_camera_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Camera_camera_id_seq" OWNED BY public."Camera".id;


--
-- Name: Company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Company" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    registration_number character varying(20),
    industry character varying(100),
    website character varying(255),
    phone_number character varying(20),
    address character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Company" OWNER TO postgres;

--
-- Name: TABLE "Company"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Company" IS 'ok';


--
-- Name: Company_company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Company_company_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Company_company_id_seq" OWNER TO postgres;

--
-- Name: Company_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Company_company_id_seq" OWNED BY public."Company".id;


--
-- Name: EnterExit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EnterExit" (
    id integer NOT NULL,
    person_id integer,
    event_time timestamp with time zone,
    event_type character varying(10),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."EnterExit" OWNER TO postgres;

--
-- Name: EnterExit_enter_exit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EnterExit_enter_exit_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EnterExit_enter_exit_id_seq" OWNER TO postgres;

--
-- Name: EnterExit_enter_exit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EnterExit_enter_exit_id_seq" OWNED BY public."EnterExit".id;


--
-- Name: Gender; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gender" (
    id integer NOT NULL,
    person_id integer,
    gender text,
    confidence numeric(5,4),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Gender" OWNER TO postgres;

--
-- Name: Gender_gender_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gender_gender_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Gender_gender_id_seq" OWNER TO postgres;

--
-- Name: Gender_gender_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gender_gender_id_seq" OWNED BY public."Gender".id;


--
-- Name: Incident; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Incident" (
    id integer NOT NULL,
    camera_id integer,
    incident_date timestamp with time zone,
    description text,
    resolved boolean,
    resolution_details text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Incident" OWNER TO postgres;

--
-- Name: Incident_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Incident_incident_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Incident_incident_id_seq" OWNER TO postgres;

--
-- Name: Incident_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Incident_incident_id_seq" OWNED BY public."Incident".id;


--
-- Name: MaintenanceLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MaintenanceLog" (
    id integer NOT NULL,
    camera_id integer,
    action_description text,
    log_time timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."MaintenanceLog" OWNER TO postgres;

--
-- Name: MaintenanceLog_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MaintenanceLog_log_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MaintenanceLog_log_id_seq" OWNER TO postgres;

--
-- Name: MaintenanceLog_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MaintenanceLog_log_id_seq" OWNED BY public."MaintenanceLog".id;


--
-- Name: Movement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movement" (
    movement_id integer NOT NULL,
    person_id integer,
    movement_type character varying(20),
    start_time timestamp with time zone,
    end_time timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Movement" OWNER TO postgres;

--
-- Name: Movement_movement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Movement_movement_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Movement_movement_id_seq" OWNER TO postgres;

--
-- Name: Movement_movement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Movement_movement_id_seq" OWNED BY public."Movement".movement_id;


--
-- Name: Person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Person" (
    id integer NOT NULL,
    camera_id integer,
    detection_time timestamp with time zone,
    label text,
    confidence numeric(5,4),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Person" OWNER TO postgres;

--
-- Name: TABLE "Person"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Person" IS 'person id changes';


--
-- Name: Person_person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Person_person_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Person_person_id_seq" OWNER TO postgres;

--
-- Name: Person_person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Person_person_id_seq" OWNED BY public."Person".id;


--
-- Name: SecurityLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SecurityLog" (
    id integer NOT NULL,
    user_id integer,
    action_description text,
    log_time timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."SecurityLog" OWNER TO postgres;

--
-- Name: SecurityLog_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SecurityLog_log_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SecurityLog_log_id_seq" OWNER TO postgres;

--
-- Name: SecurityLog_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SecurityLog_log_id_seq" OWNED BY public."SecurityLog".id;


--
-- Name: UserCameraAccess; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserCameraAccess" (
    id integer NOT NULL,
    user_id integer,
    camera_id integer,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."UserCameraAccess" OWNER TO postgres;

--
-- Name: UserCameraAccess_access_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserCameraAccess_access_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserCameraAccess_access_id_seq" OWNER TO postgres;

--
-- Name: UserCameraAccess_access_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserCameraAccess_access_id_seq" OWNED BY public."UserCameraAccess".id;


--
-- Name: Age id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Age" ALTER COLUMN id SET DEFAULT nextval('public."Age_age_id_seq"'::regclass);


--
-- Name: AppUser id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AppUser" ALTER COLUMN id SET DEFAULT nextval('public."AppUser_user_id_seq"'::regclass);


--
-- Name: Branch id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Branch" ALTER COLUMN id SET DEFAULT nextval('public."Branch_branch_id_seq"'::regclass);


--
-- Name: Camera id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camera" ALTER COLUMN id SET DEFAULT nextval('public."Camera_camera_id_seq"'::regclass);


--
-- Name: Company id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company" ALTER COLUMN id SET DEFAULT nextval('public."Company_company_id_seq"'::regclass);


--
-- Name: EnterExit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EnterExit" ALTER COLUMN id SET DEFAULT nextval('public."EnterExit_enter_exit_id_seq"'::regclass);


--
-- Name: Gender id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gender" ALTER COLUMN id SET DEFAULT nextval('public."Gender_gender_id_seq"'::regclass);


--
-- Name: Incident id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Incident" ALTER COLUMN id SET DEFAULT nextval('public."Incident_incident_id_seq"'::regclass);


--
-- Name: MaintenanceLog id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MaintenanceLog" ALTER COLUMN id SET DEFAULT nextval('public."MaintenanceLog_log_id_seq"'::regclass);


--
-- Name: Movement movement_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movement" ALTER COLUMN movement_id SET DEFAULT nextval('public."Movement_movement_id_seq"'::regclass);


--
-- Name: Person id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Person" ALTER COLUMN id SET DEFAULT nextval('public."Person_person_id_seq"'::regclass);


--
-- Name: SecurityLog id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SecurityLog" ALTER COLUMN id SET DEFAULT nextval('public."SecurityLog_log_id_seq"'::regclass);


--
-- Name: UserCameraAccess id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCameraAccess" ALTER COLUMN id SET DEFAULT nextval('public."UserCameraAccess_access_id_seq"'::regclass);


--
-- Data for Name: Age; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Age" (id, person_id, age_range, confidence, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."Age" (id, person_id, age_range, confidence, "createdAt", "updatedAt") FROM '$$PATH$$/3521.dat';

--
-- Data for Name: AppUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AppUser" (id, branch_id, username, password_hash, email, full_name, role, last_login, account_status, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."AppUser" (id, branch_id, username, password_hash, email, full_name, role, last_login, account_status, "createdAt", "updatedAt") FROM '$$PATH$$/3511.dat';

--
-- Data for Name: Branch; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Branch" (id, company_id, parent_branch_id, name, location, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."Branch" (id, company_id, parent_branch_id, name, location, "createdAt", "updatedAt") FROM '$$PATH$$/3505.dat';

--
-- Data for Name: Camera; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Camera" (id, branch_id, model, resolution, install_date, "createdAt", "updatedAt", label, protocol, host, port, "user", password, channel, type, status, additional) FROM stdin;
\.
COPY public."Camera" (id, branch_id, model, resolution, install_date, "createdAt", "updatedAt", label, protocol, host, port, "user", password, channel, type, status, additional) FROM '$$PATH$$/3507.dat';

--
-- Data for Name: Company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Company" (id, name, registration_number, industry, website, phone_number, address, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."Company" (id, name, registration_number, industry, website, phone_number, address, "createdAt", "updatedAt") FROM '$$PATH$$/3503.dat';

--
-- Data for Name: EnterExit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EnterExit" (id, person_id, event_time, event_type, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."EnterExit" (id, person_id, event_time, event_type, "createdAt", "updatedAt") FROM '$$PATH$$/3517.dat';

--
-- Data for Name: Gender; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gender" (id, person_id, gender, confidence, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."Gender" (id, person_id, gender, confidence, "createdAt", "updatedAt") FROM '$$PATH$$/3519.dat';

--
-- Data for Name: Incident; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Incident" (id, camera_id, incident_date, description, resolved, resolution_details, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."Incident" (id, camera_id, incident_date, description, resolved, resolution_details, "createdAt", "updatedAt") FROM '$$PATH$$/3509.dat';

--
-- Data for Name: MaintenanceLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MaintenanceLog" (id, camera_id, action_description, log_time, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."MaintenanceLog" (id, camera_id, action_description, log_time, "createdAt", "updatedAt") FROM '$$PATH$$/3527.dat';

--
-- Data for Name: Movement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Movement" (movement_id, person_id, movement_type, start_time, end_time, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."Movement" (movement_id, person_id, movement_type, start_time, end_time, "createdAt", "updatedAt") FROM '$$PATH$$/3523.dat';

--
-- Data for Name: Person; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Person" (id, camera_id, detection_time, label, confidence, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."Person" (id, camera_id, detection_time, label, confidence, "createdAt", "updatedAt") FROM '$$PATH$$/3515.dat';

--
-- Data for Name: SecurityLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SecurityLog" (id, user_id, action_description, log_time, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."SecurityLog" (id, user_id, action_description, log_time, "createdAt", "updatedAt") FROM '$$PATH$$/3525.dat';

--
-- Data for Name: UserCameraAccess; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserCameraAccess" (id, user_id, camera_id, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."UserCameraAccess" (id, user_id, camera_id, "createdAt", "updatedAt") FROM '$$PATH$$/3513.dat';

--
-- Name: Age_age_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Age_age_id_seq"', 79, true);


--
-- Name: AppUser_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AppUser_user_id_seq"', 1, false);


--
-- Name: Branch_branch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Branch_branch_id_seq"', 1, false);


--
-- Name: Camera_camera_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Camera_camera_id_seq"', 4, true);


--
-- Name: Company_company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Company_company_id_seq"', 1, false);


--
-- Name: EnterExit_enter_exit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EnterExit_enter_exit_id_seq"', 97, true);


--
-- Name: Gender_gender_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gender_gender_id_seq"', 92, true);


--
-- Name: Incident_incident_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Incident_incident_id_seq"', 1, false);


--
-- Name: MaintenanceLog_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MaintenanceLog_log_id_seq"', 1, false);


--
-- Name: Movement_movement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Movement_movement_id_seq"', 1, false);


--
-- Name: Person_person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Person_person_id_seq"', 127, true);


--
-- Name: SecurityLog_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SecurityLog_log_id_seq"', 1, false);


--
-- Name: UserCameraAccess_access_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserCameraAccess_access_id_seq"', 1, false);


--
-- Name: Age Age_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Age"
    ADD CONSTRAINT "Age_pkey" PRIMARY KEY (id);


--
-- Name: AppUser AppUser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AppUser"
    ADD CONSTRAINT "AppUser_pkey" PRIMARY KEY (id);


--
-- Name: AppUser AppUser_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AppUser"
    ADD CONSTRAINT "AppUser_username_key" UNIQUE (username);


--
-- Name: Branch Branch_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Branch"
    ADD CONSTRAINT "Branch_pkey" PRIMARY KEY (id);


--
-- Name: Camera Camera_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camera"
    ADD CONSTRAINT "Camera_pkey" PRIMARY KEY (id);


--
-- Name: Company Company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY (id);


--
-- Name: Company Company_registration_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_registration_number_key" UNIQUE (registration_number);


--
-- Name: EnterExit EnterExit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EnterExit"
    ADD CONSTRAINT "EnterExit_pkey" PRIMARY KEY (id);


--
-- Name: Gender Gender_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gender"
    ADD CONSTRAINT "Gender_pkey" PRIMARY KEY (id);


--
-- Name: Incident Incident_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Incident"
    ADD CONSTRAINT "Incident_pkey" PRIMARY KEY (id);


--
-- Name: MaintenanceLog MaintenanceLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MaintenanceLog"
    ADD CONSTRAINT "MaintenanceLog_pkey" PRIMARY KEY (id);


--
-- Name: Movement Movement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movement"
    ADD CONSTRAINT "Movement_pkey" PRIMARY KEY (movement_id);


--
-- Name: Person Person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Person"
    ADD CONSTRAINT "Person_pkey" PRIMARY KEY (id);


--
-- Name: SecurityLog SecurityLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SecurityLog"
    ADD CONSTRAINT "SecurityLog_pkey" PRIMARY KEY (id);


--
-- Name: UserCameraAccess UserCameraAccess_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCameraAccess"
    ADD CONSTRAINT "UserCameraAccess_pkey" PRIMARY KEY (id);


--
-- Name: Age Age_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Age"
    ADD CONSTRAINT "Age_person_id_fkey" FOREIGN KEY (person_id) REFERENCES public."Person"(id);


--
-- Name: AppUser AppUser_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AppUser"
    ADD CONSTRAINT "AppUser_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES public."Branch"(id);


--
-- Name: Branch Branch_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Branch"
    ADD CONSTRAINT "Branch_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."Company"(id);


--
-- Name: Camera Camera_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camera"
    ADD CONSTRAINT "Camera_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES public."Branch"(id);


--
-- Name: EnterExit EnterExit_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EnterExit"
    ADD CONSTRAINT "EnterExit_person_id_fkey" FOREIGN KEY (person_id) REFERENCES public."Person"(id);


--
-- Name: Gender Gender_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gender"
    ADD CONSTRAINT "Gender_person_id_fkey" FOREIGN KEY (person_id) REFERENCES public."Person"(id);


--
-- Name: Incident Incident_camera_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Incident"
    ADD CONSTRAINT "Incident_camera_id_fkey" FOREIGN KEY (camera_id) REFERENCES public."Camera"(id);


--
-- Name: MaintenanceLog MaintenanceLog_camera_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MaintenanceLog"
    ADD CONSTRAINT "MaintenanceLog_camera_id_fkey" FOREIGN KEY (camera_id) REFERENCES public."Camera"(id);


--
-- Name: Movement Movement_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movement"
    ADD CONSTRAINT "Movement_person_id_fkey" FOREIGN KEY (person_id) REFERENCES public."Person"(id);


--
-- Name: Person Person_camera_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Person"
    ADD CONSTRAINT "Person_camera_id_fkey" FOREIGN KEY (camera_id) REFERENCES public."Camera"(id);


--
-- Name: SecurityLog SecurityLog_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SecurityLog"
    ADD CONSTRAINT "SecurityLog_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."AppUser"(id);


--
-- Name: UserCameraAccess UserCameraAccess_camera_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCameraAccess"
    ADD CONSTRAINT "UserCameraAccess_camera_id_fkey" FOREIGN KEY (camera_id) REFERENCES public."Camera"(id);


--
-- Name: UserCameraAccess UserCameraAccess_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCameraAccess"
    ADD CONSTRAINT "UserCameraAccess_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."AppUser"(id);


--
-- Name: UserCameraAccess fk_access_camera; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCameraAccess"
    ADD CONSTRAINT fk_access_camera FOREIGN KEY (camera_id) REFERENCES public."Camera"(id);


--
-- Name: UserCameraAccess fk_access_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCameraAccess"
    ADD CONSTRAINT fk_access_user FOREIGN KEY (user_id) REFERENCES public."AppUser"(id);


--
-- Name: Age fk_age_person; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Age"
    ADD CONSTRAINT fk_age_person FOREIGN KEY (person_id) REFERENCES public."Person"(id);


--
-- Name: Branch fk_branch_company; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Branch"
    ADD CONSTRAINT fk_branch_company FOREIGN KEY (company_id) REFERENCES public."Company"(id);


--
-- Name: Branch fk_branch_parent; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Branch"
    ADD CONSTRAINT fk_branch_parent FOREIGN KEY (parent_branch_id) REFERENCES public."Branch"(id);


--
-- Name: Camera fk_camera_branch; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camera"
    ADD CONSTRAINT fk_camera_branch FOREIGN KEY (branch_id) REFERENCES public."Branch"(id);


--
-- Name: EnterExit fk_enterexit_person; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EnterExit"
    ADD CONSTRAINT fk_enterexit_person FOREIGN KEY (person_id) REFERENCES public."Person"(id);


--
-- Name: Gender fk_gender_person; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gender"
    ADD CONSTRAINT fk_gender_person FOREIGN KEY (person_id) REFERENCES public."Person"(id);


--
-- Name: Incident fk_incident_camera; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Incident"
    ADD CONSTRAINT fk_incident_camera FOREIGN KEY (camera_id) REFERENCES public."Camera"(id);


--
-- Name: MaintenanceLog fk_log_camera; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MaintenanceLog"
    ADD CONSTRAINT fk_log_camera FOREIGN KEY (camera_id) REFERENCES public."Camera"(id);


--
-- Name: SecurityLog fk_log_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SecurityLog"
    ADD CONSTRAINT fk_log_user FOREIGN KEY (user_id) REFERENCES public."AppUser"(id);


--
-- Name: Movement fk_movement_person; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movement"
    ADD CONSTRAINT fk_movement_person FOREIGN KEY (person_id) REFERENCES public."Person"(id);


--
-- Name: Person fk_person_camera; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Person"
    ADD CONSTRAINT fk_person_camera FOREIGN KEY (camera_id) REFERENCES public."Camera"(id);


--
-- Name: AppUser fk_user_branch; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AppUser"
    ADD CONSTRAINT fk_user_branch FOREIGN KEY (branch_id) REFERENCES public."Branch"(id);


--
-- PostgreSQL database dump complete
--

