import { useState, useMemo, useEffect, useReducer } from 'react';

const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/contact`;

// 1. Reducer for managing data state
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: false };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, messages: action.payload, hasLoaded: true };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: true, hasLoaded: true };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((m) => (m._id === action.payload._id ? action.payload : m)),
      };
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter((m) => m._id !== action.payload),
      };
    default:
      return state;
  }
};

const initialState = {
  messages: [],
  loading: true,
  hasLoaded: false,
  error: false,
};

export default function ContactDashboard() {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  
  // UI State
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [actionBusy, setActionBusy] = useState(false);
  const [toast, setToast] = useState(null);

  // 2. Fetch Logic (Effect)
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const res = await fetch(`${API_BASE}?limit=100`);
        const result = await res.json();
        if (isMounted) {
          if (result.success) {
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data || [] });
          } else {
            dispatch({ type: 'FETCH_ERROR' });
          }
        }
      } catch (err) {
        console.error(err);
        if (isMounted) dispatch({ type: 'FETCH_ERROR' });
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  // 3. Manual Refresh
  const handleRefresh = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await fetch(`${API_BASE}?limit=100`);
      const result = await res.json();
      if (result.success) dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch {
      dispatch({ type: 'FETCH_ERROR' });
    }
  };

  // 4. Derived Data
  const filtered = useMemo(() => {
    let list = state.messages;
    if (filter !== 'all') list = list.filter(m => m.status === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [state.messages, filter, query]);

  const selected = useMemo(() => 
    state.messages.find(m => m._id === selectedId) || null, 
  [state.messages, selectedId]);

  const counts = useMemo(() => {
    const c = { all: state.messages.length, new: 0, read: 0 };
    state.messages.forEach(m => { if (c[m.status] !== undefined) c[m.status]++; });
    return c;
  }, [state.messages]);

  // 5. Actions
  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(null), 2200);
  };

  async function updateStatus(id, status, silent = false) {
    if (!silent) setActionBusy(true);
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const result = await res.json();
      if (result.success) {
        dispatch({ type: 'UPDATE_MESSAGE', payload: result.data });
        if (!silent) showToast(`Marked as ${status}`);
      }
    } finally {
      setActionBusy(false);
    }
  }

  async function deleteMessage(id) {
    if (!window.confirm("Delete this message?")) return;
    setActionBusy(true);
    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      dispatch({ type: 'DELETE_MESSAGE', payload: id });
      setSelectedId(null);
      showToast('Deleted');
    } finally {
      setActionBusy(false);
    }
  }

  const handleSelectMessage = (m) => {
    setSelectedId(m._id);
    if (m.status === 'new') {
      updateStatus(m._id, 'read', true);
    }
  };

  const getInitials = (n) => (n || '??').split(' ').filter(Boolean).slice(0, 2).map(p => p[0]?.toUpperCase()).join('');

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden font-sans">
      <header className="bg-white border-b p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
          <div>
            <h1 className="font-bold text-gray-900 leading-none">Inbox</h1>
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">{counts.all} messages</p>
          </div>
        </div>
        <button onClick={handleRefresh} disabled={state.loading} className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30">
          <svg className={`w-5 h-5 text-gray-600 ${state.loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth={2}/>
          </svg>
        </button>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className={`w-full md:w-80 border-r bg-white flex flex-col ${selected ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 space-y-3 border-b border-gray-50">
            <input 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                placeholder="Search inbox..." 
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-emerald-100 transition-all"
            />
            <div className="flex gap-2">
              {['all', 'new', 'read'].map(k => (
                <button key={k} onClick={() => setFilter(k)} className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${filter === k ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                  {k} ({counts[k]})
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {state.loading && !state.hasLoaded ? (
              <div className="p-10 text-center text-gray-400 text-xs font-medium uppercase tracking-widest">Loading...</div>
            ) : filtered.map(m => (
              <button key={m._id} onClick={() => handleSelectMessage(m)} className={`w-full p-4 border-b border-gray-50 text-left hover:bg-gray-50 transition-colors ${selectedId === m._id ? 'bg-emerald-50/50' : ''}`}>
                <p className={`text-sm truncate ${m.status === 'new' ? 'font-bold text-gray-900' : 'text-gray-600'}`}>{m.name}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{m.subject}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 flex flex-col bg-white ${!selected ? 'hidden md:flex' : 'flex'}`}>
          {selected ? (
            <>
              <div className="p-6 border-b border-gray-50">
                <button onClick={() => setSelectedId(null)} className="md:hidden text-emerald-600 font-bold text-sm mb-4 flex items-center gap-1">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2}/></svg> Back
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg">{getInitials(selected.name)}</div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 leading-tight">{selected.subject}</h2>
                        <p className="text-emerald-600 text-sm font-medium">{selected.email}</p>
                    </div>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selected.message}</p>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center px-6">
                <div className="flex gap-2">
                  <button 
                    disabled={actionBusy}
                    onClick={() => updateStatus(selected._id, selected.status === 'read' ? 'new' : 'read')} 
                    className="px-5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:shadow-sm transition-all disabled:opacity-50"
                  >
                    Mark {selected.status === 'read' ? 'Unread' : 'Read'}
                  </button>
                </div>
                <button 
                    disabled={actionBusy}
                    onClick={() => deleteMessage(selected._id)} 
                    className="text-red-500 text-xs font-bold px-4 py-2 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
                >
                    Delete
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-2">
               <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" strokeWidth={1}/></svg>
               <p className="text-sm font-bold uppercase tracking-widest opacity-40">Select a message</p>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl z-50 animate-bounce">
          {toast}
        </div>
      )}
    </div>
  );
}