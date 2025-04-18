import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager


# Setup Chrome driver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

titles = []
urls = []
topics = ["dynamic-programming", "backtracking", "greedy", "binary-search", "depth-first-search", "breadth-first-search", "graph-theory", "bit-manipulation", "mathematical", "string", "array-and-string", "linked-list", "tree", "stack-and-queue"]
for topic in topics:
# Load LeetCode page
    for i in range(1, 5):
        driver.get(f"https://leetcode.com/problemset/?topicSlugs={topic}&page={i}")
        print ("scraping page", i , "of topic", topic)
        time.sleep(5)

        # Get the page source
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        # Get all question containers
        all_questions_divs = soup.find_all('div', class_='odd:bg-layer-1 even:bg-overlay-1 dark:odd:bg-dark-layer-bg dark:even:bg-dark-fill-4')

        # Extract URLs and titles
        for q in all_questions_divs:
            a_tag = q.find('a')
            if a_tag:
                urls.append(a_tag["href"])
                lines = list(filter(None, [line.strip() for line in a_tag.stripped_strings]))
                
                for line in lines:
                    clean_line = line.strip("[]'\"")
                    parts = clean_line.split('.', 1)
                    if len(parts) > 1:
                        title = parts[1].strip()
                        titles.append(title)
                    else:
                        titles.append(clean_line.strip())

# write all urls to a file 
with open('leetcode_urls.txt', 'w') as f:
    for url in urls:
        f.write("https://leetcode.com" + url + '\n')
with open('leetcode_title.txt', 'w') as f:
    for title in titles:
        f.write(title + '\n')

# Close the browser
driver.quit()
