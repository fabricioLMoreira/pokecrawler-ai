FROM python:3.11-slim

WORKDIR /crawler

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY crawler.py /crawler/

CMD ["python", "crawler.py"]
