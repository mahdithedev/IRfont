# IRfont

a google fonts clone made for fun

url format: http://localhost:5100/font?family={font-family-name};{font-type},{font-weight}&display=swap

> some examples
> http://localhost:5100/font?family=Roboto;normal;400&display=swap
> http://localhost:5100/font?family=Roboto;normal;400,200,300&display=swap
> http://localhost:5100/font?family=Roboto;normal;400,200,300;italic,400,300&display=swap
> http://localhost:5100/font?family=Roboto;normal;400&family=Vazir;normal,400&display=swap

Todo:

- [] design a better url format for more straight forward data extraction from the url and cleaner code
- [] add unicode-range support
- [] save data about fonts in redis
- [] build a UI to see , select and upload fonts and generating urls for using in the app
- [] Todo: optimization