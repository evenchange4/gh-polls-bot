#!/bin/bash
set -ex

# ENV Variables, Note: NOW_TOKEN, WEBHOOK_SECRET, PRIVATE_KEY_BASE64 in travisCI
APP_ID=6386
# NOW config
TEAM='gh-polls-bot'
PROJECT='gh-polls-bot'
ALIAS='gh-polls-bot.now.sh'

export PATH="./node_modules/.bin:$PATH"

# 1. Wair for deployment ready
URL=$(now -e APP_ID="$APP_ID" -e WEBHOOK_SECRET="$WEBHOOK_SECRET" -e PRIVATE_KEY_BASE64="$PRIVATE_KEY_BASE64" --public --token "$NOW_TOKEN" --team $TEAM)
await-url "$URL"
now ls --token "$NOW_TOKEN" --team $TEAM

# 2. Alias
now alias set "$URL" "$ALIAS" --token "$NOW_TOKEN" --team $TEAM

# 3. Purge old services
now remove --yes --safe --token "$NOW_TOKEN" --team $TEAM $PROJECT

# 4. Scale to 1
now scale "$ALIAS" 1 --token "$NOW_TOKEN" --team $TEAM

# 5. Log results
now ls --token "$NOW_TOKEN" --team $TEAM
now alias ls --token "$NOW_TOKEN" --team $TEAM
