--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Department" (
    id integer NOT NULL,
    "departmentName" text NOT NULL
);


ALTER TABLE public."Department" OWNER TO postgres;

--
-- Name: Department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Department_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Department_id_seq" OWNER TO postgres;

--
-- Name: Department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Department_id_seq" OWNED BY public."Department".id;


--
-- Name: Event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event" (
    id integer NOT NULL,
    "eventName" text NOT NULL,
    "eventDate" timestamp(3) without time zone
);


ALTER TABLE public."Event" OWNER TO postgres;

--
-- Name: EventRating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EventRating" (
    id integer NOT NULL,
    "eventId" integer NOT NULL,
    point double precision NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."EventRating" OWNER TO postgres;

--
-- Name: EventRating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EventRating_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."EventRating_id_seq" OWNER TO postgres;

--
-- Name: EventRating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EventRating_id_seq" OWNED BY public."EventRating".id;


--
-- Name: Event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Event_id_seq" OWNER TO postgres;

--
-- Name: Event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_id_seq" OWNED BY public."Event".id;


--
-- Name: Groupe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Groupe" (
    id integer NOT NULL,
    "groupeName" text NOT NULL,
    "departmentId" integer NOT NULL
);


ALTER TABLE public."Groupe" OWNER TO postgres;

--
-- Name: Groupe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Groupe_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Groupe_id_seq" OWNER TO postgres;

--
-- Name: Groupe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Groupe_id_seq" OWNED BY public."Groupe".id;


--
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Role_id_seq" OWNER TO postgres;

--
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- Name: Student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Student" (
    id integer NOT NULL,
    "fullName" text NOT NULL,
    "groupeId" integer NOT NULL,
    "dateOfBirth" text,
    gender text
);


ALTER TABLE public."Student" OWNER TO postgres;

--
-- Name: StudentEvent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StudentEvent" (
    id integer NOT NULL,
    "studentId" integer NOT NULL,
    "eventId" integer NOT NULL,
    point integer NOT NULL
);


ALTER TABLE public."StudentEvent" OWNER TO postgres;

--
-- Name: StudentEvent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."StudentEvent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."StudentEvent_id_seq" OWNER TO postgres;

--
-- Name: StudentEvent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."StudentEvent_id_seq" OWNED BY public."StudentEvent".id;


--
-- Name: Student_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Student_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Student_id_seq" OWNER TO postgres;

--
-- Name: Student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Student_id_seq" OWNED BY public."Student".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    "fullName" text NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    "roleId" integer NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Department id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Department" ALTER COLUMN id SET DEFAULT nextval('public."Department_id_seq"'::regclass);


--
-- Name: Event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event" ALTER COLUMN id SET DEFAULT nextval('public."Event_id_seq"'::regclass);


--
-- Name: EventRating id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventRating" ALTER COLUMN id SET DEFAULT nextval('public."EventRating_id_seq"'::regclass);


--
-- Name: Groupe id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groupe" ALTER COLUMN id SET DEFAULT nextval('public."Groupe_id_seq"'::regclass);


--
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- Name: Student id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student" ALTER COLUMN id SET DEFAULT nextval('public."Student_id_seq"'::regclass);


--
-- Name: StudentEvent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentEvent" ALTER COLUMN id SET DEFAULT nextval('public."StudentEvent_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Department" (id, "departmentName") FROM stdin;
1	Отделение креативных индустрий
2	Отделение программирования
3	Отделение экономики
4	Отделение ИТ и БПЛА
\.


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event" (id, "eventName", "eventDate") FROM stdin;
13	gggg	2024-03-12 00:00:00
5	Региональный этап профессионального мастерства «Профессионалы»	2024-08-30 00:00:00
1	Урок Цифры	2024-12-19 00:00:00
10	Промежуточная аттестация	2024-06-05 00:00:00
6	День открытых дверей (с презентацией лабораторий и мастерских)	2024-08-18 00:00:00
3	Мастер классы к 23 февраля	2024-10-23 00:00:00
9	Открытая лекция «Как продать свою идею» с приглашенным спикером	2024-01-23 00:00:00
4	РУМО	2024-01-03 00:00:00
8	Выездная съемка видеоролика	2025-01-09 00:00:00
7	Мастер-класс по деловому этикету и самопрезентации с приглашенным спикером	2024-01-04 00:00:00
2	Мастер классы к 8 марта	2024-12-06 00:00:00
\.


