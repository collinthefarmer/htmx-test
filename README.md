# htmx-test


## About

repo to demonstrate weird `oobAfterSwap` event behavior in HTMX.

I created this test setup because I was running into some unexpected performance issues 
when trying to swap in more than a few elements at a time from OOB with the ws extension.
(I was able to reproduce the issue without ws, however, so I've excluded it here.)

In trying to find the bottleneck, I noticed in the profiler that the browser
was spending an inordinate amount of time dispatching events,
and narrowed it down to a loop in the `oobSwap` function (I think). 
It looks like it's firing off an event for each element that is swapped in,
as well as every other element swapped in prior to that element in the same request.

Judging by the description of the `oobAfterSwap` event in the docs, I don't think this is the intended behavior.

## Running the demo

This requires Bun, since I was already using it and it makes for an easy setup.

1. `bun run index.ts`
2. Visit `localhost:3000` in a web browser.
3. Click the "swap" button (warning: this could take a second).
4. Observe results in console.

Bun will serve the files at `localhost:3000` by default.

## Methodology

`update.html` contains a flattened set of uniquely id'd divs 
which get swapped into their respective places in `index.html` as per the HTMX Out-Of-Band swap logic.

These swaps are triggered by clicking the "swap" button present on the `index.html` page.

Using some event listeners, the number of `oobBeforeSwap` and `oobAfterSwap`
events are tracked and printed to the console once the request is complete.

Bun.serve is used to serve the files.

