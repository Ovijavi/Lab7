// script.js
let numEntries = 0;

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        numEntries++;
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;

        newPost.index = numEntries;
        
        newPost.addEventListener('click', () => {
          setState('single-entry', newPost.index);
          document.querySelector('entry-page').entry = newPost.entry;
        });

        document.querySelector('main').appendChild(newPost);
      });
    });
});

document.querySelector('[src="settings.svg"]').addEventListener('click', () => {
  setState('settings');
});

document.querySelector('header>h1').addEventListener('click', () =>{
  setState('home');
  document.querySelector('entry-page').remove();
  let entryPage = document.createElement('entry-page');
  document.querySelector('body').appendChild(entryPage);
});

window.addEventListener('popstate', (e) => {
  setState('home');
  document.querySelector('entry-page').remove();
  let entryPage = document.createElement('entry-page');
  document.querySelector('body').appendChild(entryPage);
});