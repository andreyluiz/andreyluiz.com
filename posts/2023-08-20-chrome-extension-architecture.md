---
layout: post
title: A word about Chrome Extension architecture
lead: Some thoughts on a recent project.
---

Hello again. I've been playing with a Chrome Extension for a while now, and I wanted to share some thoughts about it, and some ideas of how to architect it.

# How a Chrome Extension works

Chrome extensions are pretty simple. You have a popup (that window that appears when you click on the extension icon), and you have a background script. The background script is the one that does the heavy lifting. It can be a simple script that runs in the background, or it can be a service worker. The service worker is a script that runs in the background, but it can also intercept network requests and modify them. It can also cache requests and responses, and it can also send push notifications. Extensions can also have a configuration page, which is a simple HTML page that can be used to configure the extension.

# The architecture of the extension

My extension leverages these three elements. The popup shows the main interface of the extension, and where the users interact the most. The configuration page is only used to configure where the API calls should go to. The background script does all the API calls, caching, and processing for the extension.

## Sending messages

When the user interacts with something, for example, making a login, the popup has rely on API call to our Strapi server to authenticate the user. I could have done this in the popup itself. It has all the fetch aparatus that a regular browser has. But I decided to leave this only to the background script. Instead, the popup sends a message to the background script.

For example, here my login function in the popup:

```ts
const handleSubmit = useCallback(
  async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data, error } = await chrome.runtime.sendMessage<
      ChromeMessage<LoginInfo>,
      ChromeResponse<boolean>
    >({
      type: "authenticate",
      payload: {
        identifier: formData.get("email").toString(),
        password: formData.get("password").toString(),
      },
    });
    if (data) {
      onLoginSuccess();
    } else if (error) {
      setError(true);
    }
  },
  [onLoginSuccess]
);
```

All this `ChromeMessage`, and `ChromeResponse` typings is on me. I decided to setup the types in a way where I always know which type I'm dealing with.

So, I pass a `type` and a `payload` to the background script. The payload can contain anything that's serializable. The other calls on the extension all follow this pattern.

## Receiving messages

The background script, then, receives the message, and does the API call. Here's the code for the login:

```ts
async function handleAuthenticate(
  request: ChromeMessage<{ identifier: string; password: string }>
) {
  try {
    const result = await api.authenticate(
      request.payload.identifier,
      request.payload.password
    );
    return getFormattedData(result, null);
  } catch (e) {
    getFormattedData(null, e);
  }
}

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  try {
    (async () => {
      switch (request.type) {
        case "authenticate": {
          sendResponse(await handleAuthenticate(request));
          break;
        }
      }
    })();
  } catch (e) {
    console.error("error", e);
  }

  return true;
});
```

Some important aspects here:

- The `chrome.runtime.onMessage.addListener` is the listener for the messages sent by the popup;
- The `sendResponse` callback sends data back to the popup;
- The `return true` is important. It tells Chrome that the listener is asynchronous, and that it should wait for the response. If you don't return true, the popup will not receive the response;
- The `getFormattedData` is a function that I created to format the response. It's just a helper function;
- The `api.authenticate` is a function that I created to do the API call. Think here as whatever method you use to do API calls.

## Caching

The background script also caches stuff. Like JWT tokens, and some user preferences as well. I use the `chrome.storage` API to do that. The way I do it is exactly the same as the API calls. I send a message to the background script, and it does the caching. Or I call the background script to get something that is cached.

## Important considerations

- Make sure you have one, and one only, `chrome.runtime.onMessage.addListener`. If you have more than one, things go wild and your callbacks start to behave in unexpected ways;
- Make sure you return true in your listener if you are doing async calls. If you don't, the popup will not receive the response;
- Make sure you have a `try/catch` in your listener. If you don't, and an error happens, the popup will not receive the response;

# Conclusion

I'm learning a lot with this extension. I might post more stuff here as the project goes by.

Cheers.
