'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Member {
  id: number;
  name: string;
  dob: string;
  location: string;
}

interface Rel {
  id: number;
  p1: number;
  p2: number;
  type: string;
}

export default function Editor({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [relationships, setRelationships] = useState<Rel[]>([]);
  const [view, setView] = useState('members');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [location, setLocation] = useState('');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [relType, setRelType] = useState('parent');

  const addMember = () => {
    if (!name.trim()) return;
    setMembers([...members, { id: Date.now(), name, dob, location }]);
    setName('');
    setDob('');
    setLocation('');
  };

  const addRel = () => {
    if (!p1 || !p2 || p1 === p2) return;
    setRelationships([...relationships, { id: Date.now(), p1: Number(p1), p2: Number(p2), type: relType }]);
    setP1('');
    setP2('');
  };

  const getName = (id: any) => members.find(m => m.id === id)?.name || '?';
  const relLabels: Record<string, string> = { parent: 'Parent of', child: 'Child of', spouse: 'Spouse of', sibling: 'Sibling of' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
      </div>

      <nav className="relative backdrop-blur-md bg-white/10 border-b border-white/20 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Family Tree Editor</h1>
          <button onClick={() => router.back()} className="px-6 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 font-semibold transition-all">← Back</button>
        </div>
      </nav>

      <div className="relative backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-3">
          {['members', 'relationships', 'view'].map(v => (
            <button 
              key={v}
              onClick={() => setView(v)} 
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${view === v ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' : 'backdrop-blur-xl bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'}`}
            >
              {v === 'members' ? 'Members' : v === 'relationships' ? 'Relationships' : 'View'}
            </button>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {view === 'members' && (
          <div className="backdrop-blur-3xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10">
            <h2 className="text-3xl font-bold text-white mb-8">Add Family Member</h2>
            <div className="space-y-4 max-w-md mb-8">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full px-5 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 font-medium transition-all" />
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full px-5 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 font-medium transition-all" />
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full px-5 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 font-medium transition-all" />
              <button onClick={addMember} className="w-full px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 font-bold text-lg transition-all">Add Member</button>
            </div>
            {members.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Members ({members.length})</h3>
                <div className="space-y-3">
                  {members.map(m => (
                    <div key={m.id} className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-lg p-4 hover:bg-white/10 transition-all">
                      <div className="font-bold text-white text-lg">{m.name}</div>
                      {m.dob && <div className="text-sm text-gray-400">DOB: {m.dob}</div>}
                      {m.location && <div className="text-sm text-gray-400">📍 {m.location}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'relationships' && (
          <div className="backdrop-blur-3xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10">
            <h2 className="text-3xl font-bold text-white mb-8">Add Relationship</h2>
            <div className="space-y-4 max-w-md mb-8">
              <select value={p1} onChange={(e) => setP1(e.target.value)} className="w-full px-5 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 font-medium transition-all">
                <option value="">Select Person 1</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <select value={relType} onChange={(e) => setRelType(e.target.value)} className="w-full px-5 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 font-medium transition-all">
                <option value="parent">Parent</option>
                <option value="child">Child</option>
                <option value="spouse">Spouse</option>
                <option value="sibling">Sibling</option>
              </select>
              <select value={p2} onChange={(e) => setP2(e.target.value)} className="w-full px-5 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 font-medium transition-all">
                <option value="">Select Person 2</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <button onClick={addRel} className="w-full px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 font-bold text-lg transition-all">Add Relationship</button>
            </div>
            {relationships.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Relationships ({relationships.length})</h3>
                <div className="space-y-3">
                  {relationships.map(r => (
                    <div key={r.id} className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-lg p-4 hover:bg-white/10 transition-all text-gray-200">
                      <strong className="text-white">{getName(r.p1)}</strong> is {relLabels[r.type]} <strong className="text-white">{getName(r.p2)}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'view' && (
          <div className="backdrop-blur-3xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10">
            <h2 className="text-3xl font-bold text-white mb-8">Family Tree Overview</h2>
            {members.length === 0 ? (
              <p className="text-gray-400 text-lg">No members added yet</p>
            ) : (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Members ({members.length})</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {members.map(m => (
                      <div key={m.id} className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/50 rounded-lg p-5">
                        <div className="font-bold text-white text-lg">{m.name}</div>
                        {m.dob && <div className="text-sm text-gray-300">Born: {m.dob}</div>}
                        {m.location && <div className="text-sm text-gray-300">📍 {m.location}</div>}
                      </div>
                    ))}
                  </div>
                </div>
                {relationships.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Relationships ({relationships.length})</h3>
                    <div className="space-y-3">
                      {relationships.map(r => (
                        <div key={r.id} className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-lg p-4 text-gray-200">
                          <strong className="text-white">{getName(r.p1)}</strong> is {relLabels[r.type]} <strong className="text-white">{getName(r.p2)}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
