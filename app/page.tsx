'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Tree {
  id: string;
  name: string;
}

export default function Home() {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [treeName, setTreeName] = useState('');

  const createTree = () => {
    if (!treeName.trim()) return;
    setTrees([...trees, { id: Date.now().toString(), name: treeName }]);
    setTreeName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-indigo-600">🌳 Family Tree</h1>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Create a New Family Tree</h2>
          <div className="flex gap-4">
            <input type="text" value={treeName} onChange={(e) => setTreeName(e.target.value)} placeholder="Enter family tree name..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" onKeyPress={(e) => e.key === 'Enter' && createTree()} />
            <button onClick={createTree} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Create</button>
          </div>
        </div>
        {trees.length === 0 ? (
          <div className="text-center py-12"><p className="text-gray-600 text-lg">No family trees yet. Create one above!</p></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trees.map((tree) => (
              <div key={tree.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
                <h3 className="text-xl font-bold mb-4">{tree.name}</h3>
                <div className="flex gap-2">
                  <Link href={`/editor/${tree.id}`} className="flex-1 text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Edit</Link>
                  <button onClick={() => setTrees(trees.filter(t => t.id !== tree.id))} className="flex-1 text-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
