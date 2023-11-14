import requests
from bs4 import BeautifulSoup
from stemming.porter2 import stem
import logging
import csv
import os
import re
import nltk

# Download necessary NLTK resources (only needs to be done once)
nltk.download('averaged_perceptron_tagger')

class WebCrawler:
    def __init__(self, base_url, max_depth, output_dir):
        self.base_url = base_url
        self.max_depth = max_depth
        self.output_dir = output_dir
        logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

    def get_page(self, url):
        try:
            with requests.get(url) as response:
                response.raise_for_status()
                return response.text
        except requests.exceptions.RequestException as e:
            logging.error(f"Error fetching {url}: {e}")
            return None

    def parse_page(self, html):
        try:
            soup = BeautifulSoup(html, 'html.parser')
            title = stem(soup.title.text) if soup.title else ''
            data = {
                'title': title,
                'subtitles': [stem(subtitle.text) for subtitle in soup.find_all(['h2', 'h3', 'h4', 'h5', 'h6'])],
                'text': [stem(paragraph.text) for paragraph in soup.find_all('p')],
                'images': [{'address': image['src'], 'alt_text': stem(image.get('alt', ''))} for image in soup.find_all('img')],
                'page_info': {
                    'references': [reference['href'] for reference in soup.find_all('a', href=True)],
                    'authors': [author['content'] for author in soup.find_all('meta', {'name': 'author'})],
                    'link': soup.find('link', {'rel': 'canonical'})['href'] if soup.find('link', {'rel': 'canonical'}) else None,
                    'description': soup.find('meta', {'name': 'description'})['content'] if soup.find('meta', {'name': 'description'}) else None,
                    'tags': self.get_tags(soup)
                }
            }
            return data
        except Exception as e:
            logging.error(f"Error parsing page: {e}")
            return None

    def get_tags(self, soup):
        words = nltk.word_tokenize(soup.get_text())
        tags = nltk.pos_tag(words)
        return tags

    def sanitize_filename(self, filename):
        # Remove problematic characters from the filename
        return re.sub(r'[^\w\s.-]', '', filename)

    def save_to_csv(self, data, page_url):
        try:
            # Use the sanitized title for naming the CSV file, or a portion of the URL if title is not available
            title = data['title'] if data['title'] else re.sub(r'\W+', '', page_url)[:50]
            sanitized_title = self.sanitize_filename(title)
            output_file = os.path.join(self.output_dir, f"{sanitized_title}.csv")

            with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
                fieldnames = ['title', 'subtitles', 'text', 'images', 'page_info']
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerow(data)
                logging.info(f"Saved data to CSV file: {output_file}")
        except Exception as e:
            logging.error(f"Error writing to CSV file: {e}")

    def clear_output_directory(self):
        # Remove all files from the output directory
        for file_name in os.listdir(self.output_dir):
            file_path = os.path.join(self.output_dir, file_name)
            try:
                if os.path.isfile(file_path):
                    os.unlink(file_path)
            except Exception as e:
                logging.error(f"Error deleting file {file_path}: {e}")

    def crawl(self, url, depth):
        if depth == 0:
            return
        logging.info(f"Crawling: {url}, Depth: {depth}")

        html = self.get_page(url)
        if html:
            data = self.parse_page(html)
            if data:
                self.save_to_csv(data, url)
                for link in data['page_info']['references']:
                    self.crawl(link, depth - 1)

if __name__ == "__main__":
    base_url = 'https://en.wikipedia.org/wiki/Web_crawler'
    max_depth = 2
    output_dir = 'output_pages'

    # Create the output directory or clear it if it already exists
    os.makedirs(output_dir, exist_ok=True)
    
    logging.info("Clearing output directory...")
    crawler = WebCrawler(base_url, max_depth, output_dir)
    crawler.clear_output_directory()

    logging.info("Starting web crawling process...")
    crawler.crawl(base_url, max_depth)
    logging.info("Web crawling process completed.")
