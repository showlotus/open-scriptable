// @ts-nocheck
function render() {
  async function fetchWithTimeout(url, timeoutMs = 3000) {
    const fetchPromise = (async () => {
      const req = new Request(url);
      return await req.loadString();
    })();
    const timeoutPromise = (async () => {
      await new Promise(resolve => {
        Timer.schedule(timeoutMs, false, resolve);
      });
      throw new Error(`Timeout after ${timeoutMs} ms`);
    })();
    return Promise.race([fetchPromise, timeoutPromise]);
  }

  try {
    const url = 'http://192.168.5.2:3000/src/hello-world.ts';
    const code = await fetchWithTimeout(url);
    const render = new Function(code);
    await render();
  } catch (err) {
    console.error(err);
  } finally {
    Script.complete();
  }
}

render();
