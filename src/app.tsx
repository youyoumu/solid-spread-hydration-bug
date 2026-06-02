import { createSignal, createMemo, onMount } from "solid-js";

function App() {
  const [count, setCount] = createSignal(0);
  const [ref, setRef] = createSignal<HTMLDivElement>();

  const data = createMemo(() => {
    return {
      "data-whatever": count() === 1 ? "yes" : "no",
    };
  });

  onMount(() => {
    console.log(ref()?.textContent); // Hello world!
    setCount(1);
    setTimeout(() => {
      console.log(ref()?.textContent); // <empty>
      console.log(ref()?.getAttribute("data-whatever")); // yes
      console.log(ref()?.getAttribute("class")); // flex
      console.log(ref()?.getAttribute("style")); // color: red
    }, 500);
  });

  return (
    <div
      ref={setRef}
      {...data()}
      class="flex"
      style="color: red"
      innerHTML="Hello world!"
    ></div>
  );
}

export default App;

// Works fine if not spreaded
function App2() {
  const [count, setCount] = createSignal(0);
  const [ref, setRef] = createSignal<HTMLDivElement>();

  onMount(() => {
    console.log(ref()?.textContent); // Hello world!
    setCount(1);
    setTimeout(() => {
      console.log(ref()?.textContent); // Hello world!
      console.log(ref()?.getAttribute("data-whatever")); // yes
      console.log(ref()?.getAttribute("class")); // flex
      console.log(ref()?.getAttribute("style")); // color: red
    }, 500);
  });

  return (
    <div
      ref={setRef}
      data-whatever={count() === 1 ? "yes" : "no"}
      class="flex"
      style="color: red"
      innerHTML="Hello world!"
    ></div>
  );
}
