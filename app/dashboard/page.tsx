'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FamilyTree {
  tree_id: string;
  name: string;
  description: string;
  is_public: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const [trees, setTrees] = useState<FamilyTree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [newTreeName, setNewTreeName] = useState('');
  const [newTreeDesc, setNewTreeDesc] = useState('');
  const [creatingTree, setCreatingTree] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }
      setUser(user);
      fetchTrees(user.id);
    };
    checkAuth();
  }, [router]);

  const fetchTrees = async (userId: string) => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from('family_trees')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrees(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTree = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newTreeName.trim()) return;

    setCreatingTree(true);
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from('family_trees')
        .insert([
          {
            owner_id: user.id,
            name: newTreeName,
            description: newTreeDesc,
            is_public: false,
            visibility: 'private',
          },
        ])
        .select();

      if (error) throw error;
      if (data) {
        setTrees([data[0], ...trees]);
        setNewTreeName('');
        setNewTreeDesc('');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreatingTree(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🌳 Family Tree Tracker</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Create New Tree */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Family Tree</h2>
          <form onSubmit={handleCreateTree} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tree Name *
              </label>
              <input
                type="text"
                value={newTreeName}
                onChange={(e) => setNewTreeName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., Smith Family"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={newTreeDesc}
                onChange={(e) => setNewTreeDesc(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Add a description..."
                rows={3}
              />
            </div>
            <button
              type="submit"
              disabled={creatingTree || !newTreeName.trim()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium"
            >
              {creatingTree ? 'Creating...' : 'Create Tree'}
            </button>
          </form>
        </div>

        {/* Family Trees List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Family Trees</h2>

          {loading ? (
            <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
          ) : error ? (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-200">
              {error}
            </div>
          ) : trees.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No family trees yet. Create one above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trees.map((tree) => (
                <div
                  key={tree.tree_id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{tree.name}</h3>
                  {tree.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{tree.description}</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                    Created {new Date(tree.created_at).toLocaleDateString()}
                  </p>
                  <Link
                    href={`/family-trees/${tree.tree_id}`}
                    className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm"
                  >
                    Open →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Try Demo */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4">Want to see it in action?</p>
          <Link
            href="/family-trees/demo"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            View Demo with Sample Data
          </Link>
        </div>
      </main>
    </div>
  );
}
