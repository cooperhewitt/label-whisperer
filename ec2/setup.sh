#!/bin/sh

sudo apt-get update
sudo apt-get upgrade

# These aren't necessary per se but I like having
# them around (20140125/straup)
# sudo apt-get install sysstat htop unzip
# sudo apt-get install tcsh emacs24-nox 

sudo apt-get install git tesseract-ocr python-setuptools

sudo apt-get install gunicorn

sudo easy_install flask
sudo easy_install flask-cors
