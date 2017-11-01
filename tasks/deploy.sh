#!/bin/bash
set -exu

# ENV Variables
DOT_ENV=".env"
PRIVATE_KEY="$(cat ./private-key.pem)"
APP_ID=6386
WEBHOOK_SECRET=development
# NOW config
TEAM='gh-polls-bot'
PROJECT='gh-polls-bot'
ALIAS='gh-polls-bot.now.sh'

export PATH="./node_modules/.bin:$PATH"

# 0. Switch to team
now switch $TEAM
# 1. Wair for deployment ready
URL=$(now -e APP_ID="$APP_ID" -e WEBHOOK_SECRET="$WEBHOOK_SECRET" -e PRIVATE_KEY="$PRIVATE_KEY" --public)
await-url "$URL/probot"
now ls
# # 2. Alias
now alias set "$URL" "$ALIAS"
# # 3. Purge old services
now remove --yes --safe $PROJECT
# # 4. Scale to 1
now scale "$ALIAS" 1
# # 5. Log results
now ls
now alias ls