--
-- Data for Name: EventRating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EventRating" (id, "eventId", point, "userId") FROM stdin;
\.


--
-- Data for Name: Groupe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Groupe" (id, "groupeName", "departmentId") FROM stdin;
1	3пк1	2
2	2бу1	3
3	2р1	1
4	3са1	4
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" (id, name) FROM stdin;
1	admin
2	Директор
3	Зам. директора
4	Преподаватель
\.


--
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Student" (id, "fullName", "groupeId", "dateOfBirth", gender) FROM stdin;
1	Акуленкова Юлия Михайловна	1	31.03.2006	Женщина
2	Анпилогов Тимофей Валерьевич	1	30.08.2006	Мужчина
3	Арзамасцев Даниил Михайлович	1	27.02.2006	Мужчина
4	Гришкова Виктория Викторовна	1	20.06.2007	Женщина
5	Дубровский Андрей Сергеевич	1	25.10.2007	Мужчина
6	Зубкова Надежда Сергеевна	1	16.05.2006	Женщина
7	Кабанов Илья Владимирович	1	06.11.2006	Мужчина
8	Кантурлеев Арман Базарбаевич	1	17.05.2006	Мужчина
9	Касаткин Александр Геннадьевич	1	22.11.2006	Мужчина
10	Кинзабаева Нурсиля Зульфитдиновна	1	12.05.2006	Женщина
11	Кузнецов Иван Юрьевич	1	16.10.2007	Мужчина
12	Макеев Артём Константинович	1	31.07.2006	Мужчина
13	Митрофанов Никита Александрович	1	01.02.2007	Мужчина
14	Петашвили Кирилл Александрович	1	26.06.2007	Мужчина
15	Росляков Сергей Сергеевич	1	08.06.2006	Мужчина
16	Сагайдак Кирилл Дмитриевич	1	08.11.2006	Мужчина
17	Садиков Виталий Дмитриевич	1	06.07.2007	Мужчина
18	Скоморохов Егор Константинович	1	22.08.2007	Мужчина
19	Тувышкина Анастасия Денисовна	1	28.06.2006	Женщина
20	Тушев Дмитрий Александрович	1	24.06.2006	Мужчина
21	Шкуратова Мария Николаевна	1	15.08.2007	Женщина
22	Яценко Алексей Александрович	1	11.01.2006	Мужчина
23	Веденина Варвара Дмитриевна	2	24.12.2007	Женщина
24	Демубаева Аделина Марселевна	2	27.04.2006	Женщина
25	Дмитриева Алёна Витальевна	2	24.07.2006	Женщина
26	Жук Елизавета Евгеньевна	2	11.09.2007	Мужчина
27	Зюзина Татьяна Олеговна	2	16.03.2006	Женщина
28	Калинкина Софья Николаевна	2	16.08.2007	Женщина
29	Косарева Арина Дмитриевна	2	28.10.2007	Женщина
30	Кугучева Арина Алексеевна	2	17.07.2007	Женщина
31	Латуга Анна Александровна	2	06.07.2007	Женщина
32	Левченко Дарья Витальевна	2	08.07.2006	Мужчина
33	Лешина Наталья Валерьевна	2	05.11.2007	Женщина
34	Любченко Семён Дмитриевич	2	29.09.2006	Мужчина
35	Маркова Екатерина Владимировна	2	12.03.2007	Женщина
36	Моторин Александр Александрович	2	28.07.2007	Мужчина
37	Никулина Наталья Игоревна	2	26.02.2007	Женщина
38	Овчинникова Олеся Сергеевна	2	05.10.2006	Женщина
39	Потапова Дарья Сергеевна	2	02.04.2007	Женщина
40	Провоторов Николай Алексеевич	2	28.08.2006	Мужчина
41	Саблина Ирина Андреевна	2	11.11.2006	Женщина
42	Солдатова Вероника Сергеевна	2	25.12.2007	Женщина
43	Споршева Юлия Юрьевна	2	16.04.2006	Женщина
44	Унчур Наталья Олеговна	2	21.08.2006	Мужчина
45	Утегенова Динара Нурбековна	2	25.05.2007	Женщина
46	Черемисина Полина Андреевна	2	22.02.2007	Женщина
47	Ярыгина Татьяна Валерьевна	2	03.10.2006	Женщина
48	Акимова Кира Владимировна	3	16.08.2006	Женщина
49	Андреянков Арсений Андреевич	3	12.09.2007	Мужчина
50	Атапина Дарья Денисовна	3	01.11.2006	Женщина
51	Багмет Дарья Владимировна	3	15.03.2006	Мужчина
52	Биктимирова Лина Халимовна	3	22.07.2007	Женщина
53	Борисова Надежда Дмитриевна	3	02.05.2007	Женщина
54	Бурлуцкий Виктор Евгеньевич	3	18.07.2006	Мужчина
55	Гребенникова Елена Александровна	3	25.11.2006	Женщина
56	Дахненко Мария Сергеевна	3	15.03.2006	Мужчина
57	Дымбовская Алина Руслановна	3	07.07.2007	Женщина
58	Еремина Вероника Денисовна	3	07.12.2007	Женщина
59	Кашина Татьяна Владимировна	3	30.03.2007	Женщина
60	Комарова Евгения Игоревна	3	18.03.2006	Женщина
61	Коршева Виктория Викторовна	3	23.08.2007	Женщина
62	Красуля Надежда Алексеевна	3	03.04.2007	Женщина
63	Ласыгина Ксения Александровна	3	26.12.2006	Женщина
64	Мазилкина Дарья Александровна	3	19.10.2007	Женщина
65	Новикова Анастасия Сергеевна	3	14.11.2006	Женщина
66	Плотникова Екатерина Алексеевна	3	16.03.2007	Женщина
67	Поповкина Арина Александровна	3	06.10.2007	Женщина
68	Пронина Ульяна Сергеевна	3	21.07.2007	Женщина
69	Рыбалкина Мария Викторовна	3	29.09.2007	Женщина
70	Сергазиева Айша Адельевна	3	31.05.2007	Женщина
71	Скорикова София Сергеевна	3	06.11.2006	Женщина
72	Скороварова Мария Антоновна	3	05.01.2007	Женщина
73	Соколова Софья Владимировна	3	10.12.2006	Женщина
74	Сусина Елизавета Витальевна	3	06.04.2007	Женщина
75	Федорова Алёна Анатольевна	3	22.05.2006	Женщина
76	Андакулов Алимхан Юлианович	4	21.03.2006	Мужчина
77	Асяев Радик Морисович	4	07.01.2007	Мужчина
78	Баширов Глеб Радикович	4	22.03.2006	Мужчина
79	Боровина Анастасия Андреевна	4	14.01.2006	Женщина
80	Бородин Иван Евгеньевич	4	10.09.2007	Мужчина
81	Высоцкий Глеб Олегович	4	14.02.2006	Мужчина
82	Головченко Данила Александрович	4	25.12.2006	Мужчина
83	Горбунов Алексей Евгеньевич	4	05.03.2007	Мужчина
84	Дадобоев Даниил Забехуллоевич	4	25.11.2006	Мужчина
85	Деревянко Кирилл Романович	4	26.10.2007	Мужчина
86	Исмаилова Руслана Руслановна	4	18.08.2007	Женщина
87	Ковальчук Никита Валерьевич	4	03.10.2006	Мужчина
88	Кругликова Анастасия Алексеевна	4	08.09.2007	Женщина
89	Липунов Дмитрий Иванович	4	04.04.2007	Мужчина
90	Матросов Дмитрий Владимирович	4	14.07.2006	Мужчина
91	Набокина Яна Александровна	4	04.10.2006	Женщина
92	Портной Никита Викторович	4	23.08.2007	Мужчина
93	Рублев Илья Игоревич	4	24.08.2006	Мужчина
94	Сайфулин Альберт Тагирович	4	19.05.2006	Мужчина
95	Самуд Эмин Хамидуллаевич	4	02.09.2006	Мужчина
96	Свириденко Дмитрий Сергеевич	4	26.04.2006	Мужчина
97	Стеновский Андрей Михайлович	4	24.06.2006	Мужчина
98	Фаттахова Азалия Юнировна	4	03.06.2007	Женщина
99	Федорова Арина Сергеевна	4	09.08.2007	Женщина
100	Хайрулин Роман Русланович	4	30.04.2007	Мужчина
101	Цаюков Артем Александрович	4	21.09.2006	Мужчина
\.


