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
    "eventName" text NOT NULL
);


ALTER TABLE public."Event" OWNER TO postgres;

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
-- Name: Student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Student" (
    id integer NOT NULL,
    "fullName" text NOT NULL,
    "groupeId" integer NOT NULL
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
-- Name: Groupe id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groupe" ALTER COLUMN id SET DEFAULT nextval('public."Groupe_id_seq"'::regclass);


--
-- Name: Student id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student" ALTER COLUMN id SET DEFAULT nextval('public."Student_id_seq"'::regclass);


--
-- Name: StudentEvent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentEvent" ALTER COLUMN id SET DEFAULT nextval('public."StudentEvent_id_seq"'::regclass);


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

COPY public."Event" (id, "eventName") FROM stdin;
1	Хакатон
2	8 марта
3	Чемпионат
4	23 февраля
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
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Student" (id, "fullName", "groupeId") FROM stdin;
1	Акуленкова Юлия Михайловна	1
2	Анпилогов Тимофей Валерьевич	1
3	Арзамасцев Даниил Михайлович	1
4	Гришкова Виктория Викторовна	1
5	Дубровский Андрей Сергеевич	1
6	Зубкова Надежда Сергеевна	1
7	Кабанов Илья Владимирович	1
8	Кантурлеев Арман Базарбаевич	1
9	Касаткин Александр Геннадьевич	1
10	Кинзабаева Нурсиля Зульфитдиновна	1
11	Кузнецов Иван Юрьевич	1
12	Макеев Артём Константинович	1
13	Митрофанов Никита Александрович	1
14	Петашвили Кирилл Александрович	1
15	Росляков Сергей Сергеевич	1
16	Сагайдак Кирилл Дмитриевич	1
17	Садиков Виталий Дмитриевич	1
18	Скоморохов Егор Константинович	1
19	Тувышкина Анастасия Денисовна	1
20	Тушев Дмитрий Александрович	1
21	Шкуратова Мария Николаевна	1
22	Яценко Алексей Александрович	1
23	Веденина Варвара Дмитриевна	2
24	Демубаева Аделина Марселевна	2
25	Дмитриева Алёна Витальевна	2
26	Жук Елизавета Евгеньевна	2
27	Зюзина Татьяна Олеговна	2
28	Калинкина Софья Николаевна	2
29	Косарева Арина Дмитриевна	2
30	Кугучева Арина Алексеевна	2
31	Латуга Анна Александровна	2
32	Левченко Дарья Витальевна	2
33	Лешина Наталья Валерьевна	2
34	Любченко Семён Дмитриевич	2
35	Маркова Екатерина Владимировна	2
36	Моторин Александр Александрович	2
37	Никулина Наталья Игоревна	2
38	Овчинникова Олеся Сергеевна	2
39	Потапова Дарья Сергеевна	2
40	Провоторов Николай Алексеевич	2
41	Саблина Ирина Андреевна	2
42	Солдатова Вероника Сергеевна	2
43	Споршева Юлия Юрьевна	2
44	Унчур Наталья Олеговна	2
45	Утегенова Динара Нурбековна	2
46	Черемисина Полина Андреевна	2
47	Ярыгина Татьяна Валерьевна	2
48	Акимова Кира Владимировна	3
49	Андреянков Арсений Андреевич	3
50	Атапина Дарья Денисовна	3
51	Багмет Дарья Владимировна	3
52	Биктимирова Лина Халимовна	3
53	Борисова Надежда Дмитриевна	3
54	Бурлуцкий Виктор Евгеньевич	3
55	Гребенникова Елена Александровна	3
56	Дахненко Мария Сергеевна	3
57	Дымбовская Алина Руслановна	3
58	Еремина Вероника Денисовна	3
59	Кашина Татьяна Владимировна	3
60	Комарова Евгения Игоревна	3
61	Коршева Виктория Викторовна	3
62	Красуля Надежда Алексеевна	3
63	Ласыгина Ксения Александровна	3
64	Мазилкина Дарья Александровна	3
65	Новикова Анастасия Сергеевна	3
66	Плотникова Екатерина Алексеевна	3
67	Поповкина Арина Александровна	3
68	Пронина Ульяна Сергеевна	3
69	Рыбалкина Мария Викторовна	3
70	Сергазиева Айша Адельевна	3
71	Скорикова София Сергеевна	3
72	Скороварова Мария Антоновна	3
73	Соколова Софья Владимировна	3
74	Сусина Елизавета Витальевна	3
75	Федорова Алёна Анатольевна	3
76	Андакулов Алимхан Юлианович	4
77	Асяев Радик Морисович	4
78	Баширов Глеб Радикович	4
79	Боровина Анастасия Андреевна	4
80	Бородин Иван Евгеньевич	4
81	Высоцкий Глеб Олегович	4
82	Головченко Данила Александрович	4
83	Горбунов Алексей Евгеньевич	4
84	Дадобоев Даниил Забехуллоевич	4
85	Деревянко Кирилл Романович	4
86	Исмаилова Руслана Руслановна	4
87	Ковальчук Никита Валерьевич	4
88	Кругликова Анастасия Алексеевна	4
89	Липунов Дмитрий Иванович	4
90	Матросов Дмитрий Владимирович	4
91	Набокина Яна Александровна	4
92	Портной Никита Викторович	4
93	Рублев Илья Игоревич	4
94	Сайфулин Альберт Тагирович	4
95	Самуд Эмин Хамидуллаевич	4
96	Свириденко Дмитрий Сергеевич	4
97	Стеновский Андрей Михайлович	4
98	Фаттахова Азалия Юнировна	4
99	Федорова Арина Сергеевна	4
100	Хайрулин Роман Русланович	4
101	Цаюков Артем Александрович	4
\.


