---
date: 2025-11-10
title: Thoughts on URL based filters
---

# Thoughts on URL based filters
I recently refactored some filters in an application. Here are some thoughts and experiences I got from it.

If you ever heard the acronym SERP, you will immediatelly catch the whole meaning of this post.

Follow me on my journey to refactor a SERP page and its filtering nightmare.

## Why SERP pages are important?

SERP pages are common in webshops, where searching for something efficiently is the most important feature.

Often, it is the most complex part of the website, full of filters, UI logic, and bugs.

Also often, most of the bugs are caused by poor design choices. That's what I'm investing my time this week. I want to find a good architecture for these filters.

## The middle state: a common mistake

Filters in SERP pages are always represented by a URL with a bunch of query params. This is made like that historically to make sharing the link easy.

In my case, the filters have a middle layer of state between the URL and the UI. This is not the first time I see this. In most SERPs I've seen in my carreer, this was the practice.

Usually this is done to make the handling of UI updates easier, in the same principle as one would use a `useState`, for example. But in this specific scenario, this is poor design, and I will explain why.

[image.narrow]
    src: 1.webp
    caption: This image represents well how this is usually designed.

While this might sound like a good idea, it holds well until the bugs start to popup.

The sync between URL, state and UI is nothing less than chaotic, specially if you have dozens of filters. It's absolutely error-prone and many bugs are found from this. When doing maintenance, or adding a new feature, you need to touch a dozen places that comprehend this syncing glue between the three parts of the front-end.

Some common bugs I've seen in more than one project: poor URL navigation management makes filters to be stripped from the URL; navigating causes a loop of useEffect hooks firing and causing either infinite loops or unnecessary re-renders; poor or incorrect sync might leave the state stale and make the UI represent things that are not in the URL.

And this is the just the bottom of the list.

## How can we do this better?

If the source of bugs and complexity is the syncing glue, could we have the same equivalent feature without it?

One thing many developers forget when dealing with the history/location/router (be it React Router or any other) is that the history is reactive just like a piece of state. It's so true that we use hooks to get the search params of a URL, for example.

Then we go back to the first question. If the history is reactive, why do we need a syncing glue? Could we use the URL as the state for our UI and get rid of all this syncing mess?

[image.narrow]
    src: 2.webp
    caption: Here's what I'm talking about, in case you're still confused.

That's the question I was tasked to answer this week, and the results are promising.

## My current situation

When the SERP page loads stuff from the API, a hook is responsible of updating the URL and navigating to the matching URL.

The API dispatches when the context provider holding the state changes. Inside the provider there is a useEffect that updates the state based on the changed URL.

The returned object from the context provider is a representation of the state and some functions to mutate it.

The UI consumes the state from the context provider.

[image]
    src: 3.webp
    caption: Here's the diagram. Even drawing this is complex.

The villains of the movie here are these two useEffects. Many checks are necessary to preventing this loop from going infinite. This is complex and bugs sneak in easily.

We will remove the middle state and the useEffects that sync everything.

## Removing the middle state

We will be performing changes directly in the URL using the same functions exposed by the context provider. And we will use the properties returned by the context provider to return computed values from the URL which will feed the API call and the UI. The API on the components won't change.

[image]
    src: 4.webp
    caption: Here's a representation of the architecture I want.

This is an example of pseudo-code in the provider:

```javascript
const [searchParams, setSearchParams] = useSearchParams();

const [state, dispatch] = useReducer(reducer);

useEffect(() => {
    dispatch({
        action: 'SET_QUERY',
        payload: getQueryFromUrl(searchParams)
    });
}, [searchParams]);

return {
    query: state.query,
    setQuery: (query) => 
        dispatch({
            action: 'SET_QUERY',
            payload: query
        })
};
```

> Keep in mind that the code that builds the URL is somewhere else. So it is not covered in this provider.

The state is completely useless.

```javascript
const [searchParams, setSearchParams] = useSearchParams();

// const [state, dispatch] = useReducer(reducer);

// useEffect(() => {
//    dispatch({
//        action: 'SET_QUERY',
//        payload: getQueryFromUrl(searchParams)
//    });
// }, [searchParams]);

return {
    query: getQueryFromUrl(searchParams),
    setQuery: (query) => {
        const newSearchParams = setQueryInUrl(query);
        setSearchParams(newSearchParams);
    }
};
```

If you read the line `useSearchParams` as a `useState`, it'll be easier to see how useless the state is. Both useEffects can be removed. The logic is in one place. The changes in the filters are predictable.

This can be done for any level of complexity, and it scales well if you use a handful of good practices.

## Observed results

The first thing that stands out is that those nasty bugs of query params being stripped from the URL are completely gone. There are no useEffect hooks running anywhere that would cause side effects.

Also, when you land on the page, or when you navigate to a product and go back, the page immediately renders exactly what's needed with filters applied. Before, the page was blinking with useEffects deciding what would be in the UI and in the URL. The source of truth is in the URL. I'm leveraging a powerful API directly hooked up with my UI.

Writing to the query parameters of a URL is not as easy as to updating a property on an object. This is the only part that becomes complex. A way to make it easier is to use `URLSearchParams` object. It functions as a `Map`, and makes getting and setting query parameters much easier. At the end, you just do `searchParams.toString()` and you'll have your URL query.

Overall, removing a lot of state and crazy useEffects is an excellent trade-off.

## Conclusion

I think this solution is elegant. It benefits maintainability and user experience. It's a win-win.

The removed code was absolutely over engineered. It was made on a set of beliefs and practices that React (and Meta) made us trust blindly over the years. The belief here is having a mandatory state pair for the UI components.

One example of such beliefs: who heard that Redux' state have to be serializable? In the paper it sounds nice. All the immutability and functional programming principles, fancy words and etc.

But in the real world, when you have a React app running on Smart TVs, having a serializable object in state makes a 2015 Samsung TV load a catalog of movies in 1 minute. One minute! The API is not to blame because it answers in 200ms. The processing was the issue. The TV was struggling with Redux state objects in memory. Going beyond these beliefs, and having not so serializable objects, made us improve the loading time to 1.5 second. Legit story, from my own experience.

So while the practices we learned with the React ecosystem over the years work on most of the cases, even if sub-optimally, in scenarios like mine, be it on a SERP page or on a Smart TV, they simply fall apart, and expose the fragility of the software engineering we cultivated in front-end development.

_For now, stay hydrated and take care._