--
-- Data for Name: StudentEvent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StudentEvent" (id, "studentId", "eventId", point) FROM stdin;
51	11	3	0
52	11	4	0
313	11	5	0
314	11	6	0
53	12	1	0
54	12	2	0
55	12	3	0
56	12	4	0
1	1	1	1
2	1	2	1
3	1	3	0
4	1	4	0
253	1	5	0
254	1	6	0
5	2	1	0
6	2	2	1
7	2	3	0
8	2	4	0
259	2	5	0
260	2	6	0
17	3	1	0
18	3	2	0
19	3	3	0
20	3	4	0
265	3	5	0
266	3	6	0
21	4	1	0
22	4	2	0
23	4	3	0
24	4	4	0
271	4	5	0
272	4	6	0
25	5	1	0
26	5	2	0
27	5	3	0
28	5	4	0
277	5	5	0
278	5	6	0
29	6	1	0
30	6	2	0
31	6	3	0
32	6	4	0
283	6	5	0
284	6	6	0
33	7	1	0
34	7	2	0
35	7	3	0
36	7	4	0
289	7	5	0
290	7	6	0
37	8	1	0
38	8	2	0
39	8	3	0
40	8	4	0
295	8	5	0
296	8	6	0
41	9	1	0
42	9	2	0
43	9	3	0
44	9	4	0
301	9	5	0
302	9	6	0
45	10	1	0
46	10	2	0
47	10	3	0
319	12	5	0
320	12	6	0
57	13	1	0
58	13	2	0
59	13	3	0
60	13	4	0
325	13	5	0
326	13	6	0
61	14	1	0
62	14	2	0
63	14	3	0
64	14	4	0
331	14	5	0
332	14	6	0
65	15	1	0
66	15	2	0
67	15	3	0
68	15	4	0
337	15	5	0
338	15	6	0
69	16	1	0
70	16	2	0
71	16	3	0
72	16	4	0
343	16	5	0
344	16	6	0
73	17	1	0
74	17	2	0
75	17	3	0
76	17	4	0
349	17	5	0
350	17	6	0
229	18	1	0
230	18	2	0
149	20	1	0
150	20	2	0
151	20	3	0
152	20	4	0
367	20	5	0
368	20	6	0
153	21	1	0
154	21	2	0
155	21	3	0
156	21	4	0
373	21	5	0
374	21	6	0
157	22	1	0
158	22	2	0
159	22	3	0
160	22	4	0
379	22	5	0
380	22	6	0
48	10	4	0
307	10	5	0
308	10	6	0
49	11	1	0
50	11	2	0
231	18	3	0
232	18	4	0
355	18	5	0
356	18	6	0
145	19	1	0
146	19	2	0
147	19	3	0
148	19	4	0
361	19	5	0
362	19	6	0
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, "fullName", login, password, "roleId") FROM stdin;
1	Садиков Виталий Дмитриевич	vitaly.sadikov	$2b$10$leK2dKND5tcn90FMjOk5L.bVRnGebdgP3KpZZNLKHAsZODExF2cL6	1
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a37b0154-ddfe-4ed1-8124-4358e91cb8ad	044c393207482ed651f9da3ce0afbeb5d0e1507224eae7564d44653c7729adcd	2025-02-28 13:45:47.399645+05	20250228084547_init	\N	\N	2025-02-28 13:45:47.360416+05	1
57b39437-9857-4aac-9015-4454e412c9fa	ee2ceb5c0674172f6cdc86f86cb7461a172055b4316d94fb2b9e4af8514a64a3	2025-03-01 12:15:27.646276+05	20250301071527_add_journal	\N	\N	2025-03-01 12:15:27.623034+05	1
0066c219-0d55-40e0-a2a0-d33326c43660	67dd08f54f35f2cda5d5ca47ca65d728171277c5df27e42210eac0fb373cff15	2025-03-01 12:35:48.587377+05	20250301073548_fix_journal	\N	\N	2025-03-01 12:35:48.579077+05	1
77fc2f98-0872-4a16-b78a-bac43744c236	825db03439b5f34fbca238dfb949f1063d298ea3167e4b84889885b73ad7f294	2025-03-03 11:44:58.079594+05	20250303064458_add_event	\N	\N	2025-03-03 11:44:58.048913+05	1
1f08ba22-4304-434f-ad7f-b6277545e492	90283135e6fe2a5d620ad860f3f8878169cf39e7405e67fe25b2a5525fb35769	2025-03-03 12:34:59.394003+05	20250303073459_edit_event	\N	\N	2025-03-03 12:34:59.388372+05	1
1a32c205-3401-4bef-9439-7121b5cf7e73	f3fa6908fd6e2bd8c15da4fbfeb5e2116ac9cb51e1707b317b0124566b56f4b9	2025-03-10 12:51:22.703483+05	20250310075122_edit_student_event	\N	\N	2025-03-10 12:51:22.687247+05	1
0f8ff07c-b476-44c3-bd41-e022f4c73c93	580fb9bbeee2d181aa06f10e1a66b9266de6e0792ab2f3b373a3635ccb548e17	2025-03-13 12:46:41.6782+05	20250313074641_add_user	\N	\N	2025-03-13 12:46:41.648662+05	1
de7aac08-b4f4-4ac9-9898-bb97515e5233	828985e3c11af95f8f8449d11e8eda616be810ca589c89d0512f14968ba3b298	2025-03-14 10:34:52.379458+05	20250314053452_add_roles	\N	\N	2025-03-14 10:34:52.347402+05	1
665a982f-7a38-47dd-8cec-f0cbb079fd3b	f6248259d67c34b5afe8fb5ac8caac373e751ba59431540f6a7998378d4b76cf	2025-03-18 20:25:04.410612+05	20250318152504_gender_birth	\N	\N	2025-03-18 20:25:04.403245+05	1
8403c9a1-9078-4281-84a4-4d21b4a19dcd	577b78c7058059b3ac877dd27f0997bf9bee3a404a96499ad6a97d8c8ab7df3b	2025-03-19 10:28:31.546156+05	20250319052831_date_time	\N	\N	2025-03-19 10:28:31.534854+05	1
1dc12feb-f4e5-444a-9292-0effbfdce25e	0dfbac8416af7fcf556f0e5fdc64a3d9a60be8b69971599676d97dea50faf875	2025-03-21 11:37:26.669518+05	20250321063726_event_rating	\N	\N	2025-03-21 11:37:26.650286+05	1
\.


