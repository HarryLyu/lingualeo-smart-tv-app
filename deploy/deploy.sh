upload_path=188.120.233.173:/home/lyubimoff/data/www/lyubimoff.ru/

rm -f -r ../build/widget.zip
cd ../app
zip -r ../build/widget.zip ./*
rsync -rlvzt ../ "${upload_path}/"
rsync -rlvzt ../widgetlist.xml "${upload_path}/widgetlist.xml"
