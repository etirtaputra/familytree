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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
      </div>

      <nav className="relative backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">🌳 Family Tree</h1>
        </div>
      </nav>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="backdrop-blur-3xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 mb-12 hover:bg-white/[0.15] transition-all duration-300">
          <h2 className="text-3xl font-bold text-white mb-8">Create a New Family Tree</h2>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={treeName} 
              onChange={(e) => setTreeName(e.target.value)} 
              placeholder="Enter family tree name..." 
              className="flex-1 px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 transition-all text-lg font-medium"
              onKeyPress={(e) => e.key === 'Enter' && createTree()} 
            />
            <button 
              onClick={createTree} 
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 font-bold transition-all duration-300 text-lg"
            >
              Create
            </button>
          </div>
        </div>

        {trees.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-300 text-xl font-medium">No family trees yet. Create one above!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trees.map((tree) => (
              <div 
                key={tree.id} 
                className="group backdrop-blur-3xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 hover:bg-white/[0.15] hover:border-white/40 hover:shadow-purple-500/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors">{tree.name}</h3>
                <div className="flex gap-3">
                  <Link 
                    href={`/editor/${tree.id}`} 
                    className="flex-1 text-center px-5 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 font-semibold transition-all duration-300"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => setTrees(trees.filter(t => t.id !== tree.id))} 
                    className="flex-1 text-center px-5 py-2.5 backdrop-blur-xl bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/40 border border-red-500/30 font-semibold transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
