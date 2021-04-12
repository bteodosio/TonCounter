<h1 align="center">
  <img alt="tonStone" title="tonStone" src=".github/ton.png" width="200px" />
</h1>

<h3 align="center">
  Back-end Developer Challenge
</h3>

<p align="center">
  <img alt = "Github Last Confirmation" src = "https://img.shields.io/github/last-commit/Bteodosio/TonCounter">
  <img alt = "GitHub Main Language" src = "https://img.shields.io/github/languages/top/Bteodosio/TonCounter">
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/Bteodosio/TonCounter?color=%2304D361">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Bteodosio/TonCounter/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/Bteodosio/TonCounter?style=social">
  </a>
</p>

## :page_with_curl: Summary

This project is responsible for count number of visits and register new users as well as retrieve user information.

All URIs are relative to *https://b3nd2gi34i.execute-api.sa-east-1.amazonaws.com/prod/*

Method | Endpoint | Description
------------- | ------------- | -------------
**POST** | /visitCounterIncrement | Increase the number of visits for a unique key.
**GET** | /visits?{key} | Get the number of visits for a key.
**POST** | ​/users | Add new user to database.
**GET** | /users?{email} | Get user information by email.

## :fire: Getting Started

These instructions will get this project up and running in your machine.

### :wave: Prerequisites

> [Node.js](http://nodejs.org/) \
> [NPM](https://www.npmjs.com/) \
> [SERVERLESS](https://www.serverless.com/)

### :rocket: Installing 

Running project:

- Clone the project:

  ```sh
  $ git clone https://github.com/bteodosio/TonCounter.git
  ```

- Open imob folder:

  ```sh
  $ cd TonCounter
  ```

- Install all packages via NPM:

  ```sh
  $ npm install
  ```

- Install all packages via NPM:

  ```sh
  $ serverless dynamodb install --stage dev
  ```

- Create config file:

  ```sh
  $ create new file named config.dev.json based on config.sample
  ```

- Dev mode:

  ```sh
  $ npm run dev
  ```

- AWS Deploy:

  ```sh
  $ npm run deploy
  ```

### :information_source: Recommendations

> [VS Code](https://code.visualstudio.com/)