--
-- Data for Name: StudentEvent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StudentEvent" (id, "studentId", "eventId", point) FROM stdin;
1	1	1	1
2	1	2	1
3	1	3	0
4	1	4	0
5	2	1	0
6	2	2	1
7	2	3	0
8	2	4	0
150	20	2	0
151	20	3	0
152	20	4	0
153	21	1	0
154	21	2	0
155	21	3	0
156	21	4	0
157	22	1	0
158	22	2	0
159	22	3	0
160	22	4	0
17	3	1	0
18	3	2	0
19	3	3	0
20	3	4	0
21	4	1	0
22	4	2	0
23	4	3	0
24	4	4	0
25	5	1	0
26	5	2	0
27	5	3	0
28	5	4	0
29	6	1	0
30	6	2	0
31	6	3	0
32	6	4	0
33	7	1	0
34	7	2	0
35	7	3	0
36	7	4	0
37	8	1	0
38	8	2	0
39	8	3	0
40	8	4	0
41	9	1	0
42	9	2	0
43	9	3	0
44	9	4	0
45	10	1	0
46	10	2	0
47	10	3	0
48	10	4	0
49	11	1	0
50	11	2	0
51	11	3	0
52	11	4	0
53	12	1	0
54	12	2	0
55	12	3	0
56	12	4	0
57	13	1	0
58	13	2	0
59	13	3	0
60	13	4	0
61	14	1	0
62	14	2	0
63	14	3	0
64	14	4	0
65	15	1	0
66	15	2	0
67	15	3	0
68	15	4	0
69	16	1	0
70	16	2	0
71	16	3	0
72	16	4	0
73	17	1	0
74	17	2	0
75	17	3	0
76	17	4	0
229	18	1	0
230	18	2	0
231	18	3	0
232	18	4	0
145	19	1	0
146	19	2	0
147	19	3	0
148	19	4	0
149	20	1	0
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
\.


--
-- Name: Department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Department_id_seq"', 4, true);


--
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_id_seq"', 4, true);


--
-- Name: Groupe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Groupe_id_seq"', 4, true);


--
-- Name: StudentEvent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."StudentEvent_id_seq"', 248, true);


--
-- Name: Student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Student_id_seq"', 101, true);


--
-- Name: Department Department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY (id);


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
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: StudentEvent_studentId_eventId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "StudentEvent_studentId_eventId_key" ON public."StudentEvent" USING btree ("studentId", "eventId");


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
-- PostgreSQL database dump complete
--

