import { useState } from 'react'

function LoginPage({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:flex-row lg:px-8">
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:flex-1">
          <div className="space-y-6 rounded-3xl bg-slate-900/70 p-10 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                <p className="mt-2 text-sm text-slate-300">Enter your account details to sign in.</p>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="text-sm font-medium text-slate-300 hover:text-white"
              >
                Back
              </button>
            </div>

            <div className="space-y-3">
              <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700">
                <span className="h-5 w-5 rounded bg-white/20" />
                Log in with Google
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700">
                <span className="h-5 w-5 rounded bg-white/20" />
                Log in with GitHub
              </button>
            </div>

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase text-slate-400">
                <span className="bg-slate-900 px-2">or</span>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Email or username</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm text-slate-300">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500" />
                  Keep me signed in
                </label>
                <a href="#" className="font-medium text-emerald-400 hover:text-emerald-300">
                  Forgot password
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/30 hover:bg-emerald-500"
              >
                Sign in
              </button>
            </form>

            <div className="text-center text-xs text-slate-400">
              Don’t have an account?{' '}
              <a href="#" className="font-medium text-emerald-400 hover:text-emerald-300">
                Create an account
              </a>
            </div>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div className="h-[520px] w-[520px] rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-3xl" />
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [page, setPage] = useState('landing')

  if (page === 'login') {
    return <LoginPage onBack={() => setPage('landing')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-slate-900">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-tight">
            <span className="text-slate-900">Ann</span>
            <span className="text-emerald-600">Seva</span>
            <span className="text-slate-900">simple</span>
          </div> 
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#" className="text-slate-700 hover:text-emerald-600">
              Home
            </a>
            <a href="#" className="text-slate-700 hover:text-emerald-600">
              About Us
            </a>
            <a
              href="#donate"
              className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-rose-500/30 hover:bg-rose-400"
            >
              Donate now
            </a>
            <button
              type="button"
              onClick={() => setPage('login')}
              className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Login / Sign up
            </button>
          </nav>
          <button className="md:hidden rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
            Menu
          </button>
        </div>
      </header>

      <main className="relative h-screen">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-200 via-purple-100 to-indigo-100"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-200 opacity-40 blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-pink-200 opacity-40 blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-white/70" aria-hidden="true" />

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="grid w-full gap-10 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-lg">
              <div className="absolute inset-0 bg-white/40" />
              <div className="relative flex h-full items-center justify-center p-10">
                <div className="text-center">
                  <div className="mb-3 text-sm font-medium tracking-wide text-slate-500">
                    Video coming soon
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    Placeholder
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Children are the future of a thriving India.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
                We connect meals, support, and community to ensure no one goes hungry.
                Explore how you can make an impact in your neighborhood.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#donate"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
                >
                  Donate Now
                </a>
                <a
                  href="#learn"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
