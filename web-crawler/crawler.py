import requests
from bs4 import BeautifulSoup
from stemming.porter2 import stem
import logging

class WebCrawler:
    def __init__(self, base_url, max_depth, output_file):
        self.base_url = base_url
        self.max_depth = max_depth
        self.output_file = output_file
        logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

    def get_page(self, url):
        try:
            response = requests.get( url)
            response.raise_for_status()
            return response.text
        except requests.exceptions.RequestException as e:
            logging.error(f"Error fetching {url}: {e}")
            return None
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                logging.warning(f"Page not found: {url}")
            else:
                logging.error(f"HTTP error {e.response.status_code} fetching {url}: {e}")
            return None

    def parse_page(self, html):
        try:
            soup = BeautifulSoup(html, 'html.parser')
            data = {
                'title': soup.title.text if soup.title else '',
                'subtitles': [subtitle.text for subtitle in soup.find_all(['h2', 'h3', 'h4', 'h5', 'h6'])],
                'text': [paragraph.text for paragraph in soup.find_all('p')],
                'images': [{'address': image['src'], 'alt_text': stem(image.get('alt', ''))} for image in soup.find_all('img')],
                'page_info': {
                    'references': [reference['href'] for reference in soup.find_all('a', href=True)],
                    'authors': [author['content'] for author in soup.find_all('meta', {'name': 'author'})],
                    'link': soup.find('link', {'rel': 'canonical'})['href'] if soup.find('link', {'rel': 'canonical'}) else None,
                    'description': soup.find('meta', {'name': 'description'})['content'] if soup.find('meta', {'name': 'description'}) else None,
                }
            }
            return data
        except Exception as e:
            logging.error(f"Error parsing page: {e}")
            return None

    def save_to_file(self, data):
        try:
            with open(self.output_file, 'a', encoding='utf-8') as file:
                file.write(str(data) + '\n')
                logging.info(f"Saved data to file: {self.output_file}")
        except Exception as e:
            logging.error(f"Error writing to file: {e}")

    def crawl(self, url, depth):
        if depth == 0:
            return
        logging.info(f"Crawling: {url}, Depth: {depth}")
        html = self.get_page(url)
        if html:
            data = self.parse_page(html)
            if data:
                self.save_to_file(data)
                #for link in data['page_info']['references']:
                    #self.crawl(link, depth - 1)

if __name__ == "__main__":
    base_url = 'https://en.wikipedia.org/wiki/Web_crawler'
    max_depth = 2
    output_file = 'output.txt'

    logging.info("Starting web crawling process...")
    crawler = WebCrawler(base_url, max_depth, output_file)
    crawler.crawl(base_url, max_depth)
    logging.info("Web crawling process completed.")
