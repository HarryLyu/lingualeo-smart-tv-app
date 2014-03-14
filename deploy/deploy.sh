upload_to=igor
upload_path=root@luig.ru:/home/lyubimoff/data/www/lyubimoff.ru
rm -f -r ../build/widget.zip
cd ../app
zip ../build/widget.zip ./*
rsync -rlvzt --exclude=".git" --exclude=".idea" ~/work/harrylyu/repos/smart-tv/ "${upload_path}"