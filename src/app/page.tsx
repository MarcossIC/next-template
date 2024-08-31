export default function App() {
  return (
    <main data-testid="root-page" className="flex min-h-screen flex-col overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]"></div>
        <div className="absolute inset-x-0 top-[-10%] size-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3B3B3B,#00000000)]"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <main className="px-4 text-center">
          <h1 className="mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-7xl font-bold text-transparent">
            Next.js Template
          </h1>
          <p className="text-2xl text-gray-400">Inicia tu proyecto con una base sólida y moderna</p>
        </main>
      </div>

      <footer className="container relative z-10 mx-auto py-6 text-center text-gray-400">
        <small>&copy; Development by MarcossIC.</small>
      </footer>
    </main>
  );
}
