<p align="center" >
  <a href="https://github.com/apps/polls">
    <img height="65" src="./docs/logo.png">
  </a>
</p>

# GitHub Polls Bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that automatically creates [gh-polls](https://github.com/apex/gh-polls) in GitHub issues.

[![Travis][travis-badge]][travis]
[![Codecov Status][codecov-badge]][codecov]
[![Dependency Status][dependency-badge]][dependency]
[![devDependency Status][devDependency-badge]][devDependency]
[![peerDependency Status][peerDependency-badge]][peerDependency]
[![Greenkeeper badge][greenkeeper-badge]][greenkeeper]
[![prettier][prettier-badge]][prettier]
[![license][license-badge]][license]

## Installation

https://github.com/apps/polls

## Usage

```md
/polls Option1 'Opntio 2' "Option 3"

# Automatically replace with the following markdown =>
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/01BXY635WEJEYKJV0BZ9WFPJVS/Option1)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/01BXY635WEJEYKJV0BZ9WFPJVS/Option1/vote)
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/01BXY635WEJEYKJV0BZ9WFPJVS/Opntio%202)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/01BXY635WEJEYKJV0BZ9WFPJVS/Opntio%202/vote)
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/01BXY635WEJEYKJV0BZ9WFPJVS/Option%203)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/01BXY635WEJEYKJV0BZ9WFPJVS/Option%203/vote)
```

| **Screenshot** | **Demo** |
| -------------- | -------- |
| ![](./docs/screenshot.png) | ![](./docs/demo.gif) |

## Developer Guide

### Environments

- Create a `.env` file from `.env.example`.
- Download the `private-key.pem` from GitHub and move it to your project’s directory.

### Requirements

-   node >= 9.0.0
-   yarn >= 1.2.1

```
$ git clone https://github.com/evenchange4/gh-polls-bot
$ yarn install --pure-lockfile

$ yarn run dev # dev server
$ yarn start   # prod server
```

### Test

```
$ yarn run format
$ yarn run eslint
$ yarn run test:watch
$ yarn run flow
```

### Deploy to Now.sh

Any git commits push to master branch.

> PRIVATE_KEY pem workaround: [first-timers-bot #89](https://github.com/hoodiehq/first-timers-bot/pull/89)

### Technology Stacks

- [Create-Probot-App](https://github.com/probot/create-probot-app)
- Travis - CI
- [Zeit Now.sh](https://zeit.co/now)

## Inspiration

- https://github.com/probot/commands
- https://github.com/srph/gh-polls-web

## Misc

- Redirect to github.com for private repos. [\[apex/gh-polls#3\]](https://github.com/apex/gh-polls/issues/3#issuecomment-312964372)
- PEM format doesn't play nicely with now.sh secrets/env vars. [\[probot/friction#17\]](https://github.com/probot/friction/issues/17)
- Links related to GH polls:
  - [Web App](https://app.gh-polls.com/) – GH polls web app
  - [apex/gh-polls](https://github.com/apex/gh-polls) – Polls for user feedback in GitHub issues [gh-polls.com](https://gh-polls.com/)

## CONTRIBUTING

*   ⇄ Pull requests and ★ Stars are always welcome.
*   For bugs and feature requests, please create an issue.
*   Pull requests must be accompanied by passing automated tests (`$ yarn run test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)

MIT: [http://michaelhsu.mit-license.org](http://michaelhsu.mit-license.org)

[travis-badge]: https://img.shields.io/travis/evenchange4/gh-polls-bot/master.svg?style=flat-square
[travis]: https://travis-ci.org/evenchange4/gh-polls-bot
[codecov-badge]: https://img.shields.io/codecov/c/github/evenchange4/gh-polls-bot.svg?style=flat-square
[codecov]: https://codecov.io/github/evenchange4/gh-polls-bot?branch=master
[npm-badge]: https://img.shields.io/npm/v/gh-polls-bot.svg?style=flat-square
[npm]: https://www.npmjs.com/package/gh-polls-bot
[npm-downloads]: https://img.shields.io/npm/dt/gh-polls-bot.svg?style=flat-square
[dependency-badge]: https://david-dm.org/evenchange4/gh-polls-bot.svg?style=flat-square
[dependency]: https://david-dm.org/evenchange4/gh-polls-bot
[devDependency-badge]: https://david-dm.org/evenchange4/gh-polls-bot/dev-status.svg?style=flat-square
[devDependency]: https://david-dm.org/evenchange4/gh-polls-bot#info=devDependencies
[peerDependency-badge]: https://david-dm.org/evenchange4/gh-polls-bot/peer-status.svg?style=flat-square
[peerDependency]: https://david-dm.org/evenchange4/gh-polls-bot#info=peerDependencies
[license-badge]: https://img.shields.io/github/license/evenchange4/gh-polls-bot.svg?style=flat-square
[license]: http://michaelhsu.mit-license.org/
[greenkeeper-badge]: https://badges.greenkeeper.io/evenchange4/gh-polls-bot.svg
[greenkeeper]: https://greenkeeper.io/
[dockerhub-auto-badge]: https://img.shields.io/docker/automated/evenchange4/gh-polls-bot.svg?style=flat-square
[dockerhub]: https://hub.docker.com/r/evenchange4/gh-polls-bot/
[dockerPulls-badge]: https://img.shields.io/docker/pulls/evenchange4/gh-polls-bot.svg?style=flat-square
[dockerSize]: https://microbadger.com/images/evenchange4/gh-polls-bot
[dockerSize-badge]: https://images.microbadger.com/badges/image/evenchange4/gh-polls-bot.svg
[prettier-badge]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square
[prettier]: https://github.com/prettier/prettier
