---
layout: post
title: Optimizing Jest Performance
lead: Insights from Real-World Testing
---

Testing is a cornerstone of modern software development, ensuring code reliability and functionality. Jest is widely recognized for its simplicity and ease of use. However, like any tool, its performance can vary based on the configuration and the environment in which it's run. In this post, we'll dive into some practical findings from running Jest in a large application environment and discuss strategies to optimize your testing times.

## Test Environment and Setup

Our testing ground was a significant JavaScript application running on an M3 MacBook. The reason for this benchmark was because M3 MacBooks are way too fast, so tests that are flaky on the CI run just fine and are hard to catch. The idea was to find a way of making the flaky tests to show up locally.

To understand how Jest performs under different loads and configurations, I conducted a series of tests:

1. **Low Power Mode with Parallel Build**: Running the test suite with the low power mode enabled on the MacBook, while building an even larger application in parallel, took about 195 seconds to complete.
1. **Idle Conditions with Various Worker Counts**: We then ran tests under idle conditions (no other significant processes running) with varying numbers of workers. Here’s what we found:

- 4 workers: 164 seconds
- 6 workers: 143 seconds
- 7 workers: 142 seconds
- 8 workers: 137 seconds, but with an increase in flaky tests
- 12 workers: 136 seconds, also with more flaky tests
- Running "in band" (without parallel processing): The tests were significantly slower, to the point of needing to stop them.

## Key Discoveries

### Worker Count Impact

The data reveals a clear trend: increasing the number of workers up to a point can reduce test execution time. However, after a certain threshold (in this case, 8 workers), the benefits plateau, and the risk of flaky tests increases. Flaky tests are those that could pass or fail over different runs without any changes to the code.

### Jest Configuration Options

We also explored the impact of specific Jest configuration options:

- `bail: x`: (on jest.config.js) This option allows Jest to stop running tests after the first x number of failures. It’s a useful feature for quickly identifying failures without running the entire suite, especially in continuous integration (CI) environments.
- `--no-cache`: Contrary to what one might expect, disabling Jest's cache made tests run slower. Caching is a powerful feature that avoids re-translating files if they haven't changed, speeding up subsequent test runs.
- `--maxWorkers=x`: This option controls the number of worker threads Jest uses. Our tests showed that adjusting this number is a delicate balance between speed and reliability.

## Recommendations for Optimal Performance

Based on our findings, here are some recommendations to optimize Jest testing times:

1. **Tailor Worker Count to Your Environment**: Start with a moderate number of workers and incrementally increase them to find the sweet spot for your specific project and hardware.
1. **Use Caching Wisely**: Unless there’s a specific reason to disable caching, keeping it enabled can significantly reduce test times.
1. **Consider bail for Faster CI Feedback**: When running tests in a CI environment, using the bail option can help identify failures faster without waiting for the entire suite to run.
1. **Monitor for Flakiness**: As you adjust workers and other settings, keep an eye out for flaky tests, which can undermine confidence in your test suite.

## Conclusion

Jest offers flexibility and options to optimize testing based on your project's needs and your hardware capabilities. Our exploration underscores the importance of fine-tuning Jest configurations and provides a starting point for developers looking to improve their testing efficiency. Remember, the optimal setup can vary widely, so experimentation tailored to your specific context is key.
