import { forwardRef, useEffect, useId, useRef, useState } from 'react'
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
    <div className="relative min-h-screen overflow-hidden text-slate-900">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src={gettyVideo}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:flex-row lg:px-8">
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:flex-1">
          <div className="space-y-6 rounded-3xl bg-white/85 p-10 shadow-xl ring-1 ring-slate-200 backdrop-blur-xl">
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

function AboutPage({ onBack, onJoin }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-lg font-bold text-emerald-700">Smart Food Redistribution</div>
          <button
            onClick={onBack}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Back
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Reducing Food Waste, Feeding Lives
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Connecting restaurants, NGOs, and volunteers to redistribute surplus food efficiently.
            </p>
            <button
              onClick={onJoin}
              className="mt-8 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-500"
            >
              Donate Now
            </button>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 via-white to-cyan-100">
              <span className="text-xl font-semibold text-slate-600">🤝 Community donation illustration</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-slate-900">About the Platform</h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            We empower food donors, NGOs, and volunteers to coordinate in real-time, ensuring surplus meals are diverted from waste to relief.
          </p>
          <p className="mt-3 max-w-3xl text-slate-600">
            Donors share available food, NGOs schedule pickups, and volunteers complete deliveries, creating a seamless redistribution chain.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-slate-900">Mission & Vision</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
              <h3 className="text-xl font-semibold text-emerald-700">Mission</h3>
              <p className="mt-2 text-slate-700">To reduce food waste and ensure that surplus food reaches those in need.</p>
            </div>
            <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-6">
              <h3 className="text-xl font-semibold text-cyan-700">Vision</h3>
              <p className="mt-2 text-slate-700">To build a sustainable and hunger-free community using technology.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-slate-900">How It Works</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <div className="mb-3 text-2xl">🍽️</div>
              <h3 className="font-semibold">1. Restaurants upload food</h3>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <div className="mb-3 text-2xl">📩</div>
              <h3 className="font-semibold">2. NGOs receive alerts</h3>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <div className="mb-3 text-2xl">🚚</div>
              <h3 className="font-semibold">3. Volunteers deliver</h3>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <div className="mb-3 text-2xl">🤲</div>
              <h3 className="font-semibold">4. People are fed</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-slate-900">Impact</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <p className="text-3xl font-bold text-emerald-600">10k+</p>
              <p className="text-sm text-slate-600">Meals Saved</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <p className="text-3xl font-bold text-emerald-600">5k+</p>
              <p className="text-sm text-slate-600">Food Donations</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <p className="text-3xl font-bold text-emerald-600">1.8k+</p>
              <p className="text-sm text-slate-600">Active Volunteers</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <p className="text-3xl font-bold text-emerald-600">250+</p>
              <p className="text-sm text-slate-600">NGOs Connected</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-slate-900">Why Choose Us</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li className="rounded-lg bg-white p-4 shadow-sm">Real-time food redistribution</li>
            <li className="rounded-lg bg-white p-4 shadow-sm">Easy-to-use platform</li>
            <li className="rounded-lg bg-white p-4 shadow-sm">Social impact driven</li>
            <li className="rounded-lg bg-white p-4 shadow-sm">Scalable and efficient system</li>
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-slate-900">Meet the Team</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['Aanya - Founder', 'Rohan - CTO', 'Mira - Ops Lead', 'Arjun - Community'].map((member) => (
              <div key={member} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-emerald-100 text-2xl leading-[64px]">👤</div>
                <p className="font-semibold text-slate-800">{member.split(' - ')[0]}</p>
                <p className="text-sm text-slate-500">{member.split(' - ')[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-700 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">Contact</p>
            <p>support@smartfoodredistribution.org | +91 98765 43210</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-slate-700 hover:text-emerald-600">Twitter</a>
            <a href="#" className="text-slate-700 hover:text-emerald-600">LinkedIn</a>
            <a href="#" className="text-slate-700 hover:text-emerald-600">Instagram</a>
          </div>
          <div>&copy; {new Date().getFullYear()} Smart Food Redistribution. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

const AboutSection = forwardRef(({ onDonate, onPartnerNGO }, ref) => (
  <div ref={ref} className="bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900">How You Can Help Us</h2>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Our platform empowers communities by reducing food waste and supporting those in need. You can contribute in multiple ways.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: '💰',
              title: 'Support the Cause',
              description: 'Contribute to reducing food waste and helping communities by supporting our mission.',
              label: 'Support Now',
              action: 'donate',
            },
            {
              icon: '🍛',
              title: 'Donate Food',
              description: 'Restaurants and individuals can donate surplus food to ensure it reaches those in need.',
              label: 'Donate Now',
              action: 'donate',
            },
            {
              icon: '🤝',
              title: 'Partner as NGO',
              description: 'Join as an NGO to collect, manage, and distribute food efficiently using our platform.',
              label: 'Join as NGO',
              action: 'ngo',
            },
          ].map((card, index) => (
            <article
              key={card.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ animation: `fadeInUp 0.55s ease ${index * 0.08}s both` }}
            >
              <div className="text-4xl">{card.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-slate-600">{card.description}</p>
              <button
                type="button"
                onClick={() => {
                  if (card.action === 'ngo') {
                    onPartnerNGO?.()
                  } else {
                    onDonate?.()
                  }
                }}
                className="mt-5 inline-flex items-center rounded-full bg-[#16A34A] px-4 py-2 text-sm font-semibold text-white transition-transform duration-150 hover:bg-[#15803d] active:scale-95"
              >
                {card.label}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-slate-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900">About Us</h2>
        <p className="mt-5 max-w-3xl text-lg text-slate-600">
          We connect restaurants, NGOs, and volunteers for smart food redistribution. Surplus food is quickly assigned to nearby partners and delivered to people in need.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-slate-900">Mission</h3>
            <p className="mt-2 text-slate-600">To reduce food waste and ensure surplus food reaches those in need.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-slate-900">Vision</h3>
            <p className="mt-2 text-slate-600">To build a sustainable, hunger-free community using technology.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-slate-900">How it Works</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-600">
              <li>Restaurants upload food</li>
              <li>NGOs receive requests</li>
              <li>Volunteers pickup and deliver</li>
              <li>Food reaches people in need</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-slate-900">Impact</h3>
            <p className="mt-2 text-slate-600">Track meals saved, volunteers active, donations shared, and NGOs connected.</p>
          </div>
        </div>
      </div>
    </section>

    <style>{`
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes scalePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
    `}</style>
  </div>
))

function NGODashboard({ onBack }) {
  const [counters] = useState({ deliveries: 115, tasks: 8, meals: 875 })
  const [activeTask, setActiveTask] = useState(null)
  const [candidateTasks, setCandidateTasks] = useState([
    { id: 1, food: 'Mixed Veg Thali', quantity: '25 meals', restaurant: 'Green Spice', distance: '1.2 km', pickup: '14:30' },
    { id: 2, food: 'Rice and Dal', quantity: '40 meals', restaurant: 'Urban Dine', distance: '2.1 km', pickup: '15:00' },
    { id: 3, food: 'Fruit Boxes', quantity: '20 meals', restaurant: 'Fresh Farm', distance: '0.9 km', pickup: '15:40' },
  ])
  const [history, setHistory] = useState([])
  const [notifications, setNotifications] = useState([
    'New priority task near your location',
    'Task completed by Reena, 20 min ago',
  ])
  const [volunteer, setVolunteer] = useState({ name: '', phone: '', notes: '' })

  const acceptTask = (task) => {
    setActiveTask({ ...task, status: 'ready' })
    setCandidateTasks((prev) => prev.filter((t) => t.id !== task.id))
  }

  const assignVolunteer = () => {
    if (!activeTask) return
    setActiveTask((task) => ({ ...task, assignedVolunteer: volunteer }))
    setNotifications((prev) => [...prev, `Volunteer ${volunteer.name} assigned to task ${activeTask?.id}`])
    setVolunteer({ name: '', phone: '', notes: '' })
  }

  const pickupTask = () => {
    if (!activeTask) return
    setActiveTask((task) => ({ ...task, status: 'picked' }))
  }

  const deliverTask = () => {
    if (!activeTask) return
    setHistory((prev) => [
      ...prev,
      { ...activeTask, status: 'delivered', date: new Date().toLocaleDateString() },
    ])
    setActiveTask(null)
  }

  const progress = activeTask?.status === 'picked' ? 80 : 40

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center font-bold">NGO</div>
            <div>
              <h1 className="text-lg font-bold">NGO Delivery Dashboard</h1>
              <p className="text-xs text-slate-500">Manage requests, assign volunteers, and track deliveries</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 shadow-sm hover:bg-slate-100">🔔 <span className="ml-1 rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">{notifications.length}</span></button>
            <button className="rounded-full bg-[#16A34A] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#15803d]" onClick={onBack}>Logout</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
            <h3 className="text-sm font-semibold text-slate-500">Total Deliveries</h3>
            <p className="mt-2 text-3xl font-bold text-[#16A34A]">{counters.deliveries}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
            <h3 className="text-sm font-semibold text-slate-500">Active Tasks</h3>
            <p className="mt-2 text-3xl font-bold text-[#F97316]">{counters.tasks}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
            <h3 className="text-sm font-semibold text-slate-500">Meals Delivered</h3>
            <p className="mt-2 text-3xl font-bold text-[#16A34A]">{counters.meals}</p>
          </div>
        </div>

        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Available Tasks</h2>
            <p className="text-sm text-slate-500">Swipe or tap to accept a task</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {candidateTasks.map((task) => (
              <article key={task.id} className="rounded-2xl border border-transparent bg-white p-5 shadow-sm transition hover:shadow-xl hover:-translate-y-2 hover:border-gradient-to-r hover:border-[#16A34A]" style={{ borderImage: 'linear-gradient(90deg, #16A34A, #F97316) 1' }}>
                <h3 className="text-lg font-semibold">{task.food}</h3>
                <p className="text-xs text-slate-500">{task.restaurant} • {task.quantity}</p>
                <p className="mt-2 text-sm text-slate-600">Distance: {task.distance}</p>
                <p className="text-sm text-slate-600">Pickup: {task.pickup}</p>
                <button className="mt-4 rounded-xl bg-[#F97316] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ea580c] active:scale-95" onClick={() => acceptTask(task)}>
                  Accept Task
                </button>
              </article>
            ))}
          </div>
        </section>

        {activeTask && (
          <section className="mb-8 rounded-2xl bg-[#16A34A] bg-opacity-10 p-6 shadow-lg">
            <h3 className="mb-2 text-xl font-bold text-[#065f46]">Active Task</h3>
            <p className="text-sm text-slate-700">{activeTask.food} at {activeTask.restaurant}</p>
            <p className="text-sm text-slate-700">NGO Delivery Location: {activeTask.restaurant} Community Center</p>
            <p className="mt-2 text-sm text-slate-700">Contact: +91-9876543210</p>

            <div className="mt-4 space-y-3 rounded-xl bg-white p-4 text-sm text-slate-700 shadow-sm">
              <h4 className="font-semibold">Assign Volunteer</h4>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  value={volunteer.name}
                  onChange={(e) => setVolunteer((v) => ({ ...v, name: e.target.value }))}
                  placeholder="Volunteer Name"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                />
                <input
                  value={volunteer.phone}
                  onChange={(e) => setVolunteer((v) => ({ ...v, phone: e.target.value }))}
                  placeholder="Phone Number"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                />
              </div>
              <textarea
                value={volunteer.notes}
                onChange={(e) => setVolunteer((v) => ({ ...v, notes: e.target.value }))}
                placeholder="Notes (optional)"
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                rows={3}
              />
              <button
                type="button"
                className="rounded-lg bg-[#16A34A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#15803d] active:scale-95"
                onClick={assignVolunteer}
              >
                Assign Volunteer
              </button>
              {activeTask.assignedVolunteer && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-600">
                  Assigned: {activeTask.assignedVolunteer.name} • {activeTask.assignedVolunteer.phone}
                </div>
              )}
            </div>

            <div className="mb-4 mt-4 h-2 rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-orange-500" style={{ width: `${progress}%`, transition: 'width 0.3s ease' }} />
            </div>
            <div className="flex gap-3">
              <button className="rounded-lg bg-[#16A34A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#15803d]" onClick={pickupTask}>Mark as Picked Up</button>
              <button className="rounded-lg bg-[#F97316] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ea580c]" onClick={deliverTask}>Mark as Delivered</button>
            </div>
          </section>
        )}

        <section className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h4 className="text-lg font-semibold">Map</h4>
            <div className="mt-3 h-64 rounded-xl border border-slate-200 bg-slate-100">
              <iframe
                title="Volunteer route map"
                src="https://www.google.com/maps/embed?pb=!1m18..."
                className="h-full w-full rounded-xl"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h4 className="text-lg font-semibold">Task History</h4>
            <div className="mt-3 space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-slate-500">No completed tasks yet.</p>
              ) : history.map((item, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700" style={{ animation: `fadeInUp 0.4s ease ${i * 0.1}s both` }}>
                  <div className="font-semibold text-slate-900">{item.food}</div>
                  <div>{item.date} • {item.status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h4 className="text-lg font-semibold">Gamification</h4>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-[#ecfdf5] p-4 text-center">
              <div className="text-xl font-bold text-[#16A34A]">🥇</div>
              <div className="font-semibold">Food Hero</div>
              <div className="text-sm text-slate-700">1000 points</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#ffedd5] p-4 text-center">
              <div className="text-xl font-bold text-[#f97316]">🏅</div>
              <div className="font-semibold">Top Volunteer</div>
              <div className="text-sm text-slate-700">Trusted badge</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#dbeafe] p-4 text-center">
              <div className="text-xl font-bold text-[#2563eb]">🌟</div>
              <div className="font-semibold">Leaderboard</div>
              <div className="text-sm text-slate-700">#12 this month</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function LandingPage() {

  const [page, setPage] = useState('landing')
  const heroVideoRef = useRef(null)
  const aboutRef = useRef(null)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('auth') === '1'
    } catch {
      return false
    }
  })

  const scrollToAbout = () => {
    setPage('landing')
    aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
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

  if (page === 'ngo') {
    return <NGODashboard onBack={() => setPage('landing')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-slate-900">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-tight">
            <span className="text-slate-900">Ann</span>
            <span className="text-emerald-600">Seva</span>
            
          </div> 
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <button type="button" onClick={() => setPage('landing')} className="text-slate-700 hover:text-emerald-600">
              Home
            </button>
            <button type="button" onClick={scrollToAbout} className="text-slate-700 hover:text-emerald-600">
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

      <main className="relative h-screen overflow-hidden">
        <video
          ref={heroVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={gettyVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-200 opacity-20 blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-pink-200 opacity-20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="grid w-full gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Children are the future of a thriving India.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
                We connect meals, support, and community to ensure no one goes hungry.
                Explore how you can make an impact in your neighborhood.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={goToDonate}
                  className="inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-rose-500/40 hover:bg-rose-400"
                >
                  Donate Now
                </button>
                <button
                  type="button"
                  onClick={() => setPage('login')}
                  className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
                >
                  Login / Sign up
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <AboutSection ref={aboutRef} onDonate={goToDonate} onPartnerNGO={() => setPage('ngo')} />
    </div>
  )
}
