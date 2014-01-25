#!/bin/sh

sudo apt-get update
sudo apt-get upgrade

# These aren't necessary per se but I like having
# them around (20140125/straup)
# sudo apt-get install sysstat htop unzip
# sudo apt-get install tcsh emacs24-nox 

# Chances are good you will have already installed
# git if you're reading this file (20140125/straup)
# sudo apt-get install git

sudo apt-get install tesseract-ocr python-setuptools

sudo easy_install flask
sudo easy_install flask-cors

# Again, not strictly necessary but you'll probably
# install this sooner or later... (20140125/straup)

sudo apt-get install gunicorn
