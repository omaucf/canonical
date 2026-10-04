import { useState } from "react";

import { invoke } from "@tauri-apps/api/core";

function Experience() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 lg:grow">
      <div className="flex gap-2">
        <img
          alt="Engine"
          className="transition-[filter] duration-700 hover:drop-shadow-[0_0_2em_#24c8db]"
          height={96}
          src="/tauri.svg"
          width={96}
        />
      </div>
      <h1 className="text-2xl font-semibold md:text-5xl">@studio</h1>
      <form
        className="flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          className="mr-1.25 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-100 transition-colors outline-none placeholder:text-zinc-500 focus:border-zinc-500"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 font-medium text-zinc-100 transition-colors hover:border-zinc-500 active:bg-zinc-800"
          type="submit"
        >
          Greet
        </button>
      </form>
      <p className="text-zinc-400">{greetMsg}</p>
    </div>
  );
}

export default Experience;
