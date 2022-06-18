# IRfont

a google fonts clone made for fun

url format: http://localhost:5100/font?f={fontfamily-name}:{font-style}@{font-weight}&display=swap

 some examples

> http://localhost:5100/font?f=Roboto:normal@400&display=swap

> http://localhost:5100/font?f=Roboto:normal@400,200,300&display=swap

> http://localhost:5100/font?f=Roboto:normal@400,200,300;italic@400,300&display=swap

> http://localhost:5100/font?f=Roboto:normal@400&f=Vazir:normal@400&display=swap

How to run:

```
npm install
```

```
npm run dev
```

Todo:

- [x] design a better url format for more straight forward data extraction from the url and cleaner code
- [ ] build a UI to see , select and upload fonts and generating urls for using in the app
- [ ] save data about fonts in redis
- [ ] add unicode-range support
- [ ] Todo: optimization