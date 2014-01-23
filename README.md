# label-whisperer

A simply HTTPony for processing file uploads with Tesseract. It works but only just.

## Example

	$> gunicorn server:app

	$> curl -X POST -F 'file=@label.jpg' http://127.0.0.1:8000

	{
	    "possible": [
        	"2007-39-1"
	    ],
	    "raw": "Vermelha Chair 24 0\n\n2007\n\ns\";\n\nDesigned by Humberto and Fernando Campana\n(Brazillian, born 1953 and 1961)\n\nManufactured by EDRA (Italian, founded 1987)\nSteel base, hand-woven dyed cotton rope\n\nHandmade, luxury, upholstery, unconventional\n\nDonation from EDRA\n2007-39-1"
	}

## See also

* https://tesseract-ocr.googlecode.com/svn/trunk/doc/tesseract.1.html