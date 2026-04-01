'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@supabase/supabase-js';

interface FamilyTree {
  tree_id: string;
  name: string;
  description: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const [trees, setTrees] = useState<FamilyTree[]>([]);
  const [loadingTrees, setLoadingTrees] = useState(true);
  const [showNewTreeForm, setShowNewTreeForm] = useState(false);
  const [newTreeName, setNewTreeName] = useState('');
  const [newTreeDescription, setNewTreeDescription] = useState('');
  const [creatingTree, setCreatingTree] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, ro  }, [user, loading, ro  }, [user, l(u  }, [user,  fe  }, [user, loading, ro  }, [user, loading, ro  },s   }, [user, loading, ro {
                         eateClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
          rom('family_trees')
        .select('*')
        .eq(        .eq(  er?.id)
        .order('updated_a        .order('updated_a        .order(ro        .order('updated_a        .order('upd    } catch (error) {
      console.error('Error fetching trees:', error);
    } finally {
      setLoadingTrees(false);
    }
  };

  const handleCreateTree = async (e: React.FormEve  const handleCreateTree = async (e: React.FormEveame.trim()) return;

    try {
      setCreatingTree(true);
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

                                  t supabase
        .from('family_trees')
        .insert({
          owner_id: user?.id,
          name: newTreeName,
          description: newTreeDescription,
          is_public: false,
          visi          visi          visi          visi   ()
        .single();

      if (error) throw error;
      iset      iset      iset      iset      iset   n('');
      setShowNewTreeForm(false);
      await fetchTrees();
    } catch (error) {
      console.error('Error creating tree:', error);
    } finally {
      setCreatingTree(false);
    }
  };

  const handleDeleteTr  const handleDeleteTr  const handleDeleteTr  com('Ar  const handle want to delete this family tree?')) return;

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_      _SUPABASE_ANON_KEY!
      );

                                      
                                           te()
        .eq('tree_id', treeId);

      if (error) t      iror      if (error) t      iror      if (errerro      if (error) t error('Erro      if (erree:',      if (error) t      f (loa      if (error) t      iroes)) {
    return (
      <div className="min      <div className="mex it      <div className="min      <div className="mex it    center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-          <p class..</p>
                     </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">    <div className="min-h-screen bg-gray-50">    <div className="min-h-screen bg-gray-50">    <div className="min-h-screen bg-gray-"max-w-7xl mx-    <div className="min-h-scrter justify-between">
          <div>
            <h1 c            <h1 c            <h1 c          🌳 My Family Trees</h1>
            <p className="text-sm text-gray-600">{user.email}</p>
          </          </          
                                                                                                                                                                                                              Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Create New Tree Button */}
        {!showNewT        {!showNewT        {!showNewT        {!showNewT        {!showNewT        {!showNewT        {!showNewTb-        {!showNewT        {!showNewT        {!showte r        {!showNewT    transition"
          >
                         F  ily Tree
          </button>
        )}

        {/* Create Tree Form */}
        {showNewTreeForm && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-            <hw             <h2 className="text-2xl font-bold mb-6 text-gray-            <hw         
                                                                 sm                               ">
                                                                                                                                                                                                                    
                                                       
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={creatingTree}
                />
              </div>

              <div>
                <label className=                <label className=ray-700 mb-1">
                  Des                  Des                              Des       <t                  Des                  Des                              Des       <t    setNewTreeDescription(e.target.value)}
                  placeholder="Add a description for this family tree..."
                  rows={3}
                  classNa                  classNa                  classNa                  classNa                  classblue-500"
                  disabled={creatingTree}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={creatingTree || !newTreeName.trim()}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium transition"
                >
                  {creatingTree ? 'Cr      ...' : 'Create Tree'}
                </button>
                                                                                   () =>                                                                                   () =>                                                                                   () =>                              00 ho                                                                                 >
                                                                                                                                                   
                                          <div className="text-c                                                               fa         s yet. Create o                                                                          <div className=       o                                          <div className="text-c                                                               fa  nt-m                "
                                          <div className=                                                                            <div className=                                                                            <div className=                                                                            <div className=                                                                            <div className=                                                  ra                                          <div className=                                                                            <die.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mb-4">
                    Updated {new Date(tree.updated_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/family-trees/${tree.tree_id}`}
                      className="flex-1 text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteTree(tree.tree_id)}
                      className="flex-1 text-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
