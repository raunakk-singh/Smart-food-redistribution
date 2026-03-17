import { useEffect, useId, useRef, useState } from 'react'
import searchLogo from './img/search.png'
import githubLogo from './img/github (1).png'
import gettyVideo from './img/gettyimages-451083741-640_adpp.mp4'

function LoginPage({ onBack, onLoginSuccess }) {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const emailOrUsernameId = useId()
  const passwordId = useId()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!emailOrUsername.trim() || !password.trim()) {
      setError('Please enter your email/username and password.')
      return
    }

    onLoginSuccess?.()
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:flex-row lg:px-8">
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:flex-1">
          <div className="space-y-6 rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
                <p className="mt-2 text-sm text-slate-500">Enter your account details to sign in.</p>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Back
              </button>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-100"
              >
                <img src={searchLogo} alt="Google" className="h-5 w-5" />
                Log in with Google
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-100"
              >
                <img src={githubLogo} alt="GitHub" className="h-5 w-5" />
                Log in with GitHub
              </button>
            </div>

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase text-slate-500">
                <span className="bg-white px-2 text-slate-600">or</span>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor={emailOrUsernameId} className="text-xs font-semibold text-slate-700">
                  Email or username
                </label>
                <input
                  id={emailOrUsernameId}
                  type="text"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  placeholder="you@example.com"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor={passwordId} className="text-xs font-semibold text-slate-700">
                  Password
                </label>
                <input
                  id={passwordId}
                  type="password"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between text-sm text-slate-600">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 bg-white text-cyan-600 focus:ring-cyan-500" />
                  Keep me signed in
                </label>
                <button type="button" className="font-medium text-cyan-600 hover:text-cyan-500">
                  Forgot password
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-cyan-500/30 hover:bg-cyan-500"
              >
                Sign in
              </button>
            </form>

            <div className="text-center text-xs text-slate-500">
              Don’t have an account?{' '}
              <button type="button" className="font-medium text-cyan-600 hover:text-cyan-500">
                Create an account
              </button>
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

