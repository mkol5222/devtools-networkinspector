```bash
# develop
cd ./ui; npx quasar dev

# build static
cd ./ui; npx quasar build; cp ../manifest.json ../devtools.html ../devtools.js ./dist/spa; 

# server static
cd ./ui/dist/spa; npx http-server -o
```