--
-- Name: Department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Department_id_seq"', 4, true);


--
-- Name: EventRating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EventRating_id_seq"', 1, false);


--
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_id_seq"', 13, true);


--
-- Name: Groupe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Groupe_id_seq"', 4, true);


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Role_id_seq"', 4, true);


--
-- Name: StudentEvent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."StudentEvent_id_seq"', 380, true);


--
-- Name: Student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Student_id_seq"', 101, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- Name: Department Department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY (id);


--
-- Name: EventRating EventRating_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventRating"
    ADD CONSTRAINT "EventRating_pkey" PRIMARY KEY (id);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: Groupe Groupe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groupe"
    ADD CONSTRAINT "Groupe_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: StudentEvent StudentEvent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentEvent"
    ADD CONSTRAINT "StudentEvent_pkey" PRIMARY KEY (id);


--
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- Name: StudentEvent_studentId_eventId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "StudentEvent_studentId_eventId_key" ON public."StudentEvent" USING btree ("studentId", "eventId");


--
-- Name: User_login_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_login_key" ON public."User" USING btree (login);


--
-- Name: EventRating EventRating_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventRating"
    ADD CONSTRAINT "EventRating_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: EventRating EventRating_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventRating"
    ADD CONSTRAINT "EventRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Groupe Groupe_departmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groupe"
    ADD CONSTRAINT "Groupe_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES public."Department"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StudentEvent StudentEvent_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentEvent"
    ADD CONSTRAINT "StudentEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StudentEvent StudentEvent_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentEvent"
    ADD CONSTRAINT "StudentEvent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Student Student_groupeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES public."Groupe"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

