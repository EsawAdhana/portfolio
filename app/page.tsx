import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-3xl p-8 bg-gray-800 rounded-lg shadow-xl text-white">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-700">
            <Image
              src="/profile-picture.png"
              alt="Profile picture"
              fill
              sizes="192px"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">Hi, I&apos;m Esaw Adhana.</h1>
            <p className="text-lg text-gray-300 mb-4">
              Welcome to my portfolio! I&apos;m a sophomore at Stanford University studying Computer Science.
            </p>
            <p className="text-gray-400 mb-6">
              In my free time, I like weight lifting, rock climbing, and playing poker.
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/EsawAdhana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors font-bold"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/EsawAdhana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors font-bold"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/esaw.adhana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors font-bold"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}