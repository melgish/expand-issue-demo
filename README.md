# expand-issue-demo

Demonstrates possible issue with Expand when used in React

## Build / Run
```sh
npm install
npm run dev
```

## Steps to reproduce issue
1. Open browser to [http://localhost:5173](http://localhost:5173)
1. Expand layer list by clicking button.
1. Collapse layer list by clicking button.
1. Open pop-up by clicking on orange dot.
1. Close pop-up.
1. Click Toggle Visibility button to remove map.
1. Wait a few seconds or watch dev tools for error.
1. Click Toggle Visibility button to restore map.
1. Try to open the layer list again.
1. Try to open the popup again.

If dev tools are open during the above, an error is reported from Expand.js
`t.ui is null` when the map is hidden.