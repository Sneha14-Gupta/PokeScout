export default function InfoPageHeader({ generation }) {
  function navigationBack() {
    window.history.back();
  }

  return (
    <div className="flex justify-between items-center">
      <section>
        <div>
          <h1 className="text-xl md:text-4xl font-bold text-center">
            Pokémon Generation {generation}
          </h1>
        </div>
        <div>
          <h2 className="md:text-2xl font-semibold text-center md:text-left">
            Gotta Catch 'Em All!
          </h2>
        </div>
      </section>
      <button
        type="button"
        onClick={navigationBack}
        className="text-2xl text-black font-thin bg-gradient-to-br from-yellow-400 to-yellow-300 border-yellow-500 border h-fit py-1 px-3 rounded-xl cursor-pointer mt-3 transition-all hover:scale-105"
        aria-label="Go back"
      >
        Previous
      </button>
    </div>
  );
}
