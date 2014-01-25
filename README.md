# label-whisperer

A simple Flask-based HTTPony for processing file uploads with Tesseract and extracting accession numbers.

## Example

First:

	$> cd flask
	$> python server.py

And then:

	$> curl -X POST -F 'file=@label.jpg' http://127.0.0.1:5000 | python -mjson.tool

	{
	    "possible": [
        	"2007-39-1"
	    ],
	    "raw": "Vermelha Chair 24 0\n\n2007\n\ns\";\n\nDesigned by Humberto and Fernando Campana\n(Brazillian, born 1953 and 1961)\n\nManufactured by EDRA (Italian, founded 1987)\nSteel base, hand-woven dyed cotton rope\n\nHandmade, luxury, upholstery, unconventional\n\nDonation from EDRA\n2007-39-1"
	}

I like running things under [gunicorn](http://gunicorn.org/) and since Flask is [wsgi](http://docs.python.org/2/library/wsgiref.html)-compliant you can also do stuff like:

	$> cd flask
	$> sudo gunicorn -b '0.0.0.0:80' server:app

If you get things up and running on a public interface (for example, port 80) then there is also a very simple web UI for uploading a photo and displaying the results returned by the server.

## Notes and caveats

* There is no authentication or authorization. If you're running this on the public Internet be advised that anyone will be able to upload files to your server.
* There is currently only one hard-coded pattern for extracting accession numbers. Patches are welcome.
* The web-based example application will try to look to call the Cooper-Hewitt's OEmbed endpoint for any accession number it finds. If you're not the Cooper-Hewitt this may not be expected behaviour.

## See also

* [Tesseract](https://code.google.com/p/tesseract-ocr/)
* [Flask](http://flask.pocoo.org/)
