PGDMP         :                }            ActivityStudents %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1) %   14.15 (Ubuntu 14.15-0ubuntu0.22.04.1)     :           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ;           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            <           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            =           1262    19804    ActivityStudents    DATABASE     g   CREATE DATABASE "ActivityStudents" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'ru_RU.UTF-8';
 "   DROP DATABASE "ActivityStudents";
                postgres    false            �            1259    19819 
   Department    TABLE     b   CREATE TABLE public."Department" (
    id integer NOT NULL,
    "departmentName" text NOT NULL
);
     DROP TABLE public."Department";
       public         heap    postgres    false            �            1259    19818    Department_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Department_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Department_id_seq";
       public          postgres    false    211            >           0    0    Department_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Department_id_seq" OWNED BY public."Department".id;
          public          postgres    false    210            �            1259    19828    Groupe    TABLE        CREATE TABLE public."Groupe" (
    id integer NOT NULL,
    "groupeName" text NOT NULL,
    "departmentId" integer NOT NULL
);
    DROP TABLE public."Groupe";
       public         heap    postgres    false            �            1259    19827    Groupe_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Groupe_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Groupe_id_seq";
       public          postgres    false    213            ?           0    0    Groupe_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Groupe_id_seq" OWNED BY public."Groupe".id;
          public          postgres    false    212            �            1259    19837    Student    TABLE     z   CREATE TABLE public."Student" (
    id integer NOT NULL,
    "fullName" text NOT NULL,
    "groupeId" integer NOT NULL
);
    DROP TABLE public."Student";
       public         heap    postgres    false            �            1259    19836    Student_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Student_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Student_id_seq";
       public          postgres    false    215            @           0    0    Student_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Student_id_seq" OWNED BY public."Student".id;
          public          postgres    false    214            �            1259    19807    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            �           2604    19822    Department id    DEFAULT     r   ALTER TABLE ONLY public."Department" ALTER COLUMN id SET DEFAULT nextval('public."Department_id_seq"'::regclass);
 >   ALTER TABLE public."Department" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            �           2604    19831 	   Groupe id    DEFAULT     j   ALTER TABLE ONLY public."Groupe" ALTER COLUMN id SET DEFAULT nextval('public."Groupe_id_seq"'::regclass);
 :   ALTER TABLE public."Groupe" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    213    213            �           2604    19840 
   Student id    DEFAULT     l   ALTER TABLE ONLY public."Student" ALTER COLUMN id SET DEFAULT nextval('public."Student_id_seq"'::regclass);
 ;   ALTER TABLE public."Student" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            3          0    19819 
   Department 
   TABLE DATA           <   COPY public."Department" (id, "departmentName") FROM stdin;
    public          postgres    false    211   �!       5          0    19828    Groupe 
   TABLE DATA           D   COPY public."Groupe" (id, "groupeName", "departmentId") FROM stdin;
    public          postgres    false    213   G"       7          0    19837    Student 
   TABLE DATA           ?   COPY public."Student" (id, "fullName", "groupeId") FROM stdin;
    public          postgres    false    215   �"       1          0    19807    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    209   �)       A           0    0    Department_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Department_id_seq"', 4, true);
          public          postgres    false    210            B           0    0    Groupe_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Groupe_id_seq"', 4, true);
          public          postgres    false    212            C           0    0    Student_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Student_id_seq"', 101, true);
          public          postgres    false    214            �           2606    19826    Department Department_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Department" DROP CONSTRAINT "Department_pkey";
       public            postgres    false    211            �           2606    19835    Groupe Groupe_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Groupe"
    ADD CONSTRAINT "Groupe_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Groupe" DROP CONSTRAINT "Groupe_pkey";
       public            postgres    false    213            �           2606    19844    Student Student_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Student" DROP CONSTRAINT "Student_pkey";
       public            postgres    false    215            �           2606    19815 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    209            �           2606    19845    Groupe Groupe_departmentId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Groupe"
    ADD CONSTRAINT "Groupe_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES public."Department"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public."Groupe" DROP CONSTRAINT "Groupe_departmentId_fkey";
       public          postgres    false    211    213    3231            �           2606    19850    Student Student_groupeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES public."Groupe"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Student" DROP CONSTRAINT "Student_groupeId_fkey";
       public          postgres    false    215    213    3233            3      x�m�M
