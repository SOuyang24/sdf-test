# SDF Take-home Challenge (Account Explorer)

Thank you for your interest in Stellar Development Foundation! We're excited to
see what you will do with the Account Explorer frontend challenge. 🚀

## Resources and helpers

App design along with colors, sizes, margins, etc. you can find in
`src/resources/design.png`, and Stellar logo `src/resources/logo-stellar.svg`.

There are two helper methods in `src/api` directory:

- `fetchAccounts` - to fetch all accounts
- `fetchSingleAccount` - to fetch a single account

## UX/UI

Build an app to display a list of Stellar accounts and details as close to the
design as possible. Provide good user experience and write production-ready
code. Don't worry too much about little design and UX details (we know that it's
hard to tell that from an image). This challenge is intentionally open-ended
(aside from the requirements listed below). In other words, if it's not required
you can do whatever feels right.

### Landing page

- When a user lands on the page, there are no accounts to display.
- Fetch accounts by clicking on the "Show accounts" button.
- The results are displayed below the button as per design.
- Clicking on an account opens a page with account details.

### Details page

- The account's reserved XLM (native) balance is calculated using this formula:

```sh
(2 + subentryCount + numSponsoring - numSponsored) * 0.5 + sellingLiabilities
```

- In "Account balances" show **only** balances with asset types `native`,
  `credit_alphanum4`, and `credit_alphanum12`.

- XLM (native) balance shows the available balance in parentheses, which is
  calculated by subtracting the reserved XLM balance from the balance.
  - All the other balances show only the balance.
- To get the asset's home domain, you'll need to fetch account information using
  the asset's issuer.
  - XLM asset does not have a domain, so it should always say "native" instead.
- The "Go back" button returns to the previous page.

## Requirements

- You can structure the code any way you like. You may also use additional
  libraries (But remember: if you worked here, we would want to pay attention to
  payload size. Choose wisely!).
- Use TypeScript and Sass.
- Use Redux for state management. You can pick any Redux flavor (we use
  [Redux Toolkit](https://redux-toolkit.js.org/) internally, but you don't have
  to).
- Use [stellar-identicon-js](https://github.com/Lobstrco/stellar-identicon-js)
  to show the account's identicon.
- Don't worry about vendor prefixes; target the latest version of Chrome.
- The app should compile without any linter errors.

## Time commitment

Please do as much as you can in 2 hours. There is a file called `./ROADMAP.md`
in this repo. You can record what your next steps would have been if you had
time to continue. Also, any feedback you can give us will be much appreciated.
We're always looking for ways to improve this challenge.

## How to use

The app is built with [Create React App](https://create-react-app.dev/) in
TypeScript and it uses [Sass](https://sass-lang.com/) for styling.

Make sure you have a modern version of `node` (v16+), `yarn` (classic), and
`react-scripts` (only if the terminal complains about it) installed.

```sh
npm install --global yarn
npm install react-scripts@v5
```

Run `yarn` to install all dependencies before getting started.

`yarn start` will open the app in the browser at `http://localhost:3000/`. Hot
reloading is enabled.

## When you're done

Hope you had fun with this challenge! Please zip up your solution with the
command below (run it at the root of your project) and return it to us. ✨

```sh
tar -czvf [your initials]-SDF-AE.tar.gz --exclude="node_modules" --exclude-vcs .
```
