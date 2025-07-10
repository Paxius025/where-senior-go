FROM python:3.10-slim

WORKDIR /app

# install git and git-lfs
RUN apt-get update && apt-get install -y git curl \
  && curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash \
  && apt-get install -y git-lfs \
  && git lfs install

# copy requirements.txt (if any) and install python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# # clone model to models folder
# RUN git clone https://huggingface.co/mrp/simcse-model-wangchanberta ./models/simcse-model-wangchanberta

# copy other source code
COPY . /app

EXPOSE 8003

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8003", "--reload"]