�P�������hŕu'
���b�������#L�afB�3��00�2Θ�b-��pzr�c�D3Clc�l�i�b�+��C������-K�h��ʂ�n���3w��8q������~r9�K      5   7   x��1  ��_ɷ���`e�B�;�����SKp:�� �fn!��{�L      7   �  x��X[v�H��W�̱,?�2�� �'� ��af~lǞ8��l����u��nK-g~n�v=�V�mEsj6ٱٚ�I�Ƥfaf-���}�|�?/��<bA�%fֈ��%�ɬ�|/�Z�?w&�^`�ǖ��m�q�lthh66x�3�l����-s��`ǪU�v��u��9:`���X��ý��@�s]�&�`->JK,��[q��<w��Q���5�Z��wV��A�|�[s���\�m�V��/�Z[��PAIv���Vwl1[;y�2g��Âl���f\"K$2�a#�c˜���w$Q[�@�T�%T�;�L�wI����#Ɛx)�"�7�{�S�q/���%D��<�xa"�3�k��i���QرȸA~I��K��k9y�6��� "}��xTZ��k1+"?�����؞HZ�>j��J��ힼ^J�%���<�@qK�G[S�R�k5�����b@E})�*|x&�`��s��a��әV�LA���y��O�C���V�s��pv;���ғ�*|�e�����k���e��F�b7a󍬞�	NM�t��h�SZ\�﬚e��iv�%��&QT�)���[�y:���ҕJ�*uQ�{жv,L� {9K�!e�PB�҂�K�1id��u�N�+=I~�g��	a�Q�������9 �n�����`R�Ǹ����~@�������X�Jٙ�׿Eu�]hɲ�Gd{t(�qLm]�&=g���;�?>#�s��-	s&}1T�@����ع�����$4K�վ��|.�̃����ϗ� �6?Zp�+��A���$�����r$=9��O9�;���|�^�n������i_����|�������l��;Ӕ��6ܠ$ 6���=qOe�,���|G�H��Z�]�廐C+���h��0G�+{&	��EWd�$O�7z(���l�{J�"�CjNՊ�N�����Q�yAv��ƚ�]~�q��ͩ�*�P�����8��I[-u�:{A����������Qw>.�*�I��uM ��3����*W���������Q��K{8�G�G��ļŗ�6oNW� ��(�7�f^(�|��v�X&�r�[o.s��+U^�,�:~]�Һ��S����]nl:5�r*�������� ّ8��:V�]bAh
�����)��<�u�����*� �'s�s��'�C\����oٻK��̺���vb8��|���|ߵ��R'�3�t�<�YǅE�����~��B�=�(N2z���jxT��>���C�V�VU�)5�Wc�X'�O��s�o ݲnmF�4�������N���V2��%\�N�IQ��<������E'���m2 E�nr�_�Z�L�۷���?r}qNR�=���(��Zu���L�6�m�]�n+nС>2���_��+�>�q��nI����o��!��%���eݻk��ʻ�d,e��~��H=��^�<��N��mI��"W ��v���'WpL�׎�����9�t,��:�[�ޗ��g. ��弗l�鍡ކFʆ'���-�RËu��{�~�Qu_���8sv ��_��Q�:�����)eh�#Zk�t�c����72��w���ш�}D{�[�e,�z�QOqr;_��?*T����g3���,,��~�����X�VC�����	�P����5U�����'p���~�n�U�C��A�L�إ���j1��Q������;�1~���l�Կ�B      1   �   x�m�1
�0F�99E�� ɿ,;��	Ŷ�ҩ���s�m��gĊ�~FB8�ʂ��5�Q�/�ܲ��JxQ>��<��9b�S��� z�8P4O3iݧ/B��$I�qޡ;l˭��wI�R���z/���_W\���c[����-�     