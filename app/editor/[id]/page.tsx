'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Member {
  id: string;
  name: string;
  dob: string;
  location: string;
}

interface Relationship {
  id: string;
  person1: string;
  person2: string;
  type: string;
}

export default function Editor() {
  const router = useRouter();
  const params = useParams();
  const treeId = params.id as string;

  const [members, setMembers] = useState<Member[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [view, setView] = useState<'members' | 'relationships' | 'view'>('members');

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [location, setLocation] = useState('');
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');
  const [relType, setRelType] = useState('parent');

  const addMember = () => {
    if (!name.trim()) return;
    setMembers([...members, { id: Date.now().toString(), name, dob, location }]);
    setName('');
    setDob('');
    setLocation('');
  };

  const addRelationship = () => {
    if (!person1 || !person2 || person1 === person2) return;
    setRelationships([...relationships, { id: Date.now().toString(), person1, person2, type: relType }]);
    setPerson1('');
    setPerson2('');
  };

  const getMemberName = (id: string) => members.find(m => m.id === id)?.name || '?';
  const relLabels: Record<string, string> = {
    parent: 'Parent of',
    child: 'Child of',
    spouse: 'Spouse of',
    sibling: 'Sibling of',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Family Tree Editor</h1>
          <button onClick={() => router.back()} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            ← Back
          </button>
        </div>
      </nav>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-4">
          <button onClick={() => setView('members')} className={`px-4 py-2 rounded ${view === 'members' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
            Add Members
          </button>
          <button onClick={() => setView('relationships')} className={`px-4 py-2 rounded ${view === 'relationships' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
            Add Relationships
          </button>
          <button onClick={() => setView('view')} className={`px-4 py-2 rounded ${view === 'view' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
            View Tree
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {view === 'members' && (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Add Family Member</h2>
            <div className="space-y-4 max-w-md">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-2 border rounded" />
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full px-4 py-2 border rounded" />
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full px-4 py-2 border rounded" />
              <button onClick={addMember} className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Add Member
              </button>
            </div>
            {members.length > 0 && (
              <div className="mt-8">
                <h3 className="font-bold mb-4">Members ({members.length})</h3>
                <div className="space-y-2">
                  {members.map(m => (
                    <div key={m.id} className="p-3 bg-gray-100 rounded">
                      <div className="font-bold">{m.name}</div>
                      {m.dob && <div className="text-sm text-gray-600">DOB: {m.dob}</div>}
                      {m.location && <div className="text-sm text-gray-600">📍 {m.location}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'relationships' && (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Add Relationship</h2>
            <div className="space-y-4 max-w-md">
              <select value={person1} onChange={(e) => setPerson1(e.target.value)} className="w-full px-4 py-2 border rounded">
                <option value="">Select Person 1</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <select value={relType} onChange={(e) => setRelType(e.target.value)} className="w-full px-4 py-2 border rounded">
                <option value="parent">Parent</option>
                <option value="child">Child</option>
                <option value="spouse">Spouse</option>
                <option value="sibling">Sibling</option>
              </select>
              <select value={person2} onChange={(e) => setPerson2(e.target.value)} className="w-full px-4 py-2 border rounded">
                <option value="">Select Person 2</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <button onClick={addRelationship} className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Add Relationship
              </button>
            </div>
            {relationships.length > 0 && (
              <div className="mt-8">
                <h3 className="font-bold mb-4">Relationships ({relationships.length})</h3>
                <div className="space-y-2">
                  {relationships.map(r => (
                    <div key={r.id} className="p-3 bg-gray-100 rounded">
                      <strong>{getMemberName(r.person1)}</strong> is {relLabels[r.type]} <strong>{getMemberName(r.person2)}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'view' && (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Family Tree Overview</h2>
            {members.length === 0 ? (
              <p className="text-gray-600">No members added yet</p>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-4">Members ({members.length})</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {members.map(m => (
                      <div key={m.id} className="p-4 bg-indigo-50 rounded border border-indigo-200">
                        <div className="font-bold text-lg">{m.name}</div>
                        {m.dob && <div className="text-sm text-gray-600">Born: {m.dob}</div>}
                        {m.location && <div className="text-sm text-gray-600">📍 {m.location}</div>}
                      </div>
                    ))}
                  </div>
                </div>
                {relationships.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-4">Relationships ({relationships.length})</h3>
                    <div className="space-y-2">
                      {relationships.map(r => (
                        <div key={r.id} className="p-3 bg-gray-100 rounded">
                          <strong>{getMemberName(r.person1)}</strong> is {relLabels[r.type]} <strong>{getMemberName(r.person2)}</strong>
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
