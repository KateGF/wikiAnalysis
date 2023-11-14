#!/usr/bin/env python

import sys
import mysql.connector
from stemming.porter2 import stem

# Connect to MariaDB
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="wiki",
    port = 3306
)
cursor = db_connection.cursor()

# Variables para rastrear información durante el procesamiento de la página actual
page_id = None
distinct_words = set()
references_with_links = 0
active_links_count = 0
alt_text_words = set()
most_common_words = {}

for line in sys.stdin:
    data = line.strip().split('\t')
    
    if data[0] == 'PAGE_ID':
        # Nueva página, inicializar variables
        page_id = int(data[1])
        distinct_words = set()
        references_with_links = 0
        active_links_count = 0
        alt_text_words = set()
        most_common_words = {}
    else:
        word, count = data
        count = int(count)

        # Insertar la palabra y el recuento en la tabla `word_counts`
        insert_word_query = """
            INSERT INTO `word_counts` (`page_id`, `word`, `count`)
            VALUES (%s, %s, %s)
        """
        cursor.execute(insert_word_query, (page_id, word, count))
        db_connection.commit()

        # Actualizar información para otras tablas
        distinct_words.add(word)

        if word in most_common_words:
            most_common_words[word] += count
        else:
            most_common_words[word] = count

        # Agregar lógica para otras tablas (referencias, imágenes, etc.)

# Insertar información recopilada en la tabla `page_info`
distinct_words_count = len(distinct_words)
most_common_words_str = ",".join([f"{k}:{v}" for k, v in most_common_words.items()])

insert_page_info_query = """
    INSERT INTO `page_info` (
        `page_id`, 
        `title_count`, 
        `distinct_words_count`, 
        `references_with_links`, 
        `active_links_count`, 
        `images_with_alt`, 
        `distinct_alt_text_count`, 
        `most_common_words`
    )
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
"""
cursor.execute(insert_page_info_query, (
    page_id,  # page_id
    0,  # title_count (ajustar según tus necesidades)
    distinct_words_count,
    references_with_links,
    active_links_count,
    0,  # images_with_alt (ajustar según tus necesidades)
    0,  # distinct_alt_text_count (ajustar según tus necesidades)
    most_common_words_str
))
db_connection.commit()

# Cerrar la conexión a MariaDB
cursor.close()
db_connection.close()