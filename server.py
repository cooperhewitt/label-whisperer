#!/usr/bin/env python

import os
import os.path
import sys
import logging
import tempfile
import subprocess
from flask import Flask, request, redirect, url_for
from werkzeug import secure_filename

logging.basicConfig(level=logging.INFO)

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 3 * 1024 * 1024
app.config['TESSERACT']  = '/usr/bin/tesseract'

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():

    if request.method == 'GET':
        return '''
        <!doctype html>
        <title>Upload new File</title>
        <h1>Upload new File</h1>
        <form action="" method=post enctype=multipart/form-data>
        <p><input type=file name=file>
        <input type=submit value=Upload>
        </form>
        '''

    # http://flask.pocoo.org/docs/patterns/fileuploads/

    file = request.files['file']

    if not file:
        logging.error("Missing file")
        raise Exception, e

    if not allowed_file(file.filename):
        logging.error("Invalid file")
        raise Exception, e

    filename = secure_filename(file.filename)

    image = os.path.join(tempfile.gettempdir(), filename)
    text = os.path.join(tempfile.gettempdir(), str(os.getpid()))

    try:
        file.save(image)
    except Exception, e:
        logging.error("Failed to save file: %s" % e)
        raise Exception, e

    try:
        subprocess.call([app.config['TESSERACT'], image, text])
    except Exception, e:
        logging.error(e)
        raise Exception, e

    text = "%s.txt" % text

    try:
        fh = open(text, 'r')
        data = fh.read()
        data = data.strip()
        fh.close()
    except Exception, e:
        print e
        raise Exception, e

    os.unlink(image)
    os.unlink(text)

    return data

if __name__ == '__main__':
    app.run()
