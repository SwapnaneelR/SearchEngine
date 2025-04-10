import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager

# Setup Chrome driver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

# Load LeetCode page
driver.get("https://leetcode.com/problemset/?topicSlugs=dynamic-programming&page=1")
time.sleep(5)

# Get the page source
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

# Get all question containers
all_questions_divs = soup.find_all('div', class_='odd:bg-layer-1 even:bg-overlay-1 dark:odd:bg-dark-layer-bg dark:even:bg-dark-fill-4')

all_questions = []

# Loop and extract <a> tag text safely
for q in all_questions_divs:
    a_tag = q.find('a')
    print(a_tag)
    if a_tag:
        all_questions.append(a_tag.text.strip())

# Close the browser
driver.quit()
