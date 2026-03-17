import { useEffect, useMemo, useState } from 'react'

function App() {
  const [health, setHealth] = useState(null)
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setError('')
    const [hRes, listRes] = await Promise.all([
      fetch('/api/health'),
      fetch('/api/foods'),
    ])
    const hJson = await hRes.json()
    setHealth(hJson)

    if (listRes.ok) {
      const listJson = await listRes.json()
      setItems(listJson.items || [])
    } else {
      const e = await listRes.json().catch(() => null)
      setError(e?.error || 'Failed to load foods')
    }
  }

  useEffect(() => {
    load().catch((e) => setError(e?.message || 'Failed to load'))
  }, [])

  const canSubmit = useMemo(() => name.trim().length > 0 && !busy, [name, busy])

  async function onAdd(e) {
    e.preventDefault()
    if (!canSubmit) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/foods', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          calories: calories === '' ? undefined : Number(calories),
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => null)
        throw new Error(j?.error || 'Failed to create item')
      }
      setName('')
      setCalories('')
      await load()
    } catch (e2) {
      setError(e2?.message || 'Failed to create item')
    } finally {
      setBusy(false)
    }
  }

  async function onDelete(id) {
    setBusy(true)
    setError('')
    try {
      const res = await fetch(`/api/foods/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const j = await res.json().catch(() => null)
        throw new Error(j?.error || 'Failed to delete item')
      }
      await load()
    } catch (e2) {
      setError(e2?.message || 'Failed to delete item')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Vite + React + Tailwind
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Food project starter
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Full-stack is wired: the frontend proxies <code className="rounded bg-black/30 px-2 py-0.5">/api</code>{' '}
          to the backend.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-medium text-slate-100">API status</div>
            <div className="mt-2 text-sm text-slate-300">
              {health?.ok ? (
                <>
                  Connected to <span className="text-emerald-300">food-api</span>{' '}
                  at{' '}
                  <code className="rounded bg-black/30 px-2 py-0.5">
                    /api/health
                  </code>
                </>
              ) : (
                <>Starting…</>
              )}
            </div>
            {error ? (
              <div className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                {error}
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-medium text-slate-100">
              Add food item
            </div>
            <form onSubmit={onAdd} className="mt-3 flex gap-2">
              <input
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                placeholder="Name (e.g. Apple)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-32 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                placeholder="kcal"
                inputMode="numeric"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-40"
              >
                {busy ? '…' : 'Add'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-medium text-slate-100">Food items</div>
          <div className="mt-3 divide-y divide-white/10">
            {items.length === 0 ? (
              <div className="py-4 text-sm text-slate-300">No items yet.</div>
            ) : (
              items.map((it) => (
                <div
                  key={it._id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm text-slate-100">
                      {it.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {Number(it.calories || 0)} kcal
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDelete(it._id)}
                    disabled={busy}
                    className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-slate-200 hover:border-white/20 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
