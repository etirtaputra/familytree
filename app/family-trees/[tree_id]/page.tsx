'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@supabase/supabase-js';
import { FamilyTree, Person, Relationship, Location } from '@/types/familyTree';
import { FamilyTreeLayout } from '@/components/family-tree/FamilyTreeLayout';
import { PersonForm } from '@/components/family-tree/PersonForm';
import { RelationshipForm } from '@/components/family-tree/RelationshipForm';
import { TreeVisualization } from '@/components/family-tree/TreeVisualization';
import { FamilyLocationMap } from '@/components/family-tree/FamilyLocationMap';
import { SharingPanel } from '@/components/family-tree/SharingPanel';

type ViewType = 'layout' | 'person-form' | 'relationship-form' | 'tree' | 'map' | 'sharing';

export default function FamilyTreeEditor() {
  const params = useParams();
  const router = useRouter();
  const { user,  const { user,  const { user,  const { user,  cons =  const { ee_id  const { user,  const { user,  const { user,  coami  const { user,  const { user,  const { user,  const {us  const { user,  const { user,  const { usps, setRelationships] = useState<Relationship[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState<ViewType>('layout');
  const [  const [  const [  const [  const [  const [  const [  const [  c;

  const s  const s  const s  const s  const s  const s  const s  const s  const s  cons.e  const s  const s  const s  const s  const s  const s  const s  const s  consng  const s  const s  const s  const s  const s  const s  const s  conhLoading, router]);

  useEffect(() => {
    if (user && treeId) {
      fetchData();
    }
  }, [user, treeId]);

  const fetchData = async (  const fetchData = asynetLoad  const fetchData = async (');  const fetchData = async (  const fetchData = asynetLoad  const fetchData = async (');  const fetchData = async (  const fetchData = asynetLoad  const fetchData = async (');  const fetchData = async (  const fetchData = asynetLoad  const fetchData = async (');  const fetchData = asynu do not have access');
        return;
      }

      setTree(treeData);

      const [personsData, relData, locData] = await Promise.all([
        supab        supab        supab        supab        supab        supsupab        supab        supab        supab        supab        supab      pabase.        supab        supab        supab        supab        supab        supsupab        supab        supab        supab        supab        supab      pabase.        supab        supab        supab        supab        supab        supsupab        supab  rr)        setError('Fa        supab       tree')        supab   {
      setLoading(false);
    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }    }          }    iveView 'layout'    }    }    }    }  
                                                                   st handleAddRelationship = async (relationshipData: Omit<Relationship, 'relationship_id' | 'tree_id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('relationships')
        .insert({
          tree_id: treeId,
          ...relationshipData,
        })
        .select()
        .single();

      if (error) throw error;
      setRelationships([...relationships, data]);
      setActiveView('layout');
    } catch (err) {
      console.erro      consoling relations      console.erro      consoling relations      console.erro      consoling relations      console.erro      consoling relations      console.erro      consoling relations      console.erro      consoling relations      console.erro      consoling relations      console.erro      consoling relations      console.erro      consoling relations      console.erro      consoling relations      console.erro      consoling relations      console.errsc      console.erro      consoling relations      console.erro      consoling relations      console.erro      consoling relations      console.erro      consoling relations      console.eon
                                                     
                        x-6 py-2             hover           0 text-white rounded-lg"
          >
            Back to D            Ba     </button>
        <        <        <     );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <div>
            <h1 className="text-white font-bold text-lg">{tree.name}</h1>
            <p className="text-gray-400 text-sm">{tree.description}</p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition"
            >
              ← Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="bg-gray-800 border-      <div className="bg-gray-800 border-      <div di      <div className="bg-gray-800 border-      <div className="bg-gray-800 border-     {[
                                                            { key: 'tree', label: 'Tree' },
               ey               ey               ey     key: 'sharing', label: 'Sharing' },
            { key: 'person-form', label: '+ Person' },
            { key: 'relationship-form', label: '+ Relationship' },
          ].map((tab)          ].map((tab)          ].map((tab)          ].map((tab)      nClick={() => setActiveView(tab.key as ViewType)}
              className={`p              ed               className={`p              ed               c=== tab.key
                                                                 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab.label}             <              {tab.lab
                     </div>         main className="max-w-7xl mx-auto p-8                     </div>         main className="max-w-7xl mx-auto p-8                     </div>         main className="max-w-7xl mx-auto p-8                     </div>         mons={locations}
          />
        )}

        {activeView === 'tree' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="tex            <h2 className="tex            <h2 classNaam            <h2 className="tex            <h2 className="tex                   <h2 className="tex            <h2 className="tex            <h2 classNaam            <h2 className="tex            <h2 class            />
            {selectedPerson && (
              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 r              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 r              <div className="mt-8 gray-900 dark:text-whit            ct              <div className="mt-8 p-6 bg-blue-50 dark:bg- dark:text-gray-300">
                  {selectedPerson.first_name} {selectedPerson.last_name}
                  {selectedPerson.birth_date && ` (b. ${new Date(selectedPerson.birth_date).getFullYear()})`}
                </p>
              </div>
            )}
          </div>
        )}

        {a        {a        {a        {a     <        {a        {a        {a        {a     <        {a        {a                     {a        {a        {a        {a     <        {a        {a        {a        {a     <        {a        {a                     {a        {a        {a        {a     <        {a        {a        {a        {a     <        {a        {a                     {a        {a        {a        {a     <     bg-white dark:bg-gray-800 rounded-l        {a        {a        {a        {a     <        {a        {a        {a        {a     <        {a        {a                     {a        {a        {a        {a     <        {a        {a        {a        {a     <        {a        {a                     {a        {a        {a        {a   &        {a         className="bg-white dark:bg-gray-800 rounded-lg shadow        {a        {a        {a        {a     <        {a        {a        {a        {a     <        {a     er<        {a       <Per        {a            treeId={treeId}
              locations={locations}
              onSubmit={handleAddPerson}
              onCancel={() => setActiveView('layout')}
            />
          </div>
        )}

        {activeView === 'relationship-form' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Relationship</h2>
            <RelationshipForm
              persons={persons}
              onSubmit={handleAddRelationship}
              onCancel={() => setActiveView('layout')}
            />
          </div>
        )}
      </main>
    </div>
  );
}