function DonatePage({ onBack }) {
  const [form, setForm] = useState({
    foodName: '',
    foodType: '',
    isVeg: 'veg',
    quantity: '',
    mealsOrKg: '',
    serves: '',
    cookingTime: '',
    expiryTime: '',
    conditionFresh: false,
    conditionPacked: false,
    conditionSafe: false,
    address: '',
    location: '',
    picture: null,
    pickupWindow: '',
    instructions: '',
    name: '',
    phone: '',
  })
  const [status, setStatus] = useState('')
  const [impact, setImpact] = useState('')
  const [mapUrl, setMapUrl] = useState('https://www.google.com/maps?q=India&z=5&output=embed')

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }))
    } else if (name === 'picture') {
      setForm((prev) => ({ ...prev, picture: files[0] || null }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
      if (name === 'location' && value.trim()) {
        setMapUrl(`https://www.google.com/maps?q=${encodeURIComponent(value)}&z=15&output=embed`)
      }
    }
  }

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude.toFixed(6)},${position.coords.longitude.toFixed(6)}`
        setForm((prev) => ({
          ...prev,
          location: coords,
        }))
        setMapUrl(`https://www.google.com/maps?q=${coords}&z=15&output=embed`)
        setStatus('Current location loaded.')
      },
      () => setStatus('Unable to retrieve your location.')
    )
  }

  const estimateImpact = () => {
    const num = Number(form.quantity) || Number(form.mealsOrKg) || 0
    const factor = form.isVeg === 'veg' ? 1.5 : 1.2
    const serveCount = Math.max(1, Math.round(num * factor))
    setImpact(`⭐ This quantity can serve around ${serveCount} people.`)
  }

  const handlePost = (e) => {
    e.preventDefault()
    setStatus('✅ Donation posted successfully. Notifying nearby NGOs...')
    estimateImpact()
  }

  const handleDraft = (e) => {
    e.preventDefault()
    setStatus('Saved as draft. You can complete it later.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-lime-50 to-pink-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm hover:bg-cyan-50"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold">Donate Now Page</h2>
        </div>

        {status && (
          <div className="mb-4 rounded-lg bg-white p-4 text-sm font-medium text-cyan-800 ring-1 ring-cyan-200">
            {status}
          </div>
        )}
        {impact && (
          <div className="mb-4 rounded-lg bg-white p-4 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
            {impact}
          </div>
        )}

        <form className="space-y-6 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200" onSubmit={handlePost} noValidate>
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-3 text-xl font-semibold text-slate-800">1. Basic Food Details</h3>
            <p className="mb-4 text-sm text-slate-600">Provide accurate information to help NGO partners assess pickup and distribution requirements.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Food Name</span>
                <input name="foodName" value={form.foodName} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" placeholder="Rice, Dal, Biryani" />
              </label>
              <label className="space-y-1 text-sm">
                Food Type
                <input name="foodType" value={form.foodType} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Full meal, side, etc." />
              </label>
              <label className="space-y-1 text-sm">
                Veg / Non-Veg
                <select name="isVeg" value={form.isVeg} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2">
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                </select>
              </label>
              <label className="space-y-1 text-sm">
                Quantity
                <input name="quantity" value={form.quantity} onChange={handleChange} type="number" min="1" required className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="e.g., 10" />
              </label>
              <label className="space-y-1 text-sm">
                Number of meals / kg
                <input name="mealsOrKg" value={form.mealsOrKg} onChange={handleChange} type="number" min="1" className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="e.g., 50" />
              </label>
              <label className="space-y-1 text-sm">
                Number of people it can serve (optional)
                <input name="serves" value={form.serves} onChange={handleChange} type="number" min="1" className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="e.g., 30" />
              </label>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">⏰ 2. Food Safety Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                Cooking Time
                <input name="cookingTime" value={form.cookingTime} onChange={handleChange} required type="datetime-local" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
              </label>
              <label className="space-y-1 text-sm">
                Expiry Time / Best Before
                <input name="expiryTime" value={form.expiryTime} onChange={handleChange} required type="datetime-local" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
              </label>
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <span className="font-medium text-slate-700">Food Condition Checklist</span>
              <p className="text-xs text-slate-500">Select all applicable conditions.</p>
              <label className="inline-flex items-center gap-2">
                <input name="conditionFresh" checked={form.conditionFresh} onChange={handleChange} type="checkbox" className="h-4 w-4 rounded border-slate-300 focus:ring-2 focus:ring-cyan-100" />
                Fresh
              </label>
              <label className="inline-flex items-center gap-2">
                <input name="conditionPacked" checked={form.conditionPacked} onChange={handleChange} type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                Packed properly
              </label>
              <label className="inline-flex items-center gap-2">
                <input name="conditionSafe" checked={form.conditionSafe} onChange={handleChange} type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                Safe to consume
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-3 text-xl font-semibold text-slate-800">3. Location Details</h3>
            <p className="text-sm text-slate-600">Use precise address and live coordinates for better logistic execution.</p>
            <div className="grid gap-4 sm:grid-cols-1">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Pickup Address (auto-fill or manual)</span>
                <input name="address" value={form.address} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" placeholder="123, Mumbai" />
              </label>
              <label className="space-y-1 text-sm">
                Live Location (Google Maps integration)
                <input name="location" value={form.location} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Latitude, Longitude" />
              </label>
              <button type="button" onClick={useCurrentLocation} className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500">Use Current Location</button>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 shadow-inner">
              <h4 className="px-3 py-2 text-sm font-medium text-slate-600">Map preview</h4>
              <div className="h-64 w-full overflow-hidden rounded-b-lg">
                <iframe
                  title="Google Map Preview"
                  src={mapUrl}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">📸 4. Upload Image</h3>
            <input name="picture" type="file" accept="image/*" onChange={handleChange} className="text-sm" />
            <p className="mt-1 text-sm text-slate-500">Upload food image (for verification helps NGO trust quality)</p>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">🚚 5. Pickup Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                Pickup Time Window
                <input name="pickupWindow" value={form.pickupWindow} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="6 PM – 8 PM" />
              </label>
              <label className="space-y-1 text-sm">
                Special Instructions
                <input name="instructions" value={form.instructions} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Call before arrival / Enter from back gate" />
              </label>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">👤 6. Contact Info</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                Name
                <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Your Name" />
              </label>
              <label className="space-y-1 text-sm">
                Phone Number
                <input name="phone" value={form.phone} onChange={handleChange} required type="tel" className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="+91 98765 43210" />
              </label>
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-500">Post Donation</button>
            <button type="button" onClick={handleDraft} className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Save as Draft</button>
          </div>

          <div className="text-sm text-slate-500">⭐ Bonus: {impact || 'Fill form to get AI suggestion and impact preview.'}</div>
        </form>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [page, setPage] = useState('landing')
  const heroVideoRef = useRef(null)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('auth') === '1'
    } catch {
      return false
    }
  })
  const [postLoginTarget, setPostLoginTarget] = useState(null)

  const goToDonate = () => {
    if (isAuthenticated) {
      setPage('donate')
      return
    }
    setPostLoginTarget('donate')
    setPage('login')
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    try {
      localStorage.setItem('auth', '1')
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    const target = postLoginTarget || 'landing'
    setPostLoginTarget(null)
    setPage(target)
  }

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    const ensurePlaying = async () => {
      if (document.hidden) return
      if (video.readyState < 2) return
      if (!video.paused) return

      try {
        await video.play()
      } catch {
        // Autoplay can still be blocked in some browsers; we retry on future events/interval.
      }
    }

    const onVisibilityChange = () => {
      if (!document.hidden) ensurePlaying()
    }

    ensurePlaying()

    video.addEventListener('pause', ensurePlaying)
    video.addEventListener('ended', ensurePlaying)
    video.addEventListener('stalled', ensurePlaying)
    video.addEventListener('waiting', ensurePlaying)
    document.addEventListener('visibilitychange', onVisibilityChange)

    const interval = window.setInterval(ensurePlaying, 2000)

    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      video.removeEventListener('pause', ensurePlaying)
      video.removeEventListener('ended', ensurePlaying)
      video.removeEventListener('stalled', ensurePlaying)
      video.removeEventListener('waiting', ensurePlaying)
    }
  }, [])

  if (page === 'login') {
    return <LoginPage onBack={() => setPage('landing')} onLoginSuccess={handleLoginSuccess} />
  }

  if (page === 'donate') {
    return <DonatePage onBack={() => setPage('landing')} />
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
            <button type="button" onClick={() => setPage('landing')} className="text-slate-700 hover:text-emerald-600">
              Home
            </button>
            <button type="button" onClick={() => setPage('landing')} className="text-slate-700 hover:text-emerald-600">
              About Us
            </button>
            <button
              type="button"
              onClick={goToDonate}
              className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-rose-500/30 hover:bg-rose-400"
            >
              Donate now
            </button>
            <button
              type="button"
              onClick={() => setPage('login')}
              className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Login / Sign up
            </button>
          </nav>
          <button
            type="button"
            className="md:hidden rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
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
              <video
                ref={heroVideoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="h-full min-h-[320px] w-full object-cover"
              >
                <source src={gettyVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
