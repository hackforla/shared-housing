#!/bin/sh
echo "starting app.."
cd /app
gunicorn -b 0.0.0.0:80 app
