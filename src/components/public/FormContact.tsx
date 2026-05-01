"use client";

export const FormContact = () => {
  return (
    <form
      className="flex flex-col h-auto w-full sm:w-[1000px] bg-pblue/90 rounded-2xl text-center gap-5 p-5"
      onSubmit={(e) => {}}
    >
      <h1 className="text-5xl text-center text-white font-bold">CONTACT US</h1>
      <div className="flex flex-row gap-5">
        <input
          placeholder="First Name"
          className="flex-1 min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
          value={""}
          onChange={(e) => {}}
          required
          type="text"
          name="first-name"
        />
        <input
          placeholder="Last Name"
          className="flex-1 min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
          required
          value={""}
          onChange={(e) => {}}
          type="text"
          name="last-name"
        />
      </div>
      <input
        placeholder="Email"
        className="w-full min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
        required
        value={""}
        onChange={(e) => {}}
        type="email"
        name="email"
      />
      <div className="flex flex-row gap-5">
        <input
          placeholder="Zip Code"
          className="flex-1 min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
          required
          value={""}
          onChange={(e) => {}}
          type="number"
          name="zip-code"
        />
        <input
          placeholder="Phone Number"
          className="flex-1 min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
          required
          value={""}
          onChange={(e) => {}}
          type="number"
          name="phone-number"
        />
      </div>
      <textarea
        placeholder="Comments"
        className="w-full min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
        maxLength={200}
        rows={5}
        value={""}
        onChange={(e) => {}}
        name="comments"
      />

      <button
        type="submit"
        disabled={false}
        className="w-full px-6 py-4 bg-pgreen/95 text-white text-xl font-bold rounded-xl hover:bg-pgreen hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 active:translate-y-0 tracking-wide"
      >
        {"Contact"}
      </button>

      {/*error && <ErrorDialog error={error} />}
      {loading.status === "loaded" && (
        <SuccessDialog message={loading.message} />
      )*/}
    </form>
  );
};
